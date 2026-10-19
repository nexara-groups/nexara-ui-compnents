# Round 4 — motion

**From:** [Motion designer critic](https://cursor.com/agents/bc-b06d104a-c984-55f6-8560-0425d052e3be)  
**Evidence:** source after the media rebuild (`src/components/ui`, `src/lib/media.tsx`, `src/lib/utils.ts`) plus `docs/audit/round-4/focus-hero-ac-remote.png`, `focus-case-study-tabs.png`, `focus-hero-cinema.png`. Smoke already signed case pause, AC mode radios, and OTP paste/arrows.

## Verdict

**CONDITIONAL**

The media rebuild replaced drawings with stills. It did not add scroll language, and it shipped a video primitive that loops without a pause or a reduced-motion still. Finite product motion (remote, count-up, clocks, OTP focus) is honest. Ornamental loops and the case reel are not.

## Keep

- `hero / ac-remote` — power, temperature, mode, and fan are state. No idle loop. Off dims the still (`opacity-60`).
- `case-study / tabs|autoplay` — 4.2s interval, visible Pause/Play, tab click sets `paused`. Reduced motion kills the timer.
- `stats` count-up + `useCountUp` — IntersectionObserver (`threshold: 0.35`), cubic ease, reduced motion snaps to the target. Finite.
- `countdown` clocks — 1s tick is a clock, not ornament. `html` reduced-motion turns page smooth-scroll off.
- `marquee` and `typewriter` — pause control, hover pause (marquee), first-phrase / static-row fallback.
- `input / otp` — paste and arrows move focus. No animation to police.
- `button / toggle|group|theme|swap` — press and hover only; swap is `motion-safe`.

## Loops without pause

| Loop | Gate | Pause? | Off-screen? |
| --- | --- | --- | --- |
| `case-study / reel` | `setInterval` 4200ms, same `looping` flag as tabs | No. Pause UI lives only on tabs/autoplay. Dots change `active` and do not `setPaused(true)`. | No |
| `MediaFrame` `video` | `autoPlay` + `loop` + `muted` | No | No |
| `button / shimmer` | `nexara-shimmer` 2.4s infinite | `motion-safe` only | No |
| `button / beam` | `nexara-beam` 3.6s infinite | `motion-safe` only | No |
| `button / flow` | `nexara-flow` 2.8s infinite | `motion-safe` only | No |
| `gradient-text` gradient / shimmer / aurora | `nexara-text-pan` | `animate` prop + reduced motion | No |
| `gradient-text / kinetic` | `nexara-kinetic` 3.2s infinite | `motion-safe` only | No |
| `aurora-background` aurora / plasma / prism / orbit / stars | keyframes | `pause` prop only — no visible control | No |
| Typewriter caret | `nexara-blink` | Hidden under reduced motion; the phrase has Pause | n/a |

Catalogue defaults are stills (`public/media/*.webp` only). The video contract is still the rebuild’s motion risk: any consumer who passes `video` gets an unpausable loop.

## Reduced-motion coverage

**Honored**

- `usePrefersReducedMotion` on case-study, count-up, marquee, typewriter, aurora, gradient (pan variants), modal, flip, magnetic, draggable, text-reveal, bento spotlight.
- CSS `motion-safe:` / `motion-reduce:` on button spin, shimmer, beam, flow, swap, press scale, navbar dock lift.
- `html { scroll-behavior: auto }` under `prefers-reduced-motion`.
- Marquee becomes a static row and drops the fade mask.
- Typewriter paints `phrases[0]` and hides the caret.
- Aurora omits keyframes when `reduced`.
- Count-up snaps to `target`.
- Modal enter/exit zeros transform.

**Missed**

- `MediaFrame` video uses `motion-reduce:hidden` and does not paint `poster` / `src` as an `<img>`. Reduced motion gets an empty well.
- `lottie` iframe has no reduced path.
- `chapters` index uses `scrollIntoView({ behavior: 'smooth' })`. The JS API ignores CSS `scroll-behavior`. Reduced-motion users still get a smooth jump.
- Spotlight wash still tracks and fades. Lift is `motion-safe`; the wash is not.
- `usePrefersReducedMotion` still defaults `false` on the server. First paint can animate, then freeze.
- `logo-cloud / marquee`, `stats / ticker`, `news / ticker` do not move, so there is nothing to reduce — the names are the lie.

## Remaining motion-design gaps

**Scroll / parallax / stagger — still absent on the rebuilt heroes.**

- No in-view title entrance on `hero` or `hero-extra` (no `y: 16 → 0`, no 40ms action stagger). Cinema, AC remote, clinic, sports, wordmark all paint at rest.
- No parallax, no scrub, no pinned media. `hero / tilted` is a static `rotateX(16deg)`. `hero / fan` cards are static rotates. `hero / split-cards` is a static `translateX`.
- `text-reveal` actually reveals on `display`, `highlight`, and `outline` only (`whileInView`, 50ms stagger, `once`). `editorial`, `split`, `caption`, `quote`, `columns`, `note`, `index`, `folio`, `stack` are type layouts. `once`, `amount`, and `container` are still dead props.
- `chapters / eight|scrolly|sticky` is the only real scroll job: IntersectionObserver updates the index. Film strips (`chapters / film`, `case-study / film`) still have no snap.
- `floating-navbar` shrink is `py-2` → `py-1` with no transition.

**Count-up hitch**

`useCountUp` treats `!active` like reduced motion and `setValue(target)`. Off-screen figures show the final number, then restart from 0 when the observer fires. Hold at `0` until `active`, or snap only when `reduced`.

**Play marks that do not play**

`hero / cinema`, `testimonials / video`, and `news / video` are stills with a `<span>▶</span>`. The catalogue “Play reel” action is not wired. After a media rebuild that advertises first-class video, a dead play control is a motion lie.

## Replace (names that still lie)

- `countdown / flip` — mono digits, no flap.
- `stats / ticker`, `news / ticker`, `logo-cloud / marquee` — static rows. Use the real `Marquee` or drop the name.
- `hero / event` — frozen `12 / 04 / 18 / 09` while `countdown` ticks.
- `typewriter / flap` — typed glyphs in boxes.

## Approval bar for a later pass

Approve when: (1) every loop has a visible pause or dies under reduced motion **and** off-screen, (2) `MediaFrame` video shows a still under reduced motion, (3) count-up holds at 0 until in view, (4) `case-study / reel` gets the same Pause + selection-stops-loop as tabs, (5) at least one hero enters once on scroll. Until then this is the same conditional as round 3, with a worse video contract.
