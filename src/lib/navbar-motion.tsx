'use client'

import { Magnetic, springs, useFocusTrap } from '@/lib/kit.tsx'
import { heroAsset, HERO_STILLS } from '@/lib/hero-media.ts'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import type { NavItem, NavbarVariant } from '@/components/ui/navbar.tsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type MutableRefObject, type ReactNode, type Ref } from 'react'

export const loadEase = [0.16, 1, 0.3, 1] as const

export const FACE: Record<NavbarVariant, string> = {
  pill: '[font-family:Syne,sans-serif]',
  banner: '[font-family:Syne,sans-serif]',
  tabs: '[font-family:Syne,sans-serif]',
  clinic: '[font-family:"IBM Plex Sans",sans-serif]',
  league: '[font-family:Archivo,sans-serif]',
  pop: '[font-family:Outfit,sans-serif]',
  mega: '[font-family:"Plus Jakarta Sans",sans-serif]',
  command: '[font-family:"IBM Plex Sans",sans-serif]',
  follow: '[font-family:Syne,sans-serif]',
  crumb: '[font-family:"Plus Jakarta Sans",sans-serif]',
  kiln: '[font-family:"Space Grotesk",sans-serif]',
  split: '[font-family:Outfit,sans-serif]',
  island: '[font-family:"DM Sans",sans-serif]',
  curtain: '[font-family:"Bebas Neue",sans-serif]',
  dock: '[font-family:Syne,sans-serif]',
  rail: '[font-family:"DM Sans",sans-serif]',
  folio: '[font-family:Syne,sans-serif]',
  portal: '[font-family:"DM Sans",sans-serif]',
}

export function useMenu(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen)
  const root = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  return { open, setOpen, root, reduced }
}

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

export function ItemLink({
  item,
  className,
  magnetic = false,
}: {
  item: NavItem
  className?: string
  magnetic?: boolean
}) {
  const current = item.current ? { 'aria-current': 'page' as const } : {}
  if (magnetic) {
    return (
      <Magnetic href={item.href ?? '#navbar'} className={cn(FOCUS, className)} strength={10}>
        <span {...current}>{item.label}</span>
      </Magnetic>
    )
  }
  return (
    <a href={item.href ?? '#navbar'} className={cn(FOCUS, className)} {...current}>
      {item.label}
    </a>
  )
}

export function Tray({
  open,
  id,
  title,
  children,
  className,
  trapRef,
}: {
  open: boolean
  id: string
  title: string
  children: ReactNode
  className?: string
  trapRef?: MutableRefObject<HTMLDivElement | null>
}) {
  const reduced = usePrefersReducedMotion()
  const local = useRef<HTMLDivElement>(null)
  const [phone, setPhone] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setPhone(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  useFocusTrap(open && phone, local, undefined)
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={(node) => {
            local.current = node
            if (trapRef) trapRef.current = node
          }}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn('absolute inset-x-3 top-[4.5rem] z-40 overflow-auto rounded-3xl p-5 md:hidden', className)}
          initial={reduced ? false : { y: 16 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: 12, opacity: 0 }}
          transition={springs.heavy}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function OpenTrigger({
  open,
  onClick,
  controls,
  label,
  className,
}: {
  open: boolean
  onClick: () => void
  controls: string
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      className={cn(FOCUS, className)}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
    >
      {open ? 'Close' : label}
    </button>
  )
}

export function Plate({
  still,
  alt,
  className,
}: {
  still: string
  alt: string
  className?: string
}) {
  return <img src={heroAsset(still)} alt={alt} className={cn('h-full w-full object-cover', className)} />
}

export function SampleHero({
  kicker,
  title,
  lede,
  still,
  alt,
  invert = false,
  children,
}: {
  kicker: string
  title: ReactNode
  lede: string
  still?: string
  alt?: string
  invert?: boolean
  children?: ReactNode
}) {
  return (
    <div className="grid flex-1 items-center gap-8 px-5 py-10 md:grid-cols-2 md:px-10">
      <div>
        <p className={cn('font-mono text-[11px] tracking-[0.2em] uppercase', invert ? 'text-white/60' : 'opacity-70')}>{kicker}</p>
        <h1 className="mt-3 text-[clamp(2rem,4.6vw,3.6rem)] leading-[0.94] font-extrabold tracking-[-0.05em]">{title}</h1>
        <p className={cn('mt-4 max-w-md leading-7', invert ? 'text-white/75' : 'opacity-70')}>{lede}</p>
        {children}
      </div>
      {still ? (
        <div className="overflow-hidden rounded-[28px]">
          <Plate still={still} alt={alt ?? ''} className="h-[16rem] md:h-[22rem]" />
        </div>
      ) : null}
    </div>
  )
}

export function Shell({
  variant,
  className,
  style,
  children,
  rootRef,
}: {
  variant: NavbarVariant
  className?: string
  style?: CSSProperties
  children: ReactNode
  rootRef?: Ref<HTMLElement>
}) {
  return (
    <section
      ref={rootRef}
      data-nexara="navbar"
      data-variant={variant}
      className={cn('relative isolate overflow-hidden', FACE[variant], className)}
      style={style}
    >
      {children}
    </section>
  )
}

export const STILL = HERO_STILLS

export function useCycle<T>(items: T[], ms: number, reduced: boolean) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced || items.length < 2) return
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), ms)
    return () => window.clearInterval(id)
  }, [items.length, ms, reduced])
  return items[i] ?? items[0]
}

