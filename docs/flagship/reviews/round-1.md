# Round 1 — critic panel

Compared against: `references/apple.png`, `references/linear.png`, `references/format-obys.png`, `references/temper.png`, `references/21st.png`, `references/serve-robotics.png`. Proof stills from the first Vite paint: `proof/landing-1280.png`, `proof/dashboard-1280.png`, `proof/dashboard-375.png`.

## Visual designer

The closed iris is a real image, not a kit gradient. It has a key light and a brass bezel. That is the right species.

It fails the first-frame test. Apple and Serve put the object *and* the sentence on screen one. Our first paint hid the headline (fade started at scroll 0.16). A saved still of the hero was a black disc. That is not a trending thumbnail.

Dashboard at 375px is a broken product: the sidebar eats the viewport. Linear never does this.

**Verdict: reject.** Fix the first frame and the mobile desk.

## Motion designer

The iris-as-camera idea is the one unexpected move. We could not prove the scroll choreography from the first-paint stills. The 3D plate was not exercised. Kinetic type was not reached.

**Verdict: incomplete.** Need scrolled recordings.

## Front-end / a11y / perf

- Nav and dashboard compete for width at 375.
- Ember-on-ivory CTA contrast is fine. Fog-on-void for helper type is close.
- WebGL not observed in this round.
- Hash routes work. Docs catalogue lists the flagship family.

**Verdict: reject** until the dashboard is a drawer on small screens.

## Sceptical creative director

Would I post this first frame to 21st.dev trending? No. It looks like a loader. Would I send the dashboard to Awwwards? No. It looks like a dark table.

The art direction is clearer than the rejected breadth pass. The execution is not yet a site.

**Gate: fail.**
