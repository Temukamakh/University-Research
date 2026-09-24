import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { profiles } from '../profiles'
import type { ProfileConfig } from '../profiles/types'

const ACTIVE_KEY = 'masters-tracker:active-profile'

/** Active profile: `?u=<id>` in the URL wins (so each person can bookmark their own link), then the last one used. */
function initialId(): string {
  const fromUrl = new URLSearchParams(window.location.search).get('u')
  if (fromUrl && profiles.some((p) => p.id === fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem(ACTIVE_KEY)
    if (saved && profiles.some((p) => p.id === saved)) return saved
  } catch {
    // Storage unavailable: fall back to the first profile.
  }
  return profiles[0].id
}

interface ProfileCtx {
  profile: ProfileConfig
  switchProfile: (id: string) => void
}

const Ctx = createContext<ProfileCtx | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState(initialId)

  const switchProfile = useCallback((next: string) => {
    setId(next)
    try {
      localStorage.setItem(ACTIVE_KEY, next)
    } catch {
      // Ignore: the switch still works for this visit.
    }
    const url = new URL(window.location.href)
    url.searchParams.set('u', next)
    url.hash = '#/dashboard'
    window.history.replaceState(null, '', url)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }, [])

  const profile = profiles.find((p) => p.id === id) ?? profiles[0]
  return <Ctx.Provider value={{ profile, switchProfile }}>{children}</Ctx.Provider>
}

export function useProfile() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>')
  return ctx
}
