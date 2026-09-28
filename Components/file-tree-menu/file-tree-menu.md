# File Tree Menu

A flyout holding a search field and a scrollable, indentable file tree. Two components: **File Tree Menu** (the shell) and **File Tree Item** (a row).

Source: Figma `Grep UI / File Tree Menu` at all three types — Checkbox (`7769:314908`), Radio (`8012:148683`), Text (`8975:124846`) — plus one File Tree Item read in full (`8975:120451`).

## Anatomy

```
┌────────────────────────────────┐
│ 🔍 Search files and folders... │  h28, margin 6, px 8, gap 12
├────────────────────────────────┤  1px border-subtle
│ ▸ Heading        [Select all]  │  optional, h28
│ [24][24]│[24][24] Label        │  rows, h28
└────────────────────────────────┘
```

Shell: `radius-8`, 0.5px hairline, `background-component`, `--elevation-flyout`. List padding 6.

## Item anatomy

Every column is a fixed **24px cell**:

```
[guide] × depth   [caret]   ┌ [control] [icon] [label] ┐  ← item frame
                            └ radius-6, hover target   ┘
```

- **guide** — one per depth level, each drawing a 1px `border-base` line full height, centred. `--blank` keeps the cell without the line.
- **caret** — 14px mark. `--collapsed` rotates it −90°; `--empty` hides it but keeps the cell so labels stay aligned.
- **item frame** — `flex: 1`, `radius-6`. **This** is the hover and selection target, not the whole row, so the indent guides stay outside the highlight.
- **control** — the checkbox or radio, in Checkbox and Radio types only.
- **visual** — 14px file or folder icon in a 24px cell.
- **label** — padding `0 4`, 13px at weight 440, `foreground-text-base`.

## Markup

```html
<div class="grep-tree-menu">
  <div style="display:flex;align-items:center">
    <svg class="grep-tree-menu__search-icon">…</svg>
    <input class="grep-tree-menu__search" placeholder="Search files and folders...">
  </div>
  <hr class="grep-tree-menu__rule">
  <ul class="grep-tree-menu__list">
    <li class="grep-tree-item">
      <button class="grep-tree-item__caret"><svg>…</svg></button>
      <div class="grep-tree-item__frame">
        <span class="grep-tree-item__control"><!-- .grep-checkbox --></span>
        <span class="grep-tree-item__visual"><svg>…</svg></span>
        <span class="grep-tree-item__label">01_Drafts</span>
      </div>
    </li>
    <li class="grep-tree-item">
      <span class="grep-tree-item__guide"></span>
      <button class="grep-tree-item__caret grep-tree-item__caret--empty"><svg>…</svg></button>
      <div class="grep-tree-item__frame">…</div>
    </li>
  </ul>
</div>
```

Depth is expressed by repeating `__guide`, not by padding — that's what draws the tree lines.

## Types

| Type | Control cell |
|---|---|
| Text | omitted |
| Checkbox | `.grep-checkbox` |
| Radio | a radio — **not yet in the library** |

The control is a slot, so the menu doesn't restyle it.

## Assets

- `file-tree-caret.svg` — 14px caret, points down (open), `currentColor`
- `file-tree-search.svg` — 14px magnifying glass, `currentColor`
- The folder glyph is the same multicolour asset as breadcrumbs — content, not chrome.

## Inferred — correct these against Figma

1. **Hover and selected.** No state variant was read for the item. The CSS uses `background-overlay-hover` and `background-overlay-selected` on the item frame, which is the system's documented interaction pattern — but unverified here. Logged as CONTRADICTIONS #16.
2. **Caret rotation** for the collapsed state. Figma only shows the open caret.
3. **Label truncation.** Figma has `nowrap`; the ellipsis is mine.
4. **Menu width.** Figma draws 300; the CSS leaves it settable.
5. **Scroll bar.** Figma has a 6px custom bar; the CSS uses `scrollbar-width: thin` rather than reproducing it.

## Not covered — needs nodes

- **Radio component** — needed for the Radio type.
- **Item focus**, and keyboard traversal of the tree.
- **Empty and loading states** for the list.
- **Disabled rows.**
