'use client'

import { Grain, HelioMark, cn } from '@/components/flagship/primitives.tsx'
import { stills } from '@/flagship/assets.ts'
import { usePrefersReducedMotion } from '@/lib/utils.ts'
import { useInView } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent } from 'react'

const OrbitalScene = lazy(async () => {
  const mod = await import('./orbital-scene.tsx')
  return { default: mod.OrbitalScene }
})

type Mode = 'orbit' | 'beam' | 'focus'

export type OrbitalHeroProps = {
  eyebrow?: string
  title?: string
  lede?: string
  className?: string
}

export function OrbitalHero({
  eyebrow = 'Fig 0.2 · Beam',
  title = 'Aim the instrument.',
  lede = 'The crystal tracks the pointer. Click it to pulse the beam. Modes change the orbit, the throw, and the focus.',
  className,
}: OrbitalHeroProps) {
  const reduced = usePrefersReducedMotion()
  const host = useRef<HTMLElement>(null)
  const plate = useRef<HTMLDivElement>(null)
  const inView = useInView(host, { amount: 0.35 })
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [mode, setMode] = useState<Mode>('beam')
  const [pulse, setPulse] = useState(0)
  const [ready, setReady] = useState(false)
  const [webgl, setWebgl] = useState(false)

  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => setReady(true), 40)
    return () => window.clearTimeout(timer)
  }, [reduced])

  useEffect(() => {
    if (pulse <= 0) return
    const timer = window.setTimeout(() => setPulse((value) => Math.max(0, value - 0.08)), 32)
    return () => window.clearTimeout(timer)
  }, [pulse])

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const node = plate.current
    if (!node) return
    const box = node.getBoundingClientRect()
    setPointer({
      x: (event.clientX - box.left) / box.width - 0.5,
      y: (event.clientY - box.top) / box.height - 0.5,
    })
  }

  const azimuth = Math.round((pointer.x + 0.5) * 180)
  const elevation = Math.round((0.5 - pointer.y) * 70)

  return (
    <section
      ref={host}
      id="orbital"
      className={cn('relative isolate overflow-hidden bg-void px-4 py-20 md:px-8 md:py-28', className)}
      aria-label="Interactive instrument"
    >
      <div className="mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <div className="relative z-10 max-w-md">
          <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
            <HelioMark className="size-6" />
            {eyebrow}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.04em] text-ivory">
            {title}
          </h2>
          <p className="mt-5 text-base leading-7 text-fog">{lede}</p>
          <div className="mt-8 flex flex-wrap gap-2" role="radiogroup" aria-label="Instrument mode">
            {(['orbit', 'beam', 'focus'] as const).map((item) => {
              const selected = item === mode
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setMode(item)}
                  className={cn(
                    'h-10 rounded-full border px-4 font-mono text-[11px] tracking-[0.16em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                    selected ? 'border-ember bg-ember/15 text-ivory' : 'border-ivory/15 text-ivory/60 hover:text-ivory',
                  )}
                >
                  {item}
                </button>
              )
            })}
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-[11px] tracking-[0.16em] text-ivory/50 uppercase">
            <div>
              <dt>Azimuth</dt>
              <dd className="mt-1 text-ivory">{azimuth}°</dd>
            </div>
            <div>
              <dt>Elevation</dt>
              <dd className="mt-1 text-ivory">{elevation}°</dd>
            </div>
            <div>
              <dt>Pulse</dt>
              <dd className="mt-1 text-ivory">{Math.round(pulse * 100)}%</dd>
            </div>
            <div>
              <dt>Loop</dt>
              <dd className="mt-1 text-ivory">{inView && !reduced ? 'live' : 'held'}</dd>
            </div>
          </dl>
        </div>

        <div
          ref={plate}
          data-helio-webgl={webgl ? 'ready' : ready ? 'mounting' : 'pending'}
          className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-ivory/10 bg-carbon shadow-[0_40px_80px_-48px_rgba(0,0,0,0.9)]"
          onPointerMove={onMove}
          onPointerLeave={() => setPointer({ x: 0, y: 0 })}
          onClick={() => setPulse(1)}
          role="application"
          aria-label="Helio instrument. Move the pointer to aim. Activate to pulse."
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setPulse(1)
            }
          }}
        >
          {reduced || !ready ? (
            <img
              src={stills.instrument()}
              alt="Still of the Helio instrument"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Suspense
              fallback={
                <img
                  src={stills.instrument()}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              }
            >
              <OrbitalScene
                pointer={pointer}
                mode={mode}
                pulse={pulse}
                active={inView}
                onReady={() => setWebgl(true)}
              />
            </Suspense>
          )}
          <Grain className="opacity-[0.1]" />
          <p className="pointer-events-none absolute right-5 bottom-5 font-mono text-[10px] tracking-[0.2em] text-ivory/45 uppercase">
            Canvas stays inside this plate
          </p>
        </div>
      </div>
    </section>
  )
}
