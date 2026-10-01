/* Grep UI — Breadcrumbs (React). Styling: Components/breadcrumbs/breadcrumbs.css */
import { Fragment, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'
import { BreadcrumbsChevron, BreadcrumbsFolderExample, BreadcrumbsOverflow } from '../icons'

export interface Crumb {
  label: string
  /** Replace the folder glyph. */
  icon?: ReactNode
  onClick?: () => void
  href?: string
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** First to last; the last crumb is the current location. */
  items: Crumb[]
  /** Collapse the middle to an overflow crumb when there are more than this many. */
  maxVisible?: number
  /** Figma `Simplified`: plain text crumbs, as used inside a Tooltip. */
  simplified?: boolean
  onOverflowClick?: () => void
}

export function Breadcrumbs({ items, maxVisible = 4, simplified, onOverflowClick, className, ...rest }: BreadcrumbsProps) {
  const sep = <BreadcrumbsChevron className="grep-breadcrumbs__sep" />
  const collapse = !simplified && items.length > maxVisible
  const shown: Array<Crumb | 'overflow'> = collapse ? [items[0], 'overflow', ...items.slice(items.length - (maxVisible - 2))] : items

  return (
    <nav className={cx('grep-breadcrumbs', simplified && 'grep-breadcrumbs--simplified', items.length === 2 && 'grep-breadcrumbs--two-items', className)} aria-label="Breadcrumb" {...rest}>
      {shown.map((c, i) => {
        const last = i === shown.length - 1
        return (
          <Fragment key={i}>
            {i > 0 && sep}
            {c === 'overflow' ? (
              <button type="button" className="grep-crumb grep-crumb--icon-only" aria-label="Show hidden path" onClick={onOverflowClick}>
                <span className="grep-crumb__visual">
                  <BreadcrumbsOverflow className="grep-crumb__icon" />
                </span>
              </button>
            ) : simplified ? (
              <span className="grep-crumb grep-crumb--simplified" aria-current={last ? 'page' : undefined}>
                {c.label}
              </span>
            ) : last ? (
              <span className="grep-crumb grep-crumb--folder grep-crumb--active" aria-current="page">
                <span className="grep-crumb__visual">{c.icon ? withClass(c.icon, 'grep-crumb__icon') : <BreadcrumbsFolderExample className="grep-crumb__icon grep-crumb__icon--folder" />}</span>
                <span className="grep-crumb__label">{c.label}</span>
              </span>
            ) : (
              <CrumbButton crumb={c} />
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}

function CrumbButton({ crumb }: { crumb: Crumb }) {
  const inner = (
    <>
      <span className="grep-crumb__visual">{crumb.icon ? withClass(crumb.icon, 'grep-crumb__icon') : <BreadcrumbsFolderExample className="grep-crumb__icon grep-crumb__icon--folder" />}</span>
      <span className="grep-crumb__label">{crumb.label}</span>
    </>
  )
  if (crumb.href) {
    return (
      <a className="grep-crumb grep-crumb--folder" href={crumb.href} onClick={crumb.onClick}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" className="grep-crumb grep-crumb--folder" onClick={crumb.onClick}>
      {inner}
    </button>
  )
}
