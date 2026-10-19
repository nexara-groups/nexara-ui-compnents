'use client'

import { isWowVariant } from '@/lib/wow-variants.ts'
import { WowSignature } from './wow-lazy.tsx'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'pulse-halo',
  'orbit-beads',
  'shader-fog',
  'path-infinity',
  'odometer-pct',
  'scramble-hold',
  'liquid-drop',
  'particle-drift',
  'flap-wait',
  'analog-sweep',
  'barcode-scan',
  'prism-bar',
] as const

export type LoaderVariant = (typeof VARIANTS)[number]

export interface LoaderProps {
  variant?: LoaderVariant
  className?: string
  label?: string
}

/**
 * Loader
 * Twelve original waiting constructions. Copy this file plus wow helpers and `src/lib/utils.ts`.
 */
function LoaderCore({ variant = 'pulse-halo', className, label = 'Loading Harbor' }: LoaderProps) {
  return (
    <div
      data-nexara="loader"
      data-variant={variant}
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn('flex min-h-32 items-center justify-center rounded-[1.6rem] border border-nx-border bg-nx-card', className)}
    >
      <span className="size-8 animate-pulse rounded-full bg-nx-accent/40" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function Loader(props: LoaderProps) {
  if (isWowVariant('loader', props.variant ?? 'pulse-halo')) {
    return <WowSignature family="loader" variant={props.variant ?? 'pulse-halo'} className={props.className} title={props.label} />
  }
  return <LoaderCore {...props} />
}
