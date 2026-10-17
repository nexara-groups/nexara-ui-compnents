'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'checklist',
  'four-crews',
  'doors',
  'cards',
  'numbered',
  'icons',
  'rows',
  'hover',
  'compact',
  'partner',
  'why',
  'disciplines',
] as const

export type ServicesVariant = (typeof VARIANTS)[number]

export interface ServicesProps {
  variant?: ServicesVariant
  className?: string
}

const hvac = [
  { name: 'VRF / VRV', items: ['Daikin, Voltas, O General', 'Load calc on site', 'Commissioning report'] },
  { name: 'Ductable', items: ['False-ceiling routes', 'Static pressure', 'Filter schedule'] },
  { name: 'Cassette', items: ['Four-way throw', 'Condensate pumps', 'Quiet night set'] },
  { name: 'Chillers', items: ['Air and water cooled', 'Plant room', 'BMS handshake'] },
]

const crews = [
  ['01', 'Design', 'Load, duct, and plant drawings.'],
  ['02', 'Install', 'Copper, drain, and indoor set.'],
  ['03', 'Commission', 'Gas, amp, and handover book.'],
  ['04', 'AMC', 'Quarterly wash and leak walk.'],
]

const doors = [
  ['EECP Therapy', 'Non-invasive sessions, booked by name.'],
  ['Diagnostics', 'ECG, echo, and blood work on the same floor.'],
  ['Pharmacy', 'Cardiac scripts without a second queue.'],
  ['OPD', 'Sixteen specialists, one reception.'],
]

const why = [
  ['01', 'Named lead', 'A person answers the brief, not a desk.'],
  ['02', 'Weekly demo', 'You see the room before it ships.'],
  ['03', 'Plant book', 'Every site leaves with a commissioning pack.'],
  ['04', 'Dealer line', 'Voltas, Daikin, Dunham-Bush, O General.'],
]

const discs = ['Speed skating', 'Artistic', 'Inline hockey', 'Alpine', 'Figure', 'Short track']

/**
 * Services
 * Twelve service grids: HVAC checklists, four crews, clinic doors, why-us.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Services({ variant = 'checklist', className }: ServicesProps) {
  return (
    <section data-nexara="services" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'checklist' ? (
        <div className="grid gap-4 md:grid-cols-2">
          {hvac.map((service) => (
            <article key={service.name} className="rounded-[1.4rem] border border-nx-border bg-nx-card p-5">
              <span className="grid size-9 place-items-center rounded-lg bg-[#e8f3ec] text-sm text-[#1f7a4a]">❄</span>
              <h3 className="mt-4 font-serif text-2xl">{service.name}</h3>
              <ul className="mt-4 space-y-2 text-sm text-nx-muted">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-nx-ok">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'four-crews' ? (
        <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-border sm:grid-cols-2 lg:grid-cols-4">
          {crews.map(([index, name, line]) => (
            <article key={name} className="bg-nx-card p-5">
              <p className="text-[11px] text-nx-accent">{index}</p>
              <p className="mt-3 font-medium">{name}</p>
              <p className="mt-2 text-sm text-nx-muted">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'doors' ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {doors.map(([name, line], index) => (
            <article key={name} className="rounded-[1.5rem] border border-nx-border p-5">
              <p className="text-[11px] text-nx-faint">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-3 font-serif text-2xl">{name}</p>
              <p className="mt-2 text-sm text-nx-muted">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'cards' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {hvac.slice(0, 3).map((service) => (
            <article key={service.name} className="rounded-[1.4rem] bg-nx-fg p-6 text-nx-bg">
              <p className="font-serif text-3xl">{service.name}</p>
              <p className="mt-3 text-sm opacity-70">{service.items[0]}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'numbered' || variant === 'why' ? (
        <ol className="grid gap-4 md:grid-cols-2">
          {why.map(([index, name, line]) => (
            <li key={name} className="flex gap-4">
              <span className="font-serif text-3xl text-nx-faint">{index}</span>
              <div>
                <p className="font-medium">{name}</p>
                <p className="mt-1 text-sm text-nx-muted">{line}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'icons' ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {crews.map(([, name, line]) => (
            <article key={name} className="rounded-2xl border border-nx-border p-4">
              <span className="grid size-9 place-items-center rounded-lg bg-nx-soft text-nx-accent">◇</span>
              <p className="mt-3 font-medium">{name}</p>
              <p className="mt-1 text-sm text-nx-muted">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'rows' ? (
        <ul className="divide-y divide-nx-border">
          {hvac.map((service) => (
            <li key={service.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <p className="font-serif text-2xl">{service.name}</p>
              <p className="text-sm text-nx-muted">{service.items.join(' · ')}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'hover' ? (
        <div className="grid gap-3 md:grid-cols-2">
          {doors.map(([name, line]) => (
            <article key={name} className="group rounded-[1.3rem] border border-nx-border p-5 transition-colors hover:bg-nx-fg hover:text-nx-bg">
              <p className="font-medium">{name}</p>
              <p className="mt-2 text-sm text-nx-muted group-hover:text-white/70">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'compact' ? (
        <div className="flex flex-wrap gap-2">
          {hvac.map((service) => (
            <span key={service.name} className="rounded-full border border-nx-border px-3 py-1.5 text-sm">
              {service.name}
            </span>
          ))}
        </div>
      ) : null}

      {variant === 'partner' ? (
        <div className="rounded-[1.5rem] border border-nx-border p-6">
          <p className="text-[11px] tracking-[0.18em] text-nx-faint uppercase">Partner collaboration</p>
          <p className="mt-3 font-serif text-3xl">Dealers stay on the job after handover.</p>
          <p className="mt-3 max-w-xl text-sm text-nx-muted">
            Sri Engineering runs the plant with the brand that sold the iron. Warranty and AMC stay in one book.
          </p>
        </div>
      ) : null}

      {variant === 'disciplines' ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {discs.map((name) => (
            <article key={name} className="rounded-2xl bg-nx-elevated p-4">
              <p className="font-medium">{name}</p>
              <p className="mt-1 text-xs text-nx-muted">VDRSA registered</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
