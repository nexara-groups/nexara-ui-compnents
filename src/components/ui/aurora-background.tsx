'use client'

import { type CSSProperties, type ReactNode } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const AURORA_CSS = `
@keyframes nexara-aurora-a {
  0% { transform: translate3d(-6%, 2%, 0) scale(1); }
  100% { transform: translate3d(10%, -8%, 0) scale(1.12); }
}
@keyframes nexara-aurora-b {
  0% { transform: translate3d(8%, -4%, 0) scale(1.08); }
  100% { transform: translate3d(-10%, 8%, 0) scale(0.94); }
}
`

const BLUR = {
  sm: 'blur-2xl',
  md: 'blur-3xl',
  lg: 'blur-[88px]',
  xl: 'blur-[120px]',
} as const

const SLOTS: Array<CSSProperties> = [
  { top: '-28%', left: '-8%', width: '58%', height: '70%' },
  { top: '8%', left: '38%', width: '52%', height: '62%' },
  { bottom: '-30%', left: '8%', width: '48%', height: '64%' },
  { top: '18%', right: '-12%', width: '46%', height: '58%' },
  { bottom: '-10%', right: '12%', width: '36%', height: '46%' },
]

export interface AuroraBackgroundProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  /** Up to five CSS colors. Extra colors are ignored. */
  colors?: string[]
  /** Base loop length in seconds. Each blob is slightly slower. */
  duration?: number
  blur?: keyof typeof BLUR
  /** Blob opacity, 0–1. */
  intensity?: number
  pause?: boolean
  noise?: boolean
}

const DEFAULT_COLORS = ['#ff6a3d', '#8b7cff', '#3ddec4', '#f5c16c']

/**
 * AuroraBackground
 * Soft drifting color fields behind any content. Decorative, not interactive.
 */
export function AuroraBackground({
  children,
  className,
  contentClassName,
  colors = DEFAULT_COLORS,
  duration = 18,
  blur = 'md',
  intensity = 0.7,
  pause = false,
  noise = true,
}: AuroraBackgroundProps) {
  const reduced = usePrefersReducedMotion()
  useKeyframes('nexara-aurora-keyframes', AURORA_CSS)
  const palette = colors.slice(0, SLOTS.length)
  const still = reduced || pause

  return (
    <div
      data-nexara="aurora-background"
      className={cn('relative isolate overflow-hidden bg-[#09090f]', className)}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {palette.map((color, index) => (
          <span
            key={`${color}-${index}`}
            className={cn('absolute rounded-full mix-blend-screen', BLUR[blur])}
            style={{
              ...SLOTS[index],
              background: `radial-gradient(circle, ${color}, transparent 68%)`,
              opacity: intensity,
              animationName: index % 2 === 0 ? 'nexara-aurora-a' : 'nexara-aurora-b',
              animationDuration: `${duration + index * 4}s`,
              animationTimingFunction: 'ease-in-out',
              animationDelay: `${index * -3}s`,
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationPlayState: still ? 'paused' : 'running',
            }}
          />
        ))}
        {noise ? (
          <span
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>\")",
            }}
          />
        ) : null}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,15,0.35)_78%)]"
      />
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}
