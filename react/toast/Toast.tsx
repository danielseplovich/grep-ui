/* Grep UI — Toast (React). Styling: Components/toast/toast.css
   The surface only. Stacking and timing belong to the app's toaster. */
import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { ToastAttention, ToastClose, ToastInfo, ToastSpinner, ToastSuccess, ToastWarning } from '../icons'
import { Button } from '../button'

export type ToastType = 'info' | 'success' | 'attention' | 'warning' | 'loading'

export interface ToastAction {
  label: string
  onClick?: () => void
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: ToastType
  title: ReactNode
  /** Secondary actions, rendered as text links. */
  links?: ToastAction[]
  /** Up to two buttons: neutral first, brand last. */
  actions?: ToastAction[]
  onDismiss?: () => void
  children?: ReactNode
}

const icons: Record<ToastType, ReactNode> = {
  info: <ToastInfo />,
  success: <ToastSuccess />,
  attention: <ToastAttention />,
  warning: <ToastWarning />,
  loading: <ToastSpinner />,
}

export function Toast({ type = 'info', title, links, actions, onDismiss, className, children, ...rest }: ToastProps) {
  return (
    <div className={cx('grep-toast', className)} role="status" aria-live="polite" {...rest}>
      <div className="grep-toast__main">
        <div className="grep-toast__content">
          {icons[type]}
          <div className="grep-toast__text">
            <div className="grep-toast__label">{title}</div>
            {children && <p className="grep-toast__message">{children}</p>}
          </div>
        </div>
        {onDismiss && (
          <button type="button" className="grep-icon-btn grep-icon-btn--16 grep-icon-btn--ghost grep-toast__close" aria-label="Dismiss" onClick={onDismiss}>
            <ToastClose className="grep-icon-btn__icon" />
          </button>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="grep-toast__actions grep-toast__actions--links">
          {links.map((l) => (
            <button key={l.label} type="button" className="grep-toast__link" onClick={l.onClick}>
              {l.label}
            </button>
          ))}
        </div>
      )}
      {actions && actions.length > 0 && (
        <div className="grep-toast__actions">
          {actions.map((a, i) => (
            <Button key={a.label} variant={i === actions.length - 1 ? 'brand' : 'neutral'} onClick={a.onClick}>
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
