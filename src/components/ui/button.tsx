'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import {
  useEffect,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { cn, useKeyframes } from '@/lib/utils.ts'

const BUTTON_KEYFRAMES = `
@keyframes nexara-shimmer {
  0% { transform: translateX(-130%) skewX(-12deg); opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  100% { transform: translateX(330%) skewX(-12deg); opacity: 0; }
}
@keyframes nexara-beam {
  to { transform: rotate(1turn); }
}
@keyframes nexara-liquid {
  0%, 100% { border-radius: 999px; }
  50% { border-radius: 1.1rem 1.6rem 1.2rem 1.5rem; }
}
`

const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-medium',
    'transition-[transform,background-color,border-color,color,box-shadow,border-radius] duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    'disabled:pointer-events-none disabled:opacity-45',
  ].join(' '),
  {
    variants: {
      variant: {
        solid: 'bg-[#f6f3ec] text-[#16140f] hover:bg-white motion-safe:active:scale-[0.98]',
        outline:
          'border border-white/20 bg-transparent text-[#f6f3ec] hover:border-white/40 motion-safe:active:scale-[0.98]',
        swap: 'bg-transparent text-[#f6f3ec] hover:bg-white/5 motion-safe:active:scale-[0.98]',
        flood:
          'border border-white/15 bg-[#101118] text-[#f6f3ec] motion-safe:active:scale-[0.98]',
        shimmer:
          'border border-white/12 bg-zinc-900 text-[#f6f3ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] motion-safe:active:scale-[0.98]',
        'neon-glow':
          'border border-[#8b7cff] bg-[#120f22] text-[#f4f1ff] shadow-[0_0_0_1px_rgba(139,124,255,0.35),0_0_22px_-4px_rgba(139,124,255,0.95)] hover:shadow-[0_0_36px_-4px_rgba(139,124,255,1)] focus-visible:ring-[#f6f3ec]',
        metal:
          'border border-[#efeae2] bg-[linear-gradient(180deg,#fffaf3_0%,#d9d0c3_46%,#9a9286_100%)] text-[#241c14] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-8px_12px_rgba(70,50,30,0.18)] motion-safe:active:translate-y-px',
        brutal:
          'rounded-md border-2 border-[#f6f3ec] bg-[#ff6a3d] text-[#1a100c] shadow-[4px_4px_0_0_#f6f3ec] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#f6f3ec] motion-safe:active:translate-x-1 motion-safe:active:translate-y-1 motion-safe:active:shadow-none',
        underline:
          'rounded-none bg-transparent px-1 text-[#f6f3ec] shadow-none hover:bg-transparent',
        liquid:
          'bg-[#06241d] text-[#f6f3ec] motion-safe:active:scale-95',
        spotlight: 'border border-white/15 bg-[#101118] text-[#f6f3ec]',
        'border-beam': 'border border-white/10 bg-[#101118] text-[#f6f3ec]',
        split: 'gap-0 bg-[#f6f3ec] p-0 pl-0 text-[#16140f] motion-safe:active:scale-[0.98]',
        hold: 'border border-white/15 bg-[#1a1428] text-[#f6f3ec]',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
      },
      radius: {
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      { variant: 'underline', class: 'h-auto min-h-9 rounded-none px-0.5 py-1' },
      { variant: 'split', class: 'px-0' },
      { variant: 'brutal', radius: 'full', class: 'rounded-md' },
      { variant: 'split', class: 'pr-4' },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      radius: 'full',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export type ButtonProps = ButtonVariantProps &
  Omit<ComponentProps<'button'>, 'children'> & {
    href?: string
    target?: string
    rel?: string
    download?: boolean | string
    shimmer?: boolean
    loading?: boolean
    /** Milliseconds the pointer must stay down before `hold` fires. */
    holdDuration?: number
    /** Second label revealed by the `swap` variant. */
    swapLabel?: ReactNode
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    children?: ReactNode
  }

function Spinner() {
  return (
    <svg className="size-4 motion-safe:animate-spin" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Button
 * Twelve treatments, from a paper fill to a press-and-hold confirmation.
 * Pass `href` to render an anchor with the same styles.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Button({
  className,
  variant,
  size,
  radius,
  shimmer = false,
  loading = false,
  holdDuration = 900,
  swapLabel = 'Ready',
  leftIcon,
  rightIcon,
  children,
  href,
  target,
  rel,
  download,
  disabled,
  onClick,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onKeyDown,
  onKeyUp,
  type = 'button',
  ...rest
}: ButtonProps) {
  const showShimmer = variant === 'shimmer' || variant === 'metal' || shimmer
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isInactive = Boolean(disabled || loading)
  const holdRef = useRef<HTMLSpanElement>(null)
  const frame = useRef(0)
  const finished = useRef(false)
  const allowClick = useRef(false)
  const onClickRef = useRef(onClick)
  useEffect(() => {
    onClickRef.current = onClick
  }, [onClick])
  useKeyframes('nexara-button-keyframes', BUTTON_KEYFRAMES)

  const classes = cn(buttonVariants({ variant, size, radius }), className)

  function resetHold() {
    window.cancelAnimationFrame(frame.current)
    if (holdRef.current) holdRef.current.style.transform = 'scaleX(0)'
    finished.current = false
  }

  function startHold() {
    if (variant !== 'hold' || isInactive || href) return
    resetHold()
    const bar = holdRef.current
    const started = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - started) / holdDuration)
      if (bar) bar.style.transform = `scaleX(${progress})`
      if (progress >= 1) {
        finished.current = true
        allowClick.current = true
        buttonRef.current?.click()
        return
      }
      frame.current = window.requestAnimationFrame(step)
    }
    frame.current = window.requestAnimationFrame(step)
  }

  useEffect(() => () => window.cancelAnimationFrame(frame.current), [])

  function trackSpot(event: PointerEvent<HTMLElement>) {
    if (variant !== 'spotlight' && variant !== 'flood' && variant !== 'neon-glow') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    event.currentTarget.style.setProperty('--bx', `${x}px`)
    event.currentTarget.style.setProperty('--by', `${y}px`)
    const fromLeft = x
    const fromRight = rect.width - x
    const fromTop = y
    const fromBottom = rect.height - y
    const nearest = Math.min(fromLeft, fromRight, fromTop, fromBottom)
    const edgeX = nearest === fromLeft ? 0 : nearest === fromRight ? rect.width : x
    const edgeY = nearest === fromTop ? 0 : nearest === fromBottom ? rect.height : y
    event.currentTarget.style.setProperty('--edge-x', `${edgeX}px`)
    event.currentTarget.style.setProperty('--edge-y', `${edgeY}px`)
  }

  const content = (
    <>
      {variant === 'border-beam' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-[-40%] motion-safe:animate-[nexara-beam_2.8s_linear_infinite]">
          <span className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_72%,#f5c16c_86%,#ff6a3d_92%,transparent_100%)]" />
        </span>
      ) : null}
      {variant === 'border-beam' ? (
        <span aria-hidden="true" className="absolute inset-px rounded-[inherit] bg-inherit" />
      ) : null}
      {variant === 'outline' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white/15 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      ) : null}
      {variant === 'liquid' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-full translate-y-full bg-[#3ddec4] transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0" />
      ) : null}
      {variant === 'neon-glow' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute z-[1] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6f3ec] opacity-0 shadow-[0_0_12px_#8b7cff] group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ left: 'var(--edge-x, 0px)', top: 'var(--edge-y, 50%)' }}
        />
      ) : null}
      {variant === 'flood' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[#f6f3ec] transition-[clip-path] duration-300 ease-out [clip-path:circle(0%_at_var(--bx,50%)_var(--by,50%))] group-hover:[clip-path:circle(80%_at_var(--bx,50%)_var(--by,50%))] group-focus-visible:[clip-path:circle(80%_at_var(--bx,50%)_var(--by,50%))]"
        />
      ) : null}
      {variant === 'flood' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-[#16140f] transition-[clip-path] duration-300 ease-out [clip-path:circle(0%_at_var(--bx,50%)_var(--by,50%))] group-hover:[clip-path:circle(80%_at_var(--bx,50%)_var(--by,50%))] group-focus-visible:[clip-path:circle(80%_at_var(--bx,50%)_var(--by,50%))]"
        >
          {children}
        </span>
      ) : null}
      {variant === 'spotlight' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{
            background:
              'radial-gradient(80px circle at var(--bx, 50%) var(--by, 50%), rgba(245, 193, 108, 0.45), transparent 70%)',
          }}
        />
      ) : null}
      {variant === 'hold' ? (
        <span
          ref={holdRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#ff6a3d]"
        />
      ) : null}
      {showShimmer ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-20%] left-0 z-[1] w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 motion-safe:group-hover:animate-[nexara-shimmer_0.9s_ease-out] motion-safe:group-focus-visible:animate-[nexara-shimmer_0.9s_ease-out]"
        />
      ) : null}
      {variant === 'neon-glow' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_12px_rgba(139,124,255,0.45)]" />
      ) : null}
      {variant === 'split' ? (
        <span className="relative z-10 inline-flex h-full items-center self-stretch bg-[#ff6a3d] px-3 text-[#1a100c]">
          {leftIcon ?? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </span>
      ) : null}
      <span className="relative z-10 inline-grid place-items-center">
        <span className={cn('col-start-1 row-start-1 inline-flex items-center gap-2', loading && 'invisible')}>
          {variant === 'split' ? null : leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
          <span className={cn('relative inline-grid', variant !== 'underline' && 'overflow-hidden', variant === 'liquid' && 'group-hover:text-[#06241d] group-focus-visible:text-[#06241d]')}>
            <span className={cn(variant === 'swap' && 'col-start-1 row-start-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-full motion-safe:group-focus-visible:-translate-y-full')}>
              {children}
            </span>
            {variant === 'swap' ? (
              <span aria-hidden="true" className="col-start-1 row-start-1 translate-y-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0">
                {swapLabel}
              </span>
            ) : null}
            {variant === 'underline' ? (
              <span
                aria-hidden="true"
                className="absolute right-0 bottom-0 left-0 h-px origin-left scale-x-0 bg-current motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-x-100 motion-safe:group-focus-visible:scale-x-100"
              />
            ) : null}
          </span>
          {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
        </span>
        {loading ? (
          <span className="col-start-1 row-start-1 inline-flex items-center gap-2">
            <Spinner />
            <span className="sr-only">Loading</span>
          </span>
        ) : null}
      </span>
      {variant === 'hold' && !href ? <span className="sr-only">Press and hold to confirm.</span> : null}
    </>
  )

  if (href) {
    return (
      <a
        {...(rest as ComponentProps<'a'>)}
        href={isInactive ? undefined : href}
        target={target}
        rel={rel}
        download={download}
        data-nexara="button"
        data-variant={variant ?? 'solid'}
        aria-disabled={isInactive || undefined}
        aria-busy={loading || undefined}
        className={cn(classes, isInactive && 'pointer-events-none opacity-45')}
        onPointerMove={trackSpot}
        onClick={(event) => {
          if (isInactive) {
            event.preventDefault()
            return
          }
          onClick?.(event as unknown as MouseEvent<HTMLButtonElement>)
        }}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      {...rest}
      type={type}
      ref={buttonRef}
      data-nexara="button"
      data-variant={variant ?? 'solid'}
      className={classes}
      disabled={disabled}
      aria-disabled={isInactive || undefined}
      aria-busy={loading || undefined}
      onPointerMove={trackSpot}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (variant === 'hold' && event.button === 0) {
          event.currentTarget.setPointerCapture(event.pointerId)
          startHold()
        }
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event)
        if (variant === 'hold') resetHold()
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        if (variant === 'hold') resetHold()
      }}
      onBlur={() => {
        if (variant === 'hold') resetHold()
      }}
      onPointerCancel={() => {
        if (variant === 'hold') resetHold()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (variant !== 'hold' || event.repeat) return
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault()
          startHold()
        }
      }}
      onKeyUp={(event) => {
        onKeyUp?.(event)
        if (variant === 'hold' && (event.key === ' ' || event.key === 'Enter')) resetHold()
      }}
      onClick={(event) => {
        if (isInactive || (variant === 'hold' && !allowClick.current)) {
          event.preventDefault()
          return
        }
        allowClick.current = false
        onClick?.(event)
      }}
    >
      {content}
    </button>
  )
}
