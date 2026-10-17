'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'written',
  'three',
  'timeline',
  'numbered',
  'rail',
  'cards',
  'brief',
  'weekly',
  'handover',
  'rhythm',
  'checklist',
  'filmstrip',
] as const

export type ProcessVariant = (typeof VARIANTS)[number]

export interface ProcessProps {
  variant?: ProcessVariant
  className?: string
}

const nexara = [
  ['Brief', 'You send the room, the deadline, and the people who decide.'],
  ['Weekly demo', 'Every Friday a named lead shows the next cut.'],
  ['Named lead', 'One engineer owns the thread. No rotation.'],
  ['Handover', 'Repo, tokens, and a walkthrough. Then we stay on call.'],
]

const rise = [
  ['Listen', 'A cardiologist reads the file before the first chair.'],
  ['Map', 'EECP, diagnostics, and pharmacy sit on one floor.'],
  ['Stay', 'Follow-up is booked before you leave the desk.'],
]

/**
 * Process
 * Twelve step constructions: written Nexara process, Rise three-step rhythm.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Process({ variant = 'written', className }: ProcessProps) {
  return (
    <section data-nexara="process" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'written' ? (
        <div className="max-w-2xl space-y-8">
          {nexara.map(([title, line], index) => (
            <article key={title}>
              <p className="text-[11px] tracking-[0.18em] text-nx-faint uppercase">Step {index + 1}</p>
              <h3 className="mt-2 font-serif text-3xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-nx-muted">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'three' || variant === 'rhythm' ? (
        <ol className="grid gap-6 md:grid-cols-3">
          {rise.map(([title, line], index) => (
            <li key={title}>
              <p className="font-serif text-5xl text-nx-faint">{index + 1}</p>
              <p className="mt-3 font-medium">{title}</p>
              <p className="mt-2 text-sm text-nx-muted">{line}</p>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'timeline' || variant === 'rail' ? (
        <ol className="relative space-y-6 border-l border-nx-line pl-6">
          {nexara.map(([title, line]) => (
            <li key={title} className="relative">
              <span className="absolute top-1.5 -left-[1.54rem] size-2.5 rounded-full bg-nx-fg" />
              <p className="font-medium">{title}</p>
              <p className="mt-1 text-sm text-nx-muted">{line}</p>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'numbered' ? (
        <ol className="space-y-4">
          {nexara.map(([title, line], index) => (
            <li key={title} className="grid grid-cols-[3rem_1fr] gap-4">
              <span className="font-mono text-sm text-nx-accent">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-nx-muted">{line}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'cards' ? (
        <div className="grid gap-3 md:grid-cols-4">
          {nexara.map(([title, line]) => (
            <article key={title} className="rounded-[1.3rem] border border-nx-border p-4">
              <p className="font-serif text-2xl">{title}</p>
              <p className="mt-2 text-sm text-nx-muted">{line}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'brief' ? (
        <article className="rounded-[1.5rem] bg-[#111113] p-8 text-white">
          <p className="text-[#c8ff4d]">The brief</p>
          <p className="mt-3 font-serif text-4xl">Send the room. We answer with a named lead.</p>
          <p className="mt-4 max-w-lg text-white/65">{nexara[0]![1]}</p>
        </article>
      ) : null}

      {variant === 'weekly' ? (
        <div className="rounded-[1.4rem] border border-nx-border p-6">
          <p className="text-xs tracking-[0.16em] text-nx-faint uppercase">Friday 16:00 IST</p>
          <p className="mt-2 font-serif text-3xl">Weekly demo</p>
          <p className="mt-2 text-sm text-nx-muted">{nexara[1]![1]}</p>
        </div>
      ) : null}

      {variant === 'handover' ? (
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="font-serif text-4xl">Handover</h3>
            <p className="mt-3 text-sm text-nx-muted">{nexara[3]![1]}</p>
          </div>
          <ul className="space-y-2 text-sm">
            {['Repository', 'Token sheet', 'Walkthrough cut', 'On-call week'].map((item) => (
              <li key={item} className="rounded-xl border border-nx-border px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {variant === 'checklist' ? (
        <ul className="space-y-3">
          {nexara.map(([title, line]) => (
            <li key={title} className="flex gap-3">
              <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-nx-soft text-[10px] text-nx-accent">✓</span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-nx-muted">{line}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'filmstrip' ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {nexara.map(([title, line], index) => (
            <article key={title} className="min-w-[14rem] rounded-[1.3rem] border border-nx-border p-4">
              <p className="text-xs text-nx-faint">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-2 font-medium">{title}</p>
              <p className="mt-2 text-sm text-nx-muted">{line}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
