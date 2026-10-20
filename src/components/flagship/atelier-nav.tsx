'use client'

import { Grain, HelioMark, cn, springs, useFocusTrap } from '@/components/flagship/primitives.tsx'
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

export type MegaColumn = {
  title: string
  items: { label: string; href: string; note?: string }[]
}

export type NavLink = {
  label: string
  href: string
  mega?: MegaColumn[]
}

const defaultLinks: NavLink[] = [
  {
    label: 'Product',
    href: '#orbital',
    mega: [
      {
        title: 'Instrument',
        items: [
          { label: 'Iris', href: '#top', note: 'Scroll reveal' },
          { label: 'Beam', href: '#orbital', note: 'Cursor scene' },
          { label: 'Type', href: '#kinetic', note: 'Kinetic letters' },
        ],
      },
      {
        title: 'Desk',
        items: [
          { label: 'Story', href: '#story', note: 'Pinned chapters' },
          { label: 'Bento', href: '#bento', note: 'Desk objects' },
          { label: 'Signals', href: '#flagship-dashboard', note: 'Console' },
        ],
      },
      {
        title: 'Archive',
        items: [
          { label: 'Wall', href: '#voices', note: 'Studios' },
          { label: 'Plans', href: '#plans', note: 'Seats' },
        ],
      },
    ],
  },
  {
    label: 'Studio',
    href: '#voices',
    mega: [
      {
        title: 'Rooms',
        items: [
          { label: 'Night desk', href: '#story', note: 'Focus' },
          { label: 'Signal loft', href: '#bento', note: 'Live' },
        ],
      },
      {
        title: 'People',
        items: [
          { label: 'Studios on Helio', href: '#voices' },
          { label: 'Open a seat', href: '#plans' },
        ],
      },
    ],
  },
  { label: 'Signal', href: '#bento' },
  { label: 'Plans', href: '#plans' },
]

export type AtelierNavProps = {
  logo?: string
  links?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function AtelierNav({
  logo = 'Helio',
  links = defaultLinks,
  ctaLabel = 'Open desk',
  ctaHref = '#flagship-dashboard',
  className,
}: AtelierNavProps) {
  const [open, setOpen] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [compact, setCompact] = useState(false)
  const [drawerSection, setDrawerSection] = useState<string | null>(null)
  const bar = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const { scrollY } = useScroll()
  const closeDrawer = useCallback(() => setDrawer(false), [])
  useFocusTrap(drawer, drawerRef, closeDrawer)

  useMotionValueEvent(scrollY, 'change', (value) => {
    setCompact(value > 24)
  })

  useEffect(() => {
    if (!drawer) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [drawer])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(null)
        setDrawer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const active = links.find((link) => link.label === open)

  return (
    <LayoutGroup>
      <div className={cn('pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6', className)}>
        <motion.div
          ref={bar}
          layout
          className={cn(
            'pointer-events-auto mx-auto max-w-6xl overflow-hidden border border-ivory/10 bg-carbon/80 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl',
            compact ? 'rounded-[1.4rem]' : 'rounded-[1.8rem]',
          )}
          transition={springs.ui}
        >
          <div className={cn('flex items-center justify-between gap-3 px-4', compact ? 'h-14' : 'h-16')}>
            <a href="#top" className="flex items-center gap-2.5 text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">
              <HelioMark className="size-7" />
              <span className="font-serif text-xl tracking-tight">{logo}</span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {links.map((link) => {
                const expanded = open === link.label
                return (
                  <div key={link.label} className="relative">
                    {link.mega ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setOpen(expanded ? null : link.label)}
                        onPointerEnter={() => setOpen(link.label)}
                        className={cn(
                          'h-9 rounded-full px-3.5 text-sm text-ivory/70 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                          expanded && 'bg-ivory/8 text-ivory',
                        )}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="inline-flex h-9 items-center rounded-full px-3.5 text-sm text-ivory/70 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={ctaHref}
                className="hidden h-9 items-center rounded-full bg-ember px-4 text-sm font-medium text-[#1a0904] sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
              >
                {ctaLabel}
              </a>
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/15 text-ivory lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
                aria-expanded={drawer}
                aria-label={drawer ? 'Close menu' : 'Open menu'}
                onClick={() => setDrawer((value) => !value)}
              >
                <span className="sr-only">Menu</span>
                <span className="relative block h-3 w-4">
                  <motion.span
                    className="absolute top-0 left-0 h-px w-4 bg-ivory"
                    animate={drawer ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  />
                  <motion.span
                    className="absolute top-1.5 left-0 h-px w-4 bg-ivory"
                    animate={drawer ? { opacity: 0 } : { opacity: 1 }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-px w-4 bg-ivory"
                    animate={drawer ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  />
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {active?.mega ? (
              <motion.div
                id={panelId}
                key={active.label}
                layoutId="mega-plate"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={springs.ui}
                className="hidden overflow-hidden border-t border-ivory/8 lg:block"
                onPointerLeave={() => setOpen(null)}
              >
                <div className="grid gap-6 px-6 py-6 md:grid-cols-3">
                  {active.mega.map((column) => (
                    <div key={column.title}>
                      <p className="font-mono text-[10px] tracking-[0.2em] text-brass uppercase">{column.title}</p>
                      <ul className="mt-3 space-y-1">
                        {column.items.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              onClick={() => setOpen(null)}
                              className="flex items-baseline justify-between gap-3 rounded-xl px-2 py-2 text-ivory/80 hover:bg-ivory/5 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
                            >
                              <span>{item.label}</span>
                              {item.note ? <span className="font-mono text-[10px] tracking-[0.14em] text-fog uppercase">{item.note}</span> : null}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {drawer ? (
          <motion.div
            ref={drawerRef}
            className="fixed inset-0 z-40 bg-void lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <Grain />
            <div className="relative flex h-full flex-col justify-end px-6 pt-24 pb-10">
              <button
                type="button"
                onClick={closeDrawer}
                className="absolute top-6 right-6 h-10 rounded-full border border-ivory/15 px-4 text-sm text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
              >
                Close
              </button>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.mega ? (
                      <div>
                        <button
                          type="button"
                          className="font-serif text-[clamp(2.4rem,12vw,4.4rem)] leading-none tracking-[-0.04em] text-ivory"
                          aria-expanded={drawerSection === link.label}
                          onClick={() => setDrawerSection((value) => (value === link.label ? null : link.label))}
                        >
                          {link.label}
                        </button>
                        <AnimatePresence>
                          {drawerSection === link.label ? (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-1"
                            >
                              {link.mega.flatMap((column) =>
                                column.items.map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      onClick={() => setDrawer(false)}
                                      className="block py-2 text-lg text-fog"
                                    >
                                      {item.label}
                                    </a>
                                  </li>
                                )),
                              )}
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setDrawer(false)}
                        className="block font-serif text-[clamp(2.4rem,12vw,4.4rem)] leading-none tracking-[-0.04em] text-ivory"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <a
                href={ctaHref}
                onClick={() => setDrawer(false)}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-ember px-6 text-[#1a0904]"
              >
                {ctaLabel}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LayoutGroup>
  )
}
