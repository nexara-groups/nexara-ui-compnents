'use client'

import { motion } from 'framer-motion'
import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const VARIANTS = ['yaw', 'pitch', 'hinge-left', 'shuffle', 'fade', 'slide', 'split', 'iris', 'peel', 'box', 'shutter', 'fold'] as const

export type FlipVariant = (typeof VARIANTS)[number]

export interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
  frontClassName?: string
  backClassName?: string
  /** Turn style. `yaw` is a horizontal card flip. */
  variant?: FlipVariant
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

const faceClass = 'absolute inset-0 rounded-3xl border border-white/12 [backface-visibility:hidden]'

/**
 * FlipCard
 * Twelve ways to reveal a second face. The hidden face is inert.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function FlipCard({
  front,
  back,
  className,
  frontClassName,
  backClassName,
  variant = 'yaw',
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
  const transition = reduced ? { duration: 0 } : { duration, ease: [0.22, 1, 0.36, 1] as const }

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

  const frontFace = <div className="h-full overflow-hidden rounded-[inherit] p-6">{front}</div>
  const backFace = <div className="h-full overflow-hidden rounded-[inherit] p-6">{back}</div>
  const hideFront = flipped ? true : undefined
  const hideBack = !flipped ? true : undefined

  const spatial = variant === 'yaw' || variant === 'pitch' || variant === 'hinge-left' || variant === 'box'
  const animate = spatial
    ? {
        rotateY: variant === 'pitch' ? 0 : flipped ? 180 : 0,
        rotateX: variant === 'pitch' ? (flipped ? 180 : 0) : 0,
      }
    : undefined

  return (
    <div
      ref={rootRef}
      data-nexara="flip-card"
      data-variant={variant}
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
        {spatial ? (
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            style={{
              transformOrigin: variant === 'hinge-left' ? 'left center' : 'center',
            }}
            animate={animate}
            transition={transition}
          >
            <div
              className={cn(faceClass, 'bg-[#14151f]', flipped && 'pointer-events-none', frontClassName)}
              inert={hideFront}
              aria-hidden={flipped || undefined}
              style={{ transform: variant === 'box' ? 'translateZ(28px)' : 'translateZ(1px)' }}
            >
              {frontFace}
            </div>
            {variant === 'box' ? (
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-1/2 w-14 -translate-x-1/2 bg-[#2a2438]"
                style={{ transform: 'rotateY(90deg) translateZ(7rem)' }}
              />
            ) : null}
            <div
              className={cn(faceClass, 'bg-[#1a1428]', !flipped && 'pointer-events-none', backClassName)}
              inert={hideBack}
              aria-hidden={!flipped || undefined}
              style={{
                transform: variant === 'pitch' ? 'rotateX(180deg) translateZ(1px)' : variant === 'box' ? 'rotateY(180deg) translateZ(28px)' : 'rotateY(180deg) translateZ(1px)',
              }}
            >
              {backFace}
            </div>
          </motion.div>
        ) : variant === 'fold' ? (
          <div className="relative h-full [perspective:1200px]">
            <div className={cn(faceClass, 'bg-[#1a1428]', !flipped && 'pointer-events-none', backClassName)} inert={hideBack} aria-hidden={!flipped || undefined}>
              {backFace}
            </div>
            <motion.div
              className={cn(faceClass, 'origin-bottom bg-[#14151f]', flipped && 'pointer-events-none', frontClassName)}
              inert={hideFront}
              aria-hidden={flipped || undefined}
              style={{ transformOrigin: 'center bottom' }}
              animate={flipped ? { rotateX: -150 } : { rotateX: 0 }}
              transition={transition}
            >
              {frontFace}
            </motion.div>
          </div>
        ) : variant === 'peel' ? (
          <div className="relative h-full">
            <div className={cn(faceClass, 'bg-[#1a1428]', !flipped && 'pointer-events-none', backClassName)} inert={hideBack} aria-hidden={!flipped || undefined}>
              {backFace}
            </div>
            <motion.div
              className={cn(faceClass, 'origin-top-right bg-[#14151f] shadow-2xl', flipped && 'pointer-events-none', frontClassName)}
              inert={hideFront}
              aria-hidden={flipped || undefined}
              animate={flipped ? { rotate: -18, x: '55%', y: 12 } : { rotate: 0, x: 0, y: 0 }}
              transition={transition}
            >
              {frontFace}
            </motion.div>
          </div>
        ) : (
          <div className="relative h-full">
            <motion.div
              className={cn(faceClass, 'bg-[#14151f]', flipped && 'pointer-events-none', frontClassName)}
              inert={hideFront}
              aria-hidden={flipped || undefined}
              animate={plainAnimate(variant, flipped, true)}
              transition={transition}
            >
              {frontFace}
            </motion.div>
            <motion.div
              className={cn(faceClass, 'bg-[#1a1428]', !flipped && 'pointer-events-none', backClassName)}
              inert={hideBack}
              aria-hidden={!flipped || undefined}
              animate={plainAnimate(variant, flipped, false)}
              transition={transition}
            >
              {backFace}
            </motion.div>
          </div>
        )}
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

function plainAnimate(variant: FlipVariant, flipped: boolean, front: boolean) {
  const show = front ? !flipped : flipped
  if (variant === 'slide') return { x: show ? '0%' : front ? '-105%' : '105%', opacity: show ? 1 : 0 }
  if (variant === 'split') return { y: show ? '0%' : front ? '-40%' : '40%', x: show ? '0%' : front ? '-30%' : '30%', opacity: show ? 1 : 1 }
  if (variant === 'iris') return { clipPath: show ? 'circle(80% at 50% 50%)' : 'circle(0% at 50% 50%)', opacity: 1 }
  if (variant === 'shuffle') return { x: show ? '0%' : front ? '18%' : '-30%', y: show ? '0%' : front ? '-8%' : '16%', rotate: show ? 0 : front ? -8 : 6, opacity: show ? 1 : 0 }
  if (variant === 'shutter') return { clipPath: show ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)', opacity: 1 }
  return { opacity: show ? 1 : 0 }
}
