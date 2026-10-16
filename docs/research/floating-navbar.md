# Floating navbar — structural audit

Underline, bottom, split, double, islands, tabs, and spy were removed. They were one bar with a different link decoration or a different edge. Dock, sidebar, overlay, and command stayed because they are different products, and they were rebuilt where the chrome was still a pill.

| Variant | Reference | What is structurally different |
| --- | --- | --- |
| floating | [Aceternity Floating Navbar](https://ui.aceternity.com/components/floating-navbar) | A pill that compacts on scroll. |
| dock | [Magic UI Dock](https://magicui.design/docs/components/dock) | Icons over captions, magnified from the bottom. |
| sidebar | App sidebars in [shadcn dashboard](https://ui.shadcn.com/examples/dashboard) | A column with a section label. |
| overlay | Full-screen menus on [21st.dev](https://21st.dev/) | A button that opens a viewport dialog. |
| command | [shadcn Command](https://ui.shadcn.com/docs/components/command) | A jump field and a shortcut, not a row of links. |
| transport | Playback bars (artwork, title, scrubber, skip) | A now-playing strip. Replaces tab-bar, which repeated the dock. |
| mega | Mega menus | A full-width bar that opens three columns. |
| app-bar | Product top bars in [shadcn dashboard](https://ui.shadcn.com/examples/dashboard) | A dense bar with a search field. |
| announcement | Banner plus nav in [shadcn blocks](https://ui.shadcn.com/blocks) | A notice strip above a separate link row. |
| breadcrumb | [shadcn Breadcrumb](https://ui.shadcn.com/docs/components/breadcrumb) | A path of separators. |
| segmented | [HeroUI Tabs](https://www.heroui.com/docs/components/tabs) | Links inside one segmented control. |
| wordmark | Studio headers | A large mark and an index disclosure. No link row. |

Ideas were reimplemented. No source was copied.
