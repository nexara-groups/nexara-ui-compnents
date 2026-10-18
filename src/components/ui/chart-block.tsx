'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'area',
  'bars',
  'line',
  'donut',
  'compare',
  'funnel',
  'heat',
  'stack',
  'spark',
  'goal',
  'mix',
  'clock',
] as const

export type ChartBlockVariant = (typeof VARIANTS)[number]

export interface ChartBlockProps {
  variant?: ChartBlockVariant
  className?: string
  title?: string
}

const series = [18, 22, 19, 28, 26, 34, 31, 38]
const bars = [40, 62, 48, 80, 55, 72]

/**
 * Chart block
 * Twelve SVG chart constructions. No chart library.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function ChartBlock({ variant = 'area', className, title = 'Leads this week' }: ChartBlockProps) {
  const points = series.map((value, index) => `${index * 16},${40 - value}`).join(' ')
  const area = `0,40 ${points} 112,40`

  return (
    <article data-nexara="chart-block" data-variant={variant} className={cn('rounded-[1.4rem] border border-nx-border bg-nx-card p-4', className)}>
      <p className="text-xs text-nx-muted">{title}</p>

      {variant === 'area' || variant === 'mix' ? (
        <svg viewBox="0 0 112 44" className="mt-3 w-full text-nx-accent" aria-hidden="true">
          <polygon points={area} fill="currentColor" opacity="0.18" />
          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      ) : null}

      {variant === 'line' || variant === 'spark' ? (
        <svg viewBox="0 0 112 44" className="mt-3 w-full" aria-hidden="true">
          <polyline points={points} fill="none" stroke="var(--nx-fg)" strokeWidth="1.6" />
        </svg>
      ) : null}

      {variant === 'bars' ? (
        <div className="mt-4 flex h-28 items-end gap-2">
          {bars.map((value, index) => (
            <div key={index} className="flex-1 rounded-t-md bg-nx-accent/80" style={{ height: `${value}%` }} />
          ))}
        </div>
      ) : null}

      {variant === 'donut' || variant === 'clock' ? (
        <div className="mt-3 flex items-center gap-4">
          <svg viewBox="0 0 64 64" className="size-20" aria-hidden="true">
            <circle cx="32" cy="32" r="22" fill="none" stroke="var(--nx-border)" strokeWidth="8" />
            <circle cx="32" cy="32" r="22" fill="none" stroke="var(--nx-accent)" strokeWidth="8" strokeDasharray="90 138" transform="rotate(-90 32 32)" />
          </svg>
          <p className="font-serif text-3xl">{variant === 'clock' ? '4h 12m' : '64%'}</p>
        </div>
      ) : null}

      {variant === 'compare' ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] text-nx-muted">Academy</p>
            <div className="mt-2 h-16 rounded-lg bg-nx-soft" />
          </div>
          <div>
            <p className="text-[11px] text-nx-muted">Labs</p>
            <div className="mt-2 h-24 rounded-lg bg-nx-accent/40" />
          </div>
        </div>
      ) : null}

      {variant === 'funnel' ? (
        <div className="mt-4 space-y-2">
          {['Briefs 48', 'Demos 22', 'Handovers 9'].map((label, index) => (
            <div key={label} className="mx-auto rounded-md bg-nx-fg py-1.5 text-center text-xs text-nx-bg" style={{ width: `${100 - index * 22}%` }}>
              {label}
            </div>
          ))}
        </div>
      ) : null}

      {variant === 'heat' ? (
        <div className="mt-4 grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }, (_, index) => (
            <span key={index} className="aspect-square rounded-sm bg-nx-accent" style={{ opacity: 0.15 + ((index * 17) % 80) / 100 }} />
          ))}
        </div>
      ) : null}

      {variant === 'stack' ? (
        <div className="mt-4 h-24 overflow-hidden rounded-xl">
          <div className="h-[40%] bg-nx-accent" />
          <div className="h-[35%] bg-nx-ok" />
          <div className="h-[25%] bg-nx-warn" />
        </div>
      ) : null}

      {variant === 'goal' ? (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-nx-muted">
            <span>₹8.46 Cr</span>
            <span>Target 10</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-nx-elevated">
            <div className="h-full w-[84%] bg-nx-ok" />
          </div>
        </div>
      ) : null}
    </article>
  )
}
