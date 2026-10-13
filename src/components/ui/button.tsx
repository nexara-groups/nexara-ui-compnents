'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type MouseEvent, type ReactNode } from 'react'
import { cn, useKeyframes } from '@/lib/utils.ts'

const BUTTON_KEYFRAMES = `
@keyframes nexara-shimmer {
  0% { transform: translateX(-130%) skewX(-12deg); opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  100% { transform: translateX(330%) skewX(-12deg); opacity: 0; }
}
`

const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-medium',
    'transition-[transform,background-color,border-color,color,box-shadow] duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    'disabled:pointer-events-none disabled:opacity-45',
    'motion-safe:active:scale-[0.98]',
  ].join(' '),
  {
    variants: {
      variant: {
        solid: 'bg-[#f6f3ec] text-[#16140f] hover:bg-white',
        outline:
          'border border-white/20 bg-transparent text-[#f6f3ec] hover:border-white/40 hover:bg-white/10',
        ghost: 'bg-transparent text-[#f6f3ec] hover:bg-white/10',
        gradient:
          'border border-white/10 bg-[linear-gradient(120deg,#ff6a3d,#f5c16c_42%,#c4b5ff)] text-[#1a120c] shadow-[0_10px_30px_-16px_rgba(255,106,61,0.9)]',
        shimmer:
          'border border-white/12 bg-zinc-900 text-[#f6f3ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
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
 * Solid, outline, ghost, gradient, and shimmer actions.
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
  ...rest
}: ButtonProps) {
  const showShimmer = variant === 'shimmer' || variant === 'gradient' || shimmer
  const isInactive = Boolean(disabled || loading)
  useKeyframes('nexara-button-keyframes', BUTTON_KEYFRAMES)

  const classes = cn(buttonVariants({ variant, size, radius }), className)

  const content = (
    <>
      {showShimmer ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[-20%] left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 motion-safe:group-hover:animate-[nexara-shimmer_0.9s_ease-out] motion-safe:group-focus-visible:animate-[nexara-shimmer_0.9s_ease-out]"
        />
      ) : null}
      <span className="relative z-10 inline-grid place-items-center">
        <span className={cn('col-start-1 row-start-1 inline-flex items-center gap-2', loading && 'invisible')}>
          {leftIcon ? <span className="inline-flex shrink-0">{leftIcon}</span> : null}
          <span>{children}</span>
          {rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
        </span>
        {loading ? (
          <span className="col-start-1 row-start-1 inline-flex items-center gap-2">
            <Spinner />
            <span className="sr-only">Loading</span>
          </span>
        ) : null}
      </span>
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
        aria-disabled={isInactive || undefined}
        aria-busy={loading || undefined}
        className={cn(classes, isInactive && 'pointer-events-none opacity-45')}
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
      className={classes}
      disabled={disabled}
      aria-disabled={isInactive || undefined}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (isInactive) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      }}
    >
      {content}
    </button>
  )
}
