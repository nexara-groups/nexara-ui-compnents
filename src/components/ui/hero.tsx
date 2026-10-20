'use client'

import { HeroLayouts } from '@/components/ui/hero-layouts.tsx'
import { asText, type NxTier } from '@/lib/library.ts'
import type { CSSProperties, ReactNode } from 'react'

export const HERO_VARIANTS = [
  'aurora',
  'brutal',
  'pastel',
  'editorial',
  'spotlight',
  'bento',
  'terminal',
  'cursor',
  'helix',
  'cinema',
  'atlas',
  'reveal',
] as const

export type HeroVariant = (typeof HERO_VARIANTS)[number]

export const HERO_TIER_META: Record<HeroVariant, { tier: NxTier; title: string; note: string }> = {
  aurora: { tier: 'basic', title: 'Aurora', note: 'Glass product shot in a teal-violet nebula.' },
  brutal: { tier: 'basic', title: 'Brutal', note: 'Neo-brutal yellow, thick rules, taped photos.' },
  pastel: { tier: 'basic', title: 'Pastel', note: 'Light SaaS desk with a real people-ops mock.' },
  editorial: { tier: 'basic', title: 'Editorial', note: 'Magazine cover: huge type over a still.' },
  spotlight: { tier: 'intermediate', title: 'Spotlight', note: 'Beam frame and three floating ops cards.' },
  bento: { tier: 'intermediate', title: 'Bento', note: 'Live mini-product mosaic as the first screen.' },
  terminal: { tier: 'intermediate', title: 'Terminal', note: 'AI coding desk: tree, diff, prompt.' },
  cursor: { tier: 'intermediate', title: 'Cursor', note: 'Named pointers on a collaborative field.' },
  helix: { tier: 'advanced', title: 'Helix', note: 'Contained iridescent WebGL object + still.' },
  cinema: { tier: 'advanced', title: 'Cinema', note: 'Letterbox, grain, ken-burns reel.' },
  atlas: { tier: 'advanced', title: 'Atlas', note: 'Night globe, arcs, live logistics feed.' },
  reveal: { tier: 'advanced', title: 'Reveal', note: 'Scroll-pinned device, screens as progress.' },
}

export type HeroStat = { label: string; value: string }
export type HeroLogo = string
export type HeroChatLine = { id: string; role: 'user' | 'agent'; text: string }
export type HeroEvent = { id: string; label: string; time: string }
export type HeroChapter = { id: string; label: string; time: string }

export interface HeroProps {
  variant?: HeroVariant
  title?: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3'
  eyebrow?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode | null
  kicker?: ReactNode
  logos?: HeroLogo[]
  stats?: HeroStat[]
  chapters?: HeroChapter[]
  events?: HeroEvent[]
  lines?: HeroChatLine[]
  prompt?: string
  scene?: ReactNode
  fallback?: ReactNode
  progress?: 'none' | 'scroll'
  className?: string
  style?: CSSProperties
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
}

/**
 * Hero
 * Twelve visual languages, each filled with product chrome by default.
 * Copy this file plus `hero-layouts.tsx`, `hero-scene.tsx`, `src/lib/hero-media.ts`,
 * `src/lib/utils.ts`, `src/lib/library.ts`, and `src/lib/kit.tsx`.
 * Helix WebGL lives in `hero-scene.tsx` and is never imported from layouts until asked.
 */
export function Hero({ variant = 'aurora', titleAs = 'h1', ...rest }: HeroProps) {
  return (
    <HeroLayouts
      variant={variant}
      Title={titleAs}
      title={rest.title}
      {...rest}
    />
  )
}

export function heroTitleText(title: ReactNode | undefined, fallback: string) {
  const text = asText(title)
  return text.length > 0 ? text : fallback
}
