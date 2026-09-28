import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../lib/nav'
import { useTheme } from '../lib/theme'
import { Asset, Glyph, IconButton, Kbd } from './ui'
import { SearchDialog } from './SearchDialog'

export function Layout({ children }: { children: ReactNode }) {
  const [theme, , toggleTheme] = useTheme()
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  // close the drawer on navigation
  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

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
        <IconButton
          label={navOpen ? 'Close navigation' : 'Open navigation'}
          className="doc-header__menu"
          onClick={() => setNavOpen((v) => !v)}
          aria-expanded={navOpen}
          aria-controls="doc-sidebar"
        >
          <Glyph name={navOpen ? 'close' : 'menu'} className="grep-icon-btn__icon" />
        </IconButton>

        <Link to="/" className="doc-header__brand" aria-label="Grep UI home">
          <span className="doc-header__mark" aria-hidden="true">
            <Asset name="lego-block" />
          </span>
          Grep UI
          <span className="doc-header__brand-sub">Docs</span>
        </Link>

        <div className="doc-header__search">
          <div
            className="grep-search"
            role="button"
            tabIndex={0}
            aria-label="Search documentation"
            onClick={() => setSearchOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setSearchOpen(true)
              }
            }}
          >
            <span className="grep-search__label">
              <Asset name="file-tree-search" className="grep-search__icon" />
              <input className="grep-search__input" placeholder="Search…" readOnly tabIndex={-1} aria-hidden="true" />
            </span>
            <span className="grep-search__shortcut">
              <Kbd keys={['cmd', 'K']} />
            </span>
          </div>
        </div>

        <div className="doc-header__actions">
          <IconButton
            label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            <Glyph name={theme === 'dark' ? 'sun' : 'moon'} className="grep-icon-btn__icon" />
          </IconButton>
        </div>
      </header>

      <div className="doc-body">
        {navOpen && <div className="doc-scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />}
        <nav className="doc-sidebar" id="doc-sidebar" data-open={navOpen || undefined} aria-label="Documentation">
          {nav.map((group) => (
            <div className="doc-nav__group" key={group.title}>
              <div className="doc-nav__heading">{group.title}</div>
              {group.items.map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'} className="doc-nav__item">
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <main className="doc-main" id="doc-content" tabIndex={-1}>
          {children}
        </main>
      </div>

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </div>
  )
}
