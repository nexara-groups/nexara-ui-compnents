# Gaps

Honest list after the bold-theme gate. Lagoon, Strike, Orrery, Rally, and Array have a form, button, overlay, and feedback kit, a live editor, and an animation library. Navigation, data display, and marketing sections are not in this run.

## Cleared

- Five themes, each with its own motion property. Critics scored them 8 or above. The discussions are in `docs/themes/reviews/`.
- Forms: text, textarea, number, password with Show/Hide, search, select with arrow keys, multi-select, checkbox, radio, switch, slider, range, date, time, datetime, date range, file, OTP, color, rating, tags.
- Buttons: primary, quiet, busy, group, copy, icon button. Rally's join button can burst twelve squares.
- Overlays and feedback: modal, drawer, popover, tooltip, menu, toast with Pause and Dismiss, banner, alert, progress, empty, 404.
- Editor: guarded colors, clamped radius, five type pairs, density, intensity, landing dashboard and form previews, width, reset, preset save and restore, copy CSS, copy TS, download JSON.
- Reduced motion and intensity off hold the end state. Orrery WebGL invalidates on mount and on pointer move, and unmounts off screen.

## Not built

- Command palette. Context menu as its own component (the menu button covers a dropdown). Confirm as its own component (it is the modal). Split button. FAB. Skeleton. Spinner. A drag-and-drop frame around the file field. Combobox typeahead.
- Arrow keys do not move through the date grid. Tab and Enter do. The engineer did not block that.
- Toast is one status, not a stack with physics. Modal and drawer transitions are CSS keyframes, not a shared layout transition.
- Presets restore into the pickers. They do not edit both schemes in one gesture.
- The animation library plays the owned effects. It does not publish a props table or a real copy-paste snippet beyond the component name.
- Navigation (navbar, sidebar, tabs, breadcrumb, pagination, stepper, segmented control, mega menu, mobile menu, footer), data display (card, table, list, avatar, badge, accordion, timeline, KPI, charts, calendar, kanban, code, carousel), and marketing sections (hero systems beyond the kit landing, features, pricing, testimonials, FAQ, CTA, logo cloud, team, contact, newsletter) are later runs.
- Fieldnote, Programme, Triplicate, and Quarry remain the previous set. Triplicate and Quarry were never full themes.

## Compromises

- Orrery's rim is bronze `#b45309`, not the pale gold the art director first drew. Pale gold failed the mark-versus-text check.
- Rally in daylight uses `#9a3412`, not `#ff5a36`, because the bright coral failed against the cream ground. Night keeps the bright coral.
- The drawer travels on translateX in every theme. The personality is the arrival mark, not a second travel axis.
