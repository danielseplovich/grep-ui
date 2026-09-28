# Checkbox

Two components: **Checkbox Base** (the control) and **Checkbox Group** (control + label, optionally in a card).

Source: Figma `Grep UI / Checkbox Base` (`2629:3277`) — 3 selected values × 4 states — and `Grep UI / Checkbox Group` (`1718:26419`) — card × checked × 4 states. Both read in full.

## Anatomy

```
[16 hit area]   Label
  └ 14 box      Sublabel                    [badge]
      ↑ gap 12 ──────────────────────────────┘
```

The control is a **14px box inside a 16px hit area**, so rows align on a 16 grid while the box stays 14. Group gap 12, label-to-sublabel gap 2.

## Markup

```html
<button class="grep-checkbox-group" role="checkbox" aria-checked="false">
  <span class="grep-checkbox">
    <span class="grep-checkbox__box">
      <svg class="grep-checkbox__mark grep-checkbox__mark--check">…</svg>
      <svg class="grep-checkbox__mark grep-checkbox__mark--minus">…</svg>
    </span>
  </span>
  <span class="grep-checkbox-group__label">
    <span class="grep-checkbox-group__title">Label</span>
    <p class="grep-checkbox-group__sublabel">This is some sublabel.</p>
  </span>
  <span class="grep-checkbox-group__badge"><!-- .grep-badge --></span>
</button>
```

Both marks are always present; the selected class reveals one. The control can also stand alone as `.grep-checkbox` without the group.

## Control states

| Selected | Default | Hover | Focused | Disabled |
|---|---|---|---|---|
| unchecked | `background-component`, `border-base`, inset shadow | border → `border-brand`, `background-overlay-hover-subtle` layered on | small focus ring | 0.5 opacity |
| checked | `foreground-brand` fill, `border-brand`, white check | fill → `foreground-brand-hover` | small focus ring | 0.5 opacity |
| indeterminate | same as checked, minus mark | fill → `foreground-brand-hover` | small focus ring | 0.5 opacity |

The border is **1px**, not the system's default 0.5 — checkboxes, radios and toggles boost it for visibility, which `DESIGN.md` already states.

## Group and card

Without `--card` the group is just control + label + optional badge. With `--card` it gains padding 12, `radius-8`, a 0.5px hairline, `background-component` and `--elevation-card`.

- **Card hover thickens the border to 1px.** That's the only change — no overlay, no shadow change.
- **Card focus uses the large ring** (`--elevation-focus-ring`), not the control's small one, stacked on top of the card shadow.
- Disabled drops the whole group to `opacity-disabled`.

## Two focus rings

This component is where the system's second focus ring shows up:

| Style | Geometry | Used by |
|---|---|---|
| `--elevation-interactive-focus` | 1px canvas gap + 2px brand | checkbox, and presumably radio / toggle / field |
| `--elevation-focus-ring` | 2px canvas gap + 4px brand | button, card |

Small controls take the tight ring; anything button-sized takes the large one. Both now live in `grepmd/effects.css`.

## Inferred — correct these against Figma

1. **Which ring other small controls take.** Only the checkbox was read. Radio, toggle and text field are assumed to share `--elevation-interactive-focus`.
2. **Semantics.** `role="checkbox"` / `aria-checked`, and making the whole group the click target, are mine.
3. **The badge is a slot.** Figma nests a Badge Base instance; treating it as a slot matches the rest of the library.
4. **Standalone control.** The group is the read component; using `.grep-checkbox` on its own is a reasonable extension but no node shows it bare in a layout.

## Not covered — needs nodes

- **Indeterminate inside the group.** The group exposes only `checked` as a boolean, so an indeterminate group row isn't specified.
- **Card + indeterminate**, same reason.
- **Multi-line sublabels.** The read node is a fixed 473 wide with `whitespace-nowrap` on the label; wrapping behaviour is unspecified.

## Corrections applied to DESIGN.md

- The Focus section documented only the button ring and called it *the* focus treatment. There are two, and small controls use the tighter one.
- Elevation now points at `grepmd/effects.css`, which holds every named effect style in one place — components no longer declare their own.

## A note on the Disabled card shadow

Figma's `State=Disabled, Card=True` variants use `0 1px 2px 0` for the first shadow layer where every other card variant uses `0 1px 2px -1px`. That reads as a slip rather than intent, so the CSS uses `--elevation-card` throughout. **Worth checking.**
