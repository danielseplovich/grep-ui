# Context Menu

A right-click / overflow menu: sections of items, optionally with a search field and a scroll bar.

Source: Figma `Grep UI / Context Menu` (`7774:318231`). Type **Folders and Files** (`7774:318226`) read in full; the other four types — Single File, Single Folder, Multiple Files, Multiple Folders — are the **same shell with different item lists**, so they're content, not CSS.

## Anatomy

```
┌──────────────────────────────┐ radius-8, 0.5px hairline, flyout shadow
│ 🔍 Search...                 │  optional, h28, margin 6
├──────────────────────────────┤ 1px border-subtle
│ 4 assets                     │  header, h28, 12/500 dim
│ ▣  Add to collection       › │  item, h28, px 8, gap 12
│ ▣  Pin to cache              │
├──────────────────────────────┤ 1px border-subtle
│ General                      │
│ ▣  Rename                    │
└──────────────────────────────┘
```

Each section is its own 6px-padded block; sections are separated by a 1px `border-subtle` rule.

## The item

| Part | Spec |
|---|---|
| Row | h28, padding-x 8, gap 12, `radius-6` |
| Left | `flex: 1`, gap **10**, 16px icon + 13/440 label |
| Right | gap 4; a 12px chevron marks a submenu |

Note the **three different gaps in one row**: 12 between left and right, 10 between icon and label, 4 inside the right group. They're all read.

## Props

| Prop | Effect |
|---|---|
| `searchable` | adds the search field and its rule above the first section |
| `scrollable` | adds a 6px-wide scroll bar, absolute right — 4px track, `radius-8`, `border-base` |
| `type` | picks which items appear; no structural difference |

## Markup

```html
<div class="grep-menu">
  <input class="grep-menu__search" placeholder="Search...">
  <hr class="grep-menu__rule">
  <div class="grep-menu__section">
    <div class="grep-menu__header">4 assets</div>
    <button class="grep-menu__item">
      <span class="grep-menu__item-left"><svg class="grep-menu__item-icon">…</svg>Add to collection</span>
      <span class="grep-menu__item-right"><svg class="grep-menu__item-chevron">…</svg></span>
    </button>
  </div>
  <hr class="grep-menu__rule">
  <div class="grep-menu__section">…</div>
</div>
```

## Inferred — needs nodes

1. **Item hover, disabled and danger.** No state variant was read. Hover uses `background-overlay-hover`; `--danger` recolours a destructive item with `foreground-danger`. The read "Move to trash" item is **not** recoloured in Figma — so `--danger` is an addition, not a reading. Logged as CONTRADICTIONS #26.
2. **Submenu behaviour.** The chevron is present but no flyout panel was read.
3. **Item icons** are content slots; none ship with the component.
