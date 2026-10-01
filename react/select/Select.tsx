/* Grep UI — Select (React). Styling: Components/select/select.css + input.css
   The trigger is the Figma Select field; the open list is a Grep UI Context
   Menu rendered in a portal at the top of the document, so no ancestor's
   overflow or stacking can hide it. */
import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
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
  const [pos, setPos] = useState<CSSProperties>({})
  const trigger = useRef<HTMLButtonElement | null>(null)
  const menu = useRef<HTMLDivElement>(null)
  const shown = options.find((o) => o.value === value)

  const place = () => {
    const r = trigger.current?.getBoundingClientRect()
    if (!r) return
    setPos({ position: 'fixed', top: r.bottom + 4, left: r.left, width: r.width, zIndex: 1000 })
  }

  useLayoutEffect(() => {
    if (open) place()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!trigger.current?.contains(t) && !menu.current?.contains(t)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', place, true)
    window.addEventListener('resize', place)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('resize', place)
    }
  }, [open])

  return (
    <div className={cx('grep-input', size === 32 && 'grep-input--32', disabled && 'grep-input--disabled', error && 'grep-input--error', className)}>
      {(label || sublabel) && (
        <label className="grep-input__label" htmlFor={triggerId}>
          {label && <span className="grep-input__label-row">{label}</span>}
          {sublabel && <p className="grep-input__sublabel">{sublabel}</p>}
        </label>
      )}
      <div className="grep-input__field-container">
        <button
          ref={(el) => {
            trigger.current = el
            if (typeof ref === 'function') ref(el)
            else if (ref) ref.current = el
          }}
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
        {open &&
          createPortal(
            <ContextMenu
              ref={menu}
              role="listbox"
              style={pos}
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
            />,
            document.body,
          )}
        {helpText && <p className="grep-input__help">{helpText}</p>}
      </div>
    </div>
  )
})
