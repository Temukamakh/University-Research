import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { StoreProvider } from './lib/store'
import { ProfileProvider, useProfile } from './lib/profile'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileProvider>
      <ProfileStore />
    </ProfileProvider>
  </StrictMode>,
)

/** A separate store per profile, so each person's progress is saved on its own. */
function ProfileStore() {
  const { profile } = useProfile()
  return (
    <StoreProvider key={profile.id} profile={profile}>
      <App />
    </StoreProvider>
  )
}
