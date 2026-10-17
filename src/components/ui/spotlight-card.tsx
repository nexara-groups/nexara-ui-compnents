'use client'

import { type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'profile',
  'pricing',
  'product',
  'testimonial',
  'stat',
  'music',
  'weather',
  'notification',
  'repo',
  'task',
  'article',
  'place',
] as const

export type SpotlightVariant = (typeof VARIANTS)[number]

export interface SpotlightCardProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  variant?: SpotlightVariant
  spotlightColor?: string
  spotlightSize?: number
  borderGlow?: boolean
  borderGlowColor?: string
  lift?: boolean
  style?: CSSProperties
  onPointerMove?: (event: PointerEvent<HTMLDivElement>) => void
  onPointerLeave?: (event: PointerEvent<HTMLDivElement>) => void
}

/**
 * SpotlightCard
 * Twelve card products. A pointer wash sits on top of each; the anatomy differs.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function SpotlightCard({
  children,
  className,
  contentClassName,
  variant = 'profile',
  spotlightColor = 'rgba(139, 124, 255, 0.35)',
  spotlightSize = 180,
  lift = true,
  style,
  onPointerMove,
  onPointerLeave,
}: SpotlightCardProps) {
  function writeSpot(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--sx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--sy', `${event.clientY - rect.top}px`)
    onPointerMove?.(event)
  }

  return (
    <article
      data-nexara="spotlight-card"
      data-variant={variant}
      onPointerMove={writeSpot}
      onPointerLeave={onPointerLeave}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-[#12131c] p-5 text-left text-[#f6f3ec]',
        lift && 'transition-transform motion-safe:hover:-translate-y-0.5',
        className,
      )}
      style={style}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize / 2}px circle at var(--sx, 50%) var(--sy, 30%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className={cn('relative z-10', contentClassName)}>
        <Face variant={variant} />
        {children ? <div className="mt-3 text-sm text-zinc-300">{children}</div> : null}
      </div>
    </article>
  )
}

function Face({ variant }: { variant: SpotlightVariant }) {
  if (variant === 'pricing') {
    return (
      <div>
        <p className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Studio</p>
        <p className="mt-2 font-serif text-4xl">$48</p>
        <ul className="mt-3 space-y-1 text-sm text-zinc-300">
          <li>Shared rooms</li>
          <li>Export pack</li>
        </ul>
        <span className="mt-4 inline-flex h-9 items-center rounded-full bg-[#f6f3ec] px-3 text-sm text-[#16140f]">Choose</span>
      </div>
    )
  }
  if (variant === 'product') {
    return (
      <div>
        <div className="mb-3 h-24 rounded-2xl bg-[linear-gradient(135deg,#ff6a3d,#f5c16c)]" />
        <div className="flex items-end justify-between">
          <p className="font-serif text-2xl">Lamp 04</p>
          <p className="text-[#f5c16c]">$220</p>
        </div>
      </div>
    )
  }
  if (variant === 'testimonial') {
    return (
      <div>
        <p className="text-[#f5c16c]">★★★★★</p>
        <p className="mt-2 font-serif text-xl">“Quiet, and finished.”</p>
        <p className="mt-3 text-sm text-zinc-400">Ada Klein</p>
      </div>
    )
  }
  if (variant === 'stat') {
    return (
      <div>
        <p className="text-xs text-zinc-400">Uptime</p>
        <p className="font-serif text-5xl">99.9</p>
        <p className="text-sm text-[#3ddec4]">+0.2 this week</p>
        <svg viewBox="0 0 120 28" className="mt-3 h-7 w-full" aria-hidden="true">
          <polyline fill="none" stroke="#3ddec4" strokeWidth="2" points="0,22 20,18 40,20 60,8 80,12 100,6 120,4" />
        </svg>
      </div>
    )
  }
  if (variant === 'music') {
    return (
      <div className="flex gap-3">
        <div className="size-16 shrink-0 rounded-xl bg-[#8b7cff]" />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg">Night desk</p>
          <p className="text-xs text-zinc-400">Side A</p>
          <div className="mt-3 h-1 rounded-full bg-white/10">
            <div className="h-1 w-1/2 rounded-full bg-[#f6f3ec]" />
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'weather') {
    return (
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">Lisbon</p>
          <p className="font-serif text-5xl">18°</p>
        </div>
        <p className="text-right text-sm text-zinc-300">Clear<br />H 21 · L 14</p>
      </div>
    )
  }
  if (variant === 'notification') {
    return (
      <div className="flex gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#ff6a3d] text-sm text-[#1a100c]">N</span>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-medium">Nexara</p>
            <p className="text-xs text-zinc-500">now</p>
          </div>
          <p className="text-sm text-zinc-300">The export is ready.</p>
        </div>
      </div>
    )
  }
  if (variant === 'repo') {
    return (
      <div>
        <p className="font-medium">nexara / ui</p>
        <p className="mt-1 text-sm text-zinc-400">Copy-paste components.</p>
        <p className="mt-3 flex gap-3 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-[#8b7cff]" /> TS</span>
          <span>★ 128</span>
        </p>
      </div>
    )
  }
  if (variant === 'task') {
    return (
      <div>
        <label className="flex items-start gap-3">
          <input type="checkbox" className="mt-1 size-4 accent-[#3ddec4]" defaultChecked={false} />
          <span>
            <span className="block font-medium">Review the mast</span>
            <span className="mt-2 flex gap-2">
              <span className="rounded-full bg-[#ff6a3d]/20 px-2 py-0.5 text-xs text-[#ffb089]">Design</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">Ada</span>
            </span>
          </span>
        </label>
      </div>
    )
  }
  if (variant === 'article') {
    return (
      <div>
        <p className="text-xs tracking-[0.16em] text-[#f5c16c] uppercase">Essay</p>
        <p className="mt-2 font-serif text-2xl leading-tight">A quieter measure of the room</p>
        <p className="mt-2 text-sm text-zinc-400">6 min · Issue 18</p>
      </div>
    )
  }
  if (variant === 'place') {
    return (
      <div>
        <div className="mb-3 h-20 rounded-2xl bg-[linear-gradient(#1a3a34,#0c1a18)] [background-image:radial-gradient(circle_at_30%_40%,#3ddec4_0_3px,transparent_4px),radial-gradient(circle_at_70%_60%,#f5c16c_0_3px,transparent_4px)]" />
        <p className="font-serif text-xl">Harbor Hall</p>
        <p className="text-sm text-zinc-400">1.2 km · Open until 22:00</p>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#8b7cff] font-serif text-lg text-[#09090f]">AK</span>
      <div>
        <p className="font-serif text-xl">Ada Klein</p>
        <p className="text-sm text-zinc-400">Studio lead</p>
      </div>
      <span className="ml-auto rounded-full border border-white/15 px-3 py-1 text-xs">Follow</span>
    </div>
  )
}
