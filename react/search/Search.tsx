/* Grep UI — Search (React). Styling: Components/search/search.css */
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { FileTreeSearch } from '../icons'
import { Kbd, KbdGroup } from '../keyboard-shortcut'

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 28 | 32
  /** No fill, no hairline. */
  ghost?: boolean
  error?: boolean
  /** Keys shown on the right, e.g. ['cmd', 'F']. 'cmd' renders the command glyph. */
  shortcut?: string[]
  /** Replace the magnifier. */
  icon?: ReactNode
}

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ size = 28, ghost, error, shortcut, icon, className, placeholder = 'Search…', ...rest }, ref) {
  return (
    <div className={cx('grep-search', size === 32 && 'grep-search--32', ghost && 'grep-search--ghost', error && 'grep-search--danger', className)}>
      <span className="grep-search__label">
        {icon ?? <FileTreeSearch className="grep-search__icon" />}
        <input ref={ref} className="grep-search__input" type="search" placeholder={placeholder} aria-label={rest['aria-label'] ?? 'Search'} {...rest} />
      </span>
      {shortcut && shortcut.length > 0 && (
        <span className="grep-search__shortcut">
          <KbdGroup>
            {shortcut.map((k) => (
              <Kbd key={k} type={k === 'cmd' ? 'icon' : k.length === 1 ? 'letter' : 'label'}>
                {k === 'cmd' ? undefined : k}
              </Kbd>
            ))}
          </KbdGroup>
        </span>
      )}
    </div>
  )
})
