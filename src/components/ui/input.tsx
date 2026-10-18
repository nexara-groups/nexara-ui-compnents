'use client'

import { type ClipboardEvent, type ComponentProps, type KeyboardEvent, type ReactNode, useRef, useState } from 'react'
import { cn, fieldBorder, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'outline',
  'filled',
  'underline',
  'ghost',
  'search',
  'otp',
  'file',
  'password',
  'amount',
  'tag',
  'command',
  'floating',
] as const

export type InputVariant = (typeof VARIANTS)[number]

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  variant?: InputVariant
  label?: ReactNode
  hint?: ReactNode
}

/**
 * Input
 * Twelve field constructions. Copy this file plus `src/lib/utils.ts`.
 */
export function Input({ variant = 'outline', label, hint, className, id, type, ...props }: InputProps) {
  const fieldId = id ?? `nexara-input-${variant}`
  if (variant === 'otp') {
    return <OtpField className={className} defaultValue={typeof props.defaultValue === 'string' ? props.defaultValue : '418'} />
  }
  if (variant === 'file') {
    return (
      <label className={cn('flex h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-nx-line bg-nx-card text-sm text-nx-muted', className)}>
        <span className="font-medium text-nx-fg">Drop a file</span>
        <span className="mt-1 text-xs">PNG, PDF up to 12MB</span>
        <input id={fieldId} type="file" className="sr-only" {...props} />
      </label>
    )
  }
  if (variant === 'tag') {
    return (
      <div className={cn('flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border-nx-field bg-nx-card px-2 py-1.5', fieldBorder, className)}>
        <span className="rounded-full bg-nx-soft px-2 py-0.5 text-xs text-nx-accent">Harbor</span>
        <input id={fieldId} className={cn(focusRing, 'min-w-24 flex-1 bg-transparent text-sm outline-none')} placeholder="Add a tag" {...props} />
      </div>
    )
  }

  const field = (
    <input
      id={fieldId}
      type={variant === 'password' ? 'password' : variant === 'amount' ? 'text' : type}
      data-nexara="input"
      data-variant={variant}
      className={cn(
        focusRing,
        'w-full text-sm text-nx-fg placeholder:text-nx-muted',
        variant === 'outline' && 'h-11 rounded-xl border-nx-field bg-nx-card px-3',
        variant === 'outline' && fieldBorder,
        variant === 'filled' && 'h-11 rounded-xl border border-transparent bg-nx-elevated px-3',
        variant === 'underline' && 'h-11 rounded-none border-0 border-b border-nx-field bg-transparent px-0',
        variant === 'ghost' && 'h-11 rounded-xl border border-transparent bg-transparent px-3 hover:bg-nx-soft',
        variant === 'search' && cn('h-11 rounded-full bg-nx-card px-10', fieldBorder),
        variant === 'password' && cn('h-11 rounded-xl bg-nx-card px-3', fieldBorder),
        variant === 'amount' && cn('h-11 rounded-xl bg-nx-card px-8 font-mono', fieldBorder),
        variant === 'command' && cn('h-11 rounded-xl bg-nx-bg px-9 font-mono', fieldBorder),
        variant === 'floating' && cn('peer h-12 rounded-xl bg-nx-card px-3 pt-4', fieldBorder),
        className,
      )}
      placeholder={variant === 'floating' ? ' ' : props.placeholder}
      {...props}
    />
  )

  return (
    <div className="relative">
      {variant === 'search' ? <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-nx-muted">⌕</span> : null}
      {variant === 'amount' ? <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-nx-muted">$</span> : null}
      {variant === 'command' ? <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-nx-accent">❯</span> : null}
      {variant === 'floating' && label ? (
        <label htmlFor={fieldId} className="pointer-events-none absolute top-2 left-3 text-[10px] tracking-[0.14em] text-nx-muted uppercase">
          {label}
        </label>
      ) : label ? (
        <label htmlFor={fieldId} className="mb-1.5 block text-xs text-nx-muted">
          {label}
        </label>
      ) : null}
      {field}
      {hint ? <p className="mt-1.5 text-xs text-nx-muted">{hint}</p> : null}
    </div>
  )
}

function OtpField({ className, defaultValue = '418' }: { className?: string; defaultValue?: string }) {
  const length = 4
  const [digits, setDigits] = useState(() => {
    const raw = defaultValue.replace(/\D/g, '').slice(0, length)
    return Array.from({ length }, (_, index) => raw[index] ?? '')
  })
  const refs = useRef<Array<HTMLInputElement | null>>([])

  const focusAt = (index: number) => refs.current[Math.max(0, Math.min(length - 1, index))]?.focus()

  const onChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = char
    setDigits(next)
    if (char) focusAt(index + 1)
  }

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusAt(index - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusAt(index + 1)
    }
    if (event.key === 'Backspace' && !digits[index]) {
      event.preventDefault()
      const next = [...digits]
      next[index - 1] = ''
      setDigits(next)
      focusAt(index - 1)
    }
  }

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    setDigits(Array.from({ length }, (_, index) => pasted[index] ?? ''))
    focusAt(Math.min(pasted.length, length - 1))
  }

  return (
    <div
      role="group"
      aria-label="One-time code"
      data-nexara="input"
      data-variant="otp"
      className={cn('flex gap-2', className)}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node
          }}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          aria-label={`Digit ${index + 1}`}
          onChange={(event) => onChange(index, event.target.value)}
          onKeyDown={(event) => onKeyDown(index, event)}
          onPaste={onPaste}
          className={cn(focusRing, fieldBorder, 'size-12 rounded-xl bg-nx-card text-center font-mono text-xl')}
        />
      ))}
    </div>
  )
}
