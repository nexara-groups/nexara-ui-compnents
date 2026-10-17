'use client'

import { type ComponentProps, type MouseEvent, type ReactNode, useState } from 'react'
import { cn, focusRing, useKeyframes } from '@/lib/utils.ts'

export const EXTRA_BUTTON = [
  'toggle',
  'theme',
  'fab',
  'badge',
  'store',
  'swap',
  'progress',
  'notify',
  'success',
  'group',
  'flow',
] as const

export type ExtraButtonVariant = (typeof EXTRA_BUTTON)[number]

const FLOW_KEYFRAMES = `
@keyframes nexara-flow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
`

export type ExtraButtonProps = Omit<ComponentProps<'button'>, 'children'> & {
  variant: ExtraButtonVariant
  size?: 'sm' | 'md' | 'lg' | null
  radius?: 'md' | 'lg' | 'full' | null
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
  href?: string
  target?: string
  rel?: string
  download?: boolean | string
  pressed?: boolean
  count?: number
  progress?: number
  state?: 'idle' | 'loading' | 'success'
}

function Spinner() {
  return (
    <svg className="size-4 motion-safe:animate-spin" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2.5 7.2 5.6 10.2 11.5 3.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Behavioral button kinds: toggle, theme, FAB, badge, store, letter-swap,
 * save-with-progress, notify, success, group, flow. Original constructions.
 */
export function ExtraButton({
  variant,
  className,
  size = 'md',
  radius = 'lg',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  href,
  target,
  rel,
  download,
  disabled,
  onClick,
  type = 'button',
  pressed,
  count = 3,
  progress = 62,
  state = 'idle',
  ...rest
}: ExtraButtonProps) {
  useKeyframes('nexara-flow-keyframes', FLOW_KEYFRAMES)
  const [on, setOn] = useState(Boolean(pressed))
  const [dark, setDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false,
  )
  const [group, setGroup] = useState('Week')
  const busy = Boolean(loading || state === 'loading')
  const done = state === 'success'
  const label = children ?? defaultLabel(variant)
  const inactive = Boolean(disabled || busy)

  if (variant === 'group') {
    return (
      <div role="group" aria-label="Range" data-nexara="button" data-variant="group" className={cn('inline-flex overflow-hidden rounded-xl border border-nx-line bg-nx-card', className)}>
        {['Day', 'Week', 'Month'].map((item) => (
          <button
            key={item}
            type="button"
            className={cn(focusRing, 'h-10 px-3.5 text-sm', group === item ? 'bg-nx-fg text-nx-bg' : 'text-nx-muted hover:bg-nx-soft')}
            aria-pressed={group === item}
            onClick={() => setGroup(item)}
          >
            {item}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'theme') {
    return (
      <button
        type="button"
        data-nexara="button"
        data-variant="theme"
        aria-pressed={dark}
        aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        className={cn(focusRing, 'inline-flex h-10 items-center gap-2 rounded-full border border-nx-border bg-nx-card px-3 text-sm', className)}
        onClick={() => {
          const next = !dark
          setDark(next)
          document.documentElement.classList.toggle('dark', next)
          try {
            localStorage.setItem('nexara-theme', next ? 'dark' : 'light')
          } catch {
            /* ignore */
          }
        }}
      >
        <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-nx-elevated">
          {dark ? '☾' : '☼'}
        </span>
        {dark ? 'Dark' : 'Light'}
      </button>
    )
  }

  const height = size === 'sm' ? 'h-9 px-3.5 text-sm' : size === 'lg' ? 'h-12 px-5 text-[15px]' : 'h-10 px-4 text-sm'
  const round = radius === 'full' ? 'rounded-full' : radius === 'md' ? 'rounded-lg' : 'rounded-xl'

  const surface = {
    toggle: cn('border border-nx-line bg-nx-card', on && 'bg-nx-fg text-nx-bg'),
    fab: 'size-14 rounded-full bg-nx-fg p-0 text-nx-bg shadow-[var(--nx-shadow)]',
    badge: 'border border-nx-border bg-nx-card',
    store: 'h-12 justify-start gap-3 rounded-xl border border-white/10 bg-[#111113] pr-5 pl-2 text-white',
    swap: 'overflow-hidden bg-nx-fg text-nx-bg',
    progress: 'overflow-hidden border border-nx-line bg-nx-card',
    notify: 'border border-nx-border bg-nx-card',
    success: 'bg-nx-ok text-white',
    flow: 'overflow-hidden border-0 text-white',
    theme: '',
    group: '',
  }[variant]

  const inner = (
    <>
      {variant === 'store' ? (
        <span className="grid size-8 place-items-center rounded-lg bg-white text-[#111]">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M7 1.4 8.8 5h4L9.9 7.6l1.3 3.8L7 9.2 2.8 11.4 4.1 7.6 1.2 5h4L7 1.4Z" fill="currentColor" />
          </svg>
        </span>
      ) : null}
      {variant === 'fab' ? (
        <span aria-hidden="true" className="text-2xl leading-none">
          +
        </span>
      ) : null}
      {variant === 'progress' ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 bg-nx-soft"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      ) : null}
      {variant === 'flow' ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,#4c46e0,#22c5b0,#4c46e0)] bg-[length:200%_100%] motion-safe:animate-[nexara-flow_2.8s_linear_infinite]"
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">
        {leftIcon}
        {busy ? (
          <Spinner />
        ) : done || variant === 'success' ? (
          <Check />
        ) : variant === 'swap' ? (
          <SwapLabel text={String(label)} />
        ) : variant === 'fab' ? (
          <span className="sr-only">{label}</span>
        ) : (
          <span>{done ? 'Saved' : label}</span>
        )}
        {rightIcon}
      </span>
      {variant === 'badge' || variant === 'notify' ? (
        <span className="absolute -top-1.5 -right-1.5 grid min-w-5 place-items-center rounded-full bg-nx-danger px-1 text-[10px] leading-4 text-white">
          {count}
        </span>
      ) : null}
      {variant === 'notify' ? (
        <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-nx-danger" aria-hidden="true" />
      ) : null}
    </>
  )

  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
    'transition-[transform,box-shadow,background-color,color,border-color,opacity] duration-200',
    'motion-safe:active:scale-[0.985]',
    focusRing,
    'disabled:pointer-events-none disabled:opacity-45',
    variant === 'fab' ? '' : height,
    variant === 'fab' ? 'rounded-full' : round,
    surface,
    className,
  )

  if (href) {
    return (
      <a
        {...(rest as ComponentProps<'a'>)}
        href={inactive ? undefined : href}
        target={target}
        rel={rel}
        download={download}
        data-nexara="button"
        data-variant={variant}
        aria-disabled={inactive || undefined}
        aria-busy={busy || undefined}
        className={cn(classes, inactive && 'pointer-events-none opacity-45')}
        onClick={(event) => {
          if (inactive) {
            event.preventDefault()
            return
          }
          onClick?.(event as unknown as MouseEvent<HTMLButtonElement>)
        }}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      {...rest}
      type={type}
      data-nexara="button"
      data-variant={variant}
      className={classes}
      disabled={disabled}
      aria-disabled={inactive || undefined}
      aria-busy={busy || undefined}
      aria-pressed={variant === 'toggle' ? on : undefined}
      onClick={(event) => {
        if (inactive) {
          event.preventDefault()
          return
        }
        if (variant === 'toggle') setOn((value) => !value)
        onClick?.(event)
      }}
    >
      {inner}
    </button>
  )
}

function defaultLabel(variant: ExtraButtonVariant) {
  if (variant === 'store') return 'Download on the App Store'
  if (variant === 'fab') return 'Create'
  if (variant === 'success') return 'Saved'
  if (variant === 'progress') return 'Saving 62%'
  if (variant === 'toggle') return 'Live view'
  if (variant === 'swap') return 'Start a brief'
  if (variant === 'flow') return 'Book a room'
  if (variant === 'badge' || variant === 'notify') return 'Inbox'
  return 'Continue'
}

function SwapLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {Array.from(text).map((glyph, index) => (
        <span key={`${glyph}-${index}`} className="relative inline-block h-[1em] overflow-hidden">
          <span className="block motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-full">{glyph === ' ' ? '\u00a0' : glyph}</span>
          <span className="absolute inset-0 translate-y-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-y-0">
            {glyph === ' ' ? '\u00a0' : glyph}
          </span>
        </span>
      ))}
    </span>
  )
}
