'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

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
  'flap',
  'headline',
  'caption',
  'prompt',
  'label',
  'redact',
  'italic',
  'tape',
  'odometer',
  'scramble-line',
  'matrix-rain',
  'flap-3d',
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
 * Twelve devices that type. Copy this file plus `src/lib/utils.ts`.
 */
function TypewriterCore({
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
  showControls = true,
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
  const caret = cursor && !reduced ? (
    <span className={cn('ml-0.5 inline-block h-[0.9em] w-px bg-current align-[-0.05em] motion-safe:animate-[nexara-blink_1s_step-end_infinite]', cursorClassName)} />
  ) : null

  const glyphs = (
    <span className={cn(variant === 'italic' && 'font-serif italic', variant === 'editor' && 'font-mono', variant === 'flap' && 'font-mono')}>
      {variant === 'flap' ? (
        <span className="inline-flex gap-0.5">
          {Array.from((shown || ' ').slice(0, 12)).map((glyph, index) => (
            <span key={`${glyph}-${index}`} className="inline-flex h-8 min-w-6 items-center justify-center rounded-sm bg-[#141416] text-[#f3f3ee] shadow-[inset_0_-6px_0_rgba(0,0,0,0.35)]">
              {glyph === ' ' ? '' : glyph}
            </span>
          ))}
        </span>
      ) : (
        <>
          {shown}
          {caret}
        </>
      )}
    </span>
  )

  return (
    <span data-nexara="typewriter" data-variant={variant} className={cn('inline-flex max-w-full', className)} style={style}>
      {variant === 'terminal' ? (
        <span className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0c0d10] p-3 font-mono text-sm text-[#9be7c4]">
          <span className="mb-2 flex gap-1.5">
            <i className="size-2.5 rounded-full bg-[#ff5f57]" />
            <i className="size-2.5 rounded-full bg-[#febc2e]" />
            <i className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="text-white/35">~/nexara </span>
          {glyphs}
        </span>
      ) : null}
      {variant === 'chat' ? (
        <span className="max-w-sm rounded-2xl rounded-bl-md bg-nx-card px-4 py-3 text-sm text-nx-fg shadow-[var(--nx-shadow)] ring-1 ring-nx-border">
          {glyphs}
        </span>
      ) : null}
      {variant === 'search' ? (
        <span className="flex h-11 w-full items-center rounded-full border border-nx-border bg-nx-card px-4 text-sm shadow-[var(--nx-shadow)]">
          <span className="mr-2 text-nx-faint">⌕</span>
          {glyphs}
        </span>
      ) : null}
      {variant === 'editor' ? (
        <span className="flex w-full gap-3 rounded-lg border border-nx-border bg-[#0e1016] p-3 font-mono text-sm text-[#b7fff0]">
          <span className="text-white/25">24</span>
          {glyphs}
        </span>
      ) : null}
      {variant === 'flap' ? <span className="rounded-md bg-[#0c0c0e] p-2">{glyphs}</span> : null}
      {variant === 'headline' ? (
        <span className="block font-serif text-4xl tracking-tight text-nx-fg md:text-5xl">{glyphs}</span>
      ) : null}
      {variant === 'caption' ? (
        <span className="flex items-stretch overflow-hidden rounded-md bg-[#111113] text-white">
          <span className="w-1.5 bg-nx-accent" />
          <span className="px-3 py-1.5">
            <span className="block text-sm">{glyphs}</span>
            <span className="block text-[10px] tracking-[0.16em] text-white/45 uppercase">Live</span>
          </span>
        </span>
      ) : null}
      {variant === 'prompt' ? (
        <span className="font-mono text-sm text-nx-muted">
          <span className="text-nx-accent">❯</span> {glyphs}
        </span>
      ) : null}
      {variant === 'label' ? (
        <span className="inline-flex items-center rounded-full border border-nx-border bg-nx-card px-3 py-1 text-xs tracking-[0.14em] text-nx-muted uppercase">
          {glyphs}
        </span>
      ) : null}
      {variant === 'redact' ? (
        <span className="bg-nx-fg px-1.5 font-mono text-sm text-nx-fg">{glyphs}</span>
      ) : null}
      {variant === 'italic' ? <span className="font-serif text-3xl text-nx-fg">{glyphs}</span> : null}
      {variant === 'tape' ? (
        <span className="rounded-sm bg-nx-card px-3 py-2 font-mono text-sm text-nx-fg shadow-[0_1px_0_var(--nx-border)] ring-1 ring-nx-border">
          {glyphs}
        </span>
      ) : null}
      {showControls && !reduced ? (
        <button
          type="button"
          className="ml-2 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-nx-border px-3 text-xs"
          aria-pressed={held}
          onClick={() => setManualPause((value) => !value)}
        >
          {held ? 'Play' : 'Pause'}
        </button>
      ) : null}
      <span className="sr-only">{phrases.filter(Boolean).join('. ')}</span>
    </span>
  )
}

export function Typewriter(props: TypewriterProps) {
  if (isWowVariant('typewriter', props.variant)) {
    return <WowSignature family="typewriter" variant={props.variant!} className={props.className} />
  }
  return <TypewriterCore {...props} />
}
