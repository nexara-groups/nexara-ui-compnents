'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

/** Bundled originals in `public/media`. Swap any of these via props. */
export const media = {
  climate: '/media/climate-hero.webp',
  clinic: '/media/clinic-hero.webp',
  sports: '/media/sports-hero.webp',
  field: '/media/wordmark-field.webp',
  fashion: '/media/fashion-hero.webp',
  device: '/media/device-hero.webp',
  featured: '/media/featured-hero.webp',
  glass: '/media/glass-hero.webp',
  liquid: '/media/liquid-hero.webp',
  spiral: '/media/spiral-hero.webp',
  cinema: '/media/cinema-hero.webp',
  lamp: '/media/shop-lamp.webp',
  editorial: ['/media/editorial-1.webp', '/media/editorial-2.webp', '/media/editorial-3.webp', '/media/editorial-4.webp'] as const,
  fan: ['/media/fan-1.webp', '/media/fan-2.webp', '/media/fan-3.webp'] as const,
  doors: {
    consult: '/media/door-consult.webp',
    lab: '/media/door-lab.webp',
    pharmacy: '/media/door-pharmacy.webp',
    therapy: '/media/door-therapy.webp',
  },
  cases: {
    build: '/media/case-build.webp',
    farm: '/media/case-farm.webp',
    climate: '/media/climate-hero.webp',
    care: '/media/clinic-hero.webp',
    track: '/media/case-track.webp',
    lab: '/media/case-lab.webp',
    voice: '/media/case-voice.webp',
  },
  people: {
    anitha: '/media/portrait-anitha.webp',
    kiran: '/media/portrait-kiran.webp',
    meera: '/media/portrait-meera.webp',
    suresh: '/media/portrait-suresh.webp',
    latha: '/media/portrait-latha.webp',
    vikram: '/media/portrait-vikram.webp',
  },
  marks: {
    kite: '/media/mark-kite.webp',
    solum: '/media/mark-solum.webp',
    nimbus: '/media/mark-nimbus.webp',
    vale: '/media/mark-vale.webp',
    orbit: '/media/mark-orbit.webp',
    marble: '/media/mark-marble.webp',
  },
} as const

export type MediaFrameProps = {
  src?: string
  alt?: string
  video?: string
  poster?: string
  lottie?: string
  className?: string
  imgClassName?: string
  grain?: boolean
  children?: ReactNode
}

/**
 * First-class media well. Prefers `children`, then video, then lottie, then image.
 * Defaults are the bundled originals in `public/media`.
 */
export function MediaFrame({
  src,
  alt = '',
  video,
  poster,
  lottie,
  className,
  imgClassName,
  grain = true,
  children,
}: MediaFrameProps) {
  return (
    <div className={cn('relative overflow-hidden bg-nx-elevated', className)}>
      {children ? (
        children
      ) : video ? (
        <video
          src={video}
          poster={poster ?? src}
          autoPlay
          muted
          loop
          playsInline
          className={cn('size-full object-cover motion-reduce:hidden', imgClassName)}
        />
      ) : lottie ? (
        <iframe title={alt || 'Motion'} src={lottie} className={cn('size-full border-0', imgClassName)} />
      ) : src ? (
        <img src={src} alt={alt} className={cn('size-full object-cover', imgClassName)} />
      ) : null}
      {grain ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27><filter id=%27n%27><feTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%272%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.55%27/></svg>")',
          }}
        />
      ) : null}
    </div>
  )
}
