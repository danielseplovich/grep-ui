# Toast

A transient message in a floating card.

Source: Figma `Toast Base` (`1844:50651`) — type × style × 2nd button, all 15 combinations read.

## Shell

| | |
|---|---|
| Width | 380 (min 380) |
| Padding | **14 top, 14 sides, 16 bottom** |
| Radius | `radius-10` |
| Fill | `background-component` |
| Hairline | 0.5px `border-base` |
| Shadow | `--elevation-card` |

The uneven vertical padding is annotated in Figma — "top padding is 14 px and bottom padding of 16 px for all variants" — so don't normalise it.

## Anatomy

```
[icon 16] ─12─ Label            ─24─  [× 16]
              Message
        ─28 indent─ actions
```

- Icon is **16**, not the system's usual 14 — annotated in Figma.
- Label 13/500 `foreground-text-base`; message 13/400 at 1.4 `foreground-text-subtle`; the pair is a 36-high block, centred against the icon.
- The actions row is indented 28 (16 icon + 12 gap) so it lines up under the label rather than the icon.

## Markup

```html
<div class="grep-toast" role="status" aria-live="polite">
  <div class="grep-toast__main">
    <div class="grep-toast__content">
      <svg class="grep-toast__icon" aria-hidden="true">…</svg>
      <div class="grep-toast__text">
        <div class="grep-toast__label">Label</div>
        <p class="grep-toast__message">The quick brown fox jumps over the lazy dog.</p>
      </div>
    </div>
    <button class="grep-icon-btn grep-icon-btn--16 grep-icon-btn--ghost grep-toast__close" aria-label="Dismiss">
      <svg class="grep-icon-btn__icon">…</svg>
    </button>
  </div>

  <!-- optional -->
  <div class="grep-toast__actions">
    <button class="grep-btn grep-btn--neutral"><span class="grep-btn__label">Label</span></button>
    <button class="grep-btn grep-btn--brand"><span class="grep-btn__label">Label</span></button>
  </div>
</div>
```

The close control is a **ghost Icon Button at 16** and the action buttons are plain **Buttons at 28** — both reused as-is. The only toast-specific bit is `__close`, which dims the glyph to 0.36 — a step below the ghost default. That value is `foreground-text-faint`; the icon ramp has no 0.36. Logged in `CONTRADICTIONS.md`.

## Types

The type only changes the icon. There is no coloured fill, border or accent bar anywhere in the set.

| Type | Glyph |
|---|---|
| Info | info circle |
| Success | check circle |
| Attention | **warning triangle** |
| Warning | **error hexagon** |
| Icon | 16 Loading-Circle-Dash (spinner) |

Note the pairing: *Attention* draws the triangle and *Warning* draws the hexagon — logged in `CONTRADICTIONS.md`.

The triangle and hexagon glyphs overflow their 16 box (17.56 wide and 17.38 tall respectively). `--triangle` and `--hexagon` keep the 16 box and let the leaf bleed by negative margin, exactly as Figma does.

## Styles

| Style | Actions row |
|---|---|
| Message | none |
| Message with Links | one or two `.grep-toast__link` — 13/500 `foreground-text-dim`, no chrome, aligned to the top of the row |
| Message with Buttons | one or two `.grep-btn` at 28, centred; the second is `--brand` |

`prop2ndButton` decides whether the second link or button shows, so the range is 1–2 actions.

## Not covered

- **Stacking, placement and timing.** Nothing in the component says where toasts sit, how they queue, or how long they last.
- **Enter and exit motion.** The spinner's rotation is also inferred.
- **Hover, focus and dismissal states** for the toast as a whole.
