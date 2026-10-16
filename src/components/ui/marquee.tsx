'use client'

import { Children, useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const MARQUEE_CSS = `
@keyframes nexara-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
@keyframes nexara-marquee-y {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -50%, 0); }
}
@keyframes nexara-marquee-dwell {
  0%, 22% { transform: translate3d(0, 0, 0); }
  45%, 72% { transform: translate3d(-25%, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
@keyframes nexara-cascade {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
`

const VARIANTS = ['fade', 'pingpong', 'cylinder', 'vertical', 'spotlight', 'stepped', 'parallax', 'overlap', 'velocity', 'dwell', 'reverse-hover', 'cascade'] as const

export type MarqueeVariant = (typeof VARIANTS)[number]

export interface MarqueeProps {
  children: ReactNode
  className?: string
  controlClassName?: string
  /** Track treatment. `fade` is the default edge-masked loop. */
  variant?: MarqueeVariant
  /** Seconds for one full loop. Ignored when speed is set. */
  duration?: number
  /** Pixels per second. Overrides duration when set. */
  speed?: number
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  /** Gap between items, in pixels. */
  gap?: number
  /** Minimum copies of the children inside each half of the loop. */
  repeat?: number
  fade?: boolean
  showControls?: boolean
  style?: CSSProperties
  /** When set, the pause control reports here instead of keeping its own state. */
  paused?: boolean
  onPausedChange?: (paused: boolean) => void
}

/**
 * Marquee
 * Infinite horizontal loop. Copies are added until each half covers the frame.
 * The pause control sits outside the moving track.
 */
export function Marquee({
  children,
  className,
  controlClassName,
  variant = 'fade',
  duration = 28,
  speed,
  pauseOnHover = true,
  direction = 'left',
  gap = 16,
  repeat = 2,
  fade = true,
  showControls = true,
  style,
  paused,
  onPausedChange,
}: MarqueeProps) {
  const reduced = usePrefersReducedMotion()
  useKeyframes('nexara-marquee-keyframes', MARQUEE_CSS)
  const frameRef = useRef<HTMLDivElement>(null)
  const sampleRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(Math.max(1, repeat))
  const [loopSeconds, setLoopSeconds] = useState(duration)
  const [manualPause, setManualPause] = useState(false)
  const [hovered, setHovered] = useState(false)
  const trackId = useId()
  const vertical = variant === 'vertical'
  const resolvedGap = variant === 'overlap' ? -12 : gap
  const resolvedFade = variant === 'spotlight' ? false : fade
  const resolvedDirection = direction
  const travel = variant === 'reverse-hover' && hovered ? (resolvedDirection === 'left' ? 'right' : 'left') : resolvedDirection
  const [speedScale, setSpeedScale] = useState(1)
  const pauseHeld = paused ?? manualPause
  const itemCount = Math.max(1, Children.count(children))
  const motionPaused = pauseHeld || (pauseOnHover && hovered && variant !== 'reverse-hover' && variant !== 'velocity')

  useLayoutEffect(() => {
    const frame = frameRef.current
    const sample = sampleRef.current
    if (!frame || !sample) return

    const measure = () => {
      const sampleSize = vertical ? sample.scrollHeight : sample.scrollWidth
      const frameSize = vertical ? frame.clientHeight : frame.clientWidth
      const nextCopies = Math.max(repeat, sampleSize > 0 ? Math.ceil(frameSize / sampleSize) : 1)
      setCopies((current) => (current === nextCopies ? current : nextCopies))
      if (speed && sampleSize > 0) {
        const half = sampleSize * nextCopies
        const seconds = Math.max(4, half / speed)
        setLoopSeconds((current) => (Math.abs(current - seconds) < 0.05 ? current : seconds))
      } else {
        setLoopSeconds(duration)
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    observer.observe(sample)
    return () => observer.disconnect()
  }, [duration, repeat, speed, children, variant, vertical])

  if (variant === 'parallax') {
    return (
      <div data-nexara="marquee" data-variant="parallax" className={cn('space-y-3', className)} style={style}>
        <Marquee variant="fade" duration={duration} speed={speed} pauseOnHover={pauseOnHover} gap={gap} repeat={repeat} fade={fade} showControls={showControls} controlClassName={controlClassName} paused={pauseHeld} onPausedChange={onPausedChange ?? setManualPause}>
          {children}
        </Marquee>
        <Marquee variant="fade" duration={duration * 1.8} direction="right" pauseOnHover={false} gap={gap} repeat={repeat} fade={fade} showControls={false} paused={pauseHeld}>
          {children}
        </Marquee>
      </div>
    )
  }

  const decorated = variant === 'cascade'
    ? Children.toArray(children).map((child, index) => (
        <span key={index} className="inline-flex" style={{ animation: reduced ? undefined : `nexara-cascade 1.8s ease-in-out ${index * 0.14}s infinite` }}>
          {child}
        </span>
      ))
    : children

  const group = (hidden: boolean) => (
    <div
      className={cn('flex shrink-0', vertical ? 'flex-col' : 'items-center')}
      style={vertical ? { gap: resolvedGap, paddingBottom: resolvedGap } : { gap: resolvedGap, paddingRight: resolvedGap }}
      aria-hidden={hidden || undefined}
      inert={hidden ? true : undefined}
    >
      {Array.from({ length: copies }, (_, index) => (
        <div
          key={index}
          className={cn('flex shrink-0', vertical ? 'flex-col' : 'items-center')}
          style={{ gap: resolvedGap }}
          inert={index > 0 ? true : undefined}
          aria-hidden={index > 0 || undefined}
        >
          {decorated}
        </div>
      ))}
    </div>
  )

  return (
    <div
      data-nexara="marquee"
      data-variant={variant}
      className={cn('relative', variant === 'cylinder' && '[perspective:800px]', className)}
      style={style}
    >
      <div
        ref={sampleRef}
        aria-hidden="true"
        inert
        className={cn('pointer-events-none absolute flex opacity-0', vertical ? 'flex-col -translate-x-full' : '-translate-y-full')}
        style={{ gap: resolvedGap }}
      >
        {decorated}
      </div>
      <div
        ref={frameRef}
        id={trackId}
        onPointerEnter={
          pauseOnHover
            ? (event) => {
                if (event.pointerType !== 'mouse') return
                setHovered(true)
              }
            : undefined
        }
        onPointerMove={
          variant === 'velocity'
            ? (event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                const ratio = (event.clientX - rect.left) / Math.max(rect.width, 1)
                setSpeedScale(0.45 + ratio * 1.8)
              }
            : undefined
        }
        onPointerLeave={pauseOnHover ? () => setHovered(false) : undefined}
        className={cn(
          reduced ? (vertical ? 'h-64 overflow-y-auto' : 'overflow-x-auto') : 'overflow-hidden',
          vertical && 'h-64',
          variant === 'cylinder' && '[transform:rotateX(18deg)]',
          resolvedFade && !reduced && !vertical && '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
          variant === 'spotlight' && !reduced && '[mask-image:radial-gradient(circle_at_center,black_40%,transparent_78%)]',
          vertical && resolvedFade && !reduced && '[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]',
        )}
      >
        {reduced ? (
          <div className={cn('flex w-max', vertical ? 'flex-col' : 'items-center')} style={{ gap: resolvedGap }}>
            {decorated}
          </div>
        ) : (
          <div
            className={cn('flex w-max', vertical ? 'flex-col' : 'items-center')}
            style={{
              animationName: variant === 'dwell' ? 'nexara-marquee-dwell' : vertical ? 'nexara-marquee-y' : 'nexara-marquee',
              animationDuration: `${(speed ? loopSeconds : duration) / (variant === 'velocity' ? speedScale : 1)}s`,
              animationTimingFunction: variant === 'stepped' ? `steps(${Math.max(itemCount * copies, 2)}, end)` : 'linear',
              animationIterationCount: 'infinite',
              animationDirection: variant === 'pingpong' ? 'alternate' : travel === 'right' ? 'reverse' : 'normal',
              animationPlayState: motionPaused ? 'paused' : 'running',
            }}
          >
            {group(false)}
            {group(true)}
          </div>
        )}
      </div>
      {showControls && !reduced ? (
        <button
          type="button"
          className={cn(
            'mt-3 inline-flex h-9 items-center rounded-full border border-current/25 px-3 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
            controlClassName,
          )}
          aria-pressed={pauseHeld}
          aria-controls={trackId}
          onClick={() => {
            const next = !pauseHeld
            if (onPausedChange) onPausedChange(next)
            else setManualPause(next)
          }}
        >
          {pauseHeld ? 'Play' : 'Pause'}
        </button>
      ) : null}
    </div>
  )
}
