# Radio

Two components: **Radio Base** (the control) and **Radio Group** (control + label, optionally in a card).

Source: Figma `Grep UI / Radio Base` (`722:12282`) — selected × 4 states — and `Grep UI / Radio Group` (`614:800`) — card × checked × 4 states. Both read in full.

## It mirrors Checkbox exactly

Same 16px hit area holding a 14px control with a **1px** border. Same group: gap 12, label gap 2, card padding 12 / `radius-8`, hover thickens the hairline 0.5 → 1px, disabled at `opacity-disabled`. The only structural difference is the control's shape and fill.

| | Unchecked | Checked |
|---|---|---|
| Default | `background-component`, `border-base`, `--elevation-interactive` | `foreground-brand` disc, white 4px centre, no hairline, no inner shadow |
| Hover | border → `border-brand` + `background-overlay-hover-subtle` | fill → `foreground-brand-hover` |
| Focused | small focus ring | small focus ring |
| Disabled | `opacity-disabled` | `opacity-disabled` |

## Two designer notes, both honoured

**"On hover, border changes from 0.5px to 1px width."** — the card, matching the checkbox card.

**"Disable pointer events for this radio — the card itself owns the hover state here."** — in card mode the control must *not* react on its own, or you get two overlapping hovers. The CSS sets `pointer-events: none` on `.grep-radio` inside a card.

## A new named effect style

`Grep UI/Card/focus` appears here for the first time: the card shadow with the large ring stacked on top. Added to `effects.css` as **`--elevation-card-focus`**, and it's exactly what the checkbox card was composing by hand — that component should move to it.

## Markup

```html
<button class="grep-radio-group grep-radio-group--card" role="radio" aria-checked="true">
  <span class="grep-radio grep-radio--checked"><span class="grep-radio__dot"></span></span>
  <span class="grep-radio-group__label">
    <span class="grep-radio-group__title">Label</span>
    <p class="grep-radio-group__sublabel">This is some sublabel.</p>
  </span>
</button>
```

The checked disc is drawn in CSS (a `::after` circle), not an asset — Figma flattens the selected states to images, but the geometry is a 4px white dot centred on a 14px brand circle.

## Inferred — needs nodes

1. **The checked disc's centre size.** Figma ships the selected states as flattened images; 4px is measured from them, not read from a layer.
2. **Semantics.** `role="radio"` / `aria-checked` and the whole group being the click target are mine.
3. **A radio *set*.** Nothing specifies the spacing between sibling radios in a group.
