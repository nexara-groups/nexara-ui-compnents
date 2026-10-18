# Round 7 — motion designer

**From:** [Motion designer critic](https://cursor.com/agents/bc-28ecc41f-1ba1-5bb2-98e4-746b10d26a9a)  
**Branch under review:** `cursor/visual-quality-overhaul-3ef7` @ `22635c5` (read-only). This file lives on `cursor/round-7-motion-critic-6a9a`.  
**Subject:** signature wow variants in `src/lib/wow.tsx`, `wow-core.tsx`, `wow-blocks.tsx`, `wow-app.tsx`.  
**Bar:** would a designer screenshot this next to Aceternity / Magic UI / Awwwards without it reading as 2023 SaaS? Hover tint, 200ms fade, and looping gradient are illegal. `prefers-reduced-motion` must still. Loops need a visible Pause. 60fps means transform/opacity (or a canvas that actually stops off-screen). 3D is lazy.

Evidence: `docs/audit/round-7/` (Chromium 1280 smoke on all 187 gold cells, Pause click, reduced-motion stills, delayed 3D wait). Research: `docs/research/wow-benchmark.md`.

## Verdict

**CONDITIONAL**

The primitives in `wow.tsx` are real: a fragment-shader mesh, a cursor particle field, a Fibonacci globe, scramble, split-mask, odometer, path-draw, tilt-glare, magnetic spring, sticky scroll-pin, SVG goo, lazy three.js. About **47** signatures finish one of those tricks, honor reduced motion, and (when they loop) show Pause. Those are keepable as catalogue cells.

The other **140** fail. Most of the gold chip is the same eight helpers restickered onto 46 families. Names lie. Loops run without Pause. The lazy crystal is a tutorial icosahedron with no Pause. I would not walk this catalogue next to Aceternity as a set.

Do not merge until the owner says so. Do not ship the failing cells as Signature.

## Keep (47)

These pass the screenshot test *as the trick they name*, with reduced-motion stills and Pause on loops. Primitive `requestAnimationFrame` still running while `u_play=0` is a system debt on every canvas keeper — visual freeze is honest; CPU/GPU freeze is not. That debt does not by itself fail these cells.

| Variant | Why it stands |
| --- | --- |
| `hero / shader-void` | Original iris/teal/gold fbm mesh, scramble mast, visible Pause. Reduced hides Pause and freezes the field. Closest cell to an Aceternity shader hero. |
| `hero / scramble-mast` | Split-mask display + hover scramble. One-shot. Reduced paints the settled mast. |
| `hero / globe-orbit` | Projected sphere + orbiting marks + Pause. Magic UI globe, finished. |
| `aurora-background / shader-mesh` | The field *is* the component. Pause. Reduced still. Clicking Pause flips to Play. |
| `aurora-background / particle-field` | Cursor constellation, Pause. |
| `aurora-background / globe-field` | Globe as a background, Pause. |
| `spotlight-card / shader-well` | Same mesh, card-sized, Pause. Honest name. |
| `spotlight-card / glare-tilt` | Pointer tilt + specular. The glare trick, once. |
| `spotlight-card / scramble-stat` | Scramble label + odometer. |
| `button / ink-path` | SVG writes on mount. |
| `button / glare` | Tilt-glare on the CTA. |
| `button / burst` | Particles only while the pointer is down. Not a loop. |
| `button / scramble` | Hover scramble. |
| `magnetic-button / gravity-well` | Spring pull, mouse only, reduced no-ops. |
| `magnetic-button / comet-trail` | Bloom follows the pointer. |
| `gradient-text / scramble` | Hover scramble on the line. |
| `gradient-text / split-mask` | Per-line mask. |
| `typewriter / odometer` | Digit columns. |
| `typewriter / scramble-line` | Scramble. |
| `typewriter / matrix-rain` | Particles + scramble, Pause. |
| `text-reveal / line-mask` | Actual reveal. |
| `text-reveal / letter-physics` | Per-glyph spring. `aria-label` on the sentence. |
| `tabs / layout-morph` | Shared `layoutId` ink. |
| `floating-navbar / magnetic-pill` | Magnet on the pill. |
| `floating-navbar / morph-dock` | Layout morph between word and initial. |
| `accordion / path-plus` | Plus mark draws. |
| `input / otp-flip` | Odometer digits. |
| `input / magnetic-caret` | Magnet on the field. |
| `toast / path-check` | Check draws. |
| `toast / odometer-count` | Inbox ticks. |
| `badge / scramble-live` | Hover scramble. Small, but it is the named trick. |
| `pricing / odometer-price` | Price columns tick. |
| `testimonials / scramble-pull` | Quote scrambles in. |
| `footer / giant-marquee` | Display-size tape, Pause. |
| `marquee / logo-orbit` | Canonical orbit *with* Pause. |
| `stats / odometer` | Three tickers. |
| `kpi / odometer-spark` | Rupee ticker. |
| `kpi / ring-draw` | Stroke draws to 78%. |
| `bento-grid / ticker-tile` | Odometer tile. |
| `countdown / launch-scrub` | Scroll is the timeline. Reduced snaps to the last frame (`progress=1`). |
| `process / pin-steps` | Sticky chapter swap on a 200vh track. |
| `chapters / pin-story` | Same contract, different copy. One pin story is enough; see `scrub-essay`. |
| `cta-band / scramble-cta` | Mast scrambles. |
| `chart-block / path-draw` | Own polyline, not `INK_PATH`. |
| `activity / live-odometer` | Event count ticks. |
| `kit / shader-clinic` | Shader + split-mask composition, Pause. |
| `kit / scramble-academy` | Hover scramble on a kit mast. |

## Fail (140)

Every gold cell not in the keep table. Grouped by the fail that kills it. Many fail more than one test.

### 1. The name lies, or the motion is 2023 SaaS / hover tint / 200ms fade

Mandatory test: if I can describe it as “normal,” it is not a signature.

- **`magnetic-button / shatter`** — `letterSpacing` on hover. Smoke: a black pill that says “shatter.” Not shatter.
- **`typewriter / flap-3d`** — static boxed `G A T E`. Round 5 already killed flap-that-does-not-flap.
- **`countdown / flip-3d`** — odometer in rectangles, not a 3D flap.
- **`countdown / shader-rings`** — frozen `12d 06h 18m 04s` on the shared mesh. No rings. No clock.
- **`testimonials / wall-parallax`** — `y: i * 8` static offset. Not parallax.
- **`testimonials / video-shader`** — shader well captioned as a reel. No video.
- **`marquee / cylinder-3d`** — `translateX` + `rotateX(18deg)`. Type wraps mid-glyph (`Ki / te`). Not a cylinder.
- **`marquee / velocity-scroll`** — linear tape. Not linked to scroll velocity. No Pause.
- **`news / velocity-tape`** — same tape, news copy, no Pause.
- **`news / flip-headlines`** — hover scramble, not flip.
- **`grid-background / perspective-fly`** — synthwave floor grid, infinite `y` loop, no Pause, no reduced. 2018 CSS demo.
- **`grid-background / topo-pulse`** — expanding rings, infinite, no Pause, no reduced.
- **`activity / liquid-chat`** — two static bubbles. Zero motion. Caption: “Bubbles with a spring.”
- **`activity / stagger-feed`** — `opacity` + `x` stagger. 2023 list fade.
- **`data-table / row-stagger`** — same fade on `<tr>`.
- **`data-table / heat-cells`** — twelve static purple rectangles. No motion.
- **`data-table / morph-cards`** — empty at 1280. Cards are `md:hidden`; the table is `hidden md:block` *inside* that wrapper, so both hide.
- **`command-palette / glare-row`** — `hover:bg-white/10`. Hover tint. Illegal.
- **`command-palette / morph-results`** — default list. No morph.
- **`toast / liquid-slide`** — a 4px accent rail. `y: 18` / `opacity` enter.
- **`toast / spring-stack`** — same enter. Not a stack.
- **`hero / morph-stage`** — `layoutId` on a plate that is only inside itself. Open loads a cropped icosahedron. No Pause.
- **`kit / liquid-portal`** — same crystal, cropped to the top of a black well, named liquid, no Pause. Lazy three.js *does* mount after intersection (`three.js r186` canvas). The object would not survive an Awwwards thumbnail.
- **`modal / shared-morph`** — mark never leaves a trigger. Incomplete shared-element.
- **`modal / liquid-sheet`** — two static goo circles. Not a sheet.
- **`case-study / scroll-film`** — `overflow-x-auto` + tilt cards. Not a pinned film.
- **`chapters / parallax-index`** — static index + split-mask. Not parallax.
- **`settings-panel / morph-sections`** — extra muted sentence.
- **`settings-panel / liquid-toggle`** — thumb `left` 4→28. Not liquid. Animates `left`.
- **`pricing / morph-toggle`** — Monthly/Yearly string swap.
- **`app-shell / morph-sidebar`** — width collapse. Sensible chrome, not a signature.
- **`kanban-board / spring-toss`** and **`glare-cards`** — identical MagneticWell + TiltGlare cards.
- **`logo-cloud / magnetic-marks`** and **`glare-lockups`** — identical magnet+tilt lockups.
- **`flip-card / morph-face`**, **`hologram`**, **`path-reveal`**, **`liquid-flip`** — one `rotateY(180)` click. Costume is the shader on `liquid-flip` only. Illegal siblings (round 1, still true).
- **`draggable-card / physics-deck`** — TiltGlare. Not draggable. Not physics.
- **`process / scrub-timeline`** — byte-identical to `pin-steps`.
- **`chapters / scrub-essay`** — byte-identical to `pin-story`.
- **`badge / liquid-pill`** — `filter: url(#id)` with no `LiquidFilter` mounted. Dead goo.
- **`input / liquid-focus`** — static blob, no focus choreography.
- **`contact / liquid-form`** — unused filter + two inputs.
- **`tabs / liquid-ink`** — blur wash on the active pill.

### 2. Looping ornament with no visible Pause

`LoopPause` only appears when `WowStage` has shader/particles/globe, or on a handful of explicit parents (`hero/globe-orbit`, aurora four, `marquee/logo-orbit`, `marquee/cylinder-3d`, `footer/giant-marquee`). Smoke confirmed `pauseCount: 0` on every cell below. `useLoopControl` without a button is not Pause.

**OrbitRing (22s linear, no `inView`, almost never paused):**  
`spotlight-card/orbit-badge`, `bento-grid/orbit-tile`, `magnetic-button/orbit-pull`, `grid-background/hex-orbit`, `floating-navbar/orbit-nav`, `tabs/orbit-pills`, `avatar/orbit-status`, `testimonials/orbit-quotes`, `footer/orbit-marks`, `stats/orbit-ring`, `countdown/analog-orbit`, `services/orbit-crews`, `process/orbit-rhythm`, `team/orbit-crew`, `news/orbit-digest`, `logo-cloud/orbit-3d`, `app-shell/command-orbit`, `kanban-board/orbit-wip`.

**ShaderMesh / ParticleField / GlobeField without Pause:**  
`hero/pin-scroll` (the best idea in the kit — sticky scale 0.42→1 on the mesh — killed by an unpausable loop), `draggable-card/hologram`, `draggable-card/particle-toss`, `flip-card/liquid-flip`, `floating-navbar/glass-liquid`, `modal/shader-veil` (Pause exists on the gallery preview *and* a nested live preview — doubled, not designed), `modal/particle-confirm`, `accordion/shader-row`, `tooltip/particle-hint`, `avatar/shader-ring`, `avatar/particle-presence`, `avatar/holographic`, `pricing/shader-featured`, `stats/particle-pulse`, `leaderboard/particle-rank`, `services/shader-cards`, `team/particle-grid`, `contact/map-shader`, `cta-band/liquid-wash`, `cta-band/particle-close`, `news/shader-magazine`, `logo-cloud/particle-press`, `app-shell/shader-desk`, `app-shell/liquid-rail`, `kpi/particle-live`, `kanban-board/particle-lane`, `chart-block/particle-area`, `chart-block/shader-donut`, `command-palette/particle-jump`, `kit/globe-agency`.

**Other infinite loops, no Pause:**  
`button/liquid` (goo blobs; `loop.playing` is wired, no control; smoke shows two unblended circles, not goo), `gradient-text/variable-morph` (`letterSpacing` 5s infinite), `marquee/grain-tape`, `badge/beam-orbit` (spinning border).

### 3. Reduced motion stills missed

Keepers using `usePrefersReducedMotion` / `useLoopControl` hide Pause and freeze canvas uniforms. Failures:

- `GridWow` (`perspective-fly`, `topo-pulse`, `hex-orbit`) never reads reduced motion.
- `gradient-text / variable-morph` never reads it.
- `Odometer` always springs digit columns. Reduced snaps `useCountUp` to target, then the columns still animate from 0 on first paint.
- `toast`, `activity/stagger-feed`, `data-table/row-stagger`, `flip-card` rotateY, `accordion` height, `leaderboard` bars/podium, `chart-block` pathLength — no reduced branch.
- `usePrefersReducedMotion` still defaults `false` before `matchMedia` on the server. First paint can move.
- Reduced aurora/hero shader stills are complete (Pause gone, field frozen). That part holds on the keepers. Smoke: `docs/audit/round-7/focus-aurora-shader-mesh-reduced.png`, `focus-hero-shader-void-reduced.png`.

### 4. 60fps contract

Animate transform/opacity. Pause off-screen.

- **Canvas primitives lie about off-screen pause.** `ShaderMesh` / `ParticleField` / `GlobeField` comments say they pause off-screen. They set `u_play=0` / skip integration and **keep `requestAnimationFrame`**. `inView` is an effect dep, so leaving the viewport tears down and immediately starts a new draw loop. Lazy three.js is the only engine that actually unmounts (`LazyMesh3D` swaps to a radial still when `!inView`).
- `OrbitRing` never observes the viewport.
- Layout properties: `accordion/height-morph` (`height: auto`), `leaderboard/heat-race` (`width %`), `leaderboard/podium-spring` (`height`), `chart-block/scrub-bars` (inline `height` on scroll), `settings-panel/liquid-toggle` (`left`), `gradient-text/variable-morph` and `magnetic-button/shatter` (`letterSpacing`).
- `ParticleField` is O(n²) line tests every frame, still, even when `live` is false.
- `hero / pin-scroll` puts a live WebGL mesh on a 240vh sticky track with no Pause and no rAF cancel. The docs `#hero` page also mounts shader-void + globe at the same time (smoke: 3 canvases on `#hero`).

### 5. Wallpaper (same trick, different caption)

Illegal the same way round 1’s twelve magnets were illegal. Resting copy changes; the motion does not.

- **TiltGlare restickers:** `bento-grid/depth-mosaic`, `tooltip/follow-glare`, `pricing/tilt-glare`, `stats/glare-mosaic`, `case-study/glare-stack`, `services/tilt-doors`, `team/glare-portraits`, `team/holographic` (grain on the same tilt), `cta-band/glare-band`, `kpi/glare-delta`, `kanban-board/glare-cards`, `settings-panel/glare-profile`.
- **INK_PATH / CHECK_PATH restickers:** `gradient-text/path-write`, `text-reveal/svg-draw`, `grid-background/circuit-draw`, `input/path-underline`, `badge/path-ribbon`, `footer/path-sitemap`, `case-study/path-index`, `services/path-checklist`, `process/path-rail`, `contact/path-directions`, `chapters/path-folio`, `activity/path-rail`, `settings-panel/path-security`.
- **MagneticWell restickers:** `tooltip/magnetic-tag`, `contact/magnetic-branches`, `logo-cloud/magnetic-marks`.
- **Scramble-on-everything:** `tabs/scramble-label`, `accordion/kinetic-faq`, `tooltip/scramble-tip`, `command-palette/scramble-search`. Hover scramble is legal once (`button/scramble`). It is not four more signatures.
- **`aurora-background / liquid-glass`** — the mesh plus a frosted rectangle. Not liquid.

### Complete fail list (140)

`draggable-card/physics-deck`, `draggable-card/magnetic-stack`, `draggable-card/hologram`, `draggable-card/particle-toss`, `spotlight-card/orbit-badge`, `flip-card/morph-face`, `flip-card/liquid-flip`, `flip-card/hologram`, `flip-card/path-reveal`, `bento-grid/depth-mosaic`, `bento-grid/shader-tile`, `bento-grid/orbit-tile`, `button/liquid`, `magnetic-button/orbit-pull`, `magnetic-button/shatter`, `aurora-background/liquid-glass`, `grid-background/perspective-fly`, `grid-background/circuit-draw`, `grid-background/topo-pulse`, `grid-background/hex-orbit`, `gradient-text/variable-morph`, `gradient-text/path-write`, `typewriter/flap-3d`, `text-reveal/kinetic-stack`, `text-reveal/svg-draw`, `floating-navbar/orbit-nav`, `floating-navbar/glass-liquid`, `modal/shared-morph`, `modal/shader-veil`, `modal/liquid-sheet`, `modal/particle-confirm`, `hero/pin-scroll`, `hero/morph-stage`, `marquee/cylinder-3d`, `marquee/velocity-scroll`, `marquee/grain-tape`, `input/liquid-focus`, `input/path-underline`, `tabs/liquid-ink`, `tabs/orbit-pills`, `tabs/scramble-label`, `accordion/height-morph`, `accordion/kinetic-faq`, `accordion/shader-row`, `tooltip/follow-glare`, `tooltip/particle-hint`, `tooltip/scramble-tip`, `tooltip/magnetic-tag`, `toast/spring-stack`, `toast/liquid-slide`, `avatar/orbit-status`, `avatar/shader-ring`, `avatar/particle-presence`, `avatar/holographic`, `badge/beam-orbit`, `badge/liquid-pill`, `badge/path-ribbon`, `pricing/tilt-glare`, `pricing/morph-toggle`, `pricing/shader-featured`, `testimonials/wall-parallax`, `testimonials/video-shader`, `testimonials/orbit-quotes`, `footer/grain-night`, `footer/orbit-marks`, `footer/path-sitemap`, `stats/orbit-ring`, `stats/particle-pulse`, `stats/glare-mosaic`, `countdown/flip-3d`, `countdown/shader-rings`, `countdown/analog-orbit`, `leaderboard/heat-race`, `leaderboard/podium-spring`, `leaderboard/live-odometer`, `leaderboard/particle-rank`, `case-study/scroll-film`, `case-study/shared-morph`, `case-study/glare-stack`, `case-study/path-index`, `services/tilt-doors`, `services/orbit-crews`, `services/shader-cards`, `services/path-checklist`, `process/scrub-timeline`, `process/path-rail`, `process/orbit-rhythm`, `team/glare-portraits`, `team/orbit-crew`, `team/holographic`, `team/particle-grid`, `contact/map-shader`, `contact/liquid-form`, `contact/magnetic-branches`, `contact/path-directions`, `cta-band/liquid-wash`, `cta-band/particle-close`, `cta-band/glare-band`, `chapters/scrub-essay`, `chapters/parallax-index`, `chapters/path-folio`, `news/velocity-tape`, `news/flip-headlines`, `news/shader-magazine`, `news/orbit-digest`, `logo-cloud/orbit-3d`, `logo-cloud/magnetic-marks`, `logo-cloud/glare-lockups`, `logo-cloud/particle-press`, `app-shell/morph-sidebar`, `app-shell/command-orbit`, `app-shell/shader-desk`, `app-shell/liquid-rail`, `kpi/particle-live`, `kpi/glare-delta`, `data-table/row-stagger`, `data-table/morph-cards`, `data-table/heat-cells`, `data-table/odometer-cells`, `kanban-board/spring-toss`, `kanban-board/glare-cards`, `kanban-board/orbit-wip`, `kanban-board/particle-lane`, `chart-block/particle-area`, `chart-block/scrub-bars`, `chart-block/shader-donut`, `activity/stagger-feed`, `activity/path-rail`, `activity/liquid-chat`, `command-palette/scramble-search`, `command-palette/morph-results`, `command-palette/particle-jump`, `command-palette/glare-row`, `settings-panel/morph-sections`, `settings-panel/liquid-toggle`, `settings-panel/path-security`, `settings-panel/glare-profile`, `kit/globe-agency`, `kit/pin-sports`, `kit/liquid-portal`.

## What I would rebuild first (not this pass)

1. **`hero / pin-scroll`** — already the only cell that changes the page on scroll. Add Pause (or treat the mesh as a still and scrub scale only). Then it is an Awwwards thumbnail.
2. **Stop minting OrbitRing / ShaderMesh / TiltGlare / INK_PATH as family variants.** One finished trick per technique. The rest are costumes.
3. **Cancel rAF when `!inView || paused || reduced`.** Unmount the canvas, or `return` before scheduling the next frame. Copy `LazyMesh3D`.
4. **Put `LoopPause` on every infinite `animate` / canvas.** `button/liquid` already has `useLoopControl` and forgot the button.
5. **Replace the icosahedron** with a scene that can hold a pause control and a frame, or drop the 3D claim.
6. **Goo that actually goos.** `button/liquid` smoke is two separate circles.

## Approval bar

Approve the signature *pass* when:

- Failing cells are demoted off the gold chip or rebuilt into a different job.
- Every remaining loop has a visible Pause that actually stops keyframes / uniforms, including `hero/pin-scroll`.
- Canvas and `OrbitRing` do not schedule frames off-screen.
- Reduced motion never animates `height`, `width`, `left`, or `letterSpacing`, and `Odometer` paints the final digit with no spring.
- No Signature can be described as “the same orbit with different strings” or “hover tint.”

Until then: keep the 47. Strip the gold chip from the 140. Do not merge.
