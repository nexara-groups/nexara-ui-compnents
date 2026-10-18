# Round 12 — accessibility / performance / responsive

**From:** [Round-12 a11y critic](https://cursor.com/agents/bc-709c67dc-adb8-5f60-b2c0-88f444cf3480)  
**Branch:** `cursor/round-12-a11y-review-3480` (read-only against overhaul `daee816`)  
**Evidence:** tree at `daee816` (`d9b5912` close + this SHA’s pin scroller / InfinityPath). Source: `src/lib/wow.tsx`, `wow-unique.tsx`, `wow-fx.tsx`, `src/components/ui/wow-{app,core,blocks,lazy}.tsx`, `loader.tsx`, `src/docs/{docs-app,variant-gallery}.tsx`, tokens in `src/index.css`. Phone/tablet stills `docs/audit/wow/hero-pin-scroll-phone.png`, `hero-pin-scroll-tablet.png`, `loader-pulse-halo-phone.png`, `loader-pulse-halo-tablet.png`. No live Playwright in this pass. I do not merge. I do not patch.

Round 11 scored `a4c5592` **REJECT**. Named: `pulse-halo` / `liquid-drop` / `analog-sweep` failed 2.2.2; pin reel ignored Pause and reduced-motion; some `white/40` and typewriter `/35` leftovers. Round 12 claims those closed. I re-score the tree at `daee816` only.

## Verdict

**APPROVE**

The two blockers I would not stamp on `a4c5592` are closed in source, and the named phone stills now show the Pause they were missing.

`LoaderWow` owns one `LoopPause` for the family. `pulse-halo`, `liquid-drop`, and `analog-sweep` animate only while `loop.playing`. `GooPuddle` honors reduced-motion and self-Pauses when the parent omits `playing`. `HeroPin` passes `playing={loop.playing}` into `MediaFrame`; reduced motion snaps `ScrollPin` to `children(1)` (chapter 4) with no reel. Typewriter `~/nexara` / gutter `24` / “Live”, and the uptime `.9%`, sit on `white/70`. I will stamp this commit for the a11y contract. I will not pretend tiny overflow-hidden Goo hosts or a leftover `white/45` kicker are gone.

## Named checks

| Check | Result | Notes |
| --- | ---: | --- |
| Gallery `--nx-faint` → `--nx-muted` | **Pass 1.4.3 on chrome** | Holds. Descriptions, `/ id`, usage, docs body remain `text-nx-muted`. No `text-nx-faint` in `src/**/*.tsx`. Light muted `#6a6963` on paper `#f4f4f1` **5.00:1**, on card `#ffffff` **5.51:1**. Dark muted `#a4a39c` on card `#131316` **7.33:1**. |
| Pause on infinite ornament (WCAG **2.2.2**) | **Pass named cells** | `LoaderWow` always mounts `LoopPause` unless reduced (`wow-app.tsx`). `pulse-halo` / `orbit-beads` / `shader-fog` / `liquid-drop` / `particle-drift` / `flap-wait` / `analog-sweep` / `barcode-scan` / `prism-bar` / `scramble-hold` gate on `loop.playing`. `path-infinity` sets `pauseable={false}` and takes the family Pause. `HeroPin` `MediaFrame playing={loop.playing}`; `showReel` is off under reduce. `testimonials / video-shader`, `news / velocity-tape`, `marquee` tapes, `AreaSpark withParticles`, Radar / InfinityPath / Morse / metronome / film / tape / pendulum / beam still own Pause. `loader-pulse-halo-phone.png` now has a Pause pill. `hero-pin-scroll-phone.png` has a Pause pill. |
| `prefers-reduced-motion` **end state** | **Pass named cells** | `useLoopControl` forces `playing: false` when reduced. `ScrollPin` still collapses the `520vh` track and calls `children(1)`. `HeroPin` then paints chapter 4 with `showReel = false` and hides Pause. `GooPuddle` `on = (playing ?? loop.playing) && !reduced`. `FlipWow` reduced swaps to the reverse node when `flipped` (no `rotateY: 0` trap). `PolaroidFan` reduced is already fanned. `ZipperSplit` duration 0; zipper-tabs pass `open` so it sits at 38%. Radar / InfinityPath / barcode / analog-sweep hand / loaders freeze. |
| `letter-physics` SR | **Pass** | Wrapper `aria-label`, each glyph `aria-hidden`. Unchanged. |
| 44px touch / focus on wow controls | **Pass where Pause exists** | `LoopPause` is still `touchTarget` + `focusRing` + `aria-pressed` + named Pause/Play. `otp-flip` boxes are `size-12`. Phone pin and loader stills show a 44px Pause pill. `PeelCorner` / `FoldPanel` / `StampInk` / constellation nodes / command hits still omit `focusRing` — leftover, not inoperable. |
| 375 / 768 / 1280 overflow | **Pass page X on named stills** | `hero-pin-scroll-phone.png`: title wraps, `01 / 04` and Pause in frame, spec callouts stay `md+`. `hero-pin-scroll-tablet.png`: two-line title, Pause in corner, no page-X in the still. `loader-pulse-halo-phone.png` / tablet: halo, “Harbor pack”, Pause fit the card. Docs `min-w-[40rem]` props table still lives in `overflow-x-auto`. `daee816` nested pin uses `translateY` on an absolutely positioned frame inside `[data-pin-scroller]` — compositor, not page width. |
| Canvas rAF cancelled off-screen | **Pass** | `ShaderMesh` / `ParticleField` / `GlobeField` / `MatrixRain`: `if (live) requestAnimationFrame` — one paint then stop when `!inView \|\| paused \|\| reduced`. `WowScene` `frameloop={paused ? 'demand' : 'always'}`. `LazyMesh3D` unmounts off-screen and reduced. |
| 3D lazy / Button copy | **Pass Button** | `isWowVariant` in `src/lib/wow-variants.ts`. Family files go through `wow-lazy.tsx`. `button.tsx` does not import `wow.tsx`. `button-extra.tsx` lazy-loads signatures. A sensible Button copy does not statically import WebGL. `kit.tsx` still statically imports `GlobeField` / `LazyMesh3D` / `WowStage` from `wow.tsx` — leftover for a Kit copy, not the named Button graph. |
| Layout thrash (`height`) | **Pass named gate** | Podium / scrub-bars still `scaleY`. Accordion wow uses `hidden`, not `height: auto`. `VariableMorph` animates `fontWeight`. `daee816` pin pane writes `transform`, not height. `setProgress` on scroll remains a React leftover, not the height spring. |

## Round-11 two at `daee816`

| # | Round 11 blocker | Round 12 claim | This commit |
| --- | --- | --- | --- |
| 1 | 2.2.2 on pulse-halo / liquid-drop / analog-sweep; wire HeroPin Pause to the reel; same for video-shader, velocity-tape, GooPuddle, AreaSpark | Loaders self-Pause; pin reel is MediaFrame playing; GooPuddle honors reduced | **Closed** on the named gallery cells. GooPuddle Pause inside overflow-hidden 44–64px chips is a leftover, not the missing-control fail. |
| 2 | Reduced = end state on those cells; FlipWow reverse face; pin must not autoplay a loop | GooPuddle reduced; pin snaps to chapter 4; FlipWow reduced shows back | **Closed** |

Round-7 seven that round 10 closed still hold: rAF cancel, letter-physics SR, `scaleY` / no accordion height, OTP / tabs / command as real controls, Button lazy split.

## Loader family (a11y status)

`Loader` wow path is `role="status"` `aria-live="polite"` `aria-label={`Loading ${label}`}`. Visible label is `text-white/70` on `#111113` → **~9.6:1**. AA.

One family `LoopPause` covers every looping construction. Reduced hides Pause and zeroes `loop.playing`.

| Variant | Loop? | Pause | Reduced end state |
| --- | --- | --- | --- |
| `pulse-halo` (default) | Infinite scale/opacity | Family Pause (phone still) | Rings sit; no tween |
| `liquid-drop` | Drop y / scaleY infinite | Family Pause (no longer a raw `GooPuddle`) | Drop parked |
| `analog-sweep` | Hand rotate 6s infinite | Family Pause | Hand at rest (not AnalogClock 0°) |
| `orbit-beads` | Rotate | Family Pause | Beads parked on their angles |
| `shader-fog` | CSS opacity/scale (not WebGL) | Family Pause | Fog static |
| `path-infinity` | Bead on a static lemniscate (`daee816` dropped the looping `pathLength`) | Family Pause (`pauseable={false}` on the helper) | Bead parked |
| `particle-drift` / `flap-wait` / `barcode-scan` / `prism-bar` / `scramble-hold` | Infinite | Family Pause | Frozen |
| `odometer-pct` | Finite count-up | Pause present, unused | Snaps to 72% via `useCountUp` |

`LoaderCore` still uses `animate-pulse` with no Pause, but every public loader id is a wow variant, so the gallery never mounts that core.

## Contrast leftovers (not the gallery claim)

Round 12 moved the named wow/typewriter leftovers to `/70`. These content pairs are what remain short of, or tight on, 4.5:1:

| Pair | Ratio | Where |
| --- | ---: | --- |
| `white/45` on `#111113` | **4.48:1** | `hero-extra` RadioChips “Mode” / “Fan” — same kicker round 11 parked as follow-up. Not moved. |
| `text-current/50` on light `--nx-card` | **~3.54:1** | `command-palette / scramble-search` helper scramble |
| `white/50` on `#111113` | **~5.38:1** | Pass. Polaroid footer, barcode labels, dial caption, zipper-tabs aside, bento “Peel the corner”, compass “Work” / “Notes” |
| `--nx-faint` `#96958e` on paper | **2.73:1** | Token still in `src/index.css`; still unused in TSX |
| Docs “Signature” `#b45309` on paper | **4.56:1** | Passes with no cushion |

`white/60` / `white/70` on `#07070c` / `#111113` remain **~7.3 / ~9.7**. Gold `#f3c27a` on `#07070c` is **12.26:1**. Do not treat muted gallery chrome as an AA stamp on every night caption; the named `/40` `/35` `/25` body copy is gone.

## 375 / 768 notes

- **Pin-scroll phone:** contained in the gallery scroller (`max-h-[80vh]` + `data-pin-scroller`). “It starts on the desk…” wraps. Chapter `01 / 04` and Pause are in frame. Midnight spec lists stay `md+`. No page-X in the still.
- **Pin-scroll tablet:** two-line display title, Pause in the corner, still no page-X.
- **Loader phone/tablet:** halo, “Harbor pack”, and Pause fit the card. The missing-Pause hole from round 11 is closed in the still.
- Pin track is `520vh` **inside** the gallery well. A consumer who pastes `Hero variant="pin-scroll"` without a contained scroller still adds five viewports. Same leftover round 7 already named. Nested gallery pin now `translateY`s the frame so chapters 02–04 stay on screen — a11y-neutral, motion-relevant.
- `kanban / wip-pendulum` uses inner `overflow-x-auto`. Not html overflow. No 375 still for that cell.

## Blockers

**None** of the round-11 pair remain. I will look again only if a later commit takes Pause off the loader family or unhooks the pin reel.

## What passes (do not lose)

- Family Pause on all twelve loaders; phone still proves the default.
- `HeroPin` reel is `MediaFrame playing`; reduced chapter 4 has no autoplay.
- `GooPuddle` reduced + self-Pause on toast / sheet / flip / chat-sized hosts.
- `AreaSpark withParticles`, `video-shader`, `velocity-tape` Pause.
- `FlipWow` reduced reverse face; `ScrollPin` height collapse.
- Gallery and docs captions on `--nx-muted` (5.00:1+).
- Typewriter `~/nexara`, gutter `24`, “Live”, uptime `.9%` on `/70`.
- Canvas rAF cancel + `u_play` + off-screen unmount.
- `letter-physics` / scramble / split SR split.
- `scaleY` bars; no accordion height spring.
- `otp-flip` named group of real inputs; tabs remain buttons; command hits are buttons.
- `wow-lazy.tsx` + `wow-variants.ts` so Button / ExtraButton do not statically import WebGL.
- `LoopPause` 44px / `focusRing` / `aria-pressed` on the helpers that actually render it.
- Horizontal page width in the 375/768 pin and loader stills.
- Loader `role="status"` + `aria-label`; visible label contrast on `/70`.

## Follow-up (not this verdict)

- `GooPuddle` self-Pause inside `overflow-hidden` 44–64px hosts (`settings / liquid-toggle`, `badge / liquid-pill`) and `size-20` shader avatars — the control is in the tree and often clipped. Radar-jump still shows a readable Pause on a `w-28` disk; chips are tighter.
- `AnalogClock` / `useLiveRemain`: Pause freezes the second-hand tween; the remain ticker still counts unless reduced. Countdown digits can be essential auto-update; the advertised Pause does not freeze them.
- `hero-extra` `text-white/45` kickers (4.48:1) and command `text-current/50` on light card (~3.54:1).
- `LensHover` / `PrismSplit` `sr-only` of spring `get()` values.
- `kit.tsx` static `wow.tsx` import if anyone copy-pastes the kit file for a sensible variant.
- Particle edge pass is still O(n²) **while live**.
- Docs theme toggle and command hits still lack `focusRing`.
- Props table `min-w-[40rem]` inside the overflow well.
- `button-liquid.png` / `button-liquid-phone.png` do not show the sibling Pause the source mounts — recapture, or the stills are stale.
- Pin `setProgress` on scroll.

I approve round 12 for this lens. Keep the loader Pause and the pin reel hook. Do not merge on a clipped Goo Pause inside a 64px switch as if it were the same class of fail as a breathing halo with no control.
