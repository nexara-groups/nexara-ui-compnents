'use client'

import { useLayoutEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

export interface GridBackgroundProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  variant?: 'grid' | 'dots'
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

/**
 * GridBackground
 * A dotted or ruled surface. A dim field stays visible, and a brighter copy
 * can follow the pointer.
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

  const backgroundImage =
    variant === 'dots'
      ? `radial-gradient(circle, ${color} ${Math.max(1, size * 0.045)}px, transparent ${Math.max(1.4, size * 0.06)}px)`
      : `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`
  const mask = `radial-gradient(ellipse at var(--grid-x, 50%) var(--grid-y, 42%), #000 0%, transparent ${maskRadius}%)`

  useLayoutEffect(() => {
    const node = patternRef.current
    if (!node) return
    node.style.backgroundImage = backgroundImage
    node.style.backgroundSize = `${size}px ${size}px`
    node.style.backgroundPosition = 'center'
    node.style.setProperty('--grid-x', point.current.x)
    node.style.setProperty('--grid-y', point.current.y)
    const maskValue = fade ? mask : 'none'
    node.style.maskImage = maskValue
    node.style.setProperty('-webkit-mask-image', maskValue)
  }, [backgroundImage, fade, mask, size])

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
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn('relative isolate overflow-hidden bg-[#09090f]', className)}
      style={style}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: 'center',
        }}
      />
      <div ref={patternRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}
