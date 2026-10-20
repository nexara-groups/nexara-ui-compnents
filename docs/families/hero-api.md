# Hero family — front-end API

Role: FE (typed API, perf, a11y). Implements [`hero.md`](./hero.md). Does not implement [`../research/hero-motion.md`](../research/hero-motion.md)’s industry table.

Helio cinematic / orbital / kinetic stay under `src/components/flagship/`. This family is `src/components/ui/hero*.tsx`. Grep of those files must not match `Helio`, `Heliograph`, `Nexara`, `Lamp`, `Harbor`, or palette hex.

---

## Verdict

The implementable eleven are Product’s jobs, not Motion’s costumes and not a third naming scheme:

`split` `stack` `capture` `video` `frame` `proof` `stage` `cover` `iris` `orbit` `kinetic`

One public component, `Hero`. Variants are a string union. Tier metadata is a const export the registry reads. Theme is CSS variables on the host. Copy-paste is **one family file** (`hero.tsx`) + `utils.ts` + the token block. Orbit adds `hero-scene.tsx` and the three WebGL packages.

That is a kit. Eleven files, eleven discriminated components, a layout DSL, or Lenis is a framework. We will not.

---

## File shape

```
src/components/ui/hero.tsx         // Hero, HeroProps, HERO_VARIANTS, HERO_TIER_META, all 11 layouts
src/components/ui/hero-scene.tsx   // orbit Canvas only. lazy() from the orbit branch. never imported by the other ten
src/lib/utils.ts                   // cn, usePrefersReducedMotion
```

Token block lives **in `hero.tsx`** on `[data-nexara="hero"]`, with fallbacks, so `theme.ts` / `NxTheme` is optional.

Rules:

- `hero.tsx` does **not** statically import `hero-scene.tsx`, `@react-three/*`, `three`, `lenis`, `@/components/flagship/*`, or `@/flagship/assets`.
- `lazy(() => import('./hero-scene'))` runs only when `variant === 'orbit'` and reduced-motion is false and the plate has been in view once.
- Do not split `hero-iris.tsx` / `hero-kinetic.tsx`. Iris and kinetic are Framer transforms. A reuser who pastes `split` already owns the file; they delete branches they do not need. Four source files is a mini-package (fight with Product, below).
- Kill `align`. Kill hardcoded ids (`nexara-hero-search`). `useId()` for every field.

Registry item `hero`: one item, `variants[]` from `HERO_VARIANTS`. `files[]` always includes `hero.tsx`. Orbit’s extra file and deps come from `HERO_TIER_META`, not from hanging `three` on the whole item.

---

## Slot vs prop

If the component must **know** the value to do layout, a11y, or motion, it is a **prop**. If the reuser is composing a foreign node the family will not inspect, it is a **slot**. Class names are neither: they are `cn` merges.

| | Prop (data / state) | Slot (ReactNode) |
| --- | --- | --- |
| Copy | `title`, `titleAs`, `eyebrow`, `description`, `kicker`, `indexLabel` | — |
| Way through | — | `actions` (compose `Button` / `MagneticButton`) |
| Proof asset | `mediaState`, `mediaSide` | `media`, `mediaFallback` |
| Capture | `status`, `statusMessage`, `onSubmit`, `inputProps`, `submitLabel` | `control` (preferred), `socialProof` |
| Video | `onPlay`, `playHref`, `playLabel`, `durationLabel` | `media` (poster) |
| Frame | — | `media` (the plate), `caption` |
| Proof | `logos[]` | `quote.text`, `quote.attribution` |
| Stage | `price`, `options[]`, `value`, `onOptionChange` | `media` |
| Cover | `kicker`, `indexLabel` | `media` (optional plate) |
| Iris | `chapters[]`, `progress`, `opened`, `onOpenedChange` | `media` (inside the hole) |
| Orbit | `modes[]`, `value`, `onModeChange`, `onPulse` | `scene` (optional WebGL), `fallback` (**required**) |
| Kinetic | `title: string` **or** `lines: string[]`, `lockable`, `shear` | `actions` (required as a region — kinetic is not a poster) |

`actions` stays a slot (Product). FE will not invent `HeroAction[]` as the only API. Docs still treat a primary CTA as required for conversion; the type allows empty so a draft does not lie.

Do not add `Hero.Root` / `Hero.Media`, render props, or a layout builder. If a job needs a new bag, it is probably a different family.

---

## Variant ids (implementable)

Paste-frequency order. BASIC four first. Do not reverse this list to put iris on top.

| id | Band | Job | One motion idea (allowed) | Not this |
| --- | --- | --- | --- | --- |
| `split` | BASIC | Claim beside proof. **Default paste.** | In-view copy stagger or nothing | Traffic-light chrome, dashboard, iris |
| `stack` | BASIC | Sentence + two doors. Optional capped media **below** | Same | Full-bleed stretch (Round-1 defect), 8xl mast |
| `capture` | BASIC | Email or query is the first-screen job. Waitlist **and** search are this. | Optional `useCount` on a figure already in `socialProof`. Field usable at frame 0 | Two variants, confetti, typewriter placeholder |
| `video` | BASIC | Poster + play. Dialog or href | Play is a `<button>`. Expansion is **not** the default | 320vh cinema, autoplay wallpaper, 180vh pin in the docs card |
| `frame` | INTERMEDIATE | Cropped product UI gets more pixels than the pitch | Optional **local** overflow inside the plate. Page scroll stays native | Fake sidebar, metric-tile dashboard, traffic lights |
| `proof` | INTERMEDIATE | Logos + optional quote, then CTA | Static row | Marquee, North/Kite/Harbor defaults |
| `stage` | INTERMEDIATE | Object + optional option picker | Instant swap; optional 4px seat on the object | PDP, cart, baked `$220`, phone pair as a variant |
| `cover` | INTERMEDIATE | Type as object: kicker, index, rule | Optional hairline seat (`spring.snap`). Title does not move | `agency` vs `editorial` twins, Fig 0.1, 8xl that hides the CTA |
| `iris` | ADVANCED | Aperture onto **their** media. Conversion on frame 0 | **The hole.** Default one viewport, opened by a control | 320vh landing, CTA fade, Helio blades as identity, +kinetic, +WebGL |
| `orbit` | ADVANCED | Object that answers the pointer | Contained canvas or the still. Lazy, paused | Helio crystal default, dashboard needle, `position: fixed`, HDRI |
| `kinetic` | ADVANCED | Letters with mass **and** a CTA | Mass. `lockable` / `shear` default **false** | “THE NIGHT / KEEPS SIGNAL”, no button, iris hole |

### Cut — not implementable here without becoming a framework

| Dead id | Why FE will not type it |
| --- | --- |
| center, mast, overlap, rail, band, … | Geometry pass. Same slots, different columns. |
| saas, download, logos, pricing, agency, commerce, event, search, dashboard, editorial, waitlist | Industry pass. Motion’s table revives these as motion hosts. They are costumes. |
| `logos` | `Marquee`. |
| `pricing` | Pricing family. A walking ring is not a first screen. |
| `dashboard` | App shell. A WebGL needle belongs on a stat tile in bento, not in Hero. |
| `event` | Countdown component. Split-flap digits are not a conversion section. |
| `download` | Badges compose into `actions`. Two-phone shear is a slot the reuser builds. |
| Helio `CinematicHero` / `OrbitalHero` / `KineticHero` | Flagship references. Do not import them. |

Eleven. Stop.

---

## `HeroProps`

One exported union, one function. Unused bags are ignored at runtime. Required extras are enforced by the discriminant so `<Hero variant="orbit">` does not type-check without `fallback`.

```ts
import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from 'react'

export const HERO_VARIANTS = [
  'split',
  'stack',
  'capture',
  'video',
  'frame',
  'proof',
  'stage',
  'cover',
  'iris',
  'orbit',
  'kinetic',
] as const

export type HeroVariant = (typeof HERO_VARIANTS)[number]
export type HeroBand = 'basic' | 'intermediate' | 'advanced'
export type HeroTier = 'css' | 'motion' | 'webgl'
export type MediaState = 'ready' | 'loading' | 'empty' | 'error'
export type CaptureStatus = 'idle' | 'submitting' | 'success' | 'error'
export type IrisProgress = 'none' | 'control' | 'scroll'

export type HeroLogo =
  | { id: string; node: ReactNode }
  | { id: string; src: string; alt: string }

export type HeroOption = { id: string; label: string; swatch?: string }

export type HeroChapter = { id: string; label: string; at: number }

export type HeroMode = { id: string; label: string }

export type HeroClassNames = {
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
}

export type HeroBase = HeroClassNames & {
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' // default 'h1'. Docs previews pass 'h2'/'h3'
  eyebrow?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  mediaState?: MediaState // default: media ? 'ready' : 'empty'
  mediaFallback?: ReactNode
  mediaError?: ReactNode
  /** Docs cards set true: @container queries, not viewport md. */
  contained?: boolean
  /** Nested scroller for iris/video progress. Window when omitted. */
  scrollRoot?: RefObject<HTMLElement | null>
}

type Split = HeroBase & {
  variant?: 'split' // default
  mediaSide?: 'end' | 'start'
}

type Stack = HeroBase & { variant: 'stack' }

type Capture = HeroBase & {
  variant: 'capture'
  control?: ReactNode
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  inputProps?: ComponentProps<'input'>
  submitLabel?: string
  status?: CaptureStatus
  statusMessage?: ReactNode
  socialProof?: ReactNode
}

type Video = HeroBase & {
  variant: 'video'
  onPlay?: () => void
  playHref?: string
  playLabel?: string
  durationLabel?: string
  /** Default none. 'scroll' is opt-in, cap 180vh, never the docs default. */
  progress?: 'none' | 'scroll'
}

type Frame = HeroBase & {
  variant: 'frame'
  caption?: ReactNode
}

type Proof = HeroBase & {
  variant: 'proof'
  logos?: HeroLogo[]
  quote?: { text: ReactNode; attribution?: ReactNode }
}

type Stage = HeroBase & {
  variant: 'stage'
  price?: ReactNode
  options?: HeroOption[]
  value?: string
  onOptionChange?: (id: string) => void
}

type Cover = HeroBase & {
  variant: 'cover'
  kicker?: ReactNode
  indexLabel?: string
}

type Iris = HeroBase & {
  variant: 'iris'
  chapters?: HeroChapter[]
  progress?: IrisProgress // default 'control'
  opened?: boolean
  onOpenedChange?: (opened: boolean) => void
}

type Orbit = HeroBase & {
  variant: 'orbit'
  fallback: ReactNode // required — still, also the reduced-motion view
  scene?: ReactNode
  modes?: HeroMode[]
  value?: string
  onModeChange?: (id: string) => void
  onPulse?: () => void
}

type Kinetic = Omit<HeroBase, 'title'> & {
  variant: 'kinetic'
  title?: string
  lines?: readonly string[]
  lockable?: boolean // default false
  shear?: boolean // default false
  actions?: ReactNode // required in docs; typed optional so drafts compile
}

export type HeroProps =
  | Split
  | Stack
  | Capture
  | Video
  | Frame
  | Proof
  | Stage
  | Cover
  | Iris
  | Orbit
  | Kinetic

export type HeroTierMeta = {
  id: HeroVariant
  band: HeroBand
  tier: HeroTier
  files: readonly string[]
  deps: readonly string[]
  required: readonly string[]
  reducedMotion: string
  preview: 'card' | 'viewport'
}

export const HERO_TIER_META: Record<HeroVariant, HeroTierMeta> = {
  split: {
    id: 'split',
    band: 'basic',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'actions'],
    reducedMotion: 'No stagger. Copy and media at rest.',
    preview: 'card',
  },
  stack: {
    id: 'stack',
    band: 'basic',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'actions'],
    reducedMotion: 'No stagger.',
    preview: 'card',
  },
  capture: {
    id: 'capture',
    band: 'basic',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title'],
    reducedMotion: 'Field idle. Count painted if present. No confetti.',
    preview: 'card',
  },
  video: {
    id: 'video',
    band: 'basic',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'media'],
    reducedMotion: 'Poster bled or seated. Play visible. No sticky tax.',
    preview: 'card',
  },
  frame: {
    id: 'frame',
    band: 'intermediate',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'actions', 'media'],
    reducedMotion: 'Plate at rest. No inner-scroll spring.',
    preview: 'card',
  },
  proof: {
    id: 'proof',
    band: 'intermediate',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'actions'],
    reducedMotion: 'Static logo row. No marquee.',
    preview: 'card',
  },
  stage: {
    id: 'stage',
    band: 'intermediate',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'actions'],
    reducedMotion: 'Selected finish already applied.',
    preview: 'card',
  },
  cover: {
    id: 'cover',
    band: 'intermediate',
    tier: 'css',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'actions'],
    reducedMotion: 'Rule seated. No yaw.',
    preview: 'card',
  },
  iris: {
    id: 'iris',
    band: 'advanced',
    tier: 'motion',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title', 'actions', 'media'],
    reducedMotion: 'Hole open. No blade. No scrub. Host height, not a track.',
    preview: 'viewport',
  },
  orbit: {
    id: 'orbit',
    band: 'advanced',
    tier: 'webgl',
    files: ['src/components/ui/hero.tsx', 'src/components/ui/hero-scene.tsx'],
    deps: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
    required: ['title', 'actions', 'fallback'],
    reducedMotion: 'fallback only. No Canvas. No loop.',
    preview: 'card',
  },
  kinetic: {
    id: 'kinetic',
    band: 'advanced',
    tier: 'motion',
    files: ['src/components/ui/hero.tsx'],
    deps: ['framer-motion'],
    required: ['title|lines', 'actions'],
    reducedMotion: 'Glyphs set. Lock is aria-pressed without physics. No shear.',
    preview: 'card',
  },
}
```

Empty strings are empty. Missing optional slots omit chrome. No default eyebrow (`Product`, `Studio index`, `2,400 already in`). No default logos, prices, swatches, chapters, or countdown digits.

`Hero` implementation signature: `export function Hero(props: HeroProps)`. Switch on `props.variant ?? 'split'`.

---

## Theme — CSS variables, contrast, focus

The component reads variables. It does not take a `theme` / `accentColor` / `glowColor` prop. Demos may wrap `NxTheme`; unset tokens must still render (`currentColor` / `inherit` / the fallbacks below).

```css
[data-nexara="hero"] {
  --nx-bg: var(--nx-bg, #07060b);
  --nx-fg: var(--nx-fg, #f3ead8);
  --nx-muted: var(--nx-muted, #c6bba8);
  --nx-accent: var(--nx-accent, #ff4d1c);
  --nx-accent-fg: var(--nx-accent-fg, #1a0904);
  --nx-border: var(--nx-border, color-mix(in srgb, var(--nx-fg) 15%, transparent));
  --nx-well: var(--nx-well, #1a1722);
  --nx-ring: var(--nx-ring, #3ee0c6);
  --nx-radius: var(--nx-radius, 1.5rem);
  --nx-shadow: var(--nx-shadow, 0 28px 60px -36px rgba(0, 0, 0, 0.85));
  --nx-font-display: var(--nx-font-display, var(--font-serif, ui-serif, Georgia, serif));
  --nx-font-body: var(--nx-font-body, var(--font-sans, ui-sans-serif, system-ui, sans-serif));
  --nx-font-mono: var(--nx-font-mono, var(--font-mono, ui-monospace, monospace));
}
```

`--nx-ring` is the FE add. Product’s list had no focus token. Accent is the wrong ring colour on a light preset.

Measured on void `#07060b` (Helio night). Library must keep these ratios **after** a preset remap, or the preset is illegal:

| Pair | Ratio | Use |
| --- | --- | --- |
| `--nx-fg` ivory / bg | 16.90 | Display + primary type |
| `--nx-muted` fog / bg | 10.65 | Lede. Never `text-zinc-400` |
| `--nx-accent` ember / bg | 6.09 | Rationed signal on objects, not long text |
| accent **fill** + `--nx-accent-fg` | 5.84 | Primary CTA |
| ember **text** on ivory | **2.78 fail** | Forbidden |
| `--nx-ring` ion / bg | 12.20 | Focus ring. Ion text on ivory is 1.39 — also forbidden |
| `--color-iris` `#8b7cff` | — | Old kit purple. Iris is an aperture. Do not use this token in the family |

Focus contract (every control that looks clickable):

```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[var(--nx-ring)]
focus-visible:ring-offset-2
focus-visible:ring-offset-[var(--nx-bg)]
```

Applies to: CTA links/buttons, capture submit, play, chapter ticks, kinetic glyphs, stage options (radios), orbit mode radios, logo-less well is not a control. Magnetic pull ≤ 10px must not clip the ring. Keyboard users never get “chase the magnet” instead of a ring.

Section: `aria-labelledby` pointing at the title id. `titleAs` default `h1`.

---

## Reduced-motion contract

`usePrefersReducedMotion()` from `utils.ts`. CSS `motion-safe:` / `motion-reduce:` as backup. Same markup. Animate appearance, never mount.

| Variant | End state |
| --- | --- |
| all | Opacity 1 at frame 0. No scroll-linked transforms. Focus and status stay. |
| split / stack / frame / proof / cover | No stagger, no yaw, no inner-scroll spring |
| capture | Count painted. Field enabled unless `status="submitting"` |
| video | No sticky track. Poster in its final crop. Play in the DOM |
| stage | Selected option already on the object |
| iris | Hole `circle(78%)` (open). Host height, not 320vh. Chapters are buttons (`aria-current`), jump with `behavior: auto` |
| orbit | `fallback` only. Do not lazy-import three.js |
| kinetic | Glyphs in place. `lockable` toggles `aria-pressed` without springs. `shear` ignored |

Helio cinematic gated CTAs at scroll 0.55–0.82. Library iris **does not fade the way through**. Title and primary `actions` are hittable on paint even if the hole is still small.

---

## Iris is not 320vh. Video is not 180vh in the preview.

Helio `CinematicHero` is a landing section (`320vh`, sticky `100svh`). `FlagshipCinematicDemo` wraps it in a `h-[42rem]` overflow frame. That is a nested landing page. Catalogue scroll and hero scroll fight. A 21st.dev card cannot show it.

| Surface | Iris | Video |
| --- | --- | --- |
| Library default | `min-h-svh` (one viewport). `progress="control"` | Poster plate inside the section. `progress="none"` |
| Docs / variant gallery | `contained`. Host = preview card. No pin | Same. Play button visible |
| Opt-in on a real site | `progress="scroll"`, track **capped** (FE cap: `180vh`, not 320) | `progress="scroll"`, sticky child, **≤ 180vh**, no `wheel` preventDefault, no Lenis |
| Reduced | Open plate, no track | No sticky tax |

`progress="scroll"` without a `scrollRoot` uses `window`. Inside a card, pass `scrollRoot` or do not set scroll progress. First paint of iris: title + CTA opacity 1, media visible in the hole (even if small). Empty `media` → labelled well in the hole, not a black disc (Round-1 failure).

Motion’s “one bookmarkable expansion on `video`” is allowed as opt-in. It is **not** the paste. FE will not ship 180vh as the BASIC video default.

---

## WebGL — only `orbit`, lazy, paused, contained

Motion put the canvas on `dashboard`. Product killed dashboard. FE: the only canvas in this family is `orbit`.

1. `scene` is a slot. Reuser supplies it. The family file may ship a **generic** needle/dial in `hero-scene.tsx` as a docs default, not a Helio crystal. If that dial is even slightly a heliograph, **delete it** and document `scene` as required-in-practice with `fallback` always on.
2. Lazy import after in-view && `!reduced`. BASIC pastes never download three.
3. `frameloop={inView && visible && !reduced ? 'always' : 'never'}`. Also listen to `document.visibilitychange`.
4. `dpr={[1, 1.5]}`. `gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}`.
5. Canvas `position: absolute; inset: 0; width/height 100%` in `overflow: hidden` plate. **Never** `position: fixed`.
6. `fallback` is required in the type. It is the reduced-motion view, the no-WebGL view, the Suspense fallback, and the offscreen view.
7. `data-nexara-webgl="pending | mounting | ready | held"` on the plate. Not `data-helio-webgl`.
8. No `Environment` / HDRI. Lights: one warm key, one cool rim, dim hemisphere — plotted, not branded.
9. Keyboard: plate `tabIndex={0}`, Enter/Space → `onPulse`. Mode radios are the named controls. **No** `role="application"`.
10. 375: copy first, plate second. Pointer aim must not steal vertical scroll (`touch-action: pan-y` on the page; plate uses pointer only for mouse, same as Magnetic).

If Motion will not accept orbit as the canvas seat, we ship **zero** WebGL. That is an acceptable family. A looping sphere in `dashboard` is not.

---

## 375 / 768 / 1280

`contained` switches breakpoints to `@container` so a card in the docs chrome does not apply viewport `md:`.

| Width | Contract |
| --- | --- |
| 375 | Headline + primary CTA in the first viewport. Padding ≥ 16px. Title `clamp` floor ~2.25–2.6rem — not 32px, not 7rem that shoves the button off-screen. CTA min-height 44px. Copy **above** media for split / frame / orbit / stage. Type on an image only with a scrim that still clears 4.5:1 against `--nx-fg`. Eyebrow wraps; it is not `hidden sm:inline`. Kinetic lines wrap; lock targets ≥ 44px. Capture stacks field then submit. No horizontal overflow. |
| 768 | split / frame / stage / cover / orbit may go two columns. Iris title still on the still. Plate `overflow: hidden`. |
| 1280 | `max-w-6xl` (frame may run wider for the crop). Canvas stays in the plate. Cover may crop type. |

Proofs for **this** family are 375 / 768 / 1280 **inside the catalogue card**, not Helio `landing-hero-*.png`.

---

## Perf

- 60fps on a 1280 laptop. Compositor `transform` / `opacity` on the hot path. Iris `clip-path` is the expensive exception — default is a control or a one-shot open, not a 320vh scrub on `document`.
- Stagger 40–70ms, ≤ 9 items, in-view once, never on the way back up.
- No Lenis. No `preventDefault` on `wheel`. No `overflow: hidden` on `html`.
- Images, not video files, unless `onPlay` hands off.
- Magnetic ≤ 10px, `pointerType === 'mouse'`, off when reduced.
- Springs if any: `ui` / `heavy` / `snap` from the kit. No `ease-in-out` by name.

---

## A11y the current `hero.tsx` fails (must not return)

- Hardcoded `#nexara-hero-search` / `#nexara-waitlist` — collide. `useId()`.
- Play is a span with a triangle — must be a button or a link (`playHref`).
- Swatches are anonymous spans — radios with `label`.
- Store badges are spans — links when they have hrefs, and they belong in the `actions` **slot**, not baked in.
- Ember text on ivory — fail. CTA is accent fill + `accent-fg`.
- `role="application"` on a canvas — no.
- Capture auto-focus — no, it steals the page.

Capture states: idle / submitting (disable, keep layout) / success (replace control, keep title) / error (text adjacent, `aria-invalid`, no toast into the void).

Media states: empty well (labelled, min-height holds) / loading well / error → `mediaFallback` or empty well + `mediaError`. Never invent a mock window, phone, or cover.

---

## Fights

### Product — four files

You asked for `hero.tsx` + `hero-iris.tsx` + `hero-orbit.tsx` + `hero-kinetic.tsx` so split does not pay for clip/physics/R3F. Copy-paste in this registry is whole files. Four files is a package. I will ship **one family file** plus `hero-scene.tsx` for the canvas. Iris and kinetic stay in `hero.tsx`. Split pastes three.js never, because the scene is a dynamic import behind `variant === 'orbit'`. If bundle size of dead branches becomes a real complaint, we can `lazy` iris too — I will not make a four-entry import graph on day one.

I agree with: default `split`, `titleAs` h1, `actions` as a slot, `fallback` required on orbit, capture merging search+waitlist, no `align`, no baked brand, BASIC four first.

### Motion — the industry table

[`hero-motion.md`](../research/hero-motion.md) schedules motion onto `agency` `search` `waitlist` `pricing` `saas` `download` `commerce` `editorial` `event` `dashboard`. Those ids are dead. Bolting a motion system onto twelve killed costumes **is** the framework.

Keep: springs, frame-0 type, no Lenis, no wheel hijack, pause/lazy/dpr/`preserveDrawingBuffer`, one idea, contained pointer, reveal-once.

Map, do not revive:

| Motion row | Lands on | Or cut |
| --- | --- | --- |
| agency rule seats | `cover` | — |
| search chip / waitlist count | `capture` (garnish, not the job) | typewriter placeholder |
| pricing ring | — | **cut** (pricing family) |
| saas local scroll | `frame` inner overflow | traffic lights |
| download phone shear | — | **cut** as a variant |
| commerce gel | `stage` option change | 3D SKU |
| editorial yaw | — | **cut** (cover’s idea is type, not CSS 3D) |
| video expansion | `video` `progress="scroll"` **opt-in**, ≤ 180vh | docs default pin |
| event flaps | — | **cut** |
| dashboard needle | — | **cut**; canvas seat is `orbit` |

Helio iris / beam / letter-lock as **geometry** stay out of the kit. The **jobs** `iris` `orbit` `kinetic` stay. Aperture, contained object, letters-with-mass. Not 14 brass blades, not a crystal, not “THE NIGHT”.

### Motion — 180vh video as BASIC

A 180vh sticky host in a 42rem preview card is the same nested-landing bug as 320vh, with a shorter track. BASIC `video` is a poster + play. Expansion is opt-in. I will test trackpad / wheel / Page Down / Space / find-in-page **if** someone turns `progress="scroll"` on a real page. I will not make the catalogue that page.

### Motion — WebGL on dashboard, or “no canvas unless preserveDrawingBuffer”

Agreed on the GL contract. Disagreed on the seat. Dashboard is not a hero. Orbit is. If the GL contract cannot be met, **drop the canvas** and `orbit` is a still plate with pointer garnish. We do not ship a candy sphere.

### Visual — iris 320vh, Helio stills, purple mesh, twelve industries

No. Default iris is one viewport. Media is a slot (mountain photo test for `split`; if it looks broken you built `frame`). `--color-iris` purple is not a token we read. Grain is `className`, not identity. Empty is empty. Kinetic without `actions` is a type effect — put it in `text-reveal` if you refuse the button. Docs copy is disposable (“Ship the first screen.” / “Read the docs.”), not “Move the furniture” and not “A desk that keeps the signal.”

Display size is a conversion constraint. 375 shows headline + CTA. Awkward breaks beat 32px *and* 8xl vanity.

Type on photography: scrim until `--nx-fg` on the scrim clears 4.5:1. Fog-on-void is 10.65:1 on Helio; a busy poster is not void until you make it void.

### Director — replace the Helio landing with `<Hero variant="iris">`

Not this pass. Flagship is a product site. The family is a paste. Port Helio as a **docs demo that wraps library iris** with Helio stills passed in, not the other way around.

### Docs / registry — `three` on the main item, Helio screenshots as family proofs, viewport `md:` inside a card

`HERO_TIER_META` is the source of files and deps. Family stills are 375 / 768 / 1280 inside the preview frame with `contained`. Helio `landing-hero-1280.png` is not a split proof.

---

## Acceptance (FE)

- `HERO_VARIANTS` has these eleven ids, in this order, and no twelfth.
- `<Hero title="…" actions={…} />` is `split`. Compiles without media.
- `<Hero variant="orbit" title="…" fallback={still} />` compiles. Omitting `fallback` does not.
- Grep of `src/components/ui/hero*.tsx` is clean of Helio / Nexara / Lamp / Harbor / `#f6f3ec` / `#ff4d1c` / default prices.
- `hero.tsx` does not import Lenis, three, R3F, flagship primitives, or aurora.
- Reduced-motion iris screenshot is an open plate with a hittable CTA.
- Orbit off-screen: `data-nexara-webgl="held"` or unmounted canvas; `fallback` visible.
- Focus rings on every control, `--nx-ring` on `--nx-bg`.
- 375 split / stack / capture / video: headline + CTA in the first viewport, no pin.

Stop. Do not add parallax, spotlight-as-hero, or a mega that composes iris + orbit + kinetic.
