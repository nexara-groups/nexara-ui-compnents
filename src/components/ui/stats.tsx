'use client'

import { type NxTier } from '@/lib/library.ts'
import { springs, useCount } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'

export const STATS_VARIANTS = [
  'strip',
  'sentence',
  'ring',
  'bar',
  'wall',
  'barrel',
  'ledger',
  'versus',
  'cascade',
  'dial',
  'plot',
] as const

export type StatsVariant = (typeof STATS_VARIANTS)[number]

export const STATS_TIER_META: Record<StatsVariant, { tier: NxTier; title: string; note: string }> = {
  strip: { tier: 'basic', title: 'Strip', note: 'Hairline tape of figures. No cards.' },
  sentence: { tier: 'basic', title: 'Sentence', note: 'Figures are words in the claim.' },
  ring: { tier: 'basic', title: 'Ring', note: 'Completeness as a circle.' },
  bar: { tier: 'basic', title: 'Bar', note: 'Share as length.' },
  wall: { tier: 'intermediate', title: 'Wall', note: 'Spring wall of plates.' },
  barrel: { tier: 'intermediate', title: 'Barrel', note: 'Digit barrels. The odometer is the object.' },
  ledger: { tier: 'intermediate', title: 'Ledger', note: 'Paper rows: label, figure, note.' },
  versus: { tier: 'intermediate', title: 'Versus', note: 'Two figures face across a rule.' },
  cascade: { tier: 'advanced', title: 'Cascade', note: 'Stations of figures on native scroll.' },
  dial: { tier: 'advanced', title: 'Dial', note: 'Aimed instrument in a clipped plate.' },
  plot: { tier: 'advanced', title: 'Plot', note: 'One field of data. Numbers are captions.' },
}

export type StatItem = {
  id: string
  value: number
  label?: ReactNode
  prefix?: string
  suffix?: string
  note?: ReactNode
  share?: number
  series?: number[]
}

export interface StatsProps {
  variant?: StatsVariant
  eyebrow?: ReactNode
  title?: ReactNode
  sentence?: ReactNode
  items?: StatItem[]
  progress?: 'none' | 'control' | 'scroll'
  className?: string
}

const display = 'font-[family-name:var(--nx-font-display,ui-serif,Georgia,serif)]'
const mono = 'font-[family-name:var(--nx-font-mono,ui-monospace,monospace)]'
const body = 'font-[family-name:var(--nx-font-body,ui-sans-serif,system-ui,sans-serif)]'

/**
 * Stats
 * Eleven mechanisms. Reduced motion paints the final figures immediately.
 */
export function Stats({
  variant = 'strip',
  eyebrow,
  title,
  sentence,
  items = [],
  progress = 'none',
  className,
}: StatsProps) {
  return (
    <section
      data-nexara="stats"
      data-variant={variant}
      data-tier={STATS_TIER_META[variant].tier}
      className={cn(body, 'px-4 py-12 md:px-8', className)}
      style={{ background: 'var(--nx-bg, inherit)', color: 'var(--nx-fg, inherit)' }}
    >
      <div className="mx-auto max-w-6xl">
        <Header eyebrow={eyebrow} title={title} />
        {items.length === 0 && variant !== 'sentence' ? null : (
          <>
            {variant === 'strip' ? <Strip items={items} /> : null}
            {variant === 'sentence' ? <Sentence sentence={sentence} items={items} /> : null}
            {variant === 'ring' ? <Ring items={items} /> : null}
            {variant === 'bar' ? <Bars items={items} /> : null}
            {variant === 'wall' ? <Wall items={items} /> : null}
            {variant === 'barrel' ? <Barrel items={items} /> : null}
            {variant === 'ledger' ? <Ledger items={items} /> : null}
            {variant === 'versus' ? <Versus items={items} /> : null}
            {variant === 'cascade' ? <Cascade items={items} progress={progress} /> : null}
            {variant === 'dial' ? <Dial items={items} /> : null}
            {variant === 'plot' ? <Plot items={items} /> : null}
          </>
        )}
      </div>
    </section>
  )
}

function Header({ eyebrow, title }: { eyebrow?: ReactNode; title?: ReactNode }) {
  if (eyebrow == null && title == null) return null
  return (
    <header className="mb-10">
      {eyebrow ? (
        <p className={cn(mono, 'text-[11px] tracking-[0.2em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className={cn(display, 'mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-none')}>{title}</h2> : null}
    </header>
  )
}

function Figure({ item, active = true }: { item: StatItem; active?: boolean }) {
  const node = useCount(item.value, active)
  return (
    <span>
      {item.prefix}
      <span ref={node}>{item.value.toLocaleString()}</span>
      {item.suffix}
    </span>
  )
}

function Strip({ items }: { items: StatItem[] }) {
  return (
    <ul className="flex flex-wrap items-end gap-x-10 gap-y-6 border-y py-6" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
      {items.map((item) => (
        <li key={item.id}>
          <p className={cn(display, 'text-4xl')}>
            <Figure item={item} />
          </p>
          {item.label ? (
            <p className={cn(mono, 'mt-2 text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
              {item.label}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function Sentence({ sentence, items }: { sentence?: ReactNode; items: StatItem[] }) {
  if (sentence) return <p className={cn(display, 'text-[clamp(1.8rem,4vw,3rem)] leading-snug')}>{sentence}</p>
  return (
    <p className={cn(display, 'text-[clamp(1.8rem,4vw,3rem)] leading-snug')}>
      {items.map((item, index) => (
        <span key={item.id}>
          {index > 0 ? ' ' : null}
          <strong className="font-inherit">
            <Figure item={item} />
          </strong>
          {item.label ? <span> {item.label}</span> : null}
          {index < items.length - 1 ? ',' : '.'}
        </span>
      ))}
    </p>
  )
}

function Ring({ items }: { items: StatItem[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {items.map((item) => {
        const share = Math.max(0, Math.min(1, item.share ?? item.value / 100))
        const dash = `${share * 100} ${100 - share * 100}`
        return (
          <figure key={item.id} className="relative grid size-36 place-items-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--nx-line, currentColor)" strokeWidth="1.4" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="var(--nx-accent, currentColor)"
                strokeWidth="1.8"
                strokeDasharray={dash}
                pathLength={100}
              />
            </svg>
            <figcaption className="text-center">
              <p className={cn(display, 'text-2xl')}>
                <Figure item={item} />
              </p>
              <p className="text-xs" style={{ color: 'var(--nx-muted, inherit)' }}>
                {item.label}
              </p>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

function Bars({ items }: { items: StatItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const share = Math.max(0, Math.min(1, item.share ?? item.value / 100))
        return (
          <li key={item.id}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{item.label}</span>
              <span>
                <Figure item={item} />
              </span>
            </div>
            <div className="h-2" style={{ background: 'var(--nx-elev, transparent)' }}>
              <motion.div className="h-full" initial={{ width: 0 }} animate={{ width: `${share * 100}%` }} style={{ background: 'var(--nx-accent, currentColor)' }} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function Wall({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <motion.article
          key={item.id}
          layout
          className="p-5"
          style={{ background: 'var(--nx-elev, transparent)' }}
          transition={springs.ui}
        >
          <p className={cn(display, 'text-4xl')}>
            <Figure item={item} />
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--nx-muted, inherit)' }}>
            {item.label}
          </p>
        </motion.article>
      ))}
    </div>
  )
}

function Barrel({ items }: { items: StatItem[] }) {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="flex flex-wrap gap-8">
      {items.map((item) => {
        const digits = String(Math.round(item.value)).split('')
        return (
          <figure key={item.id}>
            <div className="flex gap-1">
              {digits.map((digit, index) => (
                <span
                  key={`${item.id}-${index}`}
                  className={cn(display, 'grid h-16 w-10 place-items-center border text-3xl')}
                  style={{ borderColor: 'var(--nx-line, currentColor)', background: 'var(--nx-elev, transparent)' }}
                >
                  {reduced ? digit : <Rolling digit={digit} />}
                </span>
              ))}
            </div>
            <figcaption className={cn(mono, 'mt-3 text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
              {item.label}
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

function Rolling({ digit }: { digit: string }) {
  return (
    <motion.span initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={springs.snap}>
      {digit}
    </motion.span>
  )
}

function Ledger({ items }: { items: StatItem[] }) {
  return (
    <table className="w-full border-collapse text-left">
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-t" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
            <th className="py-4 pr-6 font-normal">{item.label}</th>
            <td className={cn(display, 'py-4 text-3xl')}>
              <Figure item={item} />
            </td>
            <td className="py-4 pl-6 text-sm" style={{ color: 'var(--nx-muted, inherit)' }}>
              {item.note}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Versus({ items }: { items: StatItem[] }) {
  const a = items[0]
  const b = items[1]
  if (!a || !b) return null
  return (
    <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
      <div className="text-right">
        <p className={cn(display, 'text-[clamp(2.5rem,7vw,5rem)]')}>
          <Figure item={a} />
        </p>
        <p style={{ color: 'var(--nx-muted, inherit)' }}>{a.label}</p>
      </div>
      <div className="h-24 w-px justify-self-center" style={{ background: 'var(--nx-line, currentColor)' }} />
      <div>
        <p className={cn(display, 'text-[clamp(2.5rem,7vw,5rem)]')}>
          <Figure item={b} />
        </p>
        <p style={{ color: 'var(--nx-muted, inherit)' }}>{b.label}</p>
      </div>
    </div>
  )
}

function Cascade({ items, progress }: { items: StatItem[]; progress: 'none' | 'control' | 'scroll' }) {
  const [step, setStep] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })
  const index = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, items.length - 1)])
  const shown = progress === 'scroll' ? items : items.slice(0, step + 1)
  return (
    <div ref={stage} style={{ height: progress === 'scroll' ? `${items.length * 40}vh` : undefined }}>
      <div className={progress === 'scroll' ? 'sticky top-16 space-y-6' : 'space-y-6'}>
        {(progress === 'scroll' ? items : shown).map((item, i) => (
          <article key={item.id} className="border-t pt-4" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
            <p className={cn(display, 'text-5xl')}>
              <Figure item={item} />
            </p>
            <p style={{ color: 'var(--nx-muted, inherit)' }}>{item.label}</p>
            <span className="sr-only">{i}</span>
          </article>
        ))}
        {progress === 'control' ? (
          <button
            type="button"
            className="h-11 px-4"
            style={{ border: '1px solid var(--nx-line, currentColor)' }}
            onClick={() => setStep((value) => Math.min(items.length - 1, value + 1))}
          >
            Next figure
          </button>
        ) : null}
      </div>
      <span className="sr-only">{index.get()}</span>
    </div>
  )
}

function Dial({ items }: { items: StatItem[] }) {
  const item = items[0]
  const [angle, setAngle] = useState(item ? (item.share ?? item.value / 100) * 240 - 120 : -120)
  if (!item) return null
  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
      <div className="relative grid size-56 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true">
          <path d="M18 72 A 40 40 0 1 1 82 72" fill="none" stroke="var(--nx-line, currentColor)" strokeWidth="2" />
        </svg>
        <motion.span
          className="absolute h-20 w-px origin-bottom"
          style={{ background: 'var(--nx-accent, currentColor)', rotate: angle }}
        />
        <p className={cn(display, 'text-3xl')}>
          <Figure item={item} />
        </p>
      </div>
      <label className={cn(mono, 'flex items-center gap-3 text-[11px] tracking-[0.16em] uppercase')}>
        Aim
        <input
          type="range"
          min={-120}
          max={120}
          value={angle}
          onChange={(event) => setAngle(Number(event.target.value))}
          className="h-11 w-48"
        />
      </label>
    </div>
  )
}

function Plot({ items }: { items: StatItem[] }) {
  const series = items[0]?.series ?? items.map((item) => item.value)
  const max = Math.max(...series, 1)
  const points = series.map((value, index) => {
    const x = (index / Math.max(1, series.length - 1)) * 100
    const y = 100 - (value / max) * 88
    return `${x},${y}`
  })
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <div ref={ref}>
      <svg viewBox="0 0 100 100" className="h-56 w-full" preserveAspectRatio="none" role="img">
        <motion.polyline
          fill="none"
          stroke="var(--nx-accent, currentColor)"
          strokeWidth="1.2"
          points={points.join(' ')}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: inView || reduced ? 1 : 0 }}
          transition={springs.heavy}
        />
      </svg>
      <ul className="mt-4 flex flex-wrap gap-6">
        {items.map((item) => (
          <li key={item.id}>
            <p className={cn(display, 'text-2xl')}>
              <Figure item={item} />
            </p>
            <p className="text-sm" style={{ color: 'var(--nx-muted, inherit)' }}>
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
