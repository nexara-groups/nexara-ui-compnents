'use client'

import { Grain, HelioMark, cn, springs } from '@/components/flagship/primitives.tsx'
import { stills } from '@/flagship/assets.ts'
import { usePrefersReducedMotion } from '@/lib/utils.ts'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export type StoryChapter = {
  kicker: string
  title: string
  body: string
  mode: 'focus' | 'aperture' | 'signal' | 'archive'
}

const defaultChapters: StoryChapter[] = [
  {
    kicker: '01 · Focus',
    title: 'The room goes dim so one object can speak.',
    body: 'Helio pins the active signal and lets the rest of the desk fall to fog. No extra panels. No extra light.',
    mode: 'focus',
  },
  {
    kicker: '02 · Aperture',
    title: 'Exposure is a decision, not a filter.',
    body: 'Open the iris when a thread is ready. The desk records who opened it, and how wide.',
    mode: 'aperture',
  },
  {
    kicker: '03 · Signal',
    title: 'A beam is only useful if it lands.',
    body: 'Each pulse writes a readable line — owner, strength, next action — instead of a firehose.',
    mode: 'signal',
  },
  {
    kicker: '04 · Archive',
    title: 'Archive is a dimmer, not a grave.',
    body: 'Closed work stays in the plate, just darker. You can still aim at it. You just do not have to.',
    mode: 'archive',
  },
]

export type ScrollStoryProps = {
  chapters?: StoryChapter[]
  className?: string
}

export function ScrollStory({ chapters = defaultChapters, className }: ScrollStoryProps) {
  const reduced = usePrefersReducedMotion()
  const stage = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, springs.heavy)
  const [index, setIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(chapters.length - 1, Math.floor(value * chapters.length + 0.001))
    setIndex(next)
  })

  const chapter = chapters[index] ?? chapters[0]
  const fill = useTransform(progress, [0, 1], ['0%', '100%'])

  function jump(i: number) {
    const node = stage.current
    if (!node) return
    const at = (i + 0.08) / chapters.length
    const top = node.offsetTop + (node.offsetHeight - window.innerHeight) * at
    window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section
      ref={stage}
      id="story"
      className={cn('relative', className)}
      style={{ height: reduced ? 'auto' : `${chapters.length * 100}vh` }}
      aria-label="Scroll story"
    >
      <div className={cn('bg-void', reduced ? 'relative' : 'sticky top-0 h-svh overflow-hidden')}>
        <Grain className="opacity-[0.1]" />
        <div className="mx-auto grid h-full max-w-6xl items-center gap-10 px-5 py-24 md:grid-cols-2 md:px-8">
          <div>
            <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
              <HelioMark className="size-6" />
              Fig 1.0 · Story
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.kicker}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -14 }}
                transition={springs.ui}
              >
                <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-ivory/45 uppercase">{chapter.kicker}</p>
                <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,4.2rem)] leading-[0.96] tracking-[-0.04em] text-ivory">
                  {chapter.title}
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-fog">{chapter.body}</p>
              </motion.div>
            </AnimatePresence>
            <ol className="mt-10 flex flex-wrap gap-2" aria-label="Chapters">
              {chapters.map((item, i) => (
                <li key={item.kicker}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === index ? 'step' : undefined}
                    className={cn(
                      'h-9 rounded-full border px-3 font-mono text-[10px] tracking-[0.16em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                      i === index ? 'border-ember text-ivory' : 'border-ivory/15 text-ivory/45',
                    )}
                  >
                    {item.mode}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ivory/10 bg-carbon md:aspect-[5/6]">
            <InstrumentPlate mode={chapter.mode} progress={index / (chapters.length - 1)} />
            <motion.span
              className="absolute top-0 left-0 h-full w-px bg-ember"
              style={{ height: fill }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function InstrumentPlate({ mode, progress }: { mode: StoryChapter['mode']; progress: number }) {
  const still =
    mode === 'focus' ? stills.desk() : mode === 'aperture' ? stills.aperture() : mode === 'signal' ? stills.instrument() : stills.dial()

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={still}
          src={still}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={springs.heavy}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
      <svg className="absolute inset-6 text-ivory" viewBox="0 0 200 240" aria-hidden="true">
        <circle cx="100" cy="110" r={28 + progress * 40} fill="none" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="100" cy="110" r="18" fill="none" stroke="#d9a85a" strokeOpacity="0.8" />
        {mode === 'signal' ? (
          <path
            d="M20 190 C 40 160, 60 210, 80 180 S 120 140, 140 170 S 180 200, 190 160"
            fill="none"
            stroke="#3ee0c6"
            strokeWidth="1.6"
          />
        ) : null}
        {mode === 'archive' ? (
          <g stroke="currentColor" strokeOpacity="0.35">
            <rect x="56" y="168" width="88" height="14" fill="none" />
            <rect x="62" y="178" width="88" height="14" fill="none" />
            <rect x="68" y="188" width="88" height="14" fill="none" />
          </g>
        ) : null}
        {mode === 'focus' ? <circle cx="100" cy="110" r="4" fill="#ff4d1c" /> : null}
      </svg>
      <p className="absolute right-5 bottom-5 font-mono text-[10px] tracking-[0.2em] text-ivory/60 uppercase">{mode}</p>
    </div>
  )
}
