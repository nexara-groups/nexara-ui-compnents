# typewriter

Surveyed 21st.dev Aceternity (Typewriter Effect, Encrypted Text, Flip Words) and Motion Primitives (Text Scramble, Text Loop, Text Morph). Scramble, word bursts, fade, ghost, and stream are different mechanisms, not recolored carets.

Sources: [21st.dev](https://21st.dev), [Aceternity on 21st](https://21st.dev/@manuarora700/library/aceternity-ui), [Motion Primitives](https://docs.21st.dev/@ibelick/library/motion-primitives), [Spectrum UI](https://docs.21st.dev/@arihantcodes_1f7b8c4d/library/spectrum-ui), plus public catalogues from shadcn/ui, HeroUI, Magic UI, Park UI, and Uiverse. Ideas were reimplemented. No source was copied.

## Selected

- `caret` (Caret): Types and deletes with a thin caret.
- `block` (Block): Types in bursts of three characters under a block cursor.
- `underscore` (Underscore): A baseline cursor instead of a bar.
- `scramble` (Scramble): Random glyphs lock in from the left.
- `fade` (Fade): Whole phrases crossfade. Nothing deletes.
- `word` (Word): Appears a word at a time.
- `terminal` (Terminal): A prompt sits in front of the phrase.
- `highlight` (Highlight): Typed text sits on a marker.
- `blur` (Blur): The newest letters stay soft.
- `instant` (Instant): Phrases swap whole, on a timer.
- `ghost` (Ghost): The next phrase sits faintly behind the caret.
- `stream` (Stream): Phrases join into one line, then clear.

## Rejected

- Extra colour swaps of an existing treatment.
- Variants that only changed duration or opacity.

## Round 2

Round 2 replaced block, underscore, terminal, highlight, instant, ghost, and stream with reverse, slot, strike, overwrite, morph, complete, and cut. Slot renders locking columns. Kept caret, scramble, fade, word, and blur.
