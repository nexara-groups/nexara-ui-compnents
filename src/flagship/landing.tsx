import { AtelierNav } from '@/components/flagship/atelier-nav.tsx'
import { CinematicHero } from '@/components/flagship/cinematic-hero.tsx'
import { KineticHero } from '@/components/flagship/kinetic-hero.tsx'
import { LiveBento } from '@/components/flagship/live-bento.tsx'
import { OrbitalHero } from '@/components/flagship/orbital-hero.tsx'
import { PricingAtelier } from '@/components/flagship/pricing-atelier.tsx'
import { Grain, HelioMark, Magnetic, useLenis } from '@/components/flagship/primitives.tsx'
import { ScrollStory } from '@/components/flagship/scroll-story.tsx'
import { TestimonialWall } from '@/components/flagship/testimonial-wall.tsx'

export function FlagshipLanding() {
  useLenis(true)

  return (
    <div className="heliograph bg-void text-ivory">
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to story
      </a>
      <AtelierNav />
      <div id="top">
        <CinematicHero />
      </div>
      <ProofStrip />
      <ScrollStory />
      <LiveBento />
      <KineticHero />
      <OrbitalHero />
      <TestimonialWall />
      <PricingAtelier />
      <SiteFooter />
    </div>
  )
}

function ProofStrip() {
  const names = ['Harbor Press', 'North Lamp', 'Paper Tide', 'Atelier 18', 'Vespers', 'Signal House']
  return (
    <section className="relative border-y border-ivory/8 bg-void px-4 py-10 md:px-8" aria-label="Studios">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] tracking-[0.2em] text-fog uppercase">Studios already on the desk</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-serif text-lg text-ivory/70">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/8 bg-void px-4 py-20 md:px-8">
      <Grain className="opacity-[0.08]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
          <HelioMark />
          Helio
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.04em]">
          Leave the room darker than you found it.
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Magnetic
            href="#flagship-dashboard"
            className="inline-flex h-12 items-center rounded-full bg-ember px-6 text-sm font-medium text-[#1a0904] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
          >
            Open the night desk
          </Magnetic>
          <a
            href="#draggable-card"
            className="inline-flex h-12 items-center rounded-full border border-ivory/15 px-6 text-sm text-ivory/70"
          >
            Back to the registry
          </a>
        </div>
        <p className="mt-16 font-mono text-[10px] tracking-[0.18em] text-fog uppercase">
          Nexara UI flagship · original work · not a clone
        </p>
      </div>
    </footer>
  )
}
