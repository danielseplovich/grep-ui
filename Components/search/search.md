# Search

A search field with an icon and an optional keyboard shortcut. Two types, two sizes, six states — all read.

Source: Figma `Grep UI / Search` (`6669:82681`), read in full.

## Axes

| Axis | Values | Class |
|---|---|---|
| type | Field / Ghost | *(none)* / `--ghost` |
| size | Base (28) / LG (32) | *(none)* / `--32` |
| state | Empty, Hover, Focused, Filled, Danger | *(none)* / `--danger`, plus `:hover` / `:focus-within` |

Both sizes: `radius-6`, gap 12, icon 14, text 13/440. Base is h28 / padding-x 8; LG is h32 / padding-x 10 — the same step the Input uses.

**Ghost** drops the fill and the hairline entirely. The LG ghost keeps a faint drop shadow (`0 1px 1px`, `0 1px 0.5px` of `shadow-ink-4`) — slightly different geometry from `--elevation-input`, so it's applied as a filter rather than reusing the token.

## States

| State | How |
|---|---|
| Empty | placeholder in `foreground-text-faint` |
| Hover | hairline 0.5 → 1px — Figma annotates it |
| Focused | `--elevation-input-focus` |
| Filled | value in `foreground-text-base` |
| Danger | `--elevation-input-focus-danger` |

## The third focus ring

This component is where `Grep UI/Input/focus` and `Input/focus-danger` first appear as **named effect styles** — and they're a third ring size:

| Style | Geometry |
|---|---|
| `--elevation-interactive-focus` | 1px gap + 2px brand |
| `--elevation-input-focus` | **1px gap + 2.5px** brand |
| `--elevation-focus-ring` / `--elevation-card-focus` | 2px gap + 4px brand |

Fields get the 2.5px ring; small controls the 2px; buttons and cards the 4px. `input.css` now uses these too — its focus and error were previously built from precedent and are now read.

## Markup

```html
<div class="grep-search">
  <span class="grep-search__label">
    <svg class="grep-search__icon">…</svg>
    <input class="grep-search__input" placeholder="Search...">
  </span>
  <span class="grep-search__shortcut">
    <span class="grep-kbd grep-kbd--icon"><svg class="grep-kbd__icon">…</svg></span>
    <span class="grep-kbd grep-kbd--letter"><span>F</span></span>
  </span>
</div>
```

The shortcut reuses the Keyboard Shortcut component.

## Inferred — needs nodes

1. **Disabled.** Not in the state set.
2. **A clear button.** None in the component, though a filled search usually wants one.
