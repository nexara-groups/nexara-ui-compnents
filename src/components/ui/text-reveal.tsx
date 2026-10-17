'use client'

import { type CSSProperties, type RefObject } from 'react'
import { cn } from '@/lib/utils.ts'

const tags = { p: 'p', h1: 'h1', h2: 'h2', h3: 'h3', span: 'span', div: 'div' } as const

const VARIANTS = [
  'editorial',
  'headline',
  'marker',
  'outline',
  'split',
  'figure',
  'quote',
  'medallion',
  'columns',
  'annotation',
  'index',
  'running-head',
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
 * Twelve typographic compositions. The string is the copy; the variant is the layout.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function TextReveal({ text, className, as = 'div', by = 'word', variant = 'editorial', style, container }: TextRevealProps) {
  const Tag = tags[as]
  const words = text.split(/\s+/).filter(Boolean)
  const first = words[0] ?? text
  const rest = words.slice(1).join(' ')

  return (
    <Tag data-nexara="text-reveal" data-variant={variant} className={cn('text-[#f6f3ec]', className)} style={style}>
      {variant === 'editorial' ? (
        <p className="max-w-xl font-serif text-lg leading-8" data-scroll-root={container ? 'set' : undefined}>
          {by === 'char' ? (
            <span className="tracking-[0.35em] uppercase">{text}</span>
          ) : (
            <>
              <span className="float-left mt-1 mr-2 font-serif text-6xl leading-none text-[#f5c16c]">{first.slice(0, 1)}</span>
              {text.slice(1)}
            </>
          )}
        </p>
      ) : null}
      {variant === 'headline' ? (
        <div>
          <p className="text-xs tracking-[0.22em] text-zinc-400 uppercase">Chapter</p>
          <p className="font-serif text-6xl leading-none md:text-7xl">{text}</p>
        </div>
      ) : null}
      {variant === 'marker' ? (
        <p className="font-serif text-4xl">
          <span className="bg-[linear-gradient(#f5c16c,#f5c16c)] bg-[length:100%_0.35em] bg-[position:0_85%] bg-no-repeat px-1">{text}</span>
        </p>
      ) : null}
      {variant === 'outline' ? (
        <p className="font-serif text-6xl text-transparent" style={{ WebkitTextStroke: '1.5px #f6f3ec' }}>{text}</p>
      ) : null}
      {variant === 'split' ? (
        <p className="flex flex-wrap items-baseline gap-3">
          <span className="font-serif text-5xl">{first}</span>
          <span className="text-lg text-zinc-400">{rest || 'continues'}</span>
        </p>
      ) : null}
      {variant === 'figure' ? (
        <div>
          <div className="relative h-24 border border-white/30">
            <span className="absolute -top-px -left-px size-3 border-t border-l border-[#f6f3ec]" />
            <span className="absolute -top-px -right-px size-3 border-t border-r border-[#f6f3ec]" />
            <span className="absolute -bottom-px -left-px size-3 border-b border-l border-[#f6f3ec]" />
            <span className="absolute -right-px -bottom-px size-3 border-r border-b border-[#f6f3ec]" />
          </div>
          <p className="mt-2 text-sm">{text}</p>
        </div>
      ) : null}
      {variant === 'quote' ? (
        <blockquote className="border-l-2 border-[#f5c16c] pl-4">
          <p className="font-serif text-3xl leading-tight">“{text}”</p>
        </blockquote>
      ) : null}
      {variant === 'medallion' ? (
        <p className="flex items-center gap-4">
          <span className="inline-flex size-20 items-center justify-center rounded-full border-2 border-[#f5c16c] font-serif text-3xl">{first}</span>
          <span className="text-sm tracking-[0.16em] text-zinc-400 uppercase">{rest || 'marked'}</span>
        </p>
      ) : null}
      {variant === 'columns' ? (
        <div>
          <div className="mb-3 h-px bg-white/20" />
          <div className="grid grid-cols-2 gap-6 text-sm leading-6">
            <p>{words.filter((_, index) => index % 2 === 0).join(' ')}</p>
            <p>{words.filter((_, index) => index % 2 === 1).join(' ')}</p>
          </div>
        </div>
      ) : null}
      {variant === 'annotation' ? (
        <p className="relative inline-block font-serif text-4xl">
          {text}
          <span className="absolute -top-6 right-0 rotate-[-8deg] font-serif text-sm text-[#ff6a3d]">see note</span>
        </p>
      ) : null}
      {variant === 'index' ? (
        <ol className="space-y-1 font-serif text-2xl">
          {words.slice(0, 4).map((word, index) => (
            <li key={`${word}-${index}`} className="flex gap-4 border-b border-white/10">
              <span className="text-[#f5c16c]">{String(index + 1).padStart(2, '0')}</span>
              {word}
            </li>
          ))}
        </ol>
      ) : null}
      {variant === 'running-head' ? (
        <div>
          <div className="flex items-center gap-3 text-[10px] tracking-[0.18em] text-zinc-400 uppercase">
            <span>04</span>
            <span className="h-px flex-1 bg-white/20" />
            <span>{first}</span>
          </div>
          <p className="mt-3 font-serif text-3xl">{rest || text}</p>
        </div>
      ) : null}
    </Tag>
  )
}
