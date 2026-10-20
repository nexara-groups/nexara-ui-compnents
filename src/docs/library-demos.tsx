import { Hero } from '@/components/ui/hero.tsx'
import { Navbar } from '@/components/ui/navbar.tsx'
import { Bento } from '@/components/ui/bento.tsx'
import { Pricing } from '@/components/ui/pricing.tsx'
import { Testimonials } from '@/components/ui/testimonials.tsx'
import { Stats } from '@/components/ui/stats.tsx'
import type { HeroVariant } from '@/components/ui/hero.tsx'
import type { NavbarVariant } from '@/components/ui/navbar.tsx'
import type { BentoVariant } from '@/components/ui/bento.tsx'
import type { PricingVariant } from '@/components/ui/pricing.tsx'
import type { TestimonialVariant } from '@/components/ui/testimonials.tsx'
import type { StatsVariant } from '@/components/ui/stats.tsx'
import type { ReactNode } from 'react'

function Door({ children }: { children: ReactNode }) {
  return (
    <a
      href="#hero"
      className="inline-flex h-11 items-center px-4 text-sm"
      style={{ background: 'var(--nx-accent)', color: 'var(--nx-accent-fg)' }}
    >
      {children}
    </a>
  )
}

function Ghost({ children, href = '#hero' }: { children: ReactNode; href?: string }) {
  return (
    <a href={href} className="inline-flex h-11 items-center px-4 text-sm" style={{ border: '1px solid var(--nx-line)' }}>
      {children}
    </a>
  )
}

function Plate({ label, tone = 0 }: { label: string; tone?: number }) {
  const gels = [
    'linear-gradient(135deg, var(--nx-metal), transparent 42%), linear-gradient(210deg, var(--nx-cool), var(--nx-elev))',
    'linear-gradient(160deg, var(--nx-accent), transparent 55%), linear-gradient(var(--nx-elev), var(--nx-bg))',
    'repeating-linear-gradient(90deg, var(--nx-line) 0 1px, transparent 1px 28px), linear-gradient(var(--nx-elev), var(--nx-bg))',
  ]
  return (
    <div className="relative grid h-full min-h-48 w-full place-items-end overflow-hidden p-4" style={{ background: gels[tone % gels.length] }}>
      <span
        className="absolute top-6 left-6 size-16 rounded-full"
        style={{ background: 'var(--nx-accent)', opacity: 0.85 }}
        aria-hidden="true"
      />
      <span className="relative font-mono text-[11px] tracking-[0.16em] uppercase" style={{ color: 'var(--nx-fg)' }}>
        {label}
      </span>
    </div>
  )
}

export function renderHero(id: string) {
  const variant = id as HeroVariant
  return <Hero variant={variant} progress={variant === 'reveal' ? 'none' : undefined} />
}

const navItems = [
  { id: 'work', label: 'Work', href: '#hero', current: true },
  { id: 'notes', label: 'Notes', href: '#bento' },
  { id: 'index', label: 'Index', href: '#stats' },
  { id: 'contact', label: 'Contact', href: '#pricing' },
]

export function renderNavbar(id: string) {
  return (
    <Navbar
      variant={id as NavbarVariant}
      logo={<span className="font-serif text-xl">Mark</span>}
      items={navItems}
      action={<Ghost href="#navbar">Start</Ghost>}
      columns={[
        { id: 'a', title: 'Product', items: navItems.slice(0, 2) },
        { id: 'b', title: 'Library', items: navItems.slice(2) },
      ]}
      sections={[{ id: 'main', label: 'Navigate', items: navItems }]}
      magnify
      defaultOpen={id === 'map' ? 'work' : undefined}
    />
  )
}

const tiles = [
  { id: 'one', title: 'Proof', description: 'The large cell is the argument.', media: <Plate label="01" />, figure: '01' },
  { id: 'two', title: 'Measure', description: 'A supporting tile.', media: <Plate label="02" />, figure: '128' },
  { id: 'three', title: 'Quote', description: 'Another supporting tile.', media: <Plate label="03" />, figure: '04' },
  { id: 'four', title: 'List', description: 'Keep cells uneven on purpose.', media: <Plate label="04" />, figure: '18' },
  { id: 'five', title: 'Crop', description: 'Evidence, not an icon.', media: <Plate label="05" />, figure: '72' },
]

export function renderBento(id: string) {
  return (
    <Bento
      variant={id as BentoVariant}
      eyebrow="Features"
      title="Show the work, not the category."
      description="Unequal cells when one thing matters. Equal cells when it does not."
      tiles={tiles}
    />
  )
}

const plans = [
  {
    id: 'solo',
    name: 'Solo',
    price: '24',
    amount: 24,
    period: 'month',
    features: ['One desk', 'Local export'],
    action: <Door>Start</Door>,
  },
  {
    id: 'studio',
    name: 'Studio',
    price: '64',
    amount: 64,
    featured: true,
    features: ['Shared library', 'Priority export'],
    action: <Door>Start</Door>,
  },
  {
    id: 'house',
    name: 'House',
    price: 'Talk',
    features: ['Seats as needed', 'Review'],
    action: <Ghost href="#pricing">Talk</Ghost>,
    note: 'When the decision is a conversation.',
  },
]

const rows = [
  { id: 'seats', label: 'Seats', values: { solo: '1', studio: '8', house: 'Unlimited' } },
  { id: 'export', label: 'Export', values: { solo: 'Local', studio: 'Priority', house: 'Managed' } },
  { id: 'review', label: 'Review', values: { solo: '—', studio: 'Yes', house: 'Yes' } },
]

export function renderPricing(id: string) {
  return (
    <Pricing
      variant={id as PricingVariant}
      eyebrow="Plans"
      title="Publish the number the buyer can use."
      plans={plans}
      rows={rows}
      chapters={[
        { id: 'seats', label: 'Seats' },
        { id: 'export', label: 'Export' },
      ]}
    />
  )
}

const voices = [
  {
    id: 'a',
    quote: 'The first screen finally held still long enough to decide.',
    name: 'Ada Klein',
    role: 'Studio lead',
    portrait: <Plate label="Ada" />,
    transcript: 'The first screen finally held still long enough to decide.',
  },
  {
    id: 'b',
    quote: 'We pasted one opening and the rest of the page followed.',
    name: 'Jon Reed',
    role: 'Product',
    portrait: <Plate label="Jon" />,
  },
  {
    id: 'c',
    quote: 'Empty stayed empty. That was the whole relief.',
    name: 'Mina Park',
    role: 'Design systems',
    portrait: <Plate label="Mina" />,
  },
  {
    id: 'd',
    quote: 'Tokens did the rebrand. We did not open the file.',
    name: 'Chris Vale',
    role: 'Front-end',
    portrait: <Plate label="Chris" />,
  },
]

export function renderTestimonials(id: string) {
  return (
    <Testimonials
      variant={id as TestimonialVariant}
      eyebrow="Voices"
      title="Let someone else say it."
      items={voices}
    />
  )
}

const figures = [
  { id: 'a', value: 128, label: 'rooms', suffix: '', share: 0.72, series: [12, 28, 34, 48, 62, 80, 128], note: 'Open this week' },
  { id: 'b', value: 18, label: 'minutes', share: 0.4, note: 'Median first pass' },
  { id: 'c', value: 4, label: 'themes', share: 0.25, note: 'Presets shipped' },
  { id: 'd', value: 96, label: 'percent', share: 0.96, note: 'First-frame CTA' },
]

export function renderStats(id: string) {
  return (
    <Stats
      variant={id as StatsVariant}
      eyebrow="Measure"
      title="Figures that earn their size."
      items={figures}
      progress={id === 'cascade' ? 'control' : 'none'}
    />
  )
}
