# Hero family — product / UX brief

Owner: product. Audience: Visual, Motion, Front-end. This is not a Helio demo.

A reuser pastes a Hero to convert a stranger on the first screen. They arrive with a headline, a CTA, and usually one proof asset. They do not arrive with a night desk, a brass crystal, or four chapters named Closed / First light / Instrument / Open desk.

**Default paste is `hero / split`.** Signature paste is `hero / iris`. If those two cannot ship on a Monday in a product that is not ours, the family has failed.

---

## Thesis

Hero is a conversion section, not a genre of cinema and not a costume rack of industries.

We already failed this family twice:

1. **Geometry pass** — `center`, `split`, `mast`, `cinematic`, `statement`, `bento`, `overlap`, `index`, `band`, `asymmetric`, `stacked`, `rail`. Same eyebrow / title / lede / actions / media, different columns. Critic killed it. Do not revive it.
2. **Vertical pass** — `saas`, `download`, `video`, `logos`, `pricing`, `agency`, `commerce`, `event`, `search`, `dashboard`, `editorial`, `waitlist`. Distinct pages, but they baked story: traffic lights, `$48/mo`, App Store badges, `Lamp 04`, a ticking `12:04:18:09`, a sidebar labelled Overview / Rooms / Library, `Nexara`, Issue 18. That is a demo zoo. A reuser cannot theme it; they have to delete it.

Helio’s cinematic / orbital / kinetic pieces proved a quality floor. They are **references**, not defaults. HelioMark, heliograph stills, ember/brass hex, and “A desk that keeps the signal.” do not belong in the copy-paste file.

Visual will want four cinematic toys and no boring first screens. Motion will want scroll to be the product. Both are wrong for a library. The boring screens are the ones that get pasted. The toys are opt-in advanced files.

---

## Who we serve

| Person | Query | What they actually need |
| --- | --- | --- |
| Staff engineer on a SaaS marketing page | `hero / split` | Copy left, product shot right, stack on 375, typed slots, CSS variables. Ships this week. |
| Designer cloning a 21st.dev iris | `hero / iris` | Aperture that opens onto **their** media. Headline and CTA already readable. Scroll optional. |
| Founder with an email field | `hero / capture` | The control *is* the hero. Idle / submitting / success / error. |
| Studio selling taste | `hero / kinetic` | Letters with mass, plus a real CTA. Not a poster. |
| Anyone else | the other seven | A job, not a recolor of split. |

If a variant cannot be described as a job without saying “it’s like split but the grid is 7/5”, it is not a variant.

---

## Non-negotiables

1. **Headline + primary CTA readable at 375px without scroll-theater.** First viewport. No pin, no 320vh, no “scroll to see the button”. Iris may *continue* after that. It may not *start* there.
2. **`prefers-reduced-motion: reduce` shows the end state.** Iris open, letters settled, no WebGL loop, no scroll-linked transforms, no entrance that hides copy. Focus rings and state changes stay.
3. **WebGL is contained and optional.** Clipped to a plate. Lazy. Paused off-screen. `dpr` clamped. Falls back to a required still. Never `position: fixed` on the viewport unless the host *is* the section. Never imported by BASIC files.
4. **No hard-coded brand.** No Helio, Nexara, Lamp 04, Harbor Hall, default testimonials, default logo names, default prices, default countdowns. No hex in the component. Theme through CSS variables. Demo copy lives in docs, not in prop defaults.
5. **Typed props, empty strings are empty.** Optional slots omit chrome. Do not substitute “Product” or “Studio index”.
6. **One motion idea per variant.** A second idea is a different variant or a different family.

---

## Shared contract

Every variant is a `<section>` with `data-nexara="hero"` and `data-variant="{id}"`. Named from the heading (`titleAs` default **`h1`**, not `h2`).

### Tokens (component reads these, never palettes)

```css
--nx-bg
--nx-fg
--nx-muted
--nx-accent
--nx-accent-fg
--nx-border
--nx-well
--nx-radius
--nx-shadow
--nx-font-display
--nx-font-body
--nx-font-mono
```

Demos may wrap in `NxTheme`. The Hero source must still render if those tokens are unset (reasonable `currentColor` / `inherit` fallbacks). No `text-[#f6f3ec]`, no `bg-ember`.

### Base props

```ts
type MediaState = 'ready' | 'loading' | 'empty' | 'error'

interface HeroBaseProps {
  title: ReactNode
  titleAs?: 'h1' | 'h2' | 'h3' // default 'h1'
  eyebrow?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  mediaState?: MediaState // default: media ? 'ready' : 'empty'
  mediaFallback?: ReactNode
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
}
```

`actions` is a slot so Button / MagneticButton stay composable. BASIC docs treat a primary CTA as required even if the type does not. A hero with no way through is a poster.

Kill `align`. Variant is the API. `hero / split` with `mediaSide?: 'end' | 'start'` covers “image on the left”. That is a prop, not a sibling variant.

### Must-have states (all eleven)

| State | Rule |
| --- | --- |
| **empty** | Missing `media` does not invent a mock window / phone / cover. Split / frame / video / stage / iris / orbit reserve a labelled well (`min-height` holds). Stack / capture / proof / cover / kinetic may omit the well. Missing `actions` does not invent store badges. Missing logos / options / chapters omit those regions. |
| **loading** | `mediaState="loading"` shows a static well (skeleton pulse only if motion is allowed). Capture `status="submitting"` disables the control and keeps the label. Never a blank hole that collapses the grid. |
| **error** | Media error → `mediaFallback` or the empty well + optional `mediaError` copy. Capture `status="error"` keeps the field, shows a text message, does not toast into the void. |
| **reduced-motion** | End state. No scroll-linked clip, shear, or fade. No WebGL. No typewriter in the headline. Entrance opacity stays at 1. |
| **mobile (375)** | Padding ≥16px. Title `clamp` floor ~2.25–2.6rem, never a timid 32px and never a 7rem that pushes the CTA off-screen. Primary CTA min-height 44px. No horizontal overflow. Copy **above** media. Type on an image only with a scrim that still clears 4.5:1. Eyebrow may wrap; it must not be `hidden` until `sm`. |

### Motion budget

In-view stagger is allowed on copy (40–70ms, ≤9 items) and only when the section is on screen. It is not a personality. Lenis is not a dependency of any Hero file.

### Copy-paste split

| File | Variants | Why |
| --- | --- | --- |
| `src/components/ui/hero.tsx` | split, stack, capture, video, frame, proof, stage, cover | Production-safe. No R3F. Framer Motion only if an entrance needs it; CSS is preferred. |
| `src/components/ui/hero-iris.tsx` | iris | Scroll/clip is a real dependency. Reuser of split must not pay for it. |
| `src/components/ui/hero-orbit.tsx` | orbit | WebGL optional via `scene`. BASIC must never import this. |
| `src/components/ui/hero-kinetic.tsx` | kinetic | Per-glyph physics. |

Registry: one `hero` item listing all eleven `variants[]`. Advanced files are extra `files[]` entries, not a second component family.

---

## The eleven variants

Order is paste-frequency, not prestige. BASIC four first. Visual does not get to reverse this list.

### 1. `split` — BASIC

**Job.** Convert with a claim beside a proof asset. This is the library’s default hero.

**Why it exists.** It is what people mean when they say “a hero”. Stripe’s sentence-as-hero with an object on the right; Linear’s product pixels next to a line of type, without pretending to be a dashboard.

**Required props.** `title`, `actions`, `media` (or `mediaState` so the well can load).

**Optional.** `eyebrow`, `description`, `mediaSide?: 'end' | 'start'` (default `end`).

**States.** Empty well if no media. Loading well. On 375: title, description, actions, then media. Reduced motion: no stagger.

**Reject.** Traffic-light browser chrome as default. `align="split"` secretly rendering a dashboard. Equal-column “saas” card with a radial kit gradient. Aurora baked in. Mapping this to Helio’s cinematic.

**Test.** Swap `media` for a mountain photo. If the layout still tells the truth, it is split. If it looks broken, you built `frame`.

---

### 2. `stack` — BASIC

**Job.** Convert with a sentence and two doors. Fastest page. The one Visual will try to skip and most reusers will actually paste.

**Why it exists.** Centered claim is a real job (launch, waitlist teaser, docs landing), not a column alternative to split. Vercel’s emptiness only works when the category is known; we still require a title and actions, and we allow a capped media node **below**, not a full-bleed stretch.

**Required props.** `title`, `actions`.

**Optional.** `eyebrow`, `description`, `media` (max-width, centered, not edge-to-edge).

**States.** No media → no well. Loading media → capped skeleton under the CTAs, never over the title. 375: still one column; do not shrink type to keep a desktop line-length.

**Reject.** Two-word “Agentic Infrastructure” as the demo. `align="center"` as a second API. Centered media stretched full width (already a Round-1 defect). This is not `cover` — no index, no rule, no 8xl masthead.

---

### 3. `capture` — BASIC

**Job.** The first screen’s job is to take an email or a query. Waitlist and search are one variant.

**Why it exists.** Algolia-style search heroes and invite heroes share a control, not a layout. Splitting them duplicates the only thing that matters: form states.

**Required props.** `title`, `control: ReactNode` **or** convenience `onSubmit`, `inputProps`, `submitLabel`. Prefer `control` so the reuser owns the field.

**Optional.** `eyebrow`, `description`, `status?: 'idle' | 'submitting' | 'success' | 'error'`, `statusMessage`, `socialProof?: ReactNode` (avatar stack, count — a slot, not four colored dots).

**States.** Idle, submitting (disable, keep layout), success (replace control with a confirmation node, keep title), error (message adjacent to the field), invalid (native or `aria-invalid`). Reduced motion: no success confetti. 375: stacked field then submit is allowed; a `rounded-full` inline form that clips the button is not.

**Reject.** Hardcoded “2,400 already in”, `you@studio.com`, `preventDefault` with no callback. `search` and `waitlist` as two variants. Auto-focus that steals the page.

---

### 4. `video` — BASIC

**Job.** Convert by playing a demo. The poster is the hero; play is the primary control.

**Why it exists.** Magic UI’s video-dialog pattern is a real paste. It is not iris, and it is not a background reel under type.

**Required props.** `title`, `media` (poster node), `onPlay` **or** `playHref`.

**Optional.** `actions` (secondary), `description`, `durationLabel`, `playLabel` (default from docs, not from the component — require the prop or a visually-hidden “Play”).

**States.** Idle poster + play control. Loading. Error (cannot play → fallback still + text). Playing should open a dialog or navigate; inline replace is allowed only if the title stays. Reduced motion: static poster, play still works. 375: title + play in the first viewport; poster may be a short plate, not 100vh.

**Reject.** Autoplay with sound. Full-bleed `<video>` as wallpaper behind 40% contrast type. 320vh “cinematic video”. Play emoji as the only accessible name.

---

### 5. `frame` — INTERMEDIATE

**Job.** The product UI is the argument. Copy is a thin band. A cropped app surface gets more pixels than the pitch.

**Why it exists.** Linear’s homepage is a product, not a poster. Split is 50/50 marketing. Frame is “this is already a tool”. Distinct slot: `plate` (the UI) + optional `caption` (environment, version, cycle). Not a sidebar of fake nav.

**Required props.** `title`, `actions`, `media` (the plate).

**Optional.** `eyebrow`, `description`, `caption?: ReactNode`.

**States.** Empty / loading plate with app-shaped well (not a phone, not traffic lights). 375: copy first, plate second, caption stays readable. Reduced motion: no plate parallax.

**Reject.** Hardcoded Overview / Rooms / Library. Metric tiles as the whole hero. Fake desktop traffic lights. Dashboard-as-hero. If the plate is a photo of a lamp, you wanted `stage` or `split`.

**Test.** Cover the copy. If what remains could ship as a product screenshot crop, it is frame.

---

### 6. `proof` — INTERMEDIATE

**Job.** Convert a sceptic with logos and one quote before you ask for a click.

**Why it exists.** Stripe’s logo rail as a hard rule under the claim is a first-screen job. It is not a marquee family member living in the hero.

**Required props.** `title`, `actions`, `logos: Array<{ id: string; node: ReactNode } | { id: string; src: string; alt: string }>`.

**Optional.** `quote?: { text: ReactNode; attribution?: ReactNode }`, `description`, `eyebrow`.

**States.** Empty logos → omit the rail (do not fill with North / Kite / Field / Harbor / Lumen). Loading logos → rail-sized well. No quote → omit the block; do not stuff it into `eyebrow`. 375: logos wrap, no horizontal marquee. Reduced motion: static row.

**Reject.** Marquee, ticker, or infinite scroll inside Hero. Fake wordmarks. Quote as the title. This is not `stack` with extra padding.

---

### 7. `stage` — INTERMEDIATE

**Job.** Sell an object. The object can change with a small set of options (finish, plan, SKU) without becoming a PDP.

**Why it exists.** Commerce heroes on 21st.dev are real, but `$220` and four hex swatches are a story. The job is “pick a state of the thing, then CTA”.

**Required props.** `title`, `actions`, `media`.

**Optional.** `eyebrow` (status), `description`, `price?: ReactNode`, `options?: Array<{ id: string; label: string; swatch?: string }>` , `value`, `onOptionChange`.

**States.** No options → hide the picker. Selected option should change `media` (reuser’s job via props). Loading object. Empty object well. 375: object, then copy + CTA, or copy then object — pick **copy first** so the CTA is not below a tall SKU. Reduced motion: instant swap, no orbit of the object.

**Reject.** Hardcoded Lamp 04, `$220`, `#1c1915` dots. Cart, gallery, quantity. Phone mockups and store badges (`download` is not a variant; badges compose into `actions`).

---

### 8. `cover` — INTERMEDIATE

**Job.** Editorial / studio authority. Type is the object. Index, kicker, rule. For journals and agencies that sell taste, not a screenshot.

**Why it exists.** Magazine cover and studio masthead were two costumes of one job. Merge them. Distinct from `stack` by the index/rule scholarship and from `kinetic` by having no physics.

**Required props.** `title`, `actions`.

**Optional.** `kicker`, `indexLabel`, `description`, `media` (cover plate).

**States.** No media → type-only cover (valid). No index → omit the figure line. 375: title may break awkwardly; CTA must still sit in the first viewport — cap the display size. Reduced motion: static.

**Reject.** Default “Fig 0.1 · Iris”. 8xl that shoves actions below the fold. `agency` vs `editorial` as twins. HelioMark in the kicker.

---

### 9. `iris` — ADVANCED

**Job.** Brand-moment reveal. An aperture opens onto the reuser’s media. Scroll may assist the camera. Conversion happens on frame 0.

**Why it exists.** This is the signature people ask for after seeing Helio. Round 1 of that piece failed the first-frame test: a black disc, headline faded, CTA gated at scroll 0.55–0.82. Library iris is the *end state of that lesson*, not a port of the bug.

**Required props.** `title`, `actions`, `media`.

**Optional.** `eyebrow`, `description`, `chapters?: Array<{ id: string; label: string; at: number }>`, `progress?: 'none' | 'control' | 'scroll'` (default **`control`**), `opened?: boolean`, `onOpenedChange`, `reducedMotionOpen?: true` (always).

**Height.** Default **one viewport** (`min-h-svh`, not `320vh`). `progress="scroll"` may opt into a pinned track, capped. Docs must show the 100svh form first.

**States.** Frame 0: iris can start partly closed for drama, but **title and primary CTA are opacity 1** and hittable. Empty media → well inside the hole, not a void disc. Loading → well. Reduced motion → fully open, no blade spin, chapters jump without smooth scroll. 375: same contract; do not hide the eyebrow; do not require pinch or horizontal pan.

**Reject.** CTA fade-in tied to scroll. 320vh as default. Helio chapters. HelioMark. Grain as mandatory identity (optional overlay via className). Lenis. Scroll as the only way to open. Combining iris with kinetic letters or a WebGL scene.

**Motion idea (the only one).** The hole. Camera assistant, not a gate.

---

### 10. `orbit` — ADVANCED

**Job.** An interactive instrument or object that aims, orbits, or pulses. Proof that the product is a thing, not a gradient.

**Why it exists.** Helio’s orbital plate earned this. Bruno Simon is the quality floor for “pointer has consequences”. Library orbit must work in a brand that is not a heliograph.

**Required props.** `title`, `actions`, `fallback: ReactNode` (still — **required in the type**).

**Optional.** `scene?: ReactNode` (lazy WebGL child the reuser supplies), `description`, `eyebrow`, `modes?: Array<{ id: string; label: string }>`, `value`, `onModeChange`, `onPulse`.

**States.** No `scene` → render `fallback` in the plate (valid, and the reduced-motion path). WebGL failing → fallback. Off-screen → pause the loop. Empty fallback + no scene → well, not a black canvas. 375: copy first, plate second; canvas never escapes; pointer aiming is fine, drag-to-orbit must not steal vertical scroll. Reduced motion → still only.

**Reject.** Shipping Helio crystal geometry as default. Importing `@react-three/fiber` from `hero.tsx`. Canvas `position: fixed`. HDRI mall reflections as the look. Scene without a still. “Orbit” as a Cosmic background behind `split`.

**Motion idea (the only one).** The object answers the pointer. Contained.

---

### 11. `kinetic` — ADVANCED

**Job.** Letters as physical objects. Identity for studios that sell taste. Still a hero: it must convert.

**Why it exists.** FORMAT-adjacent type-as-object is a trending paste. Helio’s kinetic piece had lockable glyphs and scroll shear — and **no CTA**. That is a poster. We do not ship posters in this family.

**Required props.** `title: string` (or `lines: string[]`), `actions`.

**Optional.** `description`, `lockable?: boolean` (default false), `shear?: boolean` (default false).

**States.** Reduced motion → static typeset, no shear, lock is a simple selected style without physics. Empty title is invalid (required). 375: lines wrap or scale; they must not overflow; CTA below the lines in the first viewport. Keyboard: if `lockable`, glyphs are buttons.

**Reject.** Default “THE NIGHT / KEEPS SIGNAL”. Shear that makes the sentence unreadable. Click-only lock. Missing actions. Using this as the BASIC demo because it looks expensive.

**Motion idea (the only one).** Mass. Not iris, not WebGL.

---

## Kill list — not heroes

These were variants. They are other families, slots, or demos.

| Old id | Where it goes |
| --- | --- |
| center, mast, statement, overlap, rail, band, asymmetric, stacked, index, bento | Dead geometry. `stack` / `split` / `cover` cover the jobs. |
| saas | `split` or `frame`. No traffic lights. |
| download | `split` + badges in `actions`. No baked phones. |
| logos | `proof`. |
| pricing | Pricing family. A price node may sit in `stage`, not a `$48/mo` card as the page. |
| agency + editorial | `cover`. |
| commerce | `stage`. |
| event | A date is an `eyebrow` or a slot in `cover`. No ticking clock as the hero. Countdown is a different component. |
| search + waitlist | `capture`. |
| dashboard | App shell. Not a marketing first screen. |
| cinematic (geometry) | `iris`. |
| Helio CinematicHero / OrbitalHero / KineticHero | Flagship references. Do not import them from `components/ui`. |

---

## Fights I will pick with Visual

1. **Ship the boring four first.** `split`, `stack`, `capture`, `video` are the product. Iris / orbit / kinetic are the trailer. If the trailer lands without the four, I will block the family.
2. **`split` is not a dressed SaaS window.** Media is a slot. If I see traffic lights, a radial kit gradient, or “Product” as a default eyebrow, it goes back.
3. **Do not revive the twelve geometries.** New column math on the same slots is not a variant. I will ask “what job dies if we delete this?”
4. **Do not revive the twelve industries.** A hero that only works for events, or only works for App Store, is a demo page. Compose.
5. **No Helio in the kit file.** HelioMark, grain-as-identity, brass ring in the bowl of a letter, “Fig 0.1”, generated night-desk stills — those stay under `flagship/`. Tokens, not palettes.
6. **Display size is a conversion constraint.** 375 must show headline + CTA. Awkward line breaks beat shrinking to 32px; they also beat 8xl vanity that shoves the button to scroll 2.
7. **Type on photography needs a scrim that passes contrast.** Fog-on-void was measured for Helio. Library heroes will not ship 40% white on a busy poster.
8. **Empty is empty.** No invented logo row, no invented swatches, no invented issue number. A well is allowed. A short story is not.
9. **Frame is a crop of a real UI, not a bento of metrics.** If the plate looks like the current `dashboard` variant, it is wrong.
10. **Kinetic without a CTA is not a hero.** Put it in type effects if you refuse the button.
11. **Docs thumbnails at 375 / 768 / 1280 for every variant**, not one cinematic still for the family. BASIC variants get the first three shots in the review.
12. **Default demo copy is generic and disposable** (“Ship the first screen.” / “Read the docs.”). If the usage snippet still says “Move the furniture” or “A desk that keeps the signal.”, Visual has branded the library again.

---

## Fights I will pick with Motion

1. **The CTA does not fade in.** Helio cinematic gated the buttons at scroll 0.55–0.82. That was the Round-1 miss. Iris may dim the *scene*, not the way through.
2. **Default iris is one viewport, opened by a control.** Scroll-as-camera is `progress="scroll"`, opt-in, documented second. 320vh is not the paste.
3. **Reduced motion is the end state, not a quieter intro.** Open iris. Settled glyphs. Still of the instrument. No “almost the same animation but 200ms”.
4. **Scroll is not a dependency of BASIC.** No pin, no scrub, no Lenis, no `height: 320vh` in `hero.tsx`.
5. **One idea per variant.** Iris = hole. Orbit = pointer. Kinetic = mass. If you add shear to iris, or a beam to kinetic, you are hijacking another piece.
6. **WebGL stays in `hero-orbit.tsx`.** Lazy `scene`. Required `fallback`. Pause off-screen. `dpr` clamp `[1, 1.5]`. Canvas clipped. Proof hook: a data attribute when ready, same spirit as `data-helio-webgl` but brand-agnostic (`data-nexara-webgl="ready"`).
7. **In-view, not on-mount.** Stagger below the fold was already a defect. Intersection or nothing.
8. **Magnetic ≤ 10px, pointer only, reduced-motion off.** The object leans. It does not chase. Keyboard users get a ring, not a miss.
9. **No marquee, no typewriter, no aurora inside Hero.** Those are other families. Compose them outside.
10. **Chapters are buttons** with `aria-current`. Scroll-only chapters fail keyboard and fail reduced motion.
11. **Kinetic glyphs are buttons when lockable.** Click-only physics is a poster with extra steps.
12. **Playing video does not steal the next three screens.** Dialog or href. Autoplay muted loop as background is a Visual fight I will join.
13. **Performance bar from Helio still applies:** compositor-only on the hot path, 60fps on a 1280 laptop, pause off-screen. If iris cannot hold that at 375, cut blades, not the CTA.

---

## Acceptance

The family is done when:

- Eleven ids exist, match this brief, and are structurally distinct by job (not grid, not industry, not palette).
- `hero / split` and `hero / stack` convert at 375 with headline + CTA on first paint, no motion required.
- `hero / iris` shows headline + CTA at 375 with the aperture either open or irrelevant to hitting the button; reduced-motion screenshot is the open plate.
- `hero / orbit` renders the fallback when `scene` is omitted, when WebGL fails, and when motion is reduced; the canvas never leaves its plate.
- Grep of `src/components/ui/hero*.tsx` finds no `Helio`, `Nexara`, `Lamp`, `Harbor`, `#f6f3ec`, `#ff4d1c`, or default prices.
- No `align` prop. No default prop strings that read like marketing.
- Docs usage for each variant compiles with only the required props.

Stop. Do not add a twelfth. Do not add parallax, spotlight-as-hero, or a “mega” that composes iris + orbit + kinetic.

---

## Handoff

| Role | Start here |
| --- | --- |
| Visual | Draw split, stack, capture, video at 375/768/1280 in tokens, not Helio stills. Then frame, proof, stage, cover. Iris last, as a plate that already contains the split’s type+CTA. |
| Motion | Propose **one** idea per advanced variant, with the reduced-motion still first. BASIC gets in-view stagger or nothing. |
| Front-end | Types from this contract. File split as specified. Port Helio only as a docs demo wrapping the library iris, not the other way around. |
