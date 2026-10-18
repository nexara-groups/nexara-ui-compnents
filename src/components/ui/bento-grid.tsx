'use client'

import { isWowVariant } from '@/lib/wow-variants.ts'
import { WowSignature } from './wow-lazy.tsx'

import { createContext, useContext, type PointerEvent, type ReactNode } from 'react'
import { MediaFrame, media } from '@/lib/media.tsx'
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
  chart: 'rounded-3xl border-nx-border bg-nx-card',
  quote: 'rounded-none border-0 bg-transparent',
  editorial: 'rounded-none border-x-0 border-t-0 border-b border-nx-line bg-transparent',
  terminal: 'rounded-lg border-white/10 bg-[#0c0d10] font-mono text-[#9be7c4]',
  schedule: 'rounded-2xl border-nx-border bg-nx-card',
  scoreboard: 'rounded-3xl border-nx-border bg-[#10241f] font-mono text-[#d9fff6]',
  stat: 'rounded-3xl border-nx-border bg-nx-elevated',
  compare: 'rounded-3xl border-nx-border bg-nx-card',
  media: 'rounded-[2rem] border-transparent bg-[#1a1420] p-0 text-white',
  calendar: 'rounded-3xl border-nx-border bg-nx-card',
  kanban: 'rounded-2xl border-nx-border bg-nx-card',
  invoice: 'rounded-xl border border-dashed border-nx-line bg-nx-bg font-mono',
} as const

export type BentoVariant = keyof typeof itemVariants | 'depth-mosaic' | 'shader-tile' | 'orbit-tile' | 'ticker-tile'

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

function BentoItemCore({
  title,
  description,
  icon,
  href,
  colSpan = 1,
  rowSpan = 1,
  variant = 'chart',
  spotlight = false,
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
    itemVariants[variant as keyof typeof itemVariants],
    colSpanClass[span],
    rowSpanClass[rowSpan],
    className,
  )

  const titleClass = cn(
    'font-serif text-xl leading-tight text-[#f6f3ec]',
    variant === 'scoreboard' && 'font-mono text-4xl',
    variant === 'stat' && 'text-4xl tracking-tight',
    variant === 'terminal' && 'font-mono text-base text-[#3ddec4]',
    variant === 'editorial' && 'text-3xl',
    variant === 'quote' && 'text-2xl',
    titleClassName,
  )
  const descriptionClass = cn(
    'relative z-10 mt-3 block text-sm leading-6 text-zinc-300',
    variant === 'scoreboard' && 'text-[#b7fff0]',
    variant === 'terminal' && 'text-[#b7fff0]',
    descriptionClassName,
  )
  const iconChip = icon ? (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center border border-white/10 bg-white/5 text-[#f6f3ec]',
        'rounded-2xl',
        variant === 'scoreboard' && 'border-[#3ddec4]/30 bg-[#06241d]',
      )}
    >
      {icon}
    </span>
  ) : null

  const body = (
    <>
      {showSpot ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(${spotlightSize / 2}px circle at var(--spot-x, 50%) var(--spot-y, 30%), ${spotlightColor}, transparent 70%)`,
          }}
        />
      ) : null}
      {variant === 'scoreboard' ? (
        <span className="relative z-10 grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-3">
          <span>
            <span className="block text-[10px] tracking-[0.16em] text-zinc-400 uppercase">Home</span>
            <span className="font-mono text-4xl text-[#f6f3ec]">2</span>
          </span>
          <span className="text-zinc-500">:</span>
          <span className="text-right">
            <span className="block text-[10px] tracking-[0.16em] text-zinc-400 uppercase">Away</span>
            <span className="font-mono text-4xl text-[#3ddec4]">{title}</span>
          </span>
        </span>
      ) : null}
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
      {variant === 'calendar' ? (
        <span className="relative z-10 block text-[#1c1915]">
          <span className="flex items-center justify-between text-xs tracking-[0.16em] uppercase">
            <span>March</span>
            <span>{title}</span>
          </span>
          <span className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px]">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <span key={`${day}-${index}`} className="text-[#8a8175]">{day}</span>
            ))}
            {Array.from({ length: 14 }, (_, index) => (
              <span key={index} className={cn('rounded-md py-1', index === 9 && 'bg-[#ff6a3d] text-[#1a100c]')}>
                {index + 1}
              </span>
            ))}
          </span>
        </span>
      ) : null}
      {variant === 'kanban' ? (
        <span className="relative z-10 flex h-full flex-col gap-2">
          <span className="text-xs tracking-[0.16em] text-zinc-400 uppercase">Doing</span>
          <span className="rounded-xl bg-white/5 p-3">
            <h3 className={cn(titleClass, 'text-base')}>{title}</h3>
          </span>
          <span className="rounded-xl bg-white/5 p-3 text-sm text-zinc-300">{description ?? 'Next pass'}</span>
        </span>
      ) : null}
      {variant === 'invoice' ? (
        <span className="relative z-10 block text-xs">
          <span className="flex justify-between border-b border-dashed border-white/20 pb-2">
            <span>Invoice</span>
            <span>04</span>
          </span>
          <span className="mt-3 flex justify-between">
            <span>{title}</span>
            <span>$48</span>
          </span>
          <span className="mt-2 flex justify-between text-zinc-400">
            <span>{description ?? 'Export'}</span>
            <span>$12</span>
          </span>
          <span className="mt-3 flex justify-between border-t border-white/15 pt-2 text-[#f5c16c]">
            <span>Due</span>
            <span>$60</span>
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
            {children ?? <MediaFrame src={media.featured} alt="" className="absolute inset-0" />}
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
      {variant !== 'chart' && variant !== 'quote' && variant !== 'compare' && variant !== 'calendar' && variant !== 'kanban' && variant !== 'invoice' && variant !== 'schedule' && variant !== 'media' && variant !== 'terminal' && variant !== 'stat' ? (
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

export function BentoItem(props: BentoItemProps) {
  if (isWowVariant('bento-grid', props.variant)) {
    return (
      <WowSignature
        family="bento-grid"
        variant={props.variant!}
        className={props.className}
        
       title={props.title} />
    )
  }
  return <BentoItemCore {...props} />
}
