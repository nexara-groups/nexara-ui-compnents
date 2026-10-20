'use client'

import { Grain, HelioMark, cn, springs } from '@/components/flagship/primitives.tsx'
import { stills } from '@/flagship/assets.ts'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

const commands = [
  { id: 'iris', label: 'Open iris', hint: 'Reveal the active signal' },
  { id: 'hold', label: 'Hold beam', hint: 'Pin the current owner' },
  { id: 'archive', label: 'Dim archive', hint: 'Lower closed work' },
  { id: 'seat', label: 'Invite a seat', hint: 'Add someone to the desk' },
  { id: 'pulse', label: 'Send pulse', hint: 'Write a readable line' },
]

export type LiveBentoProps = {
  className?: string
}

export function LiveBento({ className }: LiveBentoProps) {
  const [tick, setTick] = useState(42)
  const [query, setQuery] = useState('')
  const [night, setNight] = useState(true)
  const [compare, setCompare] = useState(46)
  const [lane, setLane] = useState(['Intake', 'Held', 'Shipped'])
  const [picked, setPicked] = useState<string | null>(null)
  const [latency, setLatency] = useState(18)
  const stage = useRef<HTMLDivElement>(null)
  const wash = useRef<HTMLDivElement>(null)
  const lx = useMotionValue(42)
  const ly = useMotionValue(28)
  const slx = useSpring(lx, springs.heavy)
  const sly = useSpring(ly, springs.heavy)

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((value) => (value + 3 + Math.round(Math.random() * 4)) % 100)
      setLatency((value) => Math.max(11, Math.min(42, value + (Math.random() > 0.5 ? 1 : -1))))
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const apply = () => {
      if (!wash.current) return
      wash.current.style.setProperty('--lx', `${slx.get()}%`)
      wash.current.style.setProperty('--ly', `${sly.get()}%`)
    }
    apply()
    const offX = slx.on('change', apply)
    const offY = sly.on('change', apply)
    return () => {
      offX()
      offY()
    }
  }, [slx, sly])

  const spark = useMemo(() => Array.from({ length: 22 }, (_, i) => 16 + ((tick + i * 11) % 68)), [tick])
  const bars = useMemo(() => Array.from({ length: 9 }, (_, i) => 28 + ((tick * 3 + i * 17) % 62)), [tick])
  const hits = commands.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))

  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    const node = stage.current
    if (!node) return
    const box = node.getBoundingClientRect()
    lx.set(((event.clientX - box.left) / box.width) * 100)
    ly.set(((event.clientY - box.top) / box.height) * 100)
  }

  function advance(title: string) {
    setLane((current) => {
      const index = current.indexOf(title)
      if (index === -1 || index === current.length - 1) return current
      const next = [...current]
      const swap = next[index + 1]
      if (!swap) return current
      next[index + 1] = title
      next[index] = swap
      return next
    })
  }

  return (
    <section id="bento" className={cn('relative overflow-hidden bg-void px-4 py-24 md:px-8 md:py-32', className)}>
      <img
        src={stills.desk()}
        alt=""
        className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-700', night ? 'opacity-28' : 'opacity-62')}
      />
      <div className={cn('absolute inset-0 transition-colors duration-700', night ? 'bg-void/78' : 'bg-[#2a2116]/35')} />
      <div
        ref={wash}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: night
            ? 'radial-gradient(circle at var(--lx, 42%) var(--ly, 28%), rgba(255,77,28,0.2), transparent 32%)'
            : 'radial-gradient(circle at var(--lx, 42%) var(--ly, 28%), rgba(243,234,216,0.42), transparent 38%)',
        }}
      />
      <Grain className="opacity-[0.1]" />

      <div ref={stage} onPointerMove={onMove} className="relative mx-auto max-w-6xl">
        <p className={cn('inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase', night ? 'text-brass' : 'text-[#5a4630]')}>
          <HelioMark className="size-6" />
          Fig 1.1 · Desk
        </p>
        <h2
          className={cn(
            'mt-4 max-w-2xl font-serif text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.04em]',
            night ? 'text-ivory' : 'text-void',
          )}
        >
          Objects on the plate, not tiles in a kit.
        </h2>

        <div
          className={cn(
            'relative mt-12 rounded-[2rem] border p-4 shadow-[0_40px_80px_-48px_rgba(0,0,0,0.9)] md:p-6',
            night ? 'border-ivory/10 bg-[#120e0b]/70' : 'border-[#2a2218]/15 bg-[#efe6d4]/80',
          )}
        >
          <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-brass/50 to-transparent" />
          <div className="grid gap-5 lg:hidden">
            <Oscilloscope spark={spark} tick={tick} night={night} />
            <CommandSlip query={query} setQuery={setQuery} hits={hits} picked={picked} setPicked={setPicked} />
            <div className="grid grid-cols-2 gap-4">
              <Lamp night={night} setNight={setNight} />
              <Gauge latency={latency} night={night} />
            </div>
            <Pipes bars={bars} night={night} />
            <CompareFrame compare={compare} setCompare={setCompare} />
            <Tickets lane={lane} advance={advance} night={night} />
          </div>

          <div className="relative hidden min-h-[56rem] lg:block">
            <Oscilloscope spark={spark} tick={tick} night={night} className="absolute top-4 left-0 w-[58%] -rotate-[0.7deg]" />
            <CommandSlip
              query={query}
              setQuery={setQuery}
              hits={hits}
              picked={picked}
              setPicked={setPicked}
              className="absolute top-0 right-2 z-20 w-[39%] rotate-[-2.1deg]"
            />
            <Lamp night={night} setNight={setNight} className="absolute top-[38%] left-[54%] z-10 w-[17%]" />
            <Gauge latency={latency} night={night} className="absolute top-[40%] right-[3%] w-[22%]" />
            <Pipes bars={bars} night={night} className="absolute bottom-[9%] left-[1%] w-[40%] rotate-[0.8deg]" />
            <CompareFrame compare={compare} setCompare={setCompare} className="absolute bottom-[5%] left-[38%] z-10 w-[35%] rotate-[1.1deg]" />
            <Tickets lane={lane} advance={advance} night={night} className="absolute right-1 bottom-[6%] w-[28%] rotate-[1.5deg]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Oscilloscope({
  spark,
  tick,
  night,
  className,
}: {
  spark: number[]
  tick: number
  night: boolean
  className?: string
}) {
  const line = spark.map((y, x) => `${8 + x * 8.4},${78 - y * 0.82}`).join(' ')
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-[1.4rem] bg-[#16110c] shadow-[0_32px_54px_-28px_rgba(0,0,0,0.88),inset_0_1px_0_rgba(243,234,216,0.12)]',
        !night && 'brightness-110',
        className,
      )}
    >
      <div className="absolute inset-0 rounded-[1.4rem] ring-1 ring-brass/40" />
      <div className="absolute inset-[10px] rounded-[1rem] bg-[#070805] shadow-[inset_0_0_40px_rgba(62,224,198,0.1)]" />
      <Screw className="top-3 left-3" />
      <Screw className="top-3 right-3" />
      <Screw className="bottom-3 left-3" />
      <Screw className="right-3 bottom-3" />
      <div className="relative px-8 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.22em] text-brass uppercase">HX-Scope</p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-ion uppercase">{tick} open</p>
        </div>
        <svg viewBox="0 0 200 86" className="mt-4 h-40 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="crt" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3ee0c6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3ee0c6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 6 }, (_, i) => (
            <line key={i} x1="8" x2="192" y1={14 + i * 12} y2={14 + i * 12} stroke="#1f3a34" strokeWidth="0.4" />
          ))}
          <polygon fill="url(#crt)" points={`8,86 ${line} 192,86`} />
          <polyline points={line} fill="none" stroke="#3ee0c6" strokeWidth="1.6" />
        </svg>
        <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-[#d7c7a4] uppercase">Phosphor live · do not photograph the grid</p>
      </div>
    </article>
  )
}

function CommandSlip({
  query,
  setQuery,
  hits,
  picked,
  setPicked,
  className,
}: {
  query: string
  setQuery: (value: string) => void
  hits: typeof commands
  picked: string | null
  setPicked: (value: string) => void
  className?: string
}) {
  return (
    <article
      className={cn(
        'relative bg-[#efe6d4] px-6 pt-8 pb-5 text-[#2a2218] shadow-[0_22px_40px_-24px_rgba(0,0,0,0.7),6px_10px_0_-4px_rgba(42,34,24,0.08)]',
        className,
      )}
    >
      <span className="absolute top-0 left-1/2 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] bg-[#d8c38a]/80 shadow-sm" />
      <span className="absolute top-0 bottom-0 left-8 w-px bg-[#d36b5c]/55" />
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="absolute left-3 size-1.5 rounded-full bg-[#efe6d4] shadow-[inset_0_0_0_1px_rgba(42,34,24,0.2)]" style={{ top: 28 + i * 28 }} />
      ))}
      <p className="font-mono text-[10px] tracking-[0.22em] text-[#8a5a32] uppercase">Command slip</p>
      <label className="mt-4 block">
        <span className="sr-only">Filter commands</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="archive or pulse"
          className="h-11 w-full border-b border-[#2a2218]/20 bg-transparent text-sm outline-none placeholder:text-[#8a7358] focus:border-[#2a2218]"
        />
      </label>
      <ul className="mt-3 space-y-1">
        {hits.length === 0 ? (
          <li className="py-2 text-sm text-[#6b5844]">No command named that.</li>
        ) : (
          hits.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setPicked(item.id)}
                className={cn(
                  'flex w-full items-baseline justify-between gap-3 py-1.5 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a2218]',
                  picked === item.id ? 'text-[#b33a12]' : 'text-[#2a2218]',
                )}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] tracking-[0.12em] text-[#8a7358] uppercase">{item.hint}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </article>
  )
}

function Lamp({
  night,
  setNight,
  className,
}: {
  night: boolean
  setNight: (value: boolean | ((current: boolean) => boolean)) => void
  className?: string
}) {
  return (
    <article
      className={cn(
        'relative flex flex-col items-center rounded-[2rem] border border-brass/30 bg-[#14100c] px-5 py-7 shadow-[0_20px_36px_-22px_rgba(0,0,0,0.8)]',
        className,
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-brass uppercase">Key lamp</p>
      <button
        type="button"
        role="switch"
        aria-checked={!night}
        onClick={() => setNight((value) => !value)}
        className="relative mt-5 size-24 rounded-full border border-brass/50 bg-[#0c0a08] shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
      >
        <motion.span
          layout
          className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            backgroundColor: night ? '#3a2a18' : '#f3ead8',
            boxShadow: night ? '0 0 0 rgba(0,0,0,0)' : '0 0 28px rgba(243,234,216,0.7)',
          }}
        />
      </button>
      <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-[#d7c7a4] uppercase">{night ? 'Void held' : 'Paper lifted'}</p>
    </article>
  )
}

function Gauge({ latency, night, className }: { latency: number; night: boolean; className?: string }) {
  const angle = -120 + (latency / 50) * 240
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-full border border-brass/35 bg-[#16120d] p-6 shadow-[0_20px_36px_-22px_rgba(0,0,0,0.8)]',
        !night && 'brightness-110',
        className,
      )}
    >
      <p className="text-center font-mono text-[10px] tracking-[0.2em] text-brass uppercase">Ping</p>
      <svg viewBox="0 0 120 90" className="mx-auto mt-2 h-28 w-full" aria-hidden="true">
        <path d="M16 72 A 44 44 0 1 1 104 72" fill="none" stroke="#d9a85a" strokeWidth="2" />
        <motion.g animate={{ rotate: angle }} style={{ transformOrigin: '60px 72px' }} transition={springs.heavy}>
          <line x1="60" y1="72" x2="60" y2="32" stroke="#ff4d1c" strokeWidth="2" />
        </motion.g>
        <circle cx="60" cy="72" r="3" fill="#f3ead8" />
      </svg>
      <p className="text-center font-serif text-4xl text-ivory">{latency}</p>
      <p className="mt-1 text-center font-mono text-[10px] tracking-[0.16em] text-[#d7c7a4] uppercase">ms on the desk</p>
    </article>
  )
}

function Pipes({ bars, night, className }: { bars: number[]; night: boolean; className?: string }) {
  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-[1.6rem] border border-ivory/10 bg-[#120f0c] px-6 pt-6 pb-4 shadow-[0_24px_40px_-26px_rgba(0,0,0,0.8)]',
        !night && 'brightness-110',
        className,
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-brass uppercase">Tuning pipes</p>
      <div className="mt-5 flex h-36 items-end justify-center gap-2">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-7 rounded-t-md bg-linear-to-b from-[#f0d392] to-[#8a6a2c] shadow-[inset_1px_0_0_rgba(255,255,255,0.25),0_8px_10px_-8px_rgba(0,0,0,0.8)]"
            animate={{ height: `${h}%` }}
            transition={springs.ui}
          />
        ))}
      </div>
    </article>
  )
}

function CompareFrame({
  compare,
  setCompare,
  className,
}: {
  compare: number
  setCompare: (value: number) => void
  className?: string
}) {
  return (
    <article className={cn('relative overflow-hidden rounded-[0.4rem] bg-[#1a1610] p-3 shadow-[0_26px_44px_-26px_rgba(0,0,0,0.85)] ring-1 ring-brass/30', className)}>
      <div className="flex items-center justify-between px-1 pb-2">
        <p className="font-mono text-[10px] tracking-[0.2em] text-brass uppercase">Plate compare</p>
        <p className="font-mono text-[10px] tracking-[0.16em] text-[#d7c7a4] uppercase">
          {compare} / {100 - compare}
        </p>
      </div>
      <div className="relative h-48 overflow-hidden rounded-[0.2rem]">
        <img src={stills.instrument()} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compare}%` }}>
          <img src={stills.aperture()} alt="" className="h-full w-[min(40rem,90vw)] max-w-none object-cover" />
        </div>
        <input
          type="range"
          min={8}
          max={92}
          value={compare}
          onChange={(event) => setCompare(Number(event.target.value))}
          className="absolute inset-0 cursor-ew-resize opacity-0"
          aria-label="Compare aperture and instrument"
        />
        <span className="pointer-events-none absolute inset-y-0 w-0.5 bg-brass" style={{ left: `${compare}%` }} />
        <span
          className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1a1610] bg-brass shadow-[0_0_0_4px_rgba(217,168,90,0.2)]"
          style={{ left: `${compare}%` }}
        />
      </div>
    </article>
  )
}

function Tickets({
  lane,
  advance,
  night,
  className,
}: {
  lane: string[]
  advance: (title: string) => void
  night: boolean
  className?: string
}) {
  return (
    <article className={cn('relative min-h-64', className)}>
      <p className={cn('mb-3 font-mono text-[10px] tracking-[0.2em] uppercase', night ? 'text-brass' : 'text-[#5a4630]')}>
        Lane stubs
      </p>
      <AnimatePresence>
        {lane.map((item, i) => (
          <motion.button
            layout
            type="button"
            key={item}
            onClick={() => advance(item)}
            disabled={i === lane.length - 1}
            transition={springs.ui}
            className="absolute right-0 left-0 flex h-20 items-center justify-between border border-[#2a2218]/15 bg-[#f3ead8] px-5 text-left text-[#2a2218] shadow-[0_14px_24px_-18px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
            style={{ top: i * 28, rotate: `${i * 1.4 - 1}deg`, zIndex: lane.length - i }}
          >
            <span className="font-serif text-2xl">{item}</span>
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase">{i === lane.length - 1 ? 'Front' : 'Advance'}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </article>
  )
}

function Screw({ className }: { className?: string }) {
  return <span className={cn('absolute size-2 rounded-full bg-[#8a6a2c] shadow-[inset_0_0_0_1px_rgba(243,234,216,0.3)]', className)} />
}
