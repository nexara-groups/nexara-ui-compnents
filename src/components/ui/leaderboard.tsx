'use client'

import { MediaFrame, faces } from '@/lib/media.tsx'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'medals',
  'table',
  'podium',
  'clubs',
  'tally',
  'heat',
  'compact',
  'nation',
  'age',
  'live',
  'points',
  'disciplines',
] as const

export type LeaderboardVariant = (typeof VARIANTS)[number]

export interface LeaderboardProps {
  variant?: LeaderboardVariant
  className?: string
}

const rows = [
  { rank: 1, name: 'Ananya Rao', club: 'Coastal Speed', gold: 4, silver: 1, bronze: 0, points: 38, nation: 'IND', age: 'U16' },
  { rank: 2, name: 'Vikram Setty', club: 'Coastal Rollers', gold: 3, silver: 2, bronze: 1, points: 34, nation: 'IND', age: 'U19' },
  { rank: 3, name: 'Meera Iyer', club: 'Harbor Ice', gold: 2, silver: 2, bronze: 2, points: 28, nation: 'IND', age: 'Open' },
  { rank: 4, name: 'Rahul Naidu', club: 'North Track', gold: 1, silver: 3, bronze: 1, points: 22, nation: 'IND', age: 'U16' },
  { rank: 5, name: 'Sana Mir', club: 'Field Club', gold: 1, silver: 1, bronze: 3, points: 18, nation: 'IND', age: 'U14' },
]

const clubs = [
  { name: 'Coastal Speed', points: 112 },
  { name: 'Coastal Rollers', points: 98 },
  { name: 'Harbor Ice', points: 86 },
  { name: 'North Track', points: 71 },
]

const discs = ['Speed 500m', 'Speed 1000m', 'Relay', 'Artistic', 'Inline hockey']

/**
 * Leaderboard
 * Twelve medal-tally and ranking constructions from association sites.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Leaderboard({ variant = 'medals', className }: LeaderboardProps) {
  return (
    <section data-nexara="leaderboard" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'medals' ? (
        <div className="overflow-x-auto rounded-[1.4rem] border border-nx-border">
          <table className="w-full min-w-[20rem] text-left text-sm">
            <thead className="bg-nx-elevated text-[11px] tracking-[0.14em] text-nx-muted uppercase">
              <tr>
                <th className="px-4 py-3">Athlete</th>
                <th className="px-2 py-3">G</th>
                <th className="px-2 py-3">S</th>
                <th className="px-2 py-3">B</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-t border-nx-border">
                  <td className="px-4 py-3">
                    <span className="mr-2 text-nx-muted">{row.rank}</span>
                    {row.name}
                  </td>
                  <td className="px-2 py-3 text-[#b8860b]">{row.gold}</td>
                  <td className="px-2 py-3 text-nx-muted">{row.silver}</td>
                  <td className="px-2 py-3 text-[#b45309]">{row.bronze}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {variant === 'table' ? (
        <div className="overflow-x-auto rounded-[1.4rem] border border-nx-border">
          <ul className="divide-y divide-nx-border md:hidden">
            {rows.map((row) => (
              <li key={row.name} className="px-4 py-3">
                <p className="font-medium">{row.rank}. {row.name}</p>
                <p className="mt-1 text-sm text-nx-muted">{row.club} · {row.points} pts</p>
              </li>
            ))}
          </ul>
          <table className="hidden w-full min-w-[32rem] text-left text-sm md:table">
            <thead className="bg-nx-elevated text-xs text-nx-muted">
              <tr>
                <th className="px-4 py-3">#</th>
                <th>Name</th>
                <th>Club</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-t border-nx-border">
                  <td className="px-4 py-3">{row.rank}</td>
                  <td>{row.name}</td>
                  <td className="text-nx-muted">{row.club}</td>
                  <td className="pr-4 font-medium">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {variant === 'podium' ? (
        <div className="flex items-end justify-center gap-3">
          {[rows[1], rows[0], rows[2]].map((row, index) => (
            <article
              key={row!.name}
              className={cn(
                'w-28 rounded-t-2xl border border-nx-border bg-nx-card p-3 text-center',
                index === 1 ? 'h-40 bg-nx-fg text-nx-bg' : 'h-32',
              )}
            >
              <MediaFrame src={faces[index].src} alt="" grain={false} className="mx-auto size-10 rounded-full" />
              <p className="mt-2 font-serif text-2xl">{row!.rank}</p>
              <p className="mt-1 text-xs">{row!.name}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'clubs' ? (
        <ol className="space-y-2">
          {clubs.map((club, index) => (
            <li key={club.name} className="flex items-center justify-between rounded-2xl border border-nx-border px-4 py-3">
              <span>
                <span className="mr-3 text-nx-muted">{index + 1}</span>
                {club.name}
              </span>
              <span className="font-mono text-sm">{club.points}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'tally' ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Gold', rows.reduce((sum, row) => sum + row.gold, 0), '#b8860b'],
            ['Silver', rows.reduce((sum, row) => sum + row.silver, 0), '#8a8a86'],
            ['Bronze', rows.reduce((sum, row) => sum + row.bronze, 0), '#b45309'],
          ].map(([label, value, color]) => (
            <article key={label} className="rounded-[1.3rem] border border-nx-border p-5">
              <p className="text-xs uppercase" style={{ color: String(color) }}>
                {label}
              </p>
              <p className="mt-2 font-serif text-4xl">{value}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'heat' ? (
        <ol className="space-y-2">
          {rows.slice(0, 4).map((row) => (
            <li key={row.name} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3">
              <span className="text-nx-muted">{row.rank}</span>
              <div>
                <p className="text-sm">{row.name}</p>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-nx-elevated">
                  <div className="h-full bg-nx-accent" style={{ width: `${row.points * 2.4}%` }} />
                </div>
              </div>
              <span className="font-mono text-xs">{row.points}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'compact' ? (
        <ul className="divide-y divide-nx-border rounded-2xl border border-nx-border">
          {rows.slice(0, 3).map((row) => (
            <li key={row.name} className="flex justify-between px-4 py-2 text-sm">
              <span>{row.name}</span>
              <span className="text-nx-muted">
                {row.gold}G {row.silver}S
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'nation' ? (
        <div className="rounded-[1.4rem] bg-[#111113] p-5 text-white">
          <p className="text-[11px] tracking-[0.18em] text-[#c8ff4d] uppercase">National tally</p>
          {rows.slice(0, 3).map((row) => (
            <p key={row.name} className="mt-3 flex justify-between text-sm">
              <span>
                {row.nation} · {row.name}
              </span>
              <span>{row.gold + row.silver + row.bronze}</span>
            </p>
          ))}
        </div>
      ) : null}

      {variant === 'age' ? (
        <div className="grid gap-3 md:grid-cols-3">
          {['U14', 'U16', 'U19'].map((age) => (
            <article key={age} className="rounded-2xl border border-nx-border p-4">
              <p className="text-xs text-nx-muted">{age}</p>
              <p className="mt-2 font-medium">{rows.find((row) => row.age === age)?.name ?? 'Open lane'}</p>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'live' ? (
        <div className="rounded-[1.4rem] border border-nx-ok/30 bg-nx-card p-5">
          <p className="text-xs text-nx-ok">Live · Heat 3</p>
          <ol className="mt-3 space-y-2">
            {rows.slice(0, 3).map((row) => (
              <li key={row.name} className="flex justify-between text-sm">
                <span>{row.name}</span>
                <span className="font-mono">{row.points}.12</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {variant === 'points' ? (
        <div>
          <h3 className="font-serif text-2xl">Season points</h3>
          <ol className="mt-4 space-y-3">
            {rows.map((row) => (
              <li key={row.name} className="flex items-baseline justify-between border-b border-nx-border pb-2">
                <span>{row.name}</span>
                <span className="font-serif text-2xl">{row.points}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {variant === 'disciplines' ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {discs.map((name, index) => (
            <article key={name} className="flex items-center justify-between rounded-2xl border border-nx-border px-4 py-3">
              <span>{name}</span>
              <span className="text-xs text-nx-muted">{rows[index % rows.length]!.name}</span>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
