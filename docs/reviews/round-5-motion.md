CONDITIONAL

# Round 5 — motion

**From:** [Motion designer critic](https://cursor.com/agents/bc-a2ed5fc8-49f3-5df3-8fbe-646d65624b8e)  
**Evidence:** `src/lib/media.tsx` (`PlayControl`, `playing`, WebM then H.264, reduced-motion still), `src/lib/utils.ts` `useCountUp`, `CinemaHero` / `MatchFilm` / `HarborReel` / `case-study` pause, plus `docs/audit/round-5/focus-hero-cinema.png`, `focus-news-video.png`, `focus-testimonials-video.png`, `focus-case-study-reel.png`, `focus-case-study-tabs.png`. Independent Chromium smoke on `#hero` / `#cinema`, `#news` / `#video`, `#testimonials` / `#video`, `#case-study` / `#reel`, `#stats` / `#year`. Ken Burns frames at t=0 vs t=5.8 on both reels.

## Verdict

**CONDITIONAL**

Round 4’s named hold-backs are closed. Cinema, news/video, and testimonials/video Play are wired to real 6s Ken Burns reels (VP9 WebM + Constrained Baseline H.264). Pause sets `aria-pressed`, `video.currentTime` advances, reduced motion paints the poster, count-up holds `0` off-screen, and `case-study / reel` has the same Pause + selection-stops-loop as tabs. That is no longer a dead ▶.

It is not an approve. Pause covers the zoomed frame with the poster. News and testimonials caption a 4:12 / 2:18 film on a 6s loop, and testimonials plays the harbor lamp as “Anitha on Harbor.” `MediaFrame` still autoplays a 6s loop when `playing` is omitted. Ornamental CSS loops and the missing hero entrance are unchanged. The round-4 approval bar is still short on (1) off-screen pause for every loop and (5) one hero that enters on scroll.

## Keep

- `hero / cinema` — `CinemaHero` starts paused. `PlayControl` sits in the title row with `aria-pressed` and a label swap (`Play reel` / `Pause reel`). Smoke: pressed `true`, `currentTime` 0 → ~1.2s, pause holds time. Dual `<source>` is WebM then MP4. This is the honest Play in the kit.
- `news / video` `MatchFilm` and `testimonials / video` `HarborReel` — same `playing` + `PlayControl` contract. Reels decode; they are no longer stills with a span.
- `case-study / tabs|autoplay|reel` — 4.2s interval, visible Pause/Play, tab or dot click sets `paused`. Smoke: Wren → Grove, Pause holds Grove. Reduced motion kills the timer.
- `useCountUp` — `!active` holds `0`; reduced snaps to `target`. Smoke on `stats / year`: off-screen text is `0`, in-view eases to `2018`.
- `MediaFrame` reduced-motion still — `video` is `motion-reduce:hidden`; poster/`src` is `hidden motion-reduce:block` (or `absolute inset-0` when `playing === false`). Smoke under `prefers-reduced-motion: reduce`: video `display: none`, still `block` (`cinema-hero.webp` / `sports-hero.webp`).
- `chapters` index — `scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })`. The JS API no longer ignores reduced motion.
- `hero / ac-remote` — power, temperature, mode, fan are state. Off dims the still. No idle loop.
- `countdown` clocks — 1s tick is a clock. `html { scroll-behavior: auto }` under reduced motion.
- `marquee` and `typewriter` — visible Pause, hover pause (marquee), first-phrase / static-row fallback.
- `button / toggle|group|theme|swap` — press and hover only; swap is `motion-safe`. Magnetic still pulls only on a fine pointer.

## Redesign

- **`MediaFrame` pause still.** `showStill = Boolean(still) && playing === false` paints the poster over the paused video. Smoke: after pause, `currentTime` is ~1.21 and the still is `position: absolute; display: block`. Resume jumps from the wide poster to the mid-zoom. Freeze the frame, or rewind and say so. Do not cover a live transport with t=0.
- **`news / video` transport.** `PlayControl` is `relative` in a `place-items-center` well. The pause mark sits on the skater for the whole reel. Move it to a chrome row like cinema.
- **`testimonials / video`.** `HarborReel` is the cinema dock loop under `bg-black/45`, captioned “Anitha on Harbor” and “2:18”. News claims “Match film · 4:12” on the same 6s sports zoom. Play is real; the movie and the runtime are not. Catalogue copy still says “Playable still.”
- **`MediaFrame` when `playing` is omitted.** Comment and docs: “omit it to autoplay muted.” That is a 6s `loop` with no pause control. Catalogue Play variants pass `playing`. Any consumer who only passes `video` gets the round-4 unpausable contract back. Default autoplay off, or require a control when duration > 5s.
- **`hero / event`** — frozen `12 / 04 / 18 / 09` while `countdown` ticks. Wire it or drop the clock.
- **Named tickers that do not move** — `stats / ticker`, `news / ticker`, `logo-cloud / marquee`. Use `Marquee` or drop the name.
- **`countdown / flip`**, **`typewriter / flap`** — mono digits and boxed glyphs, not a flap.

## Leftover ornamental loops

| Loop | Gate | Pause? | Off-screen? |
| --- | --- | --- | --- |
| `button / shimmer` | `nexara-shimmer` 2.4s infinite | `motion-safe` only | No |
| `button / beam` | `nexara-beam` 3.6s infinite | `motion-safe` only | No |
| `button / flow` | `nexara-flow` 2.8s infinite | `motion-safe` only | No |
| `gradient-text` gradient / shimmer / aurora | `nexara-text-pan` | `animate` + reduced | No |
| `gradient-text / kinetic` | `nexara-kinetic` 3.2s infinite | `motion-safe` only | No |
| `aurora-background` aurora / plasma / prism / orbit / stars | keyframes | `pause` prop, no visible control | No |
| Typewriter caret | `nexara-blink` | Hidden under reduced; the phrase has Pause | n/a |
| `MediaFrame` `video` with `playing` omitted | `autoPlay` + `loop` + `muted`, 6s | No | No |
| `case-study` interval | `setInterval` 4200ms | Yes (tabs / autoplay / reel) | No |
| Played Ken Burns | `loop` while `playing` | Yes (`PlayControl`) | No |

Same ornamental shelf as round 2–4. `motion-safe` is not a pause, and nothing stops off-screen. Played reels stay muted and looping after the user scrolls away.

## Reduced-motion coverage

**Honored (including round-4 patches)**

- `usePrefersReducedMotion` on case-study, count-up, marquee, typewriter, aurora, gradient pan variants, modal, flip, magnetic, draggable, text-reveal, bento spotlight.
- CSS `motion-safe:` / `motion-reduce:` on button spin, shimmer, beam, flow, swap, press scale, navbar dock lift.
- `html { scroll-behavior: auto }` under `prefers-reduced-motion`.
- Marquee becomes a static row. Typewriter paints `phrases[0]` and hides the caret. Aurora omits keyframes. Count-up snaps to target. Modal enter/exit zeros transform.
- `MediaFrame` video hides; poster/`src` still paints. Catalogue Play variants all pass a still.
- Chapters jumps use `behavior: 'auto'` when reduced.

**Missed**

- Reduced-motion Play still calls `video.play()` on a `display: none` node. The still stays; a hidden 6s loop can decode in the background. Hide the control, or skip `play()` when reduced.
- `lottie` iframe is `motion-reduce:hidden` and only paints a still if `poster` / `src` exists. Catalogue defaults do not ship lottie, so this is a consumer gap.
- Spotlight wash still tracks and fades. Lift is `motion-safe`; the wash is not.
- `usePrefersReducedMotion` still defaults `false` on the server. First paint can animate, then freeze.
- `kpi` calls `useCountUp(value)` with `active` default `true`, so dashboard tiles count on mount. Stats hold; KPI does not.

## Remaining motion-design gaps

**Scroll / parallax / stagger — still absent on the rebuilt heroes.**

- No in-view title entrance on `hero` or `hero-extra` (no `y: 16 → 0`, no 40ms action stagger). Cinema now plays; it still paints at rest until Play.
- No parallax, no scrub, no pinned media. `hero / tilted` is a static `rotateX(16deg)`. `hero / fan` and `hero / split-cards` are static transforms.
- `text-reveal` actually reveals on `display`, `highlight`, and `outline` only. `editorial`, `split`, `caption`, `quote`, `columns`, `note`, `index`, `folio`, `stack` are type layouts. `once`, `amount`, and `container` are still dead props.
- `chapters / eight|scrolly|sticky` remains the only real scroll job. Film strips (`chapters / film`, `case-study / film`) still have no snap.
- `floating-navbar` shrink is still `py-2` → `py-1` with no transition.

## Approval bar

The round-4 bar still stands. This pass closed (2) reduced-motion still, (3) count-up hold, (4) reel pause, and the dead Play mark.

Approve when: pause freezes the frame (or rewinds on purpose), `MediaFrame` does not autoplay a >5s loop without a control, played reels and case intervals pause off-screen, news/testimonials captions match the 6s zoom they actually play, and at least one hero enters once on scroll. Ornamental shimmer/beam/flow may stay on the shelf if they die under reduced motion; they should not keep the whole catalogue on hold by themselves.

Until then: keep cinema Play, case pause, and the count-up hold. Do not treat news/testimonials as finished film, and do not copy `MediaFrame` with only a `video` prop into production.
