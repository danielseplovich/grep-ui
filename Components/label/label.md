# Label

A label with an optional sublabel, plus five optional adornments. **This is the block already embedded in Input, Checkbox Group, Item Row and Banner** — those components should use it rather than restating its typography.

Source: Figma `Grep UI / Label` (`1491:47479`), read in full across `size` × `type` × `labelWeight` × `sublabelColor` and all five booleans.

## Anatomy

```
[icon 14]  Label  (Optional)  [ⓘ 14]   [badge]
           └──── gap 4 ────┘
└───────────────── gap 6 ─────────────────┘
This is some sublabel.
```

**Two gaps, deliberately.** The row is 6px; the inner group is 4px. Figma annotates it: *"All of these internal frames have a gap of 4px even though the rest of the container has 6px — because the main label, optional, and info icon should be closer together if they are visible."* The leading icon and the badge sit at 6; the label, `(Optional)` and the info icon cluster at 4.

Row height 16, or 18 at `--lg`.

## Axes

| Axis | Figma | Class |
|---|---|---|
| size | Base / LG | *(none)* / `--lg` |
| label weight | Base (440) / Bold (500) | *(none)* / `--bold` |
| sublabel colour | Dim / Subtle | *(none)* / `--sub-subtle` |
| sublabel size | same as label / SM / XS | *(none)* / `--sub-sm` / `--sub-xs` |
| type | Label / Path | *(none)* / `--path` |

Booleans: `leadingIcon`, `optional`, `infoIcon`, `badge`, `sublabel` — all independent, all just children.

**Figma couples some of these** — in the read variants, Bold always pairs with a Subtle sublabel, and Base with Dim. The CSS keeps them independent, which is a superset; stick to the read pairings unless you have a reason not to.

## `--path` turns the sublabel into a file path

`type: Path` swaps the sublabel to **mono** on a fixed-height line: `code-label-sm-reg` (12/400) at 18 high, or `code-label-xs-reg` (11/400) at 17 high with `--sub-xs`. Used for `/Media/Assets/.../ACAM.mov` style secondary text.

## Gap behaviour

The wrapper gap is **2** when the sublabel matches the label's size, and **0** for the SM, XS and Path sublabels — there the sublabel's 1.4 leading supplies the space. Handled by the modifiers; don't set it by hand.

## The badge here is 16 high, not 22

`.grep-label__badge` is a Badge Base at a smaller size than the standalone Badge component: h16, padding-x 6, gap 3, 10px text, 8px icon. Same shape, different scale — evidence that Badge has sizes beyond Base (22).

## Markup

```html
<div class="grep-label">
  <div class="grep-label__row">
    <svg class="grep-label__icon">…</svg>
    <div class="grep-label__group">
      <span class="grep-label__text">Label</span>
      <span class="grep-label__optional">(Optional)</span>
      <svg class="grep-label__info">…</svg>
    </div>
    <span class="grep-label__badge"><svg>…</svg>Label</span>
  </div>
  <p class="grep-label__sublabel">This is some sublabel.</p>
</div>
```

## Inferred — needs nodes

1. **The `sublabelColor: Default` value.** The prop offers Default / Dim / Subtle but only Dim and Subtle appear in the read variants (Default shows up only on the Path + XS combination, where it renders dim).
2. **The SM sublabel's fixed 125px width** in Figma is treated as layout, not a rule — the CSS lets it flow.
3. **Independent axes.** Figma ships specific combinations; the CSS allows all of them.
