# grep UI — start here

The design system for **Shade**. This folder is the library itself: real CSS compiled from the Figma component set, plus a spec per component. Grep UI is migrating from plain CSS to React components; until a component's React version exists, use its classes. You do not need to design anything — assemble what's here.

**Read this file in full. Open anything else only when you need it.**

## Setup

```html
<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="grepmd/grep-ui.css">
```

`grep-ui.css` imports the tokens, the effect styles and every component. That one line is the whole library.

Light is default; dark is `data-theme="dark"` on `<html>`. Every token has both values — never hand-write a dark palette.

For a throwaway page, copy `grepmd/_prototype-template.html`, which has all of this wired up.

## The five rules

1. **Use the classes below.** If a component exists, use it; don't rebuild it from tokens.
2. **Never write a raw value.** No hex, no px font sizes, no arbitrary spacing or radii. Only `var(--token)`. If you can't say it in tokens, it's off-system.
3. **Semantic tokens only** — `background-*`, `foreground-*`, `border-*`, `button-*`, `badge-*`. Primitives (`--purple-500`) are a last resort and never for neutrals.
4. **If the component you need doesn't exist, stop and say so.** Don't improvise one. The gaps are real and tracked.
5. **Check `grepmd/CONTRADICTIONS.md` before trusting an edge case.** If your question is on that list, ask rather than pick.

## The look, in one paragraph

Quiet, dense, neutral. Chrome is nearly white (dark: nearly black), built from surfaces that differ by a few percent of lightness. Hierarchy comes from surface steps, 0.5px hairlines and translucent ink — not shadows or color. Type is small: 13px body in Inter at weights 440–500. Purple `#855CF8` is the one brand color, used sparingly for primary actions, selection, progress and focus. Most screens are 95% neutral.

## Don'ts

The ways generated UI drifts off-brand. Check your output against every one.

1. **No pure black or white neutrals.** Text is ink at 96%. Surfaces are `#FCFCFC` / `#FEFEFE` — only fields and neutral buttons are `#FFFFFF`.
2. **No generic gray ramps** (`gray-*`, `zinc-*`, `slate-*`). Grep has none.
3. **No 1px borders at rest.** 0.5px is the default. 1px means hover, or a toggle/checkbox/radio.
4. **No 14–16px body text.** Body is 13. Nothing is above 20.
5. **No font-weight 600/700.** Max is 500; labels are 440.
6. **No purple everywhere.**
7. **No solid hover colors.** Hover, pressed and selected are overlay tokens layered on the base fill.
8. **No shadows on cards.** Border and surface step. Shadows are for floating layers only.
9. **No badge tones as surfaces**, no `background-accent-*` as a button or panel fill.
10. **No hand-made dark mode.** Switch `data-theme` and let the tokens swap.
11. **No gradients, glows or decorative washes.**

## Hairlines

A component's own edge is drawn as an **inset ring**, not a border:

```css
box-shadow: inset 0 0 0 0.5px var(--border-base);
```

A CSS border eats the padding box; a Figma stroke doesn't. Using `border` makes fixed-size components render a pixel small.

## Line weights

| Line | Weight | Token |
|---|---|---|
| Major app section divider (sidebar ↔ content) | 1px | `border-base` |
| Component edge (card, button, input, menu) | 0.5px | `border-base` |
| Section divider inside a component | 1px | `border-subtle` |

## Focus

Three ring sizes. Don't mix them up:

| Ring | Geometry | Used by |
|---|---|---|
| `--elevation-interactive-focus` | 1px canvas gap + 2px brand | checkbox, radio, toggle |
| `--elevation-input-focus` | 1px gap + 2.5px brand | inputs, search, select |
| `--elevation-focus-ring` / `--elevation-button-focus` | 2px gap + 4px brand | buttons, tabs, cards |

## Components

Every entry has a spec at `Components/<name>/<name>.md` and a live preview at `<name>.preview.html`. **Open the spec only for the component you're using** — they're detailed, and loading all of them buries these rules.

| Component | Classes |
|---|---|
| Button | `.grep-btn`, `--brand` `--neutral` `--inverted` `--danger` |
| Icon Button | `.grep-icon-btn`, `--16`…`--40`, `--primary` `--neutral` `--inverted` `--danger` `--ghost` |
| Avatar / Tile | `.grep-avatar`, `--icon-tile`, `--12`…`--40`, `--full`, `--interactive` |
| Badge | `.grep-badge`, `--16` `--18` `--22`, `--full` `--rounded`, `--neutral-base` `--neutral-dim` + 10 accent tones |
| Breadcrumbs | `.grep-breadcrumbs`, `.grep-crumb`, `--folder` `--icon` `--icon-only` `--simplified`, `--active` |
| Banner | `.grep-banner`, `--info` `--success` `--warning` `--danger` |
| Progress Bar | `.grep-progress`, `--brand` `--success` `--warning` `--danger` |
| Checkbox | `.grep-checkbox`, `--checked` `--indeterminate`; `.grep-checkbox-group`, `--card` |
| Radio | `.grep-radio`, `--checked`; `.grep-radio-group`, `--card` |
| Toggle | `.grep-toggle`, `--md` `--on`; `.grep-toggle-group`, `--card` |
| Label | `.grep-label`, `--lg` `--bold` `--path` `--sub-sm` `--sub-xs` `--sub-subtle` |
| Input | `.grep-input`, `--32`, `__field` `__control` `__addon` `__rule` `__unit` `__inset`, `--error` `--disabled` |
| Search | `.grep-search`, `--32` `--ghost` `--danger` |
| Select / Multi Select | `.grep-select` inside `.grep-input__field`; `__value` `__fill` `__chevron` |
| Segmented Control | `.grep-segmented`, `--32`; `.grep-segment`, `--selected` `--icon` |
| Tabs | `.grep-tabs`; `.grep-tab`, `--32` `--36` `--full` `--selected` |
| Item Block | `.grep-item-block`, `.grep-item-row`, `--open` `--interactive`, `__tile` `__label-frame` `__chevron` `__rule` |
| Context Menu | `.grep-menu`, `__section` `__header` `__item` `__rule`, `--danger` |
| File Tree Menu | `.grep-tree-menu`, `.grep-tree-item`, `--selected` `--collapsed` |
| Modal ⚠️ | `.grep-modal-overlay`; `.grep-modal`, `--520`; `__header` `__body` `__footer` |
| Toast | `.grep-toast`, `__main` `__content` `__icon` `__text` `__actions` `__link` |
| Tooltip | `.grep-tooltip`, `--top` `--bottom` `--left` `--middle` `--right`; `__text` `__shortcut` `__tail` |
| Keyboard Shortcut | `.grep-kbd`, `--lg`, `--label` `--letter` `--number` `--icon`; `.grep-kbd-group` |
| Dividing Line | `.grep-divider`, `--vertical` `--subtle` `--thin` |

⚠️ **Modal has no Figma node** — it was derived from the system's own conventions. Everything else was read from Figma. Treat it as a proposal.

## Not in the library yet

**Stepper**, **Table**, **Pagination**, **Date picker**, **Sidebar / nav shell**, **Empty state**, **Skeleton / loading**, **Popover**, **Accordion**, **Slider**. If a screen needs one of these, say so rather than inventing it.

## Where things live

| Path | What |
|---|---|
| `grepmd/grep-ui.css` | the single import |
| `grepmd/tokens.css` | every semantic and primitive token, light + dark |
| `grepmd/effects.css` | named Figma effect styles — all shadows and focus rings |
| `grepmd/DESIGN.md` | the full system: token tables, usage notes, the reasoning |
| `grepmd/RULES.md` | hand-made decisions that outrank anything marked *(inferred)* |
| `grepmd/CONTRADICTIONS.md` | open questions and partial reads — check before edge cases |
| `grepmd/_prototype-template.html` | starter page, everything wired |
| `Components/<name>/` | spec, CSS, preview and assets per component |

**Precedence when two things disagree:** Figma → the component spec → `RULES.md` → `DESIGN.md` → anything marked *(inferred)*.
