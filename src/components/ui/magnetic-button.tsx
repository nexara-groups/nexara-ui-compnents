'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cn, focusRing, usePrefersReducedMotion } from '@/lib/utils.ts'

const MAGNET_STYLES = [
  'pill',
  'orb',
  'dock',
  'fab',
  'chip',
  'glow',
  'tilt',
  'text',
  'badge',
  'glass',
  'key',
  'split',
] as const

export type MagnetStyle = (typeof MAGNET_STYLES)[number]

export interface MagneticButtonProps {
  magnet?: MagnetStyle
  strength?: number
  proximity?: number
  className?: string
  children?: ReactNode
  disabled?: boolean
  onClick?: () => void
}

/**
 * MagneticButton
 * Twelve product controls that share one pull toward a fine pointer.
 * Touch and reduced motion leave the control still.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function MagneticButton({
  magnet = 'pill',
  strength = 16,
  proximity = 24,
  className,
  children,
  disabled,
  onClick,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 24, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 280, damping: 24, mass: 0.35 })

  function reset() {
    x.set(0)
    y.set(0)
  }

  function onMove(event: PointerEvent<HTMLButtonElement>) {
    if (reduced || disabled || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    const dist = Math.hypot(dx, dy) || 1
    const reach = Math.max(rect.width, rect.height) / 2 + proximity
    if (dist > reach) {
      reset()
      return
    }
    const pull = (1 - dist / reach) * strength
    x.set((dx / dist) * pull)
    y.set((dy / dist) * pull)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      data-nexara="magnetic-button"
      data-variant={magnet}
      style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
      className={cn(focusRing, 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl disabled:opacity-45', className)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={() => onClick?.()}
    >
      <Shell magnet={magnet}>{children}</Shell>
    </motion.button>
  )
}

function Shell({ magnet, children }: { magnet: MagnetStyle; children?: ReactNode }) {
  if (magnet === 'orb') {
    return (
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-nx-fg text-sm font-medium text-nx-bg shadow-[var(--nx-shadow)]">
        {children}
      </span>
    )
  }
  if (magnet === 'dock') {
    return (
      <span className="inline-flex w-16 flex-col items-center gap-1">
        <span className="inline-flex size-12 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,#6d68ff,#4c46e0)] text-white shadow-[0_10px_24px_-12px_rgba(76,70,224,0.8)]">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <rect x="3" y="3" width="5" height="5" rx="1.2" fill="currentColor" />
            <rect x="10" y="3" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.7" />
            <rect x="3" y="10" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.7" />
            <rect x="10" y="10" width="5" height="5" rx="1.2" fill="currentColor" opacity="0.45" />
          </svg>
        </span>
        <span className="text-[10px] font-medium text-nx-muted">{children}</span>
      </span>
    )
  }
  if (magnet === 'fab') {
    return (
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-nx-accent text-lg text-nx-accent-fg shadow-[0_16px_40px_-18px_rgba(76,70,224,0.7)]">
        <span aria-hidden="true">+</span>
        <span className="sr-only">{children ?? 'Create'}</span>
      </span>
    )
  }
  if (magnet === 'chip') {
    return (
      <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-nx-border bg-nx-card px-3 text-sm text-nx-fg">
        <span className="size-1.5 rounded-full bg-nx-ok" />
        {children}
      </span>
    )
  }
  if (magnet === 'glow') {
    return (
      <span className="relative inline-flex h-11 items-center rounded-full bg-nx-fg px-5 text-sm text-nx-bg">
        <span aria-hidden="true" className="absolute -inset-3 rounded-full bg-nx-accent/25 blur-xl" />
        <span className="relative">{children}</span>
      </span>
    )
  }
  if (magnet === 'tilt') {
    return (
      <span className="inline-flex h-11 items-center rounded-xl border border-nx-border bg-nx-card px-4 text-sm text-nx-fg shadow-[var(--nx-shadow)] [transform:perspective(600px)_rotateX(8deg)]">
        {children}
      </span>
    )
  }
  if (magnet === 'text') {
    return (
      <span className="inline-flex min-h-11 items-center gap-1 px-1 text-sm font-medium text-nx-fg">
        {children}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
    )
  }
  if (magnet === 'badge') {
    return (
      <span className="relative inline-flex min-h-11 items-center rounded-xl border border-nx-border bg-nx-card px-3.5 text-sm text-nx-fg">
        {children}
        <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-nx-accent px-1 text-[10px] font-semibold text-nx-accent-fg">
          3
        </span>
      </span>
    )
  }
  if (magnet === 'glass') {
    return (
      <span className="inline-flex h-11 items-center rounded-full border border-nx-border bg-nx-glass px-5 text-sm text-nx-fg shadow-[var(--nx-shadow)] backdrop-blur-xl">
        {children}
      </span>
    )
  }
  if (magnet === 'key') {
    return (
      <span className="relative inline-flex h-14 min-w-14 flex-col items-center justify-center rounded-lg border border-nx-line bg-nx-card text-nx-fg shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_0_var(--nx-line)]">
        <span className="absolute top-1.5 left-2 text-[9px] text-nx-faint">⌘</span>
        <span className="text-sm font-medium">{children}</span>
      </span>
    )
  }
  if (magnet === 'split') {
    return (
      <span className="inline-flex h-11 overflow-hidden rounded-xl bg-nx-fg text-sm text-nx-bg">
        <span className="flex items-center px-4">{children}</span>
        <span className="flex items-center border-l border-white/15 px-3">
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 4.5 6 8l3-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </span>
    )
  }
  return (
    <span className="inline-flex h-11 items-center rounded-full bg-nx-fg px-5 text-sm font-medium text-nx-bg shadow-[var(--nx-shadow)]">
      {children}
    </span>
  )
}
