import { Page, PageHeader, Section } from '../../components/Page'
import { Prose } from '../../components/Prose'
import { TokenChip } from '../../components/Foundations'
import { borderWidths, radii, spacing } from '../../lib/tokens'
import { designMd } from '../../lib/specs'
import { parseDoc, section } from '../../lib/docs'

const design = parseDoc(designMd)
const spacingDoc = section(design, 'Spacing')
const radiusDoc = section(design, 'Radius')

export function SpacingPage() {
  const max = spacing[spacing.length - 1].px
  const toc = [
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'border-width', label: 'Border width' },
  ]
  return (
    <Page title="Spacing & radius" toc={toc} prose back={{ to: '/foundations', label: 'Foundations' }}>
      <PageHeader
        title="Spacing & radius"
        lede="Named by value, so --space-8 is 8px. Only values on the scale exist — pick the neighbour, never an in-between."
      />

      <Section id="spacing" title="Spacing">
        {spacingDoc && <Prose html={spacingDoc.html} />}
        <div className="doc-scale">
          {spacing.map((s) => (
            <div className="doc-scale__row" key={s.name}>
              <span className="doc-scale__name">
                <TokenChip name={s.name} />
              </span>
              <span className="doc-scale__value">{s.value}</span>
              <span className="doc-scale__bar" style={{ width: `${Math.max((s.px / max) * 100, s.px > 0 ? 0.4 : 0)}%` }} aria-hidden="true" />
            </div>
          ))}
        </div>
      </Section>

      <Section id="radius" title="Radius">
        {radiusDoc && <Prose html={radiusDoc.html} />}
        <div className="doc-radii">
          {radii.map((r) => (
            <div className="doc-radius" key={r.name}>
              <span className="doc-radius__box" style={{ borderRadius: `var(${r.name})` }} aria-hidden="true" />
              <span className="doc-radius__name">{r.name.slice(2)}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="border-width" title="Border width" lede="0.5px is the default for a component's own edge; 1px means hover, or a toggle, checkbox or radio. Dividers are 1px — see Rules.">
        <div className="doc-scale">
          {borderWidths.map((b) => (
            <div className="doc-scale__row" key={b.name}>
              <span className="doc-scale__name">
                <TokenChip name={b.name} />
              </span>
              <span className="doc-scale__value">{b.value}</span>
              <span style={{ height: `var(${b.name})`, background: 'var(--border-base)' }} aria-hidden="true" />
            </div>
          ))}
        </div>
      </Section>
    </Page>
  )
}
