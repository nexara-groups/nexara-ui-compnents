# Round 2 — accessibility and responsive

**Lens:** contrast, focus, keyboard, small viewports, light and dark.  
**Evidence:** after mobile + desktop, light + dark. Live theme toggle.

## Verdict

**Approve the shell and the structural set.** Light mode exists. Tokens carry contrast. Focus rings use `--nx-ring`. Mobile galleries stack; navs sit in frames; heroes drop to one column.

**Hold:**
- Tooltip still wraps the trigger in a `tabIndex={0}` span. Nested buttons get an extra tab stop.
- OTP inputs are four separate fields without paste/arrow wiring.
- Toast is a static `role="status"` with no live region manager.
- Some aurora labels are white on a pale fog field.
- Icon button needs a visible label in the gallery (`Go` is present; empty icon in isolation would fail).

Mobile 390 captures do not clip the galleries. Pricing tables scroll. Footers wrap. That is enough to lift M on responsive.

## Debate

Lead said “a library that cannot render light mode is not a library.” It can. I withdraw the system reject.

I will not approve tooltip until the extra tab stop is gone. Builder left it for a follow-up; I recorded it here.
