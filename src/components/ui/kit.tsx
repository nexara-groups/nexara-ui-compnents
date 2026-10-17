'use client'

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
] as const

export type KitVariant = (typeof VARIANTS)[number]

export interface KitProps {
  variant?: KitVariant
  className?: string
}

const faq = [
  { id: 'a', title: 'Do you take walk-ins?', content: 'OPD takes walk-ins before noon. EECP is named and booked.' },
  { id: 'b', title: 'Which brands do you install?', content: 'Voltas, Daikin, Dunham-Bush, and O General, with the dealer on the job.' },
  { id: 'c', title: 'How do clubs join VDRSA?', content: 'Write the desk. Affiliation is seasonal and named to a coach.' },
]

/**
 * Kit
 * Twelve industry pages composed from the section and app blocks.
 * Look up `kit / healthcare`, `kit / hvac`, `kit / sports`.
 * Copy this file plus every imported block and `src/lib/utils.ts`.
 */
export function Kit({ variant = 'healthcare', className }: KitProps) {
  return (
    <div data-nexara="kit" data-variant={variant} className={cn('space-y-10', className)}>
      {variant === 'healthcare' ? (
        <>
          <Hero variant="clinic" title="Heart care, considered." description="Sixteen specialists, four doors, one floor in Madhurawada." actions={<Button variant="soft">Book a chair</Button>} />
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
          <Hero variant="ac-remote" title="Cooling that stays commissioned." description="Hyderabad, Visakhapatnam, Vijayawada. The remote is the brief." actions={<Button>Ask for a plant walk</Button>} />
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
          <Hero variant="sports" title="A season you can stand on." description="Skaters, clubs, coaches, and a medal book that updates on the night." actions={<Button variant="flow">See the championships</Button>} />
          <Stats variant="sports" />
          <Countdown variant="event" />
          <Leaderboard variant="medals" />
          <Services variant="disciplines" />
          <News variant="bulletin" />
          <CtaBand variant="event" />
        </>
      ) : null}

      {variant === 'association' ? (
        <>
          <Hero variant="sports" title="VDRSA is the book of the season." description="Affiliation is named to a coach. Medals post the same night." actions={<Button>Write the desk</Button>} />
          <Team variant="coaches" />
          <Leaderboard variant="clubs" />
          <News variant="digest" />
          <Accordion variant="faq" items={faq} />
        </>
      ) : null}

      {variant === 'events' ? (
        <>
          <Hero variant="sports" title="State championships, Vizag Indoor." description="Lanes, heats, and a podium that clears before midnight." actions={<Button variant="flow">Reserve a lane</Button>} />
          <Countdown variant="poster" />
          <Leaderboard variant="live" />
          <News variant="alert" />
          <CtaBand variant="event" />
        </>
      ) : null}

      {variant === 'agency' ? (
        <>
          <Hero variant="wordmark" title="NEXARA" description="An engineering company. Academy, Labs, and Marketing under one roof." actions={<Button variant="swap">Start a brief</Button>} />
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
          <Hero variant="editorial" title="We grow engineers." description="Cohorts write the brief, ship a weekly demo, and leave with a named lead." actions={<Button>Join the next room</Button>} />
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
          <Hero variant="four-doors" title="Pharmacy without a second queue." description="Cardiac scripts on the same floor as EECP and OPD." />
          <Services variant="doors" />
          <Contact variant="hours" />
          <CtaBand variant="emergency" />
        </>
      ) : null}

      {variant === 'dealer' ? (
        <>
          <Hero variant="split-cards" title="Bring the dealer to the plant." description="The brand that sold the iron stays on the job after handover." />
          <LogoCloud variant="partner" />
          <Services variant="checklist" />
          <Contact variant="branches" />
        </>
      ) : null}

      {variant === 'lab' ? (
        <>
          <Hero variant="device" title="Reports without the waiting room." description="Qualigene and Rise share a desk. The file arrives before the chair." />
          <Stats variant="ribbon" />
          <News variant="cards" />
          <Contact variant="form" />
        </>
      ) : null}
    </div>
  )
}
