'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { LoopPause } from '@/lib/media.tsx'
import { cn, useLoopControl, usePrefersReducedMotion } from '@/lib/utils.ts'

function usePointerNorm() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 220, damping: 22 })
  const sy = useSpring(my, { stiffness: 220, damping: 22 })
  const reduced = usePrefersReducedMotion()
  function move(event: ReactPointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }
  function leave() {
    mx.set(0.5)
    my.set(0.5)
  }
  return { mx, my, sx, sy, move, leave, reduced }
}

export function LensHover({
  children,
  className,
  zoom = 2.1,
}: {
  children: ReactNode
  className?: string
  zoom?: number
}) {
  const reduced = usePrefersReducedMotion()
  const host = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ x: 0.42, y: 0.28, w: 1, h: 1 })
  useEffect(() => {
    const node = host.current
    if (!node) return
    const measure = () => {
      const rect = node.getBoundingClientRect()
      setPos((current) => ({ ...current, w: rect.width, h: rect.height }))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={host}
      className={cn('relative overflow-hidden', className)}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse' || !host.current) return
        const rect = host.current.getBoundingClientRect()
        setPos({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
          w: rect.width,
          h: rect.height,
        })
      }}
    >
      {children}
      {reduced ? null : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-32 overflow-hidden rounded-full border border-white/50 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]"
          style={{
            left: `${pos.x * 100}%`,
            top: `${pos.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span
            className="absolute block"
            style={{
              width: pos.w,
              height: pos.h,
              left: -pos.x * pos.w * zoom + 64,
              top: -pos.y * pos.h * zoom + 64,
              transform: `scale(${zoom})`,
              transformOrigin: '0 0',
            }}
          >
            {children}
          </span>
        </span>
      )}
    </div>
  )
}

export function PrismSplit({ children, className }: { children: ReactNode; className?: string }) {
  const { sx, sy, move, leave, reduced } = usePointerNorm()
  const [off, setOff] = useState({ x: 5, y: 3 })
  return (
    <div
      className={cn('relative', className)}
      onPointerMove={(event) => {
        move(event)
        const rect = event.currentTarget.getBoundingClientRect()
        setOff({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 10,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 8,
        })
      }}
      onPointerLeave={() => {
        leave()
        setOff({ x: 5, y: 3 })
      }}
    >
      {reduced ? (
        children
      ) : (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 text-[#ff3b30] mix-blend-screen" style={{ transform: `translate(${-off.x}px, ${-off.y}px)` }}>
            {children}
          </span>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 text-[#32ade6] mix-blend-screen" style={{ transform: `translate(${off.x}px, ${off.y}px)` }}>
            {children}
          </span>
          <span className="relative">{children}</span>
        </>
      )}
      <span className="sr-only">{sx.get()} {sy.get()}</span>
    </div>
  )
}

export function PeelCorner({
  children,
  className,
  label = 'Peel',
}: {
  children: ReactNode
  className?: string
  label?: string
}) {
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()
  return (
    <button
      type="button"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className={cn('relative overflow-hidden text-left', className)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute right-0 bottom-0 size-9 origin-bottom-right bg-gradient-to-br from-[#f3c27a] to-[#b45309]"
        animate={reduced ? { scale: open ? 1 : 0.4 } : { rotate: open ? -18 : 0, x: open ? 6 : 0, y: open ? 6 : 0 }}
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />
      <span className="sr-only">{label}</span>
    </button>
  )
}

export function RadarSweep({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('relative mx-auto aspect-square w-48 overflow-hidden rounded-full border border-white/15 bg-[#07070c]', className)}>
      <span aria-hidden="true" className="absolute inset-6 rounded-full border border-white/10" />
      <span aria-hidden="true" className="absolute inset-12 rounded-full border border-white/10" />
      {items.map((item, i) => {
        const a = (i / items.length) * Math.PI * 2
        return (
          <span
            key={item}
            className="absolute top-1/2 left-1/2 text-[10px] text-[#f3c27a]"
            style={{ transform: `translate(-50%, -50%) translate(${Math.cos(a) * 68}px, ${Math.sin(a) * 68}px)` }}
          >
            {item}
          </span>
        )
      })}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 origin-center"
        animate={!reduced && loop.playing ? { rotate: 360 } : undefined}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(124,108,255,0.45) 42deg, transparent 70deg)',
        }}
      />
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-1 bottom-1 z-20" /> : null}
    </div>
  )
}

export function CompassNeedle({ className, label = 'Work' }: { className?: string; label?: string }) {
  const [deg, setDeg] = useState(0)
  const reduced = usePrefersReducedMotion()
  return (
    <div
      className={cn('relative mx-auto size-28 rounded-full border border-white/15 bg-[#111113]', className)}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        setDeg((Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) * 180) / Math.PI + 90)
      }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-1/2 w-0.5 -translate-x-1/2 origin-bottom bg-[#f3c27a]"
        animate={{ rotate: deg }}
        transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.2em] text-white/60 uppercase">{label}</span>
    </div>
  )
}

export function ZipperSplit({
  left,
  right,
  className,
  open,
}: {
  left: ReactNode
  right: ReactNode
  className?: string
  open?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('relative grid min-h-16 overflow-hidden rounded-2xl', className)}>
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden border-r border-white/10"
        animate={{ x: open ? '-38%' : '0%' }}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 18 }}
      >
        {left}
      </motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        animate={{ x: open ? '38%' : '0%' }}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 18 }}
      >
        {right}
      </motion.div>
    </div>
  )
}

export function MorseBlink({
  text = 'LIVE',
  className,
}: {
  text?: string
  className?: string
}) {
  const loop = useLoopControl(true)
  const pattern = [1, 0, 1, 0, 1, 1, 1, 0, 0]
  const [i, setI] = useState(0)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced || !loop.playing) return
    const id = window.setInterval(() => setI((n) => (n + 1) % pattern.length), 180)
    return () => window.clearInterval(id)
  }, [loop.playing, reduced, pattern.length])
  return (
    <span className={cn('inline-flex min-h-11 items-center gap-2 rounded-full bg-[#111113] px-3 text-sm text-white', className)}>
      <span aria-hidden="true" className={cn('size-2 rounded-full', pattern[i] ? 'bg-[#f3c27a]' : 'bg-white/15')} />
      {text}
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} /> : null}
    </span>
  )
}

export function PolaroidFan({
  faces,
  quote,
  who,
  className,
}: {
  faces: { src: string; name: string }[]
  quote: string
  who: string
  className?: string
}) {
  const [open, setOpen] = useState(true)
  const reduced = usePrefersReducedMotion()
  const fan = reduced || open
  return (
    <div className={cn('relative min-h-64', className)} onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
      {faces.slice(0, 3).map((face, i) => (
        <motion.figure
          key={face.name}
          className="absolute top-6 left-1/2 w-36 -translate-x-1/2 overflow-hidden rounded-md bg-white p-2 shadow-[0_16px_40px_-20px_#000]"
          animate={{ rotate: fan ? (i - 1) * 14 : (i - 1) * 4, x: fan ? (i - 1) * 48 : (i - 1) * 8, y: fan ? i * 4 : i * 10 }}
          transition={{ type: 'spring', stiffness: 160, damping: 16 }}
        >
          <img src={face.src} alt={face.name} className="h-28 w-full object-cover" />
          <figcaption className="mt-1 text-[10px] text-[#111]">{face.name}</figcaption>
        </motion.figure>
      ))}
      <blockquote className="absolute inset-x-4 bottom-3 rounded-2xl bg-[#111113] p-4 text-white">
        <p className="font-serif text-2xl">“{quote}”</p>
        <footer className="mt-2 text-xs text-white/50">{who}</footer>
      </blockquote>
    </div>
  )
}

export function BarcodeScan({
  labels,
  className,
}: {
  labels: string[]
  className?: string
}) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-[#111113] p-5 text-white', className)}>
      <div className="flex h-16 items-end gap-px">
        {Array.from({ length: 42 }, (_, i) => (
          <span key={i} className="flex-1 bg-white" style={{ height: `${20 + ((i * 17) % 80)}%`, opacity: i % 5 === 0 ? 1 : 0.55 }} />
        ))}
      </div>
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-5 top-5 h-16 w-0.5 bg-[#f3c27a]"
        animate={!reduced && loop.playing ? { x: ['0%', '1400%'] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
      />
      <p className="mt-4 font-mono text-xs tracking-[0.2em] text-white/50">{labels.join(' · ')}</p>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3" /> : null}
    </div>
  )
}

export function DialGauge({
  value,
  label,
  className,
}: {
  value: number
  label: string
  className?: string
}) {
  const reduced = usePrefersReducedMotion()
  const ratio = Math.min(1, Math.max(0, value / 100))
  const deg = ratio * 240 - 120
  return (
    <div className={cn('rounded-[1.6rem] bg-[#111113] p-5 text-white', className)}>
      <div className="relative mx-auto size-36">
        <svg viewBox="0 0 100 100" className="size-full">
          <path d="M18 70 A 40 40 0 1 1 82 70" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
          <motion.path
            d="M18 70 A 40 40 0 1 1 82 70"
            fill="none"
            stroke="#f3c27a"
            strokeWidth="8"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: ratio }}
            transition={{ duration: reduced ? 0 : 1.2 }}
          />
        </svg>
        <motion.span
          aria-hidden="true"
          className="absolute left-1/2 h-[2.15rem] w-0.5 bg-white"
          style={{ top: '28%', transformOrigin: '50% 100%' }}
          initial={false}
          animate={{ rotate: deg }}
          transition={{ duration: reduced ? 0 : 1.2 }}
        />
      </div>
      <p className="mt-2 text-center font-serif text-4xl">{value}</p>
      <p className="text-center text-sm text-white/50">{label}</p>
    </div>
  )
}

export function FoldPanel({
  front,
  back,
  className,
  defaultOpen = false,
}: {
  front: ReactNode
  back: ReactNode
  className?: string
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const reduced = usePrefersReducedMotion()
  return (
    <button type="button" onClick={() => setOpen((v) => !v)} className={cn('text-left [perspective:900px]', className)}>
      <motion.div
        animate={{ rotateX: reduced ? 0 : open ? -78 : 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
        className="overflow-hidden rounded-3xl"
      >
        {open && reduced ? back : front}
      </motion.div>
      {open && !reduced ? <div className="mt-2">{back}</div> : null}
    </button>
  )
}

export function StampInk({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const [hit, setHit] = useState(false)
  return (
    <motion.button
      type="button"
      onClick={() => {
        setHit(true)
        window.setTimeout(() => setHit(false), 500)
      }}
      animate={hit ? { scale: [1, 0.86, 1.08, 1], rotate: [0, -6, 3, 0] } : undefined}
      className={cn('rounded-2xl border-2 border-[#e11d48] px-4 py-3 font-serif text-2xl tracking-wide text-[#e11d48] uppercase', className)}
    >
      {children}
    </motion.button>
  )
}

export function MetronomeArm({
  steps,
  className,
}: {
  steps: string[]
  className?: string
}) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('relative min-h-56 overflow-hidden rounded-[1.6rem] bg-[#111113] p-5 text-white', className)}>
      <motion.div
        className="mx-auto h-40 w-1 origin-bottom bg-[#f3c27a]"
        animate={!reduced && loop.playing ? { rotate: [-22, 22, -22] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <ol className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-white/60">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3" /> : null}
    </div>
  )
}

export function ConstellationMap({
  nodes,
  className,
}: {
  nodes: { name: string; x: number; y: number }[]
  className?: string
}) {
  const [hot, setHot] = useState<string | null>(null)
  return (
    <div className={cn('relative min-h-56 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
      <svg viewBox="0 0 100 60" className="absolute inset-0 size-full">
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b) => (
            <line
              key={`${a.name}-${b.name}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={hot === a.name || hot === b.name ? '#f3c27a' : 'rgba(255,255,255,0.12)'}
              strokeWidth="0.3"
            />
          )),
        )}
      </svg>
      {nodes.map((node) => (
        <button
          key={node.name}
          type="button"
          onPointerEnter={() => setHot(node.name)}
          onPointerLeave={() => setHot(null)}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
          style={{ left: `${node.x}%`, top: `${(node.y / 60) * 100}%` }}
        >
          <span className="block size-2 rounded-full bg-white" />
          <span className="mt-1 block text-[10px] text-white/70">{node.name}</span>
        </button>
      ))}
    </div>
  )
}

export function FilmSprocket({
  frames,
  className,
}: {
  frames: { src: string; caption: string }[]
  className?: string
}) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('overflow-hidden rounded-[1.6rem] bg-[#111113] py-4', className)}>
      <motion.div
        className="flex gap-3 px-4"
        animate={!reduced && loop.playing ? { x: ['0%', '-40%'] } : undefined}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        {[...frames, ...frames].map((frame, i) => (
          <figure key={`${frame.caption}-${i}`} className="relative w-40 shrink-0 bg-[#1a1a20] p-2">
            <span aria-hidden="true" className="absolute top-1 bottom-1 left-0 flex flex-col justify-between">
              {Array.from({ length: 6 }, (_, n) => (
                <span key={n} className="ml-0.5 size-1.5 rounded-[1px] bg-black" />
              ))}
            </span>
            <img src={frame.src} alt="" className="h-24 w-full object-cover" />
            <figcaption className="mt-1 text-[10px] text-white/60">{frame.caption}</figcaption>
          </figure>
        ))}
      </motion.div>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="ml-4 mt-3" /> : null}
    </div>
  )
}

export function TapeReels({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('overflow-hidden rounded-[1.6rem] bg-[#111113] p-5 text-white', className)}>
      <div className="flex items-center justify-center gap-8">
        {[0, 1].map((reel) => (
          <motion.span
            key={reel}
            aria-hidden="true"
            className="size-16 rounded-full border-4 border-[#f3c27a] border-dashed"
            animate={!reduced && loop.playing ? { rotate: 360 } : undefined}
            transition={{ duration: 3 + reel, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-xs tracking-[0.18em] text-white/50">{items.join(' · ')}</p>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="mt-3" /> : null}
    </div>
  )
}

export function PendulumCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('relative min-h-56 overflow-hidden rounded-[1.6rem] bg-[#07070c] p-6', className)}>
      <motion.div
        className="mx-auto w-48 origin-top"
        animate={!reduced && loop.playing ? { rotate: [-10, 10, -10] } : undefined}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span aria-hidden="true" className="mx-auto mb-2 block h-10 w-px bg-white/30" />
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">{children}</div>
      </motion.div>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3" /> : null}
    </div>
  )
}

export function InkWake({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([])
  const reduced = usePrefersReducedMotion()
  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse' || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const next = { x: event.clientX - rect.left, y: event.clientY - rect.top, id: Date.now() }
        setDots((list) => [...list.slice(-10), next])
      }}
    >
      {dots.map((dot) => (
        <span
          key={dot.id}
          aria-hidden="true"
          className="pointer-events-none absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c6cff]/40 blur-md"
          style={{ left: dot.x, top: dot.y }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function BeamScan({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={!reduced && loop.playing ? { x: ['-40%', '140%'] } : undefined}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
      />
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </div>
  )
}

export function InfinityPath({ className, pauseable = true, playing }: { className?: string; pauseable?: boolean; playing?: boolean }) {
  const loop = useLoopControl(true)
  const reduced = usePrefersReducedMotion()
  const on = (playing ?? loop.playing) && !reduced
  return (
    <div className={cn('relative', className)}>
      <svg viewBox="0 0 120 56" className="h-20 w-full text-[#8b87ff]">
        <path
          d="M18 28 C 18 8, 42 8, 60 28 C 78 48, 102 48, 102 28 C 102 8, 78 8, 60 28 C 42 48, 18 48, 18 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.circle
          r="3.2"
          fill="#f3c27a"
          animate={on ? { offsetDistance: ['0%', '100%'] } : undefined}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          style={{ offsetPath: 'path("M18 28 C 18 8, 42 8, 60 28 C 78 48, 102 48, 102 28 C 102 8, 78 8, 60 28 C 42 48, 18 48, 18 28")' }}
        />
      </svg>
      {pauseable && !loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} /> : null}
    </div>
  )
}
