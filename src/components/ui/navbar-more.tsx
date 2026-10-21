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
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

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
      <nav aria-label="Docs" className="relative z-10 grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 pt-3 md:px-8">
        <strong className="text-[13px] font-semibold tracking-[-0.02em]">{props.logo ?? 'Prism'}</strong>
        <p className="hidden font-mono text-[11px] tracking-[-0.01em] text-[#6b7280] md:block">
          Product / Auth / <b className="text-[#111827]">{here}</b>
        </p>
        <span className="font-mono text-[11px] text-[#6b7280]">{pct}%</span>
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Here"
          className="col-start-3 row-start-1 h-8 justify-self-end rounded-full border border-[#111827]/10 px-3 text-[12px] md:hidden"
        />
      </nav>
      <div className="mt-2 h-px bg-[#e5e7eb]" aria-hidden="true">
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
  const scroller = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ container: scroller, offset: ['start start', 'end start'] })
  const xLeft = useTransform(scrollYProgress, [0, 0.28], [0, -36])
  const xRight = useTransform(scrollYProgress, [0, 0.28], [0, 36])
  const fade = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const pad = useTransform(scrollYProgress, [0, 0.22], [20, 10])
  return (
    <Shell
      variant="split"
      rootRef={scroller}
      className={cn('flex max-h-svh min-h-[36rem] flex-col overflow-x-hidden overflow-y-auto bg-[#f4f1ea] text-[#1c1914]', props.className)}
    >
      <motion.nav
        aria-label="Primary"
        className="sticky top-0 z-20 flex items-center justify-between border-b border-[#1c1914]/10 bg-[#f4f1ea]/88 px-4 backdrop-blur-md md:px-12"
        style={{ paddingTop: pad, paddingBottom: pad }}
      >
        <motion.strong className="text-[13px] font-semibold tracking-[-0.02em]" style={{ x: xLeft }}>
          {props.logo ?? 'Vesper'}
        </motion.strong>
        <motion.div className="hidden gap-6 text-[12px] tracking-[-0.01em] md:flex" style={{ opacity: fade }}>
          {items.map((item) => (
            <ItemLink key={item.id} item={item} />
          ))}
        </motion.div>
        {props.action ?? (
          <motion.div style={{ x: xRight }}>
            <Magnetic href="#navbar" className="hidden h-8 items-center rounded-full bg-[#0f766e] px-3.5 text-[12px] font-semibold text-white md:inline-flex">
              Book a demo
            </Magnetic>
          </motion.div>
        )}
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Menu"
          className="h-8 rounded-full bg-[#0f766e] px-3 text-[12px] font-semibold text-white md:hidden"
        />
      </motion.nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Vesper" className="border border-[#1c1914]/10 bg-white">
        <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-[#0f766e] uppercase">Scroll splits the bar</p>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="block py-3 text-lg" />
        ))}
        <a href="#navbar" className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#0f766e] font-bold text-white">
          Book a demo
        </a>
      </Tray>
      {props.scene === false ? (
        <div className="h-[120vh]" />
      ) : (
        <>
          <div className="grid flex-none items-center gap-8 px-5 py-10 md:grid-cols-2 md:px-12">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#0f766e] uppercase">Vesper · clinic device</p>
              <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.92] font-extrabold tracking-[-0.05em]">
                A clinic device you can turn.
              </h1>
              <p className="mt-4 max-w-md leading-7 text-[#5c574e]">
                Scroll this column. The wordmark walks left, the CTA walks right, the links dissolve. It is tied to scroll, not a timer.
              </p>
            </div>
            <motion.div
              className="overflow-hidden rounded-[36px] shadow-[0_40px_80px_-36px_#0005]"
              style={{ rotateY: 18, transformPerspective: 1200 }}
            >
              <Plate still={STILL.puck} alt="Vesper puck" className="h-[16rem] md:h-[22rem]" />
            </motion.div>
          </div>
          <div className="grid gap-6 px-5 pb-24 md:grid-cols-3 md:px-12">
            {[
              ['Pulse', '12s to a reading. The puck stays in the room.'],
              ['Trials', 'Harbor Clinic, week twelve. Named rooms.'],
              ['Hold', 'Thursday 9:20 is a real slot, not a calendar myth.'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-[#1c1914]/10 bg-white/70 p-5">
                <b className="block text-sm">{k}</b>
                <p className="mt-2 text-[13px] leading-6 text-[#5c574e]">{v}</p>
              </div>
            ))}
          </div>
        </>
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
          className="flex min-w-[min(92vw,32rem)] max-w-[38rem] items-center gap-2 rounded-[22px] border border-[#22d3ee]/30 bg-[#0b2530] px-3 py-2 shadow-[0_20px_40px_-24px_#000]"
          onPointerDown={() => setHeld(true)}
        >
          <i className="size-2 shrink-0 rounded-full bg-[#22d3ee] shadow-[0_0_12px_#22d3ee]" aria-hidden="true" />
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-2 text-left"
            aria-live="polite"
            onClick={() => setJob((n) => (n + 1) % jobs.length)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={here.id}
                className="flex min-w-0 flex-1 items-center gap-2"
                initial={reduced ? false : { y: 8 }}
                animate={{ y: 0 }}
                exit={reduced ? undefined : { y: -8 }}
                transition={springs.ui}
              >
                {here.id === 'mark' ? (
                  <>
                    <strong className="text-[13px] font-semibold">{props.logo ?? 'Nimbus'}</strong>
                    <span className="font-mono text-[11px] tracking-[0.12em] text-[#67e8f9]">idle</span>
                    <span className="ml-auto hidden font-mono text-[11px] text-[#9ec4d8] sm:inline">99.98%</span>
                  </>
                ) : null}
                {here.id === 'live' ? (
                  <>
                    <strong className="text-[13px] font-semibold">{props.logo ?? 'Nimbus'}</strong>
                    <span className="hidden font-mono text-[11px] text-[#67e8f9] sm:inline">14 · 12%</span>
                    <span className="ml-auto flex">
                      {['A', 'K', 'M'].map((ch) => (
                        <b
                          key={ch}
                          className="-ml-1.5 grid size-6 place-items-center rounded-full border-2 border-[#0b2530] bg-[#16313c] text-[9px] first:ml-0"
                        >
                          {ch}
                        </b>
                      ))}
                    </span>
                    <span className="hidden h-1 w-14 overflow-hidden rounded-full bg-[#071018] sm:block">
                      <motion.i
                        className="block h-full bg-[#22d3ee]"
                        animate={{ width: reduced ? '12%' : ['8%', '18%', '12%'] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      />
                    </span>
                  </>
                ) : null}
                {here.id === 'cmd' ? (
                  <>
                    <span className="rounded-md border border-[#22d3ee]/25 px-1.5 py-0.5 font-mono text-[10px] text-[#9ec4d8]">⌘K</span>
                    <span className="min-w-0 flex-1 truncate rounded-md border border-[#16313c] bg-[#071018] px-2 py-1 font-mono text-[12px] text-[#9ec4d8]">
                      watch checkout-edge
                    </span>
                  </>
                ) : null}
              </motion.span>
            </AnimatePresence>
          </button>
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
        <p className="font-mono text-[12px] text-[#67e8f9]">{here.meta}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Tile k="CANARY" v="12%" />
          <Tile k="AGENTS" v="14" />
          <Tile k="P95" v="98ms" />
        </div>
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
        <div className="relative z-10 mx-auto mt-8 hidden w-full max-w-4xl flex-1 px-4 pb-8 md:block">
          <AnimatePresence mode="wait" initial={false}>
            {here.id === 'mark' ? (
              <motion.div key="mark" initial={false} animate={{ y: 0 }} exit={reduced ? undefined : { y: -8 }} className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-5">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">IDLE</p>
                  <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.05em]">The desk is waiting.</h1>
                  <p className="mt-2 text-sm text-[#9ec4d8]">Mark state. No agents paged. Canary holds 12%.</p>
                </div>
                <Tile k="UPTIME" v="99.98" s="%" />
              </motion.div>
            ) : null}
            {here.id === 'live' ? (
              <motion.div key="live" initial={false} animate={{ y: 0 }} exit={reduced ? undefined : { y: -8 }}>
                <div className="grid gap-3 sm:grid-cols-3">
                  <Tile k="CANARY" v="12%" />
                  <Tile k="AGENTS" v="14" />
                  <Tile k="P95" v="98ms" />
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">ON DESK</p>
                    <ul className="mt-3 grid gap-2 font-mono text-[13px]">
                      <li className="flex justify-between"><span>Ada Klein</span><span className="text-[#67e8f9]">watch</span></li>
                      <li className="flex justify-between"><span>Jon Reed</span><span className="text-[#9ec4d8]">ack</span></li>
                      <li className="flex justify-between"><span>Mina Park</span><span className="text-[#67e8f9]">page</span></li>
                      <li className="flex justify-between"><span>Chris Vale</span><span className="text-[#9ec4d8]">idle</span></li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">INCIDENT</p>
                    <p className="mt-3 font-mono text-[13px] leading-6">14:02 checkout-edge · watch<br />canary 12% · eu-west</p>
                    <span className="mt-4 block h-1.5 overflow-hidden rounded-full bg-[#071018]">
                      <motion.i className="block h-full bg-[#22d3ee]" animate={{ width: reduced ? '12%' : ['8%', '18%', '12%'] }} transition={{ duration: 2.4, repeat: Infinity }} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : null}
            {here.id === 'cmd' ? (
              <motion.div key="cmd" initial={false} animate={{ y: 0 }} exit={reduced ? undefined : { y: -8 }} className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4">
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">ASK NIMBUS</p>
                <p className="mt-3 rounded-lg border border-[#16313c] bg-[#071018] px-3 py-2 font-mono text-[13px] text-[#9ec4d8]">watch checkout-edge</p>
                <ul className="mt-3 grid gap-2 font-mono text-[13px]">
                  <li className="rounded-lg bg-[#071018] px-3 py-2">canary 12% · hold</li>
                  <li className="rounded-lg px-3 py-2">replay last deploy · eu-west</li>
                  <li className="rounded-lg px-3 py-2">page Ada Klein</li>
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
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
    <Shell variant="dock" className={cn('relative flex min-h-[36rem] flex-col bg-[#14110c] text-[#f5f1ea]', props.className)}>
      <YardPlate hot={items[hot]?.id ?? 'film'} />
      {props.scene === false ? null : (
        <h1 className="relative z-10 px-6 pt-14 text-[clamp(3rem,10vw,4.6rem)] leading-[0.88] font-extrabold tracking-[-0.06em] md:px-10">
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

function YardPlate({ hot }: { hot: string }) {
  const frames = [
    { id: 'index', src: STILL.magazine, label: 'Index 04' },
    { id: 'print', src: STILL.agency, label: 'Print 11' },
    { id: 'film', src: STILL.cinema, label: 'Film 18' },
    { id: 'yard', src: STILL.desk, label: 'Yard 09' },
    { id: 'book', src: STILL.athlete, label: 'Book 22' },
  ]
  return (
    <div className="absolute inset-0 bg-[#1a1610]" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-[62%] bg-[#241e16]" />
      <p className="absolute top-5 left-6 font-mono text-[11px] tracking-[0.22em] text-[#c4b49a] uppercase">Yard · print / film / book</p>
      <div className="absolute top-[18%] left-[5%] grid w-[72%] grid-cols-3 gap-2 md:w-[70%] md:grid-cols-5 md:gap-3">
        {frames.map((frame) => (
          <figure
            key={frame.id}
            className={cn(
              'overflow-hidden rounded-sm border-[6px] border-[#3a3228] bg-[#0e0c09] shadow-[0_18px_30px_-18px_#000]',
              hot === frame.id && 'border-[#facc15]',
            )}
          >
            <Plate still={frame.src} alt="" className="h-28 md:h-36" />
            <figcaption className="bg-[#2a241c] px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-[#c4b49a] uppercase">{frame.label}</figcaption>
          </figure>
        ))}
      </div>
      <div
        className={cn(
          'absolute top-[16%] right-[4%] hidden h-[46%] w-14 flex-col overflow-hidden rounded-sm border bg-[#0e0c09] md:flex',
          hot === 'film' ? 'border-[#facc15]' : 'border-[#3a3228]',
        )}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="relative flex-1 border-b border-[#3a3228]">
            <i className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-[#c4b49a]" />
            <i className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 rounded-full bg-[#c4b49a]" />
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-[#2c261c] to-[#0e0c09]" />
    </div>
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
  const notesId = useId()
  const wsId = useId()
  const reduced = usePrefersReducedMotion()
  const spaces = ['Folio', 'Harbor', 'Kin']
  const notes = [
    { t: '14:02', m: 'checkout-edge watch' },
    { t: '13:51', m: 'ingest-eu clear' },
    { t: '13:40', m: 'billing-canary page' },
  ]
  const [ws, setWs] = useState(0)
  const [q, setQ] = useState('')
  const [openWs, setOpenWs] = useState(false)
  const [openNotes, setOpenNotes] = useState(false)
  const p95 = useCount(98, true)
  const shown = notes.filter(
    (note) => !q.trim() || `${note.t} ${note.m}`.toLowerCase().includes(q.trim().toLowerCase()),
  )
  useEffect(() => {
    if (reduced || openWs || openNotes) return
    const id = window.setInterval(() => setWs((n) => (n + 1) % spaces.length), 3200)
    return () => window.clearInterval(id)
  }, [openNotes, openWs, reduced, spaces.length])
  return (
    <Shell variant="portal" className={cn('flex min-h-[36rem] flex-col bg-[#071018] text-[#e8f4ff]', props.className)}>
      <nav aria-label="Portal" className="relative z-20 flex flex-wrap items-center gap-2 border-b border-[#16313c] bg-[#0b2530] px-3 py-2 md:px-4">
        <strong className="text-[13px] font-semibold tracking-[-0.02em]">{props.logo ?? 'Nimbus'}</strong>
        <div className="relative hidden md:block">
          <button
            type="button"
            className="rounded-lg border border-[#22d3ee]/20 bg-[#071018] px-2.5 py-1 text-[12px]"
            aria-expanded={openWs}
            aria-controls={wsId}
            onClick={() => {
              setOpenWs((v) => !v)
              setOpenNotes(false)
            }}
          >
            {spaces[ws]} ▾
          </button>
          {openWs ? (
            <ul id={wsId} role="listbox" className="absolute top-9 left-0 z-30 min-w-[8rem] rounded-xl border border-[#16313c] bg-[#071018] p-1">
              {spaces.map((space, i) => (
                <li key={space}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === ws}
                    className={cn('w-full rounded-lg px-2 py-1.5 text-left text-[12px]', i === ws && 'bg-[#0b2530]')}
                    onClick={() => {
                      setWs(i)
                      setOpenWs(false)
                    }}
                  >
                    {space}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
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
          placeholder="Jump to incident, agent, region…"
          className="hidden h-8 min-w-[10rem] flex-1 rounded-lg border border-[#16313c] bg-[#071018] px-3 font-mono text-[12px] text-[#9ec4d8] outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] md:block"
        />
        <span className="hidden items-center gap-1.5 rounded-lg border border-[#16313c] px-2 py-1 font-mono text-[10px] text-[#67e8f9] lg:flex">
          P95 <b ref={p95} className="text-[#e8f4ff]">{reduced ? '98' : '0'}</b>ms
        </span>
        <span className="hidden items-center gap-1.5 rounded-lg border border-[#16313c] px-2 py-1 font-mono text-[10px] text-[#67e8f9] md:flex">
          <i className="size-1.5 rounded-full bg-[#22d3ee]" />
          14
        </span>
        <span className="hidden rounded-lg border border-[#16313c] px-2 py-1 font-mono text-[10px] text-[#67e8f9] xl:inline">canary 12%</span>
        <div className="relative ml-auto md:ml-0">
          <button
            type="button"
            className="relative rounded-lg border border-[#16313c] px-2 py-1 text-[12px]"
            aria-expanded={openNotes}
            aria-controls={notesId}
            onClick={() => {
              setOpenNotes((v) => !v)
              setOpenWs(false)
            }}
          >
            Notes
            <b className="ml-1 inline-grid size-4 place-items-center rounded-full bg-[#22d3ee] text-[9px] text-[#071018]">3</b>
          </button>
          {openNotes ? (
            <ul id={notesId} className="absolute top-9 right-0 z-30 w-56 rounded-xl border border-[#16313c] bg-[#071018] p-2 font-mono text-[11px]">
              {notes.map((note) => (
                <li key={note.t} className="rounded-lg px-2 py-1.5">
                  <span className="text-[#67e8f9]">{note.t}</span> {note.m}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <OpenTrigger
          open={menu.open}
          onClick={() => menu.setOpen((v) => !v)}
          controls={tray}
          label="Desk"
          className="h-8 rounded-full bg-[#22d3ee] px-3 text-[12px] font-bold text-[#071018] md:hidden"
        />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Nimbus portal" className="border border-[#22d3ee]/25 bg-[#0b2530]">
        <p className="font-mono text-[12px] text-[#67e8f9]">{spaces[ws]} · 14 on desk · 3 notes</p>
        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Jump…"
          className="mt-3 h-11 w-full rounded-xl border border-[#16313c] bg-[#071018] px-3 font-mono text-[13px]"
        />
        {notes.map((note) => (
          <p key={note.t} className="mt-2 font-mono text-[13px]">
            {note.t} {note.m}
          </p>
        ))}
      </Tray>
      {props.scene === false ? null : (
        <div className="grid flex-1 grid-cols-2 gap-3 p-3 md:grid-cols-12 md:p-4">
          <div className="col-span-2 rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4 md:col-span-5">
            <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">INCIDENTS</small>
            <ul className="mt-3 grid gap-2 font-mono text-[12px] leading-5">
              {shown.length === 0 ? (
                <li className="text-[#9ec4d8]">No match for “{q}”.</li>
              ) : (
                shown.map((note) => (
                  <li key={note.t} className="flex justify-between gap-3">
                    <span>
                      {note.t} {note.m}
                    </span>
                    <span className="text-[#67e8f9]">live</span>
                  </li>
                ))
              )}
              {q.trim() ? null : (
                <li className="flex justify-between gap-3 text-[#9ec4d8]">
                  <span>13:12 auth-sessions ack</span>
                  <span>ok</span>
                </li>
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4 md:col-span-3">
            <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">AGENTS</small>
            <ul className="mt-3 grid gap-2 text-[12px]">
              {['Ada · watch', 'Jon · ack', 'Mina · page', 'Chris · idle'].map((row) => (
                <li key={row} className="flex items-center gap-2">
                  <i className="size-1.5 rounded-full bg-[#22d3ee]" />
                  {row}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4 md:col-span-4">
            <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">CANARY</small>
            <b className="mt-2 block text-2xl">12%</b>
            <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-[#071018]">
              <motion.i className="block h-full w-[12%] bg-[#22d3ee]" animate={reduced ? undefined : { width: ['10%', '16%', '12%'] }} transition={{ duration: 2.8, repeat: Infinity }} />
            </span>
            <p className="mt-2 font-mono text-[11px] text-[#9ec4d8]">checkout-edge · eu-west</p>
          </div>
          <div className="col-span-2 rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-4 md:col-span-4">
            <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">REGIONS</small>
            <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[12px]">
              <p>eu-west · healthy</p>
              <p>us-east · watch</p>
              <p>ap-south · idle</p>
              <p>us-west · clear</p>
            </div>
          </div>
          <div className="col-span-2 rounded-2xl border border-[#22d3ee]/20 bg-[#0b2530] p-3 md:col-span-8">
            <small className="font-mono text-[10px] tracking-[0.16em] text-[#67e8f9]">DESK CAM · {spaces[ws]}</small>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Plate still={STILL.desk} alt="" className="h-24 rounded-lg md:h-28" />
              <Plate still={STILL.agency} alt="" className="h-24 rounded-lg md:h-28" />
              <Plate still={STILL.laptop} alt="" className="h-24 rounded-lg md:h-28" />
            </div>
          </div>
        </div>
      )}
    </Shell>
  )
}

