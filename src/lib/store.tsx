import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

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
  tests: Record<string, TestEntry>
  compare: string[]
  theme: Theme
}

const STORAGE_KEY = 'masters-tracker:v1'

export const defaultState: AppState = {
  version: 1,
  profile: { name: 'Temur', gpaNow: 2.5, gpaExpected: 2.9, german: 'A2' },
  shortlist: ['rwth-automotive', 'kit-mechanical', 'stuttgart-fame', 'stuttgart-commas', 'rptu-cvt', 'thi-iae', 'ude-mechanical', 'siegen-mechanical', 'chemnitz-am'],
  status: {},
  docs: {},
  notes: {},
  milestonesDone: {},
  tests: {},
  compare: ['rwth-automotive', 'kit-mechanical', 'stuttgart-fame'],
  theme: 'system',
}

/** Merges saved state over the defaults. Older backups stored a 0–100 `gpa`, which is dropped. */
function withDefaults(parsed: Partial<AppState>): AppState {
  const { gpa: _old, ...profile } = (parsed.profile ?? {}) as Partial<AppState['profile']> & { gpa?: number }
  return { ...defaultState, ...parsed, profile: { ...defaultState.profile, ...profile } }
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<AppState>
    return withDefaults(parsed)
  } catch {
    return defaultState
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
  importState: (json: string) => boolean
  reset: () => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage can be unavailable (private mode). The app still works for this session.
    }
  }, [state])

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
      importState: (json) => {
        try {
          const parsed = JSON.parse(json) as Partial<AppState>
          if (parsed.version !== 1) return false
          setState(withDefaults(parsed))
          return true
        } catch {
          return false
        }
      },
      reset: () => setState(defaultState),
    }),
    [state, update],
  )

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore must be used inside <StoreProvider>')
  return s
}

export const statusOf = (state: AppState, id: string): StatusId => state.status[id] ?? 'researching'
