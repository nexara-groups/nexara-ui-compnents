import type { ReactNode } from 'react'

export type WowProps = {
  family: string
  variant: string
  className?: string
  children?: ReactNode
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  eyebrow?: ReactNode
}

export const WOW_VARIANTS = {
  'draggable-card': ['physics-deck', 'magnetic-stack', 'hologram', 'particle-toss'],
  'spotlight-card': ['glare-tilt', 'shader-well', 'orbit-badge', 'scramble-stat'],
  'flip-card': ['morph-face', 'liquid-flip', 'hologram', 'path-reveal'],
  'bento-grid': ['depth-mosaic', 'shader-tile', 'orbit-tile', 'ticker-tile'],
  button: ['liquid', 'ink-path', 'glare', 'burst', 'scramble'],
  'magnetic-button': ['gravity-well', 'comet-trail', 'orbit-pull', 'shatter'],
  'aurora-background': ['shader-mesh', 'particle-field', 'liquid-glass', 'globe-field'],
  'grid-background': ['perspective-fly', 'circuit-draw', 'topo-pulse', 'hex-orbit'],
  'gradient-text': ['variable-morph', 'scramble', 'path-write', 'split-mask'],
  typewriter: ['odometer', 'scramble-line', 'matrix-rain', 'flap-3d'],
  'text-reveal': ['line-mask', 'letter-physics', 'kinetic-stack', 'svg-draw'],
  'floating-navbar': ['magnetic-pill', 'morph-dock', 'orbit-nav', 'glass-liquid'],
  modal: ['shared-morph', 'shader-veil', 'liquid-sheet', 'particle-confirm'],
  hero: ['pin-scroll', 'shader-void', 'scramble-mast', 'globe-orbit', 'morph-stage'],
  marquee: ['cylinder-3d', 'logo-orbit', 'velocity-scroll', 'grain-tape'],
  input: ['liquid-focus', 'magnetic-caret', 'path-underline', 'otp-flip'],
  tabs: ['layout-morph', 'liquid-ink', 'orbit-pills', 'scramble-label'],
  accordion: ['height-morph', 'path-plus', 'kinetic-faq', 'shader-row'],
  tooltip: ['follow-glare', 'particle-hint', 'scramble-tip', 'magnetic-tag'],
  toast: ['spring-stack', 'path-check', 'liquid-slide', 'odometer-count'],
  avatar: ['orbit-status', 'shader-ring', 'particle-presence', 'holographic'],
  badge: ['beam-orbit', 'scramble-live', 'liquid-pill', 'path-ribbon'],
  pricing: ['tilt-glare', 'odometer-price', 'morph-toggle', 'shader-featured'],
  testimonials: ['wall-parallax', 'video-shader', 'orbit-quotes', 'scramble-pull'],
  footer: ['giant-marquee', 'grain-night', 'orbit-marks', 'path-sitemap'],
  stats: ['odometer', 'orbit-ring', 'particle-pulse', 'glare-mosaic'],
  countdown: ['flip-3d', 'shader-rings', 'analog-orbit', 'launch-scrub'],
  leaderboard: ['heat-race', 'podium-spring', 'live-odometer', 'particle-rank'],
  'case-study': ['scroll-film', 'shared-morph', 'glare-stack', 'path-index'],
  services: ['tilt-doors', 'orbit-crews', 'shader-cards', 'path-checklist'],
  process: ['scrub-timeline', 'pin-steps', 'path-rail', 'orbit-rhythm'],
  team: ['glare-portraits', 'orbit-crew', 'holographic', 'particle-grid'],
  contact: ['map-shader', 'liquid-form', 'magnetic-branches', 'path-directions'],
  'cta-band': ['liquid-wash', 'scramble-cta', 'particle-close', 'glare-band'],
  chapters: ['pin-story', 'scrub-essay', 'parallax-index', 'path-folio'],
  news: ['velocity-tape', 'flip-headlines', 'shader-magazine', 'orbit-digest'],
  'logo-cloud': ['orbit-3d', 'magnetic-marks', 'glare-lockups', 'particle-press'],
  'app-shell': ['morph-sidebar', 'command-orbit', 'shader-desk', 'liquid-rail'],
  kpi: ['odometer-spark', 'ring-draw', 'particle-live', 'glare-delta'],
  'data-table': ['row-stagger', 'morph-cards', 'heat-cells', 'odometer-cells'],
  'kanban-board': ['spring-toss', 'glare-cards', 'orbit-wip', 'particle-lane'],
  'chart-block': ['path-draw', 'particle-area', 'scrub-bars', 'shader-donut'],
  activity: ['stagger-feed', 'path-rail', 'live-odometer', 'liquid-chat'],
  'command-palette': ['scramble-search', 'morph-results', 'particle-jump', 'glare-row'],
  'settings-panel': ['morph-sections', 'liquid-toggle', 'path-security', 'glare-profile'],
  kit: ['shader-clinic', 'globe-agency', 'pin-sports', 'liquid-portal', 'scramble-academy'],
} as const

export type WowFamily = keyof typeof WOW_VARIANTS

export function isWowVariant(family: string, id: string | undefined): boolean {
  if (!id) return false
  const list = WOW_VARIANTS[family as WowFamily]
  return Boolean(list && (list as readonly string[]).includes(id))
}
