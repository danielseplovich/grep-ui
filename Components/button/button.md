# Button

The standard action control. For navigation that looks like text use **Link Button**; for a square icon-only control use **Icon Button Base**.

Source: Figma `Grep UI / Button` component set. States read directly from Figma: **Loading** (`743:409`), **Focused** (`157:1373`). Everything else is token-derived and marked below.

## Anatomy

```
[ leading icon 14 ]  [ label ]  [ trailing icon 14 ]
                  \__ gap 6 __/
```

Both icons are optional and independent. Height 28, padding 0/8, radius 6, border 0.5px, gap 6. Label is 13px Inter at weight 500, line-height 13.

## Markup

```html
<button class="grep-btn grep-btn--brand">
  <svg class="grep-btn__icon" aria-hidden="true">…</svg>
  <span class="grep-btn__label">Label</span>
  <svg class="grep-btn__icon" aria-hidden="true">…</svg>
  <!-- inline button-spinner.svg here, class="grep-btn__spinner" -->
</button>
```

The spinner SVG (`button-spinner.svg`, the exported `Loading-Circle-Dash` asset) is always present and invisible until loading. Omit either icon freely. When loading, add `data-state="loading"` and `aria-busy="true"`.

## Types

| Class | Fill | Border | Text / icon | Hover |
|---|---|---|---|---|
| `--brand` | `button-brand-background` | `border-brand` | `foreground-text-on-color` | fill swaps to `button-brand-background-hover` |
| `--neutral` | `button-neutral-background` | `border-base` | `foreground-text-base` / `foreground-icon-base` | overlay `button-neutral-background-overlay-hover` |
| `--inverted` | `button-contrast-background` | `button-contrast-border` | `button-contrast-text` / `button-contrast-icon` | overlay `button-contrast-background-overlay-hover` |
| `--danger` | `button-danger-background` | `border-danger` | `foreground-text-on-color` | fill swaps to `button-danger-background-hover` |

Brand and danger **swap** their fill on hover. Neutral and inverted **add an overlay on top of** theirs. Don't mix the two mechanics.

One brand button per view. Inverted is for use on photography, video and colored surfaces, not as a second primary.

## States

| State | How |
|---|---|
| Default | base shadow `0 1px 2px 0 shadow-ink-8` |
| Hover | per type, above |
| Focused | `--elevation-button-focus`: base shadow at spread 1, then a 2px `background-canvas` gap ring, then a 4px brand-at-60% ring. Applied on `:focus-visible` only |
| Loading | icons and label to `opacity-hidden`, 14px spinner centered, button keeps its width, pointer events off |
| Disabled | `opacity-disabled` (0.5) on the whole button plus `cursor: not-allowed`. Never recolor |

Focus and loading both render inside the button's own box, so a button never changes size between states. Don't animate width.

## Composition

- Sits in a **Button Group** when there's more than one; don't hand-space siblings.
- In a dialog or form footer, actions are right-aligned with the brand button last.
- Inside a settings item block, the button is the trailing control — neutral by default, danger only for destructive rows.
- Never put a button inside a badge, a table cell header, or on an accent fill.

## Inferred — correct these against Figma

Everything here was derived from tokens rather than read from a node:

1. **Hover** for all four types. The mechanic is documented in `DESIGN.md`, but no hover node was read.
2. **Disabled** follows the global `opacity-disabled` rule in `DESIGN.md`. If the Figma disabled variant recolors instead, this is wrong.
3. **Neutral, inverted and danger** geometry is assumed identical to brand. Only brand nodes were read.
4. **Spinner motion.** The mark is the real exported asset, but its 12 segments are uniform in Figma. The opacity ramp and the 0.9s `steps(12)` rotation are invented — Figma has no motion spec.
5. **Size.** Only `Base (28)` was read. Other sizes aren't covered.

## Corrections applied to DESIGN.md

All four were written into `DESIGN.md` when this spec was built:

- The buttons table says brand has **no border**. The node has a 0.5px `border-brand` border.
- The typography section says buttons use weight **medium (440)**. The node binds `label-base-bold` at **500**.
- The focus section says there's no focus token and suggests a 2px `border-brand` ring. There is one — `Grep UI/Button/focus` — and it's a three-layer shadow. The inferred guidance should be replaced.
- Figma binds the button's **corner radius to `Spacing/space-6`**, not to a radius token. The value is 6px either way, so the CSS uses `--radius-6`. Worth fixing in the Figma library so radius and spacing don't share a scale — **not yet fixed**.
