# spotlight-card

Surveyed 21st.dev Aceternity (Card Spotlight, Glare Card, Evervault Card, 3D Card, Hover Border Gradient) and Motion Primitives (Spotlight, Tilt, Glow, Border Trail).

Sources: [21st.dev](https://21st.dev), [Aceternity on 21st](https://21st.dev/@manuarora700/library/aceternity-ui), [Motion Primitives](https://docs.21st.dev/@ibelick/library/motion-primitives), [Spectrum UI](https://docs.21st.dev/@arihantcodes_1f7b8c4d/library/spectrum-ui), plus public catalogues from shadcn/ui, HeroUI, Magic UI, Park UI, and Uiverse. Ideas were reimplemented. No source was copied.

## Selected

- `glass` (Glass): Frosted card with a pointer-following wash.
- `solid` (Solid): Opaque face, same traveling light.
- `outline` (Outline): Open face until the hairline lights up.
- `ink` (Ink): Near-black field so the wash reads as a lamp.
- `border-beam` (Border beam): A light travels the perimeter while the pointer glows inside.
- `tilt` (Tilt): The card leans in 3D toward the pointer.
- `glare` (Glare): A diagonal sheen slides across the face.
- `lens` (Lens): Tighter glow and a slight content zoom.
- `aurora-rim` (Aurora rim): The edge cycles flare into iris under the pointer.
- `inset` (Inset): Recessed well with an inner shadow.
- `holographic` (Holographic): Iridescent cone that turns with the pointer.
- `noise` (Noise): Film grain over a warm dark face.

## Rejected

- Extra colour swaps of an existing treatment.
- Variants that only changed duration or opacity.

## Round 2

Round 2 replaced solid with parallax orbs, outline with a clipped reveal, ink with a comet, lens with fisheye, aurora-rim with a magnifier disc, inset with a ripple ring, and noise with a scan line. Tilt now rotates inside a perspective wrapper. Kept glass, border-beam, glare, and holographic.
