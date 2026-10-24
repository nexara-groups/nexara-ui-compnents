'use client'

/** Shared token contract. Every theme fills the same fields so a foreign component can retint. */

export const THEME_IDS = ['fieldnote', 'programme', 'triplicate', 'quarry'] as const
export type ThemeId = (typeof THEME_IDS)[number]

export const THEME_SLOTS = [
  'navbar',
  'hero',
  'features',
  'stats',
  'testimonial',
  'pricing',
  'cta',
  'footer',
] as const
export type ThemeSlot = (typeof THEME_SLOTS)[number]

export type ThemeScheme = 'light' | 'dark'

export type ThemeColors = {
  bg: string
  fg: string
  muted: string
  accent: string
  accentFg: string
  surface: string
  line: string
  ring: string
  /** Signature mark: tape, stripe, or patina. Never the only status signal. */
  mark: string
  markFg: string
  /** Second plate. Text must not sit on this fill. */
  plate: string
  /** Confirmation ply (Triplicate pink). Other themes set it to surface. */
  ply: string
  /** Clip, staple, or other hardware. */
  hardware: string
}

export type ThemeMotion = {
  id: string
  ease: { enter: string; exit: string; hover: string; scroll: string }
  duration: { instant: number; fast: number; base: number; slow: number; cinematic: number }
}

export type ThemeType = {
  display: string
  body: string
  mono: string
}

export type ThemeDefinition = {
  id: string
  name: string
  mood: string
  verticals: string[]
  colors: Record<ThemeScheme, ThemeColors>
  type: ThemeType
  radius: string
  measure: string
  shadow: string
  texture: string
  icon: 'technical' | 'stencil' | 'ballpoint'
  motion: ThemeMotion
}

export type ThemeSelection = Record<ThemeSlot, ThemeId>

export type ThemeExport = {
  version: 1
  name: string
  scheme: ThemeScheme
  tokens: ThemeColors
  motion: ThemeMotion
  type: ThemeType
  radius: string
  components: { slot: ThemeSlot; theme: ThemeId; component: ThemeSlot; variant: 'section' }[]
}

export function themeToStyle(theme: ThemeDefinition, scheme: ThemeScheme): Record<string, string> {
  const c = theme.colors[scheme]
  const d = theme.motion.duration
  return {
    '--nx-bg': c.bg,
    '--nx-fg': c.fg,
    '--nx-muted': c.muted,
    '--nx-accent': c.accent,
    '--nx-accent-fg': c.accentFg,
    '--nx-surface': c.surface,
    '--nx-line': c.line,
    '--nx-ring': c.ring,
    '--nx-mark': c.mark,
    '--nx-mark-fg': c.markFg,
    '--nx-plate': c.plate,
    '--nx-ply': c.ply,
    '--nx-hardware': c.hardware,
    '--nx-radius': theme.radius,
    '--nx-measure': theme.measure,
    '--nx-shadow': theme.shadow,
    '--nx-font-display': theme.type.display,
    '--nx-font-body': theme.type.body,
    '--nx-font-mono': theme.type.mono,
    '--nx-ease': theme.motion.ease.enter,
    '--nx-ease-exit': theme.motion.ease.exit,
    '--nx-ease-hover': theme.motion.ease.hover,
    '--nx-dur-instant': `${d.instant}ms`,
    '--nx-dur-fast': `${d.fast}ms`,
    '--nx-dur-base': `${d.base}ms`,
    '--nx-dur-slow': `${d.slow}ms`,
    '--nx-dur-cine': `${d.cinematic}ms`,
  }
}

export function exportTheme(
  name: string,
  theme: ThemeDefinition,
  scheme: ThemeScheme,
  selection: ThemeSelection,
): ThemeExport {
  return {
    version: 1,
    name,
    scheme,
    tokens: theme.colors[scheme],
    motion: theme.motion,
    type: theme.type,
    radius: theme.radius,
    components: THEME_SLOTS.map((slot) => ({
      slot,
      theme: selection[slot],
      component: slot,
      variant: 'section' as const,
    })),
  }
}
