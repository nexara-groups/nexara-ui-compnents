import { AtelierDashboard } from '@/components/flagship/atelier-dashboard.tsx'
import { AtelierNav } from '@/components/flagship/atelier-nav.tsx'
import { CinematicHero } from '@/components/flagship/cinematic-hero.tsx'
import { KineticHero } from '@/components/flagship/kinetic-hero.tsx'
import { LiveBento } from '@/components/flagship/live-bento.tsx'
import { OrbitalHero } from '@/components/flagship/orbital-hero.tsx'
import { PricingAtelier } from '@/components/flagship/pricing-atelier.tsx'
import { ScrollStory } from '@/components/flagship/scroll-story.tsx'
import { TestimonialWall } from '@/components/flagship/testimonial-wall.tsx'
import type { ReactNode } from 'react'

function Frame({ children, tall = false }: { children: ReactNode; tall?: boolean }) {
  return (
    <div className={`heliograph overflow-auto rounded-3xl border border-ivory/10 bg-void ${tall ? 'h-[42rem]' : ''}`}>
      {children}
    </div>
  )
}

export function FlagshipCinematicDemo() {
  return (
    <Frame tall>
      <CinematicHero />
    </Frame>
  )
}

export function FlagshipOrbitalDemo() {
  return (
    <Frame>
      <OrbitalHero />
    </Frame>
  )
}

export function FlagshipKineticDemo() {
  return (
    <Frame>
      <KineticHero />
    </Frame>
  )
}

export function FlagshipNavDemo() {
  return (
    <Frame>
      <div className="relative min-h-[28rem] bg-void pt-24">
        <AtelierNav className="absolute" />
        <p className="px-8 pt-16 text-fog">Open Product or Studio. Resize below 1024px for the drawer.</p>
      </div>
    </Frame>
  )
}

export function FlagshipStoryDemo() {
  return (
    <Frame tall>
      <ScrollStory />
    </Frame>
  )
}

export function FlagshipBentoDemo() {
  return (
    <Frame>
      <LiveBento />
    </Frame>
  )
}

export function FlagshipPricingDemo() {
  return (
    <Frame>
      <PricingAtelier />
    </Frame>
  )
}

export function FlagshipVoicesDemo() {
  return (
    <Frame>
      <TestimonialWall />
    </Frame>
  )
}

export function FlagshipDashboardDemo() {
  return (
    <Frame tall>
      <AtelierDashboard />
    </Frame>
  )
}
