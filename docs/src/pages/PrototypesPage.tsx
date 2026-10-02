import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Page, PageHeader, Section } from '../components/Page'
import { Asset } from '../components/ui'
import { CodeBlock } from '../components/CodeBlock'
import { prototypes, prototypeBySlug, downloadPrototype, openPrototype } from '../lib/prototypes'
import { Button } from '../../../react/button'

const kb = (n: number) => `${Math.round(n / 1024)} KB`

export function PrototypesIndexPage() {
  return (
    <Page title="Prototypes" toc={[]}>
      <PageHeader eyebrow={<span>Prototypes</span>} title="Prototypes" lede={<p>HTML prototypes built on Grep UI. Each one is a single file: open it in the browser, or download it and send it on.</p>} />
      <Section id="all" title="All prototypes">
        {prototypes.length === 0 ? (
          <p className="doc-section__lede">None yet. See "Adding one" below.</p>
        ) : (
          <div className="doc-cards">
            {prototypes.map((p) => (
              <Link key={p.slug} to={`/prototypes/${p.slug}`} className="doc-card">
                <span className="doc-card__title">{p.title}</span>
                <span className="doc-card__desc">{p.description || `${kb(p.bytes)}, single file`}</span>
              </Link>
            ))}
          </div>
        )}
      </Section>
      <Section id="adding" title="Adding one">
        <div className="doc-prose">
          <p>
            Build the prototype against the library (link <code>grepmd/grep-ui.css</code> and use the classes), then bundle it. The script inlines the stylesheet and every local image so the result is one file that works anywhere:
          </p>
        </div>
        <CodeBlock code={`cd docs\nnode scripts/bundle-prototype.mjs path/to/screen.html my-screen --title "My screen" --description "What it shows"`} lang="sh" title="Terminal" />
        <div className="doc-prose">
          <p>
            That writes <code>prototypes/my-screen.html</code>. Commit and push it, and it appears here on the next deploy.
          </p>
        </div>
      </Section>
    </Page>
  )
}

export function PrototypePage() {
  const { slug = '' } = useParams()
  const p = prototypeBySlug[slug]
  if (!p) return <Navigate to="/prototypes" replace />
  return (
    <Page title={p.title} toc={[]}>
      <PageHeader
        eyebrow={
          <>
            <Link to="/prototypes">Prototypes</Link>
            <span className="doc-eyebrow__sep" aria-hidden="true">
              <Asset name="caret-right" />
            </span>
            <span>{p.title}</span>
          </>
        }
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
