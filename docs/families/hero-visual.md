# Hero family — visual direction

Owner: visual. Audience: Product, Motion, Front-end, sceptical CD.

This is a counter-brief to [`docs/families/hero.md`](./hero.md). It also answers [`hero-api.md`](./hero-api.md) (one `Hero` file, Helio hex as fallbacks) and [`../research/hero-motion.md`](../research/hero-motion.md) (motion scheduled onto Product’s jobs). I am not arguing for Helio in the kit. I am arguing that **eleven jobs that all paint as a claim beside a thing are the third failure of this family**, after geometry and industry.

The catalogue file `src/components/ui/hero.tsx` is the crime scene: one component, twelve costumes, traffic lights, `#8b7cff` in the window mock, `$48/mo`, phones, countdown cells. Product correctly killed the costumes. Product then replaced them with jobs (`split`, `stack`, `frame`, `proof`, `stage`, `cover`, `video`) that will **thumbnail as the same kit** the moment FE draws them. That is how you get an Aceternity shelf with better variable names.

A 21st.dev trending still is a **scene with one dominant object**. Awwwards-adjacent pages (FORMAT, Temper, Serve, Apple) do not rearrange eyebrow / title / lede / actions / media. They change what the page *is*.

---

## Against the kit

If I squint at eleven docs thumbnails and I see eleven two-column marketing blocks, or eleven centered claims with two pills, the family is dead. Recoloring Heliograph into Paper does not save it.

Product’s list, as pictures:

| Product id | What it will actually look like |
| --- | --- |
| split | Copy left, shot right. Magic UI gravity well. |
| stack | Split with the right column deleted. |
| capture | Stack with a pill input. |
| video | Split or cover with a play badge. |
| frame | Split, 30/70, fake app chrome. |
| proof | Stack plus a logo row. |
| stage | Split plus swatches. |
| cover | Stack with a rule. |
| iris | Split drawn *inside* a circle. |
| orbit | Split, canvas on the right. (Helio `OrbitalHero` already is this.) |
| kinetic | FORMAT type with two pills glued under it. |

That is not eleven variants. That is **split in a wig**.

Helio already proved the other species: an iris you look *through*, letters with mass, an instrument in a plate, a chaptered object. Those are references for **objects**, not for night-desk hex.

I will grant Product’s conversion constraints (first-frame way through, reduced-motion end state, no baked Helio copy, empty is empty). I will not grant a default paste named `split`, a BASIC file of eight className trees, or Advanced tamed into “the split, but theatrical.”

---

## Token contract

Hero reads **material** tokens. Heliograph is `data-nx-theme="heliograph"`, one of four presets, never a hex in the component.

```css
--nx-bg      /* page ground */
--nx-fg      /* primary ink */
--nx-muted   /* secondary copy, ≥4.5:1 on bg */
--nx-accent  /* the one signal. rationed. */
--nx-elev    /* raised plate / paper / housing */
--nx-line    /* hairline colour (already alpha or color-mix) */
--nx-metal   /* satin metal, seals, flap lips, bezels */
--nx-cool    /* opposite rim, phosphor, readouts */
```

Product listed `--nx-border`, `--nx-well`, `--nx-radius`, `--nx-shadow`, `--nx-accent-fg`, fonts. **Add** those if FE needs them. **Do not delete** `elev / line / metal / cool`. Lighting cannot be expressed as a border and a drop-shadow. `--nx-border` is a synonym people will use instead of `--nx-line`; pick `line`. `--nx-well` is `--nx-elev` with inset light; say so in kit, do not fork a second ground.

Fonts (agreed): `--nx-font-display` Fraunces, `--nx-font-body` Instrument Sans, `--nx-font-mono` IBM Plex Mono. CTA text on accent: `--nx-accent-fg` is allowed.

Fallbacks if unset: `background: inherit`, `color: currentColor`, metal/cool/accent fall back to `currentColor`. No `#f6f3ec`, no `#ff4d1c`, no `bg-void`, no `text-ember`.

### Presets (docs / `NxTheme` only)

| Token | heliograph | paper | ink | clinical |
| --- | --- | --- | --- | --- |
| bg | `#07060b` | `#efe7d6` | `#0b1014` | `#f3f1ec` |
| fg | `#f3ead8` | `#16110a` | `#e8eef2` | `#121416` |
| muted | `#c6bba8` | `#6f6758` | `#8b9aa6` | `#5c6570` |
| accent | `#ff4d1c` | `#c73912` | `#7de0ff` | `#0f7f7a` |
| elev | `#100e16` | `#f7f1e4` | `#141c22` | `#ffffff` |
| line | fg 14% | fg 14% | fg 12% | fg 16% |
| metal | `#d9a85a` | `#a4844a` | `#c5d0d8` | `#8a9196` |
| cool | `#3ee0c6` | `#2a7a72` | `#7de0ff` | `#1aa6a0` |

Paper and Clinical are **daylight products**, not Heliograph with the lights on. Ink is cool dark, not brown-black. Accent is still one object per view.

### Lighting plot (same geometry, different gel)

Treat every surface as if a key sits upper-left (~40°) and a thin opposite rim exists.

- **Key:** warm on heliograph/paper, cooler on ink/clinical. Soft contact shadow under plates (`0 28px 60px -36px` on dark presets; lighter and shorter on paper/clinical).
- **Rim:** 1px `var(--nx-line)` on the top edge of raised plates. Instrument rims may use `var(--nx-cool)` or `var(--nx-metal)`, never both competing.
- **Signal bloom:** `var(--nx-accent)` only, and only on the object (pupil, caret, phosphor cursor, pulled card). Never on body type. Never a page-sized mesh.
- **Grain:** 4–6% on heliograph/ink; 2% paper tooth on paper/clinical. Overlay, not identity. Optional via kit, not a HelioMark.
- **Kill:** violet, electric indigo, cyan-magenta mesh, spotlight-following-cursor as the aesthetic, glassmorphism for its own sake, gold-gradient metal.

If two accent objects compete, one becomes `fg`.

---

## Difficulty (what the words mean)

**BASIC** — no scroll-jack, no WebGL, no per-glyph physics. Still a photographable *object*. CSS layout + tokens. Motion: in-view opacity or nothing.

**INTERMEDIATE** — one pointer or one CSS 3D/clip idea. No R3F. No pinned 300vh.

**ADVANCED** — the visitor **operates the object** (open, aim, lock, jump a chapter). Reduced motion shows the **end state of that operation**, not a fallback split.

BASIC is not timid split. ADVANCED is not split with clip-path. Product’s “ship the boring four first” is a sequencing argument. I will not let “boring” mean “undirected.”

Spread: **3 BASIC / 4 INTERMEDIATE / 4 ADVANCED**.

---

## Silhouette test

Two variants may not share a thumbnail silhouette. Hard collisions:

| Pair | Difference that must survive |
| --- | --- |
| aperture vs clipped-mask | Hole with **blades** (round, you look through) vs **printer’s window** (rect or one glyph, you look at a cut). If both are `clip-path: circle()`, one dies. |
| aperture vs chapter-scroll | One shot (iris opens) vs **one object, four modes**. Chapter-scroll may not be the iris again. |
| instrument-plate vs aperture | You look **at** a thing you aim vs you look **through** a hole. |
| type-mass vs flip-board | Two display lines with mass vs a **wall of mechanical cells**. |
| type-mass vs editorial-split | Letters as furniture vs a **reading room** with measure and rules. If editorial uses 168px display, it has stolen type-mass. |
| magazine-folio vs editorial-split | **Bound spread** (gutter, verso/recto) vs **register cut** (type world, then a photograph as another world). |
| prompt-well vs terminal | Sunken **dispatch trough** with paper slips vs **bezel + phosphor**. |
| card-fan vs magazine-folio | Loose **hand of documents** vs a **bound book**. |

If two 1280 thumbs rhyme, we cut until they do not. We do not add a twelfth to paper over a rhyme.

---

## Variant table

| # | id | Level | Object | Layout | Lighting | Type role | Must not look like |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `editorial-split` | BASIC | A typographic institution. Split of **register**, not of columns. | Type occupies a room. Hard cut to a photographic world (below, or 0.7/0.3 scholarly). Never 1fr/1fr. | Type room: no atmosphere. Cut: its own photographic key. No blend, no mesh between. | Headline is architecture (rules/underlines). Lede is a real paragraph. Actions are **text links**. | Product `split` / `cover`; Anthropic clone; saas window; two pills; current `agency` + `editorial`. |
| 2 | `magazine-folio` | BASIC | An open **book**. | Verso = image to the page bleed. Recto = running head, folio, kicker, title, ~32ch deck. Binding shadow in the gutter. Outer margin > inner. | Paper is `--nx-elev`. Gutter multiplies darker. Image ungraded to UI. No bloom. | Display may crop into the gutter. Folio + running head: mono 11. Deck 17/28 muted. | `grid-cols-2` + rounded image; “Issue 18” kit; glass CTA; overlapping white type on a dim photo. |
| 3 | `terminal` | BASIC | Recessed **CRT / console**. | Bezel almost full-bleed or a deep well. Status engraved in the metal, **not** traffic lights. Prompt is the way through. | Phosphor in `--nx-cool` or `--nx-accent` (preset picks one). Screen well darker than page. Bezel `--nx-metal` satin, fat lip, inner shadow. Bloom only on the cursor block. Light presets: the **object** stays a dark screen on a light desk. | Mono on the glass. One printed word at 22–40 as title. No serif. No pill pair. | macOS window (current `saas`); matrix rain; Aceternity Macbook; `npx` joke; Warp screenshot. |
| 4 | `prompt-well` | INTERMEDIATE | A sunken **dispatch trough**. The input is the product. | Optical center = the well, not a 72px headline. Suggestion **slips** stack in the tray. Submit lives on a metal end-cap. | Interior darker than `--nx-bg` (inset 40px, inner hairline). Caret is the only lamp (`--nx-accent`). Slips on `--nx-elev` with one contact shadow. No outer hero glow. | Instruction ≤40px. Typed value is the second display (22–28). Path/placeholder mono 13. | Raycast clone; ChatGPT box; pill search; Product `capture` as a centered form; “Ask AI”; dual CTA then a field. |
| 5 | `flip-board` | INTERMEDIATE | Solari **split-flap wall**. | Architecture of rows. Station index as a rail. The flaps spell the claim. Footer = timetable rule. | Each flap: top lip `--nx-line`, gutter `--nx-bg`. Housing `--nx-elev`. Corner screws `--nx-metal`. Cool bounce ≤6% (fluorescent), not neon. | Flaps are industrial (mono or condensed). **No Fraunces on flaps.** | One `rotateY` card (`FlipCard`); airport Bootstrap; LED matrix; countdown; three hover-flip tiles. |
| 6 | `card-fan` | INTERMEDIATE | A **hand of documents** on a desk. | Asymmetric pile, 4–14° rotations, one pulled. **No page-level H1.** Pulled card’s title band is the headline. Tape/clip may hold the lede. | One shared desk key. **One** contact shadow on the ground. Pulled card: brighter hairline, +8px lift. Others dimmer. | Voice of the species (mono receipt, serif dossier). Site display type is forbidden — it competes with the fan. | Swiper coverflow; stacked glass shots; App Store carousel; 3D cube; testimonial slider; Product `stage` + swatches. |
| 7 | `clipped-mask` | INTERMEDIATE | A **printer’s registration window**. | One rotated (6–10°) rectangle, or a **single** glyph window. Scene lives only inside the cut. Slug in the leftover field. **Not a circle.** | Inside: photographic key. Outside: flat `--nx-bg`. Cut edge 1px `--nx-line` + `--nx-metal` ticks. No feather, no `mix-blend` overlay. | Slug is mono 11 along an edge. If the mask is a letter, that letter is the only display. | `background-clip: text`; 2022 video-in-BOLD; circular crop; mesh multiply; Product `video` as wallpaper. |
| 8 | `aperture` | ADVANCED | Mechanical **iris**. You look through it. | Full-bleed sticky stage. **No columns.** Type is a caption **on the beam** (Serve: lower field of the pupil), not a left rail inside the hole. Bezel ticks = chapters. Default height: **one viewport**; scroll-open is opt-in. | Only the pupil is a lit world. Blades `--nx-bg` with `--nx-metal` edge. `--nx-accent` bloom **inside the hole only**. | Display sentence on the optical axis of the hole. Mono kicker on the bezel. Primary way-through is **hittable at frame 0** (opacity 1). Dual pills allowed only after the hole is majority open, or as a single caption-link. | `clip-path: circle()` on Unsplash; loader ring; centered Magic UI stack; Product “iris as a plate that contains split”; Helio 320vh default; CTA gated on scroll (Round 1 bug). |
| 9 | `instrument-plate` | ADVANCED | A thing you **aim**. | The plate is 70–80% of the viewport, `overflow: hidden`. Legend is a **museum label** (figure, azimuth, elevation, mode). **Kill the copy-left / canvas-right split** (current `OrbitalHero`). | WebGL: one warm directional (metal/accent), one cool rim, dim fg hemisphere. No HDRI mall. Plate: `--nx-elev`, top hairline, contact shadow. Canvas never escapes. | Short imperative on the lip, or none. Mono readouts are the copy. Marketing lede >2 lines is a defect. | Spline torus; floating crystal; glass overlay; Product `orbit` as split; Helio crystal as default geometry; Cosmic background behind type. |
| 10 | `type-mass` | ADVANCED | **Letters as furniture.** | Full-bleed type. Crop into the edge allowed. Scholarship rail: figure, lock count. No media column. | Raking key across the glyph edge (duplicate `--nx-metal` layer at ~2px / 8%, not CSS `text-shadow` glow). Locked glyphs rotate into `--nx-cool` rim. Photo ground ≤25% luminosity or none. | The object **is** display at 120–168 (desktop); 56–64 on 375, never 32. Lede lives in the rail, never under the letters. | Gradient text; word-stagger SaaS; agency “WE BUILD”; Product kinetic + two pills under FORMAT; text-on-video; stealing flip-board. |
| 11 | `chapter-scroll` | ADVANCED | **One object, four modes.** | Sticky visual, advancing captions, jump ticks (`aria-current`). Not four illustrations. Reduced motion: stacked captions, stills of each mode, no pin. | Same key **direction** every chapter. Intensity/gel changes (dim → first accent → metal → open). Not a theme switch, not four filters. | Caption for the object’s current state. Display 40–72, not 168. Kicker mono. | Four stacked heroes; Ken Burns; Locomotive clone; tabbed screenshots; the iris again; Product’s deletion of this species. |

Paste-frequency is not prestige, but **the default picture of the family cannot be `split`**. Docs lead with `editorial-split` (quiet, pasteable, still a directed object) and `aperture` (signature). Product may sequence engineering BASIC-first. Visual sequences **silhouette-first** in the gallery so the shelf does not rhyme.

---

## Specs (what FE actually builds)

Shared chrome: `data-nexara="hero"` `data-variant="{id}"`, named from the heading (`titleAs` default `h1`). Optional slots **omit** regions. No default marketing strings. `NxTheme` wraps demos; the source still paints if tokens are missing.

Way through: every variant has one. It is not always two rounded buttons.

| id | Way through | Forbidden chrome |
| --- | --- | --- |
| editorial-split | Text links after the rule | Pill pair, mock window |
| magazine-folio | Text links on the recto | Glass CTA, price card |
| terminal | The prompt line / command | Traffic lights, serif H1, dual pills |
| prompt-well | End-cap submit | Headline + two doors + a field |
| flip-board | A flap row that is a link/button | Play badge, logo cloud |
| card-fan | The pulled card is the control | Page H1, swatches |
| clipped-mask | Slug link or a single word in the margin | Play emoji on a dim video |
| aperture | Caption link or one CTA, **opacity 1 at t=0** | CTA fade tied to scroll |
| instrument-plate | Mode ticks + plate click (pulse) | 50/50 marketing column |
| type-mass | Rail action (Unlock / Enter) + optional lockable glyphs as buttons | Dual pills under the letters |
| chapter-scroll | Chapter ticks; last chapter may hold a link | Tab bar, extra hero CTA row |

### Mapping Product jobs → objects

| Product | Visual |
| --- | --- |
| split | **Killed as default.** Species lives on as `editorial-split` (register) or `magazine-folio` (book). Not 50/50 proof. |
| stack | **Killed.** Centered claim is a poster unless it is `type-mass` or `terminal`. |
| capture | Replaced by `prompt-well`. Keep form states. Change the object. |
| video | **Killed as a hero.** Play-dialog is another family. Moving image lives *inside* aperture or clipped-mask. |
| frame | Replaced by `instrument-plate`. A cropped screenshot with a thin band of type is Linear-cosplay and will look like split. |
| proof | **Killed.** Logo rail is Marquee / a slot under a hero, not a hero. |
| stage | **Killed.** SKU picker is a PDP. Physical objects on a desk → `card-fan`. |
| cover | Split into `magazine-folio` + `editorial-split` + `type-mass`. One “type is the object” bucket is how they collapse. |
| iris | `aperture`. Keep: first-frame way through, one viewport default, scroll opt-in, reduced-motion open. Reject: “contains split’s type+CTA”. |
| orbit | `instrument-plate`. Keep: required still, lazy scene, pause off-screen, canvas clipped. Reject: title+actions column. |
| kinetic | `type-mass`. Keep: CTA-as-way-through (rail, not pills), lockable glyphs as buttons, no Helio lines as defaults. |

Helio `CinematicHero` / `OrbitalHero` / `KineticHero` / `ScrollStory` stay under `flagship/`. They are Heliograph **performances**, not the registry source. Library aperture must not import HelioMark or night-desk stills.

---

## File architecture (fight with FE)

[`hero-api.md`](./hero-api.md) already chose the original sin:

> One public component, `Hero`. Copy-paste is **one family file** (`hero.tsx`). Eleven files, eleven discriminated components… is a framework. We will not.

That is `src/components/ui/hero.tsx` today: a variant union over shared slots. Geometry pass. Industry pass. Now a “jobs” pass in the same shape. A reuser who pastes `split` and “deletes branches they do not need” is being asked to ship a 11-layout source file and a pair of scissors. That is not how this registry’s best pieces work (`FlipCard`, `DraggableCard` — one object, own markup).

Not this (Product’s four files, or FE’s one):

```
hero.tsx         // eleven ifs, shared HeroProps, className slots
hero-scene.tsx   // the only extra file FE will admit
```

This:

```
src/components/ui/hero/
  kit.ts                 // token helpers, optional Grain, figure label, springs
  editorial-split.tsx
  magazine-folio.tsx
  terminal.tsx
  prompt-well.tsx
  flip-board.tsx
  card-fan.tsx
  clipped-mask.tsx
  aperture.tsx
  instrument-plate.tsx
  type-mass.tsx
  chapter-scroll.tsx
  index.ts               // named exports, not one <Hero variant>
```

Eleven objects, eleven DOMs, eleven a11y names. Shared: tokens, springs, reduced-motion end-state helper. **Not shared:** markup.

Registry may still be one `hero` item with eleven `variants[]`. Paste is **the file for the object you want**, plus `kit.ts` + `utils.ts`. BASIC importers must not pull R3F. `instrument-plate` may lazy-load a scene module.

`variant="aperture"` that only changes `rounded-*` and `grid-cols-*` on a common slot tree is a **won't-ship**. `FlipCard` may be composed *inside* `card-fan`; it is not `flip-board`. `Typewriter variant="terminal"` is not `terminal`. `DraggableCard` species may be the cards in the fan; they are not a hero.

FE cut `flip-board` as “event countdown / split-flap digits are not a conversion section.” Wrong object. A Solari wall that **spells the claim** is a hero. A ticking `12:04:18:09` is a countdown component. Do not kill the wall because a costume once used digits.

---

## Challenges

### To Product / UX — Advanced is too timid

You learned the right lesson from Helio Round 1 (black disc, CTA gated at 0.55). I will not relitigate first-frame readability.

You then over-corrected. “Iris is a plate that already contains the split’s type+CTA.” “Orbit keeps title + actions.” “Kinetic without two buttons is a poster.” “No chapter scroll.” That is how Advanced becomes a **sticker pack on split**.

- **Aperture:** blades, metal edge, bloom in the pupil, caption on the beam. Control-first open is fine. Drawing split inside the hole is not.
- **Instrument-plate:** pointer has consequences (Bruno Simon as *floor*, not as a truck). Museum legend. If WebGL is cut, the still must still be an instrument, not a screenshot in a window.
- **Type-mass:** lock and shear are the product. A rail link is a way through. Two marketing pills under FORMAT type is Magic UI with scholarship.
- **Chapter-scroll:** exists. One object, four modes, jump ticks. It is not iris, and it is not “scroll theater as the library default.” It is Advanced, opt-in, reduced-motion stacked.

Display size: 375 title floor ~2.4rem, and type-mass is allowed to be larger than a SaaS headline. Awkward breaks beat 32px. They also beat vanity that hides the way through — **on aperture, not by shrinking the letters into a kit.**

Do not merge folio, editorial, and type-mass into `cover`. Do not merge waitlist+search into a pill and call it done. The *job* can be “take an email.” The *object* is the well.

### To Motion — keep the laws, move the seat

I will sign: one clause per variant, springs not soup, type/way-through opacity 1 at frame 0, reduced = end state, no Lenis, no wheel hijack, stagger is garnish, WebGL only on the instrument plate.

I will not sign motion scheduled onto Product’s jobs. “The split plate seats” is a kit hover. “Stack: nothing moves” is a confession that the variant has no object. Put the ideas on the objects:

| Object | The one idea |
| --- | --- |
| editorial-split | The rule seats. Type does not cascade. |
| magazine-folio | None required. Binding is layout. |
| terminal | None required. Cursor is lighting, not a personality. |
| prompt-well | Success morphs the trough (your capture idea, right object). |
| flip-board | Flaps tick. That is the piece. |
| card-fan | One card pulls forward. |
| clipped-mask | None, or a 2px sit of the cut. No Ken Burns inside. |
| aperture | The hole. Control-first; scroll opt-in. |
| instrument-plate | Pointer answers. |
| type-mass | Mass / lock. |
| chapter-scroll | The **same** object changes mode. Not a second iris. |

If a BASIC object needs a spring to “feel like a kit,” delete the spring.

### To the sceptical CD — theater is not the enemy

Mesh gradients, spotlight cards, glassmorphism, custom cursors, particle loaders, HDRI malls: **rejected**. That is theater without an object. I will help you kill it.

Apple, Serve, Temper, FORMAT: theater is **how you meet the object**. An iris that does not open is a PNG with a hole. Letters that cannot be locked are a headline. An instrument that does not answer the pointer is a tutorial torus.

We already have three quiet BASIC objects (editorial-split, magazine-folio, terminal) for briefs that want Linear. Use them. Do not Linear-ize the iris because the last awards cycle got tired of WebGL for its own sake. Helio Round 3: the desk and the observatory worked when they were **objects on a plate**, not when they were chips. Same rule here.

One idea per variant, fully followed. A second idea is another file. I will not add a twelfth. I will not sign a family whose Advanced set is “respectable” and whose stills would not trend.

### To Front-end — one file of className swaps is the original sin

You wrote it down so I do not have to invent you: one `Hero`, one union, one file, unused bags ignored at runtime. That is a costume rack with TypeScript. Terminal’s bezel is not `className` on editorial-split. Flip-board’s cell grid is not FlipCard. Folio’s gutter is not `md:grid-cols-2`. Aperture’s blades are not `clip-path` on split’s `media`.

Share **nothing but** a tiny kit (tokens, springs, reduced-motion). Named exports, not `<Hero variant>`. Paste the object.

**Heliograph is already baked in your fallbacks.** From `hero-api.md`:

```css
--nx-bg: var(--nx-bg, #07060b);
--nx-fg: var(--nx-fg, #f3ead8);
--nx-accent: var(--nx-accent, #ff4d1c);
```

That is the night desk as the unnamed default. Unset tokens must be `inherit` / `currentColor`, not Helio hex. Paper and Clinical cannot “opt out of brown-black.” Product asked for this. You shipped the opposite.

Your token list is missing `--nx-elev`, `--nx-line`, `--nx-metal`, `--nx-cool`. `--nx-well` / `--nx-border` / `--nx-shadow` are derivatives. Lighting needs metal and a cool rim or every plate is a flat card.

You fought a Visual who wanted “iris 320vh, Helio stills, purple mesh, twelve industries.” That Visual is not me. I already killed those. Fight the brief I wrote.

Compose other families *outside* (aurora, marquee, typewriter). Do not embed them. No `align`. Grep of `src/components/ui/hero/**` must not find Helio, Nexara, Lamp, Harbor, `#8b7cff`, `#f6f3ec`, `#ff4d1c`.

---

## Five fights

1. **Objects, not jobs that thumbnail as split.** If the 1280 gallery rhymes, I block the family. Product’s `split` / `stack` / `frame` / `proof` / `stage` / `cover` / `video` are the rhyme. Replace with the eleven ids above, or cut the family down to four *objects* — do not ship eleven wigs.

2. **Eleven files, eleven DOMs.** FE’s `hero-api.md` (“one family file, eleven files is a framework”) is a won't-ship. Named exports per object. Shared kit only. `FlipCard` / `Typewriter` / `DraggableCard` are parts, not heroes. Flip-board is not a countdown.

3. **Advanced is operable theater, with first-frame honesty.** I grant: CTA/link hittable at t=0, iris default one viewport, required instrument still, reduced-motion end state. I refuse: iris-as-split-in-a-hole, orbit-as-marketing-column, kinetic-as-pills-under-type, deleting chapter-scroll.

4. **Theater-with-an-object stays.** Sceptical CD may veto mesh, particles, custom cursors, loaders-as-scenes, HDRI. CD may not veto the hole, the flaps, the lock, the aimed plate, or the chaptered object. Quiet variants already exist for quiet briefs.

5. **Material tokens; Heliograph is a preset.** `--nx-elev / --nx-line / --nx-metal / --nx-cool` stay. FE may add `--nx-accent-fg` and `--nx-ring`. FE may not use `#07060b` / `#f3ead8` / `#ff4d1c` as CSS fallbacks — that *is* Heliograph baked in. Unset = `inherit` / `currentColor`. Paper and Clinical must look like daylight. If a hero only works in Heliograph, it is a flagship demo, not a library variant.

---

## Concessions (so we can ship)

- Headline (or the object that *is* the title) is readable in the first viewport at 375. Aperture may be partly closed; the way through is not.
- `prefers-reduced-motion: reduce` → end state. Open iris. Settled glyphs. Instrument still. Chapter stills, no pin. No WebGL loop.
- WebGL only in `instrument-plate`, lazy, clipped, paused off-screen, `dpr` clamp, required `fallback`.
- No Helio / Nexara / Lamp / Harbor / default prices / default logos in the kit file. Demo copy lives in docs.
- Empty media does not invent chrome. A labelled well is allowed where the object has a void (aperture hole, plate, clipped window).
- One motion idea per variant. Lenis is not a Hero dependency.
- Grain is optional overlay, not identity.
- I will not demand 320vh as the aperture paste. Scroll-open is opt-in on aperture; chapter-scroll is the pinned piece.
- Docs thumbs at 375 / 768 / 1280 **per variant**. BASIC objects get the first three shots in review, not only the iris.

---

## Acceptance (visual)

- Eleven ids match the table. Silhouettes do not rhyme at 1280.
- Tokens only; Heliograph is a preset demo wrap. Paper and Clinical stills exist for at least editorial-split, magazine-folio, terminal, prompt-well, aperture.
- No `#8b7cff`, no mesh, no traffic-light default, no `align`.
- Aperture still at frame 0 shows object **and** sentence (Round 1 gate).
- Instrument-plate still is a plate, not a marketing split.
- Type-mass still crops or collides with the edge; it does not sit in a padded column.
- Flip-board is a wall of cells; card-fan is a pile; folio has a gutter; editorial has a register cut; terminal has a bezel; prompt-well is a trough; clipped-mask has crop marks.
- Chapter-scroll’s object is not the iris and not the letters.

Stop. Do not add a twelfth. Do not “just put split back as BASIC 1” to soothe paste-rate. If paste-rate needs a quiet default, it is `editorial-split`.
