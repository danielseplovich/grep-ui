# Tooltip

A small floating panel that explains the thing under the pointer.

Source: Figma `Tooltip Base` (`6035:109682`) — type × arrow placement, all 21 combinations read.

## Shell

| | |
|---|---|
| Padding | 6 vertical, 8 horizontal |
| Radius | 8 |
| Fill | `background-component` |
| Hairline | 0.5px `border-base`, as an inset ring |
| Elevation | `Grep UI/Card/base`, as a **drop-shadow filter** |

One thing here breaks the usual house rule, deliberately: the elevation is a **`filter: drop-shadow()`, not a `box-shadow`**. It has to trace the silhouette *including the tail*, which is a separate element sticking out of the box; a box-shadow would draw a rectangle behind a pointed shape. The hairline stays an inset ring — an inset shadow doesn't change the silhouette, so the filter is unaffected, and a real 0.5px border rounds up to 1px in Chrome and pushes the tail off by a pixel.

Figma binds the radius to `Spacing/space-8` rather than a radius token — the same slip as the button's radius. See `CONTRADICTIONS.md`.

## Types

| Type | Content |
|---|---|
| Sentence | `__text` — 12/400 at 1.4, `foreground-text-subtle`; wraps to as many lines as it needs |
| Keyboard Shortcut | `__shortcut` — a 12/400 label, gap 8, then keys |
| Breadcrumbs | a **Breadcrumbs** trail in its Simplified type |

Figma marks the breadcrumb's Simplified type "only used in tooltip applications", so this is its one home. Nothing is restyled — the trail goes in as-is.

The shortcut's keys sit **3** apart. The Item Row reads 4 for the same group; logged in `CONTRADICTIONS.md`.

## Markup

```html
<div class="grep-tooltip grep-tooltip--top grep-tooltip--left" role="tooltip">
  <p class="grep-tooltip__text">This is some tooltip that spans two or more lines
     and contains information that helps the user.</p>
  <span class="grep-tooltip__tail">…tooltip-tail.svg…</span>
</div>

<!-- keyboard shortcut -->
<div class="grep-tooltip grep-tooltip--bottom grep-tooltip--middle" role="tooltip">
  <span class="grep-tooltip__shortcut">
    <span class="grep-tooltip__shortcut-label">Label</span>
    <span class="grep-tooltip__keys">
      <span class="grep-kbd grep-kbd--icon">…</span>
    </span>
  </span>
  <span class="grep-tooltip__tail">…</span>
</div>
```

## Tail placement

Two axes — which edge the tail leaves from, and where along that edge:

| | Class | Offset |
|---|---|---|
| Edge | `--top` / `--bottom` | sits 7.672 outside the box |
| Along | `--left` | **12** from the left |
| | `--right` | **8** from the right |
| | `--middle` | centred |
| No tail | *(omit both, and the tail element)* | — |

The side offsets are asymmetric — 12 left, 8 right — read that way across every variant. Logged in `CONTRADICTIONS.md`.

The tail is 28 long and protrudes 7.672. One asset serves all four orientations: the shape is symmetric, so the CSS just rotates it ±90°.

**No Arrow** is not a fallback — Figma's note: *"Use the No Arrow variant when there isn't enough vertical spacing to use a Top or Bottom variant."*

## Not covered

- **Left and right tails.** The set has top and bottom only, so a tooltip beside its trigger has no tail.
- **Positioning, delay, dismissal and motion.** Nothing in the component says how a tooltip finds its trigger, when it opens, or how long it waits.
- **A max width.** The sentence variant is hug-width with a hard-wrapped two-line example; nothing defines where it should break on its own.
