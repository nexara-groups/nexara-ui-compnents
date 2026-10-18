# Round 6 — accessibility / responsive engineer

**Verdict: APPROVE leftover fields, tabs, and shells. Decorative `--nx-faint` remains on some approved heroes.**

Evidence: smoke (`otpBorder: rgba(17, 17, 16, 0.45)`), mobile agency capture, tabs source.

## What closed

- `--nx-field` is ~3:1 on white. Outline / search / password / amount / command / floating / OTP / footer email use it.
- Leftover `text-nx-faint` captions on process, leaderboard, kpi, kanban, countdown, chapters, stats, command palette, and settings moved to `--nx-muted`.
- Tabs: `aria-controls`, labelled `tabpanel`, roving tabindex, arrow keys.
- Accordion: `aria-controls` / `aria-expanded`.
- Modal OTP is the wired `Input` group, not spans.
- Isolated agency shell shows a Menu disclosure on 390px.

## Leftover

- Some already-overhauled heroes and services still use `--nx-faint` on decorative numbers. Not this pass’s leftover list.
- Command palette field is borderless inside a card (Linear-style). Acceptable if the card is not the only focus indicator — the input still has `focusRing`.

I approve the leftover a11y bar. This is not a stamp that every hero caption is AA.
