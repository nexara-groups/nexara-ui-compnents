'use client'

import { cn } from '@/lib/utils.ts'
import { useLevel, usePersonality } from '@/themes/kit/level.ts'
import { useOpenMotion, type OpenOrigin } from '@/themes/kit/motion.ts'
import { useMenuDialog } from '@/themes/primitives.tsx'
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type DragEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

/* ---------------------------------------------------------------- icons */

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--nx-ease)' }}>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 shrink-0">
      <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.2 13.2L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/* ---------------------------------------------------------------- spinner */

/** Per-personality busy mark. Not a shared ring: each theme draws its own. Always carries a label. */
export function Spinner({ label = 'Loading', size = 20, className }: { label?: string; size?: number; className?: string }) {
  const personality = usePersonality()
  const level = useLevel()
  const moving = level !== 'off'
  const s = `${size}px`
  let mark: ReactNode
  if (personality === 'liquid') {
    mark = (
      <span
        className="nx-motion block"
        style={{ width: s, height: s, background: 'var(--nx-accent)', animation: moving ? `nx-liquid-spin ${level === 'rich' ? 1200 : 1800}ms var(--nx-ease) infinite` : undefined, borderRadius: '42% 58% 55% 45% / 48% 42% 58% 52%' }}
      />
    )
  } else if (personality === 'editorial') {
    mark = (
      <span className="flex items-end gap-0.5" style={{ height: s }}>
        {[0, 1, 2].map((bar) => (
          <span key={bar} className="nx-motion block w-1" style={{ height: '100%', background: bar === 1 ? 'var(--nx-mark)' : 'currentColor', transformOrigin: 'bottom', animation: moving ? `nx-flap 360ms linear ${bar * 90}ms infinite alternate` : undefined }} />
        ))}
      </span>
    )
  } else if (personality === 'tactile') {
    mark = (
      <span className="flex gap-1">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="nx-motion block" style={{ width: size / 3, height: size / 3, background: dot === 1 ? 'var(--nx-hardware)' : 'var(--nx-accent)', borderRadius: 3, animation: moving ? `nx-slam 520ms cubic-bezier(0.34, 1.7, 0.64, 1) ${dot * 120}ms infinite alternate` : undefined }} />
        ))}
      </span>
    )
  } else if (personality === 'technical') {
    mark = <span className="nx-motion block h-px origin-left" style={{ width: size * 2, background: 'var(--nx-mark)', animation: moving ? 'nx-scan 700ms steps(7) infinite' : undefined }} />
  } else {
    mark = <span className="nx-motion block rounded-full border" style={{ width: s, height: s, borderColor: 'var(--nx-mark)', borderTopColor: 'transparent', animation: moving ? 'nx-spin 900ms linear infinite' : undefined }} />
  }
  return (
    <span role="status" className={cn('inline-flex items-center', className)}>
      <span aria-hidden>{mark}</span>
      <span className="sr-only">{label}</span>
    </span>
  )
}

/* ---------------------------------------------------------------- skeleton */

/** Placeholder block. No shimmer by spec: liquid breathes radius and opacity, others hold. */
export function Skeleton({ className, radius, round = false }: { className?: string; radius?: number; round?: boolean }) {
  const personality = usePersonality()
  const level = useLevel()
  const breathe = personality === 'liquid' && level !== 'off'
  return (
    <span
      aria-hidden
      className={cn('nx-motion block', className)}
      style={{
        background: 'color-mix(in srgb, var(--nx-fg) 9%, var(--nx-surface))',
        borderRadius: round ? 999 : radius ?? 'calc(var(--nx-radius) * 0.6)',
        animation: breathe ? `nx-breathe ${level === 'rich' ? 1100 : 1600}ms ease-in-out infinite alternate` : undefined,
      }}
    />
  )
}

/** A labelled loading region so assistive tech hears one message, not every block. */
export function SkeletonGroup({ label = 'Loading', children, className }: { label?: string; children: ReactNode; className?: string }) {
  return (
    <div role="status" aria-label={label} aria-busy="true" className={className}>
      {children}
    </div>
  )
}

/* ---------------------------------------------------------------- menu core */

export type MenuItem = {
  label: string
  hint?: string
  danger?: boolean
  disabled?: boolean
  onSelect?: () => void
}

function MenuSurface({
  items,
  onClose,
  label,
  origin,
  style,
  className,
}: {
  items: MenuItem[]
  onClose: () => void
  label: string
  origin?: OpenOrigin | null
  style?: React.CSSProperties
  className?: string
}) {
  const ref = useOpenMotion<HTMLDivElement>(true, origin, 14)
  const level = useLevel()
  const personality = usePersonality()
  const [active, setActive] = useState(() => items.findIndex((item) => !item.disabled))
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    buttons.current[active]?.focus()
  }, [active])

  useEffect(() => {
    const onDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [onClose, ref])

  const move = (step: number) => {
    if (items.length === 0) return
    let next = active
    for (let i = 0; i < items.length; i += 1) {
      next = (next + step + items.length) % items.length
      if (!items[next].disabled) break
    }
    setActive(next)
  }

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setActive(items.findIndex((item) => !item.disabled))
    } else if (event.key === 'End') {
      event.preventDefault()
      for (let i = items.length - 1; i >= 0; i -= 1) {
        if (!items[i].disabled) {
          setActive(i)
          break
        }
      }
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      event.preventDefault()
      onClose()
    }
  }

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onKey}
      className={cn('z-50 min-w-52 p-1.5', className)}
      style={{
        background: 'var(--nx-surface)',
        color: 'var(--nx-fg)',
        border: '1px solid var(--nx-line)',
        borderRadius: personality === 'liquid' ? 14 : 'var(--nx-radius)',
        boxShadow: '0 24px 48px -24px rgb(0 0 0 / 0.55)',
        ...style,
      }}
    >
      {items.map((item, index) => (
        <button
          key={item.label}
          ref={(node) => {
            buttons.current[index] = node
          }}
          type="button"
          role="menuitem"
          tabIndex={index === active ? 0 : -1}
          disabled={item.disabled}
          onMouseEnter={() => !item.disabled && setActive(index)}
          onClick={() => {
            item.onSelect?.()
            onClose()
          }}
          className="relative flex min-h-11 w-full items-center justify-between gap-6 px-3 text-left text-sm outline-none disabled:opacity-50"
          style={{ color: item.danger ? 'var(--nx-danger)' : 'inherit', borderRadius: personality === 'liquid' ? (index === active ? 10 : 18) : 'calc(var(--nx-radius) * 0.6)', background: index === active ? 'color-mix(in srgb, var(--nx-accent) 16%, transparent)' : 'transparent', transition: level === 'off' ? 'none' : 'border-radius 240ms var(--nx-ease), background-color 120ms linear' }}
        >
          <span>{item.label}</span>
          {item.hint ? <span className="nx-mono text-xs" style={{ color: 'var(--nx-muted)' }}>{item.hint}</span> : null}
        </button>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- context menu */

/**
 * Wraps any row or card. Right-click, the Menu key, or Shift+F10 opens the menu at the
 * pointer or at the element. Focus returns to the wrapper on close.
 */
export function ContextMenu({ items, label = 'Actions', children, className }: { items: MenuItem[]; label?: string; children: ReactNode; className?: string }) {
  const [at, setAt] = useState<OpenOrigin | null>(null)
  const host = useRef<HTMLDivElement>(null)
  const close = useCallback(() => {
    setAt(null)
    host.current?.focus()
  }, [])
  const openAt = (x: number, y: number) => setAt({ x, y })
  return (
    <div
      ref={host}
      tabIndex={0}
      aria-haspopup="menu"
      aria-label={`${label}. Press Shift F10 for actions.`}
      className={cn('relative outline-none', className)}
      onContextMenu={(event) => {
        event.preventDefault()
        openAt(event.clientX, event.clientY)
      }}
      onKeyDown={(event) => {
        if ((event.shiftKey && event.key === 'F10') || event.key === 'ContextMenu') {
          event.preventDefault()
          const rect = event.currentTarget.getBoundingClientRect()
          openAt(rect.left + 24, rect.top + rect.height / 2)
        }
      }}
    >
      {children}
      {at ? (
        <MenuSurface
          items={items}
          label={label}
          onClose={close}
          origin={at}
          className="fixed"
          style={{ left: Math.min(at.x, (typeof window === 'undefined' ? 1200 : window.innerWidth) - 224), top: Math.min(at.y, (typeof window === 'undefined' ? 800 : window.innerHeight) - items.length * 46 - 16) }}
        />
      ) : null}
    </div>
  )
}

/** A visible trigger for the same menu, for touch and keyboard users. */
export function MenuTrigger({ items, label, children, align = 'end' }: { items: MenuItem[]; label: string; children: ReactNode; align?: 'start' | 'end' }) {
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const id = useId()
  const close = useCallback(() => {
    setOpen(false)
    button.current?.focus()
  }, [])
  return (
    <div className="relative inline-flex">
      <button
        ref={button}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
          }
        }}
        className="inline-flex min-h-11 min-w-11 items-center justify-center"
        style={{ borderRadius: 999, color: 'var(--nx-fg)' }}
      >
        {children}
      </button>
      {open ? (
        <div id={id} className={cn('absolute top-full z-50 mt-1', align === 'end' ? 'right-0' : 'left-0')}>
          <MenuSurface items={items} label={label} onClose={close} />
        </div>
      ) : null}
    </div>
  )
}

/* ---------------------------------------------------------------- split button */

export function SplitButton({ label, onClick, items, menuLabel = 'More options' }: { label: string; onClick: () => void; items: MenuItem[]; menuLabel?: string }) {
  const [open, setOpen] = useState(false)
  const [hot, setHot] = useState(false)
  const level = useLevel()
  const personality = usePersonality()
  const toggle = useRef<HTMLButtonElement>(null)
  const liquid = personality === 'liquid'
  const close = useCallback(() => {
    setOpen(false)
    toggle.current?.focus()
  }, [])
  const left = liquid && level !== 'off' && hot ? '12px' : 'var(--nx-radius)'
  return (
    <div className="relative inline-flex" role="group" aria-label={label}>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHot(true)}
        onMouseLeave={() => setHot(false)}
        onFocus={() => setHot(true)}
        onBlur={() => setHot(false)}
        className="relative inline-flex min-h-11 items-center gap-2 overflow-hidden pr-4 pl-4 text-[15px] font-medium"
        style={{ background: 'var(--nx-accent)', color: 'var(--nx-accent-fg)', borderRadius: `${left} 6px 6px ${left}`, transition: level === 'off' ? 'none' : 'border-radius 280ms var(--nx-ease)' }}
      >
        {liquid && level === 'rich' ? <span aria-hidden className="pointer-events-none absolute -bottom-4 left-1/4 h-8 w-10 rounded-full" style={{ background: 'var(--nx-mark)', filter: 'blur(10px)', opacity: hot ? 0.5 : 0, transform: hot ? 'translateY(-6px) scale(1.3)' : 'scale(0.6)', transition: 'transform 360ms var(--nx-ease), opacity 240ms ease' }} /> : null}
        <span className="relative">{label}</span>
      </button>
      <button
        ref={toggle}
        type="button"
        aria-label={menuLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
          }
        }}
        className="ml-0.5 inline-flex min-h-11 min-w-11 items-center justify-center"
        style={{ background: 'var(--nx-accent)', color: 'var(--nx-accent-fg)', borderRadius: '6px var(--nx-radius) var(--nx-radius) 6px' }}
      >
        <Chevron open={open} />
      </button>
      {open ? (
        <div className="absolute top-full right-0 z-50 mt-1.5">
          <MenuSurface items={items} label={menuLabel} onClose={close} />
        </div>
      ) : null}
    </div>
  )
}

/* ---------------------------------------------------------------- FAB */

export function Fab({ label, icon, onClick, visible = true, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; icon?: ReactNode; visible?: boolean }) {
  const level = useLevel()
  const personality = usePersonality()
  const [hot, setHot] = useState(false)
  const liquid = personality === 'liquid'
  return (
    <button
      type="button"
      {...props}
      onClick={onClick}
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      className={cn('fixed right-4 bottom-4 z-40 inline-flex min-h-14 items-center gap-2 overflow-hidden px-5 text-base font-medium', className)}
      style={{
        background: 'var(--nx-accent)',
        color: 'var(--nx-accent-fg)',
        borderRadius: liquid && hot && level !== 'off' ? 18 : 28,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(120%) scale(0.6)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        boxShadow: '0 18px 40px -16px rgb(0 0 0 / 0.6)',
        transition: level === 'off' ? 'none' : 'transform 420ms var(--nx-ease), opacity 200ms linear, border-radius 280ms var(--nx-ease)',
      }}
    >
      {liquid && level === 'rich' ? <span aria-hidden className="absolute -top-4 -right-3 h-10 w-10 rounded-full" style={{ background: 'var(--nx-mark)', opacity: 0.5, transform: hot ? 'translate(-8px, 6px)' : 'none', transition: 'transform 320ms var(--nx-ease)' }} /> : null}
      {icon ? <span aria-hidden className="relative">{icon}</span> : null}
      <span className="relative">{label}</span>
    </button>
  )
}

/* ---------------------------------------------------------------- combobox */

export type ComboOption = { value: string; label: string; hint?: string; group?: string }

export function Combobox({
  label,
  value,
  onChange,
  options,
  placeholder = 'Type to search',
  hint,
  emptyText = 'No match. Try another word.',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: ComboOption[]
  placeholder?: string
  hint?: string
  emptyText?: string
}) {
  const id = useId()
  const level = useLevel()
  const personality = usePersonality()
  const selected = options.find((option) => option.value === value)
  const [query, setQuery] = useState(selected?.label ?? '')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const list = useRef<HTMLUListElement>(null)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || q === selected?.label.toLowerCase()) return options
    return options.filter((option) => `${option.label} ${option.hint ?? ''} ${option.group ?? ''}`.toLowerCase().includes(q))
  }, [options, query, selected])

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const choose = (option: ComboOption) => {
    onChange(option.value)
    setQuery(option.label)
    setOpen(false)
  }
  const liquid = personality === 'liquid'
  return (
    <div className="relative text-sm">
      <label htmlFor={`${id}-input`} className="mb-1 block">{label}</label>
      <div
        className="flex min-h-11 items-center gap-2 px-3"
        style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: liquid && open && level !== 'off' ? 14 : 'var(--nx-radius)', outline: open ? '2px solid var(--nx-ring)' : 'none', outlineOffset: 2, transition: level === 'off' ? 'none' : 'border-radius 280ms var(--nx-ease)' }}
      >
        <SearchGlyph />
        <input
          id={`${id}-input`}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={open && filtered[active] ? `${id}-opt-${active}` : undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
          autoComplete="off"
          placeholder={placeholder}
          className="min-h-11 w-full bg-transparent text-base outline-none placeholder:opacity-70"
          style={{ color: 'var(--nx-fg)' }}
          value={query}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
            setOpen(true)
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setOpen(true)
              setActive((index) => Math.min(index + 1, filtered.length - 1))
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()
              setActive((index) => Math.max(index - 1, 0))
            } else if (event.key === 'Enter' && open && filtered[active]) {
              event.preventDefault()
              choose(filtered[active])
            } else if (event.key === 'Escape') {
              setOpen(false)
              setQuery(selected?.label ?? '')
            }
          }}
        />
      </div>
      {hint ? <p id={`${id}-hint`} className="mt-1 text-xs" style={{ color: 'var(--nx-muted)' }}>{hint}</p> : null}
      {open ? (
        <ComboList id={`${id}-list`} label={label} listRef={list}>
          {filtered.length === 0 ? <li className="px-3 py-3" style={{ color: 'var(--nx-muted)' }}>{emptyText}</li> : null}
          {filtered.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-opt-${index}`}
              data-index={index}
              role="option"
              aria-selected={option.value === value}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActive(index)}
              onClick={() => choose(option)}
              className="flex min-h-11 cursor-pointer items-center justify-between gap-4 px-3"
              style={{ borderRadius: liquid ? (index === active ? 10 : 18) : 'calc(var(--nx-radius) * 0.6)', background: index === active ? 'color-mix(in srgb, var(--nx-accent) 16%, transparent)' : 'transparent', transition: level === 'off' ? 'none' : 'border-radius 240ms var(--nx-ease)' }}
            >
              <span>
                {option.label}
                {option.value === value ? <span className="sr-only"> (selected)</span> : null}
              </span>
              {option.hint ? <span className="text-xs" style={{ color: 'var(--nx-muted)' }}>{option.hint}</span> : null}
            </li>
          ))}
        </ComboList>
      ) : null}
    </div>
  )
}

function ComboList({ id, label, children, listRef }: { id: string; label: string; children: ReactNode; listRef: React.RefObject<HTMLUListElement | null> }) {
  const ref = useOpenMotion<HTMLDivElement>(true, null, 14)
  return (
    <div ref={ref} className="absolute right-0 left-0 z-40 mt-1.5 p-1.5" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 14, boxShadow: '0 24px 48px -24px rgb(0 0 0 / 0.55)' }}>
      <ul ref={listRef} id={id} role="listbox" aria-label={label} className="max-h-64 overflow-auto">
        {children}
      </ul>
    </div>
  )
}

/* ---------------------------------------------------------------- command palette */

export type CommandItem = { id: string; label: string; hint?: string; keywords?: string; onSelect: () => void }
export type CommandGroup = { label: string; items: CommandItem[] }

/** Opens the palette on Ctrl K or Cmd K while `enabled` is true. Scoped by the caller. */
export function useCommandShortcut(onOpen: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onOpen, enabled])
}

export function CommandPalette({ open, onClose, groups, placeholder = 'Search or jump to', label = 'Command palette' }: { open: boolean; onClose: () => void; groups: CommandGroup[]; placeholder?: string; label?: string }) {
  if (!open) return null
  return <PaletteBody onClose={onClose} groups={groups} placeholder={placeholder} label={label} />
}

function PaletteBody({ onClose, groups, placeholder, label }: { onClose: () => void; groups: CommandGroup[]; placeholder: string; label: string }) {
  const { ref: trap, titleId } = useMenuDialog(true, onClose)
  const motion = useOpenMotion<HTMLDivElement>(true, null, 18)
  const level = useLevel()
  const personality = usePersonality()
  const id = useId()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const flat = useMemo(() => {
    const q = query.trim().toLowerCase()
    return groups
      .map((group) => ({ ...group, items: group.items.filter((item) => !q || `${item.label} ${item.keywords ?? ''} ${item.hint ?? ''}`.toLowerCase().includes(q)) }))
      .filter((group) => group.items.length > 0)
  }, [groups, query])
  const all = flat.flatMap((group) => group.items)
  const offsets = flat.map((_, groupIndex) => flat.slice(0, groupIndex).reduce((sum, group) => sum + group.items.length, 0))
  const run = (item: CommandItem | undefined) => {
    if (!item) return
    onClose()
    item.onSelect()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-[12vh]" style={{ background: 'color-mix(in srgb, var(--nx-bg) 72%, transparent)' }} onPointerDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={trap} role="dialog" aria-modal="true" aria-labelledby={titleId} className="w-full max-w-xl">
        <div
          ref={motion}
          className="overflow-hidden"
          style={{ background: 'var(--nx-surface)', color: 'var(--nx-fg)', border: '1px solid var(--nx-line)', borderRadius: personality === 'liquid' ? 18 : 'var(--nx-radius)', boxShadow: '0 40px 80px -32px rgb(0 0 0 / 0.7)' }}
        >
          <h2 id={titleId} className="sr-only">{label}</h2>
          <div className="flex items-center gap-3 px-4" style={{ borderBottom: '1px solid var(--nx-line)' }}>
            <SearchGlyph />
            <input
              role="combobox"
              aria-expanded="true"
              aria-controls={`${id}-list`}
              aria-activedescendant={all[active] ? `${id}-${all[active].id}` : undefined}
              aria-label={placeholder}
              autoComplete="off"
              className="min-h-14 w-full bg-transparent text-base outline-none placeholder:opacity-70"
              placeholder={placeholder}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActive(0)
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  setActive((value) => Math.min(value + 1, all.length - 1))
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  setActive((value) => Math.max(value - 1, 0))
                } else if (event.key === 'Enter') {
                  event.preventDefault()
                  run(all[active])
                }
              }}
            />
            <kbd className="nx-mono hidden rounded-md px-1.5 py-0.5 text-[11px] sm:inline" style={{ border: '1px solid var(--nx-line)', color: 'var(--nx-muted)' }}>Esc</kbd>
          </div>
          <ul id={`${id}-list`} role="listbox" aria-label="Results" className="max-h-[50vh] overflow-auto p-2">
            {all.length === 0 ? <li className="px-3 py-6 text-center text-sm" style={{ color: 'var(--nx-muted)' }}>Nothing found for “{query}”.</li> : null}
            {flat.map((group, groupIndex) => (
              <li key={group.label} role="presentation">
                <p className="px-3 pt-3 pb-1 text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>{group.label}</p>
                <ul role="group" aria-label={group.label}>
                  {group.items.map((item, itemIndex) => {
                    const mine = offsets[groupIndex] + itemIndex
                    const on = mine === active
                    return (
                      <li
                        key={item.id}
                        id={`${id}-${item.id}`}
                        role="option"
                        aria-selected={on}
                        onMouseEnter={() => setActive(mine)}
                        onClick={() => run(item)}
                        className="flex min-h-11 cursor-pointer items-center justify-between gap-4 px-3 text-sm"
                        style={{ borderRadius: personality === 'liquid' ? (on ? 12 : 22) : 'calc(var(--nx-radius) * 0.6)', background: on ? 'color-mix(in srgb, var(--nx-accent) 16%, transparent)' : 'transparent', transition: level === 'off' ? 'none' : 'border-radius 260ms var(--nx-ease)' }}
                      >
                        <span>{item.label}</span>
                        {item.hint ? <span className="text-xs" style={{ color: 'var(--nx-muted)' }}>{item.hint}</span> : null}
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4 px-4 py-2.5 text-xs" style={{ borderTop: '1px solid var(--nx-line)', color: 'var(--nx-muted)' }}>
            <span>↑ ↓ to move</span>
            <span>Enter to open</span>
            <span>Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- dropzone */

export type DroppedFile = { name: string; size: number; type: string }

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * Drag-and-drop frame around a real file input. The input stays in the tab order, so
 * keyboard and screen-reader users get the native picker. Drag-over grows the inner disc.
 */
export function Dropzone({
  label,
  hint,
  accept,
  multiple = true,
  files,
  onFiles,
  maxBytes = 10 * 1024 * 1024,
}: {
  label: string
  hint?: string
  accept?: string
  multiple?: boolean
  files: DroppedFile[]
  onFiles: (files: DroppedFile[]) => void
  maxBytes?: number
}) {
  const id = useId()
  const level = useLevel()
  const personality = usePersonality()
  const [over, setOver] = useState(false)
  const [error, setError] = useState('')
  const liquid = personality === 'liquid'
  const take = (list: FileList | null) => {
    if (!list) return
    const next = [...list].map((file) => ({ name: file.name, size: file.size, type: file.type }))
    const big = next.find((file) => file.size > maxBytes)
    if (big) {
      setError(`${big.name} is over ${formatSize(maxBytes)}. Choose a smaller file.`)
      return
    }
    setError('')
    onFiles(multiple ? [...files, ...next] : next.slice(0, 1))
  }
  const onDrop = (event: DragEvent) => {
    event.preventDefault()
    setOver(false)
    take(event.dataTransfer.files)
  }
  return (
    <div className="text-sm">
      <p id={`${id}-label`} className="mb-1">{label}</p>
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className="relative flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden px-4 py-6 text-center focus-within:outline-2 focus-within:outline-offset-2"
        style={{ border: `1.5px dashed ${over ? 'var(--nx-accent)' : 'var(--nx-line)'}`, background: 'var(--nx-surface)', borderRadius: liquid && over && level !== 'off' ? 14 : 'var(--nx-radius)', outlineColor: 'var(--nx-ring)', transition: level === 'off' ? 'none' : 'border-radius 320ms var(--nx-ease), border-color 120ms linear' }}
      >
        {liquid ? (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 rounded-full"
            style={{ background: 'color-mix(in srgb, var(--nx-accent) 22%, transparent)', transform: `translate(-50%, -50%) scale(${over && level !== 'off' ? 4.2 : 1})`, transition: level === 'rich' ? 'transform 520ms var(--nx-ease)' : 'none' }}
          />
        ) : null}
        <svg aria-hidden viewBox="0 0 24 24" className="relative h-7 w-7">
          <path d="M12 16V5m0 0l-4 4m4-4l4 4M5 19h14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="relative font-medium">{over ? 'Drop to attach' : 'Drop files here or choose'}</span>
        {hint ? <span className="relative text-xs" style={{ color: 'var(--nx-muted)' }}>{hint}</span> : null}
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          aria-labelledby={`${id}-label`}
          aria-describedby={error ? `${id}-error` : undefined}
          className="absolute h-px w-px opacity-0"
          onChange={(event) => take(event.target.files)}
        />
      </label>
      {error ? <p id={`${id}-error`} role="alert" className="mt-1 text-xs">{error}</p> : null}
      {files.length > 0 ? (
        <ul className="mt-3 space-y-2" aria-label="Attached files">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex min-h-11 items-center justify-between gap-3 px-3" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'calc(var(--nx-radius) * 0.7)' }}>
              <span className="min-w-0 truncate">{file.name}</span>
              <span className="flex items-center gap-2">
                <span className="nx-mono text-xs" style={{ color: 'var(--nx-muted)' }}>{formatSize(file.size)}</span>
                <button type="button" className="min-h-11 px-2 text-xs underline" onClick={() => onFiles(files.filter((_, at) => at !== index))} aria-label={`Remove ${file.name}`}>
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

/* ---------------------------------------------------------------- calendar */

const WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const WEEK_LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function sameDay(a: Date | null, b: Date | null) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function addMonths(date: Date, months: number) {
  const next = new Date(date)
  const day = next.getDate()
  next.setDate(1)
  next.setMonth(next.getMonth() + months)
  const last = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()
  next.setDate(Math.min(day, last))
  return next
}

/**
 * Month grid with full keyboard support: arrows move a day or a week, Home and End go to
 * the week edges, PageUp and PageDown change month, Enter or Space selects. Roving tabindex.
 */
export function CalendarGrid({
  label,
  value,
  onChange,
  today: todayProp,
  isDisabled,
  dayNote,
}: {
  label: string
  value: Date | null
  onChange: (date: Date) => void
  today?: Date
  isDisabled?: (date: Date) => boolean
  dayNote?: (date: Date) => string | undefined
}) {
  const level = useLevel()
  const personality = usePersonality()
  const [today] = useState(() => todayProp ?? new Date())
  const [focus, setFocus] = useState<Date>(() => value ?? today)
  const [month, setMonth] = useState(() => new Date((value ?? today).getFullYear(), (value ?? today).getMonth(), 1))
  const grid = useRef<HTMLTableElement>(null)
  const [keyed, setKeyed] = useState(false)
  const labelId = useId()

  useEffect(() => {
    if (!keyed) return
    grid.current?.querySelector<HTMLElement>('[data-focus="true"]')?.focus()
  }, [focus, keyed])

  const moveTo = (date: Date) => {
    setFocus(date)
    if (date.getMonth() !== month.getMonth() || date.getFullYear() !== month.getFullYear()) setMonth(new Date(date.getFullYear(), date.getMonth(), 1))
  }

  const offset = (month.getDay() + 6) % 7
  const start = addDays(month, -offset)
  const weeks = Array.from({ length: 6 }, (_, week) => Array.from({ length: 7 }, (_, day) => addDays(start, week * 7 + day)))
  const title = month.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const liquid = personality === 'liquid'

  const onKey = (event: KeyboardEvent) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focus, -1),
      ArrowRight: () => addDays(focus, 1),
      ArrowUp: () => addDays(focus, -7),
      ArrowDown: () => addDays(focus, 7),
      Home: () => addDays(focus, -((focus.getDay() + 6) % 7)),
      End: () => addDays(focus, 6 - ((focus.getDay() + 6) % 7)),
      PageUp: () => addMonths(focus, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(focus, event.shiftKey ? 12 : 1),
    }
    if (map[event.key]) {
      event.preventDefault()
      setKeyed(true)
      moveTo(map[event.key]())
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!isDisabled?.(focus)) onChange(focus)
    }
  }

  return (
    <div className="text-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p id={labelId} className="nx-display text-lg" aria-live="polite">
          <span className="sr-only">{label}, </span>
          {title}
        </p>
        <div className="flex gap-1">
          <button type="button" aria-label="Previous month" className="inline-flex min-h-11 min-w-11 items-center justify-center" style={{ borderRadius: 999, border: '1px solid var(--nx-line)' }} onClick={() => moveTo(addMonths(focus, -1))}>
            <span aria-hidden>‹</span>
          </button>
          <button type="button" aria-label="Next month" className="inline-flex min-h-11 min-w-11 items-center justify-center" style={{ borderRadius: 999, border: '1px solid var(--nx-line)' }} onClick={() => moveTo(addMonths(focus, 1))}>
            <span aria-hidden>›</span>
          </button>
        </div>
      </div>
      <table ref={grid} role="grid" aria-labelledby={labelId} className="w-full table-fixed border-separate" style={{ borderSpacing: 4 }} onKeyDown={onKey}>
        <thead>
          <tr>
            {WEEK.map((day, index) => (
              <th key={day} scope="col" abbr={WEEK_LONG[index]} className="pb-1 text-xs font-normal" style={{ color: 'var(--nx-muted)' }}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].toISOString()}>
              {week.map((date) => {
                const inMonth = date.getMonth() === month.getMonth()
                const selected = sameDay(date, value)
                const focused = sameDay(date, focus)
                const disabled = isDisabled?.(date) ?? false
                const isToday = sameDay(date, today)
                const note = dayNote?.(date)
                return (
                  <td key={date.toISOString()} role="gridcell" aria-selected={selected} className="p-0">
                    <button
                      type="button"
                      tabIndex={focused ? 0 : -1}
                      data-focus={focused}
                      disabled={disabled}
                      aria-label={`${date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}${isToday ? ', today' : ''}${note ? `, ${note}` : ''}${disabled ? ', unavailable' : ''}`}
                      aria-current={isToday ? 'date' : undefined}
                      onClick={() => {
                        setFocus(date)
                        onChange(date)
                      }}
                      onFocus={() => setFocus(date)}
                      className="relative flex aspect-square min-h-11 w-full flex-col items-center justify-center text-sm disabled:cursor-not-allowed"
                      style={{
                        color: selected ? 'var(--nx-accent-fg)' : inMonth ? 'var(--nx-fg)' : 'var(--nx-muted)',
                        opacity: disabled ? 0.38 : inMonth ? 1 : 0.55,
                        background: selected ? 'var(--nx-accent)' : 'transparent',
                        border: isToday && !selected ? '1px solid var(--nx-accent)' : '1px solid transparent',
                        borderRadius: liquid ? (selected ? 14 : 999) : 'calc(var(--nx-radius) * 0.6)',
                        textDecoration: disabled ? 'line-through' : undefined,
                        transition: level === 'off' ? 'none' : 'border-radius 300ms var(--nx-ease), background-color 160ms linear',
                      }}
                    >
                      <span className="nx-mono">{date.getDate()}</span>
                      {note && !disabled ? <span aria-hidden className="absolute bottom-1.5 h-1 w-1 rounded-full" style={{ background: selected ? 'var(--nx-accent-fg)' : 'var(--nx-mark)' }} /> : null}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs" style={{ color: 'var(--nx-muted)' }}>Arrow keys move by day and week. Page Up and Page Down change month.</p>
    </div>
  )
}
