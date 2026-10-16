'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type MouseEvent, type ReactNode } from 'react'
import { cn, useKeyframes } from '@/lib/utils.ts'

const BUTTON_KEYFRAMES = `
@keyframes nexara-beam {
  to { transform: rotate(1turn); }
}
`

const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    'disabled:pointer-events-none disabled:opacity-45',
  ].join(' '),
  {
    variants: {
      variant: {
        solid: 'bg-[#f6f3ec] text-[#16140f] motion-safe:active:scale-[0.98]',
        gradient: 'bg-transparent text-[#1a100c]',
        glass: 'border border-white/35 bg-white/10 text-[#f6f3ec] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl',
        neumorphic: 'border-0 bg-[#e6e1d6] text-[#3f3a32] shadow-[7px_7px_16px_#b7b1a6,-7px_-7px_16px_#ffffff]',
        pressable:
          'border-b-[6px] border-[#9a3412] bg-[#ff6a3d] text-[#1a100c] motion-safe:active:translate-y-[4px] motion-safe:active:border-b-[2px]',
        'glow-outline': 'bg-transparent text-[#d9fff6]',
        split: 'gap-0 overflow-hidden bg-[#f6f3ec] p-0 text-[#16140f]',
        'avatar-pill': 'bg-[#16141c] pl-1.5 text-[#f6f3ec] ring-1 ring-white/15',
        'border-beam': 'overflow-hidden bg-transparent p-0 text-[#f6f3ec]',
        brutalist: 'bg-transparent text-[#111]',
        skeuomorphic:
          'border border-[#efe6d8] bg-[linear-gradient(180deg,#fffaf3_0%,#cfc4b4_48%,#8d8478_100%)] text-[#241c14] shadow-[inset_0_1px_0_#fff,inset_0_-10px_14px_rgba(70,50,30,0.25)]',
        social: 'justify-start gap-3 bg-[#0f1117] pr-5 pl-2 text-left text-[#f6f3ec] ring-1 ring-white/15',
        segment: 'gap-0 overflow-hidden bg-[#f6f3ec] p-0 text-[#16140f]',
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
      { variant: 'split', class: 'px-0' },
      { variant: 'segment', class: 'px-0' },
      { variant: 'border-beam', class: 'px-0' },
      { variant: 'brutalist', class: 'rounded-none' },
      { variant: 'pressable', class: 'rounded-xl' },
      { variant: 'skeuomorphic', class: 'rounded-lg' },
      { variant: 'social', class: 'h-12 rounded-2xl' },
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
 * Thirteen constructions: flat fill, gel gradient, glass plate, neumorphic
 * extrusion, 3D lip, glow outline, split well, avatar pill, border beam,
 * brutalist slab, skeuomorphic plate, brand social, and a segmented chevron.
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
      {kind !== 'split' && kind !== 'social' && kind !== 'avatar-pill' && leftIcon ? (
        <span className="inline-flex shrink-0">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {kind !== 'segment' && rightIcon ? <span className="inline-flex shrink-0">{rightIcon}</span> : null}
    </span>
  )

  const content = (
    <>
      {kind === 'gradient' ? (
        <>
          <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,#ffd7bd_0%,#ff6a3d_48%,#c2410c_100%)]" />
          <span aria-hidden="true" className="absolute inset-x-3 top-1 h-[42%] rounded-full bg-white/45" />
        </>
      ) : null}
      {kind === 'glass' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-1.5 h-px bg-white/80" />
      ) : null}
      {kind === 'neumorphic' ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-1 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]" />
      ) : null}
      {kind === 'glow-outline' ? (
        <>
          <span aria-hidden="true" className="absolute -inset-1 rounded-[inherit] border border-[#3ddec4]/50 blur-[2px]" />
          <span aria-hidden="true" className="absolute inset-0 rounded-[inherit] border border-[#3ddec4] shadow-[0_0_18px_#3ddec4]" />
        </>
      ) : null}
      {kind === 'border-beam' ? (
        <>
          <span aria-hidden="true" className="absolute top-1/2 left-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_90deg,#3ddec4,#ff6a3d,#8b7cff,#f5c16c,#3ddec4)] motion-safe:animate-[nexara-beam_4s_linear_infinite]" />
          <span aria-hidden="true" className="absolute inset-[2px] rounded-[inherit] bg-[#12131c]" />
        </>
      ) : null}
      {kind === 'brutalist' ? (
        <>
          <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#111]" />
          <span aria-hidden="true" className="absolute inset-0 border-[3px] border-[#111] bg-[#f5c16c]" />
        </>
      ) : null}
      {kind === 'split' ? (
        <span className="relative z-10 inline-flex h-full items-center self-stretch bg-[#ff6a3d] px-3 text-[#1a100c]">
          {leftIcon ?? <ArrowIcon />}
        </span>
      ) : null}
      {kind === 'avatar-pill' ? (
        <span className="relative z-10 inline-flex size-7 items-center justify-center rounded-full bg-[#ff6a3d] text-[11px] font-semibold text-[#1a100c]">
          {leftIcon ?? 'N'}
        </span>
      ) : null}
      {kind === 'skeuomorphic' ? (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute top-1.5 left-2 size-1.5 rounded-full bg-[#5c5348] shadow-[inset_0_1px_1px_rgba(0,0,0,0.6),0_1px_0_#fff]" />
          <span aria-hidden="true" className="pointer-events-none absolute top-1.5 right-2 size-1.5 rounded-full bg-[#5c5348] shadow-[inset_0_1px_1px_rgba(0,0,0,0.6),0_1px_0_#fff]" />
        </>
      ) : null}
      {kind === 'social' ? (
        <span className="relative z-10 inline-flex size-8 items-center justify-center rounded-lg bg-[#f6f3ec] text-[#16140f]">
          {leftIcon ?? (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 1.5 9.4 6H14l-3.7 2.7 1.4 4.3L8 10.2 4.3 13l1.4-4.3L2 6h4.6L8 1.5Z" fill="currentColor" />
            </svg>
          )}
        </span>
      ) : null}
      <span className={cn('relative z-10 inline-grid place-items-center', kind === 'social' && 'items-start text-left', kind === 'border-beam' && 'px-5')}>
        {kind === 'social' ? (
          <span className={cn('col-start-1 row-start-1 flex flex-col leading-tight', loading && 'invisible')}>
            <span className="text-[10px] tracking-[0.14em] text-zinc-400 uppercase">Continue with</span>
            <span className="text-sm">{children}</span>
          </span>
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
      {kind === 'avatar-pill' ? (
        <svg className="relative z-10 ml-1" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M5 3.5 8.5 7 5 10.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : null}
      {kind === 'segment' ? (
        <span className="relative z-10 inline-flex h-full items-center self-stretch border-l border-[#16140f]/15 px-3">
          {rightIcon ?? (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </span>
      ) : null}
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
