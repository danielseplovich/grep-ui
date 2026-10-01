/* Grep UI — Context Menu (React). Styling: Components/context-menu/context-menu.css
   The menu surface and its items. Opening it at the pointer is the app's job. */
import { Fragment, forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'
import { BreadcrumbsChevron, FileTreeSearch } from '../icons'

export interface MenuItem {
  label: ReactNode
  icon?: ReactNode
  onSelect?: () => void
  /** Opens a submenu: shows the trailing chevron. */
  submenu?: boolean
  danger?: boolean
  disabled?: boolean
}

export interface MenuSection {
  /** Small header above the items, e.g. "4 assets". */
  header?: ReactNode
  items: MenuItem[]
}

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  sections: MenuSection[]
  /** Shows a search field at the top. */
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(function ContextMenu({ sections, searchable, searchPlaceholder = 'Search…', onSearch, className, role = 'menu', ...rest }, ref) {
  return (
    <div ref={ref} className={cx('grep-menu', className)} role={role} {...rest}>
      {searchable && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 'var(--space-14)' }}>
            <FileTreeSearch className="grep-menu__search-icon" />
            <input className="grep-menu__search" style={{ flex: 1, marginLeft: 0 }} placeholder={searchPlaceholder} aria-label="Search actions" onChange={(e) => onSearch?.(e.target.value)} />
          </div>
          <hr className="grep-menu__rule" />
        </>
      )}
      {sections.map((s, i) => (
        <Fragment key={i}>
          {i > 0 && <hr className="grep-menu__rule" />}
          <div className="grep-menu__section">
            {s.header && <div className="grep-menu__header">{s.header}</div>}
            {s.items.map((item, j) => (
              <button key={j} type="button" role="menuitem" className={cx('grep-menu__item', item.danger && 'grep-menu__item--danger')} disabled={item.disabled} onClick={item.onSelect}>
                <span className="grep-menu__item-left">
                  {item.icon && withClass(item.icon, 'grep-menu__item-icon')}
                  {item.label}
                </span>
                <span className="grep-menu__item-right">{item.submenu && <BreadcrumbsChevron className="grep-menu__item-chevron" />}</span>
              </button>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  )
})
