/* Grep UI — File Tree Menu (React). Styling: Components/file-tree-menu/file-tree-menu.css
   Depth is drawn with guide lines, not padding, as the spec says. */
import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'
import { BreadcrumbsFolderExample, FileTreeCaret, FileTreeSearch, PhotoStack } from '../icons'
import { CheckboxMark } from '../checkbox'

export interface TreeNode {
  id: string
  label: string
  /** Replace the folder / file glyph. */
  icon?: ReactNode
  children?: TreeNode[]
  /** Start collapsed. */
  collapsed?: boolean
}

export interface FileTreeMenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  nodes: TreeNode[]
  /** Figma `type`: text rows, or rows with a checkbox. */
  type?: 'text' | 'checkbox'
  /** Checked ids, in checkbox mode. */
  checked?: string[]
  onCheckedChange?: (ids: string[]) => void
  selectedId?: string
  onSelect?: (id: string) => void
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
}

export function FileTreeMenu({ nodes, type = 'text', checked = [], onCheckedChange, selectedId, onSelect, searchable, searchPlaceholder = 'Search files and folders…', onSearch, className, ...rest }: FileTreeMenuProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(collect(nodes).filter((n) => n.collapsed).map((n) => n.id)))
  const toggle = (id: string) =>
    setCollapsed((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const check = (id: string) => onCheckedChange?.(checked.includes(id) ? checked.filter((c) => c !== id) : [...checked, id])

  const render = (list: TreeNode[], depth: number): ReactNode =>
    list.map((n) => {
      const folder = !!n.children
      const isCollapsed = collapsed.has(n.id)
      return (
        <li key={n.id} style={{ display: 'contents' }}>
          <div className={cx('grep-tree-item', isCollapsed && 'grep-tree-item--collapsed', selectedId === n.id && 'grep-tree-item--selected')} onClick={() => onSelect?.(n.id)}>
            {Array.from({ length: depth }, (_, i) => (
              <span key={i} className="grep-tree-item__guide" />
            ))}
            {folder ? (
              <button
                type="button"
                className="grep-tree-item__caret"
                aria-label={isCollapsed ? 'Expand' : 'Collapse'}
                aria-expanded={!isCollapsed}
                onClick={(e) => {
                  e.stopPropagation()
                  toggle(n.id)
                }}
              >
                <FileTreeCaret />
              </button>
            ) : (
              <button type="button" className="grep-tree-item__caret grep-tree-item__caret--empty" tabIndex={-1} aria-hidden="true">
                <FileTreeCaret />
              </button>
            )}
            <div className="grep-tree-item__frame">
              {type === 'checkbox' && (
                <span
                  className="grep-tree-item__control"
                  role="checkbox"
                  aria-checked={checked.includes(n.id)}
                  onClick={(e) => {
                    e.stopPropagation()
                    check(n.id)
                  }}
                >
                  <CheckboxMark checked={checked.includes(n.id)} />
                </span>
              )}
              <span className="grep-tree-item__visual">{n.icon ? withClass(n.icon, '') : folder ? <BreadcrumbsFolderExample /> : <PhotoStack />}</span>
              <span className="grep-tree-item__label">{n.label}</span>
            </div>
          </div>
          {folder && !isCollapsed && render(n.children!, depth + 1)}
        </li>
      )
    })

  return (
    <div className={cx('grep-tree-menu', className)} {...rest}>
      {searchable && (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FileTreeSearch className="grep-tree-menu__search-icon" />
            <input className="grep-tree-menu__search" placeholder={searchPlaceholder} aria-label="Search" onChange={(e) => onSearch?.(e.target.value)} />
          </div>
          <hr className="grep-tree-menu__rule" />
        </>
      )}
      <ul className="grep-tree-menu__list">{render(nodes, 0)}</ul>
    </div>
  )
}

function collect(list: TreeNode[]): TreeNode[] {
  return list.flatMap((n) => [n, ...(n.children ? collect(n.children) : [])])
}
