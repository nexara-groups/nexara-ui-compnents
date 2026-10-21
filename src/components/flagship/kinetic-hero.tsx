'use client'

import { Grain, HelioMark, cn, springs } from '@/components/flagship/primitives.tsx'
import { stills } from '@/flagship/assets.ts'
import { usePrefersReducedMotion } from '@/lib/utils.ts'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'

const defaultLines = ['THE NIGHT', 'KEEPS SIGNAL']

export type KineticHeroProps = {
  lines?: string[]
  lede?: string
  className?: string
}

export function KineticHero({
  lines = defaultLines,
  lede = 'Letters have mass. Click one to lock it off-axis. Unlock to let the line settle. Scroll shears the pair.',
  className,
}: KineticHeroProps) {
  const reduced = usePrefersReducedMotion()
  const stage = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ['start end', 'end start'],
  })
  const shear = useSpring(scrollYProgress, springs.heavy)
  const x1 = useTransform(shear, [0, 1], reduced ? [0, 0] : [-80, 90])
  const x2 = useTransform(shear, [0, 1], reduced ? [0, 0] : [90, -80])
  const [locked, setLocked] = useState<Record<string, boolean>>({})
  const [active, setActive] = useState<string | null>(null)

  const chars = useMemo(
    () =>
      lines.map((line, lineIndex) =>
        Array.from(line).map((glyph, glyphIndex) => ({
          id: `${lineIndex}-${glyphIndex}`,
          glyph,
          space: glyph === ' ',
        })),
      ),
    [lines],
  )

  const lockedCount = Object.values(locked).filter(Boolean).length

  return (
    <section
      ref={stage}
      id="kinetic"
      className={cn('relative isolate overflow-hidden bg-void py-24 md:py-32', className)}
      aria-label="Kinetic editorial type"
    >
      <img
        src={stills.window()}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-void/70" />
      <Grain />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
            <HelioMark className="size-6" />
            Fig 0.3 · Type
          </p>
          <div className="flex items-center gap-3">
            <p className="font-mono text-[11px] tracking-[0.16em] text-ivory/45 uppercase">{lockedCount} locked</p>
            <button
              type="button"
              onClick={() => setLocked({})}
              className="h-9 rounded-full border border-ivory/20 px-3 font-mono text-[11px] tracking-[0.16em] text-ivory uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
            >
              Unlock
            </button>
          </div>
        </div>

        <div className="mt-10 space-y-2 md:space-y-0">
          {chars.map((line, lineIndex) => (
            <motion.p
              key={lines[lineIndex]}
              className="flex flex-wrap justify-center font-serif text-[clamp(3rem,12vw,9.5rem)] leading-[0.82] tracking-[-0.05em] text-ivory md:flex-nowrap md:justify-between"
              style={{ x: lineIndex === 0 ? x1 : x2 }}
            >
              {line.map((item) => {
                const isLocked = Boolean(locked[item.id])
                const isActive = active === item.id
                if (item.space) {
                  return <span key={item.id} className="inline-block w-[0.28em]" />
                }
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    aria-pressed={isLocked}
                    aria-label={`Letter ${item.glyph}${isLocked ? ', locked' : ''}`}
                    onClick={() =>
                      setLocked((current) => ({
                        ...current,
                        [item.id]: !current[item.id],
                      }))
                    }
                    onPointerEnter={() => setActive(item.id)}
                    onPointerLeave={() => setActive((value) => (value === item.id ? null : value))}
                    className="relative inline-block cursor-pointer px-[0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
                    whileHover={reduced ? undefined : { y: -18, rotate: -6 }}
                    animate={
                      isLocked
                        ? { y: -28, rotate: -10, color: '#ff4d1c' }
                        : isActive
                          ? { y: -12, rotate: -4 }
                          : { y: 0, rotate: 0, color: '#f3ead8' }
                    }
                    transition={springs.snap}
                  >
                    {item.glyph}
                    {isLocked ? (
                      <span className="absolute top-full left-1/2 mt-2 h-1 w-1 -translate-x-1/2 rounded-full bg-ember" />
                    ) : null}
                  </motion.button>
                )
              })}
            </motion.p>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-base leading-7 text-fog">{lede}</p>
      </div>
    </section>
  )
}
