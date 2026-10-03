import { Page, PageHeader, Section } from '../../components/Page'
import { Prose } from '../../components/Prose'
import { TokenChip } from '../../components/Foundations'
import { textSizes, textStyles, textWeights } from '../../lib/tokens'
import { designMd } from '../../lib/specs'
import { parseDoc, section } from '../../lib/docs'

const design = parseDoc(designMd)
const typography = section(design, 'Typography')

const sample = 'The quick brown fox jumps over the lazy dog'

export function TypographyPage() {
  const toc = [
    { id: 'families', label: 'Families' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'weights', label: 'Weights' },
    { id: 'guidance', label: 'Guidance' },
  ]
  return (
    <Page title="Typography" toc={toc} prose back={{ to: '/foundations', label: 'Foundations' }}>
      <PageHeader
        title="Typography"
        lede="Three families, seven sizes, three weights. Body is 13px; nothing in-product goes above 20."
      />

      <Section id="families" title="Families">
        <div>
          {textStyles.map((s) => (
            <div className="doc-typerow" key={s.name}>
              <span className="doc-typerow__token">
                <TokenChip name={s.name} />
              </span>
              <span className="doc-typerow__sample" style={{ fontFamily: `var(${s.name}), var(--text-style-body), sans-serif`, fontSize: 'var(--text-xl)' }}>
                {s.value} — {sample}
              </span>
              <span className="doc-typerow__meta">{s.value}</span>
            </div>
          ))}
        </div>
        {textStyles.some((s) => s.description) && (
          <ul className="doc-prose" style={{ marginTop: 'var(--space-12)' }}>
            {textStyles
              .filter((s) => s.description)
              .map((s) => (
                <li key={s.name}>
                  <code>{s.name}</code> — {s.description}
                </li>
              ))}
          </ul>
        )}
      </Section>

      <Section id="sizes" title="Sizes">
        <div>
          {textSizes.map((s) => (
            <div className="doc-typerow" key={s.name}>
              <span className="doc-typerow__token">
                <TokenChip name={s.name} />
              </span>
              <span
                className="doc-typerow__sample"
                style={{
                  fontSize: `var(${s.name})`,
                  fontFamily: s.px >= 16 ? 'var(--text-style-display), var(--text-style-body), sans-serif' : undefined,
                  fontWeight: s.px >= 16 ? 'var(--text-weight-bold)' : undefined,
                  lineHeight: 1.3,
                }}
              >
                {sample}
              </span>
              <span className="doc-typerow__meta">{s.value}</span>
            </div>
          ))}
        </div>
        <ul className="doc-prose" style={{ marginTop: 'var(--space-12)' }}>
          {textSizes
            .filter((s) => s.description)
            .map((s) => (
              <li key={s.name}>
                <code>{s.name}</code> — {s.description}
              </li>
            ))}
        </ul>
      </Section>

      <Section id="weights" title="Weights" lede="Medium is 440, not 500 — which is why Inter has to be loaded as the variable font.">
        <div>
          {textWeights.map((w) => (
            <div className="doc-typerow" key={w.name}>
              <span className="doc-typerow__token">
                <TokenChip name={w.name} />
              </span>
              <span className="doc-typerow__sample" style={{ fontWeight: `var(${w.name})`, fontSize: 'var(--text-lg)' }}>
                {sample}
              </span>
              <span className="doc-typerow__meta">{w.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="guidance" title="Guidance" lede="From DESIGN.md.">
        {typography && <Prose html={typography.html} />}
      </Section>
    </Page>
  )
}
