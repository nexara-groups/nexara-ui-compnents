'use client'

import { useId, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const tags = { p: 'p', h1: 'h1', h2: 'h2', h3: 'h3', span: 'span', div: 'div' } as const

const VARIANTS = [
  'gradient',
  'stroke',
  'marker',
  'glitch',
  'neon',
  'engraved',
  'ribbon',
  'stencil',
  'boxed',
  'script',
  'seal',
  'halftone',
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
  duration?: number
  angle?: number
  style?: CSSProperties
}

/**
 * GradientText
 * Twelve lettering models: gradient fill, stroke, marker, glitch layers,
 * neon tube, engraving, ribbon, stencil, boxed glyphs, script, seal, halftone.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function GradientText({
  children,
  className,
  as = 'span',
  variant = 'gradient',
  from = '#ff6a3d',
  via = '#f5c16c',
  to = '#8b7cff',
  angle = 105,
  style,
}: GradientTextProps) {
  const Tag = tags[as]
  const label = typeof children === 'string' ? children : 'Nexara'
  const sealId = useId().replace(/:/g, '')
  const shared = cn('inline-block', className)

  if (variant === 'stroke') {
    return (
      <Tag data-nexara="gradient-text" data-variant="stroke" className={cn(shared, 'text-transparent')} style={{ WebkitTextStroke: `1.5px ${via}`, ...style }}>
        {children}
      </Tag>
    )
  }
  if (variant === 'marker') {
    return (
      <Tag data-nexara="gradient-text" data-variant="marker" className={cn(shared, 'text-[#f6f3ec]')} style={style}>
        <span className="box-decoration-clone px-1" style={{ backgroundImage: `linear-gradient(${from}, ${from})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% 0.38em', backgroundPosition: '0 85%' }}>
          {children}
        </span>
      </Tag>
    )
  }
  if (variant === 'glitch') {
    return (
      <Tag data-nexara="gradient-text" data-variant="glitch" className={cn(shared, 'relative text-[#f6f3ec]')} style={style}>
        <span aria-hidden="true" className="absolute top-0 left-[2px] text-[#ff6a3d] opacity-80">{children}</span>
        <span aria-hidden="true" className="absolute top-0 -left-[2px] text-[#3ddec4] opacity-80">{children}</span>
        <span className="relative">{children}</span>
      </Tag>
    )
  }
  if (variant === 'neon') {
    return (
      <Tag data-nexara="gradient-text" data-variant="neon" className={cn(shared, 'text-[#d9fff6]')} style={{ textShadow: `0 0 8px ${to}, 0 0 22px ${via}`, ...style }}>
        {children}
      </Tag>
    )
  }
  if (variant === 'engraved') {
    return (
      <Tag data-nexara="gradient-text" data-variant="engraved" className={cn(shared, 'text-[#2a2833]')} style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.65)', ...style }}>
        {children}
      </Tag>
    )
  }
  if (variant === 'ribbon') {
    return (
      <Tag data-nexara="gradient-text" data-variant="ribbon" className={cn(shared, 'bg-[#ff6a3d] px-8 py-1 text-[#1a100c] [clip-path:polygon(8%_0,92%_0,100%_50%,92%_100%,8%_100%,0_50%)]')} style={style}>
        {children}
      </Tag>
    )
  }
  if (variant === 'stencil') {
    return (
      <Tag data-nexara="gradient-text" data-variant="stencil" className={cn(shared, 'inline-grid text-[#f6f3ec]')} style={style}>
        <span aria-hidden="true" className="col-start-1 row-start-1 [clip-path:inset(0_0_58%_0)]">{children}</span>
        <span aria-hidden="true" className="col-start-1 row-start-1 [clip-path:inset(58%_0_0_0)]">{children}</span>
        <span className="sr-only">{label}</span>
      </Tag>
    )
  }
  if (variant === 'boxed') {
    return (
      <Tag data-nexara="gradient-text" data-variant="boxed" className={cn(shared, 'text-[#f6f3ec]')} style={style}>
        <span className="sr-only">{label}</span>
        <span aria-hidden="true" className="inline-flex gap-1">
          {Array.from(label).map((char, index) => (
            <span key={`${char}-${index}`} className="inline-flex h-[1.15em] min-w-[0.9em] items-center justify-center border border-current">
              {char === ' ' ? '' : char}
            </span>
          ))}
        </span>
      </Tag>
    )
  }
  if (variant === 'script') {
    return (
      <Tag data-nexara="gradient-text" data-variant="script" className={cn(shared, 'font-serif text-[#f5c16c] italic')} style={style}>
        {children}
        <span aria-hidden="true" className="mt-1 block h-px w-2/3 bg-[#f5c16c]" />
      </Tag>
    )
  }
  if (variant === 'seal') {
    const ring = `${label} · ${label} · ${label} · `
    return (
      <Tag data-nexara="gradient-text" data-variant="seal" className={cn(shared, 'relative inline-flex size-40 items-center justify-center')} style={style}>
        <svg viewBox="0 0 120 120" className="size-40" aria-hidden="true">
          <defs>
            <path id={sealId} d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" />
          </defs>
          <circle cx="60" cy="60" r="36" fill="none" stroke="#f5c16c" strokeWidth="1" />
          <text fill="#f5c16c" fontSize="9" letterSpacing="2">
            <textPath href={`#${sealId}`}>{ring}</textPath>
          </text>
          <text x="60" y="66" textAnchor="middle" fill="#f5c16c" fontSize="18" fontFamily="serif">NX</text>
        </svg>
        <span className="sr-only">{label}</span>
      </Tag>
    )
  }
  if (variant === 'halftone') {
    return (
      <Tag data-nexara="gradient-text" data-variant="halftone" className={cn(shared, 'relative text-[#f6f3ec]')} style={style}>
        <span
          aria-hidden="true"
          className="absolute inset-0 text-transparent"
          style={{
            WebkitTextStroke: '0',
            backgroundImage: 'radial-gradient(#ff6a3d 1px, transparent 1.2px)',
            backgroundSize: '4px 4px',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          {children}
        </span>
        <span className="text-transparent" style={{ WebkitTextStroke: '1px #f6f3ec' }}>{children}</span>
      </Tag>
    )
  }
  return (
    <Tag
      data-nexara="gradient-text"
      data-variant="gradient"
      className={cn(shared, 'bg-clip-text text-transparent')}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${from}, ${via}, ${to})`,
        WebkitTextFillColor: 'transparent',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
