'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const BLINK_CSS = `
@keyframes nexara-blink {
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0; }
}
`

export interface TypewriterProps {
  phrases: string[]
  className?: string
  cursorClassName?: string
  typeSpeed?: number
  deleteSpeed?: number
  /** Pause in ms at the end of a phrase before deleting. */
  pause?: number
  loop?: boolean
  cursor?: boolean
  /** When false, typing stops and the caret holds. */
  paused?: boolean
  showControls?: boolean
  onPhraseComplete?: (phrase: string) => void
  style?: CSSProperties
}

/**
 * Typewriter
 * Types and deletes a list of phrases. Reduced motion shows the first phrase in full.
 * The live region updates when a phrase finishes, not on every character.
 */
export function Typewriter({
  phrases,
  className,
  cursorClassName,
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

    const tick = () => {
      if (cancelled) return
      if (heldRef.current) {
        timer = window.setTimeout(tick, 120)
        return
      }
      const phrase = list[phraseIndex] ?? ''
      if (!deleting) {
        charIndex += 1
        setOutput(phrase.slice(0, charIndex))
        if (charIndex >= phrase.length) {
          onCompleteRef.current?.(phrase)
          const isLast = !loop && phraseIndex >= list.length - 1
          if (isLast) return
          deleting = true
          timer = window.setTimeout(tick, pause)
          return
        }
        timer = window.setTimeout(tick, typeSpeed)
        return
      }

      charIndex -= 1
      setOutput(phrase.slice(0, Math.max(0, charIndex)))
      if (charIndex <= 0) {
        deleting = false
        phraseIndex = (phraseIndex + 1) % list.length
        timer = window.setTimeout(tick, Math.max(typeSpeed, 220))
        return
      }
      timer = window.setTimeout(tick, deleteSpeed)
    }

    timer = window.setTimeout(tick, typeSpeed)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [deleteSpeed, loop, pause, phraseKey, reduced, typeSpeed])

  const longest = phrases.reduce((best, phrase) => (phrase.length > best.length ? phrase : best), '')
  const shown = reduced ? (phrases[0] ?? '') : output

  return (
    <span data-nexara="typewriter" className={cn('inline-flex items-baseline gap-2', className)} style={style}>
      <span className="inline-grid items-baseline">
        <span className="invisible col-start-1 row-start-1 whitespace-pre" aria-hidden="true">
          {longest || ' '}
          {cursor ? <span className="inline-block w-0.5" /> : null}
        </span>
        <span className="col-start-1 row-start-1 whitespace-pre" aria-hidden="true">
          {shown}
          {cursor && !reduced ? (
            <span
              className={cn(
                'ml-0.5 inline-block h-[0.85em] w-0.5 bg-current align-[-0.05em] motion-safe:animate-[nexara-blink_1s_step-end_infinite]',
                held && 'motion-safe:animate-none opacity-100',
                cursorClassName,
              )}
            />
          ) : null}
        </span>
      </span>
      {showControls && !reduced ? (
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-full border border-current/30 px-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
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
