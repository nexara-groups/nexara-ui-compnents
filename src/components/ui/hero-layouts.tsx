'use client'

import { Grain, springs } from '@/lib/kit.tsx'
import { DEFAULT_LOGOS, HERO_STILLS, heroAsset } from '@/lib/hero-media.ts'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { HeroChapter, HeroChatLine, HeroEvent, HeroLogo, HeroProps, HeroVariant } from '@/components/ui/hero.tsx'

const TIER: Record<HeroVariant, 'basic' | 'intermediate' | 'advanced'> = {
  aurora: 'basic',
  brutal: 'basic',
  pastel: 'basic',
  editorial: 'basic',
  spotlight: 'intermediate',
  bento: 'intermediate',
  terminal: 'intermediate',
  cursor: 'intermediate',
  helix: 'advanced',
  cinema: 'advanced',
  atlas: 'advanced',
  reveal: 'advanced',
}

type LayoutProps = HeroProps & {
  variant: HeroVariant
  Title: 'h1' | 'h2' | 'h3'
}

const logosDefault: HeroLogo[] = [...DEFAULT_LOGOS]

export function HeroLayouts(props: LayoutProps) {
  switch (props.variant) {
    case 'aurora':
      return <AuroraHero {...props} />
    case 'brutal':
      return <BrutalHero {...props} />
    case 'pastel':
      return <PastelHero {...props} />
    case 'editorial':
      return <EditorialHero {...props} />
    case 'spotlight':
      return <SpotlightHero {...props} />
    case 'bento':
      return <BentoHero {...props} />
    case 'terminal':
      return <TerminalHero {...props} />
    case 'cursor':
      return <CursorHero {...props} />
    case 'helix':
      return <HelixHero {...props} />
    case 'cinema':
      return <CinemaHero {...props} />
    case 'atlas':
      return <AtlasHero {...props} />
    default:
      return <RevealHero {...props} />
  }
}

const TONE: Record<HeroVariant, CSSProperties> = {
  aurora: { ['--hero-bg' as never]: '#04060f', ['--hero-fg' as never]: '#eef7ff', ['--hero-accent' as never]: '#2ee6c7' },
  brutal: { ['--hero-bg' as never]: '#F4D738', ['--hero-fg' as never]: '#111111', ['--hero-accent' as never]: '#FF2E9A' },
  pastel: { ['--hero-bg' as never]: '#f7f1ea', ['--hero-fg' as never]: '#2a211c', ['--hero-accent' as never]: '#c45c7a' },
  editorial: { ['--hero-bg' as never]: '#efe6d4', ['--hero-fg' as never]: '#1a1612', ['--hero-accent' as never]: '#b33a12' },
  spotlight: { ['--hero-bg' as never]: '#000000', ['--hero-fg' as never]: '#f4f6fb', ['--hero-accent' as never]: '#818cf8' },
  bento: { ['--hero-bg' as never]: '#f3f1ec', ['--hero-fg' as never]: '#171717', ['--hero-accent' as never]: '#171717' },
  terminal: { ['--hero-bg' as never]: '#0b0d10', ['--hero-fg' as never]: '#e7edf3', ['--hero-accent' as never]: '#4ade80' },
  cursor: { ['--hero-bg' as never]: '#0c1018', ['--hero-fg' as never]: '#edf1f7', ['--hero-accent' as never]: '#67e8f9' },
  helix: { ['--hero-bg' as never]: '#050506', ['--hero-fg' as never]: '#f6f1ea', ['--hero-accent' as never]: '#e9a8ff' },
  cinema: { ['--hero-bg' as never]: '#000000', ['--hero-fg' as never]: '#f4ead6', ['--hero-accent' as never]: '#e8c36a' },
  atlas: { ['--hero-bg' as never]: '#06101c', ['--hero-fg' as never]: '#e8f1ff', ['--hero-accent' as never]: '#7dd3fc' },
  reveal: { ['--hero-bg' as never]: '#f6f7fb', ['--hero-fg' as never]: '#111827', ['--hero-accent' as never]: '#111827' },
}

function Shell({
  variant,
  className,
  style,
  children,
}: {
  variant: HeroVariant
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <section
      data-nexara="hero"
      data-variant={variant}
      data-tier={TIER[variant]}
      className={cn(
        'relative isolate overflow-hidden',
        {
          aurora: '[font-family:Syne,sans-serif]',
          brutal: '[font-family:Archivo,sans-serif]',
          pastel: '[font-family:Outfit,sans-serif]',
          editorial: '[font-family:Newsreader,serif]',
          spotlight: '[font-family:"DM Sans",sans-serif]',
          bento: '[font-family:"Plus Jakarta Sans",sans-serif]',
          terminal: '[font-family:"IBM Plex Sans",sans-serif]',
          cursor: '[font-family:"DM Sans",sans-serif]',
          helix: '[font-family:Outfit,sans-serif]',
          cinema: '[font-family:Newsreader,serif]',
          atlas: '[font-family:"Space Grotesk",sans-serif]',
          reveal: '[font-family:"Plus Jakarta Sans",sans-serif]',
        }[variant],
        className,
      )}
      style={{ ...TONE[variant], ...style }}
    >
      {children}
    </section>
  )
}

function Heading({
  as: Title,
  className,
  children,
}: {
  as: 'h1' | 'h2' | 'h3'
  className?: string
  children: ReactNode
}) {
  return <Title className={className}>{children}</Title>
}

function DefaultActions({
  primary,
  secondary,
  primaryClass,
  secondaryClass,
}: {
  primary: string
  secondary: string
  primaryClass: string
  secondaryClass: string
}) {
  return (
    <>
      <a href="#hero" className={primaryClass}>
        {primary}
      </a>
      <a href="#hero" className={secondaryClass}>
        {secondary}
      </a>
    </>
  )
}

function Still({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={cn('h-full w-full object-cover', className)} />
}

function AuroraHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const title = props.title ?? (
    <>
      Light the work
      <br />
      <em className="font-serif font-normal italic bg-gradient-to-r from-[#b9f3ff] via-[#c5b8ff] to-[#7ff0d4] bg-clip-text text-transparent">
        before
      </em>{' '}
      the brief.
    </>
  )
  return (
    <Shell
      variant="aurora"
      className={cn('min-h-svh bg-[#04060f] text-[#eef7ff]', props.className)}
      style={props.style}
    >
      <div className="pointer-events-none absolute -inset-[20%] blur-[70px]" aria-hidden="true">
        <motion.div
          className="absolute top-[-18%] left-[-8%] size-[55vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #5b8cff 0%, transparent 62%)' }}
          animate={reduced ? undefined : { x: [0, 30, 0], y: [0, 18, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[8%] right-[-12%] size-[48vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #7c5cff 0%, transparent 64%)' }}
          animate={reduced ? undefined : { x: [0, -24, 0], y: [0, 22, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-22%] left-[28%] size-[42vw] rounded-full"
          style={{ background: 'radial-gradient(circle, #2ee6c7 0%, transparent 60%)' }}
          animate={reduced ? undefined : { x: [0, 16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '52px 52px' }}
        aria-hidden="true"
      />
      <Grain className="opacity-[0.16]" />
      <nav className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center gap-2.5 text-sm font-bold tracking-tight">
          <span className="size-2.5 rounded-full" style={{ background: 'conic-gradient(#2ee6c7,#7c5cff,#5b8cff,#2ee6c7)' }} />
          Lumen
        </div>
        <div className="hidden gap-5 text-[13px] text-[#c9d7ea] md:flex">
          <span>Product</span>
          <span>Studio</span>
          <span>Pricing</span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur">Open the desk</span>
        </div>
      </nav>
      <div className="relative z-10 grid items-center gap-8 px-5 pb-10 md:grid-cols-2 md:px-10 md:pb-14">
        <div>
          <p className={cn('font-mono text-[11px] tracking-[0.22em] text-[#8ef0dc] uppercase', props.eyebrowClassName)}>
            {props.eyebrow ?? props.kicker ?? 'Design OS · v2.4'}
          </p>
          <Heading
            as={props.Title}
            className={cn(
              'mt-4 text-[clamp(2.6rem,6vw,5.1rem)] leading-[0.92] font-extrabold tracking-[-0.05em]',
              props.titleClassName,
            )}
          >
            {title}
          </Heading>
          <p className={cn('mt-4 max-w-md text-[17px] leading-7 text-[#c5d4ea]', props.descriptionClassName)}>
            {props.description ??
              'Lumen is the glass desk for product studios. Aurora lighting, live tokens, and a product window that actually shows the software — not a gradient oval.'}
          </p>
          <div className={cn('mt-7 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Start a canvas"
                secondary="Watch 48s tour"
                primaryClass="inline-flex h-12 items-center rounded-full bg-[#eef7ff] px-5 text-sm font-bold text-[#08101c]"
                secondaryClass="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/10 px-5 text-sm font-bold backdrop-blur"
              />
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-8">
            {(props.stats ?? [
              { value: '12.4k', label: 'nightly deploys' },
              { value: '98ms', label: 'token roundtrip' },
              { value: '4.9', label: 'studio rating' },
            ]).map((item) => (
              <div key={item.label}>
                <b className="block text-[28px] tracking-[-0.04em]">{item.value}</b>
                <span className="font-mono text-[11px] tracking-[0.08em] text-[#93a7c2]">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs tracking-[0.16em] text-[#9fb3cc] uppercase">
            {(props.logos ?? logosDefault).join(' · ')}
          </p>
        </div>
        <motion.div
          className={cn(
            'relative overflow-hidden rounded-[28px] border border-white/20 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.7)]',
            props.mediaClassName,
          )}
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,.04))',
            transform: reduced ? undefined : 'perspective(1200px) rotateY(-8deg) rotateX(4deg)',
          }}
          initial={reduced ? false : { y: 24, opacity: 0.7 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.heavy}
        >
          {props.media === null ? null : (
            (props.media ?? <Still src={heroAsset(HERO_STILLS.laptop)} alt="Lumen dashboard on a laptop" className="h-[22rem] md:h-[28rem]" />)
          )}
          <span
            className="absolute top-4 right-4 size-20 rounded-full blur-[0.2px]"
            style={{ background: 'conic-gradient(from 200deg, #2ee6c7, #7c5cff, #5b8cff, #2ee6c7)', boxShadow: '0 0 40px #7c5cff88' }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2.5">
            <div className="rounded-2xl border border-white/15 bg-[#080c18]/75 p-3 backdrop-blur-md">
              <small className="block font-mono text-[10px] tracking-[0.14em] text-[#8ef0dc] uppercase">Revenue</small>
              <strong className="text-lg">$24.8k</strong>
            </div>
            <div className="rounded-2xl border border-white/15 bg-[#080c18]/75 p-3 backdrop-blur-md">
              <small className="block font-mono text-[10px] tracking-[0.14em] text-[#8ef0dc] uppercase">Live sessions</small>
              <strong className="text-lg">1,462</strong>
            </div>
          </div>
        </motion.div>
      </div>
    </Shell>
  )
}

function BrutalHero(props: LayoutProps) {
  return (
    <Shell variant="brutal" className={cn('min-h-svh bg-[#F4D738] p-3 text-[#111] md:p-4', props.className)} style={props.style}>
      <div className="grid min-h-[calc(100svh-1.5rem)] border-[6px] border-black bg-[#F4D738] shadow-[14px_14px_0_#111] md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col border-b-[6px] border-black md:border-r-[6px] md:border-b-0">
          <div className="flex items-center justify-between border-b-[6px] border-black px-4 py-3 font-black">
            <span className="text-2xl tracking-tight">STAMP.</span>
            <span className="hidden text-xs tracking-[0.12em] md:block">ISSUE 07 · STUDIO MANUAL</span>
            <span className="rotate-[-8deg] border-4 border-black bg-[#FF2E9A] px-2 py-1 text-xs text-white">NEW</span>
          </div>
          <div className="flex flex-1 flex-col justify-start px-5 py-8 md:px-8">
            <Heading
              as={props.Title}
              className={cn('text-[clamp(3.2rem,8vw,6.8rem)] leading-[0.82] font-black tracking-[-0.05em]', props.titleClassName)}
            >
              {props.title ?? (
                <>
                  MAKE IT
                  <br />
                  <span className="bg-black px-[0.08em] text-[#F4D738]">LOUDER.</span>
                </>
              )}
            </Heading>
            <p className={cn('mt-4 max-w-lg text-lg font-semibold', props.descriptionClassName)}>
              {props.description ??
                'Neo-brutalist first screen: thick rules, offset shadows, one hot pink punch, and photographs that look like they were taped to the wall this morning.'}
            </p>
            <div className={cn('mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
              {props.actions ?? (
                <DefaultActions
                  primary="Buy the issue — $28"
                  secondary="See the paste-up"
                  primaryClass="inline-flex h-12 items-center border-[5px] border-black bg-[#FF2E9A] px-4 text-sm font-extrabold text-white shadow-[6px_6px_0_#111]"
                  secondaryClass="inline-flex h-12 items-center border-[5px] border-black bg-white px-4 text-sm font-extrabold shadow-[6px_6px_0_#111]"
                />
              )}
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {['NO GRADIENTS', 'OFFSET 6PX', 'FLASH ON'].map((label, i) => (
                <span
                  key={label}
                  className={cn(
                    'border-4 border-black px-2 py-1 font-mono text-[12px]',
                    i === 1 ? 'bg-black text-[#F4D738] rotate-3' : i === 2 ? 'bg-[#00E5A8] rotate-[-6deg]' : 'bg-white rotate-[-3deg]',
                  )}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={cn('grid min-h-[22rem] grid-rows-[1.25fr_0.75fr]', props.mediaClassName)}>
          <div className="relative overflow-hidden border-b-[6px] border-black">
            {props.media === null ? null : (
              (props.media ?? <Still src={heroAsset(HERO_STILLS.portrait)} alt="Designer in a yellow jacket" />)
            )}
            <span className="absolute bottom-3 left-3 border-4 border-black bg-white px-2 py-1 font-mono text-[11px] shadow-[5px_5px_0_#111]">
              FIG. 04 · YELLOW JACKET
            </span>
          </div>
          <div className="relative overflow-hidden">
            <Still src={heroAsset(HERO_STILLS.desk)} alt="Studio table with prints and tape" />
            <span className="absolute top-3 right-3 rotate-3 border-4 border-black bg-white px-2 py-1 font-mono text-[11px] shadow-[5px_5px_0_#111]">
              PASTE-UP 11:42
            </span>
          </div>
        </div>
      </div>
    </Shell>
  )
}

function PastelHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const rows = [
    ['Anna Ruiz', 'Team sync', 'Tue 9:00'],
    ['Jordan Lee', '1:1', 'Wed 10:00'],
    ['Taylor Ng', 'Offsite', 'Fri 13:00'],
    ['Sam Okonkwo', 'Interviews', 'Thu 9:30'],
  ]
  return (
    <Shell variant="pastel" className={cn('flex min-h-svh flex-col bg-[#f7f1ea] text-[#2a211c]', props.className)} style={props.style}>
      <motion.span
        className="pointer-events-none absolute -top-20 -left-16 size-[420px] rounded-full bg-[#f8c9d4] opacity-70 blur-[40px]"
        animate={reduced ? undefined : { x: [0, 16, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.span
        className="pointer-events-none absolute top-10 -right-10 size-[380px] rounded-full bg-[#cde7f5] opacity-80 blur-[40px]"
        animate={reduced ? undefined : { y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute bottom-[-80px] left-[38%] size-[300px] rounded-full bg-[#d8f3e2] opacity-75 blur-[40px]" aria-hidden="true" />
      <nav className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <strong className="text-[22px] tracking-tight">Bloom</strong>
        <div className="hidden gap-4 text-sm text-[#5c524c] md:flex">
          <span>Product</span>
          <span>Teams</span>
          <span>Pricing</span>
        </div>
        <a href="#hero" className="inline-flex h-10 items-center rounded-full bg-[#c45c7a] px-4 text-sm font-semibold text-white">
          Get Bloom
        </a>
      </nav>
      <div className="relative z-10 grid flex-1 items-center gap-8 px-5 pb-10 md:grid-cols-[1fr_1.15fr] md:px-10">
        <div>
          <Heading as={props.Title} className={cn('text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.96] font-bold tracking-[-0.05em]', props.titleClassName)}>
            {props.title ?? (
              <>
                People ops with a <i className="font-serif font-medium text-[#c45c7a] italic">soft</i> landing.
              </>
            )}
          </Heading>
          <p className={cn('mt-4 max-w-md leading-7 text-[#5c524c]', props.descriptionClassName)}>
            {props.description ??
              'Cream, blush, sky. A real calendar on a phone, a table of time-off, named humans. Light SaaS that is full, not empty beige.'}
          </p>
          <div className={cn('mt-6 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Start a workspace"
                secondary="See the calendar"
                primaryClass="inline-flex h-11 items-center rounded-full bg-[#c45c7a] px-4 text-sm font-semibold text-white"
                secondaryClass="inline-flex h-11 items-center rounded-full bg-white px-4 text-sm font-semibold shadow-[0_10px_30px_-18px_rgba(80,40,40,.4)]"
              />
            )}
          </div>
          <p className="mt-6 text-xs tracking-[0.12em] text-[#8a7e76] uppercase">{(props.logos ?? logosDefault.slice(0, 4)).join(' · ')}</p>
        </div>
        <div className={cn('grid gap-3 rounded-[28px] bg-white p-3 shadow-[0_30px_60px_-36px_rgba(80,40,40,.35)] md:grid-cols-[8.5rem_1fr_190px]', props.mediaClassName)}>
          <aside className="hidden rounded-[20px] bg-[#f7f1ea] p-3 text-[13px] md:block">
            <p className="mb-3 font-semibold">Bloom</p>
            {['Home', 'People', 'Time off', 'Reviews', 'Payroll'].map((item, i) => (
              <div key={item} className={cn('rounded-xl px-2 py-1.5', i === 2 && 'bg-white font-semibold text-[#c45c7a]')}>
                {item}
              </div>
            ))}
            <p className="mt-6 text-[11px] tracking-[0.12em] text-[#8a7e76] uppercase">Headcount 48</p>
          </aside>
          <div className="p-2">
            <p className="mb-2 text-[12px] tracking-[0.16em] text-[#8a7e76] uppercase">Time off · this week</p>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="text-left font-medium text-[#8a7e76]">
                  <th className="py-2">Name</th>
                  <th>Type</th>
                  <th>When</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]} className="border-t border-[#f0e6dc]">
                    <td className="py-2">{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>
                      <span className="rounded-full bg-[#d8f3e2] px-2 py-0.5 text-[11px] text-[#1f6b4a]">ok</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-2xl bg-[#f7f1ea] p-2">
                <b className="block text-lg">12</b>
                PTO days
              </div>
              <div className="rounded-2xl bg-[#f7f1ea] p-2">
                <b className="block text-lg">4</b>
                1:1s
              </div>
              <div className="rounded-2xl bg-[#f7f1ea] p-2">
                <b className="block text-lg">98%</b>
                pulse
              </div>
            </div>
          </div>
          {props.media === null ? null : (
            (props.media ?? (
              <Still src={heroAsset(HERO_STILLS.phone)} alt="Bloom people ops on a phone" className="h-56 rounded-[22px] md:h-full" />
            ))
          )}
        </div>
      </div>
    </Shell>
  )
}

function EditorialHero(props: LayoutProps) {
  return (
    <Shell variant="editorial" className={cn('flex min-h-svh flex-col bg-[#efe6d4] px-6 py-5 text-[#1a1612] md:px-9', props.className)} style={props.style}>
      <header className="flex items-baseline justify-between border-b border-[#1a1612] pb-2">
        <strong className="font-serif text-xl tracking-[0.18em]">{props.kicker ?? 'ATLAS REVIEW'}</strong>
        <span className="hidden font-mono text-[11px] tracking-[0.16em] md:block">VOL. 04 · NO. 11 · ARCHITECTURE</span>
        <span className="font-mono text-[11px] tracking-[0.16em]">EST. 2019</span>
      </header>
      <div className="grid flex-1 gap-7 py-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Heading as={props.Title} className={cn('font-serif text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.82] font-bold tracking-[-0.04em]', props.titleClassName)}>
            {props.title ?? (
              <>
                The quiet
                <br />
                museum
                <br />
                <i className="font-medium text-[#b33a12] italic">at noon.</i>
              </>
            )}
          </Heading>
          <p className="mt-4 max-w-md font-serif text-[22px] text-[#b33a12] italic">
            “A shaft of light is a headline. Everything else is a caption.”
          </p>
          <div className={cn('mt-4 max-w-xl columns-2 gap-6 text-[15px] leading-[1.45]', props.descriptionClassName)}>
            {props.description ?? (
              <>
                <p>
                  Atlas Review treats the first viewport like a cover: a photograph with weight, type large enough to collide with it, a folio number, a byline, and a way through that is a sentence, not a pill.
                </p>
                <p className="mt-3">This is cream paper and vermillion italic. The still is a concrete atrium, not a gradient plate.</p>
              </>
            )}
          </div>
          <div className={cn('mt-5', props.actionsClassName)}>
            {props.actions ?? (
              <a href="#hero" className="font-mono text-xs tracking-[0.16em] uppercase underline-offset-4 hover:underline">
                Read the essay — 12 min
              </a>
            )}
          </div>
        </div>
        <div className={cn('relative min-h-[22rem]', props.mediaClassName)}>
          {props.media === null ? null : (
            (props.media ?? <Still src={heroAsset(HERO_STILLS.atrium)} alt="Brutalist museum atrium" className="h-full min-h-[22rem]" />)
          )}
          <span className="pointer-events-none absolute inset-2.5 border border-[#efe6d4]/50" aria-hidden="true" />
          <span className="absolute bottom-6 left-2 font-serif text-7xl tracking-[-0.06em] text-[#efe6d4] mix-blend-difference">04</span>
        </div>
      </div>
      <footer className="flex justify-between border-t border-[#1a1612] pt-2.5 font-mono text-[11px] tracking-[0.14em]">
        <span>WORDS · A. OKONKWO</span>
        <span className="hidden md:block">PHOTO · STUDIO NORTH</span>
        <span>PAGE 01 / 24</span>
      </footer>
    </Shell>
  )
}

function SpotlightHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  return (
    <Shell variant="spotlight" className={cn('flex min-h-svh flex-col bg-black text-[#f4f6fb]', props.className)} style={props.style}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(255,255,255,.22), transparent 55%), radial-gradient(ellipse 40% 30% at 70% 80%, rgba(79,70,229,.18), transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, #000 30%, transparent 75%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-4 rounded-[28px]"
        style={{
          padding: 1,
          background: 'conic-gradient(from 180deg, transparent 40%, #818cf8, #22d3ee, transparent 62%)',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        aria-hidden="true"
      />
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <strong className="text-lg tracking-tight">Beacon</strong>
        <div className="hidden gap-5 text-[13px] text-[#9aa3b8] md:flex">
          <span>Ops</span>
          <span>Agents</span>
          <span>Inbox</span>
          <span>Docs</span>
        </div>
        <a href="#hero" className="inline-flex h-9 items-center rounded-[10px] bg-white px-3 text-sm font-semibold text-[#0b0d12]">
          Launch console
        </a>
      </nav>
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-0 text-center">
        <p className="mx-auto inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-[#c7d2fe]">
          ● 14 agents live · incident-free 11d
        </p>
        <Heading as={props.Title} className={cn('mx-auto mt-5 max-w-[16ch] text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.94] font-bold tracking-[-0.06em]', props.titleClassName)}>
          {props.title ?? 'Ops that stay in the beam.'}
        </Heading>
        <p className={cn('mx-auto mt-3 max-w-xl leading-7 text-[#b8c0d4]', props.descriptionClassName)}>
          {props.description ?? 'Beacon is the night console for on-call teams. Spotlight the queue, float the cards that matter, and keep the rest in the dark.'}
        </p>
        <div className={cn('mt-6 flex flex-wrap justify-center gap-3', props.actionsClassName)}>
          {props.actions ?? (
            <DefaultActions
              primary="Open Beacon"
              secondary="Read the runbook"
              primaryClass="inline-flex h-11 items-center rounded-[10px] bg-white px-4 text-sm font-semibold text-[#0b0d12]"
              secondaryClass="inline-flex h-11 items-center rounded-[10px] border border-white/20 px-4 text-sm font-semibold"
            />
          )}
        </div>
        <div className={cn('relative mx-auto mt-auto w-full max-w-[72rem] flex-1 px-2 pt-8 md:px-6', props.mediaClassName)}>
          <motion.div
            className="h-full min-h-[18rem] overflow-hidden rounded-t-[22px] border border-white/10 bg-[#0b0d12] shadow-[0_50px_90px_-24px_#000]"
            style={{ transform: reduced ? undefined : 'perspective(1400px) rotateX(8deg)' }}
            initial={reduced ? false : { y: 28, opacity: 0.7 }}
            animate={{ y: 0, opacity: 1 }}
            transition={springs.heavy}
          >
            {props.media === null ? null : (props.media ?? <OpsConsole />)}
          </motion.div>
        </div>
      </div>
    </Shell>
  )
}

function OpsConsole() {
  const folders = [
    ['Inbox', '128'],
    ['Incidents', '6'],
    ['Runbooks', '41'],
    ['Agents', '14'],
  ]
  const rows = [
    ['INC-204', 'API p95 above 400ms on checkout-edge', 'PAGE', '2m'],
    ['INC-198', 'Checkout 5xx burst · EU-west', 'ACK', '11m'],
    ['INC-190', 'EU-west CPU saturation 92%', 'WATCH', '31m'],
    ['CHG-883', 'Mira posted a patch to rate-limit', 'AUTO', '1h'],
    ['INC-176', 'Webhooks delayed 8s p95', 'WATCH', '2h'],
    ['CHG-801', 'Canary 12% · error budget intact', 'AUTO', '3h'],
  ]
  return (
    <div className="grid h-full min-h-[18rem] grid-cols-[9.5rem_1fr] text-left text-[#e8edf7]">
      <aside className="border-r border-white/8 bg-[#08090e] p-3">
        <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold">
          <span className="size-2 rounded-full bg-[#818cf8]" />
          Beacon
        </p>
        {folders.map(([name, count]) => (
          <div key={name} className={cn('flex justify-between rounded-lg px-2 py-1.5 text-[12px]', name === 'Incidents' && 'bg-white/8')}>
            <span>{name}</span>
            <span className="font-mono text-[10px] text-[#9aa3b8]">{count}</span>
          </div>
        ))}
      </aside>
      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5 text-[12px] text-[#9aa3b8]">
          <span>All open · last 24h</span>
          <span className="font-mono text-[#a5b4fc]">14 agents live</span>
        </div>
        {rows.map((row) => (
          <div key={row[0]} className="grid grid-cols-[4.5rem_1fr_3.5rem_2.5rem] gap-2 border-b border-white/5 px-4 py-2.5 text-[12px]">
            <span className="font-mono text-[#a5b4fc]">{row[0]}</span>
            <span className="truncate">{row[1]}</span>
            <span className="text-right text-[10px] tracking-[0.12em] text-[#c7d2fe]">{row[2]}</span>
            <span className="text-right font-mono text-[10px] text-[#9aa3b8]">{row[3]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BentoHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setTick((n) => n + 1), 1600)
    return () => window.clearInterval(id)
  }, [reduced])
  const chats = [
    { role: 'them', text: 'Ship the pricing table without the neon badge.' },
    { role: 'me', text: 'Drafted. Three plans, one featured, numbers as props.' },
    { role: 'them', text: 'Nice. Add a seats slider under Studio.' },
    { role: 'me', text: 'Slider wired. Accent follows tokens.' },
  ]
  const shown = chats.slice(0, reduced ? chats.length : 2 + (tick % 3))
  return (
    <Shell variant="bento" className={cn('flex min-h-svh flex-col bg-[#f3f1ec] px-4 py-4 text-[#171717] md:px-5', props.className)} style={props.style}>
      <nav className="mb-3 flex items-center justify-between">
        <strong className="text-xl tracking-tight">Forge</strong>
        <div className="hidden gap-4 text-sm md:flex">
          <span>Product</span>
          <span>Customers</span>
          <span>Pricing</span>
        </div>
        <a href="#hero" className="inline-flex h-10 items-center rounded-xl bg-[#171717] px-3 text-sm font-bold text-white">
          Start free
        </a>
      </nav>
      <div className="grid flex-1 gap-3 lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-[22px] border border-[#e4dfd4] bg-white p-5 lg:col-span-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#7a7468]">{props.eyebrow ?? 'LIVE PRODUCT HERO'}</p>
            <Heading as={props.Title} className={cn('mt-2 text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[0.96] font-extrabold tracking-[-0.05em]', props.titleClassName)}>
              {props.title ?? 'The work is the first screen.'}
            </Heading>
            <p className={cn('mt-3 max-w-md text-[15px] leading-6 text-[#4a4a4a]', props.descriptionClassName)}>
              {props.description ??
                'Forge opens on a live desk: chat streaming, a sparkline ticking, a week of calendar, a three-lane board, and the product window itself.'}
            </p>
          </div>
          <div>
            <div className={cn('mt-5 flex flex-wrap gap-2', props.actionsClassName)}>
              {props.actions ?? (
                <DefaultActions
                  primary="Open a workspace"
                  secondary="Tour the tiles"
                  primaryClass="inline-flex h-11 items-center rounded-xl bg-[#171717] px-4 text-sm font-bold text-white"
                  secondaryClass="inline-flex h-11 items-center rounded-xl border border-[#d9d4c8] bg-white px-4 text-sm font-bold"
                />
              )}
            </div>
            <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-[#7a7468]">USED BY 2,400 STUDIOS · SOC2</p>
          </div>
        </div>
        <article className="overflow-hidden rounded-[22px] border border-[#e4dfd4] bg-white lg:col-span-5">
          {props.media === null ? null : (
            (props.media ?? <Still src={heroAsset(HERO_STILLS.laptop)} alt="Forge desk on a laptop" className="h-48 md:h-full min-h-[14rem]" />)
          )}
        </article>
        <article className="rounded-[22px] border border-[#e4dfd4] bg-white p-4 lg:col-span-3">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#7a7468]">FORGE CHAT · STREAMING</p>
          <div className="mt-2 space-y-2">
            {shown.map((line) => (
              <div
                key={line.text}
                className={cn('rounded-[14px] px-3 py-2 text-[13px]', line.role === 'me' ? 'ml-4 bg-[#171717] text-white' : 'bg-[#f6f3ec]')}
              >
                {line.text}
              </div>
            ))}
            {!reduced ? <div className="ml-4 h-8 rounded-[14px] bg-[#171717] px-3 py-2 text-white">▌</div> : null}
          </div>
        </article>
        <article className="rounded-[22px] border border-[#e4dfd4] bg-white p-4 lg:col-span-3">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#7a7468]">ARR · 12W</p>
          <b className="text-[28px] tracking-[-0.04em]">$184k</b>
          <svg viewBox="0 0 160 56" className="mt-2 h-16 w-full" aria-hidden="true">
            <polyline fill="none" stroke="#16a34a" strokeWidth="2.4" points="4,40 28,36 52,42 76,22 100,26 124,12 156,18" />
            <polyline fill="rgba(22,163,74,.12)" stroke="none" points="4,56 4,40 28,36 52,42 76,22 100,26 124,12 156,18 156,56" />
          </svg>
          <p className="text-[12px] text-[#16a34a]">+18% vs last quarter</p>
          <p className="mt-2 text-[12px] text-[#7a7468]">Studio plan · 18 seats · invoiced monthly</p>
        </article>
        <article className="rounded-[22px] border border-[#e4dfd4] bg-white p-4 lg:col-span-3">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#7a7468]">THIS WEEK</p>
          <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px]">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={`${d}-${i}`} className={cn('rounded-lg bg-[#f6f3ec] py-1.5', i === 2 && 'bg-[#171717] text-white')}>
                {d}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[13px]">Design crit · 11:00 with Vale</p>
          <p className="text-[13px] text-[#7a7468]">Ship review · 15:30</p>
        </article>
        <article className="rounded-[22px] border border-[#e4dfd4] bg-white p-4 lg:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#7a7468]">BOARD</p>
          <div className="mt-2 flex gap-2 text-[12px]">
            {[
              ['Todo', 'Iris stills', 'Type samples'],
              ['Doing', 'Hero family', 'Blind gate'],
              ['Done', 'Refs', 'Mockups'],
            ].map(([title, ...items]) => (
              <div key={title} className="flex-1 rounded-xl bg-[#f6f3ec] p-2">
                {title}
                {items.map((item) => (
                  <div key={item} className="mt-1.5 rounded-lg bg-white p-1.5">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-[22px] border border-[#e4dfd4] bg-white p-4 lg:col-span-2">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#7a7468]">ONLINE</p>
          <div className="mt-3 flex">
            {[
              ['AO', '#e11d48'],
              ['JP', '#0f766e'],
              ['MK', '#7c3aed'],
              ['+5', '#d97706'],
            ].map(([label, color], i) => (
              <span
                key={label}
                className="grid size-8 place-items-center rounded-full border-2 border-white text-[10px] font-extrabold text-white"
                style={{ background: color, marginLeft: i === 0 ? 0 : -8 }}
              >
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-[#7a7468]">Amina is editing pricing.</p>
        </article>
      </div>
    </Shell>
  )
}

function TerminalHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const [sent, setSent] = useState(false)
  const chats: HeroChatLine[] = props.lines ?? [
    { id: '1', role: 'user', text: 'Rewrite the hero family. Visuals first. 12 languages, not one Helio.' },
    { id: '2', role: 'agent', text: 'Captured 40+ stills. Prisma, inbox-in-hero, dashboard blocks, fashion collage. Empty plates fail the gate.' },
    { id: '3', role: 'agent', text: 'Drafting aurora, brutal, cinema with default product chrome so BASIC is never a void.' },
  ]
  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setSent(true)
  }
  return (
    <Shell variant="terminal" className={cn('flex min-h-svh flex-col bg-[#0b0d10] text-[#e7edf3]', props.className)} style={props.style}>
      <nav className="flex items-center justify-between border-b border-[#1c232c] px-5 py-3">
        <strong className="font-mono text-sm">
          <span className="text-[#4ade80]">●</span> relay
        </strong>
        <span className="text-[13px] text-[#9aa8b6]">AI coding desk · main · 4 files dirty</span>
        <span className="hidden font-mono text-xs md:block">⌘K command</span>
      </nav>
      <div className="grid min-h-0 flex-1 md:grid-cols-[200px_1fr_1fr]">
        <aside className="hidden border-r border-[#1c232c] p-3.5 font-mono text-xs text-[#9aa8b6] md:block">
          <b className="mt-2 mb-1 block text-[#e7edf3]">src/components</b>
          <div className="text-[#4ade80]">hero.tsx</div>
          <div>hero-scene.tsx</div>
          <div>hero-layouts.tsx</div>
          <b className="mt-3 mb-1 block text-[#e7edf3]">docs/library/hero</b>
          <div>refs/</div>
          <div>mockups/</div>
        </aside>
        <div className="flex min-w-0 flex-col border-r border-[#1c232c]">
          <div className="flex gap-0.5 border-b border-[#1c232c] bg-[#0f1318] font-mono text-[11px]">
            <span className="bg-[#0b0d10] px-3 py-2 text-[#4ade80]">hero.tsx</span>
            <span className="px-3 py-2">diff</span>
          </div>
          <pre className="overflow-auto p-4 font-mono text-[12.5px] leading-[1.55]">
            <span className="text-slate-500">{`  1  // original — not a port`}</span>
            {'\n'}
            <span className="text-slate-500">  2  </span>
            <span className="text-purple-400">export const</span> HERO_VARIANTS = [{'\n'}
            <span className="text-slate-500">  3    </span>
            <span className="text-green-300">'aurora'</span>, <span className="text-green-300">'spotlight'</span>, <span className="text-green-300">'helix'</span>,{'\n'}
            <span className="text-slate-500">  4    </span>
            <span className="text-green-300">'brutal'</span>, <span className="text-green-300">'bento'</span>, <span className="text-green-300">'cinema'</span>,{'\n'}
            <span className="text-slate-500">  5    </span>
            <span className="text-green-300">'terminal'</span>, <span className="text-green-300">'cursor'</span>, <span className="text-green-300">'reveal'</span>,{'\n'}
            <span className="text-slate-500">  6  </span>]{'\n'}
            <span className="text-slate-500">  7  </span>
            {'\n'}
            <span className="text-slate-500">  8  </span>
            <span className="text-purple-400">export function</span> Hero({'{'} variant = <span className="text-green-300">'aurora'</span> {'}'}) {'{'}
            {'\n'}
            <span className="text-slate-500">  9    </span>
            <span className="text-purple-400">const</span> Layout = layouts[variant]{'\n'}
            <span className="text-slate-500"> 10    </span>
            <span className="text-purple-400">return</span> {'<Layout filled product chrome />'}
            {'\n'}
            <span className="text-slate-500"> 11  </span>{'}'}
            {'\n'}
            <span className="text-slate-500"> 12  </span>
            {'\n'}
            <span className="text-green-400">{` 13  + filled with a real product by default`}</span>
            {'\n'}
            <span className="text-green-400">{` 14  + reduced-motion keeps the last frame`}</span>
            {'\n'}
            <span className="text-green-400">{` 15  + WebGL pauses when the plate leaves view`}</span>
            {'\n'}
            <span className="text-green-400">{` 16  + BASIC is never an empty gradient oval`}</span>
          </pre>
        </div>
        <div className="flex min-w-0 flex-col">
          <div className="flex gap-0.5 border-b border-[#1c232c] bg-[#0f1318] font-mono text-[11px]">
            <span className="bg-[#0b0d10] px-3 py-2 text-[#4ade80]">agent</span>
            <span className="px-3 py-2">logs</span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4 text-sm leading-6">
            {chats.map((line) => (
              <div
                key={line.id}
                className={cn(
                  'rounded-xl border px-3.5 py-3',
                  line.role === 'user' ? 'border-[#1d4a32] bg-[#102018]' : 'border-[#243041] bg-[#141a22]',
                )}
              >
                {line.text}
              </div>
            ))}
            {sent ? <div className="rounded-xl border border-[#1d4a32] bg-[#102018] px-3.5 py-3">Queued. Pin the product screenshot in the hero.</div> : null}
          </div>
        </div>
      </div>
      <form className="flex gap-2 border-t border-[#1c232c] bg-[#0f1318] px-4 py-3" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="relay-prompt">
          Prompt
        </label>
        <input
          id="relay-prompt"
          defaultValue={props.prompt ?? 'Pin the product screenshot in the hero, not a gradient circle.'}
          className="h-11 min-w-0 flex-1 rounded-[10px] border border-[#2a3544] bg-[#0b0d10] px-3 font-mono text-sm outline-none"
        />
        <button type="submit" className="h-11 rounded-[10px] bg-[#4ade80] px-4 font-semibold text-[#052e16]">
          Send
        </button>
      </form>
      <p className="flex justify-between border-t border-[#1c232c] px-4 py-2 font-mono text-[11px] text-slate-500">
        <span>gpt-relay · {reduced ? '0' : '42'} tok/s</span>
        <span>context 18%</span>
        <span>reduced-motion: {reduced ? 'on' : 'off'}</span>
      </p>
    </Shell>
  )
}

function CursorHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const field = useRef<HTMLElement>(null)
  const [cursor, setCursor] = useState({ x: 420, y: 220 })
  const people = [
    { name: 'Amina', color: '#f472b6', x: '14%', y: '22%' },
    { name: 'Jules', color: '#67e8f9', x: '58%', y: '18%' },
    { name: 'Kenji', color: '#a78bfa', x: '74%', y: '54%' },
    { name: 'Noor', color: '#fbbf24', x: '22%', y: '62%' },
  ]
  return (
    <Shell
      variant="cursor"
      className={cn('min-h-svh bg-[#0c1018] text-[#edf1f7]', props.className)}
      style={props.style}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-[#2a3446] bg-[#0c1018]/90 px-4 py-2 text-[12px] backdrop-blur">
        <strong>Field</strong>
        <div className="hidden gap-1 md:flex">
          {['Move', 'Frame', 'Comment', 'Pen'].map((tool, i) => (
            <span key={tool} className={cn('rounded-md px-2.5 py-1', i === 1 ? 'bg-[#67e8f9] text-[#06202a]' : 'bg-[#151b26]')}>
              {tool}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {people.map((person) => (
            <span key={person.name} className="size-6 rounded-full border-2 border-[#0c1018]" style={{ background: person.color }} title={person.name} />
          ))}
        </div>
      </div>
      <section
        ref={field}
        className="relative min-h-svh"
        onPointerMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect()
          setCursor({ x: event.clientX - box.left, y: event.clientY - box.top })
        }}
      >
        <article className="absolute top-[18%] left-[5%] hidden w-[220px] overflow-hidden rounded-xl border border-[#2a3446] bg-[#151b26] shadow-2xl md:block">
          <p className="px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#9aa8b6]">H-01 · Homepage</p>
          <div className="h-36 bg-[#0c1018] p-3">
            <div className="mb-2 h-2 w-16 rounded bg-white/20" />
            <div className="h-8 w-28 rounded bg-white/35" />
            <div className="mt-3 h-16 rounded-lg bg-[#67e8f9]/20" />
          </div>
        </article>
        <article className="absolute top-[16%] right-[6%] hidden w-[200px] overflow-hidden rounded-xl border border-[#2a3446] bg-[#151b26] md:block">
          <p className="px-2.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#9aa8b6]">P-04 · Print</p>
          {props.media === null ? null : (props.media ?? <Still src={heroAsset(HERO_STILLS.mountains)} alt="Artboard print" className="h-32" />)}
        </article>
        <article className="absolute bottom-[10%] left-[6%] hidden w-[240px] rounded-xl border border-[#2a3446] bg-[#151b26] p-3 text-[12px] md:block">
          <p className="font-mono text-[10px] tracking-[0.12em] text-[#9aa8b6]">LAYERS</p>
          {['Headline', 'Comment Amina', 'Frame Homepage', 'Print still'].map((layer, i) => (
            <div key={layer} className={cn('mt-1.5 rounded-md px-2 py-1', i === 0 ? 'bg-[#67e8f9]/15 text-[#67e8f9]' : 'bg-[#0c1018]')}>
              {layer}
            </div>
          ))}
        </article>
        {people.map((person) => (
          <motion.div
            key={person.name}
            className="absolute z-10 flex items-start gap-1.5"
            style={{ left: person.x, top: person.y, color: person.color }}
            animate={reduced ? undefined : { x: [0, 10, 0], y: [0, -8, 0] }}
            transition={{ duration: 5 + person.name.length, repeat: Infinity }}
          >
            <span className="h-0 w-0 border-t-[5px] border-b-[14px] border-l-[11px] border-t-transparent border-b-transparent border-l-current" />
            <span className="rounded-md px-1.5 py-0.5 text-[11px] font-bold text-[#061016]" style={{ background: person.color }}>
              {person.name}
            </span>
          </motion.div>
        ))}
        <div className="absolute top-[38%] left-[8%] z-10 w-52 rounded-xl border border-[#2a3446] bg-[#151b26] p-3 text-[13px] shadow-2xl">
          <p className="mb-1 text-[11px] font-bold text-[#f472b6]">Amina</p>
          Lock the headline. Tracking -0.06, not Helio serif.
        </div>
        <div className="absolute top-[34%] right-[8%] z-10 w-52 rounded-xl border border-[#2a3446] bg-[#151b26] p-3 text-[13px] shadow-2xl">
          <p className="mb-1 text-[11px] font-bold text-[#67e8f9]">Jules</p>
          Cursor trails stay inside the canvas. Reduced motion: static names.
        </div>
        <div className="absolute bottom-[22%] left-[28%] hidden h-28 w-56 rounded-lg border-[1.5px] border-dashed border-[#67e8f9] bg-[#67e8f9]/10 md:block" />
        <div className="relative z-10 px-5 pt-[12vh] text-center">
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#67e8f9] uppercase">{props.eyebrow ?? 'Field · multiplayer canvas'}</p>
          <Heading as={props.Title} className={cn('mx-auto mt-3 max-w-[14ch] text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.92] font-bold tracking-[-0.06em]', props.titleClassName)}>
            {props.title ?? 'Where the cursors already are.'}
          </Heading>
          <p className={cn('mx-auto mt-3 max-w-xl leading-7 text-[#b7c2d4]', props.descriptionClassName)}>
            {props.description ??
              'A spatial hero: grid, named pointers, live comments, frames, a print still. The product is collaboration, so the first screen is a room with people in it.'}
          </p>
          <div className={cn('mt-7', props.actionsClassName)}>
            {props.actions ?? (
              <a href="#hero" className="inline-flex h-11 items-center rounded-[10px] bg-[#67e8f9] px-4 text-sm font-bold text-[#06202a]">
                Join the canvas
              </a>
            )}
          </div>
        </div>
        <motion.div
          className="pointer-events-none absolute z-30 size-6 rounded-full border border-[#67e8f9]"
          animate={{ left: reduced ? 420 : cursor.x - 12, top: reduced ? 220 : cursor.y - 12 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 28 }}
          aria-hidden="true"
        />
        <div className="absolute right-5 bottom-5 z-20 flex gap-2 rounded-xl border border-[#2a3446] bg-[#151b26] p-2 text-xs">
          {['Select', 'Comment', 'Frame', '4 online'].map((item) => (
            <span key={item} className="rounded-lg bg-[#0c1018] px-2.5 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </section>
    </Shell>
  )
}

function HelixHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const [offscreen, setOffscreen] = useState(false)
  const [Scene, setScene] = useState<typeof import('@/components/ui/hero-scene.tsx').HeroScene | null>(null)
  const root = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const node = root.current
    if (!node) return
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry?.isIntersecting), { threshold: 0.05 })
    io.observe(node)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (props.scene || reduced) return
    let live = true
    void import('@/components/ui/hero-scene.tsx').then((mod) => {
      if (live) setScene(() => mod.HeroScene)
    })
    return () => {
      live = false
    }
  }, [props.scene, reduced])
  return (
    <Shell
      variant="helix"
      className={cn('grid min-h-svh bg-[#050506] text-[#f6f1ea] lg:grid-cols-2', props.className)}
      style={props.style}
    >
      <div className="flex flex-col justify-between px-6 py-8 md:px-10 md:py-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-[#e9a8ff] uppercase">{props.eyebrow ?? 'Material lab · object 08'}</p>
          <Heading as={props.Title} className={cn('mt-3 text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.88] font-bold tracking-[-0.05em]', props.titleClassName)}>
            {props.title ?? (
              <>
                A helix
                <br />
                you can <i className="font-serif font-normal text-[#ffd29a] italic">hold.</i>
              </>
            )}
          </Heading>
          <p className={cn('mt-4 max-w-md leading-7 text-[#c8bdb0]', props.descriptionClassName)}>
            {props.description ??
              'Studio-lit WebGL, contained in the plate. Iridescent chrome with a magenta key and a gold rim — the object is the product, not a spinning candy sphere.'}
          </p>
          <div className="mt-7 grid max-w-md grid-cols-2 gap-2.5">
            {[
              ['Alloy', 'Iridescent chrome'],
              ['Lights', 'Key + rim + bounce'],
              ['Loop', '12s, paused offscreen'],
              ['Fallback', 'Photographed still'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[14px] border border-[#ffd29a]/20 bg-white/5 px-3.5 py-3">
                <small className="block font-mono text-[10px] tracking-[0.16em] text-[#e9a8ff] uppercase">{k}</small>
                <b className="text-lg font-medium">{v}</b>
              </div>
            ))}
          </div>
          <div className={cn('mt-7 flex flex-wrap gap-3', props.actionsClassName)}>
            {props.actions ?? (
              <DefaultActions
                primary="Inspect the object"
                secondary="Download USDZ"
                primaryClass="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-[#ffd29a] to-[#e9a8ff] px-4 text-sm font-semibold text-[#1a1010]"
                secondaryClass="inline-flex h-11 items-center rounded-full border border-white/15 px-4 text-sm font-semibold"
              />
            )}
          </div>
        </div>
        <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-[#8a7f74]">HELIX / CONTAINED WEBGL / 09 OF 12</p>
      </div>
      <div ref={root} className={cn('relative min-h-[24rem] overflow-hidden bg-[#050506]', props.mediaClassName)}>
        {props.scene ?? (Scene ? <Scene active={!offscreen && !reduced} className="z-0" /> : null)}
        {props.media === null
          ? null
          : (props.fallback ??
            props.media ?? (
              <Still src={heroAsset(HERO_STILLS.helix)} alt="Iridescent helix sculpture" className="relative z-[1]" />
            ))}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_40%,#050506_78%)]" />
        <span className="absolute top-[18%] left-[8%] font-mono text-[11px] tracking-[0.12em] text-[#ffd29a]">KEY 3200K</span>
        <span className="absolute top-[28%] right-[12%] font-mono text-[11px] tracking-[0.12em] text-[#ffd29a]">ORBIT 24°</span>
        <span className="absolute right-[10%] bottom-[22%] font-mono text-[11px] tracking-[0.12em] text-[#ffd29a]">RIM MAGENTA</span>
      </div>
    </Shell>
  )
}

function CinemaHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const chapters: HeroChapter[] = props.chapters ?? [
    { id: '1', label: '01 Rain street', time: '00:48' },
    { id: '2', label: '02 The fare', time: '02:11' },
    { id: '3', label: '03 Tunnel', time: '04:02' },
  ]
  return (
    <Shell variant="cinema" className={cn('flex min-h-svh flex-col bg-black text-[#f4ead6]', props.className)} style={props.style}>
      <div className="h-12 bg-black" />
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={reduced ? undefined : { scale: [1, 1.08], x: ['0%', '-2%'] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          {props.media === null ? null : (
            (props.media ?? <Still src={heroAsset(HERO_STILLS.cinema)} alt="Rain-soaked night street" className="h-full w-[110%] max-w-none" />)
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />
        <Grain className="opacity-25" />
        <div className="relative z-10 flex h-full min-h-[32rem] flex-col justify-end px-6 pb-16 md:px-12">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#e8c36a] uppercase">{props.eyebrow ?? 'Nocturne · episode 04'}</p>
          <Heading as={props.Title} className={cn('mt-2 max-w-xl [font-family:"Bebas Neue",sans-serif] text-[clamp(3rem,8vw,7.4rem)] leading-[0.82] tracking-[0.02em]', props.titleClassName)}>
            {props.title ?? (
              <>
                AFTER THE
                <br />
                YELLOW LIGHT.
              </>
            )}
          </Heading>
          <p className={cn('mt-3 max-w-md font-serif text-lg text-[#e8dcc4] italic', props.descriptionClassName)}>
            {props.description ??
              'A cinematic first screen: letterbox, grain, a still that moves, captions, chapters. The product is a film platform, so the hero is a reel.'}
          </p>
          <div className={cn('mt-5', props.actionsClassName)}>
            {props.actions ?? (
              <a
                href="#hero"
                className="grid size-16 place-items-center rounded-full border border-[#f4ead6] bg-black/35 text-lg"
                aria-label="Play episode"
              >
                ▶
              </a>
            )}
          </div>
        </div>
        <ol className="absolute right-8 bottom-16 hidden w-52 md:block">
          {chapters.map((item, i) => (
            <li key={item.id} className={cn('flex justify-between border-t border-[#f4ead6]/25 py-2.5 font-mono text-[11px] tracking-[0.12em]', i === 0 && 'text-[#e8c36a]')}>
              <span>{item.label}</span>
              <span>{item.time}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex h-12 items-center justify-between bg-black px-6 font-mono text-[11px] tracking-[0.18em]">
        <span>REC ● 24FPS · 2.39:1</span>
        <span className="hidden md:block">TIMECODE 01:12:08:21</span>
        <span>NOCTURNE PICTURES</span>
      </div>
    </Shell>
  )
}

function AtlasHero(props: LayoutProps) {
  const events: HeroEvent[] = props.events ?? [
    { id: '1', label: 'DXB → FRA 8842 airborne', time: 'now' },
    { id: '2', label: 'Rotterdam gate 12 delay', time: '4m' },
    { id: '3', label: 'LAX customs cleared', time: '9m' },
    { id: '4', label: 'Singapore bunkering ok', time: '22m' },
  ]
  return (
    <Shell variant="atlas" className={cn('min-h-svh bg-[#06101c] text-[#e8f1ff]', props.className)} style={props.style}>
      <div className="absolute inset-0">
        {props.media === null ? null : (
          (props.media ?? <Still src={heroAsset(HERO_STILLS.globe)} alt="Earth at night" />)
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06101c]/85 via-[#06101c]/25 to-[#06101c]/55" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" aria-hidden="true">
          <motion.path
            d="M220 520 C 480 180, 820 180, 1180 420"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="1.4"
            strokeDasharray="8 10"
            animate={{ strokeDashoffset: [0, -80] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <path d="M260 610 C 520 300, 900 240, 1240 500" fill="none" stroke="#fbbf24" strokeWidth="1.2" opacity="0.7" />
          <circle cx="220" cy="520" r="5" fill="#7dd3fc" />
          <circle cx="1180" cy="420" r="5" fill="#7dd3fc" />
          <circle cx="1240" cy="500" r="5" fill="#fbbf24" />
        </svg>
      </div>
      <div className="relative z-10 flex min-h-svh flex-col justify-between px-6 py-8 md:px-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#7dd3fc] uppercase">{props.eyebrow ?? 'Meridian · live logistics'}</p>
          <Heading as={props.Title} className={cn('mt-3 max-w-[12ch] text-[clamp(2.5rem,5.4vw,4.7rem)] leading-[0.94] tracking-[-0.05em]', props.titleClassName)}>
            {props.title ?? 'Every lane, one night map.'}
          </Heading>
          <p className={cn('mt-3 max-w-md leading-6 text-[#c5d4ea]', props.descriptionClassName)}>
            {props.description ?? 'Arcs for flights, gold for ocean, a live event feed. The globe is a data surface, not a decorative marble.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {(props.stats ?? [
              { value: '128', label: 'air corridors' },
              { value: '46', label: 'ports on watch' },
              { value: '2.1s', label: 'event latency' },
            ]).map((item) => (
              <div key={item.label}>
                <b className="block text-[28px] text-[#7dd3fc]">{item.value}</b>
                <span className="font-mono text-[11px] text-[#93a7c2]">{item.label}</span>
              </div>
            ))}
          </div>
          <div className={cn('mt-6', props.actionsClassName)}>
            {props.actions ?? (
              <a href="#hero" className="inline-flex h-11 items-center rounded-full bg-[#7dd3fc] px-4 text-sm font-bold text-[#062033]">
                Open the map
              </a>
            )}
          </div>
        </div>
        <div className="w-full max-w-xs self-end rounded-2xl border border-[#7dd3fc]/20 bg-[#06101c]/75 p-3 backdrop-blur">
          <p className="mb-2 font-mono text-[11px] tracking-[0.22em] text-[#7dd3fc] uppercase">Event stream</p>
          {events.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-white/5 py-2 text-[13px] last:border-0">
              <span>{item.label}</span>
              <em className="font-mono text-[11px] text-[#fbbf24] not-italic">{item.time}</em>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}

function RevealHero(props: LayoutProps) {
  const reduced = usePrefersReducedMotion()
  const stage = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })
  const [amount, setAmount] = useState(reduced ? 0.9 : props.progress !== 'scroll' ? 0.18 : 0)
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (props.progress !== 'scroll' || reduced) return
    setAmount(value)
  })
  const screens = ['Home calendar', 'Team map', 'Insights board']
  const index = Math.min(2, Math.floor(amount * 3))
  return (
    <section
      ref={stage}
      data-nexara="hero"
      data-variant="reveal"
      data-tier="advanced"
      className={cn('relative isolate bg-[#f6f7fb] text-[#111827]', props.className)}
      style={{ height: props.progress === 'scroll' && !reduced ? '160vh' : undefined, ...props.style }}
    >
      <div className={cn(props.progress === 'scroll' && !reduced ? 'sticky top-0 min-h-svh' : 'min-h-svh')}>
        <nav className="flex items-center justify-between px-6 py-5 md:px-10">
          <strong className="tracking-tight">Prism</strong>
          <span className="hidden text-sm text-[#4b5563] md:block">Hardware · Software · Specs</span>
          <a href="#hero" className="inline-flex h-10 items-center rounded-xl bg-[#111827] px-3 text-sm font-semibold text-white">
            Preorder
          </a>
        </nav>
        <div className="grid items-center gap-6 px-6 pb-8 lg:grid-cols-3 lg:px-9">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-[#6b7280] uppercase">{props.eyebrow ?? 'Scroll-pinned reveal'}</p>
            <Heading as={props.Title} className={cn('mt-2 text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[0.95] font-extrabold tracking-[-0.055em]', props.titleClassName)}>
              {props.title ?? 'The product turns. You don’t hijack the wheel.'}
            </Heading>
            <p className={cn('mt-3 max-w-md leading-6 text-[#4b5563]', props.descriptionClassName)}>
              {props.description ??
                'Native sticky pin, 160vh max, screens swap as you scroll. Reduced motion shows screen 03 immediately. The device is photographed, the UI is real.'}
            </p>
            <div className={cn('mt-5', props.actionsClassName)}>
              {props.actions ?? (
                <a href="#hero" className="inline-flex h-11 items-center rounded-xl bg-[#111827] px-4 text-sm font-semibold text-white">
                  See the sequence
                </a>
              )}
            </div>
          </div>
          <div className="relative justify-self-center">
            <motion.div
              className="w-[220px] overflow-hidden rounded-[36px] border-[10px] border-[#111827] shadow-[0_40px_80px_-32px_rgba(17,24,39,.45)] md:w-[280px]"
              style={{ transform: reduced ? undefined : `perspective(1200px) rotateY(${-12 + amount * 18}deg) rotateX(6deg)` }}
            >
              {props.media === null ? null : (props.media ?? <RevealScreen index={index} />)}
            </motion.div>
            <span className="absolute top-[18%] -left-16 hidden rounded-[14px] border border-[#e5e7eb] bg-white px-3 py-2 text-xs shadow md:block">
              <span className="block font-mono text-[10px] tracking-[0.14em] text-[#6b7280]">SCREEN 0{index + 1}</span>
              {screens[index]}
            </span>
            <span className="absolute top-[38%] -right-20 hidden rounded-[14px] border border-[#e5e7eb] bg-white px-3 py-2 text-xs shadow md:block">
              <span className="block font-mono text-[10px] tracking-[0.14em] text-[#6b7280]">OLED 120</span>
              Pinned, not hijacked
            </span>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-[#6b7280] uppercase">Sequence</p>
            {screens.map((label, i) => (
              <p key={label} className={cn('mt-2.5 font-semibold', i === index ? 'text-[#111827]' : 'text-[#6b7280]')}>
                0{i + 1} {label}
              </p>
            ))}
            <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-[#6b7280]">PROGRESS {Math.round(amount * 100)}%</p>
          </div>
        </div>
        <p className="pb-5 text-center font-mono text-[11px] tracking-[0.2em] text-[#6b7280]">
          SCROLL TO REVEAL
          <span className="mt-2 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <i key={i} className={cn('h-1 w-9 rounded-full', i === index ? 'bg-[#111827]' : 'bg-[#d1d5db]')} />
            ))}
          </span>
        </p>
      </div>
    </section>
  )
}

function RevealScreen({ index }: { index: number }) {
  if (index === 0) {
    return <Still src={heroAsset(HERO_STILLS.phone)} alt="Prism home calendar" className="aspect-[9/16]" />
  }
  if (index === 1) {
    return (
      <div className="aspect-[9/16] bg-[#f6f7fb] p-4 text-left text-[#111827]">
        <p className="text-[10px] tracking-[0.14em] text-[#6b7280] uppercase">Team map</p>
        <b className="mt-1 block text-lg">North studio</b>
        <div className="relative mt-4 h-40 overflow-hidden rounded-2xl bg-[#e5e7eb]">
          <Still src={heroAsset(HERO_STILLS.globe)} alt="" className="opacity-80" />
          <span className="absolute top-8 left-10 size-3 rounded-full bg-[#c45c7a]" />
          <span className="absolute top-16 right-12 size-3 rounded-full bg-[#0f766e]" />
          <span className="absolute bottom-10 left-1/2 size-3 rounded-full bg-[#7c3aed]" />
        </div>
        <p className="mt-3 text-[12px]">Amina · Berlin · online</p>
        <p className="text-[12px] text-[#6b7280]">Jules · Lisbon · 1:1 in 20m</p>
      </div>
    )
  }
  return (
    <div className="aspect-[9/16] bg-white p-4 text-left text-[#111827]">
      <p className="text-[10px] tracking-[0.14em] text-[#6b7280] uppercase">Insights</p>
      <b className="mt-1 block text-3xl tracking-tight">128</b>
      <p className="text-[12px] text-[#6b7280]">sessions this week</p>
      <svg viewBox="0 0 160 64" className="mt-4 h-20 w-full" aria-hidden="true">
        <polyline fill="none" stroke="#111827" strokeWidth="2.4" points="4,48 28,40 52,44 76,22 100,28 124,12 156,18" />
      </svg>
      <div className="mt-3 rounded-2xl bg-[#f6f7fb] p-3 text-[12px]">Pulse 98% · 4 reviews due · payroll locked</div>
    </div>
  )
}

