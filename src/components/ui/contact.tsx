'use client'

import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'branches',
  'map',
  'appointment',
  'split',
  'offices',
  'hours',
  'form',
  'directions',
  'emergency',
  'studio',
  'compact',
  'visit',
] as const

export type ContactVariant = (typeof VARIANTS)[number]

export interface ContactProps {
  variant?: ContactVariant
  className?: string
}

const branches = [
  { city: 'Hyderabad', line: 'Banjara Hills plant desk', phone: '+91 40 4000 1200' },
  { city: 'Visakhapatnam', line: 'Madhurawada service bay', phone: '+91 891 270 4411' },
  { city: 'Vijayawada', line: 'Dealer collab floor', phone: '+91 866 243 8800' },
]

/**
 * Contact
 * Twelve branch, map, and appointment constructions.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Contact({ variant = 'branches', className }: ContactProps) {
  return (
    <section data-nexara="contact" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'branches' || variant === 'offices' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {branches.map((branch) => (
            <article key={branch.city} className="rounded-[1.4rem] border border-nx-border bg-nx-card p-5">
              <p className="text-xs text-nx-faint">Branch</p>
              <h3 className="mt-2 font-serif text-2xl">{branch.city}</h3>
              <p className="mt-2 text-sm text-nx-muted">{branch.line}</p>
              <p className="mt-3 text-sm">{branch.phone}</p>
              <a className={cn(focusRing, 'mt-4 inline-flex text-sm text-nx-accent')} href="#contact">
                Directions
              </a>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'map' || variant === 'visit' ? (
        <article className="overflow-hidden rounded-[1.6rem] border border-nx-border">
          <div className="relative h-48 bg-[linear-gradient(180deg,#d7e4dc,#c5d0c8)]">
            <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nx-danger" />
            <span className="absolute top-1/2 left-1/2 h-10 w-px -translate-x-1/2 -translate-y-full bg-nx-danger" />
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">Rise Medical Hub</p>
              <p className="text-sm text-nx-muted">Madhurawada, Visakhapatnam</p>
            </div>
            <a className={cn(focusRing, 'rounded-full bg-nx-fg px-3 py-1.5 text-xs text-nx-bg')} href="#contact">
              Open map
            </a>
          </div>
        </article>
      ) : null}

      {variant === 'appointment' ? (
        <div className="rounded-[1.6rem] bg-[#0b1220] p-6 text-[#f6f1ea]">
          <p className="text-xs tracking-[0.18em] text-[#f3b4b0] uppercase">Book a chair</p>
          <h3 className="mt-3 font-serif text-4xl">Same-day OPD if the file is in by noon.</h3>
          <form className="mt-6 grid gap-3 md:grid-cols-2">
            <label className="text-sm">
              Name
              <input className={cn(focusRing, 'mt-1 h-11 w-full rounded-xl bg-white/10 px-3')} defaultValue="Ravi Teja" />
            </label>
            <label className="text-sm">
              Phone
              <input className={cn(focusRing, 'mt-1 h-11 w-full rounded-xl bg-white/10 px-3')} defaultValue="+91" />
            </label>
            <button type="button" className={cn(focusRing, 'md:col-span-2 h-11 rounded-xl bg-[#f3b4b0] text-[#0b1220]')}>
              Request a slot
            </button>
          </form>
        </div>
      ) : null}

      {variant === 'split' ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-4xl">Come to the plant.</h3>
            <p className="mt-3 text-sm text-nx-muted">Hyderabad answers weekday mornings. Vizag holds the service bay.</p>
          </div>
          <ul className="space-y-3 text-sm">
            {branches.map((branch) => (
              <li key={branch.city} className="rounded-2xl border border-nx-border px-4 py-3">
                <p className="font-medium">{branch.city}</p>
                <p className="text-nx-muted">{branch.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {variant === 'hours' ? (
        <table className="w-full text-sm">
          <tbody>
            {[
              ['OPD', '09:00 – 17:00'],
              ['EECP', '08:00 – 20:00'],
              ['Pharmacy', '08:00 – 22:00'],
              ['Emergency desk', '24 hours'],
            ].map(([label, value]) => (
              <tr key={label} className="border-t border-nx-border">
                <td className="py-3">{label}</td>
                <td className="text-right text-nx-muted">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {variant === 'form' ? (
        <form className="grid max-w-lg gap-3">
          <input className={cn(focusRing, 'h-11 rounded-xl border border-nx-line bg-nx-card px-3')} placeholder="Work email" />
          <textarea className={cn(focusRing, 'min-h-28 rounded-xl border border-nx-line bg-nx-card px-3 py-2')} placeholder="The brief" />
          <button type="button" className={cn(focusRing, 'h-11 rounded-xl bg-nx-fg text-nx-bg')}>
            Send to the desk
          </button>
        </form>
      ) : null}

      {variant === 'directions' ? (
        <article className="rounded-[1.4rem] border border-nx-border p-5">
          <p className="text-xs text-nx-faint">From Maddilapalem</p>
          <p className="mt-2 font-serif text-2xl">12 minutes to the Madhurawada bay.</p>
          <p className="mt-2 text-sm text-nx-muted">NH16 north, left after the IT SEZ signal. Service gate on the east side.</p>
        </article>
      ) : null}

      {variant === 'emergency' ? (
        <div className="rounded-[1.4rem] bg-nx-danger px-5 py-6 text-white">
          <p className="text-xs uppercase tracking-[0.16em]">Cardiac desk</p>
          <p className="mt-2 font-serif text-3xl">Call the 24h line</p>
          <p className="mt-2 text-lg">+91 891 270 4499</p>
        </div>
      ) : null}

      {variant === 'studio' ? (
        <div className="rounded-[1.5rem] bg-[#07070a] p-6 text-white">
          <p className="text-[#c8ff4d]">Nexara studio</p>
          <p className="mt-3 font-serif text-4xl">Write the brief. We answer from Hyderabad.</p>
          <p className="mt-3 text-sm text-white/60">hello@nexaragroups.com</p>
        </div>
      ) : null}

      {variant === 'compact' ? (
        <p className="text-sm">
          <span className="font-medium">Hyderabad · Vizag · Vijayawada</span>
          <span className="text-nx-muted"> — ask for the plant desk</span>
        </p>
      ) : null}
    </section>
  )
}
