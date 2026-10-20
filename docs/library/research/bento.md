# Bento — research moodboard (2025–2026)

Inspiration only. No layout, type, or motion is copied. This is a **section** family (feature / bento), not item chrome on `src/components/ui/bento-grid.tsx`. Local stills from the earlier flagship pass live in `docs/flagship/references/`.

## Sources opened this pass

| Source | What was actually looked at |
| --- | --- |
| 21st.dev `/community/components/s/bento` | 55 cards. Recurring: Feature Bento (hero + stats + CTA, Jul 2026), Stats Bento (Aug 2026), Bento Specs Grid (1px gap, glass, ambient glow, Dec 2025), Magnified Bento, Infinite Bento Pan, Ink Orbit live-diagram features, TerminalBento, Interactive Gallery, Swapy drag, Bento Monochrome, Holographic / Cybernetic / Colorful (saturated). |
| 21st.dev `/@kedhareswer/components/ink-orbit-features` | Working diagrams in cells: hub-and-spoke edits, one-at-a-time integrations sync, scrubbable forecast. Zero-dep, light/dark. The tile *is* the proof. |
| Aceternity `/components/bento-grid` + `/blocks/bento-grids` | Skewed mosaic, header slot, `md:col-span-2`. Blocks: illustrations, symmetric, three-column images, masonry-with-images, **Bento Grid With Skeletons** (chat, video-call, avatar drift, mentor marquee — six loops at once). Docs: 4–7 cards, one hero ~2×, DOM order = reading order, lazy-mount skeletons. |
| Magic UI `bento-grid` (docs, Oct 2026 demo) | `BentoCard` requires `name`, `description`, `Icon`, `href`, `cta`, `background`. Demo tiles: file marquee, AnimatedList, AnimatedBeam, Calendar. Vertical named-area variant. Widget cells are the 2026 bar; the required-icon API is a smell. |
| Apple product pages 2025–26 | iPhone 17 / 17 Pro / Duo, MacBook Pro M5, MacBook Air M5, OS highlights. Pattern is **Get the highlights** (equal proof cells, film + still) then **Take a closer look** (controlled inspection — Duo fold slider). Liquid Glass is a material language, not a tile recipe. Older iPhone 15 Pro keynote bento (dense charcoal, one “Titanium” hero) is still the citation everyone clones. |
| Awwwards elements | Artone Studio features bento; Cloud 7 SaaS mosaic; Primer.io / Payment Pioneers blur-fintech; Tot illustrated product cards; RTL Layout hover-bento. SOTD rooms still win when objects do not share one radius. |
| Godly / Recent | `godly.website` redirects to recent.design (discipline, not section). `godly.design/sections` still lists Feature cards. One Page Love: 90 live bento sections. Made on Web: Clay, Mintlify, Circle, Bee, Huly — product UI in the cell, not Lucide. |
| Pinterest / Dribbble / Behance 2025–26 | Pinterest: dark Framer kits, Bentolio “personal dashboard,” cream editorial counter. Dribbble: Frameblox kits, Rive-in-cell (autoplay on mobile), UI8 “Bento Cards v2: AI,” QClay / Keitoto fintech mosaics. Behance: Sight Platform cyber-SaaS, SynUP presentation grids, glass portfolio dashboards. |
| Stripe / Linear (2026 write-ups + local stills) | Stripe: light capability windows, pastel wash, one lead span, UI fragment per cell. Linear: dark, dense, screenshot-only — no icons. |
| Existing local captures | `docs/flagship/references/{21st,21st-trending,aceternity,magicui,awwwards,godly,apple,apple-iphone,linear,stripe,anthropic,clerk}.png`. Flagship desk: `docs/flagship/proof/section-bento-desk.png`. |

## Named trends

1. **Working-widget cell** — the tile is a demo (calendar, list, beam, live diagram). Magic UI; Ink Orbit (2026).
2. **Ranked span** — one cell ~2× the others; 4–7 cards; size = importance. Aceternity; Stripe.
3. **Highlights reel** — equal proof cells, film-strip not mosaic. Apple “Get the highlights” 2025–26.
4. **Closer-look instrument** — one cell is a control onto *their* media. Apple “Take a closer look”; Duo fold slider.
5. **Hover reweight** — magnify or rearrange on pointer. 21st Magnified Bento; Hampton expand; Motion shared-element expand.
6. **Skeleton scene farm** — six looping mini-UIs. Aceternity skeletons. Saturated as a default; useful as one optional slot.
7. **1px-gap glass specs** — hairline mosaic, ambient glow, frosted plates. Bento Specs Grid, Dec 2025. Saturated.
8. **Camera-pan wallpaper** — a vignette drifts across an oversized grid. Infinite Bento Pan. Not a section.
9. **Desk of objects** — instruments on a plate; they do not share a radius. Flagship live-bento; Awwwards rooms.
10. **Bentolio / personal dashboard** — portfolio as a bento of self. Pinterest / Dribbble 2025–26. Wrong job for a product feature section.

## Saturated — do not ship

Generic **2+4+2** Lucide cards. Glow borders. Pointer spotlight wash. Glass + 1px white + radial bloom. Mesh/aurora as the tile. Holographic / cybernetic / “colorful” farms. Infinite pan. Required `Icon` + `href` + `cta`. Same blurb poured into different spans. Dark navy + violet mesh. Industry costumes (SaaS window, AI beams, `$48/mo`). Autoplay Rive/mp4 in every cell. Fade-up stagger on the whole mosaic. Masonry with a ragged bottom (gallery family). Draggable swap as the idea. Helio desk furniture as defaults.

## Library-useful (finite props, reduced-motion end state)

Ranked mosaic (empty tile omits chrome). Highlights reel. Paper sheet. Evidence wells. Optional dock instruments, paused offscreen. Index + shared stage. Figure-as-cell. Shared-element expand with a dialog fallback. Closer-look control. Desk with empty slots. Reflow that becomes a static mosaic under `prefers-reduced-motion`.
