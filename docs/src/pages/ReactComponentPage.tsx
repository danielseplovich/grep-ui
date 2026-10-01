import { Link } from 'react-router-dom'
import type { ReactDoc } from '../lib/reactDocs'
import { Page, PageHeader, Section, Subsection } from '../components/Page'
import { ExampleBlock } from '../components/ExampleBlock'
import { CodeBlock } from '../components/CodeBlock'
import { Asset } from '../components/ui'
import type { TocEntry } from '../components/Toc'

/** Component page for a component that has a React doc. Mirrors Medusa UI's layout. */
export function ReactComponentPage({ doc }: { doc: ReactDoc }) {
  const toc: TocEntry[] = [
    { id: 'usage', label: 'Usage' },
    { id: 'api-reference', label: 'API reference' },
    ...(doc.examples.examples.length
      ? [{ id: 'examples', label: 'Examples' }, ...doc.examples.examples.map((e) => ({ id: `example-${e.id}`, label: e.title, sub: true }))]
      : []),
  ]

  return (
    <Page title={doc.title} toc={toc}>
      <PageHeader
        eyebrow={
          <>
            <Link to="/">Grep UI</Link>
            <span className="doc-eyebrow__sep" aria-hidden="true">
              <Asset name="caret-right" />
            </span>
            <span>Components</span>
          </>
        }
        title={doc.title}
        lede={
          <>
            <p>{doc.description}</p>
            <p>In this guide, you'll learn how to use the {doc.title} component.</p>
          </>
        }
      />

      <ExampleBlock example={doc.examples.hero} />

      <Section id="usage" title="Usage">
        <CodeBlock code={doc.importCode} />
        <CodeBlock code={doc.usageCode} />
      </Section>

      <Section id="api-reference" title="API reference">
        {doc.basedOn && (
          <p className="doc-section__lede">
            This component is based on the <code>{doc.basedOn}</code> element and supports all of its props.
          </p>
        )}
        <div className="doc-table-wrap">
          <table className="doc-table doc-props">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {doc.props.map((p) => (
                <tr key={p.name}>
                  <td>
                    <code>{p.name}</code>
                  </td>
                  <td>
                    {p.type.split(' | ').map((t, i) => (
                      <span key={i} className="doc-props__type">
                        {i > 0 && <span className="doc-props__sep">|</span>}
                        <code>{t}</code>
                      </span>
                    ))}
                  </td>
                  <td>{p.default ? <code>{p.default}</code> : <span className="doc-props__none">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {doc.examples.examples.length > 0 && (
        <Section id="examples" title="Examples">
          {doc.examples.examples.map((e) => (
            <Subsection key={e.id} id={`example-${e.id}`} title={e.title} lede={e.description}>
              <ExampleBlock example={e} headingId={`example-${e.id}`} />
            </Subsection>
          ))}
        </Section>
      )}
    </Page>
  )
}
