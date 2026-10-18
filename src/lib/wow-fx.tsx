'use client'

import { animate, motion, useMotionValue, useSpring } from 'framer-motion'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { LoopPause } from '@/lib/media.tsx'
import { useInView } from '@/lib/wow.tsx'
import { cn, focusRing, useLoopControl, usePrefersReducedMotion } from '@/lib/utils.ts'

const FLAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function SplitFlap({
  text,
  className,
  playing = true,
}: {
  text: string
  className?: string
  playing?: boolean
}) {
  return (
    <span className={cn('inline-flex gap-1', className)} aria-label={text}>
      {text.split('').map((ch, i) => (
        <FlapCell key={`${ch}-${i}`} char={ch === ' ' ? ' ' : ch.toUpperCase()} delay={i * 70} playing={playing} />
      ))}
    </span>
  )
}

function FlapCell({ char, delay, playing }: { char: string; delay: number; playing: boolean }) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(reduced || !playing ? char : '·')

  useEffect(() => {
    if (reduced || !playing) {
      setShown(char)
      return
    }
    let i = 0
    let interval = 0
    const start = Math.floor(Math.random() * FLAP.length)
    const kick = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setShown(i > 10 ? char : (FLAP[(start + i) % FLAP.length] ?? char))
        if (i > 10) window.clearInterval(interval)
      }, 55)
    }, delay)
    return () => {
      window.clearTimeout(kick)
      window.clearInterval(interval)
    }
  }, [char, delay, playing, reduced])

  return (
    <span className="relative inline-block h-12 w-9 overflow-hidden rounded-md border border-white/10 bg-[#16161c] text-center font-mono text-2xl leading-[3rem] text-white [perspective:240px]">
      <motion.span
        key={shown}
        aria-hidden="true"
        className="block"
        initial={reduced ? false : { rotateX: -88, y: '-40%' }}
        animate={{ rotateX: 0, y: '0%' }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
      >
        {shown}
      </motion.span>
    </span>
  )
}

export function ShatterText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [hot, setHot] = useState(false)
  const reduced = usePrefersReducedMotion()
  return (
    <span
      className={className}
      aria-label={text}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          animate={
            hot && !reduced
              ? {
                  x: (i % 2 ? 14 : -16) + i * 2,
                  y: -18 - (i % 4) * 8,
                  rotate: (i - text.length / 2) * 16,
                  opacity: 0.9,
                }
              : { x: 0, y: 0, rotate: 0, opacity: 1 }
          }
          transition={{ type: 'spring', stiffness: 320, damping: 16 }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export function MatrixRain({ className, paused = false }: { className?: string; paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const glyphs = '01NX$#·*<>'
    const cols: number[] = []
    let raf = 0
    const fit = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth ?? 320
      const h = parent?.clientHeight ?? 180
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      const n = Math.max(8, Math.floor(w / 14))
      cols.length = n
      for (let i = 0; i < n; i++) cols[i] = Math.random() * 28
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)
    const tick = () => {
      const scale = canvas.width / Math.max(1, canvas.clientWidth)
      if (paused || reduced || !inView) {
        ctx.fillStyle = '#07070c'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        return
      }
      ctx.fillStyle = 'rgba(7,7,12,0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#34d399'
      ctx.font = `${12 * scale}px ui-monospace, monospace`
      cols.forEach((y, i) => {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)] ?? '0'
        ctx.fillText(ch, i * 14 * scale, y * 16 * scale)
        cols[i] = y * 16 * scale > canvas.height && Math.random() > 0.96 ? 0 : y + 1
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [inView, paused, reduced])

  return (
    <div ref={ref} className={cn('absolute inset-0', className)}>
      <canvas ref={canvasRef} className="block size-full" aria-hidden="true" />
    </div>
  )
}

export function CylinderSpin({
  items,
  className,
  paused = false,
}: {
  items: string[]
  className?: string
  paused?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('relative h-44 overflow-hidden [perspective:1100px]', className)}>
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        animate={paused || reduced ? undefined : { rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => {
          const angle = (i / items.length) * 360
          return (
            <div
              key={`${item}-${i}`}
              className="absolute top-1/2 left-1/2 font-serif text-3xl text-white"
              style={{ transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(150px)` }}
            >
              {item}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

export function VariableMorph({
  text,
  className,
  playing = true,
}: {
  text: string
  className?: string
  playing?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.p
      className={cn('font-sans tracking-tight', className)}
      animate={
        reduced || !playing
          ? { fontWeight: 600 }
          : { fontWeight: [200, 800, 280, 700, 200] }
      }
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ fontVariationSettings: '"wght" 500' }}
    >
      {text}
    </motion.p>
  )
}

export function HexLattice({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-[#07070c]', className)} aria-hidden="true">
      <div className="absolute inset-[-20%] flex flex-wrap content-center justify-center gap-2">
        {Array.from({ length: 42 }, (_, i) => (
          <motion.span
            key={i}
            className="size-14 bg-[#22c5b0]/25"
            style={{ clipPath: 'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)' }}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: (i % 7) * 0.12 }}
          />
        ))}
      </div>
    </div>
  )
}

export function CircuitBoard({ className, playing = true }: { className?: string; playing?: boolean }) {
  const traces = [
    'M8 12 H 40 V 28 H 72 V 8 H 110',
    'M12 32 H 28 V 48 H 64 V 36 H 108',
    'M20 8 V 22 H 52 V 44 H 96',
  ]
  return (
    <svg viewBox="0 0 120 56" className={cn('absolute inset-0 h-full w-full text-[#22c5b0]', className)} aria-hidden="true">
      {traces.map((d) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          initial={playing ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {[[40, 12], [72, 28], [28, 32], [64, 48], [52, 22]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#f3c27a" />
      ))}
    </svg>
  )
}

export function TopoField({ className, paused = false }: { className?: string; paused?: boolean }) {
  return (
    <div className={cn('absolute inset-0 bg-[#07070c]', className)} aria-hidden="true">
      {[18, 32, 48, 66, 86].map((r, i) => (
        <motion.span
          key={r}
          className="absolute top-1/2 left-1/2 rounded-[46%] border border-[#f3c27a]/35"
          style={{ width: r * 2, height: r * 1.35, marginLeft: -r, marginTop: -r * 0.67 }}
          animate={paused ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 0.25, 0.7] }}
          transition={{ duration: 4.2, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}
    </div>
  )
}

export function PerspectiveFloor({ className, paused = false }: { className?: string; paused?: boolean }) {
  return (
    <div className={cn('absolute inset-0 bg-[#07070c] [perspective:900px]', className)} aria-hidden="true">
      <motion.div
        className="absolute inset-x-[-20%] bottom-[-30%] h-[140%] origin-bottom bg-[linear-gradient(rgba(124,108,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(124,108,255,0.35)_1px,transparent_1px)] bg-size-[28px_28px]"
        animate={paused ? { rotateX: 68 } : { rotateX: 68, y: [0, 28] }}
        transition={{ y: { duration: 2.8, repeat: Infinity, ease: 'linear' } }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#07070c,transparent_55%)]" />
    </div>
  )
}

export function DragPlate({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(0)
  return (
    <motion.div
      drag={!reduced}
      dragMomentum
      dragElastic={0.2}
      style={{ x, y, rotate }}
      onDrag={(_, info) => rotate.set(info.velocity.x / 90)}
      onDragEnd={() => {
        void animate(x, 0, { type: 'spring', stiffness: 260, damping: 20 })
        void animate(y, 0, { type: 'spring', stiffness: 260, damping: 20 })
        void animate(rotate, 0, { type: 'spring', stiffness: 200, damping: 16 })
      }}
      className={cn('cursor-grab active:cursor-grabbing touch-none', className)}
    >
      {children}
    </motion.div>
  )
}

export function useLiveRemain(seed = 12 * 86400 + 6 * 3600 + 18 * 60 + 4) {
  const [left, setLeft] = useState(seed)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setLeft((s) => (s > 0 ? s - 1 : seed)), 1000)
    return () => window.clearInterval(id)
  }, [reduced, seed])
  return {
    d: Math.floor(left / 86400),
    h: Math.floor((left % 86400) / 3600),
    m: Math.floor((left % 3600) / 60),
    s: left % 60,
  }
}

export function AnalogClock({ className, paused = false }: { className?: string; paused?: boolean }) {
  const remain = useLiveRemain()
  const reduced = usePrefersReducedMotion()
  const seconds = remain.h * 3600 + remain.m * 60 + remain.s
  return (
    <div className={cn('relative mx-auto size-40 rounded-full border border-white/15', className)}>
      <span
        className="absolute top-1/2 left-1/2 h-14 w-0.5 origin-bottom bg-[#f3c27a]"
        style={{ transform: `translate(-50%, -100%) rotate(${(paused || reduced ? 0 : remain.m) * 6}deg)` }}
      />
      <span
        className="absolute top-1/2 left-1/2 h-10 w-0.5 origin-bottom bg-white"
        style={{ transform: `translate(-50%, -100%) rotate(${(paused || reduced ? 0 : remain.h) * 30}deg)` }}
      />
      <motion.span
        className="absolute top-1/2 left-1/2 h-16 w-px origin-bottom bg-[#22c5b0]"
        animate={{ rotate: (paused || reduced ? 0 : seconds) * 6 }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: '50% 100%' }}
      />
      <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    </div>
  )
}

export function HeatGrid({
  cells,
  className,
}: {
  cells: { label: string; heat: number }[]
  className?: string
}) {
  return (
    <div className={cn('grid grid-cols-3 gap-1', className)}>
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex h-14 flex-col justify-between rounded-lg p-2 text-[11px] text-white"
          style={{ background: `rgba(76,70,224,${0.18 + cell.heat * 0.72})` }}
        >
          <span className="opacity-80">{cell.label}</span>
          <span className="font-mono">{Math.round(cell.heat * 100)}</span>
        </div>
      ))}
    </div>
  )
}

export function AreaSpark({ className, withParticles = false }: { className?: string; withParticles?: boolean }) {
  const d = 'M4 40 C 20 36, 28 12, 44 18 S 72 44, 88 22 110 10, 116 16'
  return (
    <div className={cn('relative', className)}>
      <svg viewBox="0 0 120 48" className="h-32 w-full text-[#8b87ff]">
        <motion.path
          d={`${d} L 116 48 L 4 48 Z`}
          fill="currentColor"
          fillOpacity="0.18"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6 }}
        />
        {withParticles
          ? [20, 44, 72, 88, 110].map((x, i) => (
              <motion.circle
                key={x}
                cx={x}
                cy={[36, 18, 44, 22, 10][i]}
                r="2.2"
                fill="#f3c27a"
                animate={{ opacity: [0.2, 1, 0.2], r: [1.4, 2.6, 1.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))
          : null}
      </svg>
    </div>
  )
}

export function MagneticCaretField({
  placeholder = 'Ask the desk',
  className,
}: {
  placeholder?: string
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)
  const x = useSpring(12, { stiffness: 380, damping: 28 })

  function move(event: ReactPointerEvent<HTMLLabelElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(Math.min(rect.width - 16, Math.max(12, event.clientX - rect.left)))
  }

  return (
    <label className={cn('relative block max-w-sm', className)} onPointerMove={move}>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          x.set(16 + event.target.value.length * 8.4)
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        className={cn(focusRing, 'min-h-11 w-full rounded-full border border-nx-field bg-transparent px-4 caret-transparent')}
      />
      <motion.span
        aria-hidden="true"
        className={cn('pointer-events-none absolute top-2 bottom-2 w-0.5 rounded-full bg-[#8b87ff]', !focus && 'opacity-40')}
        style={{ x }}
      />
    </label>
  )
}

export function GooPuddle({
  className,
  playing = true,
}: {
  className?: string
  playing?: boolean
}) {
  const raw = useId().replace(/:/g, '')
  return (
    <span className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <svg className="absolute h-0 w-0">
        <filter id={raw}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
      <span className="absolute inset-0" style={{ filter: `url(#${raw})` }}>
        <motion.span
          className="absolute top-1 left-2 size-10 rounded-full bg-[#7c6cff]"
          animate={playing ? { x: [0, 36, 8, 0], y: [0, -6, 6, 0] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute top-2 right-3 size-8 rounded-full bg-[#22c5b0]"
          animate={playing ? { x: [0, -28, 4, 0], y: [0, 8, -4, 0] } : undefined}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </span>
  )
}

export function PausedOrbit({
  items,
  radius,
  className,
}: {
  items: ReactNode[]
  radius: number
  className?: string
}) {
  const loop = useLoopControl(true)
  return (
    <div className={cn('relative min-h-48 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
      <OrbitLocal items={items} radius={radius} paused={!loop.playing} />
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </div>
  )
}

function OrbitLocal({
  items,
  radius,
  paused,
}: {
  items: ReactNode[]
  radius: number
  paused: boolean
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <div className="relative mx-auto aspect-square" style={{ width: radius * 2 + 48 }}>
      {items.map((item, i) => {
        const angle = (i / items.length) * 360
        return (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            animate={paused || reduced ? { rotate: angle } : { rotate: [angle, angle + 360] }}
            transition={paused || reduced ? undefined : { duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '0 0' }}
          >
            <div
              style={{ transform: `translate(${radius}px, 0)` }}
              className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-white backdrop-blur"
            >
              {item}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
