'use client'

import { type CSSProperties, type ReactNode } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const GRADIENT_CSS = `
@keyframes nexara-gradient {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}
@keyframes nexara-wave-letter {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.28em); }
}
@keyframes nexara-glitch {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(1px, -1px); }
  60% { transform: translate(-1px, 0); }
}
@keyframes nexara-kinetic {
  0%, 100% { letter-spacing: 0em; }
  50% { letter-spacing: 0.12em; }
}
@keyframes nexara-flicker {
  0%, 19%, 21%, 100% { opacity: 1; }
  20% { opacity: 0.35; }
  23% { opacity: 0.8; }
}
@keyframes nexara-spark {
  0% { transform: translateX(-10%); }
  100% { transform: translateX(110%); }
}
@keyframes nexara-letter-flip {
  0%, 100% { transform: rotateX(0deg); }
  50% { transform: rotateX(70deg); }
}
@media (forced-colors: active) {
  [data-nexara="gradient-text"] {
    -webkit-text-fill-color: CanvasText !important;
    color: CanvasText !important;
    background-image: none !important;
    -webkit-text-stroke: 0 !important;
  }
}
`

const tags = {
  span: 'span',
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  div: 'div',
} as const

const VARIANTS = [
  'sweep',
  'flicker',
  'shimmer',
  'stroke',
  'marker',
  'spark',
  'glitch',
  'wave',
  'clip',
  'kinetic',
  'underline',
  'flip',
] as const

export type GradientVariant = (typeof VARIANTS)[number]

export interface GradientTextProps {
  children: ReactNode
  className?: string
  as?: keyof typeof tags
  variant?: GradientVariant
  from?: string
  via?: string
  to?: string
  animate?: boolean
  /** Seconds for one sweep. */
  duration?: number
  /** Gradient angle in degrees. */
  angle?: number
  style?: CSSProperties
}

/**
 * GradientText
 * Twelve lettering treatments. The full string stays in the element for assistive tech.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function GradientText({
  children,
  className,
  as = 'span',
  variant = 'sweep',
  from = '#ff6a3d',
  via = '#f5c16c',
  to = '#8b7cff',
  animate = true,
  duration = 8,
  angle = 105,
  style,
}: GradientTextProps) {
  const reduced = usePrefersReducedMotion()
  useKeyframes('nexara-gradient-keyframes', GRADIENT_CSS)
  const Tag = tags[as]
  const moving = animate && !reduced && variant !== 'stroke' && variant !== 'marker' && variant !== 'flicker' && variant !== 'flip' && variant !== 'kinetic'
  const label = typeof children === 'string' ? children : null
  const gradient = `linear-gradient(${angle}deg, ${from}, ${via}, ${to}, ${from})`

  const shared: CSSProperties = {
    ...style,
  }

  if (variant === 'marker') {
    return (
      <Tag data-nexara="gradient-text" data-variant={variant} className={cn('inline bg-transparent text-[#f6f3ec]', className)} style={shared}>
        <span
          className="box-decoration-clone px-1"
          style={{
            backgroundImage: `linear-gradient(${from}, ${via})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 0.42em',
            backgroundPosition: '0 88%',
          }}
        >
          {children}
        </span>
      </Tag>
    )
  }

  if (variant === 'underline') {
    return (
      <Tag data-nexara="gradient-text" data-variant={variant} className={cn('relative inline-block text-[#f6f3ec]', className)} style={shared}>
        {children}
        <span
          aria-hidden="true"
          className="absolute right-0 -bottom-1 left-0 h-[0.14em] rounded-full"
          style={{
            backgroundImage: gradient,
            backgroundSize: moving ? '200% 100%' : '100% 100%',
            animation: moving ? `nexara-gradient ${duration}s ease-in-out infinite alternate` : undefined,
          }}
        />
      </Tag>
    )
  }

  if (variant === 'stroke') {
    return (
      <Tag
        data-nexara="gradient-text"
        data-variant={variant}
        className={cn('inline-block text-transparent', className)}
        style={{ WebkitTextStroke: `1.5px ${via}`, color: 'transparent', ...shared }}
      >
        {children}
      </Tag>
    )
  }

  if (variant === 'flip' && label) {
    return (
      <Tag data-nexara="gradient-text" data-variant={variant} className={cn('inline-block text-[#f6f3ec] [perspective:600px]', className)} style={shared}>
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">
          {Array.from(label).map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="inline-block"
              style={{
                animation: reduced || char === ' ' ? undefined : `nexara-letter-flip 1.8s ease-in-out ${index * 0.05}s infinite`,
              }}
            >
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </span>
      </Tag>
    )
  }

  if (variant === 'wave' && label) {
    return (
      <Tag data-nexara="gradient-text" data-variant={variant} className={cn('inline-block text-[#f6f3ec]', className)} style={shared}>
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">
          {Array.from(label).map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="inline-block"
              style={{
                animation: reduced || char === ' ' ? undefined : `nexara-wave-letter ${1.6}s ease-in-out ${index * 0.06}s infinite`,
              }}
            >
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </span>
      </Tag>
    )
  }

  const fill: CSSProperties = {
    backgroundImage:
      variant === 'shimmer'
        ? `linear-gradient(100deg, ${from} 20%, #fff 50%, ${to} 80%)`
        :         variant === 'clip'
            ? `linear-gradient(${angle}deg, ${from} 0 33%, ${via} 33% 66%, ${to} 66% 100%)`
            : gradient,
    backgroundSize: moving ? '220% 100%' : '100% 100%',
    WebkitTextFillColor: 'transparent',
    animation: moving ? `nexara-gradient ${variant === 'shimmer' ? Math.max(1.4, duration / 3) : duration}s ease-in-out infinite alternate` : undefined,
    textShadow: undefined,
    letterSpacing: undefined,
    ...shared,
  }

  return (
    <Tag
      data-nexara="gradient-text"
      data-variant={variant}
      className={cn(
        'relative inline-block bg-clip-text text-transparent forced-colors:bg-none forced-colors:text-[CanvasText]',
        variant === 'kinetic' && !reduced && 'motion-safe:animate-[nexara-kinetic_2.8s_ease-in-out_infinite]',
        variant === 'flicker' && !reduced && 'motion-safe:animate-[nexara-flicker_1.1s_linear_infinite]',
        className,
      )}
      style={fill}
    >
      {variant === 'spark' && !reduced ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-white/70 mix-blend-overlay motion-safe:animate-[nexara-spark_1.8s_linear_infinite]" />
      ) : null}
      {variant === 'glitch' && !reduced ? (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 text-[#ff6a3d] opacity-70 mix-blend-screen motion-safe:animate-[nexara-glitch_1.1s_steps(2)_infinite]" style={{ WebkitTextFillColor: '#ff6a3d' }}>
            {children}
          </span>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 text-[#3ddec4] opacity-70 mix-blend-screen motion-safe:animate-[nexara-glitch_1.4s_steps(2)_infinite_reverse]" style={{ WebkitTextFillColor: '#3ddec4' }}>
            {children}
          </span>
        </>
      ) : null}
      <span className="relative">{children}</span>
    </Tag>
  )
}
