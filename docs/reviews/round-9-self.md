# Round-9 self (after visual + motion signed)

Round 7 scored `22635c5`. Visual rejected all. Motion kept 47 and failed 140. This pass does not claim they would now approve.

## Motion contract

- `ShaderMesh`, `ParticleField`, and `GlobeField` draw one frozen frame, then stop `requestAnimationFrame` when paused, reduced, or off-screen.
- `OrbitRing` stops off-screen and counter-rotates labels so they stay upright.
- `button / liquid` has Pause and the blobs sit at 55% behind the label.
- `hero / pin-scroll` has Pause; type sits above a cinema plate (no debug %).
- Grid fields honor reduced motion.

## Visual worst eight

Rebuilt with product content: morph-stage (cinema → reel), orbit-nav (readable nav), orbit-quotes (portraits + quote), pin-sports (sports still + industry page), glare-tilt (Lamp 04 photo + $220), liquid-sheet (bottom sheet with a booking), orbit-pull (short “Go”), tilt-glare pricing (features + recommended).

## Still failing the standout test

Orbit and tilt remain reused. App-kit cells are still thinner. A11y critic has not signed. Do not merge as an Awwwards peer.
