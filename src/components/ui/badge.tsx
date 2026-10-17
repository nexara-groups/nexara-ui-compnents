'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'solid',
  'soft',
  'outline',
  'dot',
  'count',
  'status',
  'removable',
  'icon',
  'glow',
  'ribbon',
] as const

export type BadgeVariant = (typeof VARIANTS)[number]

export interface BadgeProps {
  variant?: BadgeVariant
  children?: ReactNode
  className?: string
}

/**
 * Badge
 * Ten status constructions. Copy this file plus `src/lib/utils.ts`.
 */
export function Badge({ variant = 'soft', children = 'Live', className }: BadgeProps) {
  if (variant === 'ribbon') {
    return (
      <span data-nexara="badge" data-variant="ribbon" className={cn('absolute top-3 -right-1 rotate-12 bg-nx-accent px-3 py-0.5 text-[10px] tracking-[0.14em] text-nx-accent-fg uppercase', className)}>
        {children}
      </span>
    )
  }
  return (
    <span
      data-nexara="badge"
      data-variant={variant}
      className={cn(
        'inline-flex items-center gap-1 text-[11px] font-medium',
        variant === 'solid' && 'rounded-full bg-nx-fg px-2 py-0.5 text-nx-bg',
        variant === 'soft' && 'rounded-full bg-nx-soft px-2 py-0.5 text-nx-accent',
        variant === 'outline' && 'rounded-full border border-nx-line px-2 py-0.5 text-nx-fg',
        variant === 'dot' && 'rounded-full bg-nx-card px-2 py-0.5 text-nx-fg ring-1 ring-nx-border',
        variant === 'count' && 'min-w-5 justify-center rounded-full bg-nx-danger px-1.5 py-0.5 text-white',
        variant === 'status' && 'rounded-full bg-nx-ok/15 px-2 py-0.5 text-nx-ok',
        variant === 'removable' && 'rounded-full bg-nx-elevated px-2 py-0.5 text-nx-fg',
        variant === 'icon' && 'rounded-md bg-nx-soft px-1.5 py-0.5 text-nx-accent',
        variant === 'glow' && 'rounded-full bg-nx-accent px-2 py-0.5 text-nx-accent-fg shadow-[0_0_16px_color-mix(in_oklab,var(--nx-accent)_50%,transparent)]',
        className,
      )}
    >
      {variant === 'dot' || variant === 'status' ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
      {variant === 'removable' ? <span aria-hidden="true">×</span> : null}
    </span>
  )
}
