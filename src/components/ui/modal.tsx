'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { AnimatePresence, motion } from 'framer-motion'
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { MediaFrame, media } from '@/lib/media.tsx'
import { Input } from './input.tsx'
import { cn, fieldBorder, focusRing, usePrefersReducedMotion } from '@/lib/utils.ts'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

type ModalContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  titleId: string
  descriptionId: string
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Nexara modal parts must be rendered inside <Modal>.')
  }
  return context
}

let scrollLocks = 0

function lockBodyScroll() {
  if (typeof document === 'undefined') return () => {}
  if (scrollLocks === 0) {
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.dataset.nexaraOverflow = document.body.style.overflow
    document.body.dataset.nexaraPad = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    document.getElementById('root')?.setAttribute('inert', '')
  }
  scrollLocks += 1
  return () => {
    scrollLocks = Math.max(0, scrollLocks - 1)
    if (scrollLocks === 0) {
      document.body.style.overflow = document.body.dataset.nexaraOverflow ?? ''
      document.body.style.paddingRight = document.body.dataset.nexaraPad ?? ''
      delete document.body.dataset.nexaraOverflow
      delete document.body.dataset.nexaraPad
      document.getElementById('root')?.removeAttribute('inert')
    }
  }
}

export interface ModalProps {
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Modal
 * Accessible dialog with focus trap, escape to close, and scroll locking.
 * Control it with `open` / `onOpenChange`, or use `<ModalTrigger>`.
 */
export function Modal({ children, open: openProp, defaultOpen = false, onOpenChange }: ModalProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolled
  const titleId = useId()
  const descriptionId = useId()
  const onOpenChangeRef = useRef(onOpenChange)
  const isControlledRef = useRef(isControlled)

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange
    isControlledRef.current = isControlled
  }, [isControlled, onOpenChange])

  const setOpen = useCallback((next: boolean) => {
    if (!isControlledRef.current) setUncontrolled(next)
    onOpenChangeRef.current?.(next)
  }, [])

  return (
    <ModalContext.Provider value={{ open, setOpen, titleId, descriptionId }}>{children}</ModalContext.Provider>
  )
}

export function ModalTrigger({
  className,
  children,
  onClick,
  ...props
}: ComponentProps<'button'>) {
  const { open, setOpen } = useModalContext()
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-expanded={open}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(true)
      }}
    >
      {children}
    </button>
  )
}

const sizeClass = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
} as const

const modalVariants = [
  'dialog',
  'confirm',
  'otp',
  'command',
  'lightbox',
  'wizard',
  'form',
  'drawer',
  'share',
  'sheet',
  'notice',
  'auth',
  'shared-morph',
  'shader-veil',
  'liquid-sheet',
  'particle-confirm',
] as const

export type ModalVariant = (typeof modalVariants)[number]

type ModalMotion = { opacity?: number; y?: number | string; x?: number | string; scale?: number }

const modalFrame: Record<string, { container: string; panel: string; initial: ModalMotion; exit: ModalMotion }> = {
  dialog: {
    container: 'items-end justify-center p-4 sm:items-center',
    panel: 'max-h-[min(40rem,calc(100dvh-2rem))] rounded-[1.5rem] border border-nx-border bg-nx-card text-nx-fg shadow-[var(--nx-shadow)]',
    initial: { opacity: 0, y: 24, scale: 0.98 },
    exit: { opacity: 0, y: 16, scale: 0.98 },
  },
  confirm: {
    container: 'items-center justify-center p-4',
    panel: 'max-h-[min(24rem,calc(100dvh-2rem))] rounded-[1.4rem] border border-nx-border bg-nx-card text-nx-fg text-center',
    initial: { opacity: 0, scale: 0.96 },
    exit: { opacity: 0, scale: 0.98 },
  },
  share: {
    container: 'items-end justify-center p-0',
    panel: 'max-h-[70dvh] w-full max-w-lg rounded-t-3xl border border-b-0 border-nx-border bg-nx-card text-nx-fg',
    initial: { y: '40%' },
    exit: { y: '100%' },
  },
  drawer: {
    container: 'items-stretch justify-end p-0',
    panel: 'ml-auto h-dvh max-h-dvh w-full max-w-xs rounded-none border-y-0 border-r-0 border-nx-border bg-nx-card text-nx-fg',
    initial: { x: '40%' },
    exit: { x: '100%' },
  },
  auth: {
    container: 'items-center justify-center p-4',
    panel: 'max-h-[min(40rem,calc(100dvh-2rem))] overflow-hidden rounded-[1.5rem] border border-nx-border bg-nx-card text-nx-fg md:grid md:grid-cols-2',
    initial: { opacity: 0, y: 16 },
    exit: { opacity: 0, y: 12 },
  },
  otp: {
    container: 'items-center justify-center p-4',
    panel: 'max-h-[min(28rem,calc(100dvh-2rem))] rounded-[1.5rem] border border-nx-border bg-nx-card text-center text-nx-fg',
    initial: { opacity: 0, scale: 0.92 },
    exit: { opacity: 0, scale: 0.96 },
  },
  command: {
    container: 'items-start justify-center p-4 pt-[12vh]',
    panel: 'max-h-[min(32rem,70dvh)] rounded-2xl border border-nx-border bg-nx-card text-nx-fg shadow-[var(--nx-shadow)]',
    initial: { opacity: 0, y: -16 },
    exit: { opacity: 0, y: -20 },
  },
  notice: {
    container: 'items-start justify-center p-0',
    panel: 'w-full max-w-none rounded-none border-x-0 border-t-0 border-nx-border bg-nx-card text-nx-fg',
    initial: { y: '-100%' },
    exit: { y: '-100%' },
  },
  form: {
    container: 'items-end justify-center p-4 sm:items-center',
    panel: 'max-h-[min(40rem,calc(100dvh-2rem))] overflow-hidden rounded-[1.5rem] border border-nx-border bg-nx-card text-nx-fg',
    initial: { opacity: 0, x: -20 },
    exit: { opacity: 0, x: -16 },
  },
  lightbox: {
    container: 'items-center justify-center bg-black/40 p-3 sm:p-8',
    panel: 'max-h-[min(44rem,calc(100dvh-1.5rem))] max-w-4xl rounded-2xl border border-white/10 bg-black text-white',
    initial: { opacity: 0, scale: 0.94 },
    exit: { opacity: 0, scale: 1.02 },
  },
  sheet: {
    container: 'items-end justify-center p-0 sm:p-4',
    panel: 'max-h-[70dvh] w-full max-w-lg rounded-t-[1.6rem] border border-b-0 border-nx-border bg-nx-card text-nx-fg sm:rounded-3xl sm:border-b',
    initial: { y: '100%' },
    exit: { y: '100%' },
  },
  wizard: {
    container: 'items-end justify-center p-4 sm:items-center',
    panel: 'max-h-[min(40rem,calc(100dvh-2rem))] rounded-[1.5rem] border border-nx-border bg-nx-card text-nx-fg',
    initial: { opacity: 0, x: 28 },
    exit: { opacity: 0, x: -24 },
  },
}

export interface ModalContentProps {
  children?: ReactNode
  title: ReactNode
  description?: ReactNode
  className?: string
  overlayClassName?: string
  size?: keyof typeof sizeClass
  /** Where the panel sits and how it is drawn. */
  variant?: ModalVariant
  /** Clicking the backdrop or pressing Escape closes the dialog. */
  dismissible?: boolean
  hideClose?: boolean
  /** Where focus lands when the dialog opens. */
  initialFocus?: 'auto' | 'panel' | 'close'
  closeLabel?: string
  titleClassName?: string
  /** Classes for the fixed viewport layer, including z-index. */
  containerClassName?: string
  /** Current step for the wizard variant. */
  step?: number
  /** Total steps for the wizard variant. */
  steps?: number
  /** Render the panel in place for docs galleries. Skips the portal, overlay, and focus trap. */
  inline?: boolean
}

function ModalContentCore({
  children,
  title,
  description,
  className,
  overlayClassName,
  size = 'md',
  variant = 'dialog',
  dismissible = true,
  hideClose = false,
  initialFocus = 'auto',
  closeLabel = 'Close',
  titleClassName,
  containerClassName,
  step = 2,
  steps = 3,
  inline = false,
}: ModalContentProps) {
  const { open, setOpen, titleId, descriptionId } = useModalContext()
  const reduced = usePrefersReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const dismissibleRef = useRef(dismissible)

  useEffect(() => {
    dismissibleRef.current = dismissible
  }, [dismissible])

  useEffect(() => {
    if (!open || inline) return
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const unlock = lockBodyScroll()
    const panel = panelRef.current

    const focusFirst = () => {
      if (initialFocus === 'close') {
        closeRef.current?.focus()
        return
      }
      if (initialFocus === 'panel') {
        panel?.focus()
        return
      }
      const node = bodyRef.current?.querySelector<HTMLElement>(FOCUSABLE)
      ;(node ?? closeRef.current ?? panel)?.focus()
    }
    const frame = window.requestAnimationFrame(focusFirst)

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && dismissibleRef.current) {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.tabIndex !== -1 && !element.hasAttribute('disabled'),
      )
      if (nodes.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (!first || !last) return
      const active = document.activeElement
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || active === panel)) {
        event.preventDefault()
        first.focus()
      }
    }

    function onFocusIn(event: FocusEvent) {
      if (!panel) return
      if (panel.contains(event.target as Node)) return
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      ;(nodes[0] ?? panel).focus()
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocusIn)
      unlock()
      previousFocus.current?.focus()
    }
  }, [initialFocus, inline, open, setOpen])

  const panel = (
    <>
            {variant === 'auth' ? <div className="hidden min-h-full bg-[linear-gradient(160deg,#4c46e0,#22c5b0)] md:block" /> : null}
            {variant === 'share' ? (
              <div className="px-6 pt-5">
                <p className="text-xs tracking-[0.16em] text-nx-muted uppercase">Share</p>
                <div className="mt-3 grid grid-cols-4 gap-3 text-center text-xs">
                  {['Copy', 'Mail', 'Notes', 'Save'].map((target) => (
                    <div key={target}>
                      <div className="mx-auto mb-1 size-12 rounded-2xl bg-nx-soft" />
                      {target}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {variant === 'sheet' ? (
              <div className="flex flex-col gap-2 px-4 pt-4">
                <span className="mx-auto h-1.5 w-10 rounded-full bg-nx-border" />
                {['Copy link', 'Duplicate', 'Archive'].map((action) => (
                  <button key={action} type="button" className="h-12 rounded-2xl bg-nx-bg px-4 text-left">
                    {action}
                  </button>
                ))}
              </div>
            ) : null}
            {variant === 'wizard' ? (
              <div className="flex gap-1 px-6 pt-5" aria-label={`Step ${Math.min(step, steps)} of ${steps}`}>
                {Array.from({ length: Math.max(steps, 1) }, (_, index) => (
                  <span key={index} className={cn('h-1 flex-1 rounded-full', index < step ? 'bg-nx-accent' : 'bg-nx-border')} />
                ))}
              </div>
            ) : null}
            <div
              className={cn(
                'z-10 flex items-start gap-4 px-6 pt-6 pb-4',
                variant === 'notice' && 'hidden',
                variant !== 'lightbox' && 'sticky top-0 bg-inherit',
                variant === 'otp' && 'flex-col items-center',
                variant === 'lightbox' && 'order-2 border-t border-nx-border',
              )}
            >
              <div className={cn('min-w-0 flex-1', variant === 'otp' && 'text-center')}>
                <h2 id={titleId} className={cn('font-serif text-2xl leading-tight', variant === 'lightbox' && 'text-lg', titleClassName)}>
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-2 text-sm leading-6 text-nx-muted">
                    {description}
                  </p>
                ) : null}
              </div>
              {hideClose ? null : (
                <button
                  ref={closeRef}
                  type="button"
                  className={cn(
                    'inline-flex size-11 shrink-0 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nx-ring',
                    'border-nx-border text-nx-fg hover:bg-nx-soft',
                    variant === 'lightbox' && 'absolute top-3 right-3 border-white/20 bg-black/50',
                  )}
                  aria-label={closeLabel}
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div ref={bodyRef} className={cn('min-h-0 flex-1 overflow-y-auto px-6 pt-1 pb-6', variant === 'lightbox' && 'min-h-48', variant === 'sheet' && 'flex flex-col gap-2', variant === 'notice' && 'hidden')}>
              {variant === 'command' ? (
                <label className={cn('mb-3 flex h-11 items-center rounded-xl bg-nx-bg px-3 text-sm text-nx-muted', fieldBorder)}>
                  <span className="sr-only">Command</span>
                  <input className={cn(focusRing, 'h-11 w-full rounded-lg bg-transparent text-nx-fg')} placeholder="Type a command" />
                </label>
              ) : null}
              {variant === 'otp' ? (
                <div className="mb-4 flex flex-col items-center gap-3">
                  <Input variant="otp" defaultValue="4182" />
                  <button type="button" className="inline-flex min-h-11 items-center text-sm text-nx-accent">Resend code</button>
                </div>
              ) : null}
              {variant === 'form' ? (
                <form className="mb-4 space-y-3" onSubmit={(event) => event.preventDefault()}>
                  <label className="block text-xs text-nx-muted">
                    Name
                    <input className={cn('mt-1 h-11 w-full rounded-xl bg-nx-bg px-3 text-nx-fg', fieldBorder)} defaultValue="Anitha Rao" />
                  </label>
                  <label className="block text-xs text-nx-muted">
                    Studio
                    <input className={cn('mt-1 h-11 w-full rounded-xl bg-nx-bg px-3 text-nx-fg', fieldBorder)} defaultValue="Harbor" />
                  </label>
                </form>
              ) : null}
              {variant === 'confirm' ? (
                <div className="mb-4 flex justify-center gap-2">
                  <button type="button" className="min-h-11 rounded-xl border border-nx-border px-4 text-sm" onClick={() => setOpen(false)}>Cancel</button>
                  <button type="button" className="min-h-11 rounded-xl bg-nx-danger px-4 text-sm text-white" onClick={() => setOpen(false)}>Delete room</button>
                </div>
              ) : null}
              {variant === 'drawer' ? (
                <ul className="mb-4 space-y-1 text-sm">
                  {['Overview', 'Rooms', 'Library', 'Settings'].map((item) => (
                    <li key={item} className="rounded-xl px-3 py-2 hover:bg-nx-soft">{item}</li>
                  ))}
                </ul>
              ) : null}
              {variant === 'auth' ? (
                <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                  <label className="block text-xs text-nx-muted">Email
                    <input type="email" className={cn('mt-1 h-11 w-full rounded-xl bg-nx-bg px-3 text-nx-fg', fieldBorder)} placeholder="you@studio.com" />
                  </label>
                  <button type="submit" className="h-11 w-full rounded-full bg-nx-fg text-sm text-nx-bg">Continue</button>
                  <p className="text-center text-xs text-nx-muted">or</p>
                  <button type="button" className={cn('h-11 w-full rounded-xl', fieldBorder)}>Continue with Atlas</button>
                </form>
              ) : null}
              {variant === 'lightbox' ? <MediaFrame src={media.cinema} alt="Harbor after dark" className="mb-4 min-h-40 rounded-xl" /> : null}
              {children}
            </div>
            {variant === 'notice' ? (
              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <p className="text-sm">{title}</p>
                <button type="button" className="inline-flex min-h-11 items-center rounded-full bg-nx-fg px-3 text-sm text-nx-bg" onClick={() => setOpen(false)}>
                  Dismiss
                </button>
              </div>
            ) : null}
    </>
  )

  if (inline) {
    return (
      <div data-nexara="modal" data-variant={variant} className="relative">
        <div
          role="region"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          className={cn(
            'relative flex w-full flex-col',
            variant === 'form' && 'overflow-hidden',
            modalFrame[variant].panel,
            !['share', 'drawer', 'notice', 'sheet', 'lightbox', 'auth'].includes(variant) && sizeClass[size],
            className,
          )}
        >
          {panel}
        </div>
      </div>
    )
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className={cn('fixed inset-0 z-50 flex', modalFrame[variant].container, containerClassName)} data-nexara="modal" data-variant={variant}>
          <motion.div
            aria-hidden="true"
            className={cn('absolute inset-0 bg-black/70 backdrop-blur-[2px]', overlayClassName)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            onClick={() => {
              if (dismissibleRef.current) setOpen(false)
            }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className={cn(
              'relative z-10 flex w-full flex-col outline-none',
              variant === 'form' && 'overflow-hidden',
              modalFrame[variant].panel,
              !['share', 'drawer', 'notice', 'sheet', 'lightbox', 'auth'].includes(variant) && sizeClass[size],
              className,
            )}
            initial={reduced ? false : modalFrame[variant].initial}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : modalFrame[variant].exit}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
          >
            {panel}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export function ModalClose({ className, children, onClick, ...props }: ComponentProps<'button'>) {
  const { setOpen } = useModalContext()
  return (
    <button
      type="button"
      className={className}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(false)
      }}
    >
      {children}
    </button>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ModalContent(props: ModalContentProps) {
  if (isWowVariant('modal', props.variant)) {
    return (
      <WowSignature
        family="modal"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <ModalContentCore {...props} />
}
