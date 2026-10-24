'use client'

import type { ThemeDefinition, ThemeId, ThemeScheme, ThemeSelection, ThemeSlot } from '@/themes/contract.ts'
import { FieldnoteCta } from '@/themes/fieldnote/cta.tsx'
import { FieldnoteFeatures } from '@/themes/fieldnote/features.tsx'
import { FieldnoteFooter } from '@/themes/fieldnote/footer.tsx'
import { FieldnoteHero } from '@/themes/fieldnote/hero.tsx'
import { FieldnoteNavbar } from '@/themes/fieldnote/navbar.tsx'
import { FieldnotePricing } from '@/themes/fieldnote/pricing.tsx'
import { FieldnoteStats } from '@/themes/fieldnote/stats.tsx'
import { FieldnoteTestimonial } from '@/themes/fieldnote/testimonial.tsx'
import { ScoreWindow, Station } from '@/themes/primitives.tsx'
import { ProgrammeCta } from '@/themes/programme/cta.tsx'
import { ProgrammeFeatures } from '@/themes/programme/features.tsx'
import { ProgrammeFooter } from '@/themes/programme/footer.tsx'
import { ProgrammeHero } from '@/themes/programme/hero.tsx'
import { ProgrammeNavbar } from '@/themes/programme/navbar.tsx'
import { ProgrammePricing } from '@/themes/programme/pricing.tsx'
import { ProgrammeStats } from '@/themes/programme/stats.tsx'
import { ProgrammeTestimonial } from '@/themes/programme/testimonial.tsx'
import { ThemeProvider } from '@/themes/provider.tsx'
import { riversideMix, themes } from '@/themes/themes.ts'
import { TriplicateCta } from '@/themes/triplicate/cta.tsx'
import { type ReactNode, useRef } from 'react'

export const slotThemes: Record<ThemeSlot, ThemeId[]> = {
  navbar: ['fieldnote', 'programme'],
  hero: ['fieldnote', 'programme'],
  features: ['fieldnote', 'programme'],
  stats: ['fieldnote', 'programme'],
  testimonial: ['fieldnote', 'programme'],
  pricing: ['fieldnote', 'programme'],
  cta: ['fieldnote', 'programme', 'triplicate'],
  footer: ['fieldnote', 'programme'],
}

const blocks: Record<string, () => ReactNode> = {
  'fieldnote/navbar': () => <FieldnoteNavbar />,
  'fieldnote/hero': () => <FieldnoteHero />,
  'fieldnote/features': () => <FieldnoteFeatures />,
  'fieldnote/stats': () => <FieldnoteStats />,
  'fieldnote/testimonial': () => <FieldnoteTestimonial />,
  'fieldnote/pricing': () => <FieldnotePricing />,
  'fieldnote/cta': () => <FieldnoteCta />,
  'fieldnote/footer': () => <FieldnoteFooter />,
  'programme/navbar': () => <ProgrammeNavbar />,
  'programme/hero': () => <ProgrammeHero />,
  'programme/features': () => <ProgrammeFeatures />,
  'programme/stats': () => <ProgrammeStats />,
  'programme/testimonial': () => <ProgrammeTestimonial />,
  'programme/pricing': () => <ProgrammePricing />,
  'programme/cta': () => <ProgrammeCta />,
  'programme/footer': () => <ProgrammeFooter />,
  'triplicate/cta': () => <TriplicateCta />,
}

export function ThemeBlock({ theme, slot }: { theme: ThemeId; slot: ThemeSlot }) {
  const render = blocks[`${theme}/${slot}`]
  if (!render) {
    return (
      <p className="px-4 py-10 text-sm" style={{ color: 'var(--nx-muted)' }}>
        {theme} / {slot} is specified and not built yet.
      </p>
    )
  }
  return render()
}

export function ThemeCompose({
  theme,
  scheme,
  selection,
}: {
  theme: ThemeDefinition
  scheme: ThemeScheme
  selection: ThemeSelection
}) {
  const host = useRef<HTMLDivElement>(null)
  return (
    <ThemeProvider theme={theme} scheme={scheme}>
      <div ref={host} id="top" className="relative" data-theme-page={theme.id}>
        {selection.hero === 'fieldnote' ? <Station host={host} /> : null}
        {(Object.keys(selection) as ThemeSlot[]).map((slot) => (
          <ThemeBlock key={slot} theme={selection[slot]} slot={slot} />
        ))}
      </div>
    </ThemeProvider>
  )
}

const full: ThemeSelection = {
  navbar: 'fieldnote',
  hero: 'fieldnote',
  features: 'fieldnote',
  stats: 'fieldnote',
  testimonial: 'fieldnote',
  pricing: 'fieldnote',
  cta: 'fieldnote',
  footer: 'fieldnote',
}

export function FieldnotePage({ scheme = 'light' }: { scheme?: ThemeScheme }) {
  return <ThemeCompose theme={themes.fieldnote} scheme={scheme} selection={full} />
}

const programmeSelection: ThemeSelection = {
  navbar: 'programme',
  hero: 'programme',
  features: 'programme',
  stats: 'programme',
  testimonial: 'programme',
  pricing: 'programme',
  cta: 'programme',
  footer: 'programme',
}

export function ProgrammePage({ scheme = 'light' }: { scheme?: ThemeScheme }) {
  return <ThemeCompose theme={themes.programme} scheme={scheme} selection={programmeSelection} />
}

export function mixSelection(): ThemeSelection {
  return {
    navbar: 'programme',
    hero: 'fieldnote',
    features: 'programme',
    stats: 'fieldnote',
    testimonial: 'programme',
    pricing: 'programme',
    cta: 'triplicate',
    footer: 'fieldnote',
  }
}

export function MixPage({ scheme = 'light' }: { scheme?: ThemeScheme }) {
  const host = useRef<HTMLDivElement>(null)
  return (
    <ThemeProvider theme={riversideMix} scheme={scheme}>
      <div ref={host} id="top" className="relative" data-theme-page="mix">
        <Station host={host} />
        <ProgrammeNavbar name="Riverside" issue="Club sheet · Saturday" />
        <p className="mx-auto flex max-w-6xl items-end gap-4 px-4 pt-8 md:px-8">
          <span className="nx-display text-5xl leading-none md:text-7xl">
            <ScoreWindow value="2–1" play />
          </span>
          <span className="nx-display text-3xl leading-none md:text-5xl">Harbour</span>
        </p>
        <FieldnoteHero
          station={false}
          kicker="How a place is taken"
          title="The sheet is the season."
          lede="Age group, kickoff, and the fee sit on the row. The tape marks the team you are reading. The form at the end is the same sheet the desk files."
          actions={[]}
          rows={[
            { id: 'u10', time: '09:30', label: 'Under 10', note: 'Pitch 3 · gate £4' },
            { id: 'u12', time: '11:00', label: 'Under 12', note: 'Pitch 2 · gate £6' },
            { id: 'u14', time: '13:30', label: 'Under 14', note: 'Away at Marsh' },
          ]}
        />
        <ProgrammeFeatures />
        <FieldnoteStats
          kicker="This season"
          title="Figures a parent can check."
          items={[
            { id: 'played', value: '18', label: 'Played', note: 'First team' },
            { id: 'won', value: '14', label: 'Won', note: 'Home and away' },
            { id: 'drawn', value: '2', label: 'Drawn', note: 'Both at the Marsh' },
            { id: 'fee', value: '£6', label: 'Typical gate', note: 'On the fixture row' },
          ]}
        />
        <ProgrammeTestimonial />
        <ProgrammePricing />
        <TriplicateCta
          institution="Riverside Athletic"
          kicker="Registration"
          title="File the player. The pink sheet already says Filed."
          action="File the player"
          fields={[
            { name: 'player', label: 'Player name' },
            { name: 'age', label: 'Age group' },
          ]}
        />
        <FieldnoteFooter
          name="Riverside Athletic"
          lines={['The Marsh Pavilion', 'Riverside Walk', 'London E3 4QA']}
          districts={['U10', 'U12', 'U14', 'U16']}
          licences={['Charity 1182044', 'Tue and Thu, 18:00', 'Gate from £4']}
          links={[
            { href: '#fixtures', label: 'Fixtures' },
            { href: '#membership', label: 'Membership' },
            { href: '#register', label: 'Register' },
          ]}
        />
      </div>
    </ThemeProvider>
  )
}

export function ThemeShot({ id, scheme = 'light' }: { id: string; scheme?: ThemeScheme }) {
  let page: ReactNode
  if (id === 'programme') page = <ProgrammePage scheme={scheme} />
  else if (id === 'mix') page = <MixPage scheme={scheme} />
  else page = <FieldnotePage scheme={scheme} />
  return <div className="min-h-svh" data-theme-shot={id}>{page}</div>
}
