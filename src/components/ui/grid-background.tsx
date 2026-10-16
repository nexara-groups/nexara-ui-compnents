'use client'

import { useLayoutEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const VARIANTS = [
  'grid',
  'dots',
  'brick',
  'plus',
  'hatch',
  'diagonal',
  'isometric',
  'circuit',
  'hex',
  'topography',
  'rings',
  'scatter',
] as const

export type GridVariant = (typeof VARIANTS)[number]

export interface GridBackgroundProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  variant?: GridVariant
  /** Cell size in pixels. */
  size?: number
  color?: string
  /** Fade a brighter copy of the pattern toward a point, optionally following the pointer. */
  fade?: boolean
  interactive?: boolean
  /** 0–100, how far the bright mask reaches. */
  maskRadius?: number
  style?: CSSProperties
}

function tile(variant: GridVariant, color: string, size: number) {
  const svg = (body: string) =>
    `url("data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' fill='none'>${body}</svg>`,
    )}")`

  const mid = size / 2
  if (variant === 'dots') {
    return {
      backgroundImage: `radial-gradient(circle, ${color} ${Math.max(1, size * 0.045)}px, transparent ${Math.max(1.4, size * 0.06)}px)`,
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'grid') {
    return {
      backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'circuit') {
    return {
      backgroundImage: svg(
        `<path d='M2 ${mid}H${mid - 4}M${mid + 4} ${mid}H${size - 2}M${mid} 2V${mid - 4}' stroke='${color}' stroke-width='1.2'/><circle cx='${mid}' cy='${mid}' r='2.2' stroke='${color}' stroke-width='1'/>`,
      ),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'brick') {
    const half = size / 2
    return {
      backgroundImage: svg(
        `<path d='M0 0H${size}M0 ${half}H${size}M${mid} 0V${half}M0 ${half}V${size}' stroke='${color}' stroke-width='1'/>`,
      ),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'hatch') {
    return {
      backgroundImage: `repeating-linear-gradient(45deg, transparent 0 ${size / 2}px, ${color} ${size / 2}px ${size / 2 + 1}px), repeating-linear-gradient(-45deg, transparent 0 ${size / 2}px, ${color} ${size / 2}px ${size / 2 + 1}px)`,
      backgroundSize: 'auto',
    }
  }
  if (variant === 'topography') {
    return {
      backgroundImage: svg(
        `<path d='M2 ${size * 0.7} C ${size * 0.3} ${size * 0.2}, ${size * 0.7} ${size * 0.9}, ${size - 2} ${size * 0.35}' stroke='${color}' stroke-width='1' fill='none'/>`,
      ),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'plus') {
    const arm = size * 0.22
    return {
      backgroundImage: svg(
        `<path d='M${mid} ${mid - arm}V${mid + arm}M${mid - arm} ${mid}H${mid + arm}' stroke='${color}' stroke-width='1.4' stroke-linecap='round'/>`,
      ),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'diagonal') {
    return {
      backgroundImage: `repeating-linear-gradient(45deg, transparent 0 ${size / 2}px, ${color} ${size / 2}px ${size / 2 + 1}px)`,
      backgroundSize: 'auto',
    }
  }
  if (variant === 'isometric') {
    return {
      backgroundImage: svg(
        `<path d='M0 ${mid} L${mid} 0 L${size} ${mid} L${mid} ${size} Z' stroke='${color}' stroke-width='1' fill='none'/>`,
      ),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'hex') {
    const radius = size * 0.5
    const tileW = radius * Math.sqrt(3)
    const tileH = radius * 3
    const points = (cx: number, cy: number) =>
      Array.from({ length: 6 }, (_, index) => {
        const angle = (Math.PI / 180) * (60 * index - 30)
        return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`
      }).join(' ')
    const body = [points(tileW / 2, radius), points(0, radius * 2.5), points(tileW, radius * 2.5)]
      .map((poly) => `<polygon points='${poly}' stroke='${color}' stroke-width='1' fill='none'/>`)
      .join('')
    return {
      backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${tileW.toFixed(2)}' height='${tileH.toFixed(2)}' fill='none'>${body}</svg>`,
      )}")`,
      backgroundSize: `${tileW.toFixed(2)}px ${tileH.toFixed(2)}px`,
    }
  }
  if (variant === 'rings') {
    return {
      backgroundImage: `repeating-radial-gradient(circle at 50% 50%, transparent 0 ${size * 0.7}px, ${color} ${size * 0.7}px ${size * 0.7 + 1}px)`,
      backgroundSize: 'auto',
    }
  }
  return {
    backgroundImage: svg(
      `<circle cx='${size * 0.2}' cy='${size * 0.3}' r='1.2' fill='${color}'/><circle cx='${size * 0.7}' cy='${size * 0.2}' r='1' fill='${color}'/><circle cx='${size * 0.55}' cy='${size * 0.72}' r='1.3' fill='${color}'/><circle cx='${size * 0.86}' cy='${size * 0.58}' r='0.8' fill='${color}'/>`,
    ),
    backgroundSize: `${size}px ${size}px`,
  }
}

/**
 * GridBackground
 * Twelve surface patterns. A dim field stays visible, and a brighter copy
 * can follow the pointer.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function GridBackground({
  children,
  className,
  contentClassName,
  variant = 'grid',
  size = 28,
  color = 'rgba(246, 243, 236, 0.28)',
  fade = true,
  interactive = true,
  maskRadius = 42,
  style,
}: GridBackgroundProps) {
  const reduced = usePrefersReducedMotion()
  const patternRef = useRef<HTMLDivElement>(null)
  const point = useRef({ x: '50%', y: '42%' })
  const frame = useRef(0)
  const track = interactive && fade && !reduced
  const painted = tile(variant, color, size)
  const mask = `radial-gradient(ellipse at var(--grid-x, 50%) var(--grid-y, 42%), #000 0%, transparent ${maskRadius}%)`

  useLayoutEffect(() => {
    const node = patternRef.current
    if (!node) return
    node.style.backgroundImage = painted.backgroundImage
    node.style.backgroundSize = painted.backgroundSize
    node.style.backgroundPosition = 'center'
    node.style.backgroundRepeat = 'repeat'
    node.style.setProperty('--grid-x', point.current.x)
    node.style.setProperty('--grid-y', point.current.y)
    const maskValue = fade ? mask : 'none'
    node.style.maskImage = maskValue
    node.style.setProperty('-webkit-mask-image', maskValue)
  }, [fade, mask, painted.backgroundImage, painted.backgroundSize])

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (!track) return
    const rect = event.currentTarget.getBoundingClientRect()
    point.current = {
      x: `${((event.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((event.clientY - rect.top) / rect.height) * 100}%`,
    }
    window.cancelAnimationFrame(frame.current)
    frame.current = window.requestAnimationFrame(() => {
      const node = patternRef.current
      if (!node) return
      node.style.setProperty('--grid-x', point.current.x)
      node.style.setProperty('--grid-y', point.current.y)
    })
  }

  function handleLeave() {
    point.current = { x: '50%', y: '42%' }
    const node = patternRef.current
    if (!node) return
    node.style.setProperty('--grid-x', '50%')
    node.style.setProperty('--grid-y', '42%')
  }

  return (
    <div
      data-nexara="grid-background"
      data-variant={variant}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn('relative isolate overflow-hidden bg-[#09090f]', className)}
      style={style}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ ...painted, backgroundPosition: 'center', backgroundRepeat: 'repeat' }}
      />
      <div ref={patternRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}
