/* What each component looks like on the gallery card. Small components get a
   composition so the card is not one lonely toggle; the rest render their
   playground defaults, which already sit at a sensible width. */

import type { ReactNode } from 'react'
import { reactDocs } from './reactDocs'
import { examplesBySlug } from '../examples'
import { Avatar } from '../../../react/avatar'
import { Badge } from '../../../react/badge'
import { Button } from '../../../react/button'
import { Checkbox } from '../../../react/checkbox'
import { Divider } from '../../../react/divider'
import { IconButton } from '../../../react/icon-button'
import { Kbd, KbdGroup } from '../../../react/keyboard-shortcut'
import { Label } from '../../../react/label'
import { ProgressBar } from '../../../react/progress-bar'
import { Radio } from '../../../react/radio'
import { Toggle } from '../../../react/toggle'
import { Tooltip } from '../../../react/tooltip'
import { Banner } from '../../../react/banner'
import { ItemBlock, ItemRow } from '../../../react/item-block'
import { Modal } from '../../../react/modal'
import { Input } from '../../../react/input'
import { AvatarIconExample, IconButtonIconExample, SettingsGeneral } from '../../../react/icons'
import { Plus } from '../react/button'

const row = (children: ReactNode, gap = 12) => <div style={{ display: 'flex', alignItems: 'center', gap: `var(--space-${gap})` }}>{children}</div>
const stack = (children: ReactNode, gap = 12) => <div style={{ display: 'flex', flexDirection: 'column', gap: `var(--space-${gap})` }}>{children}</div>

const compositions: Record<string, () => ReactNode> = {
  banner: () => (
    <div style={{ width: 400 }}>
      <Banner type="info" title="New in Grep" action={{ label: 'Try it' }}>
        Collections can now be shared with a link.
      </Banner>
    </div>
  ),
  'item-block': () => (
    <div style={{ width: 420 }}>
      <ItemBlock title="Sync">
        <ItemRow label="Auto-sync" sublabel="Keep this folder up to date."><Toggle checked /></ItemRow>
        <ItemRow label="Cache" sublabel="Pin files for offline use."><Toggle /></ItemRow>
        <ItemRow label="Versions" chevron interactive />
      </ItemBlock>
    </div>
  ),
  modal: () => (
    <div style={{ position: 'relative', width: 520, height: 300, borderRadius: 'var(--radius-8)', overflow: 'clip', background: 'var(--background-canvas)' }}>
      <Modal open inline onClose={() => {}} title="Rename collection" subtitle="Everyone with access will see the new name." confirmLabel="Rename">
        <Input label="Name" defaultValue="Q3 campaign" />
      </Modal>
    </div>
  ),
  avatar: () =>
    row(
      <>
        <Avatar size={24}><AvatarIconExample /></Avatar>
        <Avatar size={32} round><AvatarIconExample /></Avatar>
        <Avatar size={40} badge={<span style={{ display: 'block', width: '100%', height: '100%', borderRadius: '50%', background: 'var(--background-accent-success)' }} />}><AvatarIconExample /></Avatar>
      </>,
    ),
  badge: () =>
    row(
      <>
        <Badge>Draft</Badge>
        <Badge tone="brand">Beta</Badge>
        <Badge tone="success">Synced</Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="destructive">Failed</Badge>
      </>,
      8,
    ),
  button: () =>
    row(
      <>
        <Button leadingIcon={<Plus />}>New folder</Button>
        <Button variant="neutral">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </>,
    ),
  checkbox: () =>
    stack(
      <>
        <Checkbox checked label="Notify me" />
        <Checkbox indeterminate label="Share with team" />
        <Checkbox label="Keep a copy" />
      </>,
    ),
  radio: () =>
    stack(
      <>
        <Radio checked label="Pro" />
        <Radio label="Team" />
        <Radio label="Enterprise" />
      </>,
    ),
  toggle: () =>
    stack(
      <>
        <Toggle checked label="Auto-sync" />
        <Toggle label="Pin for offline" />
        <Toggle checked size="md" label="Keep versions" />
      </>,
    ),
  'keyboard-shortcut': () =>
    row(
      <>
        <KbdGroup><Kbd type="icon" /><Kbd>K</Kbd></KbdGroup>
        <KbdGroup><Kbd type="label">shift</Kbd><Kbd>A</Kbd></KbdGroup>
        <KbdGroup><Kbd lg type="icon" /><Kbd lg type="number">1</Kbd></KbdGroup>
      </>,
      16,
    ),
  label: () =>
    stack(
      <>
        <Label bold icon={<SettingsGeneral />} sublabel="Shown on invoices.">Company name</Label>
        <Label optional sublabel="/Drive/Projects/Q3" sublabelStyle="path">Location</Label>
      </>,
      16,
    ),
  'icon-button': () =>
    row(
      <>
        <IconButton label="Add" variant="primary"><IconButtonIconExample /></IconButton>
        <IconButton label="Add" variant="neutral"><IconButtonIconExample /></IconButton>
        <IconButton label="Add" variant="ghost"><IconButtonIconExample /></IconButton>
        <IconButton label="Add" round><IconButtonIconExample /></IconButton>
      </>,
      8,
    ),
  divider: () => (
    <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', fontSize: 'var(--text-sm)', color: 'var(--foreground-text-dim)' }}>
      <span>Shared with 4 people</span>
      <Divider />
      <span>Last synced 2 min ago</span>
      <Divider subtle />
      <span>1.2 GB in cache</span>
    </div>
  ),
  'progress-bar': () => (
    <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
      <ProgressBar value={72} />
      <ProgressBar value={100} tone="success" />
      <ProgressBar value={38} tone="warning" />
    </div>
  ),
  tooltip: () =>
    row(
      <>
        <Tooltip tail={{ edge: 'bottom', align: 'middle' }}>Rename this folder</Tooltip>
        <Tooltip shortcut={{ label: 'Open search', keys: ['cmd', 'K'] }} />
      </>,
      16,
    ),
}

/** The playground's default state: every control at its first option. */
function defaults(slug: string) {
  const doc = reactDocs[slug]
  if (!doc?.playground) return null
  return Object.fromEntries(doc.playground.controls.map((c) => [c.name, c.default]))
}

export function galleryPreview(slug: string): ReactNode {
  const custom = compositions[slug]
  if (custom) return custom()
  const doc = reactDocs[slug]
  const state = defaults(slug)
  if (doc?.playground && state) return doc.playground.render(state)
  const hero = examplesBySlug[slug]?.hero
  if (hero?.element) return hero.element
  if (hero?.html) return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: hero.html }} />
  return null
}

