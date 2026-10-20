# Hero — structural audit

Product contract: [`docs/families/hero.md`](../families/hero.md). Front-end API: [`docs/families/hero-api.md`](../families/hero-api.md).

This family failed twice. Geometry variants rearranged one slot list. Industry variants baked twelve product pages into the component. The flagship Helio iris / orbit / kinetic pieces are a quality floor, not the kit.

## What a reuser is asking for

| Query | Job |
| --- | --- |
| `hero / split` | Claim beside proof. Default paste. |
| `hero / iris` | Aperture onto their media. CTA already hittable. |

Anything that cannot answer a job without saying “split, but the columns moved” is not a variant.

## Eleven variants (jobs, not costumes)

| Variant | Tier | Structural difference |
| --- | --- | --- |
| split | BASIC | Copy + media as peers. `mediaSide` is a prop. |
| stack | BASIC | Centered claim + CTA. Optional capped media below. |
| capture | BASIC | The control is the primary action. Form states. |
| video | BASIC | Poster + play. Dialog or href, not wallpaper. |
| frame | INTERMEDIATE | Cropped product UI gets more pixels than the pitch. |
| proof | INTERMEDIATE | Logos rail + optional quote. Static, not a marquee. |
| stage | INTERMEDIATE | Object + optional option picker. Not a PDP. |
| cover | INTERMEDIATE | Type as object: kicker, index, rule. |
| iris | ADVANCED | Contained aperture. Control-first; scroll opt-in. |
| orbit | ADVANCED | Optional WebGL plate with a required still. |
| kinetic | ADVANCED | Glyphs with mass **and** a CTA row. |

## Dead names (do not rebuild)

center, mast, statement, overlap, rail, band, asymmetric, stacked, index, bento, saas, download, logos, pricing, agency, commerce, event, search, dashboard, editorial, waitlist, cinematic-as-geometry.

Helio `CinematicHero`, `OrbitalHero`, `KineticHero` stay under `src/components/flagship/`.

## References (principles, not source files)

- Split / frame: Stripe sentence-as-hero; Linear product crop without fake traffic lights.
- Capture: search-led and invite-led first screens (Algolia-style, shadcn waitlist blocks).
- Video: Magic UI hero video dialog — poster and a play control.
- Cover: typographic studio headers, magazine covers — one job, not two variants.
- Iris: Apple / Serve / Temper product reveal. Scroll is a camera assistant. First paint still has a sentence.
- Orbit: pointer-consequential object (Bruno Simon as a floor). Canvas is a plate.
- Kinetic: FORMAT-adjacent type-as-object, with a way through.

Ideas are reimplemented. No source is copied. No Helio copy or hex is the library default.

Motion thesis (one idea per id, springs, reduced = end state, fights): [`hero-motion.md`](./hero-motion.md).
