import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ProfileConfig } from '../profiles/types'
import type { ScholarshipStatusId } from '../data/scholarships'

export const STATUSES = [
  { id: 'researching', label: 'Researching', color: '#94a3b8' },
  { id: 'preparing', label: 'Preparing', color: '#f59e0b' },
  { id: 'submitted', label: 'Submitted', color: '#3b82f6' },
  { id: 'interview', label: 'Interview / test', color: '#8b5cf6' },
  { id: 'admitted', label: 'Admitted 🎉', color: '#10b981' },
  { id: 'rejected', label: 'Rejected', color: '#ef4444' },
  { id: 'declined', label: 'Not applying', color: '#64748b' },
] as const

export type StatusId = (typeof STATUSES)[number]['id']
export type Theme = 'system' | 'light' | 'dark'

export interface TestEntry {
  date?: string
  score?: string
  done?: boolean
}

export interface AppState {
  version: 1
  /** GPA on the Georgian 4.0 scale: current and expected at graduation. */
  profile: { name: string; gpaNow: number; gpaExpected: number; german: string }
  shortlist: string[]
  status: Record<string, StatusId>
  docs: Record<string, Record<string, boolean>>
  notes: Record<string, string>
  milestonesDone: Record<string, boolean>
  /** Recommendation-letter status per recommender id (see data/profile.ts). */
  letters: Record<string, string>
  tests: Record<string, TestEntry>
  compare: string[]
  /** Scholarship application status and document checklist, by scholarship id. */
  scholarships: Record<string, ScholarshipStatusId>
  scholarshipDocs: Record<string, Record<string, boolean>>
  theme: Theme
}

/** Fresh state for a profile, seeded from its defaults. */
export function makeDefaultState(p: ProfileConfig): AppState {
  return {
    version: 1,
    profile: { name: p.name, gpaNow: p.defaults.gpaNow, gpaExpected: p.defaults.gpaExpected, german: p.defaults.german },
    shortlist: p.defaults.shortlist,
    status: {},
    docs: {},
    notes: {},
    milestonesDone: {},
    letters: {},
    tests: {},
    compare: p.defaults.compare,
    scholarships: {},
    scholarshipDocs: {},
    theme: 'system',
  }
}

/** Merges saved state over the defaults. Older backups stored a 0–100 `gpa`, which is dropped. */
function withDefaults(parsed: Partial<AppState>, defaults: AppState): AppState {
  const { gpa: _old, ...profile } = (parsed.profile ?? {}) as Partial<AppState['profile']> & { gpa?: number }
  return { ...defaults, ...parsed, profile: { ...defaults.profile, ...profile } }
}

function load(p: ProfileConfig): AppState {
  const defaults = makeDefaultState(p)
  try {
    const raw = localStorage.getItem(p.storageKey)
    if (!raw) return defaults
    const state = withDefaults(JSON.parse(raw) as Partial<AppState>, defaults)
    // Saved progress that still holds an old default GPA gets the current one; GPAs the user typed are kept.
    const legacy = p.legacyGpaDefaults?.some(([now, exp]) => state.profile.gpaNow === now && state.profile.gpaExpected === exp)
    if (legacy) state.profile = { ...state.profile, gpaNow: defaults.profile.gpaNow, gpaExpected: defaults.profile.gpaExpected }
    return state
  } catch {
    return defaults
  }
}

interface Store {
  state: AppState
  update: (fn: (s: AppState) => AppState) => void
  toggleShortlist: (id: string) => void
  setStatus: (id: string, status: StatusId) => void
  toggleDoc: (programId: string, doc: string) => void
  setNote: (id: string, note: string) => void
  toggleMilestone: (id: string) => void
  setTest: (id: string, entry: TestEntry) => void
  toggleCompare: (id: string) => void
  setScholarshipStatus: (id: string, status: ScholarshipStatusId) => void
  toggleScholarshipDoc: (id: string, doc: string) => void
  importState: (json: string) => boolean
  reset: () => void
}

const Ctx = createContext<Store | null>(null)

/** Holds one profile's progress. Remount it (key={profile.id}) when switching profiles. */
export function StoreProvider({ profile, children }: { profile: ProfileConfig; children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => load(profile))

  useEffect(() => {
    try {
      localStorage.setItem(profile.storageKey, JSON.stringify(state))
    } catch {
      // Storage can be unavailable (private mode). The app still works for this session.
    }
  }, [state, profile.storageKey])

  const update = useCallback((fn: (s: AppState) => AppState) => setState((s) => fn(s)), [])

  const store = useMemo<Store>(
    () => ({
      state,
      update,
      toggleShortlist: (id) =>
        update((s) => ({
          ...s,
          shortlist: s.shortlist.includes(id) ? s.shortlist.filter((x) => x !== id) : [...s.shortlist, id],
        })),
      setStatus: (id, status) => update((s) => ({ ...s, status: { ...s.status, [id]: status } })),
      toggleDoc: (programId, doc) =>
        update((s) => {
          const cur = s.docs[programId] ?? {}
          return { ...s, docs: { ...s.docs, [programId]: { ...cur, [doc]: !cur[doc] } } }
        }),
      setNote: (id, note) => update((s) => ({ ...s, notes: { ...s.notes, [id]: note } })),
      toggleMilestone: (id) =>
        update((s) => ({ ...s, milestonesDone: { ...s.milestonesDone, [id]: !s.milestonesDone[id] } })),
      setTest: (id, entry) => update((s) => ({ ...s, tests: { ...s.tests, [id]: { ...s.tests[id], ...entry } } })),
      toggleCompare: (id) =>
        update((s) => {
          if (s.compare.includes(id)) return { ...s, compare: s.compare.filter((x) => x !== id) }
          return { ...s, compare: [...s.compare, id].slice(-3) }
        }),
      setScholarshipStatus: (id, status) => update((s) => ({ ...s, scholarships: { ...s.scholarships, [id]: status } })),
      toggleScholarshipDoc: (id, doc) =>
        update((s) => {
          const cur = s.scholarshipDocs[id] ?? {}
          return { ...s, scholarshipDocs: { ...s.scholarshipDocs, [id]: { ...cur, [doc]: !cur[doc] } } }
        }),
      importState: (json) => {
        try {
          const parsed = JSON.parse(json) as Partial<AppState>
          if (parsed.version !== 1) return false
          setState(withDefaults(parsed, makeDefaultState(profile)))
          return true
        } catch {
          return false
        }
      },
      reset: () => setState(makeDefaultState(profile)),
    }),
    [state, update, profile],
  )

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside <StoreProvider>')
  return s
}

export const statusOf = (state: AppState, id: string): StatusId => state.status[id] ?? 'researching'

export const scholarshipStatusOf = (state: AppState, id: string): ScholarshipStatusId => state.scholarships[id] ?? 'idea'

/** A scholarship deadline counts as handled once you applied or decided not to. */
export const scholarshipHandled = (state: AppState, id: string) =>
  ['submitted', 'interview', 'awarded', 'rejected', 'skip'].includes(scholarshipStatusOf(state, id))
