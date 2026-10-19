# Round 1 — Accessibility and responsive

Lens: contrast, focus, keyboard, semantics, hit targets, 320–390px reflow, light/dark, reduced motion.

Evidence: `docs/audit/before/` (390×844 and 1440×1100, dark only), `docs/audit/scores.md`, `src/docs/docs-app.tsx`, and current `src/components/ui/*`. Some files have started a token rewrite while this pass ran. Failures below are cited against **HEAD**. Before shots remain the visual record the audit scored: a dark-only hex catalogue with no light capture.

**I am not rescoring Q / D / M.** Those axes are design. I only flag verdicts that over-credit a11y.

---

## Catalogue-wide (blocks every variant)

1. **No light theme in the docs shell.** `DocsApp` paints `bg-[#09090f] text-[#f6f3ec]` and never toggles `:root.dark` (`docs-app.tsx:117`). `index.css:25-46` ships a full light token set and sets `color-scheme: light`. Native controls, scrollbars, and autofill therefore render as light UI on a near-black page. The audit’s “M capped at 6 because there is no light capture” is correct and understates it: this is a **1.4.3 / 1.4.11** failure for anyone on a light OS theme, and a **1.4.1** theming hole for copy-paste consumers.

2. **Hardcoded dark-only colors ignore the tokens that do exist.** `focusRing` in `utils.ts:13-14` tracks `--nx-ring` / `--nx-bg`. Most chrome still uses `#8b7cff`, `#f6f3ec`, `#f5c16c`, `#ff6a3d`, `zinc-400/500`, `white/10`. Tokenized components inherit **light** `:root` values while the gallery stays black, so a “fixed” button is a light-theme control dropped on `#09090f`.

3. **Focus rings fail 3:1 on light fills.** The old ring `#8b7cff` against cream `#f6f3ec` is **2.95:1**, against pressable/gradient orange `#ff6a3d` **1.15:1**, against brutalist gold `#f5c16c` **1.98:1**. The new `focusRing` is better against page offset on light (`#4c46e0` on `#f4f4f1` = 5.85:1) but the docs page is not `--nx-bg`, and several inputs still use `outline-none` with **no** ring (hero search/waitlist, modal command, navbar app-bar search).

4. **Hit targets.** WCAG 2.5.5 / Apple HIG want 44×44. Current defaults: Button `sm`/`md` are `h-9`/`h-10` (`button.tsx:47-48`); Flip “Show back” is `h-8` (`flip-card.tsx:111`); Typewriter pause is `h-8` (`typewriter.tsx:219`); docs Copy is `h-8` (`docs-app.tsx:64`, `variant-gallery.tsx:46`); Magnetic chip is `h-9`; Magnetic “text” has no min box; commerce swatches are `size-7` (`hero.tsx:198`).

5. **Reduced motion is incomplete.** Marquee, aurora curtains, typewriter caret, and button beam/shimmer use `motion-safe` or `usePrefersReducedMotion`. Grid pointer-tracking (`grid-background.tsx:48-52`) does not. Typewriter and gallery marquees still auto-play for >5s with **pause off by default** (`typewriter.tsx:61`, `previews.tsx` `showControls={false}`) — **2.2.2**.

6. **320px reflow.** Props table is `min-w-[40rem]` (`docs-app.tsx:79`) inside `overflow-x-auto` that is not keyboard-focusable. Hero event is `grid-cols-4` at every width (`hero.tsx:211`). TextReveal `columns-2` never stacks (`text-reveal.tsx:116`). GradientText `boxed` emits one bordered cell per character. Agency/studio titles are `text-6xl leading-[0.88]` on a 390px frame.

---

## Contrast from hardcoded dark-only colors

Measured against the docs page `#09090f` / card `#12131c` unless noted. 4.5:1 body, 3:1 UI.

| Pair | Ratio | Where |
| --- | --- | --- |
| `text-zinc-500` `#71717a` on `#09090f` | **4.11** | Docs category labels (`docs-app.tsx:172`), navbar “Library” / mega column labels |
| `text-zinc-500` on `#12131c` | **3.83** | Same muted chrome on cards |
| Auth “or” `text-nx-faint` | **2.73** light / **3.87** dark | `modal.tsx:494` |
| Typewriter prompt `text-white/35` on `#0c0d10` | **~3.4** | `typewriter.tsx:163` |
| Editor gutter `text-white/25` on `#0e1016` | **~2.4** | `typewriter.tsx:180` |
| `--nx-faint` `#96958e` on light `#f4f4f1` | **2.73** | Search glyph (`typewriter.tsx:174`), magnetic key legend (`magnetic-button.tsx:179`), text-reveal index numbers (`text-reveal.tsx:128`), hero “04 — 12” (`hero.tsx:176`) |
| `--nx-faint` `#6f6e68` on dark `#0a0a0c` | **3.87** | Same tokens after `.dark` |
| Grid blueprint `text-sky-200` on light paper | **1.20** | `grid-background.tsx:74` |
| Typewriter `redact`: `text-nx-fg` on `bg-nx-fg` | **1.00** | `typewriter.tsx:208` — the typed string is invisible |
| Bento calendar weekday `#8a8175` on `#f6f3ec` | **3.46** | `bento-grid.tsx:223` (10px) |
| Marquee hazard `#1a100c` on `#111` stripe | **1.01** | `marquee.tsx` hazard sample — letters sit on black bars |
| Stroke-only display (`WebkitTextStroke` 1.4px, fill transparent) | fails as body text | GradientText `stroke`, TextReveal `outline` |
| GradientText `fade` trails to `transparent` | fails by construction | trailing glyphs |
| GradientText `mask` rests on `text-nx-faint` | **2.73** on light | unmasked letters still look like content |
| Button `shimmer` / Spotlight `player` / Typewriter `caption` lock `#111113` + white | dark-only | break on light `--nx-bg` |
| Aurora root `bg-[#07070a] text-[#f3f3ee]` | dark-only | `aurora-background.tsx:86` — children cannot follow the page theme |

Gold `#f5c16c` on `#09090f` is 12:1 — the carnival accent is readable. The failures are **muted chrome, decorative-as-text, stroke type, and anything that assumes a black page**.

---

## Per component

### Docs chrome — `src/docs/docs-app.tsx`, `variant-gallery.tsx`

- Skip link exists (`docs-app.tsx:118-123`). Good.
- No `document.title` update per hash route. Every component is the same browser title.
- Mobile jump `<select>` is labeled (`:141-156`). Filter and the component `<nav>` are `hidden md:block` — acceptable, but the select has no focus ring.
- Props table cannot be reached by keyboard once it overflows.
- Gallery Copy buttons are 32px and announce only “Copy” / “Copied” — no live region.
- Hash links pretend to be a site. `aria-current="page"` on the sidebar is correct; nothing exposes a theme switch.

### Button — `src/components/ui/button.tsx`

Before shots: cream pill, gel highlight, glass hairline, neu, 3D lip, neon ring, split well, avatar pill, conic beam, brutalist offset, rivets, social, segment. Several of those IDs are already gone in HEAD.

Still failing:

- `sm` 36px / `md` 40px (`:47-48`).
- `href` + `loading`/`disabled` drops `href` (`:236`), so the control **leaves the tab order**. A disabled link must keep a focusable name.
- Loading hides the label (`:136`) and does not set `disabled` (`:265`) — stays focusable (good) but the visible name disappears; only `sr-only` “Loading” remains. Width is preserved; name is not.
- `icon` double-wraps `sr-only` children (`:140` and `:218`).
- `shimmer` is hardcoded dark (`:42`). `gradient` / `beam` hardcode `#4c46e0` fills (`:157-177`) — fine in isolation, not themeable.
- Social kicker is 10px (`:214`).
- `link` underline is hover + `motion-safe:group-focus-visible` only. Reduced-motion keyboard users get no underline.
- Before-set focus ring on cream/orange/gold (shots) is the 1.15–2.95:1 failure above. Do not ship those fills with `#8b7cff` and `ring-offset-transparent`.

### Magnetic button — `src/components/ui/magnetic-button.tsx`

Pointer pull is mouse-only and honors reduced motion (`:62`). That part is correct.

- No `aria-label` prop. Empty children → unnamed button. Before `shutter` / `bulb` hid or omitted the name.
- `text` variant is an inline label with a 12px arrow (`:149-157`) — not a 24px target.
- `chip` is `h-9` (`:128`). `key` legend is 9px `text-nx-faint` (`:179`) — 2.73:1 on light.
- `badge` count is a 20×20 decoration with a hardcoded “3” (`:163-165`) — not exposed, not a control, and it overflows the hit box.
- `fab` visible “+” is `aria-hidden`; name is `sr-only` (`:121-122`). Acceptable if children are passed.
- Dock caption is 10px (`:114`).

I do not approve the new set. The magnet is decorative; the control still fails size, name, and faint contrast.

### Draggable card — `src/components/ui/draggable-card.tsx`

Best keyboard object in the kit: `role="group"`, `tabIndex={0}`, arrows + Home, `aria-describedby` hint, polite live position (`:368-462` in the copy I read). Keep that.

Failures:

- Every face is a **dark-or-paper hex object** (`:23-37`) — film, sticker, polaroid, dossier, receipt, comic, playing, boarding, postcard do not follow `--nx-bg` / `--nx-fg`. Paper cards on a black docs page pass internally and fail if the consumer is light-on-white with the dark faces, or the reverse.
- Dossier “File” chip is 10px `#ff6a3d` (`:106`) — orange on `#1a1712` is ~4.6:1, borderline for small caps.
- Window title bar is pointer-only (`onPointerDown`); keyboard still moves the group. Handle is `aria-hidden` — correct, because the group is the widget.
- Default `w-72` + `absolute top-4 left-4` overflows a 390px preview stage. The before mobile shot shows cards clipped by the rounded frame.
- `touch-none` on the card fights page scroll when the stage fills the viewport.

### Spotlight card — `src/components/ui/spotlight-card.tsx`

Before shots: one `rounded-3xl border-white/10 bg-[#12131c]` shell, field-swapped. HEAD now differentiates shells. Semantics did not catch up.

- Root is always `<article>` (`:63`). Pricing “Start Studio” (`:138-140`) and profile “Follow” (`:314`) are `<span>`s that look like buttons.
- Player transport (`:196-214`) is not a slider, not buttons, not a name. `text-white/50` on `#111113`.
- Task checkbox is a real input (`:265-266`) inside an article — operable, but the card is not a form and the checkbox has no accessible description beyond the visual title.
- Spotlight wash is `group-hover` only (`:78`) — keyboard/touch get no equivalent. Acceptable if decorative; do not sell it as the affordance.
- Weather dark text on the blue-to-cream gradient is ~7:1 at the top (pass) but the card is a fixed illustration, not a theme.

### Flip card — `src/components/ui/flip-card.tsx`

The explicit “Show back” / “Show front” control (`:110-121`) is the right pattern. Hidden face uses `inert` + `aria-hidden`. Reduced motion zeros the rotate.

Still:

- Toggle is `h-8` and sits on the face — it covers content and misses 44px.
- `flipOn="hover"` still flips on pointer enter. A keyboard user who also has a mouse parked on the card gets an unexpected turn (**2.3.3** / extra motion). Prefer click-only as default.
- Faces still hardcode dark slabs (`#111113`, `#1a1814`, purple gradients). Credit back shows a fake PAN — not an a11y fail, but the CVV line is content.

### Bento grid — `src/components/ui/bento-grid.tsx`

Grid itself is `grid-cols-1` until `md` (`:48`). That is the correct small-screen behavior.

- Item chrome is still the carnival hex set (`:59-71`, titles forced `text-[#f6f3ec]` at `:133`). Calendar is a cream island; quote gold attribution is fine; calendar weekdays fail 3.46:1.
- Calendar is not a table, has two “T” headers, and only 14 days (`:221-229`).
- Scoreboard uses `title` as the away score (`:180`) — the accessible name of the tile is a number.
- Linked tiles get a focus ring (`:125`); unlinked tiles are static `<div>`s. Fine. The ring is `#8b7cff` on dark-only plates.

### Aurora background — `src/components/ui/aurora-background.tsx`

Scene is `aria-hidden`. Reduced motion freezes curtains/meteors/rain. Good.

- Root locks `bg-[#07070a] text-[#f3f3ee]` (`:86`). Any child inherits cream-on-black even on a light page.
- Rain / twinkle / meteor loops are vestibular if `prefers-reduced-motion` is ignored in an older browser; the hook covers modern ones.
- No pause control. Decorative, so 2.2.2 is weaker — still, `pause` exists and the gallery does not expose it.

### Grid background — `src/components/ui/grid-background.tsx`

- Pointer mask tracking ignores reduced motion (`:48-52`).
- Blueprint legend `text-sky-200` on light `--nx-bg` is **1.20:1** (`:74`).
- Notebook no longer sets a paper ground or dark body text; it is a blue rule on `--nx-bg`. Fine if children set their own color; the demo `text-sm` inherits and can sit on a barely-visible rule.
- Perspective layer is a CSS transform (`:79-88`) — decorative, but it is extra motion for vestibular users with no reduced-motion branch.

### Gradient text — `src/components/ui/gradient-text.tsx`

Rewrite is closer (tokens, `animate && !reduced` on pan). Still not approvable:

- `stroke`: transparent fill, 1.4px stroke (`:66-72`).
- `mask`: base copy is `text-nx-faint` (`:78`) — 2.73:1.
- `fade`: clips to transparent (`:139-147`).
- `boxed`: one cell per character (`:110-120`) — wraps badly at 390px (before shot of the boxed/seal row already overflows).
- `kinetic` uses `motion-safe` (`:125`) but `style={reduced ? undefined : undefined}` (`:126`) is a no-op.
- Default stops are still hex (`:54-56`), not `--nx-accent`.

### Typewriter — `src/components/ui/typewriter.tsx`

See keyboard path below. Visual/contrast:

- `showControls` defaults **false** (`:61`). Gallery does not pass it (`previews.tsx`). Looping type + delete exceeds 5s. **2.2.2 fail** unless the consumer adds a control (the page demo does; the variant grid does not).
- `redact` is `text-nx-fg` on `bg-nx-fg` (`:208`) — 1:1. Sighted users cannot read the output. `sr-only` has the phrases; the visible widget is empty.
- `flap` truncates to 12 glyphs (`:139`) — visual content loss vs the sr-only string.
- `search` is a `<span>` that looks like an input (`:172-176`).
- Terminal / editor / flap / caption lock dark hex plates (`:157-189`).
- Pause control, when shown, is `h-8` and has no `focus-visible` class (`:217-224`).

### Text reveal — `src/components/ui/text-reveal.tsx`

Now staggers with `whileInView` and skips motion when reduced (`:56-70`). That is the right reduced-motion branch.

- `outline` is still stroke-only (`:95-98`).
- `columns` is `columns-2` at every width (`:116`) — 1.4.10 reflow fail at 320px. Reading order is now CSS columns (better than the old even/odd word split), but two 10–12em columns on a 390px frame are unreadable. Before mobile shot of the two-column block already shows that crush.
- `index` folio numbers are `text-nx-faint` (`:128`).
- Default `as="div"` (`:49`). Consumers who want a heading must remember `as`.

### Floating navbar — `src/components/ui/floating-navbar.tsx`

See keyboard path. Visual/responsive from the before mobile shot: most previews are a logo, a “Start” pill, and empty chrome. Dock captions are 10px (`:128`). Overlay links are `text-5xl` (`:130`) and will wrap/clip long labels in the 390 frame. Sidebar without `contained` is `fixed … w-56` (`:164`) and covers a phone. Shrunk floating bar is `py-1` (`:297`).

### Modal — `src/components/ui/modal.tsx`

See keyboard path. Gallery before shots show **only** “Open {variant}” pills (`preview-frames.tsx:19-21`). That is a docs a11y failure: variants cannot be perceived or compared without activating each dialog, and the open state was never captured.

### Hero — `src/components/ui/hero.tsx`

- Cinema play control is a `<span>` (`:123-125`) — not in the tab order, no name.
- Store badges are `<span>`s (`StoreBadge` ~`:336`).
- Shop swatches are unnamed `size-7` spans (`:196-199`). `aria-label="Finishes"` is on a non-interactive group.
- Search and waitlist inputs: `outline-none` and no ring (`:229`, `:292`).
- Event countdown is four columns on mobile (`:211`).
- Studio/agency display type is `text-6xl leading-[0.88]` (`:178`) — clips in the 390 before shot.
- Product/dashboard “nav” items are `<li>` text (`:240-244`).
- Logos quote reuses `eyebrow` as the quotation (`:145`) — if the consumer passed a real eyebrow, the cite is wrong.

### Marquee — `src/components/ui/marquee.tsx`

Component default `showControls={true}` (`:66`) is the correct 2.2.2 default. **Gallery turns it off.** Hover-pause is pointer-only (`:124-125`). Reduced motion freezes the track (`:128-129`). Hazard tape still paints dark text across black stripes. Duplicated track is `aria-hidden`/`inert` (`:106-108`) — keep that.

---

## Keyboard paths

### Modal

What works (dialog core):

- `role="dialog"` + `aria-modal` + `aria-labelledby` / `aria-describedby` (`modal.tsx:361-364`).
- Tab wrap, Escape when `dismissible`, focus restore, scroll lock, `#root inert` (`:40-60`, `:276-339`).
- Close is 44px with `aria-label` (`:431-443`).
- Reduced motion zeros the spring (`:374-377`).
- Demo dialog (name field + Cancel/Save) is a real form with a labeled input.

What fails:

1. **`inert` is hard-coded to `#root`.** Any other mount leaves the page tabbable.
2. **Notice** (audit name: banner) applies `hidden` to the titled header (`:412`) so `aria-labelledby` points at a `display:none` heading. The visible copy is a `<p>` (`:503`). The dialog has no accessible name. Role is still `dialog` for a site-wide strip.
3. **Share** targets are `<div>`s (`:383-388`) — not keyboard operable.
4. **OTP** digits are `<span>`s, not inputs — no `autocomplete="one-time-code"`, no group. Initial focus skips the “field” and lands on Resend or Close.
5. **Command** input is `outline-none` with no ring (`:448`). Not a combobox: no listbox, no arrow-key results.
6. **Drawer** items are inert `<li>`s.
7. **Sheet** (audit name: action-sheet) buttons are 48px (good) but have no focus ring class.
8. **Auth** “or” is `text-nx-faint` (`:494`). Email input has no explicit focus style.
9. Close still uses `#8b7cff` (`:433`). On any cream/paper panel that is **2.95:1**.
10. **Gallery** never shows an open panel, so keyboard users cannot discover variants without opening twelve dialogs.

### Floating navbar

What works:

- `<nav aria-label>`, `aria-current="page"` on items (`:175`, `:125`).
- Overlay: portal dialog, Escape, Tab wrap, restore focus, body scroll lock (`:85-116`, `:316-327`).
- Floating toggle has `aria-expanded` + `aria-controls` (`:301`).

What fails:

1. **Command** “Search or jump” is a `<div>` plus a dead `<kbd>⌘K</kbd>` (`:213-216`). No input, no `keydown`, **no `items` rendered**. It is not navigation.
2. **Transport** skip glyphs are a `<span>◀ ▶</span>` (`:292`). Progress is a decorative div. `items` are not links.
3. **Mega**: click `preventDefault`s and toggles a panel (`:137-140`) with **no `aria-expanded`**, no Escape, no focus move. Columns are static `<p>`s (`:266-273`). Desktop-only links (`:260`).
4. **App bar**: search is `outline-none` (`:204`). Links use `hidden md:flex`. There is **no hamburger**. Mobile loses the items.
5. **Announcement** toggle has `aria-expanded` and **no** `aria-controls` (`:193`).
6. **Wordmark** “Index” is `text-sm` with no min height, no `aria-controls`, no Escape, no trap (`:247-252`).
7. **Floating / announcement** menus are not dialogs. Open does not move focus. Escape is not handled except on overlay.
8. **Dock** is 10px captions + 20px squares (`:128`, `:147`).
9. **Sidebar** has no collapse path.
10. **Segmented** is links, not `tablist` / `radiogroup`.

A keyboard user on a 390px viewport can operate **floating** (Menu) and **overlay**. They cannot operate command, transport, mega (mobile), or app-bar (mobile). That is most of the set.

### Typewriter

Path today:

1. Mount. If `prefers-reduced-motion`, first phrase is static (`:130`). Correct.
2. Otherwise the effect types and deletes on a timer (`:79-128`). No key stops it.
3. `sr-only` concatenates every phrase immediately (`:226`) — screen readers get the full list once; they do not hear per-character updates. That is the right SR choice.
4. Sighted keyboard users get an animation they cannot pause unless `showControls` is true. Default is false. Gallery is false. Demo page adds an external pause — **the variants do not**.
5. Pause button (when present) is 32px, no focus ring, `aria-pressed` only (`:217-224`).
6. Nothing is a text field. Search / terminal / editor are spans. Tab skips the widget entirely unless controls render.

Required path: Tab to a pause control that is **on by default** whenever `loop` or the run exceeds 5s; Space toggles it; reduced motion shows the first complete phrase and hides the caret (already true).

---

## What must be true before I approve a redesigned variant

I will approve a variant only when **all** of the following are true. Design quality is out of scope here.

1. **Contrast, both themes.** Body/UI text ≥ 4.5:1 (3:1 large). Non-text UI and the **focus ring** ≥ 3:1 against the adjacent fill *and* the page. Measure on `:root` and `:root.dark`. No hex that only works on `#09090f`. No `zinc-500` / `--nx-faint` on body copy. No transparent-fill stroke as the only copy. No `color-scheme: light` on a dark-painted surface.

2. **Focus is visible.** Every control uses `focusRing` (or equivalent). No `outline-none` without a replacement. Offset color is the **page** token, not `transparent`.

3. **Hit target.** Interactive pieces are ≥ 44×44 CSS px, or ≥ 24×24 with 44px spacing (2.5.8). Docs Copy, flip toggle, magnet text, and `sm` buttons must meet this or stop being the default.

4. **Correct control.** Buttons are `<button>`. Links have `href` and stay in tab order when disabled (`aria-disabled`, href kept). Inputs are `<input>` / `<textarea>`. Dialogs are `role="dialog"` with a **visible** name. Menus are disclosure or dialog with `aria-expanded`, `aria-controls`, Escape, and focus move. Fake search/OTP/player/share cells are real widgets or they are not shipped as those products.

5. **Keyboard complete.** Tab / Shift+Tab / Enter / Space / Escape. No pointer-only activation for a named action (hero play, share targets, transport skips, command field, mega). Modal trap + restore + inert **the actual app root**. Navbar: every variant exposes `items` at 320px.

6. **Motion.** `prefers-reduced-motion` shows the end state. Anything that moves >5s has a visible pause that works with keyboard and touch (2.2.2). Hover-only pause does not count.

7. **Reflow.** 320px wide, 200% zoom, no two-column text, no 4-up countdown, no horizontal paint that clips names. Overflow regions are focusable or they do not exist.

8. **Gallery proves it.** Open modal variants at rest (or a second “open” frame). Show the navbar menu open. Show typewriter/marquee pause. Light **and** dark shots. I will not approve from a closed trigger pill.

---

## Scores — disagreements only

I am not rewriting the Q / D / M table. Design scores can stay.

- **Docs shell M=4 / “no theme toggle”.** Agree, and I would treat this as a hard a11y gate, not a modernity note.
- **Button glass “contrast is thin”.** Label cream-on-dark-glass **passes** AA. The fail is the hairline (`white/10`–`white/35`) and the focus ring on light fills, not the word “Continue”.
- **Modal otp / command M=7, “keep; show it open”.** Do not keep. OTP is not a field. Command is not a combobox. Showing them open does not make them operable. Audit `banner` is now `notice` in source; the name is still hidden.
- **Typewriter search M=7 / Navbar command M=7.** Same hole: they look like search and are not focusable fields. Modernity is irrelevant until they are widgets.
- **Marquee `showControls` documented as default true** (`catalog.tsx`) while the gallery passes false — the audit did not score that lie; I will reject any “pause exists” claim that is not in the variant frame.
- **Keep as-is: 0 / 180.** Agree from this lens. The in-flight token rewrites do not yet meet the bar above.

---

## Verdict

**APPROVE NONE**
