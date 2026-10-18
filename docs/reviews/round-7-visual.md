# Round 7 — visual

**From:** [Visual designer critic](https://cursor.com/agents/bc-d5d4a6f8-a618-56e4-9ca6-689558025919)  
**Scope:** the wow-signature pass on `cursor/visual-quality-overhaul-3ef7` (`22635c5`). Not a leftover-chrome review. Not a merge.  
**Evidence:** live docs at `127.0.0.1:5173`, dark theme, element captures in `docs/audit/round-7/`. Source: `src/lib/wow.tsx`, `src/components/ui/wow-*.tsx`, `WOW_VARIANTS` in `wow-signatures.tsx`. Research bar: `docs/research/wow-benchmark.md`. Round 6 photographic leftovers in `docs/audit/round-6/` are the control group.  
**Bar:** a designer screenshots the cell next to a top 21st.dev / Aceternity / Awwwards entry and is not embarrassed. If a critic can call it “normal,” it is not a signature.

## Verdict

**REJECT ALL**

The gold Signature chip is a lie. This pass shipped **46 families × 187 signature ids** by restickering about a dozen primitives (`ShaderMesh`, `ParticleField`, `GlobeField`, `OrbitRing`, `TiltGlare`, `ScrambleText`, `Odometer`, `PathDraw`, `LiquidFilter`, `ScrollPin`, `WowStage`) onto dark rounded rectangles. The owner said the library looked general and normal. The response was to industrialize general and normal, then label it Signature.

I sampled the requested flagships live. None survive the still test. I am not signing a subset. A subset would imply two or three cells are gallery-ready. They are not.

## 21st.dev / Aceternity / Awwwards test

**Fail. Embarrassed.**

Put `hero / shader-void` next to a 21st.dev shader hero and you have an FBM iris/teal cloud, a gold tracked eyebrow, Instrument Serif, a white pill, and a Pause chip. That is 2023 WebGL wallpaper with SaaS type on it. Put `hero / globe-orbit` next to Magic UI Globe + Orbiting Circles and you have the student remix: a Fibonacci dot sphere, dealer names rotating on their sides, copy colliding with the globe. Put `hero / morph-stage` next to an Awwwards shared-element mast and you have a serif **N** that becomes a clipped Three.js icosahedron in a gold torus — the default `icosahedronGeometry` from every R3F starter. Put `pricing / tilt-glare` next to Stripe Billing or Aceternity’s 3D cards and you have three empty plan tiles that all say “The number ticks. The featured plate is a field.”

The Round 6 *sensible* cells are more honest than these signatures. `spotlight-card / product` is a lamp on travertine. `app-shell / agency` is a desk with 24 / 7 / ₹86L and named activity. The Signature replacements for those anatomies are an empty black well labelled Lamp 04, and a two-column shell whose headline is the variant id.

I would not post any gold cell I captured. I would post the Harbor cinema still, the lamp, or the North OS desk, and I would take the Signature chip off this pass before a designer saw it.

## What this pass actually is

A trick menu, not a catalogue of finished objects.

| Trick | Named signature ids | What it looks like on the docs site |
| --- | --- | --- |
| `OrbitRing` | **21** (`orbit-badge`, `orbit-nav`, `orbit-quotes`, `orbit-wip`, `analog-orbit`, `hex-orbit`, `orbit-pills`, `command-orbit`, …) | Identical black well, three-to-six glass chips rotating, labels on their sides, often clipped (`At`, `setoN`, `Me`, `6'66`) |
| `ShaderMesh` | **16** (`shader-void`, `shader-clinic`, `shader-well`, `shader-row`, `liquid-glass`, `shader-featured`, …) | One purple-teal FBM blob. Clinic, void, aurora, and news magazine are the same screenshot with different captions |
| `ParticleField` | **14** | White dots + faint links on `#07070c` |
| `liquid-*` | **15** | Two goo circles, a blur smudge, a left rule, or nothing |
| `scramble-*` | **12** | Hover letter salad on the same serif/mono |
| `glare-*` | **13** | `TiltGlare` on a card that has no product in it |
| `morph-*` | **13** | `layoutId` on empty chrome, or a letter that becomes a mesh |

Magic UI’s index is “one trick, finished.” This pass is **one trick, unfinished, applied 21 times**, then sold as 187 signatures. Distinctness between families is the chip label.

## Flagships (the ones that were supposed to wow)

### Heroes

**`hero / pin-scroll`** — Fail. The plate is the same shader blob, not media. At 0% it sits as a small rounded rectangle *under* the headline, so “The hero is **the transition**” is occluded by the field. A `0%` debug counter lives in the corner. Apple pin+scrub is a still or a film that *is* the page. This is a card demo that asks you to “Keep scrolling” through 240vh of docs gallery so a blob can get larger.

**`hero / shader-void`** — Fail. Full-bleed FBM. Caption admits the trick: “A WebGL mesh that follows the pointer.” The still is Unicorn Studio 2021. Pause is the most designed object on the frame. 390 is the same blob, taller.

**`hero / scramble-mast`** — Fail as a hero. `HOLD THE MAST` is the only type-led still that has a pulse, and it still wastes the right 60% as dead `#07070c`. The scramble line under it restates the title in 14px grey. No image, no second material, no reason to screenshot it next to a kinetic type piece on 21st.dev.

**`hero / globe-orbit`** — Fail. Magic UI globe. Orbit chips for Kite / Solum / Nimbus / Vale sit on their sides and clip (`Nim`). Pitch collides with the sphere. Pause again.

**`hero / morph-stage`** — Fail, and the worst hero. Closed: a grey rounded rect with a single **N**. Open: a purple icosahedron and a gold ring, cropped by the card so the mesh is a pentagon floating in a void. That is a Three.js example, not a shared-element mast. A designer would close the tab.

### Buttons

**`button / liquid`** — The goo blobs sit *on* the word Continue. Iris and teal merge across the glyph. Unreadable CTA. Not liquid glass. A filter demo.

**`button / ink-path`** — A 40px purple squiggle under Continue. It does not write the word. It looks like a stray underline.

**`button / glare`** — Black pill. No glare in the still. The “signature” is a box-shadow you already shipped on half the catalogue.

**`button / burst`** — Hover sprinkles a handful of dots *inside* the pill. Not a burst. A dirty button.

**`button / scramble`** — Purple pill, hover charset. Magic UI Hyper Text at 44px.

**`magnetic-button / shatter`** — Docs copy is honest and damning: “Tracking opens on hover.” The chip still says Shatter. Letter-spacing is not shatter. The still is a black pill that says `shatter`.

**`magnetic-button / orbit-pull`** — The control label wraps to `bi / t- / p` inside a white circle. Satellites are a plus, an N, and a grey tick. This would not pass an intern critique.

### Cards / nav / pricing / stats / testimonials / footer / modal / tabs / accordion / backgrounds / kits

**`spotlight-card / glare-tilt`** — “Lamp 04” over an empty black rounded well. Round 6 `spotlight-card / product` is the lamp on travertine at $220. The Signature is a regression with a gold chip.

**`spotlight-card / orbit-badge`** — `Live`, `NYC`, and a rotated `99.9` that reads as `6'66`. No card, no badge, no product.

**`floating-navbar / magnetic-pill`** — Three words in a glass stadium (`Nexara Work Notes`). 2023 Aceternity floating nav, unfinished. No current state, no CTA, no blur over real content.

**`floating-navbar / orbit-nav`** — Work / Notes / Atlas as clipped rotating chips (`At`, `setoN`). Navigation you cannot read. Not a nav.

**`pricing / tilt-glare`** — Hobby $0 / Studio $48 / Desk $110. Same caption on every tile, including the free one. No features, no period, no recommended state, no glare in the still. This *is* generic SaaS chrome.

**`pricing / shader-featured`** — Same three tiles; the middle one gets the blob. A gradient is not a featured plan.

**`stats / odometer`** — The only cell that attempts a finished trick, and the columns are broken. Digits stack and collide (`1700` as overlapping 1/7, `0950` as a pile, `42` with a stray dash). An odometer that cannot clip a digit is not shippable.

**`stats / orbit-ring`** — Numbers as OrbitRing. Same screenshot as the nav, the kanban, the footer.

**`testimonials / wall-parallax`** — Three quote cards, no portraits, no depth. Round 6 had Anitha’s face. Signature stripped the people and called the leftover “parallax.”

**`testimonials / orbit-quotes`** — `Anitha`, `Kiran`, `Me` on a ring. No quotes. Names upside down. This is not a testimonial component.

**`footer / giant-marquee`** — `NEXARA NEXARA NEXARA` at display size. Every 2024 agency site. Pause sitting on the tape. Composition exists. Taste does not.

**`footer / orbit-marks`** — Legal / Press / Notes / Work on the same ring. A sitemap you have to decode while it spins.

**`modal / liquid-sheet`** — Two overlapping circles (iris + teal) and the words “Liquid sheet,” rendered twice because the gallery cell and the “Open live” demo are the same dummy. Not a sheet. Not a modal. A Venn diagram.

**`modal / shared-morph`** — An **N** in a rounded square and a paragraph that describes a morph you cannot see. No trigger pair in the signature preview.

**`tabs / liquid-ink`** — A faint purple bloom under Rooms. Standard tabs. Helper copy is docs-voice: “Rooms stays in the room. The ink morphs; the panel does not remount a new chrome.”

**`tabs / orbit-pills`** — Export / Library / Rooms on the ring. Tabs you cannot click because they are satellites.

**`accordion / shader-row`** — A FAQ. The mesh is invisible in the still. Questions are docs-meta (“Do I install a package?”, “Will this look normal?”). The Signature accordion is a normal accordion.

**`aurora-background / shader-mesh`** — The blob, again.

**`aurora-background / liquid-glass`** — The blob with a frosted lavender plate dropped on top. Label is the variant id `liquid-glass`. No refraction, no specular edge, no content. Apple liquid glass this is not.

**`grid-background / hex-orbit`** — No hex grid. `01`–`06` on the ring, plus the word `hex-orbit` in the corner as if the component had to caption itself.

**`kit / shader-clinic`** — Lumen Care’s photographic four-door hero replaced with the same blob as `shader-void`. Copy: “A shader field instead of a stock navy hero.” You deleted the clinic and kept the kicker.

**`kit / globe-agency`** — North Studio + the same globe. Copy: “A globe of rooms, not a logo strip.” Talking to the critic, not to a customer.

**`kit / pin-sports`** — Field Athletics on a black void. “Scroll scrubs the medal book. **0 events in view.**” A sports kit with no athlete, no venue, no medal. The honest sentence is already in the lede.

**`kit / liquid-portal`** — Empty black, then “The desk after dark.” The 3D mast did not read. Round 6 agency OS had furniture. This has a kicker.

## Variants that still look normal (or worse than normal)

“Normal” is the owner’s word. These are normal, or they are broken toys wearing the word Signature.

Normal SaaS (would look at home on a 2023 Framer template):

- `pricing / tilt-glare`, `pricing / shader-featured`
- `floating-navbar / magnetic-pill`
- `button / glare`, `button / scramble`
- `tabs / liquid-ink`, `tabs / layout-morph`
- `accordion / height-morph`, `accordion / shader-row`
- `app-shell / morph-sidebar`
- `testimonials / wall-parallax`
- `cta-band / glare-band`, `cta-band / scramble-cta`
- `stats / odometer` (as a layout; the digits fail craft)
- `footer / giant-marquee`
- `hero / shader-void`, `kit / shader-clinic`, `aurora-background / shader-mesh` (one wallpaper)

Named as theatre, rendered as the same OrbitRing still (I captured seven; there are twenty-one):

- `floating-navbar / orbit-nav`
- `testimonials / orbit-quotes`
- `footer / orbit-marks`
- `tabs / orbit-pills`
- `kanban-board / orbit-wip`
- `countdown / analog-orbit`
- `app-shell / command-orbit`
- `stats / orbit-ring`
- `spotlight-card / orbit-badge`
- `bento-grid / orbit-tile`
- `grid-background / hex-orbit`
- `hero / globe-orbit`, `kit / globe-agency` (globe + the same chips)

Named as material, rendered as two circles or a blur:

- `button / liquid`
- `modal / liquid-sheet`
- `aurora-background / liquid-glass`
- `activity / liquid-chat` (two full-width stadiums, not bubbles)
- `badge / path-ribbon` (a 12px “Sale” and a pink squiggle)
- `magnetic-button / shatter`

Empty geometry sold as a scene (Round 3’s original crime, now with gold type):

- `spotlight-card / glare-tilt` (Lamp 04, no lamp)
- `hero / morph-stage` (N, then a clipped crystal)
- `kit / pin-sports` (0 events)
- `kit / liquid-portal` (void)
- `draggable-card / magnetic-stack` (`Sheet 3` on empty cards)
- `data-table / heat-cells` (twelve purple bars, no table)
- `modal / shared-morph` (N mark + a paragraph)

## Worst eight

Ranked by how fast I would close the tab if this were a 21st.dev thumbnail.

1. **`hero / morph-stage`** — A serif N that becomes a cropped icosahedron. The 3D object the pass added `three` for. Student demo. `docs/audit/round-7/hero-morph-stage.png`, `hero-morph-stage-open.png`.
2. **`floating-navbar / orbit-nav`** — Navigation as clipped, rotated chips. Unreadable. Not a bar. `floating-navbar-orbit-nav.png`.
3. **`testimonials / orbit-quotes`** — First names on a ring, no quotes, no faces. `testimonials-orbit-quotes.png`.
4. **`kit / pin-sports`** — “0 events in view” on a black rectangle, gold kicker Field Athletics. `kit-pin-sports.png`.
5. **`spotlight-card / glare-tilt`** — Lamp 04 as an empty well after Round 6 shipped the lamp. `spotlight-card-glare-tilt.png` against `docs/audit/round-6/focus-spotlight-product.png`.
6. **`modal / liquid-sheet`** — Two circles, labelled with the variant name, drawn twice. `modal-liquid-sheet.png`.
7. **`magnetic-button / orbit-pull`** — `orbit-pull` hyphenates into `bi / t- / p` inside the magnet. `magnetic-button-orbit-pull.png`.
8. **`pricing / tilt-glare`** — Three SaaS price cards with identical meta captions. The owner’s original complaint, gold-chipped. `pricing-tilt-glare.png`.

Honorable discards, same crime: `kanban-board / orbit-wip`, `tabs / orbit-pills`, `button / liquid`, `accordion / shader-row`, `data-table / heat-cells`, `activity / liquid-chat`, `badge / path-ribbon`, `countdown / analog-orbit`.

## What must change

Do not add a fifth orbit. Do not grade the blob. Do not keep 187 chips and “polish.”

1. **Strip the Signature chip from every cell that is a primitive remix.** If I can describe it as “OrbitRing with different strings” or “ShaderMesh with a kicker,” it is not a signature. That is most of `WOW_VARIANTS`.
2. **One finished object per family, not four demos.** Magic UI ships a Globe. It does not also ship Globe-as-nav, Globe-as-kanban, Globe-as-footer, Globe-as-countdown. Pick the family where the trick *is the product* and finish that object.
3. **Signatures are scenes.** Harbor stills, Lumen doors, Field athletes, North desk furniture. Layer the gesture *on the photograph*. `pin-scroll` must expand a real plate (cinema reel, lamp, villa), not an FBM card. `shader-clinic` cannot retire the clinic. `glare-tilt` cannot retire Lamp 04.
4. **Stop writing the technique into the UI.** “A media plate that grows from a card to a field.” “The number ticks. The featured plate is a field.” “Will this look normal?” “0 events in view.” If the component has to explain the trick, the trick is not visible.
5. **Name honesty.** Shatter must fragment. Liquid must refract. Hologram must carry a second image at an angle. Analog-orbit must be a clock, not the letters `d h m s`. Heat-cells must be a table. Liquid-chat must be bubbles, not progress bars. Path-ribbon must be a ribbon. If the implementation is letter-spacing, the id is `tracking`, and it is not a signature.
6. **Kill `OrbitRing` as a family substitute.** One orbital object in the whole library, finished (globe *or* logo cloud, not both and not twenty-one). Labels stay upright. They do not clip. They are not the component.
7. **One shader look is one background, not sixteen signatures.** If `ShaderMesh` stays, it is `aurora-background / shader-mesh`. It is not a hero, a kit, a modal veil, an accordion, a pricing featured plate, and a news magazine.
8. **Fix craft on anything that remains.** Odometer columns must clip. Pin-scroll type cannot collide with the plate. Liquid blobs cannot occlude the label. 3D mesh cannot render half outside the rounded rect. `240vh` pin tracks cannot dump a 21st.dev hero into a docs article and call the fold the product.
9. **The still test is mandatory before the chip goes back on.** Screenshot at 1440 and 390, next to a 21st.dev / Aceternity / Awwwards peer. If you would not post it, it is not a signature.

## Keep / redesign / replace

**Keep as Signature:** none. I will not launder `scramble-mast` or `giant-marquee` through a keep list so the next pass can say “visual approved the type cells.” They are closer than the orbit farm. They are still normal.

**Redesign (only if the family actually needs a theatrical object):**  
`hero / pin-scroll` (real media plate, no debug %, type clears the field), `hero / scramble-mast` (type that owns the viewport, not a left column on a void), `stats / odometer` (clip the digits, then maybe), `button / ink-path` (the stroke has to *be* the word). These are contracts, not approvals.

**Replace:** the orbit farm, the shader-as-every-family farm, the liquid-as-two-circles farm, the empty Lamp 04, the N-to-icosahedron hero, the sports kit with zero events, the modal that is a Venn diagram, the pricing tiles, the shatter-that-tracks.

Sensible variants from Rounds 4–6 stay. This pass was not supposed to delete them. Several signatures did, visually, by offering a gold-chipped void as the one you are meant to screenshot.

## Honest leftover

WebGL pauses. There is a Pause control. Reduced-motion is wired in the helpers. That is motion/a11y hygiene, not visual quality. A blob that pauses is still a blob.

I ran the docs site. I clicked Open the stage. I hovered burst, liquid, scramble, glare. I captured 390. The gold chip is on the cell. The cell is still general and normal, when it is not broken. Reject the signature pass.
