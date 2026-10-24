'use client'

import { cn } from '@/lib/utils.ts'
import { useLevel, usePersonality } from '@/themes/kit/level.ts'
import { useTheme } from '@/themes/provider.tsx'
import { useId, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'

export function FlapText({ text, play }: { text: string; play: boolean }) {
  const level = useLevel()
  return (
    <span className="inline-flex" aria-hidden>
      {text.split('').map((glyph, index) => (
        <span
          key={`${glyph}-${index}`}
          className="inline-block"
          style={{
            transform: level === 'off' || play ? 'rotateX(0deg)' : 'rotateX(-90deg)',
            transformOrigin: 'center bottom',
            transition: level === 'off' ? 'none' : `transform 90ms linear ${index * 16}ms`,
          }}
        >
          {glyph === ' ' ? '\u00a0' : glyph}
        </span>
      ))}
    </span>
  )
}

export function NxButton({
  children,
  tone = 'primary',
  busy = false,
  burst = false,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'primary' | 'quiet'
  busy?: boolean
  burst?: boolean
}) {
  const personality = usePersonality()
  const level = useLevel()
  const { theme } = useTheme()
  const [hot, setHot] = useState(false)
  const [pressed, setPressed] = useState(false)
  const label = typeof children === 'string' ? children : props['aria-label'] || 'Action'
  const rich = level === 'rich'
  const moving = level !== 'off'
  const ease = theme.motion.ease.hover
  const fill = tone === 'primary' ? 'var(--nx-accent)' : 'transparent'
  const ink = tone === 'primary' ? 'var(--nx-accent-fg)' : 'var(--nx-fg)'

  let shell = 'none'
  if (moving && personality === 'cinematic') shell = hot ? 'rotateX(8deg)' : 'rotateX(0deg)'
  if (moving && personality === 'tactile') {
    shell = pressed ? 'scaleX(1.12) scaleY(0.88)' : hot ? 'scaleX(1.04) scaleY(0.98)' : 'scale(1)'
  }
  const counter = personality === 'tactile' && moving && pressed ? 'scaleX(0.893) scaleY(1.136)' : personality === 'cinematic' && moving ? (hot ? 'rotateX(-8deg)' : 'rotateX(0deg)') : 'none'

  return (
    <button
      type="button"
      {...props}
      className={cn('relative inline-flex min-h-11 min-w-11 items-center justify-center px-4 text-[15px] font-medium', className)}
      style={{
        borderRadius: 'var(--nx-radius)',
        background: fill,
        color: ink,
        border: tone === 'quiet' ? '1px solid var(--nx-line)' : '1px solid transparent',
        transform: shell,
        transition: level === 'off' ? 'none' : personality === 'tactile' ? `transform 140ms ${ease}` : personality === 'cinematic' ? 'transform 160ms var(--nx-ease)' : 'none',
        perspective: personality === 'cinematic' ? '800px' : undefined,
      }}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => {
        setHot(false)
        setPressed(false)
      }}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      {personality === 'liquid' ? (
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ borderRadius: 'inherit' }}>
          <span
            className="absolute inset-0"
            style={{
              background: 'var(--nx-accent)',
              borderRadius: moving && hot ? '12px' : 'var(--nx-radius)',
              transform: moving && hot ? 'scale(1)' : 'scale(1.35)',
              transition: level === 'off' ? 'none' : 'transform 280ms var(--nx-ease), border-radius 280ms var(--nx-ease)',
            }}
          />
          {rich ? (
            <span
              className="absolute top-1 left-2 h-3 w-3"
              style={{
                background: 'var(--nx-mark)',
                borderRadius: 999,
                transform: hot ? 'translate(8px, -2px)' : 'translate(0, 0)',
                transition: 'transform 280ms var(--nx-ease)',
              }}
            />
          ) : null}
        </span>
      ) : null}
      {personality === 'technical' ? (
        <span aria-hidden className="pointer-events-none absolute right-2 bottom-1 left-2 h-px origin-left" style={{ background: 'var(--nx-line)', transform: moving && hot ? 'scaleX(1)' : 'scaleX(0)', transition: level === 'off' ? 'none' : 'transform 140ms linear' }} />
      ) : null}
      <span className="relative" style={{ transform: counter, transition: level === 'off' ? 'none' : 'transform 140ms linear' }} aria-label={personality === 'editorial' ? label : undefined}>
        {personality === 'editorial' ? <FlapText text={busy ? `${label} …` : label} play={!moving || hot || busy} /> : busy ? `${label}` : children}
      </span>
      {personality === 'tactile' && rich && burst ? <Confetti /> : null}
      {busy ? <BusyMark personality={personality} /> : null}
    </button>
  )
}

function BusyMark({ personality }: { personality: string }) {
  const level = useLevel()
  const motion = level !== 'off'
  return (
    <span className="ml-2 inline-flex items-center">
      <span className="sr-only">Loading</span>
      {personality === 'technical' ? (
        <span aria-hidden className="nx-motion h-px w-8 origin-left" style={{ background: 'var(--nx-mark)', transform: 'scaleX(1)', animation: motion && level === 'rich' ? 'nx-scan 700ms linear infinite' : undefined }} />
      ) : null}
      {personality === 'cinematic' ? (
        <span aria-hidden className="nx-motion inline-block h-3 w-3 rounded-full border border-current" style={{ animation: motion ? 'nx-spin 900ms linear infinite' : undefined }} />
      ) : null}
      {personality === 'liquid' ? <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: 'var(--nx-mark)' }} /> : null}
      {personality === 'tactile' ? <span aria-hidden className="inline-block h-2 w-2" style={{ background: 'var(--nx-hardware)' }} /> : null}
    </span>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 12 }, (_, index) => index)
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {pieces.map((piece) => (
        <span
          key={piece}
          className="absolute top-1/2 left-1/2 h-1.5 w-1.5"
          style={{
            background: piece % 2 ? 'var(--nx-ply)' : 'var(--nx-accent)',
            transform: `translate(${(piece - 6) * 8}px, ${piece % 3 === 0 ? -18 : 10}px)`,
            animation: 'nx-pop 700ms linear forwards',
            animationDelay: `${piece * 20}ms`,
          }}
        />
      ))}
    </span>
  )
}

export function IconButton({ label, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <NxButton aria-label={label} className="px-0" {...props}>
      <span aria-hidden>{children}</span>
    </NxButton>
  )
}

export function SplitButton({ label, items, onPrimary }: { label: string; items: string[]; onPrimary?: () => void }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  return (
    <div role="group" aria-label={label} className="relative inline-flex">
      <NxButton onClick={onPrimary}>{label}</NxButton>
      <NxButton aria-label={`${label} menu`} aria-haspopup="menu" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((value) => !value)}>
        Menu
      </NxButton>
      {open ? (
        <ul id={menuId} role="menu" className="absolute top-full left-0 z-10 mt-1 min-w-44" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)' }}>
          {items.map((item) => (
            <li key={item} role="none">
              <button type="button" role="menuitem" className="min-h-11 w-full px-3 text-left" onClick={() => setOpen(false)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function Fab({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <NxButton aria-label={label} onClick={onClick} className="min-h-11 min-w-11 px-0">
      <span aria-hidden>+</span>
    </NxButton>
  )
}

export function ButtonGroup({ children }: { children: ReactNode }) {
  const personality = usePersonality()
  return (
    <div role="group" className="inline-flex" style={{ border: '1px solid var(--nx-line)', borderRadius: personality === 'tactile' ? 'var(--nx-radius)' : personality === 'liquid' ? '999px' : 'var(--nx-radius)' }}>
      {children}
    </div>
  )
}

export function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false)
  const id = useId()
  return (
    <NxButton
      aria-describedby={id}
      onClick={() => {
        void navigator.clipboard.writeText(value)
        setDone(true)
      }}
    >
      {done ? 'Copied' : 'Copy'}
    </NxButton>
  )
}
