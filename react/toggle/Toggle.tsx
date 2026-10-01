/* Grep UI — Toggle (React). Styling: Components/toggle/toggle.css */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Figma `size`. */
  size?: 'sm' | 'md'
  /** With a label the control becomes a Toggle Group row. */
  label?: ReactNode
  sublabel?: ReactNode
  badge?: ReactNode
  card?: boolean
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { checked = false, onCheckedChange, size = 'sm', label, sublabel, badge, card, className, type, onClick, ...rest },
  ref,
) {
  const control = (
    <span className={cx('grep-toggle', size === 'md' && 'grep-toggle--md', checked && 'grep-toggle--on')}>
      <span className="grep-toggle__track">
        <span className="grep-toggle__thumb" />
      </span>
    </span>
  )
  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    onCheckedChange?.(!checked)
  }
  if (!label) {
    return (
      <button ref={ref} type={type ?? 'button'} role="switch" aria-checked={checked} className={cx('grep-toggle', size === 'md' && 'grep-toggle--md', checked && 'grep-toggle--on', className)} onClick={handle} {...rest}>
        <span className="grep-toggle__track">
          <span className="grep-toggle__thumb" />
        </span>
      </button>
    )
  }
  return (
    <button ref={ref} type={type ?? 'button'} role="switch" aria-checked={checked} className={cx('grep-toggle-group', card && 'grep-toggle-group--card', className)} onClick={handle} {...rest}>
      {control}
      <span className="grep-toggle-group__label">
        <span className="grep-toggle-group__title">{label}</span>
        {sublabel && <span className="grep-toggle-group__sublabel">{sublabel}</span>}
      </span>
      {badge && <span className="grep-toggle-group__badge">{badge}</span>}
    </button>
  )
})
