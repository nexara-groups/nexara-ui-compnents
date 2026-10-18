'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { MediaFrame, faces, media } from '@/lib/media.tsx'
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
  'orbit-status',
  'shader-ring',
  'particle-presence',
  'holographic',
] as const

export type AvatarVariant = (typeof VARIANTS)[number]

export interface AvatarProps {
  variant?: AvatarVariant
  name?: string
  src?: string
  className?: string
}

const stack = faces.slice(0, 3)

/**
 * Avatar
 * Ten identity constructions. Photographic portraits by default; initials only when asked.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
function AvatarCore({ variant = 'image', name = 'Anitha Rao', src, className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
  const face = src ?? media.people.anitha

  if (variant === 'group') {
    return (
      <div
        data-nexara="avatar"
        data-variant="group"
        role="img"
        aria-label={stack.map((person) => person.name).join(', ')}
        className={cn('flex -space-x-2', className)}
      >
        {stack.map((person) => (
          <MediaFrame key={person.src} src={person.src} alt={person.name} grain={false} className="size-9 shrink-0 rounded-full border-2 border-nx-bg" />
        ))}
      </div>
    )
  }

  if (variant === 'mention') {
    return (
      <span data-nexara="avatar" data-variant="mention" className={cn('inline-flex h-7 items-center gap-1.5 rounded-full bg-nx-soft px-2', className)}>
        <MediaFrame src={face} alt="" grain={false} className="size-5 rounded-full" />
        <span className="text-[11px] text-nx-fg">{name}</span>
      </span>
    )
  }

  if (variant === 'icon' || variant === 'upload') {
    return (
      <span
        data-nexara="avatar"
        data-variant={variant}
        className={cn('relative inline-flex size-10 items-center justify-center rounded-xl bg-nx-soft text-nx-accent', className)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="6" r="2.4" fill="currentColor" />
          <path d="M3 13c1.2-2 2.8-3 5-3s3.8 1 5 3" fill="none" stroke="currentColor" />
        </svg>
      </span>
    )
  }

  if (variant === 'initials') {
    return (
      <span
        data-nexara="avatar"
        data-variant="initials"
        className={cn('inline-flex size-10 items-center justify-center rounded-full bg-nx-soft text-xs font-medium text-nx-accent', className)}
      >
        {initials}
      </span>
    )
  }

  return (
    <span
      data-nexara="avatar"
      data-variant={variant}
      className={cn(
        'relative inline-flex overflow-hidden',
        variant === 'square' ? 'size-10 rounded-xl' : 'size-10 rounded-full',
        variant === 'story' && 'ring-2 ring-nx-accent ring-offset-2 ring-offset-nx-bg',
        variant === 'ring' && 'ring-2 ring-nx-line ring-offset-2 ring-offset-nx-bg',
        className,
      )}
    >
      <MediaFrame src={face} alt={name} grain={false} className="size-full" />
      {variant === 'status' ? <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-nx-ok ring-2 ring-nx-bg" /> : null}
    </span>
  )
}

export function Avatar(props: AvatarProps) {
  if (isWowVariant('avatar', props.variant)) {
    return (
      <WowSignature
        family="avatar"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <AvatarCore {...props} />
}
