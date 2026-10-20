'use client'

import { Grain, HelioMark, cn, springs } from '@/components/flagship/primitives.tsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

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

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((value) => (value + 3 + Math.round(Math.random() * 4)) % 100)
      setLatency((value) => Math.max(11, Math.min(42, value + (Math.random() > 0.5 ? 1 : -1))))
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  const spark = useMemo(
    () => Array.from({ length: 16 }, (_, i) => 18 + ((tick + i * 13) % 64)),
    [tick],
  )
  const bars = useMemo(() => Array.from({ length: 12 }, (_, i) => 20 + ((tick * 3 + i * 17) % 80)), [tick])
  const hits = commands.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))

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
    <section id="bento" className={cn('relative bg-void px-4 py-24 md:px-8 md:py-32', className)}>
      <Grain className="opacity-[0.08]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
          <HelioMark className="size-6" />
          Fig 1.1 · Desk
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.04em] text-ivory">
          Tiles that work, not pictures of tools.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <Tile className="md:col-span-3" title="Live spark" note={`${tick} open`}>
            <svg viewBox="0 0 160 64" className="mt-6 h-20 w-full text-ion" aria-hidden="true">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                points={spark.map((y, x) => `${x * 10.5},${64 - y * 0.7}`).join(' ')}
              />
            </svg>
          </Tile>

          <Tile className="md:col-span-3" title="Command" note={`${hits.length} matches`}>
            <label className="mt-5 block">
              <span className="sr-only">Filter commands</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try archive or pulse"
                className="h-11 w-full rounded-2xl border border-ivory/10 bg-void px-3 text-sm text-ivory outline-none placeholder:text-fog focus:ring-2 focus:ring-ion"
              />
            </label>
            <ul className="mt-3 space-y-1">
              {hits.length === 0 ? (
                <li className="px-1 py-2 text-sm text-fog">No command named that.</li>
              ) : (
                hits.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setPicked(item.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                        picked === item.id ? 'bg-ember/15 text-ivory' : 'text-ivory/80 hover:bg-ivory/5',
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-[10px] tracking-[0.14em] text-fog uppercase">{item.hint}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </Tile>

          <Tile className="md:col-span-2" title="Room light" note={night ? 'Night' : 'Paper'}>
            <button
              type="button"
              onClick={() => setNight((value) => !value)}
              className={cn(
                'mt-6 flex h-24 w-full items-end rounded-[1.4rem] border p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                night ? 'border-ivory/10 bg-void' : 'border-void/10 bg-ivory',
              )}
            >
              <span className={cn('font-mono text-[11px] tracking-[0.16em] uppercase', night ? 'text-ivory' : 'text-void')}>
                {night ? 'Keep the void' : 'Lift the paper'}
              </span>
            </button>
          </Tile>

          <Tile className="md:col-span-2" title="Equalizer" note="Clock-driven">
            <div className="mt-6 flex h-24 items-end gap-1.5" aria-hidden="true">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-full bg-brass"
                  animate={{ height: `${h}%` }}
                  transition={springs.ui}
                />
              ))}
            </div>
          </Tile>

          <Tile className="md:col-span-2" title="Ping" note={`${latency} ms`}>
            <p className="mt-6 font-serif text-5xl tracking-tight text-ivory">{latency}</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-fog uppercase">Desk latency</p>
            <span className="mt-4 inline-flex size-2 rounded-full bg-ion shadow-[0_0_12px_#3ee0c6]" />
          </Tile>

          <Tile className="md:col-span-3" title="Compare" note={`${compare} / ${100 - compare}`}>
            <div className="relative mt-6 h-36 overflow-hidden rounded-[1.3rem]">
              <img src={stillsSafe('heliograph-instrument.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-void/20" />
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${compare}%` }}>
                <img src={stillsSafe('heliograph-aperture.jpg')} alt="" className="h-full w-[min(36rem,100vw)] max-w-none object-cover" />
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
              <span className="pointer-events-none absolute inset-y-0 w-px bg-ivory" style={{ left: `${compare}%` }} />
            </div>
          </Tile>

          <Tile className="md:col-span-3" title="Lane" note="Click to advance">
            <ol className="mt-5 space-y-2">
              <AnimatePresence>
                {lane.map((item, i) => (
                  <motion.li
                    layout
                    key={item}
                    transition={springs.ui}
                    className="flex items-center justify-between rounded-2xl border border-ivory/10 px-3 py-2"
                  >
                    <span className="text-sm text-ivory">{item}</span>
                    <button
                      type="button"
                      onClick={() => advance(item)}
                      disabled={i === lane.length - 1}
                      className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase disabled:text-fog"
                    >
                      {i === lane.length - 1 ? 'Done' : 'Advance'}
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          </Tile>
        </div>
      </div>
    </section>
  )
}

function stillsSafe(file: string) {
  const base = import.meta.env.BASE_URL
  return `${base}flagship/${file}`
}

function Tile({
  title,
  note,
  className,
  children,
}: {
  title: string
  note: string
  className?: string
  children: ReactNode
}) {
  return (
    <article className={cn('relative overflow-hidden rounded-[1.7rem] border border-ivory/10 bg-carbon p-5', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm text-ivory">{title}</h3>
        <p className="font-mono text-[10px] tracking-[0.16em] text-fog uppercase">{note}</p>
      </div>
      {children}
    </article>
  )
}
