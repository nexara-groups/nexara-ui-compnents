'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const spotlightVariants = cva(
  'group relative overflow-hidden rounded-3xl border p-6 text-left transition-transform duration-300',
  {
    variants: {
      variant: {
        glass: 'border-white/12 bg-white/[0.04] shadow-[0_20px_60px_-36px_rgba(0,0,0,0.8)] backdrop-blur-xl',
        solid: 'border-white/10 bg-[#14151f]',
        outline: 'border-white/18 bg-transparent',
        ink: 'border-white/10 bg-[#0c0d14]',
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
 * A card whose highlight follows the pointer. Updates CSS variables directly
 * so pointer movement does not re-render React.
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
  function writeSpot(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    writeSpot(event)
    onPointerMove?.(event)
  }

  return (
    <div
      data-nexara="spotlight-card"
      onPointerEnter={writeSpot}
      onPointerMove={handleMove}
      onPointerLeave={onPointerLeave}
      className={cn(spotlightVariants({ variant }), lift && 'motion-safe:hover:-translate-y-0.5', className)}
      style={
        {
          '--spot-size': `${spotlightSize / 2}px`,
          '--spot-color': spotlightColor,
          '--spot-border': borderGlowColor,
          ...style,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(var(--spot-size) circle at var(--spot-x, 30%) var(--spot-y, 0%), var(--spot-color), transparent 68%)',
        }}
      />
      {borderGlow ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            padding: '1px',
            background:
              'radial-gradient(var(--spot-size) circle at var(--spot-x, 30%) var(--spot-y, 20%), var(--spot-border), transparent 62%)',
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
          }}
        />
      ) : null}
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}
