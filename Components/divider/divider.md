# Dividing Line

A hairline rule between regions. Three independent axes: orientation, style and width.

Source: Figma `Grep UI / Dividing Line` (`94:1080`). All eight variants read.

## Markup

```html
<hr class="grep-divider">
<hr class="grep-divider grep-divider--subtle">
<div class="grep-divider grep-divider--vertical" role="separator" aria-orientation="vertical"></div>
```

Use `<hr>` for a horizontal rule. A vertical one isn't an `<hr>` semantically — use a `<div role="separator">`.

## Axes

| Axis | Class | Value |
|---|---|---|
| orientation | *(none)* / `--vertical` | thickness on the block / inline axis |
| style | *(none)* / `--subtle` | `border-base` / `border-subtle` |
| width | *(none)* / `--thin` | 1px / 0.5px |

All eight combinations exist and are just the two tokens crossed with the two thicknesses. `border-subtle` is the token `DESIGN.md` already describes as *"Dividing Line component in subtle variant"* — this is that component.

## Sizing

Figma draws every variant at 200px, which is the artboard, not a rule. In CSS a horizontal divider spans its container and a vertical one stretches to its flex parent's height — don't set a length.

## Composition

- `--subtle` inside a component (menu sections, list rows); the base style between larger regions.
- A vertical divider needs a flex parent with a definite cross size, or it collapses.

## Inferred — correct these against Figma

1. **Horizontal is the CSS default.** Figma's default variant is *Vertical*, but horizontal is far more common in layout, so the base class is horizontal and `--vertical` is the modifier. Naming only — no visual difference.
2. **Semantics.** `<hr>` and `role="separator"` are mine.
3. **Stretch behaviour** for the vertical variant is mine; Figma has a fixed 200px.

## When to use which

Settled in [`grepmd/RULES.md`](../../grepmd/RULES.md) — three tiers:

| Line | Class | Weight / token |
|---|---|---|
| Major app section divider | `.grep-divider` | 1px `border-base` |
| Component border | *(not this component)* | 0.5px hairline, drawn as an inset ring |
| Section divider inside a component | `.grep-divider--subtle` | 1px `border-subtle` |

Two questions: is it the **edge of a component** (0.5px, not this component) or a **line between things** (1px)? If a line — does it separate **parts of the app** (`border-base`) or **parts of one component** (`border-subtle`)?

`--thin` (0.5px) has no assigned use under this rule — see CONTRADICTIONS #19.
