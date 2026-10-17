# Round 1 — design lead reject

**From:** Design lead (owner’s team)  
**To:** Nexara UI  
**Date:** 17 Oct 2026  
**Baseline:** `main` @ `2d03f76`  
**Evidence:** `docs/audit/INDEX.md`, `docs/audit/scores.md`, `docs/audit/before/*`, live docs at `http://127.0.0.1:5173`  
**Standard:** 21st.dev, Magic UI, Aceternity, shadcn blocks, Origin UI, Linear, Vercel, Stripe, Raycast — not Uiverse, not CSS3Shapes, not a postage-stamp CodePen.

---

## Verdict

**REJECT ALL.**

This is not a 2026 component library. It is a dark boutique kit (Fraunces + Outfit, carnival gold/iris/teal, `#09090f`) with a second-act craft fair glued on (wax, stamps, tickets, hazard tape, lightning clipart). Previous rounds approved motion bugs, then a “structural pass” that swapped hover skins for novelty objects. That pass solved a spreadsheet of sameness and destroyed the product.

Nothing in the 180-variant catalogue would ship on Linear, Vercel, Stripe, or Raycast. Nothing would be accepted as a 21st.dev / Magic UI / Origin block. **0 / 180 keep.** I agree with the audit on that number. I do not agree that 118 of those are honest “redesigns.” Most of the redesign bucket has no product reason to exist and should be deleted, not restyled.

Do not bring this back until tokens, type, light/dark, and real product anatomies exist. Do not ask for a variant-by-variant exception. There is nothing here to exception.

---

## The memo we would send

Nexara is supposed to be copy-ready components for agents and people. What you shipped is a theme-park of controls that cannot appear in a product.

Open the Hero gallery. Twelve “pages.” Every title is **Move the furniture**. The SaaS window is a traffic-light chrome around an empty pane. The download hero is two rounded rectangles, orange and purple. The video hero is a play glyph on a gradient. Logos are word pills, not marks. The dashboard is a toy sidebar. Waitlist avatars are color dots. On mobile it is the same empty stack, just narrower. shadcn’s dashboard block, Vercel’s marketing pages, and Stripe’s scenes show a real product. You showed a prompt.

Open Buttons. The default is a white capsule that says Continue. Gradient is a 2018 gel highlight. Neumorphic is a 2020 Dribbble tutorial. Pressable is a game-UI lip. Skeuomorphic has rivets. Brutalist is the offset-shadow meme. Glow-outline is a 2021 neon ring. The live preview is a row of carnival pills. Linear’s primary is a dense, slightly rounded control on a quiet field. Yours is a costume shop.

Open Magnetic Button. A light bulb. A wax seal with a drip. A postage stamp. A medal on a ribbon. A camera shutter. A punched price tag with a string. The research doc cites **Uiverse** for the bulb and **CSS3Shapes** for the tag. That is the wrong shelf. Magic UI’s dock and Aceternity’s magnets are product chrome. This is a sticker sheet.

Open Aurora. The hero line is “Color that drifts instead of sitting still.” Then: a sun disc, two green triangles labelled mountains, a rectangle skyline, three dots and a polyline labelled constellation, and a yellow lightning **glyph**. That is clipart. Aceternity’s aurora and Magic UI’s mesh occupy the whole field and still leave type readable. You drew weather icons and called them backgrounds.

Open Marquee. Logo row is `KYTE FIELD HARBOUR` in tracking. Then ticket stubs, a filmstrip of color cells, diagonal hazard tape, squircle tiles, and a row of medals. Magic UI’s logo cloud is real SVG marks on a quiet track. Yours is a construction-site carnival.

Open Spotlight. Twelve cards, one shell: `rounded-3xl`, hairline, `#12131c`. Profile is an avatar row. Pricing is `$48` and two bullets. Product is an orange gradient blob called Lamp 04. Place is four fake map dots. Stripe’s pricing is a plan object. Origin’s cards have fields, density, and a reason. You swapped the middle widget and kept the frame.

Open Modal. The gallery is a column of teal **Open {variant}** pills. The variants are not visible at rest. That is a docs failure so complete it would fail a hiring take-home. Origin and shadcn show the dialog. You showed the trigger and hoped we would imagine the rest.

The docs shell is the same problem at catalogue scale: dark-only, no theme toggle, boutique serif, gold/orange accents, props tables that look like a 2022 Framer template. A library that cannot render light mode is not a library. It is a demo reel.

We are not reviewing craft. Craft was the wrong assignment. We are reviewing whether this can sit next to Geist, next to a Stripe number, next to a Raycast palette, and not look like a student pack. It cannot.

---

## What the previous “structural pass” did

Every component in `docs/reviews/` has the same plot:

1. Rounds 1–3 fixed motion, focus, and a11y. Builder and critic **Approved**.
2. A variant pass shipped twelve hover skins of one control. Critic **Approved**.
3. A “structural pass” noticed the skins were the same anatomy. Correct diagnosis.
4. The cure was **novelty objects**. A “strict critic” signed each set. Builder agreed.

That critic was not strict. They used **silhouette uniqueness** as the bar. Distinctness without modernity is how you get a wax seal in a button library. The owner’s bar is **different product anatomies, executed at Linear/Vercel density, in light and dark**. The pass optimized the wrong axis and made the library worse.

| Component | What got deleted (flawed but on-brief) | What replaced it (off-brief) | Why it is worse |
| --- | --- | --- | --- |
| Button | Motion treatments on one control (swap, flood, shimmer, liquid, hold) | Neumorphic, pressable, skeuomorphic, brutalist, glow-outline | Hover skins were generic. Rivets and gel are dated. You traded “same button” for “museum of 2021 buttons.” |
| Magnetic | One pill, twelve springs | Bulb, wax, stamp, medal, sticker, shutter, ticket, tag | Springs were one object. Objects are now toys. Research pointed at Uiverse / postage-stamp CSS, not Magic UI. |
| Marquee | Loop modes (fade, ping-pong, cylinder, cascade) | Hazard tape, medals, stubs, filmstrip, color tiles | Motion modes were thin. Caution tape is a festival landing from 2021. Still no real logos. |
| Draggable | Snap-grid, carbon ghost, stack | Comic, playing card, boarding pass, polaroid, film sprockets, receipt | Board behavior is a product problem. Stationery is a Dribbble problem. |
| Flip | Different turns (yaw, pitch, hinge, peel, fold) | Vinyl, passport, playing card, postcard, ticket | One Y-flip in twelve costumes. Credit-card is the only object that belongs in software; it is still a flat purple slab. |
| Aurora | Field motions (drift, waves, ripple, vortex) | Radar rings, sunset clipart, rain, lightning glyph, triangle mountains, rectangle city | You left the domain of backgrounds and entered iconography. |
| Gradient text | Glyph motions (sweep, shimmer, flicker) | Prize ribbon, stencil gap, circular-path seal, halftone | “Night, gold, and iris.” twelve times. The seal is a gimmick. Magic UI aurora text is still a line of type. |
| Typewriter | Typing tricks | Dispatch slip, shipping barcode, teletype roll, lower-third | Search/chat/terminal are product. Radio slips are props. |
| Text reveal | Entrances | Medallion, running-head | The line is still “A line that arrives with its own motion.” Twelve frames, one timid sentence. |
| Spotlight | Pointer washes (glare, comet, fisheye, scan) | Twelve documents in one card shell | Correct that washes are not variants. Incorrect that a blob and a fake map are variants. Anatomy did not change. |
| Hero | Column rearrangements of one headline | Twelve page types, one title, empty media | Correct that columns are not variants. Then you faked twelve products and put the same sentence in all of them. |
| Modal | Entry edges (sheet, fullscreen, split) | Ticket, banner-that-is-not-a-modal, OTP hidden behind a pill | Gallery conceals the work. Banner is taxonomy failure. |
| Grid | More line patterns | Herringbone parquet, brick, pixel | Flooring is not product UI. Vercel/Magic density was the job; you added a kitchen backsplash. |
| Navbar | Same links, different docks | Transport bar, empty mega, empty sidebar, wordmark | Command is the only brief that belongs. It has no kbd, no results, no Raycast density. |
| Bento | Tile washes | Scoreboard, invoice, kanban, calendar | Right instinct (content types). Cells are empty. Magic UI bento earns every span with product. Yours is a mosaic of placeholders. |

The pass also did something quieter and worse: **it filled the catalogue before the primitives existed.** You built wax seals, comic panels, and hazard tape, and you still do not have input, tabs, accordion, tooltip, toast, avatar, badge, a pricing section, testimonials, or a footer. Origin and shadcn would not start a library this way. 21st.dev would not publish it.

A second-order failure: the reviews treat “Approved” as a quality signal. Those approvals were engineering (focus trap, loop gap, spotlight diameter). They were never visual. Citing them as design sign-off is how this reached 180 variants with 0 keepers.

---

## Minimum bar for approval

Do not resubmit a restyled carnival. Resubmit a product system. All of the following are required. Partial credit is a reject.

### 1. Light and dark as first-class

- Tokens, not hardcoded `#09090f` / `#f6f3ec`.
- A theme toggle in the docs shell. Both themes captured at 1440 and 390 for every gallery.
- Linear/Vercel/shadcn/Origin all ship both. Dark-only caps modernity at 6 forever. That is an automatic catalogue fail.

### 2. Type

- Body/UI: Geist (or a licensed equivalent with the same metric: neutral, tight, tabular figures).
- Display, if any: Instrument Serif or a similarly quiet editorial face, used sparingly.
- **Kill Outfit + Fraunces.** That pairing is the 2022 Framer boutique. It will not pass.
- Tracking, size, and line-height must match shadcn/Linear density, not poster type on a marketing card.

### 3. Color

- One quiet neutral field. One accent. Hairlines at ~8–12% contrast, not carnival gold on every surface.
- No iris/teal/orange rotation as identity. Stripe and Linear do not look like a gradient pack.
- Glass is low-saturation, contrast-safe, with a solid fallback. Not 2021 blob-behind-frost.

### 4. Density

- Controls: shadcn `h-9` / `h-10` territory, not 48px capsules.
- Cards: real fields, not 80px of padding around one number. A pricing card is a plan (name, price, period, 5–8 features, CTA), not `$48` and two bullets.
- Bento: every cell earns its span with product content. Empty sparks and “quote” tiles fail.
- Nav: kbd hints, overflow, active states. Raycast density, not three ghost links in a pill.
- Docs: Origin/shadcn gallery rhythm — variant visible at rest, copy adjacent, no theatre.

### 5. Content (this is not decoration)

- Real Nexara/studio copy. Named product. Real numbers. Real marks.
- **Banned:** “Move the furniture.” “Continue.” “A line that arrives with its own motion.” “Night, gold, and iris.” “Lamp 04” blobs. Color-dot avatars. Word-pill “logos.” Phone rectangles. Play-glyph-as-video. Fake map dots.
- Heroes must contain a product scene (screenshot, dashboard, editor, checkout), not a traffic-light window around nothing.
- Modals open in the gallery. Navs sit in a frame that is a product surface. No “Open dialog” as the variant.

### 6. No toys

If it would look at home on a 2022 sticker sheet, it is out. Non-exhaustive kill list:

Wax, stamp, medal, award ribbon, hazard tape, comic panel, playing card, boarding pass, polaroid, film sprockets, vinyl, passport, postcard, lightning glyph, sun disc, triangle mountains, rectangle skyline, brick, herringbone parquet, skeuomorphic rivets, neumorphism, gel highlights, offset-shadow brutalism, neon rings, circular-path seals, teletype rolls, dispatch slips.

Distinctness comes from **job**, not from **prop**. A command palette, an OTP, an invoice, a pricing plan, a repo card, a dock — those are jobs. A wax seal is not a job.

### 7. Motion

- Magic UI / Aceternity standard: one material motion per control (beam, shimmer, spotlight, marquee, aurora), reduced-motion fallback, no novelty physics as the variant identity.
- Variants are anatomies, not keyframes. We will not accept twelve springs of one pill, and we will not accept twelve objects that exist to look different in a screenshot.

### 8. Catalogue shape

- Ship primitives before theatre: Button, Input, Tabs, Accordion, Tooltip, Toast, Avatar, Badge, plus a real Modal, Command, Navbar.
- Then marketing blocks that 21st.dev/shadcn would publish: Hero (with product), Pricing, Testimonials, Bento (with data), Footer, Logo cloud (real SVGs).
- Cap vanity variants. Twelve is not a virtue. Four excellent anatomies beat twelve costumes.
- Docs chrome must itself pass the bar. A library whose documentation looks like a template will be judged as a template.

### 9. Score gate

A variant ships only at **8 / 8 / 8** on quality, distinctness, modernity against the live shelves in `docs/audit/references.md`. Distinctness is anatomy, not silhouette. Modernity requires light mode. Quality requires density and real content. This gate is not aspirational.

---

## Variants that are derivative of 2021–2023 Dribbble / CodePen

These are not “bold.” They are dated. They read as the era when every landing page had mesh blobs, glass cards, neo-brutal offset shadows, and a stationery fetish. Kill them. Do not restyle them.

**2019–2021: skeuomorphism revival / neumorphism / gel**

- Button `neumorphic`, `pressable`, `skeuomorphic`, `gradient` (gel highlight)
- Magnetic `bulb`, `shutter`, `keycap` (as a toy, not as a real kbd)
- Grid `pixel`

**2020–2022: neo-brutalism, neon, glassmorphism-as-identity**

- Button `brutalist` (offset shadow), `glow-outline`
- Gradient text `neon`
- Spotlight / draggable `glass` as an empty frosted tile
- Aurora as under-resolved mesh blobs (the 2021 Stripe-clone leftover, without Stripe’s restraint)

**2021–2023: analog / stationery / festival sticker sheet**

- Magnetic `wax`, `stamp`, `sticker`, `medal`, `ticket`, `tag`
- Draggable `film`, `sticker`, `polaroid`, `ticket`, `receipt`, `comic`, `playing`, `boarding`, `postcard`, `dossier`
- Flip `playing`, `ticket`, `passport`, `vinyl`, `postcard`, `book` (type on a rectangle)
- Marquee `stubs`, `filmstrip`, `hazard`, `medals`, `tiles`
- Gradient text `ribbon`, `seal`, `stencil`, `halftone`
- Text reveal `medallion`
- Typewriter `dispatch`, `shipping`, `teletype`
- Aurora `sunset`, `clouds`, `rain`, `constellation`, `mountains`, `city`, `lightning`
- Grid `herringbone`, `brick`
- Modal `ticket`
- Docs type: Outfit + Fraunces on charcoal — the 2022 Framer “premium dark” template

**The tell in research, not just pixels**

`docs/research/magnetic-button.md` cites Uiverse light-bulb buttons, a postage-stamp article, and CSS3Shapes price tags as structural references. That is how a 2026 library inherits a 2022 look: you copied the wrong canon. 21st.dev and Magic UI were named in the brief and then ignored in favor of CodePen props.

**Also derivative, even when the brief was right**

- Hero `saas` traffic-light window: every 2021 Webflow template.
- Hero `waitlist` color-dot avatars: every 2022 waitlist clone.
- Spotlight `product` gradient blob: the “we didn’t have a render” era.
- Marquee `logos` as tracked words: a logo cloud without logos.
- Button `border-beam` muddy conic: Magic UI’s idea, 2022 execution.
- Navbar `floating` generic glass pill: Linear/Vercel model, template finish.

Right references, costume execution. That is still a reject.

---

## Do I agree 0 / 180 should keep?

**Yes. Keep as-is: zero.**

I looked for a crack. There isn’t one.

Closest anatomies — and these are *briefs to rebuild from zero after tokens exist*, not keepers:

| Anatomy | Why it is almost a product | Why it still dies |
| --- | --- | --- |
| Modal `otp` / `command` | Real jobs. Raycast/Origin language. | Invisible in the gallery. Thin chrome. Dark-only. |
| Navbar `command` | Same. | No kbd, no results, no density. |
| Typewriter `search` / `terminal` / `split-flap` | Search row and Vestaboard are still current. | Toy chrome, placeholder phrases. |
| Button `social` / `split` | OAuth row and split control are real. | Capsule finish, “Continue with Atlas,” no provider density. |
| Draggable `window` | Title-bar drag is a real model. | Empty window. |
| Grid `dots` / `graph` | Valid fields. | Not Vercel/Magic density; dark-only. |
| Aurora `mesh` / `aurora` | Valid materials. | Under-resolved vs Aceternity; sit next to clipart. |
| Bento `terminal` / `calendar` | Right content types. | Empty. |
| Hero `agency` / `editorial` | Only heroes that look like a page. | Still template, still “Move the furniture.” |
| Spotlight `repo` / `stat` | Jobs that belong on a card. | Same shell, no data. |

None of these hit 8 on quality, distinctness, **and** modernity. Modernity is structurally impossible without light mode. Quality is impossible while copy is lorem-by-another-name and density is poster-sized. Distinctness is impossible while twelve variants share a `rounded-3xl` shell or a Continue pill.

I will not grant a “keep the OTP, redo the rest” carve-out. OTP is a screenshot we cannot even see without clicking. If the next submission rebuilds command, OTP, social, search, and a real pricing card to the bar below, those can be *new* variants. They are not this catalogue.

The audit’s 118 redesign / 62 replace split is already too kind. Treat anything on the Dribbble/CodePen list above as **replace (delete)**. Treat empty anatomies (spotlight field-swaps, heroes with no product, bento placeholders, modal triggers) as **replace**, not redesign. Redesign is for a real object with a real job that is currently ugly. Most of this file is not that.

---

## What we will look at next time

Not 180 frames of the same charcoal card. This, in order:

1. Tokens + Geist + light/dark docs chrome. If this fails, we stop.
2. Primitives at shadcn/Origin density: button, input, tabs, badge, avatar, tooltip, toast.
3. Four marketing anatomies with real Nexara content: hero-with-product, pricing plan, logo cloud with marks, command palette.
4. Then, and only then, a short list of motion materials (beam, marquee, aurora, spotlight) that Magic UI would recognize.

If you return with a restyled wax seal, we will reject again without reading the rest.

---

## REJECT ALL

No keepers. No exception list. Do not ship, do not market, do not treat prior “Approved” lines in `docs/reviews/*.md` as design sign-off. Those were engineering passes plus a silhouette pass that made the library look older.

Come back when it looks like 2026 product UI. Right now it looks like a 2022 Dribbble dumpster in a very expensive typeface.
