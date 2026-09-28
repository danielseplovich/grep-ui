# Select / Multi Select

A field that opens a list instead of taking typed text.

Source: Figma `Select Input` (`4576:17709`) — size × state, 7 states — and `Multi Select Input` (`4533:74514`) — size × state, 5 states. Both read in full.

## It's the Input field

The shell is not a new component. Fill, hairline, radius, shadow, height, padding, hover, focus and disabled are all identical to Input, so a select **reuses `.grep-input`** — its wrapper, label, sublabel, field container, field and help text — and this file only adds what goes inside.

| | Base (28) | LG (32) |
|---|---|---|
| Height | 28 | 32 |
| Padding X | 8 | 10 |
| Radius | `radius-6` | `radius-6` |
| Gap (value → chevron) | 16 | 16 |

Fill `background-field`, 0.5px `border-base`, `--elevation-input`. Hover thickens the hairline to 1px. Focus keeps 0.5px and adds `--elevation-input-focus` (1px canvas gap + 2.5px brand). Disabled is `opacity-disabled`. All inherited — don't restate them.

## Markup

```html
<div class="grep-input">
  <div class="grep-input__label">
    <div class="grep-input__label-row">Select</div>
    <p class="grep-input__sublabel">This is some sublabel.</p>
  </div>
  <div class="grep-input__field-container">
    <button class="grep-input__field grep-select" aria-haspopup="listbox" aria-expanded="false">
      <span class="grep-select__value grep-select__value--placeholder">Select…</span>
      <svg class="grep-select__chevron" aria-hidden="true">…</svg>
    </button>
    <p class="grep-input__help">This is some help text.</p>
  </div>
</div>
```

Size with `grep-input--32`, disable with `grep-input--disabled`. The chevron is `select-chevron.svg` (`foreground-icon-dim`); it points down whether the list is open or closed — Figma has no flipped variant.

## Fills

Whatever sits in the value slot, it's a `1 0 0` flex child, so the chevron never moves.

| Fill | What goes in | Class |
|---|---|---|
| Empty | placeholder, `foreground-text-faint` | `__value--placeholder` |
| Text | the value, `foreground-text-base` | `__value` |
| Badge | one badge | `__fill` |
| Object | a 14 avatar + a name | `__fill` > `__object` |
| Multi | a row of badges | `__fill` |

```html
<!-- object -->
<span class="grep-select__fill">
  <span class="grep-select__object">
    <span class="grep-select__object-visual">
      <span class="grep-avatar grep-avatar--14">…</span>
    </span>
    <span class="grep-select__object-label">Mountain Ad</span>
  </span>
</span>

<!-- multi select -->
<span class="grep-select__fill">
  <span class="grep-badge grep-badge--18 grep-badge--orange grep-badge--full">Label</span>
  <span class="grep-badge grep-badge--18 grep-badge--blue grep-badge--full">Label</span>
  <span class="grep-badge grep-badge--18 grep-badge--neutral-dim grep-badge--full">14+</span>
</span>
```

**Badge size follows field size**: a 28 field takes `--18` badges with gap 6, a 32 field takes `--22` badges with gap 8. The gap is handled by `.grep-input--32 .grep-select__fill` — you only pick the badge size.

The overflow count is the last badge, `--neutral-dim`, reading `14+`. Selected badges in a multi select carry no close mark in the field — removal happens in the open list.

## Not covered

- **The list itself.** Neither node includes the open menu. Context Menu is the nearest shell.
- **Selected / open state.** No variant shows the field while its list is open.
- **Overflow rules.** Nothing says how many badges show before the `14+` badge appears, or what a single long label does.
