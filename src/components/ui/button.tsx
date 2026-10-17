'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type MouseEvent, type ReactNode } from 'react'
import { cn, focusRing, useKeyframes } from '@/lib/utils.ts'

const BUTTON_KEYFRAMES = `
@keyframes nexara-shimmer {
  0% { transform: translateX(-140%); }
  100% { transform: translateX(140%); }
}
@keyframes nexara-beam {
  to { transform: rotate(1turn); }
}
@keyframes nexara-link-in {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
`

const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
    'transition-[transform,box-shadow,background-color,color,border-color,opacity] duration-200',
    'motion-safe:active:scale-[0.985]',
    focusRing,
    'disabled:pointer-events-none disabled:opacity-45',
  ].join(' '),
  {
    variants: {
      variant: {
        solid: 'bg-nx-fg text-nx-bg shadow-[var(--nx-shadow)]',
        soft: 'bg-nx-soft text-nx-accent',
        outline: 'border border-nx-line bg-transparent text-nx-fg hover:bg-nx-card',
        ghost: 'bg-transparent text-nx-muted hover:bg-nx-soft hover:text-nx-fg',
        glass: 'border border-nx-border bg-nx-glass text-nx-fg shadow-[var(--nx-shadow)] backdrop-blur-xl',
        gradient: 'border-0 bg-transparent text-white',
        destructive: 'bg-nx-danger text-white',
        split: 'gap-0 overflow-hidden bg-nx-fg p-0 text-nx-bg',
        social: 'justify-start gap-3 border border-nx-border bg-nx-card pr-5 pl-1.5 text-left text-nx-fg shadow-[var(--nx-shadow)]',
        icon: 'border border-nx-border bg-nx-card p-0 text-nx-fg',
        shimmer: 'overflow-hidden border border-white/10 bg-[#111113] text-white',
        beam: 'overflow-hidden bg-transparent p-0 text-nx-fg',
        link: 'bg-transparent px-0 text-nx-fg',
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-5 text-[15px]',
      },
      radius: {
        md: 'rounded-lg',
        lg: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      { variant: 'split', class: 'px-0' },
      { variant: 'beam', class: 'px-0' },
      { variant: 'link', class: 'h-auto rounded-none px-0 shadow-none' },
      { variant: 'icon', size: 'sm', class: 'size-9 px-0' },
      { variant: 'icon', size: 'md', class: 'size-10 px-0' },
      { variant: 'icon', size: 'lg', class: 'size-12 px-0' },
      { variant: 'social', class: 'h-12 rounded-2xl' },
      { variant: 'shimmer', class: 'rounded-full' },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      radius: 'lg',
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

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 7h8M7 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Button
 * Thirteen constructions: solid, soft tint, outline, ghost, glass, mesh
 * gradient, destructive, split well, social, icon, shimmer, border beam, link.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Button({
  className,
  variant,
  size,
  radius,
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
  const kind = variant ?? 'solid'
  const isInactive = Boolean(disabled || loading)
  useKeyframes('nexara-button-keyframes', BUTTON_KEYFRAMES)
  const classes = cn(buttonVariants({ variant: kind, size, radius }), className)

  const label = (
    <span className={cn('relative z-10 inline-flex items-center gap-2', loading && 'invisible')}>
      {kind !== 'split' && kind !== 'social' && kind !== 'icon' && leftIcon ? (
        <span className="inline-flex shrink-0">{leftIcon}</span>
      ) : null}
      {kind === 'icon' ? <span className="sr-only">{children}</span> : <span>{children}</span>}
      {kind !== 'link' && rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
    </span>
  )

  const content = (
    <>
      {kind === 'solid' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-px h-px bg-white/35 dark:bg-white/10" />
      ) : null}
      {kind === 'glass' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-1.5 h-px bg-white/70 dark:bg-white/20" />
      ) : null}
      {kind === 'gradient' ? (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,#4c46e0_0%,#7c6cff_42%,#22c5b0_100%)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'linear-gradient(135deg,#22c5b0 0%,#4c46e0 100%)' }}
          />
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-1 h-1/2 rounded-full bg-white/20 blur-[6px]" />
        </>
      ) : null}
      {kind === 'shimmer' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] motion-safe:animate-[nexara-shimmer_2.4s_ease_infinite]"
        />
      ) : null}
      {kind === 'beam' ? (
        <>
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-[240%] w-[240%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_90deg,#4c46e0,#22c5b0,#8b87ff,#4c46e0)] motion-safe:animate-[nexara-beam_3.6s_linear_infinite]"
          />
          <span aria-hidden="true" className="absolute inset-[1.5px] rounded-[inherit] bg-nx-card" />
        </>
      ) : null}
      {kind === 'split' ? (
        <span className="relative z-10 inline-flex h-full items-center self-stretch bg-nx-accent px-3 text-nx-accent-fg">
          {leftIcon ?? <ArrowIcon />}
        </span>
      ) : null}
      {kind === 'social' ? (
        <span className="relative z-10 inline-flex size-8 items-center justify-center rounded-lg bg-nx-bg text-nx-fg">
          {leftIcon ?? (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 1.5 9.4 6H14l-3.7 2.7 1.4 4.3L8 10.2 4.3 13l1.4-4.3L2 6h4.6L8 1.5Z" fill="currentColor" />
            </svg>
          )}
        </span>
      ) : null}
      {kind === 'icon' ? (
        <span className={cn('relative z-10', loading && 'invisible')}>{leftIcon ?? <ArrowIcon />}</span>
      ) : null}
      {kind === 'link' ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-nx-fg transition-transform duration-300 group-hover:scale-x-100 motion-safe:group-focus-visible:scale-x-100"
        />
      ) : null}
      <span
        className={cn(
          'relative z-10 inline-grid place-items-center',
          kind === 'social' && 'items-start text-left',
          kind === 'beam' && 'px-5',
        )}
      >
        {kind === 'social' ? (
          <span className={cn('col-start-1 row-start-1 flex flex-col leading-tight', loading && 'invisible')}>
            <span className="text-[10px] tracking-[0.14em] text-nx-muted uppercase">Continue with</span>
            <span className="text-sm text-nx-fg">{children}</span>
          </span>
        ) : kind === 'icon' ? (
          <span className="sr-only">{children}</span>
        ) : (
          label
        )}
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
        data-nexara="button"
        data-variant={kind}
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
      data-nexara="button"
      data-variant={kind}
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
