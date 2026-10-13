'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

export interface MagneticButtonProps extends ButtonProps {
  /** Maximum translation in pixels at the edge of the control. */
  strength?: number
  /** Extra pointer padding, in pixels, cancelled out of the layout. */
  proximity?: number
  /** How far the label shifts relative to the shell. 0–1. */
  innerShift?: number
}

/**
 * MagneticButton
 * Leans toward a fine pointer in proportion to the offset from center.
 * Coarse pointers, loading, and reduced motion keep it still.
 */
export function MagneticButton({
  strength = 16,
  proximity = 22,
  innerShift = 0.35,
  className,
  children,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  ...props
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion()
  const boundsRef = useRef<HTMLSpanElement>(null)
  const coarseRef = useRef(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const shiftX = useMotionValue(0)
  const shiftY = useMotionValue(0)
  const spring = { stiffness: 260, damping: 22, mass: 0.4 }
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)
  const labelX = useSpring(shiftX, spring)
  const labelY = useSpring(shiftY, spring)
  const frozen = Boolean(reduced || disabled || loading)

  function reset() {
    x.set(0)
    y.set(0)
    shiftX.set(0)
    shiftY.set(0)
  }

  useEffect(() => {
    coarseRef.current = window.matchMedia('(pointer: coarse)').matches
  }, [])

  useEffect(() => {
    if (!frozen) return
    x.set(0)
    y.set(0)
    shiftX.set(0)
    shiftY.set(0)
  }, [frozen, shiftX, shiftY, x, y])

  function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (frozen || coarseRef.current) return
    const bounds = boundsRef.current?.getBoundingClientRect()
    if (!bounds) return
    const relX = event.clientX - (bounds.left + bounds.width / 2)
    const relY = event.clientY - (bounds.top + bounds.height / 2)
    const halfW = Math.max(bounds.width / 2, 1)
    const halfH = Math.max(bounds.height / 2, 1)
    const nx = Math.max(-1, Math.min(1, relX / halfW))
    const ny = Math.max(-1, Math.min(1, relY / halfH))
    const nextX = nx * strength
    const nextY = ny * strength
    x.set(nextX)
    y.set(nextY)
    shiftX.set(nextX * innerShift)
    shiftY.set(nextY * innerShift)
  }

  const label = children as ReactNode

  return (
    <span
      ref={boundsRef}
      className="inline-flex"
      style={{ padding: proximity, margin: -proximity }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      data-nexara="magnetic-button"
    >
      <motion.span style={{ x: springX, y: springY }} className="inline-flex">
        <Button className={cn(className)} disabled={disabled} loading={loading} {...props}>
          <motion.span style={{ x: labelX, y: labelY }} className="inline-flex items-center gap-2">
            {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
            <span>{label}</span>
            {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
          </motion.span>
        </Button>
      </motion.span>
    </span>
  )
}
