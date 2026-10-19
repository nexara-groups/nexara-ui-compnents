'use client'

import { isWowVariant } from '@/lib/wow-variants.ts'
import { WowSignature } from './wow-lazy.tsx'

import { useMemo, useState } from 'react'
import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'filter',
  'compact',
  'invoices',
  'patients',
  'jobs',
  'athletes',
  'leads',
  'inventory',
  'tickets',
  'dense',
  'grouped',
  'export',
  'row-stagger',
  'morph-cards',
  'heat-cells',
  'odometer-cells',
] as const

export type DataTableVariant = (typeof VARIANTS)[number]

export interface DataTableProps {
  variant?: DataTableVariant
  className?: string
}

const rows = [
  { name: 'Wren Build', kind: 'Lead', status: 'Open', amount: '₹2.4 L', owner: 'Latha' },
  { name: 'Meera Shah', kind: 'Patient', status: 'Therapy', amount: '—', owner: 'Dr. Rao' },
  { name: 'Harbor Hall', kind: 'Event', status: 'Booked', amount: '—', owner: 'Coach V' },
  { name: 'VRF Bay 04', kind: 'Job', status: 'Commission', amount: '₹18 L', owner: 'Suresh' },
  { name: 'Solum Q3', kind: 'Invoice', status: 'Due', amount: '₹86k', owner: 'Finance' },
  { name: 'Ananya Rao', kind: 'Athlete', status: 'Gold', amount: '—', owner: 'Coastal' },
]

/**
 * Data table
 * Twelve filterable tables for portals: invoices, patients, jobs, athletes.
 * Copy this file plus `src/lib/utils.ts`.
 */
function DataTableCore({ variant = 'filter', className }: DataTableProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const filtered = useMemo(() => {
    return rows.filter((row) => {
      const hay = `${row.name} ${row.kind} ${row.status} ${row.owner}`.toLowerCase()
      const matchQuery = hay.includes(query.toLowerCase())
      const matchStatus = status === 'All' || row.status === status
      return matchQuery && matchStatus
    })
  }, [query, status])

  const dense = variant === 'compact' || variant === 'dense'
  const showAmount = variant === 'invoices' || variant === 'jobs' || variant === 'export'

  return (
    <div data-nexara="data-table" data-variant={variant} className={cn('overflow-x-auto rounded-[1.4rem] border border-nx-border bg-nx-card', className)}>
      {variant !== 'compact' ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-nx-border p-3">
          <input
            className={cn(focusRing, 'h-11 min-w-0 flex-1 rounded-lg border border-nx-line bg-nx-bg px-3 text-sm')}
            placeholder={placeholder(variant)}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filter rows"
          />
          {variant === 'filter' || variant === 'grouped' || variant === 'leads' ? (
            <select
              className={cn(focusRing, 'h-11 rounded-lg border border-nx-line bg-nx-bg px-2 text-sm')}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="Status"
            >
              {['All', 'Open', 'Due', 'Booked', 'Therapy'].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          ) : null}
          {variant === 'export' ? (
            <button type="button" className={cn(focusRing, 'inline-flex h-11 items-center rounded-lg bg-nx-fg px-3 text-xs text-nx-bg')}>
              Export CSV
            </button>
          ) : null}
        </div>
      ) : null}
      <ul className="divide-y divide-nx-border md:hidden">
        {(variant === 'patients' ? rows.filter((row) => row.kind === 'Patient' || row.kind === 'Athlete') : filtered).map((row) => (
          <li key={row.name} className="px-3 py-3">
            <p className="font-medium">{row.name}</p>
            <p className="mt-1 text-sm text-nx-muted">{row.kind} · {row.status}</p>
            <p className="mt-1 text-sm">{showAmount ? row.amount : row.owner}</p>
          </li>
        ))}
      </ul>
      <table className={cn('hidden w-full text-left text-sm md:table', dense && 'text-xs')}>
        <caption className="sr-only">Desk rows</caption>
        <thead className="bg-nx-elevated text-[11px] tracking-[0.12em] text-nx-muted uppercase">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th>Kind</th>
            <th>Status</th>
            {showAmount ? <th>Amount</th> : <th>Owner</th>}
          </tr>
        </thead>
        <tbody>
          {(variant === 'patients' ? rows.filter((row) => row.kind === 'Patient' || row.kind === 'Athlete') : filtered).map((row) => (
            <tr key={row.name} className="border-t border-nx-border">
              <td className="px-3 py-2.5 font-medium">{row.name}</td>
              <td className="text-nx-muted">{row.kind}</td>
              <td>
                <span className="rounded-full bg-nx-soft px-2 py-0.5 text-[11px] text-nx-accent">{row.status}</span>
              </td>
              <td className="pr-3">{showAmount ? row.amount : row.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function placeholder(variant: DataTableVariant) {
  if (variant === 'patients') return 'Search patients'
  if (variant === 'jobs') return 'Search plant jobs'
  if (variant === 'athletes') return 'Search athletes'
  if (variant === 'invoices') return 'Search invoices'
  if (variant === 'tickets') return 'Search tickets'
  if (variant === 'inventory') return 'Search SKUs'
  return 'Filter the desk'
}

export function DataTable(props: DataTableProps) {
  if (isWowVariant('data-table', props.variant)) {
    return (
      <WowSignature
        family="data-table"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <DataTableCore {...props} />
}
