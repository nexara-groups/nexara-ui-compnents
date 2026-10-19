'use client'

import { isWowVariant } from '@/lib/wow-variants.ts'
import { WowSignature } from './wow-lazy.tsx'

import { MediaFrame, media } from '@/lib/media.tsx'
import { cn, fieldBorder, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'mega',
  'compact',
  'centered',
  'newsletter',
  'app',
  'legal',
  'social',
  'sitemap',
  'brand',
  'split',
  'giant-marquee',
  'grain-night',
  'barcode-marks',
  'path-sitemap',
] as const

export type FooterVariant = (typeof VARIANTS)[number]

export interface FooterProps {
  variant?: FooterVariant
  className?: string
}

const columns = {
  Product: ['Components', 'Registry', 'Changelog'],
  Company: ['About', 'Journal', 'Careers'],
  Legal: ['Privacy', 'Terms', 'Security'],
}

/**
 * Footer
 * Ten closing constructions. Copy this file plus `src/lib/utils.ts`.
 */
function FooterCore({ variant = 'mega', className }: FooterProps) {
  return (
    <footer data-nexara="footer" data-variant={variant} className={cn('w-full text-sm', className)}>
      {variant === 'mega' ? (
        <div className="border-t border-nx-border pt-10">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <p className="font-serif text-2xl">Nexara</p>
              <p className="mt-2 max-w-[16rem] text-nx-muted">Copy-paste components for product teams that already have a design system.</p>
            </div>
            {Object.entries(columns).map(([title, links]) => (
              <div key={title}>
                <p className="text-[11px] tracking-[0.16em] text-nx-muted uppercase">{title}</p>
                <ul className="mt-3 space-y-2">
                  {links.map((link) => (
                    <li key={link}><a href={`#${link.toLowerCase()}`} className="inline-flex min-h-11 min-w-11 items-center px-1 hover:text-nx-accent">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 border-t border-nx-border pt-4 text-xs text-nx-muted">© 2026 Nexara. All rooms remain yours.</p>
        </div>
      ) : null}

      {variant === 'sitemap' ? (
        <div className="grid gap-6 border-t border-nx-border pt-8 sm:grid-cols-3">
          {Object.entries(columns).map(([title, links]) => (
            <div key={title}>
              <p className="text-[11px] tracking-[0.16em] text-nx-muted uppercase">{title}</p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="inline-flex min-h-11 min-w-11 items-center px-1">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      {variant === 'compact' ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-nx-border py-4 text-nx-muted">
          <p>© 2026 Nexara</p>
          <nav className="flex flex-wrap gap-4" aria-label="Legal">
            <a href="#privacy" className="inline-flex min-h-11 min-w-11 items-center px-1">Privacy</a>
            <a href="#terms" className="inline-flex min-h-11 min-w-11 items-center px-1">Terms</a>
            <a href="#security" className="inline-flex min-h-11 min-w-11 items-center px-1">Security</a>
          </nav>
        </div>
      ) : null}

      {variant === 'legal' ? (
        <div className="border-t border-nx-border py-6 text-xs leading-6 text-nx-muted">
          <p>© 2026 Nexara Groups. Nexara UI is provided as source you copy. You own the files after paste.</p>
          <p className="mt-2">Privacy · Terms · DPA · Subprocessors · Status</p>
        </div>
      ) : null}

      {variant === 'centered' ? (
        <div className="border-t border-nx-border py-10 text-center">
          <p className="font-serif text-3xl">Nexara</p>
          <nav className="mt-4 flex flex-wrap justify-center gap-4 text-nx-muted" aria-label="Footer">
            {['Components', 'Journal', 'Careers', 'Privacy'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="inline-flex min-h-11 min-w-11 items-center px-1">{link}</a>
            ))}
          </nav>
        </div>
      ) : null}

      {variant === 'brand' ? (
        <div className="border-t border-nx-line pt-8">
          <p className="font-serif text-6xl leading-none tracking-tight md:text-8xl">Nexara</p>
          <p className="mt-4 text-nx-muted">A quieter measure of the room.</p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[media.lockups.kite, media.lockups.solum, media.lockups.nimbus, media.lockups.vale].map((src) => (
              <MediaFrame key={src} src={src} alt="" grain={false} className="h-12 rounded-xl border border-nx-border" imgClassName="object-cover" />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'newsletter' ? (
        <div className="grid items-end gap-6 border-t border-nx-border pt-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-serif text-3xl">The journal, monthly.</p>
            <p className="mt-2 text-nx-muted">One letter when a room ships. No launches, no filler.</p>
          </div>
          <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="nexara-footer-email">Email</label>
            <input id="nexara-footer-email" type="email" placeholder="you@studio.com" className={cn(focusRing, fieldBorder, 'min-h-11 min-w-0 flex-1 rounded-xl bg-nx-card px-3')} />
            <button type="submit" className={cn(focusRing, 'inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-nx-fg px-4 text-nx-bg')}>Join</button>
          </form>
        </div>
      ) : null}

      {variant === 'app' ? (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-nx-border py-6">
          <div>
            <p className="font-medium">Take the room with you</p>
            <p className="text-xs text-nx-muted">iOS 17 and Android 14</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-xl border border-nx-border bg-nx-card px-3 py-2">
              <span className="block text-[10px] text-nx-muted">Download on the</span>
              App Store
            </span>
            <span className="rounded-xl border border-nx-border bg-nx-card px-3 py-2">
              <span className="block text-[10px] text-nx-muted">Get it on</span>
              Google Play
            </span>
          </div>
        </div>
      ) : null}

      {variant === 'social' ? (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-nx-border py-5">
          <p className="font-serif text-xl">Nexara</p>
          <nav className="flex gap-4 text-nx-muted" aria-label="Social">
            {['X', 'GitHub', 'YouTube', 'Journal'].map((name) => (
              <a key={name} href={`#${name.toLowerCase()}`} className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 hover:text-nx-fg">{name}</a>
            ))}
          </nav>
        </div>
      ) : null}

      {variant === 'split' ? (
        <div className="grid gap-6 border-t border-nx-line pt-8 md:grid-cols-2">
          <p className="font-serif text-4xl leading-none">Stay in the room.</p>
          <div className="text-nx-muted md:text-right">
            <p>Harbor Hall</p>
            <p>Issue 18</p>
            <p>nexara.app</p>
          </div>
        </div>
      ) : null}
    </footer>
  )
}

export function Footer(props: FooterProps) {
  if (isWowVariant('footer', props.variant)) {
    return (
      <WowSignature
        family="footer"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <FooterCore {...props} />
}
