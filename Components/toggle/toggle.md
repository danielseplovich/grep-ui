# Toggle

An on/off switch. For a choice the user confirms later, use **Checkbox**; a toggle takes effect immediately.

Source: Figma `Toggle Base` (`727:415`) — selected × size × 4 states, all 16 combinations — and `Toggle Group` (`2631:12154`) — card × selected × 4 states × badge. Both read in full.

**The component exports as a flattened vector**, so there are no layer names or bound variables to read. Everything below came off the exported paths — track rect, thumb circle, strokes, and the two filters — and was then matched back to tokens by value.

## Geometry

| | Small (default) | Medium (`--md`) |
|---|---|---|
| Track | 21 × 12 | 28 × 16 |
| Thumb | 9.6 | 12.8 |
| Inset | 1.2 | 1.6 |
| Radius | `radius-full` | `radius-full` |
| Row height | 16 | 16 |

Everything scales by 4/3, which lands the thumb and its inset on fractional pixels. Those are kept as-is — rounding them to 10/1 visibly shifts the thumb off-centre.

The thumb's travel is whatever the track has left: `track − 2×inset − thumb` (9 small, 12 medium).

## Chrome

- Track fill `background-toggle-off` when off, `button-brand-background` when on.
- **1px border**, `border-base` off and `border-brand` on. 1px at rest is correct here — DESIGN.md allows it for toggles, checkboxes and radios "to boost visibility".
- That border sits **outside** the track in Figma, so the CSS draws it as an outset ring rather than the usual inset hairline. The track's own box has to stay exactly 21 × 12 or the thumb lands wrong.
- Track carries `--elevation-interactive` (the inset recess); the thumb carries `--elevation-card`.

## States

| State | Off | On |
|---|---|---|
| Hover | `background-overlay-hover` over the track | fill deepens to `button-brand-background-hover` |
| Focused | 1px gap + 2px brand ring | same |
| Disabled | `opacity-disabled` | same |

**Focus resolves an open question**: the toggle takes `Grep UI/Interactive/focus` — the small ring, same as checkbox and radio. Because the border is outset by 1px, the CSS draws the same two rings one pixel further out, which is exactly `--elevation-focus-ring` with the border covering its inner pixel.

Motion is not specified in Figma; the thumb transition here is inferred.

## Markup

```html
<button class="grep-toggle grep-toggle--on" role="switch" aria-checked="true">
  <span class="grep-toggle__track"><span class="grep-toggle__thumb"></span></span>
</button>
```

## Group

Same shape as Checkbox Group and Radio Group — control, label block, optional card — with one difference: **the gap is 16, not 12.**

```html
<button class="grep-toggle-group grep-toggle-group--card" role="switch" aria-checked="false">
  <span class="grep-toggle"><span class="grep-toggle__track"><span class="grep-toggle__thumb"></span></span></span>
  <span class="grep-toggle-group__label">
    <span class="grep-toggle-group__title">Label</span>
    <span class="grep-toggle-group__sublabel">This is some sublabel.</span>
  </span>
  <span class="grep-toggle-group__badge">
    <span class="grep-badge grep-badge--neutral-base grep-badge--full">…</span>
  </span>
</button>
```

Card: padding 12, `radius-8`, `background-component`, 0.5px `border-base`, `--elevation-card`. Hover thickens the hairline to 1px (annotated in Figma) and the toggle itself stops taking pointer events — the card owns the hover. Focus swaps in `--elevation-card-focus`.

The optional badge is a standard Badge at 22, centred against the full row height.

## Not covered

- **Icons or labels inside the track** (a check, an "on"/"off" mark). Nothing in the set has them.
- **Pressed state** and thumb motion.
