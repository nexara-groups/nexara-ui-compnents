# Button — structural audit

The previous set (swap, flood, shimmer, liquid, spotlight, hold, underline, neon-glow, metal, brutal, outline) was one filled or bordered control with a different hover. Those were removed. Each design below is a different construction.

| Variant | Reference | What is structurally different |
| --- | --- | --- |
| solid | [shadcn/ui Button](https://ui.shadcn.com/docs/components/button) default | One flat fill. No lip, no mark, no second cell. |
| gradient | [Uiverse buttons](https://uiverse.io/) gel / gradient buttons | A vertical gel body plus a separate glossy highlight, not a recolor of solid. |
| glass | [Uiverse](https://uiverse.io/) glassmorphism buttons | Translucent blur, hairline, and a specular edge. No opaque fill. |
| neumorphic | Soft-UI buttons on [Uiverse](https://uiverse.io/) | Extruded by a light shadow and a dark shadow. No border and no fill contrast. |
| pressable | [3D button](https://www.joshwcomeau.com/animation/3d-button/) | A visible bottom lip. Pressing the face collapses onto that lip. |
| glow-outline | Neon outline buttons on [Uiverse](https://uiverse.io/) | Empty center and a glowing stroke. |
| split | Icon-and-label buttons on [HeroUI Button](https://www.heroui.com/docs/components/button), built as two chambers | A colored icon well joined to the label. |
| avatar-pill | Profile chips in [shadcn blocks](https://ui.shadcn.com/blocks) | Round avatar, name, and a chevron. |
| border-beam | [Magic UI Border Beam](https://magicui.design/docs/components/border-beam) | A spinning conic ring around an inner plate. |
| brutalist | [Neobrutalism button](https://www.neobrutalism.dev/docs/components/button) | Thick border, hard offset shadow, square corners. |
| skeuomorphic | Brushed controls on [Uiverse](https://uiverse.io/) | Metal plate with two rivets. |
| social | Social login rows in [shadcn blocks](https://ui.shadcn.com/blocks) | Brand mark, a “Continue with” kicker, and the provider name. |
| segment | Split button (action plus chevron) as in [HeroUI Dropdown](https://www.heroui.com/docs/components/dropdown) triggers | Label cell and a separate chevron cell divided by a rule. |

Ideas were reimplemented. No source was copied.
