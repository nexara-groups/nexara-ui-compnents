'use client'

import { useEffect, useRef, useState } from 'react'
import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'eight',
  'scrolly',
  'rail',
  'cards',
  'film',
  'numbered',
  'essay',
  'split',
  'sticky',
  'accordion',
  'manifesto',
  'lesson',
] as const

export type ChaptersVariant = (typeof VARIANTS)[number]

export interface ChaptersProps {
  variant?: ChaptersVariant
  className?: string
}

const rise = [
  ['01', 'The file', 'We read the history before we book the chair.'],
  ['02', 'The door', 'Therapy, consult, pharmacy, lab — one roof.'],
  ['03', 'The hour', 'Thirty-five sessions a week, named, not queued.'],
  ['04', 'The floor', 'The walk between rooms is measured in metres.'],
  ['05', 'The name', 'Sixteen specialists. You leave with one of them.'],
  ['06', 'The night', 'The desk stays on after the last consult.'],
  ['07', 'The return', 'Follow-up is booked before you reach the lift.'],
  ['08', 'The city', 'Harbor East is the address. The work is the rest.'],
]

/**
 * Chapters
 * Twelve scroll-driven storytelling constructions, including eight clinic chapters.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Chapters({ variant = 'eight', className }: ChaptersProps) {
  const [active, setActive] = useState(0)
  const refs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    if (variant !== 'eight' && variant !== 'scrolly' && variant !== 'sticky') return
    const nodes = refs.current.filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = nodes.indexOf(visible.target as HTMLElement)
        if (index >= 0) setActive(index)
      },
      { threshold: 0.55 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [variant])

  return (
    <section data-nexara="chapters" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'eight' || variant === 'scrolly' || variant === 'sticky' ? (
        <div className="grid gap-8 lg:grid-cols-[12rem_1fr]">
          <ol className="top-6 hidden h-fit lg:sticky lg:block">
            {rise.map(([index, title], i) => (
              <li key={title} className="py-1 text-sm">
                <button
                  type="button"
                  className={cn(focusRing, 'text-left', i === active ? 'text-nx-fg' : 'text-nx-muted')}
                  onClick={() => refs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                >
                  {index} {title}
                </button>
              </li>
            ))}
          </ol>
          <div className="space-y-10">
            {rise.map(([index, title, line], i) => (
              <article
                key={title}
                ref={(node) => {
                  refs.current[i] = node
                }}
                className="min-h-40 rounded-[1.4rem] border border-nx-border bg-nx-card p-6"
              >
                <p className="text-[11px] tracking-[0.18em] text-nx-accent uppercase">Chapter {index}</p>
                <h3 className="mt-3 font-serif text-4xl">{title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-nx-muted">{line}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'rail' || variant === 'numbered' ? (
        <ol className="space-y-5">
          {rise.map(([index, title, line]) => (
            <li key={title} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="font-mono text-sm text-nx-faint">{index}</span>
              <div>
                <p className="font-serif text-2xl">{title}</p>
                <p className="mt-1 text-sm text-nx-muted">{line}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'cards' ? (
        <div className="grid gap-3 md:grid-cols-2">
          {rise.map(([index, title, line]) => (
            <article key={title} className="rounded-[1.3rem] border border-nx-border p-5">
              <p className="text-xs text-nx-faint">{index}</p>
              <p className="mt-2 font-medium">{title}</p>
              <p className="mt-1 text-sm text-nx-muted">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'film' ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {rise.map(([index, title, line]) => (
            <article key={title} className="min-w-[16rem] rounded-[1.3rem] bg-[#0b1220] p-5 text-[#f6f1ea]">
              <p className="text-[#f3b4b0]">{index}</p>
              <p className="mt-3 font-serif text-3xl">{title}</p>
              <p className="mt-2 text-sm text-[#c9c2b8]">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'essay' || variant === 'manifesto' ? (
        <article className="max-w-2xl">
          <p className="text-[11px] tracking-[0.2em] text-nx-faint uppercase">A short book</p>
          <h3 className="mt-3 font-serif text-5xl">Heart care, considered.</h3>
          <div className="mt-8 space-y-5 text-sm leading-7 text-nx-muted">
            {rise.map(([, title, line]) => (
              <p key={title}>
                <strong className="text-nx-fg">{title}. </strong>
                {line}
              </p>
            ))}
          </div>
        </article>
      ) : null}

      {variant === 'split' ? (
        <div className="grid gap-6 md:grid-cols-2">
          <p className="font-serif text-5xl">Eight rooms, one walk.</p>
          <ol className="space-y-3 text-sm">
            {rise.slice(0, 4).map(([index, title, line]) => (
              <li key={title}>
                <span className="text-nx-faint">{index} </span>
                {title} — {line}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {variant === 'accordion' ? (
        <div className="divide-y divide-nx-border rounded-[1.4rem] border border-nx-border">
          {rise.map(([index, title, line], i) => (
            <details key={title} open={i === 0} className="px-5 py-4">
              <summary className="cursor-pointer font-medium">
                {index} {title}
              </summary>
              <p className="mt-2 text-sm text-nx-muted">{line}</p>
            </details>
          ))}
        </div>
      ) : null}

      {variant === 'lesson' ? (
        <div className="rounded-[1.5rem] border border-nx-border p-6">
          <p className="text-xs tracking-[0.16em] text-nx-accent uppercase">Academy lesson 04</p>
          <p className="mt-3 font-serif text-3xl">{rise[3]![1]}</p>
          <p className="mt-3 text-sm text-nx-muted">{rise[3]![2]}</p>
        </div>
      ) : null}
    </section>
  )
}
