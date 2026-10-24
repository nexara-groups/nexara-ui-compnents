'use client'

import type { MotionIntensity, MotionPersonality } from '@/themes/contract.ts'
import { useLevel, usePersonality } from '@/themes/kit/level.ts'
import { useLayoutEffect, useRef, type RefObject } from 'react'

export type OpenOrigin = { x: number; y: number }

/**
 * The open motion for any overlay surface. Each personality gets its own property:
 * liquid grows a circle from the trigger and settles the radius 32 to 16, editorial
 * shutters up, cinematic dollies, tactile squashes, technical irises from the left.
 * Off holds the end state. Subtle runs a single property.
 */
export function playOpen(
  node: HTMLElement,
  personality: MotionPersonality,
  level: MotionIntensity,
  origin?: OpenOrigin | null,
  settleRadius = 16,
) {
  if (level === 'off' || typeof node.animate !== 'function') return
  const rect = node.getBoundingClientRect()
  if (personality === 'liquid') {
    if (level === 'subtle') {
      node.animate([{ borderRadius: '32px' }, { borderRadius: `${settleRadius}px` }], { duration: 420, easing: 'cubic-bezier(0.22, 1.4, 0.36, 1)' })
      return
    }
    const ox = origin ? Math.min(Math.max(origin.x - rect.left, 0), rect.width) : rect.width / 2
    const oy = origin ? Math.min(Math.max(origin.y - rect.top, 0), rect.height) : 0
    const far = Math.hypot(Math.max(ox, rect.width - ox), Math.max(oy, rect.height - oy))
    node.animate(
      [
        { clipPath: `circle(22px at ${ox}px ${oy}px)`, borderRadius: '32px' },
        { clipPath: `circle(${far + 2}px at ${ox}px ${oy}px)`, borderRadius: `${settleRadius}px` },
      ],
      { duration: 460, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    )
    return
  }
  const map: Record<Exclude<MotionPersonality, 'liquid'>, Keyframe[]> = {
    editorial: [{ transform: 'translateY(16px)', clipPath: 'inset(100% 0 0 0)' }, { transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' }],
    cinematic: [{ transform: 'perspective(900px) rotateX(8deg) scale(1.06)', opacity: 0 }, { transform: 'perspective(900px) rotateX(0) scale(1)', opacity: 1 }],
    tactile: [{ transform: 'scaleX(0.9) scaleY(1.08)' }, { transform: 'scaleX(1) scaleY(1)' }],
    technical: [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
  }
  const frames = map[personality]
  const single = level === 'subtle' ? frames.map((frame) => ({ opacity: frame.opacity ?? 1, clipPath: frame.clipPath, transform: personality === 'tactile' ? frame.transform : undefined })) : frames
  node.animate(single as Keyframe[], { duration: personality === 'editorial' ? 180 : personality === 'technical' ? 200 : 280, easing: personality === 'tactile' ? 'cubic-bezier(0.34, 1.7, 0.64, 1)' : 'cubic-bezier(0.16, 1, 0.3, 1)' })
}

/** Remember where focus was when an overlay opened so the open motion grows from it. */
export function triggerOrigin(): OpenOrigin | null {
  if (typeof document === 'undefined') return null
  const active = document.activeElement as HTMLElement | null
  if (!active || active === document.body) return null
  const rect = active.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

/**
 * Plays the theme's open motion when `open` turns true. Captures the trigger in a layout
 * effect, before focus moves into the overlay.
 */
export function useOpenMotion<T extends HTMLElement>(open: boolean, origin?: OpenOrigin | null, settleRadius = 16): RefObject<T | null> {
  const ref = useRef<T>(null)
  usePlayOpen(ref, open, origin, settleRadius)
  return ref
}

/** Plays the personality's open motion on an existing ref each time `open` turns true. */
export function usePlayOpen(ref: RefObject<HTMLElement | null>, open: boolean, origin?: OpenOrigin | null, settleRadius = 16) {
  const personality = usePersonality()
  const level = useLevel()
  const originRef = useRef(origin)
  useLayoutEffect(() => {
    originRef.current = origin
  })
  useLayoutEffect(() => {
    if (!open || !ref.current) return
    playOpen(ref.current, personality, level, originRef.current ?? triggerOrigin(), settleRadius)
  }, [open, personality, level, settleRadius, ref])
}

/** Spring-ish easing per level for inline transitions. */
export function liquidTransition(level: MotionIntensity, props: string[], duration = 280) {
  if (level === 'off') return 'none'
  const list = level === 'subtle' ? props.filter((prop) => prop === 'border-radius' || prop === 'opacity') : props
  if (list.length === 0) return 'none'
  return list.map((prop) => `${prop} ${duration}ms var(--nx-ease)`).join(', ')
}
