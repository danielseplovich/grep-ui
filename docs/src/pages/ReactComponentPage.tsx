import type { ReactDoc } from '../lib/reactDocs'
import { Page, PageHeader, Section, Subsection } from '../components/Page'
import { ExampleBlock } from '../components/ExampleBlock'
import { Playground } from '../components/Playground'
import { CodeBlock } from '../components/CodeBlock'

/** The default for a prop that has none set: the first option of a union, false for booleans, otherwise none. */
function defaultFor(type: string): string {
  if (type === 'boolean') return 'false'
  if (type.includes(' | ')) return type.split(' | ')[0]
  return 'none'
}

/** Component page for a component that has a React doc. Mirrors Medusa UI's layout. */
export function ReactComponentPage({ doc }: { doc: ReactDoc }) {
  return (
    <Page title={doc.title} back={{ to: '/components', label: 'Components' }}>
      <PageHeader
        title={doc.title}
        lede={<p>{doc.description}</p>}
      />

      {doc.playground ? <Playground key={doc.slug} playground={doc.playground} /> : <ExampleBlock example={doc.examples.hero} />}

      <Section id="usage" title="Usage">
        <div className="doc-pair">
          <CodeBlock code={doc.importCode} />
          <CodeBlock code={doc.usageCode} />
        </div>
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
                  <td><code>{p.default ?? defaultFor(p.type)}</code></td>
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
