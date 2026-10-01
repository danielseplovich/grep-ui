import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { FileTreeMenu, type TreeNode } from '../../../react/file-tree-menu'

const nodes: TreeNode[] = [
  { id: 'drafts', label: '01_Drafts', children: [
    { id: 'concepts', label: 'Concepts', children: [{ id: 'mood', label: 'moodboard_v3.png' }, { id: 'story', label: 'storyboard_final.pdf' }] },
    { id: 'archive', label: 'Archive', collapsed: true, children: [{ id: 'old', label: 'old.pdf' }] },
  ] },
  { id: 'shoots', label: '02_Shoots', collapsed: true, children: [{ id: 'day1', label: 'day1.mov' }] },
  { id: 'brief', label: 'brief.md' },
]

export const fileTreeMenuDoc: ReactDoc = {
  slug: 'file-tree-menu',
  title: 'File Tree Menu',
  description: 'A folder tree with carets, guide lines and optional checkboxes.',
  basedOn: 'ul',
  importCode: IMPORT('FileTreeMenu'),
  usageCode: `<FileTreeMenu nodes={tree} selectedId={current} onSelect={setCurrent} />`,
  props: [
    { name: 'nodes', type: '{ id: string; label: string; icon?: ReactNode; children?: TreeNode[]; collapsed?: boolean }[]' },
    { name: 'type', type: '"text" | "checkbox"', default: '"text"' },
    { name: 'checked', type: 'string[]' },
    { name: 'onCheckedChange', type: '(ids: string[]) => void' },
    { name: 'selectedId', type: 'string' },
    { name: 'onSelect', type: '(id: string) => void' },
    { name: 'searchable', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'type', label: 'Type', type: 'select', options: ['text', 'checkbox'], default: 'text' },
      { name: 'searchable', label: 'Searchable', type: 'boolean', default: false },
      { name: 'selected', label: 'Selected row', type: 'boolean', default: false },
    ],
    render: (s) => (
      <div style={{ width: 300 }}>
        <FileTreeMenu nodes={nodes} type={s.type as 'text'} searchable={Boolean(s.searchable)} selectedId={s.selected ? 'story' : undefined} checked={['drafts', 'story']} />
      </div>
    ),
    code: (s) => example([IMPORT('FileTreeMenu')], jsx('FileTreeMenu', { nodes: { raw: 'tree' }, type: s.type !== 'text' ? String(s.type) : undefined, searchable: Boolean(s.searchable), selectedId: s.selected ? { raw: 'current' } : undefined, onSelect: { raw: 'setCurrent' }, checked: s.type === 'checkbox' ? { raw: 'checked' } : undefined, onCheckedChange: s.type === 'checkbox' ? { raw: 'setChecked' } : undefined })),
  },
  examples: { hero: { html: '' }, examples: [] },
}
