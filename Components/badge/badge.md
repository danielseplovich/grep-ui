# Badge

A small pill or chip carrying a status, a category or a removable selection. For an interactive control use **Button**; for a count-only mark use the avatar's badge slot.

Source: Figma `Grep UI / Badge Base`. Read: **Neutral Base** at Full (`589:601`) and Rounded (`589:605`), **Neutral Dim** at Full (`704:2931`) and Rounded (`704:2935`).

## Anatomy

```
( [icon 12]  Label  [× 12] )   height 22, min-width 22, gap 4
```

Height is fixed at 22 and vertical padding is 0 — the label centres itself. Both icons are optional. `min-width: 22` keeps a single-character badge from collapsing into an oval.

## Markup

```html
<span class="grep-badge grep-badge--neutral-base grep-badge--full">
  <svg class="grep-badge__icon" aria-hidden="true">…</svg>
  <span class="grep-badge__label">Label</span>
</span>

<!-- removable -->
<span class="grep-badge grep-badge--brand grep-badge--rounded">
  <span class="grep-badge__label">Label</span>
  <button class="grep-badge__close" aria-label="Remove">…</button>
</span>
```

The close mark is `badge-close.svg`, the exported Close-X asset. Figma bakes `opacity-dim` into the layer; the CSS applies it instead, so the exported file here has that opacity stripped — don't re-add it.

## Sizes

| Class | Height / min-width | Padding X | Gap | Text | Leading icon | Close |
|---|---|---|---|---|---|---|
| `--16` (XS) | 16 | 6 | 3 | `text-2xs` 10 | 8 | 10 |
| `--18` (SM) | 18 | 6 | 4 | `text-xs` 11 | 10 | 10 |
| *(default)* `--22` (Base) | 22 | 8 (full) / 6 (rounded) | 4 | `text-base` 13 | 12 | 12 |

Read off the Badge Base instances inside Select and Multi Select Input. Below Base the close mark stays 10 — it does **not** follow the leading icon down. Tone is independent of size.

Where each one shows up: 16 in Label, 18 in Segmented Control and in a size-28 Multi Select, 22 standalone and in a size-32 Multi Select.

## Radius

| Class | Radius | Padding X |
|---|---|---|
| `--full` | `radius-full` | 8 |
| `--rounded` | `radius-6` | 6 |

**Radius and horizontal padding move together** — they're one axis in Figma, not two. Don't mix a rounded radius with the full padding.

## Tones

Neutral tones were read from Figma:

| Class | Background | Border | Text | Icon |
|---|---|---|---|---|
| `--neutral-base` | `button-neutral-background` | `border-base` | `foreground-text-base` | `foreground-icon-subtle` |
| `--neutral-dim` | `background-contrast` | `border-base` | `foreground-text-dim` | `foreground-icon-dim` |

Accent tones, each using all three of its own variables:

`--brand` · `--success` · `--warning` · `--destructive` · `--indigo` · `--fuschia` · `--orange` · `--blue` · `--cyan` · `--teal`

- Status meaning: brand = new or featured, success, warning, destructive = error or failed. The rest are **categories** (file types, tags, teams) with no status meaning.
- Note the spelling `fuschia` — that's the variable name, so the class matches it.
- Icon and label share the tone's foreground. Never mix a background from one tone with a border or foreground from another.

## Composition

- In a settings item block or table cell, a badge sits inline with the row's text, not on its own line.
- Don't use a badge tone as a surface, a banner or a button fill.
- Removable badges (with the close mark) belong in filter bars and token inputs, not in status columns.

## Inferred — correct these against Figma

1. **The accent tone mapping.** Only the two neutral tones were read from nodes. Each accent class binds the `--badge-<tone>-*` triplet to the matching `color` prop name — the values are Figma variables, but *that* binding is assumed, as is the assumption that accent tones share the neutrals' geometry. Worth verifying against one accent node.
2. **Close mark as a `<button>`.** Figma shows a 12px layer; making it focusable is mine.
3. **Composition rules** above are mine — no layout node was read.

## Not covered — needs nodes

- **Rounded at 16 and 18.** The smaller sizes were only ever read at `Full`. Their padding under `--rounded` is assumed to stay 6.
- **A 20-high badge** appears inside Select Input's Badge Fill state (px 8, gap 4, 13px text, 12px icon) — off the 16 / 18 / 22 ramp. See `CONTRADICTIONS.md`.
- **States.** No hover, selected or disabled variant was exposed, including for the close mark.

## Corrections applied to DESIGN.md

- Typography said badge text is `--text-sm` (12px, inferred). It's `--text-base` (13px) at weight 500.
- The spacing density note said "badge padding 2/6". It's `0/8` at Full and `0/6` at Rounded, with height fixed at 22.
- The Badges section listed ten tones. There are twelve — the two neutrals weren't in the token export as `badge-*`, so they were invisible to a token-only read.
