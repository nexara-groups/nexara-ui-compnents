# magnetic-button

Surveyed 21st.dev Motion Primitives (Magnetic) and Aceternity hover buttons. One magnet behaviour is not enough, so the set adds repel, orbit, lag, snap, stretch, lift, glow, wobble, chase, and press as separate pointer responses. The button skin stays on the Button variant prop.

Sources: [21st.dev](https://21st.dev), [Aceternity on 21st](https://21st.dev/@manuarora700/library/aceternity-ui), [Motion Primitives](https://docs.21st.dev/@ibelick/library/motion-primitives), [Spectrum UI](https://docs.21st.dev/@arihantcodes_1f7b8c4d/library/spectrum-ui), plus public catalogues from shadcn/ui, HeroUI, Magic UI, Park UI, and Uiverse. Ideas were reimplemented. No source was copied.

## Selected

- `attract` (Attract): Pulls toward the pointer.
- `tilt` (Tilt): Rotates toward the pointer with little travel.
- `repel` (Repel): Moves away from the pointer.
- `stretch` (Stretch): Scales along the pointer axis.
- `lag` (Lag): Heavy spring that trails the pointer.
- `snap` (Snap): Stays put, then jumps once the pointer is close.
- `orbit` (Orbit): Circles the resting point around the pointer angle.
- `lift` (Lift): Rises as the pointer approaches.
- `glow` (Glow): Proximity drives a bloom more than motion.
- `wobble` (Wobble): Loose spring that overshoots.
- `chase` (Chase): The label chases farther than the shell.
- `press` (Press): Squashes as the pointer enters the field.

## Rejected

- Extra colour swaps of an existing treatment.
- Variants that only changed duration or opacity.

## Round 2

Round 2 replaced lag with sling (exit velocity flings the control) and chase with peel (the shell stays, the label shears). Kept attract, tilt, repel, stretch, snap, orbit, lift, glow, wobble, and press. Ideas from Motion Primitives magnetic buttons and Uiverse tilt/press controls, rewritten.
