'use client'

import { type CSSProperties, type ReactNode } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const GRADIENT_CSS = `
@keyframes nexara-gradient {
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
}
@media (forced-colors: active) {
  [data-nexara="gradient-text"] {
    -webkit-text-fill-color: CanvasText !important;
    color: CanvasText !important;
    background-image: none !important;
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

export interface GradientTextProps {
  children: ReactNode
  className?: string
  as?: keyof typeof tags
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
 * Clipped gradient lettering. Animation pans the gradient across the glyphs.
 */
export function GradientText({
  children,
  className,
  as = 'span',
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
  const moving = animate && !reduced

  return (
    <Tag
      data-nexara="gradient-text"
      className={cn(
        'inline-block bg-clip-text text-transparent forced-colors:bg-none forced-colors:text-[CanvasText]',
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${from}, ${via}, ${to})`,
        backgroundSize: moving ? '200% 100%' : '100% 100%',
        WebkitTextFillColor: 'transparent',
        animation: moving ? `nexara-gradient ${duration}s ease-in-out infinite alternate` : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
