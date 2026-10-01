import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT, ICONS } from '../lib/snippet'
import { Avatar } from '../../../react/avatar'
import { AvatarIconExample } from '../../../react/icons'

const sizes = ['40', '12', '14', '16', '20', '24', '28', '32', '36']

export const avatarDoc: ReactDoc = {
  slug: 'avatar',
  title: 'Avatar',
  description: 'A tile holding an icon, image or initials, for users, teams, files, apps and integrations.',
  basedOn: 'span',
  importCode: IMPORT('Avatar'),
  usageCode: `<Avatar size={32}><UserIcon /></Avatar>`,
  props: [
    { name: 'size', type: '40 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36', default: '40' },
    { name: 'round', type: 'boolean', default: 'false' },
    { name: 'interactive', type: 'boolean', default: 'false' },
    { name: 'badge', type: 'ReactNode' },
  ],
  playground: {
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: sizes, default: '40' },
      { name: 'round', label: 'Round (people)', type: 'boolean', default: false },
      { name: 'interactive', label: 'Interactive', type: 'boolean', default: false },
      { name: 'badge', label: 'Badge', type: 'boolean', default: false },
    ],
    render: (s) => (
      <Avatar size={Number(s.size) as 40} round={Boolean(s.round)} interactive={Boolean(s.interactive)} badge={s.badge ? <span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '50%', background: 'var(--background-accent-success)' }} /> : undefined}>
        <AvatarIconExample />
      </Avatar>
    ),
    code: (s) =>
      example(
        [IMPORT('Avatar'), ICONS('UserIcon')],
        jsx('Avatar', { size: Number(s.size), round: Boolean(s.round), interactive: Boolean(s.interactive), badge: s.badge ? { raw: '<StatusDot />' } : undefined }, '<UserIcon />'),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
