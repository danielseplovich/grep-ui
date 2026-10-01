/* Grep UI — Checkbox (React). Styling: Components/checkbox/checkbox.css */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { CheckboxCheck, CheckboxMinus } from '../icons'

export interface CheckboxProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** With a label the control becomes a Checkbox Group row. */
  label?: ReactNode
  sublabel?: ReactNode
  /** Trailing badge, in the group only. */
  badge?: ReactNode
  /** Group on a card (padding 12, hairline, card shadow). */
  card?: boolean
}

/** The bare 14px control, for use inside other components. */
export function CheckboxMark({ checked, indeterminate, className }: { checked?: boolean; indeterminate?: boolean; className?: string }) {
  return (
    <span className={cx('grep-checkbox', indeterminate ? 'grep-checkbox--indeterminate' : checked && 'grep-checkbox--checked', className)}>
      <span className="grep-checkbox__box">
        <CheckboxCheck className="grep-checkbox__mark grep-checkbox__mark--check" />
        <CheckboxMinus className="grep-checkbox__mark grep-checkbox__mark--minus" />
      </span>
    </span>
  )
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { checked = false, indeterminate = false, onCheckedChange, label, sublabel, badge, card, className, type, onClick, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      className={cx('grep-checkbox-group', card && 'grep-checkbox-group--card', className)}
      onClick={(e) => {
        onClick?.(e)
        onCheckedChange?.(!checked)
      }}
      {...rest}
    >
      <CheckboxMark checked={checked} indeterminate={indeterminate} />
      {label && (
        <span className="grep-checkbox-group__label">
          <span className="grep-checkbox-group__title">{label}</span>
          {sublabel && <p className="grep-checkbox-group__sublabel">{sublabel}</p>}
        </span>
      )}
      {badge && <span className="grep-checkbox-group__badge">{badge}</span>}
    </button>
  )
})
