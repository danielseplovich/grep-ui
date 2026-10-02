import { Page, PageHeader, Section } from '../../components/Page'
import { Prose } from '../../components/Prose'
import { TokenChip } from '../../components/Foundations'
import { elevations, opacities } from '../../lib/tokens'
import { designMd } from '../../lib/specs'
import { parseDoc, section } from '../../lib/docs'

const design = parseDoc(designMd)
const elevationDoc = section(design, 'Elevation')
const focusDoc = section(design, 'Focus')
const opacityDoc = section(design, 'Opacity')

const isFocus = (n: string) => /focus/.test(n)
const isSmall = (n: string) => /interactive/.test(n)
const isField = (n: string) => /input/.test(n)

export function EffectsPage() {
  const shadows = elevations.filter((e) => !isFocus(e.name))
  const rings = elevations.filter((e) => isFocus(e.name))
  const toc = [
    { id: 'elevation', label: 'Elevation' },
    { id: 'focus', label: 'Focus' },
    { id: 'opacity', label: 'Opacity' },
  ]
  return (
    <Page title="Effects" toc={toc} back={{ to: '/foundations', label: 'Foundations' }}>
      <PageHeader
        title="Effects"
        lede="Named Figma effect styles — every shadow and focus ring lives in effects.css. Components never declare their own."
      />

      <Section id="elevation" title="Elevation">
        {elevationDoc && <Prose html={elevationDoc.html} />}
        <div className="doc-elevations">
          {shadows.map((e) => (
            <div className="doc-elevation" key={e.name}>
              <div className="doc-elevation__stage">
                <span
                  className={`doc-elevation__box${isSmall(e.name) ? ' doc-elevation__box--small' : ''}${isField(e.name) ? ' doc-elevation__box--field' : ''}`}
                  style={{ ['--_shadow' as string]: `var(${e.name})` }}
                  aria-hidden="true"
                />
              </div>
              <TokenChip name={e.name} />
              <span className="doc-elevation__value">{e.comment}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="focus" title="Focus" lede="Three ring sizes. Small controls take the tight ring, fields the 2.5px ring, buttons and cards the large one.">
        {focusDoc && <Prose html={focusDoc.html} />}
        <div className="doc-elevations">
          {rings.map((e) => (
            <div className="doc-elevation" key={e.name}>
              <div className="doc-elevation__stage">
                <span
                  className={`doc-elevation__box${isSmall(e.name) ? ' doc-elevation__box--small' : ''}${isField(e.name) ? ' doc-elevation__box--field' : ''}`}
                  style={{ ['--_shadow' as string]: `var(${e.name})` }}
                  aria-hidden="true"
                />
              </div>
              <TokenChip name={e.name} />
              <span className="doc-elevation__value">{e.comment}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="opacity" title="Opacity">
        {opacityDoc && <Prose html={opacityDoc.html} />}
        <div className="doc-scale">
          {opacities.map((o) => (
            <div className="doc-scale__row" key={o.name}>
              <span className="doc-scale__name">
                <TokenChip name={o.name} />
              </span>
              <span className="doc-scale__value">{o.value}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
                <span
                  style={{
                    width: 'var(--space-40)',
                    height: 'var(--space-16)',
                    borderRadius: 'var(--radius-4)',
                    background: 'var(--foreground-brand)',
                    opacity: `var(${o.name})`,
                  }}
                  aria-hidden="true"
                />
                {o.description && <span className="doc-scale__value">{o.description}</span>}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  )
}
