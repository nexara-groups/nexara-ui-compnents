# Lagoon showcase panel

Run 3, 25 October 2026. Five critics debated the Lagoon showcase before any page was written. A decision only shipped once every critic scored it 8 or above. This file is the record. None of it is page copy.

Panel: Creative director (devil's advocate), Motion designer, UX and accessibility lead, Front-end engineer, Brand and copy lead.

## The idea

Round 1 pitch: reuse the kit stage with a new headline. Devil scored it 3: "It is still a component dump with a sentence on top. A clinic owner would not buy this page." Copy lead scored 4: the current lines describe the motion ("the plate stays opaque") instead of the clinic.

Round 2, adopted. Lagoon becomes one believable client, **Tidewell Clinic**, a family clinic in Indiranagar, Bengaluru, shown three ways:

1. **Landing** for patients. The job is to book or call in the first frame.
2. **Desk**, the front-desk dashboard the receptionist uses all day.
3. **Book a visit**, the patient booking wizard plus the intake form.

Scores: Devil 8, Motion 9, UX 9, Engineer 8, Copy 9.

## The three specifics the gate asked for

- **Hero.** Left: the Newsreader headline "Unhurried care, booked in a minute.", the lede, Book a visit and the phone. Right: an opaque "Next open slot" booking plate with doctor, day chips and time chips. The booking plate is the hero. The lounge photo and the blobs sit behind it and never under text. UX: 9. Devil moved from 6 to 8 once the plate showed a real doctor and a real slot instead of a placeholder card.
- **Phone number.** `080 4718 2290` (fictional) is a `tel:` link in the nav, the hero, the visit band and the footer. On mobile it is an icon button labelled "Call Tidewell" next to Book. Copy: 9. UX: 9.
- **Open motions.** Every Lagoon overlay opens the same way and no other theme uses it: the panel clip-path grows as a circle from the trigger, and the panel radius settles from 32px to 16px. Modal, drawer, command palette, menu and the mobile sheet share it. Close is a plain 140ms fade. Subtle runs the radius only. Off and reduced motion show the end state. Motion: 9. Engineer: 9 (clip-path and border-radius only, no blur, no animated shadow).

## Design rules carried from the spec

- Ground `#041816`, text `#e8fff8`, Biolume `#3ef0c2` is the Book fill with abyss text, magenta `#e23d8a` is a bloom behind Book only. Newsreader for display, IBM Plex Sans for UI, Plex Mono for numbers.
- Text always sits on an opaque plate. No `backdrop-filter` anywhere (Engineer veto). Blobs move with transforms only.
- Radius stays inside 16–28. Controls morph radius on hover (24 to 12 on buttons, 28 to 18 on cards).
- Targets are 44px minimum. Labels never move. Focus rings are 2px `--nx-ring`.

## Page decisions

| Item | Decision | Scores (Dev / Mot / UX / Eng / Copy) |
| --- | --- | --- |
| Nav | Wordmark, four links, open-now status, phone, Book. Mobile sheet uses the open motion. | 8 / 9 / 9 / 9 / 8 |
| Services | Six services as a bento of opaque cards with price from and wait time. Card radius morphs, a disc grows behind the icon. | 8 / 9 / 8 / 9 / 9 |
| Visit flow | Three steps on a drawn SVG path that fills on scroll (stroke offset, linear). | 8 / 8 / 8 / 9 / 8 |
| Doctors | Four generated portraits of fictional doctors, languages spoken, next slot. Portrait mask morphs from pill to rounded rect. | 9 / 9 / 8 / 8 / 9 |
| Proof | Three numbers in Plex Mono, one patient quote, attribution with first name and area only. | 8 / 8 / 9 / 9 / 9 |
| Pricing | Consult, health check, family year. Rupees, inclusive of GST. | 8 / 8 / 9 / 9 / 9 |
| FAQ | Accordion. Height animates with a spring, the plus sign morphs to a minus by radius, not rotation. | 8 / 9 / 9 / 8 / 8 |
| Visit band | Stylised SVG map, hours table with today highlighted, phone, directions. | 8 / 8 / 9 / 9 / 9 |
| FAB | Mobile only, after the hero leaves view. Book with the bloom. | 8 / 9 / 8 / 9 / 8 |
| Desk | Sidebar, search that opens the command palette (Ctrl or Cmd K), split button "New appointment", four KPIs with sparklines, visits-by-hour chart that morphs between Today and Week, live queue with a context menu per row, doctor timeline, skeletons on tab change. | 8 / 9 / 8 / 8 / 9 |
| Book a visit | Four steps: Who, When, Files, Confirm. Combobox for the reason, calendar with arrow-key navigation, time chips, dropzone, OTP. Summary plate stays visible on desktop and collapses on mobile. | 9 / 8 / 9 / 8 / 9 |

## The missing controls

Built as reusable components in `src/themes/kit/controls.tsx` so every theme can use them. Lagoon gets the liquid motion; the other personalities fall back to their existing open animation until their own runs.

- Command palette: `role="dialog"` with a combobox input and listbox, arrow keys, Enter, Escape, grouped results.
- Context menu: right-click or the row button, arrow keys, Escape, focus returns.
- Skeleton: no shimmer (spec). Lagoon breathes the radius and opacity once a second. Off is static.
- Spinner: no shared spinner (spec). Lagoon is a disc whose radius morphs while it turns. It carries a visually hidden label.
- FAB, split button, dropzone (drag-over grows the inner disc, keyboard and click open the file picker), combobox (typeahead, `aria-activedescendant`), calendar grid (arrows, Home, End, PageUp, PageDown, roving tabindex).

Engineer scored the set 8 after two blockers were fixed in the plan: the palette must not steal Ctrl K outside the desk, and the dropzone must keep the native input reachable. Devil scored 8 once the spinner stopped being a generic ring.

## Rejected

- A WebGL water shader in the hero (Devil and Engineer: cost, and the brief owns blobs, not a shader).
- Glass navbar with blur (spec veto).
- Stock "smiling doctor with clipboard" hero. The lounge photo is behind the plate instead.
- Count-up numbers (spec veto).

## Self-critique pass (after build)

Screens were reviewed at 1440 and 390, dark and light, with motion rich and with reduced motion.

| Finding | Fix |
| --- | --- |
| Dashboard overflowed to 570px on mobile (timeline min-width inside grid items) | `min-w-0` on every grid section, timeline scrolls inside its card |
| Chart skeleton rendered as nothing (bars had no height) | Skeleton bars get staggered heights |
| Chart highlighted 10 am while copy said the peak is 5 pm | Data corrected; peak bar and copy agree |
| Booking heading showed a focus ring on first load (StrictMode double effect) | Focus moves only when the step key actually changes |
| Stepper's current pill overlapped step 2 at 390px | Step name hidden under `sm`, "Step n of 4" line shown instead |
| Phone number wrapped beside the logo on mobile | Phone link hidden under `md`; icon button remains |
| Split button bloom read as a grey stain at rest | Bloom only appears on hover/focus, blurred |
| Time chips wrapped ("10:40 / am") | Two columns at `md`, no wrapping |
| Overlay merged-ref callbacks mutated a hook-returned ref (lint) | New `usePlayOpen(ref, open)` plays on the dialog's own ref |
| `Date` read during render in three places (lint) | Moved into lazy state initialisers |
