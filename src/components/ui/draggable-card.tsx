'use client'

import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
  useSpring,
  type PanInfo,
} from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const variants = {
  glass:
    'border border-white/12 bg-white/[0.06] shadow-[0_24px_70px_-36px_rgba(0,0,0,0.85)] backdrop-blur-xl',
  solid: 'border border-white/10 bg-[#14151f] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)]',
  outline: 'border border-white/18 bg-zinc-950/40',
  elevated:
    'border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] shadow-[0_30px_80px_-36px_rgba(139,124,255,0.55)]',
} as const

export type DraggableCardVariant = keyof typeof variants
export type DraggableCardBounds = 'parent' | 'viewport' | RefObject<HTMLElement | null>

export interface DraggableCardProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  stageClassName?: string
  variant?: DraggableCardVariant
  /** `parent` creates a play area. A ref shares an external area. `viewport` uses the window. */
  bounds?: DraggableCardBounds
  snapBack?: boolean
  dragElastic?: number
  dragMomentum?: boolean
  tilt?: boolean
  /** Peak tilt in degrees while dragging. */
  tiltMax?: number
  glow?: boolean
  glowColor?: string
  /** Drag only from a handle so inner buttons stay clickable. */
  handle?: boolean
  disabled?: boolean
  /** Arrow-key step in pixels. Shift multiplies it by 3. */
  keyboardStep?: number
  initialX?: number
  initialY?: number
  showBounds?: boolean
  onDragStart?: () => void
  onDragEnd?: (point: { x: number; y: number }) => void
  'aria-label'?: string
}

type Travel = { minX: number; maxX: number; minY: number; maxY: number }

function travelWithin(stage: HTMLElement, card: HTMLElement, currentX: number, currentY: number): Travel {
  const stageRect = stage.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  const layoutLeft = cardRect.left - currentX - stageRect.left
  const layoutTop = cardRect.top - currentY - stageRect.top
  return {
    minX: -layoutLeft,
    maxX: stageRect.width - layoutLeft - cardRect.width,
    minY: -layoutTop,
    maxY: stageRect.height - layoutTop - cardRect.height,
  }
}

function clamp(value: number, min: number, max: number) {
  if (max < min) return min
  return Math.min(max, Math.max(min, value))
}

let stackOrder = 10

function GripIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="5" cy="4" r="1.15" fill="currentColor" />
      <circle cx="11" cy="4" r="1.15" fill="currentColor" />
      <circle cx="5" cy="8" r="1.15" fill="currentColor" />
      <circle cx="11" cy="8" r="1.15" fill="currentColor" />
      <circle cx="5" cy="12" r="1.15" fill="currentColor" />
      <circle cx="11" cy="12" r="1.15" fill="currentColor" />
    </svg>
  )
}

/**
 * DraggableCard
 * A springy card you can throw inside a bounded area, with keyboard nudging.
 * Copy this file plus `src/lib/utils.ts`. Requires framer-motion.
 */
export function DraggableCard({
  children,
  className,
  contentClassName,
  stageClassName,
  variant = 'glass',
  bounds = 'parent',
  snapBack = false,
  dragElastic = 0.16,
  dragMomentum = true,
  tilt = true,
  tiltMax = 7,
  glow = true,
  glowColor = 'rgba(139, 124, 255, 0.55)',
  handle = false,
  disabled = false,
  keyboardStep = 16,
  initialX = 0,
  initialY = 0,
  showBounds = false,
  onDragStart,
  onDragEnd,
  'aria-label': ariaLabel = 'Draggable card',
}: DraggableCardProps) {
  const reduced = usePrefersReducedMotion()
  const hintId = useId()
  const liveId = useId()
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useDragControls()
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(tiltX, { stiffness: 280, damping: 22 })
  const rotateY = useSpring(tiltY, { stiffness: 280, damping: 22 })
  const [stack, setStack] = useState(10)
  const [live, setLive] = useState('')
  const [viewportBox, setViewportBox] = useState<
    { top: number; right: number; bottom: number; left: number } | undefined
  >(undefined)

  const measureViewport = useCallback(() => {
    const card = cardRef.current
    if (bounds !== 'viewport' || !card) return
    const rect = card.getBoundingClientRect()
    const currentX = x.get()
    const currentY = y.get()
    const margin = 12
    const originLeft = rect.left - currentX
    const originTop = rect.top - currentY
    const originRight = rect.right - currentX
    const originBottom = rect.bottom - currentY
    setViewportBox({
      left: margin - originLeft,
      right: window.innerWidth - margin - originRight,
      top: margin - originTop,
      bottom: window.innerHeight - margin - originBottom,
    })
  }, [bounds, x, y])

  useEffect(() => {
    if (bounds !== 'viewport') return
    measureViewport()
    window.addEventListener('resize', measureViewport)
    window.addEventListener('scroll', measureViewport, true)
    return () => {
      window.removeEventListener('resize', measureViewport)
      window.removeEventListener('scroll', measureViewport, true)
    }
  }, [bounds, measureViewport])

  const constraintElement = useCallback((): HTMLElement | null => {
    if (bounds === 'parent') return stageRef.current
    if (bounds === 'viewport') return null
    return bounds.current
  }, [bounds])

  const publish = useCallback(
    (nextX: number, nextY: number, announce: boolean) => {
      if (announce) {
        setLive(`Position ${Math.round(nextX)} by ${Math.round(nextY)}`)
      }
      onDragEnd?.({ x: nextX, y: nextY })
    },
    [onDragEnd],
  )

  function finishDrag(_event: PointerEvent | MouseEvent | TouchEvent, _info: PanInfo) {
    tiltX.set(0)
    tiltY.set(0)
    if (!snapBack) {
      publish(x.get(), y.get(), false)
      return
    }
    if (reduced) {
      x.set(initialX)
      y.set(initialY)
      publish(initialX, initialY, false)
      return
    }
    const spring = { type: 'spring' as const, stiffness: 420, damping: 34 }
    void Promise.all([animate(x, initialX, spring), animate(y, initialY, spring)]).then(() => {
      publish(initialX, initialY, false)
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) return
    const key = event.key
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home'].includes(key)) return
    event.preventDefault()
    if (key === 'Home') {
      if (reduced) {
        x.set(initialX)
        y.set(initialY)
      } else {
        animate(x, initialX, { type: 'spring', stiffness: 420, damping: 34 })
        animate(y, initialY, { type: 'spring', stiffness: 420, damping: 34 })
      }
      publish(initialX, initialY, true)
      return
    }

    const step = event.shiftKey ? keyboardStep * 3 : keyboardStep
    let nextX = x.get() + (key === 'ArrowRight' ? step : key === 'ArrowLeft' ? -step : 0)
    let nextY = y.get() + (key === 'ArrowDown' ? step : key === 'ArrowUp' ? -step : 0)
    const card = cardRef.current
    const stage = constraintElement()
    if (card && stage) {
      const travel = travelWithin(stage, card, x.get(), y.get())
      nextX = clamp(nextX, travel.minX, travel.maxX)
      nextY = clamp(nextY, travel.minY, travel.maxY)
    } else if (card && bounds === 'viewport') {
      const rect = card.getBoundingClientRect()
      const currentX = x.get()
      const currentY = y.get()
      const minX = currentX + 12 - rect.left
      const maxX = currentX + (window.innerWidth - 12 - rect.right)
      const minY = currentY + 12 - rect.top
      const maxY = currentY + (window.innerHeight - 12 - rect.bottom)
      nextX = clamp(nextX, minX, maxX)
      nextY = clamp(nextY, minY, maxY)
    }
    x.set(nextX)
    y.set(nextY)
  }

  function onKeyUp(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return
    setLive(`Position ${Math.round(x.get())} by ${Math.round(y.get())}`)
  }

  const dragConstraints =
    bounds === 'viewport' ? viewportBox : bounds === 'parent' ? stageRef : bounds

  const card = (
    <div
      className={cn(bounds === 'viewport' ? 'inline-flex max-w-full' : 'pointer-events-none absolute inset-0')}
      style={{ perspective: tilt ? 1000 : undefined, zIndex: stack }}
    >
    <motion.div
      ref={cardRef}
      role="group"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-roledescription="draggable"
      aria-describedby={hintId}
      aria-disabled={disabled || undefined}
      data-nexara="draggable-card"
      drag={!disabled}
      dragControls={controls}
      dragListener={!disabled && !handle}
      dragConstraints={dragConstraints}
      dragElastic={dragElastic}
      dragMomentum={dragMomentum && !snapBack && !reduced}
      dragSnapToOrigin={false}
      style={{
        x,
        y,
        rotateX: tilt && !reduced ? rotateX : 0,
        rotateY: tilt && !reduced ? rotateY : 0,
      }}
      onDragStart={() => {
        stackOrder += 1
        setStack(stackOrder)
        onDragStart?.()
      }}
      onDrag={(_event, info) => {
        if (!tilt || reduced) return
        const limit = 900
        tiltY.set((Math.max(-limit, Math.min(limit, info.velocity.x)) / limit) * tiltMax)
        tiltX.set((Math.max(-limit, Math.min(limit, info.velocity.y)) / limit) * -tiltMax)
      }}
      onDragEnd={finishDrag}
      whileDrag={reduced ? undefined : { scale: 1.02 }}
      className={cn(
        'pointer-events-auto relative w-72 max-w-full rounded-3xl p-5 text-left outline-none',
        bounds === 'parent' && 'absolute top-4 left-4',
        !handle && !disabled && 'cursor-grab touch-none select-none',
        'focus-visible:ring-2 focus-visible:ring-[#8b7cff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090f]',
        variants[variant],
        disabled && 'cursor-default',
        className,
      )}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {glow ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(140px circle at 18% 0%, ${glowColor}, transparent 62%)`,
          }}
        />
      ) : null}
      {handle ? (
        <div
          aria-hidden="true"
          className="absolute top-3 right-3 z-20 inline-flex size-11 cursor-grab items-center justify-center rounded-full border border-white/15 bg-black/30 text-zinc-100"
          onPointerDown={(event) => controls.start(event)}
        >
          <GripIcon />
        </div>
      ) : null}
      <div className={cn('relative z-10', handle && 'pr-12', contentClassName)}>{children}</div>
      <span id={hintId} className="sr-only">
        Drag with the pointer, or focus and use the arrow keys. Home returns the card to its start.
      </span>
      <span id={liveId} className="sr-only" aria-live="polite">
        {live}
      </span>
    </motion.div>
    </div>
  )

  if (bounds !== 'parent') return card

  return (
    <div
      ref={stageRef}
      className={cn(
        'relative min-h-72',
        showBounds && 'rounded-3xl outline outline-dashed outline-white/20',
        stageClassName,
      )}
    >
      {card}
    </div>
  )
}
