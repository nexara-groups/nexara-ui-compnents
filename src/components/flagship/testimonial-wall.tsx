'use client'

import { Grain, HelioMark, cn, springs, useContainedPointer } from '@/components/flagship/primitives.tsx'
import { portraits } from '@/flagship/assets.ts'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

export type Voice = {
  id: string
  name: string
  role: string
  studio: string
  quote: string
  portrait: string
  depth: number
}

const defaultVoices: Voice[] = [
  {
    id: 'meera',
    name: 'Meera Iyer',
    role: 'Design director',
    studio: 'Harbor Press',
    quote: 'We stopped decorating the backlog. The iris made the argument for us.',
    portrait: portraits.meera(),
    depth: 0,
  },
  {
    id: 'eli',
    name: 'Eli Okonkwo',
    role: 'Studio lead',
    studio: 'North Lamp',
    quote: 'The desk feels like a tool left open, not a tour.',
    portrait: portraits.eli(),
    depth: 1,
  },
  {
    id: 'hana',
    name: 'Hana Mori',
    role: 'Producer',
    studio: 'Paper Tide',
    quote: 'Archive as a dimmer is the first metaphor my editors believed.',
    portrait: portraits.hana(),
    depth: 2,
  },
  {
    id: 'otto',
    name: 'Otto Klein',
    role: 'Partner',
    studio: 'Atelier 18',
    quote: 'I can show a client the beam. I cannot show them a slide.',
    portrait: portraits.otto(),
    depth: 1,
  },
  {
    id: 'luz',
    name: 'Luz Navarro',
    role: 'Art director',
    studio: 'Vespers',
    quote: 'The wall has weight. Hover a card and the room leans.',
    portrait: portraits.luz(),
    depth: 0,
  },
  {
    id: 'amir',
    name: 'Amir Haddad',
    role: 'Engineer',
    studio: 'Signal House',
    quote: 'Command palette is how we actually move, not the pretty hero.',
    portrait: portraits.amir(),
    depth: 2,
  },
]

const studios = ['All', ...Array.from(new Set(defaultVoices.map((item) => item.studio)))]

export type TestimonialWallProps = {
  voices?: Voice[]
  className?: string
}

export function TestimonialWall({ voices = defaultVoices, className }: TestimonialWallProps) {
  const [filter, setFilter] = useState('All')
  const [focus, setFocus] = useState<string | null>(voices[0]?.id ?? null)
  const pointer = useContainedPointer<HTMLDivElement>()
  const visible = useMemo(
    () => (filter === 'All' ? voices : voices.filter((item) => item.studio === filter)),
    [filter, voices],
  )
  const featured = voices.find((item) => item.id === focus) ?? visible[0]

  return (
    <section id="voices" className={cn('relative overflow-hidden bg-void px-4 py-24 md:px-8 md:py-32', className)}>
      <Grain className="opacity-[0.1]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
              <HelioMark className="size-6" />
              Fig 2.1 · Voices
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.04em] text-ivory">
              A wall with a shared light.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter studios">
            {studios.map((studio) => (
              <button
                key={studio}
                type="button"
                role="tab"
                aria-selected={filter === studio}
                onClick={() => setFilter(studio)}
                className={cn(
                  'h-9 rounded-full border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                  filter === studio ? 'border-ember text-ivory' : 'border-ivory/15 text-ivory/55',
                )}
              >
                {studio}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={pointer.ref}
          onPointerMove={pointer.onPointerMove}
          onPointerLeave={pointer.onPointerLeave}
          className="mt-12 grid gap-4 md:grid-cols-12"
          style={{ perspective: '1400px' }}
        >
          {visible.length === 0 ? (
            <p className="col-span-full rounded-[1.6rem] border border-ivory/10 p-8 text-fog">No studio in this filter.</p>
          ) : (
            visible.map((voice, index) => {
              const wide = index % 5 === 0
              return (
                <motion.article
                  key={voice.id}
                  layout
                  transition={springs.ui}
                  onClick={() => setFocus(voice.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') setFocus(voice.id)
                  }}
                  tabIndex={0}
                  className={cn(
                    'relative overflow-hidden rounded-[1.6rem] border border-ivory/10 bg-carbon p-5 outline-none focus-visible:ring-2 focus-visible:ring-ion',
                    wide ? 'md:col-span-7' : 'md:col-span-5',
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{
                    rotateX: voice.depth === 2 ? 7 : 4,
                    rotateY: voice.depth === 0 ? -5 : 4,
                    y: -8,
                    z: 24,
                  }}
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at var(--lx, 50%) var(--ly, 20%), rgba(243,234,216,0.16), transparent 42%)',
                    }}
                    animate={{
                      ['--lx' as string]: `${50 + pointer.nx.get() * 40}%`,
                      ['--ly' as string]: `${24 + pointer.ny.get() * 30}%`,
                    }}
                  />
                  <div className="relative flex items-start gap-4">
                    <img
                      src={voice.portrait}
                      alt=""
                      className="size-16 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-serif text-2xl leading-tight text-ivory">{voice.name}</p>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-fog uppercase">
                        {voice.role} · {voice.studio}
                      </p>
                    </div>
                  </div>
                  <blockquote className="relative mt-5 text-lg leading-7 text-ivory/85">“{voice.quote}”</blockquote>
                </motion.article>
              )
            })
          )}
        </div>

        {featured ? (
          <aside className="mt-8 overflow-hidden rounded-[1.8rem] border border-ivory/10 bg-carbon">
            <div className="grid md:grid-cols-[16rem_minmax(0,1fr)]">
              <img src={featured.portrait} alt="" className="h-56 w-full object-cover md:h-full" />
              <div className="p-6 md:p-8">
                <p className="font-mono text-[11px] tracking-[0.2em] text-brass uppercase">Held quote</p>
                <p className="mt-4 font-serif text-3xl leading-snug text-ivory md:text-4xl">“{featured.quote}”</p>
                <p className="mt-6 text-sm text-fog">
                  {featured.name}, {featured.role} at {featured.studio}.
                </p>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  )
}
