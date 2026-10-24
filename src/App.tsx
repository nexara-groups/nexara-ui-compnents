import { Hero, HERO_VARIANTS, type HeroVariant } from '@/components/ui/hero.tsx'
import { Navbar, NAVBAR_VARIANTS, type NavbarVariant } from '@/components/ui/navbar.tsx'
import { DocsApp } from '@/docs/docs-app.tsx'
import { ThemesApp } from '@/docs/themes-app.tsx'
import { FlagshipDashboardPage } from '@/flagship/dashboard-page.tsx'
import { FlagshipLanding } from '@/flagship/landing.tsx'
import { BoldShot } from '@/themes/kit/shots.tsx'
import { parseLagoonRoute } from '@/themes/lagoon/nav.ts'
import { LagoonShowcase } from '@/themes/lagoon/showcase.tsx'
import { ThemeShot } from '@/themes/pages.tsx'
import { useEffect, useState } from 'react'

function readHash() {
  return window.location.hash.replace(/^#/, '')
}

export default function App() {
  const [hash, setHash] = useState(() => readHash() || 'themes')

  useEffect(() => {
    const sync = () => setHash(readHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [hash])

  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', '#themes')
  }, [])

  if (hash.startsWith('themes/shot/')) {
    const parts = hash.split('/')
    const id = parts[2] || 'fieldnote'
    const scheme = parts[3] === 'dark' || parts[4] === 'dark' ? 'dark' : 'light'
    const bold = ['lagoon', 'strike', 'orrery', 'rally', 'array', 'editor', 'animations', 'compare'].includes(id)
    const extra = parts[4]
    const mode = extra === 'form' || extra === 'dashboard' || extra === 'kit' ? extra : undefined
    if (bold) return <BoldShot id={id} scheme={scheme} mode={mode} />
    return <ThemeShot id={id} scheme={scheme} />
  }
  const lagoonRoute = parseLagoonRoute(hash)
  if (lagoonRoute) return <LagoonShowcase screen={lagoonRoute.screen} scheme={lagoonRoute.scheme} />
  if (hash === '' || hash === 'themes' || hash.startsWith('themes/')) {
    return <ThemesApp />
  }

  if (hash.startsWith('shot/')) {
    const id = hash.slice(5).split('/')[0] as HeroVariant
    const variant = HERO_VARIANTS.includes(id) ? id : 'aurora'
    return (
      <div data-nexara-shot={variant} className="min-h-svh bg-black">
        <Hero variant={variant} className="min-h-svh" />
      </div>
    )
  }
  if (hash.startsWith('navshot/')) {
    const id = hash.slice(8).split('/')[0] as NavbarVariant
    const variant = NAVBAR_VARIANTS.includes(id) ? id : 'pill'
    const opened = variant === 'mega' || variant === 'curtain' || variant === 'island'
    return (
      <div data-nexara-shot={variant} className="min-h-svh bg-black">
        <Navbar variant={variant} className="min-h-svh" defaultOpen={opened} />
      </div>
    )
  }
  if (hash === 'flagship' || hash === 'atelier') {
    return <FlagshipLanding />
  }
  if (hash === 'flagship-dashboard') {
    return <FlagshipDashboardPage />
  }
  return <DocsApp />
}
