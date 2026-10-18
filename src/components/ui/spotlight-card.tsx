'use client'

import { type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { MediaFrame, faces, media } from '@/lib/media.tsx'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'profile',
  'pricing',
  'product',
  'testimonial',
  'stat',
  'player',
  'weather',
  'inbox',
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
 * Twelve product cards. Anatomy differs; a pointer wash sits on top.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function SpotlightCard({
  children,
  className,
  contentClassName,
  variant = 'profile',
  spotlightColor = 'color-mix(in oklab, var(--nx-accent) 35%, transparent)',
  spotlightSize = 220,
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
        'group relative overflow-hidden text-left text-nx-fg',
        lift && 'transition-transform duration-300 motion-safe:hover:-translate-y-0.5',
        shell(variant),
        className,
      )}
      style={style}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize / 2}px circle at var(--sx, 50%) var(--sy, 28%), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className={cn('relative z-10', contentClassName)}>
        <Face variant={variant} />
        {children ? <div className="mt-3 text-sm text-nx-muted">{children}</div> : null}
      </div>
    </article>
  )
}

function shell(variant: SpotlightVariant) {
  switch (variant) {
    case 'profile':
      return 'flex items-center rounded-full border border-nx-border bg-nx-card px-3 py-2.5 shadow-[var(--nx-shadow)]'
    case 'pricing':
      return 'rounded-[1.6rem] border border-nx-border bg-nx-card p-6 shadow-[var(--nx-shadow)]'
    case 'product':
      return 'rounded-[1.4rem] border border-nx-border bg-nx-card p-2 shadow-[var(--nx-shadow)]'
    case 'testimonial':
      return 'rounded-none border-0 bg-transparent p-0'
    case 'stat':
      return 'rounded-2xl border border-nx-border bg-nx-elevated p-5'
    case 'player':
      return 'rounded-[1.7rem] bg-[#111113] p-4 text-white'
    case 'weather':
      return 'rounded-[1.8rem] bg-[linear-gradient(180deg,#7aa7ff_0%,#f3c27a_55%,#f6efe4_100%)] p-5 text-[#1d1a14]'
    case 'inbox':
      return 'rounded-2xl border border-nx-border bg-nx-card p-4 shadow-[var(--nx-shadow)]'
    case 'repo':
      return 'rounded-xl border border-nx-border bg-nx-bg p-4 font-mono'
    case 'task':
      return 'rounded-xl border border-nx-border bg-nx-card p-4'
    case 'article':
      return 'grid grid-cols-[5.5rem_1fr] gap-4 rounded-none border-0 bg-transparent p-0'
    case 'place':
      return 'overflow-hidden rounded-[1.5rem] border border-nx-border bg-nx-card p-0 shadow-[var(--nx-shadow)]'
    default:
      return 'rounded-3xl border border-nx-border bg-nx-card p-5'
  }
}

function Face({ variant }: { variant: SpotlightVariant }) {
  if (variant === 'pricing') {
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-[0.16em] text-nx-muted uppercase">Studio</p>
          <span className="rounded-full bg-nx-soft px-2 py-0.5 text-[11px] text-nx-accent">Most teams</span>
        </div>
        <p className="mt-3 font-serif text-5xl tracking-tight">
          $48<span className="ml-1 text-base text-nx-muted">/mo</span>
        </p>
        <ul className="mt-4 space-y-2 text-sm text-nx-muted">
          <li className="flex gap-2"><Check /> Unlimited rooms</li>
          <li className="flex gap-2"><Check /> Shared libraries</li>
          <li className="flex gap-2"><Check /> Priority export</li>
        </ul>
        <span className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-nx-fg text-sm text-nx-bg">
          Start Studio
        </span>
      </div>
    )
  }
  if (variant === 'product') {
    return (
      <div>
        <div className="relative h-36 overflow-hidden rounded-[1.1rem]">
          <MediaFrame src={media.lamp} alt="Lamp 04" className="h-36" />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#16140f]">
            In stock
          </span>
        </div>
        <div className="flex items-end justify-between px-2 pt-3 pb-1">
          <div>
            <p className="text-sm font-medium">Lamp 04</p>
            <p className="text-xs text-nx-muted">Brushed oak · 48cm</p>
          </div>
          <p className="text-sm font-medium">$220</p>
        </div>
      </div>
    )
  }
  if (variant === 'testimonial') {
    return (
      <figure className="border-l-2 border-nx-accent pl-5">
        <blockquote className="font-serif text-2xl leading-snug text-balance">
          “The registry finally feels like a product, not a folder of snippets.”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3 text-sm">
          <MediaFrame src={faces[0].src} alt="" grain={false} className="size-8 rounded-full" />
          <span>
            <span className="block font-medium">{faces[0].name}</span>
            <span className="text-nx-muted">Studio lead, Harbor</span>
          </span>
        </figcaption>
      </figure>
    )
  }
  if (variant === 'stat') {
    return (
      <div>
        <div className="flex items-center justify-between text-xs text-nx-muted">
          <span>Export success</span>
          <span className="text-nx-ok">+4.1%</span>
        </div>
        <p className="mt-2 font-serif text-5xl tracking-tight">99.98</p>
        <svg viewBox="0 0 160 36" className="mt-4 h-10 w-full" aria-hidden="true">
          <path d="M0 28 C20 26, 28 18, 40 20 S60 30, 80 16 110 8, 130 12 150 6, 160 4" fill="none" stroke="var(--nx-accent)" strokeWidth="2" />
          <path d="M0 36 L0 28 C20 26, 28 18, 40 20 S60 30, 80 16 110 8, 130 12 150 6, 160 4 V36 Z" fill="var(--nx-soft)" />
        </svg>
      </div>
    )
  }
  if (variant === 'player') {
    return (
      <div className="flex gap-4">
        <MediaFrame src={media.cinema} alt="" className="size-16 shrink-0 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Night desk</p>
          <p className="text-xs text-white/50">Side A · Harbor Sessions</p>
          <div className="mt-3 h-1 rounded-full bg-white/10">
            <div className="relative h-1 w-2/3 rounded-full bg-white">
              <span className="absolute top-1/2 right-0 size-2.5 -translate-y-1/2 rounded-full bg-white" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
            <span>1:24</span>
            <span className="ml-auto">3:08</span>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'weather') {
    return (
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm/none opacity-70">Lisbon · today</p>
          <p className="mt-2 font-serif text-6xl leading-none">18°</p>
          <p className="mt-2 text-sm">Clear · H 21° · L 14°</p>
        </div>
        <span className="size-14 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fff6d2,transparent_55%),#f2b84b]" />
      </div>
    )
  }
  if (variant === 'inbox') {
    return (
      <div className="flex gap-3">
        <MediaFrame src={faces[1].src} alt="" grain={false} className="size-10 rounded-xl" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-medium">Export ready</p>
            <p className="text-[11px] text-nx-muted">2m</p>
          </div>
          <p className="mt-0.5 text-sm text-nx-muted">Harbor Hall pack · 128 components</p>
        </div>
      </div>
    )
  }
  if (variant === 'repo') {
    return (
      <div>
        <p className="text-sm">
          <span className="text-nx-muted">nexara-groups /</span> nexara-ui
        </p>
        <p className="mt-2 text-xs leading-5 text-nx-muted">Original copy-paste components for product teams.</p>
        <p className="mt-3 flex gap-4 text-xs text-nx-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#3178c6]" />
            TypeScript
          </span>
          <span>★ 1.2k</span>
          <span>Apache-2.0</span>
        </p>
      </div>
    )
  }
  if (variant === 'task') {
    return (
      <div>
        <label className="flex items-start gap-3">
          <input type="checkbox" className="size-11 shrink-0 accent-[var(--nx-accent)]" />
          <span>
            <span className="block text-sm font-medium">Review the mast for Issue 18</span>
            <span className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-nx-soft px-2 py-0.5 text-[11px] text-nx-accent">Design</span>
              <span className="rounded-full bg-nx-bg px-2 py-0.5 text-[11px] text-nx-muted">Ada</span>
              <span className="rounded-full bg-nx-bg px-2 py-0.5 text-[11px] text-nx-muted">Today</span>
            </span>
          </span>
        </label>
      </div>
    )
  }
  if (variant === 'article') {
    return (
      <>
        <MediaFrame src={media.journal} alt="" className="h-20 rounded-lg" />
        <div>
          <p className="text-[11px] tracking-[0.16em] text-nx-accent uppercase">Essay · 6 min</p>
          <p className="mt-1 font-serif text-xl leading-tight">A quieter measure of the room</p>
          <p className="mt-1 text-xs text-nx-muted">Issue 18 · Meera Shah</p>
        </div>
      </>
    )
  }
  if (variant === 'place') {
    return (
      <div>
        <MediaFrame src={media.venues.studio} alt="Harbor Hall" className="h-24" />
        <div className="p-4">
          <p className="text-sm font-medium">Harbor Hall</p>
          <p className="text-xs text-nx-muted">1.2 km · Open until 22:00</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex w-full items-center gap-3">
      <MediaFrame src={faces[0].src} alt="" grain={false} className="size-10 rounded-full" />
      <div className="min-w-0">
        <p className="text-sm font-medium">{faces[0].name}</p>
        <p className="text-xs text-nx-muted">Studio lead · Harbor</p>
      </div>
      <span className="ml-auto rounded-full border border-nx-border px-3 py-1 text-xs">Follow</span>
    </div>
  )
}

function Check() {
  return (
    <svg className="mt-0.5 size-4 shrink-0 text-nx-ok" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
