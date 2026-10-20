'use client'

import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import Lenis from 'lenis'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react'

export const springs = {
  ui: { type: 'spring' as const, stiffness: 380, damping: 32, mass: 0.78 },
  heavy: { type: 'spring' as const, stiffness: 170, damping: 26, mass: 1.05 },
  snap: { type: 'spring' as const, stiffness: 520, damping: 38, mass: 0.6 },
}

export const easings = {
  enter: [0.16, 1, 0.3, 1] as const,
  exit: [0.7, 0, 0.84, 0] as const,
  hold: [0.22, 1, 0.36, 1] as const,
}

export function useLenis(enabled = true) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || reduced) return
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
    })
    let frame = 0
    const loop = (time: number) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(loop)
    }
    frame = window.requestAnimationFrame(loop)
    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [enabled, reduced])
}

export function Grain({ className }: { className?: string }) {
  const id = useId().replaceAll(':', '')
  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 z-20 h-full w-full opacity-[0.14] mix-blend-overlay', className)}
      aria-hidden="true"
    >
      <filter id={`grain-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${id})`} />
    </svg>
  )
}

export function HelioMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-full border border-ivory/20 bg-carbon',
        className,
      )}
      aria-hidden="true"
    >
      <span className="block size-2.5 rounded-full bg-ember shadow-[0_0_16px_rgba(255,77,28,0.7)]" />
    </span>
  )
}

export function Magnetic({
  children,
  className,
  strength = 10,
  href,
  type = 'button',
}: {
  children: ReactNode
  className?: string
  strength?: number
  href?: string
  type?: 'button' | 'submit'
}) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springs.ui)
  const sy = useSpring(y, springs.ui)
  const ref = useRef<HTMLElement | null>(null)

  const onMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== 'mouse') return
    const node = ref.current
    if (!node) return
    const box = node.getBoundingClientRect()
    x.set(((event.clientX - box.left) / box.width - 0.5) * strength)
    y.set(((event.clientY - box.top) / box.height - 0.5) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const shared = {
    className,
    style: { x: sx, y: sy },
    onPointerMove: onMove,
    onPointerLeave: onLeave,
  }

  if (href) {
    return (
      <motion.a ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref as Ref<HTMLButtonElement>} type={type} {...shared}>
      {children}
    </motion.button>
  )
}

export function useContainedPointer<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const sx = useSpring(nx, springs.heavy)
  const sy = useSpring(ny, springs.heavy)

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const node = ref.current
      if (!node) return
      const box = node.getBoundingClientRect()
      nx.set((event.clientX - box.left) / box.width - 0.5)
      ny.set((event.clientY - box.top) / box.height - 0.5)
    },
    [nx, ny],
  )

  const onPointerLeave = useCallback(() => {
    nx.set(0)
    ny.set(0)
  }, [nx, ny])

  return { ref, nx, ny, sx, sy, onPointerMove, onPointerLeave }
}

export function useCount(value: number, active = true) {
  const reduced = usePrefersReducedMotion()
  const motionValue = useMotionValue(reduced ? value : 0)
  const spring = useSpring(motionValue, springs.heavy)
  const node = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    motionValue.set(active ? value : 0)
  }, [active, motionValue, value])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (node.current) node.current.textContent = Math.round(latest).toLocaleString()
    })
  }, [spring])

  return node
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(active: boolean, root: RefObject<HTMLElement | null>, onEscape?: () => void) {
  useEffect(() => {
    if (!active) return
    const node = root.current
    if (!node) return

    const items = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    window.setTimeout(() => items()[0]?.focus(), 20)

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onEscape?.()
        return
      }
      if (event.key !== 'Tab') return
      const list = items()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [active, onEscape, root])
}

export { cn }
