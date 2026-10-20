'use client'

import { asText, type NxTier } from '@/lib/library.ts'
import { springs } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'

export const HERO_VARIANTS = [
  'still',
  'folio',
  'frame',
  'stack',
  'command',
  'fan',
  'board',
  'cover',
  'iris',
  'orbit',
  'kinetic',
] as const

export type HeroVariant = (typeof HERO_VARIANTS)[number]
export type MediaState = 'ready' | 'loading' | 'empty' | 'error'

export const HERO_TIER_META: Record<HeroVariant, { tier: NxTier; title: string; note: string }> = {
  still: { tier: 'basic', title: 'Still', note: 'Full-bleed media. Type as caption.' },
  folio: { tier: 'basic', title: 'Folio', note: 'Paper claim cut into a photograph.' },
  frame: { tier: 'basic', title: 'Frame', note: 'Working surface gets the pixels.' },
  stack: { tier: 'basic', title: 'Stack', note: 'Sentence and two doors.' },
  command: { tier: 'intermediate', title: 'Command', note: 'The field is the composition.' },
  fan: { tier: 'intermediate', title: 'Fan', note: 'Overlapping plates. Click brings one forward.' },
  board: { tier: 'intermediate', title: 'Board', note: 'Split-flap wall spells the claim.' },
  cover: { tier: 'intermediate', title: 'Cover', note: 'Type as architecture plus an index.' },
  iris: { tier: 'advanced', title: 'Iris', note: 'Mechanical aperture onto their media.' },
  orbit: { tier: 'advanced', title: 'Orbit', note: 'Aimed instrument in a clipped plate.' },
  kinetic: { tier: 'advanced', title: 'Kinetic', note: 'Letters have mass. CTA in the rail.' },
}

export type HeroFrame = { id: string; media?: ReactNode; label?: ReactNode }
export type HeroIndexItem = { id: string; label: string; href?: string }
export type HeroMode = { id: string; label: string }
export type HeroStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface HeroProps {
  variant?: HeroVariant
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3'
  eyebrow?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  mediaState?: MediaState
  mediaFallback?: ReactNode
  mediaError?: ReactNode
  caption?: ReactNode
  frames?: HeroFrame[]
  index?: HeroIndexItem[]
  kicker?: ReactNode
  control?: ReactNode
  onSubmit?: (value: string) => void
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  submitLabel?: ReactNode
  status?: HeroStatus
  statusMessage?: ReactNode
  results?: ReactNode
  flaps?: string
  progress?: 'none' | 'control' | 'scroll'
  opened?: boolean
  onOpenedChange?: (open: boolean) => void
  scene?: ReactNode
  fallback?: ReactNode
  modes?: HeroMode[]
  mode?: string
  onModeChange?: (id: string) => void
  lines?: string[]
  lockable?: boolean
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
}

const display = 'font-[family-name:var(--nx-font-display,ui-serif,Georgia,serif)]'
const body = 'font-[family-name:var(--nx-font-body,ui-sans-serif,system-ui,sans-serif)]'
const mono = 'font-[family-name:var(--nx-font-mono,ui-monospace,monospace)]'

/**
 * Hero
 * Eleven mechanisms: still, folio, frame, stack, command, fan, board,
 * cover, iris, orbit, kinetic. Tokens only. No brand defaults.
 * Copy this file plus `src/lib/utils.ts`, `src/lib/library.ts`, and `src/lib/kit.tsx`.
 * Orbit WebGL lives in `hero-scene.tsx` and is never imported here.
 */
export function Hero({
  variant = 'stack',
  title,
  titleAs = 'h1',
  eyebrow,
  description,
  actions,
  media,
  mediaState,
  mediaFallback,
  mediaError,
  caption,
  frames,
  index,
  kicker,
  control,
  onSubmit,
  inputProps,
  submitLabel,
  status = 'idle',
  statusMessage,
  results,
  flaps,
  progress = 'control',
  opened,
  onOpenedChange,
  scene,
  fallback,
  modes,
  mode,
  onModeChange,
  lines,
  lockable = true,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  mediaClassName,
}: HeroProps) {
  const layout = variant
  const Title = titleAs
  const resolvedState: MediaState = mediaState ?? (media ? 'ready' : 'empty')
  const shared = {
    Title,
    title,
    eyebrow,
    description,
    actions,
    media,
    mediaState: resolvedState,
    mediaFallback,
    mediaError,
    caption,
    className,
    eyebrowClassName,
    titleClassName,
    descriptionClassName,
    actionsClassName,
    mediaClassName,
  }

  if (layout === 'still') return <StillHero {...shared} />
  if (layout === 'folio') return <FolioHero {...shared} />
  if (layout === 'frame') return <FrameHero {...shared} />
  if (layout === 'stack') return <StackHero {...shared} />
  if (layout === 'command') {
    return (
      <CommandHero
        {...shared}
        control={control}
        onSubmit={onSubmit}
        inputProps={inputProps}
        submitLabel={submitLabel}
        status={status}
        statusMessage={statusMessage}
        results={results}
      />
    )
  }
  if (layout === 'fan') return <FanHero {...shared} frames={frames} />
  if (layout === 'board') return <BoardHero {...shared} flaps={flaps} />
  if (layout === 'cover') return <CoverHero {...shared} index={index} kicker={kicker} />
  if (layout === 'iris') {
    return (
      <IrisHero
        {...shared}
        progress={progress}
        opened={opened}
        onOpenedChange={onOpenedChange}
      />
    )
  }
  if (layout === 'orbit') {
    return (
      <OrbitHero
        {...shared}
        scene={scene}
        fallback={fallback}
        modes={modes}
        mode={mode}
        onModeChange={onModeChange}
      />
    )
  }
  return <KineticHero {...shared} lines={lines} lockable={lockable} />
}

type Base = {
  Title: 'h1' | 'h2' | 'h3'
  title: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  mediaState: MediaState
  mediaFallback?: ReactNode
  mediaError?: ReactNode
  caption?: ReactNode
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
}

function Shell({
  variant,
  className,
  children,
  style,
}: {
  variant: HeroVariant
  className?: string
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <section
      data-nexara="hero"
      data-variant={variant}
      data-tier={HERO_TIER_META[variant].tier}
      className={cn(body, 'relative isolate px-4 py-10 md:px-8 md:py-14', className)}
      style={{
        background: 'var(--nx-bg, inherit)',
        color: 'var(--nx-fg, inherit)',
        ...style,
      }}
    >
      {children}
    </section>
  )
}

function Eyebrow({ children, className }: { children?: ReactNode; className?: string }) {
  if (children == null || children === false) return null
  return (
    <p
      className={cn(mono, 'text-[11px] tracking-[0.22em] uppercase', className)}
      style={{ color: 'var(--nx-muted, inherit)' }}
    >
      {children}
    </p>
  )
}

function Lede({ children, className }: { children?: ReactNode; className?: string }) {
  if (children == null || children === false) return null
  return (
    <div className={cn('text-base leading-7 text-pretty', className)} style={{ color: 'var(--nx-muted, inherit)' }}>
      {children}
    </div>
  )
}

function Actions({ children, className }: { children?: ReactNode; className?: string }) {
  if (children == null || children === false) return null
  return <div className={cn('flex flex-wrap items-center gap-3 [&_a]:min-h-11 [&_button]:min-h-11', className)}>{children}</div>
}

function MediaWell({
  media,
  mediaState,
  mediaFallback,
  mediaError,
  className,
  label = 'Media',
  reserve = true,
}: {
  media?: ReactNode
  mediaState: MediaState
  mediaFallback?: ReactNode
  mediaError?: ReactNode
  className?: string
  label?: string
  reserve?: boolean
}) {
  if (mediaState === 'loading') {
    return (
      <div
        className={cn('min-h-48 animate-pulse', className)}
        style={{ background: 'var(--nx-elev, transparent)' }}
        aria-busy="true"
        aria-label={`${label} loading`}
      />
    )
  }
  if (mediaState === 'error') {
    return (
      <div
        className={cn('grid min-h-48 place-items-center border border-dashed px-4', className)}
        style={{ borderColor: 'var(--nx-line, currentColor)' }}
        role="alert"
      >
        {mediaFallback ?? mediaError ?? (
          <span className={cn(mono, 'text-[11px] tracking-[0.18em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
            {label} unavailable
          </span>
        )}
      </div>
    )
  }
  if (media) return <div className={className}>{media}</div>
  if (!reserve) return null
  return (
    <div
      className={cn('grid min-h-48 place-items-center border border-dashed', className)}
      style={{ borderColor: 'var(--nx-line, currentColor)' }}
      aria-label={label}
    >
      <span className={cn(mono, 'text-[11px] tracking-[0.18em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
        {label}
      </span>
    </div>
  )
}

function Heading({
  as: Title,
  children,
  className,
}: {
  as: 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
}) {
  return (
    <Title
      className={cn(display, 'text-balance text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.92] tracking-[-0.03em]', className)}
    >
      {children}
    </Title>
  )
}

function StillHero(props: Base) {
  return (
    <Shell variant="still" className={cn('px-0 py-0', props.className)}>
      <div className="relative min-h-[28rem] overflow-hidden md:min-h-[36rem]">
        <MediaWell
          media={props.media}
          mediaState={props.mediaState}
          mediaFallback={props.mediaFallback}
          mediaError={props.mediaError}
          className={cn('absolute inset-0 [&>*]:h-full [&>*]:w-full [&>*]:object-cover', props.mediaClassName)}
          label="Still"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background: 'linear-gradient(to top, var(--nx-bg, currentColor) 12%, transparent)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex min-h-[28rem] flex-col justify-end gap-4 px-4 py-8 md:min-h-[36rem] md:px-10 md:py-12">
          <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
          <Heading as={props.Title} className={props.titleClassName}>
            {props.title}
          </Heading>
          <Lede className={cn('max-w-xl', props.descriptionClassName)}>{props.description}</Lede>
          <Actions className={props.actionsClassName}>{props.actions}</Actions>
          {props.caption ? (
            <p className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
              {props.caption}
            </p>
          ) : null}
        </div>
      </div>
    </Shell>
  )
}

function FolioHero(props: Base) {
  return (
    <Shell variant="folio" className={props.className}>
      <div className="mx-auto grid max-w-6xl overflow-hidden md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col justify-between gap-8 p-1 md:pr-10 md:pl-0">
          <div className="space-y-5">
            <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
            <Heading as={props.Title} className={props.titleClassName}>
              {props.title}
            </Heading>
            <Lede className={cn('max-w-md', props.descriptionClassName)}>{props.description}</Lede>
          </div>
          <Actions className={props.actionsClassName}>{props.actions}</Actions>
        </div>
        <MediaWell
          media={props.media}
          mediaState={props.mediaState}
          mediaFallback={props.mediaFallback}
          mediaError={props.mediaError}
          className={cn('min-h-72 overflow-hidden [&>*]:h-full [&>*]:w-full [&>*]:object-cover', props.mediaClassName)}
          label="Folio plate"
        />
      </div>
    </Shell>
  )
}

function FrameHero(props: Base) {
  const reduced = usePrefersReducedMotion()
  return (
    <Shell variant="frame" className={props.className}>
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
            <Heading as={props.Title} className={cn('text-[clamp(2.25rem,4vw,3.4rem)]', props.titleClassName)}>
              {props.title}
            </Heading>
            <Lede className={props.descriptionClassName}>{props.description}</Lede>
          </div>
          <Actions className={props.actionsClassName}>{props.actions}</Actions>
        </div>
        <motion.div
          initial={reduced ? false : { y: 18, opacity: 0.88 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.heavy}
          className="relative min-h-[22rem] overflow-hidden md:min-h-[28rem]"
          style={{
            background: 'var(--nx-elev, transparent)',
            boxShadow: 'var(--nx-shadow, none)',
          }}
        >
          <Corners />
          <MediaWell
            media={props.media}
            mediaState={props.mediaState}
            mediaFallback={props.mediaFallback}
            mediaError={props.mediaError}
            className={cn('h-full min-h-[22rem] p-3 md:min-h-[28rem] md:p-4 [&>*]:h-full [&>*]:w-full', props.mediaClassName)}
            label="Working surface"
          />
          {props.caption ? (
            <p
              className={cn(mono, 'absolute right-4 bottom-3 text-[11px] tracking-[0.16em] uppercase')}
              style={{ color: 'var(--nx-muted, inherit)' }}
            >
              {props.caption}
            </p>
          ) : null}
        </motion.div>
      </div>
    </Shell>
  )
}

function StackHero(props: Base) {
  return (
    <Shell variant="stack" className={props.className}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
        <Heading as={props.Title} className={cn('mt-4', props.titleClassName)}>
          {props.title}
        </Heading>
        <Lede className={cn('mx-auto mt-5 max-w-xl', props.descriptionClassName)}>{props.description}</Lede>
        <Actions className={cn('mt-8 justify-center', props.actionsClassName)}>{props.actions}</Actions>
        <MediaWell
          media={props.media}
          mediaState={props.mediaState}
          mediaFallback={props.mediaFallback}
          mediaError={props.mediaError}
          reserve={false}
          className={cn('mt-10 w-full max-w-xl overflow-hidden', props.mediaClassName)}
          label="Media"
        />
      </div>
    </Shell>
  )
}

function CommandHero({
  control,
  onSubmit,
  inputProps,
  submitLabel,
  status,
  statusMessage,
  results,
  ...props
}: Base & {
  control?: ReactNode
  onSubmit?: (value: string) => void
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  submitLabel?: ReactNode
  status: HeroStatus
  statusMessage?: ReactNode
  results?: ReactNode
}) {
  const fieldId = useId()
  const reduced = usePrefersReducedMotion()
  function handle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = String(data.get('q') ?? '')
    onSubmit?.(value)
  }
  return (
    <Shell variant="command" className={props.className}>
      <div className="mx-auto max-w-3xl">
        <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
        <Heading as={props.Title} className={cn('mt-4', props.titleClassName)}>
          {props.title}
        </Heading>
        <Lede className={cn('mt-4 max-w-xl', props.descriptionClassName)}>{props.description}</Lede>
        <div
          className="mt-8 overflow-hidden border"
          style={{ borderColor: 'var(--nx-line, currentColor)', background: 'var(--nx-elev, transparent)' }}
        >
          {control ?? (
            <form className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center" onSubmit={handle}>
              <label className="sr-only" htmlFor={fieldId}>
                {inputProps?.['aria-label'] ?? 'Command'}
              </label>
              <input
                id={fieldId}
                name="q"
                disabled={status === 'submitting'}
                aria-invalid={status === 'error' || undefined}
                className="h-12 min-w-0 flex-1 bg-transparent px-4 outline-none"
                style={{ color: 'var(--nx-fg, inherit)' }}
                {...inputProps}
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="h-12 min-w-28 px-5 text-sm"
                style={{ background: 'var(--nx-accent, currentColor)', color: 'var(--nx-accent-fg, inherit)' }}
              >
                {status === 'submitting' ? 'Working' : (submitLabel ?? 'Go')}
              </button>
            </form>
          )}
          {statusMessage ? (
            <p className="border-t px-4 py-3 text-sm" style={{ borderColor: 'var(--nx-line, currentColor)' }} role="status">
              {statusMessage}
            </p>
          ) : null}
          <AnimatePresence>
            {results ? (
              <motion.div
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduced ? undefined : { height: 0, opacity: 0 }}
                transition={springs.snap}
                className="border-t"
                style={{ borderColor: 'var(--nx-line, currentColor)' }}
              >
                {results}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <Actions className={cn('mt-6', props.actionsClassName)}>{props.actions}</Actions>
      </div>
    </Shell>
  )
}

function FanHero({ frames, ...props }: Base & { frames?: HeroFrame[] }) {
  const plates = frames && frames.length > 0 ? frames : props.media ? [{ id: 'media', media: props.media }] : []
  const [front, setFront] = useState(plates[0]?.id ?? '')
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (plates[0] && !plates.some((item) => item.id === front)) setFront(plates[0].id)
  }, [front, plates])
  return (
    <Shell variant="fan" className={props.className}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
          <Heading as={props.Title} className={cn('mt-4', props.titleClassName)}>
            {props.title}
          </Heading>
          <Lede className={cn('mt-4 max-w-md', props.descriptionClassName)}>{props.description}</Lede>
          <Actions className={cn('mt-8', props.actionsClassName)}>{props.actions}</Actions>
        </div>
        <div className={cn('relative min-h-80', props.mediaClassName)}>
          {plates.length === 0 ? (
            <MediaWell media={undefined} mediaState={props.mediaState} label="Fan plates" className="min-h-80" />
          ) : (
            plates.map((plate, index) => {
              const active = plate.id === front
              const offset = index - plates.findIndex((item) => item.id === front)
              return (
                <motion.button
                  key={plate.id}
                  type="button"
                  onClick={() => setFront(plate.id)}
                  aria-pressed={active}
                  aria-label={asText(plate.label) || `Plate ${index + 1}`}
                  className="absolute inset-x-6 top-6 bottom-8 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    background: 'var(--nx-elev, transparent)',
                    boxShadow: 'var(--nx-shadow, none)',
                    zIndex: active ? 20 : 10 - Math.abs(offset),
                    outlineColor: 'var(--nx-ring, currentColor)',
                  }}
                  animate={
                    reduced
                      ? { x: 0, y: 0, rotate: 0, scale: active ? 1 : 0.96 }
                      : {
                          x: offset * 18,
                          y: Math.abs(offset) * 10,
                          rotate: offset * 4,
                          scale: active ? 1 : 0.94,
                        }
                  }
                  transition={springs.ui}
                >
                  <div className="h-full w-full [&>*]:h-full [&>*]:w-full [&>*]:object-cover">{plate.media}</div>
                  {plate.label ? (
                    <span
                      className={cn(mono, 'absolute right-3 bottom-3 text-[11px] tracking-[0.16em] uppercase')}
                      style={{ color: 'var(--nx-fg, inherit)' }}
                    >
                      {plate.label}
                    </span>
                  ) : null}
                </motion.button>
              )
            })
          )}
        </div>
      </div>
    </Shell>
  )
}

function BoardHero({ flaps, ...props }: Base & { flaps?: string }) {
  const reduced = usePrefersReducedMotion()
  const claim = flaps ?? asText(props.title)
  const glyphs = Array.from(claim || ' ')
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => setTick((value) => value + 1), 90)
    return () => window.clearInterval(id)
  }, [reduced])
  return (
    <Shell variant="board" className={props.className}>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
          <Actions className={props.actionsClassName}>{props.actions}</Actions>
        </div>
        <div className="sr-only">
          <Heading as={props.Title}>{props.title}</Heading>
        </div>
        <div className="mt-8 flex flex-wrap gap-1.5" aria-hidden={false} aria-label={claim}>
          {glyphs.map((glyph, index) => {
            const revealed = reduced || index <= tick
            const face = revealed ? glyph : ''
            return (
              <span
                key={`${glyph}-${index}`}
                className={cn(
                  display,
                  'inline-grid h-[clamp(2.6rem,8vw,4.6rem)] min-w-[0.72em] place-items-center overflow-hidden border px-[0.12em] text-[clamp(1.6rem,5vw,3.2rem)] leading-none',
                )}
                style={{
                  borderColor: 'var(--nx-line, currentColor)',
                  background: 'var(--nx-elev, transparent)',
                  color: 'var(--nx-fg, inherit)',
                  transform: revealed ? 'none' : 'rotateX(80deg)',
                  transformOrigin: 'top',
                  transition: reduced ? undefined : 'transform 180ms ease',
                }}
              >
                {glyph === ' ' ? '\u00a0' : face}
              </span>
            )
          })}
        </div>
        <Lede className={cn('mt-8 max-w-xl', props.descriptionClassName)}>{props.description}</Lede>
      </div>
    </Shell>
  )
}

function CoverHero({ index, kicker, ...props }: Base & { index?: HeroIndexItem[]; kicker?: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  return (
    <Shell variant="cover" className={props.className}>
      <div className="mx-auto max-w-6xl">
        <div
          className="flex items-end justify-between gap-4 border-b pb-3"
          style={{ borderColor: 'var(--nx-line, currentColor)' }}
        >
          <Eyebrow className={props.eyebrowClassName}>{props.eyebrow ?? kicker}</Eyebrow>
        </div>
        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={springs.heavy}
          className="origin-left h-px"
          style={{ background: 'var(--nx-metal, currentColor)' }}
          aria-hidden="true"
        />
        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(12rem,0.6fr)]">
          <Heading as={props.Title} className={cn('text-[clamp(2.4rem,8vw,6.4rem)]', props.titleClassName)}>
            {props.title}
          </Heading>
          {index && index.length > 0 ? (
            <ol className="space-y-2 self-end">
              {index.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={cn(mono, 'flex items-baseline justify-between gap-4 py-2 text-sm tracking-[0.08em] uppercase')}
                    style={{ borderBottom: '1px solid var(--nx-line, currentColor)' }}
                  >
                    <span style={{ color: 'var(--nx-muted, inherit)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
        <div
          className="flex flex-col gap-6 border-t pt-6 md:flex-row md:items-end md:justify-between"
          style={{ borderColor: 'var(--nx-line, currentColor)' }}
        >
          <Lede className={cn('max-w-lg', props.descriptionClassName)}>{props.description}</Lede>
          <Actions className={props.actionsClassName}>{props.actions}</Actions>
        </div>
        <MediaWell
          media={props.media}
          mediaState={props.mediaState}
          mediaFallback={props.mediaFallback}
          mediaError={props.mediaError}
          reserve={false}
          className={cn('mt-8', props.mediaClassName)}
          label="Cover plate"
        />
      </div>
    </Shell>
  )
}

function IrisHero({
  progress,
  opened,
  onOpenedChange,
  ...props
}: Base & {
  progress?: 'none' | 'control' | 'scroll'
  opened?: boolean
  onOpenedChange?: (open: boolean) => void
}) {
  const reduced = usePrefersReducedMotion()
  const stage = useRef<HTMLElement>(null)
  const [amount, setAmount] = useState(opened || reduced || progress === 'none' ? 1 : 0.22)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (progress !== 'scroll' || reduced) return
    setAmount(0.22 + value * 0.78)
  })
  const hole = `${7 + amount * 71}%`
  useEffect(() => {
    if (reduced) setAmount(1)
  }, [reduced])
  return (
    <section
      ref={stage}
      data-nexara="hero"
      data-variant="iris"
      data-tier="advanced"
      className={cn(body, 'relative isolate', props.className)}
      style={{
        background: 'var(--nx-bg, inherit)',
        color: 'var(--nx-fg, inherit)',
        height: progress === 'scroll' && !reduced ? '180vh' : undefined,
      }}
    >
      <div className={cn('overflow-hidden', progress === 'scroll' && !reduced ? 'sticky top-0 h-svh' : 'min-h-[min(100svh,40rem)]')}>
        <div className="absolute inset-0" style={{ clipPath: `circle(${hole} at 50% 54%)` }}>
          <MediaWell
            media={props.media}
            mediaState={props.mediaState}
            mediaFallback={props.mediaFallback}
            mediaError={props.mediaError}
            className={cn('absolute inset-0 [&>*]:h-full [&>*]:w-full [&>*]:object-cover', props.mediaClassName)}
            label="Iris well"
          />
        </div>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <polygon
              key={i}
              points="50,50 50,4 62,8"
              fill="var(--nx-elev, currentColor)"
              opacity={0.55 - amount * 0.4}
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
        </svg>
        <div className="relative z-10 flex min-h-[min(100svh,40rem)] flex-col justify-between px-4 py-8 md:px-10">
          <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
          <div className="max-w-2xl space-y-4">
            <Heading as={props.Title} className={props.titleClassName}>
              {props.title}
            </Heading>
            <Lede className={props.descriptionClassName}>{props.description}</Lede>
            <Actions className={props.actionsClassName}>{props.actions}</Actions>
          </div>
          {progress === 'control' && !reduced ? (
            <label className={cn(mono, 'flex max-w-xs items-center gap-3 text-[11px] tracking-[0.16em] uppercase')}>
              <span style={{ color: 'var(--nx-muted, inherit)' }}>Aperture</span>
              <input
                type="range"
                min={0.12}
                max={1}
                step={0.01}
                value={amount}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setAmount(next)
                  onOpenedChange?.(next > 0.72)
                }}
                className="h-11 flex-1 accent-[var(--nx-accent,currentColor)]"
              />
            </label>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function OrbitHero({
  scene,
  fallback,
  modes,
  mode,
  onModeChange,
  ...props
}: Base & {
  scene?: ReactNode
  fallback?: ReactNode
  modes?: HeroMode[]
  mode?: string
  onModeChange?: (id: string) => void
}) {
  const reduced = usePrefersReducedMotion()
  const [current, setCurrent] = useState(mode ?? modes?.[0]?.id ?? '')
  const plate = fallback ?? props.mediaFallback
  const showScene = Boolean(scene) && !reduced
  return (
    <Shell variant="orbit" className={props.className}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
        <div>
          <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
          <Heading as={props.Title} className={cn('mt-4', props.titleClassName)}>
            {props.title}
          </Heading>
          <Lede className={cn('mt-4 max-w-md', props.descriptionClassName)}>{props.description}</Lede>
          {modes && modes.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Instrument modes">
              {modes.map((item) => {
                const active = item.id === (mode ?? current)
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={cn(mono, 'h-11 px-3 text-[11px] tracking-[0.14em] uppercase')}
                    style={{
                      background: active ? 'var(--nx-accent, currentColor)' : 'transparent',
                      color: active ? 'var(--nx-accent-fg, inherit)' : 'var(--nx-fg, inherit)',
                      border: '1px solid var(--nx-line, currentColor)',
                    }}
                    onClick={() => {
                      setCurrent(item.id)
                      onModeChange?.(item.id)
                    }}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          ) : null}
          <Actions className={cn('mt-8', props.actionsClassName)}>{props.actions}</Actions>
        </div>
        <div
          className={cn('relative min-h-80 overflow-hidden', props.mediaClassName)}
          style={{ background: 'var(--nx-elev, transparent)' }}
        >
          <Corners />
          {showScene ? (
            scene
          ) : plate || props.media ? (
            <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full">{plate ?? props.media}</div>
          ) : (
            <MediaWell media={undefined} mediaState={props.mediaState} label="Instrument still" className="min-h-80" />
          )}
        </div>
      </div>
    </Shell>
  )
}

function KineticHero({ lines, lockable, ...props }: Base & { lines?: string[]; lockable?: boolean }) {
  const reduced = usePrefersReducedMotion()
  const copy = lines ?? asText(props.title).split(/\n/).filter(Boolean)
  const [locked, setLocked] = useState<Record<string, boolean>>({})
  const chars = useMemo(
    () =>
      copy.map((line, lineIndex) =>
        Array.from(line).map((glyph, glyphIndex) => ({
          id: `${lineIndex}-${glyphIndex}`,
          glyph,
          space: glyph === ' ',
        })),
      ),
    [copy],
  )
  return (
    <Shell variant="kinetic" className={props.className}>
      <div className="mx-auto max-w-6xl">
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b pb-4"
          style={{ borderColor: 'var(--nx-line, currentColor)' }}
        >
          <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
          <div className="flex flex-wrap items-center gap-3">
            {lockable ? (
              <button
                type="button"
                onClick={() => setLocked({})}
                className={cn(mono, 'h-11 px-3 text-[11px] tracking-[0.14em] uppercase')}
                style={{ border: '1px solid var(--nx-line, currentColor)' }}
              >
                Unlock
              </button>
            ) : null}
            <Actions className={props.actionsClassName}>{props.actions}</Actions>
          </div>
        </div>
        <div className="sr-only">
          <Heading as={props.Title}>{props.title}</Heading>
        </div>
        <div className="mt-8 space-y-2" aria-label={copy.join(' ')}>
          {chars.map((line, lineIndex) => (
            <p
              key={copy[lineIndex]}
              className={cn(display, 'flex flex-wrap text-[clamp(2.6rem,9vw,7rem)] leading-[0.84] tracking-[-0.04em]')}
            >
              {line.map((item) => {
                if (item.space) return <span key={item.id} className="inline-block w-[0.28em]" />
                const isLocked = Boolean(locked[item.id])
                if (!lockable) {
                  return (
                    <span key={item.id} className="inline-block px-[0.01em]">
                      {item.glyph}
                    </span>
                  )
                }
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    aria-pressed={isLocked}
                    aria-label={`Letter ${item.glyph}${isLocked ? ', locked' : ''}`}
                    onClick={() => setLocked((current) => ({ ...current, [item.id]: !current[item.id] }))}
                    className="relative inline-block cursor-pointer px-[0.01em] focus-visible:outline-none focus-visible:ring-2"
                    style={{ outlineColor: 'var(--nx-ring, currentColor)' }}
                    whileHover={reduced ? undefined : { y: -14, rotate: -5 }}
                    animate={
                      isLocked
                        ? { y: -22, rotate: -8, color: 'var(--nx-accent, inherit)' }
                        : { y: 0, rotate: 0, color: 'var(--nx-fg, inherit)' }
                    }
                    transition={springs.snap}
                  >
                    {item.glyph}
                  </motion.button>
                )
              })}
            </p>
          ))}
        </div>
        <Lede className={cn('mt-10 max-w-xl', props.descriptionClassName)}>{props.description}</Lede>
      </div>
    </Shell>
  )
}

function Corners() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-2">
      {(['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'] as const).map((pos) => (
        <span
          key={pos}
          className={cn('absolute h-3 w-3', pos)}
          style={{
            borderColor: 'var(--nx-metal, currentColor)',
            borderTopWidth: pos.includes('top') ? 1 : 0,
            borderBottomWidth: pos.includes('bottom') ? 1 : 0,
            borderLeftWidth: pos.includes('left') ? 1 : 0,
            borderRightWidth: pos.includes('right') ? 1 : 0,
            borderStyle: 'solid',
          }}
        />
      ))}
    </div>
  )
}
