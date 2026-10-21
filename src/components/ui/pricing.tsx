'use client'

import { type NxTier } from '@/lib/library.ts'
import { springs, useCount } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState, type ReactNode } from 'react'

export const PRICING_VARIANTS = [
  'offer',
  'pair',
  'slab',
  'ledger',
  'toggle',
  'seats',
  'meter',
  'table',
  'quote',
  'morph',
  'dossier',
] as const

export type PricingVariant = (typeof PRICING_VARIANTS)[number]

export const PRICING_TIER_META: Record<PricingVariant, { tier: NxTier; title: string; note: string }> = {
  offer: { tier: 'basic', title: 'Offer', note: 'One published figure. Two actions.' },
  pair: { tier: 'basic', title: 'Pair', note: 'Two opposed rooms.' },
  slab: { tier: 'basic', title: 'Slab', note: 'Plan radios. Selection is a ring.' },
  ledger: { tier: 'basic', title: 'Ledger', note: 'Boxless ruled columns.' },
  toggle: { tier: 'intermediate', title: 'Toggle', note: 'Period control is the composition.' },
  seats: { tier: 'intermediate', title: 'Seats', note: 'Headcount slider. Live total.' },
  meter: { tier: 'intermediate', title: 'Meter', note: 'Usage unit. Included band plus overage.' },
  table: { tier: 'intermediate', title: 'Table', note: 'Feature matrix as the section.' },
  quote: { tier: 'advanced', title: 'Quote', note: 'Working calculator. Breakdown to total.' },
  morph: { tier: 'advanced', title: 'Morph', note: 'Slab and table are one layout.' },
  dossier: { tier: 'advanced', title: 'Dossier', note: 'Filter, chapters, sticky summary.' },
}

export type PricePlan = {
  id: string
  name: ReactNode
  price?: ReactNode
  amount?: number
  period?: ReactNode
  features?: ReactNode[]
  note?: ReactNode
  action?: ReactNode
  featured?: boolean
}

export type PriceRow = {
  id: string
  label: ReactNode
  values: Record<string, ReactNode>
  note?: ReactNode
}

export type PricePeriod = 'month' | 'year'

export interface PricingProps {
  variant?: PricingVariant
  eyebrow?: ReactNode
  title?: ReactNode
  description?: ReactNode
  plans?: PricePlan[]
  rows?: PriceRow[]
  period?: PricePeriod
  onPeriodChange?: (period: PricePeriod) => void
  yearFactor?: number
  seats?: number
  onSeatsChange?: (value: number) => void
  seatMin?: number
  seatMax?: number
  usage?: number
  included?: number
  onUsageChange?: (value: number) => void
  formula?: (input: { seats: number; period: PricePeriod; usage: number; amount: number }) => number
  chapters?: Array<{ id: string; label: ReactNode }>
  className?: string
}

const display = 'font-[family-name:var(--nx-font-display,ui-serif,Georgia,serif)]'
const mono = 'font-[family-name:var(--nx-font-mono,ui-monospace,monospace)]'
const body = 'font-[family-name:var(--nx-font-body,ui-sans-serif,system-ui,sans-serif)]'

/**
 * Pricing
 * Eleven mechanisms. No baked prices. Tokens only.
 */
export function Pricing({
  variant = 'slab',
  eyebrow,
  title,
  description,
  plans = [],
  rows = [],
  period: periodProp,
  onPeriodChange,
  yearFactor = 10,
  seats: seatsProp,
  onSeatsChange,
  seatMin = 1,
  seatMax = 50,
  usage: usageProp,
  included = 100,
  onUsageChange,
  formula,
  chapters,
  className,
}: PricingProps) {
  const [period, setPeriod] = useState<PricePeriod>(periodProp ?? 'month')
  const [seats, setSeats] = useState(seatsProp ?? 3)
  const [usage, setUsage] = useState(usageProp ?? included)
  const [picked, setPicked] = useState(plans.find((plan) => plan.featured)?.id ?? plans[0]?.id ?? '')
  const [view, setView] = useState<'slab' | 'table'>('slab')
  const [chapter, setChapter] = useState(chapters?.[0]?.id ?? 'all')

  const currentPeriod = periodProp ?? period
  const currentSeats = seatsProp ?? seats
  const currentUsage = usageProp ?? usage

  return (
    <section
      data-nexara="pricing"
      data-variant={variant}
      data-tier={PRICING_TIER_META[variant].tier}
      className={cn(body, 'px-4 py-12 md:px-8', className)}
      style={{ background: 'var(--nx-bg, inherit)', color: 'var(--nx-fg, inherit)' }}
    >
      <div className="mx-auto max-w-6xl">
        <Header eyebrow={eyebrow} title={title} description={description} />
        {variant === 'offer' ? <Offer plans={plans} /> : null}
        {variant === 'pair' ? <Pair plans={plans} /> : null}
        {variant === 'slab' ? <Slab plans={plans} picked={picked} onPick={setPicked} /> : null}
        {variant === 'ledger' ? <Ledger plans={plans} /> : null}
        {variant === 'toggle' ? (
          <Toggle
            plans={plans}
            period={currentPeriod}
            yearFactor={yearFactor}
            onPeriod={(next) => {
              setPeriod(next)
              onPeriodChange?.(next)
            }}
          />
        ) : null}
        {variant === 'seats' ? (
          <Seats
            plans={plans}
            seats={currentSeats}
            min={seatMin}
            max={seatMax}
            onSeats={(next) => {
              setSeats(next)
              onSeatsChange?.(next)
            }}
          />
        ) : null}
        {variant === 'meter' ? (
          <Meter
            plans={plans}
            usage={currentUsage}
            included={included}
            onUsage={(next) => {
              setUsage(next)
              onUsageChange?.(next)
            }}
          />
        ) : null}
        {variant === 'table' ? <Matrix plans={plans} rows={rows} /> : null}
        {variant === 'quote' ? (
          <Quote
            plans={plans}
            seats={currentSeats}
            period={currentPeriod}
            usage={currentUsage}
            formula={formula}
            onSeats={(next) => {
              setSeats(next)
              onSeatsChange?.(next)
            }}
            onPeriod={(next) => {
              setPeriod(next)
              onPeriodChange?.(next)
            }}
          />
        ) : null}
        {variant === 'morph' ? (
          <Morph
            plans={plans}
            rows={rows}
            picked={picked}
            view={view}
            onPick={setPicked}
            onView={setView}
          />
        ) : null}
        {variant === 'dossier' ? (
          <Dossier plans={plans} rows={rows} chapters={chapters} chapter={chapter} onChapter={setChapter} picked={picked} />
        ) : null}
      </div>
    </section>
  )
}

function Header({ eyebrow, title, description }: { eyebrow?: ReactNode; title?: ReactNode; description?: ReactNode }) {
  if (eyebrow == null && title == null && description == null) return null
  return (
    <header className="mb-10 max-w-2xl">
      {eyebrow ? (
        <p className={cn(mono, 'text-[11px] tracking-[0.2em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className={cn(display, 'mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-none')}>{title}</h2> : null}
      {description ? (
        <p className="mt-3 leading-7" style={{ color: 'var(--nx-muted, inherit)' }}>
          {description}
        </p>
      ) : null}
    </header>
  )
}

function Offer({ plans }: { plans: PricePlan[] }) {
  const plan = plans[0]
  if (!plan) return null
  return (
    <article className="max-w-xl">
      <p className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
        {plan.name}
      </p>
      <p className={cn(display, 'mt-4 text-[clamp(3rem,8vw,6rem)] leading-none')}>{plan.price}</p>
      {plan.period ? <p className="mt-2" style={{ color: 'var(--nx-muted, inherit)' }}>{plan.period}</p> : null}
      {plan.features && plan.features.length > 0 ? (
        <ul className="mt-8 space-y-2">
          {plan.features.map((item, index) => (
            <li key={index} className="border-t py-2" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">{plan.action}</div>
    </article>
  )
}

function Pair({ plans }: { plans: PricePlan[] }) {
  const pair = plans.slice(0, 2)
  if (pair.length === 0) return null
  return (
    <div className="grid gap-0 md:grid-cols-2" style={{ border: '1px solid var(--nx-line, currentColor)' }}>
      {pair.map((plan) => (
        <article key={plan.id} className="p-8" style={{ borderRight: '1px solid var(--nx-line, currentColor)' }}>
          <h3 className={cn(display, 'text-3xl')}>{plan.name}</h3>
          <p className={cn(display, 'mt-6 text-5xl')}>{plan.price}</p>
          {plan.note ? <p className="mt-3" style={{ color: 'var(--nx-muted, inherit)' }}>{plan.note}</p> : null}
          <div className="mt-8">{plan.action}</div>
        </article>
      ))}
    </div>
  )
}

function Slab({ plans, picked, onPick }: { plans: PricePlan[]; picked: string; onPick: (id: string) => void }) {
  if (plans.length === 0) return null
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => {
        const on = plan.id === picked
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onPick(plan.id)}
            className="p-6 text-left"
            style={{
              background: 'var(--nx-elev, transparent)',
              boxShadow: on ? `inset 0 0 0 2px var(--nx-accent, currentColor)` : 'inset 0 0 0 1px var(--nx-line, currentColor)',
            }}
          >
            <h3 className={cn(display, 'text-2xl')}>{plan.name}</h3>
            <p className={cn(display, 'mt-4 text-4xl')}>{plan.price}</p>
            {plan.features ? (
              <ul className="mt-6 space-y-2 text-sm" style={{ color: 'var(--nx-muted, inherit)' }}>
                {plan.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6" onClick={(event) => event.stopPropagation()}>
              {plan.action}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function Ledger({ plans }: { plans: PricePlan[] }) {
  if (plans.length === 0) return null
  return (
    <div className="grid gap-0 md:grid-cols-3">
      {plans.map((plan) => (
        <article key={plan.id} className="px-1 py-2 md:px-6">
          <h3 className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
            {plan.name}
          </h3>
          <p className={cn(display, 'mt-4 border-b pb-4 text-5xl')} style={{ borderColor: 'var(--nx-line, currentColor)' }}>
            {plan.price}
          </p>
          {plan.features ? (
            <ul className="mt-4 space-y-2 text-sm">
              {plan.features.map((item, index) => (
                <li key={index} className="border-b py-2" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6">{plan.action}</div>
        </article>
      ))}
    </div>
  )
}

function Toggle({
  plans,
  period,
  yearFactor,
  onPeriod,
}: {
  plans: PricePlan[]
  period: PricePeriod
  yearFactor: number
  onPeriod: (period: PricePeriod) => void
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <div>
      <div className="mb-8 inline-flex p-1" style={{ border: '1px solid var(--nx-line, currentColor)' }}>
        {(['month', 'year'] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={period === item}
            className="relative h-11 px-4 text-sm"
            onClick={() => onPeriod(item)}
          >
            {period === item ? (
              <motion.span
                layoutId={reduced ? undefined : 'nx-period'}
                className="absolute inset-0"
                style={{ background: 'var(--nx-accent, currentColor)' }}
                transition={springs.snap}
              />
            ) : null}
            <span className="relative z-10" style={{ color: period === item ? 'var(--nx-accent-fg, inherit)' : 'inherit' }}>
              {item === 'year' ? 'Year' : 'Month'}
            </span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const amount = plan.amount
          const shown = amount == null ? plan.price : period === 'year' ? amount * yearFactor : amount
          return (
            <article key={plan.id} className="p-6" style={{ background: 'var(--nx-elev, transparent)' }}>
              <h3>{plan.name}</h3>
              <p className={cn(display, 'mt-4 text-5xl')}>{shown}</p>
              <div className="mt-6">{plan.action}</div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Seats({
  plans,
  seats,
  min,
  max,
  onSeats,
}: {
  plans: PricePlan[]
  seats: number
  min: number
  max: number
  onSeats: (value: number) => void
}) {
  const plan = plans[0]
  const total = (plan?.amount ?? 0) * seats
  const node = useCount(total)
  return (
    <div className="max-w-xl">
      <label className="block">
        <span className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
          Seats {seats}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={seats}
          onChange={(event) => onSeats(Number(event.target.value))}
          className="mt-3 h-11 w-full"
        />
      </label>
      <p className={cn(display, 'mt-8 text-[clamp(3rem,8vw,6rem)] leading-none')}>
        <span ref={node}>{total.toLocaleString()}</span>
      </p>
      <div className="mt-6">{plan?.action}</div>
    </div>
  )
}

function Meter({
  plans,
  usage,
  included,
  onUsage,
}: {
  plans: PricePlan[]
  usage: number
  included: number
  onUsage: (value: number) => void
}) {
  const over = Math.max(0, usage - included)
  const fill = Math.min(1, usage / (included * 1.6 || 1))
  return (
    <div className="max-w-xl">
      <p className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
        Included {included} · Used {usage}
        {over > 0 ? ` · Overage ${over}` : ''}
      </p>
      <div className="mt-4 h-3 overflow-hidden" style={{ background: 'var(--nx-elev, transparent)' }}>
        <motion.div className="h-full" style={{ background: 'var(--nx-accent, currentColor)', width: `${fill * 100}%` }} />
      </div>
      <input
        type="range"
        min={0}
        max={included * 2}
        value={usage}
        onChange={(event) => onUsage(Number(event.target.value))}
        className="mt-4 h-11 w-full"
        aria-label="Usage"
      />
      <div className="mt-8">{plans[0]?.action}</div>
    </div>
  )
}

function Matrix({ plans, rows }: { plans: PricePlan[]; rows: PriceRow[] }) {
  if (plans.length === 0) return null
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="px-3 py-3 font-normal" style={{ color: 'var(--nx-muted, inherit)' }}>
              Feature
            </th>
            {plans.map((plan) => (
              <th key={plan.id} className="px-3 py-3">
                <span className="block">{plan.name}</span>
                <span className={cn(display, 'mt-1 block text-2xl')}>{plan.price}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
              <th className="px-3 py-3 font-normal">{row.label}</th>
              {plans.map((plan) => (
                <td key={plan.id} className="px-3 py-3">
                  {row.values[plan.id] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Quote({
  plans,
  seats,
  period,
  usage,
  formula,
  onSeats,
  onPeriod,
}: {
  plans: PricePlan[]
  seats: number
  period: PricePeriod
  usage: number
  formula?: PricingProps['formula']
  onSeats: (value: number) => void
  onPeriod: (period: PricePeriod) => void
}) {
  const amount = plans[0]?.amount ?? 0
  const total = useMemo(() => {
    if (formula) return formula({ seats, period, usage, amount })
    return amount * seats * (period === 'year' ? 10 : 1) + Math.max(0, usage - 100) * 0.2
  }, [amount, formula, period, seats, usage])
  const node = useCount(Math.round(total))
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="space-y-6">
        <label className="block">
          <span className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')}>Seats {seats}</span>
          <input type="range" min={1} max={80} value={seats} onChange={(event) => onSeats(Number(event.target.value))} className="mt-2 h-11 w-full" />
        </label>
        <div className="flex gap-2">
          {(['month', 'year'] as const).map((item) => (
            <button
              key={item}
              type="button"
              className="h-11 px-4"
              style={{
                background: period === item ? 'var(--nx-accent, currentColor)' : 'transparent',
                color: period === item ? 'var(--nx-accent-fg, inherit)' : 'inherit',
                border: '1px solid var(--nx-line, currentColor)',
              }}
              onClick={() => onPeriod(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <aside className="p-5" style={{ background: 'var(--nx-elev, transparent)' }}>
        <p className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
          Total
        </p>
        <p className={cn(display, 'mt-3 text-5xl')}>
          <span ref={node}>{Math.round(total).toLocaleString()}</span>
        </p>
        <ul className="mt-6 space-y-2 text-sm" style={{ color: 'var(--nx-muted, inherit)' }}>
          <li>Base × seats</li>
          <li>Period {period}</li>
          <li>Usage {usage}</li>
        </ul>
        <div className="mt-6">{plans[0]?.action}</div>
      </aside>
    </div>
  )
}

function Morph({
  plans,
  rows,
  picked,
  view,
  onPick,
  onView,
}: {
  plans: PricePlan[]
  rows: PriceRow[]
  picked: string
  view: 'slab' | 'table'
  onPick: (id: string) => void
  onView: (view: 'slab' | 'table') => void
}) {
  return (
    <div>
      <div className="mb-6 flex gap-2">
        {(['slab', 'table'] as const).map((item) => (
          <button
            key={item}
            type="button"
            className="h-11 px-4 text-sm"
            style={{ border: '1px solid var(--nx-line, currentColor)' }}
            onClick={() => onView(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={springs.ui}>
          {view === 'slab' ? <Slab plans={plans} picked={picked} onPick={onPick} /> : <Matrix plans={plans} rows={rows} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Dossier({
  plans,
  rows,
  chapters,
  chapter,
  onChapter,
  picked,
}: {
  plans: PricePlan[]
  rows: PriceRow[]
  chapters?: Array<{ id: string; label: ReactNode }>
  chapter: string
  onChapter: (id: string) => void
  picked: string
}) {
  const plan = plans.find((item) => item.id === picked) ?? plans[0]
  const filtered = chapter === 'all' ? rows : rows.filter((row) => row.id.startsWith(chapter) || row.note === chapter)
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div>
        {chapters && chapters.length > 0 ? (
          <div className="mb-6 flex flex-wrap gap-2">
            <button type="button" className="h-11 px-3 text-sm" onClick={() => onChapter('all')}>
              All
            </button>
            {chapters.map((item) => (
              <button key={item.id} type="button" className="h-11 px-3 text-sm" onClick={() => onChapter(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
        <Matrix plans={plans} rows={filtered} />
      </div>
      <aside className="lg:sticky lg:top-6 h-fit p-5" style={{ background: 'var(--nx-elev, transparent)' }}>
        <p className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')}>Summary</p>
        {plan ? (
          <>
            <p className={cn(display, 'mt-3 text-3xl')}>{plan.name}</p>
            <p className="mt-2 text-2xl">{plan.price}</p>
            <div className="mt-6">{plan.action}</div>
          </>
        ) : null}
      </aside>
    </div>
  )
}
