'use client'

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils.ts'

export interface NavItem {
  label: string
  href: string
  active?: boolean
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const variantClass = {
  floating: 'rounded-full border border-white/12 bg-[#12131c]/80 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.85)]',
  underline: 'rounded-none border-x-0 border-t-0 border-b border-white/15 bg-transparent',
  bottom: 'rounded-none border-x-0 border-b-0 border-t border-white/15 bg-[#101118]/95',
  dock: 'rounded-[1.6rem] border border-white/12 bg-[#12131c]/90 px-2',
  command: 'rounded-full border border-white/12 bg-[#101118]/85',
  split: 'rounded-full border border-white/10 bg-[#12131c]/80',
  double: 'rounded-3xl border border-white/12 bg-[#12131c]/90',
  islands: 'rounded-none border-0 bg-transparent shadow-none',
  tabs: 'rounded-full border border-white/10 bg-black/40 p-1',
  sidebar: 'h-full flex-col items-stretch rounded-3xl border border-white/12 bg-[#12131c]/95',
  overlay: 'rounded-full border border-white/12 bg-[#12131c]/90',
  spy: 'rounded-full border border-white/10 bg-[#101118]/80',
} as const

export interface FloatingNavbarProps {
  logo?: ReactNode
  items: NavItem[]
  actions?: ReactNode
  variant?: keyof typeof variantClass
  shrinkOnScroll?: boolean
  /** Stick inside a parent instead of fixing to the viewport. */
  contained?: boolean
  blur?: boolean
  className?: string
  /** Classes for the pill itself, separate from the positioning wrapper. */
  barClassName?: string
  menuClassName?: string
  /** Element whose scroll position drives the compact state. Defaults to the window. */
  scrollRoot?: RefObject<HTMLElement | null> | null
  menuLabel?: string
  /** Accessible name for the navigation landmark. */
  label?: string
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d={open ? 'M4 4l10 10M14 4 4 14' : 'M3 5h12M3 9h12M3 13h12'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * FloatingNavbar
 * Twelve navigation layouts, from a compact pill to a sidebar and a full-screen menu.
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
  const [spyHref, setSpyHref] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const desktop = contained ? 'hidden @md:flex' : 'hidden md:flex'
  const mobileOnly = contained ? '@md:hidden' : 'md:hidden'

  useEffect(() => {
    if (!shrinkOnScroll) return
    const target: HTMLElement | Window | null = scrollRoot ? scrollRoot.current : window
    if (!target) return
    const read = () => {
      const top = target instanceof Window ? target.scrollY : target.scrollTop
      setShrunk(top > 12)
    }
    read()
    target.addEventListener('scroll', read, { passive: true })
    return () => target.removeEventListener('scroll', read)
  }, [scrollRoot, shrinkOnScroll])

  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggle?.focus()
    }
    function onPointer(event: PointerEvent) {
      if (variant === 'overlay') return
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open, variant])

  useEffect(() => {
    if (variant !== 'overlay' || !open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open, variant])

  useEffect(() => {
    if (variant !== 'overlay' || !open) return
    const panel = overlayRef.current
    const focusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusable()[0]?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Tab') return
      const nodes = focusable()
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
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
    return () => document.removeEventListener('keydown', onKey)
  }, [open, variant])

  useEffect(() => {
    if (variant !== 'spy') return
    const pairs = items.flatMap((item) => {
      if (!item.href.startsWith('#')) return []
      const node = document.getElementById(item.href.slice(1))
      return node ? [[item.href, node] as const] : []
    })
    if (pairs.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!hit) return
        const match = pairs.find(([, node]) => node === hit.target)
        if (match) setSpyHref(match[0])
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] },
    )
    pairs.forEach(([, node]) => observer.observe(node))
    return () => observer.disconnect()
  }, [items, variant])

  function current(item: NavItem) {
    return item.active || (variant === 'spy' && spyHref === item.href)
  }

  function linkClass(item: NavItem) {
    const active = current(item)
    return cn(
      'inline-flex items-center text-zinc-300 transition-colors hover:text-[#f6f3ec]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
      variant === 'dock' && 'h-auto origin-bottom flex-col gap-0.5 rounded-xl px-3 py-1 text-[10px] leading-tight motion-safe:hover:scale-125',
      variant === 'bottom' && 'h-auto flex-col gap-0.5 rounded-lg px-3 py-1 text-[10px] tracking-[0.14em] uppercase',
      variant === 'underline' && 'h-10 rounded-none border-b-2 border-transparent px-3 hover:border-[#f5c16c]',
      variant === 'tabs' && 'h-9 rounded-full px-3',
      variant === 'sidebar' && 'h-11 w-full justify-start rounded-xl px-3 hover:bg-white/10',
      variant === 'overlay' && 'h-auto justify-start font-serif text-4xl md:text-6xl',
      variant !== 'dock' &&
        variant !== 'bottom' &&
        variant !== 'underline' &&
        variant !== 'sidebar' &&
        variant !== 'overlay' &&
        'h-10 rounded-full px-3 hover:bg-white/10',
      active && variant === 'underline' && 'border-[#f5c16c] text-[#f6f3ec]',
      active && variant === 'tabs' && 'bg-[#f6f3ec] text-[#16140f]',
      active && variant === 'overlay' && 'text-[#f5c16c]',
      active && variant !== 'underline' && variant !== 'tabs' && variant !== 'overlay' && 'bg-white/10 text-[#f6f3ec]',
    )
  }

  function links(listClass: string, closeOnSelect = false) {
    return (
      <ul className={listClass}>
        {items.map((item) => (
          <li key={item.href + item.label}>
            <a
              href={item.href}
              aria-current={current(item) ? 'page' : undefined}
              onClick={(event) => {
                item.onClick?.(event)
                if (!closeOnSelect) return
                setOpen(false)
                toggleRef.current?.focus()
              }}
              className={linkClass(item)}
            >
              {variant === 'dock' ? <span aria-hidden="true" className="mb-0.5 size-1.5 rounded-full bg-current" /> : null}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  const menuButton = (
    <button
      ref={toggleRef}
      type="button"
      className={cn(
        'inline-flex h-11 min-w-24 items-center justify-center gap-2 rounded-full border border-white/15 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
        variant === 'overlay' ? 'ml-auto' : cn('ml-auto', mobileOnly),
      )}
      aria-expanded={open}
      aria-controls={menuId}
      onClick={() => setOpen((value) => !value)}
    >
      <MenuIcon open={open} />
      <span className="inline-block w-12 text-left">{open ? 'Close' : menuLabel}</span>
    </button>
  )

  const position =
    variant === 'bottom'
      ? contained
        ? 'absolute inset-x-0 bottom-0 z-30'
        : 'fixed inset-x-0 bottom-0 z-40'
      : variant === 'dock'
      ? contained
        ? 'absolute inset-x-3 bottom-3 z-30'
        : 'fixed bottom-4 left-1/2 z-40 w-[min(72rem,calc(100%-1.5rem))] -translate-x-1/2'
      : variant === 'sidebar'
        ? contained
          ? 'absolute inset-y-3 left-3 z-30 w-52'
          : 'fixed top-4 bottom-4 left-4 z-40 w-56'
        : contained
          ? 'sticky top-3 z-30'
          : 'fixed top-4 left-1/2 z-40 w-[min(72rem,calc(100%-1.5rem))] -translate-x-1/2'

  const chrome = cn(
    'text-sm text-[#f6f3ec] motion-reduce:transition-none',
    variantClass[variant],
    blur && variant !== 'islands' && 'backdrop-blur-xl',
    barClassName,
  )

  return (
    <div ref={rootRef} data-nexara="floating-navbar" data-variant={variant} className={cn(contained && '@container', position, className)}>
      <nav aria-label={label}>
        {variant === 'sidebar' ? (
          <div className={cn('flex h-full flex-col gap-3 p-3', chrome, shrunk ? 'py-2' : 'py-4')}>
            <div className="px-2 font-serif text-lg tracking-tight">{logo}</div>
            {links('flex flex-1 flex-col gap-1')}
            {actions ? <div className="px-1">{actions}</div> : null}
          </div>
        ) : null}

        {variant === 'islands' ? (
          <div className="flex flex-wrap items-center gap-2">
            <div className={cn('rounded-full border border-white/12 bg-[#12131c]/90 px-4 py-2 font-serif backdrop-blur-xl', shrunk ? 'text-base' : 'text-lg')}>
              {logo}
            </div>
            {links(cn('items-center gap-1 rounded-full border border-white/12 bg-[#12131c]/90 px-2 py-1 backdrop-blur-xl', desktop))}
            {actions ? <div className={cn('items-center rounded-full border border-white/12 bg-[#12131c]/90 px-2 py-1 backdrop-blur-xl', desktop)}>{actions}</div> : null}
            {menuButton}
          </div>
        ) : null}

        {variant === 'double' ? (
          <div className={cn('flex flex-col px-3', chrome, shrunk ? 'py-1' : 'py-2')}>
            <div className="flex items-center gap-2">
              <div className={cn('min-w-0 px-2 font-serif tracking-tight', shrunk ? 'text-base' : 'text-lg')}>{logo}</div>
              {actions ? <div className={cn('ml-auto items-center gap-2', desktop)}>{actions}</div> : <span className="ml-auto" />}
              {menuButton}
            </div>
            {links(cn('mt-1 items-center gap-1 border-t border-white/10 pt-1', desktop))}
          </div>
        ) : null}

        {variant !== 'sidebar' && variant !== 'islands' && variant !== 'double' ? (
          <div className={cn('mx-auto flex items-center gap-2 px-3 transition-[max-width,padding] duration-300', chrome, shrunk ? 'max-w-3xl py-1' : 'max-w-full py-3')}>
            <div className={cn('min-w-0 shrink-0 px-2 font-serif tracking-tight', shrunk ? 'text-base' : 'text-lg')}>{logo}</div>
            {variant === 'command' ? <span className={cn('text-xs tracking-[0.16em] text-zinc-400 uppercase', desktop)}>Jump</span> : null}
            {variant === 'overlay'
              ? null
              : links(cn('items-center gap-1', variant === 'split' && 'flex-1 justify-center', variant === 'command' && 'mx-auto rounded-full border border-white/10 bg-black/30 px-1', desktop))}
            {variant === 'overlay' ? null : actions ? <div className={cn('ml-auto items-center gap-2', desktop)}>{actions}</div> : <span className={cn('ml-auto', desktop)} />}
            {menuButton}
          </div>
        ) : null}

        {variant === 'overlay' && open && typeof document !== 'undefined'
          ? createPortal(
          <div
            ref={overlayRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-0 z-50 flex flex-col bg-[#09090f]/95 p-8 text-[#f6f3ec] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="font-serif text-lg">{logo}</div>
              <button
                type="button"
                className="inline-flex h-11 items-center rounded-full border border-white/15 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
                onClick={() => {
                  setOpen(false)
                  toggleRef.current?.focus()
                }}
              >
                Close
              </button>
            </div>
            {links('mt-12 flex flex-col gap-5', true)}
            {actions ? <div className="mt-auto">{actions}</div> : null}
          </div>,
          document.body,
        )
          : null}

        {variant !== 'overlay' && variant !== 'sidebar' ? (
          <div id={menuId} hidden={!open} className={cn('mt-2 rounded-3xl border border-white/12 bg-[#12131c]/95 p-3 shadow-2xl backdrop-blur-xl', mobileOnly, menuClassName)}>
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={`mobile-${item.href}-${item.label}`}>
                  <a
                    href={item.href}
                    aria-current={current(item) ? 'page' : undefined}
                    className="flex h-11 items-center rounded-2xl px-3 text-zinc-100 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
                    onClick={(event) => {
                      item.onClick?.(event)
                      setOpen(false)
                      toggleRef.current?.focus()
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {actions ? <div className="mt-2 flex flex-wrap gap-2 border-t border-white/10 px-1 pt-3">{actions}</div> : null}
          </div>
        ) : null}
      </nav>
    </div>
  )
}
