# Round 12 — motion designer

**From:** [Motion critic](https://cursor.com/agents/bc-a9db780d-32ca-5918-ba44-f1e67ada0b89)  
**Subject:** wow signatures at `daee816` on `cursor/visual-quality-overhaul-3ef7` only.  
**Scope:** 47 families, 199 gold cells in `WOW_VARIANTS`. Source: `src/lib/wow.tsx` (`ScrollPin` pins inside `[data-pin-scroller]`), `wow-fx.tsx` (`GooPuddle` / `AreaSpark` / `AnalogClock`), `wow-unique.tsx` (`InfinityPath` lemniscate, `LensHover` magnifies), `wow-core.tsx`, `wow-blocks.tsx`, `wow-app.tsx` (`LoaderWow`), `wow-scene.tsx`, `loader.tsx`. Proof: `docs/audit/wow/round12-motion.webm` (5.00s, **2 fps** VP9, 950×577, 10 frames), `hero-pin-scroll-ch2.png`, `hero-pin-scroll-ch4.png`, `loader-path-infinity.png`.  
**Brief:** motion contract (WCAG 2.2.2 pause, rAF cancel, reduced-motion end state), 60fps, lazy 3D, named mechanic is the motion. Mandatory test: would this sit next to a top 21st.dev / Aceternity / Awwwards entry? Reject generic shimmer / orbit farms.

Round 11 scored `a4c5592` **CONDITIONAL** (66 keep / 133 fail): pin Pause was a named lie, the gallery pin died into a black track, the loader default had no Pause, `GooPuddle` ignored reduced-motion. I score the tree at `daee816` (blocker-close `d9b5912` plus this pin / infinity / proof commit). I do not merge. I do not patch.

## Verdict

**CONDITIONAL. 68 keep / 131 fail.**

The four named round-11 contract crimes are closed in source, and the film finally shows them.

`hero / pin-scroll` now **passes the motion contract**. Pause owns the chapter-2+ reel (`MediaFrame playing={loop.playing}`). Reduced motion collapses the 520vh track and paints chapter 04 with no autoplay. The clip steps 01 → 02 → 03 → 04 on a living plate. `hero-pin-scroll-ch2.png` and `hero-pin-scroll-ch4.png` are those chapters, not a black well. `ScrollPin` pins inside `[data-pin-scroller]`.

The loader family now **passes the motion contract**. Every looping `LoaderWow` variant is gated on `loop.playing`. The family mounts one `LoopPause`. `useLoopControl` parks under reduced-motion. `pulse-halo` (the default) shows Pause in the still and in the clip. That is the hole that failed the family.

`GooPuddle` honors reduced-motion and self-Pauses when the parent does not pass `playing`. `AreaSpark` particles pause. `InfinityPath` is a full lemniscate with a traveling bead. `LensHover` clones and scales the child under a circular clip.

That is not an approve.

The mandatory Awwwards test still fails the catalogue. Pin-scroll is a stock laptop still, a CSS translate / rotate / scale, and swapped serif lines. On chapter 04 the machine eats the headline. I would not put that plate next to an Apple product film or a top Awwwards scrolly. I pass its *contract*. I do not keep the cell.

The loader family is pauseable. It is also a farm of rings, beads, fog, a bouncing drop, falling sand, and a spinning hand. Three constructions would be bookmarked. The other nine would not. Passing 2.2.2 is not the same as being a wait you would screenshot.

Named lies remain (`zipper-tabs`, `otp-flip`, `height-morph`, `kinetic-stack`, `prism-face`, `flip-3d`, `analog-orbit`, `film-mosaic`). `FlipWow` under reduced-motion shows the **front**, not the back. `AnalogClock` Pause does not stop `useLiveRemain`, so the hands keep jumping once a second. `PolaroidFan` *targets* the fan under reduced-motion, then springs into it. Framer loops still run off-screen. The proof clip is 2 frames per second. I will not sign 60fps from a slideshow.

Do not merge as an Awwwards peer. Keep the 68. Pin-scroll and the loader family survive this lens on the contract. They do not survive the standout test.

---

## Contract scorecard

| Check | Status | Evidence |
| --- | --- | --- |
| Pause on infinite ornament (2.2.2) | **Pass (named holes)** | Pin reel, loader family, `GooPuddle`, grain-tape / velocity-tape / video-shader / morph-stage now AND-gate `loop.playing`. Leftover: `AnalogClock` Pause is a label; `useLiveRemain` keeps ticking. |
| rAF cancelled when paused / off-screen | **Pass (canvas)** | `ShaderMesh` / `ParticleField` / `GlobeField` / `MatrixRain` still `if (live) requestAnimationFrame`. `WowScene` is `frameloop={paused ? 'demand' : 'always'}`. |
| rAF / compositing off-screen (Framer) | **Fail** | `RadarSweep`, `TapeReels`, `PendulumCard`, `MetronomeArm`, `HexLattice`, `TopoField`, `PerspectiveFloor`, marquees, `GooPuddle`, `CylinderSpin`, `InfinityPath` keep infinite `animate` while off-screen. Nested pin also `setState`s on every scroll. |
| `prefers-reduced-motion` → end state | **Partial** | `ScrollPin` collapses and renders `children(1)`. Scramble paints the sentence. Count-up snaps. Canvas freezes. `PolaroidFan` *aims* at the fan, then springs. `FlipWow` shows the **front**. `AnalogClock` remaining time, not 0 — that one is honest. |
| Pin-scroll four chapters + visible plate | **Pass contract** | Clip + ch2 / ch4 stills. Nested `[data-pin-scroller]` pin. Pause wired. Not an Awwwards keep. |
| Loader family loops pause | **Pass family** | All twelve share one `LoopPause`. Reduced parks via `useLoopControl`. Default included. Standout still fails most cells. |
| Lazy 3D | **Pass** | `lazy(() => import(wow-scene))`, mounts only when `inView && !reduced`. Only `kit / liquid-portal` uses it. |
| 60fps | **Unproven** | Engines are rAF / R3F `useFrame`. The supplied clip is **2 fps / 10 frames**. Round 11 was 25fps. This is worse proof. |
| Named mechanic is the motion | **Partial** | Infinity, lens, radar, prism, pendulum, tape, barcode, dial, flap are name-true. Lies listed under Fail. |

### rAF (the round-7 hole)

Still closed for the four canvas engines:

```177:181:src/lib/wow.tsx
      const live = !halt && !reduced && inView
      gl.uniform1f(uPlay, live ? 1 : 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (live) frame = requestAnimationFrame(draw)
```

`ParticleField` and `GlobeField` use the same gate. I keep those cells when the field *is* the product. I do not keep a shader under a sentence.

### Pause leftovers (infinite ornament)

| Cell / primitive | Loop | Visible Pause? | What Pause does |
| --- | --- | --- | --- |
| `hero / pin-scroll` | Scroll is user-driven; chapter ≥2 reel | Yes. Clip + stills. | **Stops the reel.** `playing={loop.playing}` on `MediaFrame`. Closed. |
| `loader / *` (all twelve) | Each variant’s `animate` | Yes. Family control. | `animate={loop.playing ? … : undefined}`. Closed. |
| `GooPuddle` sites | Blob loop | Self-Pause when `playing` omitted; parent Pause when passed | Parks blobs. Closed. |
| `countdown / analog-orbit` | `useLiveRemain` 1s + second hand | Yes | **Half.** Framer duration goes to 0. The interval does not. Minute / hour / second styles still update every second. Named lie. |
| Framer ornaments off-screen | rotate / x / opacity infinite | Own Pause, while in view | Pause works. Off-screen they keep compositing. |

### Reduced-motion leftovers

| Surface | Required end state | What happens |
| --- | --- | --- |
| `ScrollPin` | Collapse the extra viewport; last chapter | **Honored.** Early-return `children(1)`, no `height` track. Pin reel off. |
| `FlipWow` | Show the back | **Front.** `useState(false)` then `{flipped ? back : front}`. Click swaps with no 3D. The claimed snap-to-back is a named lie in the self-note. |
| `PolaroidFan` | Already fanned, no spring | Target is the fan (`fan = reduced \|\| open`). Mount still springs (`type: 'spring'`). The still is a stacked deck. |
| `AnalogClock` | Remaining time, still | **Honored for reduced.** Hands use `remain`, not 0. Interval stops when reduced. Pause is the leftover, not reduce. |
| `GooPuddle` | Blobs parked | **Honored.** `on = (playing ?? loop.playing) && !reduced`. |
| `AreaSpark` particles | Frozen marks | **Honored.** |
| `usePrefersReducedMotion` | Correct on first paint | Function-init reads `matchMedia` in the browser. SSR still defaults `false`. Same leftover as rounds 4–11. |

---

## Pin-scroll

`HeroPin` encodes four chapters over `520vh`. Scale, lift, `rotateX`, and `rotateZ` scrub on `p`. Chapter copy is `Math.floor(p * 4)`. Iris grade and the night reel land at chapter 02. Callouts lock at 01+. Actions lock at 03. Reduced motion snaps to chapter 04 and kills the track.

`daee816` is the gallery pin. Sticky `top: 0` dies inside `overflow-y-auto`. The fix is real:

```697:721:src/lib/wow.tsx
    let scroller = node.closest('[data-pin-scroller]') as HTMLElement | null
    // ...
      if (pane && scroller) {
        const start = rect.top - viewTop + scroller.scrollTop
        const pinned = Math.min(Math.max(0, scroller.scrollTop - start), Math.max(0, node.offsetHeight - viewH))
        pane.style.transform = `translateY(${pinned}px)`
      }
```

Gallery pin cells set `data-pin-scroller` and `max-h-[80vh]`. Nested mode uses `position: absolute` + `translateY`. Window mode stays `sticky`.

**Proof.** `round12-motion.webm` is a 5s / 2fps slideshow, not a scrub. It is enough to close the round-11 black-well charge:

1. 01 / 04 — “North Display”, small desk plate, one gold tick, Pause on the plate.  
2. 02 / 04 — “Glass, then the chip”, callouts (nano-etched glass, Harbor chip), two ticks. Matches `hero-pin-scroll-ch2.png`.  
3. 03 / 04 — “Midnight turns iris”, purple grade on the machine, three ticks.  
4. 04 / 04 — title / “Keep scrolling”, four ticks. Matches `hero-pin-scroll-ch4.png`. The laptop has grown through the headline.

The plate never drops into an empty track. Chapters 02–04 exist on film. Pause is visible on every chapter. The clip does **not** click Pause and does **not** show gallery chrome around the well — it is a cropped plate. I accept the nested pin from source + the chapter stills. I do not accept this as a 60fps product film.

It still fails the standout test.

1. The object is a stock device still. The “motion” is CSS 3D on one photograph.  
2. Chapter 04 is a collision, not a lockup. Type and machine occupy the same pixels.  
3. A JS `setState` on every scroll event is not a compositor pin.  
4. It would not stand next to an Apple product film or a top Awwwards scrolly. The self-note already admits this. I agree.

`kit / pin-sports` now also writes four chapters over 420vh and rides the same nested scroller. No reel, so no Pause to lie about. It is the same CSS-on-a-photo story. I fail it as a keep.

**Pin-scroll passes the motion contract. Pin-scroll does not pass the Awwwards keep test.**

---

## Loaders

`loader.tsx` routes every gold id through `WowSignature` → `LoaderWow`. The core `animate-pulse` dot is dead for those twelve. The family owns one `LoopPause`. Every looping construction reads `loop.playing`. Reduced-motion sets `playing` false. `role="status"`.

| Variant | Mechanic | Pause | Reduced | Keep? |
| --- | --- | --- | --- | --- |
| `pulse-halo` | Three scale rings | Yes. Still + clip. | Parks | Fail — generic pulse farm. Default is honest now. Still not a wait I would screenshot. |
| `orbit-beads` | Three beads on a rotate | Yes | Parks at 120° | Fail — leftover orbit. Name is finally true (no longer a stolen `RadarSweep`). |
| `shader-fog` | CSS radial pulse | Yes | Parks | Fail — farm. Honest that it is not `ShaderMesh`. |
| `path-infinity` | Full ∞ + traveling bead | Yes. Still. Parent Pause (`pauseable={false}`). | Bead parks on the figure-8 | **Keep** |
| `odometer-pct` | Finite count-up | n/a | Snaps to 72 | Fail standout |
| `scramble-hold` | Blinking dash | Yes | Parks | Fail — named lie. There is no scramble. |
| `liquid-drop` | One bouncing blob | Yes | Parks | Fail — generic drop |
| `particle-drift` | Falling sand in a glass | Yes | Parks | Fail — generic drift. Honest that it is not `ParticleField`. |
| `flap-wait` | `WAIT` tiles `rotateX` | Yes. Clip mid-flip. | Parks on the letters | **Keep** |
| `analog-sweep` | One spinning hand | Yes | Parks at 12 | Fail — generic sweep. Not `AnalogClock`. |
| `barcode-scan` | Scan bar across ticks | Yes. Still + clip. | Parks | **Keep** |
| `prism-bar` | RGB bars travel the track | Yes | Parks | Fail as a loader — a split sheen, not a wait |

Three keeps. The default now honors 2.2.2. The family copy that says “twelve waiting constructions with pause” is no longer a contract lie. It is still a standout lie. Nine of the twelve would not sit next to a current 21st.dev / Aceternity loader.

**Loaders pass the motion contract as a family. The family does not pass the keep test.**

---

## Unique primitives (named mechanic = motion?)

| Primitive | Claim | What it does | Contract | Verdict |
| --- | --- | --- | --- | --- |
| `InfinityPath` | Full lemniscate + bead | Static ∞ path. Bead `offset-path` / `offsetDistance` 0→100%. | Parent or self Pause. Reduced parks the bead. | **True.** `loader / path-infinity` keep. The still is an ∞, not a stroked S. |
| `LensHover` | Magnifying loupe | Clones the child, `scale(zoom)`, circular clip. | Pointer-only. Reduced hides the loupe. | **True.** `spotlight-card / lens-spec` keep. `tooltip / follow-lens` is the same loupe on three words — mechanic true, cell too thin to keep. |
| `RadarSweep` | Conic sweep | Conic gradient `rotate: 360` over 4.8s. | Pause. Reduced stops. No off-screen halt. | **True.** |
| `PrismSplit` | RGB split | Two `mix-blend-screen` copies offset from the pointer. | Pointer-only. Reduced paints one layer. | **True.** |
| `PolaroidFan` | Fan of prints | Three figures spring to `rotate / x` on hover or reduced. | Reduced *targets* the fan, then springs. Still is a stack. | Mechanic true. Reduced not a snap. Cell **kept** because the name is the hover. |
| `DialGauge` | Needle + arc | Arc `pathLength` and a needle to `value`. | Finite. | **True.** |
| `MetronomeArm` | Arm on a beat | Gold bar `rotate: [-22, 22]` 1.6s. | Pause. Reduced parks. | **True.** |
| `TapeReels` | Two reels | Two dashed circles, different periods. | Pause. Reduced parks. | **True.** |
| `PendulumCard` | Hang and swing | `origin-top` `rotate: [-10, 10]`. | Pause. Reduced parks. | **True.** |
| `ZipperSplit` | Zipper | Two halves translate when `open`. | Reduced duration 0. | **Lie in use.** `tabs / zipper-tabs` hard-codes `open`. The zipper never closes. |
| `AnalogClock` | Remaining time | Hands from `useLiveRemain`. | Reduced parks on remain. Pause does not stop the interval. | Mechanic true. Pause is a lie. |
| `MorseBlink` | Morse | Hardcoded `[1,0,1,0,1,1,1,0,0]`. | Pause. | I keep `badge / morse-live` as a pauseable blink, not as telegraphy. |

---

## Proof clips

**`round12-motion.webm`.** 5.00s, 2 fps, 10 unique frames, 124 KB. First half is pin-scroll 01–04 on a living plate. Second half is loader docs: `pulse-halo` with Pause, `path-infinity` (∞ + bead + Pause), `barcode-scan` (scan line + Pause), `flap-wait` mid-flip + Pause. The clip proves the round-11 black well is gone and the loader default grew a control. It cannot prove 60fps, Pause being used, or a nested gallery scroller with chrome.

**Stills that match the names:** `hero-pin-scroll-ch2` (chapter 02 + Pause), `hero-pin-scroll-ch4` (chapter 04 + Pause + type collision), `loader-path-infinity` (∞ + Pause), `loader-flap-wait`, `loader-barcode-scan`, `loader-pulse-halo` (rings + Pause), `card-lens-spec` (lamp under a loupe). **Stills that do not:** `testimonials-polaroid-quotes` (stack, not a fan).

---

## Keep (68)

A keep is a gold cell whose named mechanic is the motion, that honors pause / reduced when it loops, and that I would screenshot next to a current 21st.dev / Aceternity / Awwwards entry. Honest path-draw stamps and scramble-as-costume are not keeps. Passing 2.2.2 is not enough.

Round-11’s 66, plus two closed named lies:

- `hero / shader-void` · `hero / scramble-mast`
- `button / liquid` · `button / ink-path` · `button / glare` · `button / burst` · `button / scramble`
- `magnetic-button / gravity-well` · `magnetic-button / comet-trail` · `magnetic-button / ink-wake` · `magnetic-button / shatter`
- `draggable-card / physics-deck` · `draggable-card / prism-plate` · `draggable-card / particle-toss`
- `spotlight-card / glare-tilt` · **`spotlight-card / lens-spec`**
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
- **`testimonials / polaroid-quotes`**
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

`lens-spec` is a keep because the loupe now magnifies a lamp on stone. `polaroid-quotes` is a keep because the fan is the hover and reduced at least *aims* at that pose. I do not keep `hero / pin-scroll`. Contract ≠ keep.

---

## Fail (131)

Grouped by why. Some cells fail more than one test; they appear once.

### Named lies (the motion is not the name)

`tabs / zipper-tabs` · `input / otp-flip` · `accordion / height-morph` · `text-reveal / kinetic-stack` · `flip-card / prism-face` · `bento-grid / depth-mosaic` · `countdown / flip-3d` · `countdown / analog-orbit` · `stats / film-mosaic` · `cta-band / liquid-wash` (shader, not liquid) · `logo-cloud / orbit-3d` (globe, not an orbit of marks) · `kanban-board / spring-toss` (peel stack, no toss) · `testimonials / video-shader` (reel, no shader) · `app-shell / shader-desk` (photograph, no mesh) · `app-shell / liquid-rail` (photograph, no liquid) · `loader / scramble-hold` (blinking dash)

### Contract leftovers (pause / reduced still wrong)

`countdown / analog-orbit` is already in the lie list (Pause does not freeze remain). `flip-card / liquid-flip` · `flip-card / prism-face` · `flip-card / path-reveal` inherit `FlipWow`’s reduced-front. I do not double-count `morph-face` — the flip is real; the claimed snap-to-back is not. No extra cell is added here that is not already failed below.

### Shader / particle / orbit / goo / beam farms (would not sit next to Awwwards)

`spotlight-card / shader-well` · `bento-grid / shader-tile` · `hero / globe-orbit` · `hero / pin-scroll` · `hero / morph-stage` · `floating-navbar / glass-liquid` · `modal / shader-veil` · `modal / particle-confirm` · `modal / liquid-sheet` · `accordion / shader-row` · `tooltip / particle-hint` · `avatar / shader-ring` · `avatar / particle-presence` · `avatar / holographic` · `pricing / shader-featured` · `stats / particle-pulse` · `countdown / shader-rings` · `leaderboard / particle-rank` · `services / shader-cards` · `team / particle-grid` · `team / holographic` · `contact / map-shader` · `cta-band / particle-close` · `cta-band / beam-band` · `news / shader-magazine` · `logo-cloud / particle-press` · `kpi / particle-live` · `kanban-board / particle-lane` · `chart-block / shader-donut` · `chart-block / particle-area` · `command-palette / particle-jump` · `flip-card / liquid-flip` · `tabs / liquid-ink` · `badge / liquid-pill` · `toast / liquid-slide` · `activity / liquid-chat` · `settings-panel / liquid-toggle` · `marquee / grain-tape` · `marquee / velocity-scroll` · `news / velocity-tape` · `grid-background / topo-pulse` · `grid-background / hex-lattice` · `loader / pulse-halo` · `loader / orbit-beads` · `loader / shader-fog` · `loader / liquid-drop` · `loader / particle-drift` · `loader / analog-sweep`

`hero / pin-scroll` sits in this farm list as a CSS product-tween, not as a contract fail. The reel now pauses. The plate is still a stock still on a scale.

### Honest but not a signature (finite path / scramble / odometer / static chrome)

`draggable-card / magnetic-stack` · `spotlight-card / scramble-stat` · `tooltip / follow-lens` · `flip-card / path-reveal` · `bento-grid / ticker-tile` · `gradient-text / scramble` · `gradient-text / path-write` · `gradient-text / split-mask` · `typewriter / odometer` · `typewriter / scramble-line` · `text-reveal / line-mask` · `text-reveal / svg-draw` · `floating-navbar / magnetic-pill` · `input / path-underline` · `input / liquid-focus` · `tabs / scramble-label` · `accordion / path-plus` · `accordion / kinetic-faq` · `tooltip / scramble-tip` · `tooltip / magnetic-tag` · `toast / spring-stack` · `toast / path-check` · `toast / odometer-count` · `badge / scramble-live` · `badge / path-ribbon` · `pricing / odometer-price` · `pricing / morph-toggle` · `testimonials / wall-parallax` · `testimonials / scramble-pull` · `footer / grain-night` · `footer / path-sitemap` · `leaderboard / live-odometer` · `case-study / scroll-film` · `case-study / shared-morph` · `case-study / path-index` · `services / path-checklist` · `process / path-rail` · `team / film-portraits` · `contact / liquid-form` · `contact / magnetic-branches` · `contact / path-directions` · `cta-band / scramble-cta` · `chapters / parallax-index` · `chapters / path-folio` · `logo-cloud / magnetic-marks` · `logo-cloud / stamp-lockups` · `app-shell / morph-sidebar` · `kpi / odometer-spark` · `kpi / ring-draw` · `kpi / spark-delta` · `data-table / row-stagger` · `data-table / morph-cards` · `data-table / heat-cells` · `data-table / odometer-cells` · `kanban-board / peel-cards` · `chart-block / path-draw` · `activity / stagger-feed` · `activity / path-rail` · `activity / live-odometer` · `command-palette / scramble-search` · `command-palette / morph-results` · `settings-panel / morph-sections` · `settings-panel / path-security` · `kit / pin-sports` · `kit / scramble-academy` · `loader / odometer-pct` · `loader / prism-bar`

Fail count: 16 lies + 48 farms (including pin-scroll and the newly pauseable goo / loader loops) + 67 filler = **131**.

---

## What closed since round 11

- Pin Pause is no longer a dead control. The reel honors it. Reduced-motion drops the reel.  
- Nested gallery pin: `[data-pin-scroller]` + `translateY`. Chapters 02–04 stay on a plate. The black well is gone.  
- Loader family Pause + reduced-motion, including the default.  
- `GooPuddle` reduced + self-Pause. `AreaSpark` particles pause.  
- `AnalogClock` reduced uses remaining time, not 0.  
- `InfinityPath` is a lemniscate. `LensHover` magnifies.  
- `loader / orbit-beads` is beads, not a stolen radar.

## What I will not sign

- Pin-scroll as an Awwwards / Apple product film. Contract yes. Keep no.  
- The loader family as twelve bookmarkable waits. Contract yes. Three keeps.  
- `FlipWow` reduced-to-back. Source shows the front.  
- `AnalogClock` Pause. The interval ignores it.  
- Polaroid as a snapped fan. Target is fan; mount still springs; still is a stack.  
- Zipper, OTP-flip, height-morph, kinetic-stack, prism-face, flip-3d, analog-orbit, film-mosaic.  
- Any gold cell that is a shader or particle field under a caption.  
- 60fps. The proof is 2fps.

I keep 68. I fail 131. **CONDITIONAL.** Pin-scroll and the loader family pass the motion contract. They do not pass the standout test. Do not merge until the cells I would actually screenshot include the hero pin and the loader default.
