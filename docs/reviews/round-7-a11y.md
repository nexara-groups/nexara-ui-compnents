# Round 7 — accessibility / performance

**From:** [Wow a11y perf critic](https://cursor.com/agents/bc-e2db98fd-82b6-5e62-99a5-6fcf7f9d73c8)  
**Branch:** `cursor/round-7-a11y-review-73c8` (read-only against overhaul `22635c5`)  
**Evidence:** `src/lib/wow.tsx`, `src/components/ui/wow-{core,blocks,app,scene,signatures}.tsx` at `22635c5`; Chrome 375 / 768 / 1280 against live Vite (`#hero` `#kit` `#marquee` `#aurora-background` `#typewriter` `#text-reveal` `#gradient-text` `#grid-background` `#process` `#footer` `#countdown` `#tabs` `#input` `#floating-navbar` `#button` `#logo-cloud` `#chapters` `#news` `#modal` `#command-palette`); `prefers-reduced-motion: reduce` emulated on the same set. No stills folder — pin tracks are 180–240vh and headless full-page capture hung.

## Verdict

**REJECT ALL**

187 gold “Signature” cells. A few primitives are wired correctly (`ScrambleText`, `SplitMask`, `WowStage` pause, `LazyMesh3D`). The family as shipped is pretty and unusable: infinite ornament without Pause, canvas loops that never die, reduced motion that keeps the long scroll, one split-text path that double-announces, and a pile of signatures that read as a dark card with an orbit.

This is not a leftover-chrome pass. It is a new motion surface. I will not stamp it.

## Named checks

| Check | Result | Notes |
| --- | --- | --- |
| `prefers-reduced-motion` **end state** | **Fail** | Helpers that freeze (`ScrambleText` settles, `SplitMask` `initial={false}`, `OrbitRing` parks at `rotate: angle`, `useLoopControl.playing` is false) are the exception. `ScrollPin` still paints `height: 240vh` / `220vh` / `210vh` / `200vh` / `180vh` / `160vh` and only forces `progress = 1`. Chrome: `#hero` pin box **1949px** with reduce on; page height **32025px** — same as motion. User scrolls two-plus empty viewports past a hero that already finished. `Odometer` always springs. `letter-physics` always flies letters. `variable-morph` keeps breathing tracking. `GridWow` `perspective-fly` / `topo-pulse` / `hex-orbit` ignore the media query. `FlipWow` always `rotateY`. Shorter / frozen loops are not an end state. |
| Pause on infinite ornament (WCAG **2.2.2**) | **Fail** | `LoopPause` exists and is 44px. It is not on the ornament. `OrbitRing` is mounted **21 times**; `paused` is passed on **3** (`hero/globe-orbit`, `magnetic-button/orbit-pull`, `marquee/logo-orbit`). `orbit-pull` has no visible Pause. Infinite with **no** Pause: `spotlight-card/orbit-badge`, `bento-grid/orbit-tile`, `grid-background/{perspective-fly,topo-pulse,hex-orbit}`, `floating-navbar/orbit-nav`, `tabs/orbit-pills`, `avatar/orbit-status`, `testimonials/orbit-quotes`, `footer/orbit-marks`, `stats/orbit-ring`, `countdown/analog-orbit`, `services/orbit-crews`, `process/orbit-rhythm`, `team/orbit-crew`, `news/orbit-digest`, `logo-cloud/orbit-3d`, `app-shell/command-orbit`, `kanban-board/orbit-wip`, `kit/globe-agency`. Same for unpaused `ParticleField` / `ShaderMesh` / `GlobeField` on hologram, pin-scroll, glass-liquid, shader-row, particle-confirm, particle-toss, particle-hint, particle-pulse, particle-rank, particle-grid, particle-press, particle-live, particle-lane, particle-area, particle-jump, liquid-rail, globe-agency. Marquee `velocity-scroll` and `grain-tape`, news `velocity-tape`, badge `beam-orbit`, button `liquid`, gradient `variable-morph` loop >5s with no control. Hover-only (`button/burst`) does not count for the rest. |
| Scramble / split `aria-label` + `aria-hidden` fragments | **Fail on `letter-physics`** | `ScrambleText` (`wow.tsx` 437–445): label on the wrapper, glyphs in `aria-hidden` — **pass**, live on `#hero` `#button` `#kit` `#news` `#command-palette`. `SplitMask` (461–475): same — **pass**, live on `#hero` `#text-reveal` `#gradient-text` `#chapters`. `text-reveal / letter-physics` (`wow-core.tsx` 469–476): `aria-label` on the `<p>`, **22** letter `<span>`s, **0** `aria-hidden`. Chrome read both the sentence and the glyphs. `Odometer` hides the stacks (good) and never respects reduce (not good). |
| 44px touch | **Pass on wow controls** | `wowBtn` / `LoopPause` / tab chips / accordion headers / `min-h-11` fields are 44–52px at 375. `#input` “Harbor” / “Liquid focus” / “Ask the desk” measured **44×309**. The 1×1 “Harbor” on that page is a leftover `sr-only` demo field, not the signature. Skip link is the usual 1×1 until focus (docs chrome). `otp-flip` boxes are **48×48 `<span>`s** — sized, not a field. |
| 375 / 768 / 1280 no **page** overflow | **Pass X / fail height** | `document.scrollWidth - clientWidth = 0` at 375, 768, and 1280 on every hash above. `overflow-wrap: anywhere` + `main.min-w-0` + gallery `overflow-hidden` keep a horizontal scrollbar off the `html` element. That is the letter of the check. It is not a usable page: `#hero` **32025px** tall (pin `240vh`), `#kit` **52124px** (`220vh`), `#chapters` **19722px** (two `210vh`), `#process` **12589px** (two `200vh`). Gallery articles grow with the pin track; `overflow-hidden` does not shrink them. Docs `min-w-[40rem]` props tables still overflow their `overflow-x-auto` wells at 375 (pre-existing). |
| Canvas / WebGL paused off-screen | **Fail** | Comment on `ShaderMesh` says it pauses off-screen. Implementation sets `u_play = 0` / skips particle integration / stops globe `rot +=` and **keeps `requestAnimationFrame`**. `#hero` at top: three canvases allocated (**225×384**, **307×512**, **307×512**) at `top` 24880 / 26903 / 28239 — none in view. Same buffers with reduce on. `ParticleField` still walks an **O(n²)** edge pass every frame while “paused.” `GlobeField` still projects **420** points every frame. Off-screen means *cancel the loop*, not freeze a uniform. |
| 3D lazy | **Pass the import; fail the product** | `LazyMesh3D` is `lazy(() => import('./wow-scene.tsx'))`, `Suspense`, unmounts when `!inView`, static radial wash when reduced. `three` / `@react-three/fiber` stay off the first graph. `WowScene` has no `frameloop="demand"`, no Pause, and `useFrame` always spins the crystal while mounted (`hero/morph-stage`, `kit/liquid-portal`). `wow-signatures.tsx` statically imports `WowCore` / `WowBlocks` / `WowApp`, and **every** family file imports `isWowVariant` from that module — copy-paste of `Button` pulls the WebGL / particle / globe helpers even when the consumer never asks for a signature. |
| 60fps / no layout-thrash | **Fail** | `ScrollPin` `setProgress` on window `scroll` (React commit every tick). `chart-block/scrub-bars` writes **height %**. `process` / `countdown` rewrite width / text from that progress. `gradient-text/variable-morph` animates **`letterSpacing` infinitely** (`wow-core.tsx` 482–486). `accordion` wow animates `height: 'auto'`. `leaderboard/podium-spring` animates `height`. `ScrambleText` / `useCountUp` `setState` on rAF. Liquid goo `filter: url(#id)` on looping blobs. Grain is a live `feTurbulence` tile on every `WowStage`. These are not transform/opacity. |

## Owner test — “would this look normal?”

Yes, repeatedly. I am allowed to reject on quality.

- **`OrbitRing` is the signature.** Twenty-one cells are the same 22s linear spin of 11px pills on `#07070c`. `tabs/orbit-pills` even **drops the tab buttons** and leaves the ring. That is a Magic UI demo, not a Nexara product.
- **`typewriter/flap-3d`** is four static `GATE` tiles. Catalog copy says “split-flap tiles with depth.” There is no flap.
- **`typewriter/matrix-rain`** is `WowStage particles` plus one scramble line. Not rain.
- **`testimonials/video-shader`** is a quote on a mesh. No reel.
- **`activity/liquid-chat`** is two bubbles.
- **`data-table/heat-cells`** is a 3×4 opacity grid. `morph-cards` wraps the desktop table in `md:hidden`, so `md+` shows nothing.
- **`kpi/glare-delta`**, **`footer/grain-night`**, **`modal/shared-morph`**, **`services/tilt-doors`**, **`logo-cloud/glare-lockups`**: night plate, serif, optional tilt. 2023 SaaS.

A screenshot of those next to 21st.dev / Aceternity does not hold. Shader void, globe, and pin-scroll are the only cells that even attempt a first gesture. They fail the a11y/perf gates above.

## What is actually wired (do not lose)

- `ScrambleText` / `SplitMask` label + hidden fragments, reduce → full sentence.
- `WowStage` Pause when `shader \|\| particles \|\| globe`, hidden when reduced.
- `useLoopControl` ANDs playing with reduce.
- `LazyMesh3D` code-split + off-screen unmount + reduce still.
- `wowBtn` / `LoopPause` 44px, `focusRing`, named Pause/Play with `aria-pressed`.
- Canvas nodes are `aria-hidden`.
- Horizontal page width holds at 375 / 768 / 1280.

That is a scaffold. It is not a ship.

## Blockers (must close before I look again)

1. **2.2.2 on every infinite ornament.** One Pause (or `useLoopControl` wired to a visible control) per looping `OrbitRing`, canvas field, marquee, `variable-morph`, `beam-orbit`, `liquid` blobs, news tape. Hover-pause is not enough. Default Pause on in the gallery.
2. **Cancel canvas rAF when `!inView \|\| paused \|\| reduced`.** Do not draw a frozen frame 60 times a second. Same for globe / particles (drop the O(n²) pass when dead).
3. **Reduced motion = end state, not a tall still.** `ScrollPin` height collapses to the sticky panel (`min-h-[min(32rem,100dvh)]`) when reduced; `progress` is 1. `Odometer`, `letter-physics`, `variable-morph`, `GridWow`, `FlipWow` jump to the settled frame and do not loop.
4. **`letter-physics`:** `aria-hidden` on each glyph (or stop splitting). Keep the sentence on `aria-label`.
5. **No layout animations on the hot path.** Stop `letterSpacing` loops, `height` springs, and scroll-driven `setState` that writes height. `transform` / `opacity` only, or `scroll-timeline` without React commits.
6. **Stop shipping decoys as named products.** `otp-flip` must be the wired OTP group or lose the name. `tabs/orbit-pills` must keep operable tabs. `command-palette` hits must be buttons. `modal/*` wow cells that are not dialogs cannot keep the modal name. `flap-3d` / `matrix-rain` / `video-shader` must do the trick or come off the gold list.
7. **Split `isWowVariant` from the wow implementation graph** so a sensible `Button` copy does not pull WebGL.

## Follow-up (not this verdict)

- `--nx-faint` gallery chrome and `white/40` captions on `#07070c` (~3.7:1) are still 1.4.3. Same class of hole as rounds 5–6.
- `accordion` wow headers have no `aria-expanded` / `aria-controls`.
- Pin variants inside the docs gallery need a **contained scroller** (the demo already has `h-72 overflow-auto` in `demos.tsx`) so one cell cannot add 240vh to the document.
- 3D crystal needs Pause while on-screen, not only an unmount when it leaves.

I reject the signature pass. Close the seven blockers. Do not merge on prettiness.
