import { useRef, useState } from 'react'
import {
  AuroraBackground,
  BentoGrid,
  BentoItem,
  Button,
  DraggableCard,
  FlipCard,
  FloatingNavbar,
  GradientText,
  GridBackground,
  Hero,
  MagneticButton,
  Marquee,
  Modal,
  ModalClose,
  ModalContent,
  SpotlightCard,
  TextReveal,
  Typewriter,
} from '@/components/ui/index.ts'
import { cn } from '@/lib/utils.ts'

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
}) {
  return (
    <div className="mb-5 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
      {options.map((option) => {
        const selected = option === value
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onKeyDown={(event) => {
              const index = options.indexOf(value)
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
                return
              }
              event.preventDefault()
              const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1
              const next = options[(index + delta + options.length) % options.length]
              if (next) onChange(next)
            }}
            onClick={() => onChange(option)}
            className={cn(
              'h-9 rounded-full border px-3 text-xs tracking-wide capitalize',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
              selected
                ? 'border-transparent bg-[#f6f3ec] text-[#16140f]'
                : 'border-white/15 text-zinc-300 hover:bg-white/10',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export function DraggableCardDemo() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [snapBack, setSnapBack] = useState(false)
  const [note, setNote] = useState('The inner button still clicks.')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-300">Drag inside the frame. Arrow keys nudge a focused card. Home resets it.</p>
        <label className="inline-flex items-center gap-2 text-sm text-zinc-200">
          <input
            type="checkbox"
            checked={snapBack}
            onChange={(event) => setSnapBack(event.target.checked)}
            className="size-4 accent-[#8b7cff]"
          />
          Snap back
        </label>
      </div>
      <div
        ref={stageRef}
        className="relative h-[34rem] rounded-3xl border border-dashed border-white/20 bg-[#09090f]/40 md:h-[26rem]"
      >
        <DraggableCard
          bounds={stageRef}
          snapBack={snapBack}
          variant="glass"
          aria-label="Glass note card"
          className="absolute top-4 left-4 max-w-[calc(100%-2rem)]"
        >
          <p className="text-xs tracking-[0.18em] text-[#f5c16c] uppercase">Movable</p>
          <p className="mt-2 font-serif text-2xl text-[#f6f3ec]">Throw the card</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">It tilts with the flick, then stays above the other card.</p>
        </DraggableCard>
        <DraggableCard
          bounds={stageRef}
          handle
          snapBack={snapBack}
          variant="window"
          glowColor="rgba(255, 106, 61, 0.5)"
          aria-label="Card with a drag handle"
          className="absolute right-4 bottom-4 max-w-[calc(100%-2rem)]"
        >
          <p className="text-xs tracking-[0.18em] text-[#8b7cff] uppercase">Handle</p>
          <p className="mt-2 font-serif text-2xl text-[#f6f3ec]">Drag from the grip</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{note}</p>
          <Button className="mt-4" size="sm" variant="glow-outline" onClick={() => setNote('Click registered. The card did not swallow it.')}>
            Ping button
          </Button>
        </DraggableCard>
      </div>
    </div>
  )
}

export function SpotlightCardDemo() {
  const cards = [
    { title: 'Ada Klein', copy: 'A profile card with an avatar and a follow control.', color: 'rgba(139, 124, 255, 0.55)', variant: 'profile' as const },
    { title: 'Studio', copy: 'A pricing card with a figure and a choice.', color: 'rgba(255, 106, 61, 0.5)', variant: 'pricing' as const },
    { title: 'Lamp 04', copy: 'A product card with a stage and a price.', color: 'rgba(61, 222, 196, 0.45)', variant: 'product' as const },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <SpotlightCard key={card.title} variant={card.variant} spotlightColor={card.color} spotlightSize={160} className="min-h-52">
          <p className="text-xs tracking-[0.18em] text-zinc-400 uppercase">{card.variant}</p>
          <h3 className="mt-3 font-serif text-3xl">{card.title}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-300">{card.copy}</p>
        </SpotlightCard>
      ))}
    </div>
  )
}

export function ButtonDemo() {
  const [loading, setLoading] = useState(false)
  const [radius, setRadius] = useState<'md' | 'lg' | 'full'>('full')
  return (
    <div>
      <Segmented label="Corner radius" value={radius} options={['md', 'lg', 'full'] as const} onChange={setRadius} />
      <div className="flex flex-wrap items-center gap-3">
        <Button radius={radius}>Solid</Button>
        <Button radius={radius} variant="gradient">Gradient</Button>
        <Button radius={radius} variant="glass">Glass</Button>
        <Button radius={radius} variant="pressable">
          Press
        </Button>
        <Button radius={radius} variant="brutalist">
          Brutal
        </Button>
        <Button
          radius={radius}
          variant="solid"
          loading={loading}
          onClick={() => {
            setLoading(true)
            window.setTimeout(() => setLoading(false), 1200)
          }}
        >
          Save view
        </Button>
        <Button radius={radius} href="#button" variant="glow-outline">
          Glow
        </Button>
      </div>
    </div>
  )
}

export function MagneticButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8">
      <MagneticButton magnet="pill" strength={14} proximity={12}>
        Pull me closer
      </MagneticButton>
      <MagneticButton magnet="keycap" strength={10} proximity={12}>
        Key
      </MagneticButton>
      <MagneticButton magnet="bulb" strength={14} proximity={14}>
        Bulb
      </MagneticButton>
    </div>
  )
}

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="min-h-80 rounded-3xl" contentClassName="flex min-h-80 flex-col items-start justify-end p-8 md:p-10">
      <p className="text-xs tracking-[0.2em] text-zinc-200 uppercase">Aurora</p>
      <p className="mt-3 max-w-lg font-serif text-4xl leading-tight text-[#f6f3ec] md:text-5xl">
        Color that drifts instead of sitting still.
      </p>
    </AuroraBackground>
  )
}

export function GridBackgroundDemo() {
  const [variant, setVariant] = useState<'graph' | 'dots'>('dots')
  return (
    <div>
      <Segmented label="Pattern" value={variant} options={['dots', 'graph'] as const} onChange={setVariant} />
      <GridBackground variant={variant} className="min-h-72 rounded-3xl" contentClassName="flex min-h-72 items-end p-8">
        <p className="max-w-sm text-sm leading-6 text-zinc-200">
          Move the pointer. The mask follows, so the pattern lights up where you are.
        </p>
      </GridBackground>
    </div>
  )
}

export function GradientTextDemo() {
  return (
    <div className="space-y-4">
      <p className="font-serif text-5xl leading-[1.08] md:text-7xl">
        <GradientText>Night, gold, and iris.</GradientText>
      </p>
      <p className="text-lg text-zinc-300">
        Static fallback:{' '}
        <GradientText animate={false} from="#3ddec4" via="#f6f3ec" to="#ff6a3d">
          tide to flare
        </GradientText>
      </p>
    </div>
  )
}

export function TypewriterDemo() {
  const [paused, setPaused] = useState(false)
  return (
    <div className="space-y-4">
      <p className="font-serif text-4xl leading-tight md:text-5xl">
        Ship interfaces that feel{' '}
        <Typewriter
          className="text-[#f5c16c]"
          showControls={false}
          paused={paused}
          phrases={['deliberate.', 'movable.', 'alive.', 'yours.']}
        />
      </p>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
        className="inline-flex h-9 items-center rounded-full border border-white/20 px-3 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
      >
        {paused ? 'Play' : 'Pause'} typing
      </button>
    </div>
  )
}

export function TextRevealDemo() {
  const [by, setBy] = useState<'word' | 'char'>('word')
  const scroller = useRef<HTMLDivElement>(null)
  return (
    <div>
      <Segmented label="Split text by" value={by} options={['word', 'char'] as const} onChange={setBy} />
      <div ref={scroller} className="h-72 overflow-auto rounded-3xl border border-white/10 px-4">
        <div className="h-72" />
        <TextReveal
          key={by}
          by={by}
          as="p"
          container={scroller}
          className="max-w-2xl font-serif text-4xl leading-tight md:text-5xl"
          text="A line that brightens as it moves through the frame."
        />
        <div className="h-48" />
      </div>
    </div>
  )
}

export function FloatingNavbarDemo() {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('Product')
  const items = ['Product', 'Registry', 'Notes'].map((label) => ({
    label,
    href: '#floating-navbar',
    active: active === label,
    onClick: (event: { preventDefault: () => void }) => {
      event.preventDefault()
      setActive(label)
    },
  }))
  return (
    <div ref={scroller} className="h-96 overflow-auto rounded-3xl border border-white/10 bg-[#09090f]">
      <FloatingNavbar
        contained
        scrollRoot={scroller}
        className="mx-3 mt-3"
        logo={<span>Nexara</span>}
        items={items}
        actions={
          <Button size="sm" variant="solid">
            Start
          </Button>
        }
      />
      <div className="space-y-4 px-6 pt-8 pb-10">
        {['Scroll this pane.', 'The bar tightens after a few pixels.', 'On a narrow viewport, open Menu.'].map(
          (line) => (
            <p key={line} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-zinc-200">
              {line}
            </p>
          ),
        )}
        <div className="h-72" />
      </div>
    </div>
  )
}

export function ModalDemo() {
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState('')
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      {saved ? <p className="text-sm text-zinc-300">{saved}</p> : null}
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent
          title="Name this board"
          description="Focus stays inside until you close the dialog. Escape and the backdrop both dismiss it."
        >
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              const name = String(data.get('board') ?? 'Untitled')
              setSaved(`Saved “${name}”.`)
              setOpen(false)
            }}
          >
            <label className="block text-sm text-zinc-200" htmlFor="board-name">
              Board name
              <input
                id="board-name"
                name="board"
                defaultValue="Atelier"
                className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-black/30 px-3 text-[#f6f3ec] outline-none focus:ring-2 focus:ring-[#8b7cff]"
              />
            </label>
            <div className="flex flex-wrap justify-end gap-2">
              <ModalClose className="inline-flex h-11 items-center rounded-full border border-white/15 px-4 text-sm hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]">
                Cancel
              </ModalClose>
              <Button type="submit" variant="solid">
                Save
              </Button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </div>
  )
}

export function HeroDemo() {
  return (
    <Hero
      variant="stack"
      titleAs="h2"
      eyebrow="Opening"
      title="Ship the first screen."
      description="A reusable first viewport. Swap copy, media, and tokens."
      actions={
        <>
          <Button variant="gradient">Read the docs</Button>
          <Button variant="glow-outline" href="#navbar">
            Next family
          </Button>
        </>
      }
    />
  )
}

export function MarqueeDemo() {
  const [direction, setDirection] = useState<'left' | 'right'>('left')
  const items = ['Draggable', 'Spotlight', 'Aurora', 'Shimmer', 'Typewriter', 'Bento', 'Modal', 'Marquee']
  return (
    <div className="space-y-4">
      <Segmented label="Direction" value={direction} options={['left', 'right'] as const} onChange={setDirection} />
      <Marquee direction={direction} duration={22}>
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex h-12 items-center rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm text-[#f6f3ec]"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  )
}

function TideIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 12c2-2 3.5-2 5.5 0s3.5 2 5.5 0 3.5-2 3.5-2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 7c2-2 3.5-2 5.5 0s3.5 2 5.5 0 3.5-2 3.5-2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M9 1.5 10.4 7 16 8.2 10.4 9.6 9 15.5 7.6 9.6 2 8.2 7.6 7 9 1.5Z" fill="currentColor" />
    </svg>
  )
}

export function BentoGridDemo() {
  return (
    <BentoGrid>
      <BentoItem
        rowSpan={2}
        title="Chrome"
        description="Nav bars and dialogs with real focus handling. This tile holds two rows so the cells beside it stay filled."
        icon={<TideIcon />}
        spotlightColor="rgba(61, 222, 196, 0.35)"
        href="#bento-grid"
      />
      <BentoItem
        colSpan={2}
        title="Movable surfaces"
        description="Cards that can be thrown, flipped, or lit by the pointer."
        icon={<SparkIcon />}
        spotlightColor="rgba(139, 124, 255, 0.4)"
      />
      <BentoItem
        title="Text"
        description="Gradients, typing, and reveals."
        icon={<SparkIcon />}
        spotlightColor="rgba(245, 193, 108, 0.4)"
      />
      <BentoItem
        title="Backgrounds"
        description="Aurora fields and interactive grids that sit behind whatever you drop in."
        icon={<SparkIcon />}
        spotlightColor="rgba(255, 106, 61, 0.4)"
      >
        <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
          <span className="rounded-full border border-white/15 px-3 py-1">aurora</span>
          <span className="rounded-full border border-white/15 px-3 py-1">dots</span>
          <span className="rounded-full border border-white/15 px-3 py-1">grid</span>
        </div>
      </BentoItem>
    </BentoGrid>
  )
}

export function FlipCardDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm text-zinc-300">Hover, or focus the link on the back.</p>
        <FlipCard
          flipOn="hover"
          front={
            <div className="flex h-full flex-col justify-between">
              <p className="text-xs tracking-[0.18em] text-zinc-400 uppercase">Front</p>
              <div>
                <p className="font-serif text-3xl">Hover to turn</p>
                <p className="mt-2 text-sm text-zinc-300">The back stays available to the keyboard.</p>
              </div>
            </div>
          }
          back={
            <div className="flex h-full flex-col justify-between">
              <p className="text-xs tracking-[0.18em] text-[#f5c16c] uppercase">Back</p>
              <div>
                <p className="font-serif text-3xl">A second face</p>
                <a
                  href="#flip-card"
                  className="mt-3 inline-flex text-sm text-[#8b7cff] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
                >
                  Stay a while
                </a>
              </div>
            </div>
          }
        />
      </div>
      <div>
        <p className="mb-3 text-sm text-zinc-300">Click or press Enter to toggle.</p>
        <FlipCard
          flipOn="click"
          front={
            <div className="flex h-full flex-col justify-end">
              <p className="text-xs tracking-[0.18em] text-zinc-400 uppercase">Click</p>
              <p className="mt-2 font-serif text-3xl">Press to flip</p>
            </div>
          }
          back={
            <div className="flex h-full flex-col justify-end">
              <p className="text-xs tracking-[0.18em] text-[#3ddec4] uppercase">Back</p>
              <p className="mt-2 font-serif text-3xl">Press again to return</p>
            </div>
          }
          backClassName="bg-[#10221f]"
        />
      </div>
    </div>
  )
}
