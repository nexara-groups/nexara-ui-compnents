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
import { MediaFrame, media } from '@/lib/media.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const variants = {
  glass: 'rounded-3xl border border-nx-border bg-nx-glass shadow-[var(--nx-shadow)] backdrop-blur-xl',
  window: 'overflow-hidden rounded-xl border border-nx-border bg-nx-card p-0',
  note: 'rounded-xl border border-nx-border bg-[#fffbeb] text-[#1c1915] shadow-[var(--nx-shadow)]',
  media: 'overflow-hidden rounded-2xl border border-nx-border bg-nx-card p-2',
  task: 'rounded-xl border border-nx-border bg-nx-card',
  invite: 'rounded-[1.4rem] border border-nx-border bg-nx-fg text-nx-bg',
  file: 'rounded-lg border border-nx-border bg-nx-card',
  widget: 'rounded-3xl border border-nx-border bg-nx-elevated',
  message: 'rounded-2xl rounded-bl-md border border-nx-border bg-nx-card',
  stack: 'rounded-2xl border border-nx-border bg-nx-card shadow-[8px_8px_0_-2px_var(--nx-elevated),16px_16px_0_-4px_var(--nx-bg)]',
  compact: 'rounded-full border border-nx-border bg-nx-card px-4 py-2',
  calendar: 'rounded-2xl border border-nx-border bg-nx-card overflow-hidden p-0',
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

function CardChrome({ variant }: { variant: DraggableCardVariant }) {
  if (variant === 'window') {
    return <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-9 border-b border-nx-border bg-nx-bg/80" />
  }
  if (variant === 'media') {
    return <MediaFrame src={media.journal} alt="" className="pointer-events-none mb-3 h-24 rounded-xl" />
  }
  if (variant === 'calendar') {
    return (
      <span aria-hidden="true" className="mb-0 block bg-nx-accent px-4 py-2 text-center text-[11px] tracking-[0.16em] text-nx-accent-fg uppercase">
        November
      </span>
    )
  }
  if (variant === 'file') {
    return (
      <span aria-hidden="true" className="mb-2 flex items-center gap-2 text-[11px] tracking-[0.14em] text-nx-muted uppercase">
        <span className="size-3 rounded-sm bg-nx-accent/70" />
        NX-18.md
      </span>
    )
  }
  if (variant === 'widget') {
    return (
      <span aria-hidden="true" className="mb-2 block text-[11px] text-nx-muted">
        Uptime
      </span>
    )
  }
  return null
}

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

  const placed = bounds === 'parent' ? 'absolute top-4 left-4 w-72' : 'w-72'
  const paper = variant === 'note' || variant === 'invite'

  const card = (
    <div
      className={cn('relative', bounds === 'viewport' ? 'inline-flex max-w-full' : 'pointer-events-none absolute inset-0')}
      style={{ zIndex: stack }}
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
        dragListener={!disabled && !handle && variant !== 'window'}
        dragConstraints={dragConstraints}
        dragElastic={dragElastic}
        dragMomentum={dragMomentum && !snapBack && !reduced}
        dragSnapToOrigin={false}
        style={{ x, y }}
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
          'pointer-events-auto relative max-w-full text-left outline-none',
          placed,
          !handle && !disabled && 'cursor-grab touch-none select-none',
          'focus-visible:ring-2 focus-visible:ring-nx-ring focus-visible:ring-offset-2 focus-visible:ring-offset-nx-bg',
          disabled && 'cursor-default',
        )}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        <motion.div
          className={cn('relative rounded-3xl p-5', variants[variant], className)}
          style={{
            rotateX: tilt && !reduced ? rotateX : 0,
            rotateY: tilt && !reduced ? rotateY : 0,
            transformPerspective: tilt ? 1000 : undefined,
          }}
        >
          <CardChrome variant={variant} />
          {glow && !paper ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                background: `radial-gradient(140px circle at 18% 0%, ${glowColor}, transparent 62%)`,
              }}
            />
          ) : null}
          <div
            className={cn(
              'relative z-10',
              handle && 'pr-12',
              variant === 'window' && 'mt-9',
              variant === 'calendar' && 'p-4',
              variant === 'compact' && 'p-0',
              contentClassName,
            )}
          >
            {children}
          </div>
        </motion.div>
        {variant === 'window' ? (
          <div
            className="absolute inset-x-0 top-0 z-20 flex h-9 cursor-grab items-center rounded-t-xl px-3 text-xs tracking-[0.14em] text-zinc-300 uppercase"
            onPointerDown={(event) => controls.start(event)}
          >
            Window
          </div>
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
