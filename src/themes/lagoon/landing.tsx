'use client'

import { Fab } from '@/themes/kit/controls.tsx'
import { TextField } from '@/themes/kit/fields.tsx'
import { useLevel } from '@/themes/kit/level.ts'
import { Drawer, Modal, ToastStack } from '@/themes/kit/overlays.tsx'
import { Blobs, Caustics, Icon, Logo, MapArt, SlotArt, type IconName } from '@/themes/lagoon/art.tsx'
import { asset, clinic, doctors, faqs, plans, quotes, services, slots, steps } from '@/themes/lagoon/data.ts'
import { jumpTo, screenHref } from '@/themes/lagoon/nav.ts'
import { BookButton, Chip, Eyebrow, QuietButton, Reveal } from '@/themes/lagoon/parts.tsx'
import { useTheme } from '@/themes/provider.tsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react'

const wrap = 'mx-auto w-full max-w-[1240px] px-5 md:px-8'

const sections = [
  { id: 'services', label: 'Services' },
  { id: 'doctors', label: 'Doctors' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'visit', label: 'Visit us' },
]

function Jump({ id, children, className, onDone }: { id: string; children: ReactNode; className?: string; onDone?: () => void }) {
  const level = useLevel()
  const { scheme } = useTheme()
  return (
    <a
      href={screenHref('landing', scheme)}
      className={className}
      onClick={(event: MouseEvent) => {
        event.preventDefault()
        onDone?.()
        window.setTimeout(() => jumpTo(id, level !== 'off'), onDone ? 60 : 0)
      }}
    >
      {children}
    </a>
  )
}

function PhoneLink({ className = 'inline-flex' }: { className?: string }) {
  return (
    <a href={`tel:${clinic.tel}`} className={`nx-mono min-h-11 items-center gap-2 text-sm no-underline ${className}`} style={{ color: 'var(--nx-fg)' }}>
      <Icon name="phone" className="h-4 w-4" />
      {clinic.phone}
    </a>
  )
}

function SiteNav() {
  const { scheme } = useTheme()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  return (
    <header className="sticky top-0 z-30" style={{ background: 'var(--nx-bg)', borderBottom: '1px solid color-mix(in srgb, var(--nx-line) 60%, transparent)' }}>
      <div className={`${wrap} flex h-[68px] items-center justify-between gap-4`}>
        <a href={screenHref('landing', scheme)} className="no-underline" style={{ color: 'var(--nx-fg)' }} aria-label="Tidewell, home">
          <Logo />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {sections.map((section) => (
            <Jump key={section.id} id={section.id} className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] no-underline hover:underline" >
              <span style={{ color: 'var(--nx-fg)' }}>{section.label}</span>
            </Jump>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <PhoneLink className="hidden md:inline-flex" />
          <a href={`tel:${clinic.tel}`} aria-label="Call Tidewell" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full md:hidden" style={{ border: '1px solid var(--nx-line)', color: 'var(--nx-fg)' }}>
            <Icon name="phone" />
          </a>
          <BookButton href={screenHref('book', scheme)} size="sm" className="hidden sm:inline-flex">
            Book a visit
          </BookButton>
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full lg:hidden" style={{ border: '1px solid var(--nx-line)' }}>
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <Drawer title="Menu" open={open} onClose={close}>
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <Jump id={section.id} onDone={close} className="nx-display flex min-h-12 items-center justify-between text-2xl no-underline">
                  <span style={{ color: 'var(--nx-fg)' }}>{section.label}</span>
                  <Icon name="arrow" className="h-5 w-5" />
                </Jump>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <BookButton href={screenHref('book', scheme)}>Book a visit</BookButton>
            <PhoneLink className="inline-flex justify-center" />
          </div>
        </nav>
      </Drawer>
    </header>
  )
}

function dayChips() {
  const base = new Date()
  return [0, 1, 2, 3].map((offset) => {
    const date = new Date(base)
    date.setDate(base.getDate() + offset)
    const label = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })
    return { offset, label, full: date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) }
  })
}

function NextSlot({ onBook }: { onBook: (summary: string) => void }) {
  const [doctor, setDoctor] = useState(doctors[0].id)
  const [day, setDay] = useState(0)
  const [time, setTime] = useState('4:20 pm')
  const days = dayChips()
  const chosen = doctors.find((item) => item.id === doctor) ?? doctors[0]
  const taken = (slot: string) => (day === 0 && ['8:30 am', '9:10 am', '10:40 am', '11:20 am'].includes(slot)) || (doctor === 'sana' && slot.endsWith('pm') && day === 0)
  const visible = slots.filter((slot) => !taken(slot)).slice(0, 6)
  const pick = visible.includes(time) ? time : visible[0]
  const titleId = useId()
  return (
    <section aria-labelledby={titleId} className="relative w-full p-5 sm:p-6" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)', boxShadow: '0 40px 80px -40px rgb(0 0 0 / 0.55)' }}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={titleId} className="nx-display text-[22px] leading-tight">Next open slot</h2>
        <span className="nx-mono inline-flex items-center gap-1.5 text-xs" style={{ color: 'var(--nx-muted)' }}>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--nx-success)' }} />
          Live
        </span>
      </div>
      <fieldset className="mt-4">
        <legend className="mb-2 text-sm" style={{ color: 'var(--nx-muted)' }}>Doctor</legend>
        <div className="grid grid-cols-4 gap-2">
          {doctors.map((item) => {
            const on = item.id === doctor
            return (
              <button key={item.id} type="button" aria-pressed={on} onClick={() => setDoctor(item.id)} className="flex min-h-11 flex-col items-center gap-1.5 p-1.5 text-center" style={{ borderRadius: 16, border: `1px solid ${on ? 'var(--nx-accent)' : 'transparent'}`, background: on ? 'color-mix(in srgb, var(--nx-accent) 12%, transparent)' : 'transparent' }}>
                <img src={asset(item.photo)} alt="" width={48} height={48} className="h-12 w-12 object-cover" style={{ borderRadius: on ? 14 : 999, transition: 'border-radius 320ms var(--nx-ease)' }} />
                <span className="text-[12px] leading-tight">{item.name.replace('Dr. ', '').split(' ')[0]}</span>
                <span className="sr-only">{item.name}, {item.role}</span>
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-sm" style={{ color: 'var(--nx-muted)' }}>
          {chosen.role} · {chosen.languages}
        </p>
      </fieldset>
      <fieldset className="mt-4">
        <legend className="mb-2 text-sm" style={{ color: 'var(--nx-muted)' }}>Day</legend>
        <div className="flex flex-wrap gap-2">
          {days.map((item) => (
            <Chip key={item.offset} selected={day === item.offset} onClick={() => setDay(item.offset)} label={item.full}>
              {item.label}
            </Chip>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-4">
        <legend className="mb-2 text-sm" style={{ color: 'var(--nx-muted)' }}>Time</legend>
        <div className="grid grid-cols-3 gap-2">
          {visible.map((slot) => (
            <Chip key={slot} selected={pick === slot} onClick={() => setTime(slot)}>
              {slot}
            </Chip>
          ))}
        </div>
      </fieldset>
      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm leading-snug">
          <span className="nx-mono text-base">₹{chosen.fee}</span>
          <span style={{ color: 'var(--nx-muted)' }}> · 20 min, GST incl.</span>
        </p>
        <BookButton onClick={() => onBook(`${chosen.name}, ${days[day].label.toLowerCase() === 'today' ? 'today' : days[day].full} at ${pick}`)}>Book</BookButton>
      </div>
    </section>
  )
}

function Hero({ onBook }: { onBook: (summary: string) => void }) {
  const level = useLevel()
  const { scheme } = useTheme()
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <Blobs />
      <Caustics />
      <div className={`${wrap} relative grid gap-10 pt-10 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24`}>
        <div className="lg:col-span-6 lg:pt-6">
          <Reveal>
            <Eyebrow>Family clinic · Indiranagar, Bengaluru</Eyebrow>
            <h1 id="hero-title" className="nx-display text-[clamp(44px,6.6vw,92px)] leading-[0.96] tracking-[-0.025em]">
              <em className="not-italic" style={{ fontStyle: 'italic' }}>Unhurried</em> care, booked in a minute.
            </h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>
              Four doctors, an in-house lab and twenty minute consults, a short walk from Indiranagar metro. Pick a time that suits you and check in from your phone.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookButton href={screenHref('book', scheme)} size="lg">
                Book a visit <Icon name="arrow" className="h-5 w-5" />
              </BookButton>
              <QuietButton href={`tel:${clinic.tel}`}>
                <Icon name="phone" className="h-4 w-4" /> Call {clinic.phone}
              </QuietButton>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: 'var(--nx-line)' }}>
              {[
                ['12 min', 'average wait this month'],
                ['4.9', 'from 2,140 Google reviews'],
                ['8 am–9 pm', 'open six and a half days'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="nx-mono text-[clamp(18px,2vw,24px)]">{value}</dd>
                  <dd className="mt-1 text-[13px] leading-snug" style={{ color: 'var(--nx-muted)' }}>{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <div className="relative lg:col-span-6">
          <div className="relative grid gap-4 sm:grid-cols-[1fr_minmax(0,22rem)] lg:block lg:min-h-[640px]">
            <div className="relative overflow-hidden lg:absolute lg:top-0 lg:right-0 lg:h-[520px] lg:w-[88%]" style={{ borderRadius: '28px 28px 120px 28px', aspectRatio: '4 / 3' }}>
              <img src={asset('lounge.jpg')} alt="Tidewell's waiting lounge at dusk: teal walls, low lamps and a magenta cushion on a long bench." className="h-full w-full object-cover" style={{ transform: level === 'rich' ? 'scale(1.03)' : 'none' }} />
              <span aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--nx-bg) 55%, transparent))' }} />
              <p className="nx-mono absolute right-8 bottom-6 hidden rounded-full px-3 py-1.5 text-xs whitespace-nowrap sm:block" style={{ background: 'var(--nx-bg)', color: 'var(--nx-fg)' }}>
                Lobby, 12th Main
              </p>
            </div>
            <div className="relative lg:absolute lg:bottom-0 lg:left-0 lg:w-[23rem]">
              <NextSlot onBook={onBook} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FactStrip() {
  const facts: [IconName, string][] = [
    ['clock', 'Same-day paediatric slots'],
    ['lab', 'Blood draws from 7:30 am'],
    ['file', 'Reports on your phone by 6 pm'],
    ['home', 'Home sample pickup, ₹150'],
  ]
  return (
    <div style={{ borderTop: '1px solid var(--nx-line)', borderBottom: '1px solid var(--nx-line)', background: 'var(--nx-surface)' }}>
      <ul className={`${wrap} grid grid-cols-2 gap-x-6 gap-y-3 py-5 md:grid-cols-4`}>
        {facts.map(([icon, text]) => (
          <li key={text} className="flex items-center gap-3 text-sm">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: 'color-mix(in srgb, var(--nx-accent) 16%, transparent)', color: 'var(--nx-fg)' }}>
              <Icon name={icon} className="h-[18px] w-[18px]" />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ServiceCard({ service, lead = false }: { service: (typeof services)[number]; lead?: boolean }) {
  const level = useLevel()
  const [hot, setHot] = useState(false)
  return (
    <article
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      className={`relative flex h-full flex-col overflow-hidden p-6 ${lead ? 'md:p-8' : ''}`}
      style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: hot && level !== 'off' ? 30 : 22, transition: level === 'off' ? 'none' : 'border-radius 420ms var(--nx-ease)' }}
    >
      <span aria-hidden className="pointer-events-none absolute -top-10 -right-10 h-36 w-36" style={{ background: 'radial-gradient(closest-side, var(--nx-accent), transparent)', opacity: 0.16, borderRadius: '50%', transform: hot && level === 'rich' ? 'translate(-18px, 14px) scale(1.2)' : 'none', transition: 'transform 600ms var(--nx-ease)' }} />
      <span className="relative inline-flex h-11 w-11 items-center justify-center" style={{ background: 'var(--nx-bg)', border: '1px solid var(--nx-line)', borderRadius: hot && level !== 'off' ? 12 : 999, transition: level === 'off' ? 'none' : 'border-radius 320ms var(--nx-ease)' }}>
        <Icon name={service.icon} />
      </span>
      <h3 className={`nx-display relative mt-5 ${lead ? 'text-[32px] md:text-[40px]' : 'text-[24px]'} leading-tight`}>{service.title}</h3>
      <p className="relative mt-2 max-w-[38ch] text-[15px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>{service.body}</p>
      {lead ? (
        <div className="relative mt-6 h-36 max-w-md md:h-40">
          <SlotArt />
        </div>
      ) : null}
      <p className="nx-mono relative mt-auto pt-6 text-[13px]" style={{ color: 'var(--nx-fg)' }}>{service.meta}</p>
    </article>
  )
}

function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className={`${wrap} py-20 md:py-28`}>
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <Eyebrow>What we look after</Eyebrow>
          <h2 id="services-title" className="nx-display text-[clamp(34px,4.4vw,58px)] leading-[1.02] tracking-[-0.02em]">One front door for the whole family.</h2>
        </Reveal>
        <Reveal className="md:col-span-5" delay={0.05}>
          <p className="text-[17px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>From a toddler’s first fever to a parent’s sugar review, the same team keeps the notes, so nobody has to tell their story twice.</p>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-6 lg:grid-cols-12">
        <Reveal className="md:col-span-6 lg:col-span-7 lg:row-span-2">
          <ServiceCard service={services[0]} lead />
        </Reveal>
        {services.slice(1).map((service, index) => (
          <Reveal key={service.id} delay={0.04 * (index + 1)} className={index < 2 ? 'md:col-span-3 lg:col-span-5' : 'md:col-span-2 lg:col-span-4'}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function VisitFlow() {
  const level = useLevel()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0.04, 1])
  const pathLength = level === 'rich' ? draw : 1
  return (
    <section ref={ref} aria-labelledby="flow-title" className="relative overflow-hidden py-20 md:py-28" style={{ background: 'var(--nx-surface)', borderTop: '1px solid var(--nx-line)', borderBottom: '1px solid var(--nx-line)' }}>
      <div className={wrap}>
        <Reveal>
          <Eyebrow>How a visit works</Eyebrow>
          <h2 id="flow-title" className="nx-display max-w-3xl text-[clamp(34px,4.4vw,58px)] leading-[1.02] tracking-[-0.02em]">No clipboard. No “come around five”.</h2>
        </Reveal>
        <div className="relative mt-14">
          <svg aria-hidden viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-0 left-0 hidden h-[120px] w-full md:block">
            <path d="M40 60 C 180 -10, 260 130, 340 60 S 520 -10, 620 60 S 820 130, 900 60 S 1080 -10, 1160 60" fill="none" stroke="var(--nx-line)" strokeWidth="2" />
            <motion.path d="M40 60 C 180 -10, 260 130, 340 60 S 520 -10, 620 60 S 820 130, 900 60 S 1080 -10, 1160 60" fill="none" stroke="var(--nx-accent)" strokeWidth="3" strokeLinecap="round" style={{ pathLength }} />
          </svg>
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="relative pl-14 md:pt-[120px] md:pl-0">
                <span className="nx-mono absolute top-0 left-0 inline-flex h-10 w-10 items-center justify-center text-sm md:top-10 md:left-[calc(50%-20px)]" style={{ background: index === 0 ? 'var(--nx-accent)' : 'var(--nx-bg)', color: index === 0 ? 'var(--nx-accent-fg)' : 'var(--nx-fg)', border: '1px solid var(--nx-accent)', borderRadius: 999 }}>
                  0{index + 1}
                </span>
                <Reveal delay={index * 0.06}>
                  <h3 className="nx-display text-[24px] leading-tight md:text-center">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed md:text-center" style={{ color: 'var(--nx-muted)' }}>{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function DoctorCard({ doctor }: { doctor: (typeof doctors)[number] }) {
  const level = useLevel()
  const { scheme } = useTheme()
  const [hot, setHot] = useState(false)
  const blob = '46% 54% 50% 50% / 56% 44% 56% 44%'
  return (
    <article onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)} onFocus={() => setHot(true)} onBlur={() => setHot(false)} className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: hot && level !== 'off' ? 22 : level === 'off' ? 22 : blob, transition: level === 'off' ? 'none' : `border-radius ${level === 'rich' ? 700 : 420}ms var(--nx-ease)` }}>
        <img src={asset(doctor.photo)} alt={`Portrait of ${doctor.name}`} loading="lazy" className="h-full w-full object-cover" />
        <p className="nx-mono absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-[12px]" style={{ background: 'var(--nx-bg)', color: 'var(--nx-fg)' }}>
          Next: {doctor.next}
        </p>
      </div>
      <h3 className="nx-display mt-5 text-[24px] leading-tight">{doctor.name}</h3>
      <p className="nx-mono mt-1 text-[13px]" style={{ color: 'var(--nx-muted)' }}>
        {doctor.role} · {doctor.years} yrs
      </p>
      <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>{doctor.focus}</p>
      <p className="mt-3 text-[13px]" style={{ color: 'var(--nx-muted)' }}>Speaks {doctor.languages}</p>
      <a href={screenHref('book', scheme, `d=${doctor.id}`)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-[15px] font-medium underline-offset-4 hover:underline" style={{ color: 'var(--nx-fg)' }}>
        Book with {doctor.name.replace('Dr. ', 'Dr ').split(' ').slice(0, 2).join(' ')} <Icon name="arrow" className="h-4 w-4" />
      </a>
    </article>
  )
}

function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-title" className={`${wrap} py-20 md:py-28`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <Eyebrow>Your doctors</Eyebrow>
          <h2 id="doctors-title" className="nx-display max-w-2xl text-[clamp(34px,4.4vw,58px)] leading-[1.02] tracking-[-0.02em]">The same faces, visit after visit.</h2>
        </Reveal>
        <p className="max-w-sm text-[15px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>All four are full-time at Tidewell. No rotating locums, no being passed along.</p>
      </div>
      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((doctor, index) => (
          <Reveal key={doctor.id} delay={index * 0.05}>
            <DoctorCard doctor={doctor} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Proof() {
  return (
    <section aria-labelledby="proof-title" className="relative overflow-hidden py-20 md:py-28" style={{ background: 'var(--nx-surface)', borderTop: '1px solid var(--nx-line)', borderBottom: '1px solid var(--nx-line)' }}>
      <div className={`${wrap} relative grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <Eyebrow>Since 2019</Eyebrow>
          <h2 id="proof-title" className="nx-display text-[clamp(34px,4.4vw,58px)] leading-[1.02] tracking-[-0.02em]">What unhurried looks like in numbers.</h2>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {[
              ['12 min', 'average wait from check-in, Sept 2026'],
              ['38,400', 'visits in the last twelve months'],
              ['4.9 / 5', '2,140 Google reviews'],
              ['94%', 'reports delivered the same day'],
            ].map(([value, label]) => (
              <div key={label} className="border-t pt-4" style={{ borderColor: 'var(--nx-line)' }}>
                <dt className="sr-only">{label}</dt>
                <dd className="nx-mono text-[clamp(28px,3.2vw,40px)] leading-none">{value}</dd>
                <dd className="mt-2 text-[14px] leading-snug" style={{ color: 'var(--nx-muted)' }}>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-5 lg:col-span-7 lg:pl-8">
          {quotes.map((quote, index) => (
            <Reveal key={quote.who} delay={index * 0.08}>
              <figure className="relative p-7 md:p-9" style={{ background: 'var(--nx-bg)', border: '1px solid var(--nx-line)', borderRadius: index === 0 ? '22px 22px 22px 64px' : '64px 22px 22px 22px' }}>
                <span aria-hidden className="nx-display absolute top-3 right-6 text-[88px] leading-none" style={{ color: 'var(--nx-mark)', opacity: 0.6 }}>
                  ”
                </span>
                <blockquote className="nx-display relative text-[clamp(20px,2.2vw,28px)] leading-snug">{quote.body}</blockquote>
                <figcaption className="mt-5 flex items-center gap-2 text-sm">
                  <span className="flex" aria-label="5 out of 5 stars" role="img">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <svg key={star} aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="var(--nx-accent)">
                        <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
                      </svg>
                    ))}
                  </span>
                  <span className="font-medium">{quote.who}</span>
                  <span style={{ color: 'var(--nx-muted)' }}>· {quote.where}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const { scheme } = useTheme()
  return (
    <section id="pricing" aria-labelledby="pricing-title" className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Eyebrow>Pricing</Eyebrow>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="pricing-title" className="nx-display max-w-2xl text-[clamp(34px,4.4vw,58px)] leading-[1.02] tracking-[-0.02em]">Prices on the wall, not after the visit.</h2>
          <p className="max-w-sm text-[15px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>All prices include GST. Pay by UPI or card at the desk, or online when you book.</p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const featured = 'featured' in plan && plan.featured
          return (
            <Reveal key={plan.id} delay={index * 0.05}>
              <article className="relative flex h-full flex-col p-7" style={{ background: featured ? 'var(--nx-accent)' : 'var(--nx-surface)', color: featured ? 'var(--nx-accent-fg)' : 'var(--nx-fg)', border: `1px solid ${featured ? 'var(--nx-accent)' : 'var(--nx-line)'}`, borderRadius: 'var(--nx-radius)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="nx-display text-[26px]">{plan.name}</h3>
                  {featured ? <span className="nx-mono rounded-full px-2.5 py-1 text-[11px] tracking-wider uppercase" style={{ background: 'var(--nx-accent-fg)', color: 'var(--nx-accent)' }}>Most booked</span> : null}
                </div>
                <p className="mt-2 text-[15px]" style={{ opacity: 0.85 }}>{plan.blurb}</p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="nx-mono text-[44px] leading-none tracking-tight">{plan.price}</span>
                  <span className="text-sm" style={{ opacity: 0.8 }}>{plan.unit}</span>
                </p>
                <ul className="mt-6 space-y-3 text-[15px]">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  {featured ? (
                    <a href={screenHref('book', scheme, 'r=check')} className="inline-flex min-h-12 w-full items-center justify-center rounded-full text-[15px] font-medium no-underline" style={{ background: 'var(--nx-accent-fg)', color: 'var(--nx-accent)' }}>
                      {plan.cta}
                    </a>
                  ) : (
                    <QuietButton href={screenHref('book', scheme)} className="w-full">
                      {plan.cta}
                    </QuietButton>
                  )}
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const level = useLevel()
  const id = useId()
  return (
    <li style={{ borderBottom: '1px solid var(--nx-line)' }}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left">
          <span className="nx-display text-[21px] leading-snug md:text-[24px]">{q}</span>
          <span aria-hidden className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center" style={{ border: '1px solid var(--nx-line)', background: open ? 'var(--nx-accent)' : 'transparent', color: open ? 'var(--nx-accent-fg)' : 'var(--nx-fg)', borderRadius: open ? 12 : 999, transition: level === 'off' ? 'none' : 'border-radius 320ms var(--nx-ease), background-color 160ms linear' }}>
            <span className="absolute h-[2px] w-4 rounded-full" style={{ background: 'currentColor' }} />
            <span className="absolute h-4 w-[2px] rounded-full" style={{ background: 'currentColor', transform: open ? 'scaleY(0)' : 'scaleY(1)', transition: level === 'off' ? 'none' : 'transform 280ms var(--nx-ease)' }} />
          </span>
        </button>
      </h3>
      <div id={id} role="region" aria-label={q} className="grid" style={{ gridTemplateRows: open ? '1fr' : '0fr', transition: level === 'off' ? 'none' : 'grid-template-rows 360ms var(--nx-ease)' }} hidden={!open && level === 'off'}>
        <div className="overflow-hidden">
          <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>{a}</p>
        </div>
      </div>
    </li>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section aria-labelledby="faq-title" className={`${wrap} grid gap-10 pb-20 md:pb-28 lg:grid-cols-12`}>
      <div className="lg:col-span-4">
        <Eyebrow>Questions</Eyebrow>
        <h2 id="faq-title" className="nx-display text-[clamp(34px,4vw,52px)] leading-[1.02] tracking-[-0.02em]">Before you come in.</h2>
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>
          Something else? Message the desk on WhatsApp at <span className="nx-mono">{clinic.whatsapp}</span>. We reply within the hour during clinic time.
        </p>
      </div>
      <ul className="lg:col-span-8" style={{ borderTop: '1px solid var(--nx-line)' }}>
        {faqs.map((faq, index) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} open={open === index} onToggle={() => setOpen(open === index ? -1 : index)} />
        ))}
      </ul>
    </section>
  )
}

function Visit() {
  const { scheme } = useTheme()
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative overflow-hidden py-20 md:py-28" style={{ background: 'var(--nx-bg)', borderTop: '1px solid var(--nx-line)' }}>
      <Blobs variant="band" />
      <div className={`${wrap} relative grid gap-8 lg:grid-cols-12`}>
        <div className="p-7 md:p-10 lg:col-span-5" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
          <Eyebrow>Visit us</Eyebrow>
          <h2 id="visit-title" className="nx-display text-[clamp(32px,3.6vw,48px)] leading-[1.04] tracking-[-0.02em]">Four minutes from the metro.</h2>
          <address className="mt-6 text-[16px] leading-relaxed not-italic">
            {clinic.address.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
            <span className="mt-2 block text-sm" style={{ color: 'var(--nx-muted)' }}>{clinic.landmark}</span>
          </address>
          <dl className="mt-6 space-y-2 text-[15px]">
            {clinic.hours.map((row) => (
              <div key={row.days} className="flex flex-wrap justify-between gap-x-6 border-t pt-2" style={{ borderColor: 'var(--nx-line)' }}>
                <dt>{row.days}</dt>
                <dd className="nx-mono text-[14px]" style={{ color: 'var(--nx-muted)' }}>{row.time}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookButton href={screenHref('book', scheme)}>Book a visit</BookButton>
            <QuietButton href={`tel:${clinic.tel}`}>
              <Icon name="phone" className="h-4 w-4" /> {clinic.phone}
            </QuietButton>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden lg:col-span-7" style={{ border: '1px solid var(--nx-line)', borderRadius: '22px 120px 22px 22px' }}>
          <MapArt />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { scheme } = useTheme()
  return (
    <footer style={{ background: 'var(--nx-surface)', borderTop: '1px solid var(--nx-line)' }}>
      <div className={`${wrap} grid gap-10 py-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>A family clinic in Indiranagar with an in-house lab, four full-time doctors and twenty minute consults.</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm" style={{ background: 'color-mix(in srgb, var(--nx-danger) 14%, transparent)' }}>
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: 'var(--nx-danger)' }} />
            In an emergency, call <a href="tel:112" className="nx-mono font-medium" style={{ color: 'var(--nx-fg)' }}>112</a>
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-[15px] md:col-span-7 md:grid-cols-3">
          <div>
            <p className="nx-mono mb-3 text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>Clinic</p>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <Jump id={section.id} className="inline-flex min-h-11 items-center no-underline hover:underline">
                    <span style={{ color: 'var(--nx-fg)' }}>{section.label}</span>
                  </Jump>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="nx-mono mb-3 text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>Patients</p>
            <ul className="space-y-1">
              <li><a className="inline-flex min-h-11 items-center" style={{ color: 'var(--nx-fg)' }} href={screenHref('book', scheme)}>Book a visit</a></li>
              <li><a className="inline-flex min-h-11 items-center" style={{ color: 'var(--nx-fg)' }} href={screenHref('book', scheme, 'r=check')}>Health check</a></li>
              <li><a className="inline-flex min-h-11 items-center" style={{ color: 'var(--nx-fg)' }} href={`tel:${clinic.tel}`}>Call the desk</a></li>
            </ul>
          </div>
          <div>
            <p className="nx-mono mb-3 text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>Staff</p>
            <ul className="space-y-1">
              <li><a className="inline-flex min-h-11 items-center" style={{ color: 'var(--nx-fg)' }} href={screenHref('desk', scheme)}>Tidewell Desk</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={`${wrap} flex flex-wrap justify-between gap-3 pb-10 text-[13px]`} style={{ color: 'var(--nx-muted)' }}>
        <p>© 2026 {clinic.legal}. Indiranagar, Bengaluru.</p>
        <p>Prices include GST. Consult times are typical, not guaranteed.</p>
      </div>
    </footer>
  )
}

export function LagoonLanding() {
  const { scheme } = useTheme()
  const [booking, setBooking] = useState<string | null>(null)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [pastHero, setPastHero] = useState(false)
  const closeBooking = useCallback(() => {
    setBooking(null)
    setError('')
  }, [])
  const dismiss = useCallback(() => setToast(null), [])

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const confirm = () => {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10) {
      setError('Enter a 10 digit mobile number so we can send your token.')
      return
    }
    setToast(`Held: ${booking}. Token sent to ••••${digits.slice(-4)}.`)
    setBooking(null)
    setPhone('')
    setError('')
  }

  return (
    <div className="min-h-svh">
      <SiteNav />
      <main id="main">
        <Hero onBook={setBooking} />
        <FactStrip />
        <Services />
        <VisitFlow />
        <Doctors />
        <Proof />
        <Pricing />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <Fab label="Book a visit" icon={<Icon name="calendar" />} visible={pastHero} className="md:hidden" onClick={() => (window.location.hash = screenHref('book', scheme).slice(1))} />
      <Modal title="Hold this slot" open={booking !== null} onClose={closeBooking}>
        <p className="text-[15px] leading-relaxed">{booking}</p>
        <p className="mt-1 text-sm" style={{ color: 'var(--nx-muted)' }}>We hold it for ten minutes and text you a token. Pay at the desk.</p>
        <div className="mt-4">
          <TextField label="Mobile number" value={phone} onChange={setPhone} error={error || undefined} hint="Indian mobile, 10 digits" />
        </div>
        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <QuietButton onClick={closeBooking}>Cancel</QuietButton>
          <BookButton onClick={confirm}>Hold slot</BookButton>
        </div>
      </Modal>
      <ToastStack message={toast} onDismiss={dismiss} />
    </div>
  )
}
