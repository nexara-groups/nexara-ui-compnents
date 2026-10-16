'use client'

import { useMemo, type CSSProperties, type ReactNode } from 'react'
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
@keyframes nexara-spin {
  to { transform: rotate(1turn); }
}
@keyframes nexara-meteor {
  0% { transform: translate3d(20%, -30%, 0) rotate(18deg); opacity: 0; }
  12% { opacity: 1; }
  100% { transform: translate3d(-40%, 80%, 0) rotate(18deg); opacity: 0; }
}
@keyframes nexara-twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
@keyframes nexara-pan {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}
@keyframes nexara-spot {
  0% { transform: translate3d(-10%, -20%, 0); }
  50% { transform: translate3d(30%, 10%, 0); }
  100% { transform: translate3d(-10%, -20%, 0); }
}
@keyframes nexara-ripple {
  0% { transform: scale(0.2); opacity: 0.7; }
  100% { transform: scale(1.6); opacity: 0; }
}
@keyframes nexara-rise {
  0% { transform: translateY(30%); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-120%); opacity: 0; }
}
@keyframes nexara-scan {
  0% { transform: translateY(-10%); }
  100% { transform: translateY(110vh); }
}
`

const BLUR = {
  sm: 'blur-2xl',
  md: 'blur-3xl',
  lg: 'blur-[88px]',
  xl: 'blur-[120px]',
} as const

const VARIANTS = [
  'drift',
  'beams',
  'stars',
  'waves',
  'ripple',
  'vortex',
  'meteors',
  'embers',
  'spotlight',
  'horizon',
  'ribbons',
  'scan',
] as const

export type AuroraVariant = (typeof VARIANTS)[number]

const SLOTS: Array<CSSProperties> = [
  { top: '-28%', left: '-8%', width: '58%', height: '70%' },
  { top: '8%', left: '38%', width: '52%', height: '62%' },
  { bottom: '-30%', left: '8%', width: '48%', height: '64%' },
  { top: '18%', right: '-12%', width: '46%', height: '58%' },
  { bottom: '-10%', right: '12%', width: '36%', height: '46%' },
]

const DEFAULT_COLORS = ['#ff6a3d', '#8b7cff', '#3ddec4', '#f5c16c']

export interface AuroraBackgroundProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  /** Field treatment. `drift` is the original soft aurora. */
  variant?: AuroraVariant
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

/**
 * AuroraBackground
 * Twelve decorative fields. Content sits above the effect.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function AuroraBackground({
  children,
  className,
  contentClassName,
  variant = 'drift',
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
  const stars = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        delay: `${(index % 7) * 0.35}s`,
        size: index % 4 === 0 ? 2.5 : 1.25,
      })),
    [],
  )

  return (
    <div data-nexara="aurora-background" data-variant={variant} className={cn('relative isolate overflow-hidden bg-[#09090f]', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Field
          variant={variant}
          palette={palette}
          duration={duration}
          blur={blur}
          intensity={intensity}
          still={still}
          stars={stars}
        />
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

function Field({
  variant,
  palette,
  duration,
  blur,
  intensity,
  still,
  stars,
}: {
  variant: AuroraVariant
  palette: string[]
  duration: number
  blur: keyof typeof BLUR
  intensity: number
  still: boolean
  stars: Array<{ left: string; top: string; delay: string; size: number }>
}) {
  if (variant === 'stars') {
    return (
      <>
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              background: palette[index % palette.length],
              opacity: intensity,
              animation: still ? undefined : `nexara-twinkle ${2.4 + (index % 5)}s ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </>
    )
  }

  if (variant === 'meteors') {
    return (
      <>
        {palette.map((color, index) => (
          <span
            key={color + index}
            className="absolute h-px w-40"
            style={{
              top: `${8 + index * 16}%`,
              left: `${10 + index * 14}%`,
              background: `linear-gradient(90deg, transparent, ${color})`,
              opacity: intensity,
              animation: still ? undefined : `nexara-meteor ${3.2 + index}s linear ${index * 0.7}s infinite`,
            }}
          />
        ))}
      </>
    )
  }

  if (variant === 'beams') {
    return (
      <>
        {palette.map((color, index) => (
          <span
            key={color + index}
            className="absolute top-[-20%] h-[140%] w-16 origin-center"
            style={{
              left: `${8 + index * 22}%`,
              background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
              opacity: intensity * 0.55,
              rotate: `${18 + index * 6}deg`,
              animation: still ? undefined : `nexara-aurora-a ${duration + index * 3}s ease-in-out ${index * -2}s infinite alternate`,
              animationPlayState: still ? 'paused' : 'running',
            }}
          />
        ))}
      </>
    )
  }

  if (variant === 'vortex') {
    return (
      <span
        className="absolute top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `conic-gradient(from 0deg, ${palette.concat(palette[0] ?? '#8b7cff').join(', ')})`,
          opacity: intensity * 0.45,
          filter: 'blur(40px)',
          animation: still ? undefined : `nexara-spin ${duration * 2}s linear infinite`,
        }}
      />
    )
  }

  if (variant === 'ripple') {
    return (
      <>
        {palette.slice(0, 3).map((color, index) => (
          <span
            key={color + index}
            className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              borderColor: color,
              opacity: intensity,
              animation: still ? undefined : `nexara-ripple ${3.2 + index}s ease-out ${index * 0.8}s infinite`,
            }}
          />
        ))}
      </>
    )
  }

  if (variant === 'embers') {
    return (
      <>
        {stars.slice(0, 18).map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full"
            style={{
              left: star.left,
              bottom: '8%',
              width: star.size + 1,
              height: star.size + 1,
              background: palette[index % palette.length],
              animation: still ? undefined : `nexara-rise ${4 + (index % 4)}s linear ${star.delay} infinite`,
            }}
          />
        ))}
      </>
    )
  }

  if (variant === 'scan') {
    return (
      <span
        className="absolute inset-x-0 top-0 h-8"
        style={{
          background: `linear-gradient(180deg, transparent, ${palette[0] ?? '#3ddec4'}, transparent)`,
          opacity: intensity,
          animation: still ? undefined : `nexara-scan ${duration / 2}s linear infinite`,
        }}
      />
    )
  }

  if (variant === 'ribbons') {
    return (
      <>
        {palette.slice(0, 3).map((color, index) => (
          <span
            key={color + index}
            className="absolute left-[-10%] h-16 w-[120%] rounded-full"
            style={{
              top: `${18 + index * 22}%`,
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              opacity: intensity * 0.8,
              filter: 'blur(8px)',
              animation: still ? undefined : `nexara-aurora-${index % 2 === 0 ? 'a' : 'b'} ${duration}s ease-in-out ${index * -2}s infinite alternate`,
            }}
          />
        ))}
      </>
    )
  }

  if (variant === 'waves') {
    return (
      <span
        className="absolute inset-[-20%]"
        style={{
          backgroundImage: `repeating-linear-gradient(180deg, transparent 0 18px, ${palette[0] ?? '#8b7cff'}22 18px 19px), linear-gradient(100deg, ${palette.join(', ')})`,
          backgroundSize: '180% 180%',
          opacity: intensity,
          filter: 'blur(8px)',
          animation: still ? undefined : `nexara-pan ${duration}s ease-in-out infinite alternate`,
        }}
      />
    )
  }

  if (variant === 'spotlight') {
    return (
      <span
        className="absolute top-[-10%] left-[10%] h-[80%] w-[55%] rounded-full"
        style={{
          background: `radial-gradient(circle, ${palette[0] ?? '#f5c16c'}, transparent 68%)`,
          opacity: intensity,
          filter: 'blur(24px)',
          animation: still ? undefined : `nexara-spot ${duration}s ease-in-out infinite`,
        }}
      />
    )
  }

  if (variant === 'horizon') {
    return (
      <span
        className="absolute inset-x-[-10%] bottom-[-20%] h-[55%]"
        style={{
          background: `linear-gradient(180deg, transparent, ${palette[0] ?? '#ff6a3d'} 40%, ${palette[1] ?? '#8b7cff'})`,
          opacity: intensity,
          filter: 'blur(18px)',
          animation: still ? undefined : `nexara-aurora-b ${duration}s ease-in-out infinite alternate`,
        }}
      />
    )
  }

  const blobBlur = BLUR[blur]

  return (
    <>
      {palette.map((color, index) => (
        <span
          key={`${color}-${index}`}
          className={cn('absolute rounded-full mix-blend-screen', blobBlur)}
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
    </>
  )
}
