# Breadcrumbs

The path trail above a file or folder view. Two components in Figma: **Nav Breadcrumbs Base** (one crumb) and **Nav Breadcrumbs** (the trail that arranges them). Both are here — `.grep-crumb` and `.grep-breadcrumbs`.

Source: `Grep UI / Nav Breadcrumbs Base` (`1163:49935`) and `Grep UI / Nav Breadcrumbs` (`4694:43793`). All four item types read across active and Default/Hover; all three trail types read.

## Anatomy

```
[crumb] › [crumb] › [crumb] › [crumb active]
        ↑ 12px chevron, gap 1 either side
```

The trail's gap is **1px** — crumbs carry their own 4px horizontal padding, so the visual spacing comes from the crumb box, not the flex gap. A crumb is 24 high, padding 2/4, radius 6, internal gap 4.

## Markup

```html
<nav class="grep-breadcrumbs" aria-label="Breadcrumb">
  <button class="grep-crumb grep-crumb--folder">
    <span class="grep-crumb__visual"><svg class="grep-crumb__icon">…</svg></span>
    <span class="grep-crumb__label">Projects</span>
  </button>
  <svg class="grep-breadcrumbs__sep" aria-hidden="true">…</svg>
  <button class="grep-crumb grep-crumb--icon-only" aria-label="Show hidden path">
    <span class="grep-crumb__visual"><svg class="grep-crumb__icon">…</svg></span>
  </button>
  <svg class="grep-breadcrumbs__sep" aria-hidden="true">…</svg>
  <span class="grep-crumb grep-crumb--folder grep-crumb--active" aria-current="page">
    <span class="grep-crumb__visual"><svg class="grep-crumb__icon">…</svg></span>
    <span class="grep-crumb__label">Q3 assets</span>
  </span>
</nav>
```

The active crumb is the current location, so it's a `<span>`, not a button. Separators are `aria-hidden` — the list structure carries the meaning.

## Crumb types

| Class | Visual | Label |
|---|---|---|
| `--folder` | folder glyph in a 16px slot | yes |
| `--icon` | 16px icon slot | yes |
| `--icon-only` | 16px icon slot | no |
| `--simplified` | none | yes |

Both visual types resolve to a **16px slot holding a 14px glyph** — the icon types inset the glyph by 6.25%, the folder pads its 14px frame by 1. Build any new type to that slot.

`--icon-only` is the **overflow crumb**: the three-dots mark standing in for hidden path segments. `breadcrumbs-overflow.svg` is that asset.

## States

| State | How |
|---|---|
| Default, inactive | `opacity-subtle` (0.88) on the whole crumb, `foreground-text-subtle` |
| Default, active | full opacity, `foreground-text-base`, no background |
| Hover | `background-overlay-hover` **and** opacity back to 1 |

Hover does two things at once — it adds the overlay *and* clears the dimming. Doing only the first makes hover look muddy.

## Trail types

| Class | Shape |
|---|---|
| *(none)* | `String` — the full path, first crumb → … → active last crumb |
| `--two-items` | first crumb › active crumb, for a two-level path |
| `--simplified` | text-only path, 16-high crumbs, **tooltip use only** |

**Simplified is not a page-level breadcrumb.** Figma annotates it twice: it exists only inside tooltips, for hovering a path and then navigating it. Don't reach for it because a header feels crowded — use the overflow crumb instead.

Condensing a long path means inserting one `--icon-only` crumb after the first: `first › ⋯ › … › active`.

## Assets

- `breadcrumbs-chevron.svg` — the 12px separator, `currentColor`
- `breadcrumbs-overflow.svg` — the three-dots overflow mark, `currentColor`
- `breadcrumbs-folder-example.svg` — the default folder glyph. **Content, not chrome**: it's a multicolor gradient asset that keeps its own fills, and a real trail swaps in the icon for each item's type.

## Inferred — correct these against Figma

1. **Separator color.** `foreground-icon-dim` was in the trail's variable set but the chevron's own fill wasn't bound to it in the returned markup. Verify.
2. **Semantics.** `<nav>`/`<button>`/`aria-current`, and the active crumb being non-interactive, are mine — Figma has no semantics.
3. **Trail composition.** The crumb-count props (`1st`…`5th Item`, `condensed`) are Figma plumbing for laying out variants; in CSS the trail is just a flex row, so any count works. The condensing *rule* — when to collapse and how many to keep — isn't specified anywhere and is still an open decision.

## Not covered — needs nodes

- **Focus.** No focus variant on a component that is a row of buttons. It should probably take the button's focus ring.
- **Truncation.** Nothing specifies what happens to a long crumb label; `white-space: nowrap` with no max-width means a long name pushes the trail wide.
- **Disabled / loading.** Not in the set.

## Corrections applied to DESIGN.md

- The typography table listed `--text-sm` (12px) as "secondary metadata, captions **(inferred)**". Breadcrumb labels are `--text-sm`, at weight 500 for path crumbs and 440 for simplified ones — so the size now has two read component usages and two label styles behind it (`label-sm-bold`, `label-sm-med`).
