import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Page, PageHeader } from '../components/Page'
import { Fit } from '../components/Fit'
import { specs } from '../lib/specs'
import { navLabel } from '../lib/nav'
import { reactDocs } from '../lib/reactDocs'
import { galleryPreview } from '../lib/gallery'
import { Badge } from '../../../react/badge'
import { Playground } from '../components/Playground'
import { ExampleBlock } from '../components/ExampleBlock'
import { examplesBySlug } from '../examples'
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
  const navigate = useNavigate()
  const [current, setCurrent] = useState(specs[0].slug)
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
        <div className="doc-master">
          <nav className="doc-master__names" aria-label="Components">
            {specs.map((s) => (
              <button
                key={s.slug}
                type="button"
                className={`doc-master__name${s.slug === current ? ' doc-master__name--current' : ''}`}
                aria-current={s.slug === current ? 'true' : undefined}
                onClick={() => setCurrent(s.slug)}
                onDoubleClick={() => navigate(`/components/${s.slug}`)}
              >
                {navLabel(s)}
              </button>
            ))}
          </nav>
          <div className="doc-master__detail" key={current}>
            <div className="doc-master__title">
              <Link to={`/components/${current}`} className="doc-master__open">
                {navLabel(specs.find((s) => s.slug === current)!)}
                {reactDocs[current] ? <Badge tone="success" size={16}>React</Badge> : <Badge size={16}>CSS only</Badge>}
                <span className="doc-master__arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            {reactDocs[current]?.playground ? <Playground playground={reactDocs[current].playground} /> : <ExampleBlock example={examplesBySlug[current].hero} />}
          </div>
        </div>
      )}
    </Page>
  )
}
