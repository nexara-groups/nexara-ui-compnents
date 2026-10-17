# Round 2 — accessibility and responsive

**Lens:** contrast, focus, keyboard, small viewports, light and dark.  
**Evidence:** after mobile + desktop, light + dark. Live theme toggle.

## Verdict

**Approve the shell and the structural set.** Light mode exists. Tokens carry contrast. Focus rings use `--nx-ring`. Mobile galleries stack; navs sit in frames; heroes drop to one column.

**Hold:**
- OTP inputs are four separate fields without paste/arrow wiring.
- Toast is a static `role="status"` with no live region manager.
- Some aurora labels are white on a pale fog field.
- Icon button needs a visible label in the gallery (`Go` is present; empty icon in isolation would fail).

Mobile 390 captures do not clip the galleries. Pricing tables scroll. Footers wrap. That is enough to lift M on responsive.

## Debate

Lead said “a library that cannot render light mode is not a library.” It can. I withdraw the system reject.

The extra tooltip tab stop is gone: the wrapper no longer takes focus when the child is already a control. Typewriter and marquee galleries now expose pause (2.2.2). OTP paste/arrow wiring is still open.
