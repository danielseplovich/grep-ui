import type { ComponentExamples } from '../lib/examples'
import { avatar_examples } from './avatar'
import { badge_examples } from './badge'
import { banner_examples } from './banner'
import { breadcrumbs_examples } from './breadcrumbs'
import { button_examples } from './button'
import { checkbox_examples } from './checkbox'
import { context_menu_examples } from './context-menu'
import { divider_examples } from './divider'
import { file_tree_menu_examples } from './file-tree-menu'
import { icon_button_examples } from './icon-button'
import { input_examples } from './input'
import { item_block_examples } from './item-block'
import { keyboard_shortcut_examples } from './keyboard-shortcut'
import { label_examples } from './label'
import { modal_examples } from './modal'
import { progress_bar_examples } from './progress-bar'
import { radio_examples } from './radio'
import { search_examples } from './search'
import { segmented_control_examples } from './segmented-control'
import { select_examples } from './select'
import { tabs_examples } from './tabs'
import { toast_examples } from './toast'
import { toggle_examples } from './toggle'
import { tooltip_examples } from './tooltip'

/** Keyed by the component folder name under ../Components. */
export const examplesBySlug: Record<string, ComponentExamples> = {
  avatar: avatar_examples,
  badge: badge_examples,
  banner: banner_examples,
  breadcrumbs: breadcrumbs_examples,
  button: button_examples,
  checkbox: checkbox_examples,
  'context-menu': context_menu_examples,
  divider: divider_examples,
  'file-tree-menu': file_tree_menu_examples,
  'icon-button': icon_button_examples,
  input: input_examples,
  'item-block': item_block_examples,
  'keyboard-shortcut': keyboard_shortcut_examples,
  label: label_examples,
  modal: modal_examples,
  'progress-bar': progress_bar_examples,
  radio: radio_examples,
  search: search_examples,
  'segmented-control': segmented_control_examples,
  select: select_examples,
  tabs: tabs_examples,
  toast: toast_examples,
  toggle: toggle_examples,
  tooltip: tooltip_examples,
}
