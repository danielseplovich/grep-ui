import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { flatNav, groupOf, type NavItem } from '../lib/nav'
import { Asset, Kbd } from './ui'

function score(item: NavItem, q: string): number {
  const query = q.toLowerCase().trim()
  if (!query) return 1
  const label = item.label.toLowerCase()
  if (label === query) return 100
  if (label.startsWith(query)) return 80
  if (label.includes(query)) return 60
  if (item.keywords?.some((k) => k.toLowerCase().includes(query))) return 40
  if (item.description?.toLowerCase().includes(query)) return 20
  return 0
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const scored = flatNav.map((item) => ({ item, s: score(item, q) })).filter((r) => r.s > 0)
    scored.sort((a, b) => b.s - a.s)
    return scored.map((r) => r.item).slice(0, 40)
  }, [q])

  useEffect(() => {
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => setActive(0), [q])

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const go = (item: NavItem) => {
    navigate(item.to)
    onClose()
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[active]) go(results[active])
    }
  }

  // group results by section, preserving order
  const grouped = useMemo(() => {
    const map = new Map<string, { item: NavItem; index: number }[]>()
    results.forEach((item, index) => {
      const g = groupOf(item.to) ?? 'Pages'
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push({ item, index })
    })
    return Array.from(map.entries())
  }, [results])

  return (
    <div
      className="grep-modal-overlay doc-search-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="grep-modal grep-modal--520 doc-search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
        onKeyDown={onKey}
      >
        <div className="grep-modal__body">
          <div className="doc-search-dialog__field">
            <div className="grep-search grep-search--32">
              <span className="grep-search__label">
                <Asset name="file-tree-search" className="grep-search__icon" />
                <input
                  ref={inputRef}
                  className="grep-search__input"
                  placeholder="Search components, tokens, pages…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="doc-search-results"
                  aria-activedescendant={results[active] ? `doc-search-opt-${active}` : undefined}
                  aria-autocomplete="list"
                  autoComplete="off"
                  spellCheck={false}
                />
              </span>
              <span className="grep-search__shortcut">
                <span className="grep-kbd grep-kbd--label">esc</span>
              </span>
            </div>
          </div>
          <hr className="grep-menu__rule" />
          <div className="doc-search-dialog__results" ref={listRef} id="doc-search-results" role="listbox">
            {results.length === 0 && <div className="doc-search-dialog__empty">No results for “{q}”</div>}
            {grouped.map(([group, entries]) => (
              <div className="grep-menu__section" key={group} role="group" aria-label={group}>
                <div className="grep-menu__header">{group}</div>
                {entries.map(({ item, index }) => (
                  <button
                    type="button"
                    key={item.to}
                    id={`doc-search-opt-${index}`}
                    data-index={index}
                    className="grep-menu__item"
                    role="option"
                    aria-selected={index === active}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(item)}
                  >
                    <span className="grep-menu__item-left">
                      <Asset name={iconFor(group)} className="grep-menu__item-icon" />
                      {item.label}
                    </span>
                    <span className="grep-menu__item-right">
                      <Asset name="caret-right" className="grep-menu__item-chevron" />
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="doc-search-dialog__hint">
            <span>
              <Kbd keys={['↑', '↓']} /> navigate
            </span>
            <span>
              <Kbd keys={['↵']} /> open
            </span>
            <span>
              <Kbd keys={['esc']} /> close
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function iconFor(group: string): string {
  if (group === 'Components') return 'lego-block'
  if (group === 'Foundations') return 'verical-stack-fill'
  return 'settings-general'
}
