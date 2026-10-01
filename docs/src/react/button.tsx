import type { ReactDoc, ControlState } from '../lib/reactDocs'
import { Button, type ButtonVariant } from '../../../react/button'
import { Asset } from '../components/ui'

const Plus = () => <Asset name="icon-button-icon-example" />

function snippet(s: ControlState): string {
  const props: string[] = []
  if (s.variant !== 'brand') props.push(`variant="${s.variant}"`)
  if (s.leadingIcon) props.push('leadingIcon={<Plus />}')
  if (s.trailingIcon) props.push('trailingIcon={<Plus />}')
  if (s.isLoading) props.push('isLoading')
  if (s.disabled) props.push('disabled')
  const icons = s.leadingIcon || s.trailingIcon ? `import { Plus } from "@shade/grep-ui/icons"\n` : ''
  const open = props.length ? `<Button ${props.join(' ')}>` : '<Button>'
  return `import { Button } from "@shade/grep-ui/react"\n${icons}\nexport default function Example() {\n  return ${open}Button</Button>\n}`
}

export const buttonDoc: ReactDoc = {
  slug: 'button',
  title: 'Button',
  description: 'The standard action control, using Grep UI’s design system.',
  basedOn: 'button',
  importCode: `import { Button } from "@shade/grep-ui/react"`,
  usageCode: `<Button>Button</Button>`,
  props: [
    { name: 'variant', type: '"brand" | "neutral" | "inverted" | "danger"', default: '"brand"' },
    { name: 'leadingIcon', type: 'ReactNode' },
    { name: 'trailingIcon', type: 'ReactNode' },
    { name: 'isLoading', type: 'boolean', default: 'false' },
    { name: 'asChild', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['brand', 'neutral', 'inverted', 'danger'], default: 'brand' },
      { name: 'leadingIcon', label: 'Leading icon', type: 'boolean', default: false },
      { name: 'trailingIcon', label: 'Trailing icon', type: 'boolean', default: false },
      { name: 'isLoading', label: 'Loading', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => (
      <Button
        variant={s.variant as ButtonVariant}
        leadingIcon={s.leadingIcon ? <Plus /> : undefined}
        trailingIcon={s.trailingIcon ? <Plus /> : undefined}
        isLoading={Boolean(s.isLoading)}
        disabled={Boolean(s.disabled)}
      >
        Button
      </Button>
    ),
    code: snippet,
  },
  examples: { hero: { html: '', element: <Button>Button</Button> }, examples: [] },
}
