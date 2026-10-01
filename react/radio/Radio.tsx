/* Grep UI — Radio (React). Styling: Components/radio/radio.css */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface RadioProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: ReactNode
  sublabel?: ReactNode
  card?: boolean
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio({ checked = false, onCheckedChange, label, sublabel, card, className, type, onClick, ...rest }, ref) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      role="radio"
      aria-checked={checked}
      className={cx('grep-radio-group', card && 'grep-radio-group--card', className)}
      onClick={(e) => {
        onClick?.(e)
        onCheckedChange?.(true)
      }}
      {...rest}
    >
      <span className={cx('grep-radio', checked && 'grep-radio--checked')}>
        <span className="grep-radio__dot" />
      </span>
      {label && (
        <span className="grep-radio-group__label">
          <span className="grep-radio-group__title">{label}</span>
          {sublabel && <p className="grep-radio-group__sublabel">{sublabel}</p>}
        </span>
      )}
    </button>
  )
})
