'use client'

import { useEffect, useRef, useState } from 'react'
import { cn, useCountUp } from '@/lib/utils.ts'

const VARIANTS = [
  'countup',
  'ribbon',
  'ticker',
  'year',
  'split',
  'dark',
  'sports',
  'clinic',
  'stacked',
  'compare',
  'mosaic',
  'live',
] as const

export type StatsVariant = (typeof VARIANTS)[number]

export interface StatsProps {
  variant?: StatsVariant
  className?: string
}

type Stat = { value: number; label: string; prefix?: string; suffix?: string; note?: string; decimals?: number }

const plant: Stat[] = [
  { value: 2018, label: 'Founded in', note: 'Harbor Climate' },
  { value: 20, label: 'Projects delivered', suffix: '+' },
  { value: 846, label: 'Work booked', prefix: '₹', suffix: ' Cr', decimals: 2 },
  { value: 48, label: 'People on crew', suffix: '+' },
]

const sports: Stat[] = [
  { value: 1860, label: 'Skaters' },
  { value: 42, label: 'Clubs' },
  { value: 128, label: 'Coaches' },
  { value: 16, label: 'National events' },
]

const clinic: Stat[] = [
  { value: 16, label: 'Specialists' },
  { value: 11, label: 'Departments' },
  { value: 35, label: 'Therapy sessions / week' },
  { value: 24, label: 'Hour desk', suffix: 'h' },
]

/**
 * Stats
 * Twelve count-up constructions for climate, care, and sport desks.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Stats({ variant = 'countup', className }: StatsProps) {
  return (
    <section data-nexara="stats" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'countup' ? <Grid items={plant} /> : null}
      {variant === 'ribbon' ? <Ribbon items={clinic} /> : null}
      {variant === 'ticker' ? <Ticker items={sports} /> : null}
      {variant === 'year' ? <Year /> : null}
      {variant === 'split' ? <Split /> : null}
      {variant === 'dark' ? (
        <div className="rounded-[1.6rem] bg-[#111113] px-6 py-10 text-white">
          <Grid items={plant} invert />
        </div>
      ) : null}
      {variant === 'sports' ? <Grid items={sports} kicker="Field Athletics season" /> : null}
      {variant === 'clinic' ? <Grid items={clinic} kicker="Lumen Care" /> : null}
      {variant === 'stacked' ? <Stacked items={plant} /> : null}
      {variant === 'compare' ? <Compare /> : null}
      {variant === 'mosaic' ? <Mosaic items={sports} /> : null}
      {variant === 'live' ? <Live items={clinic} /> : null}
    </section>
  )
}

function format(item: Stat, value: number) {
  const shown = item.decimals ? (value / 10 ** item.decimals).toFixed(item.decimals) : String(value)
  return `${item.prefix ?? ''}${shown}${item.suffix ?? ''}`
}

function useInView() {
  const ref = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setActive(true)
    }, { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return { ref, active }
}

function Figure({ item, invert }: { item: Stat; invert?: boolean }) {
  const { ref, active } = useInView()
  const value = useCountUp(item.value, 1400, active)
  return (
    <div ref={ref as never}>
      <p className={cn('font-serif text-4xl tracking-tight md:text-5xl', invert ? 'text-white' : 'text-nx-fg')}>{format(item, value)}</p>
      <p className={cn('mt-2 text-sm', invert ? 'text-white/60' : 'text-nx-muted')}>{item.label}</p>
      {item.note ? <p className={cn('text-xs', invert ? 'text-white/40' : 'text-nx-muted')}>{item.note}</p> : null}
    </div>
  )
}

function Grid({ items, invert, kicker }: { items: Stat[]; invert?: boolean; kicker?: string }) {
  return (
    <div>
      {kicker ? <p className="mb-6 text-[11px] tracking-[0.2em] text-nx-accent uppercase">{kicker}</p> : null}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Figure key={item.label} item={item} invert={invert} />
        ))}
      </div>
    </div>
  )
}

function Ribbon({ items }: { items: Stat[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-baseline gap-2 rounded-full border border-nx-border bg-nx-card px-4 py-2">
          <Count item={item} className="font-serif text-xl" />
          <span className="text-xs text-nx-muted">{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

function Ticker({ items }: { items: Stat[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-nx-border bg-[#111113] text-white">
      <div className="flex gap-8 px-5 py-4">
        {items.map((item) => (
          <p key={item.label} className="flex items-baseline gap-2 whitespace-nowrap">
            <Count item={item} className="font-serif text-2xl text-[#c8ff4d]" />
            <span className="text-xs tracking-[0.16em] text-white/55 uppercase">{item.label}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

function Year() {
  const { ref, active } = useInView()
  const year = useCountUp(2018, 1400, active)
  return (
    <div ref={ref as never} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <p className="font-serif text-[12vw] leading-none md:text-8xl">{year}</p>
      <p className="max-w-sm text-sm leading-6 text-nx-muted">
        Harbor Climate opened the first plant in 2018. The count is the year, not a vanity metric.
      </p>
    </div>
  )
}

function Split() {
  return (
    <div className="grid gap-8 border-t border-nx-line pt-8 md:grid-cols-2">
      <Figure item={plant[2]!} />
      <p className="self-end text-sm leading-6 text-nx-muted">
        Booked climate work across three coastal plants. The rupee figure counts up on first view.
      </p>
    </div>
  )
}

function Stacked({ items }: { items: Stat[] }) {
  return (
    <ol className="divide-y divide-nx-border rounded-[1.4rem] border border-nx-border bg-nx-card">
      {items.map((item) => (
        <li key={item.label} className="flex items-baseline justify-between px-5 py-4">
          <span className="text-sm text-nx-muted">{item.label}</span>
          <Count item={item} className="font-serif text-3xl" />
        </li>
      ))}
    </ol>
  )
}

function Compare() {
  const { ref, active } = useInView()
  const before = useCountUp(12, 1400, active)
  const after = useCountUp(35, 1400, active)
  return (
    <div ref={ref as never} className="grid gap-4 md:grid-cols-2">
      <article className="rounded-[1.4rem] border border-nx-border p-6">
        <p className="text-[11px] tracking-[0.18em] text-nx-muted uppercase">Before therapy desk</p>
        <p className="mt-3 font-serif text-5xl">{before}</p>
        <p className="mt-2 text-sm text-nx-muted">Weekly sessions</p>
      </article>
      <article className="rounded-[1.4rem] bg-nx-fg p-6 text-nx-bg">
        <p className="text-[11px] tracking-[0.18em] uppercase opacity-60">This month</p>
        <p className="mt-3 font-serif text-5xl">{after}</p>
        <p className="mt-2 text-sm opacity-70">Sessions on the calendar</p>
      </article>
    </div>
  )
}

function Mosaic({ items }: { items: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((item, index) => (
        <article
          key={item.label}
          className={cn(
            'rounded-[1.3rem] border border-nx-border p-5',
            index === 0 && 'col-span-2 bg-nx-fg text-nx-bg',
          )}
        >
          <Count item={item} className="font-serif text-4xl" />
          <p className={cn('mt-2 text-sm', index === 0 ? 'text-white/65' : 'text-nx-muted')}>{item.label}</p>
        </article>
      ))}
    </div>
  )
}

function Live({ items }: { items: Stat[] }) {
  return (
    <div className="rounded-[1.4rem] border border-nx-border bg-nx-card p-5">
      <p className="mb-4 inline-flex items-center gap-2 text-xs text-nx-ok">
        <span className="size-1.5 rounded-full bg-nx-ok" />
        Desk is open
      </p>
      <div className="grid gap-6 sm:grid-cols-4">
        {items.map((item) => (
          <Figure key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}

function Count({ item, className }: { item: Stat; className?: string }) {
  const { ref, active } = useInView()
  const value = useCountUp(item.value, 1400, active)
  return (
    <span ref={ref as never} className={className}>
      {format(item, value)}
    </span>
  )
}
