import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Toast, type ToastType } from '../../../react/toast'

export const toastDoc: ReactDoc = {
  slug: 'toast',
  title: 'Toast',
  description: 'A brief notification with an icon, a title and optional actions.',
  basedOn: 'div',
  importCode: IMPORT('Toast'),
  usageCode: `<Toast type="success" title="Upload complete" onDismiss={close}>14 files added to Q3 campaign.</Toast>`,
  props: [
    { name: 'type', type: '"info" | "success" | "attention" | "warning" | "loading"', default: '"info"' },
    { name: 'title', type: 'ReactNode' },
    { name: 'links', type: '{ label: string; onClick?: () => void }[]' },
    { name: 'actions', type: '{ label: string; onClick?: () => void }[]' },
    { name: 'onDismiss', type: '() => void' },
  ],
  playground: {
    controls: [
      { name: 'type', label: 'Type', type: 'select', options: ['info', 'success', 'attention', 'warning', 'loading'], default: 'success' },
      { name: 'message', label: 'Message', type: 'boolean', default: true },
      { name: 'style', label: 'Actions', type: 'select', options: ['none', 'links', 'buttons'], default: 'links' },
      { name: 'dismiss', label: 'Dismiss', type: 'boolean', default: true },
    ],
    render: (s) => (
      <Toast type={s.type as ToastType} title="Upload complete" links={s.style === 'links' ? [{ label: 'Undo' }, { label: 'View' }] : undefined} actions={s.style === 'buttons' ? [{ label: 'Dismiss' }, { label: 'Open' }] : undefined} onDismiss={s.dismiss ? () => {} : undefined}>
        {s.message ? '14 files added to Q3 campaign.' : undefined}
      </Toast>
    ),
    code: (s) =>
      example(
        [IMPORT('Toast')],
        jsx(
          'Toast',
          { type: s.type !== 'info' ? String(s.type) : undefined, title: 'Upload complete', links: s.style === 'links' ? { raw: '[{ label: "Undo", onClick: undo }, { label: "View", onClick: view }]' } : undefined, actions: s.style === 'buttons' ? { raw: '[{ label: "Dismiss" }, { label: "Open", onClick: open }]' } : undefined, onDismiss: s.dismiss ? { raw: 'close' } : undefined },
          s.message ? '14 files added to Q3 campaign.' : undefined,
        ),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
