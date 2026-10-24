'use client'

import { useLevel } from '@/themes/kit/level.ts'
import type { ReactNode } from 'react'

export type IconName =
  | 'stethoscope'
  | 'kid'
  | 'women'
  | 'physio'
  | 'lab'
  | 'vaccine'
  | 'phone'
  | 'menu'
  | 'close'
  | 'clock'
  | 'pin'
  | 'star'
  | 'calendar'
  | 'search'
  | 'home'
  | 'queue'
  | 'users'
  | 'wallet'
  | 'chart'
  | 'settings'
  | 'more'
  | 'plus'
  | 'check'
  | 'bell'
  | 'arrow'
  | 'file'

const paths: Record<IconName, ReactNode> = {
  stethoscope: <path d="M6 3v6a5 5 0 0010 0V3M11 14v2a4 4 0 008 0v-3m0 0a2 2 0 100-4 2 2 0 000 4z" />,
  kid: <path d="M12 8a3 3 0 100-6 3 3 0 000 6zm-5 14v-6l-2-4 4-2h6l4 2-2 4v6M9 22v-5h6v5" />,
  women: <path d="M12 13a5 5 0 100-10 5 5 0 000 10zm0 0v8m-3-3h6" />,
  physio: <path d="M13 4a2 2 0 100 .01M7 21l3-6 3 2v4m-3-6l1-5 4 3 3-1M8 11l3-1" />,
  lab: <path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3M7.5 14h9" />,
  vaccine: <path d="M17 3l4 4m-2-2l-9 9m-3-3l6 6m-8-2l-2 2v3h3l2-2m6-11l3 3" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  clock: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-13v4l3 2" />,
  pin: <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  calendar: <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2zm0 4h16M8 3v4m8-4v4" />,
  search: <path d="M11 18a7 7 0 100-14 7 7 0 000 14zm5-2l4 4" />,
  home: <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6h-4v6H5a1 1 0 01-1-1z" />,
  queue: <path d="M4 6h16M4 12h10M4 18h7m9-4v6m-3-3h6" />,
  users: <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm-7 10a7 7 0 0114 0m1-10a3 3 0 100-6m5 16a6 6 0 00-4-5.6" />,
  wallet: <path d="M4 7a2 2 0 012-2h11v4M4 7v11a2 2 0 002 2h14V9H6a2 2 0 01-2-2zm12 7h.01" />,
  chart: <path d="M4 20V4m0 16h16M8 16v-5m4 5V8m4 8v-3" />,
  settings: <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm7.4-3a7.4 7.4 0 00-.1-1.3l2-1.6-2-3.4-2.4 1a7.6 7.6 0 00-2.2-1.3L14.3 3h-4l-.4 2.5a7.6 7.6 0 00-2.2 1.3l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 000 2.6l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 002.2 1.3l.4 2.4h4l.4-2.5a7.6 7.6 0 002.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.9.1-1.3z" />,
  more: <path d="M6 12h.01M12 12h.01M18 12h.01" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  bell: <path d="M6 16V11a6 6 0 0112 0v5l2 2H4zm4 4h4" />,
  arrow: <path d="M5 12h14m-5-5l5 5-5 5" />,
  file: <path d="M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm7 0v5h5" />,
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={name === 'more' ? 3 : strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

/** Tidewell mark: a droplet with a tide line through it. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg aria-hidden viewBox="0 0 32 32" className="h-8 w-8">
        <path d="M16 3c5 6.5 9 11.3 9 16a9 9 0 01-18 0c0-4.7 4-9.5 9-16z" fill="var(--nx-accent)" />
        <path d="M9 20c2.4-1.6 4.6-1.6 7 0s4.6 1.6 7 0" fill="none" stroke="var(--nx-accent-fg)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="22.5" cy="9" r="3" fill="var(--nx-mark)" />
      </svg>
      <span className="nx-display text-[22px] leading-none tracking-tight">Tidewell</span>
    </span>
  )
}

/**
 * Soft shapes that live behind opaque plates. Rich drifts them slowly, subtle and off
 * hold them still. They never sit under body text without a plate.
 */
export function Blobs({ variant = 'hero' }: { variant?: 'hero' | 'band' | 'quiet' }) {
  const level = useLevel()
  const drift = level === 'rich'
  const shapes =
    variant === 'hero'
      ? [
          { className: 'top-[-8%] right-[-6%] h-[62%] w-[52%]', color: 'var(--nx-accent)', opacity: 0.22, anim: 'nx-float-a 14s ease-in-out infinite' },
          { className: 'bottom-[6%] left-[38%] h-[34%] w-[26%]', color: 'var(--nx-mark)', opacity: 0.2, anim: 'nx-float-b 11s ease-in-out infinite' },
          { className: 'top-[30%] left-[-10%] h-[40%] w-[30%]', color: 'var(--nx-accent)', opacity: 0.1, anim: 'nx-float-b 16s ease-in-out infinite' },
        ]
      : variant === 'band'
        ? [
            { className: 'top-[-30%] left-[10%] h-[90%] w-[40%]', color: 'var(--nx-accent)', opacity: 0.16, anim: 'nx-float-a 15s ease-in-out infinite' },
            { className: 'bottom-[-40%] right-[5%] h-[80%] w-[30%]', color: 'var(--nx-mark)', opacity: 0.14, anim: 'nx-float-b 12s ease-in-out infinite' },
          ]
        : [{ className: 'top-[-20%] right-[-10%] h-[70%] w-[50%]', color: 'var(--nx-accent)', opacity: 0.12, anim: 'nx-float-a 18s ease-in-out infinite' }]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <span
          key={index}
          className={`nx-motion absolute ${shape.className}`}
          style={{ background: `radial-gradient(closest-side, ${shape.color}, transparent)`, opacity: shape.opacity, borderRadius: '44% 56% 61% 39% / 47% 41% 59% 53%', animation: drift ? shape.anim : undefined }}
        />
      ))}
    </div>
  )
}

/** Fine caustic lines, like light on a pool floor. Static SVG, no animation cost. */
export function Caustics({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} preserveAspectRatio="none" viewBox="0 0 400 300">
      <g fill="none" stroke="var(--nx-accent)" strokeWidth="0.6" opacity="0.18">
        <path d="M0 40 C60 10 90 80 150 50 S260 20 300 60 360 90 400 50" />
        <path d="M0 110 C50 80 110 150 170 120 S270 80 320 130 370 150 400 120" />
        <path d="M0 190 C70 160 100 230 160 200 S250 160 310 200 380 230 400 190" />
        <path d="M0 260 C40 240 120 300 180 270 S280 240 330 280 390 290 400 270" />
      </g>
    </svg>
  )
}

/** Stylised street map for the visit band. Not to scale. */
export function MapArt() {
  return (
    <svg role="img" aria-label="Map: Tidewell is on 12th Main Road, a four minute walk from Indiranagar metro station." viewBox="0 0 480 320" className="h-full w-full">
      <rect width="480" height="320" fill="var(--nx-surface)" />
      <g stroke="var(--nx-line)" strokeWidth="14" fill="none" strokeLinecap="round">
        <path d="M-10 90 L490 70" />
        <path d="M120 -10 L150 330" />
        <path d="M330 -10 L300 330" />
        <path d="M-10 230 L490 250" />
      </g>
      <g stroke="var(--nx-line)" strokeWidth="5" fill="none" opacity="0.7">
        <path d="M-10 160 L490 160" />
        <path d="M230 -10 L225 330" />
        <path d="M400 -10 L410 330" />
      </g>
      <path d="M-10 40 C120 30 260 34 490 22" stroke="var(--nx-mark)" strokeWidth="4" strokeDasharray="10 8" fill="none" opacity="0.8" />
      <g fill="var(--nx-accent)" opacity="0.18">
        <rect x="20" y="180" width="80" height="36" rx="10" />
        <rect x="350" y="100" width="100" height="44" rx="12" />
      </g>
      <circle cx="140" cy="40" r="10" fill="var(--nx-surface)" stroke="var(--nx-mark)" strokeWidth="3" />
      <text x="158" y="28" fontSize="13" fill="var(--nx-muted)" fontFamily="var(--nx-font-body)">Metro</text>
      <path d="M140 52 C160 110 210 130 262 150" stroke="var(--nx-fg)" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" fill="none" opacity="0.6" />
      <g transform="translate(262 150)">
        <circle r="26" fill="var(--nx-accent)" opacity="0.22" />
        <circle r="11" fill="var(--nx-accent)" />
        <circle r="4" fill="var(--nx-accent-fg)" />
      </g>
      <text x="292" y="186" fontSize="15" fill="var(--nx-fg)" fontFamily="var(--nx-font-display)">Tidewell</text>
      <text x="22" y="304" fontSize="11" fill="var(--nx-muted)" fontFamily="var(--nx-font-mono)">12TH MAIN · 100 FT RD · CMH RD</text>
    </svg>
  )
}

export function Sparkline({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${28 - ((value - min) / span) * 24}`).join(' ')
  return (
    <svg role="img" aria-label={label} viewBox="0 0 100 32" preserveAspectRatio="none" className="h-8 w-full">
      <polyline points={`0,32 ${points} 100,32`} fill="var(--nx-accent)" opacity="0.14" stroke="none" />
      <polyline points={points} fill="none" stroke="var(--nx-accent)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

/** Day-chip illustration for the services bento's lead card. */
export function SlotArt() {
  return (
    <svg aria-hidden viewBox="0 0 320 160" className="h-full w-full">
      {[0, 1, 2, 3, 4].map((col) =>
        [0, 1, 2].map((row) => {
          const on = (col === 1 && row === 1) || (col === 3 && row === 0)
          return <rect key={`${col}-${row}`} x={10 + col * 62} y={14 + row * 46} width="52" height="34" rx={on ? 10 : 17} fill={on ? 'var(--nx-accent)' : 'var(--nx-bg)'} stroke="var(--nx-line)" />
        }),
      )}
      <circle cx="98" cy="56" r="5" fill="var(--nx-mark)" />
    </svg>
  )
}
