import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { topNav, sectionOf } from '../lib/nav'
import { useTheme } from '../lib/theme'
import { Asset, Glyph, IconButton } from './ui'
import { SearchDialog } from './SearchDialog'
import { Button } from '../../../react/button'

/**
 * Site shell: a single header, no sidebar. The four sections sit in the
 * middle as a 32px pill tab group; the galleries behind them are the hubs,
 * and ⌘K plus the prev/next pager carry navigation inside a section.
 */
export function Layout({ children }: { children: ReactNode }) {
  const [theme, , toggleTheme] = useTheme()
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const section = sectionOf(pathname)

  // ⌘K / Ctrl+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="doc-shell">
      <a href="#doc-content" className="grep-btn grep-btn--neutral doc-skip">
        <span className="grep-btn__label">Skip to content</span>
      </a>

      <header className="doc-header">
        <Link to="/" className="doc-header__brand" aria-label="Grep UI home">
          <span className="doc-header__mark" aria-hidden="true">
            <Asset name="lego-block" />
          </span>
          Grep UI
          <span className="grep-badge grep-badge--neutral-base grep-badge--16 grep-badge--full doc-header__brand-sub">
            <span className="grep-badge__label">Docs</span>
          </span>
        </Link>

        <nav className="grep-tabs doc-header__nav" aria-label="Sections">
          {topNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={`grep-tab grep-tab--32 grep-tab--full${section === item.to ? ' grep-tab--selected' : ''}`}
              aria-current={section === item.to ? 'page' : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="doc-header__actions">
          <IconButton label="Search documentation (⌘K)" onClick={() => setSearchOpen(true)}>
            <Asset name="file-tree-search" className="grep-icon-btn__icon" />
          </IconButton>
          <IconButton label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
            <Glyph name={theme === 'dark' ? 'sun' : 'moon'} className="grep-icon-btn__icon" />
          </IconButton>
          <Button asChild variant="brand" trailingIcon={<Glyph name="external" />} className="doc-header__export">
            <a href="/grep.md" download="grep.md">
              Export grep.md
            </a>
          </Button>
        </div>
      </header>

      <main className="doc-main" id="doc-content" tabIndex={-1}>
        {children}
      </main>

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
