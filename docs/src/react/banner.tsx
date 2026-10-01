import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Banner, type BannerType } from '../../../react/banner'

export const bannerDoc: ReactDoc = {
  slug: 'banner',
  title: 'Banner',
  description: 'An in-page notice with a title, a message and up to two actions.',
  basedOn: 'div',
  importCode: IMPORT('Banner'),
  usageCode: `<Banner title="New in Grep" action={{ label: "Try it" }}>Collections can now be shared with a link.</Banner>`,
  props: [
    { name: 'type', type: '"info" | "success" | "warning" | "danger"', default: '"info"' },
    { name: 'title', type: 'ReactNode' },
    { name: 'icon', type: 'ReactNode' },
    { name: 'action', type: '{ label: string; onClick?: () => void }' },
    { name: 'dismissLabel', type: 'string | null', default: '"Dismiss"' },
    { name: 'onDismiss', type: '() => void' },
  ],
  playground: {
    controls: [
      { name: 'type', label: 'Type', type: 'select', options: ['info', 'success', 'warning', 'danger'], default: 'info' },
      { name: 'action', label: 'Action button', type: 'boolean', default: true },
      { name: 'dismiss', label: 'Dismiss button', type: 'boolean', default: true },
    ],
    render: (s) => (
      <div style={{ width: 640 }}>
        <Banner type={s.type as BannerType} title="New in Grep" action={s.action ? { label: 'Action' } : undefined} dismissLabel={s.dismiss ? 'Dismiss' : null}>
          Collections can now be shared with a link. Try it on any folder.
        </Banner>
      </div>
    ),
    code: (s) =>
      example(
        [IMPORT('Banner')],
        jsx('Banner', { type: s.type !== 'info' ? String(s.type) : undefined, title: 'New in Grep', action: s.action ? { raw: '{ label: "Action", onClick: act }' } : undefined, dismissLabel: s.dismiss ? undefined : { raw: 'null' }, onDismiss: s.dismiss ? { raw: 'dismiss' } : undefined }, 'Collections can now be shared with a link. Try it on any folder.'),
      ),
  },
  examples: { hero: { html: '', layout: 'fill' }, examples: [] },
}
