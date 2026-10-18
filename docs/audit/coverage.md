# Catalogue coverage — remaining-component pass

**Date:** 18 Oct 2026  
**Branch:** `cursor/visual-quality-overhaul-3ef7`  
**Baseline:** visual overhaul approved on PR #2 (round-5 visual + sceptical lead).  
**Question:** which registry items did *not* get that cinematic / media-first pass?

This file is the audit. “Overhauled” here means the item was rebuilt with original bundled media, first-class `MediaFrame` slots, and the Geist / Instrument / light-dark bar. Variant *count* is not the same as that pass — every UI item already ships ≥10 structurally named variants.

## Method

- Source of truth: `registry.json` + `src/docs/variant-meta.ts`.
- Media-first signal: the item imports `@/lib/media.tsx` and ships photographic / lockup defaults.
- Partial: the item was in the expansion (heroes / buttons / sections / kits) but still has a named leftover.

## Already overhauled (media-first)

| Registry name | Variants | Notes |
| --- | ---: | --- |
| `hero` | 30 | Cinema reel, phones, journal, HVAC remote, labelled stills. |
| `team` | 12 | Photoreal portraits. |
| `case-study` | 12 | Case stills + pause + tabpanel. |
| `services` | 12 | HVAC / venue stills. |
| `testimonials` | 10 | Named faces + Harbor reel. |
| `avatar` | 10 | Photographic default. |
| `news` | 12 | Match film / sports reel. |
| `contact` | 12 | Branch / clinic stills. |
| `marquee` | 12 | Faces + pause control. |

## Partial — in the expansion, not at the media bar

| Registry name | Variants | Leftover |
| --- | ---: | --- |
| `logo-cloud` | 12 | Marks are six matching 80×80 glyphs. Dealer strip is thin. |
| `button` | 24 | Shimmer / beam / flow loop without a pause control. |
| `kit` | 12 | Composes blocks. `kit / portal` is furnished; isolated shells are not. |
| `stats` | 12 | Count-up holds off-screen. No first-class media. |
| `cta-band` | 12 | Contrast patched. Still type-led. |
| `chapters` | 12 | Reduced-motion scroll. Type-led. |
| `countdown` | 12 | Clocks only. |
| `input` | 12 | OTP contrast patched; other fields still use `--nx-border` (~1.2:1). |
| `app-shell` | 12 | Disclosure exists. Isolated `agency` / `mobile` / `sidebar` paint empty Open / Waiting / Done. |

## Not overhauled

These items kept the round-2 chrome pass. They already have ≥10 named variants. They did **not** get original media, the pause/AA leftovers, or the cinematic density of the approved heroes.

### Cards

| Registry name | Variants | Gap |
| --- | ---: | --- |
| `draggable-card` | 12 | Media well is empty geometry. |
| `spotlight-card` | 12 | Product / article / place / player are gradients and initials. Ada Klein leftover. |
| `flip-card` | 12 | Profile / media / product are drawings. |
| `bento-grid` | 12 | Media tile is a child slot with no default still. |

### Buttons / motion fields

| Registry name | Variants | Gap |
| --- | ---: | --- |
| `magnetic-button` | 12 | Pointer lean only. No media, no pause. |
| `aurora-background` | 12 | Infinite fields. `pause` prop exists; no visible control. |
| `grid-background` | 12 | Pattern fields. Fine as chrome. |
| `gradient-text` | 12 | Gradient / shimmer / aurora / kinetic loop without pause. |
| `typewriter` | 12 | Has a pause control. Still a type device. |
| `text-reveal` | 12 | Typographic only. |

### Navigation / overlays / forms

| Registry name | Variants | Gap |
| --- | ---: | --- |
| `floating-navbar` | 12 | Wordmark / transport / mega are chrome. |
| `modal` | 12 | Lightbox is empty; OTP is spans; field borders fail AA. |
| `tabs` | 10 | APG incomplete (no `aria-controls`, no arrow keys). |
| `accordion` | 10 | Media variant is a gradient rectangle. |
| `tooltip` | 10 | Avatar tooltip is initials. |
| `toast` | 10 | Avatar toast is initials. |
| `badge` | 10 | Chips only. |

### Marketing leftovers

| Registry name | Variants | Gap |
| --- | ---: | --- |
| `pricing` | 10 | Distinct models, no media, generic SaaS chrome. |
| `footer` | 10 | Type-led closers. No lockups. |
| `leaderboard` | 12 | Medal tables, no photography. |
| `process` | 12 | Step type, no stills. |

### App kit leftovers

| Registry name | Variants | Gap |
| --- | ---: | --- |
| `kpi` | 12 | Metric tiles. |
| `data-table` | 12 | Rows without faces. Caption exists. |
| `kanban-board` | 12 | Cards without owners’ portraits. |
| `chart-block` | 12 | SVG only. |
| `activity` | 12 | Initials / marks. |
| `command-palette` | 12 | Jump list. |
| `settings-panel` | 12 | Profile is type-only. |

## Named leftovers from the approved pass

These are in-scope even when the parent item was already reviewed:

1. Motion loops need a **visible pause** and must respect `prefers-reduced-motion` (`button / shimmer|beam|flow`, aurora, gradient-text, kinetic).
2. Accessibility: `--nx-faint` as content (~2.73:1) and field `border-nx-border` (~1.18:1) must reach WCAG AA.
3. Isolated `app-shell / agency` (and sibling empty shells) must ship real furniture, matching `kit / portal`.
4. Dealer logo strip must be **distinct lockups**, not six matching glyphs.

## Out of scope for this list

`utils` is a library helper, not a visual component.

## Work this pass will do

Bring every **not overhauled** and **partial** item to the same bar: original lockups / photography where the model needs imagery, pause on looping motion, AA field and content contrast, furnished shells, registry + docs lookups kept in sync.
