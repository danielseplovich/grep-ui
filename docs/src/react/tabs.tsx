import type { ReactDoc } from '../lib/reactDocs'
import { example, IMPORT } from '../lib/snippet'
import { Tabs, Tab } from '../../../react/tabs'
import { TabIconExample } from '../../../react/icons'

export const tabsDoc: ReactDoc = {
  slug: 'tabs',
  title: 'Tabs',
  description: 'A row of tabs for switching views.',
  basedOn: 'button',
  importCode: IMPORT('Tabs, Tab'),
  usageCode: `<Tabs>\n  <Tab selected>Files</Tab>\n  <Tab badge={12}>Comments</Tab>\n</Tabs>`,
  props: [
    { name: 'Tabs.size', type: '28 | 32 | 36', default: '28' },
    { name: 'Tabs.round', type: 'boolean', default: 'false' },
    { name: 'Tab.selected', type: 'boolean', default: 'false' },
    { name: 'Tab.icon', type: 'ReactNode' },
    { name: 'Tab.badge', type: 'ReactNode' },
  ],
  playground: {
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['28', '32', '36'], default: '28' },
      { name: 'round', label: 'Round', type: 'boolean', default: false },
      { name: 'icons', label: 'Icons', type: 'boolean', default: false },
      { name: 'badge', label: 'Badge', type: 'boolean', default: false },
    ],
    render: (s) => (
      <Tabs size={Number(s.size) as 28} round={Boolean(s.round)}>
        <Tab selected icon={s.icons ? <TabIconExample /> : undefined}>Files</Tab>
        <Tab icon={s.icons ? <TabIconExample /> : undefined} badge={s.badge ? 12 : undefined}>Comments</Tab>
        <Tab icon={s.icons ? <TabIconExample /> : undefined}>Activity</Tab>
      </Tabs>
    ),
    code: (s) => {
      const icon = s.icons ? ' icon={<Folder />}' : ''
      const attrs = [s.size !== '28' ? ` size={${s.size}}` : '', s.round ? ' round' : ''].join('')
      return example(
        s.icons ? [IMPORT('Tabs, Tab'), `import { Folder } from "@shade/grep-ui/react/icons"`] : [IMPORT('Tabs, Tab')],
        `<Tabs${attrs}>\n  <Tab selected${icon}>Files</Tab>\n  <Tab${icon}${s.badge ? ' badge={12}' : ''}>Comments</Tab>\n  <Tab${icon}>Activity</Tab>\n</Tabs>`,
      )
    },
  },
  examples: { hero: { html: '' }, examples: [] },
}
