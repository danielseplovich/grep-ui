import { Link } from 'react-router-dom'
import { Page, PageHeader, Section } from '../components/Page'
import figmaLogo from '../assets/figma-logo.png'
import exportIcon from '../assets/export.svg?raw'

export function IntroPage() {
  const toc = [
    { id: 'figma', label: 'Figma design system' },
    { id: 'package', label: 'Package' },
    { id: 'built', label: 'How Grep UI was built' },
  ]
  return (
    <Page title="Introduction" toc={toc} prose>
      <PageHeader
        eyebrow={<span>Getting started</span>}
        title="Grep UI"
        lede={
          <p>
            Grep UI is the design system for Shade: a collection of tokens, components and icons for building
            consistent interfaces across the Shade app. It is moving from plain CSS to React components, so the same
            component is the same thing in Figma, in the docs and in the app.
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
          <p>The Grep UI design system lives in Figma. It contains the colors, typography, icons and components that this site documents, and every spec here was read from it.</p>
        </div>
        <a className="doc-figma" href="https://www.figma.com/design/w7zQJ1PbccPqDSPxwiacec/Grep-UI" target="_blank" rel="noreferrer">
          <span className="grep-avatar grep-avatar--32 doc-figma__tile" aria-hidden="true">
            <img src={figmaLogo} alt="" width={20} height={20} />
          </span>
          <span className="doc-figma__body">
            <span className="doc-figma__title">Grep UI</span>
            <span className="doc-figma__desc">Colors, type, icons, and components</span>
          </span>
          <span className="grep-icon-btn grep-icon-btn--ghost grep-icon-btn--28 doc-figma__action" aria-hidden="true">
            <span className="grep-icon-btn__icon" dangerouslySetInnerHTML={{ __html: exportIcon }} />
          </span>
        </a>
      </Section>

      <Section id="package" title="Package">
        <div className="doc-prose">
          <p>
            Grep UI ships as one package: <code>@shade/grep-ui</code>. Today it contains the tokens, effects and the CSS
            for every component. The React components are being added to the same package, one component at a time,
            until every component here has one.
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
            It started as plain CSS compiled from the Figma component set, and that CSS is still the source of truth for
            how every component looks. The React components wrap it: thin components over native HTML that take props
            instead of class names, so Shade can replace its current components with Grep UI's without changing how
            they look.
          </p>
        </div>
      </Section>
    </Page>
  )
}
