'use client'

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const MARQUEE_CSS = `
@keyframes nexara-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
`

const VARIANTS = [
  'logos',
  'quotes',
  'ticker',
  'stubs',
  'filmstrip',
  'pills',
  'stats',
  'hazard',
  'profiles',
  'log',
  'tiles',
  'medals',
] as const

export type MarqueeVariant = (typeof VARIANTS)[number]

export interface MarqueeProps {
  children?: ReactNode
  className?: string
  controlClassName?: string
  variant?: MarqueeVariant
  duration?: number
  speed?: number
  pauseOnHover?: boolean
  direction?: 'left' | 'right'
  gap?: number
  repeat?: number
  fade?: boolean
  showControls?: boolean
  style?: CSSProperties
  paused?: boolean
  onPausedChange?: (paused: boolean) => void
}

/**
 * Marquee
 * Twelve tracks: logos, quotes, news ticker, ticket stubs, filmstrip, pills,
 * stats, hazard tape, profiles, log, app tiles, and medals.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Marquee({
  children,
  className,
  controlClassName,
  variant = 'logos',
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
  const pauseHeld = paused ?? manualPause
  const content = children ?? samples(variant)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const sample = sampleRef.current
    if (!frame || !sample) return
    const measure = () => {
      const sampleSize = sample.scrollWidth
      const frameSize = frame.clientWidth
      const nextCopies = Math.max(repeat, sampleSize > 0 ? Math.ceil(frameSize / sampleSize) : 1)
      setCopies((current) => (current === nextCopies ? current : nextCopies))
      if (speed && sampleSize > 0) {
        setLoopSeconds(Math.max(4, (sampleSize * nextCopies) / speed))
      } else {
        setLoopSeconds(duration)
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    observer.observe(sample)
    return () => observer.disconnect()
  }, [children, duration, repeat, speed, variant])

  const group = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }} aria-hidden={hidden || undefined} inert={hidden ? true : undefined}>
      {Array.from({ length: copies }, (_, index) => (
        <div key={index} className="flex shrink-0 items-center" style={{ gap }} inert={index > 0 ? true : undefined} aria-hidden={index > 0 || undefined}>
          {content}
        </div>
      ))}
    </div>
  )

  return (
    <div data-nexara="marquee" data-variant={variant} className={cn('relative', frameClass(variant), className)} style={style}>
      <FrameLabel variant={variant} />
      <div ref={sampleRef} aria-hidden="true" inert className="pointer-events-none absolute flex -translate-y-full opacity-0" style={{ gap }}>
        {content}
      </div>
      <div
        ref={frameRef}
        id={trackId}
        onPointerEnter={pauseOnHover ? () => setHovered(true) : undefined}
        onPointerLeave={pauseOnHover ? () => setHovered(false) : undefined}
        className={cn('overflow-hidden', fade && !reduced && '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]')}
      >
        {reduced ? (
          <div className="flex w-max items-center" style={{ gap }}>{content}</div>
        ) : (
          <div
            className="flex w-max items-center"
            style={{
              animationName: 'nexara-marquee',
              animationDuration: `${speed ? loopSeconds : duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: direction === 'right' ? 'reverse' : 'normal',
              animationPlayState: pauseHeld || (pauseOnHover && hovered) ? 'paused' : 'running',
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
          className={cn('mt-3 inline-flex h-9 items-center rounded-full border border-current/25 px-3 text-xs', controlClassName)}
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

function frameClass(variant: MarqueeVariant) {
  if (variant === 'ticker') return 'bg-[#111] py-2 font-mono text-xs text-[#f5c16c]'
  if (variant === 'hazard') return 'bg-[#111] py-3'
  if (variant === 'log') return 'rounded-xl bg-[#07110f] py-3 font-mono text-xs text-[#3ddec4]'
  if (variant === 'filmstrip') return 'bg-[#14110e] py-3'
  return ''
}

function FrameLabel({ variant }: { variant: MarqueeVariant }) {
  if (variant === 'ticker') return <p className="px-3 pb-1 text-[10px] tracking-[0.18em] text-[#ff6a3d]">LIVE · 18:04</p>
  if (variant === 'hazard') return null
  if (variant === 'log') return <p className="px-3 pb-1 text-zinc-500">~/nexara</p>
  return null
}

function samples(variant: MarqueeVariant): ReactNode {
  if (variant === 'quotes') {
    return ['Quiet room.', 'Ship the lamp.', 'Stay late.'].map((line) => (
      <span key={line} className="w-56 rounded-2xl border border-white/10 bg-[#14151f] p-4 text-sm">“{line}”</span>
    ))
  }
  if (variant === 'ticker') {
    return ['Harbor opens', 'Export ready', 'Issue 18'].map((line) => (
      <span key={line} className="px-4">{line} —</span>
    ))
  }
  if (variant === 'stubs') {
    return ['C12', 'C13', 'C14'].map((serial) => (
      <span key={serial} className="inline-flex items-stretch overflow-hidden bg-[#f6f3ec] text-[#1c1915]">
        <span className="border-r border-dashed border-[#1c1915]/30 px-3 py-2 font-mono text-xs">{serial}</span>
        <span className="px-3 py-2 text-xs">ADMIT</span>
      </span>
    ))
  }
  if (variant === 'filmstrip') {
    return ['01', '02', '03', '04'].map((frame) => (
      <span key={frame} className="inline-flex h-16 w-24 items-end border-x-8 border-[#09090f] bg-[#3ddec4] p-1 text-xs text-[#06241d]">{frame}</span>
    ))
  }
  if (variant === 'pills') {
    return ['Draggable', 'Aurora', 'Modal'].map((item) => (
      <span key={item} className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-sm">{item}</span>
    ))
  }
  if (variant === 'stats') {
    return [
      ['128', 'Rooms'],
      ['24', 'Open'],
      ['4', 'Studios'],
    ].map(([value, label]) => (
      <span key={label} className="px-4 text-center"><span className="block font-serif text-2xl">{value}</span><span className="text-xs text-zinc-400">{label}</span></span>
    ))
  }
  if (variant === 'hazard') {
    return (
      <span
        className="px-8 py-2 text-sm font-semibold text-[#1a100c]"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, #f5c16c 0 12px, #111 12px 24px)' }}
      >
        WET FLOOR
      </span>
    )
  }
  if (variant === 'profiles') {
    return ['AK', 'NR', 'JL'].map((initials) => (
      <span key={initials} className="inline-flex items-center gap-2 rounded-full bg-[#16141c] pr-3">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#8b7cff] text-xs text-[#09090f]">{initials}</span>
        {initials}
      </span>
    ))
  }
  if (variant === 'log') {
    return ['build ok', 'lint ok', 'preview up'].map((line) => <span key={line} className="px-3">› {line}</span>)
  }
  if (variant === 'tiles') {
    return ['#ff6a3d', '#8b7cff', '#3ddec4', '#f5c16c'].map((tone) => (
      <span key={tone} className="inline-flex size-14 items-center justify-center rounded-[1.1rem]" style={{ background: tone }}>
        <span className="size-4 rounded-sm bg-[#09090f]" />
      </span>
    ))
  }
  if (variant === 'medals') {
    return ['Gold', 'Press', 'Type'].map((name) => (
      <span key={name} className="inline-flex flex-col items-center px-3">
        <span className="h-3 w-4 bg-[#ff6a3d]" />
        <span className="inline-flex size-10 items-center justify-center rounded-full border-2 border-[#f5c16c] text-[10px] text-[#f5c16c]">{name}</span>
      </span>
    ))
  }
  return ['North', 'Kite', 'Field', 'Harbor', 'Lumen'].map((name) => (
    <span key={name} className="px-4 text-sm tracking-[0.22em] text-zinc-300 uppercase">{name}</span>
  ))
}
