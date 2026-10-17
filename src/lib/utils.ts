'use client'

import { clsx, type ClassValue } from 'clsx'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Shared focus ring that tracks the theme tokens. */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nx-ring focus-visible:ring-offset-2 focus-visible:ring-offset-nx-bg'

/** Tracks the user's reduced-motion preference. Safe to call in the browser only. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** Insert a keyframe stylesheet once so copied components animate without a global CSS file. */
export function ensureKeyframes(id: string, css: string) {
  if (typeof document === 'undefined') return
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  style.textContent = css
  document.head.appendChild(style)
}

export function useKeyframes(id: string, css: string) {
  if (typeof document !== 'undefined') {
    ensureKeyframes(id, css)
  }
  useEffect(() => {
    ensureKeyframes(id, css)
  }, [id, css])
}

/** Count from 0 to `target`. Reduced motion snaps to the end. */
export function useCountUp(target: number, duration = 1400) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(reduced ? target : 0)

  useEffect(() => {
    if (reduced) {
      setValue(target)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, reduced, target])

  return value
}
