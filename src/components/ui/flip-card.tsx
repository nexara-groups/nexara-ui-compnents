'use client'

import { motion } from 'framer-motion'
import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

export interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
  frontClassName?: string
  backClassName?: string
  /** Hover also turns the card. A visible control always works from the keyboard. */
  flipOn?: 'hover' | 'click'
  flipped?: boolean
  defaultFlipped?: boolean
  onFlippedChange?: (flipped: boolean) => void
  /** Seconds for the turn. Ignored when reduced motion is requested. */
  duration?: number
  /** Accessible name for the flip control. */
  label?: string
}

/**
 * FlipCard
 * A two-sided card. The hidden face is inert. Hover turns it, and the
 * Back/Front control is the keyboard path.
 */
export function FlipCard({
  front,
  back,
  className,
  frontClassName,
  backClassName,
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
  const isControlled = flippedProp !== undefined
  const flipped = isControlled ? flippedProp : uncontrolled

  function setFlipped(next: boolean) {
    if (!isControlled) setUncontrolled(next)
    onFlippedChange?.(next)
  }

  function toggle() {
    setFlipped(!flipped)
  }

  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (flipOn !== 'click') return
    const target = event.target
    if (target instanceof Element && target.closest('a, button, input, textarea, select, label')) return
    toggle()
  }

  return (
    <div
      ref={rootRef}
      data-nexara="flip-card"
      className={cn('relative h-72', className)}
      onMouseEnter={flipOn === 'hover' ? () => setFlipped(true) : undefined}
      onMouseLeave={
        flipOn === 'hover'
          ? () => {
              if (rootRef.current?.contains(document.activeElement)) return
              setFlipped(false)
            }
          : undefined
      }
      onClick={onClick}
    >
      <div className="h-full [perspective:1400px]">
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : { duration, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={cn(
              'absolute inset-0 rounded-3xl border border-white/12 bg-[#14151f] [backface-visibility:hidden]',
              flipped && 'pointer-events-none',
              frontClassName,
            )}
            style={{ transform: 'translateZ(1px)' }}
            inert={flipped ? true : undefined}
            aria-hidden={flipped || undefined}
          >
            <div className="h-full overflow-hidden rounded-[inherit] p-6">{front}</div>
          </div>
          <div
            className={cn(
              'absolute inset-0 rounded-3xl border border-white/12 bg-[#1a1428] [backface-visibility:hidden]',
              !flipped && 'pointer-events-none',
              backClassName,
            )}
            style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
            inert={!flipped ? true : undefined}
            aria-hidden={!flipped || undefined}
          >
            <div className="h-full overflow-hidden rounded-[inherit] p-6">{back}</div>
          </div>
        </motion.div>
      </div>
      <button
        type="button"
        aria-pressed={flipped}
        className="absolute right-3 bottom-3 z-20 inline-flex h-9 items-center rounded-full border border-white/20 bg-[#09090f]/80 px-3 text-xs text-[#f6f3ec] backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
        onClick={(event) => {
          event.stopPropagation()
          toggle()
        }}
      >
        {flipped ? 'Show front' : 'Show back'}
        <span className="sr-only"> of {label}</span>
      </button>
    </div>
  )
}
