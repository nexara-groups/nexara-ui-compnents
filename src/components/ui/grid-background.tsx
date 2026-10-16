'use client'

import { useLayoutEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const VARIANTS = [
  'graph',
  'dots',
  'isometric',
  'hex',
  'circuit',
  'blueprint',
  'notebook',
  'perspective',
  'topography',
  'herringbone',
  'pixel',
  'brick',
] as const

export type GridVariant = (typeof VARIANTS)[number]

export interface GridBackgroundProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  variant?: GridVariant
  size?: number
  color?: string
  fade?: boolean
  interactive?: boolean
  maskRadius?: number
  style?: CSSProperties
}

function svgUrl(width: number, height: number, body: string) {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' fill='none'>${body}</svg>`,
  )}")`
}

function tile(variant: GridVariant, color: string, size: number): CSSProperties {
  const mid = size / 2
  if (variant === 'dots') {
    return {
      backgroundImage: `radial-gradient(circle, ${color} ${Math.max(1, size * 0.06)}px, transparent ${Math.max(1.6, size * 0.08)}px)`,
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'isometric') {
    return {
      backgroundImage: svgUrl(size, size, `<path d='M0 ${mid} L${mid} 0 L${size} ${mid} L${mid} ${size} Z' stroke='${color}' stroke-width='1'/>`),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'hex') {
    const radius = size * 0.5
    const tileW = radius * Math.sqrt(3)
    const points = (cx: number, cy: number) =>
      Array.from({ length: 6 }, (_, index) => {
        const angle = (Math.PI / 180) * (60 * index - 30)
        return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`
      }).join(' ')
    const body = [points(tileW / 2, radius), points(0, radius * 2.5), points(tileW, radius * 2.5)]
      .map((poly) => `<polygon points='${poly}' stroke='${color}' stroke-width='1'/>`)
      .join('')
    return {
      backgroundImage: svgUrl(Number(tileW.toFixed(2)), Number((radius * 3).toFixed(2)), body),
      backgroundSize: `${tileW.toFixed(2)}px ${(radius * 3).toFixed(2)}px`,
    }
  }
  if (variant === 'circuit') {
    return {
      backgroundImage: svgUrl(size, size, `<path d='M2 ${mid}H${mid - 4}M${mid + 4} ${mid}H${size - 2}M${mid} 2V${mid - 4}' stroke='${color}' stroke-width='1.2'/><circle cx='${mid}' cy='${mid}' r='2.4' stroke='${color}'/>`),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'topography') {
    return {
      backgroundImage: svgUrl(size, size, `<path d='M2 ${size * 0.72} C ${size * 0.3} ${size * 0.2}, ${size * 0.7} ${size * 0.95}, ${size - 2} ${size * 0.3}' stroke='${color}' stroke-width='1'/>`),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'herringbone') {
    const row = size
    return {
      backgroundImage: svgUrl(
        size * 2,
        row * 2,
        `<path d='M0 ${row} L${size} 0 L${size * 2} ${row} M0 ${row * 2} L${size} ${row} L${size * 2} ${row * 2}' stroke='${color}' stroke-width='1' fill='none'/>`,
      ),
      backgroundSize: `${size * 2}px ${row * 2}px`,
    }
  }
  if (variant === 'pixel') {
    return {
      backgroundImage: svgUrl(size, size, `<rect width='${size / 2}' height='${size / 2}' fill='${color}' opacity='0.35'/><rect x='${size / 2}' y='${size / 2}' width='${size / 2}' height='${size / 2}' fill='${color}' opacity='0.7'/>`),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'brick') {
    const half = size / 2
    return {
      backgroundImage: svgUrl(size, size, `<path d='M0 0H${size}M0 ${half}H${size}M${mid} 0V${half}M0 ${half}V${size}' stroke='${color}' stroke-width='1'/>`),
      backgroundSize: `${size}px ${size}px`,
    }
  }
  if (variant === 'notebook') {
    return {
      backgroundImage: `repeating-linear-gradient(180deg, transparent 0 27px, ${color} 27px 28px)`,
      backgroundPosition: '0 8px',
    }
  }
  if (variant === 'blueprint' || variant === 'graph' || variant === 'perspective') {
    return {
      backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    }
  }
  return { backgroundImage: 'none' }
}

/**
 * GridBackground
 * Twelve surfaces: graph paper, dots, isometric, hex, circuit, blueprint,
 * notebook, perspective floor, topography, herringbone, pixel, brick.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function GridBackground({
  children,
  className,
  contentClassName,
  variant = 'graph',
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
  const track = interactive && fade && !reduced && variant !== 'perspective'
  const painted = tile(variant, variant === 'blueprint' ? 'rgba(219,234,254,0.45)' : color, size)
  const mask = `radial-gradient(ellipse at var(--grid-x, 50%) var(--grid-y, 42%), #000 0%, transparent ${maskRadius}%)`
  const ground = variant === 'blueprint' ? 'bg-[#12315c]' : variant === 'notebook' ? 'bg-[#f4efe4]' : 'bg-[#09090f]'

  useLayoutEffect(() => {
    const node = patternRef.current
    if (!node || variant === 'perspective') return
    node.style.backgroundImage = String(painted.backgroundImage ?? '')
    node.style.backgroundSize = String(painted.backgroundSize ?? 'auto')
    node.style.backgroundPosition = 'center'
    node.style.backgroundRepeat = 'repeat'
    const maskValue = fade && variant !== 'notebook' ? mask : 'none'
    node.style.maskImage = maskValue
    node.style.setProperty('-webkit-mask-image', maskValue)
  }, [fade, mask, painted.backgroundImage, painted.backgroundSize, variant])

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (!track) return
    const rect = event.currentTarget.getBoundingClientRect()
    point.current = {
      x: `${((event.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((event.clientY - rect.top) / rect.height) * 100}%`,
    }
    window.cancelAnimationFrame(frame.current)
    frame.current = window.requestAnimationFrame(() => {
      patternRef.current?.style.setProperty('--grid-x', point.current.x)
      patternRef.current?.style.setProperty('--grid-y', point.current.y)
    })
  }

  return (
    <div
      data-nexara="grid-background"
      data-variant={variant}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        patternRef.current?.style.setProperty('--grid-x', '50%')
        patternRef.current?.style.setProperty('--grid-y', '42%')
      }}
      className={cn('relative isolate overflow-hidden', ground, variant === 'notebook' && 'text-[#1c1915]', className)}
      style={style}
    >
      {variant === 'perspective' ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [perspective:400px]">
          <div
            className="absolute inset-x-[-20%] top-1/3 h-[140%] origin-top [transform:rotateX(68deg)]"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(61,222,196,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(61,222,196,0.45) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>
      ) : (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40" style={painted} />
          <div ref={patternRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
        </>
      )}
      {variant === 'notebook' ? <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-10 w-px bg-[#e11d48]" /> : null}
      {variant === 'blueprint' ? (
        <span aria-hidden="true" className="pointer-events-none absolute right-3 bottom-3 w-36 border border-white/50 p-2 text-[10px] tracking-[0.14em] text-white/80 uppercase">
          Sheet 04<br />Nexara
        </span>
      ) : null}
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}
