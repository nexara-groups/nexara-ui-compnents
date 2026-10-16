# flip-card

Surveyed 21st.dev Aceternity (3D Card, Text Reveal Card) and common flip interactions on Uiverse and Magic UI (hover flip, book hinge, peel). 21st has fewer than ten flip motions, so the rest come from those interaction patterns, rebuilt here.

Sources: [21st.dev](https://21st.dev), [Aceternity on 21st](https://21st.dev/@manuarora700/library/aceternity-ui), [Motion Primitives](https://docs.21st.dev/@ibelick/library/motion-primitives), [Spectrum UI](https://docs.21st.dev/@arihantcodes_1f7b8c4d/library/spectrum-ui), plus public catalogues from shadcn/ui, HeroUI, Magic UI, Park UI, and Uiverse. Ideas were reimplemented. No source was copied.

## Selected

- `yaw` (Yaw): Classic horizontal turn.
- `pitch` (Pitch): Turns over the top edge.
- `hinge-left` (Hinge left): Opens like a book from the left edge.
- `hinge-top` (Hinge top): Swings down from the top edge.
- `fade` (Fade): Crossfades instead of rotating.
- `slide` (Slide): The front slides off to the side.
- `rise` (Rise): The front lifts away vertically.
- `zoom` (Zoom): The front shrinks away as the back arrives.
- `peel` (Peel): The front peels from the top-right corner.
- `cube` (Cube): Faces sit on a shallow cube.
- `shutter` (Shutter): A vertical wipe reveals the back.
- `tilt` (Tilt): A short 3D tip rather than a full spin.

## Rejected

- Extra colour swaps of an existing treatment.
- Variants that only changed duration or opacity.

## Round 2

Round 2 replaced hinge-top with shuffle, rise with split, zoom with iris, cube with box (a side wall plus depth), and tilt with fold (the front folds down). The leaving face is inert so it cannot take clicks. Kept yaw, pitch, hinge-left, fade, slide, peel, and shutter.
