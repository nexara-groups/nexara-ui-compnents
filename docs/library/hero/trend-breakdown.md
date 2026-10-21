# Hero trend breakdown (visual references first)

Captured 2026-10-20 into `docs/library/hero/refs/`. Mix of live page screenshots and 21st.dev CDN preview stills. This is research, not a kit to port.

## Diagnosis of the failed Helio heroes

Verified against `docs/library/proof/hero-*.png` and `src/docs/library-demos.tsx`.

The previous family was one art direction (ivory serif on brown-black) plus a `Plate` placeholder: a gradient and a circle labeled MEDIA. `hero / still` is an empty dusk fade. `hero / command` is a headline, a barren field, two orange pills. `hero / iris` is a radial fan with no photograph inside it. Next to 21st.dev trending cards they read as empty dark canvases. The critics approved mechanisms, not pictures.

## What the references actually look like

| Cluster | Examples | Why it feels rich |
| --- | --- | --- |
| Product in the fold | `21st-hero-section-1.png`, `21st-hero-195.png`, `linear.png`, `cursor.png`, `magicui-hero-video-dark.png` | A real inbox, admin dashboard, or editor fills 50–70% of the viewport. Named rows, charts, chrome. Not a circle. |
| Photography with type on top | `21st-prisma.png`, `21st-scroll-expansion.png`, `21st-hero-gallery.png` (fashion / collage / landscape cards) | A still with grain, light, and subject. Headline collides with the picture. Density from the image, not from UI chrome. |
| 3D object as product | `21st-futuristic.png`, `21st-spatial-product.png`, `21st-cdn-21-daiwiikharihar17147.png` | A rendered object with studio light, plus HUD controls. The object is specific (earbud, metaball, helix), not a generic icosahedron. |
| Light SaaS desk | `aceternity-home.png`, `21st-hero-195.png`, `framer-home.png` | Cream/white, soft shadow, dashboard or template grid. Full, not timid beige. |
| Glow / glass / aurora | `21st-shape-landing.png`, `21st-glow-horizon.png`, `21st-glass-trust.png` | Saturated light, glass panels, grain. Still usually paired with type *and* a product or landscape. Glow-only (horizon) is thin; we use it as atmosphere, not the idea. |
| Editorial / print | `21st-sakura-editorial.jpg`, gallery “Editorial Collage”, `anthropic.png` | Paper, folio, overlapping type, photography. Cream is a material, not a theme token. |
| Map / globe / data | `aceternity-github-globe.png`, `atlas` refs | Arcs, pins, a HUD. The globe is a surface for events. |
| Terminal / prompt | `21st-ai-input.png`, `perplexity.png`, `cursor.png` | The field *is* the product. File tree, diff, citations — not an empty search bar on void. |
| Cinematic / video | `21st-cinematic-landing.png`, `runway.png`, Magic UI video poster | Letterbox, grade, a still that feels like a frame. Autoplay mp4 is a perf trap; ken-burns + grain is the cheaper richness. |
| Neo-brutal / loud colour | Dribbble/Pinterest boards, 21st fashion cards | Thick rules, offset shadow, one punch colour, taped photos. Opposite of Helio restraint. |
| Cursor / spatial canvas | Figma, Linear, Field-type boards | Named pointers, comments, frames. The room is inhabited. |
| Scroll-pinned device | `21st-scroll-expansion.png`, Apple product pages, spatial showcase | The hero *is* the transition. Native sticky, not wheel hijack. |

## Recurring richness ingredients (use, don’t copy)

1. Visual density — something occupies the pixels (UI, photo, object). Empty ground fails.
2. Layered depth — glass over photo, type over still, cards over grid, grain over grade.
3. Real product imagery or mockups — inbox, dashboard, phone, laptop.
4. Glow / light — spotlight, aurora, rim light. Rationed, attached to an object.
5. Gradients — as atmosphere behind a product, not as the product.
6. Glass — frosted HUD chips over a photograph.
7. Grain — kills banding, sells cinema.
8. 3D renders — one object, studio lit, contained.
9. Bold type — 64–128px, colliding with media.
10. Colour — each language has its own palette. One muted brown-black family is how the last round died.

## Saturated (do not ship as the whole idea)

Centered sparkle stack. Mesh-as-hero. Hero Parallax row farms. Beams+grid with no product. Full-bleed shader wallpaper. Autoplay video. MacBook-lid scroll. Word-rotate as the whole hero. Helio ivory-on-void.

## Capture log

See `refs/manifest.json` for live page shots (Linear, Vercel, Cursor, OpenAI, Anthropic, Stripe, Awwwards, Framer, Magic UI, Aceternity, 21st galleries, Lapa, Dribbble, Pinterest, …). Additional 21st CDN stills are `refs/21st-*.png` and `refs/21st-cdn-*.png`. Count on capture day: 55/58 live shots plus 24+ CDN stills (well over 40 unique frames).
