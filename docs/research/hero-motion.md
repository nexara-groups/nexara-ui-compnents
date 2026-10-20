# Hero family — motion thesis

Motion designer. Family ids are the eleven jobs in [`docs/families/hero.md`](../families/hero.md). Helio cinematic / orbital / kinetic are the quality floor, not the paste.

One unexpected idea per variant. Springs, not ease-in-out soup. Reduced-motion shows the **end state**. Native scroll stays native.

Band: **4 BASIC** (0–1 spring) · **4 INTERMEDIATE** (pointer / hover / local scroll) · **3 ADVANCED** (scroll-linked **or** WebGL **or** physics — never two in one file).

```
spring.ui     { stiffness: 380, damping: 32, mass: 0.78 }
spring.heavy  { stiffness: 170, damping: 26, mass: 1.05 }
spring.snap   { stiffness: 520, damping: 38, mass: 0.6 }
```

`ease.enter / exit / hold` stay on the Helio landing. `ease-in-out` is banned by name.

---

## Laws

1. **One clause.** If the still needs “and” to explain the motion, cut until it doesn’t.
2. **Type + primary CTA are opacity 1 at frame 0.** Helio cinematic failed this (black disc, buttons gated at scroll 0.55–0.82). The object moves. The way through does not.
3. **Stagger is garnish, never the idea.** 40–70ms, ≤9 items, IO once, never re-hide on the way up. BASIC may use **zero**. I will not sign a family whose personality is a cascade.
4. **Reduced = end state.** Not a slower spring. Iris open. Glyphs settled. Canvas unmounted. Count at N. Poster un-Ken-Burns’d.
5. **Content is in the DOM.** Animate appearance, never mount. Crawlers see the section.
6. **Magnetic ≤ 10px**, mouse only, reduced off. Lean, don’t chase.
7. **Lenis is not a Hero dependency.** Helio landing may opt in. A paste of `hero.tsx` uses native overflow. ([21st.dev, 21 Aug 2026](https://21st.dev/blog/smooth-scroll-react) — Arunachalam expansion and Container Scroll both work without a smooth-scroll library.)
8. **Do not hijack the wheel.** Scroll expansion is the most-bookmarked hero on 21st **and** the pattern that breaks trackpads when someone intercepts `wheel` and lerps the page. ([21st.dev, 19 Aug 2026](https://21st.dev/blog/react-hero-section-examples)) We are allowed **one** scroll-linked seat (`iris` + `progress="scroll"`, opt-in). We are not allowed Lenis, `preventDefault` on `wheel`, or 320vh as the default.

---

## Against the catalogue default

**Aurora / mesh is not motion.** It is `aurora-background`. Compose it *around* `<Hero>`. A hero whose idea is drifting blobs is a headline on wallpaper. 21st lists 155 public “background” components for a reason.

**Infinite staggers are not motion.** They are a loading state that never finishes. `proof` is a static rail. `Marquee` already exists. If Visual puts a ticker in the hero, I cut it.

**WebGL that is a candy sphere is not an instrument.** Helio orbital already ate this: a readable brass gem, and the critic still called it a teaching model next to the photograph. Kit `orbit` ships a **plate + required still**. The reuser’s `scene` answers the pointer. We do not ship an icosahedron, an HDRI mall, or a full-viewport portal.

**Lenis required for the component to work is a failed paste.** Smooth-scroll libraries replace native scrolling with a transformed page. Wheel, Page Down, find-in-page, sticky, and `scrollIntoView` become your problem. Art direction already says Lenis is landing-only.

---

## Table

| # | Variant | Band | The idea (one) | Mechanic | Spring | Reduced-motion end state | Forbidden |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `split` | BASIC | The proof plate **seats**. | One overshoot on `media` when the section is in view. Copy is already there. | `heavy` ×1 | Plate seated. Title + CTA hittable. | Eyebrow→title→lede cascade, mesh in the well, traffic-light chrome as motion |
| 2 | `stack` | BASIC | **Nothing moves.** | Zero springs. Fastest paste. Magnetic on CTAs is garnish (≤10px), not a variant idea. | — | Identical to motion. | Inventing a stagger so it “feels like a kit”, Ken Burns on the capped media |
| 3 | `capture` | BASIC | The control **becomes** the confirmation. | Idle is static. `status="success"` morphs the field row with one snap. | `snap` ×1 | Confirmation already swapped. Field gone. Title stays. | Avatar cascade, confetti, typewriter in the input, looping count |
| 4 | `video` | BASIC | Play **presses** like a shutter. | Poster is still. The control is a `<button>` with `snap` on press. Dialog/href does the rest. | `snap` ×1 | Poster + play. Button works. | Scroll expansion (that is `iris`), autoplay file, Ken Burns, shader on the poster |
| 5 | `frame` | INTERMEDIATE | The product plate **leans**. | Contained pointer, ≤10px / few degrees. The UI is a physical crop, not a parallax page. | `ui` | Plate square. No lean. | Page pin, fake sidebar stagger, spotlight-card clone as the whole idea |
| 6 | `proof` | INTERMEDIATE | One mark **takes the light**. | Hover/focus a logo: that mark springs bright, neighbours hold. Rail does not move. | `ui` | All marks at rest, full opacity. Quote static. | Marquee, ticker, infinite loop, logo stagger-in |
| 7 | `stage` | INTERMEDIATE | A swatch is a **gel**. | Option hover/focus: stage fill springs, object recedes 4px and seats. Instant swap if reduced. | `ui` | Selected finish already on the object. | 3D SKU orbit, candy sphere, rainbow metallic |
| 8 | `cover` | INTERMEDIATE | The cover **yaws in a rack**. | Contained pointer `rotateX ≤ 8°` / `rotateY ≤ 6°` (shallow — deep CSS 3D is carnival). Type-only cover: the rule seats instead (`snap`), still one idea. | `heavy` or `snap` | Cover square-on, or rule down. Index readable. | Page-flip WebGL, 8xl that shoves the CTA, word-by-word title |
| 9 | `iris` | ADVANCED · **scroll-linked** (opt-in) | The **hole**. | Default: one-shot open (`control` / IO) with `heavy` on clip radius. Title + CTA already hittable while the hole is shy. Opt-in `progress="scroll"`: native progress, sticky, **≤ 180vh**, compositor clip. **No wheel `preventDefault`. No Lenis.** | `heavy` | `circle(78%)` or fully open. Host = one viewport. No blade spin. CTA opacity 1. | 320vh default, CTA fade, kinetic letters in the hole, WebGL in the hole, Lenis |
| 10 | `orbit` | ADVANCED · **WebGL** | The object **answers the pointer**. | Lazy `scene`. Required `fallback` still. Aim / pulse. Canvas clipped to the plate. | damp in-frame; `ui` on the plate | Still only. Canvas unmounted. Modes are radios. | Icosahedron-as-product, HDRI, `position: fixed`, loop offscreen, missing `preserveDrawingBuffer`, importing R3F from BASIC |
| 11 | `kinetic` | ADVANCED · **physics** | Glyphs have **mass**. | Lockable letters are buttons. Incoming tilt `snap`, unlock settles `heavy`. CTA row required and still. | `snap` + `heavy` | Static typeset. Lock = selected style, no lift. CTA visible. | Scroll shear as a second idea, iris blades, WebGL glyphs, missing actions, “THE NIGHT / KEEPS SIGNAL” |

BASIC lives in `hero.tsx` and must tree-shake to zero WebGL, zero scroll timeline, zero Lenis. INTERMEDIATE may use `useContainedPointer`. ADVANCED splits files as UX specified (`hero-iris.tsx`, `hero-orbit.tsx`, `hero-kinetic.tsx`) so a `split` paste does not pay for clip, Three, or per-glyph listeners.

---

## Per variant

### BASIC 1 — `split` · the plate seats

Default paste. The unexpected thing is the **media**, not the sentence. On IO (once), the plate overshoots ~8px and seats with `spring.heavy`. Eyebrow, title, lede, actions are painted at frame 0. Reduced: skip the spring.

If Visual puts a mesh in the well, that is a wrapped `AuroraBackground`, not this variant.

### BASIC 2 — `stack` · refusal

Most reusers paste this. Motion’s job is to **not decorate it**. Zero springs. A stagger here is how kits all look the same. Capped media below, if any, does not drift.

### BASIC 3 — `capture` · control morphs

Idle is a form. Success is the idea: the field row snaps into a confirmation node (`spring.snap`). Avatars in `socialProof` are a still. The count does not tick. Reduced: confirmation is just a swap.

### BASIC 4 — `video` · shutter, not a cinema page

UX put this in BASIC. I agree. Play is a button with a press spring. Expansion-on-scroll would make this a second iris and would hijack the most-broken 21st pattern onto a poster. **No.** Dialog or href. Reduced: poster, play works.

### INTERMEDIATE 5 — `frame` · the crop leans

Linear-style: the product UI is the argument. Contained pointer leans the plate. Not window-scroll parallax. Not a pinned laptop that rotates for four viewports (Aceternity Container Scroll is a different block). Reduced: square.

Local scroll is allowed **inside** the plate if the reuser’s UI scrolls — spring clamp on overscroll, page untouched. That is “local scroll”, not hijack.

### INTERMEDIATE 6 — `proof` · one mark takes the light

Stripe’s rail is a rule, not a marquee. Hover/focus a mark: `spring.ui` on that mark’s brightness. Neighbours stay. No loop. Empty logos omit the rail. Reduced: rest state.

### INTERMEDIATE 7 — `stage` · gel

Option change is a 4px recede + seat, fill springs to the swatch. The object does not orbit. WebGL turntable is `orbit`, a different job. Reduced: instant swap.

### INTERMEDIATE 8 — `cover` · rack yaw

Type is the object; if there is a cover plate it yaws like a magazine in a rack, shallow, art-direction caps. No plate → the index rule seats (`snap`). Pick one per instance. Reduced: square / rule down.

### ADVANCED 9 — `iris` · the hole, camera optional

This is the 21st.dev most-saved *shape* (scroll as the transition into the page) done as an **aperture**, with Helio round-1’s bug deleted: the way through is never gated.

**Default (`progress="control"` / IO):** one viewport. Hole opens with `spring.heavy` on clip radius. Title + CTA opacity 1 while the hole is still shy. Chapters, if any, are buttons with `aria-current`.

**Opt-in (`progress="scroll"`):** native `useScroll` on the host **or** CSS `animation-timeline`. Sticky child `100svh`. Track **≤ 180vh** (one extra screen, not Helio’s 320vh). Compositor `clip-path`. Damp with `spring.heavy` if the scrub stairs — do **not** install Lenis to “make it cinematic”. Test: Mac trackpad, discrete wheel, Page Down, Space, Cmd-F. If any feel stolen, it is not done.

Reduced: open plate, no track tax, no blade spin.

I will not sign 320vh as the catalogue default. I will not sign deleting `progress="scroll"` because hijacked copies exist — see fights.

### ADVANCED 10 — `orbit` · pointer has consequences

WebGL is optional. The still is not. Bruno Simon is the floor for “the pointer does something”. The kit does not ship Helio crystal geometry.

FE already has lazy import, in-view pause, `dpr` clamp, clipped plate. Two holes in [`docs/flagship/hero-family-api.md`](../flagship/hero-family-api.md):

1. **`preserveDrawingBuffer` is missing.** Helio round 2: headless Chrome painted the fallback still, not the beam, until this flag was on. Round 3 signed because the grab sampled brass, not empty clear. Catalogue thumbs and `data-nexara-webgl="ready"` proofs need the last frame to *exist*.
2. **`frameloop: 'never'` when inactive drops the last frame** unless the buffer is preserved. Use `'demand'` offscreen (R3F still paints on `invalidate()`, e.g. a pulse) and `'always'` only while `inView && !hidden && !reduced`.

If FE will not preserve the buffer and will not pause offscreen, **`orbit` loses its canvas**. Still-only plate. That is an acceptable family. A looping sphere that cannot be screenshotted is not.

### ADVANCED 11 — `kinetic` · mass, not a second scroll toy

Lock is the idea. Letters are buttons when `lockable`. Unlock settles with `heavy`. The CTA row does not shear, fade, or wait.

**Scroll shear is a second idea.** Helio kinetic had lock *and* shear. Flagship can. The kit default is lock/mass only. `shear` may exist as an opt-in boolean, off by default, and it must disable under reduced motion. I will not sign shear-as-the-thumbnail.

No Rapier. Springs *are* the physics.

---

## Fights

### Visual — if they demand three ideas in one hero

I will not sign mesh + hole + sphere, or iris blades behind kinetic type with a beam in the well. That is a demo reel. 21st bookmarks **one** trick. Helio art direction already says each piece owns one idea and refuses a second. UX kill list already says do not add a “mega” that composes iris + orbit + kinetic. I am the second vote on that veto.

Specific cuts:

- Aurora / grain-as-identity / violet wash inside any of the eleven. Tokens, not a second atmosphere system. `--color-iris` is a purple leftover; iris is an aperture.
- Title stagger stacked on the object motion. Type is frame 0.
- `stage` gel *and* a 3D turntable. Turntable is `orbit`.
- `video` shutter *and* scroll expansion. Expansion is `iris`.
- `proof` rail that also marquee-scrolls. That is `Marquee`.
- Helio stills, HelioMark, “Fig 0.1”, brass ring in a glyph, as the library default.
- A first frame that is unreadable until motion plays. Design the end state as a poster. Motion is what happens when someone stays.

If Visual reverse-orders the list so iris / orbit / kinetic are the first three thumbs, they have shipped a trailer without a product. BASIC four are the paste. I will not decorate `stack` to make the trailer feel less lonely.

### UX — if they ban all scroll-linked work

Read their fight #2 at me: “Default iris is one viewport, opened by a control. Scroll-as-camera is opt-in.” **I agree with the default.** I do not agree with deleting the opt-in, and I will push if “Motion will want scroll to be the product” turns into “no `useScroll` anywhere.”

Scroll-linked is not scroll-hijacked.

| | Hijack | Progress |
| --- | --- | --- |
| What | Lenis, fullpage, `preventDefault` on `wheel` | `useScroll` / CSS `animation-timeline`, sticky ≤ 180vh |
| Trackpad | Broken | Native |
| 21st.dev 2026 | Why expansion is also the most-broken | Why expansion is the most-bookmarked |
| This family | Banned | **One seat:** `iris` + `progress="scroll"` |

Banning progress because hijack is popular is how a kit ships eleven static posters and then loses the bookmark to Arunachalam’s repo. The levers UX already wrote — pin budget, control-first default, reduced = open, CTA never gated — *are* the fix. Keep them. Keep the opt-in.

Also: inner-plate scroll on `frame` is not page scroll. Do not classify a product UI’s overflow as hijack.

BASIC stays scroll-free. That part of the UX brief is correct. I am not putting a timeline in `split`.

### FE — if they will not `preserveDrawingBuffer` / pause offscreen

Then they do not get a canvas.

Helio already proved the failure mode (round 2 empty clear, round 3 brass sample after the flag). Catalogue docs will mount many heroes. A canvas on `always` while the reader is on `capture` is a laptop fan.

Non-negotiable on `orbit`:

1. `gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}`
2. Pause when not in view **and** when `document.hidden` (`always` ↔ `demand`, not `never` without a preserved buffer).
3. Lazy `import()` so `split` paste is Three-free.
4. `dpr={[1, 1.5]}`.
5. Canvas clipped to the plate. No fixed portal.
6. Required still. Reduced unmounts Canvas.

If any of those are “too much”, drop to still-only. Do not ship a candy sphere.

Further FE notes, in their doc’s dialect:

- Do not add Lenis to `hero.tsx` to smooth iris. Damp progress with `spring.heavy`.
- Do not animate `height` / `top` on the hole. Clip and transform.
- Do not put `three` on the main registry item. `HERO_TIER_META` only on `orbit`.
- **Names:** product/UX/research ids are `orbit` not `orbital`, `video` not `cinema`, `split` not `window`. Motion will key off the job brief. Pick one union before implementation; do not make me animate two spellings.
- Kinetic default is lock, not shear. Shear is a second idea; keep it opt-in and off.
- `frameloop: 'never'` plus no `preserveDrawingBuffer` is how thumbs go black. Fix both.

---

## Sign-off

I sign when:

- Eleven rows, one idea each, no twelfth mesh, no mega-compose.
- A 1280 still of each variant reads without playing the motion. `stack`’s still equals its motion.
- `prefers-reduced-motion: reduce` shows those stills, live.
- `iris` default is one viewport, CTA hittable at frame 0. `progress="scroll"` survives trackpad, wheel, Page Down, Space, find-in-page — or it is off.
- `orbit` frame grab is an object with a job, loop is `demand` offscreen, buffer preserved. Or there is no canvas.
- No Hero file imports Lenis or `aurora-background`.
- No variant uses `ease-in-out`.
- `hero.tsx` (BASIC+INTERMEDIATE) does not import R3F.

I do not sign a Lenis wrapper, a sphere, or three ideas in one hole.
