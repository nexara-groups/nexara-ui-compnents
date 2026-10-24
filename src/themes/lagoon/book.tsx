'use client'

import { CalendarGrid, Combobox, Dropzone, Spinner, type DroppedFile } from '@/themes/kit/controls.tsx'
import { CheckField, TagField, TextArea, TextField } from '@/themes/kit/fields.tsx'
import { useLevel } from '@/themes/kit/level.ts'
import { Icon, Logo } from '@/themes/lagoon/art.tsx'
import { asset, clinic, doctors, reasonDoctor, reasons, slots } from '@/themes/lagoon/data.ts'
import { screenHref } from '@/themes/lagoon/nav.ts'
import { BookButton, Chip, QuietButton } from '@/themes/lagoon/parts.tsx'
import { useTheme } from '@/themes/provider.tsx'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

const stepNames = ['Reason', 'Doctor and time', 'About you', 'Confirm']

function Stepper({ step }: { step: number }) {
  const level = useLevel()
  return (
    <ol className="flex items-center gap-2" aria-label="Booking steps">
      {stepNames.map((name, index) => {
        const done = index < step
        const current = index === step
        return (
          <li key={name} className="flex min-w-0 flex-1 items-center gap-2" aria-current={current ? 'step' : undefined}>
            <span
              className="nx-mono inline-flex h-8 shrink-0 items-center justify-center text-[12px]"
              style={{
                minWidth: 32,
                padding: current ? '0 12px' : 0,
                background: done || current ? 'var(--nx-accent)' : 'transparent',
                color: done || current ? 'var(--nx-accent-fg)' : 'var(--nx-muted)',
                border: '1px solid var(--nx-accent)',
                borderRadius: current ? 10 : 999,
                transition: level === 'off' ? 'none' : 'border-radius 320ms var(--nx-ease)',
              }}
            >
              {done ? <Icon name="check" className="h-4 w-4" /> : index + 1}
              {current ? <span className="hidden sm:inline">&nbsp;· {name}</span> : null}
              <span className={current ? 'sr-only sm:hidden' : 'sr-only'}>{name}{done ? ', done' : ''}</span>
            </span>
            {index < stepNames.length - 1 ? <span aria-hidden className="h-px flex-1" style={{ background: done ? 'var(--nx-accent)' : 'var(--nx-line)' }} /> : null}
          </li>
        )
      })}
    </ol>
  )
}

function Choice({ name, value, current, onChange, children, label }: { name: string; value: string; current: string; onChange: (value: string) => void; children: ReactNode; label: string }) {
  const level = useLevel()
  const on = value === current
  return (
    <label className="relative flex min-h-11 cursor-pointer items-center gap-3 p-3" style={{ border: `1px solid ${on ? 'var(--nx-accent)' : 'var(--nx-line)'}`, background: on ? 'color-mix(in srgb, var(--nx-accent) 10%, var(--nx-surface))' : 'var(--nx-surface)', borderRadius: on ? 14 : 22, transition: level === 'off' ? 'none' : 'border-radius 320ms var(--nx-ease)' }}>
      <input type="radio" name={name} value={value} checked={on} onChange={() => onChange(value)} className="peer sr-only" aria-label={label} />
      <span aria-hidden className="absolute inset-0 rounded-[inherit] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2" style={{ outlineColor: 'var(--nx-ring)' }} />
      {children}
    </label>
  )
}

function Summary({ reason, doctorId, date, time, who }: { reason: string; doctorId: string; date: Date | null; time: string; who: string }) {
  const doctor = doctors.find((item) => item.id === doctorId)
  const reasonLabel = reasons.find((item) => item.value === reason)?.label
  const check = reason === 'check'
  const fee = check ? 1850 : doctor?.fee ?? 600
  return (
    <aside aria-labelledby="summary-title" className="p-5 lg:sticky lg:top-6" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
      <h2 id="summary-title" className="nx-display text-[22px]">Your visit</h2>
      <dl className="mt-4 space-y-3 text-[15px]">
        <div className="flex justify-between gap-4"><dt style={{ color: 'var(--nx-muted)' }}>For</dt><dd className="text-right">{who}</dd></div>
        <div className="flex justify-between gap-4"><dt style={{ color: 'var(--nx-muted)' }}>Reason</dt><dd className="text-right">{reasonLabel ?? 'Not chosen yet'}</dd></div>
        <div className="flex items-center justify-between gap-4">
          <dt style={{ color: 'var(--nx-muted)' }}>Doctor</dt>
          <dd className="flex items-center gap-2 text-right">
            {doctor ? <img src={asset(doctor.photo)} alt="" className="h-7 w-7 rounded-full object-cover" /> : null}
            {doctor?.name ?? 'Any available'}
          </dd>
        </div>
        <div className="flex justify-between gap-4"><dt style={{ color: 'var(--nx-muted)' }}>When</dt><dd className="nx-mono text-right text-[14px]">{date ? `${date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}, ${time}` : 'Pick a day'}</dd></div>
      </dl>
      <div className="mt-5 flex items-baseline justify-between border-t pt-4" style={{ borderColor: 'var(--nx-line)' }}>
        <span className="text-[15px]">{check ? 'Health check' : 'Consult, 20 min'}</span>
        <span className="nx-mono text-[24px]">₹{fee.toLocaleString('en-IN')}</span>
      </div>
      <p className="mt-1 text-[13px]" style={{ color: 'var(--nx-muted)' }}>GST included. Pay at the desk or by UPI.</p>
      <p className="mt-4 flex items-start gap-2 text-[13px] leading-snug" style={{ color: 'var(--nx-muted)' }}>
        <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0" />
        Free to reschedule until two hours before. Call {clinic.phone}.
      </p>
    </aside>
  )
}

function readQuery() {
  const query = window.location.hash.split('?')[1] ?? ''
  return new URLSearchParams(query)
}

export function LagoonBook() {
  const { scheme } = useTheme()
  const level = useLevel()
  const params = readQuery()
  const [step, setStep] = useState(0)
  const [who, setWho] = useState('Me')
  const [reason, setReason] = useState(params.get('r') ?? '')
  const [doctor, setDoctor] = useState(params.get('d') ?? '')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [allergies, setAllergies] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [files, setFiles] = useState<DroppedFile[]>([])
  const [consent, setConsent] = useState(false)
  const [reminders, setReminders] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const shown = useRef('0-false')
  const titleId = useId()
  const [today] = useState(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  })

  useEffect(() => {
    const key = `${step}-${done}`
    if (shown.current === key) return
    shown.current = key
    heading.current?.focus()
  }, [step, done])

  useEffect(() => {
    if (!busy) return
    const id = window.setTimeout(() => {
      setBusy(false)
      setDone(true)
    }, level === 'off' ? 300 : 1100)
    return () => window.clearTimeout(id)
  }, [busy, level])

  const chooseReason = (value: string) => {
    setReason(value)
    if (!doctor && reasonDoctor[value]) setDoctor(reasonDoctor[value])
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (step === 0 && !reason) next.reason = 'Choose a reason so we can match the right doctor.'
    if (step === 1) {
      if (!date) next.date = 'Pick a day.'
      if (!time) next.time = 'Pick a time.'
    }
    if (step === 2) {
      if (name.trim().length < 2) next.name = who === 'My child' ? "Enter your child's full name." : 'Enter the full name for the appointment.'
      if (phone.replace(/\D/g, '').length !== 10) next.phone = 'Enter a 10 digit mobile number.'
      if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'Check the email address, or leave it blank.'
    }
    if (step === 3 && !consent) next.consent = 'Please confirm the details are correct.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const next = () => {
    if (!validate()) return
    if (step === 3) {
      setBusy(true)
      return
    }
    setStep(step + 1)
  }

  const chosenDoctor = doctors.find((item) => item.id === doctor)
  const isSunday = (value: Date) => value.getDay() === 0
  const disabledDay = (value: Date) => value < today || (isSunday(value) && doctor !== 'arjun')
  const daySlots = slots.filter((slot) => !(date && isSunday(date) && slot.endsWith('pm')))
  const takenSlots = ['9:10 am', '5:00 pm']

  return (
    <div className="min-h-svh" style={{ background: 'var(--nx-bg)' }}>
      <header style={{ borderBottom: '1px solid var(--nx-line)' }}>
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-3 px-5 md:px-8">
          <a href={screenHref('landing', scheme)} aria-label="Tidewell, home" className="no-underline" style={{ color: 'var(--nx-fg)' }}>
            <Logo />
          </a>
          <a href={`tel:${clinic.tel}`} className="nx-mono inline-flex min-h-11 items-center gap-2 text-sm" style={{ color: 'var(--nx-fg)' }}>
            <Icon name="phone" className="h-4 w-4" />
            <span className="hidden sm:inline">Need help? </span>
            {clinic.phone}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-5 py-8 md:px-8 md:py-12">
        {done ? (
          <section aria-labelledby={titleId} className="relative mx-auto max-w-xl overflow-hidden p-8 text-center md:p-12" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
            <span aria-hidden className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center" style={{ background: 'var(--nx-accent)', color: 'var(--nx-accent-fg)', borderRadius: 20 }}>
              {level === 'rich' ? <span className="nx-motion absolute inset-0 rounded-[20px]" style={{ background: 'var(--nx-accent)', animation: 'nx-pulse-ring 1200ms ease-out 2' }} /> : null}
              <Icon name="check" className="relative h-8 w-8" strokeWidth={2.2} />
            </span>
            <h1 id={titleId} ref={heading} tabIndex={-1} className="nx-display text-[36px] leading-tight outline-none">You're booked.</h1>
            <p className="mt-3 text-[16px] leading-relaxed" style={{ color: 'var(--nx-muted)' }}>
              {chosenDoctor?.name ?? 'Your doctor'}, {date?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} at {time}. We've texted your token to ••••{phone.replace(/\D/g, '').slice(-4)}.
            </p>
            <p className="nx-mono mt-6 inline-block rounded-full px-4 py-2 text-[18px]" style={{ background: 'var(--nx-bg)', border: '1px solid var(--nx-line)' }}>Token A-31</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <QuietButton href={screenHref('landing', scheme)}>Back to Tidewell</QuietButton>
              <BookButton onClick={() => { setDone(false); setStep(0); setConsent(false); setDate(null); setTime('') }}>Book another visit</BookButton>
            </div>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="nx-mono text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>Book a visit</p>
              <h1 ref={heading} tabIndex={-1} className="nx-display mt-2 text-[clamp(32px,4vw,48px)] leading-[1.04] tracking-[-0.02em] outline-none">
                {['What brings you in?', 'Choose a doctor and a time.', 'A little about the patient.', 'Check and confirm.'][step]}
              </h1>
              <div className="mt-6">
                <Stepper step={step} />
                <p className="nx-mono mt-2 text-[12px] sm:hidden" style={{ color: 'var(--nx-muted)' }}>Step {step + 1} of 4 · {stepNames[step]}</p>
              </div>
              {Object.keys(errors).length > 0 ? (
                <div role="alert" className="mt-6 flex items-start gap-3 p-4 text-[15px]" style={{ background: 'color-mix(in srgb, var(--nx-danger) 12%, var(--nx-surface))', border: '1px solid color-mix(in srgb, var(--nx-danger) 50%, transparent)', borderRadius: 16 }}>
                  <span aria-hidden className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: 'var(--nx-danger)' }} />
                  <div>
                    <p className="font-medium">A couple of things to fix</p>
                    <ul className="mt-1 list-disc pl-5" style={{ color: 'var(--nx-muted)' }}>
                      {Object.values(errors).map((message) => (
                        <li key={message}>{message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}

              <form
                className="mt-6 space-y-6 p-5 md:p-7"
                style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}
                onSubmit={(event) => {
                  event.preventDefault()
                  next()
                }}
                noValidate
              >
                {step === 0 ? (
                  <>
                    <fieldset>
                      <legend className="mb-2 text-sm">Who is the visit for?</legend>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {['Me', 'My child', 'Someone else'].map((option) => (
                          <Choice key={option} name="who" value={option} current={who} onChange={setWho} label={option}>
                            <Icon name={option === 'My child' ? 'kid' : option === 'Me' ? 'users' : 'users'} />
                            <span className="text-[15px]">{option}</span>
                          </Choice>
                        ))}
                      </div>
                    </fieldset>
                    <Combobox label="Reason for the visit" value={reason} onChange={chooseReason} options={reasons} placeholder="For example: fever, back pain, thyroid" hint="Type a word or two. We use this to suggest a doctor, not to diagnose." />
                    {errors.reason ? <p className="-mt-4 text-sm" style={{ color: 'var(--nx-danger)' }}>{errors.reason}</p> : null}
                    <div>
                      <p className="mb-2 text-sm" style={{ color: 'var(--nx-muted)' }}>Common reasons</p>
                      <div className="flex flex-wrap gap-2">
                        {reasons.slice(0, 6).map((item) => (
                          <Chip key={item.value} selected={reason === item.value} onClick={() => chooseReason(item.value)}>
                            {item.label}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}

                {step === 1 ? (
                  <>
                    <fieldset>
                      <legend className="mb-2 text-sm">Doctor</legend>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {doctors.map((item) => (
                          <Choice key={item.id} name="doctor" value={item.id} current={doctor} onChange={setDoctor} label={`${item.name}, ${item.role}, next ${item.next}`}>
                            <img src={asset(item.photo)} alt="" className="h-12 w-12 shrink-0 object-cover" style={{ borderRadius: doctor === item.id ? 14 : 999, transition: 'border-radius 320ms var(--nx-ease)' }} />
                            <span className="min-w-0">
                              <span className="block text-[15px] font-medium">{item.name}</span>
                              <span className="block text-[13px]" style={{ color: 'var(--nx-muted)' }}>{item.role} · ₹{item.fee}</span>
                            </span>
                            {reasonDoctor[reason] === item.id ? <span className="nx-mono ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px]" style={{ background: 'var(--nx-mark)', color: 'var(--nx-mark-fg)' }}>Suggested</span> : null}
                          </Choice>
                        ))}
                      </div>
                    </fieldset>
                    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
                      <CalendarGrid
                        label="Day of visit"
                        value={date}
                        onChange={(value) => {
                          setDate(value)
                          setTime('')
                        }}
                        isDisabled={disabledDay}
                        dayNote={(value) => (value.getDay() === 1 || value.getDay() === 4 ? 'evening slots filling' : undefined)}
                      />
                      <fieldset>
                        <legend className="mb-2 text-sm">Time {date ? <span style={{ color: 'var(--nx-muted)' }}>· {date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span> : null}</legend>
                        {date ? (
                          <div className="grid grid-cols-3 gap-2 md:grid-cols-2 [&_button]:whitespace-nowrap">
                            {daySlots.map((slot) => (
                              <Chip key={slot} selected={time === slot} disabled={takenSlots.includes(slot)} onClick={() => setTime(slot)} label={takenSlots.includes(slot) ? `${slot}, taken` : slot}>
                                {slot}
                              </Chip>
                            ))}
                          </div>
                        ) : (
                          <p className="p-4 text-[14px]" style={{ background: 'var(--nx-bg)', border: '1px dashed var(--nx-line)', borderRadius: 16, color: 'var(--nx-muted)' }}>Pick a day to see open times. Sundays are paediatrics only.</p>
                        )}
                        {errors.time && date ? <p className="mt-2 text-sm" style={{ color: 'var(--nx-danger)' }}>{errors.time}</p> : null}
                      </fieldset>
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <TextField label={who === 'My child' ? "Child's full name" : 'Full name'} value={name} onChange={setName} error={errors.name} />
                      <TextField label="Mobile number" value={phone} onChange={setPhone} error={errors.phone} hint="We text the token and reminders here." />
                      <TextField label="Email (optional)" type="email" value={email} onChange={setEmail} error={errors.email} hint="For your invoice and reports." />
                    </div>
                    <TagField label="Allergies (press Enter after each)" tags={allergies} onChange={setAllergies} />
                    <TextArea label="Anything the doctor should know? (optional)" value={notes} onChange={setNotes} />
                    <Dropzone label="Previous reports or prescriptions (optional)" hint="PDF or photo, up to 10 MB each" accept="image/*,.pdf" files={files} onFiles={setFiles} />
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <dl className="grid gap-x-6 gap-y-3 text-[15px] sm:grid-cols-2">
                      {[
                        ['Patient', `${name || '—'}${who === 'My child' ? ' (child)' : ''}`],
                        ['Mobile', phone || '—'],
                        ['Reason', reasons.find((item) => item.value === reason)?.label ?? '—'],
                        ['Doctor', chosenDoctor?.name ?? '—'],
                        ['When', date ? `${date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}, ${time}` : '—'],
                        ['Allergies', allergies.length ? allergies.join(', ') : 'None listed'],
                        ['Attachments', files.length ? `${files.length} file${files.length > 1 ? 's' : ''}` : 'None'],
                      ].map(([term, value]) => (
                        <div key={term} className="border-t pt-3" style={{ borderColor: 'var(--nx-line)' }}>
                          <dt className="text-[13px]" style={{ color: 'var(--nx-muted)' }}>{term}</dt>
                          <dd className="mt-0.5">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="space-y-1">
                      <label className="flex min-h-11 items-center gap-3 text-[15px]">
                        <input type="checkbox" className="size-5" style={{ accentColor: 'var(--nx-accent)' }} checked={reminders} onChange={(event) => setReminders(event.target.checked)} />
                        Text me a reminder the evening before
                      </label>
                      <CheckField label="These details are correct, and I agree to Tidewell's visit and privacy policy." checked={consent} onChange={setConsent} />
                      {errors.consent ? <p className="text-sm" style={{ color: 'var(--nx-danger)' }}>{errors.consent}</p> : null}
                    </div>
                  </>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5" style={{ borderColor: 'var(--nx-line)' }}>
                  {step > 0 ? (
                    <QuietButton onClick={() => { setErrors({}); setStep(step - 1) }}>Back</QuietButton>
                  ) : (
                    <QuietButton href={screenHref('landing', scheme)}>Cancel</QuietButton>
                  )}
                  <div className="flex items-center gap-3">
                    {busy ? <Spinner label="Confirming your visit" /> : null}
                    <BookButton type="submit" size="md" busy={busy}>
                      {step === 3 ? (busy ? 'Confirming…' : 'Confirm visit') : 'Continue'}
                      {step < 3 ? <Icon name="arrow" className="h-4 w-4" /> : null}
                    </BookButton>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:col-span-4 lg:pt-[120px]">
              <Summary reason={reason} doctorId={doctor} date={date} time={time} who={who} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
