'use client'

import { isWowVariant } from '@/lib/wow-variants.ts'
import { WowSignature } from './wow-lazy.tsx'

import { cn, useCountUp } from '@/lib/utils.ts'

const VARIANTS = [
  'metric',
  'spark',
  'delta',
  'progress',
  'ring',
  'compare',
  'live',
  'currency',
  'queue',
  'health',
  'target',
  'stack',
  'odometer-spark',
  'ring-draw',
  'particle-live',
  'spark-delta',
] as const

export type KpiVariant = (typeof VARIANTS)[number]

export interface KpiProps {
  variant?: KpiVariant
  className?: string
  label?: string
  value?: number
  suffix?: string
  prefix?: string
}

/**
 * KPI
 * Twelve dashboard metric tiles for Agency OS and clinic desks.
 * Copy this file plus `src/lib/utils.ts`.
 */
function KpiCore({
  variant = 'metric',
  className,
  label = 'Open leads',
  value = 24,
  suffix = '',
  prefix = '',
}: KpiProps) {
  const count = useCountUp(value)
  const shown = `${prefix}${count}${suffix}`

  return (
    <article data-nexara="kpi" data-variant={variant} className={cn('rounded-[1.3rem] border border-nx-border bg-nx-card p-4', className)}>
      {variant === 'metric' ? (
        <>
          <p className="text-xs text-nx-muted">{label}</p>
          <p className="mt-2 font-serif text-4xl">{shown}</p>
        </>
      ) : null}

      {variant === 'spark' ? (
        <>
          <p className="text-xs text-nx-muted">{label}</p>
          <p className="mt-2 font-serif text-3xl">{shown}</p>
          <svg viewBox="0 0 120 36" className="mt-3 w-full text-nx-accent" aria-hidden="true">
            <path d="M0 28 20 22 40 24 60 12 80 16 100 6 120 10" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </>
      ) : null}

      {variant === 'delta' ? (
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-nx-muted">{label}</p>
            <p className="mt-2 font-serif text-3xl">{shown}</p>
          </div>
          <p className="text-sm text-nx-ok">+12%</p>
        </div>
      ) : null}

      {variant === 'progress' || variant === 'target' ? (
        <>
          <p className="text-xs text-nx-muted">{label}</p>
          <p className="mt-2 font-serif text-3xl">{shown}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-nx-elevated">
            <div className="h-full w-[68%] bg-nx-accent" />
          </div>
          <p className="mt-2 text-xs text-nx-muted">68% of weekly target</p>
        </>
      ) : null}

      {variant === 'ring' ? (
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 64 64" className="size-16" aria-hidden="true">
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--nx-border)" strokeWidth="6" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--nx-accent)" strokeWidth="6" strokeDasharray="120 163" strokeLinecap="round" transform="rotate(-90 32 32)" />
          </svg>
          <div>
            <p className="text-xs text-nx-muted">{label}</p>
            <p className="font-serif text-3xl">{shown}</p>
          </div>
        </div>
      ) : null}

      {variant === 'compare' ? (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-nx-muted">Last week</p>
            <p className="font-serif text-2xl">18</p>
          </div>
          <div>
            <p className="text-xs text-nx-muted">This week</p>
            <p className="font-serif text-2xl">{shown}</p>
          </div>
        </div>
      ) : null}

      {variant === 'live' ? (
        <>
          <p className="inline-flex items-center gap-2 text-xs text-nx-ok">
            <span className="size-1.5 rounded-full bg-nx-ok" />
            Live queue
          </p>
          <p className="mt-2 font-serif text-4xl">{shown}</p>
          <p className="text-xs text-nx-muted">Patients in OPD</p>
        </>
      ) : null}

      {variant === 'currency' ? (
        <>
          <p className="text-xs text-nx-muted">Booked this quarter</p>
          <p className="mt-2 font-serif text-3xl">₹{count} L</p>
        </>
      ) : null}

      {variant === 'queue' ? (
        <>
          <p className="text-xs text-nx-muted">Export queue</p>
          <p className="mt-2 font-serif text-3xl">{shown}</p>
          <p className="mt-1 text-xs text-nx-warn">3 waiting on review</p>
        </>
      ) : null}

      {variant === 'health' ? (
        <>
          <p className="text-xs text-nx-muted">Uptime</p>
          <p className="mt-2 font-serif text-3xl text-nx-ok">99.98%</p>
          <p className="text-xs text-nx-muted">Agency OS · last 30 days</p>
        </>
      ) : null}

      {variant === 'stack' ? (
        <div className="space-y-3">
          {[
            ['Leads', 24],
            ['Boards', 7],
            ['Invoices', 12],
          ].map(([name, figure]) => (
            <div key={String(name)} className="flex justify-between text-sm">
              <span className="text-nx-muted">{name}</span>
              <span className="font-medium">{figure}</span>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export function Kpi(props: KpiProps) {
  if (isWowVariant('kpi', props.variant)) {
    return (
      <WowSignature
        family="kpi"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <KpiCore {...props} />
}
