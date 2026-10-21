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
  'rotate',
  'veil',
  'splice',
  'mesh',
  'glyph',
  'fan',
  'ribbon',
  'converse',
  'assemble',
  'iso',
  'league',
  'pop',
] as const

export type HeroVariant = (typeof HERO_VARIANTS)[number]

export const HERO_TIER_META: Record<HeroVariant, { tier: NxTier; title: string; note: string }> = {
  aurora: { tier: 'basic', title: 'Aurora', note: 'Glass product shot in a teal-violet nebula.' },
  brutal: { tier: 'basic', title: 'Brutal', note: 'Neo-brutal yellow, thick rules, taped photos.' },
  pastel: { tier: 'basic', title: 'Pastel', note: 'Light SaaS desk with a real people-ops mock.' },
  editorial: { tier: 'basic', title: 'Editorial', note: 'Magazine cover: huge type over a still.' },
  spotlight: { tier: 'intermediate', title: 'Spotlight', note: 'Night ops console with a live incident table.' },
  bento: { tier: 'intermediate', title: 'Bento', note: 'Live mini-product mosaic as the first screen.' },
  terminal: { tier: 'intermediate', title: 'Terminal', note: 'AI coding desk: tree, diff, prompt.' },
  cursor: { tier: 'intermediate', title: 'Cursor', note: 'Named pointers on a collaborative field.' },
  helix: { tier: 'advanced', title: 'Helix', note: 'Contained iridescent object plus a photographed still.' },
  cinema: { tier: 'advanced', title: 'Cinema', note: 'Letterbox, grain, ken-burns reel.' },
  atlas: { tier: 'advanced', title: 'Atlas', note: 'Night globe, arcs, live logistics feed.' },
  reveal: { tier: 'advanced', title: 'Reveal', note: 'Scroll-pinned device, screens as progress.' },
  rotate: { tier: 'advanced', title: 'Rotate', note: 'Healthcare diagnostic puck that turns with scroll.' },
  veil: { tier: 'advanced', title: 'Veil', note: 'Cinematic loop with masked display type.' },
  splice: { tier: 'intermediate', title: 'Splice', note: 'Interactive before/after renovation split.' },
  mesh: { tier: 'basic', title: 'Mesh', note: 'Morphing gradient mesh with product proof.' },
  glyph: { tier: 'advanced', title: 'Glyph', note: 'Kinetic type with photography inside the letters.' },
  fan: { tier: 'intermediate', title: 'Fan', note: 'Agency card stack that fans on load.' },
  ribbon: { tier: 'basic', title: 'Ribbon', note: 'Infinite marquee of studio work.' },
  converse: { tier: 'intermediate', title: 'Converse', note: 'Clinic intake chat that plays out.' },
  assemble: { tier: 'advanced', title: 'Assemble', note: 'Glass dashboard tiles assembling themselves.' },
  iso: { tier: 'intermediate', title: 'Iso', note: 'HVAC plant room as an isometric scene.' },
  league: { tier: 'basic', title: 'League', note: 'Sports association night track.' },
  pop: { tier: 'basic', title: 'Pop', note: 'Playful colourful academy courtyard.' },
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
 * Twenty-four visual languages, each filled with product chrome by default.
 * Copy this file plus `hero-layouts.tsx`, `hero-more.tsx`, `hero-scene.tsx`,
 * `src/lib/hero-media.ts`, `src/lib/hero-motion.tsx`, `src/lib/utils.ts`,
 * `src/lib/library.ts`, and `src/lib/kit.tsx`.
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
