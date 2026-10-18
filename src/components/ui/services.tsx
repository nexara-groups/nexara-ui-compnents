'use client'

import { MediaFrame, media } from '@/lib/media.tsx'
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

const climate = [
  { name: 'VRF rooms', items: ['Load calc on site', 'Quiet night set', 'Commissioning book'], src: media.climate },
  { name: 'Ducted lines', items: ['Ceiling routes', 'Static pressure', 'Filter schedule'], src: media.device },
  { name: 'Cassette', items: ['Four-way throw', 'Condensate pumps', 'Night set'], src: media.glass },
  { name: 'Plant', items: ['Air and water cooled', 'Plant room', 'BMS handshake'], src: media.cases.climate },
]

const crews = [
  ['01', 'Design', 'Load, duct, and plant drawings.', media.device],
  ['02', 'Install', 'Copper, drain, and indoor set.', media.climate],
  ['03', 'Commission', 'Gas, amp, and handover book.', media.cases.build],
  ['04', 'AMC', 'Quarterly wash and leak walk.', media.editorial[3]],
] as const

const doors = [
  { name: 'Therapy', line: 'Named sessions, booked by person.', src: media.doors.therapy },
  { name: 'Consult', line: 'The file is read before the door.', src: media.doors.consult },
  { name: 'Pharmacy', line: 'Scripts without a second queue.', src: media.doors.pharmacy },
  { name: 'Lab', line: 'Sample and report stay on this floor.', src: media.doors.lab },
]

const why = [
  ['01', 'Named lead', 'A person answers the brief, not a desk.'],
  ['02', 'Weekly demo', 'You see the room before it ships.'],
  ['03', 'Plant book', 'Every site leaves with a commissioning pack.'],
  ['04', 'Partner line', 'Kite, Solum, Nimbus, and Vale stay on the job.'],
]

const discs = [
  { name: 'Track', src: media.sports },
  { name: 'Court', src: media.cases.track },
  { name: 'Field', src: media.field },
  { name: 'Pool', src: media.doors.therapy },
  { name: 'Studio', src: media.featured },
  { name: 'Climb', src: media.cases.build },
]

/**
 * Services
 * Twelve service grids with photographic wells, not empty cards.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
export function Services({ variant = 'checklist', className }: ServicesProps) {
  return (
    <section data-nexara="services" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'checklist' ? (
        <div className="grid gap-4 md:grid-cols-2">
          {climate.map((service) => (
            <article key={service.name} className="overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card">
              <MediaFrame src={service.src} alt={service.name} className="h-28" />
              <div className="p-5">
                <h3 className="font-serif text-2xl">{service.name}</h3>
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
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'four-crews' ? (
        <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-border sm:grid-cols-2 lg:grid-cols-4">
          {crews.map(([index, name, line, src]) => (
            <article key={name} className="bg-nx-card">
              <MediaFrame src={src} alt="" className="h-24" />
              <div className="p-5">
                <p className="text-[11px] text-nx-accent">{index}</p>
                <p className="mt-3 font-medium">{name}</p>
                <p className="mt-2 text-sm text-nx-muted">{line}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'doors' ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {doors.map((door, index) => (
            <article key={door.name} className="overflow-hidden rounded-[1.5rem] border border-nx-border">
              <MediaFrame src={door.src} alt={door.name} className="h-32" />
              <div className="p-5">
                <p className="text-[11px] text-nx-faint">{String(index + 1).padStart(2, '0')}</p>
                <p className="mt-3 font-serif text-2xl">{door.name}</p>
                <p className="mt-2 text-sm text-nx-muted">{door.line}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'cards' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {climate.slice(0, 3).map((service) => (
            <article key={service.name} className="overflow-hidden rounded-[1.4rem] bg-nx-fg text-nx-bg">
              <MediaFrame src={service.src} alt="" className="h-28" />
              <div className="p-6">
                <p className="font-serif text-3xl">{service.name}</p>
                <p className="mt-3 text-sm opacity-70">{service.items[0]}</p>
              </div>
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
          {crews.map(([, name, line, src]) => (
            <article key={name} className="overflow-hidden rounded-2xl border border-nx-border">
              <MediaFrame src={src} alt="" className="h-20" />
              <div className="p-4">
                <p className="font-medium">{name}</p>
                <p className="mt-1 text-sm text-nx-muted">{line}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'rows' ? (
        <ul className="divide-y divide-nx-border">
          {climate.map((service) => (
            <li key={service.name} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <span className="flex items-center gap-3">
                <MediaFrame src={service.src} alt="" className="size-12 rounded-xl" />
                <p className="font-serif text-2xl">{service.name}</p>
              </span>
              <p className="text-sm text-nx-muted">{service.items.join(' · ')}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'hover' ? (
        <div className="grid gap-3 md:grid-cols-2">
          {doors.map((door) => (
            <article key={door.name} className="group overflow-hidden rounded-[1.3rem] border border-nx-border">
              <MediaFrame src={door.src} alt="" className="h-28" />
              <div className="p-5 transition-colors group-hover:bg-nx-fg group-hover:text-nx-bg">
                <p className="font-medium">{door.name}</p>
                <p className="mt-2 text-sm text-nx-muted group-hover:text-white/70">{door.line}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'compact' ? (
        <div className="flex flex-wrap gap-2">
          {climate.map((service) => (
            <span key={service.name} className="inline-flex items-center gap-2 rounded-full border border-nx-border px-3 py-1.5 text-sm">
              <MediaFrame src={service.src} alt="" grain={false} className="size-6 rounded-full" />
              {service.name}
            </span>
          ))}
        </div>
      ) : null}

      {variant === 'partner' ? (
        <div className="overflow-hidden rounded-[1.5rem] border border-nx-border">
          <MediaFrame src={media.climate} alt="" className="h-36" />
          <div className="p-6">
            <p className="text-[11px] tracking-[0.18em] text-nx-faint uppercase">Partner collaboration</p>
            <p className="mt-3 font-serif text-3xl">Partners stay on the job after handover.</p>
            <p className="mt-3 max-w-xl text-sm text-nx-muted">
              Harbor Climate runs the plant with the brand that sold the iron. Warranty and AMC stay in one book.
            </p>
          </div>
        </div>
      ) : null}

      {variant === 'disciplines' ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {discs.map((item) => (
            <article key={item.name} className="overflow-hidden rounded-2xl bg-nx-elevated">
              <MediaFrame src={item.src} alt={item.name} className="h-24" />
              <div className="p-4">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-xs text-nx-muted">Field Athletics registered</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
