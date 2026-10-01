import type { ReactDoc } from '../lib/reactDocs'
import { example, IMPORT } from '../lib/snippet'
import { ItemBlock, ItemRow } from '../../../react/item-block'
import { Button } from '../../../react/button'
import { Toggle } from '../../../react/toggle'
import { SettingsGeneral } from '../../../react/icons'

export const itemBlockDoc: ReactDoc = {
  slug: 'item-block',
  title: 'Item Block',
  description: 'A settings group: a heading plus a card of stacked rows, each with a label and trailing controls.',
  basedOn: 'section',
  importCode: IMPORT('ItemBlock, ItemRow'),
  usageCode: `<ItemBlock title="Sync">\n  <ItemRow label="Auto-sync" sublabel="Keep this folder up to date."><Toggle checked /></ItemRow>\n  <ItemRow label="Cache" chevron interactive />\n</ItemBlock>`,
  props: [
    { name: 'ItemBlock.title', type: 'ReactNode' },
    { name: 'ItemBlock.subtitle', type: 'ReactNode' },
    { name: 'ItemRow.label', type: 'ReactNode' },
    { name: 'ItemRow.sublabel', type: 'ReactNode' },
    { name: 'ItemRow.tile', type: 'ReactNode' },
    { name: 'ItemRow.interactive', type: 'boolean', default: 'false' },
    { name: 'ItemRow.chevron', type: 'boolean', default: 'false' },
    { name: 'ItemRow.open', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'title', label: 'Block title', type: 'boolean', default: false },
      { name: 'sublabels', label: 'Sublabels', type: 'boolean', default: false },
      { name: 'tiles', label: 'Tiles', type: 'boolean', default: false },
      { name: 'trailing', label: 'Trailing control', type: 'select', options: ['none', 'toggle', 'button', 'chevron'], default: 'none' },
    ],
    render: (s) => {
      const sub = (t: string) => (s.sublabels ? t : undefined)
      const tile = s.tiles ? <SettingsGeneral /> : undefined
      const trail = s.trailing === 'toggle' ? <Toggle checked /> : s.trailing === 'button' ? <Button variant="neutral">Manage</Button> : null
      const chevron = s.trailing === 'chevron'
      return (
        <div style={{ width: 640 }}>
          <ItemBlock title={s.title ? 'Sync' : undefined}>
            <ItemRow label="Auto-sync" sublabel={sub('Keep this folder up to date.')} tile={tile} chevron={chevron} interactive={chevron}>{trail}</ItemRow>
            <ItemRow label="Cache" sublabel={sub('Pin files for offline use.')} tile={tile} chevron={chevron} interactive={chevron}>{trail}</ItemRow>
            <ItemRow label="Versions" sublabel={sub('Keep the last 30 days.')} tile={tile} chevron={chevron} interactive={chevron}>{trail}</ItemRow>
          </ItemBlock>
        </div>
      )
    },
    code: (s) => {
      const names = s.trailing === 'toggle' ? 'ItemBlock, ItemRow, Toggle' : s.trailing === 'button' ? 'ItemBlock, ItemRow, Button' : 'ItemBlock, ItemRow'
      const row = (label: string, sub: string) => {
        const attrs = [` label="${label}"`, s.sublabels ? ` sublabel="${sub}"` : '', s.tiles ? ' tile={<Settings />}' : '', s.trailing === 'chevron' ? ' chevron interactive' : ''].join('')
        const child = s.trailing === 'toggle' ? '<Toggle checked />' : s.trailing === 'button' ? '<Button variant="neutral">Manage</Button>' : ''
        return child ? `  <ItemRow${attrs}>${child}</ItemRow>` : `  <ItemRow${attrs} />`
      }
      return example(
        s.tiles ? [IMPORT(names), `import { Settings } from "@shade/grep-ui/react/icons"`] : [IMPORT(names)],
        `<ItemBlock${s.title ? ' title="Sync"' : ''}>\n${row('Auto-sync', 'Keep this folder up to date.')}\n${row('Cache', 'Pin files for offline use.')}\n${row('Versions', 'Keep the last 30 days.')}\n</ItemBlock>`,
      )
    },
  },
  examples: { hero: { html: '', layout: 'fill' }, examples: [] },
}
