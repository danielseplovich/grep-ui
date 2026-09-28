# Grep UI — Open contradictions

Things the library currently says two ways, or doesn't say at all. Logged as they're found while compiling components; **not resolved by guessing**. Dan settles these, and each answer moves to [RULES.md](./RULES.md) or gets fixed in Figma.

Status: 🔴 open · 🟢 resolved

## Contradictions — the library says two things

| # | What | Where | Status |
|---|---|---|---|
| 1 | **Avatar badge minimum size.** The annotation on the size-24 variant says the Icon Badge exists "on sizes 28 through 40". The node structure disagrees — 24 has a badge instance, added in a later batch than the annotation. CSS follows the nodes and allows it from 24 up. | `avatar/avatar.md` | 🔴 |
| 2 | **Checkbox disabled card shadow.** `State=Disabled, Card=True` uses `0 1px 2px 0` where every other card variant uses `0 1px 2px -1px`. Reads as a slip; CSS uses the standard card shadow. | `checkbox/checkbox.md` | 🔴 |
| 3 | **Corner radii bound to spacing tokens,** not radius tokens: Button and Segmented Control to `Spacing/space-6`, Tooltip to `Spacing/space-8`. Values match either way, so the CSS uses `--radius-6` / `--radius-8` — but radius and spacing currently share a scale in Figma. | `button/button.md`, `tooltip/tooltip.md` | 🔴 |
| 15 | **Menu header divider is 1px `border-subtle`.** | `file-tree-menu/file-tree-menu.md` | 🟢 Resolved — that *is* the rule for a section divider inside a component. Figma was right. |
| 25 | **Context Menu and File Tree Menu share a shell.** Same 300-wide flyout, same search block, same 28-high header, same 1px subtle rules — but they're separate Figma components with separate CSS (`.grep-menu` and `.grep-tree-menu`). Either consolidate, or accept the duplication deliberately. | `context-menu/context-menu.md` | 🔴 |
| 20 | **Type naming: Primary vs Brand.** Icon Button calls the brand treatment *Primary*; Button calls it *Brand*. Same tokens, two names. CSS matches each component's own Figma naming, so an agent has to know both. | `icon-button/icon-button.md` | 🔴 |
| 27 | **Progress Bar: Brand at 100% has a different track colour.** Every other combination uses `background-contrast`; `Brand + 100%` alone uses `badge-brand-background`. Invisible at 100% since the fill covers it. CSS uses `background-contrast` throughout. | `progress-bar/progress-bar.md` | 🔴 |
| 28 | **Keyboard shortcut group gap: 3 vs 4.** Search and Tooltip space their key caps by 3; Item Row spaces the same combo by 4. Three sources now, two answers. | `search/search.md`, `tooltip/tooltip.md` | 🔴 |
| 4 | **Dividing line "Base" is 1px** while `--border-width-0-5` is the default for component borders. | `divider/divider.md` | 🟢 Resolved — different things. Dividers are 1px; a component's own edge is 0.5px. See RULES.md > Line weights. |
| 30 | **Badge Base sizes** — is the ramp really 16 / 18 / 22? | `badge/badge.md` | 🟢 Resolved — read off Multi Select Input: XS (16), SM (18), Base (22), with padding, gap, type and icon stepping together. Now in `badge.css` as `--16` / `--18` / `--22`. |
| 31 | 🔴 **A 20-high badge in Select's Badge Fill.** The Badge Base size ramp is XS (16) / SM (18) / Base (22) — read off Multi Select. But Select Input's Badge Fill state uses a `Badge Base/Blue/Full/20 (base)`: height 20, px 8, gap 4, 13px text, 12px icon. Built as `--22`, the nearest real size. | `select/select.md`, `badge/badge.md` | Either 20 is a stray override in that one instance, or the ramp has a fourth step |
| 34 | 🔴 **XL (36) + Full + Selected loses 2px of padding.** Every other size/corner keeps its padding across states, but Full/XL reads px 14 at Default, Hover and Focused and px **12** at Selected. Built as 14 everywhere. | `tabs/tabs.md` | Confirm 14 is right, or say why Selected is tighter |
| 35 | 🔴 **Icons drawn at text-token opacities.** Two cases: the tab icon reads 0.56 / 0.72 (`foreground-icon-base` is 0.88), and the toast's close × reads 0.36 (`foreground-icon-faint` is 0.32). Both CSS rules use the matching *text* token to hit the value exactly. | `tabs/tabs.md`, `toast/toast.md` | Either bind these glyphs to icon tokens, or add icon steps at 0.72 and 0.36 |
| 37 | 🔴 **Attention draws a triangle, Warning draws a hexagon.** In Toast the `Attention` type uses the warning-triangle glyph and `Warning` uses the error-hexagon glyph — so "warning" reads as an error and "attention" reads as a warning. Built exactly as read. | `toast/toast.md` | Confirm the naming, or swap the glyphs |
| 39 | 🔴 **Toggle Group's gap is 16; Checkbox and Radio Groups use 12.** Same anatomy — control, label block, optional card, same 12 padding and `radius-8` — but the control sits 4px further from the label. Built as read. | `toggle/toggle.md` | Confirm 16 is deliberate, or align the three groups |
| 41 | 🔴 **The tooltip tail's side offsets are asymmetric.** 12 from the left edge, 8 from the right, on every Top/Bottom Left and Right variant. Built as read. | `tooltip/tooltip.md` | Confirm, or settle on one offset |

## Unverified — built from a partial read

| # | What | Where | What would settle it |
|---|---|---|---|
| 5 | **Banner action button per type.** Info reads as brand. Success/Warning/Danger bind `button/contrast/*` and no brand tokens, so they're mapped to `--inverted` — but only Info's markup was read. | `banner/banner.md` | Any one non-Info banner node |
| 6 | **Badge accent tone mapping.** Only the two neutral tones were read from nodes. Each accent class binds the matching `--badge-<tone>-*` triplet, and assumes accents share the neutrals' geometry. | `badge/badge.md` | Any one accent badge node |
| 7 | **Breadcrumb separator colour.** `foreground-icon-dim` appeared in the trail's variable set but the chevron's fill wasn't bound to it in the returned markup. | `breadcrumbs/breadcrumbs.md` | Confirm the chevron's fill binding |
| 21 | **Icon Button types and states.** Only Primary / Default was read across the seven sizes. All other types and states are carried from Button by instruction. | `icon-button/icon-button.md` | One Icon Button node in any other type or state |
| 22 | **Input disabled.** Focus and error are now READ — `Grep UI/Input/focus` and `Input/focus-danger` are named effect styles, found via Search. Only disabled is still precedent (`opacity-disabled`). | `input/input.md` | An input node in disabled |
| 26 | **Context menu item states.** No hover, disabled or danger variant was read. Hover uses `background-overlay-hover`; `--danger` is an addition — Figma's "Move to trash" item is **not** recoloured. | `context-menu/context-menu.md` | A context menu item in hover / disabled, and a destructive item |
| 43 | **The whole Modal component is derived, not read.** There is no Figma node. Radius, surface, scrim, elevation, padding, rules, title size, the 400/520 ramp and the close-button size all come from DESIGN.md conventions or the nearest read component — see the table at the top of `modal/modal.md`. | `modal/modal.md` | A Figma Modal node; until then every value in that file is a proposal |
| 40 | **Toggle tokens were matched by value, not read.** The component exports as a flattened vector, so no layer carries a bound variable. Fills, strokes and both shadows were matched back to `background-toggle-off`, `border-base` / `border-brand`, `button-brand-background(-hover)`, `--elevation-interactive` and `--elevation-card` by comparing hex and filter values. | `toggle/toggle.md` | A non-flattened toggle node, or confirmation of the bindings |
| 16 | **File tree item hover and selected.** No state variant was read. CSS uses `background-overlay-hover` and `background-overlay-selected` on the item frame — the system's documented interaction pattern, but unverified for this component. | `file-tree-menu/file-tree-menu.md` | A File Tree Item hover / selected node |
| 8 | **Which focus ring a toggle takes.** | `toggle/toggle.md` | 🟢 Resolved — read off Toggle Base: `Grep UI/Interactive/focus`, the small ring, same as checkbox and radio. Drawn one pixel further out because the toggle's border is outset. |
| 29 | **Segmented control focus and disabled.** Neither appears in the `state` prop (Default / Selected / Hover only). A segmented control is keyboard-navigable, so a focus ring is expected — likely `--elevation-focus-ring`, unverified. | `segmented-control/segmented-control.md` | A segmented control focus / disabled node |

## Unspecified — nothing in Figma covers it

| # | What | Where |
|---|---|---|
| 9 | **Breadcrumb condensing.** When to collapse a long path, and how many crumbs to keep either side of the overflow crumb. | `breadcrumbs/breadcrumbs.md` |
| 10 | **Breadcrumb truncation.** What a long crumb label does. Currently `nowrap` with no max-width, so it pushes the trail wide. | `breadcrumbs/breadcrumbs.md` |
| 11 | **Breadcrumb focus.** A row of buttons with no focus variant in the set. | `breadcrumbs/breadcrumbs.md` |
| 12 | **Indeterminate inside a checkbox group.** The group exposes only `checked` as a boolean. | `checkbox/checkbox.md` |
| 13 | **Banner responsive behaviour.** Read at a fixed 800 wide; nothing says what happens when actions and message compete. | `banner/banner.md` |
| 14 | **Button pressed state.** No node, and no button-specific pressed token. | `button/button.md` |
| 19 | **`.grep-divider--thin` (0.5px) has no assigned use** under the three-tier line-weight rule. Either it's for something not yet built, or it should come out of the Figma component. | `divider/divider.md` |
| 24 | **Stepper** is used by Item Row but doesn't exist in the library yet. *(Keyboard Shortcut and Toggle now built.)* | `item-block/item-block.md` |
| 42 | **Tooltips beside their trigger.** The tail set is top and bottom only — no left or right tail — so a tooltip placed to the side of its trigger has nothing to point with. Positioning, delay, dismissal, motion and a max width are all unspecified too. | `tooltip/tooltip.md` |
| 38 | **Toast placement, stacking, timing and motion.** The component says nothing about where toasts appear, how they queue, how long they last, or how they enter and leave. The spinner's rotation is inferred from Button. | `toast/toast.md` |
| 36 | **Tab overflow and disabled.** No disabled variant, and nothing says what a row longer than its container does — scroll, wrap or collapse. | `tabs/tabs.md` |
| 32 | **The open list for a select.** Neither Select nor Multi Select includes the menu that opens, or a state for the field while it's open. Context Menu is the nearest shell. | `select/select.md` |
| 33 | **Multi select overflow.** Nothing says how many badges show before the `14+` count appears, or what a single long label does. | `select/select.md` |
| 18 | **File tree keyboard traversal and item focus.** | `file-tree-menu/file-tree-menu.md` |
