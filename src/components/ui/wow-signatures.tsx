'use client'

export { WOW_VARIANTS, isWowVariant, type WowFamily, type WowProps } from '@/lib/wow-variants.ts'
import { WowApp } from './wow-app.tsx'
import { WowBlocks } from './wow-blocks.tsx'
import { WowCore } from './wow-core.tsx'
import type { WowProps } from '@/lib/wow-variants.ts'

export function WowSignature(props: WowProps) {
  const family = props.family
  if (
    family === 'hero' ||
    family === 'button' ||
    family === 'magnetic-button' ||
    family === 'draggable-card' ||
    family === 'spotlight-card' ||
    family === 'flip-card' ||
    family === 'bento-grid' ||
    family === 'aurora-background' ||
    family === 'grid-background' ||
    family === 'gradient-text' ||
    family === 'typewriter' ||
    family === 'text-reveal' ||
    family === 'floating-navbar' ||
    family === 'modal' ||
    family === 'marquee' ||
    family === 'input'
  ) {
    return <WowCore {...props} />
  }
  if (
    family === 'app-shell' ||
    family === 'kpi' ||
    family === 'data-table' ||
    family === 'kanban-board' ||
    family === 'chart-block' ||
    family === 'activity' ||
    family === 'command-palette' ||
    family === 'settings-panel' ||
    family === 'kit'
  ) {
    return <WowApp {...props} />
  }
  return <WowBlocks {...props} />
}
