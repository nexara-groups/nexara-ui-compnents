'use client'

import { useMemo, useState } from 'react'
import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'default',
  'pages',
  'jump',
  'create',
  'search',
  'patients',
  'jobs',
  'athletes',
  'settings',
  'recent',
  'empty',
  'help',
] as const

export type CommandPaletteVariant = (typeof VARIANTS)[number]

export interface CommandPaletteProps {
  variant?: CommandPaletteVariant
  className?: string
}

const commands = [
  { id: 'overview', group: 'Pages', label: 'Open overview' },
  { id: 'lead', group: 'Create', label: 'New lead · Wren Build' },
  { id: 'patient', group: 'Care', label: 'Find patient · Ravi Teja' },
  { id: 'job', group: 'Plant', label: 'Open job · VRF Bay 04' },
  { id: 'athlete', group: 'Season', label: 'Jump to Ananya Rao' },
  { id: 'theme', group: 'Settings', label: 'Toggle theme' },
  { id: 'help', group: 'Help', label: 'Keyboard shortcuts' },
]

/**
 * Command palette
 * Twelve jump menus for Agency OS and industry desks.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function CommandPalette({ variant = 'default', className }: CommandPaletteProps) {
  const [query, setQuery] = useState(variant === 'empty' ? 'xyzzy' : '')
  const [active, setActive] = useState(0)
  const list = useMemo(() => {
    const scoped = commands.filter((item) => {
      if (variant === 'pages') return item.group === 'Pages'
      if (variant === 'create') return item.group === 'Create'
      if (variant === 'patients') return item.group === 'Care'
      if (variant === 'jobs') return item.group === 'Plant'
      if (variant === 'athletes') return item.group === 'Season'
      if (variant === 'settings') return item.group === 'Settings'
      if (variant === 'help') return item.group === 'Help'
      if (variant === 'recent') return item.group !== 'Help'
      return true
    })
    return scoped.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
  }, [query, variant])

  return (
    <div data-nexara="command-palette" data-variant={variant} className={cn('overflow-hidden rounded-[1.3rem] border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]', className)}>
      <div className="border-b border-nx-border px-3 py-2">
        <input
          className={cn(focusRing, 'h-10 w-full bg-transparent text-sm')}
          role="combobox"
          aria-expanded="true"
          aria-controls={`nexara-command-list-${variant}`}
          placeholder={variant === 'search' || variant === 'jump' ? 'Jump to a room' : 'Type a command'}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setActive((value) => Math.min(list.length - 1, value + 1))
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActive((value) => Math.max(0, value - 1))
            }
          }}
          aria-label="Command"
        />
      </div>
      <ul id={`nexara-command-list-${variant}`} className="max-h-64 overflow-auto p-1" role="listbox">
        {list.length === 0 ? (
          <li className="px-3 py-6 text-center text-sm text-nx-muted">Nothing matches. Try a person or a job.</li>
        ) : (
          list.map((item, index) => (
            <li
              key={item.id}
              role="option"
              aria-selected={index === active}
              className={cn('flex items-center justify-between rounded-lg px-3 py-2 text-sm', index === active && 'bg-nx-soft')}
            >
              <span>{item.label}</span>
              <span className="text-[11px] text-nx-muted">{item.group}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
