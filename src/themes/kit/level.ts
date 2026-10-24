'use client'

import { usePrefersReducedMotion } from '@/lib/utils.ts'
import type { MotionIntensity, MotionPersonality } from '@/themes/contract.ts'
import { useTheme } from '@/themes/provider.tsx'

export function useLevel(): MotionIntensity {
  const { intensity } = useTheme()
  const reduced = usePrefersReducedMotion()
  if (reduced || intensity === 'off') return 'off'
  return intensity
}

export function usePersonality(): MotionPersonality {
  const { theme } = useTheme()
  return theme.personality ?? 'technical'
}
