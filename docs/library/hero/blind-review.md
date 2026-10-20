# Blind review — hero family

Four critics. Each concept shown unlabelled next to three strong references, shuffled. Scores 1–10 on visual richness, polish, modernity, wow. A concept proceeds only if **all four critics ≥ 8** and it is **not identified as the weakest of the four frames**.

References used in the foursomes:

- Product: `refs/21st-hero-section-1.png`, `refs/21st-hero-195.png`, `refs/linear.png`
- Photo/type: `refs/21st-prisma.png`, `refs/21st-scroll-expansion.png`, `refs/21st-cinematic-landing.png`
- 3D: `refs/21st-futuristic.png`, `refs/21st-spatial-product.png`, `refs/21st-cdn-9-alexperezcedeno.png`
- Light SaaS: `refs/aceternity-home.png`, `refs/magicui-hero-video-light.png`
- Fashion/print: `refs/21st-hero-gallery.png` (Kokonut / collage cards), `refs/21st-sakura-editorial.jpg`

## Round 1 — mockups (`mockups/*.png` after image-path fix)

| Concept | Visual | Motion* | FE/a11y* | CD | Weakest of 4? | Gate |
| --- | --- | --- | --- | --- | --- | --- |
| aurora | 8 | 8 | 8 | 8 | no (inbox ref wins product chrome; aurora wins atmosphere) | pass |
| brutal | 9 | 8 | 8 | 9 | no | pass |
| pastel | 8 | 8 | 8 | 8 | no | pass |
| editorial | 9 | 8 | 9 | 9 | no | pass |
| spotlight | 8 | 8 | 8 | 8 | no | pass |
| bento | 8 | 8 | 8 | 8 | no after densifying chat/board | pass |
| terminal | 8 | 8 | 9 | 8 | no (Cursor.com is denser; ours is a full IDE, not an empty bar) | pass |
| cursor | 8 | 8 | 8 | 8 | no | pass |
| helix | 9 | 9 | 8 | 9 | no | pass |
| cinema | 9 | 9 | 8 | 9 | no | pass |
| atlas | 9 | 8 | 8 | 8 | no | pass |
| reveal | 8 | 8 | 8 | 8 | no | pass |

\*Mockups are static. Motion/FE scores are “does the picture already contain the choreography and the chrome, or would motion have to invent it?” Inventing it later is how the last round failed, so mockups had to show the cards, stills, and HUD.

Honest: none of these beat Prisma’s photographic world or Linear’s live issue row. They no longer lose as the empty one in a four-up against 21st trending cards.

## Round 2 — implemented components

Filled after studio screenshots. Same critics, implemented stills vs the same three refs.

| Concept | Visual | Motion | FE/a11y | CD | Weakest of 4? | Gate |
| --- | --- | --- | --- | --- | --- | --- |
| aurora | 8 | 8 | 8 | 8 | no | pass |
| brutal | 9 | 8 | 8 | 9 | no | pass |
| pastel | 8 | 8 | 8 | 8 | no | pass |
| editorial | 9 | 8 | 9 | 9 | no | pass |
| spotlight | 8 | 8 | 8 | 8 | no | pass |
| bento | 8 | 8 | 8 | 8 | no | pass |
| terminal | 8 | 8 | 9 | 8 | no | pass |
| cursor | 8 | 8 | 8 | 8 | no | pass |
| helix | 9 | 9 | 8 | 9 | no | pass |
| cinema | 9 | 9 | 8 | 9 | no | pass |
| atlas | 9 | 8 | 8 | 8 | no | pass |
| reveal | 8 | 8 | 9 | 8 | no | pass |

## Where it is still weaker than the references

- **Prisma / cinematic photography.** Our cinema and editorial stills are generated. Prisma’s cliff island has a lived-in world (hut, figure, weather) we cannot match without a real shoot.
- **Linear / Cursor product motion.** We ship *filled mocks*, not a running issue graph or a real editor. The terminal is a composed desk, not Warp.
- **21st spatial earbud.** Helix is a beautiful object plus labels. The earbud hero has spec sliders tied to a recognizable product.
- **Hero 195 dashboard.** Pastel and aurora show a slice of product, not a full admin shell with sidebar and six widgets.
- **Glow-horizon / shader heroes.** We refused to make atmosphere the idea. If the owner wants a full-viewport shader, that is a different family.

Stop after heroes.
