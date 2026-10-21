# Role debate — navbar family

Six seats. The brief is the same one that saved heroes: visual-first, 16+ languages, original code, no OSS ports. Existing `navbar.tsx` (rail / capsule / column / …) is treated as failed Helio furniture.

## Researcher

AI-era marketing navs in 2026 cluster hard:

- **Linear / Vercel / Cursor** — thin dark bars, one product mega, one CTA. The bar is a hairline, not an object.
- **Raycast** — the product *is* a command field. Marketing site still uses a conventional bar plus a fake window.
- **Arc** — spaces as a switcher. The browser chrome is the nav.
- **Framer** — marketing mega with large previews. Dense.
- **Stripe** — taxonomy. Products have names, not icons.
- **Apple** — shrinking blur, global mega, the bar dissolves into the hero.
- **21st.dev / Aceternity / Magic UI** — a graveyard of identical glass pills, lucide mega grids, and a macOS dock clone.

Trend, not a recipe: objecthood (the nav is a thing), live chrome (numbers, previews, named people), and a designed small-screen surface. Copying the pill from Efferd or Wensity is how the last navbar family died.

## UX strategist

A navbar has three jobs and they are not equal: **where am I**, **where can I go**, **what is the one next act**. Kill anything that hides destinations behind a hover-only chevron. Mega menus need a live plate (a still, a sparkline, a named doctor) or they are a sitemap. Command-palette nav is allowed only if empty-state results are already filled.

Mobile is not a hamburger that dumps the desktop list. Each language needs its own small surface: a visit card, a fixtures list, a numbered work index, a tray that grew out of the island. Keyboard: arrows inside the bar, Escape out of overlays, Tab through, `aria-current` on here, `aria-expanded` on disclosures, focus trap when the curtain is down.

Docs (`crumb`) is a different job from marketing. Orientation plus progress. Do not put Get tickets on a docs bar.

## Visual designer

Sixteen languages means sixteen **objects**, not sixteen accent hexes on a `rounded-full backdrop-blur` pill.

- A floating capsule is glass and magnetic. It is not a full-bleed bar.
- A scoreboard strip is gold type on wet track. It is not a clinic.
- A plant selector is industrial, with a live degree.
- A curtain is type as architecture.
- A dock is a rack on a sill, not Finder.
- A rail is a column with a pip.

Typefaces already in the kit (Syne, Archivo, Outfit, Newsreader, DM Sans, Fraunces, Space Grotesk, Bebas, IBM Plex) are enough if each language commits. Kill the shared Helio serif wordmark.

## Motion designer

Signature per language, felt in one second:

| id | signature |
| --- | --- |
| pill | magnetic drift on links |
| banner | strip collapses into the bar |
| tabs | layoutId liquid spring |
| clinic | pulse on “in clinic” |
| league | counting time |
| pop | colour chips float |
| mega | preview ken-burns / swap |
| command | typeahead + selection spring |
| follow | spotlight tracks `--mx` |
| crumb | progress hairline |
| kiln | temperature count |
| split | x-split on scroll |
| island | morph width/radius/job |
| curtain | letter stagger + trap |
| dock | scale by pointer distance |
| rail | pip + collapse |
| folio | index numbers rise |
| portal | agent count + k hint |

Reduced-motion keeps the last frame (open stays open, island stays in the current job). Do not fade the CTA to 0 on load — heroes already taught us that stills go blind.

Motion-richness < 8 is a gate fail even if the still is pretty.

## Front-end / a11y engineer

Non-negotiable: `nav` landmark, skip-to-content in studio samples, 44px targets on small screens, `:focus-visible` rings that pass contrast on each ground, `aria-current="page"`, `aria-expanded` + `aria-controls` on every disclosure, focus trap + Escape on curtain/mega/command/island tray, no `outline: none` without a replacement. Hover-open megas must also open on click and Enter. Dock magnification is pointer-only sugar; labels remain.

The existing kit (`Magnetic`, `useFocusTrap`, `springs`, `Grain`) is reusable. Do not import hero layouts. Sit the nav on a **sample plate** so studio and shots read in context without coupling families.

375 / 768 / 1280. Side rail becomes an overlay below 768. Pill stays a pill until 640, then a sheet.

## Devil’s-advocate creative director

If I can paste a screenshot into the 21st.dev navbar gallery and it disappears, it is dead.

Kill:

- Generic hamburger fallback (the brief already forbade it).
- Glow-outline pill rack (the current library sin).
- Lucide 4-column mega (Aceternity’s navbar-menu).
- iPhone Dynamic Island screenshot with traffic-light dots.
- Magic UI dock with Finder icons.
- Raycast window chrome as a marketing header.
- Six industry “kits” that are the pill recolored teal / rust / gold / pink.

Survive only if the object changes: a scoreboard, a plant selector, a numbered work index, a notch that becomes an ops tray, a curtain of film titles, a command field that already lists tonight’s files.

The bar must sit on a real first screen. A navbar on a blank canvas is a component thumbnail, not a product.

## Verdict

Eighteen languages proceed to mockup. Shared Helio rail/capsule/column/path/map/command/dock/mast/curtain/island/galley is retired. Gate: every critic ≥ 8, not weakest of four vs Linear / Vercel / Apple / Framer (or the strongest 21st mega), and motion-richness ≥ 8.
