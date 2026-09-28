# Input

**Eight input types are one component.** Text, password, number, currency, date, time, checkbox and rating all share the same label / field / help-text shell — what changes is what sits inside the 28px field.

Source: all eight read at **Size=Base (28), State=Empty**, plus **Size=LG (32), State=Hover** (`6665:41707`) —
text `6501:116061` · password `6626:68809` · number `4648:25118` · checkbox `3647:154728` ·
rating `4485:77869` · currency `4648:24546` · date `4648:26279` · time `6410:50104`.

## Anatomy

```
[icon 14] Label                    ← label row, h16, gap 6
This is some sublabel.             ← gap 2
                                   ← gap 10
┌─────────────────────────────────┐
│ $ │ 0.00              │ USD     │  field h28, radius-6
└─────────────────────────────────┘
This is some help text.            ← gap 8
```

Field: `background-field`, 0.5px `border-base` hairline, `radius-6`, `--elevation-input`, `overflow: clip` so addons sit flush to the rounded edge.

## Composition by type

The field is a flex row. Fill it with a control cell and any addons:

| Type | Field contents |
|---|---|
| **text** | `__control`, optional trailing `__rule` + `__button` (copy) |
| **password** | `__control` + trailing `__rule` + `__button` (reveal) |
| **number** | `__control` + two trailing `__rule` + `__button` pairs (steppers) |
| **currency** | leading `__button` + `__rule`, then `__control`, then `__rule` + `__unit` (`USD`) |
| **date** | `__control` holding segment fields and separators |
| **time** | `__control` with segments + trailing `__rule` + `__unit` (`EST`) |
| **checkbox** | `__inset` holding a `.grep-checkbox` — no text |
| **rating** | `__inset` holding a star group — no text |

Addons are **flush to the field edge**, separated by a 1px `border-subtle` rule — a section divider inside a component, per [RULES.md](../../grepmd/RULES.md) > Line weights. The field's own edge stays 0.5px. Both weights appear in one component, and they're the two different tiers.

## Markup

```html
<div class="grep-input">
  <div class="grep-input__label">
    <span class="grep-input__label-row">
      <svg class="grep-input__label-icon">…</svg>Dollar Currency
    </span>
    <p class="grep-input__sublabel">This is some sublabel.</p>
  </div>
  <div class="grep-input__field-container">
    <div class="grep-input__field">
      <span class="grep-input__addon">
        <button class="grep-input__button"><svg>…</svg></button>
        <span class="grep-input__rule"></span>
      </span>
      <input class="grep-input__control" placeholder="0.00">
      <span class="grep-input__addon">
        <span class="grep-input__rule"></span>
        <span class="grep-input__unit">USD</span>
      </span>
    </div>
    <p class="grep-input__help">This is some help text.</p>
  </div>
</div>
```

Label and help text are both optional (`label` and `helpText` props in Figma).

## The unit label is mono

`USD`, `EST` and any other unit use `--text-style-code` (Roboto Mono) at 13px weight 400, `foreground-text-dim`, in a 44-wide cell with 10px padding. That's the `code-label-base-reg` style — **not** the body font. Easy to get wrong.

## Text styles used

| Part | Style | Value |
|---|---|---|
| Label | `label-base-medium` | 13 / 440, `foreground-text-base` |
| Sublabel | `para-base-reg` | 13 / 400, lh 1.4, `foreground-text-dim` |
| Control + placeholder | `para-base-med` | 13 / 440, lh 1.4; placeholder `foreground-text-faint` |
| Unit | `code-label-base-reg` | mono 13 / 400, `foreground-text-dim` |
| Help text | `para-sm-reg` | 12 / 400, lh 1.4, `foreground-text-dim` |

## Sizes

Two. Only three things change — height, the control's horizontal padding, and the addon button square. Radius, gaps and every text style stay put.

| Class | Field | Control padding | Addon button |
|---|---|---|---|
| *(none)* | 28 | 8 | 28 |
| `--32` | 32 | 10 | 32 |

## States

| State | How |
|---|---|
| Empty | placeholder in `foreground-text-faint` |
| **Hover** | hairline thickens **0.5px → 1px**, same `border-base` — read from Figma |
| Focused | small focus ring (`--elevation-interactive-focus`) **(inferred)** |
| Filled | just content — the value uses `foreground-text-base` where the placeholder used faint |
| Error | hairline → `border-danger`, help text → `foreground-danger` **(inferred)** |
| Disabled | `opacity-disabled` **(inferred)** |

Hover follows the system rule that a 1px border at rest is off-brand and 1px *means* hover — the same mechanic the checkbox card uses.

## Inferred — needs nodes

1. **Focused, error and disabled.** Built from system precedent, not read. Logged as CONTRADICTIONS #22.
2. **Date and time segment fields.** Figma nests a `Date Time Item` component that wasn't read — the CSS treats the control as one cell.
3. **Rating.** The `Star Group Base` component wasn't read; the CSS gives it an `__inset` cell to sit in.
4. **Stepper and reveal icons** are slots; no icon is shipped with the component.
