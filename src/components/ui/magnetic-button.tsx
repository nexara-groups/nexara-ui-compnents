'use client'

import { animate, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

/** How the control responds to a fine pointer. The button skin stays on `variant`. */
const MAGNET_STYLES = [
  'attract',
  'tilt',
  'repel',
  'stretch',
  'sling',
  'snap',
  'orbit',
  'lift',
  'glow',
  'wobble',
  'peel',
  'press',
] as const

export type MagnetStyle = (typeof MAGNET_STYLES)[number]

export interface MagneticButtonProps extends ButtonProps {
  /** Pointer response. Separate from the visual `variant` inherited from Button. */
  magnet?: MagnetStyle
  /** Maximum translation in pixels at the edge of the control. */
  strength?: number
  /** Extra pointer padding, in pixels, cancelled out of the layout. */
  proximity?: number
  /** How far the label shifts relative to the shell. 0–1. */
  innerShift?: number
}

/**
 * MagneticButton
 * Twelve pointer responses, from a straight pull to a press field.
 * Coarse pointers, loading, and reduced motion keep it still.
 * Copy this file, `button.tsx`, and `src/lib/utils.ts`.
 */
export function MagneticButton({
  magnet = 'attract',
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
  const rotate = useMotionValue(0)
  const scaleX = useMotionValue(1)
  const scaleY = useMotionValue(1)
  const glow = useMotionValue(0)
  const shear = useMotionValue(0)
  const spring =
    magnet === 'sling'
      ? { stiffness: 90, damping: 16, mass: 1.2 }
      : magnet === 'wobble'
        ? { stiffness: 220, damping: 7, mass: 0.6 }
        : magnet === 'snap'
          ? { stiffness: 520, damping: 22, mass: 0.35 }
          : { stiffness: 260, damping: 22, mass: 0.4 }
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)
  const labelX = useSpring(shiftX, spring)
  const labelY = useSpring(shiftY, spring)
  const springRotate = useSpring(rotate, spring)
  const springScaleX = useSpring(scaleX, spring)
  const springScaleY = useSpring(scaleY, spring)
  const springGlow = useSpring(glow, spring)
  const springShear = useSpring(shear, spring)
  const ghostLabelX = useSpring(shiftX, { stiffness: 70, damping: 16, mass: 1.1 })
  const ghostLabelY = useSpring(shiftY, { stiffness: 70, damping: 16, mass: 1.1 })
  const frozen = Boolean(reduced || disabled || loading)

  function reset() {
    x.set(0)
    y.set(0)
    shiftX.set(0)
    shiftY.set(0)
    shear.set(0)
    rotate.set(0)
    scaleX.set(1)
    scaleY.set(1)
    glow.set(0)
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
    shear.set(0)
    rotate.set(0)
    scaleX.set(1)
    scaleY.set(1)
    glow.set(0)
  }, [frozen, glow, rotate, scaleX, scaleY, shear, shiftX, shiftY, x, y])

  const velocity = useRef({ x: 0, y: 0 })

  function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
    velocity.current = { x: event.movementX, y: event.movementY }
    if (frozen || coarseRef.current) return
    const bounds = boundsRef.current?.getBoundingClientRect()
    if (!bounds) return
    const relX = event.clientX - (bounds.left + bounds.width / 2)
    const relY = event.clientY - (bounds.top + bounds.height / 2)
    const halfW = Math.max(bounds.width / 2 + proximity, 1)
    const halfH = Math.max(bounds.height / 2 + proximity, 1)
    const nx = Math.max(-1, Math.min(1, relX / halfW))
    const ny = Math.max(-1, Math.min(1, relY / halfH))
    const distance = Math.min(1, Math.hypot(nx, ny))
    const angle = Math.atan2(ny, nx)

    let nextX = nx * strength
    let nextY = ny * strength
    let nextRotate = 0
    let nextScaleX = 1
    let nextScaleY = 1
    let nextGlow = distance
    let label = innerShift

    if (magnet === 'tilt') {
      nextX = nx * strength * 0.2
      nextY = ny * strength * 0.2
      nextRotate = nx * 8
    } else if (magnet === 'wobble') {
      nextX = nx * strength * 0.35
      nextY = ny * strength * 0.35
      nextRotate = event.movementX * 1.6
    } else if (magnet === 'repel') {
      nextX = -nx * strength
      nextY = -ny * strength
    } else if (magnet === 'stretch') {
      nextX = nx * strength * 0.35
      nextY = ny * strength * 0.35
      nextScaleX = 1 + Math.abs(nx) * 0.18
      nextScaleY = 1 + Math.abs(ny) * 0.12
    } else if (magnet === 'snap') {
      const engaged = distance > 0.35
      nextX = engaged ? Math.sign(nx) * strength : 0
      nextY = engaged ? Math.sign(ny) * strength : 0
    } else if (magnet === 'orbit') {
      const orbitAngle = distance < 0.08 ? 0 : angle
      nextX = distance < 0.08 ? 0 : Math.cos(orbitAngle) * strength * 0.85
      nextY = distance < 0.08 ? 0 : Math.sin(orbitAngle) * strength * 0.85
    } else if (magnet === 'lift') {
      nextX = nx * strength * 0.2
      nextY = -Math.abs(distance) * strength
    } else if (magnet === 'glow') {
      nextX = 0
      nextY = 0
      nextGlow = distance
    } else if (magnet === 'peel') {
      nextX = 0
      nextY = 0
      shear.set(nx * 16)
    } else if (magnet === 'press') {
      const squash = Math.min(0.2, distance * 0.01 * strength)
      nextX = 0
      nextY = distance * strength * 0.15
      nextScaleX = 1 + squash
      nextScaleY = 1 - squash
    }

    x.set(nextX)
    y.set(nextY)
    shiftX.set(magnet === 'peel' || magnet === 'glow' ? nx * strength : nextX * label)
    shiftY.set(magnet === 'peel' || magnet === 'glow' ? ny * strength : nextY * label)
    if (magnet !== 'peel') shear.set(0)
    rotate.set(nextRotate)
    scaleX.set(nextScaleX)
    scaleY.set(nextScaleY)
    glow.set(nextGlow)
  }

  return (
    <span
      ref={boundsRef}
      className="relative inline-flex"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        if (magnet === 'sling' && !frozen) {
          const flingX = velocity.current.x * 2.2
          const flingY = velocity.current.y * 2.2
          x.set(flingX)
          y.set(flingY)
          void animate(x, 0, { type: 'spring', stiffness: 140, damping: 9, mass: 0.7 })
          void animate(y, 0, { type: 'spring', stiffness: 140, damping: 9, mass: 0.7 })
          return
        }
        reset()
      }}
      data-nexara="magnetic-button"
      data-magnet={magnet}
    >
      <motion.span
        style={{
          x: springX,
          y: springY,
          rotate: magnet === 'tilt' ? 0 : springRotate,
          rotateX: magnet === 'tilt' ? springY : 0,
          rotateY: magnet === 'tilt' ? springX : 0,
          scaleX: springScaleX,
          scaleY: springScaleY,
          transformPerspective: magnet === 'tilt' ? 600 : undefined,
          ['--magnet-glow' as string]: springGlow,
        }}
        className={cn('relative', magnet === 'tilt' && '[transform-style:preserve-3d]', magnet === 'glow' && 'drop-shadow-[0_0_calc(var(--magnet-glow)*18px)_rgba(139,124,255,0.9)]')}
      >
        <Button className={cn(magnet === 'peel' && 'overflow-visible', className)} disabled={disabled} loading={loading} {...props}>
          <motion.span
            style={{
              x: magnet === 'glow' ? 0 : labelX,
              y: magnet === 'glow' ? 0 : labelY,
              skewX: magnet === 'peel' ? springShear : 0,
            }}
            className="relative inline-flex items-center gap-2"
          >
            {magnet === 'glow' ? (
              <motion.span aria-hidden="true" style={{ x: ghostLabelX, y: ghostLabelY }} className="pointer-events-none absolute inset-0 flex items-center justify-center text-[#c4b5fd]/80">
                {children as ReactNode}
              </motion.span>
            ) : null}
            {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
            <span>{children as ReactNode}</span>
            {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
          </motion.span>
        </Button>
      </motion.span>
    </span>
  )
}
