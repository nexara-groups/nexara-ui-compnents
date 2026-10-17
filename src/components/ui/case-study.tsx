'use client'

import { useEffect, useState } from 'react'
import { cn, focusRing, usePrefersReducedMotion } from '@/lib/utils.ts'

const VARIANTS = [
  'tabs',
  'autoplay',
  'stack',
  'film',
  'split',
  'mosaic',
  'quote',
  'before',
  'logo',
  'index',
  'featured',
  'reel',
] as const

export type CaseStudyVariant = (typeof VARIANTS)[number]

export interface CaseStudyProps {
  variant?: CaseStudyVariant
  className?: string
}

const studies = [
  { id: 'sai', client: 'Sai Nirmaan', line: 'A contractor desk that quotes in a day.', sector: 'Construction' },
  { id: 'happy', client: 'Happy Farms', line: 'Traceable harvest for a farm brand.', sector: 'Agri' },
  { id: 'sri', client: 'Sri Engineering', line: 'HVAC catalogue with a live remote.', sector: 'HVAC' },
  { id: 'rise', client: 'Rise Medical Hub', line: 'Eight chapters for a heart clinic.', sector: 'Care' },
  { id: 'iarsa', client: 'IARSA', line: 'Association portal for a season.', sector: 'Sport' },
  { id: 'quali', client: 'Qualigene', line: 'Lab reports without the waiting room.', sector: 'Lab' },
]

/**
 * Case study
 * Twelve client-story constructions, including the Nexara tabbed carousel.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function CaseStudy({ variant = 'tabs', className }: CaseStudyProps) {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const current = studies[active] ?? studies[0]!

  useEffect(() => {
    if (variant !== 'autoplay' && variant !== 'tabs' && variant !== 'reel') return
    if (reduced) return
    const id = window.setInterval(() => setActive((value) => (value + 1) % studies.length), 4200)
    return () => window.clearInterval(id)
  }, [reduced, variant])

  return (
    <section data-nexara="case-study" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'tabs' || variant === 'autoplay' ? (
        <div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Client projects">
            {studies.map((study, index) => (
              <button
                key={study.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={cn(focusRing, 'rounded-full px-3 py-1.5 text-xs', index === active ? 'bg-nx-fg text-nx-bg' : 'text-nx-muted hover:bg-nx-soft')}
                onClick={() => setActive(index)}
              >
                {study.client}
              </button>
            ))}
          </div>
          <article className="mt-5 min-h-40 rounded-[1.6rem] bg-[#111113] p-8 text-white">
            <p className="text-[11px] tracking-[0.18em] text-[#c8ff4d] uppercase">{current.sector}</p>
            <h3 className="mt-3 font-serif text-4xl">{current.client}</h3>
            <p className="mt-3 max-w-lg text-white/70">{current.line}</p>
          </article>
        </div>
      ) : null}

      {variant === 'stack' ? (
        <div className="relative h-56">
          {studies.slice(0, 3).map((study, index) => (
            <article
              key={study.id}
              className="absolute inset-x-0 rounded-[1.4rem] border border-nx-border bg-nx-card p-6 shadow-[var(--nx-shadow)]"
              style={{ top: index * 16, transform: `scale(${1 - index * 0.04})` }}
            >
              <p className="text-xs text-nx-faint">{study.sector}</p>
              <p className="mt-2 font-serif text-2xl">{study.client}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'film' ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {studies.map((study) => (
            <article key={study.id} className="min-w-[14rem] rounded-[1.3rem] border border-nx-border p-4">
              <div className="mb-4 h-24 rounded-xl bg-[linear-gradient(140deg,#1a1a14,#3a3228)]" />
              <p className="font-medium">{study.client}</p>
              <p className="mt-1 text-sm text-nx-muted">{study.line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'split' ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="min-h-52 rounded-[1.6rem] bg-[linear-gradient(160deg,#102018,#1f7a4a)]" />
          <div>
            <p className="text-xs tracking-[0.18em] text-nx-faint uppercase">{current.sector}</p>
            <h3 className="mt-2 font-serif text-4xl">{current.client}</h3>
            <p className="mt-3 text-sm leading-6 text-nx-muted">{current.line}</p>
          </div>
        </div>
      ) : null}

      {variant === 'mosaic' ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {studies.map((study, index) => (
            <article key={study.id} className={cn('rounded-[1.2rem] border border-nx-border p-4', index === 0 && 'md:col-span-2 md:row-span-2')}>
              <p className="text-xs text-nx-faint">{study.sector}</p>
              <p className={cn('mt-2 font-medium', index === 0 && 'font-serif text-3xl')}>{study.client}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'quote' ? (
        <figure className="max-w-2xl">
          <blockquote className="font-serif text-3xl leading-snug">“{current.line}”</blockquote>
          <figcaption className="mt-4 text-sm text-nx-muted">{current.client}</figcaption>
        </figure>
      ) : null}

      {variant === 'before' ? (
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-[1.3rem] border border-dashed border-nx-line p-5">
            <p className="text-xs text-nx-faint">Before</p>
            <p className="mt-2">Quotes lived in WhatsApp threads.</p>
          </article>
          <article className="rounded-[1.3rem] bg-nx-fg p-5 text-nx-bg">
            <p className="text-xs opacity-60">After</p>
            <p className="mt-2">{current.line}</p>
          </article>
        </div>
      ) : null}

      {variant === 'logo' ? (
        <div className="flex flex-wrap gap-3">
          {studies.map((study, index) => (
            <button
              key={study.id}
              type="button"
              className={cn(focusRing, 'rounded-full border px-4 py-2 text-sm', index === active ? 'border-nx-fg' : 'border-nx-border text-nx-muted')}
              onClick={() => setActive(index)}
            >
              {study.client}
            </button>
          ))}
        </div>
      ) : null}

      {variant === 'index' ? (
        <ol className="divide-y divide-nx-border">
          {studies.map((study, index) => (
            <li key={study.id} className="flex items-baseline justify-between py-3">
              <span className="text-nx-faint">{String(index + 1).padStart(2, '0')}</span>
              <span className="flex-1 px-4">{study.client}</span>
              <span className="text-sm text-nx-muted">{study.sector}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'featured' ? (
        <article className="overflow-hidden rounded-[1.8rem] bg-[#07070a] p-8 text-white">
          <p className="text-[#c8ff4d]">Featured</p>
          <h3 className="mt-4 font-serif text-5xl">{current.client}</h3>
          <p className="mt-4 max-w-md text-white/65">{current.line}</p>
        </article>
      ) : null}

      {variant === 'reel' ? (
        <div>
          <article className="rounded-[1.4rem] border border-nx-border p-6">
            <p className="font-serif text-3xl">{current.client}</p>
            <p className="mt-2 text-sm text-nx-muted">{current.line}</p>
          </article>
          <div className="mt-3 flex justify-center gap-1.5">
            {studies.map((study, index) => (
              <button
                key={study.id}
                type="button"
                aria-label={study.client}
                className={cn(focusRing, 'size-2 rounded-full', index === active ? 'bg-nx-fg' : 'bg-nx-line')}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
