import type { ReactDoc } from '../lib/reactDocs'
import { dedent, siblings } from '../lib/examples'
import { btn, icon14, spinner } from '../examples/_shared'

const code = (s: string) => dedent(s)

export const buttonDoc: ReactDoc = {
  slug: 'button',
  title: 'Button',
  description: 'The standard action control, using Grep UI’s design system.',
  basedOn: 'button',
  importCode: `import { Button } from "@shade/grep-ui"`,
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
      html: btn('brand', 'Button'),
      code: code(`
        import { Button } from "@shade/grep-ui"

        export default function ButtonDemo() {
          return <Button>Button</Button>
        }`),
    },
    examples: [
      {
        id: 'variants',
        title: 'Button Variants',
        html: siblings(btn('brand', 'Brand'), btn('neutral', 'Neutral'), btn('inverted', 'Inverted'), btn('danger', 'Danger')),
        code: code(`
          import { Button } from "@shade/grep-ui"

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
        html: `<button class="grep-btn grep-btn--brand" data-state="loading" aria-busy="true">
  <span class="grep-btn__label">Button</span>
  ${spinner()}
</button>`,
        code: code(`
          import { Button } from "@shade/grep-ui"

          export default function ButtonLoading() {
            return <Button isLoading>Button</Button>
          }`),
      },
      {
        id: 'icon',
        title: 'Button with Icon',
        html: `<button class="grep-btn grep-btn--brand">
  ${icon14('grep-btn__icon')}
  <span class="grep-btn__label">Button</span>
  ${spinner()}
</button>`,
        code: code(`
          import { Button } from "@shade/grep-ui"
          import { Plus } from "@shade/grep-ui/icons"

          export default function ButtonWithIcon() {
            return <Button leadingIcon={<Plus />}>Button</Button>
          }`),
      },
      {
        id: 'disabled',
        title: 'Button Disabled',
        html: siblings(btn('brand', 'Brand', { state: 'disabled' }), btn('neutral', 'Neutral', { state: 'disabled' })),
        code: code(`
          import { Button } from "@shade/grep-ui"

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
        html: `<a class="grep-btn grep-btn--neutral" href="https://shade.inc" target="_blank" rel="noreferrer">
  <span class="grep-btn__label">Open Shade</span>
  ${spinner()}
</a>`,
        code: code(`
          import { Button } from "@shade/grep-ui"

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
