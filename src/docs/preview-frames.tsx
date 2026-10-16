import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { FloatingNavbar, type FloatingNavbarProps, type NavItem } from '@/components/ui/floating-navbar.tsx'
import { Modal, ModalContent, type ModalVariant } from '@/components/ui/modal.tsx'

export function Face({ title }: { title: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-zinc-400 uppercase">{title}</p>
      <p className="mt-2 font-serif text-2xl">Turn me</p>
    </div>
  )
}

export function ModalPreview({ variant }: { variant: ModalVariant }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button size="sm" variant="glow-outline" onClick={() => setOpen(true)}>
        Open {variant}
      </Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent variant={variant} title={variant} description="Escape or the backdrop closes this panel.">
          <p className="text-sm">Variant {variant}.</p>
        </ModalContent>
      </Modal>
    </div>
  )
}

function navFrame(variant: NonNullable<FloatingNavbarProps['variant']>) {
  if (variant === 'sidebar') return 'relative h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-[#09090f]'
  if (variant === 'overlay' || variant === 'announcement' || variant === 'mega') return 'relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#09090f]'
  return 'relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-[#09090f]'
}

export function NavPreview({ variant }: { variant: NonNullable<FloatingNavbarProps['variant']> }) {
  const [active, setActive] = useState('Work')
  const items: NavItem[] = ['Work', 'Notes', 'Atlas'].map((label) => ({
    label,
    href: `#${label}`,
    active: active === label,
    onClick: (event) => {
      event.preventDefault()
      setActive(label)
    },
  }))
  return (
    <div className={navFrame(variant)}>
      <FloatingNavbar
        contained
        shrinkOnScroll={false}
        variant={variant}
        className={variant === 'dock' || variant === 'transport' || variant === 'sidebar' || variant === 'mega' || variant === 'app-bar' || variant === 'announcement' ? undefined : 'top-2 mx-2'}
        logo={<span>Nexara</span>}
        items={items}
        actions={<Button size="sm">Start</Button>}
      />
    </div>
  )
}
