# Icon Button

A square button holding a single 14px icon. Seven sizes.

Source: Figma `Grep UI / Icon Button Base` — all seven sizes read at **Type=Primary, State=Default, Radius=Rounded**:
2XS `834:1839` · XS `834:1531` · Small `774:3875` · Base `774:3881` · LG `774:3887` · XL `774:3893` · 2XL `774:3899`.

## Sizes

**The icon is always 14px.** The box grows around it, and **radius doesn't scale linearly** — it steps at 24 and again at 36.

| Class | Box | Icon | Padding | Radius |
|---|---|---|---|---|
| `--16` | 16 | 14 | 1 | `radius-4` |
| `--20` | 20 | 14 | 3 | `radius-4` |
| `--24` | 24 | 14 | 5 | `radius-6` |
| `--28` | 28 | 14 | 7 | `radius-6` |
| `--32` | 32 | 14 | 9 | `radius-6` |
| `--36` | 36 | 14 | 11 | `radius-8` |
| `--40` | 40 | 14 | 13 | `radius-8` |

Omitting a size gives 28, matching the Button's single size. `--full` overrides the radius to a circle.

At `--16` the icon fills all but 1px of the box — that size is for dense chrome only, and a 14px icon inside it has almost no optical breathing room.

## Markup

```html
<button class="grep-icon-btn grep-icon-btn--primary grep-icon-btn--28" aria-label="Add">
  <svg class="grep-icon-btn__icon">…</svg>
  <!-- inline ../button/button-spinner.svg for the loading state -->
</button>
```

An icon button has no label, so `aria-label` is required, not optional.

## Types and states — carried from Button

Only **Primary / Default** was read from Figma. Per Dan's instruction, the icon button takes **the same types and the same states as Button**:

| Type | Fill | Hover |
|---|---|---|
| `--primary` | `button-brand-background` | fill swaps (this is Button's *brand*) |
| `--neutral` | `button-neutral-background` | overlay |
| `--inverted` | `button-contrast-background` | overlay |
| `--danger` | `button-danger-background` | fill swaps |
| `--ghost` | none | overlay `button-ghost-background-hover` |

States: default, hover, focused, loading, disabled — same mechanics as Button. Loading hides the icon and centres the spinner so the box never resizes; disabled is `opacity-disabled`; focus is the large ring, except Ghost which takes the ring without the resting shadow.

Ghost carries no fill, border or shadow at rest — it's for toolbars and dense chrome.

## Naming note

Figma calls this type **Primary**; the Button component calls the same treatment **Brand**. The CSS uses `--primary` here and `--brand` there, matching each component's own Figma naming. Logged as CONTRADICTIONS #20.

## Inferred — needs nodes

1. **Every type except Primary**, and **every state except Default**. Carried from Button by instruction, not read. A single Icon Button node in any other type or state would confirm the whole matrix.
2. **`--full` radius.** The `Radius` axis shows only `Rounded` in the read nodes; Full is assumed to exist as it does on Avatar and Badge.
3. **Ghost's resting icon colour** (`foreground-icon-subtle`) comes from the Button table's ghost row, not from an icon-button node.
