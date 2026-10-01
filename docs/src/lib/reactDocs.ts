/* Per-component React documentation: the import, a usage snippet, and the prop
   table. A component with an entry here renders the React page layout; the
   rest still render the CSS layout until their React version lands. */

import type { ComponentExamples } from './examples'

export interface PropDoc {
  name: string
  type: string
  default?: string
}

export interface ReactDoc {
  slug: string
  title: string
  description: string
  /** "This component is based on the button element…" */
  basedOn?: string
  importCode: string
  usageCode: string
  props: PropDoc[]
  examples: ComponentExamples
}

import { buttonDoc } from '../react/button'

export const reactDocs: Record<string, ReactDoc> = {
  [buttonDoc.slug]: buttonDoc,
}
