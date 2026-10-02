import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Page, PageHeader } from '../components/Page'
import { Fit } from '../components/Fit'
import { specs } from '../lib/specs'
import { navLabel } from '../lib/nav'
import { reactDocs } from '../lib/reactDocs'
import { galleryPreview } from '../lib/gallery'
import { Badge } from '../../../react/badge'
import { SegmentedControl } from '../../../react/segmented-control'

type View = 'grid' | 'list'
const KEY = 'grep-docs-components-view'

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

/** The components hub: every component previewed live, as a grid of cards or a list. */
export function ComponentsIndexPage() {
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
  }, [view])

  return (
    <Page title="Components" toc={[]} wide>
      <PageHeader
        title={
          <span className="doc-title__count">
            Components <Badge tone="brand" size={18}>{specs.length}</Badge>
          </span>
        }
        lede={<p>Building blocks of your interface</p>}
      >
        <div className="doc-gallery__tools">
          <SegmentedControl
            aria-label="View"
            value={view}
            onValueChange={(v) => setView(v as View)}
            segments={[
              { value: 'list', icon: <ListIcon />, label: undefined },
              { value: 'grid', icon: <GridIcon />, label: undefined },
            ]}
          />
        </div>
      </PageHeader>

      {view === 'grid' ? (
        <div className="doc-gallery">
          {specs.map((s) => (
            <Link key={s.slug} to={`/components/${s.slug}`} className="doc-tile">
              <span className="doc-tile__frame">
                <span className="doc-tile__stage">
                  <Fit>{galleryPreview(s.slug)}</Fit>
                </span>
              </span>
              <span className="doc-tile__label">{navLabel(s)}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="doc-list">
          {specs.map((s) => (
            <Link key={s.slug} to={`/components/${s.slug}`} className="doc-list__row">
              <span className="doc-list__name">{navLabel(s)}</span>
              <span className="doc-list__desc">{s.descriptionText}</span>
              <span className="doc-list__status">
                {reactDocs[s.slug] ? <Badge tone="success" size={16}>React</Badge> : <Badge size={16}>CSS only</Badge>}
              </span>
            </Link>
          ))}
        </div>
      )}
    </Page>
  )
}
