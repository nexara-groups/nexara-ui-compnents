# Nexara UI visual audit

**Date:** 17 Oct 2026  
**Branch baseline:** `main` @ `2d03f76`  
**Site:** local Vite docs, hash routes, dark only  
**Captures:** `docs/audit/before/*-{desktop,mobile}-dark.png`

## Verdict

The catalogue does **not** meet the owner’s bar. **0 / 180** variants score 8 or above on design quality, distinctness, and modernity. Previous reviews in `docs/reviews/` approved a “structural pass” that swapped hover-only variants for novelty objects (wax, tickets, hazard tape, comic panels). That solved sameness on paper and created a 2020 craft-fair look.

## What failed

1. **No light mode.** Tokens and components hardcode `#09090f` / `#f6f3ec`. Linear, Vercel, shadcn, Origin, HeroUI all ship both.
2. **Carnival palette.** Orange, gold, iris, teal on every surface. Current product UI uses a quiet neutral + one accent.
3. **Boutique type.** Outfit + Fraunces reads 2022 template, not Geist / Instrument Serif.
4. **Same shell, different fields.** Spotlight, hero, and most navs share one rounded dark card. Distinctness is copy, not anatomy.
5. **Novelty objects.** Magnetic wax/stamp/bulb, marquee hazard/medals, aurora lightning-bolt clipart. Distinct, not modern.
6. **Empty product.** Heroes titled “Move the furniture”. Product cards are gradient blobs. Phones are colored rectangles. shadcn’s dashboard and Stripe’s marketing pages show real numbers and UI.
7. **Modal gallery hides variants.** Only an “Open” pill is visible.

## Standard used

`docs/audit/references.md`. Short version: Magic UI motion, Aceternity impact, shadcn/Origin primitives, Linear/Vercel/Stripe marketing restraint.

## Required work

- Redesign or replace every variant (see `docs/audit/scores.md`).
- New tokens, Geist + Instrument Serif, light and dark.
- Product anatomies, not toys. Real Nexara/studio copy. No lorem.
- Docs: theme toggle, galleries that show the actual variant (modals open, navs in frames).
- Add missing primitives if capacity: input, tabs, accordion, tooltip, toast, avatar, badge, pricing, testimonials, footer.

## Evidence

Desktop and mobile dark galleries for all 15 components live in `docs/audit/before/`. There are no light-mode befores because the site cannot render them.
