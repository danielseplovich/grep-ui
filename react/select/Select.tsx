/* Grep UI — Select (React). Styling: Components/select/select.css + input.css
   The Figma set only has the trigger; the list is a native <select>, laid
   invisibly over the trigger so it opens the OS picker. */
import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { cx } from '../lib/cx'
import { SelectChevron } from '../icons'

export interface SelectOption {
  value: string
  label: ReactNode
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[]
  placeholder?: string
  label?: ReactNode
  sublabel?: ReactNode
  helpText?: ReactNode
  size?: 28 | 32
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, placeholder = 'Select…', label, sublabel, helpText, size = 28, error, disabled, className, id, value, defaultValue, ...rest },
  ref,
) {
  const auto = useId()
  const selectId = id ?? auto
  const current = value ?? defaultValue
  const shown = options.find((o) => o.value === current)
  return (
    <div className={cx('grep-input', size === 32 && 'grep-input--32', disabled && 'grep-input--disabled', error && 'grep-input--error', className)}>
      {(label || sublabel) && (
        <label className="grep-input__label" htmlFor={selectId}>
          {label && <span className="grep-input__label-row">{label}</span>}
          {sublabel && <p className="grep-input__sublabel">{sublabel}</p>}
        </label>
      )}
      <div className="grep-input__field-container">
        <span className="grep-input__field grep-select" style={{ position: 'relative' }}>
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer' }}
            {...rest}
          >
            {placeholder && current === undefined && <option value="">{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {typeof o.label === 'string' ? o.label : o.value}
              </option>
            ))}
          </select>
          <span className={cx('grep-select__value', !shown && 'grep-select__value--placeholder')}>{shown ? shown.label : placeholder}</span>
          <SelectChevron className="grep-select__chevron" />
        </span>
        {helpText && <p className="grep-input__help">{helpText}</p>}
      </div>
    </div>
  )
})
