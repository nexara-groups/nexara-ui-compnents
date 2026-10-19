# Round 11 — accessibility / performance / responsive

**From:** [Round-11 a11y critic](https://cursor.com/agents/bc-057321bf-803c-5d03-8c2b-e49dd4c88308)  
**Branch:** `cursor/round-11-a11y-review-8308` (read-only against overhaul `a4c5592`)  
**Evidence:** `src/lib/wow.tsx`, `src/lib/wow-unique.tsx`, `src/lib/wow-fx.tsx`, `src/components/ui/wow-{app,core,blocks,lazy,signatures}.tsx`, `src/components/ui/loader.tsx`, `src/docs/{docs-app,variant-gallery}.tsx` at `a4c5592`; contrast from `src/index.css` tokens; phone/tablet stills `docs/audit/wow/hero-pin-scroll-phone.png`, `hero-pin-scroll-tablet.png`, `loader-pulse-halo-phone.png`, `loader-pulse-halo-tablet.png`. No live Playwright in this pass.

Round 7 scored `22635c5` **REJECT ALL** on seven blockers. Round 10 (`d894f18`) claimed those closed. This pass re-scores the tree at `a4c5592` only. I do not merge. I do not patch.

## Verdict

**REJECT**

Round 10’s seven are mostly still closed: canvases cancel `requestAnimationFrame` when dead, `letter-physics` glyphs are `aria-hidden`, podium/scrub/accordion no longer spring `height`, `otp-flip` is a real input group, and a sensible `Button` copy does not statically import WebGL.

Round 11 then shipped a 12-variant loader family and a four-chapter pin whose **default looping cells fail 2.2.2**, and whose reduced-motion path is not an end state. The self note says “Pause where loops run.” `loader-pulse-halo-phone.png` is a breathing ring with no Pause. `HeroPin` paints a Pause that does not stop the looping reel.

I will not stamp this commit.

## Named checks

| Check | Result | Notes |
| --- | ---: | --- |
| Gallery `--nx-faint` → `--nx-muted` | **Pass 1.4.3 on chrome** | `variant-gallery.tsx` descriptions, `/ id`, and usage are `text-nx-muted`. Docs live-preview / nav / body copy match. No `text-nx-faint` remains in `src/**/*.tsx`. Light `--nx-muted` `#6a6963` on paper `#f4f4f1` **5.00:1**, on card `#ffffff` **5.51:1**. Dark muted `#a4a39c` on card `#131316` **7.33:1**. |
| Pause on infinite ornament (WCAG **2.2.2**) | **Fail** | New default `loader / pulse-halo` is `repeat: Infinity` scale/opacity with **no** `LoopPause` (`wow-app.tsx` LoaderWow). `liquid-drop` mounts `GooPuddle` (`playing` defaults true, no Pause, no reduced). `analog-sweep` mounts `AnalogClock` with no Pause. `HeroPin` autoplays a looping `<video>` from chapter 2; the visible Pause toggles `useLoopControl` that **nothing else reads**. Same class of unpaused loop: `testimonials / video-shader`, `news / velocity-tape` (plays via `loop.playing`, never renders Pause), `activity / liquid-chat`, `toast / liquid-slide`, `badge / liquid-pill`, `chart-block / particle-area` (`AreaSpark withParticles`). Orbit/shader/particle helpers that **do** own Pause still pass. |
| `prefers-reduced-motion` **end state** | **Fail on new loops** | `ScrollPin` still collapses off `420vh` to the sticky panel and forces `progress = 1` — that part of round 7 #3 holds. `HeroPin` then renders `children(1)` → chapter 4 → `autoPlay loop` reel, and hides Pause because `loop.reduced`. `pulse-halo` never reads the media query (no `MotionConfig` in the tree). `GooPuddle` never reads it. `FlipWow` forces `rotateY: 0` when reduced, so the reverse face never arrives. Radar / InfinityPath / barcode / metronome / film / tape / pendulum / beam **do** freeze. |
| `letter-physics` SR | **Pass** | Wrapper `aria-label`, each glyph `aria-hidden`. `ScrambleText` / `SplitMask` unchanged. |
| 44px touch / focus on wow controls | **Pass where Pause exists** | `LoopPause` is `touchTarget` + `focusRing` + `aria-pressed` + named Pause/Play. `otp-flip` boxes are `size-12` inputs. Phone pin still shows a 44px Pause pill. New `PeelCorner` / `FoldPanel` / `StampInk` / constellation nodes / command hits omit `focusRing` — leftover, not inoperable. |
| 375 / 768 / 1280 overflow | **Pass page X** | `hero-pin-scroll-phone.png` / tablet: type wraps, spec column is `hidden md:block`, gallery article is `max-h-[36rem] overflow-y-auto` for pin ids. `loader-pulse-halo-phone.png` / tablet: cell fits; no horizontal clip in the still. Docs `min-w-[40rem]` props table still lives in `overflow-x-auto` (pre-existing well, not `html` overflow). |
| Canvas rAF cancelled off-screen | **Pass** | `ShaderMesh` / `ParticleField` / `GlobeField` / `MatrixRain`: `if (live) requestAnimationFrame` — one paint then stop when `!inView \|\| paused \|\| reduced`. `WowScene` `frameloop={paused ? 'demand' : 'always'}`. `LazyMesh3D` unmounts off-screen and reduced. |
| 3D lazy / Button copy | **Pass Button** | `isWowVariant` lives in `src/lib/wow-variants.ts`. Family files go through `wow-lazy.tsx`. `button.tsx` / `button-extra.tsx` do not import `wow.tsx`. `kit.tsx` still statically imports `GlobeField` / `LazyMesh3D` / `WowStage` from `wow.tsx` — leftover for a Kit copy, not the named Button graph. |
| Layout thrash (`height`) | **Pass named gate** | Podium / scrub-bars animate `scaleY`. Accordion wow uses `hidden`, not `height: auto`. `VariableMorph` animates `fontWeight`, not `letterSpacing`. `ScrollPin` still `setProgress` on scroll and `HeroPin` writes `left` / `right` / `borderRadius` each tick — compositor leftover, not the height spring. |

## Round-7 seven at `a4c5592`

| # | Round 7 blocker | Round 10 claim | This commit |
| --- | --- | --- | --- |
| 1 | 2.2.2 on every infinite ornament | Self-Pause on looping fields | **Reopened** on loaders, pin reel, tape, GooPuddle, video-shader |
| 2 | Cancel canvas rAF | Holds | **Holds** |
| 3 | Reduced = end state, pin height collapses | Pin collapse + freeze | Height collapse **holds**. New loops and FlipWow **do not** |
| 4 | `letter-physics` `aria-hidden` | Closed | **Holds** |
| 5 | No `height` springs | `scaleY` / no accordion height | **Holds** |
| 6 | Stop named decoys | OTP / tabs / command / flap / rain | OTP, tabs buttons, command `<button>`s, flap, rain **hold**. Pin Pause is a **new decoy**. `video-shader` is a real reel without Pause |
| 7 | Split `isWowVariant` so Button does not pull WebGL | `wow-lazy.tsx` | **Holds** for Button |

## Loader family (a11y status)

`Loader` is `role="status"` `aria-live="polite"` `aria-label={label}`. Visible “Loading Harbor” is `text-white/50` on `#07070c` → composite `#838386` → **5.32:1**. That line is AA.

| Variant | Loop? | Pause | Reduced end state |
| --- | --- | --- | --- |
| `pulse-halo` (default) | Infinite scale/opacity | **None** (phone still) | **None** |
| `liquid-drop` | `GooPuddle` 3.4–4s infinite | **None** | **None** (`playing` defaults true) |
| `analog-sweep` | Clock hands via `useLiveRemain` | **None** | Freeze (`paused \|\| reduced` → 0°) |
| `orbit-beads` | Radar sweep | Radar `LoopPause` | Freeze |
| `shader-fog` / `particle-drift` | Canvas | Own Pause | Freeze + rAF cancel |
| `path-infinity` / `barcode-scan` | Infinite | Own Pause | Freeze |
| `odometer-pct` / `scramble-hold` / `flap-wait` | Finite | n/a | Settled glyph |
| `prism-bar` | Pointer only | n/a | Static children |

Three of twelve looping cells, including the gallery default, miss the contract the self note claimed. `LoaderDemo` mounts `pulse-halo`.

## Contrast leftovers (not the gallery claim)

Gallery chrome is muted. These content pairs are still short of 4.5:1:

| Pair | Ratio | Where |
| --- | ---: | --- |
| `white/40` on `#07070c` | **3.74:1** | `wow-core` uptime `.9%`; `wow-blocks` 11px labels; invert `stats` notes |
| `white/35` on `#07070c` | **3.10:1** | `typewriter` `~/nexara` |
| `white/25` on `#07070c` | **2.11:1** | `typewriter` `24` |
| `white/45` on `#07070c` | **4.48:1** | typewriter “Live”; `hero-extra` kickers — misses AA by 0.02 |
| `--nx-faint` `#96958e` on paper | **2.73:1** | Token still in `src/index.css`; unused in TSX after this commit |
| Docs “Signature” `#b45309` on paper | **4.56:1** | Passes with no cushion |

`white/50` / `white/60` / `white/70` on `#07070c` are **5.32 / 7.32 / 9.77**. Gold `#f3c27a` on `#07070c` is **12.26:1**. New pin/loader captions that used `/50` pass. Do not treat muted gallery chrome as an AA stamp on night type.

## 375 / 768 notes

- **Pin-scroll phone:** contained in the gallery scroller. “A plate, not a banner” wraps. Chapter `01 / 04` and Pause are in frame. Midnight spec lists stay `md+` — not overflow, just a thinner phone story.
- **Pin-scroll tablet:** two-line display title, Pause in the corner, still no page-X scroll in the still.
- **Loader phone/tablet:** the halo and “Loading Harbor” fit the card. The missing Pause is an a11y hole, not a layout hole.
- Pin track is `420vh` **outside** the gallery. `PIN_IDS` + `max-h-[36rem] overflow-y-auto` keep the docs page from growing. A consumer who pastes `Hero variant="pin-scroll"` without a contained scroller still adds four viewports. Same class of leftover round 7 already named.

## Blockers (must close before I look again)

1. **2.2.2 on every infinite ornament this commit added or left unwired.** Visible Pause (or `playing` wired to an existing `LoopPause`) on `loader / pulse-halo`, `liquid-drop`, `analog-sweep`; wire `HeroPin`’s Pause to the chapter-2 reel (or drop the reel); same for `testimonials / video-shader`, `news / velocity-tape`, `GooPuddle` cells, and `AreaSpark withParticles`. Hover-pause and a Pause that toggles unused state do not count. Default Pause on in the gallery.
2. **Reduced motion = end state on those same cells.** `pulse-halo` and `GooPuddle` must settle. `HeroPin` under reduce must not autoplay a loop, and must not hide Pause while a reel runs. `FlipWow` must show the reverse face when `flipped` (FoldPanel already does this). Pin **height** collapse can stay.

## What passes (do not lose)

- Gallery and docs content captions on `--nx-muted` (5.00:1+).
- Canvas rAF cancel + `u_play` + off-screen unmount.
- `letter-physics` / scramble / split SR split.
- `scaleY` bars; no accordion height spring.
- `otp-flip` named group of real inputs; tabs remain buttons; command hits are buttons.
- `wow-lazy.tsx` + `wow-variants.ts` so Button / ExtraButton / Hero extra do not statically import WebGL.
- `ScrollPin` reduced branch (the height part).
- `LoopPause` 44px / `focusRing` / `aria-pressed` on the helpers that actually render it.
- Horizontal page width in the 375/768 pin and loader stills.
- Loader `role="status"` + `aria-label`; visible label contrast on `/50`.

## Follow-up (not this verdict)

- `white/40` and typewriter `/35` `/25` on `#07070c`.
- `LensHover` / `PrismSplit` `sr-only` of `mx.get()` / `sx.get()` (announces `0 0`).
- `kit.tsx` static `wow.tsx` import if anyone copy-pastes the kit file for a sensible variant.
- Particle edge pass is still O(n²) **while live** (dead frames stop; that was the named rAF hole).
- Docs theme toggle and command hits still lack `focusRing`.
- Props table `min-w-[40rem]` inside the overflow well.
- Pin `left`/`right` writes on scroll.

I reject round 11. Close the two blockers. Do not merge on muted captions and a Pause that does not pause.
