'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { motion } from 'framer-motion'
import { type CSSProperties, type RefObject } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const tags = { p: 'p', h1: 'h1', h2: 'h2', h3: 'h3', span: 'span', div: 'div' } as const

const VARIANTS = [
  'editorial',
  'display',
  'highlight',
  'outline',
  'split',
  'caption',
  'quote',
  'columns',
  'note',
  'index',
  'folio',
  'stack',
  'line-mask',
  'letter-physics',
  'kinetic-stack',
  'svg-draw',
] as const

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
 * Twelve typographic compositions. Copy this file plus `src/lib/utils.ts`.
 */
function TextRevealCore({
  text,
  className,
  wordClassName,
  as = 'div',
  by = 'word',
  variant = 'editorial',
  stagger = 0.05,
  delay = 0,
  style,
}: TextRevealProps) {
  const reduced = usePrefersReducedMotion()
  const Tag = tags[as]
  const units = by === 'char' ? Array.from(text) : text.split(/\s+/).filter(Boolean)
  const first = units[0] ?? text
  const rest = units.slice(1)

  const reveal = (items: string[], extra?: string) =>
    items.map((item, index) => (
      <motion.span
        key={`${item}-${index}`}
        className={cn('inline-block', wordClassName, extra)}
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: delay + index * stagger, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {item}
        {by === 'word' ? '\u00a0' : ''}
      </motion.span>
    ))

  return (
    <Tag data-nexara="text-reveal" data-variant={variant} className={cn('text-nx-fg', className)} style={style}>
      {variant === 'editorial' ? (
        <p className="max-w-xl font-serif text-lg leading-8">
          <span className="float-left mt-1 mr-2 font-serif text-6xl leading-none text-nx-accent">{String(first).slice(0, 1)}</span>
          {text.slice(1)}
        </p>
      ) : null}
      {variant === 'display' ? (
        <p className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">{reveal(units)}</p>
      ) : null}
      {variant === 'highlight' ? (
        <p className="font-serif text-4xl">
          <span className="bg-[linear-gradient(transparent_62%,color-mix(in_oklab,var(--nx-accent)_32%,transparent)_62%)]">
            {reveal(units)}
          </span>
        </p>
      ) : null}
      {variant === 'outline' ? (
        <p className="font-serif text-6xl text-transparent" style={{ WebkitTextStroke: '1.4px var(--nx-fg)' }}>
          {reveal(units)}
        </p>
      ) : null}
      {variant === 'split' ? (
        <p className="flex flex-wrap items-baseline gap-3">
          <span className="font-serif text-6xl leading-none">{first}</span>
          <span className="max-w-xs text-sm leading-6 text-nx-muted">{rest.join(' ')}</span>
        </p>
      ) : null}
      {variant === 'caption' ? (
        <p>
          <span className="block text-[11px] tracking-[0.2em] text-nx-muted uppercase">Fig. 18</span>
          <span className="mt-2 block font-serif text-3xl">{text}</span>
        </p>
      ) : null}
      {variant === 'quote' ? (
        <blockquote className="border-l-2 border-nx-accent pl-5 font-serif text-3xl leading-snug">{text}</blockquote>
      ) : null}
      {variant === 'columns' ? (
        <p className="max-w-xl columns-2 gap-6 font-serif text-sm leading-6">{text}</p>
      ) : null}
      {variant === 'note' ? (
        <p className="font-serif text-2xl">
          {text} <span className="align-super font-sans text-xs text-nx-accent">see margin</span>
        </p>
      ) : null}
      {variant === 'index' ? (
        <ol className="space-y-2 text-sm">
          {units.map((word, index) => (
            <li key={`${word}-${index}`} className="flex justify-between border-b border-nx-border pb-1">
              <span>{word}</span>
              <span className="font-mono text-nx-faint">{String(index + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {variant === 'folio' ? (
        <p className="flex items-baseline justify-between border-t border-nx-line pt-2 text-xs tracking-[0.16em] text-nx-muted uppercase">
          <span>{text}</span>
          <span>018</span>
        </p>
      ) : null}
      {variant === 'stack' ? (
        <p className="font-serif text-4xl leading-[1.05]">
          {units.map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </p>
      ) : null}
    </Tag>
  )
}

export function TextReveal(props: TextRevealProps) {
  if (isWowVariant('text-reveal', props.variant)) {
    return (
      <WowSignature
        family="text-reveal"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <TextRevealCore {...props} />
}
