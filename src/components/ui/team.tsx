'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'doctors',
  'grid',
  'featured',
  'list',
  'crew',
  'faculty',
  'coaches',
  'circle',
  'directory',
  'compact',
  'editorial',
  'hours',
] as const

export type TeamVariant = (typeof VARIANTS)[number]

export interface TeamProps {
  variant?: TeamVariant
  className?: string
}

const people = [
  { name: 'Dr. Anitha Rao', role: 'Cardiologist', place: 'Rise · Madhurawada', hours: '09–17', initials: 'AR' },
  { name: 'Dr. Kiran Reddy', role: 'EECP lead', place: 'Rise · OPD 2', hours: '10–18', initials: 'KR' },
  { name: 'Dr. Meera Shah', role: 'Diagnostics', place: 'Lab floor', hours: '08–16', initials: 'MS' },
  { name: 'Suresh Naidu', role: 'Plant lead', place: 'Sri · Vizag', hours: 'Site', initials: 'SN' },
  { name: 'Latha Iyer', role: 'Academy dean', place: 'Nexara Academy', hours: 'Cohort', initials: 'LI' },
  { name: 'Coach Vikram', role: 'Speed skating', place: 'VDRSA', hours: 'Dawn', initials: 'VK' },
]

const tone = ['#4c46e0', '#1f7a4a', '#b45309', '#0b1220', '#111113', '#7c6cff']

/**
 * Team
 * Twelve people grids: clinic doctors, HVAC crews, coaches, faculty.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Team({ variant = 'doctors', className }: TeamProps) {
  return (
    <section data-nexara="team" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'doctors' || variant === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.slice(0, 6).map((person, index) => (
            <article key={person.name} className="rounded-[1.4rem] border border-nx-border bg-nx-card p-5">
              <span className="grid size-12 place-items-center rounded-full text-sm text-white" style={{ background: tone[index] }}>
                {person.initials}
              </span>
              <p className="mt-4 font-medium">{person.name}</p>
              <p className="text-sm text-nx-muted">{person.role}</p>
              <p className="mt-1 text-xs text-nx-faint">{person.place}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'featured' ? (
        <article className="grid gap-6 rounded-[1.6rem] bg-[#0b1220] p-6 text-[#f6f1ea] md:grid-cols-[auto_1fr]">
          <span className="grid size-24 place-items-center rounded-full bg-[#f3b4b0] text-2xl text-[#0b1220]">AR</span>
          <div>
            <p className="text-xs tracking-[0.18em] text-[#f3b4b0] uppercase">Medical director</p>
            <p className="mt-2 font-serif text-4xl">Dr. Anitha Rao</p>
            <p className="mt-3 max-w-md text-sm text-[#c9c2b8]">Reads the file before the first chair. EECP, OPD, and the pharmacy sit on her floor.</p>
          </div>
        </article>
      ) : null}

      {variant === 'list' || variant === 'directory' ? (
        <ul className="divide-y divide-nx-border rounded-[1.4rem] border border-nx-border">
          {people.map((person) => (
            <li key={person.name} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
              <span className="font-medium">{person.name}</span>
              <span className="text-nx-muted">{person.role}</span>
              <span className="text-nx-faint">{person.place}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'crew' ? (
        <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-border md:grid-cols-4">
          {people.slice(0, 4).map((person) => (
            <article key={person.name} className="bg-nx-card p-4">
              <p className="text-xs text-nx-faint">{person.place}</p>
              <p className="mt-2 font-medium">{person.name}</p>
              <p className="text-sm text-nx-muted">{person.role}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'faculty' ? (
        <div>
          <p className="text-[11px] tracking-[0.18em] text-nx-accent uppercase">Academy</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {people.slice(4, 6).concat(people.slice(0, 2)).map((person) => (
              <article key={person.name} className="rounded-2xl border border-nx-border p-4">
                <p className="font-serif text-2xl">{person.name}</p>
                <p className="mt-1 text-sm text-nx-muted">{person.role}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'coaches' ? (
        <div className="rounded-[1.5rem] bg-[#111113] p-6 text-white">
          <p className="text-[11px] tracking-[0.18em] text-[#c8ff4d] uppercase">VDRSA bench</p>
          <ul className="mt-4 space-y-3">
            {people.slice(3).map((person) => (
              <li key={person.name} className="flex justify-between text-sm">
                <span>{person.name}</span>
                <span className="text-white/55">{person.role}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {variant === 'circle' ? (
        <div className="flex flex-wrap justify-center gap-6">
          {people.slice(0, 4).map((person, index) => (
            <article key={person.name} className="w-28 text-center">
              <span className="mx-auto grid size-20 place-items-center rounded-full text-white" style={{ background: tone[index] }}>
                {person.initials}
              </span>
              <p className="mt-3 text-sm font-medium">{person.name.split(' ').slice(-1)}</p>
              <p className="text-xs text-nx-muted">{person.role}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'compact' ? (
        <div className="flex flex-wrap gap-2">
          {people.map((person) => (
            <span key={person.name} className="inline-flex items-center gap-2 rounded-full border border-nx-border px-3 py-1.5 text-xs">
              <span className="size-5 rounded-full bg-nx-soft" />
              {person.name}
            </span>
          ))}
        </div>
      ) : null}

      {variant === 'editorial' ? (
        <div className="grid gap-8 md:grid-cols-2">
          {people.slice(0, 2).map((person) => (
            <article key={person.name}>
              <p className="font-serif text-4xl">{person.name}</p>
              <p className="mt-2 text-sm text-nx-muted">
                {person.role} · {person.place}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'hours' ? (
        <table className="w-full text-left text-sm">
          <thead className="text-xs tracking-[0.14em] text-nx-faint uppercase">
            <tr>
              <th className="py-2">Name</th>
              <th>Desk</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {people.slice(0, 4).map((person) => (
              <tr key={person.name} className="border-t border-nx-border">
                <td className="py-3">{person.name}</td>
                <td className="text-nx-muted">{person.place}</td>
                <td>{person.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </section>
  )
}
