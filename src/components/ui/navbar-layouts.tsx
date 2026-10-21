'use client'

import { NavbarMore } from '@/components/ui/navbar-more.tsx'
import { Magnetic, springs, useCount } from '@/lib/kit.tsx'
import {
  FACE,
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
import type { NavItem, NavbarProps, NavbarVariant } from '@/components/ui/navbar.tsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

export function NavbarLayouts({ variant, ...props }: NavbarProps & { variant: NavbarVariant }) {
  switch (variant) {
    case 'pill':
      return <PillNav {...props} />
    case 'banner':
      return <BannerNav {...props} />
    case 'tabs':
      return <TabsNav {...props} />
    case 'clinic':
      return <ClinicNav {...props} />
    case 'league':
      return <LeagueNav {...props} />
    case 'pop':
      return <PopNav {...props} />
    case 'mega':
      return <MegaNav {...props} />
    case 'command':
      return <CommandNav {...props} />
    case 'follow':
      return <FollowNav {...props} />
    default:
      return <NavbarMore variant={variant} {...props} />
  }
}

const LUMEN: NavItem[] = [
  { id: 'product', label: 'Product', href: '#navbar', current: true },
  { id: 'studio', label: 'Studio', href: '#navbar' },
  { id: 'pricing', label: 'Pricing', href: '#navbar' },
]

function PillNav(props: NavbarProps) {
  const items = props.items ?? LUMEN
  const menu = useMenu()
  const tray = useId()
  return (
    <Shell variant="pill" className={cn('flex min-h-[36rem] flex-col bg-[#04060f] text-[#eef7ff]', FACE.pill, props.className)}>
      <div className="pointer-events-none absolute -inset-[20%] blur-[70px]" aria-hidden="true">
        <i className="absolute top-[-18%] left-[-8%] size-[50vw] rounded-full bg-[#5b8cff]" />
        <i className="absolute top-[8%] right-[-12%] size-[46vw] rounded-full bg-[#7c5cff]" />
      </div>
      <div className="relative z-10 flex justify-center px-4 pt-5">
        <nav aria-label="Primary" className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border border-white/18 bg-[#080c18]/70 px-3 py-2 shadow-[0_18px_40px_-24px_#000] backdrop-blur-xl md:justify-start md:gap-6">
          <strong className="flex items-center gap-2 px-2 text-sm font-extrabold">
            <span className="size-2.5 rounded-full" style={{ background: 'conic-gradient(#2ee6c7,#7c5cff,#5b8cff,#2ee6c7)' }} />
            {props.logo ?? 'Lumen'}
          </strong>
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {items.map((item) => (
              <ItemLink
                key={item.id}
                item={item}
                magnetic
                className={cn(
                  'inline-flex h-9 items-center rounded-full px-3 text-[13px] text-[#c9d7ea] mix-blend-normal',
                  item.current && 'bg-white/10 text-white',
                )}
              />
            ))}
          </div>
          {props.action ?? (
            <Magnetic href="#navbar" className="hidden h-9 items-center rounded-full bg-[#eef7ff] px-4 text-[13px] font-extrabold text-[#08101c] mix-blend-normal md:inline-flex">
              Open the desk
            </Magnetic>
          )}
          <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Menu" className="h-9 rounded-full bg-white/10 px-3 text-[13px] md:hidden" />
        </nav>
      </div>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Lumen menu" className="border border-white/15 bg-[#080c18]/95 text-white backdrop-blur-xl">
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="block rounded-2xl px-3 py-3 text-lg" />
        ))}
        <a href="#navbar" className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#eef7ff] font-bold text-[#08101c]">
          Open the desk
        </a>
      </Tray>
      {props.scene === false ? null : (
        <SampleHero
          kicker="Design OS · v2.4"
          title={<>Light the work before the brief.</>}
          lede="A floating capsule over the aurora. Links drift toward the pointer. The CTA is a solid chip, not a ghost."
          still={STILL.laptop}
          alt="Lumen laptop"
          invert
        />
      )}
    </Shell>
  )
}

function BannerNav(props: NavbarProps) {
  const items = props.items ?? LUMEN
  const menu = useMenu()
  const tray = useId()
  const root = useRef<HTMLElement>(null)
  const { scrollY } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const reduced = usePrefersReducedMotion()
  const h = useTransform(scrollY, [0, 80], [36, 0])
  const op = useTransform(scrollY, [0, 80], [1, 0])
  return (
    <Shell
      variant="banner"
      rootRef={root}
      className={cn('flex min-h-[36rem] flex-col bg-[#f4f1ea] text-[#10141c]', props.className)}
    >
      <motion.div
        className="flex items-center justify-center gap-4 overflow-hidden bg-[#111] font-mono text-[11px] tracking-[0.14em] text-[#facc15] uppercase"
        style={reduced ? { height: 36 } : { height: h, opacity: op }}
      >
        Studio 12 opens Thursday · 18 seats left
        <a href="#navbar" className="font-semibold text-white">
          Reserve a desk
        </a>
      </motion.div>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between border-b border-[#e4ddd0] bg-[#f4f1ea]/92 px-4 py-3 md:px-10">
        <strong>{props.logo ?? 'Lumen'}</strong>
        <div className="hidden gap-5 text-sm text-[#4a453c] md:flex">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} className="hover:text-[#10141c]" />
          ))}
        </div>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#111] px-4 text-sm font-bold text-[#f4f1ea] md:inline-flex">
            Open the desk
          </Magnetic>
        )}
        <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Menu" className="h-10 rounded-full border border-[#111]/15 px-3 text-sm md:hidden" />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Lumen menu" className="border border-[#111]/10 bg-white text-[#10141c]">
        <p className="mb-3 rounded-2xl bg-[#111] px-3 py-2 font-mono text-[11px] text-[#facc15] uppercase">Studio 12 · Thursday</p>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="block rounded-2xl px-3 py-3 text-lg" />
        ))}
      </Tray>
      {props.scene === false ? null : (
        <SampleHero
          kicker="Announcement · absorbed on scroll"
          title="The bar absorbs the news."
          lede="A live strip sits on the bar. Scroll and it collapses into the wordmark — not a second header."
          still={STILL.laptop}
          alt="Lumen desk"
        />
      )}
    </Shell>
  )
}

function TabsNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'canvas', label: 'Canvas', href: '#navbar', current: true },
    { id: 'tokens', label: 'Tokens', href: '#navbar' },
    { id: 'pricing', label: 'Pricing', href: '#navbar' },
  ]
  const [here, setHere] = useState(items.find((i) => i.current)?.id ?? items[0]?.id)
  const [held, setHeld] = useState(false)
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced || held || items.length < 2) return
    const id = window.setInterval(() => {
      setHere((cur) => {
        const i = items.findIndex((item) => item.id === cur)
        return items[(i + 1) % items.length]?.id ?? cur
      })
    }, 2200)
    return () => window.clearInterval(id)
  }, [held, items, reduced])
  return (
    <Shell variant="tabs" className={cn('flex min-h-[36rem] flex-col bg-[#12081c] text-[#f6f0ff]', props.className)}>
      <div className="pointer-events-none absolute -inset-[10%] blur-[80px]" aria-hidden="true">
        <i className="absolute top-[-10%] left-[8%] size-[48vw] rounded-[40%] bg-[#f472b6]" />
        <i className="absolute top-[20%] right-[-8%] size-[42vw] rounded-[42%] bg-[#818cf8]" />
      </div>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between px-4 py-5 md:px-10">
        <strong>{props.logo ?? 'Iris'}</strong>
        <div className="hidden rounded-full border border-white/12 bg-white/6 p-1 md:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href ?? '#navbar'}
              aria-current={here === item.id ? 'page' : undefined}
              onClick={() => {
                setHeld(true)
                setHere(item.id)
              }}
              className="relative px-4 py-2 text-[13px]"
            >
              {here === item.id ? (
                <motion.span
                  layoutId={reduced ? undefined : 'iris-tab'}
                  className="absolute inset-0 rounded-full bg-white"
                  transition={springs.ui}
                />
              ) : null}
              <span className={cn('relative z-10', here === item.id && 'font-extrabold text-[#12081c]')}>{item.label}</span>
            </a>
          ))}
        </div>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-white px-4 text-sm font-extrabold text-[#12081c] md:inline-flex">
            Open Iris
          </Magnetic>
        )}
        <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Canvas" className="h-10 rounded-full bg-white px-3 text-sm font-bold text-[#12081c] md:hidden" />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Iris" className="border border-white/15 bg-[#1a0c28] text-white">
        <p className="mb-2 font-mono text-[11px] tracking-[0.16em] text-[#f9a8d4] uppercase">Swipe the chips</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} className="shrink-0 rounded-full bg-white/10 px-4 py-2" />
          ))}
        </div>
      </Tray>
      {props.scene === false ? null : (
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-16">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#f9a8d4] uppercase">Iris canvas · liquid indicator</p>
          <h1 className="mt-3 text-[clamp(4rem,14vw,8rem)] leading-[0.86] font-extrabold tracking-[-0.06em]">IRIS</h1>
        </div>
      )}
    </Shell>
  )
}

function ClinicNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'visit', label: 'Visit', href: '#navbar', current: true },
    { id: 'doctors', label: 'Doctors', href: '#navbar' },
    { id: 'records', label: 'Records', href: '#navbar' },
  ]
  const menu = useMenu()
  const tray = useId()
  return (
    <Shell variant="clinic" className={cn('flex min-h-[36rem] flex-col bg-[#f7f5f2] text-[#1c1917]', props.className)}>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between border-b border-[#ece7e0] bg-white px-4 py-3 md:px-10">
        <strong>{props.logo ?? 'Harbor Clinic'}</strong>
        <div className="hidden gap-5 text-sm text-[#57534e] md:flex">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} />
          ))}
        </div>
        <span className="hidden items-center gap-2 font-mono text-[12px] text-[#0369a1] md:flex">
          <i className="size-2 rounded-full bg-[#22c55e]" />
          Dr. Okonkwo · in clinic
        </span>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#0369a1] px-4 text-sm font-semibold text-white md:inline-flex">
            Hold Thursday 9:20
          </Magnetic>
        )}
        <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Visit" className="h-10 rounded-full bg-[#0369a1] px-3 text-sm text-white md:hidden" />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Harbor visit" className="border border-[#1c1917]/10 bg-white">
        <p className="rounded-2xl bg-[#f3efe9] px-3 py-3 text-sm">
          <b className="block">Dr. Okonkwo</b>
          Thursday 9:20 · room 2 · in clinic
        </p>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="mt-2 block rounded-2xl px-3 py-3 text-lg" />
        ))}
        <a href="#navbar" className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#0369a1] font-semibold text-white">
          Hold Thursday 9:20
        </a>
      </Tray>
      {props.scene === false ? null : (
        <SampleHero
          kicker="Harbor Clinic · intake"
          title="The visit starts as a chat."
          lede="Named doctor, real room, a Pulse reading from last week. The bar is the intake desk."
          still={STILL.clinic}
          alt="Harbor Clinic lobby"
        />
      )}
    </Shell>
  )
}

function LeagueNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'fixtures', label: 'Fixtures', href: '#navbar' },
    { id: 'clubs', label: 'Clubs', href: '#navbar' },
    { id: 'tickets', label: 'Tickets', href: '#navbar', current: true },
  ]
  const menu = useMenu()
  const tray = useId()
  const node = useCount(48, true)
  const reduced = usePrefersReducedMotion()
  return (
    <Shell variant="league" className={cn('flex min-h-[36rem] flex-col bg-[#04150f] text-[#e8ffe9]', props.className)}>
      <div className="absolute inset-0">
        <Plate still={STILL.athlete} alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04150f] via-[#04150f]/70 to-transparent" />
      </div>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between px-4 py-4 md:px-10">
        <strong className="tracking-[0.14em]">{props.logo ?? 'HARBOR ATHLETIC'}</strong>
        <div className="hidden gap-5 text-[13px] text-[#b8e0b4] md:flex">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} />
          ))}
        </div>
        <span className="hidden font-mono text-[12px] tracking-[0.14em] text-[#facc15] md:block">
          W400 · <span ref={node}>{reduced ? '48' : '0'}</span>.02
        </span>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#facc15] px-4 text-sm font-bold text-[#04150f] mix-blend-normal md:inline-flex">
            Get tickets
          </Magnetic>
        )}
        <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Card" className="h-10 rounded-full bg-[#facc15] px-3 text-sm font-bold text-[#04150f] md:hidden" />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Harbor Athletic" className="border border-[#facc15]/30 bg-[#04150f] text-[#e8ffe9]">
        <p className="font-mono text-[#facc15]">Friday night · W400 48.02</p>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="mt-2 block py-3 text-lg" />
        ))}
        <a href="#navbar" className="mt-3 flex h-12 items-center justify-center rounded-full bg-[#facc15] font-bold text-[#04150f]">
          Get tickets
        </a>
      </Tray>
      {props.scene === false ? null : (
        <div className="relative z-10 mt-auto px-6 pb-14 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.24em] text-[#facc15] uppercase">Harbor Athletic · night meet</p>
          <h1 className="mt-3 max-w-[12ch] text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.88] font-black tracking-[-0.05em]">
            The association, after dark.
          </h1>
        </div>
      )}
    </Shell>
  )
}

function PopNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'classes', label: 'Classes', href: '#navbar', current: true },
    { id: 'teachers', label: 'Teachers', href: '#navbar' },
    { id: 'apply', label: 'Apply', href: '#navbar' },
  ]
  const menu = useMenu()
  const tray = useId()
  return (
    <Shell variant="pop" className={cn('flex min-h-[36rem] flex-col bg-[#fff7ed] text-[#1c1917]', props.className)}>
      <span className="pointer-events-none absolute top-[12%] left-[8%] size-40 rounded-full bg-[#fb7185] opacity-80 blur-2xl" />
      <span className="pointer-events-none absolute top-[8%] right-[12%] size-36 rounded-full bg-[#38bdf8] opacity-80 blur-2xl" />
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between px-4 py-4 md:px-10">
        <strong className="text-xl">{props.logo ?? 'Playfield'}</strong>
        <div className="hidden gap-2 md:flex">
          <span className="rounded-full bg-white px-3 py-1 text-[12px] font-bold shadow">Drawing · 10:00</span>
          <span className="rounded-full bg-white px-3 py-1 text-[12px] font-bold shadow">Games · 13:30</span>
        </div>
        <div className="hidden gap-5 text-sm md:flex">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} />
          ))}
        </div>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#f43f5e] px-4 text-sm font-semibold text-white md:inline-flex">
            Apply for spring
          </Magnetic>
        )}
        <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Classes" className="h-10 rounded-full bg-[#f43f5e] px-3 text-sm text-white md:hidden" />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Playfield" className="border border-white bg-[#fff7ed]">
        <div className="mb-3 grid gap-2">
          <p className="rounded-2xl bg-white px-3 py-3 font-semibold shadow">Drawing · 10:00 · Yard 2</p>
          <p className="rounded-2xl bg-[#38bdf8] px-3 py-3 font-semibold text-white">Games · 13:30 · Court</p>
        </div>
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="block py-3 text-lg" />
        ))}
      </Tray>
      {props.scene === false ? null : (
        <SampleHero
          kicker="Playfield Academy · spring term"
          title={
            <>
              A school that looks like <span className="text-[#f43f5e]">Saturday.</span>
            </>
          }
          lede="Morning drawing, afternoon games, a courtyard that already looks like the first day of term."
          still={STILL.academy}
          alt="Playfield courtyard"
        />
      )}
    </Shell>
  )
}

function MegaNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'work', label: 'Work', href: '#navbar', current: true },
    { id: 'people', label: 'People', href: '#navbar' },
    { id: 'journal', label: 'Journal', href: '#navbar' },
  ]
  const cards = [
    { title: 'Harbor Athletic', meta: 'Identity · 2026', src: STILL.athlete },
    { title: 'Vesper Pulse', meta: 'Device · 12s', src: STILL.puck },
    { title: 'Kin Veil', meta: 'Fashion film', src: STILL.cinema },
  ]
  const menu = useMenu(props.defaultOpen ?? true)
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  return (
    <Shell variant="mega" className={cn('flex min-h-[36rem] flex-col bg-[#f6f3ec] text-[#171412]', props.className)}>
      <nav aria-label="Primary" className="relative z-10 flex items-center justify-between px-4 py-4 md:px-10">
        <strong>{props.logo ?? 'Folio'}</strong>
        <div className="hidden gap-5 text-sm text-[#6b645c] md:flex">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(item.current && 'font-extrabold text-[#be123c]')}
              aria-expanded={item.id === 'work' ? menu.open : undefined}
              onClick={() => item.id === 'work' && menu.setOpen((v) => !v)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#be123c] px-4 text-sm font-semibold text-white md:inline-flex">
            Start a project
          </Magnetic>
        )}
        <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Work" className="h-10 rounded-full bg-[#be123c] px-3 text-sm text-white md:hidden" />
      </nav>
      <div className="hidden px-10 md:block">
        <AnimatePanel open={menu.open} reduced={reduced}>
          <div className="grid grid-cols-3 gap-3 rounded-[24px] border border-[#171412]/10 bg-white p-4 shadow-[0_30px_60px_-36px_#0006]">
            {cards.map((card) => (
              <a key={card.title} href="#navbar" className="overflow-hidden rounded-2xl">
                <Plate still={card.src} alt={card.title} className="h-40" />
                <b className="mt-2 block text-sm">{card.title}</b>
                <span className="text-[12px] text-[#6b645c]">{card.meta}</span>
              </a>
            ))}
          </div>
        </AnimatePanel>
      </div>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Folio work" className="border border-[#171412]/10 bg-white">
        {cards.map((card) => (
          <a key={card.title} href="#navbar" className="mb-3 block overflow-hidden rounded-2xl">
            <Plate still={card.src} alt={card.title} className="h-36" />
            <b className="mt-2 block">{card.title}</b>
            <span className="text-[12px] text-[#6b645c]">{card.meta}</span>
          </a>
        ))}
      </Tray>
      {props.scene === false ? null : (
        <div className="px-6 py-10 md:px-10">
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.94] font-extrabold tracking-[-0.05em]">Work that lands in a fan.</h1>
        </div>
      )}
    </Shell>
  )
}

function AnimatePanel({ open, reduced, children }: { open: boolean; reduced: boolean; children: React.ReactNode }) {
  if (!open) return null
  return (
    <motion.div initial={reduced ? false : { y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={springs.heavy}>
      {children}
    </motion.div>
  )
}

function CommandNav(props: NavbarProps) {
  const reduced = usePrefersReducedMotion()
  const rows = [
    { k: 'src/', v: 'checkout-edge.ts', a: 'open' },
    { k: 'ops/', v: 'canary 12% on checkout-edge', a: 'status' },
    { k: 'doc/', v: 'Auth sessions', a: 'jump' },
  ]
  const [q, setQ] = useState(props.query ?? 'checkout-edge canary')
  const [hi, setHi] = useState(0)
  const [held, setHeld] = useState(false)
  const shown = rows.filter((row) => row.v.toLowerCase().includes(q.toLowerCase()) || row.k.includes(q.toLowerCase()))
  const list = shown.length ? shown : rows
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setHeld(true)
        setHi((n) => Math.min(list.length - 1, n + 1))
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setHeld(true)
        setHi((n) => Math.max(0, n - 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [list.length])
  useEffect(() => {
    if (reduced || held) return
    const id = window.setInterval(() => setHi((n) => (n + 1) % list.length), 1800)
    return () => window.clearInterval(id)
  }, [held, list.length, reduced])
  return (
    <Shell variant="command" className={cn('flex min-h-[36rem] flex-col bg-[#0b0d10] text-[#e7edf3]', props.className)}>
      <nav aria-label="Command" className="flex items-center gap-3 border-b border-[#1e242c] px-4 py-3 md:px-6">
        <strong>{props.logo ?? 'Relay'}</strong>
        <label className="sr-only" htmlFor="relay-q">
          Ask Relay
        </label>
        <input
          id="relay-q"
          value={q}
          onChange={(event) => {
            setQ(event.target.value)
            props.onQuery?.(event.target.value)
          }}
          placeholder="Ask Relay…"
          className="h-11 flex-1 rounded-xl border border-[#2a3340] bg-[#141a22] px-3 font-mono text-[13px] text-[#e7edf3] outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]"
        />
        <span className="hidden rounded-md border border-[#2a3340] px-2 py-1 font-mono text-[11px] text-[#8b9aab] md:inline">⌘K</span>
      </nav>
      <div className="mx-auto mt-6 w-full max-w-xl px-4">
        <ul className="overflow-hidden rounded-2xl border border-[#2a3340] bg-[#141a22]" role="listbox" aria-label="Results">
          {list.map((row, i) => (
            <li key={row.v} role="option" aria-selected={i === hi} className={cn('grid grid-cols-[4.5rem_1fr_auto] gap-3 px-4 py-3 font-mono text-[13px]', i === hi && 'bg-[#1a2430]')}>
              <span className="text-[#4ade80]">{row.k}</span>
              <span>{row.v}</span>
              <span className="text-[#8b9aab]">{row.a}</span>
            </li>
          ))}
        </ul>
      </div>
      {props.scene === false ? null : (
        <h1 className="mt-auto px-6 pb-12 text-center text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.04em]">
          {reduced ? 'The field is the navigation.' : 'The field is the navigation.'}
        </h1>
      )}
    </Shell>
  )
}

function FollowNav(props: NavbarProps) {
  const items = props.items ?? [
    { id: 'work', label: 'Work', href: '#navbar', current: true },
    { id: 'studio', label: 'Studio', href: '#navbar' },
    { id: 'index', label: 'Index', href: '#navbar' },
  ]
  const menu = useMenu()
  const tray = useId()
  const reduced = usePrefersReducedMotion()
  const [spot, setSpot] = useState({ x: 42, y: 8 })
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (reduced || held) return
    const id = window.setInterval(() => {
      setSpot((cur) => ({ x: cur.x > 70 ? 18 : cur.x + 22, y: 8 }))
    }, 1600)
    return () => window.clearInterval(id)
  }, [held, reduced])
  return (
    <Shell
      variant="follow"
      className={cn('flex min-h-[36rem] flex-col bg-[#0b0b0b] text-[#f5f1e8]', props.className)}
      style={{ ['--mx' as never]: `${spot.x}%`, ['--my' as never]: `${spot.y}%` }}
    >
      {reduced ? null : (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48"
          style={{ background: 'radial-gradient(22rem 14rem at var(--mx) var(--my), rgba(249,115,22,.28), transparent 70%)' }}
          aria-hidden="true"
        />
      )}
      <nav
        aria-label="Primary"
        className="relative z-10 flex items-center justify-between px-4 py-5 md:px-10"
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== 'mouse') return
          setHeld(true)
          const box = event.currentTarget.getBoundingClientRect()
          setSpot({ x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 })
        }}
      >
        <strong className="tracking-[0.2em]">{props.logo ?? 'NORTH'}</strong>
        <div className="hidden gap-6 text-sm text-[#b5aea2] md:flex">
          {items.map((item) => (
            <ItemLink key={item.id} item={item} className={cn(item.current && 'text-white')} />
          ))}
        </div>
        {props.action ?? (
          <Magnetic href="#navbar" className="hidden h-10 items-center rounded-full bg-[#f97316] px-4 text-sm font-bold text-[#1a0b00] md:inline-flex">
            Start a brief
          </Magnetic>
        )}
        <OpenTrigger open={menu.open} onClick={() => menu.setOpen((v) => !v)} controls={tray} label="Index" className="h-10 rounded-full bg-[#f97316] px-3 text-sm font-bold text-[#1a0b00] md:hidden" />
      </nav>
      <Tray open={menu.open} id={tray} trapRef={menu.root} title="Northbound" className="border border-white/10 bg-[#14110e] text-[#f5f1e8]">
        {items.map((item) => (
          <ItemLink key={item.id} item={item} className="block py-3 text-lg" />
        ))}
      </Tray>
      {props.scene === false ? null : (
        <SampleHero
          kicker="Northbound · independent studio"
          title="Photography lives inside the letters."
          lede="A soft spotlight follows the pointer across the index. The bar is the studio, not a rack of chips."
          still={STILL.agency}
          alt="Northbound wall"
          invert
        />
      )}
    </Shell>
  )
}
