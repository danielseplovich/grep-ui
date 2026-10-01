/* Grep UI — Input (React). Styling: Components/input/input.css */
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  /** A 14px icon before the label. */
  labelIcon?: ReactNode
  sublabel?: ReactNode
  helpText?: ReactNode
  /** Field height. */
  size?: 28 | 32
  error?: boolean
  /** Leading addon: an icon button or a unit, with its own rule. */
  leading?: ReactNode
  /** Trailing addon. A string renders as a mono unit label ("USD"). */
  trailing?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, labelIcon, sublabel, helpText, size = 28, error, leading, trailing, disabled, className, id, ...rest },
  ref,
) {
  const auto = useId()
  const inputId = id ?? auto
  const trail = typeof trailing === 'string' ? <span className="grep-input__unit">{trailing}</span> : trailing
  return (
    <div className={cx('grep-input', size === 32 && 'grep-input--32', disabled && 'grep-input--disabled', error && 'grep-input--error', className)}>
      {(label || sublabel) && (
        <label className="grep-input__label" htmlFor={inputId}>
          {label && (
            <span className="grep-input__label-row">
              {labelIcon && <span className="grep-input__label-icon">{labelIcon}</span>}
              {label}
            </span>
          )}
          {sublabel && <p className="grep-input__sublabel">{sublabel}</p>}
        </label>
      )}
      <div className="grep-input__field-container">
        <div className="grep-input__field">
          {leading && (
            <span className="grep-input__addon">
              {leading}
              <span className="grep-input__rule" />
            </span>
          )}
          <input ref={ref} id={inputId} className="grep-input__control" disabled={disabled} aria-invalid={error || undefined} {...rest} />
          {trail && (
            <span className="grep-input__addon">
              <span className="grep-input__rule" />
              {trail}
            </span>
          )}
        </div>
        {helpText && <p className="grep-input__help">{helpText}</p>}
      </div>
    </div>
  )
})
