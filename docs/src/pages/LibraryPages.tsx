import { Link } from 'react-router-dom'
import { Page, PageHeader, Section } from '../components/Page'
import { Prose } from '../components/Prose'
import { Asset } from '../components/ui'
import { parseDoc } from '../lib/docs'
import { contradictionsMd, rulesMd } from '../lib/specs'

function Eyebrow() {
  return (
    <>
      <Link to="/">Grep UI</Link>
      <span className="doc-eyebrow__sep" aria-hidden="true">
        <Asset name="caret-right" />
      </span>
      <span>Getting started</span>
    </>
  )
}

function LibraryDoc({ title, md }: { title: string; md: string }) {
  const doc = parseDoc(md)
  const toc = doc.sections.map((s) => ({ id: s.id, label: s.heading }))
  return (
    <Page title={title} toc={toc}>
      <PageHeader eyebrow={<Eyebrow />} title={title} lede={doc.introHtml ? <Prose html={doc.introHtml} /> : undefined} />
      {doc.sections.map((s) => (
        <Section key={s.id} id={s.id} title={<span dangerouslySetInnerHTML={{ __html: s.headingHtml }} />}>
          <Prose html={s.html} />
        </Section>
      ))}
    </Page>
  )
}

export function RulesPage() {
  return <LibraryDoc title="Rules" md={rulesMd} />
}

export function ContradictionsPage() {
  return <LibraryDoc title="Open contradictions" md={contradictionsMd} />
}
