# Pricing — role debate

Six agents argued before implementation. They did not agree on names. They agreed on the kills.

## Roles

- Trend researcher
- Product / UX strategist
- Visual designer
- Motion designer
- Front-end (API / perf / a11y)
- Sceptical creative director

## Fights

**Jobs vs objects.** UX named jobs (`pick`, `compare`, `estimate`, `period`, `axis`…). Visual said those thumbnail as the same three cards and demanded objects (offer, ledger, meter, dossier, quote). CD agreed with Visual on mechanism names, UX on first-frame: a number, or a control that makes one.

**Is `slab` allowed.** Researcher: 21st lists 99 pricing components and most are `$99` checkmark trios — saturated. UX: Monday paste *is* three plans; without it the family is a toy. CD: allowed if the plans are radios and the featured state is a hairline ring, never a neon Recommended costume. Converged: `slab` ships; the badge dies; `featured` defaults false.

**Toggle as a prop vs a variant.** FE: billing period is shared state, not a layout — put a `period` prop on `slab`. Motion: the reserved-width digit morph and the thumb `layoutId` *are* the idea, so they earn a file. Converged: `slab` has no switch. `toggle` is the period layout. Shared types; the control is composed only where it is the mechanism (`toggle`, `quote`).

**Seats vs meter.** UX: both sliders, merge them. Visual: people are not gigabytes. FE: seats are discrete + included/overage; meter is a unit band + rate. Converged: two variants. A jammed dual-slider is a calculator (`quote`), not a third intermediate.

**Table vs cards.** UX: the matrix lives *under* the cards, as on Linear/Vercel. Visual: then it is not a variant, it is a footer. FE: a comparison that is not a `<table>` fails a11y. Converged: `table` *is* the section. `morph` is the advanced view-switch. Do not paste both as one kit. Sticky first column; cells are check / minus / value, not icon soup.

**Dual-axis and add-ons as 12th and 13th.** UX: Framer Sites vs Workspaces and Notion AI are 2026 jobs. Researcher: they are slots (axis index, add-on rows). CD: cap is 11. Converged: `axes` and `addons` are slots on `dossier` and `quote`. FAQ, quiz, and “Pricing With FAQ” die. Enterprise is a *door* (`pair` or a slot), not a glowing fourth column.

**How timid is Advanced.** UX: `quote` default is three inputs and a total; a 320vh estimator is a landing page. Visual: do not draw `slab` inside the quote well. Motion: total settles; no confetti; morph is opt-in shared-element, reduced-motion shows both states without the tween. FE: `format` and `formula` are slots; `Intl.NumberFormat`; no baked `$` or currency; live region for the total; `input type="range"` + `<output>` on seats/meter. Converged: control-first calculator, morph as a real layout change, dossier with a sticky summary that recomputes — not scroll theater.

**WebGL / cockpit.** Researcher: Cerebrium’s globe is not pricing; more WebGL ≠ quality. CD: if the default is a credits dial, the variant does not exist. Motion: no canvas in this family. Converged: `meter` is a CSS band. Calculator is the instrument.

**One file vs eleven files.** FE: one `pricing.tsx` so a slab paste does not import a morph layout. Visual: eleven DOMs, not className swaps of three cards. Converged: one public `Pricing` with eleven *layouts*, not eleven grids of the same slots.

**Basic.** UX demanded four shippable pastes. CD refused jumbotron trios. Researcher refused gradient-as-pricing. Converged: `offer`, `pair`, `slab`, `ledger` — scenes, not sparkle stacks.

**What died.** The old hero `pricing` costume (`$48/mo`). Helio `PricingAtelier` as the copy-paste default (Desk / Studio / Signal, `$32` / `$74` / `$160`, brass “Held”). Neon Recommended. Confetti annual. NumberFlow-as-product. Starfield, squishy, glowing tiers. Mesh/glass kits. FAQ-as-variant. Recommendation quiz. Chapter-scroll as a 12th (cap is 11). Baked prices, plan names, and “Most Popular” in prop defaults.

## Converged ship list (11)

| id | tier | Mechanism | Motion idea |
| --- | --- | --- | --- |
| `offer` | basic | One published figure. Inclusion groups. Two actions. | Nothing required. |
| `pair` | basic | Two opposed rooms. Self-serve vs sales (or personal vs team). | None. |
| `slab` | basic | Cumulative plan radios. Selection is a ring, not a badge. | Ring seats once. |
| `ledger` | basic | Boxless ruled columns. Hairlines align across plans. | None. |
| `toggle` | intermediate | Period control *is* the composition. Saving lives on the switch. | Digit morph. Thumb `layoutId`. |
| `seats` | intermediate | Headcount slider. Included vs extra. Live total. | Count ticks. |
| `meter` | intermediate | Usage unit. Included band + overage. | Fill. |
| `table` | intermediate | Feature matrix as the section. Real `<table>`. | Row opens a note. |
| `quote` | advanced | Working calculator. Formula slot. Breakdown → total. | Total settles. |
| `morph` | advanced | `slab` and `table` are one layout that transforms. | Shared element. |
| `dossier` | advanced | Document: filter, chapters, sticky summary rail. | Summary pins. Filter snap. |

## Sign-off bar

Each id is a different mechanism. Tokens + copy restyle it to a hospital or an HVAC brand. First frame holds a number or a control that makes one. Advanced never ships a sphere, a dial, or confetti. Basic never ships a Recommended neon. No baked prices as defaults. Theme through CSS variables. Helio is a docs tenant, not the API.
