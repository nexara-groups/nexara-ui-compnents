'use client'

import { MediaFrame, media } from '@/lib/media.tsx'
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
  { name: 'Dr. Anitha Rao', role: 'Cardiologist', place: 'Lumen Care', hours: '09–17', src: media.people.anitha },
  { name: 'Dr. Kiran Reddy', role: 'Therapy lead', place: 'Lumen Care · Suite 2', hours: '10–18', src: media.people.kiran },
  { name: 'Dr. Meera Shah', role: 'Diagnostics', place: 'Solum Lab', hours: '08–16', src: media.people.meera },
  { name: 'Suresh Naidu', role: 'Plant lead', place: 'Harbor Climate', hours: 'Site', src: media.people.suresh },
  { name: 'Latha Iyer', role: 'Academy dean', place: 'Atlas Academy', hours: 'Cohort', src: media.people.latha },
  { name: 'Vikram Hale', role: 'Speed coach', place: 'Field Athletics', hours: 'Dawn', src: media.people.vikram },
]

/**
 * Team
 * Twelve people grids with photographic portraits by default.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
export function Team({ variant = 'doctors', className }: TeamProps) {
  return (
    <section data-nexara="team" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'doctors' || variant === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.slice(0, 6).map((person) => (
            <article key={person.name} className="overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card">
              <MediaFrame src={person.src} alt={person.name} className="aspect-[4/3]" />
              <div className="p-5">
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-nx-muted">{person.role}</p>
                <p className="mt-1 text-xs text-nx-faint">{person.place}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'featured' ? (
        <article className="grid overflow-hidden rounded-[1.6rem] bg-[#0b1220] text-[#f6f1ea] md:grid-cols-[16rem_1fr]">
          <MediaFrame src={people[0]!.src} alt={people[0]!.name} className="min-h-56" />
          <div className="p-6">
            <p className="text-xs tracking-[0.18em] text-[#f3b4b0] uppercase">Medical director</p>
            <p className="mt-2 font-serif text-4xl">{people[0]!.name}</p>
            <p className="mt-3 max-w-md text-sm text-[#c9c2b8]">Reads the file before the first chair. Therapy, consult, and pharmacy sit on her floor.</p>
          </div>
        </article>
      ) : null}

      {variant === 'list' || variant === 'directory' ? (
        <ul className="divide-y divide-nx-border rounded-[1.4rem] border border-nx-border">
          {people.map((person) => (
            <li key={person.name} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
              <span className="flex items-center gap-3">
                <MediaFrame src={person.src} alt="" grain={false} className="size-9 rounded-full" />
                <span className="font-medium">{person.name}</span>
              </span>
              <span className="text-nx-muted">{person.role}</span>
              <span className="text-nx-faint">{person.place}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'crew' ? (
        <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-border md:grid-cols-4">
          {people.slice(0, 4).map((person) => (
            <article key={person.name} className="bg-nx-card">
              <MediaFrame src={person.src} alt={person.name} className="h-32" />
              <div className="p-4">
                <p className="text-xs text-nx-faint">{person.place}</p>
                <p className="mt-2 font-medium">{person.name}</p>
                <p className="text-sm text-nx-muted">{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'faculty' ? (
        <div>
          <p className="text-[11px] tracking-[0.18em] text-nx-accent uppercase">Atlas Academy</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {people.slice(4, 6).concat(people.slice(0, 2)).map((person) => (
              <article key={person.name} className="grid overflow-hidden rounded-2xl border border-nx-border sm:grid-cols-[6rem_1fr]">
                <MediaFrame src={person.src} alt={person.name} className="min-h-24" />
                <div className="p-4">
                  <p className="font-serif text-2xl">{person.name}</p>
                  <p className="mt-1 text-sm text-nx-muted">{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'coaches' ? (
        <div className="overflow-hidden rounded-[1.5rem] bg-[#111113] text-white">
          <MediaFrame src={media.sports} alt="" className="h-28" />
          <div className="p-6">
            <p className="text-[11px] tracking-[0.18em] text-[#c8ff4d] uppercase">Field Athletics bench</p>
            <ul className="mt-4 space-y-3">
              {people.slice(3).map((person) => (
                <li key={person.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-3">
                    <MediaFrame src={person.src} alt="" grain={false} className="size-8 rounded-full" />
                    {person.name}
                  </span>
                  <span className="text-white/55">{person.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {variant === 'circle' ? (
        <div className="flex flex-wrap justify-center gap-6">
          {people.slice(0, 4).map((person) => (
            <article key={person.name} className="w-28 text-center">
              <MediaFrame src={person.src} alt={person.name} grain={false} className="mx-auto size-20 rounded-full" />
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
              <MediaFrame src={person.src} alt="" grain={false} className="size-5 rounded-full" />
              {person.name}
            </span>
          ))}
        </div>
      ) : null}

      {variant === 'editorial' ? (
        <div className="grid gap-8 md:grid-cols-2">
          {people.slice(0, 2).map((person) => (
            <article key={person.name}>
              <MediaFrame src={person.src} alt={person.name} className="mb-4 aspect-[5/3] rounded-[1.4rem]" />
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
                <td className="py-3">
                  <span className="inline-flex items-center gap-2">
                    <MediaFrame src={person.src} alt="" grain={false} className="size-7 rounded-full" />
                    {person.name}
                  </span>
                </td>
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
