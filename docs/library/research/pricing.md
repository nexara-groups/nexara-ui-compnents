# Pricing — research moodboard (2025–2026)

Inspiration only. No layout, type, or motion is copied. Local stills from the earlier flagship pass live in `docs/flagship/proof/` (`section-plans.png`, `pricing-monthly.png`, `pricing.webm`).

## Sources opened this pass

| Source | What was actually looked at |
| --- | --- |
| 21st.dev `/community/components/s/pricing` | 99 components (tagline still says 43). Recurring cards: three-tier checklist, monthly/yearly pill, NumberFlow digits, Popular glow. Distinct: Comparison Table (Shehadeh), Compare 2 (Ali Imam), Toggle Pricing Cards / Toggleable Add-on / Seat-Based Slider / Usage Slider / ROI Calculator / Lifetime Deal (Diar Muradi `pricing-5`–`13`), Volume Pricing Card, Amount Slider (Serafim), Radio Group plan cards (Origin UI / ShadcnSpace), Plan Add-on Selector, Fare Selector, Receipt / Blueprint Tiers. Saturated: Glowing Pricing Tiers, Squishy Pricing, starfield+confetti (Katiyar / Prism UI). |
| Aceternity `/pricing-section` + `/blocks/pricing-sections` | Seven blocks, not six: Icons, Header and Icons, Minimal, Featured And Enterprise, Switch, Switch And Add On, Simple Three Tiers. Typed `Plan[]`. Popular badge, checkmarks, dashed grid, gradient featured, blur-switch digits, separate enterprise band. Useful warning: reserve width / `tabular-nums` or the card reflows when `29` becomes `290`. |
| Magic UI Pro `/docs/sections/pricing` | `pricing-1` is a *lifetime* single card (`$199`), not a ladder. `pricing-2` is two plans (Free / `$499`). `pricing-4` / `pricing-5` are three-tier kits (`$9/$29/$99`, `$14/$37`) with “Everything in X, plus”. Aurora/warp text primitives are effects, not pricing. |
| Stripe `/pricing` (Oct 2026) | One published fee (`2.9% + 30¢`) as the composition. No plan ladder. Product modules (Billing, Connect, Radar, Issuing, local methods) priced as separate blocks. Custom volume is a different door. 2026 writeups put a volume calculator next to that fee; the page itself is a fee + catalogue. |
| Linear `/pricing` | Free / Basic `$10` / Business `$16` / Enterprise custom. Outcome line before bullets. One annual default. Compare matrix underneath (issues, teams, intelligence, SSO). Enterprise is not a fourth self-serve column. |
| Vercel `/pricing` | Hobby / Pro `$20` / Enterprise custom, then a long comparison of *units*: CDN requests, Fast Data Transfer, ISR reads/writes, Firewall, Blob. Included band + overage rate, not a tooltip. Add-ons (Observability, Firewall) off the main ladder. |
| Awwwards `/elements/pricing_page/` + SOTD 2025–26 | Recurring elements: “Two plans. Clear math.”; live project estimate; credits cockpit dial; sticky comparison table; “a quote built live as you answer”; SWSH pricing interaction. Cerebrium (SOTD 10 Sep 2026) Transparent Pricing Calculator (selectors, not a globe). Cluma Modular Price Calculator. Good Fella (SOTD 18 Mar 2026) pricing page on ScrollTrigger. Flowchef mesh-gradient + checkboxes — saturated. Stack: GSAP, ScrollTrigger, selectors. |
| Pinterest boards (`pricing page ui`, `price comparison design`, `pricing plans`, cream website) | Attio / Cohere / Slite / Untitled UI pins; cream paper + serif figure; ruled comparison sheets; tariff tables. Saturated: three candy-coloured columns, infographic check grids, “Choose Your Plan” posters. |
| Dribbble `price-comparison` / `pricing-matrix` / `cost-calculator` + 2025 shots | Untitled UI comparison table; Personizely list; Flow Hub three-column SaaS (2025); Kevin Dukkon cards. Saturated: glass plan cards, neon Recommended on the middle, per-day cost theater. Dribbble’s own Pro page (Lite `$4` / Standard `$8` / Plus `$99`) is the kit everyone clones, then a Compare Plans matrix. |
| Existing local captures | `docs/flagship/proof/{section-plans,pricing-monthly}.png`, `pricing.webm`. Helio `PricingAtelier` mashes toggle + three slabs + compare table + seat slider + live total — proof the mechanisms exist, not a paste. |

## Named trends

1. **One published fee** — the number *is* the page. Stripe; Magic UI `pricing-1` lifetime card; 21st single-plan / lifetime deal.
2. **Role-first ladder** — who you are before the columns. Linear; Notion persona pills that reorder without a route.
3. **Usage as line items** — credits, GB, requests as rows with an included band and an overage. Vercel; 21st usage slider / amount slider.
4. **Dual-axis honesty** — Sites vs seats, Site vs Workspace, as two ladders (or a toggle between axes), not one confused grid. Framer; Webflow with in-page anchors.
5. **Seat as instrument** — headcount drives the figure. Atlassian slider; 21st `pricing-5`; Beste seat-slider calculator.
6. **Period control with reserved width** — monthly/yearly is a switch, discount lives *on the switch*, digits morph in a fixed well. Aceternity Switch; 21st toggle cards.
7. **Add-on as a stack** — AI / extra product priced beside the plan, not folded into a fake upgrade. Notion AI; Aceternity Switch And Add On; 21st add-on selector.
8. **Working quote** — inputs in, breakdown out. Cerebrium calculator; Cluma modular estimator; 21st ROI calculator; Awwwards “quote built live”.
9. **Matrix as the section** — plans as columns, features as rows, real cells (check / minus / value). Linear; Vercel; Untitled UI; 21st Comparison Table.
10. **Editorial ledger** — boxless ruled columns, serif figure, one clay accent, subgrid hairlines. Pinterest cream boards; Beste engagement rails; Anthropic-adjacent paper.

## Saturated — do not ship

Three `$99` cards with Lucide checkmarks only. Neon **Recommended** / **Most Popular** pill (gradient border, spinning conic, glow). canvas-confetti on annual. NumberFlow as the product. Interactive starfield. Squishy / glowing tiers. Mesh-gradient pricing. Glassmorphism plan cards. Dark navy + violet SaaS kit. Fake third tier. Scarcity countdown. Per-day cost. “Simple, Transparent Pricing.” FAQ accordion as the variant. Contact sales on every column. Credits cockpit / WebGL dial as the idea. Helio Desk / Studio / Signal with `$32` / `$74` / `$160`. Industry costumes (`$48/mo`).

## Library-useful (finite props, reduced-motion end state)

Single published offer. Two-plan pair. Cumulative radio slabs with a ring, not a badge. Editorial ledger. Period switch with `tabular-nums`. Seat slider + included vs extra. Usage meter (included band + overage). Real `<table>` matrix. Formula quote with a breakdown. Shared-element morph between slabs and table. Dossier with a filter and a sticky summary. Add-on and dual-axis as slots, not extra ids. Empty defaults; theme through CSS variables.
