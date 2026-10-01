import { Link } from 'react-router-dom'
import { Page, PageHeader, Section } from '../components/Page'
import { Prose } from '../components/Prose'
import { Callout } from '../components/Callout'
import { Asset } from '../components/ui'
import { parseDoc, section } from '../lib/docs'
import { renderMarkdown } from '../lib/markdown'
import { agentsMd, designMd } from '../lib/specs'

const agents = parseDoc(agentsMd)
const design = parseDoc(designMd)
const setup = section(agents, 'Setup')
const designSetup = section(design, 'Setup')
const where = section(agents, /^Where things live/)

const usage = renderMarkdown(`
\`\`\`html
<button class="grep-btn grep-btn--brand">
  <span class="grep-btn__label">Create</span>
</button>

<span class="grep-badge grep-badge--success grep-badge--full">
  <span class="grep-badge__label">Synced</span>
</span>
\`\`\`
`)

const theme = renderMarkdown(`
\`\`\`html
<html lang="en" data-theme="dark">
\`\`\`
`)

export function InstallationPage() {
  const toc = [
    { id: 'stylesheet', label: 'Link the stylesheet' },
    { id: 'fonts', label: 'Fonts, theme and base styles' },
    { id: 'use', label: 'Use the classes' },
    { id: 'template', label: 'Prototype template' },
    { id: 'where', label: 'Where things live' },
  ]
  return (
    <Page title="Installation" toc={toc}>
      <PageHeader
        eyebrow={
          <>
            <Link to="/">Grep UI</Link>
            <span className="doc-eyebrow__sep" aria-hidden="true">
              <Asset name="caret-right" />
            </span>
            <span>Getting started</span>
          </>
        }
        title="Installation"
        lede="Until the React components land, Grep UI is used through its stylesheet. Link it once and every token and component follows from it. The React components will install from the same package."
      />

      <Section id="stylesheet" title="Link the stylesheet">
        {setup && <Prose html={setup.html} />}
      </Section>

      <Section id="fonts" title="Fonts, theme and base styles" lede="From DESIGN.md > Setup.">
        {designSetup && <Prose html={designSetup.html} />}
        <Callout tone="info" title="Switching theme by hand">
          <span>Set the attribute and every token swaps. Never hand-write a dark palette.</span>
          <div style={{ marginTop: 'var(--space-8)' }}>
            <Prose html={theme} />
          </div>
        </Callout>
      </Section>

      <Section id="use" title="Use the classes" lede="For now, every component is a block class with modifiers. The React components will take the same variants as props.">
        <Prose html={usage} />
        <p className="doc-prose">
          Each component page shows the markup it expects under <strong>Usage</strong>, the classes it accepts under <strong>API reference</strong>, and copy-ready variants under{' '}
          <strong>Examples</strong>. Start with <Link to="/components/button">Button</Link>.
        </p>
      </Section>

      <Section id="template" title="Prototype template" lede="For a throwaway page, copy grepmd/_prototype-template.html — it has the fonts, the stylesheet, the base styles and OS theme-following wired up.">
        <Prose html={renderMarkdown('```\ncp grepmd/_prototype-template.html my-prototype.html\n```')} />
      </Section>

      {where && (
        <Section id="where" title="Where things live">
          <Prose html={where.html} />
        </Section>
      )}
    </Page>
  )
}
