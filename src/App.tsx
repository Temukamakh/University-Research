import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Award, CalendarRange, Compass, GraduationCap, LayoutDashboard, Map as MapIcon, Monitor, Moon, Scale, Sun, User, Wallet } from 'lucide-react'
import { useStore, type Theme } from './lib/store'
import { useProfile } from './lib/profile'
import { profiles } from './profiles'
import Dashboard from './views/Dashboard'
import Programs from './views/Programs'
import ProgramDetail from './views/ProgramDetail'
import Timeline from './views/Timeline'
import Compare from './views/Compare'
import Costs from './views/Costs'
import Profile from './views/Profile'
import Scholarships from './views/Scholarships'

// Leaflet is the heaviest dependency, so the map is only loaded when you open it.
const MapView = lazy(() => import('./views/MapView'))

export type RouteName = 'dashboard' | 'programs' | 'program' | 'timeline' | 'map' | 'compare' | 'costs' | 'scholarships' | 'me'
interface Route {
  name: RouteName
  id?: string
}

const NAV: { name: RouteName; label: string; short?: string; icon: typeof Compass }[] = [
  { name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { name: 'programs', label: 'Programs', icon: Compass },
  { name: 'timeline', label: 'Timeline', icon: CalendarRange },
  { name: 'map', label: 'Map', icon: MapIcon },
  { name: 'compare', label: 'Compare', icon: Scale },
  { name: 'costs', label: 'Costs', icon: Wallet },
  { name: 'scholarships', label: 'Scholarships', short: 'Funding', icon: Award },
  { name: 'me', label: 'Me', icon: User },
]

function parseHash(): Route {
  const [, name, id] = window.location.hash.replace(/^#/, '').split('/')
  const valid = NAV.some((n) => n.name === name) || name === 'program'
  return valid ? { name: name as RouteName, id } : { name: 'dashboard' }
}

export const navigate = (name: RouteName, id?: string) => {
  window.location.hash = id ? `/${name}/${id}` : `/${name}`
}

const THEME_ICON: Record<Theme, typeof Sun> = { system: Monitor, light: Sun, dark: Moon }
const NEXT_THEME: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' }

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash)
  const { state, update } = useStore()

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (state.theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', state.theme)
  }, [state.theme])

  const ThemeIcon = THEME_ICON[state.theme]
  const active = route.name === 'program' ? 'programs' : route.name

  let view: React.ReactNode
  switch (route.name) {
    case 'programs':
      view = <Programs />
      break
    case 'program':
      view = <ProgramDetail id={route.id ?? ''} />
      break
    case 'timeline':
      view = <Timeline />
      break
    case 'map':
      view = (
        <Suspense fallback={<p className="muted">Loading map…</p>}>
          <MapView />
        </Suspense>
      )
      break
    case 'compare':
      view = <Compare />
      break
    case 'costs':
      view = <Costs />
      break
    case 'scholarships':
      view = <Scholarships />
      break
    case 'me':
      view = <Profile />
      break
    default:
      view = <Dashboard />
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <a className="brand" href="#/dashboard">
          <motion.span className="brand-logo" whileHover={{ rotate: -12, scale: 1.08 }}>
            <GraduationCap size={22} />
          </motion.span>
          <span>
            <strong>Master's Tracker</strong>
            <small>WS 2027/28</small>
          </span>
        </a>
        <ProfileSwitcher />
        <nav className="nav">
          {NAV.map(({ name, label, short, icon: Icon }) => (
            <a key={name} href={`#/${name}`} className={`nav-item ${active === name ? 'active' : ''}`} aria-current={active === name ? 'page' : undefined}>
              {active === name && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <Icon size={18} />
              <span className="nav-label">{label}</span>
              <span className="nav-short">{short ?? label}</span>
            </a>
          ))}
        </nav>
        <button
          className="theme-btn"
          onClick={() => update((s) => ({ ...s, theme: NEXT_THEME[s.theme] }))}
          aria-label={`Theme: ${state.theme}. Click to change.`}
          title={`Theme: ${state.theme}`}
        >
          <ThemeIcon size={16} /> <span>{state.theme[0].toUpperCase() + state.theme.slice(1)} theme</span>
        </button>
      </aside>

      <main className="main">
        <div className="mobile-switch">
          <ProfileSwitcher compact />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={route.name + (route.id ?? '')}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {view}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

/** Switches between applicants. Each profile has its own programs and saved progress. */
function ProfileSwitcher({ compact = false }: { compact?: boolean }) {
  const { profile, switchProfile } = useProfile()
  return (
    <div className={`profile-switch ${compact ? 'compact' : ''}`} role="radiogroup" aria-label="Profile">
      {profiles.map((p) => {
        const on = p.id === profile.id
        return (
          <button
            key={p.id}
            role="radio"
            aria-checked={on}
            className={`ps-item ${on ? 'on' : ''}`}
            onClick={() => !on && switchProfile(p.id)}
            style={{ '--ps': p.color } as React.CSSProperties}
            title={`${p.name}: ${p.field}`}
          >
            {on && <motion.span layoutId={compact ? 'ps-pill-m' : 'ps-pill'} className="ps-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="ps-avatar">{p.name[0]}</span>
            {!compact && (
              <span className="ps-text">
                <strong>{p.name}</strong>
                <small>{p.tagline}</small>
              </span>
            )}
            {compact && <span className="ps-name">{p.name}</span>}
          </button>
        )
      })}
    </div>
  )
}
