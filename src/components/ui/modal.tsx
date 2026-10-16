'use client'

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
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

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
  'sheet',
  'drawer',
  'fullscreen',
  'alert',
  'command',
  'banner',
  'split',
  'lightbox',
  'action-sheet',
  'wizard',
  'document',
] as const

export type ModalVariant = (typeof modalVariants)[number]

type ModalMotion = { opacity?: number; y?: number | string; x?: number | string; scale?: number }

const modalFrame: Record<ModalVariant, { container: string; panel: string; initial: ModalMotion; exit: ModalMotion }> = {
  dialog: {
    container: 'items-end justify-center p-4 sm:items-center',
    panel: 'max-h-[min(40rem,calc(100dvh-2rem))] rounded-3xl border border-white/12 bg-[#14151f] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]',
    initial: { opacity: 0, y: 24, scale: 0.98 },
    exit: { opacity: 0, y: 16, scale: 0.98 },
  },
  sheet: {
    container: 'items-end justify-center p-0',
    panel: 'max-h-[85dvh] w-full max-w-none rounded-t-3xl rounded-b-none border border-b-0 border-white/12 bg-[#14151f]',
    initial: { y: '40%' },
    exit: { y: '100%' },
  },
  drawer: {
    container: 'items-stretch justify-end p-0',
    panel: 'ml-auto h-dvh max-h-dvh w-full max-w-md rounded-none border-y-0 border-r-0 border-white/12 bg-[#14151f]',
    initial: { x: '40%' },
    exit: { x: '100%' },
  },
  fullscreen: {
    container: 'items-stretch p-0',
    panel: 'h-dvh max-h-none w-full max-w-none rounded-none border-0 bg-[#09090f]',
    initial: { opacity: 0 },
    exit: { opacity: 0 },
  },
  alert: {
    container: 'items-center justify-center p-4',
    panel: 'max-h-[min(28rem,calc(100dvh-2rem))] rounded-3xl border border-[#f5c16c]/40 bg-[#14151f] text-center',
    initial: { opacity: 0, scale: 0.92 },
    exit: { opacity: 0, scale: 0.96 },
  },
  command: {
    container: 'items-start justify-center p-4 pt-[12vh]',
    panel: 'max-h-[min(32rem,70dvh)] rounded-2xl border border-white/15 bg-[#101118] shadow-2xl',
    initial: { opacity: 0, y: -16 },
    exit: { opacity: 0, y: -20 },
  },
  banner: {
    container: 'items-start justify-center p-0',
    panel: 'w-full max-w-none rounded-none border-x-0 border-t-0 border-white/12 bg-[#14151f]',
    initial: { y: '-100%' },
    exit: { y: '-100%' },
  },
  split: {
    container: 'items-end justify-center p-4 sm:items-center',
    panel: 'max-h-[min(40rem,calc(100dvh-2rem))] overflow-hidden rounded-3xl border border-white/12 bg-[#14151f]',
    initial: { opacity: 0, x: -20 },
    exit: { opacity: 0, x: -16 },
  },
  lightbox: {
    container: 'items-center justify-center bg-black/40 p-3 sm:p-8',
    panel: 'max-h-[min(44rem,calc(100dvh-1.5rem))] max-w-4xl rounded-2xl border border-white/10 bg-black',
    initial: { opacity: 0, scale: 0.94 },
    exit: { opacity: 0, scale: 1.02 },
  },
  'action-sheet': {
    container: 'items-end justify-center p-0 sm:p-4',
    panel: 'max-h-[70dvh] w-full max-w-lg rounded-t-[1.6rem] border border-b-0 border-white/12 bg-[#16151c] sm:rounded-3xl sm:border-b',
    initial: { y: '100%' },
    exit: { y: '100%' },
  },
  wizard: {
    container: 'items-end justify-center p-4 sm:items-center',
    panel: 'max-h-[min(40rem,calc(100dvh-2rem))] rounded-3xl border border-white/12 bg-[#14151f]',
    initial: { opacity: 0, x: 28 },
    exit: { opacity: 0, x: -24 },
  },
  document: {
    container: 'items-end justify-center p-4 sm:items-center',
    panel: 'max-h-[min(44rem,calc(100dvh-2rem))] rounded-sm border border-[#d9d1c3] bg-[#f6f3ec] text-[#1c1915] shadow-[0_30px_80px_-36px_rgba(0,0,0,0.85)]',
    initial: { opacity: 0, y: 28 },
    exit: { opacity: 0, y: 20 },
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
}

export function ModalContent({
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
    if (!open) return
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
  }, [initialFocus, open, setOpen])

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
            role={variant === 'alert' ? 'alertdialog' : 'dialog'}
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className={cn(
              'relative z-10 flex w-full flex-col text-[#f6f3ec] outline-none',
              variant === 'split' && 'md:grid md:grid-cols-[13rem_minmax(0,1fr)]',
              modalFrame[variant].panel,
              variant === 'document' && 'text-[#1c1915]',
              !['sheet', 'drawer', 'fullscreen', 'banner', 'action-sheet', 'lightbox'].includes(variant) && sizeClass[size],
              className,
            )}
            initial={reduced ? false : modalFrame[variant].initial}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : modalFrame[variant].exit}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
          >
            {variant === 'action-sheet' ? (
              <div className="flex justify-center pt-3" aria-hidden="true">
                <span className="h-1.5 w-10 rounded-full bg-white/25" />
              </div>
            ) : null}
            {variant === 'wizard' ? (
              <div className="flex gap-1 px-6 pt-5" aria-label={`Step ${Math.min(step, steps)} of ${steps}`}>
                {Array.from({ length: Math.max(steps, 1) }, (_, index) => (
                  <span key={index} className={cn('h-1 flex-1 rounded-full', index < step ? 'bg-[#f5c16c]' : 'bg-white/15')} />
                ))}
              </div>
            ) : null}
            <div
              className={cn(
                'z-10 flex items-start gap-4 px-6 pt-6 pb-4',
                variant !== 'lightbox' && 'sticky top-0 bg-inherit',
                variant === 'alert' && 'flex-col items-center',
                variant === 'split' && 'md:row-span-2 md:flex-col md:border-r md:border-white/10 md:bg-[#101118]',
                variant === 'lightbox' && 'order-2 border-t border-white/10',
                variant === 'document' && 'border-b border-[#1c1915]/10',
              )}
            >
              <div className={cn('min-w-0 flex-1', variant === 'alert' && 'text-center', variant === 'document' && 'font-serif')}>
                <h2 id={titleId} className={cn('font-serif text-2xl leading-tight', variant === 'lightbox' && 'text-lg', titleClassName)}>
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className={cn('mt-2 text-sm leading-6', variant === 'document' ? 'text-[#5c564c]' : 'text-zinc-300')}>
                    {description}
                  </p>
                ) : null}
              </div>
              {hideClose ? null : (
                <button
                  ref={closeRef}
                  type="button"
                  className={cn(
                    'inline-flex size-11 shrink-0 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
                    variant === 'document' ? 'border-[#1c1915]/20 text-[#1c1915] hover:bg-black/5' : 'border-white/15 text-zinc-100 hover:bg-white/10',
                    variant === 'lightbox' && 'absolute top-3 right-3 border-white/20 bg-black/50',
                  )}
                  aria-label={closeLabel}
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div ref={bodyRef} className={cn('min-h-0 flex-1 overflow-y-auto px-6 pt-1 pb-6', variant === 'lightbox' && 'min-h-48', variant === 'action-sheet' && 'flex flex-col gap-2')}>
              {children}
            </div>
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
