'use client'

import { isWowVariant } from '@/lib/wow-variants.ts'
import { WowSignature } from './wow-lazy.tsx'

import { type PointerEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'graph',
  'dots',
  'plus',
  'isometric',
  'hex',
  'circuit',
  'blueprint',
  'notebook',
  'perspective',
  'topo',
  'diagonal',
  'fade',
  'perspective-fly',
  'circuit-draw',
  'topo-pulse',
  'hex-lattice',
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
}

/**
 * GridBackground
 * Twelve surfaces. Copy this file plus `src/lib/utils.ts`.
 */
function GridBackgroundCore({
  children,
  className,
  contentClassName,
  variant = 'graph',
  size = 28,
  color,
  fade = true,
  interactive = true,
}: GridBackgroundProps) {
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!interactive) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--gx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--gy', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      data-nexara="grid-background"
      data-variant={variant}
      onPointerMove={move}
      className={cn('relative overflow-hidden bg-nx-bg text-nx-fg', className)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: pattern(variant, size, color),
          backgroundSize: sizeFor(variant, size),
          maskImage: fade
            ? 'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 40%), #000 20%, transparent 72%)'
            : undefined,
        }}
      />
      {variant === 'blueprint' ? (
        <span className="pointer-events-none absolute right-3 bottom-3 border border-sky-300/40 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-sky-200 uppercase">
          NX-18
        </span>
      ) : null}
      {variant === 'notebook' ? <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-10 w-px bg-rose-400/50" /> : null}
      {variant === 'perspective' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 origin-bottom"
          style={{
            backgroundImage: `linear-gradient(var(--nx-border) 1px, transparent 1px), linear-gradient(90deg, var(--nx-border) 1px, transparent 1px)`,
            backgroundSize: `${size}px ${size}px`,
            transform: 'perspective(500px) rotateX(58deg)',
          }}
        />
      ) : null}
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}

function sizeFor(variant: GridVariant, size: number) {
  if (variant === 'hex') return `${size * 1.6}px ${size * 1.4}px`
  if (variant === 'isometric') return `${size * 2}px ${size * 1.15}px`
  if (variant === 'plus') return `${size}px ${size}px`
  return `${size}px ${size}px`
}

function pattern(variant: GridVariant, size: number, color?: string) {
  const line = color ?? 'color-mix(in oklab, var(--nx-fg) 12%, transparent)'
  if (variant === 'dots') {
    return `radial-gradient(circle, ${line} 1px, transparent 1.2px)`
  }
  if (variant === 'plus') {
    return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`
  }
  if (variant === 'isometric') {
    return `linear-gradient(30deg, ${line} 1px, transparent 1.5px), linear-gradient(150deg, ${line} 1px, transparent 1.5px)`
  }
  if (variant === 'hex') {
    return `radial-gradient(circle at 0 0, transparent 10px, ${line} 10.5px, transparent 11px)`
  }
  if (variant === 'circuit') {
    return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px), radial-gradient(circle, color-mix(in oklab, var(--nx-accent) 50%, transparent) 1.4px, transparent 1.6px)`
  }
  if (variant === 'blueprint') {
    return `linear-gradient(rgba(125, 211, 252, 0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(125, 211, 252, 0.22) 1px, transparent 1px)`
  }
  if (variant === 'notebook') {
    return `repeating-linear-gradient(transparent, transparent ${size - 1}px, color-mix(in oklab, #3b82f6 28%, transparent) ${size}px)`
  }
  if (variant === 'topo') {
    return `repeating-radial-gradient(circle at 30% 40%, transparent 0 12px, ${line} 12px 13px)`
  }
  if (variant === 'diagonal') {
    return `repeating-linear-gradient(135deg, ${line} 0 1px, transparent 1px ${size}px)`
  }
  if (variant === 'fade' || variant === 'perspective') {
    return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`
  }
  return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`
}

export function GridBackground(props: GridBackgroundProps) {
  if (isWowVariant('grid-background', props.variant)) {
    return (
      <WowSignature
        family="grid-background"
        variant={props.variant!}
        className={props.className}
        
      >
      {props.children}
    </WowSignature>
    )
  }
  return <GridBackgroundCore {...props} />
}
