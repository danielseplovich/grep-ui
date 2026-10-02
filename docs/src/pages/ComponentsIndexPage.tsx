import { Hub } from '../components/Hub'
import { Fit } from '../components/Fit'
import { Playground } from '../components/Playground'
import { ExampleBlock } from '../components/ExampleBlock'
import { specs } from '../lib/specs'
import { navLabel } from '../lib/nav'
import { reactDocs } from '../lib/reactDocs'
import { galleryPreview } from '../lib/gallery'
import { examplesBySlug } from '../examples'
import { Badge } from '../../../react/badge'

/** The components hub: every component previewed live. */
export function ComponentsIndexPage() {
  return (
    <Hub
      id="components"
      title="Components"
      lede="Building blocks of your interface"
      items={specs.map((s) => {
        const pg = reactDocs[s.slug]?.playground
        return {
        slug: s.slug,
        label: navLabel(s),
        to: `/components/${s.slug}`,
        preview: <Fit>{galleryPreview(s.slug)}</Fit>,
        badge: reactDocs[s.slug] ? <Badge tone="success" size={16}>React</Badge> : <Badge size={16}>CSS only</Badge>,
        detail: pg ? <Playground playground={pg} /> : <ExampleBlock example={examplesBySlug[s.slug].hero} />,
        }
      })}
    />
  )
}
