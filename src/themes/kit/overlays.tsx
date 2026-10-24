'use client'

import { useLevel, usePersonality } from '@/themes/kit/level.ts'
import { usePlayOpen } from '@/themes/kit/motion.ts'
import { useMenuDialog } from '@/themes/primitives.tsx'
import { useEffect, useId, useState, type ReactNode } from 'react'

export function Modal({ title, open, onClose, children, contained = false }: { title: string; open: boolean; onClose: () => void; children: ReactNode; contained?: boolean }) {
  const personality = usePersonality()
  const level = useLevel()
  const { ref, titleId } = useMenuDialog(open, onClose)
  usePlayOpen(ref, open && personality === 'liquid', null, 16)
  if (!open) return null
  const transform = personality === 'cinematic' ? 'rotateX(0deg) scale(1)' : personality === 'tactile' ? 'scaleX(1) scaleY(1)' : 'none'
  return (
    <div className={contained ? 'absolute inset-0 z-40 flex items-end justify-center p-3' : 'fixed inset-0 z-40 flex items-end justify-center p-4 sm:items-center'} style={{ background: 'color-mix(in srgb, var(--nx-fg) 40%, transparent)' }}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md p-4"
        style={{
          background: 'var(--nx-surface)',
          color: 'var(--nx-fg)',
          border: '1px solid var(--nx-line)',
          borderRadius: personality === 'liquid' ? '16px' : 'var(--nx-radius)',
          transform,
          animation: level === 'off' ? undefined : personality === 'editorial' ? 'nx-shutter 180ms cubic-bezier(0.16, 1, 0.3, 1)' : personality === 'cinematic' ? 'nx-dolly 280ms var(--nx-ease)' : personality === 'tactile' ? 'nx-slam 220ms cubic-bezier(0.34, 1.7, 0.64, 1)' : personality === 'technical' ? 'nx-iris 200ms linear' : undefined,
        }}
      >
        {personality === 'liquid' ? <span aria-hidden className="mb-3 block h-3 w-3 rounded-full" style={{ background: 'var(--nx-mark)', transform: 'scale(1)' }} /> : null}
        <div className="flex items-start justify-between gap-3">
          <h2 id={titleId} className="text-xl">{title}</h2>
          <button type="button" className="min-h-11 px-3" onClick={onClose}>Close</button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  )
}

function DrawerMark() {
  const personality = usePersonality()
  const level = useLevel()
  const moving = level !== 'off'
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setSettled(true))
    return () => window.cancelAnimationFrame(id)
  }, [])
  if (personality === 'liquid') {
    return <span aria-hidden className="mb-3 block h-16 w-16" style={{ background: 'var(--nx-mark)', borderRadius: moving && settled ? 16 : 32, transition: 'border-radius 280ms var(--nx-ease)' }} />
  }
  if (personality === 'cinematic') {
    return <span aria-hidden className="nx-motion mb-3 block h-8 w-8 rounded-full border" style={{ borderColor: 'var(--nx-mark)', animation: moving ? 'nx-quarter 280ms var(--nx-ease) both' : undefined }} />
  }
  if (personality === 'tactile') {
    return <span aria-hidden className="nx-motion mb-3 block h-3 w-10" style={{ background: 'var(--nx-accent)', borderRadius: 'var(--nx-radius)', animation: moving ? 'nx-slam 220ms cubic-bezier(0.34, 1.7, 0.64, 1) both' : undefined }} />
  }
  if (personality === 'technical') {
    return <span aria-hidden className="nx-motion mb-3 block h-px w-full origin-left" style={{ background: 'var(--nx-mark)', animation: moving ? 'nx-scan 280ms linear both' : undefined, transform: moving ? undefined : 'scaleX(1)' }} />
  }
  return <span aria-hidden className="mb-3 block h-0.5 w-10" style={{ background: 'var(--nx-mark)' }} />
}

export function Drawer({ title, open, onClose, children }: { title: string; open: boolean; onClose: () => void; children: ReactNode }) {
  const { ref, titleId } = useMenuDialog(open, onClose)
  const level = useLevel()
  const personality = usePersonality()
  usePlayOpen(ref, open && personality === 'liquid', null, 0)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40" style={{ background: 'color-mix(in srgb, var(--nx-fg) 40%, transparent)' }}>
      <div
        ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} className="absolute inset-y-0 right-0 w-full max-w-sm p-4" style={{ background: 'var(--nx-surface)', color: 'var(--nx-fg)', animation: level === 'off' || personality === 'liquid' ? undefined : 'nx-drawer 220ms var(--nx-ease)' }}>
        <DrawerMark />
        <div className="flex items-center justify-between">
          <h2 id={titleId} className="text-xl">
            {personality === 'editorial' ? <span className="sr-only">{title}</span> : null}
            {personality === 'editorial' ? (
              <span aria-hidden className="inline-flex" style={{ perspective: '600px' }}>
                {title.split('').map((glyph, index) => (
                  <span key={`${glyph}-${index}`} className="nx-motion inline-block" style={{ transformOrigin: 'center bottom', animation: level === 'off' ? undefined : `nx-flap 90ms linear ${index * 16}ms both` }}>{glyph === ' ' ? '\u00a0' : glyph}</span>
                ))}
              </span>
            ) : title}
          </h2>
          <button type="button" className="min-h-11 px-3" onClick={onClose}>Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export function Popover({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="relative">
      <button type="button" className="min-h-11 px-3" style={{ border: '1px solid var(--nx-line)' }} aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        {label}
      </button>
      {open ? <div id={id} className="absolute z-10 mt-2 w-56 p-3" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)' }}>{children}</div> : null}
    </div>
  )
}

export function Tooltip({ label, tip }: { label: string; tip: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <button type="button" className="min-h-11 px-3" style={{ border: '1px solid var(--nx-line)' }} aria-describedby={open ? id : undefined} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {label}
      {open ? <span id={id} role="tooltip" className="ml-2 text-xs" style={{ color: 'var(--nx-muted)' }}>{tip}</span> : null}
    </button>
  )
}

export function MenuButton({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <div className="relative">
      <button type="button" className="min-h-11 px-3" style={{ border: '1px solid var(--nx-line)' }} aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        {label}
      </button>
      {open ? (
        <ul id={id} role="menu" className="absolute z-10 mt-1 min-w-44" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)' }}>
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

export function ToastStack({ message, onDismiss, contained = false }: { message: string | null; onDismiss: () => void; contained?: boolean }) {
  const [paused, setPaused] = useState(false)
  const personality = usePersonality()
  const level = useLevel()
  useEffect(() => {
    if (!message || paused || level === 'off') return
    const id = window.setTimeout(onDismiss, 4000)
    return () => window.clearTimeout(id)
  }, [message, paused, level, onDismiss])
  if (!message) return null
  return (
    <div role="status" className={contained ? 'absolute right-2 bottom-2 left-2 z-50 flex items-center gap-2 p-3' : 'fixed right-4 bottom-4 z-50 flex max-w-sm items-center gap-2 p-3'} style={{ background: 'var(--nx-surface)', color: 'var(--nx-fg)', border: '1px solid var(--nx-line)', animation: paused || level === 'off' ? undefined : personality === 'editorial' ? 'nx-shutter 180ms cubic-bezier(0.16, 1, 0.3, 1)' : personality === 'cinematic' ? 'nx-dolly 280ms var(--nx-ease)' : personality === 'tactile' ? 'nx-slam 220ms cubic-bezier(0.34, 1.7, 0.64, 1)' : personality === 'technical' ? 'nx-iris 200ms linear' : 'nx-slide 280ms var(--nx-ease)' }}>
      <p className="min-w-0 flex-1">{message}</p>
      <button type="button" className="min-h-11 px-3" onClick={() => setPaused((value) => !value)}>{paused ? 'Play' : 'Pause'}</button>
      <button type="button" className="min-h-11 px-3" onClick={onDismiss}>Dismiss</button>
    </div>
  )
}

export function Banner({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3" style={{ borderBottom: '2px solid var(--nx-mark)', background: 'var(--nx-surface)' }}>
      <p>{children}</p>
    </div>
  )
}

export function Alert({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="alert" className="px-3 py-3" style={{ borderLeft: '3px solid var(--nx-danger)', background: 'var(--nx-surface)' }}>
      <p className="font-medium">{title}</p>
      <p className="text-sm" style={{ color: 'var(--nx-muted)' }}>{children}</p>
    </div>
  )
}

export function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}%</span></div>
      <div className="h-2" style={{ background: 'var(--nx-line)' }}>
        <div className="h-full origin-left" style={{ background: 'var(--nx-mark)', transform: `scaleX(${value / 100})` }} />
      </div>
    </div>
  )
}

export function EmptyState({ title, action }: { title: string; action: ReactNode }) {
  return (
    <div className="px-4 py-8 text-center" style={{ border: '1px solid var(--nx-line)' }}>
      <p>{title}</p>
      <div className="mt-4">{action}</div>
    </div>
  )
}

export function NotFound({ action }: { action: ReactNode }) {
  const personality = usePersonality()
  return (
    <div className="px-4 py-10">
      <p className="nx-display text-5xl">{personality === 'technical' ? 'NOT FOUND' : '404'}</p>
      <p className="mt-2" style={{ color: 'var(--nx-muted)' }}>That page is not on this desk.</p>
      <div className="mt-4">{action}</div>
    </div>
  )
}

