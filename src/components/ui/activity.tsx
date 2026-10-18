'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'feed',
  'compact',
  'chat',
  'audit',
  'tickets',
  'care',
  'sports',
  'deploy',
  'mentions',
  'files',
  'timeline',
  'digest',
] as const

export type ActivityVariant = (typeof VARIANTS)[number]

export interface ActivityProps {
  variant?: ActivityVariant
  className?: string
}

const events = [
  { who: 'Latha', text: 'moved Wren Build to Review', time: '2m', kind: 'board' },
  { who: 'Dr. Rao', text: 'closed therapy session 14', time: '11m', kind: 'care' },
  { who: 'Suresh', text: 'uploaded gas book for Bay 04', time: '1h', kind: 'file' },
  { who: 'Coach V', text: 'posted Heat 3 times', time: '2h', kind: 'sport' },
  { who: 'North OS', text: 'deployed harbor.studio', time: '4h', kind: 'deploy' },
]

/**
 * Activity
 * Twelve feeds for agency, clinic, plant, and association desks.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Activity({ variant = 'feed', className }: ActivityProps) {
  return (
    <section data-nexara="activity" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'chat' ? (
        <div className="space-y-2">
          {events.slice(0, 3).map((event) => (
            <article key={event.text} className="max-w-sm rounded-2xl bg-nx-elevated px-3 py-2 text-sm">
              <p className="text-xs text-nx-muted">{event.who}</p>
              <p>{event.text}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'audit' ? (
        <ol className="font-mono text-xs leading-6 text-nx-muted">
          {events.map((event) => (
            <li key={event.text}>
              [{event.time}] {event.who} {event.text}
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'timeline' ? (
        <ol className="relative space-y-4 border-l border-nx-line pl-5">
          {events.map((event) => (
            <li key={event.text}>
              <span className="absolute -left-[5px] mt-1.5 size-2 rounded-full bg-nx-fg" />
              <p className="text-sm">{event.text}</p>
              <p className="text-xs text-nx-muted">
                {event.who} · {event.time}
              </p>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'digest' ? (
        <div className="rounded-[1.3rem] border border-nx-border p-4">
          <p className="text-xs text-nx-muted">Today</p>
          <p className="mt-2 font-serif text-2xl">{events.length} movements</p>
          <p className="mt-2 text-sm text-nx-muted">{events[0]!.text}</p>
        </div>
      ) : null}

      {variant !== 'chat' && variant !== 'audit' && variant !== 'timeline' && variant !== 'digest' ? (
        <ul className={cn('space-y-3', variant === 'compact' && 'space-y-1.5')}>
          {events
            .filter((event) => {
              if (variant === 'care') return event.kind === 'care'
              if (variant === 'sports') return event.kind === 'sport'
              if (variant === 'deploy') return event.kind === 'deploy'
              if (variant === 'files') return event.kind === 'file'
              if (variant === 'tickets' || variant === 'mentions') return true
              return true
            })
            .map((event) => (
              <li key={event.text} className="flex items-start justify-between gap-3 text-sm">
                <div>
                  <p>
                    <span className="font-medium">{event.who}</span> {event.text}
                  </p>
                  {variant === 'tickets' ? <p className="text-xs text-nx-accent">Ticket NX-18</p> : null}
                </div>
                <span className="text-xs text-nx-muted">{event.time}</span>
              </li>
            ))}
        </ul>
      ) : null}
    </section>
  )
}
