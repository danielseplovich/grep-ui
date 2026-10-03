import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Page, PageHeader } from './Page'
import { Badge } from '../../../react/badge'
import { SegmentedControl } from '../../../react/segmented-control'

/**
 * A hub page (Figma: Grep UI docs › Components / Grid, Components / List).
 * Title with a count, a lede, and a grid/list switch. Grid: tiles with a live
 * preview and a name. List: names down the left, the chosen one on the right.
 */

export interface HubItem {
  slug: string
  label: string
  /** The tile's live preview. */
  preview: ReactNode
  /** The full page for this item. */
  to: string
  /** The right-hand side in list view. */
  detail: ReactNode
}

type View = 'grid' | 'list'

const GridIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...p}>
    <rect x="2" y="2" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="8" y="2" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="2" y="8" width="4" height="4" rx="1" fill="currentColor" />
    <rect x="8" y="8" width="4" height="4" rx="1" fill="currentColor" />
  </svg>
)
const ListIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...p}>
    <path d="M5 3.5h7M5 7h7M5 10.5h7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    <circle cx="2.5" cy="3.5" r="1" fill="currentColor" />
    <circle cx="2.5" cy="7" r="1" fill="currentColor" />
    <circle cx="2.5" cy="10.5" r="1" fill="currentColor" />
  </svg>
)

export function Hub({ id, title, lede, items, empty }: { id: string; title: string; lede: string; items: HubItem[]; empty?: ReactNode }) {
  const KEY = `grep-docs-${id}-view`
  const [view, setView] = useState<View>(() => {
    try {
      return localStorage.getItem(KEY) === 'list' ? 'list' : 'grid'
    } catch {
      return 'grid'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(KEY, view)
    } catch {
      /* storage unavailable */
    }
  }, [KEY, view])
  const navigate = useNavigate()
  const [current, setCurrent] = useState(items[0]?.slug)
  const chosen = items.find((i) => i.slug === current) ?? items[0]

  return (
    <Page title={title}>
      <PageHeader
        title={
          <span className="doc-title__count">
            {title} <Badge tone="brand" size={18}>{items.length}</Badge>
          </span>
        }
        lede={<p>{lede}</p>}
      >
        {items.length > 0 && (
          <div className="doc-gallery__tools">
            <SegmentedControl
              aria-label="View"
              size={32}
              value={view}
              onValueChange={(v) => setView(v as View)}
              segments={[
                { value: 'list', icon: <ListIcon /> },
                { value: 'grid', icon: <GridIcon /> },
              ]}
            />
          </div>
        )}
      </PageHeader>

      {items.length === 0 ? (
        empty
      ) : view === 'grid' ? (
        <div className="doc-gallery">
          {items.map((it) => (
            <Link key={it.slug} to={it.to} className="doc-tile">
              <span className="doc-tile__frame">
                <span className="doc-tile__stage">{it.preview}</span>
              </span>
              <span className="doc-tile__label">{it.label}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="doc-master">
          <nav className="doc-master__names" aria-label={title}>
            {items.map((it) => (
              <button
                key={it.slug}
                type="button"
                className={`doc-master__name${it.slug === chosen.slug ? ' doc-master__name--current' : ''}`}
                aria-current={it.slug === chosen.slug ? 'true' : undefined}
                onClick={() => (it.slug === chosen.slug ? navigate(it.to) : setCurrent(it.slug))}
                title={it.slug === chosen.slug ? 'Open page' : undefined}
              >
                {it.label}
              </button>
            ))}
          </nav>
          <div className="doc-master__detail" key={chosen.slug}>
            {chosen.detail}
          </div>
        </div>
      )}
    </Page>
  )
}
