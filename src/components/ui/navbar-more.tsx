'use client'

import { Magnetic, springs, useCount, useFocusTrap } from '@/lib/kit.tsx'
import { heroAsset } from '@/lib/hero-media.ts'
import {
  ItemLink,
  OpenTrigger,
  Plate,
  STILL,
  SampleHero,
  Shell,
  Tray,
  useMenu,
} from '@/lib/navbar-motion.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import type { NavbarProps, NavbarVariant } from '@/components/ui/navbar.tsx'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useId, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

export function NavbarMore({ variant, ...props }: NavbarProps & { variant: NavbarVariant }) {
  switch (variant) {
    case 'crumb':
      return <CrumbNav {...props} />
    case 'kiln':
      return <KilnNav {...props} />
    case 'split':
      return <SplitNav {...props} />
    case 'island':
      return <IslandNav {...props} />
    case 'curtain':
      return <CurtainNav {...props} />
    case 'dock':
      return <DockNav {...props} />
    case 'rail':
      return <RailNav {...props} />
    case 'folio':
      return <FolioNav {...props} />
    case 'portal':
      return <PortalNav {...props} />
    default:
      return <CrumbNav {...props} />
  }
}

function CrumbNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'overview', label: 'Overview', href: '#navbar' },
    { id: 'auth', label: 'Auth', href: '#navbar' },
    { id: 'sessions', label: 'Sessions', href: '#navbar', current: true },
    { id: 'webhooks', label: 'Webhooks', href: '#navbar' },
    { id: 'limits', label: 'Limits', href: '#navbar' },
  ]
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const [pct, setPct] = useState(42)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setPct((n) => (n >= 86 ? 18 : n + 8)), 1400)
    return () => window.clearInterval(id)
  }, [reduced])
  const here = items.find((item) => item.current)?.label ?? 'Sessions'
  return (
    <Shell variant="crumb" className={cn('flex min-h-[36rem] flex-col bg-[#f6f7fb] text-[#111827]', props.className)}>
      <nav aria-label="Docs" className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 pt-4 md:px-8">
        <strong>{props.logo ?? 'Prism'}</strong>
        <p className="hidden font-mono text-[12px] text-[#6b7280] md:block">
          Product / Auth / <b className="text-[#111827]">{here}</b>
        </p>
        <span className="font-mono text-[12px] text-[#6b7280]">{pct}%</span>
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Here"
          className="col-start-3 row-start-1 h-9 justify-self-end rounded-full border border-[#111827]/10 px-3 text-sm md:hidden"
        />
      </nav>
      <div className="mt-3 h-0.5 bg-[#e5e7eb]" aria-hidden="true">
        <motion.i
          className="block h-full bg-[#111827]"
          animate={{ width: `${pct}%` }}
          transition={reduced ? { duration: 0 } : springs.heavy}
        />
      </div>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Prism path" className="border border-[#111827]/10 bg-white">
        <p className="rounded-2xl bg-[#111827] px-3 py-3 font-mono text-[12px] text-white">
          Here · {here} · {pct}%
        </p>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="mt-2 block py-3 text-lg" />
        ))}
      </Tray>
      {props.scene === false ? null : (
        <div className="grid flex-1 gap-8 px-4 py-8 md:grid-cols-[220px_1fr] md:px-8">
          <aside className="hidden text-[13px] leading-8 text-[#6b7280] md:block">
            {items.map((item) => (
              <p key={item.id} className={cn(item.current && 'font-bold text-[#111827]')}>
                {item.label}
              </p>
            ))}
          </aside>
          <article>
            <h1 className="text-[clamp(2rem,5vw,2.8rem)] tracking-[-0.04em]">Sessions</h1>
            <p className="mt-4 max-w-xl leading-7 text-[#374151]">
              A breadcrumb and a reading hairline. The nav is orientation, not a marketing CTA rack.
            </p>
          </article>
        </div>
      )}
    </Shell>
  )
}

function KilnNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'plants', label: 'Plants', href: '#navbar', current: true },
    { id: 'drawings', label: 'Drawings', href: '#navbar' },
    { id: 'service', label: 'Service', href: '#navbar' },
  ]
  const plants = ['Plant 03 · Harbor roof', 'Plant 07 · West atrium', 'Plant 12 · Clinic AHU']
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const [plant, setPlant] = useState(0)
  const node = useCount(64, true)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setPlant((n) => (n + 1) % plants.length), 2400)
    return () => window.clearInterval(id)
  }, [plants.length, reduced])
  return (
    <Shell variant="kiln" className={cn('flex min-h-[36rem] flex-col bg-[#e8eef2] text-[#123043]', props.className)}>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between gap-3 border-b border-[#d5dee4] bg-white px-4 py-3 md:px-10">
        <strong>{props.logo ?? 'Kiln Mechanical'}</strong>
        <button
          type="button"
          className="hidden rounded-lg border border-[#123043]/15 px-3 py-1.5 font-mono text-[12px] md:inline"
          aria-haspopup="listbox"
          aria-expanded={false}
        >
          {plants[plant]} ▾
        </button>
        <span className="hidden font-mono text-[13px] font-bold text-[#c2410c] md:inline">
          Supply <span ref={node}>{reduced ? '64' : '0'}</span>°
        </span>
        <div className="hidden gap-5 text-sm text-[#4b6473] md:flex">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} />
          ))}
        </div>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#c2410c] px-4 text-sm font-bold text-white md:inline-flex">
            Call the shop
          </Magnetic>
        )}
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Plant"
          className="h-10 rounded-full bg-[#c2410c] px-3 text-sm font-bold text-white md:hidden"
        />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Kiln plant" className="border border-[#123043]/10 bg-white">
        <p className="rounded-2xl bg-[#123043] px-3 py-3 text-sm text-white">
          <b className="block">{plants[plant]}</b>
          Supply air 64° · filters due Friday
        </p>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="mt-2 block py-3 text-lg" />
        ))}
        <a href="#navbar" className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#c2410c] font-bold text-white">
          Call the shop
        </a>
      </Tray>
      {props.scene === false ? null : (
        <SampleHero
          kicker="Kiln Mechanical · plant 03"
          title="The plant, in one drawing."
          lede="A live degree on the bar. The selector is a plant, not a region dropdown."
          still={STILL.iso}
          alt="Isometric plant"
        />
      )}
    </Shell>
  )
}

function SplitNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'clinic', label: 'Clinic', href: '#navbar' },
    { id: 'device', label: 'Device', href: '#navbar', current: true },
    { id: 'trials', label: 'Trials', href: '#navbar' },
  ]
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const split = useMotionValue(0.45)
  const spring = useSpring(split, springs.heavy)
  const xLeft = useTransform(spring, [0, 1], [0, -42])
  const xRight = useTransform(spring, [0, 1], [0, 42])
  const fade = useTransform(spring, [0, 1], [1, 0.25])
  useEffect(() => {
    if (reduced) {
      split.set(0.45)
      return
    }
    const id = window.setInterval(() => {
      split.set(split.get() > 0.6 ? 0.12 : 0.82)
    }, 1800)
    return () => window.clearInterval(id)
  }, [reduced, split])
  return (
    <Shell variant="split" className={cn('flex min-h-[36rem] flex-col bg-[#f4f1ea] text-[#1c1914]', props.className)}>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between px-4 py-5 md:px-12">
        <motion.strong style={{ x: xLeft }}>{props.logo ?? 'Vesper'}</motion.strong>
        <motion.div className="hidden gap-5 text-sm md:flex" style={{ opacity: fade }}>
          {items.map((item) => (
            <ItemLink key={item.id} item={item} />
          ))}
        </motion.div>
        {props.action ?? (
          <motion.div style={{ x: xRight }}>
            <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#0f766e] px-4 text-sm font-bold text-white md:inline-flex">
              Book a demo
            </Magnetic>
          </motion.div>
        )}
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Menu"
          className="h-10 rounded-full bg-[#0f766e] px-3 text-sm font-bold text-white md:hidden"
        />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Vesper" className="border border-[#1c1914]/10 bg-white">
        <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-[#0f766e] uppercase">Wordmark left · CTA right</p>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="block py-3 text-lg" />
        ))}
        <a href="#navbar" className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#0f766e] font-bold text-white">
          Book a demo
        </a>
      </Tray>
      {props.scene === false ? null : (
        <div className="grid flex-1 items-center gap-8 px-5 py-8 md:grid-cols-2 md:px-12">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#0f766e] uppercase">Vesper · clinic device</p>
            <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.92] font-extrabold tracking-[-0.05em]">
              A clinic device you can turn.
            </h1>
            <p className="mt-4 max-w-md leading-7 text-[#5c574e]">
              On scroll the bar splits: wordmark to the left edge, CTA to the right, links dissolve.
            </p>
          </div>
          <motion.div
            className="overflow-hidden rounded-[36px] shadow-[0_40px_80px_-36px_#0005]"
            style={{ rotateY: 18, transformPerspective: 1200 }}
          >
            <Plate still={STILL.puck} alt="Vesper puck" className="h-[16rem] md:h-[22rem]" />
          </motion.div>
        </div>
      )}
    </Shell>
  )
}

function IslandNav(props: NavbarProps) {
  const jobs = [
    { id: 'mark', label: 'Nimbus', meta: 'idle' },
    { id: 'live', label: 'Nimbus', meta: '14 agents · canary 12%' },
    { id: 'cmd', label: 'Ask Nimbus', meta: 'watch checkout-edge' },
  ] as const
  const menu = useMenu(props.defaultOpen ?? true)
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const [job, setJob] = useState(1)
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (reduced || held) return
    const id = window.setInterval(() => setJob((n) => (n + 1) % jobs.length), 2200)
    return () => window.clearInterval(id)
  }, [held, jobs.length, reduced])
  const here = jobs[job] ?? jobs[1]
  return (
    <Shell variant="island" className={cn('flex min-h-[36rem] flex-col bg-[#071018] text-[#e8f4ff]', props.className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(40rem_20rem_at_50%_0%,#22d3ee22,transparent)]" />
      <div className="relative z-10 flex justify-center px-4 pt-5">
        <motion.nav
          layout
          aria-label="Island"
          className="flex min-w-[min(92vw,26rem)] items-center gap-3 rounded-[22px] border border-[#22d3ee]/30 bg-[#0b2530] px-3.5 py-2.5 shadow-[0_20px_40px_-24px_#000]"
          onPointerDown={() => setHeld(true)}
        >
          <i className="size-2 shrink-0 rounded-full bg-[#22d3ee] shadow-[0_0_12px_#22d3ee]" aria-hidden="true" />
          <strong>{props.logo ?? here.label}</strong>
          <span className="hidden font-mono text-[11px] tracking-[0.14em] text-[#67e8f9] sm:inline">{here.meta}</span>
          {here.id === 'live' ? (
            <span className="ml-auto flex">
              {['A', 'K', 'M'].map((ch) => (
                <b key={ch} className="-ml-1.5 grid size-6 place-items-center rounded-full border-2 border-[#0b2530] bg-[#16313c] text-[9px] first:ml-0">
                  {ch}
                </b>
              ))}
            </span>
          ) : null}
          {here.id === 'cmd' ? (
            <span className="ml-auto hidden rounded-md border border-[#22d3ee]/25 px-2 py-0.5 font-mono text-[11px] text-[#9ec4d8] md:inline">
              ⌘K
            </span>
          ) : null}
          <OpenTrigger
            open={menu.open}
            onClick={() => {
              setHeld(true)
              menu.setOpen((v) => !v)
            }}
            controls={tray}
            label="Tray"
            className="ml-auto h-8 rounded-full bg-[#22d3ee] px-3 text-[12px] font-bold text-[#071018] md:hidden"
          />
        </motion.nav>
      </div>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Nimbus island" className="border border-[#22d3ee]/25 bg-[#0b2530] text-[#e8f4ff]">
        <p className="font-mono text-[12px] text-[#67e8f9]">14 agents · canary 12%</p>
        <a href="#navbar" className="mt-3 block rounded-2xl bg-[#071018] px-3 py-3">
          Ops
        </a>
        <a href="#navbar" className="mt-2 block rounded-2xl px-3 py-3">
          Regions
        </a>
        <a href="#navbar" className="mt-2 block rounded-2xl px-3 py-3">
          Agents
        </a>
      </Tray>
      {props.scene === false ? null : (
        <div className="relative z-10 mt-auto px-6 pb-10">
          <h1 className="text-center text-[clamp(2.2rem,5vw,3.6rem)] tracking-[-0.05em]">The desk assembles itself.</h1>
          <p className="mt-2 text-center text-[#9ec4d8]">A notch that morphs: mark → live tray → command. Not an iPhone screenshot.</p>
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            <Tile k="CANARY" v="12%" />
            <Tile k="AGENTS" v="14" />
            <Tile k="P95" v="98ms" />
          </div>
        </div>
      )}
    </Shell>
  )
}

function CurtainNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'film', label: 'FILM', description: 'reel 04', href: '#navbar', current: true },
    { id: 'slot', label: 'SLOT', description: 'book', href: '#navbar' },
    { id: 'studio', label: 'STUDIO', description: 'ss26', href: '#navbar' },
  ]
  const menu = useMenu(props.defaultOpen ?? true)
  const reduced = usePrefersReducedMotion()
  useFocusTrap(menu.open, menu.root, () => menu.setOpen(false))
  return (
    <Shell variant="curtain" className={cn('relative flex min-h-[36rem] flex-col bg-[#050505] text-[#f7efe2]', props.className)}>
      <div className="absolute inset-0">
        <Plate still={STILL.cinema} alt="" className="brightness-[0.35]" />
      </div>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between px-6 py-5 font-mono text-[12px] tracking-[0.28em]">
        <strong>{props.logo ?? 'KIN'}</strong>
        <button
          type="button"
          className="focus-visible:ring-2 focus-visible:ring-[#f7efe2] focus-visible:outline-none"
          aria-expanded={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
        >
          {menu.open ? 'CLOSE' : 'MENU'}
        </button>
      </nav>
      <AnimatePresence>
        {menu.open ? (
          <motion.div
            ref={menu.root}
            role="dialog"
            aria-modal="true"
            aria-label="Kin menu"
            className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-8"
            initial={false}
            animate={{ opacity: 1 }}
          >
            {items.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.href ?? '#navbar'}
                className="block text-[clamp(3.2rem,10vw,6.4rem)] leading-[0.8] tracking-[0.04em] text-[#f7efe2] outline-none drop-shadow-[0_8px_24px_#000a] focus-visible:text-[#facc15]"
                initial={reduced ? false : { y: 24 }}
                animate={{ y: 0 }}
                transition={{ ...springs.heavy, delay: reduced ? 0 : i * 0.06 }}
              >
                {item.label}{' '}
                <small className="ml-4 align-middle font-[Newsreader,serif] text-[1.2rem] tracking-normal italic opacity-70">
                  {item.description}
                </small>
              </motion.a>
            ))}
          </motion.div>
        ) : props.scene === false ? null : (
          <div className="relative z-10 mt-auto px-6 pb-16">
            <p className="font-mono text-[11px] tracking-[0.28em] uppercase">Kin · ss26</p>
            <h1 className="mt-3 max-w-[12ch] font-[Newsreader,serif] text-[clamp(2rem,4vw,3rem)] italic">The curtain is the menu.</h1>
          </div>
        )}
      </AnimatePresence>
    </Shell>
  )
}

function DockNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'index', label: 'INDEX', href: '#navbar' },
    { id: 'print', label: 'PRINT', href: '#navbar' },
    { id: 'film', label: 'FILM', href: '#navbar', current: true },
    { id: 'yard', label: 'YARD', href: '#navbar' },
    { id: 'book', label: 'BOOK', href: '#navbar' },
  ]
  const reduced = usePrefersReducedMotion()
  const [hot, setHot] = useState(2)
  const [at, setAt] = useState(0.5)
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (reduced || held) return
    const id = window.setInterval(() => setHot((n) => (n + 1) % items.length), 1600)
    return () => window.clearInterval(id)
  }, [held, items.length, reduced])
  function scale(i: number) {
    if (reduced) return i === hot ? 1.28 : 1
    const center = (i + 0.5) / items.length
    const d = Math.abs(at - center)
    return 1 + Math.max(0, 0.58 - d * 2.2)
  }
  function onMove(event: ReactPointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    setHeld(true)
    const box = event.currentTarget.getBoundingClientRect()
    setAt((event.clientX - box.left) / box.width)
    const i = Math.min(items.length - 1, Math.max(0, Math.floor(((event.clientX - box.left) / box.width) * items.length)))
    setHot(i)
  }
  return (
    <Shell variant="dock" className={cn('relative flex min-h-[36rem] flex-col bg-[#111] text-[#f5f1ea]', props.className)}>
      <div className="absolute inset-0">
        <Plate still={STILL.loft} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-[#111]/20" />
      </div>
      {props.scene === false ? null : (
        <h1 className="relative z-10 px-6 pt-16 text-[clamp(3rem,10vw,4.6rem)] leading-[0.88] font-extrabold tracking-[-0.06em] md:px-10">
          SEE THE WORK.
        </h1>
      )}
      <nav
        aria-label="Dock"
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-end gap-2 rounded-[28px] border border-white/12 bg-[#141414]/72 px-3 py-3 backdrop-blur-xl"
        onPointerMove={onMove}
        onPointerLeave={() => {
          if (!held) setAt(0.5)
        }}
      >
        {items.map((item, i) => {
          const s = scale(i)
          const on = i === hot
          return (
            <motion.a
              key={item.id}
              href={item.href ?? '#navbar'}
              aria-current={on ? 'page' : undefined}
              className={cn(
                'grid place-items-center rounded-2xl font-extrabold tracking-[0.08em] mix-blend-normal',
                on ? 'bg-[#facc15] text-[#111]' : 'bg-[#222] text-[#f5f1ea]',
              )}
              style={{ width: 52 * s, height: 52 * s, fontSize: on ? 11 : 10 }}
              transition={springs.ui}
            >
              {item.label}
            </motion.a>
          )
        })}
      </nav>
    </Shell>
  )
}

function RailNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'ops', label: 'Ops', href: '#navbar', current: true },
    { id: 'regions', label: 'Regions', href: '#navbar' },
    { id: 'status', label: 'Status', href: '#navbar' },
    { id: 'agents', label: 'Agents', href: '#navbar' },
  ]
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const [here, setHere] = useState(items.find((i) => i.current)?.id ?? 'ops')
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setHere((cur) => {
        const i = items.findIndex((item) => item.id === cur)
        return items[(i + 1) % items.length]?.id ?? cur
      })
    }, 2200)
    return () => window.clearInterval(id)
  }, [items, reduced])
  const arr = useCount(248, true)
  return (
    <Shell variant="rail" className={cn('flex min-h-[36rem] bg-[#071018] text-[#e8f4ff]', props.className)}>
      <aside className="relative z-10 hidden w-56 shrink-0 border-r border-[#16313c] p-5 md:block">
        <strong className="mb-6 block">{props.logo ?? 'Nimbus'}</strong>
        <nav aria-label="Rail" className="grid gap-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href ?? '#navbar'}
              aria-current={here === item.id ? 'page' : undefined}
              className={cn('flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-[#9ec4d8]', here === item.id && 'bg-[#0b2530] text-white')}
            >
              <i className={cn('size-2 rounded-full', here === item.id ? 'bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]' : 'bg-[#2a4450]')} />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-4 py-3 md:hidden">
          <strong>{props.logo ?? 'Nimbus'}</strong>
          <OpenTrigger
            open={menu.open}
            onClick={() => menu.setOpen((v) => !v)}
            controls={tray}
            label="Rail"
            className="h-10 rounded-full bg-[#22d3ee] px-3 text-sm font-bold text-[#071018]"
          />
        </div>
        <Tray open={menu.open} id={tray} trapRef={menu.root} title="Nimbus rail" className="border border-[#22d3ee]/25 bg-[#0b2530]">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} className="flex items-center gap-2 py-3 text-lg" />
          ))}
        </Tray>
        {props.scene === false ? null : (
          <div className="flex-1 px-5 py-8 md:px-10">
            <h1 className="text-[clamp(2rem,4vw,3rem)] tracking-[-0.05em]">Regions on one rail.</h1>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Tile k="ARR" v={<span ref={arr}>{reduced ? '248' : '0'}</span>} s="k" />
              <Tile k="P95" v="98ms" />
              <Tile k="CANARY" v="12%" />
              <Tile k="AGENTS" v="14" />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Tile k="EU-WEST" v="healthy" />
              <Tile k="US-EAST" v="watch" />
            </div>
          </div>
        )}
      </div>
    </Shell>
  )
}

function Tile({ k, v, s }: { k: string; v: ReactNode; s?: string }) {
  return (
    <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4">
      <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">{k}</small>
      <b className="mt-1.5 block text-[28px]">
        {v}
        {s}
      </b>
    </div>
  )
}

function FolioNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'harbor', label: 'Harbor', href: '#navbar', current: true },
    { id: 'pulse', label: 'Pulse', href: '#navbar' },
    { id: 'hearth', label: 'Hearth', href: '#navbar' },
    { id: 'kin', label: 'Kin', href: '#navbar' },
    { id: 'play', label: 'Playfield', href: '#navbar' },
  ]
  const letters = [
    { ch: 'N', src: STILL.agency },
    { ch: 'O', src: STILL.magazine },
    { ch: 'R', src: STILL.cinema },
  ]
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const [here, setHere] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setHere((n) => (n + 1) % items.length), 1800)
    return () => window.clearInterval(id)
  }, [items.length, reduced])
  return (
    <Shell variant="folio" className={cn('flex min-h-[36rem] flex-col bg-[#0b0b0b] text-[#f5f1e8]', props.className)}>
      <nav aria-label="Primary" className="relative z-10 flex items-start justify-between px-4 py-6 md:px-10">
        <strong className="tracking-[0.18em]">{props.logo ?? 'NORTHBOUND'}</strong>
        <ol className="hidden font-mono text-[13px] leading-8 text-[#b5aea2] md:block">
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={item.href ?? '#navbar'} className={cn(i === here && 'font-bold text-[#f97316]')}>
                <b className={cn('mr-2', i === here ? 'text-[#f97316]' : 'text-[#b5aea2]')}>{String(i + 1).padStart(2, '0')}</b>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#f97316] px-4 text-sm font-extrabold text-[#1a0b00] md:inline-flex">
            Start a brief
          </Magnetic>
        )}
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Index"
          className="h-10 rounded-full bg-[#f97316] px-3 text-sm font-extrabold text-[#1a0b00] md:hidden"
        />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Northbound index" className="border border-white/10 bg-[#14110e]">
        {items.map((item, i) => (
          <a key={item.id} href={item.href ?? '#navbar'} className="flex gap-3 py-3 text-lg">
            <span className="font-mono text-[#f97316]">{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </Tray>
      {props.scene === false ? null : (
        <div className="mt-auto flex gap-2 px-4 pb-10 md:px-10">
          {letters.map((letter) => (
            <span
              key={letter.ch}
              className="flex-1 bg-cover bg-center text-center text-[18vw] leading-[1.15] font-extrabold text-transparent"
              style={{
                backgroundImage: `url(${heroAsset(letter.src)})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              {letter.ch}
            </span>
          ))}
        </div>
      )}
    </Shell>
  )
}

function PortalNav(props: NavbarProps) {
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const spaces = ['Folio', 'Harbor', 'Kin']
  const [ws, setWs] = useState(0)
  const [q, setQ] = useState('')
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setWs((n) => (n + 1) % spaces.length), 2600)
    return () => window.clearInterval(id)
  }, [reduced, spaces.length])
  return (
    <Shell variant="portal" className={cn('flex min-h-[36rem] flex-col bg-[#071018] text-[#e8f4ff]', props.className)}>
      <nav aria-label="Portal" className="relative z-10 flex items-center gap-3 border-b border-[#16313c] bg-[#0b2530] px-3 py-2.5 md:px-5">
        <strong>{props.logo ?? 'Nimbus'}</strong>
        <span className="hidden rounded-lg border border-[#22d3ee]/20 bg-[#071018] px-2.5 py-1 text-[13px] md:inline">{spaces[ws]} ▾</span>
        <label className="sr-only" htmlFor="nimbus-jump">
          Jump
        </label>
        <input
          id="nimbus-jump"
          value={q}
          onChange={(event) => {
            setQ(event.target.value)
            props.onQuery?.(event.target.value)
          }}
          placeholder="Jump to incident, agent, region… ⌘K"
          className="hidden h-9 flex-1 rounded-lg border border-[#16313c] bg-[#071018] px-3 font-mono text-[12px] text-[#9ec4d8] outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] md:block"
        />
        <span className="hidden items-center gap-1.5 font-mono text-[11px] text-[#67e8f9] md:flex">
          <i className="size-1.5 rounded-full bg-[#22d3ee]" />
          14 on desk
        </span>
        <span className="hidden font-mono text-[11px] text-[#67e8f9] lg:inline">watch checkout-edge</span>
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Status"
          className="ml-auto h-9 rounded-full bg-[#22d3ee] px-3 text-[12px] font-bold text-[#071018] md:hidden"
        />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Nimbus portal" className="border border-[#22d3ee]/25 bg-[#0b2530]">
        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Jump…"
          className="h-11 w-full rounded-xl border border-[#16313c] bg-[#071018] px-3 font-mono text-[13px]"
        />
        <p className="mt-3 font-mono text-[12px] text-[#67e8f9]">14 on desk · {spaces[ws]}</p>
        <a href="#navbar" className="mt-2 block py-3">
          Incidents
        </a>
        <a href="#navbar" className="block py-3">
          Agents
        </a>
        <a href="#navbar" className="block py-3">
          Regions
        </a>
      </Tray>
      {props.scene === false ? null : (
        <div className="grid flex-1 gap-3 p-4 md:grid-cols-[1.2fr_0.8fr] md:p-5">
          <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4">
            <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">INCIDENTS</small>
            <p className="mt-3 font-mono text-[13px] leading-7">
              14:02 checkout-edge · watch
              <br />
              13:51 ingest-eu · clear
              <br />
              13:40 billing-canary · page
              <br />
              13:12 auth-sessions · ack
              <br />
              12:58 replay last deploy · run
            </p>
          </div>
          <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4">
            <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">DESK CAM</small>
            <Plate still={STILL.loft} alt="Desk" className="mt-3 h-40 rounded-xl md:h-48" />
          </div>
        </div>
      )}
    </Shell>
  )
}

