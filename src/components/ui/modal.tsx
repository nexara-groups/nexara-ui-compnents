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

export interface ModalContentProps {
  children?: ReactNode
  title: ReactNode
  description?: ReactNode
  className?: string
  overlayClassName?: string
  size?: keyof typeof sizeClass
  /** Clicking the backdrop or pressing Escape closes the dialog. */
  dismissible?: boolean
  hideClose?: boolean
  /** Where focus lands when the dialog opens. */
  initialFocus?: 'auto' | 'panel' | 'close'
  closeLabel?: string
  titleClassName?: string
  /** Classes for the fixed viewport layer, including z-index. */
  containerClassName?: string
}

export function ModalContent({
  children,
  title,
  description,
  className,
  overlayClassName,
  size = 'md',
  dismissible = true,
  hideClose = false,
  initialFocus = 'auto',
  closeLabel = 'Close',
  titleClassName,
  containerClassName,
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
        <div className={cn('fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center', containerClassName)} data-nexara="modal">
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
              'relative z-10 flex max-h-[min(40rem,calc(100dvh-2rem))] w-full flex-col rounded-3xl border border-white/12 bg-[#14151f] text-[#f6f3ec] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] outline-none',
              sizeClass[size],
              className,
            )}
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
          >
            <div className="sticky top-0 z-10 flex items-start gap-4 rounded-t-3xl bg-[#14151f] px-6 pt-6 pb-4">
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className={cn('font-serif text-2xl leading-tight', titleClassName)}>
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-2 text-sm leading-6 text-zinc-300">
                    {description}
                  </p>
                ) : null}
              </div>
              {hideClose ? null : (
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-100 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
                  aria-label={closeLabel}
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto px-6 pt-1 pb-6">
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
