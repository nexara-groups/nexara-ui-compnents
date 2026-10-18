'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'underline',
  'pill',
  'segmented',
  'vertical',
  'icon',
  'card',
  'folder',
  'minimal',
  'badge',
  'rail',
  'layout-morph',
  'liquid-ink',
  'orbit-pills',
  'scramble-label',
] as const

export type TabsVariant = (typeof VARIANTS)[number]

export type TabItem = { id: string; label: ReactNode; panel: ReactNode; count?: number }

export interface TabsProps {
  items: TabItem[]
  variant?: TabsVariant
  defaultValue?: string
  className?: string
}

/**
 * Tabs
 * Ten tab anatomies with APG keyboard and labelled panels.
 * Copy this file plus `src/lib/utils.ts`.
 */
function TabsCore({ items, variant = 'underline', defaultValue, className }: TabsProps) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.id ?? '')
  const current = items.find((item) => item.id === value) ?? items[0]
  const vertical = variant === 'vertical' || variant === 'rail'
  const uid = useId()

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = vertical ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const index = items.findIndex((item) => item.id === value)
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? index + 1 : index - 1
    const item = items[(next + items.length) % items.length]
    if (!item) return
    setValue(item.id)
    document.getElementById(`${uid}-${item.id}`)?.focus()
  }

  return (
    <div data-nexara="tabs" data-variant={variant} className={cn(vertical && 'grid gap-4 md:grid-cols-[10rem_1fr]', className)}>
      <div role="tablist" aria-orientation={vertical ? 'vertical' : 'horizontal'} className={cn(listClass(variant), !vertical && 'max-w-full overflow-x-auto')} onKeyDown={onKeyDown}>
        {items.map((item) => {
          const selected = item.id === value
          return (
            <button
              key={item.id}
              id={`${uid}-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={cn(focusRing, tabClass(variant, selected))}
              onClick={() => setValue(item.id)}
            >
              {variant === 'icon' ? <span aria-hidden="true" className="size-2 rounded-full bg-current" /> : null}
              {item.label}
              {variant === 'badge' && item.count != null ? (
                <span className="ml-1 rounded-full bg-nx-soft px-1.5 text-[10px] text-nx-accent">{item.count}</span>
              ) : null}
            </button>
          )
        })}
      </div>
      {current ? (
        <div
          role="tabpanel"
          id={`${uid}-panel-${current.id}`}
          aria-labelledby={`${uid}-${current.id}`}
          className="min-h-16 text-sm leading-6 text-nx-muted"
        >
          {current.panel}
        </div>
      ) : null}
    </div>
  )
}

function listClass(variant: TabsVariant) {
  if (variant === 'pill' || variant === 'segmented') return 'inline-flex gap-1 rounded-full bg-nx-elevated p-1'
  if (variant === 'card') return 'flex gap-2'
  if (variant === 'folder') return 'flex items-end gap-1 border-b border-nx-border'
  if (variant === 'vertical') return 'flex flex-col gap-1'
  if (variant === 'rail') return 'flex flex-col gap-1 border-l border-nx-border pl-2'
  if (variant === 'minimal') return 'flex gap-5'
  return 'flex gap-4 border-b border-nx-border'
}

function tabClass(variant: TabsVariant, selected: boolean) {
  const base = 'inline-flex min-h-11 items-center gap-2 px-3 text-sm'
  if (variant === 'underline') return cn(base, 'border-b-2 -mb-px', selected ? 'border-nx-fg text-nx-fg' : 'border-transparent text-nx-muted')
  if (variant === 'pill' || variant === 'segmented') return cn(base, 'rounded-full', selected ? 'bg-nx-card text-nx-fg shadow-[var(--nx-shadow)]' : 'text-nx-muted')
  if (variant === 'card') return cn(base, 'rounded-xl border', selected ? 'border-nx-fg bg-nx-card' : 'border-nx-border text-nx-muted')
  if (variant === 'folder') return cn(base, 'rounded-t-lg border border-b-0', selected ? 'border-nx-border bg-nx-card' : 'border-transparent text-nx-muted')
  if (variant === 'rail') return cn(base, 'rounded-none border-l-2', selected ? 'border-nx-accent text-nx-fg' : 'border-transparent text-nx-muted')
  if (variant === 'vertical') return cn(base, 'justify-start rounded-xl', selected ? 'bg-nx-soft text-nx-fg' : 'text-nx-muted')
  return cn(base, selected ? 'text-nx-fg' : 'text-nx-muted')
}

export function Tabs(props: TabsProps) {
  if (isWowVariant('tabs', props.variant)) {
    return (
      <WowSignature
        family="tabs"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <TabsCore {...props} />
}
