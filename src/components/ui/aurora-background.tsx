'use client'

import { type CSSProperties, type ReactNode } from 'react'
import { cn, useKeyframes, usePrefersReducedMotion } from '@/lib/utils.ts'

const AURORA_CSS = `
@keyframes nexara-aurora-a {
  0% { transform: translate3d(-8%, 0, 0); }
  100% { transform: translate3d(8%, -6%, 0); }
}
@keyframes nexara-twinkle {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}
@keyframes nexara-meteor {
  0% { transform: translate3d(30%, -20%, 0); opacity: 0; }
  15% { opacity: 1; }
  100% { transform: translate3d(-50%, 90%, 0); opacity: 0; }
}
@keyframes nexara-rise {
  0% { transform: translateY(20%); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-140%); opacity: 0; }
}
@keyframes nexara-rain {
  from { background-position: 0 0; }
  to { background-position: 0 180px; }
}
`

const VARIANTS = [
  'aurora',
  'starfield',
  'meteors',
  'mesh',
  'radar',
  'sunset',
  'clouds',
  'rain',
  'constellation',
  'mountains',
  'city',
  'lightning',
] as const

export type AuroraVariant = (typeof VARIANTS)[number]

const DEFAULT_COLORS = ['#ff6a3d', '#8b7cff', '#3ddec4', '#f5c16c']

export interface AuroraBackgroundProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  variant?: AuroraVariant
  colors?: string[]
  duration?: number
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  intensity?: number
  pause?: boolean
  noise?: boolean
}

/**
 * AuroraBackground
 * Twelve scenes: curtains, starfield, meteors, mesh, radar, sunset,
 * clouds, rain, constellation, mountains, city lights, lightning.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function AuroraBackground({
  children,
  className,
  contentClassName,
  variant = 'aurora',
  colors = DEFAULT_COLORS,
  duration = 18,
  intensity = 0.75,
  pause = false,
  noise = true,
}: AuroraBackgroundProps) {
  const reduced = usePrefersReducedMotion()
  useKeyframes('nexara-aurora-keyframes', AURORA_CSS)
  const still = reduced || pause

  return (
    <div data-nexara="aurora-background" data-variant={variant} className={cn('relative isolate overflow-hidden bg-[#07070d]', className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Scene variant={variant} colors={colors} duration={duration} intensity={intensity} still={still} />
        {noise ? <span className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={noiseStyle} /> : null}
      </div>
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}

const noiseStyle: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>\")",
}

function Scene({
  variant,
  colors,
  duration,
  intensity,
  still,
}: {
  variant: AuroraVariant
  colors: string[]
  duration: number
  intensity: number
  still: boolean
}) {
  const [a = '#3ddec4', b = '#8b7cff', c = '#ff6a3d', d = '#f5c16c'] = colors
  if (variant === 'starfield') {
    return (
      <>
        {Array.from({ length: 40 }, (_, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
              width: index % 5 === 0 ? 2.5 : 1,
              height: index % 5 === 0 ? 2.5 : 1,
              opacity: intensity,
              animation: still ? undefined : `nexara-twinkle ${2 + (index % 4)}s ease-in-out ${(index % 6) * 0.2}s infinite`,
            }}
          />
        ))}
      </>
    )
  }
  if (variant === 'meteors') {
    return (
      <>
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} className="absolute h-0.5 w-28 rounded-full" style={{ top: `${10 + index * 14}%`, left: `${20 + index * 10}%`, background: `linear-gradient(90deg, transparent, ${index % 2 ? d : c})`, animation: still ? undefined : `nexara-meteor ${3 + index * 0.4}s linear ${index * 0.5}s infinite` }} />
        ))}
      </>
    )
  }
  if (variant === 'mesh') {
    return (
      <span
        className="absolute inset-[-10%]"
        style={{
          background: `radial-gradient(40% 40% at 20% 30%, ${c}, transparent 70%), radial-gradient(35% 45% at 80% 20%, ${b}, transparent 70%), radial-gradient(40% 40% at 60% 80%, ${a}, transparent 70%)`,
          opacity: intensity,
          filter: 'blur(8px)',
        }}
      />
    )
  }
  if (variant === 'radar') {
    return (
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative size-56 rounded-full border border-[#3ddec4]/50">
          <span className="absolute inset-6 rounded-full border border-[#3ddec4]/40" />
          <span className="absolute inset-12 rounded-full border border-[#3ddec4]/30" />
          <span className="absolute top-1/2 left-1/2 h-px w-1/2 origin-left bg-[#3ddec4]" />
        </span>
      </span>
    )
  }
  if (variant === 'sunset') {
    return (
      <>
        <span className="absolute inset-0" style={{ background: `linear-gradient(180deg, #120818 0%, #3b1630 42%, ${c} 78%, ${d} 100%)`, opacity: intensity }} />
        <span className="absolute bottom-[28%] left-1/2 size-24 -translate-x-1/2 rounded-full" style={{ background: d, boxShadow: `0 0 40px ${d}` }} />
      </>
    )
  }
  if (variant === 'clouds') {
    return (
      <span className="absolute inset-x-0 bottom-0 h-1/2">
        {[0, 1, 2].map((index) => (
          <span key={index} className="absolute h-16 rounded-[999px] bg-[#d9d6e6]" style={{ left: `${index * 28}%`, bottom: `${index * 12}px`, width: `${42 + index * 8}%`, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} />
        ))}
      </span>
    )
  }
  if (variant === 'rain') {
    return (
      <span
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(180deg, transparent 0 10px, ${a}55 10px 11px)`,
          opacity: intensity,
          animation: still ? undefined : 'nexara-rain 1.2s linear infinite',
        }}
      />
    )
  }
  if (variant === 'constellation') {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 120" aria-hidden="true">
        <path d="M20 80 L50 40 L90 60 L130 24 L170 70 L150 96" stroke={d} strokeWidth="0.6" fill="none" opacity={intensity} />
        {[[20, 80], [50, 40], [90, 60], [130, 24], [170, 70], [150, 96]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#fff" />
        ))}
      </svg>
    )
  }
  if (variant === 'mountains') {
    return (
      <svg className="absolute inset-x-0 bottom-0 h-2/3 w-full" viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80 L0 50 L30 28 L55 46 L90 12 L130 40 L160 18 L200 48 L200 80 Z" fill="#1c3a34" />
        <path d="M0 80 L20 58 L60 70 L100 36 L150 64 L200 42 L200 80 Z" fill="#0e2420" />
      </svg>
    )
  }
  if (variant === 'city') {
    return (
      <span className="absolute inset-x-0 bottom-0 flex h-2/3 items-end gap-1 px-2">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} className="flex-1 bg-[#10131c]" style={{ height: `${30 + ((index * 37) % 70)}%`, boxShadow: `inset 0 0 0 1px ${index % 3 ? d : a}33, inset 4px 8px 0 ${index % 2 ? '#f5c16c22' : '#3ddec422'}` }} />
        ))}
      </span>
    )
  }
  if (variant === 'lightning') {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 120" aria-hidden="true">
        <path d="M118 4 L78 58 H104 L70 116 L150 48 H118 L146 4 Z" fill={d} />
        <path d="M104 58 L86 90" stroke="#fff" strokeWidth="2" />
      </svg>
    )
  }
  return (
    <>
      {[a, b, c].map((color, index) => (
        <span
          key={color}
          className="absolute inset-y-[-10%] w-1/3 rounded-[40%]"
          style={{
            left: `${index * 28}%`,
            background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
            filter: 'blur(18px)',
            opacity: intensity,
            animation: still ? undefined : `nexara-aurora-a ${duration + index * 4}s ease-in-out ${index * -2}s infinite alternate`,
          }}
        />
      ))}
    </>
  )
}
