'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type CSSProperties, type RefObject } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const tags = {
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  span: 'span',
  div: 'div',
} as const

const VARIANTS = ['rise', 'blur', 'uncover', 'fade', 'skew', 'rotate', 'highlight', 'tracking', 'slide', 'wipe', 'pop', 'drop'] as const

export type TextRevealVariant = (typeof VARIANTS)[number]

export interface TextRevealProps {
  text: string
  className?: string
  wordClassName?: string
  as?: keyof typeof tags
  by?: 'word' | 'char'
  variant?: TextRevealVariant
  once?: boolean
  amount?: number
  stagger?: number
  delay?: number
  style?: CSSProperties
  container?: RefObject<HTMLElement | null>
}

/**
 * TextReveal
 * Twelve scroll-linked entrances. The full string is exposed to assistive tech in one piece.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  as = 'p',
  by = 'word',
  variant = 'rise',
  style,
  container,
}: TextRevealProps) {
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    container: container ?? undefined,
    offset: ['start 92%', 'start 38%'],
  })
  const Tag = tags[as]
  const units = by === 'char' ? Array.from(text) : text.split(/\s+/).filter(Boolean)

  return (
    <Tag
      ref={(node) => {
        rootRef.current = node
      }}
      data-nexara="text-reveal"
      data-variant={variant}
      className={cn(className)}
      style={style}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {units.map((unit, index) => {
          const token = by === 'char' && unit === ' ' ? null : unit
          return (
            <span key={`${unit}-${index}`}>
              {token === null ? (
                ' '
              ) : (
                <RevealUnit
                  progress={scrollYProgress}
                  index={index}
                  count={units.length}
                  reduced={reduced}
                  variant={variant}
                  className={wordClassName}
                >
                  {token}
                </RevealUnit>
              )}
              {by === 'word' && index < units.length - 1 ? ' ' : null}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}

function RevealUnit({
  progress,
  index,
  count,
  reduced,
  variant,
  className,
  children,
}: {
  progress: MotionValue<number>
  index: number
  count: number
  reduced: boolean
  variant: TextRevealVariant
  className?: string
  children: string
}) {
  const start = count <= 1 ? 0 : index / count
  const end = count <= 1 ? 1 : Math.min(1, start + 1 / Math.max(count, 1))
  const span: [number, number] = [start, end]
  const opacity = useTransform(progress, span, reduced ? [1, 1] : variant === 'fade' || variant === 'pop' ? [0, 1] : [0.28, 1])
  const y = useTransform(
    progress,
    span,
    reduced
      ? ['0%', '0%']
      : variant === 'rise'
        ? ['0.35em', '0em']
        : variant === 'uncover'
          ? ['110%', '0%']
          : variant === 'drop'
            ? ['-110%', '0%']
            : ['0em', '0em'],
  )
  const x = useTransform(progress, span, reduced || variant !== 'slide' ? ['0em', '0em'] : ['0.8em', '0em'])
  const scale = useTransform(progress, span, reduced ? [1, 1] : variant === 'pop' ? [0.4, 1] : [1, 1])
  const skew = useTransform(progress, span, reduced || variant !== 'skew' ? ['0deg', '0deg'] : ['18deg', '0deg'])
  const rotateX = useTransform(progress, span, reduced || variant !== 'rotate' ? [0, 0] : [70, 0])
  const blur = useTransform(progress, span, reduced || variant !== 'blur' ? ['0px', '0px'] : ['10px', '0px'])
  const filter = useTransform(blur, (value) => `blur(${value})`)
  const clipPath = useTransform(progress, (latest) => {
    if (reduced || variant !== 'wipe') return 'inset(0)'
    const t = end === start ? 1 : Math.min(1, Math.max(0, (latest - start) / (end - start)))
    return `inset(0 ${Math.round((1 - t) * 100)}% 0 0)`
  })
  const backgroundSize = useTransform(progress, span, reduced || variant !== 'highlight' ? ['100% 100%', '100% 100%'] : ['0% 100%', '100% 100%'])
  const letterSpacing = useTransform(progress, span, reduced || variant !== 'tracking' ? ['0em', '0em'] : ['0.28em', '0em'])

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={cn('inline-block', variant === 'highlight' && 'bg-[linear-gradient(#f5c16c,#f5c16c)] bg-no-repeat', className)}
        style={{ opacity, y, x, scale, skewX: skew, rotateX, filter, clipPath, backgroundSize, letterSpacing, transformPerspective: variant === 'rotate' ? 600 : undefined }}
      >
        {children}
      </motion.span>
    </span>
  )
}
