'use client'

import { Magnetic, springs, useContainedPointer, useCount } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import type { HeroProps, HeroVariant } from '@/components/ui/hero.tsx'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react'

export const loadEase = [0.16, 1, 0.3, 1] as const

export type LayoutProps = HeroProps & {
  variant: HeroVariant
  Title: 'h1' | 'h2' | 'h3'
}

export const TIER: Record<HeroVariant, 'basic' | 'intermediate' | 'advanced'> = {
  aurora: 'basic',
  brutal: 'basic',
  pastel: 'basic',
  editorial: 'basic',
  spotlight: 'intermediate',
  bento: 'intermediate',
  terminal: 'intermediate',
  cursor: 'intermediate',
  helix: 'advanced',
  cinema: 'advanced',
  atlas: 'advanced',
  reveal: 'advanced',
  rotate: 'advanced',
  veil: 'advanced',
  splice: 'intermediate',
  mesh: 'basic',
  glyph: 'advanced',
  fan: 'intermediate',
  ribbon: 'basic',
  converse: 'intermediate',
  assemble: 'advanced',
  iso: 'intermediate',
  league: 'basic',
  pop: 'basic',
}

export const TONE: Record<HeroVariant, CSSProperties> = {
  aurora: { ['--hero-bg' as never]: '#04060f', ['--hero-fg' as never]: '#eef7ff', ['--hero-accent' as never]: '#2ee6c7' },
  brutal: { ['--hero-bg' as never]: '#F4D738', ['--hero-fg' as never]: '#111111', ['--hero-accent' as never]: '#FF2E9A' },
  pastel: { ['--hero-bg' as never]: '#f7f1ea', ['--hero-fg' as never]: '#2a211c', ['--hero-accent' as never]: '#c45c7a' },
  editorial: { ['--hero-bg' as never]: '#efe6d4', ['--hero-fg' as never]: '#1a1612', ['--hero-accent' as never]: '#b33a12' },
  spotlight: { ['--hero-bg' as never]: '#000000', ['--hero-fg' as never]: '#f4f6fb', ['--hero-accent' as never]: '#818cf8' },
  bento: { ['--hero-bg' as never]: '#f3f1ec', ['--hero-fg' as never]: '#171717', ['--hero-accent' as never]: '#171717' },
  terminal: { ['--hero-bg' as never]: '#0b0d10', ['--hero-fg' as never]: '#e7edf3', ['--hero-accent' as never]: '#4ade80' },
  cursor: { ['--hero-bg' as never]: '#0c1018', ['--hero-fg' as never]: '#edf1f7', ['--hero-accent' as never]: '#67e8f9' },
  helix: { ['--hero-bg' as never]: '#050506', ['--hero-fg' as never]: '#f6f1ea', ['--hero-accent' as never]: '#e9a8ff' },
  cinema: { ['--hero-bg' as never]: '#000000', ['--hero-fg' as never]: '#f4ead6', ['--hero-accent' as never]: '#e8c36a' },
  atlas: { ['--hero-bg' as never]: '#06101c', ['--hero-fg' as never]: '#e8f1ff', ['--hero-accent' as never]: '#7dd3fc' },
  reveal: { ['--hero-bg' as never]: '#f6f7fb', ['--hero-fg' as never]: '#111827', ['--hero-accent' as never]: '#111827' },
  rotate: { ['--hero-bg' as never]: '#f4f1ea', ['--hero-fg' as never]: '#1c1914', ['--hero-accent' as never]: '#0f766e' },
  veil: { ['--hero-bg' as never]: '#050505', ['--hero-fg' as never]: '#f7efe2', ['--hero-accent' as never]: '#e8c36a' },
  splice: { ['--hero-bg' as never]: '#ece7dc', ['--hero-fg' as never]: '#1a1612', ['--hero-accent' as never]: '#9a3412' },
  mesh: { ['--hero-bg' as never]: '#12081c', ['--hero-fg' as never]: '#f6f0ff', ['--hero-accent' as never]: '#f472b6' },
  glyph: { ['--hero-bg' as never]: '#0b0b0b', ['--hero-fg' as never]: '#f5f1e8', ['--hero-accent' as never]: '#f97316' },
  fan: { ['--hero-bg' as never]: '#f6f3ec', ['--hero-fg' as never]: '#171412', ['--hero-accent' as never]: '#be123c' },
  ribbon: { ['--hero-bg' as never]: '#111111', ['--hero-fg' as never]: '#f5f1ea', ['--hero-accent' as never]: '#facc15' },
  converse: { ['--hero-bg' as never]: '#f7f5f2', ['--hero-fg' as never]: '#1c1917', ['--hero-accent' as never]: '#0369a1' },
  assemble: { ['--hero-bg' as never]: '#071018', ['--hero-fg' as never]: '#e8f4ff', ['--hero-accent' as never]: '#22d3ee' },
  iso: { ['--hero-bg' as never]: '#e8eef2', ['--hero-fg' as never]: '#123043', ['--hero-accent' as never]: '#c2410c' },
  league: { ['--hero-bg' as never]: '#04150f', ['--hero-fg' as never]: '#e8ffe9', ['--hero-accent' as never]: '#facc15' },
  pop: { ['--hero-bg' as never]: '#fff7ed', ['--hero-fg' as never]: '#1c1917', ['--hero-accent' as never]: '#f43f5e' },
}

const FACE: Record<HeroVariant, string> = {
  aurora: '[font-family:Syne,sans-serif]',
  brutal: '[font-family:Archivo,sans-serif]',
  pastel: '[font-family:Outfit,sans-serif]',
  editorial: '[font-family:Newsreader,serif]',
  spotlight: '[font-family:"DM Sans",sans-serif]',
  bento: '[font-family:"Plus Jakarta Sans",sans-serif]',
  terminal: '[font-family:"IBM Plex Sans",sans-serif]',
  cursor: '[font-family:"DM Sans",sans-serif]',
  helix: '[font-family:Outfit,sans-serif]',
  cinema: '[font-family:Newsreader,serif]',
  atlas: '[font-family:"Space Grotesk",sans-serif]',
  reveal: '[font-family:"Plus Jakarta Sans",sans-serif]',
  rotate: '[font-family:Outfit,sans-serif]',
  veil: '[font-family:"Bebas Neue",sans-serif]',
  splice: '[font-family:Fraunces,serif]',
  mesh: '[font-family:Syne,sans-serif]',
  glyph: '[font-family:Syne,sans-serif]',
  fan: '[font-family:"Plus Jakarta Sans",sans-serif]',
  ribbon: '[font-family:Syne,sans-serif]',
  converse: '[font-family:"IBM Plex Sans",sans-serif]',
  assemble: '[font-family:"DM Sans",sans-serif]',
  iso: '[font-family:"Space Grotesk",sans-serif]',
  league: '[font-family:Archivo,sans-serif]',
  pop: '[font-family:Outfit,sans-serif]',
}

export function Shell({
  variant,
  className,
  style,
  children,
}: {
  variant: HeroVariant
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)
  const mx = useSpring(50, { stiffness: 140, damping: 22, mass: 0.6 })
  const my = useSpring(28, { stiffness: 140, damping: 22, mass: 0.6 })
  const mxPct = useTransform(mx, (v) => `${v}%`)
  const myPct = useTransform(my, (v) => `${v}%`)
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const exitY = useTransform(scrollYProgress, [0, 1], [0, 48])
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  function onMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    mx.set(((event.clientX - box.left) / box.width) * 100)
    my.set(((event.clientY - box.top) / box.height) * 100)
  }

  return (
    <motion.section
      ref={root}
      data-nexara="hero"
      data-variant={variant}
      data-tier={TIER[variant]}
      className={cn('relative isolate overflow-hidden', FACE[variant], className)}
      style={{
        ...TONE[variant],
        ...style,
        y: reduced ? 0 : exitY,
        scale: reduced ? 1 : exitScale,
        ['--mx' as never]: mxPct,
        ['--my' as never]: myPct,
      }}
      onPointerMove={onMove}
    >
      {reduced ? null : (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light"
          style={{
            background:
              'radial-gradient(28rem 20rem at var(--mx) var(--my), color-mix(in srgb, var(--hero-accent) 28%, transparent), transparent 70%)',
            ['--mx' as never]: mxPct,
            ['--my' as never]: myPct,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.section>
  )
}

export function Heading({
  as: Title,
  className,
  children,
  delay = 0,
}: {
  as: 'h1' | 'h2' | 'h3'
  className?: string
  children: ReactNode
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <Title className={cn('overflow-hidden', className)}>
      <motion.span
        className="block"
        initial={reduced ? false : { y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.78, delay, ease: loadEase }}
      >
        {children}
      </motion.span>
    </Title>
  )
}

export function Rise({
  children,
  delay = 0.08,
  y = 22,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...springs.heavy, delay }}
    >
      {children}
    </motion.div>
  )
}

export function DefaultActions({
  primary,
  secondary,
  primaryClass,
  secondaryClass,
}: {
  primary: string
  secondary: string
  primaryClass: string
  secondaryClass: string
}) {
  return (
    <>
      <Magnetic href="#hero" className={primaryClass} strength={14}>
        {primary}
      </Magnetic>
      <Magnetic href="#hero" className={secondaryClass} strength={8}>
        {secondary}
      </Magnetic>
    </>
  )
}

export function Still({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={cn('h-full w-full object-cover', className)} />
}

export function Tilt({
  children,
  className,
  strength = 9,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const reduced = usePrefersReducedMotion()
  const pointer = useContainedPointer<HTMLDivElement>()
  const rx = useTransform(pointer.sy, [-0.5, 0.5], [strength, -strength])
  const ry = useTransform(pointer.sx, [-0.5, 0.5], [-strength, strength])
  return (
    <motion.div
      ref={pointer.ref}
      className={className}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      {children}
    </motion.div>
  )
}

export function CountStat({
  to,
  label,
  suffix = '',
  className,
  valueClass,
}: {
  to: number
  label: string
  suffix?: string
  className?: string
  valueClass?: string
}) {
  const reduced = usePrefersReducedMotion()
  const node = useCount(to, true)
  return (
    <div className={className}>
      <b className={cn('block tabular-nums', valueClass)}>
        <span ref={node}>{reduced ? to.toLocaleString() : '0'}</span>
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  )
}

export function LiveSpark({ className, stroke = '#16a34a' }: { className?: string; stroke?: string }) {
  const reduced = usePrefersReducedMotion()
  const [pts, setPts] = useState('4,40 28,36 52,42 76,22 100,26 124,12 156,18')
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      const ys = Array.from({ length: 7 }, () => 12 + Math.round(Math.random() * 36))
      const line = ys.map((y, i) => `${4 + i * 25.3},${y}`).join(' ')
      setPts(line)
    }, 1600)
    return () => window.clearInterval(id)
  }, [reduced])
  const last = pts.split(' ').at(-1)?.split(',')[0] ?? '156'
  return (
    <svg viewBox="0 0 160 56" className={className} aria-hidden="true">
      <polyline fill="none" stroke={stroke} strokeWidth="2.4" points={pts} />
      <polyline fill={`${stroke}22`} stroke="none" points={`4,56 ${pts} ${last},56`} />
    </svg>
  )
}

export function LiveBars({ className, colors }: { className?: string; colors?: string[] }) {
  const reduced = usePrefersReducedMotion()
  const palette = colors ?? ['#1d4ed8', '#6366f1', '#22d3ee', '#818cf8', '#38bdf8']
  const [h, setH] = useState([40, 70, 52, 88, 60])
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setH(Array.from({ length: 5 }, () => 32 + Math.round(Math.random() * 60)))
    }, 1400)
    return () => window.clearInterval(id)
  }, [reduced])
  return (
    <div className={cn('flex h-24 items-end gap-1.5', className)} aria-hidden="true">
      {h.map((value, i) => (
        <motion.i
          key={palette[i]}
          className="block flex-1 rounded-sm"
          animate={{ height: `${value}%` }}
          transition={springs.ui}
          style={{ background: palette[i] }}
        />
      ))}
    </div>
  )
}

export function useHeroProgress(target: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })
  return scrollYProgress
}

export function Lines({
  as: Title,
  className,
  lines,
  delay = 0,
}: {
  as: 'h1' | 'h2' | 'h3'
  className?: string
  lines: ReactNode[]
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <Title className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduced ? false : { y: '108%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.78, delay: delay + i * 0.09, ease: loadEase }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Title>
  )
}

export function Float({
  children,
  className,
  delay = 0,
  amplitude = 10,
  duration = 6,
}: {
  children: ReactNode
  className?: string
  delay?: number
  amplitude?: number
  duration?: number
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className={className}
      animate={reduced ? undefined : { y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function Sweep({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return null
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-y-[-20%] z-[2] w-1/5 bg-gradient-to-r from-transparent via-white/14 to-transparent',
        className,
      )}
      initial={{ x: '-50%' }}
      animate={{ x: '520%' }}
      transition={{ duration: 5.4, repeat: Infinity, ease: 'linear', repeatDelay: 2.2 }}
    />
  )
}

export function TypeLine({
  text,
  className,
  delay = 0,
  speed = 16,
}: {
  text: string
  className?: string
  delay?: number
  speed?: number
}) {
  const reduced = usePrefersReducedMotion()
  const [n, setN] = useState(reduced ? text.length : 0)
  useEffect(() => {
    if (reduced) {
      setN(text.length)
      return
    }
    setN(0)
    let i = 0
    let interval = 0
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) window.clearInterval(interval)
      }, speed)
    }, delay * 1000)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [delay, reduced, speed, text])
  return (
    <span className={className}>
      {text.slice(0, n)}
      {n < text.length ? <span className="animate-pulse">▌</span> : null}
    </span>
  )
}

export function Dust({ count = 36, color = 'rgba(255,255,255,.55)' }: { count?: number; color?: string }) {
  const reduced = usePrefersReducedMotion()
  const dots = Array.from({ length: count }, (_, i) => ({
    i,
    x: (i * 97) % 100,
    y: (i * 53) % 100,
    s: 2 + (i % 3),
    d: 4 + (i % 7),
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((dot) => (
        <motion.i
          key={dot.i}
          className="absolute rounded-full"
          style={{
            width: dot.s,
            height: dot.s,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            background: color,
          }}
          animate={reduced ? undefined : { y: [0, -18, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: dot.d, delay: dot.i * 0.04, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
