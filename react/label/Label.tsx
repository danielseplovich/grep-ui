/* Grep UI — Label (React). Styling: Components/label/label.css */
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'

export interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  /** 14px instead of 13. */
  size?: 'base' | 'lg'
  /** Weight 500 instead of 440. */
  bold?: boolean
  /** Leading 14px icon. */
  icon?: ReactNode
  /** Appends "(Optional)". */
  optional?: boolean
  /** A trailing info glyph (14px). */
  info?: ReactNode
  /** A small trailing badge. */
  badge?: ReactNode
  sublabel?: ReactNode
  /** Sublabel treatment. `path` renders it as a mono file path. */
  sublabelStyle?: 'base' | 'sm' | 'subtle' | 'path'
  children: ReactNode
}

export const Label = forwardRef<HTMLDivElement, LabelProps>(function Label(
  { size = 'base', bold, icon, optional, info, badge, sublabel, sublabelStyle = 'base', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'grep-label',
        size === 'lg' && 'grep-label--lg',
        bold && 'grep-label--bold',
        sublabelStyle === 'sm' && 'grep-label--sub-sm',
        sublabelStyle === 'subtle' && 'grep-label--sub-subtle',
        sublabelStyle === 'path' && 'grep-label--path',
        className,
      )}
      {...rest}
    >
      <div className="grep-label__row">
        {icon && <span className="grep-label__icon">{icon}</span>}
        <div className="grep-label__group">
          <span className="grep-label__text">{children}</span>
          {optional && <span className="grep-label__optional">(Optional)</span>}
          {info && <span className="grep-label__info">{info}</span>}
        </div>
        {badge && <span className="grep-label__badge">{badge}</span>}
      </div>
      {sublabel && <p className="grep-label__sublabel">{sublabel}</p>}
    </div>
  )
})
