'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

/** Visual object. Every style still pulls toward a fine pointer. */
const MAGNET_STYLES = [
  'pill',
  'keycap',
  'bulb',
  'dock',
  'sticker',
  'medal',
  'stamp',
  'badge',
  'shutter',
  'ticket',
  'tag',
  'wax',
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
 * Twelve objects that share one pull: a pill, a keycap, a bulb, a dock icon,
 * a taped sticker, a medal, a postage stamp, a count badge, a shutter, a ticket,
 * a price tag, and a wax seal.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function MagneticButton({
  magnet = 'pill',
  strength = 18,
  proximity = 28,
  className,
  children,
  disabled,
  onClick,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 })

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
      className={cn(
        'inline-flex items-center justify-center text-sm font-medium text-[#f6f3ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff] disabled:opacity-45',
        className,
      )}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={() => onClick?.()}
    >
      <Shell magnet={magnet}>{children}</Shell>
    </motion.button>
  )
}

function Shell({ magnet, children }: { magnet: MagnetStyle; children?: ReactNode }) {
  if (magnet === 'keycap') {
    return (
      <span className="relative inline-flex h-14 min-w-14 items-center justify-center rounded-lg border-b-[7px] border-[#3a342c] bg-[linear-gradient(180deg,#f6f3ec,#d9d0c3)] px-3 text-[#1c1915] shadow-[inset_0_1px_0_#fff]">
        <span className="absolute top-1 left-1.5 text-[9px] text-[#8a8175]">A</span>
        {children}
      </span>
    )
  }
  if (magnet === 'bulb') {
    return (
      <span className="inline-flex flex-col items-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full border border-[#f5c16c]/40 bg-[#f5c16c]/20">
          <span className="h-5 w-px bg-[#f5c16c]" />
        </span>
        <span className="h-3 w-6 rounded-b bg-[#cfc4b4] shadow-[inset_0_-4px_0_#8d8478]" />
        {children ? <span className="sr-only">{children}</span> : null}
      </span>
    )
  }
  if (magnet === 'dock') {
    return (
      <span className="inline-flex size-14 flex-col items-center justify-center gap-1 rounded-2xl bg-[linear-gradient(180deg,#8b7cff,#3ddec4)] text-[10px] text-[#09090f] shadow-[0_10px_20px_-12px_rgba(0,0,0,0.8)]">
        <span className="size-3 rounded-sm bg-[#09090f]/80" aria-hidden="true" />
        {children}
      </span>
    )
  }
  if (magnet === 'sticker') {
    return (
      <span className="relative inline-flex h-12 rotate-[-6deg] items-center bg-[#f6f3ec] px-4 text-[#1c1915] shadow-[0_10px_18px_-12px_rgba(0,0,0,0.8)]">
        <span aria-hidden="true" className="absolute -top-2 left-1/2 h-3 w-10 -translate-x-1/2 bg-[#f5c16c]/80" />
        {children}
      </span>
    )
  }
  if (magnet === 'medal') {
    return (
      <span className="inline-flex flex-col items-center">
        <span className="flex h-4 w-8 overflow-hidden">
          <span className="h-full flex-1 bg-[#ff6a3d]" />
          <span className="h-full flex-1 bg-[#f6f3ec]" />
        </span>
        <span className="inline-flex size-12 items-center justify-center rounded-full border-4 border-[#f5c16c] bg-[#fff6d8] text-xs text-[#3a2508]">
          {children}
        </span>
      </span>
    )
  }
  if (magnet === 'stamp') {
    return (
      <span
        className="inline-flex items-center justify-center p-2"
        style={{
          backgroundImage: 'radial-gradient(circle, #09090f 3.5px, transparent 4px)',
          backgroundSize: '10px 10px',
          backgroundPosition: '-5px -5px',
        }}
      >
        <span className="inline-flex h-12 min-w-16 items-center justify-center border border-dashed border-[#1c1915] bg-[#f6f3ec] px-3 text-xs text-[#1c1915]">
          {children}
        </span>
      </span>
    )
  }
  if (magnet === 'badge') {
    return (
      <span className="relative inline-flex h-11 items-center rounded-2xl bg-[#16141c] px-4 ring-1 ring-white/10">
        {children}
        <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6a3d] px-1 text-[10px] text-[#1a100c]">
          3
        </span>
      </span>
    )
  }
  if (magnet === 'shutter') {
    return (
      <span className="inline-flex size-14 items-center justify-center rounded-full border-4 border-[#3a342c] bg-[#111]">
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#1c1915] text-[10px] text-[#f6f3ec]">{children ?? '•'}</span>
      </span>
    )
  }
  if (magnet === 'ticket') {
    return (
      <span className="inline-flex h-12 items-stretch overflow-hidden rounded-lg bg-[#17151f] ring-1 ring-white/15">
        <span className="flex items-center border-r border-dashed border-white/30 px-3 text-[10px] tracking-[0.16em] uppercase">
          Admit
        </span>
        <span className="flex items-center px-3">{children}</span>
      </span>
    )
  }
  if (magnet === 'tag') {
    return (
      <span className="inline-flex items-center">
        <span aria-hidden="true" className="h-px w-4 bg-[#cfc4b4]" />
        <span className="relative inline-flex h-11 items-center bg-[#f5c16c] pr-5 pl-6 text-[#1c1915] [clip-path:polygon(0_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,0_100%)]">
          <span aria-hidden="true" className="absolute left-2 size-2.5 rounded-full bg-[#09090f]" />
          <span className="pl-2">{children}</span>
        </span>
      </span>
    )
  }
  if (magnet === 'wax') {
    return (
      <span className="relative inline-flex size-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#7f1d1d] [clip-path:polygon(50%_0,62%_12%,80%_8%,84%_28%,100%_38%,88%_52%,96%_72%,76%_74%,68%_96%,50%_84%,32%_96%,24%_74%,4%_72%,12%_52%,0_38%,16%_28%,20%_8%,38%_12%)]" />
        <span className="relative text-[10px] tracking-[0.14em] text-[#fecaca] uppercase">{children}</span>
        <span className="absolute bottom-0 h-3 w-4 rounded-b-full bg-[#7f1d1d]" />
      </span>
    )
  }
  return (
    <span className="inline-flex h-11 items-center rounded-full bg-[#f6f3ec] px-5 text-[#16140f]">{children}</span>
  )
}
