import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Modal } from '../../../react/modal'
import { Input } from '../../../react/input'
import { Checkbox } from '../../../react/checkbox'

export const modalDoc: ReactDoc = {
  slug: 'modal',
  title: 'Modal',
  description: 'A dialog over the page with a header, a body and a footer of actions.',
  basedOn: 'div',
  importCode: IMPORT('Modal'),
  usageCode: `<Modal open={open} onClose={() => setOpen(false)} title="Rename collection" confirmLabel="Rename" onConfirm={rename}>\n  <Input label="Name" defaultValue="Q3 campaign" />\n</Modal>`,
  props: [
    { name: 'open', type: 'boolean' },
    { name: 'onClose', type: '() => void' },
    { name: 'title', type: 'ReactNode' },
    { name: 'subtitle', type: 'ReactNode' },
    { name: 'size', type: '"base" | 520', default: '"base"' },
    { name: 'confirmLabel', type: 'string', default: '"Confirm"' },
    { name: 'cancelLabel', type: 'string', default: '"Cancel"' },
    { name: 'onConfirm', type: '() => void' },
    { name: 'destructive', type: 'boolean', default: 'false' },
    { name: 'footerLead', type: 'ReactNode' },
  ],
  playground: {
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['base', '520'], default: 'base' },
      { name: 'subtitle', label: 'Subtitle', type: 'boolean', default: true },
      { name: 'destructive', label: 'Destructive', type: 'boolean', default: false },
      { name: 'lead', label: 'Footer lead', type: 'boolean', default: false },
    ],
    render: (s) => (
      <div style={{ position: 'relative', width: 720, height: 420, borderRadius: 'var(--radius-8)', overflow: 'clip', background: 'var(--background-canvas)' }}>
      <Modal
        open
        inline
        onClose={() => {}}
        size={s.size === '520' ? 520 : 'base'}
        title={s.destructive ? 'Delete collection?' : 'Rename collection'}
        subtitle={s.subtitle ? (s.destructive ? 'This can’t be undone.' : 'Everyone with access will see the new name.') : undefined}
        confirmLabel={s.destructive ? 'Delete' : 'Rename'}
        destructive={Boolean(s.destructive)}
        footerLead={s.lead ? <Checkbox label="Don’t ask again" /> : undefined}
      >
        {s.destructive ? <p style={{ margin: 0 }}>“Q3 campaign” and its 14 files will be moved to trash.</p> : <Input label="Name" defaultValue="Q3 campaign" helpText="Up to 64 characters." />}
      </Modal>
      </div>
    ),
    code: (s) =>
      example(
        [IMPORT(s.lead ? 'Modal, Input, Checkbox' : 'Modal, Input')],
        jsx(
          'Modal',
          {
            open: { raw: 'open' },
            onClose: { raw: '() => setOpen(false)' },
            size: s.size === '520' ? 520 : undefined,
            title: s.destructive ? 'Delete collection?' : 'Rename collection',
            subtitle: s.subtitle ? (s.destructive ? 'This can’t be undone.' : 'Everyone with access will see the new name.') : undefined,
            confirmLabel: s.destructive ? 'Delete' : 'Rename',
            onConfirm: { raw: s.destructive ? 'remove' : 'rename' },
            destructive: Boolean(s.destructive),
            footerLead: s.lead ? { raw: '<Checkbox label="Don’t ask again" />' } : undefined,
          },
          s.destructive ? '<p>“Q3 campaign” and its 14 files will be moved to trash.</p>' : '<Input label="Name" defaultValue="Q3 campaign" helpText="Up to 64 characters." />',
        ),
      ),
  },
  examples: { hero: { html: '', layout: 'fill' }, examples: [] },
}
