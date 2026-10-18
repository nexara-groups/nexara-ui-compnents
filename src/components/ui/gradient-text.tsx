'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react'
import { LoopPause } from '@/lib/media.tsx'
import { cn, useKeyframes, useLoopControl } from '@/lib/utils.ts'

const KEYFRAMES = `
@keyframes nexara-text-pan {
  to { background-position: 200% center; }
}
@keyframes nexara-kinetic {
  0%, 100% { letter-spacing: -0.04em; }
  50% { letter-spacing: 0.06em; }
}
`

const VARIANTS = [
  'gradient',
  'shimmer',
  'stroke',
  'mask',
  'aurora',
  'italic',
  'highlight',
  'underline',
  'boxed',
  'kinetic',
  'glow',
  'fade',
  'variable-morph',
  'scramble',
  'path-write',
  'split-mask',
] as const

export type GradientTextVariant = (typeof VARIANTS)[number]

export interface GradientTextProps {
  children: ReactNode
  className?: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
  variant?: GradientTextVariant
  from?: string
  via?: string
  to?: string
  animate?: boolean
  duration?: number
}

/**
 * GradientText
 * Twelve lettering models. Copy this file plus `src/lib/utils.ts`.
 */
function GradientTextCore({
  children,
  className,
  as = 'span',
  variant = 'gradient',
  from = '#4c46e0',
  via = '#8b87ff',
  to = '#22c5b0',
  animate = true,
  duration = 8,
}: GradientTextProps) {
  const loop = useLoopControl(animate)
  useKeyframes('nexara-gradient-text', KEYFRAMES)
  const Tag = as as ElementType
  const moving = animate && loop.playing && (variant === 'gradient' || variant === 'shimmer' || variant === 'aurora')
  const kinetic = animate && loop.playing && variant === 'kinetic'
  const fill = `linear-gradient(90deg, ${from}, ${via}, ${to}, ${from})`

  if (variant === 'stroke') {
    return (
      <Tag className={cn('font-serif text-transparent', className)} style={{ WebkitTextStroke: '1.4px currentColor', color: 'transparent' }}>
        <span className="text-nx-fg" style={{ WebkitTextStroke: '1.4px var(--nx-fg)', color: 'transparent' }}>
          {children}
        </span>
      </Tag>
    )
  }
  if (variant === 'mask') {
    return (
      <Tag className={cn('relative inline-block font-serif', className)}>
        <span className="text-nx-muted">{children}</span>
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-nx-fg"
          style={{ WebkitMaskImage: `linear-gradient(90deg, transparent 20%, #000 45%, #000 55%, transparent 80%)` }}
        >
          {children}
        </span>
      </Tag>
    )
  }
  if (variant === 'italic') {
    return (
      <Tag className={cn('font-serif italic tracking-tight text-nx-fg', className)}>{children}</Tag>
    )
  }
  if (variant === 'highlight') {
    return (
      <Tag className={cn('font-serif', className)}>
        <span className="bg-[linear-gradient(transparent_62%,color-mix(in_oklab,var(--nx-accent)_35%,transparent)_62%)] px-1">
          {children}
        </span>
      </Tag>
    )
  }
  if (variant === 'underline') {
    return (
      <Tag className={cn('font-serif text-nx-fg decoration-from-font underline decoration-nx-accent underline-offset-[0.18em]', className)}>
        {children}
      </Tag>
    )
  }
  if (variant === 'boxed') {
    const letters = String(children).split('')
    return (
      <Tag className={cn('inline-flex gap-1 font-mono text-[0.7em] tracking-[0.18em] uppercase', className)}>
        {letters.map((letter, index) => (
          <span key={`${letter}-${index}`} className="inline-flex min-w-[1.15em] items-center justify-center rounded-md border border-nx-border bg-nx-card px-1 py-1">
            {letter === ' ' ? '·' : letter}
          </span>
        ))}
      </Tag>
    )
  }
  if (variant === 'kinetic') {
    return (
      <span className="inline-flex items-center gap-2">
        <Tag
          className={cn(
            'inline-block font-serif tracking-tight text-nx-fg',
            kinetic ? 'motion-safe:animate-[nexara-kinetic_3.2s_ease-in-out_infinite]' : '',
            className,
          )}
        >
          {children}
        </Tag>
        <LoopPause playing={loop.playing} onToggle={loop.toggle} />
      </span>
    )
  }
  if (variant === 'glow') {
    return (
      <Tag className={cn('font-serif text-nx-fg', className)} style={{ textShadow: '0 0 24px color-mix(in oklab, var(--nx-accent) 55%, transparent)' }}>
        {children}
      </Tag>
    )
  }
  if (variant === 'fade') {
    return (
      <Tag
        className={cn('bg-clip-text font-serif text-transparent', className)}
        style={{ backgroundImage: 'linear-gradient(90deg, var(--nx-fg) 0%, var(--nx-fg) 40%, transparent 100%)' }}
      >
        {children}
      </Tag>
    )
  }

  const extra =
    variant === 'shimmer'
      ? fill
      : variant === 'aurora'
        ? `linear-gradient(120deg, ${from}, ${via}, ${to}, ${via}, ${from})`
        : fill

  return (
    <span className="inline-flex items-center gap-2">
      <Tag
        className={cn('bg-clip-text font-serif text-transparent', className)}
        style={{
          backgroundImage: extra,
          backgroundSize: moving ? '200% 100%' : '100% 100%',
          animation: moving ? `nexara-text-pan ${duration}s linear infinite` : undefined,
        } as ComponentPropsWithoutRef<'span'>['style']}
      >
        {children}
      </Tag>
      <LoopPause playing={loop.playing} onToggle={loop.toggle} />
    </span>
  )
}

export function GradientText(props: GradientTextProps) {
  if (isWowVariant('gradient-text', props.variant)) {
    return (
      <WowSignature
        family="gradient-text"
        variant={props.variant!}
        className={props.className}
        
      >
      {props.children}
    </WowSignature>
    )
  }
  return <GradientTextCore {...props} />
}
