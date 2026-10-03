import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Page, PageHeader } from '../components/Page'
import { Hub } from '../components/Hub'
import { CodeBlock } from '../components/CodeBlock'
import { prototypes, prototypeBySlug, downloadPrototype, openPrototype } from '../lib/prototypes'
import { Button } from '../../../react/button'

const kb = (n: number) => `${Math.round(n / 1024)} KB`

const addOne = `node docs/scripts/bundle-prototype.mjs path/to/prototype.html my-prototype --title "My prototype" --description "What it shows" --width 1440`

/** The prototypes hub: same shape as the components hub, each tile a scaled live render. */
export function PrototypesIndexPage() {
  return (
    <Hub
      id="prototypes"
      title="Prototypes"
      lede="HTML prototypes built on Grep UI, ready to open or download"
      items={prototypes.map((p) => ({
        slug: p.slug,
        label: p.title,
        to: `/prototypes/${p.slug}`,
        preview: <TileFrame title={p.title} html={p.html} width={p.width} />,
        detail: (
          <>
            <div className="doc-proto__actions">
              <Button onClick={() => downloadPrototype(p)}>Download HTML</Button>
              <Button variant="neutral" onClick={() => openPrototype(p)}>
                Open full size
              </Button>
            </div>
            <ScaledFrame title={p.title} html={p.html} width={p.width} />
          </>
        ),
      }))}
      empty={
        <div className="doc-pair">
          <div className="doc-prose">
            <p>None yet. Bundle one into a single file and it appears here:</p>
          </div>
          <CodeBlock code={addOne} lang="sh" title="Terminal" />
        </div>
      }
    />
  )
}

/** A tile preview: the prototype rendered at its design width, scaled to fill the tile. */
function TileFrame({ title, html, width }: { title: string; html: string; width: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(el.clientWidth / width)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className="doc-proto-tile">
      <iframe className="doc-proto__frame" title={title} srcDoc={html} sandbox="allow-scripts allow-same-origin" tabIndex={-1} style={{ width, height: width * (325 / 386.67), transform: `scale(${scale})`, transformOrigin: 'top left' }} />
    </div>
  )
}

export function PrototypePage() {
  const { slug = '' } = useParams()
  const p = prototypeBySlug[slug]
  if (!p) return <Navigate to="/prototypes" replace />
  return (
    <Page title={p.title} back={{ to: '/prototypes', label: 'Prototypes' }}>
      <PageHeader
        title={p.title}
        lede={<p>{p.description}</p>}
      >
        <div className="doc-meta">
          <Button onClick={() => downloadPrototype(p)}>Download HTML</Button>
          <Button variant="neutral" onClick={() => openPrototype(p)}>
            Open full size
          </Button>
          <span className="doc-proto__meta">
            {kb(p.bytes)}
            {p.date ? ` · ${p.date}` : ''}
          </span>
        </div>
      </PageHeader>
      <ScaledFrame title={p.title} html={p.html} width={p.width} />
    </Page>
  )
}

/** Renders the prototype at its design width and scales it down to fit the column. */
function ScaledFrame({ title, html, width, height = 1080 }: { title: string; html: string; width: number; height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(Math.min(1, el.clientWidth / width))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className="doc-proto" style={{ height: height * scale }}>
      <iframe
        className="doc-proto__frame"
        title={title}
        srcDoc={html}
        sandbox="allow-scripts allow-same-origin allow-popups"
        style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      />
    </div>
  )
}
