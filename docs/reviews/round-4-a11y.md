# Round 4 — a11y

**From:** [A11y responsive critic](https://cursor.com/agents/bc-0a076234-3cbe-5157-9005-3b0462ed0201)  
**Evidence:** `src/components/ui` + `src/lib/media.tsx` at `4b9887c`; contrast measured from shipped hex; `docs/audit/round-4/focus-cta-appointment.png`, `focus-hero-ac-remote.png`, `focus-app-shell-mobile.png`, `focus-input-otp.png`, `focus-case-study-tabs.png`, `focus-kit-portal-mobile.png`.

## Verdict

**CONDITIONAL**

The named round-4 holes close. Cream on navy, AC mode chips, OTP paste/arrows, the 390px menu toggle, case-study pause (tabs, autoplay, and reel), and empty `alt` on decorative stills are no longer the blockers they were in rounds 2–3. The catalogue is still not WCAG AA: the new menu is an unlabeled disclosure, radios and tabs do not match their roles, and faint chrome still fails 1.4.3 / 1.4.11.

## Named checks

| Check | Result | Notes |
| --- | --- | --- |
| Healthcare CTA cream on navy | **Pass 1.4.3 / 1.4.11** | `#f6f1ea` on `#0b1220` = **16.66:1**. Inverse pill (`Request a slot`) is the same pair. Eyebrow, title, and control all clear AA and AAA. |
| AC mode colors | **Pass 1.4.3** | Selected chips: Chill 8.32, Spring 6.49, Sunny 6.96, Autumn 5.56. Unselected `white/70` on `#111113` = 9.47. `Mode` / `Fan` kicker `white/45` = **4.53:1** — AA by 0.03, not a cushion. ON white on `#9b1c12` = 8.18. |
| OTP paste + arrows | **Pass 2.1.1 wiring** | `src/components/ui/input.tsx` `OtpField`: Left/Right move focus, Backspace on empty walks back, paste strips non-digits into all four boxes, first field `autocomplete="one-time-code"`, 48×48 hit target, `aria-label="Digit N"`. |
| Portal shell menu @ small screens | **Pass layout / fail 4.1.2** | `AppShell` `mobile` starts closed. `Menu` / `Hide menu` is `md:hidden`. 390 frames (`focus-app-shell-mobile.png`, `focus-kit-portal-mobile.png`) stack; the aside no longer paints over the canvas. Button has a name and no `aria-expanded` / `aria-controls`. Nav rows are still `<span>`s. |
| Case-study pause | **Pass 2.2.2** | Tabs/autoplay expose Pause/Play; tab click sets `paused`. Reel now shares the same control and dots also pause. `usePrefersReducedMotion` kills the 4.2s timer. |
| Empty `alt` on decorative stills | **Mostly pass 1.1.1** | `MediaFrame` defaults `alt=""`. Grain overlay is `aria-hidden`. Background wells (cinema, event, spiral, liquid, glass-fold) and thumbs next to a visible name (logo stacked/badges, team list, services rows) are correct. |

## WCAG issues that remain

**1.4.3 Contrast (Minimum)**  
`--nx-faint` `#96958e` on page `#f4f4f1` = **2.73:1**. Still used as content: countdown circular/ribbon unit labels, race “Heat 4”, team place lines, services door indexes, command-palette group tags. On white card it is 3.01 — still short of 4.5:1. Placeholders inherit the same token.

**1.4.11 Non-text Contrast**  
OTP and most fields use `border-nx-border` (~8% black on white = **1.18:1**). The four OTP boxes are perceivable mainly by rounded fill, not by a 3:1 boundary. `button / group` still `overflow-hidden`, so the 3:1 focus ring clips (2.4.7 as well).

**4.1.2 Name, Role, Value**  
- `app-shell` disclosure: no `aria-expanded`, no `aria-controls`. Name flips between Menu and Hide menu; AT does not get expanded state.  
- Desk nav items are `<span>`s inside `<nav aria-label="Desk">` — not links, not buttons, not in the tab order.  
- `hero / ac-remote` Mode and Fan are `role="radiogroup"` / `role="radio"` with **no** `tabindex` roving and **no** arrow-key handler. Every chip is its own tab stop. Round 3 already named this.  
- `case-study` `role="tablist"` has no `tabpanel`, no `aria-controls`, no arrow-key tabs pattern. Pause/Play is a name swap without `aria-pressed`.  
- OTP wrapper is an unlabeled `<div>` — four fields, no `role="group"` / `<fieldset>` name.

**2.1.1 Keyboard / 2.4.7 Focus Visible**  
Hero search and waitlist inputs are `outline-none` with no `focusRing`. Modal command field same. AC ± hit targets are 32px (`size-8`) against a 24px AA / 44px AAA target.

**1.1.1 Non-text Content**  
`avatar / group` and `hero / waitlist` face stacks ship `alt="" ` with no adjacent names — the photographs *are* the content. `hero / fan` and `hero / tilted` mosaics are unnamed product stills. `MediaFrame` video now paints `poster`/`src` under `motion-reduce` (good); the looping `<video>` still has no pause for users who did not request reduced motion (2.2.2 for any consumer who passes `video`).

**1.3.1 Info and Relationships**  
`data-table` still has no `<caption>` (round 3 leftover). Case tabs are not tied to the article they switch.

## Keep

- `cta-band / appointment` and clinic cream/navy (`#f6f1ea` / `#0b1220`). Clinic pink eyebrow `#f3b4b0` on navy = 10.67:1.  
- `hero / ac-remote` power `aria-pressed`, labelled ±, Mode/Fan group names, wrap on the remote bar. Chip fills are AA.  
- `input / otp` paste, arrows, Backspace, `one-time-code`, per-digit names.  
- `app-shell` 390 stacking and the visible Menu control.  
- `case-study / tabs|autoplay|reel` pause + reduced-motion gate.  
- Decorative empty `alt` where a heading, figcaption, or adjacent label already names the still. Grain `aria-hidden`.

## Redesign

- `app-shell` menu: `aria-expanded`, `aria-controls`, focus return, and real `a` / `button` nav rows (rail initials need names).  
- `hero / ac-remote` radios: one tab stop per group, arrows change value.  
- `input / otp`: wrap in a named group; darken the box border to ≥3:1.  
- `avatar / group`: `alt` per face or `aria-label` on the stack.  
- `data-table`: caption. `button / group`: do not clip the ring.

## Follow-up

1. Wire `aria-expanded` / `aria-controls` on the portal Menu button; promote desk spans to controls.  
2. Roving tabindex + arrow keys on AC Mode/Fan (and case-study tabs).  
3. OTP `role="group"` `aria-label="One-time code"`; `border-nx-line` or stronger on the four boxes.  
4. Name `avatar / group` and the fan/tilted stills, or mark the mosaics `aria-hidden` if they are truly atmosphere.  
5. Add `focusRing` to hero search/waitlist (and modal command).  
6. Replace content uses of `--nx-faint` with `--nx-muted` (countdown circular/ribbon, team place, command group tags).  
7. If `MediaFrame` `video` ships outside the stills catalogue, give it a visible pause; `motion-reduce` still is not enough for 2.2.2.  
8. `<caption>` on `data-table`; stop `overflow-hidden` from clipping `button / group` rings.

Round 4 does **not** reject the media rebuild on contrast or OTP. It also does **not** approve the shell as an accessible portal. Fix the disclosure and the radio/tab patterns before calling AA.
