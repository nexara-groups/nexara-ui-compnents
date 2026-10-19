**CONDITIONAL**

# Round 5 — a11y

**From:** [A11y responsive critic](https://cursor.com/agents/bc-ad614f93-d848-5586-a040-0a5c15714207)  
**Evidence:** `src/components/ui` + `src/lib/media.tsx` + `src/lib/utils.ts` at `1a4d21e` (holes closed in `e699faa` / `04ad795`); contrast from shipped hex; `docs/audit/round-5/focus-input-otp.png`, `focus-avatar-group.png`, `focus-hero-waitlist.png`, `focus-hero-search.png`, `focus-app-shell-mobile.png`, `focus-kit-portal-mobile.png`, `focus-cta-appointment.png`, `focus-hero-ac-remote.png`, `focus-hero-ac-remote-mobile.png`, `focus-hero-clinic.png`, `focus-case-study-tabs.png`. Source-checked OTP paste of `7391`; waitlist / group `aria-label` strings include Anitha Rao.

## Verdict

**CONDITIONAL**

The named round-4 leftovers this pass claimed to close are closed: OTP is a named group with a ≥3:1 box edge on white card, face stacks are named, search / waitlist / command carry `focusRing`, the table has a caption, and the portal menu exposes expanded state with real nav buttons. The catalogue is still not WCAG AA. Radios and tabs still do not match their APG roles, and `--nx-faint` is still used as content below 4.5:1.

Round 5 does **not** reject the media / a11y follow-up. It also does **not** approve the kit as an AA component library.

## Named checks (round-4 holes this pass claimed)

| Check | Result | Notes |
| --- | --- | --- |
| OTP `role="group"` + name | **Pass 4.1.2** | `OtpField` wraps the four boxes in `role="group"` `aria-label="One-time code"`. Per-digit `aria-label="Digit N"` remains. First field `autocomplete="one-time-code"`. |
| OTP paste `7391` | **Pass 2.1.1** | `onPaste` strips non-digits, slices to four, writes every box, focuses the last filled. `7391` → `7 3 9 1`. Left/Right and empty Backspace unchanged. 48×48 hit target. |
| OTP border ≥ 3:1 | **Pass 1.4.11 on card / no cushion** | `border-nx-fg/45` composites to `#949493` on `bg-nx-card`. vs white fill **3.04:1** (was `border-nx-border` **1.18:1**). vs page paper `#f4f4f1` **2.76:1** — copy onto `--nx-bg` and the outside edge fails again. Gallery card (`focus-input-otp.png`) is the passing case. |
| `avatar / group` named | **Pass 1.1.1** | Stack is `role="img"` `aria-label="Anitha Rao, Kiran Reddy, Meera Shah"`; each `MediaFrame` `alt` is the person. Smoke: group label includes Anitha Rao. Nested alts plus `role="img"` may double-announce; names exist. |
| `hero / waitlist` faces named | **Pass 1.1.1** | Same pattern, four faces. Label is `Anitha Rao, Kiran Reddy, Meera Shah, Suresh Naidu`. Adjacent “2,400 already in” does not replace the names; the photographs are content. |
| `focusRing` on hero search / waitlist / modal command | **Pass wiring / search still clips** | Waitlist and modal command: `focusRing`, visible label (`Email` / `Command`). Hero search: class is on the input, but the form is still `overflow-hidden rounded-full` — ring-offset-2 will clip (same class of 2.4.7 bug as `button / group`). Native outline was already clipped; adding the class does not make the ring visible. |
| `data-table` caption | **Pass 1.3.1** | `<caption className="sr-only">Desk rows</caption>` on every variant. One shared name; patients / invoices / jobs are not distinguished. Enough to close the round-3 leftover, not enough to describe the filtered table. |
| `app-shell` disclosure + nav | **Pass 4.1.2 on the portal path** | Menu button has `aria-expanded` / `aria-controls={navId}`. Desk rows are `<button type="button">` with `focusRing`, inside `<nav aria-label="Desk">`. Rail initials: inner `aria-label={item}` contributes the full name. 390 frames (`focus-app-shell-mobile.png`, `focus-kit-portal-mobile.png`) stack; aside no longer paints over the canvas. `variant="mobile"` unmounts the aside when closed, so `aria-controls` points at a missing id until open. `variant="top"` is still `<span>`s. |

## WCAG issues that remain

**1.4.3 Contrast (Minimum)**  
`--nx-faint` `#96958e` on page `#f4f4f1` = **2.73:1**. On white card = **3.01:1**. Still used as content: countdown circular/ribbon unit labels, race “Heat 4”, exam kicker, team place lines, services door indexes and why-numbers, command-palette group tags, input placeholders (`placeholder:text-nx-faint`), docs live-preview chrome. Dark faint `#6f6e68` on `#0a0a0c` = **3.87:1** — better, still short of 4.5:1. `--nx-muted` `#6a6963` on paper is **5.00:1**; that is the token these lines should use.

**1.4.11 Non-text Contrast**  
Most fields still `border-nx-border` (~8% black on white = **1.18:1**). OTP is the exception. `button / group` is still `overflow-hidden`, so the 3:1 focus ring clips. Hero search form same clip.

**4.1.2 / APG radios**  
`hero / ac-remote` Mode and Fan are `role="radiogroup"` / `role="radio"` with `aria-checked` and **no** roving `tabIndex`, **no** arrow-key handler. Every chip is its own tab stop. Round 3 and 4 already named this. `src/docs/demos.tsx` already implements the correct pattern (`tabIndex={selected ? 0 : -1}` + Left/Right/Up/Down). The remote does not use it.

**4.1.2 / APG tabs + tabpanel**  
`case-study / tabs|autoplay` is `role="tablist"` / `role="tab"` / `aria-selected` with **no** `tabpanel`, **no** `aria-controls`, **no** arrow keys. The article is not tied to the selected tab (1.3.1 as well). Pause/Play is a name swap without `aria-pressed`.  
`tabs.tsx` has a `role="tabpanel"` but no `id`, no `aria-labelledby`, no `aria-controls` on the tabs, no roving tabindex, no arrows. The role is present; the pattern is not.

**2.1.1 Keyboard / 2.4.7 Focus Visible**  
AC ± remain `size-8` (32px) against a 24px AA / 44px AAA target. Search ring clip as above. Modal `form` / `auth` fields still have no `focusRing`. Modal `otp` is still four inert `<span>`s, not `OtpField`.

**1.1.1 Non-text Content**  
`hero / tilted` mosaics still ship `alt=""`. `hero / fan` now names `Look N` — that hole closed. Background wells (cinema, event, spiral, liquid, glass-fold, wordmark) stay empty-alt with a heading on top; that is still the right call. `MediaFrame` video still autoplays muted when `playing` is omitted (2.2.2 for any consumer who passes `video` without `PlayControl`). Cinema now uses `PlayControl`; the primitive does not.

**1.3.1 Info and Relationships**  
Case tabs are still not tied to the article they switch. Table caption is generic.

## Keep

- Cream / navy (`#f6f1ea` / `#0b1220` = **16.66:1**): `cta-band / appointment`, `hero / clinic` title. Clinic pink eyebrow `#f3b4b0` = **10.67:1**; lede `#c9c2b8` = **10.60:1**. Inverse appointment pill is the same pair.
- `hero / ac-remote` wrap at 390 (`focus-hero-ac-remote-mobile.png`). Power `aria-pressed`, labelled ±, Mode/Fan group names. Selected chip fills: Chill 8.32, Spring 6.49, Sunny 6.96, Autumn 5.56. Unselected `white/70` = 9.51. ON white on `#9b1c12` = 8.18. Mode/Fan kicker `white/45` = **4.52:1** — AA by 0.02, not a cushion.
- `input / otp` paste, arrows, Backspace, `one-time-code`, group name, darker box edge.
- Named face stacks: `avatar / group`, `hero / waitlist`. Team / doctors stills keep `alt={person.name}` next to the visible name.
- `app-shell` 390 stacking, Menu name, `aria-expanded` / `aria-controls`, desk buttons.
- `case-study / tabs|autoplay|reel` pause + `usePrefersReducedMotion` gate. Clicking a tab or reel dot still sets `paused`.
- Decorative empty `alt` where a heading, figcaption, or adjacent label already names the still. Grain `aria-hidden`.
- Clinic / healthcare kit at 390 stack (long page, not overlapping). Portal table scrolls inside the card.

## Redesign

- `hero / ac-remote` radios: one tab stop per group, arrows change value. Copy the `demos.tsx` radiogroup.
- `case-study` tabs: `aria-controls` + `tabpanel` (or drop `role="tablist"` and treat them as buttons). `aria-pressed` on Pause. Same keyboard contract on `tabs.tsx`.
- `--nx-faint` as content → `--nx-muted` (countdown circular/ribbon, team place, command group tags, door indexes).
- `button / group` and hero search: do not clip the ring (`overflow-visible` / inner clip, not the focusable edge).
- OTP copied onto paper: opaque border token ≥3:1 against `--nx-bg`, not only against white fill.

## Follow-up

1. Roving tabindex + arrow keys on AC Mode/Fan (the demo radiogroup already does this).  
2. Case-study (and `tabs.tsx`) tabpanel + `aria-controls` + arrow keys; `aria-pressed` on Pause/Play.  
3. Replace content uses of `--nx-faint` with `--nx-muted`. Placeholders too.  
4. Stop `overflow-hidden` from clipping `button / group` and hero search rings.  
5. Keep the mobile aside in the DOM (`hidden` / `inert`) so `aria-controls` always resolves; promote `app-shell / top` spans to controls.  
6. Name `hero / tilted` stills or mark the mosaic `aria-hidden` if it is atmosphere.  
7. If `MediaFrame` `video` ships outside cinema / news, give it a visible pause; `motion-reduce` still is not enough for 2.2.2.  
8. Darken remaining field borders, or accept that only OTP meets 1.4.11. Wire modal `otp` to `OtpField` instead of inert spans.

Round 5 closes the named disclosure, OTP group, face names, caption, and field-ring wiring. AA still waits on radios, tabpanel, and faint chrome.
