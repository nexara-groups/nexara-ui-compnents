# Round 3 — motion

**From:** [Motion designer critic](bc-cd756930-a8b1-5fd4-89a6-8a1df391016b)  
**Evidence:** interactive smoke (`docs/audit/round-3/interact-*.png`) plus source.

## Verdict

**CONDITIONAL**

Finite count-up, live remote, and countdown clocks are honest. Auto-playing case studies and ornamental button loops still fail the motion contract unless paused.

## Keep

`stats` count-up (reduced motion snaps), `button / toggle|group|theme`, countdown clocks, `chapters` IntersectionObserver, AC remote state.

## Redesign

`case-study / tabs` — now has a Pause control and user selection stops the loop (follow-up in this commit). `hero / ac-remote` unit LED now follows power. `button / swap` is `motion-safe`. `button / flow` remains an infinite ornamental loop gated only by `motion-safe`.

## Replace

`countdown / flip` is not a flip. `stats / ticker` does not tick. `case-study / logo` pills did not drive state until click handlers existed on the tabs variant.

## Weak spots

- Count-up used to finish before the gallery scrolled into view. `useCountUp` now waits for intersection.
- `button / shimmer` and `beam` are still infinite without a pause control.
- Chapters sticky index is now jump buttons; film strips still have no snap.
