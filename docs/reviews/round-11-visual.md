# Round 11 — visual

**From:** [Visual critic](https://cursor.com/agents/bc-dfe8a454-bcdb-5c49-8cb3-d07b24997f6f)  
**Commit scored:** `a4c5592` on `cursor/visual-quality-overhaul-3ef7` (`feat: destock orbit reuse, add loader family, deepen pin-scroll`).  
**Evidence:** `docs/audit/wow/` stills (hero-pin-scroll, loader-*, app-radar-jump, card-lens-spec, testimonials-polaroid-quotes, kit-pin-sports, pricing-prism-price, nav-compass, stats-dial-gauge, kanban-wip-pendulum, plus the shader / button / kit set); source in `src/lib/wow-unique.tsx`, `src/lib/wow.tsx`, `src/components/ui/wow-core.tsx`, `wow-blocks.tsx`, `wow-app.tsx`, `kit.tsx`; live docs on `127.0.0.1:5173` for `#hero` (pin-scroll / shader-void / scramble-mast / globe-orbit / morph-stage), `#loader`, `#app-shell` (radar-jump), `#testimonials` (polaroid-quotes), `#pricing` (prism-price), plus lens-spec, kit pin-sports / shader-clinic / globe-agency, dial, pendulum, compass, zipper, barcode, metronome, constellation, stamp, tape-reels, beam, fold-profile.  
**Bar:** composition, typography, material, product content, screenshot-worthiness. Reject generic SaaS chrome and a reused orbit / tilt / shader-fog farm.  
**Mandatory test:** would a designer screenshot this next to a top 21st.dev, Aceternity UI, or Awwwards / Godly / Lapa entry?

A keep is a cell I would actually put beside those references. Uniqueness of the *name* does not count. I am not bound by `docs/reviews/round-11-self.md`.

---

## Verdict

**REJECT ALL**

199 gold cells. Keep 0. Fail 199. The standout test fails.

Round 7 rejected `22635c5` for morph-stage, orbit-nav, orbit-quotes, pin-sports, glare-tilt, liquid-sheet, orbit-pull, tilt-glare. This pass destocked most OrbitRing / TiltGlare wrappers and shipped a named-mechanic list (lens, prism, peel, zipper, radar, Morse, polaroid, barcode, dial, fold, stamp, metronome, constellation, film, tape, pendulum, beam), a 12-variant loader, a four-chapter pin-scroll, and deeper app-kit copy. That is a catalogue rewrite on paper. On screen it is the same night plate (`#07070c`, gold tracked kicker, Instrument Serif, white stadium CTA, Pause pill) with a different clip-art trick glued on.

The owner said the library was clean but not memorable. This pass is memorable the way a sticker sheet is memorable. I would not screenshot any gold cell beside Aceternity or Awwwards.

---

## Standout test

**Fail.** Most gold cells fail it. The test is not “does a unique function exist.” It is “would a designer steal this frame.” I opened the live gallery next to that bar. Shader-void is a competent iris/teal FBM fog — the same field as aurora-shader-mesh, modal-shader-veil, nav-glass-liquid, cta-liquid-wash, kit-shader-clinic, loader-shader-fog, and app-shader-desk. Pin-scroll is a stock laptop desk at rest and a black well once you scroll the gallery cell. Polaroid is a generated bust on a white card. Prism-price is three SaaS plan cards with no chroma. Pulse-halo is a gold ring. Radar-jump is a sonar doodle beside a list. I would not post any of them next to a top 21st.dev / Aceternity / Awwwards / Godly / Lapa entry.

---

## Keep

None.

I will not launder the round 4–6 cinematic kits through a wow mast. `kit / shader-clinic` and `kit / globe-agency` still look like furnished landings *below* the signature strip because `Kit` re-mounts the already-approved healthcare / agency pages. The gold cell is the strip: a fog mast, or a Fibonacci globe plus “Move the furniture.” That strip is the farm. I am not approving the leftover page as a new signature.

Nearest, still not a keep:

- `hero / shader-void` — real WebGL, grain, one sentence. Also the house costume. Copy is “A WebGL mesh that follows the pointer.”
- `hero / scramble-mast` — type on a void. Empty right two-thirds. No custom lettering.
- `footer / giant-marquee` — the word NEXARA, large. Every agency closer since 2019.
- `kit / pin-sports` — the skater still is expensive. The component is a caption on that still.

I would not screenshot those four either. They are listed so the next pass does not pretend I missed the only frames with craft.

---

## Eight worst

These are the cells I would hide first. They define the pass.

1. **`hero / pin-scroll`** — Headline of the four-chapter story. Rest frame is a generated laptop + cup, gold “SCROLL THE PLATE,” “A plate, not a banner,” and a postage-stamp media card on the keyboard. Live, scrolling the gallery scroller past chapter 01 paints a black rounded well. Specs, night material, and lockup do not appear as a designed sequence. Phone and tablet crops are the same poster. This is not an Apple product page. It is a stock desk with a progress tick.

2. **`spotlight-card / lens-spec`** — Sold as a shop spec under a loupe. Ships as a dark type card: “Lamp 04 / Travertine · $220 / Move the loupe over the spec.” No lamp. No glass. `LensHover` is a 28px circle with `backdropFilter: none` and no magnified clone. Hover on the live cell does not change the frame. Round 7’s glare-tilt at least had a product still in source; this “unique” replacement is emptier.

3. **`pricing / prism-price`** — Hobby / Studio / Desk. `$0 / $48 / $110`. Three identical rounded cards. The RGB split is a pointer offset on the middle number and is invisible at rest and on hover in the gallery. This is the 2023 Stripe clone the bar told us to reject.

4. **`loader / pulse-halo`** — Lead cell of the new family. A hairline gold ring and “Loading Harbor.” Twelve variants share one night stadium and that caption. A loader family that cannot survive a screenshot is not a family.

5. **`app-shell / radar-jump`** — Gold JUMP, “Find a room.”, three verbs, concentric circles, a purple wedge, Pause sitting on the dish. A command list taped to a sonar clip-art. Not a shell.

6. **`kanban-board / wip-pendulum`** — A frosted card (`WIP 2/3`) hanging from a 1px thread, swinging ±10°. There is no board. Destocking orbit-wip and replacing it with a novelty pendulum is the same crime with a new name.

7. **`marquee / tape-reels`** — Two dashed gold circles and a mono partner string. The unique mechanic is `border-dashed` + `rotate: 360`.

8. **`process / metronome-steps`** — A gold stick and the words Brief / Build / Review / Handover. That is the entire object.

Honorable mentions that lost the cut: `flip-card / morph-face` (“Face A / Tap to turn”), `team / constellation-crew` (four dots; the lines miss the nodes), `services / stamp-crews` (four red-outline pills), `floating-navbar / compass-nav` (glass pill + gold needle), `hero / morph-stage` (split type + Harbor lamp still; copy still says the wordmark becomes a mesh).

---

## Fail list

Reasons are visual. If a cell is a named trick on the house plate, it fails even when the trick is unique.

### Heroes

| Cell | Why |
| --- | --- |
| `pin-scroll` | Stock laptop poster; gallery scroll goes black; chapter story is not a composition. |
| `shader-void` | Soft iris/teal fog + gold kicker + white pill. Aceternity aurora cousin. Meta lede. |
| `scramble-mast` | HOLD THE MAST on a void. No second material. |
| `globe-orbit` | Magic UI globe. OrbitRing still on it. Labels cluster and collide (Kite / Solum / Nimbus / Vale / Orbit). |
| `morph-stage` | Split SaaS hero. Cinema still on the right, “Open the stage” on the left. Shared-element claim is a layoutId around a photo, not a wordmark-to-mesh. |

### Buttons / magnets

| Cell | Why |
| --- | --- |
| `button / liquid` | Goo blobs leak past the capsule. Purple + teal dumbbell on “Continue.” |
| `button / ink-path` | A word and a scribble underline. |
| `button / glare` | Grey stadium. TiltGlare leftover. No specular in the still. |
| `button / burst` | Same stadium. Particles only on hover; the shot is a pill. |
| `button / scramble` | Iris pill, hover scramble. Every kit’s “smart CTA.” |
| `magnetic / gravity-well` | White squircle that says Pull. |
| `magnetic / comet-trail` | Dark pill + blur blob. |
| `magnetic / ink-wake` | Wake is a few leftover dots. |
| `magnetic / shatter` | The word “shatter” on a dark pill. |

### Cards / bento / flip / drag

| Cell | Why |
| --- | --- |
| `spotlight / glare-tilt` | Lamp 04 product card (the still in `docs/audit/wow/card-glare-tilt.png` is stale; live has the travertine lamp). Competent shop card. Tilt is the leftover Magic default. Not a signature. |
| `spotlight / shader-well` | Fog tile titled “Night desk.” |
| `spotlight / lens-spec` | See worst eight. |
| `spotlight / scramble-stat` | Uptime odometer on a dark card. |
| `flip / morph-face` | “Face A.” |
| `flip / liquid-flip` | Fog + goo, variant name as title. |
| `flip / prism-face` | Conic wash, variant name as title. |
| `flip / path-reveal` | Same black plate, a stroke. |
| `bento / *` | Harbor / Atlas / 1860. Peel is a gold triangle. Feature tile prints the variant id (`peel-tile`). |
| `drag / physics-deck` | Dark note: “Drag the plate.” |
| `drag / magnetic-stack` | Three offset sheets. |
| `drag / prism-plate` | Fog + RGB type. |
| `drag / particle-toss` | Glass card on a dot field. |

### Fields

| Cell | Why |
| --- | --- |
| `aurora / shader-mesh` | The house fog, labelled `shader-mesh`. |
| `aurora / particle-field` | Linked dots. 2020 particle hero. |
| `aurora / liquid-glass` | Fog plus a frosted inset. |
| `aurora / globe-field` | The same sphere, labelled `globe-field`. |
| `grid / perspective-fly` | Iris floor grid. Synthwave leftover. |
| `grid / circuit-draw` | Three traces. |
| `grid / topo-pulse` | Concentric ovals. |
| `grid / hex-lattice` | Teal hex flashcards. |

### Type

| Cell | Why |
| --- | --- |
| `gradient-text / *` | Scramble / mask / path / weight pulse on the house serif. |
| `typewriter / odometer` | Digit columns. Fine as a primitive, not a shot. |
| `typewriter / matrix-rain` | Green glyph rain. The Matrix screensaver. |
| `typewriter / flap-3d` | Four keycaps cycling GATE / WAIT. |
| `text-reveal / *` | Line mask and letter springs. 21st.dev’s most copied type trick, unfinished. |

### Nav / modal / marquee / input

| Cell | Why |
| --- | --- |
| `nav / magnetic-pill` | Glass pill. Aceternity floating-nav default. |
| `nav / morph-dock` | Work / Notes / Atlas collapsing to initials. |
| `nav / compass-nav` | Pill + gold stick labelled ATLAS. |
| `nav / glass-liquid` | Fog band + glass pill. |
| `modal / shared-morph` | An N that grows. |
| `modal / shader-veil` | Fog card, duplicated in the gallery frame. “The overlay is a field.” |
| `modal / liquid-sheet` | Bottom sheet + goo. Round 7 leftover, still a sheet. |
| `modal / particle-confirm` | “Delete the room?” on dots. |
| `marquee / cylinder-3d` | Partner names on a carousel. |
| `marquee / tape-reels` | See worst eight. |
| `marquee / velocity-scroll` | Giant serif ticker. |
| `marquee / grain-tape` | Mono “live” row. |
| `input / *` | OTP boxes, a path underline, a caret that follows the pointer, a goo drop. Forms, not scenes. |

### Sections

| Cell | Why |
| --- | --- |
| `tabs / layout-morph` | Rooms / Library / Export + ink pill. Origin/shadcn tabs. |
| `tabs / zipper-tabs` | A black bar split in half. Left face blank. |
| `tabs / liquid-ink` | Goo on the active chip. |
| `tabs / scramble-label` | Same tabs, scramble on hover. |
| `accordion / shader-row` | Docs FAQ (“Do I install a package?”) on a dark list. No mesh in the live frame. |
| `accordion / *` | Plus/minus and a path plus. |
| `tooltip / *` | “Jump any room” as a chip or a lens that does not magnify. |
| `toast / *` | Saved to Harbor. Path check / goo / odometer. |
| `avatar / radar-presence` | Portrait glued on the same radar as radar-jump. |
| `avatar / shader-ring` | Fog halo. |
| `avatar / particle-presence` | Dots behind a bust. |
| `avatar / holographic` | Grain on the pack. |
| `badge / morse-live` | LIVE pill + Pause. The “Morse” is a blinking 8px dot. |
| `badge / *` | Scramble LIVE, goo pill, a red Sale + scribble. |
| `pricing / prism-price` | See worst eight. |
| `pricing / odometer-price` | Same three cards, ticking $048. |
| `pricing / morph-toggle` | Monthly / Yearly on the middle card. |
| `pricing / shader-featured` | Middle card renders as a black plate in the live light gallery, not a field. Copy is “The number ticks. The featured plate is a field.” on all three. |
| `testimonials / wall-parallax` | Three quote cards, slight y offset. |
| `testimonials / video-shader` | Reel + “The reel is the quote.” |
| `testimonials / polaroid-quotes` | One generated bust in a white frame; hover fans a clipped Meera / third card. Quote is “Stay in the room.” Dribbble 2019. |
| `testimonials / scramble-pull` | The sentence, Anitha Rao · Harbor. |
| `footer / giant-marquee` | NEXARA NEXARA. |
| `footer / grain-night` | “Night closer” on the void. |
| `footer / barcode-marks` | A bar chart sold as a barcode. Pause sits on the last bars. |
| `footer / path-sitemap` | A stroke and a sentence. |
| `stats / odometer` | 1860 / 998 / 48. Three cards. |
| `stats / dial-gauge` | Dashboard arc + 56/60. |
| `stats / particle-pulse` | Number on dots. |
| `stats / film-mosaic` | Four dark number tiles. |
| `countdown / flip-3d` | Four boxes. |
| `countdown / shader-rings` | Fog + dhms. |
| `countdown / analog-orbit` | A clock face. Not an orbit. |
| `countdown / launch-scrub` | T-MINUS and a day count. |
| `leaderboard / *` | Heat bars, a 2/1/3 podium of the same six faces, particles, odometer. |
| `case-study / scroll-film` | Wren / Farm / Track type cards. No film. |
| `case-study / shared-morph` | A title that gets bigger. |
| `case-study / film-stack` | Sprocket marquee of the case stills — the only case object with media, still a ticker. |
| `case-study / path-index` | A stroke + 01 Wren. |
| `services / fold-doors` | Four type plates that rotateX. |
| `services / stamp-crews` | CONSULT LAB PHARMACY THERAPY as red outline chips. |
| `services / shader-cards` | Fog tiles. |
| `services / path-checklist` | Checks + names. |
| `process / scrub-timeline` | Brief/Build on a dark card + bar. |
| `process / pin-steps` | Sticky type cards. |
| `process / path-rail` | A stroke. |
| `process / metronome-steps` | See worst eight. |
| `team / film-portraits` | The six-face pack in a grid. |
| `team / constellation-crew` | Anitha / Kiran / Meera / Suresh as dots. Lines draw a diamond that does not touch them. |
| `team / holographic` | Pack + grain. |
| `team / particle-grid` | Pack + dots. |
| `contact / map-shader` | Fog + coordinates. |
| `contact / liquid-form` | Two fields + Send. |
| `contact / magnetic-branches` | Three city cards. |
| `contact / path-directions` | A stroke. |
| `cta / liquid-wash` | Fog + “Ask for a seat.” Shader-void’s closer. |
| `cta / scramble-cta` | “Book the room.” |
| `cta / particle-close` | Same closer on dots. |
| `cta / beam-band` | Iris slab, “The closer scans.”, a white wash. Aceternity beam as a banner. |
| `chapters / pin-story` | Sticky stills + 01 Mast. The stills are the old cinematic pack. |
| `chapters / scrub-essay` | Fog chapter cards. |
| `chapters / parallax-index` | Mono list + split type. |
| `chapters / path-folio` | A stroke + Folio 18. |
| `news / velocity-tape` | Mono ticker. |
| `news / flip-headlines` | Truncated flap tiles. |
| `news / shader-magazine` | Fog + Issue 18. |
| `news / tape-digest` | Same dashed reels, days of the week. |
| `logo-cloud / orbit-3d` | Globe again. |
| `logo-cloud / magnetic-marks` | Four lockup tiles. |
| `logo-cloud / stamp-lockups` | Same tiles with a press animation. |
| `logo-cloud / particle-press` | “Harbor Review” on dots. |

### App kit

| Cell | Why |
| --- | --- |
| `app-shell / morph-sidebar` | White empty Linear: “North OS” / “Morph sidebar.” |
| `app-shell / radar-jump` | See worst eight. |
| `app-shell / shader-desk` | Fog with two glass plates (Rooms / Night desk). |
| `app-shell / liquid-rail` | Icon rail + fog. |
| `kpi / *` | ₹846, a ring, a spark, dots. Dashboard chrome. |
| `data-table / *` | Three rows, a heat grid of purple cells, card morph. Round 7 already called heat-cells a grid, not a product. |
| `kanban / spring-toss` | Three named columns, magnetic peel cards. A thin board. |
| `kanban / peel-cards` | Same, gold corners. |
| `kanban / wip-pendulum` | See worst eight. |
| `kanban / particle-lane` | “Review lane” on dots. |
| `chart / *` | Path, spark, scrub bars, a donut on fog. |
| `activity / *` | Three lines, a stroke, an odometer, goo chat bubbles. |
| `command / scramble-search` | Jump list + scramble echo. |
| `command / morph-results` | Filter list. Round 7 leftover, still a list. |
| `command / particle-jump` | Same list on dots. |
| `command / prism-row` | White Jump / Open Harbor / Jump Atlas / Create brief. No prism. |
| `settings / morph-sections` | Dark desk toggle + a sentence. |
| `settings / liquid-toggle` | Goo in the switch. |
| `settings / path-security` | A stroke + “SSO is drawn.” |
| `settings / fold-profile` | Black chip: Anitha Rao / Harbor desk. No fold in the rest frame. |

### Kits

| Cell | Why |
| --- | --- |
| `kit / shader-clinic` | Fog mast “Heart care, considered.” over the already-approved healthcare page. The page has density. The signature is the farm. |
| `kit / globe-agency` | Globe + “Move the furniture.” over the already-approved agency page. Same sphere as hero / aurora / logo-cloud. |
| `kit / pin-sports` | Skater poster, FIELD ATHLETICS · 01. Three chapter strings in source; the shot is one caption. The sports kit hangs below. Round 7’s pin-sports leftover, destocked of orbit, not redesigned. |
| `kit / liquid-portal` | Lazy 3D slab + “The desk after dark.” |
| `kit / scramble-academy` | Fog + scramble title over the academy page. |

### Loaders (all 12)

One night stadium. Caption “Loading Harbor.” Pause often sits on the object.

| Cell | Why |
| --- | --- |
| `pulse-halo` | Gold ring. Family lead. See worst eight. |
| `orbit-beads` | The “one allowed orbit” is RadarSweep with three dots. Pause covers the dish. |
| `shader-fog` | The house fog, waiting. |
| `path-infinity` | A lilac ∞ stroke. Pause centered under it. |
| `odometer-pct` | A percentage. |
| `scramble-hold` | HOLD THE DESK. |
| `liquid-drop` | Goo puddle. |
| `particle-drift` | Dots. |
| `flap-wait` | W A I T keycaps. |
| `analog-sweep` | The same clock as countdown. |
| `barcode-scan` | Tiny bar block; Pause sits on “PACK · H”. |
| `prism-bar` | The word “Loading.” No RGB. |

---

## Named leftovers

These are the next-pass list. I am not designing them. I am naming what is still cheap.

1. **House plate.** `#07070c` / `#111113`, gold 11px tracked kicker, Instrument Serif display, white stadium CTA, grain, Pause in the corner. Once you have seen shader-void you have seen half the catalogue.
2. **ShaderMesh farm.** void, mesh, veil, glass-liquid, liquid-wash, shader-clinic, shader-fog, shader-desk, shader-well, shader-row, shader-cards, shader-rings, shader-magazine, shader-featured, shader-donut. One material, fourteen labels.
3. **Orbit / tilt not gone.** `hero / globe-orbit` still wraps OrbitRing. `spotlight / glare-tilt` and `button / glare` still wrap TiltGlare. `loader / orbit-beads` and `logo-cloud / orbit-3d` keep the radial object. Destock was a comment, not a picture.
4. **Unique primitives are clip-art.** `LensHover` does not magnify. `PrismSplit` is a 10px RGB ghost you cannot see in the pricing frame. `PeelCorner` is a gold triangle. `ZipperSplit` is two halves. `RadarSweep` is three rings. `MorseBlink` is a dot. `PolaroidFan` clips names. `BarcodeScan` is a bar chart. `DialGauge` is a dashboard widget. `FoldPanel` is a chip. `StampInk` is an outline button. `MetronomeArm` is a stick. `ConstellationMap` misses its nodes. `TapeReels` is two dashed circles. `PendulumCard` is a card on a thread. `BeamScan` is a white wash.
5. **Product copy is still demo-meta.** Face A. peel-tile. Morph sidebar. Do I install a package? The overlay is a field. The closer scans. A WebGL mesh that follows the pointer. Loading Harbor.
6. **Pin-scroll does not hold a story in the gallery.** The 420vh track inside a 36rem scroller goes black. A signature you cannot photograph past chapter 01 is not a signature.
7. **Pause as composition.** Infinity, radar, barcode, and several loaders let the Pause pill sit on the object. That is a visual bug, not an a11y note.
8. **People pack.** Polaroid, team, kit clinic still spend the same six generated busts. Fine as a crew. Thin as proof.

---

## What I will not pretend

- That destocking OrbitRing made the library original. The globe and the glare are still in the hero and the card. The replacements are thinner.
- That a 12-variant loader is a family. It is one night well and twelve doodles.
- That four chapter strings equal an Apple pin. The live mid / end frames are black.
- That kit wow cells are new pages. They are masts on approved kits.
- That polaroid-quotes is a testimonial object. It is one face and a sentence. Hover does not save it.
- That I owe a CONDITIONAL because a few fields are pretty. Pretty fog is how this catalogue stays unmemorable.

Round 7 said keep none. Round 11 changed the names. The pictures did not become shots.
