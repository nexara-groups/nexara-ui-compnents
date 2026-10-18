'use client'

import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'event',
  'flip',
  'circular',
  'inline',
  'poster',
  'race',
  'exam',
  'launch',
  'match',
  'ribbon',
  'minimal',
  'analog',
] as const

export type CountdownVariant = (typeof VARIANTS)[number]

export interface CountdownProps {
  variant?: CountdownVariant
  className?: string
  target?: string
  title?: string
}

function useRemaining(target: string) {
  const end = useMemo(() => new Date(target).getTime(), [target])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const delta = Math.max(0, end - now)
  const days = Math.floor(delta / 86400000)
  const hours = Math.floor((delta % 86400000) / 3600000)
  const minutes = Math.floor((delta % 3600000) / 60000)
  const seconds = Math.floor((delta % 60000) / 1000)
  return { days, hours, minutes, seconds, done: delta === 0 }
}

const pad = (value: number) => String(value).padStart(2, '0')

/**
 * Countdown
 * Twelve clocks for events, exams, launches, and race days.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Countdown({
  variant = 'event',
  className,
  target = '2026-12-12T09:00:00+05:30',
  title = 'Field Night Championships',
}: CountdownProps) {
  const time = useRemaining(target)
  const units = [
    ['Days', time.days],
    ['Hours', time.hours],
    ['Min', time.minutes],
    ['Sec', time.seconds],
  ] as const

  return (
    <section data-nexara="countdown" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'event' ? (
        <div className="rounded-[1.6rem] border border-nx-border bg-nx-card p-6">
          <p className="text-[11px] tracking-[0.2em] text-nx-accent uppercase">Next meet</p>
          <h3 className="mt-2 font-serif text-3xl">{title}</h3>
          <p className="mt-1 text-sm text-nx-muted">Visakhapatnam Indoor · 12 Dec</p>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {units.map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-nx-bg p-3 text-center">
                <p className="font-serif text-3xl">{pad(value)}</p>
                <p className="mt-1 text-[10px] tracking-[0.16em] text-nx-muted uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'flip' ? (
        <div className="flex flex-wrap justify-center gap-2">
          {units.map(([label, value]) => (
            <div key={label} className="w-20 rounded-xl bg-[#111113] p-3 text-center text-white">
              <p className="font-mono text-3xl">{pad(value)}</p>
              <p className="mt-1 text-[10px] text-white/50 uppercase">{label}</p>
            </div>
          ))}
        </div>
      ) : null}

      {variant === 'circular' ? (
        <div className="flex flex-wrap justify-center gap-6">
          {units.map(([label, value]) => (
            <div key={label} className="grid size-24 place-items-center rounded-full border border-nx-line">
              <div className="text-center">
                <p className="font-serif text-2xl">{pad(value)}</p>
                <p className="text-[10px] text-nx-muted uppercase">{label}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {variant === 'inline' ? (
        <p className="font-mono text-sm text-nx-muted">
          {title} in <strong className="text-nx-fg">{time.days}d {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}</strong>
        </p>
      ) : null}

      {variant === 'poster' ? (
        <div className="overflow-hidden rounded-[1.6rem] bg-[#111113] p-8 text-white">
          <p className="text-[11px] tracking-[0.22em] text-[#c8ff4d] uppercase">APRSA · RSFI</p>
          <h3 className="mt-4 font-serif text-5xl">{title}</h3>
          <p className="mt-6 font-mono text-4xl text-[#c8ff4d]">
            {pad(time.days)}:{pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
          </p>
        </div>
      ) : null}

      {variant === 'race' ? (
        <div className="flex items-center justify-between rounded-2xl border border-nx-border px-5 py-4">
          <div>
            <p className="text-xs text-nx-muted">Heat 4 · 500m</p>
            <p className="font-medium">Gun in</p>
          </div>
          <p className="font-mono text-3xl">
            {pad(time.minutes)}:{pad(time.seconds)}
          </p>
        </div>
      ) : null}

      {variant === 'exam' ? (
        <div className="rounded-2xl border border-nx-border bg-nx-elevated p-5">
          <p className="text-xs tracking-[0.16em] text-nx-muted uppercase">Academy exam window</p>
          <p className="mt-2 font-serif text-2xl">Closes in {time.days} days</p>
          <p className="mt-1 font-mono text-sm text-nx-muted">
            {pad(time.hours)}h {pad(time.minutes)}m remaining today
          </p>
        </div>
      ) : null}

      {variant === 'launch' ? (
        <div className="text-center">
          <p className="text-[11px] tracking-[0.2em] text-nx-accent uppercase">Agency OS launch</p>
          <p className="mt-3 font-serif text-5xl">
            {time.days} <span className="text-nx-muted">days</span>
          </p>
          <p className="mt-2 font-mono text-sm text-nx-muted">
            T−{pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
          </p>
        </div>
      ) : null}

      {variant === 'match' ? (
        <div className="grid gap-4 rounded-[1.4rem] bg-[#0b1220] p-6 text-[#f6f1ea] md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs tracking-[0.18em] text-[#f3b4b0] uppercase">Fixture</p>
            <p className="mt-2 font-serif text-3xl">Field vs Coastal</p>
          </div>
          <div className="font-mono text-2xl">
            {pad(time.days)}d {pad(time.hours)}h
          </div>
        </div>
      ) : null}

      {variant === 'ribbon' ? (
        <div className="flex flex-wrap items-center gap-3 rounded-full border border-nx-border bg-nx-card px-4 py-2 text-sm">
          <span className="text-nx-accent">Live in</span>
          {units.map(([label, value]) => (
            <span key={label} className="font-mono">
              {pad(value)}
              <span className="ml-1 text-[10px] text-nx-muted">{label[0]}</span>
            </span>
          ))}
        </div>
      ) : null}

      {variant === 'minimal' ? (
        <p className="font-serif text-4xl">
          {time.days} days to {title}
        </p>
      ) : null}

      {variant === 'analog' ? (
        <div className="flex items-center gap-6">
          <div className="relative grid size-28 place-items-center rounded-full border border-nx-line">
            <span className="absolute top-2 h-8 w-px bg-nx-fg" style={{ transform: `rotate(${(time.seconds / 60) * 360}deg)`, transformOrigin: 'bottom' }} />
            <span className="font-mono text-xs">{pad(time.seconds)}</span>
          </div>
          <div>
            <p className="font-serif text-2xl">{title}</p>
            <p className="text-sm text-nx-muted">
              {time.days} days · {pad(time.hours)} hours
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
