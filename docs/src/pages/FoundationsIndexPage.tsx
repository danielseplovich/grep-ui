import { Link } from 'react-router-dom'
import { Page, PageHeader } from '../components/Page'
import { Badge } from '../../../react/badge'

const swatches = ['--background-accent-brand', '--background-accent-success', '--background-accent-action', '--background-accent-warning', '--background-accent-danger', '--background-accent-favorite']

const cards = [
  {
    to: '/foundations/color',
    label: 'Colors',
    preview: (
      <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
        {swatches.map((t) => (
          <span key={t} style={{ width: 36, height: 36, borderRadius: 'var(--radius-8)', background: `var(${t})`, boxShadow: 'inset 0 0 0 0.5px var(--border-base)' }} />
        ))}
      </div>
    ),
  },
  {
    to: '/foundations/typography',
    label: 'Typography',
    preview: (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-16)', fontFamily: 'var(--text-style-display), var(--text-style-body)', fontSize: '36px', lineHeight: 1 }}>
        <span style={{ fontWeight: 'var(--text-weight-regular)' }}>Aa</span>
        <span style={{ fontWeight: 'var(--text-weight-medium)' }}>Aa</span>
        <span style={{ fontWeight: 'var(--text-weight-bold)' }}>Aa</span>
        <span style={{ fontFamily: 'var(--text-style-code)', fontSize: '28px', color: 'var(--foreground-text-dim)' }}>Aa</span>
      </div>
    ),
  },
  {
    to: '/foundations/spacing',
    label: 'Spacing & radius',
    preview: (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-8)' }}>
        {[4, 8, 12, 16, 24, 32].map((n) => (
          <span key={n} style={{ width: 20, height: n * 2, borderRadius: 'var(--radius-4)', background: 'var(--background-accent-brand)' }} />
        ))}
      </div>
    ),
  },
  {
    to: '/foundations/effects',
    label: 'Effects',
    preview: (
      <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
        <span style={{ width: 64, height: 48, borderRadius: 'var(--radius-8)', background: 'var(--background-component)', boxShadow: 'var(--elevation-card)' }} />
        <span style={{ width: 64, height: 48, borderRadius: 'var(--radius-8)', background: 'var(--background-component)', boxShadow: 'var(--elevation-flyout)' }} />
        <span style={{ width: 64, height: 48, borderRadius: 'var(--radius-8)', background: 'var(--background-component)', boxShadow: 'var(--elevation-focus-ring)' }} />
      </div>
    ),
  },
]

export function FoundationsIndexPage() {
  return (
    <Page title="Foundations" toc={[]} wide>
      <PageHeader
        title={
          <span className="doc-title__count">
            Foundations <Badge tone="brand" size={18}>{cards.length}</Badge>
          </span>
        }
        lede={<p>The tokens everything is built from</p>}
      />
      <div className="doc-gallery doc-gallery--2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="doc-tile">
            <span className="doc-tile__frame">
              <span className="doc-tile__stage">{c.preview}</span>
            </span>
            <span className="doc-tile__label">{c.label}</span>
          </Link>
        ))}
      </div>
    </Page>
  )
}
