'use client'

import { NavbarLayouts } from '@/components/ui/navbar-layouts.tsx'
import type { NxTier } from '@/lib/library.ts'
import type { ReactNode } from 'react'

export const NAVBAR_VARIANTS = [
  'pill',
  'banner',
  'tabs',
  'clinic',
  'league',
  'pop',
  'mega',
  'command',
  'follow',
  'crumb',
  'kiln',
  'split',
  'island',
  'curtain',
  'dock',
  'rail',
  'folio',
  'portal',
] as const

export type NavbarVariant = (typeof NAVBAR_VARIANTS)[number]

export const NAVBAR_TIER_META: Record<NavbarVariant, { tier: NxTier; title: string; note: string }> = {
  pill: { tier: 'basic', title: 'Pill', note: 'Frosted floating capsule. Magnetic links.' },
  banner: { tier: 'basic', title: 'Banner', note: 'Announcement strip the bar absorbs on scroll.' },
  tabs: { tier: 'basic', title: 'Tabs', note: 'Liquid physics indicator on a mesh.' },
  clinic: { tier: 'basic', title: 'Clinic', note: 'Named doctor, live status, hold a visit.' },
  league: { tier: 'basic', title: 'League', note: 'Night-meet scoreboard strip.' },
  pop: { tier: 'basic', title: 'Pop', note: 'Academy chips and a spring CTA.' },
  mega: { tier: 'intermediate', title: 'Mega', note: 'Live campaign previews in the panel.' },
  command: { tier: 'intermediate', title: 'Command', note: 'The field is the navigation.' },
  follow: { tier: 'intermediate', title: 'Follow', note: 'Cursor spotlight across the index.' },
  crumb: { tier: 'intermediate', title: 'Crumb', note: 'Docs path and a reading hairline.' },
  kiln: { tier: 'intermediate', title: 'Kiln', note: 'Plant selector and live supply air.' },
  split: { tier: 'intermediate', title: 'Split', note: 'Bar that splits on scroll.' },
  island: { tier: 'advanced', title: 'Island', note: 'Notch console that morphs job.' },
  curtain: { tier: 'advanced', title: 'Curtain', note: 'Viewport of type. Focus trap.' },
  dock: { tier: 'advanced', title: 'Dock', note: 'Magnifying tool rack on a sill.' },
  rail: { tier: 'advanced', title: 'Rail', note: 'Vertical index with a live pip.' },
  folio: { tier: 'advanced', title: 'Folio', note: 'Numbered work index.' },
  portal: { tier: 'advanced', title: 'Portal', note: 'Agency OS: workspace, agents, command.' },
}

export type NavItem = {
  id: string
  label: ReactNode
  href?: string
  current?: boolean
  description?: ReactNode
  children?: NavItem[]
  preview?: string
}

export type NavColumn = { id: string; title: ReactNode; items: NavItem[] }
export type NavSection = { id: string; label: ReactNode; items: NavItem[] }

export interface NavbarProps {
  variant?: NavbarVariant
  logo?: ReactNode
  items?: NavItem[]
  columns?: NavColumn[]
  sections?: NavSection[]
  action?: ReactNode
  results?: ReactNode
  onQuery?: (value: string) => void
  query?: string
  defaultOpen?: boolean
  scene?: boolean
  className?: string
}

/**
 * Navbar
 * Eighteen visual languages. Original. Not a Helio recolor and not a 21st.dev pill port.
 * Copy this file plus navbar-layouts.tsx, navbar-more.tsx, src/lib/navbar-motion.tsx,
 * src/lib/utils.ts, src/lib/library.ts, src/lib/kit.tsx, and src/lib/theme.tsx.
 */
export function Navbar({ variant = 'pill', ...rest }: NavbarProps) {
  return <NavbarLayouts variant={variant} {...rest} />
}
