'use client'

import { motion } from 'framer-motion'
import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const VARIANTS = [
  'credit',
  'badge',
  'playing',
  'product',
  'flashcard',
  'ticket',
  'profile',
  'pricing',
  'passport',
  'vinyl',
  'book',
  'postcard',
] as const

export type FlipVariant = (typeof VARIANTS)[number]

export interface FlipCardProps {
  front?: ReactNode
  back?: ReactNode
  className?: string
  frontClassName?: string
  backClassName?: string
  variant?: FlipVariant
  flipOn?: 'hover' | 'click'
  flipped?: boolean
  defaultFlipped?: boolean
  onFlippedChange?: (flipped: boolean) => void
  duration?: number
  label?: string
}

/**
 * FlipCard
 * Twelve objects that turn: credit card, badge, playing card, product,
 * flashcard, ticket, profile, pricing, passport, vinyl, book, postcard.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function FlipCard({
  front,
  back,
  className,
  frontClassName,
  backClassName,
  variant = 'credit',
  flipOn = 'hover',
  flipped: flippedProp,
  defaultFlipped = false,
  onFlippedChange,
  duration = 0.55,
  label = 'card',
}: FlipCardProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const [uncontrolled, setUncontrolled] = useState(defaultFlipped)
  const flipped = flippedProp ?? uncontrolled
  const transition = reduced ? { duration: 0 } : { duration, ease: [0.22, 1, 0.36, 1] as const }
  const faces = pair(variant)
  const frontNode = front ?? faces.front
  const backNode = back ?? faces.back

  function setFlipped(next: boolean) {
    if (flippedProp === undefined) setUncontrolled(next)
    onFlippedChange?.(next)
  }

  return (
    <div
      ref={rootRef}
      data-nexara="flip-card"
      data-variant={variant}
      className={cn('relative h-56', className)}
      onMouseEnter={flipOn === 'hover' ? () => setFlipped(true) : undefined}
      onMouseLeave={flipOn === 'hover' ? () => setFlipped(false) : undefined}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        if (flipOn !== 'click') return
        const target = event.target
        if (target instanceof Element && target.closest('a, button, input, textarea, select, label')) return
        setFlipped(!flipped)
      }}
    >
      <div className="h-full [perspective:1400px]">
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={transition}
        >
          <div
            className={cn('absolute inset-0 overflow-hidden rounded-3xl [backface-visibility:hidden]', flipped && 'pointer-events-none', frontClassName)}
            inert={flipped ? true : undefined}
            aria-hidden={flipped || undefined}
          >
            {frontNode}
          </div>
          <div
            className={cn('absolute inset-0 overflow-hidden rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]', !flipped && 'pointer-events-none', backClassName)}
            inert={!flipped ? true : undefined}
            aria-hidden={!flipped || undefined}
          >
            {backNode}
          </div>
        </motion.div>
      </div>
      <button
        type="button"
        aria-pressed={flipped}
        className="absolute right-3 bottom-3 z-20 inline-flex h-8 items-center rounded-full border border-white/20 bg-black/50 px-3 text-xs text-[#f6f3ec]"
        onClick={(event) => {
          event.stopPropagation()
          setFlipped(!flipped)
        }}
      >
        {flipped ? 'Show front' : 'Show back'}
        <span className="sr-only"> of {label}</span>
      </button>
    </div>
  )
}

function pair(variant: FlipVariant): { front: ReactNode; back: ReactNode } {
  if (variant === 'badge') {
    return {
      front: <Face className="bg-[#10241f] text-[#d9fff6]"><p className="text-xs tracking-[0.2em] uppercase">Visitor</p><p className="mt-6 font-serif text-3xl">Ada Klein</p><p className="mt-auto font-mono text-xs">NX-2041</p></Face>,
      back: <Face className="bg-[#f6f3ec] text-[#1c1915]"><p className="text-xs uppercase">Barcode</p><div className="mt-6 h-16 bg-[repeating-linear-gradient(90deg,#1c1915_0_2px,transparent_2px_4px)]" /></Face>,
    }
  }
  if (variant === 'playing') {
    return {
      front: <Face className="bg-[#f6f3ec] text-[#7f1d1d]"><p className="font-serif text-2xl">A</p><p className="m-auto font-serif text-5xl">♥</p><p className="self-end font-serif text-2xl">A</p></Face>,
      back: <Face className="bg-[#1e3a8a]"><div className="m-auto size-24 rotate-45 border-4 border-[#f5c16c]" /></Face>,
    }
  }
  if (variant === 'product') {
    return {
      front: <Face className="bg-[#f6f3ec] text-[#1c1915]"><div className="h-24 rounded-2xl bg-[#ff6a3d]" /><p className="mt-3 font-serif text-2xl">Lamp 04</p></Face>,
      back: <Face className="bg-[#14151f]"><p className="text-xs uppercase text-zinc-400">Specs</p><p className="mt-3">Brass, linen cord, 40W</p><p className="mt-2 text-[#f5c16c]">$220</p></Face>,
    }
  }
  if (variant === 'flashcard') {
    return {
      front: <Face className="bg-[#f6f3ec] text-[#1c1915]"><p className="text-xs uppercase">Term</p><p className="m-auto font-serif text-3xl">Atelier</p></Face>,
      back: <Face className="bg-[#1c1915] text-[#f6f3ec]"><p className="text-xs uppercase text-[#f5c16c]">Definition</p><p className="mt-4">A room set aside for making.</p></Face>,
    }
  }
  if (variant === 'ticket') {
    return {
      front: <Face className="bg-[#17151f]"><p className="text-xs tracking-[0.2em] uppercase">Admit one</p><p className="mt-4 font-serif text-3xl">Harbor Hall</p><p className="mt-auto border-t border-dashed border-white/30 pt-3 text-xs">Row C · Seat 12</p></Face>,
      back: <Face className="bg-[#14120f]"><p className="text-xs uppercase">Stub</p><p className="mt-6 font-mono">NX · 18 · 09</p></Face>,
    }
  }
  if (variant === 'profile') {
    return {
      front: <Face className="items-center bg-[#161222] text-center"><span className="size-16 rounded-full bg-[#8b7cff]" /><p className="mt-3 font-serif text-2xl">Ada Klein</p><p className="text-sm text-zinc-400">Studio lead</p></Face>,
      back: <Face className="bg-[#12131c]"><p className="text-xs uppercase text-zinc-400">Bio</p><p className="mt-3 text-sm leading-6">Designs rooms, writes the notes, keeps the lights low.</p></Face>,
    }
  }
  if (variant === 'pricing') {
    return {
      front: <Face className="bg-[#12131c]"><p className="text-xs uppercase text-zinc-400">Studio</p><p className="mt-2 font-serif text-5xl">$48</p><p className="text-sm text-zinc-400">per month</p></Face>,
      back: <Face className="bg-[#0f1c18]"><p className="text-xs uppercase text-[#3ddec4]">Includes</p><ul className="mt-3 space-y-1 text-sm"><li>Rooms</li><li>Library</li><li>Export</li></ul></Face>,
    }
  }
  if (variant === 'passport') {
    return {
      front: <Face className="items-center bg-[#143028] text-center text-[#d9fff6]"><p className="text-xs tracking-[0.28em] uppercase">Nexara</p><p className="mt-6 font-serif text-3xl">Passport</p></Face>,
      back: <Face className="bg-[#f6f3ec] text-[#1c1915]"><p className="text-xs uppercase">Data page</p><p className="mt-3">Name: Ada Klein</p><p>No: NX20418</p></Face>,
    }
  }
  if (variant === 'vinyl') {
    return {
      front: <Face className="items-center bg-[#2a1814]"><div className="size-28 rounded-full bg-[#111] shadow-[inset_0_0_0_18px_#3a2a24]"><div className="m-auto mt-10 size-8 rounded-full bg-[#f5c16c]" /></div></Face>,
      back: <Face className="bg-[#1a120e]"><p className="text-xs uppercase text-[#f5c16c]">Side A</p><ol className="mt-3 space-y-1 text-sm"><li>1. Night desk</li><li>2. Harbor</li><li>3. Lamp</li></ol></Face>,
    }
  }
  if (variant === 'book') {
    return {
      front: <Face className="bg-[#7f1d1d]"><p className="mt-8 font-serif text-4xl leading-none">The quiet room</p><p className="mt-auto text-xs tracking-[0.16em] uppercase">Nexara Press</p></Face>,
      back: <Face className="bg-[#f6f3ec] text-[#1c1915]"><p className="text-sm leading-6">A short book about leaving space on the page.</p></Face>,
    }
  }
  if (variant === 'postcard') {
    return {
      front: <Face className="bg-[linear-gradient(160deg,#3ddec4,#1d4ed8)]"><p className="mt-auto font-serif text-3xl">Lisbon</p></Face>,
      back: <Face className="bg-[#f6f3ec] text-[#1c1915]"><div className="ml-auto size-12 border border-dashed border-[#1c1915]/40" /><p className="mt-4 text-sm">Wish you were in the room.</p></Face>,
    }
  }
  return {
    front: (
      <Face className="bg-[linear-gradient(135deg,#1a1428,#3b1d4a)]">
        <div className="flex justify-between text-xs tracking-[0.16em] uppercase"><span>Nexara</span><span>Debit</span></div>
        <div className="mt-6 h-8 w-11 rounded-md bg-[#f5c16c]" />
        <p className="mt-auto font-mono tracking-[0.18em]">4242 4242 4242 1881</p>
      </Face>
    ),
    back: (
      <Face className="bg-[#1c1915] p-0">
        <div className="mt-6 h-10 bg-black" />
        <p className="mt-4 px-5 font-mono text-sm">CVV 188</p>
      </Face>
    ),
  }
}

function Face({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex h-full flex-col p-5 text-[#f6f3ec]', className)}>{children}</div>
}
