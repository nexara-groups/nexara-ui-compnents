'use client'

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { cn } from '@/lib/utils.ts'

export interface NavItem {
  label: string
  href: string
  active?: boolean
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

const variantClass = {
  floating: 'border border-white/12 bg-[#12131c]/80 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.85)]',
  solid: 'border border-white/10 bg-[#14151f]',
  transparent: 'border border-transparent bg-transparent',
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
 * A pill navigation bar that compacts on scroll and collapses into a menu.
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
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
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
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      data-nexara="floating-navbar"
      className={cn(contained && '@container', contained ? 'sticky top-3 z-30' : 'fixed top-4 left-1/2 z-40 w-[min(72rem,calc(100%-1.5rem))] -translate-x-1/2', className)}
    >
      <nav aria-label={label}>
        <div
          className={cn(
            'mx-auto flex items-center gap-2 rounded-full px-3 text-sm text-[#f6f3ec] motion-reduce:transition-none',
            'transition-[max-width,padding,background-color] duration-300',
            variantClass[variant],
            blur && variant !== 'transparent' && 'backdrop-blur-xl',
            shrunk ? 'max-w-3xl py-1' : 'max-w-full py-3',
            barClassName,
          )}
        >
          <div className={cn('min-w-0 shrink-0 px-2 font-serif tracking-tight', shrunk ? 'text-base' : 'text-lg')}>{logo}</div>
          <ul className={cn('items-center gap-1', desktop)}>
            {items.map((item) => (
              <li key={item.href + item.label}>
                <a
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={item.onClick}
                  className={cn(
                    'inline-flex h-10 items-center rounded-full px-3 text-zinc-300 transition-colors hover:bg-white/10 hover:text-[#f6f3ec]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
                    item.active && 'bg-white/10 text-[#f6f3ec]',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {actions ? <div className={cn('ml-auto items-center gap-2', desktop)}>{actions}</div> : <span className="ml-auto" />}
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              'ml-auto inline-flex h-11 min-w-24 items-center justify-center gap-2 rounded-full border border-white/15 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
              mobileOnly,
            )}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
            <span className="inline-block w-12 text-left">{open ? 'Close' : menuLabel}</span>
          </button>
        </div>
        <div
          id={menuId}
          hidden={!open}
          className={cn(
            'mt-2 rounded-3xl border border-white/12 bg-[#12131c]/95 p-3 shadow-2xl backdrop-blur-xl',
            mobileOnly,
            menuClassName,
          )}
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={`mobile-${item.href}-${item.label}`}>
                <a
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
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
      </nav>
    </div>
  )
}
