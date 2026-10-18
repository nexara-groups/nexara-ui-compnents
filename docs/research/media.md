# Media pack

Bundled originals live in `public/media` as WebP stills, SVG marks, and short MP4 reels. `src/lib/media.tsx` exports the catalog, `MediaFrame`, and `PlayControl`.

## First-class slot

`MediaFrame` prefers `children`, then video, then lottie, then `src`. Pass `playing` to drive a reel from `PlayControl`; omit it to autoplay muted. Grain is on by default. Heroes accept `image`, `video`, `poster`, `lottie`, and `media` children so a product can swap the defaults.

```tsx
<Hero variant="cinema" title="Harbor after dark" image="/your/still.webp" video="/your/reel.mp4" />
```

## What is in the pack

Generated cinematic stills (heroes, products, doors, cases, venues), photoreal generated portraits, original fictional brand marks (Kite, Solum, Nimbus, Vale, Orbit, Marble), and Ken Burns reels for cinema and sports.

These are original generated assets for this registry. They are not photographs of the owner's live sites and not traces of 21st.dev, Aceternity, or shadcn.

No Unsplash or Pexels files are bundled. If you swap in licence-free stock, keep the `image` / `src` prop so consumers can replace it, and note the licence next to the file.

## File map

| File | Use |
| --- | --- |
| `climate-hero.webp` | Harbor Climate / AC remote |
| `clinic-hero.webp` | Lumen Care |
| `sports-hero.webp` | Field Athletics / Track |
| `wordmark-field.webp` | North wordmark field |
| `fashion-hero.webp`, `device-hero.webp`, `featured-hero.webp` | Lookbook, device, featured |
| `glass-hero.webp`, `liquid-hero.webp`, `spiral-hero.webp`, `cinema-hero.webp` | Abstract / cinema |
| `shop-lamp.webp` | Shop product |
| `journal-cover.webp` | Journal issue 18 |
| `editorial-*.webp`, `fan-*.webp` | Collage / fan |
| `door-*.webp` | Clinic doors |
| `case-*.webp` | Case studies |
| `venue-*.webp` | Court, field, pool, studio, climb |
| `screen-*.webp` | App phone UI stills |
| `portrait-*.webp` | Team and avatars |
| `mark-*.svg` | Flat logo marks |
| `cinema-reel.mp4`, `cinema-reel.webm` | Cinema playable reel |
| `sports-reel.mp4`, `sports-reel.webm` | Sports playable reel |

Stills are ffmpeg WebP (`libwebp`, q80) from generated JPEGs. Reels are 6s 1280×720 Ken Burns zooms. `MediaFrame` offers WebM then H.264 so Chromium and Safari both play.
