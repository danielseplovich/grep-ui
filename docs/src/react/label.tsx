import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Label } from '../../../react/label'
import { SettingsGeneral } from '../../../react/icons'

export const labelDoc: ReactDoc = {
  slug: 'label',
  title: 'Label',
  description: 'A field or section label with an optional icon, "(Optional)" mark, info glyph, badge and sublabel.',
  basedOn: 'div',
  importCode: IMPORT('Label'),
  usageCode: `<Label sublabel="Shown on invoices.">Company name</Label>`,
  props: [
    { name: 'size', type: '"base" | "lg"', default: '"base"' },
    { name: 'bold', type: 'boolean', default: 'false' },
    { name: 'icon', type: 'ReactNode' },
    { name: 'optional', type: 'boolean', default: 'false' },
    { name: 'info', type: 'ReactNode' },
    { name: 'badge', type: 'ReactNode' },
    { name: 'sublabel', type: 'ReactNode' },
    { name: 'sublabelStyle', type: '"base" | "sm" | "subtle" | "path"', default: '"base"' },
  ],
  playground: {
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['base', 'lg'], default: 'base' },
      { name: 'bold', label: 'Bold', type: 'boolean', default: false },
      { name: 'icon', label: 'Icon', type: 'boolean', default: false },
      { name: 'optional', label: 'Optional', type: 'boolean', default: false },
      { name: 'sublabel', label: 'Sublabel', type: 'boolean', default: true },
      { name: 'sublabelStyle', label: 'Sublabel style', type: 'select', options: ['base', 'sm', 'subtle', 'path'], default: 'base' },
    ],
    render: (s) => (
      <Label size={s.size as 'base'} bold={Boolean(s.bold)} icon={s.icon ? <SettingsGeneral /> : undefined} optional={Boolean(s.optional)} sublabel={s.sublabel ? (s.sublabelStyle === 'path' ? '/Drive/Projects/Q3' : 'Shown on invoices.') : undefined} sublabelStyle={s.sublabelStyle as 'base'}>
        Company name
      </Label>
    ),
    code: (s) =>
      example(
        [IMPORT('Label')],
        jsx('Label', { size: s.size !== 'base' ? String(s.size) : undefined, bold: Boolean(s.bold), icon: s.icon ? { raw: '<Settings />' } : undefined, optional: Boolean(s.optional), sublabel: s.sublabel ? (s.sublabelStyle === 'path' ? '/Drive/Projects/Q3' : 'Shown on invoices.') : undefined, sublabelStyle: s.sublabel && s.sublabelStyle !== 'base' ? String(s.sublabelStyle) : undefined }, 'Company name'),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
