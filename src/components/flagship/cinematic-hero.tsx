'use client'

import { stills } from '@/flagship/assets.ts'
import { Grain, HelioMark, Magnetic, cn, springs } from '@/components/flagship/primitives.tsx'
import { usePrefersReducedMotion } from '@/lib/utils.ts'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

const chapters = [
  { at: 0, label: 'Closed', kicker: '00' },
  { at: 0.28, label: 'First light', kicker: '01' },
  { at: 0.58, label: 'Instrument', kicker: '02' },
  { at: 0.86, label: 'Open desk', kicker: '03' },
] as const

export type CinematicHeroProps = {
  eyebrow?: string
  title?: string
  lede?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
}

export function CinematicHero({
  eyebrow = 'Helio · Night instrument',
  title = 'A desk that keeps the signal.',
  lede = 'Open the iris. The night room holds one warm beam so a studio can see what it is actually making.',
  primaryLabel = 'Open the desk',
  primaryHref = '#story',
  secondaryLabel = 'Watch the beam',
  secondaryHref = '#orbital',
  className,
}: CinematicHeroProps) {
  const reduced = usePrefersReducedMotion()
  const stage = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, springs.heavy)
  const [chapter, setChapter] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = [...chapters].reverse().find((item) => value >= item.at)
    setChapter(next ? chapters.indexOf(next) : 0)
  })

  const hole = useTransform(progress, [0, 0.72], reduced ? [78, 78] : [7, 78])
  const clip = useTransform(hole, (value) => `circle(${value}% at 50% 54%)`)
  const bladeSpin = useTransform(progress, [0, 1], [0, 34])
  const bladeFade = useTransform(progress, [0.55, 0.88], [1, 0])
  const bloom = useTransform(progress, [0, 1], [0.15, 0.85])
  const imageScale = useTransform(progress, [0, 1], [1.22, 1])
  const imageY = useTransform(progress, [0, 1], [40, -10])
  const typeY = useTransform(progress, [0, 0.45], [18, 0])
  const typeFade = useTransform(progress, [0, 0.12], [0.92, 1])
  const ctaFade = useTransform(progress, [0.55, 0.82], [0, 1])
  const deskFade = useTransform(progress, [0, 0.4], [0.35, 0])

  function jump(at: number) {
    const node = stage.current
    if (!node) return
    const top = node.offsetTop + (node.offsetHeight - window.innerHeight) * at
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section
      ref={stage}
      className={cn('relative isolate', className)}
      style={{ height: reduced ? '100svh' : '320vh' }}
      aria-label="Cinematic product reveal"
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-void">
        <img
          src={stills.desk()}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          style={{ filter: 'saturate(0.7) brightness(0.45)' }}
        />
        <motion.div className="absolute inset-0 bg-void" style={{ opacity: deskFade }} />

        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.img
            src={stills.instrument()}
            alt="Helio heliograph — a brass crystal in a black gimbal on a night desk"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: imageScale, y: imageY }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: bloom,
              background:
                'radial-gradient(circle at 50% 48%, rgba(255,77,28,0.28), transparent 34%), radial-gradient(circle at 62% 40%, rgba(217,168,90,0.18), transparent 28%)',
            }}
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ rotate: bladeSpin, opacity: bladeFade }}
        >
          <IrisBlades />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#07060b_78%)]" />
        <Grain />

        <div className="relative z-30 flex h-full flex-col justify-between px-5 pt-24 pb-6 md:px-10 md:pt-28 md:pb-8">
          <div className="flex items-center justify-between text-[11px] tracking-[0.22em] text-ivory/55 uppercase">
            <span className="inline-flex items-center gap-3">
              <HelioMark className="size-7" />
              <span className="hidden font-mono sm:inline">{eyebrow}</span>
            </span>
            <span className="hidden font-mono md:block">Fig 0.1 · Iris</span>
          </div>

          <motion.div className="mx-auto max-w-4xl text-center" style={{ y: typeY, opacity: reduced ? 1 : typeFade }}>
            <p className="font-mono text-[11px] tracking-[0.28em] text-brass uppercase">
              {chapters[chapter]?.kicker} / {chapters[chapter]?.label}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.6rem,8vw,7.4rem)] leading-[0.9] tracking-[-0.045em] text-ivory">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-fog md:text-lg">{lede}</p>
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              style={{ opacity: reduced ? 1 : ctaFade }}
            >
              <Magnetic
                href={primaryHref}
                className="inline-flex h-12 items-center rounded-full bg-ember px-6 text-sm font-medium text-[#1a0904] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
              >
                {primaryLabel}
              </Magnetic>
              <Magnetic
                href={secondaryHref}
                className="inline-flex h-12 items-center rounded-full border border-ivory/20 px-6 text-sm text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
              >
                {secondaryLabel}
              </Magnetic>
            </motion.div>
          </motion.div>

          <div className="flex flex-col-reverse items-stretch justify-between gap-5 sm:flex-row sm:items-end">
            <p className="max-w-[16rem] font-mono text-[10px] leading-5 tracking-[0.16em] text-ivory/40 uppercase">
              Scroll to open the iris. The instrument stays in the plate.
            </p>
            <ol className="flex flex-row flex-wrap justify-end gap-x-4 gap-y-2 sm:flex-col sm:items-end" aria-label="Reveal chapters">
              {chapters.map((item, index) => {
                const current = index === chapter
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => jump(item.at)}
                      aria-current={current ? 'step' : undefined}
                      className={cn(
                        'flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                        current ? 'text-ivory' : 'text-ivory/35 hover:text-ivory/70',
                      )}
                    >
                      <span>{item.label}</span>
                      <span className={cn('h-px w-8', current ? 'bg-ember' : 'bg-ivory/25')} />
                      <span>{item.kicker}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function IrisBlades() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 14 }, (_, index) => {
        const angle = (index / 14) * 360
        return (
          <g key={angle} transform={`rotate(${angle} 50 54)`}>
            <path
              d="M50 54 L86 8 L112 -6 L50 54"
              fill="rgba(7,6,11,0.92)"
              stroke="rgba(243,234,216,0.08)"
              strokeWidth="0.15"
            />
          </g>
        )
      })}
      <circle cx="50" cy="54" r="7.2" fill="none" stroke="rgba(217,168,90,0.45)" strokeWidth="0.3" />
    </svg>
  )
}

export function CinematicHeroDemo() {
  return (
    <div className="heliograph overflow-auto rounded-[1.6rem] border border-ivory/10">
      <CinematicHero className="min-h-[220vh]" />
    </div>
  )
}
