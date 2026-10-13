'use client'

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const MARQUEE_CSS = `
@keyframes nexara-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
`

export interface MarqueeProps {
  children: ReactNode
  className?: string
  controlClassName?: string
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
  duration = 28,
  speed,
  pauseOnHover = true,
  direction = 'left',
  gap = 16,
  repeat = 2,
  fade = true,
  showControls = true,
  style,
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
  const motionPaused = manualPause || (pauseOnHover && hovered)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const sample = sampleRef.current
    if (!frame || !sample) return

    const measure = () => {
      const sampleWidth = sample.scrollWidth
      const frameWidth = frame.clientWidth
      const nextCopies = Math.max(repeat, sampleWidth > 0 ? Math.ceil(frameWidth / sampleWidth) : 1)
      setCopies((current) => (current === nextCopies ? current : nextCopies))
      if (speed && sampleWidth > 0) {
        const half = sampleWidth * nextCopies
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
  }, [duration, repeat, speed, children])

  const group = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      style={{ gap, paddingRight: gap }}
      aria-hidden={hidden || undefined}
      inert={hidden ? true : undefined}
    >
      {Array.from({ length: copies }, (_, index) => (
        <div key={index} className="flex shrink-0 items-center" style={{ gap }} inert={index > 0 ? true : undefined} aria-hidden={index > 0 || undefined}>
          {children}
        </div>
      ))}
    </div>
  )

  return (
    <div
      data-nexara="marquee"
      className={cn('relative', className)}
      style={style}
    >
      <div
        ref={sampleRef}
        aria-hidden="true"
        inert
        className="pointer-events-none absolute flex -translate-y-full opacity-0"
        style={{ gap }}
      >
        {children}
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
        onPointerLeave={pauseOnHover ? () => setHovered(false) : undefined}
        className={cn(
          reduced ? 'overflow-x-auto' : 'overflow-hidden',
          fade && !reduced && '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        )}
      >
        {reduced ? (
          <div className="flex w-max items-center" style={{ gap }}>
            {children}
          </div>
        ) : (
          <div
            className="flex w-max items-center"
            style={{
              animationName: 'nexara-marquee',
              animationDuration: `${speed ? loopSeconds : duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: direction === 'right' ? 'reverse' : 'normal',
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
          aria-pressed={manualPause}
          aria-controls={trackId}
          onClick={() => setManualPause((value) => !value)}
        >
          {manualPause ? 'Play' : 'Pause'}
        </button>
      ) : null}
    </div>
  )
}
