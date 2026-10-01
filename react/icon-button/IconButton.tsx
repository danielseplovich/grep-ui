/* Grep UI — Icon Button (React). Styling: Components/icon-button/icon-button.css */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'
import { Spinner } from '../button/Spinner'

export type IconButtonVariant = 'primary' | 'neutral' | 'ghost' | 'inverted' | 'danger'
export type IconButtonSize = 16 | 20 | 24 | 28 | 32 | 36 | 40

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: an icon button has no visible text. */
  label: string
  variant?: IconButtonVariant
  size?: IconButtonSize
  /** Figma `radius` Full. */
  round?: boolean
  isLoading?: boolean
  /** The icon, drawn with currentColor. */
  children: ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, variant = 'ghost', size = 28, round, isLoading = false, className, children, type, ...rest },
  ref,
) {
  const icon = withClass(children, 'grep-icon-btn__icon')
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cx('grep-icon-btn', `grep-icon-btn--${variant}`, `grep-icon-btn--${size}`, round && 'grep-icon-btn--full', className)}
      aria-label={label}
      title={label}
      data-state={isLoading ? 'loading' : undefined}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {icon}
      <Spinner className="grep-btn__spinner" />
    </button>
  )
})
