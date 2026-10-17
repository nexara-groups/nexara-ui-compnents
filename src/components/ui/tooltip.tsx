'use client'

import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'default',
  'inverse',
  'rich',
  'kbd',
  'success',
  'warning',
  'follow',
  'plain',
  'avatar',
  'metric',
] as const

export type TooltipVariant = (typeof VARIANTS)[number]

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  variant?: TooltipVariant
  className?: string
  open?: boolean
  defaultOpen?: boolean
}

/**
 * Tooltip
 * Ten hint constructions. Copy this file plus `src/lib/utils.ts`.
 */
export function Tooltip({ content, children, variant = 'default', className, open: openProp, defaultOpen = false }: TooltipProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolled
  const id = useId()
  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolled(next)
  }

  return (
    <span
      className="relative inline-flex"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => {
        if (!defaultOpen) setOpen(false)
      }}
      onFocus={() => setOpen(true)}
      onBlur={() => {
        if (!defaultOpen) setOpen(false)
      }}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex">
        {children}
      </span>
      {open ? (
        <span
          id={id}
          role="tooltip"
          data-nexara="tooltip"
          data-variant={variant}
          className={cn(
            'absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 text-xs',
            variant === 'default' && 'rounded-md bg-nx-fg px-2 py-1 text-nx-bg',
            variant === 'inverse' && 'rounded-md bg-nx-card px-2 py-1 text-nx-fg ring-1 ring-nx-border',
            variant === 'rich' && 'w-52 rounded-xl bg-nx-card p-3 text-left text-nx-fg shadow-[var(--nx-shadow)] ring-1 ring-nx-border',
            variant === 'kbd' && 'rounded-md bg-[#111113] px-2 py-1 font-mono text-white',
            variant === 'success' && 'rounded-md bg-nx-ok px-2 py-1 text-white',
            variant === 'warning' && 'rounded-md bg-nx-warn px-2 py-1 text-[#1c1408]',
            variant === 'follow' && 'rounded-full bg-nx-fg px-3 py-1 text-nx-bg',
            variant === 'plain' && 'text-nx-muted',
            variant === 'avatar' && 'flex items-center gap-2 rounded-full bg-nx-card py-1 pr-3 pl-1 text-nx-fg shadow-[var(--nx-shadow)] ring-1 ring-nx-border',
            variant === 'metric' && 'rounded-lg bg-nx-fg px-3 py-2 text-left text-nx-bg',
            className,
          )}
        >
          {variant === 'avatar' ? <span className="inline-flex size-6 items-center justify-center rounded-full bg-nx-soft text-[10px] text-nx-accent">AK</span> : null}
          {content}
        </span>
      ) : null}
    </span>
  )
}
