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
  | { name: string; label: string; type: 'text'; default: string }

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

import { avatarDoc } from '../react/avatar'
import { badgeDoc } from '../react/badge'
import { bannerDoc } from '../react/banner'
import { breadcrumbsDoc } from '../react/breadcrumbs'
import { buttonDoc } from '../react/button'
import { checkboxDoc } from '../react/checkbox'
import { contextMenuDoc } from '../react/context-menu'
import { dividerDoc } from '../react/divider'
import { fileTreeMenuDoc } from '../react/file-tree-menu'
import { iconButtonDoc } from '../react/icon-button'
import { inputDoc } from '../react/input'
import { itemBlockDoc } from '../react/item-block'
import { keyboardShortcutDoc } from '../react/keyboard-shortcut'
import { labelDoc } from '../react/label'
import { modalDoc } from '../react/modal'
import { progressBarDoc } from '../react/progress-bar'
import { radioDoc } from '../react/radio'
import { searchDoc } from '../react/search'
import { segmentedControlDoc } from '../react/segmented-control'
import { selectDoc } from '../react/select'
import { tabsDoc } from '../react/tabs'
import { toastDoc } from '../react/toast'
import { toggleDoc } from '../react/toggle'
import { tooltipDoc } from '../react/tooltip'

const all: ReactDoc[] = [
  avatarDoc, badgeDoc, bannerDoc, breadcrumbsDoc, buttonDoc, checkboxDoc, contextMenuDoc, dividerDoc, fileTreeMenuDoc,
  iconButtonDoc, inputDoc, itemBlockDoc, keyboardShortcutDoc, labelDoc, modalDoc, progressBarDoc, radioDoc, searchDoc,
  segmentedControlDoc, selectDoc, tabsDoc, toastDoc, toggleDoc, tooltipDoc,
]

export const reactDocs: Record<string, ReactDoc> = Object.fromEntries(all.map((d) => [d.slug, d]))
