'use client'

import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { useTheme } from '@/themes/provider.tsx'
import { useInView } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react'

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="nx-mono text-[11px] tracking-[0.16em] uppercase" style={{ color: 'var(--nx-muted)' }}>
      {children}
    </p>
  )
}

export function ThemeButton({
  href,
  kind = 'solid',
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string
  kind?: 'solid' | 'line'
}) {
  const classNames = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 px-4 text-[15px] font-medium no-underline',
    className,
  )
  const style = {
    borderRadius: 'var(--nx-radius)',
    background: kind === 'solid' ? 'var(--nx-accent)' : 'transparent',
    color: kind === 'solid' ? 'var(--nx-accent-fg)' : 'var(--nx-fg)',
    border: kind === 'line' ? '1px solid var(--nx-fg)' : '1px solid transparent',
    fontFamily: 'var(--nx-font-body)',
  }
  if (href) {
    return (
      <a href={href} className={classNames} style={style}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classNames} style={style} {...props}>
      {children}
    </button>
  )
}

export function DrawRule({ seen, className }: { seen: boolean; className?: string }) {
  const reduce = usePrefersReducedMotion()
  return (
    <span
      aria-hidden
      className={cn('nx-motion block h-px w-full origin-left', className)}
      style={{
        background: 'var(--nx-line)',
        transform: reduce || seen ? 'scaleX(1)' : 'scaleX(0)',
        transition: reduce ? 'none' : 'transform var(--nx-dur-slow) var(--nx-ease)',
      }}
    />
  )
}

export function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const seen = useInView(ref, { once: true, amount: 0.35 })
  return [ref, seen] as const
}

export function Station({ host }: { host: RefObject<HTMLElement | null> }) {
  const line = useRef<HTMLDivElement>(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    const scope = host.current
    const bar = line.current
    if (!scope || !bar) return
    if (reduce) {
      bar.style.transform = 'scaleY(1)'
      return
    }
    let frame = 0
    const paint = () => {
      const rect = scope.getBoundingClientRect()
      const total = Math.max(rect.height, 1)
      const passed = Math.min(total, Math.max(0, -rect.top))
      bar.style.transform = `scaleY(${passed / total})`
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [host, reduce])

  return (
    <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-[3px]" aria-hidden>
      <div ref={line} className="nx-motion h-full origin-top" style={{ background: 'var(--nx-mark)', transform: 'scaleY(0)' }} />
    </div>
  )
}

export type MarkRow = { id: string; content: ReactNode }

export function MarkList({
  label,
  rows,
  value,
  onChange,
  grow = false,
}: {
  label: string
  rows: MarkRow[]
  value: string
  onChange: (id: string) => void
  grow?: boolean
}) {
  const reduce = usePrefersReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [box, setBox] = useState({ y: 0, h: 28 })
  const shown = preview ?? value

  const measure = useCallback((id: string) => {
    const row = root.current?.querySelector<HTMLElement>(`[data-mark="${id}"]`)
    if (!row || !root.current) return
    setBox({ y: row.offsetTop, h: row.offsetHeight })
  }, [])

  useEffect(() => {
    measure(shown)
  }, [measure, shown, rows.length])

  return (
    <div
      ref={root}
      className="relative"
      role="group"
      aria-label={label}
      onMouseLeave={() => setPreview(null)}
    >
      <span
        aria-hidden
        className="nx-motion pointer-events-none absolute top-0 left-0 w-[3px]"
        style={{
          background: 'var(--nx-mark)',
          height: box.h,
          transform: `translateY(${box.y}px) scaleX(${grow && preview ? 2 : 1})`,
          transformOrigin: 'left center',
          transition: reduce ? 'none' : 'transform var(--nx-dur-base) var(--nx-ease)',
        }}
      />
      <ul className="m-0 list-none p-0">
        {rows.map((row) => {
          const on = shown === row.id
          return (
            <li key={row.id} data-mark={row.id}>
              <button
                type="button"
                aria-pressed={value === row.id}
                onMouseEnter={() => {
                  setPreview(row.id)
                  measure(row.id)
                }}
                onFocus={() => {
                  setPreview(row.id)
                  measure(row.id)
                }}
                onClick={() => onChange(row.id)}
                className="w-full py-3 pr-2 pl-4 text-left"
                style={{ background: on ? 'color-mix(in srgb, var(--nx-fg) 5%, transparent)' : 'transparent' }}
              >
                {row.content}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const TEAR_FRAMES = [0, 5, 11, 3]

export function Perforation({ play }: { play: boolean }) {
  const reduce = usePrefersReducedMotion()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (reduce || !play) return
    let step = 0
    const id = window.setInterval(() => {
      step += 1
      if (step >= TEAR_FRAMES.length) {
        window.clearInterval(id)
        setFrame(0)
        return
      }
      setFrame(step)
    }, 50)
    return () => window.clearInterval(id)
  }, [play, reduce])

  return (
    <div aria-hidden className="relative h-3 overflow-hidden">
      <div
        className="absolute right-0 left-0 border-t border-dashed"
        style={{
          borderColor: 'var(--nx-fg)',
          transform: `translateX(${reduce ? 0 : TEAR_FRAMES[frame]}px)`,
        }}
      />
    </div>
  )
}

export function Misregister({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion()
  const [snap, setSnap] = useState(reduce)

  useEffect(() => {
    if (reduce) return
    const id = window.setTimeout(() => setSnap(true), 90)
    return () => window.clearTimeout(id)
  }, [reduce])

  return (
    <span className="relative inline-block">
      <span
        aria-hidden
        className="nx-motion absolute inset-0"
        style={{
          background: 'var(--nx-plate)',
          transform: snap ? 'translate(3px, 3px)' : 'translate(14px, 8px)',
          transition: reduce ? 'none' : 'transform var(--nx-dur-base) var(--nx-ease)',
        }}
      />
      <span className="relative inline-block px-2" style={{ background: 'var(--nx-bg)', color: 'var(--nx-fg)' }}>
        {children}
      </span>
    </span>
  )
}

export function ScoreWindow({ value, play }: { value: string; play: boolean }) {
  const reduce = usePrefersReducedMotion()
  const { theme } = useTheme()
  return (
    <span className="inline-flex items-end gap-1" role="img" aria-label={value}>
      {value.split('').map((glyph, index) => (
        <span
          key={`${glyph}-${index}`}
          className="nx-display inline-block overflow-hidden"
          style={{ height: '0.85em', lineHeight: 0.85 }}
          aria-hidden
        >
          <span
            className="nx-motion block"
            style={{
              transform: reduce || play ? 'translateY(0)' : 'translateY(110%)',
              transition: reduce
                ? 'none'
                : `transform ${theme.motion.duration.fast}ms ${theme.motion.ease.enter} ${index * 30}ms`,
            }}
          >
            {glyph}
          </span>
        </span>
      ))}
    </span>
  )
}

export function useMenuDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const root = ref.current
    if (!root) return
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusable = () =>
      [...root.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
        (node) => !node.hasAttribute('disabled'),
      )
    focusable()[0]?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const nodes = focusable()
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [open, onClose])

  return { ref, titleId }
}
