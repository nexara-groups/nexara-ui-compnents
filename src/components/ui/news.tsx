'use client'

import { useState } from 'react'
import { MediaFrame, PlayControl, media } from '@/lib/media.tsx'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'bulletin',
  'cards',
  'list',
  'featured',
  'ticker',
  'magazine',
  'compact',
  'video',
  'digest',
  'alert',
  'editorial',
  'feed',
] as const

export type NewsVariant = (typeof VARIANTS)[number]

export interface NewsProps {
  variant?: NewsVariant
  className?: string
}

const items = [
  { kicker: 'Meet', title: 'Night championships move to Harbor Hall', date: '12 Dec', note: 'Field' },
  { kicker: 'Note', title: 'Why we still write the brief by hand', date: '04 Oct', note: 'North' },
  { kicker: 'Clinic', title: 'Therapy desk adds Saturday hours', date: '18 Sep', note: 'Lumen' },
  { kicker: 'Plant', title: 'Harbor West bay opens for AMC week', date: '02 Sep', note: 'Harbor' },
  { kicker: 'Lab', title: 'Solum reports now in the portal', date: '21 Aug', note: 'Labs' },
]

/**
 * News
 * Twelve bulletin and notes constructions for Field, North, and Lumen.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function News({ variant = 'bulletin', className }: NewsProps) {
  return (
    <section data-nexara="news" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'bulletin' ? (
        <div className="rounded-[1.4rem] border border-nx-border">
          <div className="flex items-center justify-between border-b border-nx-border px-4 py-3">
            <p className="text-[11px] tracking-[0.18em] text-nx-accent uppercase">Bulletin</p>
            <p className="text-xs text-nx-faint">Field desk</p>
          </div>
          <ul>
            {items.slice(0, 4).map((item) => (
              <li key={item.title} className="flex justify-between gap-4 border-t border-nx-border px-4 py-3 text-sm first:border-t-0">
                <span>{item.title}</span>
                <span className="shrink-0 text-nx-faint">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {variant === 'cards' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <article key={item.title} className="rounded-[1.4rem] border border-nx-border bg-nx-card p-5">
              <p className="text-[11px] tracking-[0.16em] text-nx-faint uppercase">{item.kicker}</p>
              <h3 className="mt-3 font-serif text-2xl">{item.title}</h3>
              <p className="mt-3 text-xs text-nx-muted">
                {item.note} · {item.date}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'list' || variant === 'feed' ? (
        <ol className="space-y-4">
          {items.map((item) => (
            <li key={item.title}>
              <p className="text-xs text-nx-faint">
                {item.date} · {item.note}
              </p>
              <p className="mt-1 font-medium">{item.title}</p>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'featured' || variant === 'editorial' ? (
        <article>
          <p className="text-[11px] tracking-[0.2em] text-nx-accent uppercase">{items[1]!.kicker}</p>
          <h3 className="mt-3 font-serif text-5xl">{items[1]!.title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-nx-muted">
            North still starts with a written brief. The carousel and the marquee come after the sentence is true.
          </p>
        </article>
      ) : null}

      {variant === 'ticker' ? (
        <div className="overflow-hidden rounded-full border border-nx-border bg-nx-card px-4 py-2 text-sm">
          <p className="truncate">
            {items.map((item) => `${item.note}: ${item.title}`).join('  ·  ')}
          </p>
        </div>
      ) : null}

      {variant === 'magazine' ? (
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <article className="min-h-48 rounded-[1.6rem] bg-[#111113] p-6 text-white">
            <p className="text-[#c8ff4d]">Issue 18</p>
            <p className="mt-4 font-serif text-4xl">{items[1]!.title}</p>
          </article>
          <ul className="space-y-3 text-sm">
            {items.slice(2).map((item) => (
              <li key={item.title} className="border-b border-nx-border pb-3">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {variant === 'compact' ? (
        <ul className="text-sm">
          {items.slice(0, 3).map((item) => (
            <li key={item.title} className="flex justify-between gap-3 py-1">
              <span>{item.title}</span>
              <span className="text-nx-faint">{item.date}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'video' ? <MatchFilm title={items[0]!.title} /> : null}

      {variant === 'digest' ? (
        <div className="rounded-[1.4rem] bg-nx-elevated p-5">
          <p className="text-xs tracking-[0.16em] text-nx-faint uppercase">This week</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
            {items.slice(0, 4).map((item) => (
              <li key={item.title}>{item.title}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {variant === 'alert' ? (
        <div className="rounded-[1.3rem] border border-nx-warn/40 bg-[#fff7ea] px-4 py-3 text-sm text-[#7a4a10] dark:bg-[#2a2114] dark:text-[#fbbf24]">
          <p className="font-medium">Lane change</p>
          <p className="mt-1">{items[0]!.title}</p>
        </div>
      ) : null}
    </section>
  )
}

function MatchFilm({ title }: { title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-nx-border">
      <div className="relative grid h-40 place-items-center text-white">
        <MediaFrame src={media.sports} video={media.sportsReel} poster={media.sports} playing={playing} alt="" className="absolute inset-0" />
        <PlayControl playing={playing} onToggle={() => setPlaying((value) => !value)} label="Play match film" className="relative" />
      </div>
      <div className="p-4">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-nx-muted">Match film · 4:12</p>
      </div>
    </article>
  )
}
