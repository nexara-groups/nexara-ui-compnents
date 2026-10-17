'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'success',
  'error',
  'warning',
  'info',
  'loading',
  'action',
  'progress',
  'avatar',
  'compact',
  'stacked',
] as const

export type ToastVariant = (typeof VARIANTS)[number]

export interface ToastProps {
  variant?: ToastVariant
  title?: string
  description?: string
  className?: string
}

/**
 * Toast
 * Ten notification constructions. Copy this file plus `src/lib/utils.ts`.
 */
export function Toast({
  variant = 'info',
  title = 'Export ready',
  description = 'Harbor Hall pack is in your library.',
  className,
}: ToastProps) {
  return (
    <div
      data-nexara="toast"
      data-variant={variant}
      role="status"
      className={cn(
        'flex w-full max-w-sm items-start gap-3 rounded-2xl border border-nx-border bg-nx-card p-3 text-sm shadow-[var(--nx-shadow)]',
        variant === 'compact' && 'max-w-xs rounded-full py-2',
        variant === 'stacked' && 'relative',
        className,
      )}
    >
      {variant === 'stacked' ? <span aria-hidden="true" className="absolute inset-x-3 -bottom-1.5 h-3 rounded-b-2xl border border-nx-border bg-nx-elevated" /> : null}
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[11px]',
          variant === 'success' && 'bg-nx-ok text-white',
          variant === 'error' && 'bg-nx-danger text-white',
          variant === 'warning' && 'bg-nx-warn text-[#1c1408]',
          variant === 'info' && 'bg-nx-soft text-nx-accent',
          variant === 'loading' && 'bg-nx-soft text-nx-accent',
          variant === 'action' && 'bg-nx-fg text-nx-bg',
          variant === 'progress' && 'bg-nx-soft text-nx-accent',
          variant === 'avatar' && 'bg-[linear-gradient(135deg,#4c46e0,#22c5b0)] text-white',
          variant === 'compact' && 'hidden',
        )}
      >
        {mark(variant)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-nx-fg">{title}</p>
        {variant !== 'compact' ? <p className="mt-0.5 text-xs text-nx-muted">{description}</p> : null}
        {variant === 'progress' ? <span className="mt-2 block h-1 overflow-hidden rounded-full bg-nx-border"><span className="block h-1 w-2/3 bg-nx-accent" /></span> : null}
      </div>
      {variant === 'action' ? (
        <button type="button" className="text-xs font-medium text-nx-accent">
          Undo
        </button>
      ) : null}
    </div>
  )
}

function mark(variant: ToastVariant) {
  if (variant === 'avatar') return 'AK'
  if (variant === 'success') return '✓'
  if (variant === 'error') return '✕'
  if (variant === 'warning') return '!'
  if (variant === 'loading') return '…'
  if (variant === 'action') return '↩'
  if (variant === 'progress') return '↑'
  return 'i'
}
