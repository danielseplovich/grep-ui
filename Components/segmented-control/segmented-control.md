# Segmented Control

A track of 2–4 mutually exclusive segments.

Source: Figma `Grep UI / Segmented Control Base` (`1607:5202`) — size × type × 3 states — and `Segmented Control` (`1607:5391`) — size × type × option count. Both read in full.

## Track

| | Base (28) | LG (32) |
|---|---|---|
| Radius | `radius-6` | `radius-8` |
| Fill | `background-contrast` | same |
| Hairline | 0.5px `border-subtle` | same |
| Gap between segments | 1 | 1 |

**The track has no padding.** Segments sit flush to its edge, so the track's height equals a segment's and their radii match. The hairline is drawn as an inset ring for that reason — a real border would push the segments in by a pixel.

## Segment

| | Base (28) | LG (32) |
|---|---|---|
| Text | h28, padding-x 8, `radius-6` | h32, padding-x 10, `radius-8` |
| Icon only | padding 7 (→ 28 square) | padding 9 (→ 32 square) |
| Gap | 6 | 6 |
| Label | 13/500 `label-base-bold` | same |

Icon is always 14, so the icon-only segment is just even padding around it.

## States

| State | Label colour | Chrome |
|---|---|---|
| Default | `foreground-text-dim` | none |
| Hover | `foreground-text-subtle` | none |
| Selected | `foreground-text-base` | `button-neutral-background`, 0.5px `border-base`, `--elevation-button` |

Hover only shifts the ink — no fill, no overlay. Selection is the only thing that draws a surface.

## Options

Figma exposes `prop3rdOption` and `prop4thOption` as conditional visibility, with a note: *"3rd and 4th options — aka to have a segmented control with a total of 3 controls and 4 controls respectively."* So the component supports **2 to 4 segments**. In CSS they're just children.

## Markup

```html
<div class="grep-segmented" role="tablist">
  <button class="grep-segment grep-segment--selected" role="tab" aria-selected="true">
    <svg class="grep-segment__icon">…</svg>Label
  </button>
  <button class="grep-segment" role="tab" aria-selected="false">
    <svg class="grep-segment__icon">…</svg>Label
  </button>
</div>
```

## The badge

`.grep-segment__badge` is a **Badge SM (18)** in the Neutral Base tone — 18 high, padding-x 6, gap 4, 11px text, 10px icon. The size ramp has since been confirmed from Figma (16 / 18 / 22), so `.grep-badge--18 .grep-badge--neutral-base .grep-badge--full` renders the same thing; the local class stays so a segment doesn't depend on Badge.

## Inferred — needs nodes

1. **Focus.** No focus variant in the set; a segmented control is keyboard-navigable and should have one.
2. **Disabled.** Not in the set.
3. **Semantics.** `role="tablist"` / `role="tab"` are mine — a segmented control can be tabs or a radio group depending on use.
