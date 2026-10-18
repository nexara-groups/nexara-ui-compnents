# Media pack

Bundled originals live in `public/media` as WebP stills. `src/lib/media.tsx` exports the catalog and `MediaFrame`.

## First-class slot

`MediaFrame` prefers `children`, then `video`, then `lottie`, then `src`. Grain is on by default. Heroes accept `image`, `video`, `poster`, `lottie`, and `media` children so a product can swap the defaults.

```tsx
<Hero variant="cinema" title="Harbor after dark" image="/your/still.webp" video="/your/reel.mp4" />
```

## What is in the pack

Generated cinematic stills (heroes, products, doors, cases), illustrated portraits, and original fictional brand marks: Kite, Solum, Nimbus, Vale, Orbit, Marble.

These are original generated assets for this registry. They are not photographs of the owner's live sites and not traces of 21st.dev, Aceternity, or shadcn.

No Unsplash or Pexels files are bundled in this revision. If you swap in licence-free stock, keep the `image` / `src` prop so consumers can replace it, and note the licence next to the file.

## File map

| File | Use |
| --- | --- |
| `climate-hero.webp` | Harbor Climate / AC remote |
| `clinic-hero.webp` | Lumen Care |
| `sports-hero.webp` | Field Athletics |
| `wordmark-field.webp` | North wordmark field |
| `fashion-hero.webp`, `device-hero.webp`, `featured-hero.webp` | Lookbook, device, featured |
| `glass-hero.webp`, `liquid-hero.webp`, `spiral-hero.webp`, `cinema-hero.webp` | Abstract / cinema |
| `shop-lamp.webp` | Shop product |
| `editorial-*.webp`, `fan-*.webp` | Collage / fan |
| `door-*.webp` | Clinic doors |
| `case-*.webp` | Case studies |
| `portrait-*.webp` | Team and avatars |
| `mark-*.webp` | Logo cloud |

Optimised with ffmpeg (`-q:v 72`) from generated JPEGs.
