'use client'

import { cn } from '@/lib/utils.ts'
import type { ReactNode } from 'react'

export const NX_PRESETS = ['heliograph', 'paper', 'ink', 'clinical'] as const
export type NxPreset = (typeof NX_PRESETS)[number]
export type NxScheme = 'dark' | 'light'

export const NX_PRESET_META: Record<NxPreset, { title: string; note: string }> = {
  heliograph: { title: 'Heliograph', note: 'Night desk. Ember on void.' },
  paper: { title: 'Paper', note: 'Ivory plate. Ink type.' },
  ink: { title: 'Ink', note: 'Cool dark. Ice accent.' },
  clinical: { title: 'Clinical', note: 'Daylight field. Teal mark.' },
}

export function NxTheme({
  preset = 'heliograph',
  scheme,
  className,
  children,
}: {
  preset?: NxPreset
  scheme?: NxScheme
  className?: string
  children: ReactNode
}) {
  return (
    <div data-nx-theme={preset} data-nx-scheme={scheme} className={cn('nx-scope', className)}>
      {children}
    </div>
  )
}
