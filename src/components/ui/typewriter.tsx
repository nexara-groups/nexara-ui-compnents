'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const BLINK_CSS = `
@keyframes nexara-blink {
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0; }
}
`

const VARIANTS = [
  'terminal',
  'chat',
  'search',
  'editor',
  'split-flap',
  'news',
  'lower-third',
  'dispatch',
  'shipping',
  'redaction',
  'script',
  'teletype',
] as const

export type TypewriterVariant = (typeof VARIANTS)[number]

export interface TypewriterProps {
  phrases: string[]
  className?: string
  cursorClassName?: string
  variant?: TypewriterVariant
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
  loop?: boolean
  cursor?: boolean
  paused?: boolean
  showControls?: boolean
  onPhraseComplete?: (phrase: string) => void
  style?: CSSProperties
}

/**
 * Typewriter
 * Twelve devices that type: terminal, chat, search, editor, split-flap,
 * newspaper, lower third, dispatch slip, shipping label, redaction, script, and a paper roll.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Typewriter({
  phrases,
  className,
  cursorClassName,
  variant = 'terminal',
  typeSpeed = 48,
  deleteSpeed = 28,
  pause = 1400,
  loop = true,
  cursor = true,
  paused = false,
  showControls = false,
  onPhraseComplete,
  style,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion()
  useKeyframes('nexara-blink-keyframes', BLINK_CSS)
  const [output, setOutput] = useState('')
  const [manualPause, setManualPause] = useState(false)
  const held = paused || manualPause
  const heldRef = useRef(held)
  const onCompleteRef = useRef(onPhraseComplete)
  const phraseKey = phrases.join('\u0000')

  useEffect(() => {
    heldRef.current = held
    onCompleteRef.current = onPhraseComplete
  }, [held, onPhraseComplete])

  useEffect(() => {
    const list = phraseKey.length > 0 ? phraseKey.split('\u0000') : []
    if (reduced || list.length === 0) return
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timer = 0
    let cancelled = false
    const wait = (ms: number, next: () => void) => {
      timer = window.setTimeout(() => {
        if (cancelled) return
        if (heldRef.current) {
          wait(120, next)
          return
        }
        next()
      }, ms)
    }
    const tick = () => {
      const phrase = list[phraseIndex] ?? ''
      if (!deleting) {
        charIndex += 1
        setOutput(phrase.slice(0, charIndex))
        if (charIndex >= phrase.length) {
          onCompleteRef.current?.(phrase)
          const isLast = !loop && phraseIndex >= list.length - 1
          if (isLast) return
          deleting = true
          wait(pause, tick)
          return
        }
        wait(typeSpeed, tick)
        return
      }
      charIndex -= 1
      setOutput(phrase.slice(0, Math.max(0, charIndex)))
      if (charIndex > 0) {
        wait(deleteSpeed, tick)
        return
      }
      deleting = false
      phraseIndex = (phraseIndex + 1) % list.length
      wait(Math.max(typeSpeed, 220), tick)
    }
    tick()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [deleteSpeed, loop, pause, phraseKey, reduced, typeSpeed])

  const shown = reduced ? (phrases[0] ?? '') : output
  const visible = shown
  const caret = cursor && !reduced ? (
    <span className={cn('ml-0.5 inline-block h-[0.9em] w-px bg-current align-[-0.05em] motion-safe:animate-[nexara-blink_1s_step-end_infinite]', cursorClassName)} />
  ) : null

  const glyphs = (
    <span className={cn(variant === 'script' && 'font-serif italic text-[#f5c16c]', variant === 'editor' && 'font-mono text-[#b7fff0]', variant === 'split-flap' && 'font-mono')}>
      {variant === 'split-flap' ? (
        <span className="inline-flex gap-0.5">
          {Array.from((shown || ' ').slice(0, 12)).map((glyph, index) => (
            <span key={`${glyph}-${index}`} className="inline-flex h-8 w-6 items-center justify-center bg-[#111] text-[#f6f3ec] shadow-[inset_0_-6px_0_rgba(0,0,0,0.45)]">
              {glyph === ' ' ? '' : glyph}
            </span>
          ))}
        </span>
      ) : (
        <>
          {visible}
          {caret}
        </>
      )}
    </span>
  )

  return (
    <span data-nexara="typewriter" data-variant={variant} className={cn('inline-flex max-w-full', className)} style={style}>
      {variant === 'terminal' ? (
        <span className="w-full rounded-xl bg-[#07110f] p-3 font-mono text-sm text-[#3ddec4]">
          <span className="mb-2 flex gap-1"><i className="size-2 rounded-full bg-[#ff6a3d]" /><i className="size-2 rounded-full bg-[#f5c16c]" /><i className="size-2 rounded-full bg-[#3ddec4]" /></span>
          <span className="text-zinc-500">~/nexara </span>{glyphs}
        </span>
      ) : null}
      {variant === 'chat' ? (
        <span className="rounded-2xl rounded-bl-sm bg-[#1c2433] px-4 py-3 text-sm">{glyphs}</span>
      ) : null}
      {variant === 'search' ? (
        <span className="flex h-11 w-full items-center rounded-full border border-white/15 bg-[#12131c] px-4 text-sm">
          <span className="mr-2 text-zinc-500">⌕</span>{glyphs}
        </span>
      ) : null}
      {variant === 'editor' ? (
        <span className="flex w-full gap-3 rounded-lg bg-[#0c1020] p-3 font-mono text-sm">
          <span className="text-zinc-600">12</span>
          {glyphs}
        </span>
      ) : null}
      {variant === 'split-flap' ? <span className="rounded-md bg-[#1a120c] p-2">{glyphs}</span> : null}
      {variant === 'news' ? (
        <span className="block w-full border-y-4 border-[#f6f3ec] py-2">
          <span className="block text-[10px] tracking-[0.2em] uppercase">Evening edition</span>
          <span className="font-serif text-2xl">{glyphs}</span>
        </span>
      ) : null}
      {variant === 'lower-third' ? (
        <span className="flex items-stretch bg-black/80">
          <span className="w-2 bg-[#ff6a3d]" />
          <span className="px-3 py-1">
            <span className="block text-sm">{glyphs}</span>
            <span className="block text-[10px] tracking-[0.16em] text-zinc-400 uppercase">Studio</span>
          </span>
        </span>
      ) : null}
      {variant === 'dispatch' ? (
        <span className="block w-full bg-[#f6f3ec] p-3 font-mono text-xs text-[#1c1915]">
          <span className="block border-b border-[#1c1915]/20">TO · DESK</span>
          <span className="block border-b border-[#1c1915]/20">FROM · PRESS</span>
          <span className="mt-2 block">{glyphs}</span>
        </span>
      ) : null}
      {variant === 'shipping' ? (
        <span className="flex w-full items-center gap-3 border border-[#1c1915] bg-[#f6f3ec] p-3 text-[#1c1915]">
          <span className="h-12 w-24 bg-[repeating-linear-gradient(90deg,#1c1915_0_2px,transparent_2px_4px)]" />
          <span className="font-mono text-sm">{glyphs}</span>
        </span>
      ) : null}
      {variant === 'redaction' ? (
        <span className="block w-full border border-[#7f1d1d] bg-[#1c1915] p-3">
          <span className="mb-2 block bg-[#7f1d1d] px-2 text-[10px] tracking-[0.16em] text-[#fecaca] uppercase">Restricted</span>
          <span className="bg-black px-2 text-black">{glyphs}</span>
        </span>
      ) : null}
      {variant === 'script' ? <span className="font-serif text-3xl">{glyphs}</span> : null}
      {variant === 'teletype' ? (
        <span className="bg-[#f6f3ec] px-4 py-3 font-mono text-sm text-[#1c1915] shadow-[0_8px_0_#d9d1c3]">{glyphs}</span>
      ) : null}
      {showControls && !reduced ? (
        <button type="button" className="ml-2 h-8 rounded-full border border-current/30 px-2 text-xs" aria-pressed={held} onClick={() => setManualPause((value) => !value)}>
          {held ? 'Play' : 'Pause'}
        </button>
      ) : null}
      <span className="sr-only">{phrases.filter(Boolean).join('. ')}</span>
    </span>
  )
}
