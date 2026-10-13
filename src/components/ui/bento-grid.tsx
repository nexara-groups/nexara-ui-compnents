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

export interface BentoItemProps {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  href?: string
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2
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
    'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#12131b] p-5 text-left',
    'transition-[transform,border-color] duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/20',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
    colSpanClass[span],
    rowSpanClass[rowSpan],
    className,
  )

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
      <span className="relative z-10 flex items-start gap-3">
        {icon ? (
          <span aria-hidden="true" className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#f5c16c]">
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <h3 className={cn('font-serif text-xl leading-tight text-[#f6f3ec]', titleClassName)}>{title}</h3>
        </span>
      </span>
      {description ? (
        <span className={cn('relative z-10 mt-3 block text-sm leading-6 text-zinc-300', descriptionClassName)}>
          {description}
        </span>
      ) : null}
      {children ? <span className="relative z-10 mt-4 block">{children}</span> : null}
    </>
  )

  if (href) {
    return (
      <a data-nexara="bento-item" href={href} className={classes} onPointerEnter={writeSpot} onPointerMove={writeSpot}>
        {body}
      </a>
    )
  }

  return (
    <div data-nexara="bento-item" className={classes} onPointerEnter={writeSpot} onPointerMove={writeSpot}>
      {body}
    </div>
  )
}
