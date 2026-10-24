'use client'

import { AnimationLibrary } from '@/themes/animations/library.tsx'
import type { ThemeScheme } from '@/themes/contract.ts'
import { ThemeEditor } from '@/themes/kit/editor.tsx'
import { CompareBoard, ThemeStage } from '@/themes/kit/stage.tsx'
import { ThemeProvider } from '@/themes/provider.tsx'
import { themes } from '@/themes/themes.ts'

export function BoldShot({ id, scheme, mode }: { id: string; scheme: ThemeScheme; mode?: 'form' | 'dashboard' | 'kit' }) {
  if (id === 'editor') {
    return (
      <div className="min-h-svh bg-[#09090f] p-4">
        <ThemeEditor />
      </div>
    )
  }
  if (id === 'animations') {
    return (
      <div className="min-h-svh bg-[#09090f] p-6 text-white">
        <AnimationLibrary />
      </div>
    )
  }
  if (id === 'compare') return <CompareBoard scheme={scheme} />
  const theme = themes[id as keyof typeof themes] ?? themes.lagoon
  return (
    <ThemeProvider theme={theme} scheme={scheme} intensity="rich" className="min-h-svh">
      <div className="min-h-svh" data-theme-shot={id}>
        <ThemeStage mode={mode ?? (id.endsWith('-form') ? 'form' : 'kit')} />
      </div>
    </ThemeProvider>
  )
}
