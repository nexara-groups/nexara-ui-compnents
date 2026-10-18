'use client'

import { type ReactNode, useEffect, useRef } from 'react'
import { cn, focusRing } from '@/lib/utils.ts'

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
  journal: '/media/journal-cover.webp',
  reel: '/media/cinema-reel.mp4',
  sportsReel: '/media/sports-reel.mp4',
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
  venues: {
    track: '/media/sports-hero.webp',
    court: '/media/venue-court.webp',
    field: '/media/venue-field.webp',
    pool: '/media/venue-pool.webp',
    studio: '/media/venue-studio.webp',
    climb: '/media/venue-climb.webp',
  },
  screens: {
    field: '/media/screen-field.webp',
    lumen: '/media/screen-lumen.webp',
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
    kite: '/media/mark-kite.svg',
    solum: '/media/mark-solum.svg',
    nimbus: '/media/mark-nimbus.svg',
    vale: '/media/mark-vale.svg',
    orbit: '/media/mark-orbit.svg',
    marble: '/media/mark-marble.svg',
  },
} as const

export const faces = [
  { name: 'Anitha Rao', src: media.people.anitha },
  { name: 'Kiran Reddy', src: media.people.kiran },
  { name: 'Meera Shah', src: media.people.meera },
  { name: 'Suresh Naidu', src: media.people.suresh },
  { name: 'Latha Iyer', src: media.people.latha },
  { name: 'Vikram Hale', src: media.people.vikram },
] as const

export type MediaFrameProps = {
  src?: string
  alt?: string
  video?: string
  poster?: string
  lottie?: string
  playing?: boolean
  className?: string
  imgClassName?: string
  grain?: boolean
  children?: ReactNode
}

/**
 * First-class media well. Prefers `children`, then video, then lottie, then image.
 * Pass `playing` to drive a reel from a control; omit it to autoplay muted.
 * Defaults are the bundled originals in `public/media`.
 */
export function MediaFrame({
  src,
  alt = '',
  video,
  poster,
  lottie,
  playing,
  className,
  imgClassName,
  grain = true,
  children,
}: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const node = videoRef.current
    if (!node || playing === undefined) return
    if (playing) {
      void node.play().catch(() => undefined)
    } else {
      node.pause()
    }
  }, [playing])

  const still = poster ?? src
  const showStill = Boolean(still) && playing === false

  return (
    <div className={cn('relative overflow-hidden bg-nx-elevated', className)}>
      {children ? (
        children
      ) : video ? (
        <>
          <video
            ref={videoRef}
            src={video}
            poster={still}
            autoPlay={playing === undefined}
            muted
            loop
            playsInline
            className={cn('size-full object-cover motion-reduce:hidden', imgClassName)}
          />
          {still ? (
            <img
              src={still}
              alt={alt}
              className={cn(
                'size-full object-cover',
                showStill ? 'absolute inset-0' : 'hidden motion-reduce:block',
                imgClassName,
              )}
            />
          ) : null}
        </>
      ) : lottie ? (
        <>
          <iframe title={alt || 'Motion'} src={lottie} className={cn('size-full border-0 motion-reduce:hidden', imgClassName)} />
          {still ? (
            <img src={still} alt={alt} className={cn('hidden size-full object-cover motion-reduce:block', imgClassName)} />
          ) : null}
        </>
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

export function PlayControl({
  playing,
  onToggle,
  className,
  label = 'Play reel',
}: {
  playing: boolean
  onToggle: () => void
  className?: string
  label?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={playing ? 'Pause reel' : label}
      onClick={onToggle}
      className={cn(focusRing, 'inline-flex size-12 items-center justify-center rounded-full bg-white text-[#111]', className)}
    >
      <span className="ml-0.5">{playing ? '❚❚' : '▶'}</span>
    </button>
  )
}
