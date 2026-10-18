'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useId, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { LoopPause } from '@/lib/media.tsx'
import {
  CHECK_PATH,
  GlobeField,
  Grain,
  INK_PATH,
  LazyMesh3D,
  LiquidFilter,
  MagneticWell,
  NightType,
  Odometer,
  OrbitRing,
  ParticleField,
  PathDraw,
  ScrambleText,
  ScrollPin,
  ShaderMesh,
  SplitMask,
  TiltGlare,
  WowStage,
  wowBtn,
} from '@/lib/wow.tsx'
import { cn, focusRing, touchTarget, useCountUp, useLoopControl, usePrefersReducedMotion } from '@/lib/utils.ts'
import type { WowProps } from './wow-signatures.tsx'

function HeroCopy({ title, description, actions, eyebrow }: Pick<WowProps, 'title' | 'description' | 'actions' | 'eyebrow'>) {
  return (
    <div className="relative z-10 max-w-2xl px-5 py-10 md:px-10 md:py-16">
      {eyebrow ? <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-[#f3c27a] uppercase">{eyebrow}</p> : null}
      <h3 className="font-serif text-4xl leading-[0.95] text-white md:text-6xl">{title}</h3>
      {description ? <p className="mt-4 max-w-md text-sm leading-6 text-white/70 md:text-base">{description}</p> : null}
      {actions ? <div className="mt-6">{actions}</div> : null}
    </div>
  )
}

function HeroPin({ title, description, actions, eyebrow, className }: WowProps) {
  return (
    <div className={cn('overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#07070c]', className)}>
      <ScrollPin height="240vh">
        {(p) => {
          const scale = 0.42 + p * 0.58
          const radius = 28 - p * 20
          return (
            <div className="relative min-h-[28rem] w-full overflow-hidden">
              <motion.div
                className="absolute inset-x-6 top-8 bottom-8 overflow-hidden bg-[#111118] md:inset-x-10"
                style={{ scale, borderRadius: radius, transformOrigin: '50% 40%' }}
              >
                <ShaderMesh />
                <Grain />
              </motion.div>
              <div className="relative z-10 flex min-h-[28rem] items-end">
                <HeroCopy title={title} description={description} actions={actions} eyebrow={eyebrow ?? 'Scroll the plate'} />
              </div>
              <p className="absolute top-4 right-5 font-mono text-[11px] text-white/40">{Math.round(p * 100)}%</p>
            </div>
          )
        }}
      </ScrollPin>
    </div>
  )
}

function HeroShader(props: WowProps) {
  return (
    <WowStage shader className={cn('min-h-[28rem]', props.className)}>
      <div className="flex min-h-[28rem] flex-col justify-end">
        <HeroCopy
          eyebrow={props.eyebrow ?? 'Void field'}
          title={<ScrambleText text={String(props.title ?? 'The room opens.')} as="span" className="block font-serif" />}
          description={props.description}
          actions={props.actions}
        />
      </div>
    </WowStage>
  )
}

function HeroScramble(props: WowProps) {
  return (
    <WowStage className={cn('min-h-[26rem] px-5 py-10 md:px-10', props.className)}>
      <p className="font-mono text-[11px] tracking-[0.22em] text-[#f3c27a] uppercase">{props.eyebrow ?? 'Lettering'}</p>
      <SplitMask text={'HOLD\nTHE MAST'} className="mt-4 font-serif text-6xl leading-[0.85] md:text-8xl" />
      <ScrambleText text={String(props.title ?? 'Harbor after dark')} className="mt-6 block font-mono text-sm text-white/60" trigger="hover" />
      {props.actions ? <div className="mt-8">{props.actions}</div> : null}
    </WowStage>
  )
}

function HeroGlobe(props: WowProps) {
  const loop = useLoopControl(true)
  return (
    <div className={cn('relative min-h-[28rem] overflow-hidden rounded-[1.6rem] bg-[#07070c] text-white', props.className)}>
      <GlobeField paused={!loop.playing} />
      <OrbitRing items={['Kite', 'Solum', 'Nimbus', 'Vale', 'Orbit']} className="pointer-events-none absolute inset-0 opacity-80" radius={110} paused={!loop.playing} />
      <div className="relative z-10 flex min-h-[28rem] items-end">
        <HeroCopy title={props.title} description={props.description} actions={props.actions} eyebrow={props.eyebrow ?? 'Orbit'} />
      </div>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </div>
  )
}

function HeroMorph(props: WowProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn('min-h-[26rem] overflow-hidden rounded-[1.6rem] bg-[#111113] p-5 text-white md:p-8', props.className)}>
      <p className="font-mono text-[11px] tracking-[0.2em] text-[#f3c27a] uppercase">Shared element</p>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="font-serif text-4xl">{props.title}</h3>
          <p className="mt-3 text-sm text-white/60">{props.description}</p>
          <button type="button" className={cn(wowBtn, 'mt-6 bg-white text-[#111]')} onClick={() => setOpen((v) => !v)}>
            {open ? 'Fold the stage' : 'Open the stage'}
          </button>
        </div>
        <motion.div layoutId="nexara-morph-stage" className="overflow-hidden rounded-3xl bg-[#1b1b22]">
          {open ? <LazyMesh3D className="min-h-64" /> : <div className="flex min-h-48 items-center justify-center font-serif text-5xl">N</div>}
        </motion.div>
      </div>
    </div>
  )
}

function ButtonLiquid({ children, className }: WowProps) {
  const id = useId().replace(/:/g, '')
  const loop = useLoopControl(true)
  return (
    <button type="button" className={cn(wowBtn, 'h-12 min-w-[10rem] bg-[#111113] text-white', className)}>
      <LiquidFilter id={id} />
      <span className="absolute inset-0" style={{ filter: `url(#${id})` }} aria-hidden="true">
        <motion.span
          className="absolute top-1 left-2 size-10 rounded-full bg-[#7c6cff]"
          animate={loop.playing ? { x: [0, 42, 8, 0], y: [0, -6, 4, 0] } : undefined}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute top-2 right-3 size-8 rounded-full bg-[#22c5b0]"
          animate={loop.playing ? { x: [0, -30, 6, 0], y: [0, 8, -4, 0] } : undefined}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
      <span className="relative z-10">{children ?? 'Continue'}</span>
    </button>
  )
}

function ButtonInk({ children, className }: WowProps) {
  return (
    <button type="button" className={cn(wowBtn, 'group h-12 bg-transparent px-0 text-nx-fg', className)}>
      <span className="relative">
        {children ?? 'Continue'}
        <PathDraw d={INK_PATH} className="absolute inset-x-0 -bottom-3 h-6 w-full text-[#4c46e0]" />
      </span>
    </button>
  )
}

function ButtonGlare({ children, className }: WowProps) {
  return (
    <TiltGlare className="inline-block">
      <button type="button" className={cn(wowBtn, 'h-12 bg-[#111113] px-6 text-white shadow-[0_20px_40px_-24px_#7c6cff]', className)}>
        {children ?? 'Continue'}
      </button>
    </TiltGlare>
  )
}

function ButtonBurst({ children, className }: WowProps) {
  const [hot, setHot] = useState(false)
  return (
    <button
      type="button"
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      className={cn(wowBtn, 'h-12 bg-[#111113] text-white', className)}
    >
      {hot ? <ParticleField className="opacity-80" count={40} /> : null}
      <span className="relative z-10">{children ?? 'Continue'}</span>
    </button>
  )
}

function ButtonScramble({ children, className }: WowProps) {
  const label = String(children ?? 'Continue')
  return (
    <button type="button" className={cn(wowBtn, 'h-12 bg-[#4c46e0] text-white', className)}>
      <ScrambleText text={label} trigger="hover" />
    </button>
  )
}

function MagnetGravity({ children, className }: WowProps) {
  return (
    <MagneticWell strength={28} className={className}>
      <button type="button" className={cn(wowBtn, 'h-14 rounded-[1.4rem] bg-white text-[#111] shadow-[0_24px_50px_-28px_#f3c27a]')}>
        {children ?? 'Pull'}
      </button>
    </MagneticWell>
  )
}

function MagnetTrail({ children, className }: WowProps) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 14 })
  const sy = useSpring(y, { stiffness: 160, damping: 14 })
  function move(event: ReactPointerEvent<HTMLButtonElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }
  return (
    <button type="button" onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} className={cn(wowBtn, 'relative h-14 overflow-visible bg-[#111113] text-white', className)}>
      <motion.span aria-hidden="true" className="absolute size-16 rounded-full bg-[#7c6cff]/40 blur-2xl" style={{ x: sx, y: sy }} />
      <span className="relative z-10">{children ?? 'Trail'}</span>
    </button>
  )
}

function MagnetOrbit({ children, className }: WowProps) {
  const loop = useLoopControl(true)
  return (
    <div className={cn('relative inline-flex size-28 items-center justify-center', className)}>
      <OrbitRing items={['N', 'X', '·']} radius={46} paused={!loop.playing} />
      <button type="button" className={cn(wowBtn, 'absolute size-14 bg-white text-[#111]')}>
        {children ?? 'Go'}
      </button>
    </div>
  )
}

function MagnetShatter({ children, className }: WowProps) {
  const [hot, setHot] = useState(false)
  return (
    <button type="button" onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)} className={cn(wowBtn, 'h-14 bg-[#111113] text-white', className)}>
      <motion.span animate={hot ? { letterSpacing: '0.28em' } : { letterSpacing: '0.02em' }}>{children ?? 'Break'}</motion.span>
    </button>
  )
}

function CardHolo({ title, className }: { title: string; className?: string }) {
  return (
    <TiltGlare className={cn('max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#111118] p-5 text-white', className)}>
      <ShaderMesh />
      <Grain />
      <div className="relative z-10">
        <p className="font-mono text-[11px] text-[#f3c27a]">Hologram</p>
        <p className="mt-2 font-serif text-3xl">{title}</p>
        <p className="mt-3 text-sm text-white/60">Pointer tilts the plate. The field is a shader, not a wash.</p>
      </div>
    </TiltGlare>
  )
}

function SpotlightGlare({ className }: { className?: string }) {
  return (
    <TiltGlare className={cn('max-w-sm rounded-3xl border border-nx-border bg-nx-card p-5', className)}>
      <p className="font-mono text-[11px] text-nx-accent">Glare tilt</p>
      <p className="mt-2 font-serif text-3xl">Lamp 04</p>
      <p className="mt-2 text-sm text-nx-muted">Specular highlight follows the pointer. Layers sit on Z.</p>
      <motion.div style={{ translateZ: 28 }} className="mt-4 h-24 rounded-2xl bg-[#111113]" />
    </TiltGlare>
  )
}

function SpotlightWell({ className }: { className?: string }) {
  return (
    <WowStage shader className={cn('min-h-44 max-w-sm p-5', className)}>
      <p className="font-mono text-[11px] text-[#f3c27a]">Shader well</p>
      <p className="mt-2 font-serif text-3xl">Night desk</p>
    </WowStage>
  )
}

function SpotlightOrbit({ className }: { className?: string }) {
  return (
    <div className={cn('relative min-h-44 max-w-sm overflow-hidden rounded-3xl bg-[#07070c] p-5 text-white', className)}>
      <OrbitRing items={['Live', '99.9', 'NYC']} radius={70} />
    </div>
  )
}

function SpotlightScramble({ className }: { className?: string }) {
  const value = useCountUp(998, 1600, true)
  return (
    <div className={cn('max-w-sm rounded-3xl bg-[#111113] p-5 text-white', className)}>
      <ScrambleText text="UPTIME" className="font-mono text-[11px] tracking-[0.2em]" />
      <p className="mt-2 font-serif text-5xl">
        <Odometer value={value} digits={3} />
        <span className="text-2xl text-white/40">.9%</span>
      </p>
    </div>
  )
}

function FlipWow({ variant, className }: { variant: string; className?: string }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button type="button" onClick={() => setFlipped((v) => !v)} className={cn(focusRing, 'h-52 w-full max-w-sm text-left', className)}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative h-full" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 overflow-hidden rounded-3xl bg-[#111113] p-5 text-white" style={{ backfaceVisibility: 'hidden' }}>
          {variant === 'liquid-flip' ? <ShaderMesh /> : null}
          <Grain />
          <p className="relative z-10 font-serif text-3xl">{variant}</p>
          <p className="relative z-10 mt-2 text-sm text-white/60">Tap to turn.</p>
        </div>
        <div className="absolute inset-0 rounded-3xl bg-[#f3c27a] p-5 text-[#111]" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <PathDraw d={CHECK_PATH} className="h-12 w-28 text-[#111]" />
          <p className="mt-4 font-serif text-2xl">The reverse is a drawn mark, not a duplicate face.</p>
        </div>
      </motion.div>
    </button>
  )
}

function BentoWow({ variant, className, title }: { variant: string; className?: string; title?: ReactNode }) {
  const v = useCountUp(1860, 1400, true)
  if (variant === 'shader-tile') {
    return (
      <WowStage shader className={cn('min-h-40 p-5', className)}>
        <p className="font-serif text-2xl">{title ?? 'Mesh'}</p>
      </WowStage>
    )
  }
  if (variant === 'orbit-tile') {
    return (
      <div className={cn('min-h-40 overflow-hidden rounded-3xl bg-[#07070c] p-4 text-white', className)}>
        <OrbitRing items={['A', 'B', 'C', 'D']} radius={58} />
      </div>
    )
  }
  if (variant === 'ticker-tile') {
    return (
      <div className={cn('min-h-40 rounded-3xl bg-nx-card p-5', className)}>
        <p className="text-[11px] text-nx-muted">Athletes</p>
        <p className="mt-2 font-serif text-5xl">
          <Odometer value={v} digits={4} />
        </p>
      </div>
    )
  }
  return (
    <TiltGlare className={cn('min-h-40 rounded-3xl border border-nx-border bg-nx-card p-5', className)}>
      <p className="font-serif text-2xl">{title ?? 'Depth'}</p>
      <p className="mt-2 text-sm text-nx-muted">Mosaic tile with glare. Drop into any bento.</p>
    </TiltGlare>
  )
}

function AuroraWow({ variant, className, children }: WowProps) {
  const loop = useLoopControl(true)
  return (
    <div className={cn('relative min-h-48 overflow-hidden rounded-2xl', className)}>
      {variant === 'shader-mesh' ? <ShaderMesh paused={!loop.playing} /> : null}
      {variant === 'particle-field' ? (
        <div className="absolute inset-0 bg-[#07070c]">
          <ParticleField paused={!loop.playing} />
        </div>
      ) : null}
      {variant === 'globe-field' ? (
        <div className="absolute inset-0 bg-[#07070c]">
          <GlobeField paused={!loop.playing} />
        </div>
      ) : null}
      {variant === 'liquid-glass' ? (
        <>
          <ShaderMesh paused={!loop.playing} />
          <div className="absolute inset-6 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl" />
        </>
      ) : null}
      <Grain />
      <div className="relative z-10 flex min-h-48 items-end p-5 text-white">{children ?? <NightType className="text-2xl">{variant}</NightType>}</div>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
    </div>
  )
}

function GridWow({ variant, className, children }: WowProps) {
  return (
    <div
      className={cn(
        'relative min-h-40 overflow-hidden rounded-2xl border border-nx-border',
        variant === 'perspective-fly' && 'bg-[#07070c] [perspective:800px]',
        className,
      )}
    >
      {variant === 'perspective-fly' ? (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 origin-bottom bg-[linear-gradient(rgba(124,108,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(124,108,255,0.35)_1px,transparent_1px)] bg-size-[32px_32px]"
          animate={{ rotateX: 62, y: [0, 32] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: 'linear' } }}
        />
      ) : null}
      {variant === 'circuit-draw' ? <PathDraw d="M8 20 H 40 V 8 H 72 V 28 H 112" className="absolute inset-4 h-auto w-auto text-[#22c5b0]" /> : null}
      {variant === 'topo-pulse' ? (
        <div className="absolute inset-0 bg-[#07070c]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 left-1/2 size-16 rounded-full border border-[#f3c27a]/40"
              animate={{ scale: [0.4 + i * 0.3, 2.2], opacity: [0.6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.45 }}
            />
          ))}
        </div>
      ) : null}
      {variant === 'hex-orbit' ? (
        <div className="absolute inset-0 bg-[#0b1220]">
          <OrbitRing items={['01', '02', '03', '04', '05', '06']} radius={70} />
        </div>
      ) : null}
      <div className="relative z-10 flex min-h-40 items-end p-5 text-white">{children ?? variant}</div>
    </div>
  )
}

function TextWow({ family, variant, children, className }: WowProps) {
  const label = String(children ?? 'Night, gold, and iris.')
  const year = useCountUp(2026, 1600, true)
  if (variant === 'scramble' || variant === 'scramble-line') {
    return <ScrambleText text={label} className={cn('font-serif text-4xl', className)} trigger="hover" />
  }
  if (variant === 'split-mask' || variant === 'line-mask') {
    return <SplitMask text={'Night,\ngold, iris.'} className={cn('font-serif text-5xl leading-[0.9]', className)} />
  }
  if (variant === 'path-write' || variant === 'svg-draw') {
    return (
      <div className={className}>
        <p className="font-serif text-4xl">{label}</p>
        <PathDraw d={INK_PATH} className="mt-2 h-10 w-48 text-[#4c46e0]" />
      </div>
    )
  }
  if (variant === 'odometer') {
    return (
      <p className={cn('font-serif text-6xl', className)}>
        <Odometer value={year} digits={4} />
      </p>
    )
  }
  if (variant === 'matrix-rain') {
    return (
      <WowStage particles className={cn('min-h-32 px-5 py-6 font-mono text-sm', className)}>
        <ScrambleText text="export const room = 4" className="block" />
      </WowStage>
    )
  }
  if (variant === 'flap-3d') {
    return (
      <div className={cn('flex gap-1', className)}>
        {'GATE'.split('').map((ch) => (
          <span key={ch} className="rounded-md bg-[#111113] px-2 py-1 font-mono text-2xl text-white">
            {ch}
          </span>
        ))}
      </div>
    )
  }
  if (variant === 'letter-physics') {
    return (
      <p className={cn('font-serif text-4xl', className)} aria-label={label}>
        {label.split('').map((ch, i) => (
          <motion.span key={`${ch}-${i}`} className="inline-block" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.03, type: 'spring', stiffness: 260, damping: 16 }}>
            {ch === ' ' ? '\u00a0' : ch}
          </motion.span>
        ))}
      </p>
    )
  }
  if (variant === 'kinetic-stack') {
    return <SplitMask text={'Ship\nthe\nmast'} className={cn('font-serif text-5xl leading-[0.85]', className)} />
  }
  if (variant === 'variable-morph') {
    return (
      <motion.p className={cn('font-serif text-5xl', className)} animate={{ letterSpacing: ['-0.06em', '0.12em', '-0.06em'] }} transition={{ duration: 5, repeat: Infinity }}>
        {label}
      </motion.p>
    )
  }
  return <p className={cn('font-serif text-4xl', className)}>{family} {variant}</p>
}

function NavWow({ variant, className }: WowProps) {
  const [open, setOpen] = useState(true)
  if (variant === 'orbit-nav') {
    return (
      <div className={cn('relative h-40 overflow-hidden rounded-2xl bg-[#07070c]', className)}>
        <OrbitRing items={['Work', 'Notes', 'Atlas']} radius={72} />
      </div>
    )
  }
  if (variant === 'morph-dock') {
    return (
      <div className={cn('flex h-40 items-end justify-center rounded-2xl bg-[#111113] p-4', className)}>
        <motion.nav layout className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur-xl">
          {['Work', 'Notes', 'Atlas'].map((item) => (
            <motion.button layout key={item} type="button" onClick={() => setOpen(!open)} className={cn(touchTarget, 'rounded-full px-3 text-sm')}>
              {open ? item : item[0]}
            </motion.button>
          ))}
        </motion.nav>
      </div>
    )
  }
  if (variant === 'glass-liquid') {
    return (
      <div className={cn('relative h-40 overflow-hidden rounded-2xl', className)}>
        <ShaderMesh />
        <div className="absolute inset-x-6 top-6 flex min-h-11 items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white backdrop-blur-2xl">
          <span>Nexara</span>
          <span>Work</span>
          <span>Start</span>
        </div>
      </div>
    )
  }
  return (
    <div className={cn('flex h-40 items-start justify-center pt-4', className)}>
      <MagneticWell>
        <nav className="flex min-h-11 items-center gap-3 rounded-full border border-nx-border bg-nx-glass px-4 text-sm shadow-[var(--nx-shadow)] backdrop-blur-xl">
          <span className="font-medium">Nexara</span>
          <span className="text-nx-muted">Work</span>
          <span className="text-nx-muted">Notes</span>
        </nav>
      </MagneticWell>
    </div>
  )
}

function ModalWow({ variant, className }: WowProps) {
  const id = useId().replace(/:/g, '')
  if (variant === 'shader-veil') {
    return (
      <WowStage shader className={cn('min-h-64 p-6', className)}>
        <p className="font-mono text-[11px] text-[#f3c27a]">Veil</p>
        <p className="mt-2 font-serif text-3xl">The overlay is a field.</p>
        <p className="mt-2 text-sm text-white/60">Not a dimmed card. The room itself changes material.</p>
      </WowStage>
    )
  }
  if (variant === 'liquid-sheet') {
    return (
      <div className={cn('overflow-hidden rounded-[1.6rem] bg-[#111113] p-6 text-white', className)}>
        <LiquidFilter id={id} />
        <div style={{ filter: `url(#${id})` }} className="mb-4 h-16">
          <span className="inline-block size-16 rounded-full bg-[#7c6cff]" />
          <span className="ml-[-20px] inline-block size-16 rounded-full bg-[#22c5b0]" />
        </div>
        <p className="font-serif text-3xl">Liquid sheet</p>
      </div>
    )
  }
  if (variant === 'particle-confirm') {
    return (
      <div className={cn('relative overflow-hidden rounded-[1.6rem] bg-[#111113] p-6 text-white', className)}>
        <ParticleField count={50} />
        <p className="relative z-10 font-serif text-3xl">Delete the room?</p>
        <PathDraw d={CHECK_PATH} className="relative z-10 mt-4 h-10 w-28 text-[#22c5b0]" />
      </div>
    )
  }
  return (
    <div className={cn('rounded-[1.6rem] border border-nx-border bg-nx-card p-6', className)}>
      <motion.div layoutId="nexara-modal-mark" className="mb-4 size-12 rounded-2xl bg-[#111113] text-center font-serif text-2xl leading-[3rem] text-white">
        N
      </motion.div>
      <p className="font-serif text-3xl">Shared morph</p>
      <p className="mt-2 text-sm text-nx-muted">The mark travels from the trigger into the panel.</p>
    </div>
  )
}

function MarqueeWow({ variant, className }: WowProps) {
  const loop = useLoopControl(true)
  const row = ['Kite', 'Solum', 'Nimbus', 'Vale', 'Orbit', 'Marble']
  if (variant === 'logo-orbit') {
    return (
      <div className={cn('relative min-h-48 overflow-hidden rounded-2xl bg-[#07070c]', className)}>
        <OrbitRing items={row} radius={90} paused={!loop.playing} />
        {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
      </div>
    )
  }
  if (variant === 'cylinder-3d') {
    return (
      <div className={cn('overflow-hidden rounded-2xl bg-[#111113] py-8 [perspective:900px]', className)}>
        <motion.div
          className="flex gap-8 font-serif text-4xl text-white"
          animate={loop.playing ? { x: ['0%', '-50%'] } : undefined}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ transform: 'rotateX(18deg)' }}
        >
          {[...row, ...row].map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </motion.div>
        {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="ml-4 mt-4" /> : null}
      </div>
    )
  }
  if (variant === 'velocity-scroll') {
    return (
      <div className={cn('overflow-hidden rounded-2xl border border-nx-border py-6', className)}>
        <motion.div className="flex gap-10 font-serif text-5xl whitespace-nowrap" animate={loop.playing ? { x: ['0%', '-40%'] } : undefined} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
          {['Stay in the room.', 'Move the furniture.', 'Ship the mast.', 'Stay in the room.'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </motion.div>
      </div>
    )
  }
  return (
    <WowStage className={cn('py-6', className)} particles={false} shader={false}>
      <div className="overflow-hidden">
        <motion.div className="flex gap-8 px-4 font-mono text-sm text-white/70" animate={loop.playing ? { x: ['0%', '-50%'] } : undefined} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
          {[...row, ...row].map((item, i) => (
            <span key={`${item}-${i}`}>{item} · live</span>
          ))}
        </motion.div>
      </div>
    </WowStage>
  )
}

function InputWow({ variant, className }: WowProps) {
  const id = useId().replace(/:/g, '')
  if (variant === 'otp-flip') {
    return (
      <div className={cn('flex gap-2', className)}>
        {['4', '8', '0', '2'].map((n) => (
          <span key={n} className="flex size-12 items-center justify-center rounded-xl bg-[#111113] font-mono text-2xl text-white">
            <Odometer value={Number(n)} digits={1} />
          </span>
        ))}
      </div>
    )
  }
  if (variant === 'path-underline') {
    return (
      <label className={cn('block max-w-sm', className)}>
        <span className="sr-only">Studio</span>
        <input className={cn(focusRing, 'w-full border-0 bg-transparent py-3 text-lg')} placeholder="Harbor" />
        <PathDraw d={INK_PATH} className="h-6 w-full text-[#4c46e0]" />
      </label>
    )
  }
  if (variant === 'magnetic-caret') {
    return (
      <MagneticWell className={className}>
        <input className={cn(focusRing, 'min-h-11 w-full max-w-sm rounded-full border border-nx-field px-4')} placeholder="Ask the desk" />
      </MagneticWell>
    )
  }
  return (
    <div className={cn('relative max-w-sm', className)}>
      <LiquidFilter id={id} />
      <span className="pointer-events-none absolute -top-2 left-6 size-8 rounded-full bg-[#7c6cff]/50" style={{ filter: `url(#${id})` }} />
      <input className={cn(focusRing, 'min-h-11 w-full rounded-2xl border border-nx-field bg-nx-card px-4')} placeholder="Liquid focus" />
    </div>
  )
}

function DragWow({ variant, className, children }: WowProps) {
  if (variant === 'particle-toss') {
    return (
      <div className={cn('relative min-h-52 overflow-hidden rounded-3xl bg-[#07070c] p-4', className)}>
        <ParticleField count={48} />
        <MagneticWell className="relative z-10 max-w-[14rem]">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-xl">
            <p className="font-serif text-xl">{children ?? 'Toss'}</p>
            <p className="mt-1 text-sm text-white/60">The field reacts while you drag.</p>
          </div>
        </MagneticWell>
      </div>
    )
  }
  if (variant === 'magnetic-stack') {
    return (
      <div className={cn('relative min-h-52', className)}>
        {[0, 1, 2].map((i) => (
          <MagneticWell key={i} strength={10 + i * 6} className="absolute left-6" >
            <div className="w-48 rounded-2xl border border-nx-border bg-nx-card p-4" style={{ top: i * 18, transform: `translateY(${i * 18}px) rotate(${i * 2}deg)` }}>
              Sheet {i + 1}
            </div>
          </MagneticWell>
        ))}
      </div>
    )
  }
  if (variant === 'hologram') return <CardHolo title={String(children ?? 'Hologram')} className={className} />
  return (
    <TiltGlare className={cn('max-w-[16rem] rounded-3xl bg-[#111113] p-5 text-white', className)}>
      <p className="font-serif text-2xl">{children ?? 'Deck'}</p>
      <p className="mt-2 text-sm text-white/60">Physics deck. The plate leans as you throw it.</p>
    </TiltGlare>
  )
}

export function WowCore(props: WowProps) {
  const { family, variant } = props
  if (family === 'hero') {
    if (variant === 'pin-scroll') return <HeroPin {...props} />
    if (variant === 'shader-void') return <HeroShader {...props} />
    if (variant === 'scramble-mast') return <HeroScramble {...props} />
    if (variant === 'globe-orbit') return <HeroGlobe {...props} />
    return <HeroMorph {...props} />
  }
  if (family === 'button') {
    if (variant === 'liquid') return <ButtonLiquid {...props} />
    if (variant === 'ink-path') return <ButtonInk {...props} />
    if (variant === 'glare') return <ButtonGlare {...props} />
    if (variant === 'burst') return <ButtonBurst {...props} />
    return <ButtonScramble {...props} />
  }
  if (family === 'magnetic-button') {
    if (variant === 'gravity-well') return <MagnetGravity {...props} />
    if (variant === 'comet-trail') return <MagnetTrail {...props} />
    if (variant === 'orbit-pull') return <MagnetOrbit {...props} />
    return <MagnetShatter {...props} />
  }
  if (family === 'draggable-card') return <DragWow {...props} />
  if (family === 'spotlight-card') {
    if (variant === 'glare-tilt') return <SpotlightGlare className={props.className} />
    if (variant === 'shader-well') return <SpotlightWell className={props.className} />
    if (variant === 'orbit-badge') return <SpotlightOrbit className={props.className} />
    return <SpotlightScramble className={props.className} />
  }
  if (family === 'flip-card') return <FlipWow variant={variant} className={props.className} />
  if (family === 'bento-grid') return <BentoWow variant={variant} className={props.className} title={props.title} />
  if (family === 'aurora-background') return <AuroraWow {...props} />
  if (family === 'grid-background') return <GridWow {...props} />
  if (family === 'gradient-text' || family === 'typewriter' || family === 'text-reveal') return <TextWow {...props} />
  if (family === 'floating-navbar') return <NavWow {...props} />
  if (family === 'modal') return <ModalWow {...props} />
  if (family === 'marquee') return <MarqueeWow {...props} />
  if (family === 'input') return <InputWow {...props} />
  return null
}
