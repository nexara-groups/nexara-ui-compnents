# floating-navbar

Surveyed 21st.dev Aceternity (Floating Navbar, Navbar Menu, Floating Dock, Resizable Navbar) and Spectrum UI (Tab Navbar, Sidebar Navbar). Dock, command capsule, tabs, underline, and rail change the link treatment.

Sources: [21st.dev](https://21st.dev), [Aceternity on 21st](https://21st.dev/@manuarora700/library/aceternity-ui), [Motion Primitives](https://docs.21st.dev/@ibelick/library/motion-primitives), [Spectrum UI](https://docs.21st.dev/@arihantcodes_1f7b8c4d/library/spectrum-ui), plus public catalogues from shadcn/ui, HeroUI, Magic UI, Park UI, and Uiverse. Ideas were reimplemented. No source was copied.

## Selected

- `floating` (Floating): Blurred pill that compacts on scroll.
- `solid` (Solid): Opaque bar with softer corners.
- `transparent` (Transparent): No fill until a link is current.
- `underline` (Underline): Current link is a gold rule.
- `pills` (Pills): Each link is its own chip.
- `dock` (Dock): Links stack like a compact dock.
- `command` (Command): Links sit in a centered command capsule.
- `split` (Split): Links centered between brand and actions.
- `glass` (Glass): Heavier blur and a bright rim.
- `brutal` (Brutal): Square bar with an offset shadow.
- `tabs` (Tabs): Segmented control. The current tab inverts.
- `rail` (Rail): A flare rule marks the leading edge.

## Rejected

- Extra colour swaps of an existing treatment.
- Variants that only changed duration or opacity.

## Round 2

Round 2 removed solid, transparent, pills, glass, brutal, and rail. Added bottom, dock (magnify), double (two rows), islands (three pills), sidebar, overlay (focus-trapped menu), and spy (IntersectionObserver). Kept floating, underline, command, split, and tabs.
