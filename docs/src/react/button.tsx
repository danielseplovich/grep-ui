import type { ReactDoc } from '../lib/reactDocs'
import { dedent } from '../lib/examples'
import { Button } from '../../../react/button'
import { Asset } from '../components/ui'

const code = (s: string) => dedent(s)
const Plus = () => <Asset name="icon-button-icon-example" />

export const buttonDoc: ReactDoc = {
  slug: 'button',
  title: 'Button',
  description: 'The standard action control, using Grep UI’s design system.',
  basedOn: 'button',
  importCode: `import { Button } from "@shade/grep-ui/react"`,
  usageCode: `<Button>Button</Button>`,
  props: [
    { name: 'variant', type: '"brand" | "neutral" | "inverted" | "danger"', default: '"brand"' },
    { name: 'isLoading', type: 'boolean', default: 'false' },
    { name: 'asChild', type: 'boolean', default: 'false' },
    { name: 'leadingIcon', type: 'ReactNode' },
    { name: 'trailingIcon', type: 'ReactNode' },
  ],
  examples: {
    hero: {
      html: '',
      element: <Button>Button</Button>,
      code: code(`
        import { Button } from "@shade/grep-ui/react"

        export default function ButtonDemo() {
          return <Button>Button</Button>
        }`),
    },
    examples: [
      {
        id: 'variants',
        title: 'Button Variants',
        html: '',
        element: (
          <>
            <Button variant="brand">Brand</Button>
            <Button variant="neutral">Neutral</Button>
            <Button variant="inverted">Inverted</Button>
            <Button variant="danger">Danger</Button>
          </>
        ),
        code: code(`
          import { Button } from "@shade/grep-ui/react"

          export default function ButtonVariants() {
            return (
              <div className="flex items-center gap-3">
                <Button variant="brand">Brand</Button>
                <Button variant="neutral">Neutral</Button>
                <Button variant="inverted">Inverted</Button>
                <Button variant="danger">Danger</Button>
              </div>
            )
          }`),
      },
      {
        id: 'loading',
        title: 'Button Loading State',
        html: '',
        element: <Button isLoading>Button</Button>,
        code: code(`
          import { Button } from "@shade/grep-ui/react"

          export default function ButtonLoading() {
            return <Button isLoading>Button</Button>
          }`),
      },
      {
        id: 'icon',
        title: 'Button with Icon',
        html: '',
        element: (
          <>
            <Button leadingIcon={<Plus />}>Leading</Button>
            <Button variant="neutral" trailingIcon={<Plus />}>Trailing</Button>
          </>
        ),
        code: code(`
          import { Button } from "@shade/grep-ui/react"
          import { Plus } from "@shade/grep-ui/icons"

          export default function ButtonWithIcon() {
            return (
              <div className="flex items-center gap-3">
                <Button leadingIcon={<Plus />}>Leading</Button>
                <Button variant="neutral" trailingIcon={<Plus />}>Trailing</Button>
              </div>
            )
          }`),
      },
      {
        id: 'disabled',
        title: 'Button Disabled',
        html: '',
        element: (
          <>
            <Button disabled>Brand</Button>
            <Button variant="neutral" disabled>Neutral</Button>
          </>
        ),
        code: code(`
          import { Button } from "@shade/grep-ui/react"

          export default function ButtonDisabled() {
            return (
              <div className="flex items-center gap-3">
                <Button disabled>Brand</Button>
                <Button variant="neutral" disabled>Neutral</Button>
              </div>
            )
          }`),
      },
      {
        id: 'link',
        title: 'Button as Link',
        html: '',
        element: (
          <Button variant="neutral" asChild>
            <a href="https://shade.inc" target="_blank" rel="noreferrer">
              Open Shade
            </a>
          </Button>
        ),
        code: code(`
          import { Button } from "@shade/grep-ui/react"

          export default function ButtonAsLink() {
            return (
              <Button variant="neutral" asChild>
                <a href="https://shade.inc" target="_blank" rel="noreferrer">
                  Open Shade
                </a>
              </Button>
            )
          }`),
      },
    ],
  },
}
