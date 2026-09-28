# Banner

A full-width notice with a leading tile, a title and message, and one or two actions. Four types: Info, Success, Warning, Danger.

Source: Figma `Grep UI / Banner` (`7264:149281`). **Type=Info** (`7264:149278`) read in full, plus a **dark-mode instance** (`7264:150721`). Success (`7264:149277`), Warning (`7264:149280`) and Danger (`7264:149279`) read via their variable bindings only.

## Anatomy

```
┌─┬──────────────────────────────────────────────┐
│▪│  [avatar 36]  Title            [Dismiss][Action] │
│▪│               Message                            │
└─┴──────────────────────────────────────────────┘
 ↑ 36px pixel strip, card overlaps it by 16 → 20 visible
```

The card is a second bordered surface sitting on top of the strip — both carry `--elevation-card` and a 0.5px hairline. Card padding 16, gap 16, title-to-message gap 2, action gap 12.

## Markup

```html
<div class="grep-banner grep-banner--info">
  <div class="grep-banner__pixels" aria-hidden="true"></div>
  <div class="grep-banner__card">
    <div class="grep-banner__body">
      <span class="grep-avatar grep-avatar--icon-tile grep-avatar--36">…</span>
      <div class="grep-banner__label">
        <span class="grep-banner__title">Info</span>
        <p class="grep-banner__message">This is a message.</p>
      </div>
    </div>
    <div class="grep-banner__actions">
      <button class="grep-btn grep-btn--neutral"><span class="grep-btn__label">Dismiss</span></button>
      <button class="grep-btn grep-btn--brand"><span class="grep-btn__label">Action</span></button>
    </div>
  </div>
</div>
```

The banner **composes** existing components rather than restyling them: the leading tile is `.grep-avatar--36` (padding 8, icon 20 — exactly the banner's tile) and the actions are plain `.grep-btn`s.

## The pixel graphic

A 5-column grid of 4px squares with 4px gaps, in four opacity steps (1, 0.8, 0.4, 0.2), tinted with the type's accent.

The Info node lists 18 rows, but **rows 10–18 repeat rows 1–9 exactly** — so the artwork is a 9-row tile. `banner-pixels.svg` is that tile at 36 × 72 (9 rows plus the trailing gap), applied as a repeating mask so the accent shows through per-cell opacity.

Figma annotates this graphic: *"should scale nicely with the height of the banner so that the pixel squares at the top and bottom are flush with the top and bottom of the card."* A repeating mask satisfies that at any height while keeping squares at 4px — a scaled SVG would have grown them.

## Types

| Class | Accent | Action button |
|---|---|---|
| `--info` | `background-accent-brand` | `.grep-btn--brand` |
| `--success` | `background-accent-success` | `.grep-btn--inverted` |
| `--warning` | `background-accent-warning` | `.grep-btn--inverted` |
| `--danger` | `background-accent-danger` | `.grep-btn--inverted` |

The dismiss button is `.grep-btn--neutral` on all four.

Note the accents are the **tint** values (`#C0ABFF`, `#97D7B0`, `#FFD06D`, `#FF9FA2`), not the 500/600 ramp colours — the graphic is decorative, so it stays light.

## Composition

- One banner at a time, at the top of the region it concerns.
- Danger is for a failure the user must act on, not for a destructive confirmation — that's a dialog.
- The message is one or two short sentences. Anything longer belongs on the page, not in a banner.

## Inferred — correct these against Figma

1. **Action button per type.** Only Info's markup was read. The other three bind `button/contrast/*` and bind no brand tokens at all, which is why they're mapped to `--inverted`. Confirm against any one of those nodes.
2. **The avatar and buttons as slots.** Figma nests real component instances; treating them as slots the caller fills is mine, but it matches how the library is built.
3. **Composition rules** above are mine — no usage node was read.
4. **Dismiss/Action being buttons at all.** The set exposes no props for hiding them, so a banner with no actions isn't specified.

## Dark mode

Confirmed against a dark instance (`7264:150721`): the structure, the 18 rows, the 36-wide strip, the 20px offset and the four opacity steps are identical — the cells are instances of the same four opacity components as in light. Only the token values swap (`background-accent-brand` resolves to `#7149E0`, the card to `#16171A`, the hairline to `#2C2F35`).

Nothing in the CSS is mode-specific: the graphic is a mask tinted with `--_accent`, so it follows the theme on its own.

## Not covered — needs nodes

- **States.** No hover, dismissed or loading variant.
- **Responsive behaviour.** The read node is a fixed 800 wide; nothing says what happens when the actions and message compete for width.
