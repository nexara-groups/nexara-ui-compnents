# Flagship benchmark

Research pass for the Helio / Heliograph work. Screenshots live in `docs/flagship/references/`. Captured 20 October 2026 with headless Chrome at 1440×900, 8s virtual time. Raycast and Resend timed out; locomotive, Vercel, and the iPhone product page returned near-empty first paints (cookie walls or late hydration). Those three were supplemented with live fetches. The four Nexara agency sites are a **quality floor only**. Nothing was traced or copied from them.

The previous library pass failed because it looked like a generic dark kit: centered headline, two pills, glass cards, timid motion. The sites below do not do that. Each note is specific about *why* the page feels expensive.

## How the bar was read

Every reference was scored on the same nine axes the brief asked for:

1. Layout composition
2. Type scale
3. Spacing rhythm
4. Colour and lighting
5. Depth
6. Texture
7. Micro-interaction
8. Motion choreography
9. Functional depth

A piece is “premium” when at least four of those are doing unexpected work, and none of them are accidental.

---

## 1. Linear — linear.app

**Screenshot:** `references/linear.png`

Linear’s homepage is a product, not a poster. A short, slightly awkward headline sits in a huge black field. Under it, a real issue view: sidebar, activity, properties, cycle chip. The marketing site and the app share a species.

- **Layout:** Type is a thin band. The UI is the composition. The mock is not in a fake browser chrome with traffic lights; it is the app, cropped, on void.
- **Type:** Tight grotesque, large but not screaming. Tracking is slightly negative. The lede is one quiet sentence.
- **Spacing:** Massive top rest, then a sudden density inside the app frame. That contrast is the rhythm.
- **Colour / light:** Near-black, white type, almost no accent on the first screen. Colour lives *inside* the product (status dots, avatars).
- **Depth:** One plate. No stacked glass.
- **Texture:** None. The luxury is the absence.
- **Micro:** Hairline dividers, 11px meta, icon buttons that look like they work because they are the real ones.
- **Motion:** Fast. The site itself is the demo of “designed for speed.”
- **Function:** The hero is a working-looking issue. That is the argument.

**Steal the principle, not the look:** give the product more pixels than the pitch. Our cinematic hero must end on a real instrument, not an abstract blob.

## 2. Stripe — stripe.com

**Screenshot:** `references/stripe.png`

- **Layout:** Sentence-as-hero, left-weighted, with the famous gradient occupying the right third like a physical object.
- **Type:** A full paragraph, not a three-word fragment. Specificity (“from your first transaction to your billionth”) does the selling.
- **Spacing:** The logo rail is a hard horizontal rule under the hero. Sections never repeat a layout twice in a row.
- **Colour / light:** White paper, slate type, one violet CTA. The gradient is lighting, not decoration — it behaves like a draped silk under a window.
- **Depth:** Flat page, deep light. Depth is in the gradient’s volume.
- **Texture:** Soft banding, no grain. The smoothness is the point.
- **Micro:** Tiny footnote marks, dual CTAs with different weights.
- **Motion:** The gradient idles. It does not shout.
- **Function:** Pricing, calculators, and product map further down. The homepage is a system.

**Principle:** vary section hats. After a cinematic void, do not put another cinematic void.

## 3. Vercel — vercel.com

Fetch, 2026 homepage: two words (“Agentic Infrastructure”), dual CTA, then case-study bands with operational numbers.

- **Layout:** Confidence through emptiness. Only works because the audience already knows the category.
- **Type:** Huge, few words.
- **Spacing:** Hero is a pause. Proof is the next breath.
- **Colour / light:** Atmospheric glows, dark, restrained.
- **Function:** Dual door — self-serve and sales.

**Principle:** we have not earned two-word minimalism. Helio uses a full sentence, Stripe-style, then proves it with the instrument.

## 4. Apple — apple.com

**Screenshot:** `references/apple.png`

- **Layout:** One idea per scroll. Product is a photograph, not an illustration. The hand holding the phone is the entire second act.
- **Type:** San Francisco, centered, tiny supporting line, then the object.
- **Spacing:** More leftover field than any SaaS site would dare.
- **Colour / light:** Studio white, then a hard cut to black for the next SKU. Lighting is photographic, not CSS.
- **Depth:** Real lens depth of field.
- **Texture:** Skin, glass, aluminium. Physical.
- **Motion:** Product pages are scroll-theatres. One object transforms.
- **Function:** Buy / learn. Nothing else on the first screen.

**Principle:** the cinematic hero is a product reveal. Scroll is a camera move. Generated photography must look lit, not “AI collage.”

## 5. 21st.dev — homepage

**Screenshot:** `references/21st.png`

- **Layout:** Centered library mast, then a horizontal tray of live component previews that peek from the edges. The tray is the product.
- **Type:** Large grotesque, one accent word in blue.
- **Colour:** Dark navy-black, not brown-black. Soft falloff behind the type.
- **Depth:** Preview cards sit on a darker stage and are cropped — they feel like they continue off-screen.
- **Function:** The cards are real interfaces (fluid demo, article, particle field).

**Trending shelf** (`references/21st-trending.png`) is a gallery of *finished pictures*: painted landscapes, editorial stills, a phone, a robot, a laptop saying “Unleash the power of Scroll Animations.” The pieces that trend are scenes, not buttons.

**Principle:** a flagship block must photograph well as a still *and* reward interaction. If it only works in motion, it will not trend. If it only works as a still, it is a poster.

## 6. Aceternity UI — ui.aceternity.com

**Screenshot:** `references/aceternity.png`

- **Layout:** Light paper, left copy, a masonry of product windows to the right. The library *is* a bento of sites.
- **Type:** Heavy grotesque headline, generous line length on the lede.
- **Colour:** White, black, one blue CTA. Colour lives in the preview cards.
- **Depth:** Soft stacked frames, slight scale differences, as if you are looking at a desk of sites.
- **Motion (known catalogue):** beams, macbook-scroll, dither shaders, 3D marquees, spotlight. The homepage itself is quieter than the components — a useful lesson. The wrapper is calm; the pieces are loud.
- **Function:** Live previews, not GIFs.

**Hero index** (`references/aceternity-heroes.png`) is a catalogue page: it is not itself a hero. Our docs can be a catalogue. The landing page cannot.

## 7. Magic UI — magicui.design

**Screenshot:** `references/magicui.png`

- **Layout:** Classic centered SaaS. Pill eyebrow, huge type, two CTAs, logo row.
- **Type:** Very large, tight leading.
- **Colour:** White, with a faint spectral wash behind the type and a purple announcement bar.
- **Motion:** The library’s value is in the components (globe, ripple, marquee), not this first screen.
- **Risk:** This is the template our last pass accidentally cloned. We will not.

**Principle:** Magic UI is a *shelf*. Helio is a *site*. The landing must not look like a component library homepage.

## 8. FORMAT — format.obys.agency (Awwwards SOTD, 19 Oct 2026)

**Screenshot:** `references/format-obys.png`

Black, white, and a word so large it is architecture. “FORMAT” is cropped into a single glyph landscape. Below, a white plate of taxonomy (Usage / Geometry / Perception / Balance) next to a pale image, and satellite dots.

- **Layout:** Type as object. The word *is* the hero media.
- **Type:** Custom grotesque, optical extremes, tight to the bleed.
- **Spacing:** A black sea, then a small scholarly block. Editorial, not product.
- **Colour:** Two inks. No accent.
- **Depth:** Flat, like a poster hung in a dark room.
- **Texture:** None — the crop is the texture.
- **Motion (from the live site):** format-aware transitions, physics, notes that behave like studio asides. Desktop-only and proud of it.
- **Function:** A teaching instrument about format. Every click changes the thesis.

**Principle:** our kinetic hero should treat letters as objects with mass. Crop is allowed. Scholarship in the margins (indexes, figure numbers) feels expensive.

## 9. Temper Studio — temper.studio (Framer Awards, Best Visual Design)

**Screenshot:** `references/temper.png`

- **Layout:** Full-bleed photograph, type in the optical center, one small green pill.
- **Type:** Friendly grotesque over a real image. The question is specific.
- **Colour:** The photograph *is* the palette. UI chrome is almost invisible.
- **Depth / texture:** Skin, glass, cider, a wooden handle. You can feel the weight.
- **Motion:** Quiet. The image does the work.

**Principle:** if you have a real object, get the type out of its way. Our generated instrument stills must be allowed to run full bleed.

## 10. Serve Robotics — serverobotics.com (Awwwards SOTD)

**Screenshot:** `references/serve-robotics.png`

- **Layout:** Product, then a line of type sitting on the ground plane of the photo. Nav is a ghost on the image.
- **Type:** One short sentence, huge, white, sitting in the lower-left like a caption burned into a still.
- **Colour:** The robot’s teal is the brand. It appears once in the object, not as a CSS gradient.
- **Depth:** Real sunlight, asphalt grain, plant blur in the foreground.
- **Function:** A hardware company that leads with the machine, not a feature grid.

**Principle:** brand colour belongs on a physical object first.

## 11. Anthropic — anthropic.com

**Screenshot:** `references/anthropic.png`

- **Layout:** Split mast. Huge underlined headline left, a paragraph right, then a full-bleed scientific photograph (a cell, a surface) as the next scroll.
- **Type:** Underlines as structure. The headline is a block of rules.
- **Colour:** Warm paper (`~#f6f3ec`) and black. The photo is a different world.
- **Spacing:** The paper field is a room. The photo is a cut.
- **Function:** Institutional, not playful. The luxury is seriousness.

**Principle:** we can afford one paper-coloured band (pricing or footer) against the void, so the night does not become a tunnel.

## 12. Cursor — cursor.com

**Screenshot:** `references/cursor.png`

- **Layout:** Short pitch, then the actual editor, large, with a painting for a wallpaper. The product is photographed in use.
- **Type:** Sentence case, no hero theatrics.
- **Colour:** Warm light paper. The painting inside the window supplies atmosphere.
- **Depth:** Window chrome, then document, then modal. Nested, like a real OS.
- **Function:** The screenshot is dense enough to study.

**Principle:** dashboard chrome should look like a tool someone left open, including imperfect content.

## 13. Paper — paper.design

**Screenshot:** `references/paper.png`

- **Layout:** Soft grey type on a dotted canvas, then a design tool with a code tree and a layout inspector. The hero *is* the canvas grid.
- **Type:** Lowercase, mid weight, almost shy — the UI below is louder.
- **Texture:** Dot grid as paper. This is the good version of a grid background: it is the product surface, not a hero wallpaper.
- **Function:** Inspector numbers, layer tree, play button. You believe you could grab a handle.

## 14. Runway — runwayml.com

**Screenshot:** `references/runway.png`

- **Layout:** Wordmark, then a black stage with a two-line claim. Cookie wall currently steals the third act, which is a lesson: never let chrome eat the hero.
- **Type:** Large, centered, confident.
- **Colour:** Black stage, white type, blue legal CTA (unwanted).
- **Principle:** full-bleed dark stages work when the next scroll is a *moving* image. Our orbital hero is that stage.

## 15. Framer — framer.com + Awards

**Screenshots:** `references/framer.png`, `references/framer-awards.png`

Framer’s own marketing is a product canvas. The Awards page is a gallery of sites that won for storytelling, interaction, animation, visual design — not for having more sections. 2025 winners (Asia Gawron, 27b, Trueform, Analogue / Vitra, Temper) share one trait: **one idea executed all the way down**.

**Principle:** depth over breadth is not a slogan. It is how those pages won.

## 16. Awwwards — awwwards.com

**Screenshot:** `references/awwwards.png`

A directory. Useful as a stream of current SOTD thumbnails (FORMAT among them). The site itself is not the bar; the winners are.

Current SOTD notes from fetches: FORMAT (Obys, experimental type + physics), Milledollars (restrained film palette, one colour `#E0DEE1`, loader as a scene), Ruinart Digital Fresco (WebGL/WebAR, heritage paper `#F8F3EE`).

## 17. Godly — godly.design

**Screenshot:** `references/godly.png`

A curator, not a product. The grid of sites is the point. Confirms the 21st.dev lesson: people collect *scenes*.

## 18. Family — family.co

**Screenshot:** `references/family.png`

- **Layout:** Centered pitch flanked by floating pictograms that behave like a cast.
- **Type:** Friendly, large, specific (“Your favorite crypto wallet”).
- **Colour:** Toy primaries on white. Joy as a system.
- **Motion (known):** the characters wander and react.
- **Principle:** characters can be a motion system. Our kinetic letters are our characters. We will not use cute stickers — wrong register — but we will give objects agency.

## 19. Raycast — raycast.com

Fetch (screenshot timed out). The page is a keyboard. The product *is* the launcher.

- **Layout:** Headline, then a hero that is an input.
- **Function:** Extensions, AI chat, snippets — demonstrated, not described.
- **Principle:** our dashboard command palette must feel like a product feature, not a modal demo.

## 20. Resend, Clerk, Next.js, OpenAI

Fetches and captures. Shared traits of the 2026 developer-tool home:

- Dark or paper, not both at once on the first screen.
- A live object (editor, API response, inbox).
- Logo proof immediately after the claim.
- Motion used to *explain* (request path, inbox arrival), not to decorate.

`references/openai.png`, `references/clerk.png`, `references/nextjs.png`.

## 21. Locomotive — locomotive.ca

Capture was thin (WebGL/unsupported path in headless). Known craft: scroll as director, sound, custom cursors, type that arrives in physical ways. They invented a lot of the “scroll-story” grammar we are using. We will use the grammar (pinned visual, advancing copy) with our own instrument — not their locomotive.

## 22. Bruno Simon — bruno-simon.com

**Screenshot:** `references/bruno-simon.png`

The portfolio is a playable 3D world. The capture is a reminder: WebGL is a *place*, and it must be obviously contained and obviously interactive. A canvas that just rotates a torus is a tutorial.

**Principle:** the orbital hero’s crystal must answer the pointer in a way you can demonstrate in a three-second clip.

## 23. Active Theory — activetheory.net

**Screenshot:** `references/active-theory.png`

Headless Chrome was told the browser is unsupported — which is itself a designed state (particles, a mark, a jellyfish). Even the rejection is a scene.

**Principle:** empty, loading, and unsupported states are part of the art direction.

## 24. Cosmos — cosmos.so

**Screenshot:** `references/cosmos.png` (late-hydrating). Cosmos is a visual bookmarking tool; the product is masonry with depth. Directly relevant to the testimonial wall.

## 25. Agency floor (do not copy)

These are the owner’s sites. They set the *standard of finish*, not the art direction.

| Site | File | What “finished” means here |
| --- | --- | --- |
| nexaragroups.com | `nexara-groups.png` | A 3D wordmark with real lighting, a constellation field, a floating pill nav, acid-lime as a physical accent. This is a *directed* dark page, not a kit. |
| risemedicalhub.com | `rise-medical.png` | Healthcare product polish, composed photography, clear IA. |
| sriengineeringworks.in | `sri-engineering.png` | Industrial credibility, dense real content. |
| vdrsa-portal | `vdrsa-portal.png` | Portal/product density. Tools, not posters. |

Helio must feel as considered as the Nexara Groups 3D mark — and look nothing like it. No lime. No chrome wordmark. No constellation of dots.

---

## Cross-cutting lessons (what we will actually build against)

| Axis | What the best share | What we will not ship |
| --- | --- | --- |
| Layout | Asymmetry, crop, one dominant object | Centered kit hero + two pills + orb |
| Type | Optical extremes or full sentences | 40px “Build faster” |
| Spacing | Long rest, then a dense cluster | Even 64px stacks |
| Colour | One accent, born on an object | Purple-orange mesh |
| Lighting | Photographic key + rim | Flat fills |
| Depth | One plate, or real lens DOF | Infinite glass |
| Texture | Grain, metal, paper, skin | Clean vector void |
| Micro | 11px meta, working chrome | Hover-lift as the only trick |
| Motion | One idea, fully followed | Six easings, no story |
| Function | The hero *does* the product | Lorem cards |

## Strongest references per flagship piece

| Piece | Primary refs (study, do not copy) |
| --- | --- |
| Cinematic hero | Apple product pages, Serve Robotics, Temper, Linear |
| Orbital / WebGL | Bruno Simon, Active Theory, Ruinart fresco, 21st Spline/3D tiles |
| Kinetic type | FORMAT / Obys, Anthropic underlines, Family (objects with agency) |
| Navbar + mega | Stripe mega, Linear ghost nav, Apple global |
| Scroll story | Apple one-idea-per-scroll, Locomotive grammar, Linear chapters |
| Live bento | Stripe product map, Paper canvas, Aceternity masonry, Linear intake |
| Pricing | Stripe pricing architecture, Linear/Vercel dual CTA honesty |
| Testimonials | Cosmos masonry, 21st 3D/column walls, Temper photography |
| Dashboard | Linear app, Cursor editor, Paper inspector, Raycast command |

## Honest note on captures

Headless Chrome rasterises late-hydrating and WebGL sites poorly. FORMAT, Linear, Stripe, Apple, Temper, Serve, Anthropic, 21st, Aceternity, Paper, and Nexara Groups are trustworthy stills. Vercel, Locomotive, Raycast, Resend, and Active Theory were read from fetches plus partial frames. The critic panel will compare our pieces to these files *and* to the live URLs when a still is incomplete.
