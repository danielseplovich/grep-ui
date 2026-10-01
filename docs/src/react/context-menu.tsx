import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { ContextMenu, type MenuSection } from '../../../react/context-menu'
import { ArrowRightDown, Copy, MountDrive, PhotoStack, Pin, SettingsGeneral, TrashFill } from '../../../react/icons'

const sections: MenuSection[] = [
  { header: '4 assets', items: [{ label: 'Add to collection', icon: <PhotoStack />, submenu: true }, { label: 'Pin to cache', icon: <Pin /> }] },
  { header: 'General', items: [{ label: 'Rename', icon: <SettingsGeneral /> }, { label: 'Move', icon: <ArrowRightDown /> }, { label: 'Copy', icon: <Copy /> }, { label: 'Download', icon: <MountDrive />, submenu: true }] },
  { items: [{ label: 'Move to trash', icon: <TrashFill />, danger: true }] },
]

export const contextMenuDoc: ReactDoc = {
  slug: 'context-menu',
  title: 'Context Menu',
  description: 'A list of actions, in sections, with an optional search field.',
  basedOn: 'div',
  importCode: IMPORT('ContextMenu'),
  usageCode: `<ContextMenu sections={[{ header: "General", items: [{ label: "Rename", icon: <Edit />, onSelect: rename }] }]} />`,
  props: [
    { name: 'sections', type: '{ header?: ReactNode; items: MenuItem[] }[]' },
    { name: 'MenuItem', type: '{ label; icon?; onSelect?; submenu?; danger?; disabled? }' },
    { name: 'searchable', type: 'boolean', default: 'false' },
    { name: 'searchPlaceholder', type: 'string', default: '"Search…"' },
    { name: 'onSearch', type: '(query: string) => void' },
  ],
  playground: {
    controls: [
      { name: 'searchable', label: 'Searchable', type: 'boolean', default: false },
      { name: 'headers', label: 'Section headers', type: 'boolean', default: true },
      { name: 'icons', label: 'Icons', type: 'boolean', default: true },
    ],
    render: (s) => <ContextMenu searchable={Boolean(s.searchable)} sections={sections.map((sec) => ({ header: s.headers ? sec.header : undefined, items: sec.items.map((i) => ({ ...i, icon: s.icons ? i.icon : undefined })) }))} />,
    code: (s) => {
      const item = (label: string, icon: string, extra = '') => `{ label: "${label}"${s.icons ? `, icon: <${icon} />` : ''}${extra} }`
      const secs = [
        `{ ${s.headers ? 'header: "4 assets", ' : ''}items: [${item('Add to collection', 'Collection', ', submenu: true')}, ${item('Pin to cache', 'Pin')}] }`,
        `{ ${s.headers ? 'header: "General", ' : ''}items: [${item('Rename', 'Edit')}, ${item('Move', 'Move')}, ${item('Copy', 'Copy')}, ${item('Download', 'Download', ', submenu: true')}] }`,
        `{ items: [${item('Move to trash', 'Trash', ', danger: true, onSelect: trash')}] }`,
      ]
      return example([IMPORT('ContextMenu')], jsx('ContextMenu', { searchable: Boolean(s.searchable), sections: { raw: `[\n  ${secs.join(',\n  ')},\n]` } }))
    },
  },
  examples: { hero: { html: '' }, examples: [] },
}
