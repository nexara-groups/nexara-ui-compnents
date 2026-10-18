'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { useState, type ReactNode } from 'react'
import { MediaFrame, media } from '@/lib/media.tsx'
import { cn, focusRing } from '@/lib/utils.ts'

const wells = [media.journal, media.doors.consult, media.venues.studio]

const VARIANTS = [
  'plus',
  'chevron',
  'bordered',
  'separated',
  'flush',
  'numbered',
  'icon',
  'media',
  'faq',
  'timeline',
  'height-morph',
  'path-plus',
  'kinetic-faq',
  'shader-row',
] as const

export type AccordionVariant = (typeof VARIANTS)[number]
export type AccordionItem = { id: string; title: ReactNode; content: ReactNode }

export interface AccordionProps {
  items: AccordionItem[]
  variant?: AccordionVariant
  type?: 'single' | 'multiple'
  className?: string
}

/**
 * Accordion
 * Ten disclosure constructions. Copy this file plus `src/lib/utils.ts`.
 */
function AccordionCore({ items, variant = 'plus', type = 'single', className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>([items[0]?.id ?? ''])

  function toggle(id: string) {
    setOpen((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : type === 'single' ? [id] : [...current, id]
      return next
    })
  }

  return (
    <div data-nexara="accordion" data-variant={variant} className={cn('w-full', variant === 'separated' && 'space-y-3', className)}>
      {items.map((item, index) => {
        const expanded = open.includes(item.id)
        return (
          <div
            key={item.id}
            className={cn(
              variant === 'bordered' && 'border-b border-nx-border',
              variant === 'separated' && 'rounded-2xl border border-nx-border bg-nx-card px-4',
              variant === 'flush' && 'border-b border-nx-border',
              variant === 'timeline' && 'relative border-l border-nx-border pl-5',
            )}
          >
            {variant === 'timeline' ? <span className="absolute top-4 -left-1 size-2 rounded-full bg-nx-accent" /> : null}
            <h3>
              <button
                type="button"
                id={`nexara-acc-btn-${item.id}`}
                aria-expanded={expanded}
                aria-controls={`nexara-acc-${item.id}`}
                className={cn(focusRing, 'flex min-h-11 w-full items-center gap-3 py-3 text-left text-sm font-medium')}
                onClick={() => toggle(item.id)}
              >
                {variant === 'numbered' ? <span className="font-mono text-xs text-nx-muted">{String(index + 1).padStart(2, '0')}</span> : null}
                {variant === 'icon' ? <span className="size-8 rounded-lg bg-nx-soft" aria-hidden="true" /> : null}
                {variant === 'media' ? (
                  <MediaFrame src={wells[index % wells.length]} alt="" className="h-12 w-16 rounded-lg" grain={false} />
                ) : null}
                <span className="flex-1">{variant === 'faq' ? `Q. ${item.title}` : item.title}</span>
                <span aria-hidden="true" className="text-nx-muted">
                  {variant === 'chevron' ? (expanded ? '⌃' : '⌄') : expanded ? '−' : '+'}
                </span>
              </button>
            </h3>
            {expanded ? (
              <div id={`nexara-acc-${item.id}`} className="pb-4 text-sm leading-6 text-nx-muted">
                {item.content}
              </div>
            ) : (
              <div id={`nexara-acc-${item.id}`} hidden />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function Accordion(props: AccordionProps) {
  if (isWowVariant('accordion', props.variant)) {
    return (
      <WowSignature
        family="accordion"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <AccordionCore {...props} />
}
