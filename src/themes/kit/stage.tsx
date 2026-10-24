'use client'

import { NxButton } from '@/themes/kit/button.tsx'
import {
  CheckField,
  ColorField,
  DateField,
  DateRangeField,
  DateTimeField,
  FileField,
  MultiSelect,
  OtpField,
  PasswordField,
  RadioField,
  RangeField,
  RatingField,
  SearchField,
  SelectField,
  SliderField,
  SwitchField,
  TagField,
  TextArea,
  TextField,
  TimeField,
} from '@/themes/kit/fields.tsx'
import { Alert, Banner, Drawer, EmptyState, MenuButton, Modal, NotFound, Popover, ProgressBar, ToastStack, Tooltip } from '@/themes/kit/overlays.tsx'
import { usePersonality } from '@/themes/kit/level.ts'
import { OrreryRings } from '@/themes/show/rings.tsx'
import { ThemeProvider } from '@/themes/provider.tsx'
import { boldThemes } from '@/themes/bold.ts'
import type { ThemeScheme } from '@/themes/contract.ts'
import { useCallback, useState } from 'react'

const actions = {
  liquid: 'Book',
  editorial: 'Register',
  cinematic: 'Start trial',
  tactile: 'Join',
  technical: 'Call',
} as const

export function ThemeStage({ mode }: { mode: 'landing' | 'dashboard' | 'form' | 'kit' }) {
  const personality = usePersonality()
  const verb = actions[personality]
  const [toast, setToast] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const dismiss = useCallback(() => setToast(null), [])

  return (
    <div data-theme-stage={personality}>
      <Banner>The desk is open. {verb} stays in the first row.</Banner>
      {mode === 'landing' || mode === 'kit' ? <Landing verb={verb} onAct={() => setModal(true)} /> : null}
      {mode === 'dashboard' ? <Dashboard /> : null}
      {mode === 'form' || mode === 'kit' ? <FormScreen verb={verb} onToast={() => setToast(`${verb} is filed.`)} /> : null}
      {mode === 'kit' ? (
        <div className="flex flex-wrap gap-3 px-4 py-6">
          <NxButton onClick={() => setModal(true)}>{verb}</NxButton>
          <NxButton tone="quiet" onClick={() => setDrawer(true)}>Notes</NxButton>
          <NxButton busy>Saving</NxButton>
          <MenuButton label="More" items={['Duplicate', 'Archive']} />
          <Popover label="Hours">Weekdays, 08:00 to 18:00.</Popover>
          <Tooltip label="Status" tip="Visible without hovering." />
          <NxButton onClick={() => setToast('Saved. The sheet did not move the words.')}>Notify</NxButton>
        </div>
      ) : null}
      {mode === 'kit' ? <KitFoot /> : null}
      <Modal title={verb} open={modal} onClose={() => setModal(false)}>
        <p>Confirm {verb.toLowerCase()}. The title stays still.</p>
        <div className="mt-4">
          <NxButton onClick={() => { setModal(false); setToast(`${verb} confirmed.`) }}>{verb}</NxButton>
        </div>
      </Modal>
      <Drawer title="Notes" open={drawer} onClose={() => setDrawer(false)}>
        <p>The drawer keeps the first control immediate.</p>
      </Drawer>
      <ToastStack message={toast} onDismiss={dismiss} />
    </div>
  )
}

function Landing({ verb, onAct }: { verb: string; onAct: () => void }) {
  const personality = usePersonality()
  return (
    <section className="relative overflow-hidden px-4 py-12 md:px-8">
      {personality === 'liquid' ? <Blobs /> : null}
      {personality === 'cinematic' ? <OrreryRings /> : null}
      {personality === 'technical' ? <GridDraw /> : null}
      {personality === 'editorial' ? <p className="nx-mono mb-4 text-xs tracking-[0.16em] uppercase">Saturday · Pitch 2</p> : null}
      <div className="relative max-w-3xl" style={{ background: personality === 'liquid' ? 'var(--nx-bg)' : 'transparent' }}>
        <h1 className="nx-display text-5xl leading-none md:text-7xl">{headline(personality)}</h1>
        <p className="mt-4 max-w-xl text-lg" style={{ color: 'var(--nx-muted)' }}>{lede(personality)}</p>
        <div className="mt-6">
          <NxButton onClick={onAct} burst={personality === 'tactile'}>{verb}</NxButton>
        </div>
      </div>
      {personality === 'editorial' ? <Marquee /> : null}
    </section>
  )
}

function headline(personality: string) {
  if (personality === 'liquid') return 'The tide takes the booking.'
  if (personality === 'editorial') return 'Riverside, then the gate.'
  if (personality === 'cinematic') return 'Three rings. One trial.'
  if (personality === 'tactile') return 'Join the afternoon group.'
  return 'Call the desk. The grid is live.'
}

function lede(personality: string) {
  if (personality === 'liquid') return 'The plate stays opaque. The bloom sits behind Book.'
  if (personality === 'editorial') return 'The score flaps. The button is bone. Crimson is a rule.'
  if (personality === 'cinematic') return 'The rings move a few degrees. The label does not tilt.'
  if (personality === 'tactile') return 'The shell squashes. The word Join does not.'
  return 'A rule draws under the control. The word Call stays put.'
}

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span className="absolute -top-8 -left-8 h-40 w-40 rounded-full" style={{ background: 'var(--nx-mark)', opacity: 0.45 }} />
      <span className="absolute top-16 right-0 h-32 w-32 rounded-full" style={{ background: 'var(--nx-hardware)', opacity: 0.35 }} />
    </div>
  )
}

function GridDraw() {
  return (
    <div aria-hidden className="mb-6 h-16 w-full origin-left" style={{ backgroundImage: 'linear-gradient(var(--nx-line) 1px, transparent 1px), linear-gradient(90deg, var(--nx-line) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
  )
}

function Marquee() {
  return (
    <p className="nx-mono mt-8 overflow-hidden text-sm tracking-[0.14em] uppercase" style={{ color: 'var(--nx-mark)' }}>
      U10 09:30 · U12 11:00 · U14 13:30 · Gate from £4 ·
    </p>
  )
}

function Dashboard() {
  return (
    <section className="grid gap-4 px-4 py-8 md:grid-cols-3 md:px-8">
      {[['Open', '18'], ['Waiting', '4'], ['Filed', '12']].map(([label, value]) => (
        <div key={label} className="p-4" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)' }}>
          <p className="text-sm" style={{ color: 'var(--nx-muted)' }}>{label}</p>
          <p className="nx-display text-4xl">{value}</p>
        </div>
      ))}
      <div className="md:col-span-3">
        <Alert title="One visit needs a time">Choose a slot. The status is the sentence, not the stripe alone.</Alert>
      </div>
      <div className="md:col-span-3">
        <ProgressBar label="Today" value={64} />
      </div>
    </section>
  )
}

export function FormScreen({ verb, onToast }: { verb: string; onToast: () => void }) {
  const [name, setName] = useState('Ada Marsh')
  const [note, setNote] = useState('North round')
  const [secret, setSecret] = useState('tide-42')
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState('Under 12')
  const [kits, setKits] = useState<string[]>(['Home'])
  const [agree, setAgree] = useState(true)
  const [plan, setPlan] = useState('Weekday')
  const [alerts, setAlerts] = useState(true)
  const [volume, setVolume] = useState(40)
  const [span, setSpan] = useState<[number, number]>([20, 70])
  const [day, setDay] = useState('12')
  const [end, setEnd] = useState('20')
  const [time, setTime] = useState('10:00')
  const [file, setFile] = useState('')
  const [otp, setOtp] = useState('123456')
  const [color, setColor] = useState('#3ef0c2')
  const [rating, setRating] = useState(4)
  const [tags, setTags] = useState(['priority'])
  const [error, setError] = useState('')
  return (
    <form
      className="grid gap-5 px-4 py-8 md:px-8"
      onSubmit={(event) => {
        event.preventDefault()
        if (!name.trim()) {
          setError('Enter a name.')
          return
        }
        setError('')
        onToast()
      }}
    >
      <TextField label="Name" value={name} onChange={setName} error={error} />
      <TextArea label="Note" value={note} onChange={setNote} />
      <TextField label="Count" type="number" value="2" onChange={() => undefined} />
      <PasswordField label="Password" value={secret} onChange={setSecret} />
      <SearchField label="Search the desk" value={query} onChange={setQuery} onSubmit={onToast} />
      <SelectField label="Group" value={team} onChange={setTeam} options={['Under 10', 'Under 12', 'Under 14']} />
      <MultiSelect label="Kit" values={kits} onChange={setKits} options={['Home', 'Away', 'Keep']} />
      <CheckField label="I can make Thursday" checked={agree} onChange={setAgree} />
      <RadioField label="Plan" name="plan" value={plan} current={plan} onChange={setPlan} options={['Weekday', 'Saturday']} />
      <SwitchField label="Reminders" on={alerts} onChange={setAlerts} />
      <SliderField label="Travel minutes" value={volume} onChange={setVolume} />
      <RangeField label="Window" start={span[0]} end={span[1]} onChange={(start, end) => setSpan([start, end])} />
      <DateField label="Day" value={day} onChange={setDay} />
      <TimeField label="Time" value={time} onChange={setTime} />
      <DateTimeField label="Visit" date={day} time={time} onDate={setDay} onTime={setTime} />
      <DateRangeField label="Range" start={day} end={end} onStart={setDay} onEnd={setEnd} />
      <FileField label="Referral" name={file} onName={setFile} />
      <OtpField label="Code" value={otp} onChange={setOtp} />
      <ColorField label="Swatch" value={color} onChange={setColor} />
      <RatingField label="Visit" value={rating} onChange={setRating} />
      <TagField label="Tags" tags={tags} onChange={setTags} />
      <NxButton type="submit">{verb}</NxButton>
    </form>
  )
}

export function CompareBoard({ scheme }: { scheme: ThemeScheme }) {
  return (
    <div className="grid min-h-svh grid-cols-5" data-compare-board>
      {boldThemes.map((theme) => (
        <ThemeProvider key={theme.id} theme={theme} scheme={scheme} intensity="rich" className="min-h-svh">
          <CompareColumn />
        </ThemeProvider>
      ))}
    </div>
  )
}

function CompareColumn() {
  const personality = usePersonality()
  const verb = actions[personality]
  const [toast, setToast] = useState<string | null>(null)
  const [modal, setModal] = useState(false)
  return (
    <div className="relative flex min-h-svh flex-col gap-3 border-r p-3" data-compare-theme={personality} style={{ borderColor: 'var(--nx-line)' }}>
      <p className="text-sm">{verb}</p>
      <NxButton data-compare="button">{verb}</NxButton>
      <NxButton data-compare="toast" tone="quiet" onClick={() => setToast(`${verb} is filed.`)}>Toast</NxButton>
      <NxButton data-compare="modal" tone="quiet" onClick={() => setModal(true)}>Modal</NxButton>
      <Modal contained title={verb} open={modal} onClose={() => setModal(false)}>
        <p>Confirm {verb.toLowerCase()}.</p>
      </Modal>
      <ToastStack contained message={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

export function CompareRow() {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-6">
      <NxButton data-compare="button">Press</NxButton>
      <NxButton tone="quiet" onClick={() => undefined}>Quiet</NxButton>
    </div>
  )
}

export function KitFoot() {
  return (
    <div className="px-4 py-8">
      <EmptyState title="Nothing filed yet." action={<NxButton>Start</NxButton>} />
      <NotFound action={<NxButton>Back to the desk</NxButton>} />
    </div>
  )
}
