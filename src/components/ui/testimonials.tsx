'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { useState } from 'react'
import { MediaFrame, PlayControl, media } from '@/lib/media.tsx'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'quote',
  'grid',
  'wall',
  'slider',
  'tweet',
  'video',
  'stat',
  'logo',
  'stacked',
  'featured',
  'wall-parallax',
  'video-shader',
  'orbit-quotes',
  'scramble-pull',
] as const

export type TestimonialsVariant = (typeof VARIANTS)[number]

export interface TestimonialsProps {
  variant?: TestimonialsVariant
  className?: string
}

const quotes = [
  { name: 'Anitha Rao', role: 'Design lead, Harbor', handle: '@anitha', text: 'The registry finally feels like a product, not a folder of snippets.', src: media.people.anitha },
  { name: 'Kiran Reddy', role: 'Engineer, Atlas', handle: '@kiran', text: 'We shipped the mast in a week because the variants were already distinct.', src: media.people.kiran },
  { name: 'Meera Shah', role: 'PM, Field', handle: '@meera', text: 'Quiet type, real numbers, light and dark. That was the bar.', src: media.people.meera },
  { name: 'Eli Park', role: 'Founder, Lumen', handle: '@eli', text: 'Agents stop asking which button. They ask for button / shimmer and move on.', src: media.people.suresh },
  { name: 'Noor Hale', role: 'Brand, North', handle: '@noor', text: 'Geist, one accent, and a hairline. We stopped restyling every paste.', src: media.people.latha },
  { name: 'Sam Ori', role: 'Staff, Tide', handle: '@sam', text: 'The modal gallery actually shows the dialog. That should not feel rare.', src: media.people.vikram },
]

/**
 * Testimonials
 * Ten social-proof constructions. Copy this file plus `src/lib/utils.ts`.
 */
function TestimonialsCore({ variant = 'quote', className }: TestimonialsProps) {
  const first = quotes[0]!
  return (
    <section data-nexara="testimonials" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'quote' ? (
        <figure className="max-w-3xl">
          <blockquote className="font-serif text-3xl leading-snug text-balance md:text-4xl">“{first.text}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3 text-sm">
            <MediaFrame src={first.src} alt={first.name} grain={false} className="size-9 rounded-full" />
            <span>
              <span className="block font-medium">{first.name}</span>
              <span className="text-nx-muted">{first.role}</span>
            </span>
          </figcaption>
        </figure>
      ) : null}

      {variant === 'featured' ? (
        <figure className="rounded-[1.6rem] bg-nx-fg p-8 text-nx-bg md:p-10">
          <p className="text-[11px] tracking-[0.18em] uppercase opacity-60">Harbor · Issue 18</p>
          <blockquote className="mt-4 font-serif text-3xl leading-snug md:text-4xl">“{first.text}”</blockquote>
          <figcaption className="mt-6 text-sm opacity-70">{first.name}, {first.role}</figcaption>
        </figure>
      ) : null}

      {variant === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {quotes.slice(0, 3).map((quote) => (
            <figure key={quote.name} className="rounded-2xl border border-nx-border bg-nx-card p-5 shadow-[var(--nx-shadow)]">
              <Stars />
              <blockquote className="mt-3 text-sm leading-6">“{quote.text}”</blockquote>
              <figcaption className="mt-4 text-xs text-nx-muted">{quote.name} · {quote.role}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}

      {variant === 'wall' ? (
        <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
          {quotes.map((quote) => (
            <figure key={quote.name} className="mb-4 break-inside-avoid rounded-2xl border border-nx-border bg-nx-card p-4">
              <p className="text-xs font-medium">{quote.name}</p>
              <blockquote className="mt-2 text-sm leading-6 text-nx-muted">“{quote.text}”</blockquote>
            </figure>
          ))}
        </div>
      ) : null}

      {variant === 'slider' ? (
        <div className="rounded-[1.5rem] border border-nx-border bg-nx-card p-6 shadow-[var(--nx-shadow)]">
          <p className="font-serif text-2xl leading-snug">“{first.text}”</p>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-nx-muted">{first.name}</p>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-nx-fg" />
              <span className="size-1.5 rounded-full bg-nx-border" />
              <span className="size-1.5 rounded-full bg-nx-border" />
            </div>
          </div>
        </div>
      ) : null}

      {variant === 'tweet' ? (
        <figure className="max-w-md rounded-2xl border border-nx-border bg-nx-card p-4 shadow-[var(--nx-shadow)]">
          <div className="flex items-center gap-3">
            <MediaFrame src={first.src} alt={first.name} grain={false} className="size-9 rounded-full" />
            <div>
              <p className="text-sm font-medium">{first.name}</p>
              <p className="text-xs text-nx-faint">{first.handle}</p>
            </div>
          </div>
          <blockquote className="mt-3 text-sm leading-6">{first.text}</blockquote>
          <p className="mt-3 text-xs text-nx-faint">12:04 · 17 Oct 2026</p>
        </figure>
      ) : null}

      {variant === 'video' ? <HarborReel /> : null}

      {variant === 'stat' ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {[['4.9', 'Average rating'], ['2.4k', 'Teams in production'], ['12s', 'Median copy time']].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-nx-border bg-nx-card p-5">
              <p className="font-serif text-4xl tracking-tight">{value}</p>
              <p className="mt-1 text-xs text-nx-muted">{label}</p>
            </div>
          ))}
        </div>
      ) : null}

      {variant === 'logo' ? (
        <div>
          <p className="text-center text-xs tracking-[0.18em] text-nx-muted uppercase">Used in production at</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {[media.marks.kite, media.marks.solum, media.marks.nimbus, media.marks.vale, media.marks.orbit].map((src) => (
              <MediaFrame key={src} src={src} alt="" grain={false} className="h-12 w-24 rounded-xl border border-nx-border bg-nx-card" imgClassName="object-contain p-2" />
            ))}
          </div>
          <blockquote className="mx-auto mt-6 max-w-xl text-center font-serif text-2xl">“{first.text}”</blockquote>
        </div>
      ) : null}

      {variant === 'stacked' ? (
        <ol className="max-w-xl space-y-6">
          {quotes.slice(0, 3).map((quote, index) => (
            <li key={quote.name} className="relative border-l border-nx-border pl-5">
              <span className="absolute top-1.5 -left-1 size-2 rounded-full bg-nx-accent" />
              <p className="text-[11px] text-nx-faint">{String(index + 1).padStart(2, '0')}</p>
              <blockquote className="mt-1 text-sm leading-6">“{quote.text}”</blockquote>
              <p className="mt-2 text-xs text-nx-muted">{quote.name}</p>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  )
}

function HarborReel() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] text-white">
      <MediaFrame src={media.cinema} video={media.reel} poster={media.cinema} playing={playing} alt="" className="min-h-52" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <PlayControl playing={playing} onToggle={() => setPlaying((value) => !value)} />
        <p className="mt-6 font-serif text-3xl">Harbor after dark</p>
        <p className="mt-2 text-sm text-white/70">2:18 · How the registry landed in production</p>
      </div>
    </div>
  )
}

function Stars() {
  return (
    <p className="text-[11px] tracking-[0.18em] text-nx-accent" aria-label="5 out of 5">
      ★★★★★
    </p>
  )
}

export function Testimonials(props: TestimonialsProps) {
  if (isWowVariant('testimonials', props.variant)) {
    return (
      <WowSignature
        family="testimonials"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <TestimonialsCore {...props} />
}
