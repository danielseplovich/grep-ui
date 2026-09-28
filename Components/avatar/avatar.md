# Avatar / Tile

A square-ish container holding an icon, image or initials, optionally with a small badge overhanging its bottom-right corner. Used for users, teams, files, apps and integrations.

Source: Figma `Grep UI / Avatar Base` component set (`9102:38794`). Read: **Icon Tile**, radius **Rounded**, states **Default and Hover**, all nine sizes. Radius **Full** read at size 40 (`8986:160198`).

## Anatomy

At size 40:

```
┌──────────────┐   40 × 40, padding 8
│              │   0.5px border-base, background-tile
│   [icon 24]  │   shadow: 0 1px 2px -2px shadow-ink-8
│            ◍ │   badge 14, overhanging -2 / -2
└──────────────┘
```

The icon fills the padded box (24px inside 40px at padding 8). The badge sits outside the border on both axes, so an avatar needs 2px of clearance at its bottom-right when badged.

## Markup

```html
<span class="grep-avatar grep-avatar--icon-tile grep-avatar--32">
  <svg class="grep-avatar__icon" aria-hidden="true">…</svg>
</span>

<!-- with a badge -->
<span class="grep-avatar grep-avatar--icon-tile grep-avatar--40 grep-avatar--full">
  <svg class="grep-avatar__icon" aria-hidden="true">…</svg>
  <span class="grep-avatar__badge"><img src="…" alt=""></span>
</span>
```

The icon inherits `color`, so an icon drawn with `currentColor` picks up the type's ink automatically. `avatar-icon-example.svg` is the default Body-Standing glyph, exported for previews — it is content, not part of the component.

## Sizes

Nine sizes. **Padding and radius do not scale proportionally** — both are read per size, so don't compute them. The icon is always `size − 2 × padding` and falls out of the padding box on its own.

| Class | Box | Padding | Icon | Radius | Badge |
|---|---|---|---|---|---|
| `--12` | 12 | 2 | 8 | `radius-4` | — |
| `--14` | 14 | 3 | 8 | `radius-4` | — |
| `--16` | 16 | 3 | 10 | `radius-4` | — |
| `--20` | 20 | 4 | 12 | `radius-4` | — |
| `--24` | 24 | 5 | 14 | `radius-6` | yes |
| `--28` | 28 | 6 | 16 | `radius-6` | yes |
| `--32` | 32 | 6 | 20 | `radius-6` | yes |
| `--36` | 36 | 8 | 20 | `radius-8` | yes |
| `--40` | 40 | 8 | 24 | `radius-8` | yes |

Note the ramp isn't monotonic in the way you'd guess: 14 and 16 share padding 3, 28 and 32 share padding 6, 36 and 40 share padding 8, and 32 and 36 share a 20px icon. The radius steps at 24 and again at 36.

Omitting a size class gives you 40.

## Radius

| Class | Radius | Use |
|---|---|---|
| *(none)* | per size, above | Files, apps, teams, integrations — anything that isn't a person |
| `--full` | `radius-full` | People |

`--full` overrides whatever radius the size class set.

## States

| State | How |
|---|---|
| Default | `background-tile`, hairline, base shadow |
| Hover | `background-overlay-hover` layered **on top of** `background-tile`; hairline and shadow unchanged |

Hover is gated behind `--interactive`, so a decorative avatar in a list doesn't light up under the pointer. Add that class only when the avatar is itself a control.

## Composition

- In a settings item block or a list row, the avatar is the leading element, vertically centered against the row's text block.
- Never put an avatar on an accent or badge fill — `background-tile` needs a neutral surface behind it to read.
- Stacked or overlapping avatar groups aren't specified. Don't invent the overlap offset.

## Inferred — correct these against Figma

1. **The badge is treated as a slot.** The node's badge is a gradient-filled circle, which reads as a placeholder image rather than a fixed mark. If the badge has defined variants (status dot, app icon, count), this is wrong.
2. **Hover is gated behind `--interactive`.** Figma has a Hover state but says nothing about which avatars are interactive. The gating is mine.
3. **Composition rules** below are mine — no layout node was read.

## Contradiction to resolve in Figma

The annotation on the size-24 variant reads *"There is a hidden property for Icon Badge on sizes 28 through 40."* The node structure disagrees: size 24 has an Icon Badge instance too, and it was added in a later batch than the annotation. The CSS follows the nodes and allows the badge from 24 up. **Fix the annotation or remove the 24 badge** — right now the library says two things.

## Not covered — needs nodes

- **Types other than Icon Tile.** The set's `type` prop only offers Icon Tile. Initials avatars have eleven `--avatar-*` fills sitting unused in `DESIGN.md`; image avatars are unbuilt. Both are probably separate components.
- **Radius Full below 40.** Only read at 40. It's a single token override so it should hold, but it's unverified at small sizes where `radius-4` and `radius-full` diverge sharply.
- **States beyond Default and Hover.** No selected, disabled or focus variant in the set.

## Corrections applied to DESIGN.md

- Don't #8 said "no shadows on cards — shadows are for floating layers." The avatar is not a floating layer and has a designed base shadow, so the rule is now scoped to cards and the Elevation section carries `--elevation-avatar`.
- A CSS `border` made the 24px icon render at 22px. `DESIGN.md`'s Borders section now documents the inset-ring hairline.
