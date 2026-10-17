# Round 3 — a11y

**From:** [A11y responsive critic](bc-998d2a8a-11fb-5e6b-a764-3b6027413936)  
**Evidence:** mobile/desktop focus shots; smoke on 1440 and 390.

## Verdict

**CONDITIONAL**

Toggles, theme, FAB names, lime-on-black, and pink-on-navy contrast mostly pass. Failures that were fixed in the follow-up: ON contrast, healthcare CTA on navy, data-table header contrast and overflow, countdown unit labels, command-palette combobox wiring, app-shell stacking at 390px.

## Keep

`button / toggle|theme|group|fab`, AC remote wrapping and labelled ± / mode / fan, clinic pink-on-navy, data-table filter labels, command field name, kit healthcare labels.

## Redesign

`button / group` still clips focus rings (`overflow-hidden`). `hero / ac-remote` radios are extra tab stops (no roving tabindex). `data-table` still has no caption. `app-shell` nav items remain spans.

## Replace

Command palette was a fake listbox. It now exposes `combobox` + `aria-controls`. Keyboard Enter still does not activate a command — treat as a jump mock, not a complete combobox.

## Weak spots

- Icon-only buttons still need an `aria-label` when copied empty.
- Medal G/S/B is still color-forward.
- Kit healthcare chapter cards make a very long 390px page.
