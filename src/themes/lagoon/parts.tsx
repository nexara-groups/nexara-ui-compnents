'use client'

import { cn } from '@/lib/utils.ts'
import { useLevel } from '@/themes/kit/level.ts'
import { motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

/** Rises into place once. Rich adds a little spring, subtle fades, off renders the end state. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const level = useLevel()
  if (level === 'off') return <div className={className}>{children}</div>
  const rich = level === 'rich'
  return (
    <motion.div
      className={className}
      initial={rich ? { opacity: 0, y: 22 } : { opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={rich ? { type: 'spring', stiffness: 160, damping: 18, mass: 0.9, delay } : { duration: 0.28, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * The one control that carries the biolume fill and the magenta bloom. The bloom sits
 * behind the button only. Hover settles the radius from pill to soft square.
 */
export function BookButton({
  children,
  href,
  onClick,
  size = 'md',
  className,
  type = 'button',
  busy = false,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  busy?: boolean
}) {
  const level = useLevel()
  const [hot, setHot] = useState(false)
  const pad = size === 'lg' ? 'min-h-14 px-7 text-[17px]' : size === 'sm' ? 'min-h-11 px-4 text-sm' : 'min-h-12 px-5 text-[15px]'
  const radius = hot && level !== 'off' ? 14 : 999
  const body = (
    <>
      {level !== 'off' ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-10"
          style={{ background: 'radial-gradient(closest-side, var(--nx-mark), transparent)', opacity: hot ? 0.55 : 0.3, transform: hot && level === 'rich' ? 'scale(1.08)' : 'scale(0.92)', transition: 'opacity 280ms linear, transform 420ms var(--nx-ease)' }}
        />
      ) : null}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  )
  const shared = {
    className: cn('relative isolate inline-flex items-center justify-center font-medium no-underline', pad, className),
    style: {
      background: 'var(--nx-accent)',
      color: 'var(--nx-accent-fg)',
      borderRadius: radius,
      transition: level === 'off' ? 'none' : 'border-radius 280ms var(--nx-ease)',
    },
    onPointerEnter: () => setHot(true),
    onPointerLeave: () => setHot(false),
    onFocus: () => setHot(true),
    onBlur: () => setHot(false),
  }
  if (href) {
    return (
      <a href={href} {...shared}>
        {body}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} aria-busy={busy || undefined} {...shared}>
      {body}
    </button>
  )
}

export function QuietButton({ children, href, onClick, className }: { children: ReactNode; href?: string; onClick?: () => void; className?: string }) {
  const level = useLevel()
  const [hot, setHot] = useState(false)
  const shared = {
    className: cn('inline-flex min-h-12 items-center justify-center gap-2 px-5 text-[15px] font-medium no-underline', className),
    style: { border: '1px solid var(--nx-line)', color: 'var(--nx-fg)', background: 'var(--nx-surface)', borderRadius: hot && level !== 'off' ? 14 : 999, transition: level === 'off' ? 'none' : 'border-radius 280ms var(--nx-ease)' },
    onPointerEnter: () => setHot(true),
    onPointerLeave: () => setHot(false),
    onFocus: () => setHot(true),
    onBlur: () => setHot(false),
  }
  if (href) return <a href={href} {...shared}>{children}</a>
  return <button type="button" onClick={onClick} {...shared}>{children}</button>
}

/** Toggle chip. Selected settles to a soft square and fills; unselected stays a pill. */
export function Chip({ selected, onClick, children, label, disabled }: { selected: boolean; onClick: () => void; children: ReactNode; label?: string; disabled?: boolean }) {
  const level = useLevel()
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="nx-mono inline-flex min-h-11 items-center justify-center px-3.5 text-[13px] disabled:cursor-not-allowed disabled:line-through disabled:opacity-40"
      style={{
        background: selected ? 'var(--nx-accent)' : 'transparent',
        color: selected ? 'var(--nx-accent-fg)' : 'var(--nx-fg)',
        border: `1px solid ${selected ? 'var(--nx-accent)' : 'var(--nx-line)'}`,
        borderRadius: selected ? 12 : 999,
        transition: level === 'off' ? 'none' : 'border-radius 300ms var(--nx-ease), background-color 140ms linear',
      }}
    >
      {children}
    </button>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="nx-mono mb-3 inline-flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase" style={{ color: 'var(--nx-muted)' }}>
      <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: 'var(--nx-mark)' }} />
      {children}
    </p>
  )
}

export function Plate({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'article' | 'aside' }) {
  const Tag = as
  return (
    <Tag className={cn('relative', className)} style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
      {children}
    </Tag>
  )
}
