import { Page, PageHeader, Section } from '../../components/Page'
import { ColorList } from '../../components/Foundations'
import { CodeBlock } from '../../components/CodeBlock'
import { colorGroups, shadowInks } from '../../lib/tokens'

const usage = `.card {
  background: var(--background-component);
  border: 0.5px solid var(--border-base);
  color: var(--foreground-text-base);
}`

const groups = [
  { id: 'background', title: 'Background', note: 'Surfaces: canvas, components, fields, tiles and panels.', tokens: colorGroups.surfaces },
  { id: 'overlay', title: 'Overlay', note: 'Layered on top of a surface for hover and pressed states.', tokens: colorGroups.overlays },
  { id: 'accent', title: 'Accent', note: 'Tinted surfaces for emphasis and status.', tokens: colorGroups.accents },
  { id: 'border', title: 'Border', note: 'Hairlines and dividers.', tokens: colorGroups.borders },
  { id: 'button', title: 'Button', note: 'Fills, borders and inks for each button type.', tokens: colorGroups.buttons },
  { id: 'foreground', title: 'Foreground', note: 'Text and icon inks.', tokens: colorGroups.text.concat(colorGroups.icons) },
  { id: 'badge', title: 'Badge', note: 'Fills and inks for each badge tone.', tokens: colorGroups.badges },
  { id: 'shadow', title: 'Shadow', note: 'The inks every elevation is built from.', tokens: shadowInks },
]

export function ColorPage() {
  const toc = [{ id: 'overview', label: 'Overview' }, { id: 'usage', label: 'How to use the colors' }, ...groups.map((g) => ({ id: g.id, label: g.title }))]

  return (
    <Page title="Colors" toc={toc} back={{ to: '/foundations', label: 'Foundations' }}>
      <PageHeader
        title="Grep UI Colors"
        lede={<p>The color tokens available in Grep UI and how to use them.</p>}
      />

      <Section id="overview" title="Overview">
        <div className="doc-prose">
          <p>Grep UI provides color tokens from the Grep design system. Use them to style components and elements consistently across Shade.</p>
          <p>Every token has a light and a dark value. To view the colors below in dark mode, switch the site's theme from the menu in the top right.</p>
          <p>To copy a color's token from the list below, click on it.</p>
        </div>
      </Section>

      <Section id="usage" title="How to use the Grep UI colors">
        <div className="doc-prose">
          <p>
            Every color is a CSS variable, available anywhere the Grep UI stylesheet is loaded. Use it with <code>var()</code>; never write the hex value.
          </p>
          <p>For example, to style a card:</p>
        </div>
        <CodeBlock code={usage} lang="css" />
      </Section>

      {groups.map((g) => (
        <Section key={g.id} id={g.id} title={g.title} lede={g.note}>
          <ColorList tokens={g.tokens} />
        </Section>
      ))}
    </Page>
  )
}
