import { Link } from 'react-router-dom'
import { Page, PageHeader, Section } from '../components/Page'

export function IntroPage() {
  const toc = [
    { id: 'figma', label: 'Figma design system' },
    { id: 'package', label: 'Package' },
    { id: 'built', label: 'How Grep UI was built' },
  ]
  return (
    <Page title="Introduction" toc={toc}>
      <PageHeader
        eyebrow={<span>Getting started</span>}
        title="Grep UI"
        lede={
          <p>
            Grep UI is the design system for Shade. It is a collection of tokens, components, icons and CSS classes for
            building consistent interfaces across the Shade app.
          </p>
        }
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

      <Section id="figma" title="Figma design system">
        <div className="doc-prose">
          <p>
            The Grep UI design system lives in{' '}
            <a href="https://www.figma.com/design/w7zQJ1PbccPqDSPxwiacec/Grep-UI" target="_blank" rel="noreferrer">
              Figma
            </a>
            . It contains the colors, typography, icons and components that this site documents. Every spec here was
            read from the Figma file, so the two should always match.
          </p>
        </div>
      </Section>

      <Section id="package" title="Package">
        <div className="doc-prose">
          <p>
            Grep UI ships as one package: <code>@shade/grep-ui</code>. It includes the tokens, effects and the CSS for
            every component in a single import.
          </p>
          <p>
            See the <Link to="/installation">installation guide</Link> to add it to a project.
          </p>
        </div>
      </Section>

      <Section id="built" title="How Grep UI was built">
        <div className="doc-prose">
          <p>Grep UI was meticulously crafted with love by Karina Minanov.</p>
          <p>
            It is plain CSS compiled from the Figma component set. There is no framework in the way: every component is a
            small set of classes on native HTML, so it works wherever Shade does.
          </p>
        </div>
      </Section>
    </Page>
  )
}
