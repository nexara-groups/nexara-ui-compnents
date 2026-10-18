'use client'

import { lazy, Suspense } from 'react'
import type { WowProps } from '@/lib/wow-variants.ts'

const Loaded = lazy(() => import('./wow-signatures.tsx').then((mod) => ({ default: mod.WowSignature })))

/** Lazy signature mount so a sensible family copy does not pull WebGL. */
export function WowSignature(props: WowProps) {
  return (
    <Suspense fallback={<div className={props.className} />}>
      <Loaded {...props} />
    </Suspense>
  )
}
