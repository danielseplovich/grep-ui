# Keyboard Shortcut

A single key cap. Combine them into a combo with `.grep-kbd-group`.

Source: Figma `Grep UI / Keyboard Shortcut Base` (`160:272`) — both sizes × all four types, read in full.

## Sizes and types

| | Letter / Number / Icon | Label |
|---|---|---|
| **Default** | 16 × 16 square, `radius-4`, no padding | h16, padding-x 4, `radius-4` |
| **`--lg`** | 20 × 20 square, `radius-5`, no padding | h20, padding-x 5, `radius-5` |

Type sets the shape: Letter, Number and Icon are **squares**; only Label is a pill that grows with its text.

Text is mono — `code-label-xs-reg` (11/400) at default, `code-label-base-reg` (13/400) at `--lg`. Fill is `background-contrast-strong`.

**`--lg` is for Settings pages only.** Figma states that on the component itself.

## Everything inside uses the icon token

Figma annotates this explicitly: *"These use an icon style aka `foreground/icon/subtle` for all content inside of the keyboard shortcut base component. Even though we have text as an option here, we use an icon token since they should be consistent."*

So the letter `K` in a key cap is `foreground-icon-subtle`, **not** a text token. Don't 'fix' this to a text colour.

## Markup

```html
<span class="grep-kbd-group">
  <span class="grep-kbd grep-kbd--icon"><svg class="grep-kbd__icon">…</svg></span>
  <span class="grep-kbd grep-kbd--letter"><span>K</span></span>
</span>

<span class="grep-kbd grep-kbd--label">shift</span>
```

The letter type wraps its character in a span so the fixed centring box applies — 10px at default, 20px at `--lg`.

## Assets

`keyboard-shortcut-icon-16.svg` and `-20.svg` are the exported modifier glyphs at each size, in `currentColor`.

## Inferred — needs nodes

1. **The group gap (4).** Read from the Item Row's usage of a modifier + key combo, not from a group component of its own.
2. **States.** No hover, pressed or disabled variant in the set — reasonable for a display-only element, but a shortcut shown inside a pressed menu item may need one.
