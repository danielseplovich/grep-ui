# Modal

A blocking layer for one focused task: a confirm, a short form, a piece of content that needs the screen.

> ⚠️ **No Figma node.** Every other component in this library was read from Figma. This one was **designed from the system** — each value derives from a component that was read, or from a convention DESIGN.md already states. When the real component lands, this file is the one that's wrong. Logged in `CONTRADICTIONS.md`.

## Where each value comes from

| Decision | Derived from |
|---|---|
| `radius-16` | DESIGN.md > Radius — "16 for modals and panels" |
| `background-component`, 0.5px `border-base` | Toast, Tooltip, the card variants |
| `--elevation-flyout` | its own definition: "menus, popovers, dropdowns" — the floating-layer shadow |
| `--background-overlay-scrim` | the token exists and is named for this (0.2 light, 0.72 dark) |
| 1px `border-subtle` rules | RULES.md — a section divider **inside** a component |
| padding 16 | DESIGN.md > Spacing — 16–24 for card padding and gaps between groups |
| footer gap 12 | Toast's actions row, the only read precedent for two adjacent buttons |
| title at 14/500 | one step above 13px body, under the 20px ceiling |

Nothing here is measured. Nothing here is new: no value, token or pattern that the system didn't already have.

## Anatomy

```
┌──────────────────────────────┐
│  Title                   [×] │  header — padding 16
│  Subtitle (optional)         │
├──────────────────────────────┤  1px border-subtle
│                              │
│  slot — whatever you need    │  body — padding 16, scrolls
│                              │
├──────────────────────────────┤  1px border-subtle
│  [lead]        [Cancel] [OK] │  footer — padding 16, gap 12
└──────────────────────────────┘
```

The body is an **empty slot**. It sets padding and handles scrolling; the content inside owns its own layout. The shell caps at `80vh`, so a long body scrolls while header and footer stay put.

## Sizes

| Class | Width | For |
|---|---|---|
| *(default)* | 400 | confirms, short prompts, a single field |
| `--520` | 520 | forms, content, anything with two columns of labels |

Both are `max-width: 100%`, inside a scrim that carries 24 of padding — so on a narrow viewport the modal shrinks rather than clipping.

## Markup

```html
<div class="grep-modal-overlay">
  <div class="grep-modal grep-modal--520" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <div class="grep-modal__header">
      <div class="grep-modal__heading">
        <h2 class="grep-modal__title" id="m-title">Title</h2>
        <p class="grep-modal__subtitle">An optional line of context.</p>
      </div>
      <button class="grep-icon-btn grep-icon-btn--24 grep-icon-btn--ghost" aria-label="Close">
        <svg class="grep-icon-btn__icon">…</svg>
      </button>
    </div>

    <div class="grep-modal__body">…</div>

    <div class="grep-modal__footer">
      <span class="grep-modal__footer-lead"><!-- optional --></span>
      <button class="grep-btn grep-btn--neutral"><span class="grep-btn__label">Cancel</span></button>
      <button class="grep-btn grep-btn--brand"><span class="grep-btn__label">Confirm</span></button>
    </div>
  </div>
</div>
```

The close control is a **ghost Icon Button at 24** and the footer buttons are plain **Buttons at 28** — both reused as-is. A destructive confirm swaps the primary for `grep-btn--danger`; nothing else changes.

`__footer-lead` pushes everything else right, for the cases where something belongs on the left — a "don't ask again" checkbox, a secondary link, a count.

## Behaviour (not styling, and not in the system anywhere)

- Focus moves into the modal on open and returns to the trigger on close.
- Tab cycles inside it; Escape closes it.
- The scrim closes on click **only** when nothing is unsaved.
- The page behind doesn't scroll while it's open.
- Motion is a 120ms fade with a 2px rise, under a reduced-motion guard. Figma specifies no motion anywhere, so this is the smallest thing that reads as a layer arriving.

## Open questions for the real component

1. **Sizes.** 400 / 520 is a guess at the ramp. A wide size (720) for tables or settings may be needed.
2. **The rules.** Always-on header and footer dividers follow RULES.md, but a short confirm may want them off.
3. **Close button size.** 24 here; Toast — the nearest floating surface that was read — uses 16.
4. **Header with an icon or avatar**, the way Toast and Banner lead with a status glyph.
5. **A full-screen / sheet form** for mobile widths.
