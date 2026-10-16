'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const BLINK_CSS = `
@keyframes nexara-blink {
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0; }
}
@keyframes nexara-phrase-in {
  from { opacity: 0; filter: blur(6px); }
  to { opacity: 1; filter: blur(0); }
}
`

const VARIANTS = [
  'caret',
  'reverse',
  'slot',
  'scramble',
  'fade',
  'word',
  'strike',
  'overwrite',
  'blur',
  'morph',
  'complete',
  'cut',
] as const

export type TypewriterVariant = (typeof VARIANTS)[number]

const GLYPHS = 'abcdefhkmnprstuvwxz'

export interface TypewriterProps {
  phrases: string[]
  className?: string
  cursorClassName?: string
  variant?: TypewriterVariant
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
 * Twelve typing behaviors. Reduced motion shows the first phrase in full.
 * The screen-reader text is the phrase list, not a live character stream.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Typewriter({
  phrases,
  className,
  cursorClassName,
  variant = 'caret',
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
  const [ghost, setGhost] = useState('')
  const [struck, setStruck] = useState(false)
  const [locked, setLocked] = useState(0)
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

    const hopPhrase = () => {
      const phrase = list[phraseIndex] ?? ''
      setOutput(phrase)
      setGhost(list[(phraseIndex + 1) % list.length] ?? '')
      onCompleteRef.current?.(phrase)
      const isLast = !loop && phraseIndex >= list.length - 1
      if (isLast) return
      phraseIndex = (phraseIndex + 1) % list.length
      wait(variant === 'morph' ? pause : pause + 280, hopPhrase)
    }

    const scramble = () => {
      const phrase = list[phraseIndex] ?? ''
      if (charIndex >= phrase.length) {
        setOutput(phrase)
        setLocked(phrase.length)
        onCompleteRef.current?.(phrase)
        const isLast = !loop && phraseIndex >= list.length - 1
        if (isLast) return
        wait(pause, () => {
          phraseIndex = (phraseIndex + 1) % list.length
          charIndex = 0
          setLocked(0)
          scramble()
        })
        return
      }
      const noise = Array.from({ length: phrase.length - charIndex }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join('')
      if (variant === 'slot') setLocked(charIndex)
      setOutput(phrase.slice(0, charIndex) + noise)
      charIndex += 1
      wait(typeSpeed, scramble)
    }

    const tick = () => {
      const phrase = list[phraseIndex] ?? ''
      if (!deleting) {
        if (variant === 'word') {
          const words = phrase.split(' ')
          const shownNow = words.slice(0, charIndex + 1).join(' ')
          charIndex += 1
          setOutput(shownNow)
          if (charIndex >= words.length) {
            onCompleteRef.current?.(phrase)
            const isLast = !loop && phraseIndex >= list.length - 1
            if (isLast) return
            deleting = true
            wait(pause, tick)
            return
          }
          wait(typeSpeed * 2, tick)
          return
        }
        charIndex += 1
        if (variant === 'reverse') setOutput(phrase.slice(Math.max(0, phrase.length - charIndex)))
        else if (variant === 'complete') {
          setOutput(phrase.slice(0, charIndex))
          setGhost(phrase.slice(charIndex))
        } else if (variant === 'overwrite') {
          const next = list[(phraseIndex + 1) % list.length] ?? ''
          const mixed = next.slice(0, charIndex) + phrase.slice(Math.min(charIndex, phrase.length))
          setOutput(mixed.slice(0, Math.max(phrase.length, next.length)))
        } else setOutput(phrase.slice(0, charIndex))
        if (charIndex >= phrase.length) {
          onCompleteRef.current?.(phrase)
          const isLast = !loop && phraseIndex >= list.length - 1
          if (isLast) return
          if (variant === 'cut') {
            setOutput('')
            setStruck(false)
            charIndex = 0
            phraseIndex = (phraseIndex + 1) % list.length
            wait(180, tick)
            return
          }
          if (variant === 'strike') setStruck(true)
          deleting = variant !== 'overwrite'
          if (variant === 'overwrite') {
            phraseIndex = (phraseIndex + 1) % list.length
            charIndex = 0
            wait(pause, tick)
            return
          }
          wait(pause, tick)
          return
        }
        wait(typeSpeed, tick)
        return
      }

      if (variant === 'word') {
        const words = phrase.split(' ')
        charIndex = Math.max(0, charIndex - 1)
        setOutput(words.slice(0, charIndex).join(' '))
      } else {
        charIndex -= 1
        setOutput(phrase.slice(0, Math.max(0, charIndex)))
      }
      if (charIndex > 0) {
        wait(deleteSpeed, tick)
        return
      }
      setStruck(false)
      deleting = false
      charIndex = 0
      phraseIndex = (phraseIndex + 1) % list.length
      wait(Math.max(typeSpeed, 220), tick)
    }

    if (variant === 'fade' || variant === 'morph') hopPhrase()
    else if (variant === 'scramble' || variant === 'slot') scramble()
    else tick()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [deleteSpeed, loop, pause, phraseKey, reduced, typeSpeed, variant])

  const longest = phrases.reduce((best, phrase) => (phrase.length > best.length ? phrase : best), '')
  const shown = reduced ? (phrases[0] ?? '') : output
  const prefix = ''
  const sharp = variant === 'blur' ? shown.slice(0, Math.max(0, shown.length - 3)) : shown
  const soft = variant === 'blur' ? shown.slice(-3) : ''
  const cursorClass = 'ml-0.5 inline-block h-[0.85em] w-0.5 bg-current align-[-0.05em]'

  return (
    <span data-nexara="typewriter" data-variant={variant} className={cn('inline-flex items-baseline gap-2', className)} style={style}>
      <span className="relative inline-grid items-baseline">
        <span className="invisible col-start-1 row-start-1 whitespace-pre" aria-hidden="true">
          {prefix}
          {longest || ' '}
          {cursor ? <span className="inline-block w-[0.55em]" /> : null}
        </span>
        {variant === 'morph' && ghost ? (
          <span className="col-start-1 row-start-1 whitespace-pre text-current opacity-25" aria-hidden="true">
            {ghost}
          </span>
        ) : null}
        <span
          key={variant === 'fade' || variant === 'morph' ? shown : 'typed'}
          className={cn(
            'col-start-1 row-start-1 whitespace-pre',
            struck && 'line-through decoration-[#ff6a3d]',
            (variant === 'fade' || variant === 'morph') && !reduced && 'motion-safe:animate-[nexara-phrase-in_0.35s_ease]',
          )}
          aria-hidden="true"
        >
          {prefix}
          {variant === 'slot' ? (
            <span className="inline-flex font-mono">
              {Array.from(shown || '\u00a0').map((glyph, index) => (
                <span
                  key={`${glyph}-${index}`}
                  className={cn(
                    'inline-flex h-[1.15em] min-w-[0.65em] items-center justify-center overflow-hidden border-b border-current/30',
                    index >= locked && 'text-[#f5c16c]',
                  )}
                >
                  {glyph === ' ' ? '\u00a0' : glyph}
                </span>
              ))}
            </span>
          ) : variant === 'blur' ? (
            <>
              {sharp}
              <span className="blur-[2px]">{soft}</span>
            </>
          ) : (
            shown
          )}
          {variant === 'complete' && ghost ? <span className="text-current/35">{ghost}</span> : null}
          {cursor && !reduced ? (
            <span className={cn(cursorClass, 'motion-safe:animate-[nexara-blink_1s_step-end_infinite]', held && 'motion-safe:animate-none opacity-100', cursorClassName)} />
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
