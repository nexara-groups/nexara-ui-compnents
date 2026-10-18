'use client'

import { GlobeField, LazyMesh3D, ScrambleText, ScrollPin, SplitMask, WowStage } from '@/lib/wow.tsx'
import { isWowVariant } from '@/lib/wow-variants.ts'

import { Accordion } from './accordion.tsx'
import { Activity } from './activity.tsx'
import { AppShell } from './app-shell.tsx'
import { CaseStudy } from './case-study.tsx'
import { Chapters } from './chapters.tsx'
import { Contact } from './contact.tsx'
import { Countdown } from './countdown.tsx'
import { CtaBand } from './cta-band.tsx'
import { DataTable } from './data-table.tsx'
import { Footer } from './footer.tsx'
import { Hero } from './hero.tsx'
import { KanbanBoard } from './kanban-board.tsx'
import { Kpi } from './kpi.tsx'
import { Leaderboard } from './leaderboard.tsx'
import { LogoCloud } from './logo-cloud.tsx'
import { News } from './news.tsx'
import { Process } from './process.tsx'
import { Services } from './services.tsx'
import { Stats } from './stats.tsx'
import { Team } from './team.tsx'
import { Button } from './button.tsx'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'healthcare',
  'hvac',
  'sports',
  'agency',
  'academy',
  'portal',
  'pharmacy',
  'events',
  'dealer',
  'lab',
  'studio',
  'association',
  'shader-clinic',
  'globe-agency',
  'pin-sports',
  'liquid-portal',
  'scramble-academy',
] as const

export type KitVariant = (typeof VARIANTS)[number]

export interface KitProps {
  variant?: KitVariant
  className?: string
}

const faq = [
  { id: 'a', title: 'Do you take walk-ins?', content: 'Consults take walk-ins before noon. Therapy chairs are named and booked.' },
  { id: 'b', title: 'Which partners stay on site?', content: 'Kite, Solum, Nimbus, and Vale, with the partner on the job after handover.' },
  { id: 'c', title: 'How do clubs join Field Athletics?', content: 'Write the desk. Affiliation is seasonal and named to a coach.' },
]

/**
 * Kit
 * Twelve original industry pages composed from the section and app blocks.
 * Fictional brands only: Lumen Care, Harbor Climate, Field Athletics, North Studio, Atlas Academy, Solum Lab.
 * Copy this file plus every imported block, `src/lib/media.tsx`, and `public/media`.
 */
function KitCore({ variant = 'healthcare', className }: KitProps) {
  return (
    <div data-nexara="kit" data-variant={variant} className={cn('space-y-10', className)}>
      {variant === 'healthcare' ? (
        <>
          <Hero variant="clinic" title="Heart care, considered." description="Sixteen specialists, four doors, one quiet floor." actions={<Button className="bg-[#f6f1ea] text-[#0b1220]">Book a chair</Button>} />
          <Stats variant="clinic" />
          <Services variant="doors" />
          <Chapters variant="eight" />
          <Process variant="three" />
          <Team variant="doctors" />
          <Contact variant="appointment" />
          <CtaBand variant="appointment" />
        </>
      ) : null}

      {variant === 'hvac' ? (
        <>
          <Hero variant="ac-remote" title="Cooling that stays commissioned." description="Harbor Climate. The remote is the brief." actions={<Button>Ask for a plant walk</Button>} />
          <LogoCloud variant="dealers" />
          <Stats variant="countup" />
          <Services variant="checklist" />
          <Services variant="four-crews" />
          <Services variant="why" />
          <Contact variant="branches" />
          <CtaBand variant="partner" />
        </>
      ) : null}

      {variant === 'sports' ? (
        <>
          <Hero variant="sports" title="A season you can stand on." description="Athletes, clubs, coaches, and a medal book that updates on the night." actions={<Button variant="flow">See the championships</Button>} />
          <Stats variant="sports" />
          <Countdown variant="event" title="Field Night Championships" />
          <Leaderboard variant="medals" />
          <Services variant="disciplines" />
          <News variant="bulletin" />
          <CtaBand variant="event" />
        </>
      ) : null}

      {variant === 'association' ? (
        <>
          <Hero variant="sports" title="The book of the season." description="Affiliation is named to a coach. Medals post the same night." actions={<Button>Write the desk</Button>} />
          <Team variant="coaches" />
          <Leaderboard variant="clubs" />
          <News variant="digest" />
          <Accordion variant="faq" items={faq} />
        </>
      ) : null}

      {variant === 'events' ? (
        <>
          <Hero variant="sports" title="Night championships, Harbor Hall." description="Lanes, heats, and a podium that clears before midnight." actions={<Button variant="flow">Reserve a lane</Button>} />
          <Countdown variant="poster" title="Field Night Championships" />
          <Leaderboard variant="live" />
          <News variant="alert" />
          <CtaBand variant="event" />
        </>
      ) : null}

      {variant === 'agency' ? (
        <>
          <Hero variant="wordmark" title="NORTH" description="Academy, Labs, and Studio under one roof." actions={<Button variant="swap">Start a brief</Button>} />
          <Hero variant="divisions" title="One core. Three forces." />
          <CaseStudy variant="tabs" />
          <Process variant="written" />
          <News variant="cards" />
          <Accordion variant="faq" items={faq} />
          <CtaBand variant="lime" />
          <Footer variant="brand" />
        </>
      ) : null}

      {variant === 'studio' ? (
        <>
          <Hero variant="featured" title="The studio that ships the room." description="A named lead. A Friday demo. A handover book." actions={<Button>Open the index</Button>} />
          <CaseStudy variant="index" />
          <Process variant="handover" />
          <CtaBand variant="studio" />
          <Footer variant="split" />
        </>
      ) : null}

      {variant === 'academy' ? (
        <>
          <Hero variant="editorial" title="We grow makers." description="Cohorts write the brief, ship a weekly demo, and leave with a named lead." actions={<Button>Join the next room</Button>} />
          <Process variant="written" />
          <Team variant="faculty" />
          <Chapters variant="lesson" />
          <CtaBand variant="studio" />
        </>
      ) : null}

      {variant === 'portal' ? (
        <AppShell variant="agency">
          <div className="grid gap-4 md:grid-cols-3">
            <Kpi variant="metric" label="Open leads" value={24} />
            <Kpi variant="delta" label="Weekly demos" value={7} />
            <Kpi variant="currency" value={86} />
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <KanbanBoard variant="agency" />
            <Activity variant="feed" />
          </div>
          <div className="mt-4">
            <DataTable variant="leads" />
          </div>
        </AppShell>
      ) : null}

      {variant === 'pharmacy' ? (
        <>
          <Hero variant="four-doors" title="Pharmacy without a second queue." description="Scripts on the same floor as therapy and consult." />
          <Services variant="doors" />
          <Contact variant="hours" />
          <CtaBand variant="emergency" />
        </>
      ) : null}

      {variant === 'dealer' ? (
        <>
          <Hero variant="split-cards" title="Bring the partner to the plant." description="The brand that sold the iron stays on the job after handover." />
          <LogoCloud variant="partner" />
          <Services variant="checklist" />
          <Contact variant="branches" />
        </>
      ) : null}

      {variant === 'lab' ? (
        <>
          <Hero variant="device" title="Reports without the waiting room." description="Solum Lab and Lumen Care share a desk. The file arrives before the chair." />
          <Stats variant="ribbon" />
          <News variant="cards" />
          <Contact variant="form" />
        </>
      ) : null}
    </div>
  )
}

const KIT_WOW = {
  'shader-clinic': 'healthcare',
  'globe-agency': 'agency',
  'pin-sports': 'sports',
  'liquid-portal': 'portal',
  'scramble-academy': 'academy',
} as const

export function Kit(props: KitProps) {
  const base = props.variant && isWowVariant('kit', props.variant) ? KIT_WOW[props.variant as keyof typeof KIT_WOW] : null
  if (!base || !props.variant) return <KitCore {...props} />
  return (
    <div data-nexara="kit" data-variant={props.variant} className={cn('space-y-8', props.className)}>
      {props.variant === 'shader-clinic' ? (
        <WowStage shader className="p-6 md:p-10">
          <p className="font-mono text-[11px] text-[#f3c27a]">LUMEN CARE</p>
          <SplitMask text={'Heart care,\nconsidered.'} className="mt-3 font-serif text-5xl leading-[0.9] md:text-7xl" />
        </WowStage>
      ) : null}
      {props.variant === 'globe-agency' ? (
        <div className="grid overflow-hidden rounded-[1.6rem] bg-[#07070c] text-white md:grid-cols-2">
          <div className="p-6 md:p-10">
            <p className="font-mono text-[11px] text-[#f3c27a]">NORTH STUDIO</p>
            <h3 className="mt-3 font-serif text-5xl">Move the furniture.</h3>
          </div>
          <div className="relative min-h-64">
            <GlobeField />
          </div>
        </div>
      ) : null}
      {props.variant === 'pin-sports' ? (
        <ScrollPin height="180vh">
          {(p) => (
            <div className="relative w-full min-h-[22rem] overflow-hidden rounded-[1.6rem]">
              <img src="/media/sports-hero.webp" alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-[#07070c]/45" />
              <div className="relative z-10 p-6 text-white">
                <p className="font-mono text-[11px] text-[#f3c27a]">FIELD ATHLETICS</p>
                <p className="mt-3 font-serif text-5xl">A season you can stand on.</p>
                <p className="mt-4 text-sm text-white/80">{Math.round(p * 16)} events in the medal book.</p>
              </div>
            </div>
          )}
        </ScrollPin>
      ) : null}
      {props.variant === 'liquid-portal' ? (
        <div className="overflow-hidden rounded-[1.6rem] bg-[#07070c] text-white">
          <LazyMesh3D className="min-h-64" />
          <p className="p-6 font-serif text-4xl">The desk after dark.</p>
        </div>
      ) : null}
      {props.variant === 'scramble-academy' ? (
        <WowStage className="p-6 md:p-10">
          <p className="font-mono text-[11px] text-[#f3c27a]">ATLAS ACADEMY</p>
          <ScrambleText text="We grow engineers." className="mt-3 block font-serif text-5xl" />
        </WowStage>
      ) : null}
      <KitCore variant={base} />
    </div>
  )
}
