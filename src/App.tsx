import { DocsApp } from '@/docs/docs-app.tsx'
import { FlagshipDashboardPage } from '@/flagship/dashboard-page.tsx'
import { FlagshipLanding } from '@/flagship/landing.tsx'
import { useEffect, useState } from 'react'

function readHash() {
  return window.location.hash.replace(/^#/, '')
}

export default function App() {
  const [hash, setHash] = useState(readHash)

  useEffect(() => {
    const sync = () => setHash(readHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  if (hash === 'flagship' || hash === 'atelier') {
    return <FlagshipLanding />
  }
  if (hash === 'flagship-dashboard') {
    return <FlagshipDashboardPage />
  }
  return <DocsApp />
}
