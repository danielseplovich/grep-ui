/* Per-component React documentation: the import, a usage snippet, and the prop
   table. A component with an entry here renders the React page layout; the
   rest still render the CSS layout until their React version lands. */

import type { ReactNode } from 'react'
import type { ComponentExamples } from './examples'

/* ---------- playground: one preview, controls beneath it ---------- */

export type ControlValue = string | boolean
export type ControlState = Record<string, ControlValue>

export type Control =
  | { name: string; label: string; type: 'select'; options: string[]; default: string }
  | { name: string; label: string; type: 'boolean'; default: boolean }

export interface Playground {
  controls: Control[]
  /** The live preview for the current control values. */
  render: (state: ControlState) => ReactNode
  /** The snippet for the current control values. */
  code: (state: ControlState) => string
}

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
  /** When set, the page shows one preview with controls instead of a list of examples. */
  playground?: Playground
  examples: ComponentExamples
}

import { buttonDoc } from '../react/button'

export const reactDocs: Record<string, ReactDoc> = {
  [buttonDoc.slug]: buttonDoc,
}
