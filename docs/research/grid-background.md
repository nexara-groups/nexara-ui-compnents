# Grid background — structural audit

Plus, hatch, diagonal, rings, and scatter were removed. They were the same repeating stroke with a different mark. Graph and dots stay because published libraries ship them as different components, not as hover states.

| Variant | Reference | What is structurally different |
| --- | --- | --- |
| graph | [Aceternity Grid and Dot Backgrounds](https://ui.aceternity.com/components/grid-and-dot-backgrounds) and [Magic UI Grid Pattern](https://magicui.design/docs/components/grid-pattern) | Ruled engineering cells. |
| dots | [Magic UI Dot Pattern](https://magicui.design/docs/components/dot-pattern) | A dot at each intersection. No rules. |
| isometric | Isometric grids on [21st.dev](https://21st.dev/) | A diamond lattice. |
| hex | Honeycomb backgrounds | Pointy hexes. |
| circuit | Circuit patterns | Traces and a pad. |
| blueprint | Blueprint sheets | A blue ground, white rules, and a title block. |
| notebook | Ruled paper | Horizontal rules and a red margin. |
| perspective | [Magic UI Retro Grid](https://magicui.design/docs/components/retro-grid) | A floor in perspective, not a flat tile. |
| topography | Contour maps | Organic curves, not a lattice. |
| herringbone | Parquet floors | A zigzag tile. Replaces crosshatch, which was another diagonal hatch. |
| pixel | Pixel mosaics | Filled cells, not strokes. |
| brick | Masonry | Running-bond rectangles. |

Ideas were reimplemented. No source was copied.
