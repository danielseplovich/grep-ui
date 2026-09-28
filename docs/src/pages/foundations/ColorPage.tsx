import { Link } from 'react-router-dom'
import { Page, PageHeader, Section, Subsection } from '../../components/Page'
import { Prose } from '../../components/Prose'
import { Ramp, SwatchGrid } from '../../components/Foundations'
import { Asset } from '../../components/ui'
import { avatarColors, colorGroups, ramp, rampNames, shadowInks } from '../../lib/tokens'
import { designMd } from '../../lib/specs'
import { subsections } from '../../lib/docs'

const design = subsections(designMd, 'Color')
const find = (h: RegExp) => design.find((s) => h.test(s.heading))

export function ColorPage() {
  const surfaces = find(/^Surfaces/)
  const inks = find(/^Text and icons/)
  const borders = find(/^Borders/)
  const interaction = find(/^Interaction states/)
  const buttons = find(/^Buttons/)
  const accents = find(/^Accents/)
  const badges = find(/^Badges/)
  const avatars = find(/^Avatars/)
  const primitives = find(/^Primitive ramps/)

  const toc = [
    { id: 'surfaces', label: 'Surfaces' },
    { id: 'inks', label: 'Text and icons' },
    { id: 'borders', label: 'Borders' },
    { id: 'interaction', label: 'Interaction states' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'accents', label: 'Accents' },
    { id: 'badges', label: 'Badges' },
    { id: 'primitives', label: 'Primitive ramps' },
  ]

  return (
    <Page title="Color" toc={toc}>
      <PageHeader
        eyebrow={
          <>
            <Link to="/">Grep UI</Link>
            <span className="doc-eyebrow__sep" aria-hidden="true">
              <Asset name="caret-right" />
            </span>
            <span>Foundations</span>
          </>
        }
        title="Color"
        lede="Semantic tokens only. Every token below has a light and a dark value; the swatches follow the site theme, and the values under each name list light then dark. Click a swatch to copy its var()."
      />

      <Section id="surfaces" title="Surfaces">
        {surfaces && <Prose html={surfaces.html} />}
        <SwatchGrid tokens={colorGroups.surfaces} />
      </Section>

      <Section id="inks" title="Text and icons">
        {inks && <Prose html={inks.html} />}
        <Subsection id="text-tokens" title="Text">
          <SwatchGrid tokens={colorGroups.text} />
        </Subsection>
        <Subsection id="icon-tokens" title="Icons">
          <SwatchGrid tokens={colorGroups.icons} />
        </Subsection>
      </Section>

      <Section id="borders" title="Borders">
        {borders && <Prose html={borders.html} />}
        <SwatchGrid tokens={colorGroups.borders} />
      </Section>

      <Section id="interaction" title="Interaction states">
        {interaction && <Prose html={interaction.html} />}
        <SwatchGrid tokens={colorGroups.overlays} />
      </Section>

      <Section id="buttons" title="Buttons">
        {buttons && <Prose html={buttons.html} />}
        <SwatchGrid tokens={colorGroups.buttons} />
      </Section>

      <Section id="accents" title="Accents">
        {accents && <Prose html={accents.html} />}
        <SwatchGrid tokens={colorGroups.accents} />
      </Section>

      <Section id="badges" title="Badges">
        {badges && <Prose html={badges.html} />}
        <SwatchGrid tokens={colorGroups.badges} />
        {avatars && (
          <Subsection id="avatar-colors" title="Avatar fills">
            <Prose html={avatars.html} />
            <SwatchGrid tokens={avatarColors} />
          </Subsection>
        )}
      </Section>

      <Section id="primitives" title="Primitive ramps" lede="A last resort, and never for neutrals. Hover a step for its name and value; click to copy.">
        {primitives && <Prose html={primitives.html} />}
        {rampNames.map((n) => (
          <Ramp key={n} name={n} steps={ramp(n)} />
        ))}
        <Subsection id="shadow-ink" title="Shadow ink">
          <SwatchGrid tokens={shadowInks} />
        </Subsection>
      </Section>
    </Page>
  )
}
