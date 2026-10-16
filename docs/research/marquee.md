# marquee

Surveyed 21st.dev Aceternity (Infinite Moving Cards, 3D Marquee) and Motion Primitives (Infinite Slider). Vertical, stepped, double-row, reverse-on-hover, and skew change the track, not the chip colour.

Sources: [21st.dev](https://21st.dev), [Aceternity on 21st](https://21st.dev/@manuarora700/library/aceternity-ui), [Motion Primitives](https://docs.21st.dev/@ibelick/library/motion-primitives), [Spectrum UI](https://docs.21st.dev/@arihantcodes_1f7b8c4d/library/spectrum-ui), plus public catalogues from shadcn/ui, HeroUI, Magic UI, Park UI, and Uiverse. Ideas were reimplemented. No source was copied.

## Selected

- `fade` (Fade): Edge mask and a linear loop.
- `hard` (Hard): No edge fade.
- `skew` (Skew): The track tilts a few degrees.
- `vertical` (Vertical): Items travel upward.
- `reverse` (Reverse): Travels to the right.
- `stepped` (Stepped): Jumps in steps instead of gliding.
- `double` (Double): Two rows travel in opposite directions.
- `outline` (Outline): A framed track with square edges.
- `flush` (Flush): Items touch. No gap.
- `cards` (Cards): Wider gaps, as if each child is a card.
- `reverse-hover` (Reverse on hover): Hover flips direction instead of pausing.
- `mask-y` (Vertical mask): The fade runs top to bottom.

## Rejected

- Extra colour swaps of an existing treatment.
- Variants that only changed duration or opacity.

## Round 2

Round 2 replaced hard, skew, reverse, double, outline, flush, cards, and mask-y with pingpong, cylinder, spotlight, parallax (two speeds, one pause), overlap, velocity, dwell (holds mid-loop), and cascade. Kept fade, vertical, stepped, and reverse-hover.
