# Progress Bar

A 6px indicator track. Four types × any fill.

Source: Figma `Grep UI / Progress Bar` (`1612:3888`) — 4 types × 5 fill steps, read in full.

## Spec

| | Value |
|---|---|
| Height | 6 |
| Radius | `radius-full` |
| Track | `background-contrast` |
| Fill | `background-accent-{brand\|success\|warning\|danger}` |

The fill has no radius of its own — the track's `overflow: clip` rounds it. Figma ships fill as five discrete variants (0 / 25 / 50 / 75 / 100%); in CSS it's the `--_fill` custom property, so any value works.

```html
<div class="grep-progress grep-progress--success" role="progressbar" aria-valuenow="60">
  <div class="grep-progress__fill" style="--_fill: 60%"></div>
</div>
```

The accents are the same **tint** values the Banner's pixel graphic uses, not the 500/600 ramp — progress is decorative, so it stays light. `DESIGN.md` already documents `background-accent-*` as "loading/progress bar fill".

## One inconsistency to check

**Brand at 100% uses a different track colour.** Every other combination has a `background-contrast` track; `Brand + 100%` alone switches the track to `badge-brand-background` (`#EEE9FF`). Since the fill covers the track entirely at 100%, it's invisible — which is why it probably went unnoticed. The CSS uses `background-contrast` throughout. Logged as CONTRADICTIONS #27.

## Not covered — needs nodes

- **Indeterminate / loading** — no animated variant.
- **Height variants** — only 6.
- **A label or percentage** — none in the component.
