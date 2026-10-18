'use client'

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { MediaFrame, media } from '@/lib/media.tsx'
import { cn } from '@/lib/utils.ts'

export interface NavItem {
  label: string
  href: string
  active?: boolean
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const variantClass = {
  floating: 'rounded-full border border-nx-border bg-nx-glass/90 shadow-[var(--nx-shadow)]',
  dock: 'rounded-[1.6rem] border border-nx-border bg-nx-glass/95 shadow-[var(--nx-shadow)]',
  sidebar: 'h-full flex-col rounded-3xl border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]',
  overlay: 'rounded-full border border-nx-border bg-nx-glass/90',
  command: 'rounded-2xl border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]',
  transport: 'rounded-2xl border border-nx-border bg-nx-card',
  mega: 'rounded-none border-x-0 border-t-0 border-b border-nx-border bg-nx-bg',
  'app-bar': 'h-14 rounded-none border-b border-nx-border bg-nx-card',
  announcement: 'rounded-none border-0 bg-transparent',
  breadcrumb: 'rounded-none border-0 bg-transparent',
  segmented: 'rounded-none border-0 bg-transparent',
  wordmark: 'rounded-none border-0 bg-transparent',
} as const

export interface FloatingNavbarProps {
  logo?: ReactNode
  items: NavItem[]
  actions?: ReactNode
  variant?: keyof typeof variantClass
  shrinkOnScroll?: boolean
  contained?: boolean
  blur?: boolean
  className?: string
  barClassName?: string
  menuClassName?: string
  scrollRoot?: RefObject<HTMLElement | null> | null
  menuLabel?: string
  label?: string
}

/**
 * FloatingNavbar
 * Twelve navigation products: pill, dock, sidebar, overlay, command field,
 * transport bar, mega menu, app bar, announcement, breadcrumb, segmented control, wordmark.
 */
export function FloatingNavbar({
  logo,
  items,
  actions,
  variant = 'floating',
  shrinkOnScroll = true,
  contained = false,
  blur = true,
  className,
  barClassName,
  menuClassName,
  scrollRoot,
  menuLabel = 'Menu',
  label = 'Primary',
}: FloatingNavbarProps) {
  const [shrunk, setShrunk] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const desktop = contained ? 'hidden @md:flex' : 'hidden md:flex'
  const mobileOnly = contained ? '@md:hidden' : 'md:hidden'

  useEffect(() => {
    if (!shrinkOnScroll || variant !== 'floating') return
    const target: HTMLElement | Window | null = scrollRoot ? scrollRoot.current : window
    if (!target) return
    const read = () => setShrunk((target instanceof Window ? target.scrollY : target.scrollTop) > 12)
    read()
    target.addEventListener('scroll', read, { passive: true })
    return () => target.removeEventListener('scroll', read)
  }, [scrollRoot, shrinkOnScroll, variant])

  useEffect(() => {
    if (variant !== 'overlay' || !open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = overlayRef.current
    const nodes = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    nodes()[0]?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      const list = nodes()
      const first = list[0]
      const last = list[list.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, variant])

  function links(listClass: string, closeOnSelect = false) {
    return (
      <ul className={listClass}>
        {items.map((item) => (
          <li key={item.href + item.label}>
            <a
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'inline-flex items-center text-nx-muted hover:text-nx-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nx-ring',
                variant === 'dock' && 'h-auto flex-col gap-1 px-3 py-1 text-[10px] motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110',
                variant === 'sidebar' && 'h-11 w-full justify-start rounded-xl px-3 hover:bg-nx-soft',
                variant === 'overlay' && 'font-serif text-5xl text-nx-fg',
                variant === 'segmented' && 'h-9 rounded-full px-3',
                item.active && variant === 'segmented' && 'bg-nx-fg text-nx-bg',
                item.active && variant !== 'segmented' && 'text-nx-fg',
              )}
              onClick={(event) => {
                item.onClick?.(event)
                if (variant === 'mega') {
                  event.preventDefault()
                  setMega((current) => (current === item.label ? null : item.label))
                  return
                }
                if (!closeOnSelect) return
                setOpen(false)
                toggleRef.current?.focus()
              }}
            >
              {variant === 'dock' ? <span aria-hidden="true" className="size-5 rounded-md bg-current/80" /> : null}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  const position =
    variant === 'dock' || variant === 'transport'
      ? contained
        ? 'absolute inset-x-0 bottom-0 z-30'
        : 'fixed inset-x-0 bottom-3 z-40 flex justify-center'
      : variant === 'sidebar'
        ? contained
          ? 'absolute inset-y-3 left-3 z-30 w-52'
          : 'fixed top-4 bottom-4 left-4 z-40 w-56'
        : variant === 'mega' || variant === 'app-bar' || variant === 'announcement'
          ? contained
            ? 'absolute inset-x-0 top-0 z-30'
            : 'fixed inset-x-0 top-0 z-40'
          : contained
            ? 'sticky top-3 z-30'
            : 'fixed top-4 left-1/2 z-40 w-[min(72rem,calc(100%-1.5rem))] -translate-x-1/2'

  return (
    <div ref={rootRef} data-nexara="floating-navbar" data-variant={variant} className={cn(contained && '@container', position, className)}>
      <nav aria-label={label} className={cn(variant === 'dock' && 'w-[min(28rem,calc(100%-1.5rem))]')}>
        {variant === 'sidebar' ? (
          <div className={cn('flex h-full flex-col gap-3 p-3', variantClass.sidebar, barClassName)}>
            <div className="px-2 font-serif text-lg">{logo}</div>
            <p className="px-3 text-[10px] tracking-[0.16em] text-zinc-500 uppercase">Library</p>
            {links('flex flex-1 flex-col gap-1')}
            {actions ? <div className="px-1">{actions}</div> : null}
          </div>
        ) : null}

        {variant === 'announcement' ? (
          <div className={barClassName}>
            <div className="flex items-center justify-between bg-nx-accent px-4 py-2 text-sm text-nx-accent-fg">
              <span>{logo} is in preview</span>
              {actions}
            </div>
            <div className={cn('flex items-center gap-4 border-b border-nx-border bg-nx-bg px-4 py-3', blur && 'backdrop-blur')}>
              {links(cn('items-center gap-4', desktop))}
              <button ref={toggleRef} type="button" className={cn('ml-auto h-10 rounded-full border border-nx-border px-3', mobileOnly)} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
                {menuLabel}
              </button>
            </div>
          </div>
        ) : null}

        {variant === 'app-bar' ? (
          <div className={cn('flex h-14 items-center gap-3 px-3', variantClass['app-bar'], barClassName)}>
            <div className="font-serif">{logo}</div>
            <label className="sr-only" htmlFor={`${menuId}-search`}>Search</label>
            <input id={`${menuId}-search`} placeholder="Search" className="h-9 flex-1 rounded-lg border border-nx-border bg-nx-bg px-3 text-sm outline-none" />
            {links(cn('items-center gap-1', desktop))}
            {actions}
          </div>
        ) : null}

        {variant === 'command' ? (
          <div className={cn('flex items-center gap-3 px-3 py-2', variantClass.command, blur && 'backdrop-blur-xl', barClassName)}>
            <div className="font-serif">{logo}</div>
            <div className="flex h-9 flex-1 items-center rounded-lg border border-nx-border bg-nx-bg px-3 text-sm text-nx-muted">
              Search or jump
              <kbd className="ml-auto rounded border border-nx-border px-1 text-[10px]">⌘K</kbd>
            </div>
            {actions}
          </div>
        ) : null}

        {variant === 'breadcrumb' ? (
          <div className={cn('flex items-center gap-2 px-2 text-sm', barClassName)}>
            <span className="font-serif">{logo}</span>
            {items.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="text-zinc-600">/</span>
                <a href={item.href} aria-current={item.active ? 'page' : undefined} className={cn(item.active ? 'text-nx-fg' : 'text-nx-muted')} onClick={item.onClick}>
                  {item.label}
                </a>
              </span>
            ))}
          </div>
        ) : null}

        {variant === 'segmented' ? (
          <div className={cn('flex items-center gap-3', barClassName)}>
            <div className="font-serif">{logo}</div>
            {links('flex items-center gap-1 rounded-full bg-black/40 p-1')}
            {actions}
          </div>
        ) : null}

        {variant === 'wordmark' ? (
          <div className={cn('relative flex items-center justify-between', barClassName)}>
            <div className="font-serif text-3xl tracking-tight">{logo}</div>
            <div className="flex items-center gap-3">
              <button ref={toggleRef} type="button" className="text-sm text-zinc-300" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
                Index
              </button>
              {actions}
            </div>
            {open ? <div className={cn('absolute top-full right-0 mt-2 w-48 rounded-2xl border border-nx-border bg-nx-card p-2 shadow-[var(--nx-shadow)]', menuClassName)}>{links('flex flex-col', true)}</div> : null}
          </div>
        ) : null}

        {variant === 'mega' ? (
          <div className={cn(variantClass.mega, barClassName)}>
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
              <div className="font-serif text-lg">{logo}</div>
              {links(cn('items-center gap-5', desktop))}
              <div className="ml-auto">{actions}</div>
            </div>
            {mega ? (
              <div className="border-t border-nx-border bg-nx-card">
                <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-3">
                  {['Overview', 'Specs', 'Archive'].map((column) => (
                    <div key={column}>
                      <p className="text-xs tracking-[0.16em] text-zinc-500 uppercase">{column}</p>
                      <p className="mt-2 font-serif text-xl">{mega}</p>
                      <p className="text-sm text-zinc-400">A column for {column.toLowerCase()}.</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {variant === 'dock' ? (
          <div className={cn('flex items-end justify-center gap-1 px-3 py-2', variantClass.dock, blur && 'backdrop-blur-xl', barClassName)}>
            {links('flex items-end gap-1')}
          </div>
        ) : null}

        {variant === 'transport' ? (
          <div className={cn('flex items-center gap-3 px-3 py-2', variantClass.transport, barClassName)}>
            <MediaFrame src={media.cinema} alt="" className="size-10 shrink-0 rounded-md" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm">{items[0]?.label ?? 'Night desk'}</span>
              <span className="mt-1 block h-1 rounded-full bg-nx-border"><span className="block h-1 w-1/3 rounded-full bg-nx-fg" /></span>
            </span>
            <span className="text-xs tracking-[0.2em]">◀ ▶</span>
          </div>
        ) : null}

        {variant === 'floating' ? (
          <div className={cn('flex items-center gap-2 px-3', variantClass.floating, blur && 'backdrop-blur-xl', shrunk ? 'py-1' : 'py-2', barClassName)}>
            <div className="px-2 font-serif">{logo}</div>
            {links(cn('items-center gap-1', desktop))}
            {actions ? <div className={cn('ml-auto', desktop)}>{actions}</div> : null}
            <button ref={toggleRef} type="button" className={cn('ml-auto h-10 rounded-full border border-nx-border px-3', mobileOnly)} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>
              {open ? 'Close' : menuLabel}
            </button>
          </div>
        ) : null}

        {variant === 'overlay' ? (
          <div className={cn('flex items-center px-3 py-2', variantClass.overlay, barClassName)}>
            <div className="font-serif">{logo}</div>
            <button ref={toggleRef} type="button" className="ml-auto inline-flex h-11 items-center gap-2 rounded-full border border-nx-border px-3" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>
              {open ? 'Close' : menuLabel}
            </button>
          </div>
        ) : null}

        {variant === 'overlay' && open && typeof document !== 'undefined'
          ? createPortal(
              <div ref={overlayRef} id={menuId} role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-50 flex flex-col bg-nx-bg p-8 text-nx-fg">
                <div className="flex items-center justify-between">
                  <div className="font-serif">{logo}</div>
                  <button type="button" className="h-11 rounded-full border border-nx-border px-4" onClick={() => { setOpen(false); toggleRef.current?.focus() }}>Close</button>
                </div>
                {links('mt-12 flex flex-col gap-4', true)}
                {actions ? <div className="mt-auto">{actions}</div> : null}
              </div>,
              document.body,
            )
          : null}

        {open && variant !== 'overlay' && variant !== 'wordmark' ? (
          <div id={menuId} className={cn('mt-2 rounded-3xl border border-nx-border bg-nx-card p-3 shadow-[var(--nx-shadow)]', mobileOnly, menuClassName)}>
            {links('flex flex-col', true)}
          </div>
        ) : null}
      </nav>
    </div>
  )
}
