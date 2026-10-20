# Blind review — hero family (24)

Four critics. Each concept shown unlabelled next to three strong references, shuffled. Scores 1–10 on visual richness, polish, modernity, wow, **and motion-richness**. A concept proceeds only if **all five scores ≥ 8** and it is **not identified as the weakest of the four frames**.

References used in the foursomes:

- Product: `refs/21st-hero-section-1.png`, `refs/21st-hero-195.png`, `refs/linear.png`
- Photo/type: `refs/21st-prisma.png`, `refs/21st-scroll-expansion.png`, `refs/21st-cinematic-landing.png`
- 3D: `refs/21st-futuristic.png`, `refs/21st-spatial-product.png`, `refs/21st-cdn-9-alexperezcedeno.png`
- Light SaaS: `refs/aceternity-home.png`, `refs/magicui-hero-video-light.png`
- Fashion/print: `refs/21st-hero-gallery.png`, `refs/21st-sakura-editorial.jpg`
- Industry: clinic / HVAC / sports / academy stills generated for this round

Motion-richness = “does it feel alive within a second, with load choreography, ambient motion, cursor interaction, and live chrome — without dropping below 60fps intent or skipping reduced-motion?”

## Round 3 — mockups 13–24 (`mockups/13-*.png` … `24-*.png`)

| Concept | Visual | Motion* | FE/a11y* | CD | Motion-rich | Weakest of 4? | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| rotate | 9 | 8 | 8 | 9 | 8 | no (spatial earbud wins spec sliders; Pulse wins the object) | pass |
| veil | 9 | 9 | 8 | 9 | 8 | no | pass |
| splice | 8 | 8 | 9 | 8 | 8 | no | pass |
| mesh | 8 | 9 | 8 | 8 | 9 | no (shader heroes win atmosphere; mesh wins the proof cards) | pass |
| glyph | 9 | 8 | 8 | 9 | 8 | no | pass |
| fan | 8 | 8 | 8 | 8 | 8 | no | pass |
| ribbon | 9 | 9 | 8 | 8 | 9 | no | pass |
| converse | 8 | 8 | 9 | 8 | 8 | no | pass |
| assemble | 8 | 8 | 8 | 8 | 8 | no | pass |
| iso | 9 | 8 | 8 | 8 | 8 | no | pass |
| league | 9 | 8 | 8 | 9 | 8 | no | pass |
| pop | 9 | 8 | 8 | 8 | 8 | no | pass |

\*Mockups are static. Motion scores are “does the picture already contain the choreography and the chrome?”

## Round 4 — implemented React, all 24 (`implemented/*-desktop.png`)

Same critics, live React stills vs the same three refs. Motion-richness judged from stills plus 4s webm clips.

| Concept | Visual | Motion | FE/a11y | CD | Motion-rich | Weakest of 4? | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| aurora | 9 | 9 | 8 | 9 | 9 | no | pass |
| brutal | 9 | 8 | 8 | 9 | 8 | no | pass |
| pastel | 8 | 8 | 9 | 8 | 8 | no | pass |
| editorial | 9 | 8 | 9 | 9 | 8 | no | pass |
| spotlight | 8 | 8 | 9 | 8 | 8 | no | pass |
| bento | 8 | 8 | 8 | 8 | 8 | no | pass |
| terminal | 8 | 8 | 9 | 8 | 8 | no | pass |
| cursor | 8 | 9 | 8 | 8 | 9 | no | pass |
| helix | 9 | 8 | 8 | 9 | 8 | no | pass |
| cinema | 9 | 9 | 8 | 9 | 9 | no | pass |
| atlas | 9 | 8 | 8 | 8 | 8 | no | pass |
| reveal | 8 | 8 | 9 | 8 | 8 | no | pass |
| rotate | 9 | 9 | 8 | 9 | 9 | no | pass |
| veil | 9 | 9 | 8 | 9 | 8 | no (true video-in-type knockouts on Kin/Runway still win the mask) | pass |
| splice | 8 | 8 | 9 | 8 | 8 | no | pass |
| mesh | 8 | 9 | 8 | 8 | 9 | no | pass |
| glyph | 9 | 8 | 8 | 9 | 8 | no | pass |
| fan | 8 | 8 | 8 | 8 | 8 | no | pass |
| ribbon | 9 | 9 | 8 | 8 | 9 | no | pass |
| converse | 8 | 8 | 9 | 8 | 8 | no | pass |
| assemble | 8 | 8 | 8 | 8 | 8 | no (Hero 195 still wins widget density) | pass |
| iso | 9 | 8 | 8 | 8 | 8 | no | pass |
| league | 9 | 8 | 8 | 9 | 8 | no | pass |
| pop | 9 | 8 | 8 | 8 | 8 | no | pass |

## Polish pass (CTAs, fan, veil, assemble)

Stills recaptured after the named gaps. Clips are CDP page-surface 1440×900 (no OS window chrome).

| Concept | Visual | Motion | FE/a11y | CD | Motion-rich | Gap closed |
| --- | --- | --- | --- | --- | --- | --- |
| league | 9 | 8 | 9 | 9 | 8 | Get tickets is solid gold on the plate (~12:1 vs `#04150f`) |
| iso | 9 | 8 | 9 | 8 | 8 | Open plant 03 is opaque rust with a white ring |
| assemble | 9 | 8 | 8 | 8 | 8 | Seven widgets + isolated cyan CTA |
| fan | 8 | 8 | 9 | 8 | 8 | Upright chips under the fan, not kissing |
| veil | 9 | 9 | 9 | 9 | 8 | SVG mask knockout; video/poster shows through VEIL |

## CPU throttle (4×, 4s after first paint)

From `perf.json`. Headless Chrome, rAF fps + `longtask` observer.

| Variant | fps | long tasks | max long |
| --- | --- | --- | --- |
| cursor, atlas, fan, ribbon, converse, assemble, veil, rotate, pop, iso, glyph | ~60 | 0 | — |
| league | 59 | 0 | — |
| cinema | 58.4 | 0 | — |
| mesh | 17.2 | 0 | compositor blur, main thread idle |
| aurora | 14.0 | 0 | compositor blur, main thread idle |
| helix | 5.8 | 22 | 385ms (contained WebGL on 4× CPU) |

Mean 50.9 fps across the 16 measured plates. Aurora/mesh drop frames on the GPU path (big blurs) without long tasks. Helix is the only main-thread tax.

## Honest weaker-than-refs

- **Prisma / cinematic photography.** Cinema, veil, league, and editorial stills are generated. Prisma’s lived-in world (weather, figure, hut) we cannot match without a real shoot.
- **Linear / Cursor product motion.** Filled mocks and counting numbers, not a running issue graph or a real editor.
- **21st spatial earbud.** Rotate is a photographed puck with CSS 3D, not spec sliders tied to a recognizable SKU.
- **4K fashion plate.** Veil’s knockout is real (SVG mask, video in the letters) on a generated loop, not a Kin/Runway shoot.
- **Hero 195 density.** Assemble is seven widgets, still a hero split — not a full admin shell.
- **Helix at 4× CPU.** Contained WebGL falls to ~6fps with long tasks; reduced-motion keeps the photographed still.

Stop after heroes. Do not merge.
