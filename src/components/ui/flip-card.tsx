'use client'

import { motion } from 'framer-motion'
import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { MediaFrame, faces, media } from '@/lib/media.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const VARIANTS = [
  'credit',
  'product',
  'pricing',
  'profile',
  'metric',
  'invite',
  'auth',
  'feature',
  'quote',
  'plan',
  'media',
  'flashcard',
] as const

export type FlipVariant = (typeof VARIANTS)[number]

export interface FlipCardProps {
  front?: ReactNode
  back?: ReactNode
  className?: string
  frontClassName?: string
  backClassName?: string
  variant?: FlipVariant
  flipOn?: 'hover' | 'click'
  flipped?: boolean
  defaultFlipped?: boolean
  onFlippedChange?: (flipped: boolean) => void
  duration?: number
  label?: string
}

/**
 * FlipCard
 * Twelve two-sided product cards. Copy this file plus `src/lib/utils.ts`.
 */
export function FlipCard({
  front,
  back,
  className,
  frontClassName,
  backClassName,
  variant = 'credit',
  flipOn = 'hover',
  flipped: flippedProp,
  defaultFlipped = false,
  onFlippedChange,
  duration = 0.55,
  label = 'card',
}: FlipCardProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [uncontrolled, setUncontrolled] = useState(defaultFlipped)
  const flipped = flippedProp ?? uncontrolled
  const transition = reduced ? { duration: 0 } : { duration, ease: [0.22, 1, 0.36, 1] as const }
  const faces = pair(variant)
  const frontNode = front ?? faces.front
  const backNode = back ?? faces.back

  function setFlipped(next: boolean) {
    if (flippedProp === undefined) setUncontrolled(next)
    onFlippedChange?.(next)
  }

  return (
    <div
      ref={rootRef}
      data-nexara="flip-card"
      data-variant={variant}
      className={cn('relative h-56', className)}
      onMouseEnter={flipOn === 'hover' ? () => setFlipped(true) : undefined}
      onMouseLeave={flipOn === 'hover' ? () => setFlipped(false) : undefined}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        if (flipOn !== 'click') return
        const target = event.target
        if (target instanceof Element && target.closest('a, button, input, textarea, select, label')) return
        setFlipped(!flipped)
      }}
    >
      <div className="h-full [perspective:1400px]">
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={transition}
        >
          <div
            className={cn('absolute inset-0 overflow-hidden [backface-visibility:hidden]', flipped && 'pointer-events-none', frontClassName)}
            inert={flipped ? true : undefined}
            aria-hidden={flipped || undefined}
          >
            {frontNode}
          </div>
          <div
            className={cn('absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]', !flipped && 'pointer-events-none', backClassName)}
            inert={!flipped ? true : undefined}
            aria-hidden={!flipped || undefined}
          >
            {backNode}
          </div>
        </motion.div>
      </div>
      <button
        type="button"
        aria-pressed={flipped}
        className="absolute right-3 bottom-3 z-20 inline-flex min-h-11 items-center rounded-full border border-nx-border bg-nx-card/90 px-3 text-xs text-nx-fg backdrop-blur"
        onClick={(event) => {
          event.stopPropagation()
          setFlipped(!flipped)
        }}
      >
        {flipped ? 'Show front' : 'Show back'}
        <span className="sr-only"> of {label}</span>
      </button>
    </div>
  )
}

function pair(variant: FlipVariant): { front: ReactNode; back: ReactNode } {
  if (variant === 'product') {
    return {
      front: (
        <Face className="rounded-[1.4rem] border border-nx-border bg-nx-card">
          <MediaFrame src={media.lamp} alt="Lamp 04" className="h-24 rounded-2xl" />
          <p className="mt-3 text-lg font-medium">Lamp 04</p>
          <p className="text-sm text-nx-muted">$220 · brushed oak</p>
        </Face>
      ),
      back: (
        <Face className="rounded-[1.4rem] bg-nx-fg text-nx-bg">
          <p className="text-xs tracking-[0.16em] uppercase opacity-60">Specs</p>
          <p className="mt-3 text-sm leading-6">48cm · linen cord · 40W · Harbor finish</p>
          <p className="mt-auto text-sm">Ships in 4 days</p>
        </Face>
      ),
    }
  }
  if (variant === 'pricing') {
    return {
      front: (
        <Face className="rounded-[1.5rem] border border-nx-border bg-nx-card">
          <p className="text-xs text-nx-muted">Studio</p>
          <p className="mt-2 font-serif text-5xl">$48</p>
          <p className="text-sm text-nx-muted">per seat / month</p>
        </Face>
      ),
      back: (
        <Face className="rounded-[1.5rem] bg-nx-accent text-nx-accent-fg">
          <p className="text-xs tracking-[0.16em] uppercase opacity-70">Includes</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Unlimited rooms</li>
            <li>Shared libraries</li>
            <li>Priority export</li>
          </ul>
        </Face>
      ),
    }
  }
  if (variant === 'profile') {
    return {
      front: (
        <Face className="items-center rounded-[1.5rem] border border-nx-border bg-nx-card text-center">
          <MediaFrame src={faces[0].src} alt="" grain={false} className="size-16 rounded-full" />
          <p className="mt-3 text-xl font-medium">{faces[0].name}</p>
          <p className="text-sm text-nx-muted">Studio lead · Harbor</p>
        </Face>
      ),
      back: (
        <Face className="rounded-[1.5rem] bg-nx-elevated">
          <p className="text-xs tracking-[0.16em] text-nx-muted uppercase">Bio</p>
          <p className="mt-3 text-sm leading-6 text-nx-muted">Designs rooms, writes the notes, keeps the lights low. Previously Field.</p>
        </Face>
      ),
    }
  }
  if (variant === 'metric') {
    return {
      front: (
        <Face className="rounded-2xl border border-nx-border bg-nx-card">
          <p className="text-xs text-nx-muted">Export success</p>
          <p className="mt-2 font-serif text-5xl">99.98</p>
          <p className="text-sm text-nx-ok">+4.1% this week</p>
        </Face>
      ),
      back: (
        <Face className="rounded-2xl bg-[#111113] text-white">
          <p className="text-xs text-white/50">Breakdown</p>
          <p className="mt-3 text-sm">1.2M jobs · 18 failures · p95 240ms</p>
        </Face>
      ),
    }
  }
  if (variant === 'invite') {
    return {
      front: (
        <Face className="rounded-[1.4rem] border border-nx-border bg-nx-card">
          <p className="text-xs tracking-[0.18em] text-nx-accent uppercase">Invite</p>
          <p className="mt-4 font-serif text-3xl leading-none">Harbor Hall</p>
          <p className="mt-auto text-sm text-nx-muted">12 Nov · 19:00</p>
        </Face>
      ),
      back: (
        <Face className="rounded-[1.4rem] bg-nx-fg text-nx-bg">
          <p className="text-xs uppercase opacity-60">Seat</p>
          <p className="mt-3 font-mono text-2xl">C12</p>
          <p className="mt-auto text-sm">Show this at the door</p>
        </Face>
      ),
    }
  }
  if (variant === 'auth') {
    return {
      front: (
        <Face className="rounded-2xl border border-nx-border bg-nx-card">
          <p className="text-sm font-medium">Sign in to Nexara</p>
          <p className="mt-2 text-sm text-nx-muted">We’ll email a six-digit code.</p>
        </Face>
      ),
      back: (
        <Face className="items-center rounded-2xl bg-nx-fg text-nx-bg">
          <p className="text-xs tracking-[0.16em] uppercase opacity-60">Code</p>
          <p className="mt-4 font-mono text-3xl tracking-[0.3em]">418 229</p>
        </Face>
      ),
    }
  }
  if (variant === 'feature') {
    return {
      front: (
        <Face className="rounded-2xl border border-nx-border bg-nx-card">
          <p className="text-xs text-nx-accent">New</p>
          <p className="mt-2 text-xl font-medium">Command palette</p>
          <p className="mt-2 text-sm text-nx-muted">Jump any room with ⌘K.</p>
        </Face>
      ),
      back: (
        <Face className="rounded-2xl border border-nx-border bg-nx-elevated">
          <p className="font-mono text-sm text-nx-muted">⌘K → “Harbor”</p>
          <p className="mt-auto text-sm">Opens the last export.</p>
        </Face>
      ),
    }
  }
  if (variant === 'quote') {
    return {
      front: (
        <Face className="rounded-none border-l-2 border-nx-accent bg-transparent pl-5">
          <p className="font-serif text-2xl leading-snug">“The registry finally feels like a product.”</p>
        </Face>
      ),
      back: (
        <Face className="rounded-none bg-transparent">
          <p className="text-sm font-medium">{faces[0].name}</p>
          <p className="text-sm text-nx-muted">Harbor · Issue 18</p>
        </Face>
      ),
    }
  }
  if (variant === 'plan') {
    return {
      front: (
        <Face className="rounded-2xl bg-nx-fg text-nx-bg">
          <p className="text-xs uppercase opacity-60">This week</p>
          <p className="mt-3 text-xl">Ship the mast</p>
        </Face>
      ),
      back: (
        <Face className="rounded-2xl border border-nx-border bg-nx-card">
          <ul className="space-y-2 text-sm text-nx-muted">
            <li>Review copy</li>
            <li>Lock tokens</li>
            <li>Record walkthrough</li>
          </ul>
        </Face>
      ),
    }
  }
  if (variant === 'media') {
    return {
      front: (
        <Face className="relative rounded-[1.4rem] p-0">
          <MediaFrame src={media.journal} alt="Issue 18 cover" className="absolute inset-0" />
          <p className="relative z-10 mt-auto p-5 text-lg font-medium text-white">Issue 18 cover</p>
        </Face>
      ),
      back: (
        <Face className="rounded-[1.4rem] bg-nx-card">
          <p className="text-sm text-nx-muted">Mira Chen · 6 min · Essay</p>
          <p className="mt-3 font-serif text-2xl">A quieter measure of the room</p>
        </Face>
      ),
    }
  }
  if (variant === 'flashcard') {
    return {
      front: (
        <Face className="rounded-xl border border-nx-border bg-nx-card">
          <p className="text-xs text-nx-muted">Term</p>
          <p className="m-auto font-serif text-3xl">Atelier</p>
        </Face>
      ),
      back: (
        <Face className="rounded-xl bg-nx-fg text-nx-bg">
          <p className="text-xs uppercase opacity-60">Definition</p>
          <p className="mt-4 text-sm leading-6">A room set aside for making.</p>
        </Face>
      ),
    }
  }
  return {
    front: (
      <Face className="rounded-2xl bg-[linear-gradient(135deg,#17151f,#2a2040)] text-white">
        <div className="flex justify-between text-[11px] tracking-[0.16em] uppercase">
          <span>Nexara</span>
          <span>Debit</span>
        </div>
        <div className="mt-6 h-8 w-11 rounded-md bg-[#e4c56d]" />
        <p className="mt-auto font-mono tracking-[0.18em]">4242  1881  2041  09</p>
      </Face>
    ),
    back: (
      <Face className="rounded-2xl bg-[#1a1814] p-0 text-white">
        <div className="mt-6 h-10 bg-black" />
        <p className="mt-4 px-5 font-mono text-sm">CVV 188</p>
      </Face>
    ),
  }
}

function Face({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex h-full flex-col p-5 text-nx-fg', className)}>{children}</div>
}
