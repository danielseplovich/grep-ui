# Tabs (Button Tab)

A row of view switchers sitting directly on the canvas.

Source: Figma `Button Tab Base` (`1607:5653`) — corner × size × state, all 24 combinations — and `Button Tab Group` (`1607:8594`). Both read in full.

**Not a Segmented Control.** A segmented control sits in a filled track with a hairline and picks a *mode*; tabs have no track and switch a *view*. If the row has a background, it's a segmented control.

## Group

`display: flex`, gap 6, nothing else — no track, no padding, no border. Figma's group ships 4 tabs with `5th item` and `6th item` as conditional visibility, so the intended range is **2–6 tabs**.

## Sizes and corners

Padding depends on both axes — a pill needs more room than a rounded tab at the same height.

| | Height | Radius | Padding X (Rounded) | Padding X (Full) |
|---|---|---|---|---|
| Base (28) | 28 | `radius-6` | 8 | 10 |
| LG (32) | 32 | `radius-6` | 10 | 12 |
| XL (36) | 36 | `radius-8` | 12 | 14 |

Gap inside a tab is 6 at every size; the icon is always 14 and the label always `label-base-bold` (13/500). Only the box grows.

## States

| State | Label | Surface |
|---|---|---|
| Default | `foreground-text-dim` | none |
| Hover | `foreground-text-base` | none |
| Selected | `foreground-text-base` | `button-neutral-background`, 0.5px `border-base`, `--elevation-button` |
| Focused | unchanged (dim if unselected) | same surface + `--elevation-button-focus` |

Hover draws no surface at all — the label just comes up to full strength. **Focus is not selection**: a focused unselected tab raises the surface and the ring but keeps its dim label.

The icon runs one step behind the label: `foreground-icon-subtle` (0.56) at default, 0.72 on hover and selected — which is `foreground-text-subtle`, a *text* token. Logged in `CONTRADICTIONS.md`.

## Markup

```html
<div class="grep-tabs" role="tablist">
  <button class="grep-tab grep-tab--selected" role="tab" aria-selected="true">
    <svg class="grep-tab__icon" aria-hidden="true">…</svg>Label
  </button>
  <button class="grep-tab" role="tab" aria-selected="false">
    <svg class="grep-tab__icon" aria-hidden="true">…</svg>Label
    <span class="grep-tab__badge">12</span>
  </button>
</div>
```

Size with `--32` / `--36`, switch shape with `--full`. The badge is a Badge SM (18) in the Neutral Base tone — `.grep-badge--18 .grep-badge--neutral-base .grep-badge--full` renders the same thing.

## Not covered

- **Disabled.** Not in the state set.
- **Overflow.** Nothing says what a long row does — scroll, wrap or collapse.
- See `CONTRADICTIONS.md` for the XL + Full + Selected padding slip.
