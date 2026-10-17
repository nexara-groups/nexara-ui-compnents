# Round 1 — Interaction / motion

**Critic:** motion designer  
**Subject:** catalogue at `main` @ `2d03f76`, scored in `docs/audit/scores.md`, captured in `docs/audit/before/`. Implementation notes from `src/components/ui/*.tsx`.  
**Brief:** a variant is a different product, not a recolor and not a different hover. Motion is material or it is cut. Reduced-motion is required.

The structural pass already on file swapped “twelve hovers on one pill” for “twelve objects on one hover.” That is the same violation, rotated 90°. Distinct silhouettes do not make twelve interactions.

A parallel visual rewrite is in the working tree (button tokens, magnetic `glow`/`tilt`, aurora `orbit`/`plasma`/`prism`). It is unfinished and not what the screenshots show. Where that rewrite reopens the original crime, it is called out. It is not approved.

## Verdict

Nothing in this set has a finished hover, focus, and press language. The loops that exist are either a single CSS translate wearing twelve costumes, or a scene that forgot to move. I am not signing a structural pass that treats a wax seal and a ticket stub as different magnets.

**APPROVE NONE.**

---

## 1. Illegal: same control, different hover / animation

README: *“each variant is a different design, not a recolor or a different hover.”*  
If the resting anatomy can be swapped and the pointer behavior is identical, the variant is illegal. Object chrome does not pardon that.

### Shared hover, twelve names

| Family | Shared interaction | Illegal siblings |
| --- | --- | --- |
| Magnetic button | One pull: `strength` 18, `proximity` 28, spring `260 / 22 / 0.4`. Whole control translates. No press. | **All twelve:** pill, keycap, bulb, dock, sticker, medal, stamp, badge, shutter, ticket, tag, wax. |
| Flip card | One `rotateY(180)` in 550ms, ease `[0.22, 1, 0.36, 1]`. Default trigger is hover. | **All twelve.** The deleted set (yaw, pitch, hinge, peel, iris…) was one card with a different turn. This set is one turn with a different sticker. Same brief fail. |
| Spotlight card | Pointer wash + `hover:-translate-y-0.5` (2px). | **All twelve.** Fields change; the hover does not. |
| Bento item | Same 2px lift, optional same wash. | **All twelve.** |
| Draggable card | One throw: elastic `0.16`, tilt `7°` from velocity, drag scale `1.02`, snap `420 / 34`. | film, sticker, ticket, polaroid, dossier, receipt, comic, playing, boarding, postcard, glass. **window** is the only legal exception (title-bar handle). |
| Marquee | One `translate3d(-50%)` linear loop. | **All twelve.** Content is the costume. Hazard tape and medals are not different tracks. |
| Typewriter | One type / pause / delete loop (`48 / 1400 / 28` ms). | **All twelve.** Frames change; the ticker does not. `split-flap` does not flap. |
| Hero | None. | Twelve pages of the same static title. Not hover-siblings — motion-absent siblings. Still not twelve products. |
| Text reveal | None. `once`, `amount`, `stagger`, `delay` are dead props. | **All twelve** are type layouts pretending to be a reveal. |
| Gradient text | `animate` and `duration` accepted, unused. `glitch` is three static offsets. | gradient / neon / glitch are one word with a different finish, not a different motion. |

### Shared enter, different axis (still illegal)

Modal **dialog / otp / command / lightbox / wizard / invoice / ticket / auth** are one centered panel. The variant is the initial vector (`y: 24`, `scale: 0.92`, `x: ±20–28`, `y: -16`). Ticket from the left and wizard from the right are animation names, not products. **share** and **action-sheet** are the same bottom sheet (`y: 40%` vs `y: 100%`). **banner** is not a modal.

**drawer**, **action-sheet**, and **command** are the only ones whose travel matches a real anatomy (edge, sheet, palette). That does not make the other nine legal.

### Hover-only siblings the overhaul is putting back

Do not ship these as variants. They are the 2024 set with new names.

- Button **shimmer** and **beam**: same pill, looping sheen vs spinning conic. Illegal. (Audit **border-beam** was already this.)
- Magnetic **glow** and **tilt**: named for the hover. Illegal. `pill` / `glass` / `orb` are the same capsule at three opacities.
- Aurora **plasma** vs **aurora**: two blobs vs three blobs, same keyframes. **orbit** is a rotate. **prism** is a slower rotate. That is the old “drift / vortex / scan” list.

### What *would* be legal

Different **jobs**, not different keyframes:

- A primary that depresses; a link that grows an underline; a split that is two hit targets.
- A magnet that moves a child, not the hit box — and only one of them in the kit.
- A flip that is a study card (click) or a payment card (no hover flip). Not both as “variants” of `rotateY`.
- A drawer from the right, a sheet from the bottom, a dialog that rises 8px. Three components, or three variants whose **resting chrome** already tells you the edge.

---

## 2. Cheap vs Magic UI / Aceternity / Linear

Still frames in `docs/audit/before/` already tell you the motion will be cheap: nothing at rest implies a state (no depressed lip, no reserved type width, no live countdown, no dock magnification). Then the code confirms it.

### Cheap (cut or rebuild)

- **Global 1.5% squash.** Current button `active:scale-[0.985]` is below perception. Carnival **solid** at least used `0.98`. Linear’s press is a 1px drop plus ~2–3% scale, 120ms, and it is **not** applied to links.
- **2px card lift.** Spotlight and bento `hover:-translate-y-0.5`. That is a Tailwind leftover, not a hover.
- **Always-on sheen.** Button beam (4s or 3.6s linear rotate) and shimmer (2.4s) run whether you are looking or not. Magic UI’s beam is a **segment** on the stroke, not a carnival conic, and it is a **prop on one CTA**, not a variant.
- **18px magnet lunge.** The entire `motion.button` translates, so neighbors get covered (the old reviews already widened the demo gap to hide this). Aceternity / Linear move the **label** 6–10px and leave the hit target still. Spring `260 / 22 / 0.4` is slightly underdamped on a light mass; it jitters on a trackpad.
- **Dock that is not a dock.** Navbar `hover:-translate-y-1 hover:scale-110` on each icon, independently. Magic UI Dock scales **neighbors** by pointer distance. Magnetic **dock** is a gradient square that uses the same 18px pull as the wax seal.
- **Radar that does not sweep. Lightning that does not flash. Rain that is a repeating gradient. Split-flap that is typed glyphs in boxes. Event hero that shows `12 / 04 / 18 / 09` forever.** Names that lie about motion are worse than no motion.
- **Aurora curtains.** Three 33%-wide blobs, `translate3d(±8%)`, 18–22s ease-in-out. Aceternity’s aurora is layered, masked, and slow enough to read as weather. This reads as a slider.
- **Starfield / meteors.** Forty `left: (i*37)%` dots and five 112px streaks. Magic UI meteors have a head, a tail, and staggered delay that does not look like a CSS class loop.
- **Flip on hover.** Product sites (Linear, Stripe) do not flip a pricing card when the pointer crosses it. Aceternity’s 3D card is **tilt + glare**, which is a pointer material, not a 180° party trick.
- **Hero and text-reveal with the motion stripped.** README still lists `framer-motion` on both. The entrance the old reviews approved is gone. A hero that does not enter, and a reveal that does not reveal, are not “restrained.” They are empty.
- **Navbar shrink** is `py-2` → `py-1` with **no transition**. Overlay and mega appear with no presence. Linear’s nav tightens width and padding in 200ms. This snaps.
- **Drag scale 1.02 + glow blob.** The throw is the product. The squash and the purple radial are decoration.

### Closest to the bar (still not shippable)

- **Marquee plumbing.** Measured copies, inert duplicates, hover pause bound to the **track**, a real Pause control, reduced-motion freezes to a static row. That is how Magic UI’s marquee is built. The **content** (WET FLOOR, medals, color squircles) is why it still fails.
- **Modal spring.** Overlay 200ms fade, panel `spring 380 / 32`, reduced-motion zeros transform. Direction is right on drawer / sheet / command. Wrong on ticket / wizard.
- **Typewriter timing.** 48ms / 28ms / 1400ms is a decent machine. The caret blink is a step animation, which is correct. Then they skipped reserved width, defaulted `showControls` to off, and put the same machine in a shipping label.
- **Draggable keyboard.** Arrow + Shift×3 + Home, live region, reduced-motion kills tilt and momentum. The physics are one toy; the a11y of the toy is the most adult thing in the kit.
- **Magnetic reduced-motion and mouse-only.** Touch does not fight the spring. That part is correct. The travel is not.

### Material vs decoration (rule of thumb for this kit)

| Motion | Material? | Keep? |
| --- | --- | --- |
| Button press, focus ring, loading spinner | Yes | One shared spec |
| Magnet pull ≤ 8px on the **label** | Yes, if one control | One, not twelve |
| Marquee of real marks, with pause | Yes | One track |
| Modal enter from the edge it lives on | Yes | Three anatomies |
| Flip on **click** for a flashcard | Yes | One |
| Typewriter in a search field or terminal | Yes | Two or three frames |
| Text reveal on scroll, once | Yes | One |
| Hero in-view stagger, once | Yes | One |
| Aurora / mesh drift ≤ 6%, 20–40s | Borderline | One field + still fallback |
| Beam, shimmer, rain, twinkle, dock scale-110, 2px lift, hover-flip, idle float | Decoration | No, unless a single marketing CTA opts in |

---

## 3. Accessibility of motion

`usePrefersReducedMotion` exists and several components use it. The kit still fails a reduced-motion pass, a pause pass, and a focus pass.

### Reduced motion

| Component | What happens | Gap |
| --- | --- | --- |
| Marquee | Static row, no fade mask, controls hidden | Correct |
| Typewriter | First phrase, no caret | Correct, but no reserved width so the swap still shifts layout |
| Magnetic | `x/y = 0` | Correct |
| Aurora | Keyframes omitted | Correct. `pause` is a prop, not a control |
| Flip | `duration: 0` snap | Acceptable. Instant swap is better than a 0ms “flip” that still uses 3D |
| Modal | No transform, overlay 0ms, exit opacity only | Correct |
| Draggable | No tilt, no momentum, instant snap-back | Correct |
| Button | `motion-safe:` on spin, shimmer, beam, active scale | Correct for those. **disabled** still removes the control from the tab order |
| Spotlight / bento | Lift is `motion-safe`. **Wash still fades and tracks** | Fail |
| Navbar dock | `motion-safe` on the cheap scale | Overlay / shrink have no reduced path because they have no motion |
| Text reveal / hero / gradient text | Nothing to reduce | The missing reveal/entrance is not an a11y win |
| Grid mask | Pointer tracking off | Correct |

Default of `usePrefersReducedMotion` is `false` on the server. First paint can animate, then freeze. For aurora / marquee / typewriter that is a flash. Initialize from `matchMedia` only after mount **or** treat unknown as reduced until proven otherwise.

### Pause controls

- **Marquee:** Pause / Play, `aria-pressed`, `aria-controls`. Default on. This is the kit’s only honest looping-motion control.
- **Typewriter:** `showControls` defaults **false**. A looping delete is vestibular noise with no way to stop it unless the consumer opts in. Default it **on** whenever `loop` is true.
- **Aurora:** `pause` prop only. A page-level background that animates forever needs a visible pause or it must die under reduced motion **and** after it is off-screen.
- **Button shimmer / beam:** no pause. `motion-safe` is not a pause.
- **Hero event:** a countdown that does not run is not a pause; it is a lie.

### Focus / hover traps

- **Flip, hover mode:** `onMouseLeave` always sets `flipped` false. A keyboard user who tabs to a link on the back, then moves the mouse, loses the face. Round 2 claimed this was fixed. It is not. Hover must not unflip while focus is inside.
- **Flip default `flipOn="hover"`.** Keyboard path is a separate “Show back” chip. Fine as a fallback; wrong as the primary. Default to **click**.
- **Spotlight wash** is pointer-only. Keyboard focus does nothing. If the wash is the hover, focus must light a static spot (center, or the focused child’s box).
- **Hero search / waitlist** use `outline-none` and no `focus-visible` ring. The most important focus in a hero is invisible.
- **Navbar overlay** traps focus and returns it on Escape. No enter motion, but the focus work is real.
- **Modal** trap, restore, inert root, Escape: real. Close target is 44px. Good.
- **Magnetic** has a ring and no press. Focus looks like hover’s cousin, then nothing happens.
- **Button loading** stays focusable (attribute `disabled` is not set). Label is `invisible`, width holds. That part of the old review still holds. Disabled buttons are still `pointer-events-none` and dropped from the tab order.

---

## 4. Motion spec required for approval

Ship **one** of each interaction. Extra variants must change the **control**, not the tween.

### Shared tokens

```
--motion-press:     120ms cubic-bezier(0.2, 0, 0, 1)
--motion-hover:     160ms cubic-bezier(0.2, 0, 0, 1)
--motion-enter:     420ms cubic-bezier(0.22, 1, 0.36, 1)
--spring-press:     stiffness 540, damping 38, mass 1
--spring-snap:      stiffness 400, damping 36, mass 1
--spring-panel:     stiffness 380, damping 34, mass 1
--spring-magnet:    stiffness 180, damping 22, mass 0.8
```

`prefers-reduced-motion: reduce` → duration 0 on transforms, no loops, no parallax, no tilt. Crossfades ≤ 120ms or instant.

### Button (one press language)

- Rest → hover: **no scale**. Brighten fill 4% or raise hairline. Outline/ghost fill `nx-card` / `nx-soft`. Link: underline `scaleX(0→1)` from the left, 160ms, **also on focus-visible**.
- Press: `scale(0.98)` + `translateY(1px)`, 120ms. **Not** on `link`.
- Loading: spinner only if `motion-safe`; keep width; stay focusable.
- **Stay still:** looping sheen, conic beam, gel highlight pan. If marketing needs a beam, it is a boolean on `solid`, paused off-screen and under reduced motion — **not** a variant.
- Cut as variants: shimmer, beam, glow-outline, pressable-as-game-lip, gradient-as-hover-swap.

### Magnetic (one control)

- Travel **≤ 8px**, applied to the **label / icon**, not the button box.
- Spring `180 / 22 / 0.8`. No overshoot past 1px.
- Press uses the shared button press **after** the pull returns.
- Mouse only. Reduced motion: still. Focus: ring, no pull.
- **One** magnet in the registry. Dock magnification, if wanted, is a **navbar** problem (below), not a button costume.

### Aurora (one field + stills)

- Drift ≤ **6%** translate, scale ≤ **1.04**, 24–40s, opacity breathe ≤ **0.08**.
- Mesh may be **still**. That is a valid product background.
- Radar must rotate the sweep (12–16s linear) or lose the name.
- Lightning must flash (2–3 frames, 80ms, then still for seconds) or lose the name.
- Stars: ≤ 16 points, twinkle opacity 0.4–0.9, period ≥ 4s. No meteor unless it is a separate opt-in.
- Visible **Pause** if anything loops. Off-screen: `animation-play-state: paused`.
- Cut clipart that does not move: mountains, city, clouds, constellation-as-polyline, bolt glyph.

### Marquee (one track)

- Speed in **px/s** (28–40), not a 28s duration that races short rows.
- Pause on hover (mouse only) + Pause button + reduced-motion static.
- Duplicates `inert` + `aria-hidden` (already done — keep).
- Fade mask 8% only when moving.
- Variants are **content types** you would actually ship (logos, quotes, ticker). Not hazard, medals, stubs, filmstrip, tiles.

### Typewriter (two or three frames)

- `min-width` = longest phrase. No reflow.
- 32–40ms / char, delete 24–32ms, pause 1.2–1.8s.
- Caret: `1s step-end`. Hidden under reduced motion.
- `showControls` default **true** when `loop`.
- **split-flap:** each glyph `rotateX(90→0)`, 90ms, stagger 30ms — or drop the name.
- Legal frames: terminal, search, maybe chat. Dispatch / shipping / teletype / redaction are the same ticker.

### Text reveal (one)

- Clip or `translateY(12px)` + opacity, **scroll-linked**, `once`, stagger 40–60ms.
- Character mode wraps.
- Reduced motion: paint the string, no stagger.
- Hook up the dead props or delete them. A reveal that paints at rest is a typography component and must not use this name.

### Hero (one entrance)

- In view, once: title `y: 16 → 0`, opacity, 480ms; lede + actions stagger 40ms.
- Then **stay still**.
- Countdown must tick or be static copy, not fake digits.
- Media hover is the product’s, not a play-glyph pulse.
- Focus rings on the search and waitlist fields.

### Flip (one card, click)

- Default `flipOn="click"`. Hover is opt-in and must ignore `mouseleave` while `focus` is inside.
- 420ms, ease `[0.22, 1, 0.36, 1]`, or spring `260 / 28`.
- Reduced motion: instant face swap, no `preserve-3d`.
- Hidden face stays `inert` / `aria-hidden` (keep).
- Do not ship twelve objects that share this turn.

### Modal (three travels)

| Anatomy | Enter | Distance |
| --- | --- | --- |
| Dialog / otp / auth | Fade + `y: 8` | Not 24, not scale 0.92 |
| Drawer | `x: 100% → 0` from its docked edge | Full width of the panel |
| Sheet / action-sheet | `y: 100% → 0` | Full height of the sheet |
| Command | `y: -8` + fade, from the top third | Not `y: -16` and not a scale |

- Overlay: 180ms fade, no blur > 2px.
- Spring `380 / 34`. Reduced: fade only.
- **Stay still** after open. No idle float. Ticket / wizard / invoice do **not** get their own axis.

### Navbar

- Shrink: padding and max-width, **200ms**, not a 4px snap.
- Overlay: fade 180ms + optional `y: 8`. Focus trap already exists.
- Dock (only if you keep it): neighbor scale `1.06 / 1.14 / 1.22`, `translateY(-4 / -8 / -12)`, spring `300 / 24`, pointer-distance falloff. Reduced: color only.
- Mega: 160ms height/opacity. Escape already required.

### Draggable (one card)

- No `whileDrag` scale. The lift **is** the drag.
- Tilt ≤ **4°**, velocity-driven, spring `280 / 26`.
- Snap `400 / 36`. Elastic ≤ `0.12`.
- Reduced: no tilt, no momentum, snap instant (already close).
- **window** handle stays. The other eleven skins are not motion variants.

### When to stay still

- After a hero or reveal has entered.
- On ghost, outline, and link buttons (no scale).
- On mesh / dusk / grain backgrounds.
- On any illustration that cannot afford real simulation (mountains, city, bolt, medal).
- On touch, for magnets and washes.
- Whenever `prefers-reduced-motion: reduce`.
- Off-screen loops.
- Decorative idle (float, sheen, twinkle) behind body copy.

---

## 5. Scores — only disagreements

Audit axes are visual. I am not re-scoring finish. I am correcting cases where the **motion evidence** makes the published number wrong.

| Variant | Audit Q / D / M | Motion Q / D / M | Why |
| --- | --- | --- | --- |
| text-reveal / editorial | 6 / 6 / 6 | **3 / 3 / 3** | A reveal with no reveal. Dead `stagger` / `once` / `delay`. |
| text-reveal / headline, split, quote, columns | 6 / 6–7 / 6 | **3 / 3 / 3** | Same. Layout is not an entrance. |
| text-reveal / marker, outline | 5 / 5 / 5 | **2 / 2 / 3** | Duplicates of gradient-text, still static. |
| typewriter / split-flap | 6 / 8 / 6 | **4 / 4 / 4** | Vestaboard language, typewriter physics. D is not 8. |
| aurora / radar | 4 / 7 / 4 | **2 / 3 / 2** | A radar that does not sweep is three circles. |
| aurora / lightning | 2 / 6 / 2 | **1 / 2 / 1** | A bolt glyph. Not a scene. |
| aurora / rain | 3 / 5 / 3 | **2 / 2 / 2** | Scrolling stripes. |
| hero / event | 5 / 6 / 5 | **3 / 4 / 3** | Countdown that does not count. |
| flip-card / * | D 5–7 | **D 2** | One `rotateY`. Objects are not distinct interactions. Q/M can stay. |
| magnetic-button / * except pill | D 7–9 | **D 2** | One spring. Pill is the only honest name. |
| spotlight-card / * | D 4–5 | **D 1** | Audit already said field-swapping. From this lens it is one hover. |
| marquee / * | D 5–8 | **D 2** (motion) | One loop. I am not raising Q: plumbing is good, the track is still a costume party. |
| modal / ticket, wizard | D 7 | **D 3** | Same dialog, opposite enter axis. |
| floating-navbar / dock | 5 / 7 / 6 | **4 / 3 / 4** | Per-icon `scale-110` is not dock physics. |
| button / border-beam (captured) | 6 / 8 / 7 | **4 / 2 / 4** | D is not 8. It is a looping conic on the same pill. |
| button / pressable (captured) | 5 / 7 / 4 | Q **6** / D 7 / M 4 | Only honest press in the captured set. Still replace the game-lip. Do not replace it with `scale-[0.985]` on every variant. |
| button / shimmer, beam (working tree; not in the audit table) | — | **4 / 2 / 4** | Illegal animation siblings. Replace. Do not add them to the score sheet as keeps. |

I do **not** raise any audit verdict to keep. Marquee’s engineering and modal’s spring are the least-wrong motion in the kit; they are not 8s.

---

## 6. Component notes (captured set)

**Button.** Carnival rest states (screenshot) are dead on hover except pressable’s lip and border-beam’s loop. That is an over-correction from the old swap/flood/shimmer set: they deleted the hovers instead of designing one. The working-tree rewrite adds a real focus token and then immediately re-illegalizes the set with shimmer/beam.

**Magnetic.** Screenshot is a toy shop. Source comment admits it: *“Twelve objects that share one pull.”* Illegal on arrival. Working-tree `glow` / `tilt` names the crime out loud.

**Aurora.** Screenshot is a row of stills. Half the variants **are** stills (mesh, radar, sunset, clouds, constellation, mountains, city, lightning). Only aurora / starfield / meteors / rain animate, and those four are textbook cheap CSS. No pause control.

**Marquee.** Best reduced-motion and pause story. Worst “variant” story. One loop.

**Hero.** “Move the furniture,” twelve times, no entrance, fake countdown, play glyph that does not take a hover, inputs with no focus ring. Motion-absent.

**Typewriter.** Same ticker, twelve frames. Controls off by default. No width reservation — the line grows as it types. `split-flap` is a lie.

**Text reveal.** Name, props, and README promise Framer; the file paints static type.

**Flip card.** One Y-turn, hover-default, mouseleave unflips through focus. Keyboard chip is the only adult piece.

**Modal.** Only family where enter/exit is sometimes material. Then they invented axes for ticket and wizard so the count would stay at twelve.

**Floating navbar.** Dock hover is a meme. Shrink has no transition. Overlay is a hard cut with a good focus trap.

**Draggable.** One physics body. Window’s handle is the only interaction variant I would allow into a second pass — after the scale/glow decoration comes off.

---

## Approval

**APPROVE NONE.**

Not pill. Not marquee/ticker. Not modal/drawer. Not flashcard. Those are the right *problems*. None of them meet the spec in §4.

Next pass I will approve a variant only if: (1) its rest state is a different product, (2) its hover/focus/press is specified and not a sibling’s tween, (3) reduced motion is a still frame, (4) any loop has a pause. Until then, do not add more names.
