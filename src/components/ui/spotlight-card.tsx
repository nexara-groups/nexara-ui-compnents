'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { cn, useKeyframes } from '@/lib/utils.ts'

const BEAM_CSS = `
@keyframes nexara-card-beam {
  to { transform: rotate(1turn); }
}
`

const spotlightVariants = cva(
  'group relative overflow-hidden rounded-3xl border p-6 text-left transition-[transform,box-shadow] duration-300',
  {
    variants: {
      variant: {
        glass: 'border-white/12 bg-white/[0.04] shadow-[0_20px_60px_-36px_rgba(0,0,0,0.8)] backdrop-blur-xl',
        parallax: 'border-white/10 bg-[#14151f]',
        reveal: 'border-white/18 bg-[#0c0d14]',
        comet: 'border-white/10 bg-[#0c0d14]',
        'border-beam': 'border-transparent bg-[#101118]',
        tilt: 'border-white/12 bg-[#14151f] [transform-style:preserve-3d]',
        glare: 'border-white/10 bg-[#16141c]',
        fisheye: 'border-white/15 bg-[#10131a]',
        magnifier: 'border-white/10 bg-[#101018]',
        ripple: 'border-white/10 bg-[#0c0d12]',
        holographic: 'border-white/15 bg-[#121018]',
        scan: 'border-white/10 bg-[#14120f]',
      },
    },
    defaultVariants: { variant: 'glass' },
  },
)

export interface SpotlightCardProps extends VariantProps<typeof spotlightVariants> {
  children: ReactNode
  className?: string
  contentClassName?: string
  /** Any CSS color, including rgba. */
  spotlightColor?: string
  /** Diameter of the glow in pixels. */
  spotlightSize?: number
  /** Draw a hairline that brightens under the pointer. */
  borderGlow?: boolean
  /** CSS color of the hairline. */
  borderGlowColor?: string
  /** Lift the card a couple of pixels on hover. */
  lift?: boolean
  style?: CSSProperties
  onPointerMove?: (event: PointerEvent<HTMLDivElement>) => void
  onPointerLeave?: (event: PointerEvent<HTMLDivElement>) => void
}

/**
 * SpotlightCard
 * Twelve surfaces whose light, tilt, or sheen follows the pointer.
 * Pointer moves write CSS variables and do not re-render React.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function SpotlightCard({
  children,
  className,
  contentClassName,
  variant,
  spotlightColor = 'rgba(139, 124, 255, 0.45)',
  spotlightSize = 180,
  borderGlow = true,
  borderGlowColor = 'rgba(255, 255, 255, 0.85)',
  lift = true,
  style,
  onPointerMove,
  onPointerLeave,
}: SpotlightCardProps) {
  useKeyframes('nexara-card-beam-keyframes', BEAM_CSS)
  const kind = variant ?? 'glass'

  function writeSpot(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    event.currentTarget.style.setProperty('--spot-x', `${x}px`)
    event.currentTarget.style.setProperty('--spot-y', `${y}px`)
    const rx = ((y - rect.height / 2) / rect.height) * -10
    const ry = ((x - rect.width / 2) / rect.width) * 12
    event.currentTarget.style.setProperty('--tilt-x', `${rx}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${ry}deg`)
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2)
    event.currentTarget.style.setProperty('--holo', `${angle}rad`)
  }

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    writeSpot(event)
    onPointerMove?.(event)
  }

  function handleLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
    onPointerLeave?.(event)
  }

  const card = (
    <div
      data-nexara="spotlight-card"
      data-variant={kind}
      onPointerEnter={writeSpot}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        spotlightVariants({ variant }),
        lift && kind !== 'tilt' && 'motion-safe:hover:-translate-y-0.5',
        className,
      )}
      style={
        {
          '--spot-size': `${kind === 'fisheye' ? spotlightSize / 3 : spotlightSize / 2}px`,
          '--spot-color': spotlightColor,
          '--spot-border': borderGlowColor,
          transform: kind === 'tilt' ? 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' : undefined,
          transformStyle: kind === 'tilt' ? 'preserve-3d' : undefined,
          ...style,
        } as CSSProperties
      }
    >
      {kind === 'border-beam' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-[-40%] motion-safe:animate-[nexara-card-beam_4s_linear_infinite]">
          <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_70%,#8b7cff_84%,#f5c16c_92%,transparent_100%)]" />
        </span>
      ) : null}
      {kind === 'border-beam' ? <span aria-hidden="true" className="absolute inset-px rounded-[inherit] bg-[#101118]" /> : null}
      {kind === 'holographic' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen"
          style={{
            background:
              'conic-gradient(from var(--holo, 0.4rad), rgba(255,106,61,0.45), rgba(245,193,108,0.4), rgba(139,124,255,0.5), rgba(61,222,196,0.4), rgba(255,106,61,0.45))',
          }}
        />
      ) : null}
      {kind === 'parallax' ? (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute top-6 left-6 size-16 rounded-full bg-[#ff6a3d]/30" style={{ transform: 'translate(calc(var(--spot-x, 40px) / 8), calc(var(--spot-y, 20px) / 10))' }} />
          <span aria-hidden="true" className="pointer-events-none absolute right-8 bottom-8 size-10 rounded-full bg-[#8b7cff]/40" style={{ transform: 'translate(calc(var(--spot-x, 40px) / -14), calc(var(--spot-y, 20px) / -12))' }} />
        </>
      ) : null}
      {kind === 'reveal' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#3ddec4,#8b7cff)] opacity-80"
          style={{ clipPath: 'circle(70px at var(--spot-x, 30%) var(--spot-y, 30%))' }}
        />
      ) : null}
      {kind === 'scan' ? (
        <span aria-hidden="true" className="pointer-events-none absolute right-0 left-0 h-0.5 bg-[#f5c16c]" style={{ top: 'var(--spot-y, 40%)' }} />
      ) : null}
      {kind === 'ripple' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f6f3ec]/50"
          style={{ left: 'var(--spot-x, 40%)', top: 'var(--spot-y, 40%)' }}
        />
      ) : null}
      {kind === 'magnifier' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-md"
          style={{ left: 'var(--spot-x, 40%)', top: 'var(--spot-y, 40%)' }}
        />
      ) : null}
      {kind === 'comet' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5c16c] shadow-[0_0_18px_#f5c16c]"
          style={{ left: 'var(--spot-x, 20%)', top: 'var(--spot-y, 20%)' }}
        />
      ) : null}
      {kind === 'glare' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.28) 48%, transparent 62%)',
            transform: 'translateX(calc(var(--spot-x, 0px) - 50%))',
          }}
        />
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background:
            'radial-gradient(var(--spot-size) circle at var(--spot-x, 30%) var(--spot-y, 0%), var(--spot-color), transparent 68%)',
        }}
      />
      {borderGlow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{
            padding: '1px',
            background:
              kind === 'comet'
                ? 'radial-gradient(var(--spot-size) circle at var(--spot-x, 30%) var(--spot-y, 20%), #ff6a3d, #8b7cff 40%, transparent 70%)'
                : 'radial-gradient(var(--spot-size) circle at var(--spot-x, 30%) var(--spot-y, 20%), var(--spot-border), transparent 62%)',
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
          }}
        />
      ) : null}
      <div className={cn('relative z-10', kind === 'fisheye' && 'origin-center transition-transform duration-200 group-hover:scale-110 group-focus-within:scale-110', contentClassName)}>
        {children}
      </div>
    </div>
  )

  if (kind !== 'tilt') return card

  return <div className="[perspective:1000px]">{card}</div>
}
