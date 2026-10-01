/* Grep UI — Badge (React). Styling: Components/badge/badge.css */
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { BadgeClose } from '../icons'

export type BadgeTone = 'neutral-base' | 'neutral-dim' | 'brand' | 'success' | 'warning' | 'destructive' | 'blue' | 'cyan' | 'fuschia' | 'indigo' | 'orange' | 'teal'
export type BadgeSize = 16 | 18 | 22

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  size?: BadgeSize
  /** Figma `shape`. Default full (pill). */
  shape?: 'full' | 'rounded'
  /** A leading icon, sized by the badge. */
  icon?: ReactNode
  /** Shows the close mark and calls back when it's pressed. */
  onRemove?: () => void
  children: ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ tone = 'neutral-base', size = 22, shape = 'full', icon, onRemove, className, children, ...rest }, ref) {
  return (
    <span ref={ref} className={cx('grep-badge', `grep-badge--${tone}`, `grep-badge--${shape}`, `grep-badge--${size}`, className)} {...rest}>
      {icon && <span className="grep-badge__icon">{icon}</span>}
      <span className="grep-badge__label">{children}</span>
      {onRemove && (
        <button type="button" className="grep-badge__close" aria-label="Remove" onClick={onRemove}>
          <BadgeClose />
        </button>
      )}
    </span>
  )
})
