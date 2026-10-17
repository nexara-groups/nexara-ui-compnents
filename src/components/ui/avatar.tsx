'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'image',
  'initials',
  'status',
  'group',
  'square',
  'ring',
  'upload',
  'icon',
  'story',
  'mention',
] as const

export type AvatarVariant = (typeof VARIANTS)[number]

export interface AvatarProps {
  variant?: AvatarVariant
  name?: string
  className?: string
}

/**
 * Avatar
 * Ten identity constructions. Copy this file plus `src/lib/utils.ts`.
 */
export function Avatar({ variant = 'initials', name = 'Ada Klein', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  if (variant === 'group') {
    return (
      <div data-nexara="avatar" data-variant="group" className={cn('flex -space-x-2', className)}>
        {['AK', 'JR', 'MC'].map((mark) => (
          <span key={mark} className="inline-flex size-9 items-center justify-center rounded-full border-2 border-nx-bg bg-nx-soft text-[11px] font-medium text-nx-accent">
            {mark}
          </span>
        ))}
      </div>
    )
  }

  return (
    <span
      data-nexara="avatar"
      data-variant={variant}
      className={cn(
        'relative inline-flex items-center justify-center bg-nx-soft text-xs font-medium text-nx-accent',
        variant === 'square' || variant === 'upload' ? 'rounded-xl' : 'rounded-full',
        variant === 'story' && 'ring-2 ring-nx-accent ring-offset-2 ring-offset-nx-bg',
        variant === 'ring' && 'ring-2 ring-nx-line ring-offset-2 ring-offset-nx-bg',
        variant === 'mention' ? 'h-7 rounded-full px-2' : 'size-10',
        variant === 'image' && 'bg-[linear-gradient(135deg,#4c46e0,#22c5b0)] text-white',
        className,
      )}
    >
      {variant === 'icon' || variant === 'upload' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="6" r="2.4" fill="currentColor" />
          <path d="M3 13c1.2-2 2.8-3 5-3s3.8 1 5 3" fill="none" stroke="currentColor" />
        </svg>
      ) : (
        initials
      )}
      {variant === 'status' ? <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-nx-ok ring-2 ring-nx-bg" /> : null}
      {variant === 'mention' ? <span className="ml-1 text-[11px] text-nx-fg">{name}</span> : null}
    </span>
  )
}
