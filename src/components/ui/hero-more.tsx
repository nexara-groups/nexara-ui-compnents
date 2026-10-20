'use client'

import { Grain, Magnetic, springs } from '@/lib/kit.tsx'
import { DEFAULT_LOGOS, HERO_STILLS, heroAsset } from '@/lib/hero-media.ts'
import { asText } from '@/lib/library.ts'
import {
  CountStat,
  DefaultActions,
  Dust,
  Float,
  Heading,
  Lines,
  LiveBars,
  LiveSpark,
  Rise,
  Shell,
  Still,
  Sweep,
  Tilt,
  TypeLine,
  loadEase,
  type LayoutProps,
} from '@/lib/hero-motion.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

export function HeroMore(props: LayoutProps) {
  switch (props.variant) {
    case 'rotate':
      return <RotateHero {...props} />
    case 'veil':
      return <VeilHero {...props} />
    case 'splice':
      return <SpliceHero {...props} />
    case 'mesh':
      return <MeshHero {...props} />
    case 'glyph':
      return <GlyphHero {...props} />
    case 'fan':
      return <FanHero {...props} />
    case 'ribbon':
      return <RibbonHero {...props} />
    case 'converse':
      return <ConverseHero {...props} />
    case 'assemble':
      return <AssembleHero {...props} />
    case 'iso':
      return <IsoHero {...props} />
    case 'league':
      return <LeagueHero {...props} />
    default:
      return <PopHero {...props} />
  }
}

function RotateHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const stage = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })
  const [spin, setSpin] = useState(reduced ? 8 : -18)
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (props.progress !== 'scroll' || reduced) return
    setSpin(-28 + value * 56)
  })
  useEffect(() => {
    if (reduced || props.progress === 'scroll') return
    const id = window.setInterval(() => {
      setSpin((deg) => {
        const next = deg + 0.55
        return next > 28 ? -28 : next
      })
    }, 32)
    return () => window.clearInterval(id)
  }, [props.progress, reduced])
  return (
    <section
      ref={stage}
      data-nexara="hero"
      data-variant="rotate"
      data-tier="advanced"
      className={cn('relative isolate bg-[#f4f1ea] [font-family:Outfit,sans-serif] text-[#1c1914]', props.className)}
      style={{ height: props.progress === 'scroll' && !reduced ? '160vh' : undefined, ...props.style }}
    >
      <div className={cn(props.progress === 'scroll' && !reduced ? 'sticky top-0 min-h-svh' : 'min-h-svh')}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#d9efe8,transparent_55%)]" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
          <strong className="tracking-tight">Vesper</strong>
          <div className="hidden gap-5 text-[13px] text-[#5c574e] md:flex">
            <span>Clinic</span>
            <span>Device</span>
            <span>Trials</span>
          </div>
          <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#0f766e] px-4 text-sm font-semibold text-white">
            Book a demo
          </Magnetic>
        </nav>
        <div className="relative z-10 grid items-center gap-8 px-6 pb-12 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#0f766e] uppercase">
              {props.eyebrow ?? 'Vesper Pulse · 510(k) cleared'}
            </p>
            {props.title ? (
              <Heading as={props.Title} className={cn('mt-3 text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.92] font-bold tracking-[-0.05em]', props.titleClassName)}>
                {props.title}
              </Heading>
            ) : (
              <Lines
                as={props.Title}
                className={cn('mt-3 text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.92] font-bold tracking-[-0.05em]', props.titleClassName)}
                lines={['A clinic device', 'you can turn.']}
              />
            )}
            <Rise>
              <p className={cn('mt-4 max-w-md leading-7 text-[#5c574e]', props.descriptionClassName)}>
                {props.description ??
                  'Pulse sits on the intake desk at Harbor Clinic. Scroll and the puck turns — heart rate, SpO₂, and skin temperature on one ring, read in twelve seconds.'}
              </p>
            </Rise>
            <Rise delay={0.14} className={cn('mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
              {props.actions ?? (
                <DefaultActions
                  primary="Reserve Pulse"
                  secondary="See the trial"
                  primaryClass="inline-flex h-11 items-center rounded-full bg-[#0f766e] px-4 text-sm font-semibold text-white"
                  secondaryClass="inline-flex h-11 items-center rounded-full border border-[#1c1914]/15 px-4 text-sm font-semibold"
                />
              )}
            </Rise>
            <div className="mt-8 flex flex-wrap gap-8">
              {(props.stats ?? null) ? (
                (props.stats ?? []).map((item) => (
                  <div key={item.label}>
                    <b className="block text-2xl">{item.value}</b>
                    <span className="font-mono text-[11px] text-[#7a7468]">{item.label}</span>
                  </div>
                ))
              ) : (
                <>
                  <CountStat to={12} suffix="s" label="intake read" valueClass="text-2xl" className="text-[11px] text-[#7a7468]" />
                  <CountStat to={14} suffix="d" label="battery" valueClass="text-2xl" className="text-[11px] text-[#7a7468]" />
                  <CountStat to={98} suffix="%" label="nurse confidence" valueClass="text-2xl" className="text-[11px] text-[#7a7468]" />
                </>
              )}
            </div>
          </div>
          <div className={cn('relative', props.mediaClassName)}>
            <motion.div
              className="relative mx-auto w-[min(100%,28rem)] overflow-hidden rounded-[36px] border border-[#1c1914]/10 bg-[#ece7dc] shadow-[0_40px_80px_-36px_rgba(28,25,20,.45)]"
              style={{ transform: reduced ? undefined : `perspective(1200px) rotateY(${spin}deg) rotateX(8deg)` }}
            >
              {props.media === null ? null : (props.media ?? <Still src={heroAsset(HERO_STILLS.puck)} alt="Vesper Pulse diagnostic puck" className="aspect-square" />)}
              <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#0f766e]">
                ROT {Math.round(spin)}°
              </span>
            </motion.div>
            <Float className="absolute top-8 right-0 hidden w-40 rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg md:block" amplitude={8}>
              <small className="block font-mono text-[10px] tracking-[0.14em] text-[#0f766e]">HR</small>
              <CountStat to={72} suffix=" bpm" label="resting" valueClass="text-lg" className="text-[11px] text-[#7a7468]" />
            </Float>
            <Float className="absolute bottom-10 left-0 hidden w-40 rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg md:block" delay={0.4} amplitude={7}>
              <small className="block font-mono text-[10px] tracking-[0.14em] text-[#0f766e]">SpO₂</small>
              <CountStat to={98} suffix="%" label="room air" valueClass="text-lg" className="text-[11px] text-[#7a7468]" />
            </Float>
          </div>
        </div>
      </div>
    </section>
  )
}

function VeilHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const maskId = `veil-knock-${useId().replaceAll(':', '')}`
  const word = (asText(props.title) || 'VEIL').toUpperCase()
  const Title = props.Title
  return (
    <Shell variant="veil" className={cn('flex min-h-svh flex-col bg-black text-[#f7efe2]', props.className)} style={props.style}>
      <div className="absolute inset-0">
        {props.media === null ? null : reduced ? (
          <Still src={heroAsset(HERO_STILLS.cinema)} alt="Night street for Kin fashion film" />
        ) : (
          (props.media ?? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={heroAsset(HERO_STILLS.cinema)}
              src={heroAsset(HERO_STILLS.veil)}
            />
          ))
        )}
      </div>
      <Grain className="z-[1] opacity-30" />
      <svg className="pointer-events-none absolute inset-0 z-[2] h-full w-full" aria-hidden="true">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="white" />
            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              fill="black"
              style={{
                fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                fontSize: 'clamp(4.6rem, 18vw, 12rem)',
                letterSpacing: '0.06em',
                fontWeight: 400,
              }}
            >
              {word}
            </text>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#050505" fillOpacity="0.86" mask={`url(#${maskId})`} />
      </svg>
      <Sweep className="z-[1] via-white/10" />
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong className="tracking-[0.28em]">KIN</strong>
        <span className="hidden font-mono text-[11px] tracking-[0.2em] md:block">FASHION FILM · SS26</span>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full border border-[#f7efe2]/40 bg-black/55 px-4 text-sm mix-blend-normal">
          Book a slot
        </Magnetic>
      </nav>
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-16 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#e8c36a] uppercase">{props.eyebrow ?? 'Kin pictures · reel 04'}</p>
        <Title className={cn('sr-only', props.titleClassName)}>{word}</Title>
        <Rise>
          <p className={cn('mt-4 max-w-md font-serif text-lg text-[#f7efe2]/90 italic', props.descriptionClassName)}>
            {props.description ??
              'The type is a window. Rain, sodium lamps, and a coat that moves — Kin cuts fashion films where the headline is the mask.'}
          </p>
        </Rise>
        <div className={cn('relative z-30 isolate mt-6', props.actionsClassName)}>
          {props.actions ?? (
            <Magnetic
              href="#hero"
              className="grid size-16 place-items-center rounded-full bg-[#f7efe2] text-lg font-bold text-black shadow-[0_12px_32px_rgba(0,0,0,.45)] mix-blend-normal"
              strength={12}
            >
              ▶
            </Magnetic>
          )}
        </div>
      </div>
    </Shell>
  )
}

function SpliceHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const [x, setX] = useState(52)
  function onMove(event: ReactPointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect()
    setX(Math.min(92, Math.max(8, ((event.clientX - box.left) / box.width) * 100)))
  }
  return (
    <Shell variant="splice" className={cn('flex min-h-svh flex-col bg-[#ece7dc] text-[#1a1612]', props.className)} style={props.style}>
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong className="font-serif text-xl">Hearth</strong>
        <div className="hidden gap-5 text-[13px] text-[#6b6258] md:flex">
          <span>Rooms</span>
          <span>Studio</span>
          <span>Book</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#9a3412] px-4 text-sm font-semibold text-[#f6efe4]">
          Plan a visit
        </Magnetic>
      </nav>
      <div className="relative z-10 grid flex-1 items-center gap-8 px-6 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#9a3412] uppercase">{props.eyebrow ?? 'Hearth studio · loft 4B'}</p>
          {props.title ? (
            <Heading as={props.Title} className={cn('mt-3 font-serif text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.9]', props.titleClassName)}>
              {props.title}
            </Heading>
          ) : (
            <Lines
              as={props.Title}
              className={cn('mt-3 font-serif text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.9]', props.titleClassName)}
              lines={['The room,', <i key="rewritten" className="text-[#9a3412]">rewritten.</i>]}
            />
          )}
          <Rise>
            <p className={cn('mt-4 max-w-md leading-7 text-[#5c534a]', props.descriptionClassName)}>
              {props.description ??
                'Drag the seam. Tuesday’s empty plaster on the left, Friday’s oak and linen on the right. Hearth restores lofts in the old warehouse district — twelve weeks, one drawing.'}
            </p>
          </Rise>
          <Rise delay={0.14} className={cn('mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Tour 4B"
                secondary="See the drawing"
                primaryClass="inline-flex h-11 items-center rounded-full bg-[#9a3412] px-4 text-sm font-semibold text-[#f6efe4]"
                secondaryClass="inline-flex h-11 items-center rounded-full border border-[#1a1612]/15 px-4 text-sm font-semibold"
              />
            )}
          </Rise>
        </div>
        <Tilt className={props.mediaClassName} strength={6}>
          <div
            className="relative min-h-[22rem] cursor-ew-resize overflow-hidden rounded-[28px] border border-[#1a1612]/10 shadow-[0_30px_60px_-32px_rgba(26,22,18,.45)]"
            onPointerMove={reduced ? undefined : onMove}
            onPointerDown={onMove}
          >
            {props.media === null ? null : (
              <>
                <Still src={heroAsset(HERO_STILLS.after)} alt="Loft after Hearth restoration" />
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
                  <Still src={heroAsset(HERO_STILLS.before)} alt="Loft before restoration" />
                </div>
                <div className="absolute inset-y-0 z-10 w-0.5 bg-white shadow" style={{ left: `${x}%` }}>
                  <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-[#1a1612] shadow">
                    ◂▸
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[11px] tracking-[0.14em] text-white uppercase">Before</span>
                <span className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-[11px] tracking-[0.14em] text-[#9a3412] uppercase">After</span>
              </>
            )}
          </div>
        </Tilt>
      </div>
    </Shell>
  )
}

function MeshHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const word = 'IRIS'
  return (
    <Shell variant="mesh" className={cn('flex min-h-svh flex-col bg-[#12081c] text-[#f6f0ff]', props.className)} style={props.style}>
      <div className="pointer-events-none absolute -inset-[20%] blur-[70px]" aria-hidden="true">
        <motion.div
          className="absolute top-[-10%] left-[8%] size-[50vw] rounded-[40%]"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 64%)' }}
          animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 24, 0], borderRadius: ['40%', '48%', '40%'] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[20%] right-[-8%] size-[46vw] rounded-[42%]"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 62%)' }}
          animate={reduced ? undefined : { x: [0, -30, 0], y: [0, 18, 0], borderRadius: ['42%', '36%', '42%'] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-18%] left-[30%] size-[40vw] rounded-[46%]"
          style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 60%)' }}
          animate={reduced ? undefined : { x: [0, 22, 0], borderRadius: ['46%', '38%', '46%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <Dust count={42} />
      <Sweep />
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong>Iris</strong>
        <div className="hidden gap-5 text-[13px] text-[#d8c8f0] md:flex">
          <span>Canvas</span>
          <span>Tokens</span>
          <span>Pricing</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-[#12081c]">
          Open Iris
        </Magnetic>
      </nav>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <p className="font-mono text-[11px] tracking-[0.24em] text-[#f9a8d4] uppercase">{props.eyebrow ?? 'Iris canvas · live mesh'}</p>
        <div className="relative mt-4">
          {reduced
            ? null
            : Array.from({ length: 48 }, (_, i) => (
                <motion.i
                  key={i}
                  className="absolute size-1.5 rounded-full bg-white"
                  initial={{ x: ((i * 47) % 280) - 140, y: ((i * 31) % 160) - 80, opacity: 0 }}
                  animate={{
                    x: (i % 12) * 22 - 120,
                    y: Math.floor(i / 12) * 18 - 28,
                    opacity: [0.9, 0.15, 0],
                  }}
                  transition={{ duration: 1.1, delay: i * 0.012, ease: loadEase }}
                />
              ))}
          {props.title ? (
            <Heading as={props.Title} className={cn('text-[clamp(3.4rem,12vw,8.4rem)] leading-[0.86] font-extrabold tracking-[-0.06em]', props.titleClassName)}>
              {props.title}
            </Heading>
          ) : (
            <Heading as={props.Title} className={cn('text-[clamp(3.4rem,12vw,8.4rem)] leading-[0.86] font-extrabold tracking-[-0.06em]', props.titleClassName)} delay={0.35}>
              {word}
            </Heading>
          )}
        </div>
        <Rise delay={0.4}>
          <p className={cn('mx-auto mt-4 max-w-lg leading-7 text-[#e4d4f8]', props.descriptionClassName)}>
            {props.description ??
              'A morphing mesh, then the product. Iris is the canvas for brand systems — tokens, type, and a live proof card that already shows tonight’s palette.'}
          </p>
        </Rise>
        <Rise delay={0.5} className={cn('mt-7 flex flex-wrap justify-center gap-3', props.actionsClassName)}>
          {props.actions ?? (
            <DefaultActions
              primary="Start a canvas"
              secondary="Steal the mesh"
              primaryClass="inline-flex h-11 items-center rounded-full bg-white px-4 text-sm font-bold text-[#12081c]"
              secondaryClass="inline-flex h-11 items-center rounded-full border border-white/20 px-4 text-sm font-bold"
            />
          )}
        </Rise>
        <div className={cn('mt-10 grid w-full max-w-3xl gap-3 md:grid-cols-3', props.mediaClassName)}>
          {[
            ['Palette', 'Magenta · Violet · Ice'],
            ['Deploys', '2,184 this week'],
            ['Studios', DEFAULT_LOGOS.slice(0, 3).join(' · ')],
          ].map(([k, v], i) => (
            <Float key={k} delay={i * 0.2} amplitude={6} className="rounded-2xl border border-white/15 bg-white/8 p-4 text-left backdrop-blur-md">
              <small className="block font-mono text-[10px] tracking-[0.16em] text-[#f9a8d4] uppercase">{k}</small>
              <b className="text-lg font-medium">{v}</b>
            </Float>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function GlyphHero(props: LayoutProps) {
  const letters = [
    { ch: 'N', src: HERO_STILLS.agency },
    { ch: 'O', src: HERO_STILLS.atrium },
    { ch: 'R', src: HERO_STILLS.mountains },
    { ch: 'T', src: HERO_STILLS.magazine },
    { ch: 'H', src: HERO_STILLS.loft },
  ]
  const reduced = usePrefersReducedMotion()
  return (
    <Shell variant="glyph" className={cn('flex min-h-svh flex-col bg-[#0b0b0b] text-[#f5f1e8]', props.className)} style={props.style}>
      <Sweep className="via-white/8" />
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong className="tracking-[0.2em]">NORTH</strong>
        <div className="hidden gap-5 text-[13px] text-[#b5aea2] md:flex">
          <span>Work</span>
          <span>Studio</span>
          <span>Index</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#f97316] px-4 text-sm font-bold text-[#1a0b00]">
          Start a brief
        </Magnetic>
      </nav>
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-12">
        <p className="text-center font-mono text-[11px] tracking-[0.24em] text-[#f97316] uppercase">{props.eyebrow ?? 'Northbound · independent studio'}</p>
        {props.title ? (
          <Heading as={props.Title} className={cn('mt-4 text-center text-[clamp(3rem,10vw,8rem)] leading-none font-extrabold', props.titleClassName)}>
            {props.title}
          </Heading>
        ) : (
          <props.Title className={cn('mx-auto mt-6 grid w-full max-w-5xl grid-cols-5 gap-1 px-4 text-center text-[clamp(3.2rem,10vw,7.2rem)] leading-none font-extrabold tracking-[-0.06em]', props.titleClassName)}>
            {letters.map((letter, i) => (
              <motion.span
                key={letter.ch}
                className="block bg-cover bg-center bg-clip-text text-transparent"
                style={{
                  backgroundImage: `url(${heroAsset(letter.src)})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={reduced ? false : { y: 36, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.07 * i, ease: loadEase }}
              >
                {letter.ch}
              </motion.span>
            ))}
          </props.Title>
        )}
        <Rise delay={0.45}>
          <p className={cn('mx-auto mt-6 max-w-xl text-center leading-7 text-[#c4bdb0]', props.descriptionClassName)}>
            {props.description ??
              'Photography lives inside the letters. Northbound is an independent studio for brands that still commission pictures — campaigns, spaces, and the type that holds them.'}
          </p>
        </Rise>
        <Rise delay={0.55} className={cn('mt-7 flex justify-center gap-3', props.actionsClassName)}>
          {props.actions ?? (
            <DefaultActions
              primary="See the index"
              secondary="Commission"
              primaryClass="inline-flex h-11 items-center rounded-full bg-[#f97316] px-4 text-sm font-bold text-[#1a0b00]"
              secondaryClass="inline-flex h-11 items-center rounded-full border border-white/15 px-4 text-sm font-bold"
            />
          )}
        </Rise>
      </div>
    </Shell>
  )
}

function FanHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const cards = [
    { title: 'Harbor', meta: 'Athletic · 2026', src: HERO_STILLS.athlete },
    { title: 'Pulse', meta: 'Device · 12s', src: HERO_STILLS.puck },
    { title: 'Hearth', meta: 'Loft 4B', src: HERO_STILLS.after },
    { title: 'Playfield', meta: 'Academy', src: HERO_STILLS.academy },
    { title: 'Kin', meta: 'Fashion film', src: HERO_STILLS.cinema },
  ]
  return (
    <Shell variant="fan" className={cn('flex min-h-svh flex-col bg-[#f6f3ec] text-[#171412]', props.className)} style={props.style}>
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong>Folio</strong>
        <div className="hidden gap-5 text-[13px] text-[#6b645c] md:flex">
          <span>Work</span>
          <span>People</span>
          <span>Journal</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#be123c] px-4 text-sm font-semibold text-white">
          Start a project
        </Magnetic>
      </nav>
      <div className="relative z-10 grid flex-1 items-center gap-8 px-6 pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#be123c] uppercase">{props.eyebrow ?? 'Folio · independent agency'}</p>
          {props.title ? (
            <Heading as={props.Title} className={cn('mt-3 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.94] font-extrabold tracking-[-0.05em]', props.titleClassName)}>
              {props.title}
            </Heading>
          ) : (
            <Lines
              as={props.Title}
              className={cn('mt-3 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.94] font-extrabold tracking-[-0.05em]', props.titleClassName)}
              lines={['Work that', 'lands in a fan.']}
            />
          )}
          <Rise>
            <p className={cn('mt-4 max-w-md leading-7 text-[#5c564e]', props.descriptionClassName)}>
              {props.description ??
                'Five campaigns, one stack. Folio is the independent studio behind Harbor Athletic, Vesper, and Hearth — cards fan on load so the work is the first screen.'}
            </p>
          </Rise>
          <Rise delay={0.14} className={cn('mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Browse the index"
                secondary="Write a brief"
                primaryClass="inline-flex h-11 items-center rounded-full bg-[#be123c] px-4 text-sm font-semibold text-white"
                secondaryClass="inline-flex h-11 items-center rounded-full border border-[#171412]/15 px-4 text-sm font-semibold"
              />
            )}
          </Rise>
        </div>
        <div className={cn('relative mx-auto h-[26rem] w-full max-w-3xl overflow-visible md:h-[32rem]', props.mediaClassName)}>
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              className="absolute top-4 left-1/2 w-[9.25rem] overflow-hidden rounded-2xl border border-[#171412]/10 bg-white shadow-[0_24px_50px_-28px_rgba(23,20,18,.5)] md:w-[10.75rem]"
              style={{ transformOrigin: '50% 0%', zIndex: 4 - Math.abs(i - 2) }}
              initial={reduced ? false : { x: '-50%', rotate: 0, y: 36, opacity: 0.4 }}
              animate={{
                x: `calc(-50% + ${(i - 2) * 118}px)`,
                rotate: -16 + i * 8,
                y: 8 + Math.abs(i - 2) * 18,
                opacity: 1,
              }}
              transition={{ ...springs.heavy, delay: 0.06 * i }}
            >
              {props.media === null ? null : <Still src={heroAsset(card.src)} alt={card.title} className="h-40 md:h-48" />}
              <div className="border-t border-[#171412]/10 bg-[#171412] px-2.5 py-2 text-[#f6f3ec]">
                <b className="block truncate text-[13px] leading-tight tracking-tight">{card.title}</b>
                <span className="font-mono text-[9px] tracking-[0.14em] text-[#f6f3ec]/70 uppercase">{card.meta}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function WorkTrack({
  items,
  reverse,
  reduced,
}: {
  items: { src: string; label: string }[]
  reverse?: boolean
  reduced: boolean
}) {
  const strip = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-3"
        animate={reduced ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {strip.map((item, i) => (
          <figure key={`${item.label}-${i}`} className="w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10">
            <Still src={heroAsset(item.src)} alt="" className="h-36" />
            <figcaption className="bg-[#1a1a1a] px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-[#facc15] uppercase">{item.label}</figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  )
}

function RibbonHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const rowA = [
    { src: HERO_STILLS.agency, label: 'North wall' },
    { src: HERO_STILLS.athlete, label: 'Night track' },
    { src: HERO_STILLS.after, label: 'Loft 4B' },
    { src: HERO_STILLS.academy, label: 'Playfield' },
    { src: HERO_STILLS.magazine, label: 'Folio 11' },
    { src: HERO_STILLS.cinema, label: 'Kin reel' },
  ]
  const rowB = [
    { src: HERO_STILLS.puck, label: 'Pulse' },
    { src: HERO_STILLS.hvac, label: 'Kiln roof' },
    { src: HERO_STILLS.iso, label: 'Plant 03' },
    { src: HERO_STILLS.clinic, label: 'Harbor' },
    { src: HERO_STILLS.loft, label: 'Yard HQ' },
    { src: HERO_STILLS.mountains, label: 'Print 07' },
  ]
  return (
    <Shell variant="ribbon" className={cn('flex min-h-svh flex-col bg-[#111] text-[#f5f1ea]', props.className)} style={props.style}>
      <Sweep className="via-[#facc15]/20" />
      <div className="relative z-10 pt-8">
        <WorkTrack items={rowA} reduced={reduced} />
      </div>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <p className="font-mono text-[11px] tracking-[0.24em] text-[#facc15] uppercase">{props.eyebrow ?? 'Yard studio · selected work'}</p>
        {props.title ? (
          <Heading as={props.Title} className={cn('mt-3 text-[clamp(3rem,8vw,7rem)] leading-[0.86] font-extrabold tracking-[-0.06em]', props.titleClassName)}>
            {props.title}
          </Heading>
        ) : (
          <Lines
            as={props.Title}
            className={cn('mt-3 text-[clamp(3rem,8vw,7rem)] leading-[0.86] font-extrabold tracking-[-0.06em]', props.titleClassName)}
            lines={['SEE THE', 'WORK.']}
          />
        )}
        <Rise>
          <p className={cn('mx-auto mt-4 max-w-lg leading-7 text-[#cfc6b8]', props.descriptionClassName)}>
            {props.description ??
              'An infinite ribbon of commissions. Yard is the production studio that prints, films, and hangs the work — two lanes, always moving, always named.'}
          </p>
        </Rise>
        <Rise delay={0.16} className={cn('mt-7', props.actionsClassName)}>
          {props.actions ?? (
            <DefaultActions
              primary="Open the index"
              secondary="Book the yard"
              primaryClass="inline-flex h-11 items-center rounded-full bg-[#facc15] px-4 text-sm font-bold text-[#111]"
              secondaryClass="inline-flex h-11 items-center rounded-full border border-white/15 px-4 text-sm font-bold"
            />
          )}
        </Rise>
      </div>
      <div className="relative z-10 pb-8">
        <WorkTrack items={rowB} reverse reduced={reduced} />
      </div>
    </Shell>
  )
}

function ConverseHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const script = props.lines ?? [
    { id: '1', role: 'user' as const, text: 'I’d like a follow-up for my knee. Thursday if Dr. Okonkwo is in.' },
    { id: '2', role: 'agent' as const, text: 'Thursday 9:20 is open with Dr. Okonkwo. Holding room 2 at Harbor Clinic.' },
    { id: '3', role: 'user' as const, text: 'Please send the pre-visit note to my phone.' },
    { id: '4', role: 'agent' as const, text: 'Sent. Bring the Pulse ring if you still have last week’s reading.' },
  ]
  const [n, setN] = useState(reduced ? script.length : 1)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setN((count) => {
        if (count >= script.length) {
          window.clearInterval(id)
          return count
        }
        return count + 1
      })
    }, 1100)
    return () => window.clearInterval(id)
  }, [reduced, script.length])
  const shown = script.slice(0, n)
  return (
    <Shell variant="converse" className={cn('flex min-h-svh flex-col bg-[#f7f5f2] text-[#1c1917]', props.className)} style={props.style}>
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong>Harbor Clinic</strong>
        <div className="hidden gap-5 text-[13px] text-[#57534e] md:flex">
          <span>Visit</span>
          <span>Doctors</span>
          <span>Records</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#0369a1] px-4 text-sm font-semibold text-white">
          Book a visit
        </Magnetic>
      </nav>
      <div className="relative z-10 grid flex-1 items-center gap-8 px-6 pb-10 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#0369a1] uppercase">{props.eyebrow ?? 'Harbor Clinic · intake'}</p>
          {props.title ? (
            <Heading as={props.Title} className={cn('mt-3 text-[clamp(2.3rem,4.8vw,4.2rem)] leading-[0.94] font-bold tracking-[-0.04em]', props.titleClassName)}>
              {props.title}
            </Heading>
          ) : (
            <Lines
              as={props.Title}
              className={cn('mt-3 text-[clamp(2.3rem,4.8vw,4.2rem)] leading-[0.94] font-bold tracking-[-0.04em]', props.titleClassName)}
              lines={['The visit', 'starts as a chat.']}
            />
          )}
          <Rise>
            <p className={cn('mt-4 max-w-md leading-7 text-[#57534e]', props.descriptionClassName)}>
              {props.description ??
                'Harbor Clinic books in the lobby. The intake desk types with you — named doctors, real rooms, a Pulse reading from last week if you have one.'}
            </p>
          </Rise>
          <Rise delay={0.14} className={cn('mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Hold Thursday 9:20"
                secondary="Meet the doctors"
                primaryClass="inline-flex h-11 items-center rounded-full bg-[#0369a1] px-4 text-sm font-semibold text-white"
                secondaryClass="inline-flex h-11 items-center rounded-full border border-[#1c1917]/15 px-4 text-sm font-semibold"
              />
            )}
          </Rise>
        </div>
        <Tilt className={props.mediaClassName} strength={7}>
          <div className="overflow-hidden rounded-[28px] border border-[#1c1917]/8 bg-white shadow-[0_30px_60px_-32px_rgba(28,25,23,.35)]">
            <div className="flex items-center justify-between border-b border-[#ece7e0] px-4 py-3 text-[13px]">
              <span className="font-semibold">Harbor desk</span>
              <span className="font-mono text-[11px] text-[#0369a1]">Dr. Okonkwo · in clinic</span>
            </div>
            <div className="grid gap-2 p-4 md:grid-cols-[7.5rem_1fr]">
              <Still src={heroAsset(HERO_STILLS.clinic)} alt="Harbor Clinic lobby" className="h-28 rounded-2xl md:h-full" />
              <div className="space-y-2">
                {shown.map((line) => (
                  <div
                    key={line.id}
                    className={cn(
                      'rounded-2xl px-3 py-2 text-[13px] leading-5',
                      line.role === 'user' ? 'ml-6 bg-[#0369a1] text-white' : 'mr-6 bg-[#f3efe9] text-[#1c1917]',
                    )}
                  >
                    {line.id === shown.at(-1)?.id && !reduced ? <TypeLine text={line.text} speed={12} /> : line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </Shell>
  )
}

function AssembleHero(props: LayoutProps) {
  const tiles = [
    { id: 'arr', title: 'ARR', span: 'col-span-2 md:col-span-6' },
    { id: 'lat', title: 'p95 latency', span: 'col-span-1 md:col-span-3' },
    { id: 'err', title: 'Error budget', span: 'col-span-1 md:col-span-3' },
    { id: 'inc', title: 'Incidents', span: 'col-span-2 md:col-span-6' },
    { id: 'reg', title: 'Regions', span: 'col-span-2 md:col-span-6' },
    { id: 'live', title: 'Live agents', span: 'col-span-1 md:col-span-6' },
    { id: 'desk', title: 'Desk cam', span: 'col-span-1 md:col-span-6' },
  ]
  const incidents = [
    ['14:02', 'checkout-edge', 'watch'],
    ['13:51', 'ingest-eu', 'clear'],
    ['13:12', 'auth-apac', 'page'],
  ]
  return (
    <Shell variant="assemble" className={cn('flex min-h-svh flex-col bg-[#071018] text-[#e8f4ff]', props.className)} style={props.style}>
      <Dust count={28} color="rgba(34,211,238,.55)" />
      <Sweep className="z-[1] via-cyan-200/20" />
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong>Nimbus</strong>
        <div className="hidden gap-5 text-[13px] text-[#9ec4d8] md:flex">
          <span>Ops</span>
          <span>Regions</span>
          <span>Status</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#22d3ee] px-4 text-sm font-bold text-[#04202a] mix-blend-normal">
          Open the desk
        </Magnetic>
      </nav>
      <div className="relative z-10 grid flex-1 items-start gap-6 px-6 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#22d3ee] uppercase">{props.eyebrow ?? 'Nimbus · glass ops'}</p>
          {props.title ? (
            <Heading as={props.Title} className={cn('mt-3 text-[clamp(2.3rem,5vw,4.4rem)] leading-[0.92] font-bold tracking-[-0.05em]', props.titleClassName)}>
              {props.title}
            </Heading>
          ) : (
            <Lines
              as={props.Title}
              className={cn('mt-3 text-[clamp(2.3rem,5vw,4.4rem)] leading-[0.92] font-bold tracking-[-0.05em]', props.titleClassName)}
              lines={['The desk', 'assembles itself.']}
            />
          )}
          <Rise>
            <p className={cn('mt-4 max-w-md leading-7 text-[#b7d4e6]', props.descriptionClassName)}>
              {props.description ??
                'Seven widgets fly in, numbers count, the sparkline keeps moving. Nimbus is the glass console for regional ops — revenue, latency, incidents, and the live board in one first screen.'}
            </p>
          </Rise>
          <div className={cn('relative z-30 isolate mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Launch Nimbus"
                secondary="Read status"
                primaryClass="inline-flex h-11 items-center rounded-full bg-[#22d3ee] px-5 text-sm font-bold text-[#04202a] shadow-[0_10px_28px_rgba(34,211,238,.4)] ring-2 ring-[#04202a] mix-blend-normal"
                secondaryClass="inline-flex h-11 items-center rounded-full border border-cyan-200/40 bg-[#071018] px-5 text-sm font-bold text-[#e8f4ff] mix-blend-normal"
              />
            )}
          </div>
        </div>
        <div className={cn('grid grid-cols-2 gap-2 overflow-visible md:grid-cols-12 md:gap-2.5', props.mediaClassName)}>
          {tiles.map((tile, i) => (
            <motion.article
              key={tile.id}
              className={cn('rounded-2xl border border-cyan-200/30 bg-[#0b2530] p-3', tile.span)}
              initial={{ y: 28, opacity: 0.15, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ ...springs.heavy, delay: 0.05 * i }}
            >
              <small className="block font-mono text-[10px] tracking-[0.16em] text-[#67e8f9] uppercase">{tile.title}</small>
              {tile.id === 'arr' ? (
                <div className="mt-1 grid gap-2 md:grid-cols-[auto_1fr] md:items-end">
                  <CountStat to={248} suffix="k" label="this quarter" valueClass="text-2xl text-white md:text-3xl" className="text-[11px] text-[#9ec4d8]" />
                  <LiveSpark className="h-12 w-full" stroke="#22d3ee" />
                </div>
              ) : null}
              {tile.id === 'lat' ? (
                <CountStat to={98} suffix="ms" label="p95 edge" valueClass="text-2xl text-white" className="mt-1 text-[11px] text-[#9ec4d8]" />
              ) : null}
              {tile.id === 'err' ? (
                <div className="mt-1">
                  <CountStat to={99} suffix=".95%" label="30d remaining" valueClass="text-2xl text-white" className="text-[11px] text-[#9ec4d8]" />
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.i
                      className="block h-full rounded-full bg-[#22d3ee]"
                      initial={{ width: 0 }}
                      animate={{ width: '86%' }}
                      transition={{ ...springs.heavy, delay: 0.35 }}
                    />
                  </div>
                </div>
              ) : null}
              {tile.id === 'inc' ? (
                <table className="mt-2 w-full text-left font-mono text-[11px] text-[#d7eef8]">
                  <tbody>
                    {incidents.map((row) => (
                      <tr key={row[0]} className="border-t border-white/10 first:border-0">
                        <td className="py-1 pr-2 text-[#67e8f9]">{row[0]}</td>
                        <td className="py-1 pr-2">{row[1]}</td>
                        <td className={cn('py-1 text-right', row[2] === 'clear' ? 'text-[#5eead4]' : row[2] === 'page' ? 'text-[#fda4af]' : 'text-[#facc15]')}>
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              {tile.id === 'reg' ? (
                <div>
                  <p className="mt-1 text-sm font-semibold text-white">EU · US · APAC</p>
                  <LiveBars className="mt-2 h-12" colors={['#22d3ee', '#38bdf8', '#818cf8', '#67e8f9', '#5eead4']} />
                </div>
              ) : null}
              {tile.id === 'live' ? (
                <div className="mt-1">
                  <p className="text-lg font-semibold text-white">14 on desk</p>
                  <p className="mt-1 font-mono text-[11px] text-[#9ec4d8]">
                    <TypeLine text="canary 12% on checkout-edge" delay={0.4} speed={18} />
                  </p>
                </div>
              ) : null}
              {tile.id === 'desk' ? (
                <div className="mt-2 overflow-hidden rounded-xl">
                  {props.media === null ? null : <Still src={heroAsset(HERO_STILLS.loft)} alt="Nimbus ops loft" className="h-20 md:h-24" />}
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function IsoHero(props: LayoutProps) {
  return (
    <Shell variant="iso" className={cn('flex min-h-svh flex-col bg-[#e8eef2] text-[#123043]', props.className)} style={props.style}>
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong>Kiln Mechanical</strong>
        <div className="hidden gap-5 text-[13px] text-[#4b6473] md:flex">
          <span>Plants</span>
          <span>Service</span>
          <span>Drawings</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#c2410c] px-4 text-sm font-semibold text-white">
          Call the shop
        </Magnetic>
      </nav>
      <div className="relative z-10 grid flex-1 items-center gap-8 px-6 pb-10 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#c2410c] uppercase">{props.eyebrow ?? 'Kiln · plant 03 · HVAC'}</p>
          {props.title ? (
            <Heading as={props.Title} className={cn('mt-3 text-[clamp(2.3rem,5vw,4.3rem)] leading-[0.94] font-bold tracking-[-0.05em]', props.titleClassName)}>
              {props.title}
            </Heading>
          ) : (
            <Lines
              as={props.Title}
              className={cn('mt-3 text-[clamp(2.3rem,5vw,4.3rem)] leading-[0.94] font-bold tracking-[-0.05em]', props.titleClassName)}
              lines={['The plant,', 'in one drawing.']}
            />
          )}
          <Rise>
            <p className={cn('mt-4 max-w-md leading-7 text-[#3e5868]', props.descriptionClassName)}>
              {props.description ??
                'Kiln runs rooftop plants for hospitals and schools. The isometric is the first screen: coils, ducts, and live temperatures from plant 03.'}
            </p>
          </Rise>
          <div className={cn('relative z-30 isolate mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Open plant 03"
                secondary="Service window"
                primaryClass="inline-flex h-11 items-center rounded-full bg-[#c2410c] px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(194,65,12,.45)] ring-2 ring-white mix-blend-normal"
                secondaryClass="inline-flex h-11 items-center rounded-full border border-[#123043]/20 bg-white px-5 text-sm font-semibold text-[#123043] mix-blend-normal"
              />
            )}
          </div>
          <div className="mt-8 flex gap-8">
            <CountStat to={64} suffix="°" label="supply air" valueClass="text-2xl" className="text-[11px] text-[#4b6473]" />
            <CountStat to={18} suffix=" min" label="to setpoint" valueClass="text-2xl" className="text-[11px] text-[#4b6473]" />
          </div>
        </div>
        <Tilt className={cn('relative', props.mediaClassName)} strength={8}>
          <div className="overflow-hidden rounded-[28px] border border-[#123043]/10 bg-white shadow-[0_30px_60px_-32px_rgba(18,48,67,.4)]">
            {props.media === null ? null : (props.media ?? <Still src={heroAsset(HERO_STILLS.iso)} alt="Isometric HVAC plant drawing" className="h-[22rem] md:h-[28rem]" />)}
            <Float className="absolute top-4 left-4 rounded-xl bg-white/90 px-3 py-2 text-[12px] shadow" amplitude={6}>
              Coil A · 64°
            </Float>
            <Float className="absolute right-4 bottom-6 rounded-xl bg-[#c2410c] px-3 py-2 text-[12px] text-white shadow" delay={0.3} amplitude={7}>
              Roof plant 03
            </Float>
            <motion.span
              className="pointer-events-none absolute top-[30%] left-[18%] h-0.5 w-24 origin-left bg-[#c2410c]"
              animate={{ scaleX: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </div>
        </Tilt>
      </div>
    </Shell>
  )
}

function LeagueHero(props: LayoutProps) {
  return (
    <Shell variant="league" className={cn('flex min-h-svh flex-col bg-[#04150f] text-[#e8ffe9]', props.className)} style={props.style}>
      <div className="absolute inset-0">
        {props.media === null ? null : (props.media ?? <Still src={heroAsset(HERO_STILLS.athlete)} alt="Night track athlete" />)}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04150f] via-[#04150f]/55 to-transparent" />
      </div>
      <Sweep className="z-[1] via-[#facc15]/25" />
      <Grain className="z-[1] opacity-20" />
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong className="tracking-[0.14em]">HARBOR ATHLETIC</strong>
        <div className="hidden gap-5 text-[13px] text-[#b8e0b4] md:flex">
          <span>Fixtures</span>
          <span>Clubs</span>
          <span>Tickets</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#facc15] px-4 text-sm font-bold text-[#04150f] mix-blend-normal">
          Buy a ticket
        </Magnetic>
      </nav>
      <div className="relative z-10 mt-auto px-6 pb-14 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.24em] text-[#facc15] uppercase">{props.eyebrow ?? 'Harbor Athletic · night meet'}</p>
        {props.title ? (
          <Heading as={props.Title} className={cn('mt-3 max-w-[12ch] text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.88] font-black tracking-[-0.05em]', props.titleClassName)}>
            {props.title}
          </Heading>
        ) : (
          <Lines
            as={props.Title}
            className={cn('mt-3 max-w-[12ch] text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.88] font-black tracking-[-0.05em]', props.titleClassName)}
            lines={['The association,', 'after dark.']}
          />
        )}
        <Rise>
          <p className={cn('mt-4 max-w-md leading-7 text-[#c6e8c4]', props.descriptionClassName)}>
            {props.description ??
              'Friday night under the floodlights. Harbor Athletic runs the regional track league — clubs, times, and a scoreboard that is already counting.'}
          </p>
        </Rise>
        <div className="mt-6 flex flex-wrap gap-8">
          <CountStat to={48} suffix=".02" label="women’s 400" valueClass="text-3xl text-[#facc15]" className="text-[11px] tracking-[0.12em] uppercase" />
          <CountStat to={12} suffix=" clubs" label="on the card" valueClass="text-3xl" className="text-[11px] tracking-[0.12em] uppercase" />
        </div>
        <div className={cn('relative z-30 isolate mt-7 flex flex-wrap gap-3', props.actionsClassName)}>
          {props.actions ?? (
            <DefaultActions
              primary="Get tickets"
              secondary="Club list"
              primaryClass="inline-flex h-12 items-center rounded-full bg-[#facc15] px-6 text-sm font-bold text-[#04150f] shadow-[0_10px_28px_rgba(250,204,21,.5)] ring-2 ring-[#04150f] mix-blend-normal"
              secondaryClass="inline-flex h-12 items-center rounded-full border-2 border-[#facc15] bg-[#04150f] px-6 text-sm font-bold text-[#facc15] mix-blend-normal"
            />
          )}
        </div>
      </div>
    </Shell>
  )
}

function PopHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const blobs = [
    { c: '#fb7185', x: '8%', y: '18%', s: 180 },
    { c: '#38bdf8', x: '72%', y: '12%', s: 160 },
    { c: '#facc15', x: '18%', y: '70%', s: 140 },
    { c: '#34d399', x: '78%', y: '64%', s: 150 },
  ]
  return (
    <Shell variant="pop" className={cn('flex min-h-svh flex-col bg-[#fff7ed] text-[#1c1917]', props.className)} style={props.style}>
      {blobs.map((blob, i) => (
        <motion.span
          key={blob.c}
          className="pointer-events-none absolute rounded-full opacity-80 blur-2xl"
          style={{ left: blob.x, top: blob.y, width: blob.s, height: blob.s, background: blob.c }}
          animate={reduced ? undefined : { x: [0, 16, 0], y: [0, -12, 0] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      ))}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <strong className="text-xl">Playfield</strong>
        <div className="hidden gap-5 text-[13px] text-[#57534e] md:flex">
          <span>Classes</span>
          <span>Teachers</span>
          <span>Apply</span>
        </div>
        <Magnetic href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#f43f5e] px-4 text-sm font-semibold text-white">
          Apply for spring
        </Magnetic>
      </nav>
      <div className="relative z-10 grid flex-1 items-center gap-8 px-6 pb-10 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#f43f5e] uppercase">{props.eyebrow ?? 'Playfield Academy · spring term'}</p>
          {props.title ? (
            <Heading as={props.Title} className={cn('mt-3 text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[0.92] font-extrabold tracking-[-0.05em]', props.titleClassName)}>
              {props.title}
            </Heading>
          ) : (
            <Lines
              as={props.Title}
              className={cn('mt-3 text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[0.92] font-extrabold tracking-[-0.05em]', props.titleClassName)}
              lines={[
                'A school that',
                <>
                  looks like <span className="text-[#f43f5e]">Saturday.</span>
                </>,
              ]}
            />
          )}
          <Rise>
            <p className={cn('mt-4 max-w-md leading-7 text-[#57534e]', props.descriptionClassName)}>
              {props.description ??
                'Playfield is the colourful academy in the old brick yard. Morning drawing, afternoon games, a courtyard that already looks like the first day of term.'}
            </p>
          </Rise>
          <Rise delay={0.14} className={cn('mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Apply for spring"
                secondary="Meet teachers"
                primaryClass="inline-flex h-11 items-center rounded-full bg-[#f43f5e] px-4 text-sm font-semibold text-white"
                secondaryClass="inline-flex h-11 items-center rounded-full bg-white px-4 text-sm font-semibold shadow-[0_10px_30px_-18px_rgba(80,40,40,.45)]"
              />
            )}
          </Rise>
        </div>
        <Tilt className={props.mediaClassName} strength={8}>
          <div className="overflow-hidden rounded-[32px] border-4 border-white shadow-[0_30px_60px_-28px_rgba(80,40,40,.35)]">
            {props.media === null ? null : (props.media ?? <Still src={heroAsset(HERO_STILLS.academy)} alt="Playfield Academy courtyard" className="h-[22rem] md:h-[28rem]" />)}
            <Float className="absolute top-4 right-4 rounded-2xl bg-white px-3 py-2 text-[12px] font-semibold shadow" amplitude={8}>
              Drawing · 10:00
            </Float>
            <Float className="absolute bottom-5 left-4 rounded-2xl bg-[#38bdf8] px-3 py-2 text-[12px] font-semibold text-white shadow" delay={0.25} amplitude={7}>
              48 new students
            </Float>
          </div>
        </Tilt>
      </div>
    </Shell>
  )
}
