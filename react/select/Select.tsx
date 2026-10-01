/* Grep UI — Select (React). Styling: Components/select/select.css + input.css
   The trigger is the Figma Select field; the open list is a Grep UI Context
   Menu anchored under it. */
import { forwardRef, useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { SelectChevron } from '../icons'
import { ContextMenu } from '../context-menu'

export interface SelectOption {
  value: string
  label: ReactNode
  icon?: ReactNode
}

export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: ReactNode
  sublabel?: ReactNode
  helpText?: ReactNode
  size?: 28 | 32
  error?: boolean
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { options, value, onValueChange, placeholder = 'Select…', label, sublabel, helpText, size = 28, error, disabled, className, id, ...rest },
  ref,
) {
  const auto = useId()
  const triggerId = id ?? auto
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const shown = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={root} className={cx('grep-input', size === 32 && 'grep-input--32', disabled && 'grep-input--disabled', error && 'grep-input--error', className)}>
      {(label || sublabel) && (
        <label className="grep-input__label" htmlFor={triggerId}>
          {label && <span className="grep-input__label-row">{label}</span>}
          {sublabel && <p className="grep-input__sublabel">{sublabel}</p>}
        </label>
      )}
      <div className="grep-input__field-container" style={{ position: 'relative' }}>
        <button
          ref={ref}
          id={triggerId}
          type="button"
          className="grep-input__field grep-select"
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          {...rest}
        >
          <span className={cx('grep-select__value', !shown && 'grep-select__value--placeholder')}>{shown ? shown.label : placeholder}</span>
          <SelectChevron className="grep-select__chevron" />
        </button>
        {open && (
          <ContextMenu
            role="listbox"
            style={{ position: 'absolute', top: 'calc(100% + var(--space-4))', left: 0, width: '100%', zIndex: 20 }}
            sections={[
              {
                items: options.map((o) => ({
                  label: o.label,
                  icon: o.icon,
                  onSelect: () => {
                    onValueChange?.(o.value)
                    setOpen(false)
                  },
                })),
              },
            ]}
          />
        )}
        {helpText && <p className="grep-input__help">{helpText}</p>}
      </div>
    </div>
  )
})
