# Gradient text — structural audit

Sweep, flicker, shimmer, spark, wave, clip, kinetic, underline, and flip were removed. They were one gradient fill with a different animation. Stroke, marker, and glitch stayed because their anatomy is different, and they were rebuilt.

| Variant | Reference | What is structurally different |
| --- | --- | --- |
| gradient | [Aceternity Text Generate](https://ui.aceternity.com/components/text-generate-effect) and gradient headlines on [21st.dev](https://21st.dev/) | Glyphs clipped to a linear gradient. |
| stroke | Outline type on [21st.dev](https://21st.dev/) | Stroke only. No fill. |
| marker | Highlighter headlines | A bar behind the words, not inside them. |
| glitch | Glitch text on [Uiverse](https://uiverse.io/) and [21st.dev](https://21st.dev/) | Three offset copies. |
| neon | Neon type on [Uiverse](https://uiverse.io/) | A tube glow around solid glyphs. |
| engraved | Letterpress | Inset light and dark, as if pressed into the surface. |
| ribbon | Prize ribbons | A swallowtail band behind the word. Replaces extrude, which was the same glyphs offset. |
| stencil | Stencil lettering | A slot punched through the middle of the glyphs. Replaces foil, which was another metal fill. |
| boxed | Split-flap and tile letters, related to [Magic UI](https://magicui.design/) text blocks | Each glyph in its own cell. |
| script | Script headlines | Italic serif plus a flourish rule. |
| seal | Circular seals | The word is set on a circular path around a center mark. Replaces chrome, which was another metal fill. |
| halftone | Comic halftone type | An outline filled with dots. |

Foil and chrome are both metallic, but foil is a turning conic and chrome is a fixed vertical plate. They are listed separately for that reason.

Ideas were reimplemented. No source was copied.
