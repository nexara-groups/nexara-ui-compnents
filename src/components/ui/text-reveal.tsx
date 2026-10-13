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

export interface TextRevealProps {
  text: string
  className?: string
  wordClassName?: string
  as?: keyof typeof tags
  by?: 'word' | 'char'
  /** Portion of the element that must be visible before it plays. Kept for callers; scroll offsets drive the reveal. */
  once?: boolean
  amount?: number
  stagger?: number
  delay?: number
  style?: CSSProperties
  /** Scroll container when the text is not moving with the window. */
  container?: RefObject<HTMLElement | null>
}

/**
 * TextReveal
 * Words or characters brighten and rise as the block moves through the viewport.
 * The full string is exposed to assistive tech in one piece.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  as = 'p',
  by = 'word',
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
  className,
  children,
}: {
  progress: MotionValue<number>
  index: number
  count: number
  reduced: boolean
  className?: string
  children: string
}) {
  const start = count <= 1 ? 0 : index / count
  const end = count <= 1 ? 1 : Math.min(1, start + 1 / Math.max(count, 1))
  const opacity = useTransform(progress, [start, end], reduced ? [1, 1] : [0.28, 1])
  const y = useTransform(progress, [start, end], reduced ? ['0em', '0em'] : ['0.35em', '0em'])

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span className={cn('inline-block', className)} style={{ opacity, y }}>
        {children}
      </motion.span>
    </span>
  )
}
