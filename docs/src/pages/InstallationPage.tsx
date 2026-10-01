import { Link } from 'react-router-dom'
import { Page, PageHeader, Section, Subsection } from '../components/Page'
import { CodeBlock } from '../components/CodeBlock'
import { Asset } from '../components/ui'

const install = `npm install github:danielseplovich/grep-ui`
const installPinned = `npm install github:danielseplovich/grep-ui#v0.2.1`

const fonts = `<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap">`

const stylesheet = `/* src/index.css (or wherever your global CSS lives) */
@import "@shade/grep-ui";`

const baseStyles = `html {
  font-family: var(--text-style-body), system-ui, sans-serif;
  font-size: var(--text-base);
  font-weight: var(--text-weight-regular);
  color: var(--foreground-text-base);
  background: var(--background-canvas);
  -webkit-font-smoothing: antialiased;
}`

const theme = `<html lang="en" data-theme="dark">`

const themeScript = `const dark = matchMedia("(prefers-color-scheme: dark)")
const apply = () => (document.documentElement.dataset.theme = dark.matches ? "dark" : "light")
apply()
dark.addEventListener("change", apply)`

const usage = `import { Button } from "@shade/grep-ui/react"

export default function App() {
  return <Button>Create</Button>
}`

const icons = `import { Pin } from "@shade/grep-ui/react/icons"

<Button leadingIcon={<Pin />}>Pin to cache</Button>`

const vite = `// vite.config.ts
export default defineConfig({
  resolve: { dedupe: ["react", "react-dom"] },
})`

const update = `npm install github:danielseplovich/grep-ui#v0.2.2`

export function InstallationPage() {
  const toc = [
    { id: 'compatibility', label: 'Compatibility' },
    { id: 'step-1', label: 'Step 1: Install Grep UI' },
    { id: 'step-2', label: 'Step 2: Load the fonts' },
    { id: 'step-3', label: 'Step 3: Import the stylesheet' },
    { id: 'step-4', label: 'Step 4: Set the theme' },
    { id: 'step-5', label: 'Step 5: Use Grep UI' },
    { id: 'update', label: 'Update Grep UI' },
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
        title="Install Grep UI"
        lede={<p>In this guide, you'll learn how to install Grep UI in a React project, including Shade.</p>}
      />

      <Section id="compatibility" title="Compatibility">
        <div className="doc-prose">
          <p>Grep UI is a React component library styled with plain CSS. To use it, your project must have:</p>
          <ul>
            <li>React v18 or later. React 19 is supported.</li>
            <li>A bundler that compiles TypeScript, such as Vite, Next.js or webpack with a TS loader. The components ship as <code>.tsx</code> source.</li>
            <li>A way to load global CSS. No Tailwind, CSS-in-JS or preprocessor is needed.</li>
          </ul>
        </div>
      </Section>

      <Section id="step-1" title="Step 1: Install Grep UI">
        <div className="doc-prose">
          <p>Grep UI is a private package on GitHub. In your project's directory, install it from the repository:</p>
        </div>
        <CodeBlock code={install} lang="sh" title="Terminal" />
        <div className="doc-prose">
          <p>
            To pin a release, append its tag. Production builds should always pin, so a push to <code>main</code> can't change the UI under you:
          </p>
        </div>
        <CodeBlock code={installPinned} lang="sh" title="Terminal" />
        <div className="doc-prose">
          <p>
            The package installs as <code>@shade/grep-ui</code>. It has no runtime dependencies beyond React.
          </p>
        </div>
      </Section>

      <Section id="step-2" title="Step 2: Load the fonts">
        <div className="doc-prose">
          <p>
            Grep UI uses Inter, Inter Display and Roboto Mono. Inter must be the <strong>variable</strong> font: the medium weight is 440, which a static Inter file can't render. Add these to your HTML <code>&lt;head&gt;</code>:
          </p>
        </div>
        <CodeBlock code={fonts} lang="html" title="index.html" />
      </Section>

      <Section id="step-3" title="Step 3: Import the stylesheet">
        <div className="doc-prose">
          <p>
            One import loads the tokens, the effect styles and the CSS for every component. Add it to your global stylesheet, before any of your own styles:
          </p>
        </div>
        <CodeBlock code={stylesheet} lang="css" title="index.css" />
        <div className="doc-prose">
          <p>Then set the page's base type and surface from the tokens. Put this after the import:</p>
        </div>
        <CodeBlock code={baseStyles} lang="css" title="index.css" />
      </Section>

      <Section id="step-4" title="Step 4: Set the theme">
        <div className="doc-prose">
          <p>
            Light is the default. Dark mode is <code>data-theme="dark"</code> on <code>&lt;html&gt;</code>. Every token has both values, so switching the attribute switches the whole UI. Never hand-write a dark palette.
          </p>
        </div>
        <CodeBlock code={theme} lang="html" title="index.html" />
        <div className="doc-prose">
          <p>To follow the OS setting instead:</p>
        </div>
        <CodeBlock code={themeScript} lang="js" title="main.ts" />
      </Section>

      <Section id="step-5" title="Step 5: Use Grep UI">
        <div className="doc-prose">
          <p>You can now use Grep UI components in your project. For example, import and use the Button component:</p>
        </div>
        <CodeBlock code={usage} lang="tsx" title="App.tsx" />
        <div className="doc-prose">
          <p>Every exported icon is also a React component, from <code>@shade/grep-ui/react/icons</code>:</p>
        </div>
        <CodeBlock code={icons} lang="tsx" title="App.tsx" />
        <Subsection id="monorepo" title="Monorepos and linked packages">
          <div className="doc-prose">
            <p>
              The components import React from the package's own location. If you link Grep UI locally or install it in a workspace, make sure your bundler resolves one copy of React. In Vite:
            </p>
          </div>
          <CodeBlock code={vite} lang="ts" title="vite.config.ts" />
        </Subsection>
        <div className="doc-prose">
          <p>
            Browse the <Link to="/components/button">components</Link> for every prop and the <Link to="/foundations/color">color tokens</Link> for use in your own styles.
          </p>
        </div>
      </Section>

      <Section id="update" title="Update Grep UI">
        <div className="doc-prose">
          <p>
            Grep UI is versioned with Git tags. Check the repository's releases for what changed and for breaking changes, then install the new tag:
          </p>
        </div>
        <CodeBlock code={update} lang="sh" title="Terminal" />
        <div className="doc-prose">
          <p>
            Because the components are thin wrappers over the CSS, most updates change how things look without changing the props. A breaking change to a prop is called out in the release.
          </p>
        </div>
      </Section>
    </Page>
  )
}
