# Round 6 — accessibility / responsive engineer

**From:** [A11y responsive critic](https://cursor.com/agents/bc-6a1e1748-f175-52fe-9df1-04bf0045c3e6)  
**Evidence:** `src/index.css`, `src/lib/utils.ts`, leftover UI sources at this branch; WCAG contrast from shipped hex / alpha composites; `docs/audit/coverage.md`; `docs/audit/round-6/` stills (`focus-input-outline.png`, `focus-input-otp.png`, `focus-input-otp-mobile.png`, `focus-tabs-underline.png`, `focus-accordion-media.png`, `focus-app-shell-agency.png`, `focus-app-shell-agency-mobile.png`, `focus-settings-profile.png`). Source-checked tabs / accordion / OTP / Menu wiring. No live Playwright smoke in this pass.

## Verdict

**APPROVE** leftover fields, tabs, accordion, modal OTP, and agency Menu.

The named leftover a11y list in `docs/audit/coverage.md` is closed. This is not a stamp that the catalogue is WCAG AA. Decorative `--nx-faint` on already-overhauled heroes / services / team / news / case-study still fails 1.4.3. `app-shell / mobile` still unmounts the aside when closed.

## Named leftover checks

| Check | Result | Notes |
| --- | --- | --- |
| `--nx-field` ~3:1 on inputs | **Pass 1.4.11 on white card** | `--nx-field: rgba(17, 17, 16, 0.45)` composites to `#949493` on `--nx-card` white. vs fill **3.04:1** (was `border-nx-border` **1.18:1**). Outline / search / password / amount / floating / tag / OTP / footer email / settings profile use `fieldBorder`. Dark field on `#131316` is **4.63:1**. |
| Leftover `text-nx-faint` → muted | **Pass on the leftover content list** | process, leaderboard, kpi, kanban, countdown, chapters, stats, command-palette group tags, settings, and input placeholders are `text-nx-muted` (`#6a6963` on paper **5.00:1**). |
| Tabs APG (`aria-controls`, arrows) | **Pass 4.1.2 / 2.1.1 leftover** | `tabs.tsx`: `aria-controls`, labelled `tabpanel`, roving `tabIndex`, Left/Right (Up/Down when vertical). `case-study / tabs\|autoplay` now matches: panel id, `aria-labelledby`, arrows, `aria-pressed` on Pause. |
| Accordion `aria-controls` | **Pass 4.1.2** | Header button has `aria-expanded` + `aria-controls`. Collapsed panel keeps the same id with `hidden`, so the reference always resolves. |
| Modal OTP uses `Input` | **Pass 2.1.1 / 1.4.11 leftover** | `modal / otp` renders `<Input variant="otp" />` — named group, paste / arrows / Backspace, `one-time-code`, `fieldBorder` boxes. No more inert spans. |
| App-shell mobile Menu | **Pass layout + 4.1.2 on agency / siblings** | 390 still (`focus-app-shell-agency-mobile.png`) shows **Menu** above the furnished desk. Button is `md:hidden`, `aria-expanded`, `aria-controls={navId}`. Agency / clinic / sports / academy keep the aside in the DOM (`max-md:hidden`) so the id exists while closed. |

## Contrast math (light)

| Pair | Ratio | Bar |
| --- | ---: | --- |
| `--nx-field` on white vs white fill | **3.04:1** | 1.4.11 pass |
| `--nx-field` on white vs paper `#f4f4f1` (outer edge) | **2.76:1** | fails if the field sits on paper |
| `--nx-field` composited on paper vs paper (`input / command`, modal form fill `bg-nx-bg`) | **2.98:1** | misses 3:1 by 0.02 |
| `--nx-muted` on paper | **5.00:1** | 1.4.3 pass |
| `--nx-faint` on paper | **2.73:1** | 1.4.3 fail |

Gallery cards (`focus-input-outline.png`, `focus-input-otp.png`, `focus-settings-profile.png`) are the passing case: white field on white card. Copy a command / auth field onto `--nx-bg` and the edge is short of 3:1 again — same class of hole round 5 named for OTP on paper.

## What this pass closed (source)

- `fieldBorder` in `src/lib/utils.ts` is `border border-nx-field`. OTP boxes, footer newsletter, settings profile, and modal command / form / auth use it.
- Input placeholders are `placeholder:text-nx-muted`, not faint.
- Tabs: automatic activation on arrows, wrap, focus move via tab id. Vertical variants set `aria-orientation="vertical"`.
- Accordion media stills are photographs with empty `alt` next to the visible question — correct 1.1.1.
- Isolated agency / clinic / sports desks ship named leads and `focusRing` desk buttons inside `<nav aria-label="Desk">`.

## Leftover (do not pretend)

**Out of this leftover list (already-overhauled cells)**  
`--nx-faint` is still content on hero stats and captions, services indexes, team place lines, news dates / kickers, case-study sectors, contact branch labels, testimonials handles. Those cells were approved as media, not as AA type. `--nx-muted` is the token they still need.

**Leftover-scope nits that remain**

- `text-reveal / index` folio numbers are still `text-nx-faint` (**2.73:1**). Decorative leftover marks: typewriter ⌕, magnetic-button ⌘.
- `app-shell / mobile` unmounts the aside when closed, so `aria-controls="nexara-desk-mobile"` is a missing id until open. Keep it in the DOM (`hidden` / `inert`), as round 5 asked. `app-shell / top` nav is still `<span>`s.
- Tabs do not keep inactive `tabpanel`s mounted (unselected `aria-controls` dangle). Home / End are not wired. The named leftover was arrows + `aria-controls` on the selected panel — that is present.
- Modal `form` / `auth` inputs have `fieldBorder` but no `focusRing`. Command palette search is borderless inside the card (Linear-style); the input still has `focusRing`. Acceptable if the card is not the only focus indicator.
- `floating-navbar / app-bar` search is still `border-nx-border` + `outline-none` — leftover nav field, 1.18:1, no ring.

**Already closed outside the leftover brief**  
`hero / ac-remote` Mode / Fan now rove (`tabIndex={selected ? 0 : -1}`) and handle arrows. That was a round-5 AA hold-back, not this pass’s named list.

## Keep

- Field token on the white-card constructions the leftover pass claimed.
- Tabs + case-study tabpanel / arrows / Pause `aria-pressed`.
- Accordion `aria-controls` with a `hidden` stub.
- Modal OTP as the wired `Input` group.
- Agency (and sibling) Menu at 390 with expanded state.

## Follow-up (not this verdict)

1. Opaque field token ≥3:1 against `--nx-bg`, or stop painting command / auth fills with paper.
2. `--nx-faint` as content → `--nx-muted` on leftover `text-reveal / index` and the already-overhauled hero / services / team / news lines.
3. Keep `app-shell / mobile` aside mounted; promote `top` spans to controls.
4. Mount inactive tabpanels (or drop `aria-controls` on unselected tabs). Add Home / End.
5. `focusRing` on modal form / auth and the navbar search; darken that search edge.

I approve the leftover a11y bar. I do not approve the kit as an AA component library.
