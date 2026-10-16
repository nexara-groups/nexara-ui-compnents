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
  film: 'rounded-md border border-[#1c1915] bg-[#14110e]',
  sticker: 'rotate-[-2deg] border border-white/20 bg-[#f6f3ec] text-[#1c1915] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.8)]',
  window: 'overflow-hidden rounded-xl border border-white/15 bg-[#10131a] p-0',
  ticket: 'rounded-2xl border border-dashed border-white/30 bg-[#17151f]',
  polaroid: 'rounded-md border border-[#efeae2] bg-[#f6f3ec] text-[#1c1915] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]',
  dossier: 'rounded-sm border border-[#d8c7a2]/40 bg-[#1a1712]',
  receipt: 'rounded-none border border-white/15 bg-[#12110e] font-mono shadow-none',
  comic: 'rounded-md border-[3px] border-[#f6f3ec] bg-[#24180f] shadow-[6px_6px_0_0_#ff6a3d]',
  playing: 'rounded-xl border border-[#efeae2] bg-[#f6f3ec] text-[#7f1d1d]',
  boarding: 'rounded-none bg-[#f4efe4] font-mono text-[#1c1915]',
  postcard: 'rounded-md border border-[#efeae2] bg-[#f6f3ec] text-[#1c1915]',
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
  if (variant === 'ticket') {
    return (
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-4 left-5 border-l border-dashed border-white/30" />
    )
  }
  if (variant === 'polaroid') {
    return <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[#efeae2]" />
  }
  if (variant === 'dossier') {
    return (
      <>
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[repeating-linear-gradient(90deg,transparent_0_10px,rgba(216,199,162,0.35)_10px_11px)]" style={{ top: '38%' }} />
        <span aria-hidden="true" className="pointer-events-none absolute top-3 right-3 inline-flex h-8 items-center rounded-full border border-[#ff6a3d] px-2 text-[10px] tracking-[0.16em] text-[#ff6a3d] uppercase">
          File
        </span>
      </>
    )
  }
  if (variant === 'film') {
    return (
      <>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-2 left-1 w-3 bg-[radial-gradient(circle,#09090f_3px,transparent_3.5px)] bg-[length:12px_14px] bg-repeat-y" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-2 right-1 w-3 bg-[radial-gradient(circle,#09090f_3px,transparent_3.5px)] bg-[length:12px_14px] bg-repeat-y" />
      </>
    )
  }
  if (variant === 'sticker') {
    return <span aria-hidden="true" className="pointer-events-none absolute -top-2 left-8 h-4 w-16 -rotate-2 bg-[#f5c16c]/80" />
  }
  if (variant === 'window') {
    return <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-9 border-b border-white/10 bg-white/5" />
  }
  if (variant === 'receipt') {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3"
        style={{
          background:
            'radial-gradient(circle at 8px 12px, transparent 7px, #12110e 7.5px) left bottom / 16px 12px repeat-x',
        }}
      />
    )
  }
  if (variant === 'playing') {
    return (
      <span aria-hidden="true" className="pointer-events-none absolute top-3 left-3 font-serif text-xl text-[#7f1d1d]">
        A♥
      </span>
    )
  }
  if (variant === 'boarding') {
    return (
      <span aria-hidden="true" className="mb-3 block border-b border-[#1c1915]/20 pb-3 text-[#1c1915]">
        <span className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <span>
            <span className="block text-[10px] tracking-[0.16em] uppercase">From</span>
            <span className="font-serif text-2xl">SFO</span>
          </span>
          <span className="pb-1 text-[10px] tracking-[0.14em]">NX 18</span>
          <span className="text-right">
            <span className="block text-[10px] tracking-[0.16em] uppercase">To</span>
            <span className="font-serif text-2xl">LHR</span>
          </span>
        </span>
        <span className="mt-2 flex justify-between text-[10px] tracking-[0.14em] uppercase">
          <span>Gate C4</span>
          <span>Seat 14A</span>
        </span>
      </span>
    )
  }
  if (variant === 'postcard') {
    return (
      <span aria-hidden="true" className="pointer-events-none absolute top-3 right-3 size-8 border border-dashed border-[#1c1915]/40" />
    )
  }
  if (variant === 'comic') {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(246,243,236,0.45) 0.8px, transparent 0.9px)',
          backgroundSize: '6px 6px',
        }}
      />
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
  const paper = variant === 'polaroid' || variant === 'receipt' || variant === 'sticker' || variant === 'comic' || variant === 'playing' || variant === 'postcard' || variant === 'boarding'

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
          'focus-visible:ring-2 focus-visible:ring-[#8b7cff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090f]',
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
              variant === 'polaroid' && 'mb-8 text-[#1c1915]',
              variant === 'ticket' && 'pl-6',
              variant === 'window' && 'mt-9',
              variant === 'dossier' && 'pt-6',
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
