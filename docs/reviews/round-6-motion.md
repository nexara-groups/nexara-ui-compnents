# Round 6 — motion designer

**From:** [Motion designer critic](https://cursor.com/agents/bc-aa277cef-d976-5420-8cdc-b274f896449c)  
**Verdict: APPROVE leftover loops. Hero entrance is still out of scope.**

Evidence: `docs/audit/round-6/focus-button-shimmer.png`, `focus-button-beam.png`, `focus-button-flow.png`, `focus-aurora-aurora.png`, `focus-gradient-text-shimmer.png`; source in `button.tsx`, `button-extra.tsx`, `aurora-background.tsx`, `gradient-text.tsx`, `logo-cloud.tsx`, `marquee.tsx`, `src/lib/utils.ts` (`useLoopControl`); independent Chromium smoke on `#button`, `#aurora-background`, `#gradient-text`, `#logo-cloud` / `#marquee`, and `#marquee` / `#logos`, plus `prefers-reduced-motion: reduce`.

## Verdict

**APPROVE**

The leftover motion bar was visible Pause and `prefers-reduced-motion` on ornamental loops. That bar is met. Pause is a labeled `LoopPause` (`Pause motion` / `Play motion`) beside the loop, not hover-only and not `motion-safe` as a stand-in. Clicking it drops the keyframe class or inline animation. Reduced motion starts the same cells on Play and never attaches `nexara-shimmer`, `nexara-beam`, `nexara-flow`, `nexara-aurora-*`, `nexara-text-pan`, `nexara-kinetic`, or `nexara-logo-marquee`.

Hero entrance was never this brief. `MediaFrame` autoplay when `playing` is omitted is the same named leftover as rounds 4–5.

## What closed

| Loop | Visible Pause | Click stops keyframes | Reduced motion |
| --- | --- | --- | --- |
| `button / shimmer` | Yes. Audit + smoke: Pause sits next to Continue. | Yes. Label flips to Play; sheen `animation-name` is `none`. | Still. Control reads Play. |
| `button / beam` | Yes. Audit + smoke. | Yes. Conic ring stops. | Still. |
| `button / flow` | Yes. Audit + smoke. | Yes. Gradient pan stops. | Still. |
| `aurora-background` aurora / plasma / prism / orbit / stars | Yes. `#aurora` audit shows Pause on the field. | Yes. `nexara-aurora-a/b`, `nexara-orbit`, `nexara-twinkle`, `nexara-meteor` clear. | Still. Play. |
| `gradient-text` gradient / shimmer / aurora / kinetic | Yes. `#shimmer` audit shows Pause beside the line. | Yes. `nexara-text-pan` and `nexara-kinetic` clear. | Still. Play. |
| `logo-cloud / marquee` | Yes. Smoke (no focus PNG for this cell). | Yes. Track loses `nexara-logo-marquee`. | Still. Play. |
| `marquee` | Yes. Own Pause/Play. | Hover and click pause `animation-play-state`. | Static row; control hidden. |
| Typewriter | Already had Pause. | Held. | First phrase; caret hidden. |

`useLoopControl` gates `playing` with `usePrefersReducedMotion`. Buttons also AND `motion-safe:` so CSS and JS both refuse the loop.

## Leftover (not this pass)

- Heroes still have no entrance choreography. New brief.
- `MediaFrame` still autoplays a muted 6s loop when `playing` is omitted. Catalogue reels that pass `playing` + `PlayControl` are fine.
- Loops do not pause off-screen. Same shelf as rounds 2–5; not in the leftover list.
- Static aurora cells (`mesh`, `grain`, `dusk`, `spotlight`, `fog`, `ember`, `tide`) still render Pause. The control is honest on looping fields and a no-op on stills.
- `usePrefersReducedMotion` still defaults `false` before hydration, so a first paint can move, then freeze.

I approve the leftover motion contract. Do not merge until the owner says so.
