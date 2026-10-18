'use client'

import { isWowVariant } from '@/lib/wow-variants.ts'
import { WowSignature } from './wow-lazy.tsx'

import { type ReactNode } from 'react'
import { LoopPause } from '@/lib/media.tsx'
import { cn, useKeyframes, useLoopControl } from '@/lib/utils.ts'

const AURORA_CSS = `
@keyframes nexara-aurora-a {
  0% { transform: translate3d(-6%, 4%, 0) scale(1); }
  100% { transform: translate3d(8%, -8%, 0) scale(1.08); }
}
@keyframes nexara-aurora-b {
  0% { transform: translate3d(8%, -4%, 0); }
  100% { transform: translate3d(-10%, 6%, 0); }
}
@keyframes nexara-orbit {
  to { transform: rotate(1turn); }
}
@keyframes nexara-twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
@keyframes nexara-meteor {
  0% { transform: translate3d(20%, -10%, 0); opacity: 0; }
  12% { opacity: 1; }
  100% { transform: translate3d(-40%, 80%, 0); opacity: 0; }
}
@keyframes nexara-pulse-soft {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.8; }
}
`

const VARIANTS = [
  'aurora',
  'mesh',
  'grain',
  'dusk',
  'spotlight',
  'prism',
  'plasma',
  'fog',
  'orbit',
  'ember',
  'tide',
  'stars',
  'shader-mesh',
  'particle-field',
  'liquid-glass',
  'globe-field',
] as const

export type AuroraVariant = (typeof VARIANTS)[number]

const DEFAULT_COLORS = ['#4c46e0', '#8b87ff', '#22c5b0', '#f3c27a']

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
 * Twelve atmospheric fields. Copy this file plus `src/lib/utils.ts`.
 */
function AuroraBackgroundCore({
  children,
  className,
  contentClassName,
  variant = 'aurora',
  colors = DEFAULT_COLORS,
  duration = 16,
  intensity = 0.7,
  pause = false,
  noise = true,
}: AuroraBackgroundProps) {
  const loop = useLoopControl(!pause)
  useKeyframes('nexara-aurora-2026', AURORA_CSS)
  const [a, b, c, d] = [colors[0] ?? '#4c46e0', colors[1] ?? '#8b87ff', colors[2] ?? '#22c5b0', colors[3] ?? '#f3c27a']
  const moving = loop.playing && !pause

  return (
    <div data-nexara="aurora-background" data-variant={variant} className={cn('relative isolate overflow-hidden bg-[#07070a] text-[#f3f3ee]', className)}>
      <Scene variant={variant} a={a} b={b} c={c} d={d} intensity={intensity} moving={moving} duration={duration} />
      {noise ? <span aria-hidden="true" className="nx-noise pointer-events-none absolute inset-0" /> : null}
      <LoopPause playing={moving} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20 border-white/20 bg-white/10 text-white" />
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </div>
  )
}

function Scene({
  variant,
  a,
  b,
  c,
  d,
  intensity,
  moving,
  duration,
}: {
  variant: AuroraVariant
  a: string
  b: string
  c: string
  d: string
  intensity: number
  moving: boolean
  duration: number
}) {
  const anim = (name: string, extra = '') => (moving ? `${name} ${duration}s ease-in-out infinite alternate ${extra}` : undefined)

  if (variant === 'mesh') {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(40% 50% at 15% 20%, ${a}, transparent), radial-gradient(35% 45% at 85% 15%, ${b}, transparent), radial-gradient(45% 40% at 70% 85%, ${c}, transparent), radial-gradient(30% 30% at 20% 80%, ${d}, transparent)`,
          opacity: intensity,
        }}
      />
    )
  }
  if (variant === 'grain') {
    return <div aria-hidden="true" className="nx-noise absolute inset-0 bg-[#111113] opacity-80" />
  }
  if (variant === 'dusk') {
    return <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,#1a1430_0%,#4a2a3a_42%,#e39b6a_78%,#f6d9b0_100%)]" />
  }
  if (variant === 'spotlight') {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#08080c]"
        style={{
          backgroundImage: `radial-gradient(50% 40% at 50% -10%, ${b}, transparent 70%), radial-gradient(20% 30% at 50% 100%, ${a}55, transparent)`,
        }}
      />
    )
  }
  if (variant === 'prism') {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 210deg at 50% 40%, ${a}, ${b}, ${c}, ${d}, ${a})`,
          filter: 'blur(28px)',
          opacity: intensity,
          animation: anim('nexara-orbit', ''),
          animationDuration: moving ? `${duration * 3}s` : undefined,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: 'normal',
        }}
      />
    )
  }
  if (variant === 'plasma') {
    return (
      <>
        <span className="absolute -top-1/3 left-1/4 size-[28rem] rounded-full blur-3xl" style={{ background: a, opacity: intensity, animation: anim('nexara-aurora-a') }} />
        <span className="absolute top-1/4 -right-10 size-[22rem] rounded-full blur-3xl" style={{ background: c, opacity: intensity * 0.8, animation: anim('nexara-aurora-b') }} />
      </>
    )
  }
  if (variant === 'fog') {
    return <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#d9d6e8_0%,transparent_42%),radial-gradient(circle_at_70%_60%,#c9d4e6_0%,transparent_40%),#8f93a3]" />
  }
  if (variant === 'orbit') {
    return (
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
        <span className="size-40 rounded-full border border-white/10" />
        <span className="absolute size-64 rounded-full border border-white/10" />
        <span
          className="absolute size-64 rounded-full"
          style={{ animation: moving ? `nexara-orbit ${duration}s linear infinite` : undefined }}
        >
          <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 rounded-full" style={{ background: c }} />
        </span>
      </div>
    )
  }
  if (variant === 'ember') {
    return <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_110%,#ff7a3d,transparent_55%),linear-gradient(180deg,#140c0a,#070708)]" />
  }
  if (variant === 'tide') {
    return <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,#07151c_0%,#0b3a44_40%,#1f7a78_70%,#d9efe8_100%)]" />
  }
  if (variant === 'stars') {
    return (
      <div aria-hidden="true" className="absolute inset-0 bg-[#07070c]">
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: i % 5 === 0 ? 2.5 : 1,
              height: i % 5 === 0 ? 2.5 : 1,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: moving ? `nexara-twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.1}s infinite` : undefined,
            }}
          />
        ))}
        <span
          className="absolute h-px w-24 bg-linear-to-r from-white to-transparent"
          style={{ top: '18%', right: '10%', animation: moving ? 'nexara-meteor 4.5s linear infinite' : undefined }}
        />
      </div>
    )
  }
  return (
    <>
      <span className="absolute -top-1/4 -left-10 h-[70%] w-[55%] rounded-full blur-3xl" style={{ background: a, opacity: intensity, animation: anim('nexara-aurora-a') }} />
      <span className="absolute top-0 right-0 h-[60%] w-[50%] rounded-full blur-3xl" style={{ background: b, opacity: intensity * 0.85, animation: anim('nexara-aurora-b') }} />
      <span className="absolute bottom-0 left-1/3 h-[50%] w-[40%] rounded-full blur-3xl" style={{ background: c, opacity: intensity * 0.7, animation: anim('nexara-aurora-a', 'reverse') }} />
    </>
  )
}

export function AuroraBackground(props: AuroraBackgroundProps) {
  if (isWowVariant('aurora-background', props.variant)) {
    return (
      <WowSignature
        family="aurora-background"
        variant={props.variant!}
        className={props.className}
        
      >
      {props.children}
    </WowSignature>
    )
  }
  return <AuroraBackgroundCore {...props} />
}
