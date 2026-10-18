# Round 11 — motion designer

**From:** Interaction / motion critic  
**Subject:** wow signatures at `a4c5592` on `cursor/visual-quality-overhaul-3ef7` only.  
**Scope:** 47 families, 199 gold cells in `WOW_VARIANTS`. Source: `src/lib/wow.tsx`, `wow-fx.tsx`, `wow-unique.tsx`, `src/components/ui/wow-core.tsx`, `wow-blocks.tsx`, `wow-app.tsx`, `wow-scene.tsx`, `loader.tsx`, `kit.tsx`. Proof: `docs/audit/wow/round11-motion.webm` (5.48s, 25fps VP9) and `shader-void-motion.webm` (4.44s, 25fps). Stills under `docs/audit/wow/`.  
**Brief:** motion contract (WCAG 2.2.2 pause, rAF cancel, reduced-motion end state), 60fps, lazy 3D, named mechanic is the motion. Mandatory test: would this sit next to a top 21st.dev / Aceternity / Awwwards entry? Reject generic shimmer / orbit farms.

Round 7 scored `22635c5` **CONDITIONAL** (47 keep / 140 fail) because canvases kept `requestAnimationFrame` while `u_play=0` and most gold cells were ornamental loops. Rounds 8–10 claimed that hole closed. This pass re-scores the destock + loader + four-chapter pin commit. I do not merge. I do not patch.

## Verdict

**CONDITIONAL. 66 keep / 133 fail.**

The round-7 canvas rAF hole is closed. `ShaderMesh`, `ParticleField`, `GlobeField`, and `MatrixRain` draw one frozen frame, then stop the frame request when paused, reduced, or off-screen. `LazyMesh3D` stays a separate chunk and `WowScene` switches `frameloop` to `demand` when paused. Destocking orbit / tilt is real: most gold cells no longer wrap `OrbitRing` / `TiltGlare`. Several named primitives now do what they say (`RadarSweep`, `PrismSplit`, `DialGauge`, `MetronomeArm`, `TapeReels`, `PendulumCard`).

That is not an approve.

`hero / pin-scroll` writes four chapters in source and **fails the motion contract** as shipped. Pause is a dead control. Chapter 2+ autoplays a muted reel with no transport. The supplied proof never reaches chapters 02–04: inner-scroll of the gallery `max-h-[36rem]` cell drops the sticky plate into an empty black track. Reduced motion does collapse the 420vh pin. The scrub exists on paper. It does not play on film.

The new loader family does **not** pass. `pulse-halo` (the default) loops with no Pause and no reduced branch — the still and the clip both show a breathing ring and no control. `liquid-drop` and `analog-sweep` are the same hole. A subset of loaders are honest and pauseable. The family is not.

Named lies remain (`lens-spec`, `zipper-tabs`, `otp-flip`, `height-morph`, `kinetic-stack`, `prism-face`, `analog-orbit`, `film-mosaic`). Shader / particle / goo / beam farms still fill gold chips. `GooPuddle` loops without Pause or reduced-motion on every “liquid-*” cell that is not `button / liquid`. Framer loops do not halt off-screen. The 25fps proof clips cannot certify 60fps.

Do not merge as an Awwwards peer. Keep the 66. Rebuild pin-scroll until the clip shows four chapters and Pause freezes the plate and the reel. Put Pause + reduced end-state on every loader loop. Kill the named lies.

---

## Contract scorecard

| Check | Status | Evidence |
| --- | --- | --- |
| Pause on infinite ornament (2.2.2) | **Partial** | Unique loops (`RadarSweep`, `TapeReels`, `PendulumCard`, `MetronomeArm`, `BarcodeScan`, `InfinityPath`, `FilmSprocket`, `MorseBlink`, `BeamScan`, `VariableMorph`, canvas fields, `WowStage`) expose `LoopPause`. Holes below. |
| rAF cancelled when paused / off-screen | **Pass (canvas)** | `wow.tsx` `draw` / `tick` only reschedules when `live = !halt && !reduced && inView`. `MatrixRain` returns without a next frame when paused / reduced / off-screen. Round-7 `u_play=0` spin is gone. |
| rAF / compositing off-screen (Framer) | **Fail** | `RadarSweep`, `TapeReels`, `PendulumCard`, `MetronomeArm`, `HexLattice`, `TopoField`, `PerspectiveFloor`, marquees, `GooPuddle`, `CylinderSpin` keep infinite `animate` while off-screen. Not rAF, still a live loop. |
| `prefers-reduced-motion` → end state | **Partial** | `ScrollPin` drops the `height` track and renders `children(1)`. Scramble paints the sentence. Count-up snaps. Canvas freezes. `PolaroidFan`, `pulse-halo`, `GooPuddle`, `AreaSpark` particles ignore it. |
| Pin-scroll four chapters | **Fail contract** | Source yes. Proof no. Pause no-op. Reel ignores Pause. |
| Loader family loops pause | **Fail family** | 3 of 12 are unpausable ornament. Default is one of them. |
| Lazy 3D | **Pass** | `lazy(() => import(wow-scene))`, mounts only when `inView && !reduced`. Only `kit / liquid-portal` uses it. |
| 60fps | **Unproven** | Engines are rAF / R3F `useFrame`. Captures are 25fps. `ParticleField` is O(n²) line tests on 70 dots. DPR cap 1.5 and the 500px particle budget are the only brakes. |
| Named mechanic is the motion | **Partial** | Unique set below. Lies listed under Fail. |

### rAF (the round-7 hole)

Closed for the four canvas engines:

```177:181:src/lib/wow.tsx
      const live = !halt && !reduced && inView
      gl.uniform1f(uPlay, live ? 1 : 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (live) frame = requestAnimationFrame(draw)
```

`ParticleField` and `GlobeField` use the same `if (live) requestAnimationFrame` gate. `WowScene` is `frameloop={paused ? 'demand' : 'always'}`. I keep those cells when the field *is* the product. I do not keep a shader under a sentence.

### Pause holes (infinite ornament)

| Cell / primitive | Loop | Visible Pause? | What Pause does |
| --- | --- | --- | --- |
| `hero / pin-scroll` | Scroll is user-driven; chapter ≥2 `<video autoPlay loop>` | Yes. The still shows it. | **Nothing.** `loop.playing` is never read. The reel keeps playing. |
| `hero / morph-stage` | Open-state reel `autoPlay loop` | No | — |
| `testimonials / video-shader` | Reel `autoPlay loop` | No | — |
| `marquee / grain-tape` | `x: 0% → -50%` infinite | No. `WowStage` hides Pause unless shader / particles / globe. A second `useLoopControl` drives the track and is never toggled. | — |
| `news / velocity-tape` | Same marquee | No `LoopPause` | — |
| `loader / pulse-halo` | scale / opacity 1.6s infinite | **No.** Clip + still. | — |
| `loader / liquid-drop` | `GooPuddle` default `playing` | No | — |
| `loader / analog-sweep` | `useLiveRemain` 1s + second hand | No | — |
| `flip-card / liquid-flip`, `modal / liquid-sheet`, `tabs / liquid-ink`, `badge / liquid-pill`, `toast / liquid-slide`, `activity / liquid-chat`, `settings-panel / liquid-toggle` | `GooPuddle` infinite | No | — |
| `chart-block / particle-area` | `AreaSpark withParticles` pulse infinite | No | — |
| `countdown / analog-orbit` | Analog hands | No | — |

`button / liquid` is the goo exception: it owns Pause and AND-gates `loop.playing`.

### Reduced-motion holes

| Surface | Required end state | What happens |
| --- | --- | --- |
| `ScrollPin` (hero 420vh, kit 320vh, process / chapters / chart / countdown) | Collapse the extra viewport; show the last chapter | **Honored.** Early-return `children(1)`, no `height` track. |
| `PolaroidFan` / `testimonials / polaroid-quotes` | Stack at rest, no fan spring | **Ignored.** Hover still springs. No `usePrefersReducedMotion`. |
| `loader / pulse-halo` | Static ring | Keeps pulsing. |
| `GooPuddle` | Blobs parked | Keeps looping unless a parent passes `playing={false}`. Most parents do not. |
| `AreaSpark` particles | Frozen marks | Infinite opacity / radius. |
| `AnalogClock` | Current time, still | Hands snap to **0**, not the remaining time. |
| `usePrefersReducedMotion` | Correct on first paint | Function-init reads `matchMedia` in the browser. SSR still defaults `false`, so the first paint can move, then freeze. Same leftover as rounds 4–6. |

---

## Pin-scroll

Source (`HeroPin` in `wow-core.tsx`) **does** encode four chapters over `420vh`:

1. `01` — “A plate, not a banner.” Card scale ~0.42.  
2. `02` — “Glass grows with the scroll.” Specs list.  
3. `03` — “Night material.” Cinema still + **autoplaying reel**. Colorway callouts.  
4. `04` — Title / actions lockup. Progress ticks `01–04`.

Scale, radius, and inset scrub continuously. Chapter copy is stepped via `Math.floor(p * 4)`. Reduced motion snaps to chapter 04 and kills the 420vh. That is the right end state.

It still fails this lens.

1. **Pause is a named lie.** `LoopPause` is mounted. `loop.playing` is unused. WCAG 2.2.2 is not a label.
2. **The night reel is an unpausable loop.** Same `MediaFrame` crime as rounds 4–5, now inside a gold hero.
3. **The proof clip does not scrub four chapters.** `round11-motion.webm` shows chapter 01, then the gallery cell going black, then the loader docs. Chapters 02–04 never appear. Frame 04 of the extract has the heading clipped off the top of the `max-h-[36rem]` scroller — the sticky plate is not holding. A 420vh track with a failed pin is an empty void. That is what the clip captures.
4. **It would not stand next to an Apple product film or a top Awwwards scrolly.** It is a laptop still, a scale tween, and swapped serif lines. The self-note already admits this. I agree.

`kit / pin-sports` is a different, thinner story: `kit.tsx` scrubs **three** chapters over 320vh, then mounts the sports `KitCore`. `WowApp`’s `KitWow` pin is a 220vh counter and is not what `Kit()` ships. Neither is four chapters. Neither has Pause. I fail `kit / pin-sports`.

**Pin-scroll does not pass the motion contract.**

---

## Loaders

`loader.tsx` routes every default through `WowSignature`. `LoaderCore`’s `animate-pulse` dot is dead for the twelve gold ids. `LoaderWow` is the family.

| Variant | Mechanic | Pause | Reduced | Keep? |
| --- | --- | --- | --- | --- |
| `pulse-halo` | Scale ring | No. Proof. | No | Fail |
| `orbit-beads` | `RadarSweep`, not beads | Yes (radar’s own) | Stops rotate | Fail — named lie + leftover orbit |
| `shader-fog` | Full-bleed `ShaderMesh` | Self-Pause | Freeze | Fail — farm |
| `path-infinity` | Infinity stroke loops | Yes. Still. | `duration: 0` | **Keep** |
| `odometer-pct` | Finite count-up | n/a | Snaps | Fail standout (ticker, not a wait construction you would screenshot) |
| `scramble-hold` | One-shot scramble | n/a | Sentence | Fail standout |
| `liquid-drop` | `GooPuddle` | No | No | Fail |
| `particle-drift` | `ParticleField` | Self-Pause | Freeze | Fail — farm |
| `flap-wait` | Split-flap `WAIT` | Finite | Instant `WAIT` | **Keep** |
| `analog-sweep` | Clock | No | Hands at 0 | Fail |
| `barcode-scan` | Scan bar | Yes | Stops | **Keep** |
| `prism-bar` | RGB split on pointer | n/a (not a loop) | Static type | Fail as a loader — it does not wait |

Three keeps. The default fails. The family copy says “twelve waiting constructions with pause.” That is a named lie at the family level.

**Loaders do not pass the motion contract.**

---

## Unique primitives (named mechanic = motion?)

| Primitive | Claim | What it does | Contract | Verdict |
| --- | --- | --- | --- | --- |
| `RadarSweep` | Conic sweep | Conic gradient `rotate: 360` over 4.8s. Blips sit on a ring. | Pause. Reduced stops. No off-screen halt. | **True.** Used honestly on `avatar / radar-presence` and `app-shell / radar-jump`. Stolen as `loader / orbit-beads`. |
| `PrismSplit` | RGB split | Two `mix-blend-screen` copies offset from the pointer. | Pointer-only. Reduced paints one layer. | **True.** `pricing / prism-price` and `command-palette / prism-row` keep. At rest the pricing still is a plain `$48` — the motion is the pointer. |
| `PolaroidFan` | Fan of prints | Three figures spring to `rotate / x` on hover. | **No reduced branch.** | Mechanic is true. Cell **fails** reduced. Still is a stacked deck, not a fan. |
| `DialGauge` | Needle + arc | Arc `pathLength` and a needle to `value`. | Finite. Reduced sets length immediately. | **True.** `stats / dial-gauge` keeps. |
| `MetronomeArm` | Arm on a beat | Gold bar `rotate: [-22, 22]` 1.6s. | Pause. Reduced parks. | **True.** `process / metronome-steps` keeps. Cheap, but the name is the motion. |
| `TapeReels` | Two reels | Two dashed circles, different periods. | Pause. Reduced parks. | **True.** `marquee / tape-reels`, `news / tape-digest` keep. Not Studer. Honest. |
| `PendulumCard` | Hang and swing | `origin-top` `rotate: [-10, 10]`. | Pause. Reduced parks. | **True.** `kanban-board / wip-pendulum` keeps. The still matches. |
| `ZipperSplit` | Zipper | Two halves translate when `open`. | Reduced duration 0. | **Lie in use.** `tabs / zipper-tabs` hard-codes `open`. The zipper never closes. Tab changes swap the label inside an already-split panel. |

`LensHover` (`spotlight-card / lens-spec`, `tooltip / follow-lens`): a hollow ring, `backdropFilter: 'none'`, no magnification. The still is a spec card with no loupe. **Named lie.**

`MorseBlink`: a hardcoded `[1,0,1,0,1,1,1,0,0]` interval, not Morse for the label. I keep `badge / morse-live` as a pauseable blink, not as telegraphy.

---

## Proof clips

**`shader-void-motion.webm`.** The mesh moves. Iris / teal / gold drift. The mast scrambles (`The room opens.` → glyph noise). Pause is on the plate. This is the only clip that would sit next to an Aceternity field. Keep `hero / shader-void`.

**`round11-motion.webm`.** Hero pin chapter 01, then a black gallery well, then loader docs. `pulse-halo` breathes with no Pause. `orbit-beads` is a radar. `particle-drift` shows Pause (the field’s own). `flap-wait` reads `WAIT`. `analog-sweep` is a clock with no Pause. The clip does not prove four-chapter pin-scroll and it does not prove the loader family.

Stills that match the names: `stats-dial-gauge`, `kanban-wip-pendulum`, `app-radar-jump`, `nav-compass`, `loader-path-infinity` (Pause visible), `loader-flap-wait`, `hero-pin-scroll` (chapter 01 + dead Pause). Stills that do not: `card-lens-spec` (no lens), `pricing-prism-price` (no split at rest), `loader-pulse-halo` (no Pause), `testimonials-polaroid-quotes` (stack, not a fan).

---

## Keep (66)

A keep is a gold cell whose named mechanic is the motion, that honors pause / reduced when it loops, and that I would screenshot next to a current 21st.dev / Aceternity / Awwwards entry. Honest path-draw stamps and scramble-as-costume are not keeps.

- `hero / shader-void` · `hero / scramble-mast`
- `button / liquid` · `button / ink-path` · `button / glare` · `button / burst` · `button / scramble`
- `magnetic-button / gravity-well` · `magnetic-button / comet-trail` · `magnetic-button / ink-wake` · `magnetic-button / shatter`
- `draggable-card / physics-deck` · `draggable-card / prism-plate` · `draggable-card / particle-toss`
- `spotlight-card / glare-tilt`
- `flip-card / morph-face`
- `bento-grid / peel-tile`
- `aurora-background / shader-mesh` · `aurora-background / particle-field` · `aurora-background / liquid-glass` · `aurora-background / globe-field`
- `grid-background / perspective-fly` · `grid-background / circuit-draw`
- `gradient-text / variable-morph`
- `typewriter / matrix-rain` · `typewriter / flap-3d`
- `text-reveal / letter-physics`
- `floating-navbar / morph-dock` · `floating-navbar / compass-nav`
- `modal / shared-morph`
- `marquee / cylinder-3d` · `marquee / tape-reels`
- `input / magnetic-caret`
- `tabs / layout-morph`
- `avatar / radar-presence`
- `badge / morse-live`
- `pricing / prism-price`
- `footer / giant-marquee` · `footer / barcode-marks`
- `stats / odometer` · `stats / dial-gauge`
- `countdown / launch-scrub`
- `leaderboard / heat-race` · `leaderboard / podium-spring`
- `case-study / film-stack`
- `services / fold-doors` · `services / stamp-crews`
- `process / scrub-timeline` · `process / pin-steps` · `process / metronome-steps`
- `team / constellation-crew`
- `chapters / pin-story` · `chapters / scrub-essay`
- `news / flip-headlines` · `news / tape-digest`
- `app-shell / radar-jump`
- `kanban-board / wip-pendulum`
- `chart-block / scrub-bars`
- `command-palette / prism-row`
- `settings-panel / fold-profile`
- `kit / shader-clinic` · `kit / globe-agency` · `kit / liquid-portal`
- `loader / path-infinity` · `loader / flap-wait` · `loader / barcode-scan`

---

## Fail (133)

Grouped by why. Some cells fail more than one test; they appear once.

### Named lies (the motion is not the name)

`spotlight-card / lens-spec` · `tooltip / follow-lens` · `tabs / zipper-tabs` · `input / otp-flip` · `accordion / height-morph` · `text-reveal / kinetic-stack` · `flip-card / prism-face` · `bento-grid / depth-mosaic` · `countdown / flip-3d` · `countdown / analog-orbit` · `stats / film-mosaic` · `loader / orbit-beads` · `cta-band / liquid-wash` (shader, not liquid) · `logo-cloud / orbit-3d` · `kanban-board / spring-toss` (same peel stack as `peel-cards`, no toss)

### Pause / reduced / autoplay holes

`hero / pin-scroll` · `hero / morph-stage` · `testimonials / polaroid-quotes` · `testimonials / video-shader` · `marquee / grain-tape` · `news / velocity-tape` · `flip-card / liquid-flip` · `modal / liquid-sheet` · `tabs / liquid-ink` · `badge / liquid-pill` · `toast / liquid-slide` · `activity / liquid-chat` · `settings-panel / liquid-toggle` · `chart-block / particle-area` · `loader / pulse-halo` · `loader / liquid-drop` · `loader / analog-sweep`

### Shader / particle / orbit / beam farms (would not sit next to Awwwards)

`spotlight-card / shader-well` · `bento-grid / shader-tile` · `hero / globe-orbit` · `floating-navbar / glass-liquid` · `modal / shader-veil` · `modal / particle-confirm` · `accordion / shader-row` · `tooltip / particle-hint` · `avatar / shader-ring` · `avatar / particle-presence` · `avatar / holographic` · `pricing / shader-featured` · `stats / particle-pulse` · `countdown / shader-rings` · `leaderboard / particle-rank` · `services / shader-cards` · `team / particle-grid` · `team / holographic` · `contact / map-shader` · `cta-band / particle-close` · `cta-band / beam-band` · `news / shader-magazine` · `logo-cloud / particle-press` · `app-shell / shader-desk` · `app-shell / liquid-rail` · `kpi / particle-live` · `kanban-board / particle-lane` · `chart-block / shader-donut` · `command-palette / particle-jump` · `loader / shader-fog` · `loader / particle-drift` · `grid-background / topo-pulse` · `grid-background / hex-lattice` · `marquee / velocity-scroll`

### Honest but not a signature (finite path / scramble / odometer / static chrome)

`draggable-card / magnetic-stack` · `spotlight-card / scramble-stat` · `flip-card / path-reveal` · `bento-grid / ticker-tile` · `gradient-text / scramble` · `gradient-text / path-write` · `gradient-text / split-mask` · `typewriter / odometer` · `typewriter / scramble-line` · `text-reveal / line-mask` · `text-reveal / svg-draw` · `floating-navbar / magnetic-pill` · `input / path-underline` · `input / liquid-focus` · `tabs / scramble-label` · `accordion / path-plus` · `accordion / kinetic-faq` · `tooltip / scramble-tip` · `tooltip / magnetic-tag` · `toast / spring-stack` · `toast / path-check` · `toast / odometer-count` · `badge / scramble-live` · `badge / path-ribbon` · `pricing / odometer-price` · `pricing / morph-toggle` · `testimonials / wall-parallax` · `testimonials / scramble-pull` · `footer / grain-night` · `footer / path-sitemap` · `leaderboard / live-odometer` · `case-study / scroll-film` · `case-study / shared-morph` · `case-study / path-index` · `services / path-checklist` · `process / path-rail` · `team / film-portraits` · `contact / liquid-form` · `contact / magnetic-branches` · `contact / path-directions` · `cta-band / scramble-cta` · `chapters / parallax-index` · `chapters / path-folio` · `logo-cloud / magnetic-marks` · `logo-cloud / stamp-lockups` · `app-shell / morph-sidebar` · `kpi / odometer-spark` · `kpi / ring-draw` · `kpi / spark-delta` · `data-table / row-stagger` · `data-table / morph-cards` · `data-table / heat-cells` · `data-table / odometer-cells` · `kanban-board / peel-cards` · `chart-block / path-draw` · `activity / stagger-feed` · `activity / path-rail` · `activity / live-odometer` · `command-palette / scramble-search` · `command-palette / morph-results` · `settings-panel / morph-sections` · `settings-panel / path-security` · `kit / pin-sports` · `kit / scramble-academy` · `loader / odometer-pct` · `loader / scramble-hold` · `loader / prism-bar`

Fail count: 15 lies + 17 contract holes + 34 farms + 67 filler = **133**.

---

## What closed since round 7

- Canvas `requestAnimationFrame` no longer spins at `u_play=0`.
- `OrbitRing` counter-rotates labels and honors pause / off-screen / reduced.
- Destock: orbit / tilt are no longer the default gold wrapper.
- `ScrollPin` reduced-motion collapse (420vh → sticky panel at progress 1) is in source.
- Unique primitives exist and several are name-true.
- 3D stays lazy. Button copy does not statically import WebGL (`wow-lazy.tsx`).

## What I will not sign

- Pin-scroll as a four-chapter product story.
- The loader family as pauseable waiting constructions.
- Polaroid, zipper, lens, Morse-as-code, flip-3d, otp-flip, height-morph.
- Any gold cell that is a shader or particle field under a caption.
- 60fps. The proof is 25fps and one pin that dies in its gallery well.

I keep 66. I fail 133. **CONDITIONAL.** Do not merge until pin-scroll and the loader default survive this same lens on a clip that actually shows the motion.
