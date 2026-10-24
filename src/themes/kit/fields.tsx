'use client'

import { filterOptions, stepCalendar, stepCursor } from '@/themes/kit/keys.ts'
import { useLevel, usePersonality } from '@/themes/kit/level.ts'
import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

function Frame({ children, hot }: { children: ReactNode; hot: boolean }) {
  const personality = usePersonality()
  const level = useLevel()
  const moving = level !== 'off'
  let transform = 'none'
  let radius = 'var(--nx-radius)'
  let rule = 'scaleX(0)'
  if (moving && personality === 'liquid') radius = hot ? '12px' : '24px'
  if (moving && personality === 'tactile' && hot) transform = 'scaleX(1.08) scaleY(0.92)'
  const counter = moving && personality === 'tactile' && hot ? 'scaleX(0.926) scaleY(1.087)' : 'none'
  if (personality === 'technical') rule = moving && hot ? 'scaleX(1)' : 'scaleX(0)'
  if (personality === 'editorial') rule = moving && hot ? 'translateY(0)' : 'translateY(4px)'
  return (
    <div
      className="nx-frame relative"
      style={{
        borderRadius: radius,
        border: '1px solid var(--nx-line)',
        background: 'var(--nx-surface)',
        transform,
        outline: hot ? '2px solid var(--nx-ring)' : 'none',
        outlineOffset: 2,
        transition: level === 'off' ? 'none' : 'transform 140ms cubic-bezier(0.34, 1.7, 0.64, 1), border-radius 280ms var(--nx-ease)',
      }}
    >
      <div style={{ transform: counter, transition: level === 'off' ? 'none' : 'transform 140ms cubic-bezier(0.34, 1.7, 0.64, 1)' }}>{children}</div>
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px origin-left"
        style={{
          background: personality === 'editorial' ? 'var(--nx-mark)' : personality === 'cinematic' ? 'var(--nx-mark)' : 'var(--nx-fg)',
          transform: personality === 'editorial' || personality === 'technical' ? rule : 'scaleX(0)',
          opacity: personality === 'cinematic' ? (hot ? 1 : 0) : personality === 'editorial' ? (hot ? 1 : 0) : 1,
          transition: level === 'off' ? 'none' : 'transform 140ms linear, opacity 140ms linear',
        }}
      />
    </div>
  )
}

const fieldClass = 'min-h-11 w-full bg-transparent px-3 text-base outline-none'

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  error,
  hint,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'number'
  error?: string
  hint?: string
}) {
  const id = useId()
  const [hot, setHot] = useState(false)
  const described = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="mb-1 block">{label}</span>
      <Frame hot={hot}>
        <input
          id={id}
          className={fieldClass}
          style={{ borderRadius: 'var(--nx-radius)', background: 'transparent', color: 'var(--nx-fg)' }}
          type={type}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={described}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setHot(true)}
          onBlur={() => setHot(false)}
        />
      </Frame>
      {hint && !error ? <span id={`${id}-hint`} className="mt-1 block text-xs" style={{ color: 'var(--nx-muted)' }}>{hint}</span> : null}
      {error ? <span id={`${id}-error`} className="mt-1 block text-xs" style={{ color: 'var(--nx-fg)' }}>{error}</span> : null}
    </label>
  )
}

export function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = useId()
  const [hot, setHot] = useState(false)
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="mb-1 block">{label}</span>
      <Frame hot={hot}>
        <textarea
          id={id}
          className="min-h-28 w-full bg-transparent px-3 py-3 text-base outline-none"
          style={{ borderRadius: 'var(--nx-radius)', background: 'transparent', color: 'var(--nx-fg)' }}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setHot(true)}
          onBlur={() => setHot(false)}
        />
      </Frame>
    </label>
  )
}

export function PasswordField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [shown, setShown] = useState(false)
  const id = useId()
  return (
    <div className="text-sm">
      <span className="mb-1 block" id={`${id}-label`}>{label}</span>
      <div className="flex gap-2">
        <input
          id={id}
          aria-labelledby={`${id}-label`}
          className={fieldClass}
          style={{ borderRadius: 'var(--nx-radius)', border: '1px solid var(--nx-line)', background: 'var(--nx-surface)', color: 'var(--nx-fg)' }}
          type={shown ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button type="button" className="min-h-11 min-w-11 px-3" style={{ border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }} aria-pressed={shown} onClick={() => setShown((value) => !value)}>
          {shown ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  )
}

export function SearchField({ label, value, onChange, onSubmit }: { label: string; value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  const id = useId()
  return (
    <div className="flex gap-2">
      <label className="block min-w-0 flex-1 text-sm" htmlFor={id}>
        <span className="mb-1 block">{label}</span>
        <input id={id} className={fieldClass} style={{ borderRadius: 'var(--nx-radius)', border: '1px solid var(--nx-line)', background: 'var(--nx-surface)', color: 'var(--nx-fg)' }} type="search" value={value} onChange={(event) => onChange(event.target.value)} />
      </label>
      <button type="button" className="mt-6 min-h-11 px-4" style={{ background: 'var(--nx-accent)', color: 'var(--nx-accent-fg)', borderRadius: 'var(--nx-radius)' }} onClick={onSubmit}>
        Search
      </button>
    </div>
  )
}

export function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(() => Math.max(0, options.indexOf(value)))
  return (
    <div className="text-sm">
      <span className="mb-1 block" id={id}>{label}</span>
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between px-3 text-left"
        style={{ border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)', background: 'var(--nx-surface)' }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={id}
        aria-activedescendant={open ? `${id}-opt-${cursor}` : undefined}
        onClick={() => setOpen((next) => !next)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            setOpen(true)
            setCursor((index) => (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length)
          }
          if (event.key === 'Enter' && open) {
            event.preventDefault()
            const next = options[cursor]
            if (next) onChange(next)
            setOpen(false)
          }
          if (event.key === 'Escape') setOpen(false)
        }}
      >
        {value || 'Choose'}
      </button>
      {open ? (
        <ul role="listbox" aria-labelledby={id} className="mt-1" style={{ border: '1px solid var(--nx-line)', background: 'var(--nx-surface)' }}>
          {options.map((option, index) => (
            <li key={option} id={`${id}-opt-${index}`} role="option" aria-selected={option === value} style={{ background: index === cursor ? 'var(--nx-line)' : 'transparent' }}>
              <button type="button" className="min-h-11 w-full px-3 text-left" onClick={() => { onChange(option); setOpen(false) }}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function ComboField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  const id = useId()
  const listId = `${id}-list`
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)
  const [cursor, setCursor] = useState(0)
  const matches = filterOptions(options, query)
  const index = matches.length === 0 ? 0 : Math.min(cursor, matches.length - 1)
  const active = open && matches[index] ? `${id}-opt-${index}` : undefined

  function pick(next: string) {
    onChange(next)
    setQuery(next)
    setOpen(false)
  }

  return (
    <div className="text-sm">
      <label className="mb-1 block" htmlFor={id}>{label}</label>
      <input
        id={id}
        className={fieldClass}
        style={{ borderRadius: 'var(--nx-radius)', border: '1px solid var(--nx-line)', background: 'var(--nx-surface)', color: 'var(--nx-fg)' }}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setCursor(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault()
            setOpen(true)
            return
          }
          const step = stepCursor(index, matches.length, event.key)
          if (step === null) return
          event.preventDefault()
          if (step === 'close') setOpen(false)
          else if (step === 'pick') {
            const next = matches[index]
            if (next) pick(next)
          } else setCursor(step)
        }}
      />
      {open ? (
        <ul id={listId} role="listbox" aria-label={label} className="mt-1" style={{ border: '1px solid var(--nx-line)', background: 'var(--nx-surface)' }}>
          {matches.map((option, optionIndex) => (
            <li key={option} id={`${id}-opt-${optionIndex}`} role="option" aria-selected={option === value} style={{ background: optionIndex === index ? 'var(--nx-line)' : 'transparent' }}>
              <span
                className="block min-h-11 px-3 py-2"
                onMouseDown={(event) => {
                  event.preventDefault()
                  pick(option)
                }}
              >
                {option}
              </span>
            </li>
          ))}
          {matches.length === 0 ? <li className="min-h-11 px-3 py-2">No matches</li> : null}
        </ul>
      ) : null}
    </div>
  )
}

export function MultiSelect({ label, values, onChange, options }: { label: string; values: string[]; onChange: (values: string[]) => void; options: string[] }) {
  return (
    <fieldset className="text-sm">
      <legend className="mb-1">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = values.includes(option)
          return (
            <label key={option} className="inline-flex min-h-11 items-center gap-2 px-3" style={{ border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
              <input
                type="checkbox"
                checked={on}
                onChange={() => onChange(on ? values.filter((item) => item !== option) : [...values, option])}
              />
              {option}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function CheckField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="inline-flex min-h-11 items-center gap-3 text-sm">
      <input type="checkbox" className="size-5" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  )
}

export function RadioField({ label, name, value, current, onChange, options }: { label: string; name: string; value: string; current: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <fieldset className="text-sm">
      <legend className="mb-1">{label}</legend>
      <div className="flex flex-col">
        {options.map((option) => (
          <label key={option} className="inline-flex min-h-11 items-center gap-3">
            <input type="radio" name={name} value={option} checked={current === option} onChange={() => onChange(option)} />
            {option}
          </label>
        ))}
      </div>
      <span className="sr-only">{value}</span>
    </fieldset>
  )
}

export function SwitchField({ label, on, onChange }: { label: string; on: boolean; onChange: (on: boolean) => void }) {
  return (
    <button type="button" className="inline-flex min-h-11 items-center gap-3 px-3" style={{ border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }} aria-pressed={on} onClick={() => onChange(!on)}>
      <span aria-hidden className="relative h-6 w-11" style={{ background: on ? 'var(--nx-accent)' : 'var(--nx-line)', borderRadius: 999 }}>
        <span className="absolute top-0.5 h-5 w-5" style={{ background: 'var(--nx-surface)', borderRadius: 999, transform: `translateX(${on ? 20 : 2}px)`, transition: 'transform 140ms var(--nx-ease)' }} />
      </span>
      {label}: {on ? 'On' : 'Off'}
    </button>
  )
}

export function SliderField({ label, value, onChange, min = 0, max = 100 }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number }) {
  const id = useId()
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="mb-1 flex justify-between"><span>{label}</span><span>{value}</span></span>
      <input id={id} className="h-11 w-full" type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  )
}

export function RangeField({ label, start, end, onChange }: { label: string; start: number; end: number; onChange: (start: number, end: number) => void }) {
  return (
    <fieldset className="text-sm">
      <legend className="mb-1">{label}: {start} to {end}</legend>
      <input className="h-11 w-full" type="range" min={0} max={100} value={start} aria-label={`${label} start`} onChange={(event) => onChange(Number(event.target.value), end)} />
      <input className="h-11 w-full" type="range" min={0} max={100} value={end} aria-label={`${label} end`} onChange={(event) => onChange(start, Number(event.target.value))} />
    </fieldset>
  )
}

function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  return { first, days }
}

export function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const { first, days } = monthGrid(2026, 9)
  const selected = Number(value) || 1
  const [cursor, setCursor] = useState(selected)
  const cursorRef = useRef(selected)
  const [tracked, setTracked] = useState(selected)
  if (tracked !== selected) {
    setTracked(selected)
    setCursor(selected)
  }
  useLayoutEffect(() => {
    cursorRef.current = selected
  }, [selected])
  return (
    <fieldset className="text-sm">
      <legend className="mb-1">{label}, October 2026{value ? `, day ${value}` : ''}</legend>
      <div
        className="grid grid-cols-7 gap-1"
        role="grid"
        aria-label={`${label} calendar`}
        onKeyDown={(event) => {
          const step = stepCalendar(cursorRef.current, days, first, event.key)
          if (step === null) return
          event.preventDefault()
          if (step === 'blur') {
            if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
            return
          }
          cursorRef.current = step
          setCursor(step)
          event.currentTarget.querySelector<HTMLButtonElement>(`[data-day="${step}"]`)?.focus()
        }}
      >
        {Array.from({ length: first }, (_, index) => <span key={`e-${index}`} />)}
        {Array.from({ length: days }, (_, index) => {
          const day = String(index + 1)
          return (
            <DayButton
              key={day}
              day={day}
              on={value === day}
              tabIndex={Number(day) === cursor ? 0 : -1}
              onPick={() => {
                setCursor(Number(day))
                onChange(day)
              }}
            />
          )
        })}
      </div>
    </fieldset>
  )
}

export function TimeField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const hours = ['09:00', '10:00', '11:00', '13:00', '15:00']
  return (
    <fieldset className="text-sm">
      <legend className="mb-1">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {hours.map((hour) => (
          <button key={hour} type="button" className="min-h-11 px-3" aria-pressed={value === hour} style={{ border: '1px solid var(--nx-line)', background: value === hour ? 'var(--nx-accent)' : 'transparent', color: value === hour ? 'var(--nx-accent-fg)' : 'inherit' }} onClick={() => onChange(hour)}>
            {hour}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export function DateTimeField({ label, date, time, onDate, onTime }: { label: string; date: string; time: string; onDate: (value: string) => void; onTime: (value: string) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <DateField label={`${label} date`} value={date} onChange={onDate} />
      <TimeField label={`${label} time`} value={time} onChange={onTime} />
    </div>
  )
}

export function DateRangeField({ label, start, end, onStart, onEnd }: { label: string; start: string; end: string; onStart: (value: string) => void; onEnd: (value: string) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <DateField label={`${label} start`} value={start} onChange={onStart} />
      <DateField label={`${label} end`} value={end} onChange={onEnd} />
    </div>
  )
}

export function FileField({ label, name, onName }: { label: string; name: string; onName: (name: string) => void }) {
  const id = useId()
  const [hot, setHot] = useState(false)
  function take(file: File | undefined) {
    onName(file?.name ?? '')
  }
  return (
    <div className="text-sm">
      <span className="mb-1 block" id={`${id}-label`}>{label}</span>
      <Frame hot={hot}>
        <div
          className="flex items-center justify-between gap-3 px-3"
          style={{ minHeight: 44 }}
          onDragOver={(event) => {
            event.preventDefault()
            setHot(true)
          }}
          onDragLeave={() => setHot(false)}
          onDrop={(event) => {
            event.preventDefault()
            setHot(false)
            take(event.dataTransfer.files?.[0])
          }}
        >
          <span id={`${id}-file`}>{name || 'Drop a file, or choose one'}</span>
          <label className="relative inline-flex min-h-11 min-w-11 cursor-pointer items-center px-3" style={{ minHeight: 44, background: 'var(--nx-accent)', color: 'var(--nx-accent-fg)', borderRadius: 'var(--nx-radius)' }}>
            <span aria-hidden>Choose</span>
            <input
              id={id}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              style={{ minHeight: 44 }}
              type="file"
              aria-label={label}
              aria-describedby={`${id}-file`}
              onFocus={() => setHot(true)}
              onBlur={() => setHot(false)}
              onChange={(event) => take(event.target.files?.[0])}
            />
          </label>
        </div>
      </Frame>
    </div>
  )
}

function DayButton({ day, on, tabIndex, onPick }: { day: string; on: boolean; tabIndex: number; onPick: () => void }) {
  const personality = usePersonality()
  const shell: CSSProperties = { background: 'transparent', color: 'inherit', borderRadius: 'var(--nx-radius)' }
  if (on && personality === 'liquid') {
    shell.background = 'var(--nx-accent)'
    shell.color = 'var(--nx-accent-fg)'
    shell.borderRadius = 12
  }
  if (on && personality === 'editorial') shell.boxShadow = 'inset 0 -2px 0 var(--nx-mark)'
  if (on && personality === 'cinematic') shell.outline = '1px solid var(--nx-mark)'
  if (on && personality === 'technical') shell.boxShadow = 'inset 0 -1px 0 var(--nx-mark)'
  if (on && personality === 'tactile') {
    shell.background = 'var(--nx-accent)'
    shell.color = 'var(--nx-accent-fg)'
  }
  const squash = on && personality === 'tactile'
  return (
    <button type="button" data-day={day} tabIndex={tabIndex} className="min-h-11" aria-pressed={on} aria-selected={on} style={{ ...shell, transform: squash ? 'scaleX(1.08) scaleY(0.92)' : undefined }} onClick={onPick}>
      <span style={{ display: 'inline-block', transform: squash ? 'scaleX(0.926) scaleY(1.087)' : undefined }}>{day}</span>
    </button>
  )
}

export function OtpField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = useId()
  const cells = value.padEnd(6, ' ').slice(0, 6).split('')
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="mb-1 block">{label}</span>
      <div className="relative">
        <input id={id} className="absolute inset-0 opacity-0" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={value} onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, 6))} />
        <div className="flex gap-2" aria-hidden>
          {cells.map((cell, index) => (
            <span key={index} className="inline-flex min-h-11 min-w-11 items-center justify-center" style={{ border: '1px solid var(--nx-line)', background: 'var(--nx-surface)' }}>
              {cell.trim() || '·'}
            </span>
          ))}
        </div>
      </div>
    </label>
  )
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = useId()
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="mb-1 block">{label}: {value}</span>
      <input id={id} className="h-11 w-full" type="color" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

export function RatingField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <fieldset className="text-sm">
      <legend className="mb-1">{label}: {value || 'none'}</legend>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((score) => (
          <label key={score} className="inline-flex min-h-11 min-w-11 items-center justify-center" style={{ border: '1px solid var(--nx-line)', background: value === score ? 'var(--nx-accent)' : 'transparent', color: value === score ? 'var(--nx-accent-fg)' : 'inherit' }}>
            <input className="sr-only" type="radio" name={label} value={score} checked={value === score} onChange={() => onChange(score)} />
            {score}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function TagField({ label, tags, onChange }: { label: string; tags: string[]; onChange: (tags: string[]) => void }) {
  const [draft, setDraft] = useState('')
  return (
    <div className="text-sm">
      <label className="mb-1 block">
        {label}
        <input
          className={`${fieldClass} mt-1`}
          style={{ borderRadius: 'var(--nx-radius)', border: '1px solid var(--nx-line)', background: 'var(--nx-surface)', color: 'var(--nx-fg)' }}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && draft.trim()) {
              event.preventDefault()
              onChange([...tags, draft.trim()])
              setDraft('')
            }
          }}
        />
      </label>
      <ul className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <button type="button" className="min-h-11 px-3" style={{ border: '1px solid var(--nx-line)' }} aria-label={`Remove ${tag}`} onClick={() => onChange(tags.filter((item) => item !== tag))}>
              {tag} ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
