'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { useEffect, useState } from 'react'
import { MediaFrame, media } from '@/lib/media.tsx'
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
  'scroll-film',
  'shared-morph',
  'glare-stack',
  'path-index',
] as const

export type CaseStudyVariant = (typeof VARIANTS)[number]

export interface CaseStudyProps {
  variant?: CaseStudyVariant
  className?: string
}

const studies = [
  { id: 'wren', client: 'Wren Build', line: 'A contractor desk that quotes in a day.', sector: 'Construction', src: media.cases.build },
  { id: 'grove', client: 'Grove Farms', line: 'Traceable harvest for a farm brand.', sector: 'Agri', src: media.cases.farm },
  { id: 'harbor', client: 'Harbor Climate', line: 'A live remote beside the plant book.', sector: 'Climate', src: media.cases.climate },
  { id: 'lumen', client: 'Lumen Care', line: 'Eight chapters for a private clinic.', sector: 'Care', src: media.cases.care },
  { id: 'field', client: 'Field Athletics', line: 'A season desk that posts the same night.', sector: 'Sport', src: media.cases.track },
  { id: 'solum', client: 'Solum Lab', line: 'Reports without the waiting room.', sector: 'Lab', src: media.cases.lab },
  { id: 'vale', client: 'Vale Voice', line: 'A desk that answers in the caller language.', sector: 'Voice', src: media.cases.voice },
]

/**
 * Case study
 * Twelve client-story constructions with photographic stills and a pause control.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
function CaseStudyCore({ variant = 'tabs', className }: CaseStudyProps) {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = studies[active] ?? studies[0]!
  const looping = variant === 'autoplay' || variant === 'tabs' || variant === 'reel'

  useEffect(() => {
    if (!looping || reduced || paused) return
    const id = window.setInterval(() => setActive((value) => (value + 1) % studies.length), 4200)
    return () => window.clearInterval(id)
  }, [looping, paused, reduced])

  return (
    <section data-nexara="case-study" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'tabs' || variant === 'autoplay' ? (
        <div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Client projects">
            {studies.map((study, index) => (
              <button
                key={study.id}
                id={`case-tab-${study.id}`}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-controls={`case-panel-${study.id}`}
                tabIndex={index === active ? 0 : -1}
                className={cn(focusRing, 'inline-flex min-h-11 items-center rounded-full px-3 text-xs', index === active ? 'bg-nx-fg text-nx-bg' : 'text-nx-muted hover:bg-nx-soft')}
                onClick={() => {
                  setActive(index)
                  setPaused(true)
                }}
                onKeyDown={(event) => {
                  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
                  event.preventDefault()
                  const delta = event.key === 'ArrowRight' ? 1 : -1
                  const next = (index + delta + studies.length) % studies.length
                  setActive(next)
                  setPaused(true)
                  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
                }}
              >
                {study.client}
              </button>
            ))}
          </div>
          {looping ? (
            <button
              type="button"
              aria-pressed={!paused}
              className={cn(focusRing, 'mt-3 inline-flex min-h-11 min-w-11 items-center px-2 text-xs text-nx-muted')}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? 'Play cases' : 'Pause cases'}
            </button>
          ) : null}
          <article
            id={`case-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`case-tab-${current.id}`}
            className="mt-5 grid min-h-48 overflow-hidden rounded-[1.6rem] bg-[#111113] text-white md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="p-8">
              <p className="text-[11px] tracking-[0.18em] text-[#c8ff4d] uppercase">{current.sector}</p>
              <h3 className="mt-3 font-serif text-4xl">{current.client}</h3>
              <p className="mt-3 max-w-lg text-white/70">{current.line}</p>
            </div>
            <MediaFrame src={current.src} alt={current.client} className="min-h-36" />
          </article>
        </div>
      ) : null}

      {variant === 'stack' ? (
        <div className="relative h-64">
          {studies.slice(0, 3).map((study, index) => (
            <article
              key={study.id}
              className="absolute inset-x-0 overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]"
              style={{ top: index * 16, transform: `scale(${1 - index * 0.04})` }}
            >
              <MediaFrame src={study.src} alt="" className="h-24" />
              <div className="p-5">
                <p className="text-xs text-nx-faint">{study.sector}</p>
                <p className="mt-2 font-serif text-2xl">{study.client}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'film' ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {studies.map((study) => (
            <article key={study.id} className="min-w-[14rem] overflow-hidden rounded-[1.3rem] border border-nx-border">
              <MediaFrame src={study.src} alt={study.client} className="h-28" />
              <div className="p-4">
                <p className="font-medium">{study.client}</p>
                <p className="mt-1 text-sm text-nx-muted">{study.line}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'split' ? (
        <div className="grid gap-6 md:grid-cols-2">
          <MediaFrame src={current.src} alt={current.client} className="min-h-52 rounded-[1.6rem]" />
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
            <article key={study.id} className={cn('overflow-hidden rounded-[1.2rem] border border-nx-border', index === 0 && 'md:col-span-2 md:row-span-2')}>
              <MediaFrame src={study.src} alt={study.client} className={index === 0 ? 'h-48' : 'h-28'} />
              <div className="p-4">
                <p className="text-xs text-nx-faint">{study.sector}</p>
                <p className={cn('mt-2 font-medium', index === 0 && 'font-serif text-3xl')}>{study.client}</p>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'quote' ? (
        <figure className="max-w-2xl">
          <blockquote className="font-serif text-3xl leading-snug">“{current.line}”</blockquote>
          <figcaption className="mt-4 flex items-center gap-3 text-sm text-nx-muted">
            <MediaFrame src={media.people.meera} alt="" grain={false} className="size-9 rounded-full" />
            {current.client}
          </figcaption>
        </figure>
      ) : null}

      {variant === 'before' ? (
        <div className="grid gap-3 md:grid-cols-2">
          <article className="overflow-hidden rounded-[1.3rem] border border-dashed border-nx-line">
            <MediaFrame src={media.editorial[2]} alt="" className="h-28 opacity-70 grayscale" />
            <div className="p-5">
              <p className="text-xs text-nx-faint">Before</p>
              <p className="mt-2">Quotes lived in message threads.</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-[1.3rem] bg-nx-fg text-nx-bg">
            <MediaFrame src={current.src} alt="" className="h-28" />
            <div className="p-5">
              <p className="text-xs opacity-60">After</p>
              <p className="mt-2">{current.line}</p>
            </div>
          </article>
        </div>
      ) : null}

      {variant === 'logo' ? (
        <div className="flex flex-wrap gap-3">
          {studies.map((study, index) => (
            <button
              key={study.id}
              type="button"
              className={cn(focusRing, 'overflow-hidden rounded-2xl border', index === active ? 'border-nx-fg' : 'border-nx-border')}
              onClick={() => setActive(index)}
            >
              <MediaFrame src={study.src} alt={study.client} className="h-12 w-28" />
            </button>
          ))}
        </div>
      ) : null}

      {variant === 'index' ? (
        <ol className="divide-y divide-nx-border">
          {studies.map((study, index) => (
            <li key={study.id} className="flex items-center justify-between gap-3 py-3">
              <span className="text-nx-faint">{String(index + 1).padStart(2, '0')}</span>
              <MediaFrame src={study.src} alt="" className="size-10 rounded-lg" />
              <span className="flex-1">{study.client}</span>
              <span className="text-sm text-nx-muted">{study.sector}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'featured' ? (
        <article className="relative overflow-hidden rounded-[1.8rem] text-white">
          <MediaFrame src={current.src} alt={current.client} className="min-h-72" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <p className="text-[#c8ff4d]">Featured</p>
            <h3 className="mt-4 font-serif text-5xl">{current.client}</h3>
            <p className="mt-4 max-w-md text-white/65">{current.line}</p>
          </div>
        </article>
      ) : null}

      {variant === 'reel' ? (
        <div>
          <article className="overflow-hidden rounded-[1.4rem] border border-nx-border">
            <MediaFrame src={current.src} alt={current.client} className="h-44" />
            <div className="p-6">
              <p className="font-serif text-3xl">{current.client}</p>
              <p className="mt-2 text-sm text-nx-muted">{current.line}</p>
            </div>
          </article>
          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="flex justify-center gap-1.5">
              {studies.map((study, index) => (
                <button
                  key={study.id}
                  type="button"
                  aria-label={study.client}
                  className={cn(focusRing, 'grid size-11 place-items-center')}
                  onClick={() => {
                    setActive(index)
                    setPaused(true)
                  }}
                >
                  <span className={cn('size-2 rounded-full', index === active ? 'bg-nx-fg' : 'bg-nx-line')} />
                </button>
              ))}
            </div>
            <button type="button" aria-pressed={!paused} className={cn(focusRing, 'inline-flex min-h-11 min-w-11 shrink-0 items-center px-2 text-xs text-nx-muted')} onClick={() => setPaused((value) => !value)}>
              {paused ? 'Play cases' : 'Pause cases'}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function CaseStudy(props: CaseStudyProps) {
  if (isWowVariant('case-study', props.variant)) {
    return (
      <WowSignature
        family="case-study"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <CaseStudyCore {...props} />
}
