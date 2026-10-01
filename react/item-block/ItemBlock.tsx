/* Grep UI — Item Block / Item Row (React). Styling: Components/item-block/item-block.css */
import { Children, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'
import { CaretRight } from '../icons'

export interface ItemBlockProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode
  subtitle?: ReactNode
  /** ItemRow children. The rule between rows is drawn automatically. */
  children: ReactNode
}

export function ItemBlock({ title, subtitle, className, children, ...rest }: ItemBlockProps) {
  const rows = Children.toArray(children)
  return (
    <section className={cx('grep-item-block', className)} {...rest}>
      {(title || subtitle) && (
        <h3 className="grep-item-block__title">
          {title}
          {subtitle && <p className="grep-item-block__subtitle">{subtitle}</p>}
        </h3>
      )}
      <div className="grep-item-block__group">
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'contents' }}>
            {row}
            {i < rows.length - 1 && <hr className="grep-item-row__rule" />}
          </div>
        ))}
      </div>
    </section>
  )
}

export interface ItemRowProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  sublabel?: ReactNode
  /** A leading 36px tile with a 20px glyph. */
  tile?: ReactNode
  /** The row is a control (hover, pointer). */
  interactive?: boolean
  /** Shows a trailing chevron; `open` rotates it. */
  chevron?: boolean
  open?: boolean
  /** Trailing controls, in order. */
  children?: ReactNode
}

export function ItemRow({ label, sublabel, tile, interactive, chevron, open, className, children, ...rest }: ItemRowProps) {
  return (
    <div className={cx('grep-item-row', interactive && 'grep-item-row--interactive', open && 'grep-item-row--open', className)} {...rest}>
      <div className="grep-item-row__internal">
        <div className="grep-item-row__left">
          {tile && <span className="grep-item-row__tile">{tile}</span>}
          <div className="grep-item-row__label-frame">
            <div className="grep-item-row__label">
              <span className="grep-item-row__label-row">{label}</span>
              {sublabel && <p className="grep-item-row__sublabel">{sublabel}</p>}
            </div>
          </div>
        </div>
        {children}
        {chevron && withClass(<CaretRight />, 'grep-item-row__chevron')}
      </div>
    </div>
  )
}
