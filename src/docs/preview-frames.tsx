import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { FloatingNavbar, type FloatingNavbarProps, type NavItem } from '@/components/ui/floating-navbar.tsx'
import { Modal, ModalContent, type ModalVariant } from '@/components/ui/modal.tsx'

export function ModalPreview({ variant }: { variant: ModalVariant }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-4">
      <Modal>
        <ModalContent inline variant={variant} title={titleFor(variant)} description="Escape or the backdrop closes the live dialog.">
          <p className="text-sm text-nx-muted">Variant {variant} uses its own anatomy, not just a different entrance.</p>
        </ModalContent>
      </Modal>
      <div>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
          Open live {variant}
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent variant={variant} title={titleFor(variant)} description="Escape or the backdrop closes this panel.">
            <p className="text-sm text-nx-muted">This is the same construction as the inline gallery above.</p>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

function titleFor(variant: ModalVariant) {
  if (variant === 'confirm') return 'Delete this room?'
  if (variant === 'otp') return 'Check your email'
  if (variant === 'command') return 'Jump'
  if (variant === 'form') return 'Edit studio'
  if (variant === 'notice') return 'Preview is open'
  if (variant === 'auth') return 'Sign in'
  return variant
}

function navFrame(variant: NonNullable<FloatingNavbarProps['variant']>) {
  if (variant === 'sidebar') return 'relative h-[22rem] overflow-hidden rounded-2xl border border-nx-border bg-nx-bg'
  if (variant === 'overlay' || variant === 'announcement' || variant === 'mega') return 'relative h-56 overflow-hidden rounded-2xl border border-nx-border bg-nx-bg'
  return 'relative h-40 overflow-hidden rounded-2xl border border-nx-border bg-nx-bg'
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
