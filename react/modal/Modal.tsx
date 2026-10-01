/* Grep UI — Modal (React). Styling: Components/modal/modal.css
   Composes Icon Button (24, ghost) for close and Button for the footer.
   Escape closes; focus moves into the dialog on open and back on close. */
import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { ToastClose } from '../icons'
import { Button } from '../button'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean
  onClose: () => void
  title: ReactNode
  subtitle?: ReactNode
  /** Width preset. */
  size?: 'base' | 520
  /** Footer buttons. Confirm is brand, or danger when `destructive`. */
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  destructive?: boolean
  /** Something for the footer's left side: a checkbox, a count, a link. */
  footerLead?: ReactNode
  /** Render the overlay in place instead of fixed to the viewport (for previews). */
  inline?: boolean
  children: ReactNode
}

export function Modal({ open, onClose, title, subtitle, size = 'base', confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, destructive, footerLead, inline, className, children, ...rest }: ModalProps) {
  const titleId = useId()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      prev?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="grep-modal-overlay" style={inline ? { position: 'absolute' } : undefined} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} tabIndex={-1} className={cx('grep-modal', size === 520 && 'grep-modal--520', className)} role="dialog" aria-modal="true" aria-labelledby={titleId} {...rest}>
        <div className="grep-modal__header">
          <div className="grep-modal__heading">
            <h2 className="grep-modal__title" id={titleId}>
              {title}
            </h2>
            {subtitle && <p className="grep-modal__subtitle">{subtitle}</p>}
          </div>
          <button type="button" className="grep-icon-btn grep-icon-btn--24 grep-icon-btn--ghost" aria-label="Close" onClick={onClose}>
            <ToastClose className="grep-icon-btn__icon" />
          </button>
        </div>
        <div className="grep-modal__body">{children}</div>
        <div className="grep-modal__footer">
          {footerLead && <span className="grep-modal__footer-lead">{footerLead}</span>}
          <Button variant="neutral" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant={destructive ? 'danger' : 'brand'} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
