import { Link } from 'react-router-dom'
import { Page, PageHeader, Section } from '../components/Page'
import { Prose } from '../components/Prose'
import { Callout } from '../components/Callout'
import { parseDoc, section } from '../lib/docs'
import { agentsMd, specs } from '../lib/specs'
import { nav, navLabel } from '../lib/nav'

const agents = parseDoc(agentsMd)
const look = section(agents, /^The look/)
const rules = section(agents, /^The five rules/)
const donts = section(agents, /^Don/)
const hairlines = section(agents, /^Hairlines/)
const lineWeights = section(agents, /^Line weights/)
const focus = section(agents, /^Focus/)
const missing = section(agents, /^Not in the library/)
const where = section(agents, /^Where things live/)

const foundations = nav.find((g) => g.title === 'Foundations')!.items

export function IntroPage() {
  const toc = [
    { id: 'look', label: 'The look' },
    { id: 'rules', label: 'The five rules' },
    { id: 'donts', label: "Don'ts" },
    { id: 'foundations', label: 'Foundations' },
    { id: 'components', label: 'Components' },
    { id: 'conventions', label: 'Conventions' },
    { id: 'missing', label: 'Not in the library yet' },
    { id: 'where', label: 'Where things live' },
  ]
  return (
    <Page title="Introduction" toc={toc}>
      <PageHeader
        eyebrow={<span>Getting started</span>}
        title="Grep UI"
        lede={<Prose html={agents.introHtml.split('</p>')[0] + '</p>'} />}
      >
        <div className="doc-meta">
          <Link to="/installation" className="grep-btn grep-btn--brand">
            <span className="grep-btn__label">Installation</span>
          </Link>
          <Link to="/components/button" className="grep-btn grep-btn--neutral">
            <span className="grep-btn__label">Browse components</span>
          </Link>
        </div>
      </PageHeader>

      {look && (
        <Section id="look" title="The look">
          <Prose html={look.html} />
        </Section>
      )}

      {rules && (
        <Section id="rules" title="The five rules">
          <Prose html={rules.html} />
        </Section>
      )}

      {donts && (
        <Section id="donts" title="Don'ts">
          <Prose html={donts.html} />
        </Section>
      )}

      <Section id="foundations" title="Foundations" lede="The tokens every component is built from.">
        <div className="doc-cards">
          {foundations.map((f) => (
            <Link key={f.to} to={f.to} className="doc-card">
              <span className="doc-card__title">{f.label}</span>
              <span className="doc-card__desc">{f.description}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="components" title="Components" lede={`${specs.length} components, each with a spec read from Figma, its CSS, and live examples.`}>
        <div className="doc-cards">
          {specs.map((s) => (
            <Link key={s.slug} to={`/components/${s.slug}`} className="doc-card">
              <span className="doc-card__title">{navLabel(s)}</span>
              <span className="doc-card__desc">{s.descriptionText}</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-16)' }}>
          <Callout tone="warning" title="Modal has no Figma node" icon="notifications">
            It was derived from the system's own conventions. Everything else was read from Figma. Treat it as a proposal until the real component lands.
          </Callout>
        </div>
      </Section>

      <Section id="conventions" title="Conventions" lede="Three things that make Grep UI render the way Figma draws it.">
        {hairlines && (
          <div className="doc-subsection">
            <h3 className="doc-subsection__title">Hairlines</h3>
            <Prose html={hairlines.html} />
          </div>
        )}
        {lineWeights && (
          <div className="doc-subsection">
            <h3 className="doc-subsection__title">Line weights</h3>
            <Prose html={lineWeights.html} />
          </div>
        )}
        {focus && (
          <div className="doc-subsection">
            <h3 className="doc-subsection__title">Focus</h3>
            <Prose html={focus.html} />
          </div>
        )}
      </Section>

      {missing && (
        <Section id="missing" title="Not in the library yet">
          <Prose html={missing.html} />
        </Section>
      )}

      {where && (
        <Section id="where" title="Where things live">
          <Prose html={where.html} />
        </Section>
      )}
    </Page>
  )
}
