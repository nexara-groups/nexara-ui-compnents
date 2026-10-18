'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { MediaFrame, media } from '@/lib/media.tsx'
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
  'avatars',
  'stats',
  'products',
  'changelog',
  'tags',
  'reviews',
  'apps',
  'metrics',
  'awards',
  'cylinder-3d',
  'logo-orbit',
  'velocity-scroll',
  'grain-tape',
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
 * Twelve tracks: logos, quotes, ticker, avatars, stats, products,
 * changelog, tags, reviews, apps, metrics, awards.
 * Copy this file plus `src/lib/utils.ts`.
 */
function MarqueeCore({
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
          className={cn('mt-3 inline-flex min-h-11 items-center rounded-full border border-current/25 px-3 text-xs', controlClassName)}
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
  if (variant === 'ticker') return 'rounded-lg bg-[#111113] py-2 font-mono text-xs text-[#e8d48b]'
  if (variant === 'changelog') return 'rounded-xl border border-nx-border bg-nx-card py-3 font-mono text-xs'
  return ''
}

function FrameLabel({ variant }: { variant: MarqueeVariant }) {
  if (variant === 'ticker') return <p className="px-3 pb-1 text-xs tracking-[0.18em] text-[#fb7185]">LIVE · 18:04</p>
  if (variant === 'changelog') return <p className="px-3 pb-1 text-nx-faint">~/nexara</p>
  return null
}

function samples(variant: MarqueeVariant): ReactNode {
  if (variant === 'quotes') {
    return ['The registry finally feels like a product.', 'We shipped the mast in a week.', 'Quiet, and finished.'].map((line) => (
      <span key={line} className="w-64 rounded-2xl border border-nx-border bg-nx-card p-4 text-sm shadow-[var(--nx-shadow)]">“{line}”</span>
    ))
  }
  if (variant === 'ticker') {
    return ['Harbor opens', 'Export ready', 'Issue 18 ships'].map((line) => (
      <span key={line} className="px-4">{line} —</span>
    ))
  }
  if (variant === 'avatars') {
    return [
      [media.people.anitha, 'Anitha Rao'],
      [media.people.kiran, 'Kiran Reddy'],
      [media.people.meera, 'Meera Shah'],
    ].map(([src, name]) => (
      <span key={name} className="inline-flex items-center gap-2 rounded-full border border-nx-border bg-nx-card pr-3">
        <MediaFrame src={src} alt={name} grain={false} className="size-8 shrink-0 rounded-full" />
        <span className="text-sm">{name}</span>
      </span>
    ))
  }
  if (variant === 'tags') {
    return ['Draggable', 'Aurora', 'Modal', 'Bento'].map((item) => (
      <span key={item} className="inline-flex h-9 items-center rounded-full border border-nx-border bg-nx-card px-4 text-sm">{item}</span>
    ))
  }
  if (variant === 'stats' || variant === 'metrics') {
    return [
      ['128', 'Rooms'],
      ['24', 'Open'],
      ['4', 'Studios'],
    ].map(([value, label]) => (
      <span key={label} className="px-4 text-center">
        <span className="block font-serif text-2xl">{value}</span>
        <span className="text-xs text-nx-muted">{label}</span>
      </span>
    ))
  }
  if (variant === 'products') {
    return ['Lamp 04', 'Desk 12', 'Chair 03'].map((item) => (
      <span key={item} className="inline-flex items-center gap-3 rounded-xl border border-nx-border bg-nx-card px-3 py-2">
        <span className="size-8 rounded-lg bg-[linear-gradient(135deg,#4c46e0,#22c5b0)]" />
        <span className="text-sm">{item}</span>
      </span>
    ))
  }
  if (variant === 'changelog') {
    return ['build ok', 'lint ok', 'preview up'].map((line) => <span key={line} className="px-3 text-nx-ok">› {line}</span>)
  }
  if (variant === 'reviews') {
    return ['5.0 Harbor', '4.9 Atlas', '5.0 Field'].map((line) => (
      <span key={line} className="rounded-full bg-nx-soft px-3 py-1 text-sm text-nx-accent">{line}</span>
    ))
  }
  if (variant === 'apps') {
    return ['Rooms', 'Library', 'Export', 'Notes'].map((name) => (
      <span key={name} className="inline-flex size-14 flex-col items-center justify-center rounded-[1.1rem] bg-nx-card text-[10px] shadow-[var(--nx-shadow)] ring-1 ring-nx-border">
        <span className="mb-1 size-5 rounded-md bg-nx-accent/80" />
        {name}
      </span>
    ))
  }
  if (variant === 'awards') {
    return ['Awwwards', 'CSS Design', 'Product Hunt'].map((name) => (
      <span key={name} className="inline-flex items-center gap-2 rounded-full border border-nx-border px-3 py-1 text-xs tracking-[0.14em] uppercase">
        <span className="size-1.5 rounded-full bg-nx-accent" />
        {name}
      </span>
    ))
  }
  return ['Harbor', 'Atlas', 'Field', 'Lumen', 'North'].map((name) => (
    <span key={name} className="px-4 text-sm font-medium tracking-[0.18em] text-nx-muted uppercase">{name}</span>
  ))
}

export function Marquee(props: MarqueeProps) {
  if (isWowVariant('marquee', props.variant)) {
    return (
      <WowSignature
        family="marquee"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <MarqueeCore {...props} />
}
