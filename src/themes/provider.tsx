'use client'

import { themeToStyle, type MotionIntensity, type ThemeDefinition, type ThemeScheme } from '@/themes/contract.ts'
import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from 'react'

export type ThemeContextValue = {
  theme: ThemeDefinition
  scheme: ThemeScheme
  intensity: MotionIntensity
  density: number
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside ThemeProvider')
  return value
}

export function ThemeProvider({
  theme,
  scheme = 'light',
  intensity = 'rich',
  density = 1,
  className,
  children,
}: {
  theme: ThemeDefinition
  scheme?: ThemeScheme
  intensity?: MotionIntensity
  density?: number
  className?: string
  children: ReactNode
}) {
  const value = useMemo(() => ({ theme, scheme, intensity, density }), [theme, scheme, intensity, density])
  const style = { ...themeToStyle(theme, scheme), '--nx-density': String(density) } as CSSProperties
  return (
    <ThemeContext.Provider value={value}>
      <div data-nx-theme={theme.id} data-nx-scheme={scheme} className={className ? `nx-theme ${className}` : 'nx-theme'} style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
