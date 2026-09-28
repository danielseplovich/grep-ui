import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { specBySlug, type SpecSection } from '../lib/specs'
import { examplesBySlug } from '../examples'
import { Page, PageHeader, Section, Subsection } from '../components/Page'
import { Prose } from '../components/Prose'
import { ExampleBlock } from '../components/ExampleBlock'
import { Callout } from '../components/Callout'
import { Asset, useCopy } from '../components/ui'
import type { TocEntry } from '../components/Toc'

function ClassChip({ name }: { name: string }) {
  const [copied, copy] = useCopy()
  return (
    <button type="button" className="doc-chip" data-copied={copied || undefined} onClick={() => copy(name)} title="Copy class name">
      {copied ? 'copied' : `.${name}`}
    </button>
  )
}

export function ComponentPage() {
  const { slug = '' } = useParams()
  const spec = specBySlug[slug]
  const ex = examplesBySlug[slug]

  const groups = useMemo(() => {
    if (!spec) return null
    const by = (k: SpecSection['kind'][]) => spec.sections.filter((s) => k.includes(s.kind))
    return {
      reference: by(['reference']),
      guideline: by(['guideline']),
      inferred: by(['inferred']),
      contradiction: by(['contradiction']),
      notcovered: by(['notcovered']),
      corrections: by(['corrections']),
    }
  }, [spec])

  if (!spec || !groups) return <Navigate to="/" replace />

  const notes = [...groups.inferred, ...groups.contradiction, ...groups.notcovered]
  const toc: TocEntry[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'usage', label: 'Usage' },
    ...(groups.reference.length
      ? [{ id: 'api-reference', label: 'API reference' }, ...groups.reference.map((s) => ({ id: s.id, label: s.heading, sub: true }))]
      : []),
    ...(ex?.examples.length
      ? [{ id: 'examples', label: 'Examples' }, ...ex.examples.map((e) => ({ id: `example-${e.id}`, label: e.title, sub: true }))]
      : []),
    ...(groups.guideline.length
      ? [{ id: 'guidelines', label: 'Guidelines' }, ...groups.guideline.map((s) => ({ id: s.id, label: s.heading, sub: true }))]
      : []),
    ...(notes.length || groups.corrections.length ? [{ id: 'notes', label: 'Notes' }] : []),
    { id: 'classes', label: 'Classes' },
  ]

  return (
    <Page title={spec.title} toc={toc}>
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
        title={spec.title}
        lede={<span dangerouslySetInnerHTML={{ __html: spec.descriptionHtml }} />}
      >
        {spec.sourceHtml && (
          <div className="doc-source">
            <span className="doc-source__label">Source</span>
            <span dangerouslySetInnerHTML={{ __html: spec.sourceHtml }} />
          </div>
        )}
        {spec.leadNoteHtml && (
          <div style={{ marginTop: 'var(--space-16)' }}>
            <Callout tone="warning" title="Read before using" html={spec.leadNoteHtml} icon="notifications" />
          </div>
        )}
      </PageHeader>

      <Section id="preview" title="Preview">
        {ex ? (
          <ExampleBlock example={ex.hero} />
        ) : (
          <Callout tone="info" title="No preview yet">
            An interactive example for this component hasn't been authored.
          </Callout>
        )}
      </Section>

      <Section id="usage" title="Usage" lede="The markup the component expects, from the spec.">
        {spec.usageHtml ? (
          <Prose html={spec.usageHtml} />
        ) : (
          <p className="doc-section__lede">The spec doesn't include a markup block.</p>
        )}
      </Section>

      {groups.reference.length > 0 && (
        <Section id="api-reference" title="API reference" lede="Classes, sizes, tones and states, as read from Figma.">
          {groups.reference.map((s) => (
            <Subsection key={s.id} id={s.id} title={<span dangerouslySetInnerHTML={{ __html: s.headingHtml }} />}>
              <Prose html={s.html} />
            </Subsection>
          ))}
        </Section>
      )}

      {ex && ex.examples.length > 0 && (
        <Section id="examples" title="Examples">
          {ex.examples.map((e) => (
            <Subsection key={e.id} id={`example-${e.id}`} title={e.title} lede={e.description}>
              <ExampleBlock example={e} headingId={`example-${e.id}`} />
            </Subsection>
          ))}
        </Section>
      )}

      {groups.guideline.length > 0 && (
        <Section id="guidelines" title="Guidelines">
          {groups.guideline.map((s) => (
            <Subsection key={s.id} id={s.id} title={<span dangerouslySetInnerHTML={{ __html: s.headingHtml }} />}>
              <Prose html={s.html} />
            </Subsection>
          ))}
        </Section>
      )}

      {(notes.length > 0 || groups.corrections.length > 0) && (
        <Section
          id="notes"
          title="Notes"
          lede="What was inferred rather than read, and what Figma doesn't cover yet. Correct these against the source."
        >
          {groups.inferred.map((s) => (
            <Callout key={s.id} tone="warning" title={<span dangerouslySetInnerHTML={{ __html: s.headingHtml }} />} html={s.html} />
          ))}
          {groups.contradiction.map((s) => (
            <Callout
              key={s.id}
              tone="danger"
              title={<span dangerouslySetInnerHTML={{ __html: s.headingHtml }} />}
              html={s.html}
              icon="notifications"
            />
          ))}
          {groups.notcovered.map((s) => (
            <Callout key={s.id} tone="info" title={<span dangerouslySetInnerHTML={{ __html: s.headingHtml }} />} html={s.html} />
          ))}
          {groups.corrections.map((s) => (
            <details key={s.id} className="doc-details">
              <summary className="doc-details__summary">
                <Asset name="caret-right" className="doc-details__caret" />
                <span dangerouslySetInnerHTML={{ __html: s.headingHtml }} />
              </summary>
              <div className="doc-details__body">
                <Prose html={s.html} />
              </div>
            </details>
          ))}
        </Section>
      )}

      <Section id="classes" title="Classes" lede={`Every class ${spec.slug}.css declares. Click to copy.`}>
        <div className="doc-chips">
          {spec.classes.map((c) => (
            <ClassChip key={c} name={c} />
          ))}
        </div>
      </Section>
    </Page>
  )
}
