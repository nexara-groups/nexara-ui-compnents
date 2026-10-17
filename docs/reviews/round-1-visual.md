# Round 1 — visual critic

**Lens:** typography, spacing, color, composition, finish.  
**Bar:** 2026 Linear / Vercel / Stripe / Magic UI / Aceternity / shadcn / Origin. Not a 2022 dark template. Not a craft-fair object pack.  
**Evidence:** attached galleries plus `docs/audit/before/` — I read the nine attached desktop captures and the six extra galleries (grid, typewriter, text-reveal, modal, bento, gradient-text) at cropped 1440-wide bands so type, hairlines, and empty space were visible at real size. I also checked remaining hero / button / aurora / magnetic / navbar / spotlight / flip / draggable / marquee bands. Mobile exists; it is the same empty stack, narrower. There is no light theme to capture.  
**Baseline:** `main` @ `2d03f76` as shipped in the befores. `src/index.css` already declares Geist / Instrument Serif and light+dark tokens. The live docs ignore them and paint `#09090f` / `#f6f3ec` with a boutique serif. The screenshots are the product.

A keep requires **8 on Q, D, and M**. I did not find one.

Previous files in `docs/reviews/` approved the structural pass that replaced hover skins with novelty objects. That pass optimized silhouette uniqueness. Uniqueness without taste is how you get a wax seal in a button library. I am not bound by those approvals.

---

## Score disagreements

I agree with the audit’s headline: **0 / 180 keep**, dark-only caps modernity, carnival palette, empty product. I do **not** agree with the 6–7s. Those scores imply “almost there, polish the finish.” Nothing I saw is almost there. A 7 on this catalogue is a gift that will get a restyle ticket instead of a rewrite.

Only deltas below. Axes unchanged: **Q** design quality, **D** distinctness from siblings, **M** modernity. Verdict follows the new scores.

### Docs chrome

| Surface | Audit | Mine | Why |
| --- | --- | --- | --- |
| Docs shell | 5 / 3 / 4 · redesign | **3 / 2 / 3 · replace chrome** | The first surface a buyer sees. Display serif H1s (“Buttonn” optical, high-contrast oldstyle), gold kickers, cream-on-near-black, no theme toggle, every gallery cell the same `rounded-3xl` well + Copy pill. That is a 2022 Framer template, not a 5. Tokens for Geist and light already exist and are unused. Q=5 treats the shell as scaffolding. It is the brand. |

### Button

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| solid | 6 / 4 / 6 | **4 / 2 / 4 · replace** | White fully-round capsule, ~44px, “Continue,” no weight, no hairline, floating on black. Linear/shadcn primary is a dense 32–36px control, ~6–8px radius, one accent, real label. This is every 2022 dark kit. D=2 because it is the same silhouette as glass / glow / social. |
| gradient | 5 / 5 / 4 | **3 / 3 / 2 · replace** | Orange gel with a top specular. 2018 skeuo leftover. Not Magic shimmer. |
| glass | 6 / 6 / 7 | **4 / 4 / 4 · redesign** | M=7 is the most generous number in the file. What ships is a grey capsule with a faint top edge. No blur depth, no inner refraction, contrast fails on the label. 2026 glass is a low-sat plate over real content, not a frosted lozenge. |
| split | 7 / 8 / 7 | **4 / 6 / 4 · replace** | Orange disc glued to a white pill. 2019 Dribbble “icon well.” Distinct anatomy, costume finish. Q=7 and M=7 would pass a junior critique. A Stripe lead would send it back as a toy. |
| avatar-pill | 6 / 7 / 6 | **4 / 5 / 4 · redesign** | Dark stadium, letter circle, chevron. The model is real (account chip). The execution is a 32px demo with an “N” and no photo, no menu, no density. |
| border-beam | 6 / 8 / 7 | **4 / 6 / 4 · redesign** | Muddy conic rainbow on a dark pill. Magic UI’s beam is a traveling highlight on a 1px hairline. This is a donut. |
| social | 7 / 8 / 7 | **4 / 5 / 4 · redesign** | “Continue with Atlas” + a star on a dark stadium. Not GitHub / Google / Apple. No provider mark, no lockup, no light-mode plate. Q=7 assumes the anatomy is done. It is a labeled pill. |
| segment | 6 / 6 / 6 | **3 / 3 / 3 · replace** | White pill + chevron. That is a dropdown, not a segmented control. Origin’s segment is a 32px track with two or three equal cells and a sliding thumb. |

### Magnetic button

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| pill | 6 / 5 / 6 | **4 / 3 / 4 · redesign** | A white circle/capsule whose label is the word “pill.” No icon, no product verb, no dock context. If this is the “only modern control,” the set is dead. |
| keycap | 5 / 8 / 5 | **3 / 5 / 3 · replace** | ~32px white square with a letter. A key has a well, a legend, a family, and a 1px bottom lip that reads as ABS, not a rounded tile. D=8 overcredits a square. |
| dock | 5 / 7 / 6 | **3 / 4 / 3 · replace** | One blue squircle. macOS dock is a glass shelf of 8–12 icons with magnification. This is an app-icon clipart. |
| badge | 6 / 7 / 6 | **4 / 4 / 4 · redesign** | Dark pill + count. shadcn badge on a button, not a magnetic object. |

### Draggable card

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| glass | 6 / 6 / 6 | **3 / 3 / 3 · redesign** | Empty frosted stadium. Title is the word “Glass.” Caption: “Drag inside the frame.” Glass with no content is a blob. Linear’s panels carry lists, titles, and a reason to pick them up. |
| window | 5 / 7 / 5 | **3 / 5 / 3 · redesign** | Title-bar drag is a real model. What shipped is a 120px empty pane with the word “Window.” No traffic lights that earn their size, no document, no shadow stack. |

### Spotlight card

Shared shell is worse than the audit’s 5s imply. Distinctness is field-swapping inside `rounded-3xl` / `#12131c`. I would not give any of these a 5.

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| profile | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | Purple “AK” circle, “Ada Klein,” a Follow pill, then the word “Profile” as a heading under the row. The card advertises its own variant name. |
| pricing | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | `$48`, two bullets, Choose. Stripe/Origin pricing is a plan object: period toggle, feature rows, footnote, recommended state. This is a price sticker. |
| product | 4 / 4 / 4 | **2 / 2 / 2 · replace media** | Orange-to-cream gradient rectangle labeled “Lamp 04.” There is no lamp. A product card without a product is a color chip. |
| testimonial | 5 / 4 / 5 | **3 / 2 / 3 · redesign** | Five gold stars, one clause, no portrait crop, no company mark. |
| stat | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | `99.9` and a four-vertex polyline. Vercel/Linear stats have axes, comparison, and a unit that means something. |
| music | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | Purple square + a 2px progress rule. No artwork, no time codes. |
| weather | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | `18°` and “H 21 · L 14.” No icon system, no hourly row. |
| notification | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | Orange “N” mark. iOS/Android density this is not. |
| repo | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | `nexara / ui`, one language dot, 128 stars. GitHub’s card has graph, status, and type that fits. |
| task | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | Empty checkbox, one line, a brown “Design” chip. Linear’s issue row is the reference; this is a sticky. |
| article | 5 / 5 / 5 | **3 / 3 / 3 · redesign** | Kicker + headline + “6 min.” No image, no byline lockup. |
| place | 4 / 5 / 4 | **2 / 3 / 2 · replace** | Fake map dots. Not a place. |

### Flip card

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| credit | 6 / 7 / 6 | **3 / 5 / 3 · replace** | The audit’s “only object that reads.” Purple slab, gold rectangle as chip, fake PAN, **Show back sitting on the card face**. That last detail alone is a student demo. 2018 CodePen bank card. A wallet card in 2026 has a real network lockup, correct chip geometry, and no chrome controls on the plastic. |
| product | 4 / 5 / 4 | **2 / 2 / 2 · replace** | Orange slab on cream. Same empty “Lamp 04” as spotlight. |
| flashcard | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | Cream card, the word “Atelier,” Show back. A study card needs term/definition hierarchy, a deck mark, and a face that does not look like a sticky note. |
| profile | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | One lavender circle. |
| pricing | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | `$48` on a dark rounded rect. Same empty plan as spotlight. |
| book | 4 / 6 / 4 | **2 / 3 / 2 · replace** | Red rectangle, “The quiet room.” A book has a spine, type that sits in a cover grid, not a pill of color. |

### Bento grid

The live mosaic at the bottom of the page is the tell: four empty dark tiles with tiny teal polylines and titles like “Chrome” / “Text.” Magic UI / Aceternity bento earns every span. This is a mosaic of placeholders. Variant titles leak into the tiles (`chart`, `quote`, `stat`, `scoreboard`).

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| chart | 5 / 5 / 5 | **3 / 2 / 3 · redesign** | Title is the word “chart.” Spark is four segments. No axes, no series, no time. |
| quote | 6 / 6 / 6 | **3 / 4 / 3 · redesign** | Giant quotation mark, title “quote.” Attribution is a gold em-dash. Magazine pull quotes have a face, a measure, and a name that is not the variant id. |
| editorial | 6 / 6 / 6 | **3 / 3 / 3 · redesign** | Serif title + one muted line + a rule. No image, no deck, no folio. |
| terminal | 6 / 7 / 6 | **4 / 5 / 4 · redesign** | Prompt with the command `terminal`. Right model, toy chrome, no output worth reading. |
| schedule | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | Time gutter + the word “schedule.” One row is not a day. |
| scoreboard | 5 / 7 / 5 | **3 / 5 / 3 · replace** | `2` vs the word “scoreboard.” Sports boards need crests, clocks, and type that can be read at 8px. This is a typesetting joke. |
| stat | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | The figure is the word “stat.” |
| compare | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | Before/after wells. After is a teal wash. No images, no metrics. |
| media | 5 / 6 / 5 | **2 / 3 / 2 · redesign** | Purple wash. Title “media.” |
| calendar | 6 / 7 / 6 | **4 / 5 / 4 · redesign** | Cream paper, carnival orange on the 10th, no events. Closest to an object. Still a widget from a 2021 dashboard kit. |
| kanban | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | One column, “DOING,” two empty chips. Linear’s board is the job. |
| invoice | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | Three line items, `$48 / $12 / $60`, dashed rule. No issuer, no dates, no status. |

### Aurora background

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| aurora | 6 / 6 / 6 | **3 / 3 / 3 · redesign** | Horizontal orange → iris → teal smear in a rounded bar. Not curtains. Aceternity aurora is layered, grainy, full-bleed, and leaves type readable. This is a Gaussian blur chip. The live preview repeats the same three blobs behind “Color that drifts instead of sitting still.” |
| mesh | 6 / 6 / 6 | **3 / 3 / 3 · redesign** | Same three blobs, rearranged. Not a mesh. A 2026 mesh is overlapping radials with noise and a falloff, not three ovals. |
| starfield | 4 / 6 / 4 | **2 / 3 / 2 · replace** | A black rectangle with a handful of 1px dots. Space it is not. |
| meteors | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | One or two hairline streaks. Aceternity meteors fill a field. |

### Grid background

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| graph | 6 / 6 / 6 | **4 / 4 / 4 · redesign** | Fine engineering paper, no vignette, no content, no pointer glow visible at rest. Vercel/Magic grids fade at the edges and sit under a product. This is a texture swatch. |
| dots | 6 / 6 / 7 | **4 / 4 / 4 · redesign** | **M=7 is the single most inflated score in the audit.** Sparse dots on `#0a0a0c`, no fade, no density change, no product overlay. Magic UI dots are a field, not a stamp. |
| isometric | 6 / 7 / 6 | **4 / 5 / 4 · redesign** | Diamond lattice so faint it reads as noise. |
| hex | 5 / 7 / 5 | **4 / 5 / 4 · redesign** | Honeycomb wallpaper. Fine as a pattern, not as a finished background. |
| circuit | 5 / 7 / 5 | **3 / 5 / 3 · replace** | Two rows of pads and traces. A circuit background that isn’t dense looks like a broken underline. |
| blueprint | 5 / 8 / 5 | **3 / 5 / 3 · replace** | Blue graph paper + “SHEET D4 NEXARA.” Color-swap of graph. Paper theater. |
| notebook | 5 / 8 / 5 | **3 / 5 / 3 · replace** | Cream + red margin. Color invert of graph. Not a product surface. |
| perspective | 5 / 8 / 6 | **3 / 5 / 3 · redesign** | A few teal orthogonals. Tron floor, 2016. |
| topography | 5 / 7 / 5 | **3 / 4 / 3 · replace** | Wavy polylines. Contour clipart. |

### Gradient text

Every variant sets the same sentence: “Night, gold, and iris.” That sentence is the palette confession. Twelve treatments of one boutique line.

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| gradient | 6 / 5 / 6 | **3 / 2 / 3 · redesign** | Soft gold → lilac clip on a display serif. No sheen, no motion visible at rest, no 2026 metal/aurora. Default `background-clip: text` from 2016. |
| stroke | 6 / 6 / 6 | **3 / 3 / 3 · redesign** | Gold outline, hairline too thin, no fill strategy. |
| marker | 5 / 6 / 5 | **3 / 3 / 3 · redesign** | Orange rule through the x-height. A highlighter that sits on the baseline, not in the ink. |
| glitch | 5 / 7 / 5 | **3 / 4 / 3 · redesign** | One offset copy in orange. Not a glitch. |
| boxed | 5 / 7 / 5 | **3 / 5 / 3 · replace** | One letter per rounded cell. Type specimen gimmick, not a headline tool. |
| script | 5 / 6 / 5 | **3 / 3 / 3 · replace** | Gold italic + a short rule. Boutique invitation, 2021. |

### Typewriter

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| terminal | 6 / 7 / 6 | **3 / 5 / 4 · redesign** | Traffic-light chip the size of a tag, prompt `~nexara`, phrase “deliberate.” A terminal is a window with a title bar, a scrollbar, and a block of output — or it is inline mono in a sentence. This is neither. |
| chat | 6 / 7 / 6 | **3 / 4 / 3 · redesign** | One grey bubble, one word. iMessage this is not. |
| search | 6 / 7 / 7 | **3 / 4 / 4 · redesign** | **M=7 for a grey stadium with a word and no icon, no kbd, no results.** Raycast/Linear command is the reference. This is a pill. |
| editor | 6 / 7 / 6 | **3 / 4 / 3 · redesign** | A line number and a word. VS Code it is not. |
| split-flap | 6 / 8 / 6 | **4 / 6 / 4 · redesign** | Brown tiles, tracking, “deliberate.” Vestaboard/Aceternity still work as a model. These tiles have no mechanical lip, no family width, no station context. |
| news | 5 / 7 / 5 | **3 / 4 / 3 · replace** | “EVENING EDITION” + a white rule. Newspaper cosplay. |
| lower-third | 5 / 7 / 5 | **3 / 4 / 3 · replace** | Orange pip + “STUDIO.” Broadcast chrome as a typing toy. |
| redaction | 5 / 7 / 5 | **3 / 4 / 3 · replace** | “RESTRICTED” over a black bar. Prop. |
| script | 5 / 6 / 5 | **3 / 3 / 3 · replace** | Gold italic. Same boutique as gradient-text script. |

### Text reveal

The sentence on every variant is “A line that arrives with its own motion.” That is a developer comment, not copy. Twelve frames, one timid line.

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| editorial | 6 / 6 / 6 | **3 / 4 / 4 · redesign** | Drop cap “A” + a muted clause. The cap is the only move. Measure is short, leading is loose, no pull, no folio. |
| headline | 6 / 6 / 6 | **3 / 2 / 3 · redesign** | Huge display serif, three lines of the same placeholder. 2022 agency hero type. No tracking discipline, no optical size, no secondary. |
| marker | 5 / 5 / 5 | **3 / 2 / 3 · redesign** | Same orange underline as gradient-text marker. Sibling collision. |
| outline | 5 / 5 / 5 | **3 / 2 / 3 · redesign** | Same stroke as gradient-text. |
| split | 6 / 6 / 6 | **3 / 3 / 3 · redesign** | One heavy cap, rest muted. Fine as a magazine open. Here it is a typesetting trick on dummy copy. |
| figure | 5 / 6 / 5 | **2 / 3 / 2 · replace** | Empty hairline rectangle. A figure without an image is a box. |
| quote | 6 / 6 / 6 | **3 / 3 / 3 · redesign** | Gold vertical rule + the same sentence in quotes. |
| columns | 6 / 7 / 6 | **3 / 4 / 3 · redesign** | Two words, a center rule. Not columns. A newspaper column has a measure (~35–45ch), a drop, and a jump. |
| annotation | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | Tiny “see note” in the margin. The note has nothing to say. |
| index | 5 / 6 / 5 | **3 / 4 / 3 · replace** | Numbered list of the words in the sentence. Gimmick. |
| running-head | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | Folio rule. Fine in a book. Here it is a decoration over the same line. |

### Floating navbar

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| floating | 6 / 6 / 6 | **3 / 3 / 4 · redesign** | Dark stadium, three words, white Start. Linear/Vercel floating nav has blur, a real wordmark, a 1px hairline, and density that survives scroll. This is a pill. |
| dock | 5 / 7 / 6 | **3 / 4 / 3 · redesign** | Three white dots in a dark bar. Captions unreadable. Not a dock. |
| sidebar | 5 / 7 / 5 | **3 / 4 / 3 · redesign** | Empty app column, four words, a Start pill. No icons, no sections that earn height. |
| overlay | 5 / 6 / 5 | **3 / 3 / 3 · redesign** | Logo + Menu. The overlay itself is not shown. Same docs failure as modal. |
| command | 6 / 7 / 7 | **3 / 5 / 4 · redesign** | Empty search + a ⌘K glyph + Start. Raycast has a results list, icons, kbd rows, and a 1px divider. M=7 is a category error. |
| transport | 5 / 8 / 5 | **3 / 6 / 3 · redesign** | Orange squircle + a 2px scrubber. No artwork, no time, no skip that reads. |
| mega | 5 / 7 / 5 | **2 / 4 / 2 · redesign** | A link row. The mega panel is not in the frame. |
| announcement | 5 / 6 / 6 | **3 / 3 / 3 · redesign** | Full-bleed carnival orange bar. “Nexara is in preview.” That orange is the palette problem in one strip. |
| breadcrumb | 5 / 7 / 6 | **3 / 4 / 4 · redesign** | `nexara / work / notes / atlas` in a dark well. Fine as a primitive. Not a navbar. |
| segmented | 5 / 6 / 6 | **3 / 3 / 4 · redesign** | White chip on “Work” inside a dark bar. Not a segment. |
| wordmark | 5 / 6 / 5 | **3 / 3 / 3 · redesign** | A name and a disclosure. Empty. |

### Modal

The gallery is a column of teal-ring **Open {variant}** pills. Variants are not visible at rest. Scoring modernity 7 on an invisible OTP is a docs fiction. I score what is on the page.

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| dialog | 6 / 5 / 6 | **2 / 2 / 2 · redesign** | Not shown. The trigger is a glow pill. |
| otp | 6 / 7 / 7 | **2 / 5 / 2 · redesign** | Anatomy may be right in source. The gallery hides it. A buyer cannot evaluate an OTP they cannot see. Q and M collapse. |
| command | 6 / 7 / 7 | **2 / 5 / 2 · redesign** | Same. |
| lightbox / wizard / invoice / drawer / share / action-sheet / auth | 5–6 / 6–7 / 5–6 | **2 / 4 / 2 · redesign** | Same. Triggers are not variants. |
| banner | 5 / 6 / 5 | **2 / 2 / 2 · replace** | Not a modal, and still hidden. |
| ticket | 4 / 7 / 3 | **2 / 4 / 1 · replace** | Novelty, hidden. |

### Hero

The audit is right that “Move the furniture” is the loudest reject. It is still too kind to agency / editorial at 6 / 7 / 6. Those are the same headline in a different column.

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| saas | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | Traffic-light window around a grey “Media slot.” No product screenshot. Vercel’s hero is a real app. |
| download | 4 / 6 / 4 | **2 / 3 / 2 · replace media** | Two squircles, orange and lavender, standing in for phones. You cannot polish a squircle into a device. |
| video | 4 / 5 / 4 | **2 / 2 / 2 · redesign** | Empty well + play glyph. No poster frame. |
| logos | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | Word pills: NORTH, KITE, FIELD, HARBOR, LUMEN. Not marks. |
| pricing | 5 / 6 / 5 | **3 / 3 / 3 · redesign** | `$48/mo`, three bullets, same empty plan. |
| agency | 6 / 7 / 6 | **3 / 4 / 3 · redesign** | Masthead index + the same title. Editorial intent, template execution. D=7 is a layout wish. |
| commerce | 5 / 6 / 5 | **2 / 3 / 2 · redesign** | Cream empty square, `$220`, four color dots. No product. |
| event | 5 / 6 / 5 | **3 / 4 / 3 · redesign** | Countdown wells with no event. |
| search | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | Centered title + a search stadium. Empty. |
| dashboard | 4 / 6 / 4 | **2 / 3 / 2 · redesign** | Toy sidebar, “Media slot” pill. |
| editorial | 6 / 7 / 6 | **3 / 4 / 3 · redesign** | Cream square stamped “ISSUE 18.” A magazine cover without a cover. |
| waitlist | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | Five color dots as avatars, an email stadium. 2021 waitlist clone. |

The composed live preview (aurora wash, “Build the room, then move the furniture,” orange/lilac on the last words, a Follow card, carnival pills) is the catalogue in one frame: boutique serif, gradient nouns, empty chrome, no product.

### Marquee

| Variant | Audit | Mine | Why |
| --- | --- | --- | --- |
| logos | 5 / 5 / 5 | **2 / 2 / 2 · redesign** | Uppercase tracking: KYTE FIELD HARBOR LUMEN. Magic UI’s logo cloud is SVG marks. This is a word list. |
| quotes | 5 / 6 / 5 | **2 / 3 / 2 · redesign** | Dark pills with fragments (“Stay late.”). No faces, no names. |
| ticker | 6 / 7 / 6 | **3 / 5 / 3 · redesign** | Gold tape, “LIVE,” dummy issues. Carnival. A 2026 ticker is mono on a quiet bar, one accent for the live pip. |
| pills | 5 / 5 / 5 | **3 / 2 / 3 · redesign** | Component names as chips. A tag cloud of the sitemap. |
| stats | 5 / 6 / 5 | **3 / 3 / 3 · redesign** | `24` / `128` pairs with no unit system. |
| profiles | 5 / 6 / 5 | **2 / 3 / 2 · redesign** | Colored initial circles. |
| log | 5 / 7 / 5 | **3 / 5 / 3 · redesign** | Green-on-black “lint ok / build ok.” Cute. Not a log you would ship. |

---

## Catalogue diagnosis (what specifically looks cheap)

### Type

- Display is a high-contrast oldstyle serif at sizes that need an optical display cut. It is being used as a logo, an H1, a card title, a hero, and a gradient-text specimen. One face cannot do all of that. Geist / a quiet sans for UI, one serif for editorial moments, never for button labels or nav.
- UI copy is under-weighted. Labels sit at ~13–14px in a cream that is slightly warm (`#f6f3ec`) on a slightly cool black (`#09090f`). The temperature fight is the “boutique dark” tell.
- Variant names leak into the component: tiles titled `chart`, `quote`, `stat`, `Glass`, `pill`. That is a docs bug that becomes a visual one. A Stripe page never prints the component API on the object.
- Tracking on logo rows and split-flap is costume tracking (wide, uppercase, no optical compensation).
- There is no type ramp. Hero, card title, and docs H1 are the same voice.

### Spacing

- Gallery cells are oversized wells with a 24–40px object in the middle. The object does not own the frame. 2026 docs (shadcn, Origin, Magic UI) fill the preview or crop it like a product shot. Here the preview is a padded void.
- Internal card padding is even and timid. No tight clusters, no 4/8/12 rhythm, no optical alignment. Spotlight pricing puts `$48` in a sea of `#12131c`.
- Navbars are shown in 160–220px frames that make every bar look like a sticker on a black table.
- Mobile (390) does not recompose. It stacks the same empty wells. Bento on mobile is a column of lonely tiles, not a mosaic.

### Color

- Carnival triad on every page: gold kickers, orange CTAs / announcement / calendar / ribbon / pressable, iris avatars, teal sparks / terminal / glow rings. Current product UI is a quiet neutral + **one** accent. This is four accents and no neutral.
- Hardcoded `#09090f` / `#f6f3ec` / `#ff6a3d` / `#8b7cff` ignore the token file. Light tokens exist and never appear.
- “Glass” is grey paint, not glass. “Gradient” is a two-stop orange. “Aurora” is three Gaussian blobs. None of these have a restrained ramp or noise.
- Gold-on-black for metadata (variant labels, prices, attributions) reads as a luxury-template leftover, not a product accent.

### Composition

- One shell, many fields. Spotlight, flip (the dark ones), hero, and most navs share the same rounded dark plate. Distinctness is copy.
- Fake device chrome (traffic-light live-preview windows) around empty content. The chrome is more designed than the component.
- Objects float. Nothing is grounded with a shadow system, a desk, or a layout grid. Soft shadows, when present, are a single dark wash (`-18px / -24px` black). No layered elevation.
- Bento is demonstrated as a **list of tiles**, not a grid. The one composed mosaic is four empty cells.

### Finish

- Hairlines are `white/10` everywhere. They do not respond to elevation or theme.
- Controls are fully round (`rounded-full`) by default. 2026 product UI is 6–10px. Full-round is the 2021 capsule epidemic.
- Novelty objects are geometrically naive: lightning is a Material bolt, mountains are two polygons, city is a bar chart, wax is a red star, ribbon is a hexagon, phones are squircles, maps are four dots.
- Demo chrome sits **on** the object (Flip “Show back,” Typewriter “Pause typing”). A lead would call that a broken preview, not a component.

---

## Per-component: what a keep-quality variant must look like

Concrete, not slogans. If it does not match this, it is not an 8.

### Button

- **solid:** 32–36px height, 6–8px radius, one accent (indigo from the unused tokens, or near-black on light). Label 13–14px Geist medium. Hairline or no border, not a capsule. Light: white/near-black pair. Dark: elevated plate, not a glowing lozenge.
- **glass:** `backdrop-filter` over a real photograph or dashboard crop, 1px top highlight, 0.6–0.75 opacity, contrast-safe label. If the background is flat black, it is not glass.
- **border-beam:** 1px hairline, a 40–80px traveling highlight, no rainbow conic fill.
- **social:** Real provider marks (GitHub, Google, Apple), 40px, light plate with a true border, provider color only in the mark. No “Atlas.”
- **avatar-pill:** 24px photo, name, optional chevron, menu on click. Looks like an account control in a top bar, not a demo chip.
- Do not ship gel, neumorphism, rivets, offset-shadow brutalism, neon rings, or a separate “pressable lip.”

### Magnetic button

- One product control that leans: a 36px toolbar button, or a dock **shelf** of 6–8 real app icons with magnification, or a keycap **set** (esc, ⌘, K) that looks like ABS plastic in light and dark.
- Strength is visible as a 4–8px translate, not as a costume change.
- If it is not something you would put in Linear’s toolbar or Magic UI’s dock, delete it.

### Draggable card

- A **board** of 2–3 documents, not twelve stationery props.
- **glass / window:** 280–320px, real title, 3–5 rows of content, layered shadow (`0 1px 2px` + large soft), drag from a grip or title bar. Window may keep traffic lights if they are 8px and correctly spaced — not a decoration.
- Polaroid/photo, if kept, is a **photo widget**: image, caption, timestamp — not a cream rectangle labeled Polaroid.

### Spotlight card

- One shell is allowed only if the **anatomy** changes: pricing is a plan table; repo is a GitHub-density object; music is artwork + time + queue; weather is icon + hourly; task is a Linear-like row.
- Spotlight is a 120–180px soft radial at 8–12% white, not a reason to exist.
- No variant-name headings. No gradient blobs as products. No “Move the pointer across the face” as body copy.

### Flip card

- Keep at most two: a **study card** (term / definition, 16:10, quiet type) and a **wallet card** (correct chip, last-four, network mark, no on-card demo buttons). Controls live outside the card.
- Everything else (vinyl, passport, playing card, ticket, book, postcard) is a costume.

### Bento

- Ship as a **composed 3×2 or 4×2** with real Nexara numbers: uptime spark with axes, a calendar with two events, a kanban with three cards, an invoice with a status pill, a quote with a face.
- Cell radius 12–16px, not 24px. Gap 8–12px. One accent. Light and dark.
- A tile whose title is the variant id is unfinished.

### Aurora / grid backgrounds

- **aurora / mesh:** full-bleed, 2–4 large fields, grain at 4–8% opacity, vignette, type sitting on a scrim. Colors from a two-stop brand ramp, not orange+iris+teal.
- **dots / graph:** Magic-density, edge fade, optional pointer brightening. Size 16–24px cells, not a faint stamp.
- **perspective:** only if it is a real floor under a product scene, not three lines.
- No weather icons, no flooring, no blueprint theater.

### Gradient text / typewriter / text reveal

- Gradient text: one or two headline treatments — a restrained aurora clip, a hairline stroke. Sentence is a real product line (“The issue tracker that stays out of the way”), not a palette list.
- Typewriter: terminal (real window), chat (two-bubble thread), search (icon + kbd + results), editor (gutter + syntax), split-flap (mechanical tiles in a station or status board). No slips, barcodes, or lower-thirds.
- Text reveal: editorial (drop cap + 45ch body), headline (one display line + kicker), quote (rule + attribution). No medallions, no empty figures, no indexed word lists.

### Navbar

- **floating:** 48–56px, blur, hairline, wordmark, 3–5 links at 13px, one solid CTA. Compacts by 8px on scroll. Light and dark.
- **command:** input + results list (icon, title, kbd) in a 480–560px panel. If there are no results in the preview, it is not a command palette.
- **sidebar:** 240px, section labels, icons, active state, footer user chip.
- **mega:** the panel is **open** in the gallery, three columns, real links.
- Transport is a player only if artwork and time codes exist. Announcement is a 32px bar in a quiet accent, not carnival orange.

### Modal

- Gallery shows the **open** state for every variant, in a dimmed frame, light and dark.
- **dialog:** title, 1–2 sentences, two buttons (ghost + solid), 8px radius, 24px padding, 480px max.
- **otp:** four or six cells, 44px, resend, email context.
- **command:** same density as the navbar command.
- **drawer / action-sheet:** edge-aware, list rows at 44px.
- No tickets. Banner is not a modal.

### Hero

- Twelve different **pages**, twelve different titles, twelve different product scenes.
- SaaS: a real screenshot or a composed UI (sidebar + table), not “Media slot.”
- Download: device frames with a real screen, or delete the phones.
- Logos: SVG marks, grayscale, 20–24px height.
- Pricing: a real plan card next to the pitch, not `$48` and three bullets.
- Waitlist: input + avatars that are photos or initials on a quiet stack, not a rainbow.
- Copy is Nexara’s. If the title is still “Move the furniture,” the variant is not done.

### Marquee

- Logos: real marks, 120–160px pitch, edge fade.
- Quotes: card with face, name, company.
- Ticker: mono, one live pip, real symbols.
- Stats: number + unit + label, not a pair of digits.
- No hazard tape, medals, stubs, film cells, or squircles.

---

## Reject even after a polish pass

These are the wrong objects. Restyling them (better shadows, Geist, light mode) still leaves a craft-fair library. **Replace the concept or delete.**

**Button.** gradient (gel), neumorphic, pressable, glow-outline, brutalist, skeuomorphic, split (disc+pill costume), segment (it is a dropdown).

**Magnetic.** bulb, sticker, medal, stamp, shutter, ticket, tag, wax, dock (single squircle), keycap (single 32px tile — if a key returns, it must be a set).

**Draggable.** film, sticker, ticket, polaroid-as-blank, dossier, receipt, comic, playing, boarding, postcard.

**Flip.** credit (2018 bank-card tutorial), badge, playing, ticket, passport, vinyl, book, postcard, product-as-orange-slab.

**Spotlight.** product (gradient blob), place (fake dots). The rest can live only if anatomy actually changes; the current shell is not a variant system.

**Aurora.** starfield (as shipped), radar, sunset, clouds, rain, constellation, mountains, city, lightning.

**Grid.** herringbone, pixel, brick, notebook, blueprint, topography, circuit.

**Gradient text.** neon, engraved, ribbon, stencil, seal, halftone, boxed, script.

**Typewriter.** dispatch, shipping, teletype, news, lower-third, redaction, script.

**Text reveal.** medallion, figure, index.

**Navbar.** none are conceptually illegal except treating breadcrumb / announcement / transport as the same component without showing the real chrome. Transport without a player, mega without a panel, overlay without the overlay — those are empty, not wrong. Fill them or cut them.

**Modal.** ticket, banner.

**Hero.** download-as-squircles. The other eleven are the right *page types* and the wrong *content*. They can be redesigned. They cannot be polished as-is.

**Marquee.** stubs, filmstrip, hazard, tiles, medals.

**Bento.** scoreboard (as a typesetting joke). The other content types stay only if they become real cells in a real mosaic.

**Docs chrome.** The current dark boutique shell. Do not restyle Fraunces-on-gold. Replace with Geist, one accent, theme toggle, galleries that show the component.

---

## What I am not doing

I am not approving “calendar,” “command,” “split-flap,” “glass,” or “otp” as seeds. Those are the least-wrong *models*. They are not 8s. A Stripe/Linear lead would not ship any of them in this finish, in this type, in this palette, in dark-only, with this copy.

I am not treating the unused token file as progress. Tokens that do not reach the screen do not count.

---

APPROVE NONE
