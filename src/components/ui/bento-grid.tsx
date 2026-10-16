'use client'

import { createContext, useContext, type PointerEvent, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const BentoColumns = createContext(3)

const columnClass = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
} as const

const colSpanClass = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
} as const

const rowSpanClass = {
  1: 'md:row-span-1',
  2: 'md:row-span-2',
} as const

export interface BentoGridProps {
  children: ReactNode
  className?: string
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

const gapClass = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-5',
} as const

/**
 * BentoGrid
 * Responsive mosaic. On small screens every item spans one column.
 */
export function BentoGrid({ children, className, columns = 3, gap = 'md' }: BentoGridProps) {
  return (
    <div
      data-nexara="bento-grid"
      className={cn(
        'grid grid-cols-1 md:auto-rows-[minmax(11rem,auto)]',
        columnClass[columns],
        gapClass[gap],
        className,
      )}
    >
      <BentoColumns.Provider value={columns}>{children}</BentoColumns.Provider>
    </div>
  )
}

const itemVariants = {
  spotlight: 'rounded-3xl border-white/10 bg-[#12131b] hover:border-white/20',
  chart: 'rounded-3xl border-white/10 bg-[#10141c]',
  quote: 'rounded-none border-0 bg-transparent',
  editorial: 'rounded-none border-x-0 border-t-0 border-b border-white/20 bg-transparent',
  terminal: 'rounded-lg border-[#3ddec4]/40 bg-[#07110f] font-mono',
  schedule: 'rounded-2xl border-white/15 bg-[#14151f]',
  poster: 'rounded-none border-0 bg-[#140e0c] text-[#f6f3ec]',
  stat: 'rounded-3xl border-white/10 bg-[#10131c]',
  status: 'rounded-2xl border-[#3ddec4]/40 bg-[#071410]',
  compare: 'rounded-3xl border-white/10 bg-[#12141c]',
  media: 'rounded-[2rem] border-transparent bg-[#1a1420] p-0',
  brutal: 'rounded-md border-2 border-[#f6f3ec] bg-[#14151f] shadow-[6px_6px_0_0_#f6f3ec]',
} as const

export type BentoVariant = keyof typeof itemVariants

export interface BentoItemProps {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  href?: string
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2
  variant?: BentoVariant
  spotlight?: boolean
  spotlightColor?: string
  /** Diameter of the pointer wash, in pixels. */
  spotlightSize?: number
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  children?: ReactNode
}

export function BentoItem({
  title,
  description,
  icon,
  href,
  colSpan = 1,
  rowSpan = 1,
  variant = 'spotlight',
  spotlight = true,
  spotlightColor = 'rgba(255, 106, 61, 0.35)',
  spotlightSize = 280,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: BentoItemProps) {
  const columns = useContext(BentoColumns)
  const reduced = usePrefersReducedMotion()
  const span = Math.min(colSpan, columns) as 1 | 2 | 3 | 4
  const showSpot = spotlight && !reduced

  function writeSpot(event: PointerEvent<HTMLElement>) {
    if (!showSpot) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  const classes = cn(
    'group relative flex h-full flex-col overflow-hidden border p-5 text-left',
    'transition-[transform,border-color] duration-300 motion-safe:hover:-translate-y-0.5',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
    itemVariants[variant],
    colSpanClass[span],
    rowSpanClass[rowSpan],
    className,
  )

  const titleClass = cn(
    'font-serif text-xl leading-tight text-[#f6f3ec]',
    variant === 'poster' && 'text-3xl',
    variant === 'stat' && 'text-4xl tracking-tight',
    variant === 'terminal' && 'font-mono text-base text-[#3ddec4]',
    variant === 'editorial' && 'text-3xl',
    variant === 'quote' && 'text-2xl',
    titleClassName,
  )
  const descriptionClass = cn(
    'relative z-10 mt-3 block text-sm leading-6 text-zinc-300',
    variant === 'poster' && 'text-zinc-200',
    variant === 'terminal' && 'text-[#b7fff0]',
    descriptionClassName,
  )
  const iconChip = icon ? (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center border border-white/10 bg-white/5 text-[#f6f3ec]',
        variant === 'brutal' ? 'rounded-sm' : 'rounded-2xl',
        variant === 'poster' && 'border-white/20 bg-black/30 text-[#f6f3ec]',
      )}
    >
      {icon}
    </span>
  ) : null

  const body = (
    <>
      {showSpot && variant === 'spotlight' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(${spotlightSize / 2}px circle at var(--spot-x, 50%) var(--spot-y, 30%), ${spotlightColor}, transparent 70%)`,
          }}
        />
      ) : null}
      {variant === 'poster' ? <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" /> : null}
      {variant === 'chart' ? (
        <span className="relative z-10 mt-auto block">
          <span className="mb-3 flex items-center gap-3">
            {iconChip}
            <h3 className={titleClass}>{title}</h3>
          </span>
          <svg viewBox="0 0 120 36" className="h-9 w-full" aria-hidden="true">
            <polyline fill="none" stroke="#3ddec4" strokeWidth="2" points="0,28 16,24 32,26 48,14 64,18 80,8 96,12 120,4" />
          </svg>
          {description ? <span className={descriptionClass}>{description}</span> : null}
        </span>
      ) : null}
      {variant === 'quote' ? (
        <span className="relative z-10 block">
          <span aria-hidden="true" className="font-serif text-5xl leading-none text-[#f5c16c]">“</span>
          <h3 className={titleClass}>{title}</h3>
          {description ? <span className={cn(descriptionClass, 'text-[#f5c16c]')}>— {description}</span> : null}
        </span>
      ) : null}
      {variant === 'compare' ? (
        <span className="relative z-10 grid flex-1 grid-cols-2 gap-3">
          <span className="rounded-2xl bg-white/5 p-3">
            <span className="text-[10px] tracking-[0.16em] text-zinc-400 uppercase">Before</span>
            <h3 className={cn(titleClass, 'mt-2 text-lg')}>{title}</h3>
          </span>
          <span className="rounded-2xl bg-[#3ddec4]/15 p-3">
            <span className="text-[10px] tracking-[0.16em] text-[#3ddec4] uppercase">After</span>
            {description ? <span className={cn(descriptionClass, 'text-[#f6f3ec]')}>{description}</span> : null}
          </span>
        </span>
      ) : null}
      {variant === 'status' ? (
        <span className="relative z-10 flex items-start gap-3">
          <span className="relative mt-1 inline-flex size-3">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-[#3ddec4] opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-3 rounded-full bg-[#3ddec4]" />
          </span>
          <span>
            <h3 className={titleClass}>{title}</h3>
            {description ? <span className={descriptionClass}>{description}</span> : null}
          </span>
        </span>
      ) : null}
      {variant === 'schedule' ? (
        <span className="relative z-10 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
          <span className="border-r border-dashed border-white/20 pr-3 font-mono text-xs text-[#f5c16c]">09:40</span>
          <span>
            <h3 className={titleClass}>{title}</h3>
            {description ? <span className={descriptionClass}>{description}</span> : null}
          </span>
        </span>
      ) : null}
      {variant === 'media' ? (
        <span className="relative z-10 flex h-full flex-col">
          <span className="relative min-h-24 flex-1 overflow-hidden">
            {children}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1a1420] to-transparent" />
          </span>
          <span className="px-5 pb-5">
            <h3 className={titleClass}>{title}</h3>
            {description ? <span className={descriptionClass}>{description}</span> : null}
          </span>
        </span>
      ) : null}
      {variant === 'terminal' ? (
        <span className="relative z-10 block font-mono">
          <span className="text-xs text-zinc-500">~/nexara</span>
          <h3 className={titleClass}>
            <span className="text-[#f5c16c]">› </span>
            {title}
          </h3>
          {description ? <span className={descriptionClass}>{description}</span> : null}
        </span>
      ) : null}
      {variant === 'stat' ? (
        <span className="relative z-10 mt-auto block">
          <h3 className={titleClass}>{title}</h3>
          {description ? <span className={descriptionClass}>{description}</span> : null}
          {icon ? <span className="mt-3 inline-flex text-sm text-[#3ddec4]">{icon}</span> : null}
        </span>
      ) : null}
      {variant !== 'chart' && variant !== 'quote' && variant !== 'compare' && variant !== 'status' && variant !== 'schedule' && variant !== 'media' && variant !== 'terminal' && variant !== 'stat' ? (
        <>
          <span className="relative z-10 mt-auto flex items-start gap-3">
            {variant === 'editorial' ? null : iconChip}
            <h3 className={titleClass}>{title}</h3>
          </span>
          {description ? <span className={descriptionClass}>{description}</span> : null}
          {children ? <span className="relative z-10 mt-4 block">{children}</span> : null}
        </>
      ) : null}
    </>
  )

  if (href) {
    return (
      <a data-nexara="bento-item" data-variant={variant} href={href} className={classes} onPointerEnter={writeSpot} onPointerMove={writeSpot}>
        {body}
      </a>
    )
  }

  return (
    <div data-nexara="bento-item" data-variant={variant} className={classes} onPointerEnter={writeSpot} onPointerMove={writeSpot}>
      {body}
    </div>
  )
}
