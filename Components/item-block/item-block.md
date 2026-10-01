# Item Block

A settings group: a heading plus a card of stacked rows. This is the settings-page workhorse.

Source: Figma `Grep UI / Item Row` (`4621:3776`) read with its **full boolean prop set** and both states, plus `Item Block` / `Settings Group` (`4621:3810` / `4621:3812`).

## Anatomy

```
Block title                                  ← 14 / 440
                                             ← gap 16
┌──────────────────────────────────────────┐ radius-12, 0.5px hairline, card shadow
│ [tile 36] Label            [ slots… ]  › │ row, min-h 76, px 24 py 20, gap 12
│           Sublabel                        │
├──────────────────────────────────────────┤ 1px border-subtle
│ …                                         │
└──────────────────────────────────────────┘ last row omits its rule
```

Rows stack with **no gap** — each row draws its own bottom rule and the last one omits it. Group radius is **12**, not 8.

## The boolean props

Every trailing element is an independent boolean. All thirteen, as Figma names them:

| Prop | What it adds |
|---|---|
| `tile` | 36px tile at the start of the left container |
| `chevron` | 16px chevron at the end — right when closed, down when `open` |
| `dividingLine` | the row's bottom 1px rule |
| `open` | expanded; flips the chevron |
| `input` | a 300-wide Text Input |
| `select` | a 300-wide Select Input |
| `avatar` | a 36px circular Avatar |
| `toggle` | a 28×16 Toggle |
| `stepper` | a −/value/+ stepper |
| `prop1stButton` | a Button |
| `prop2ndButton` | a second Button |
| `iconButton` | a 28px Icon Button |
| `keyboardShortcut` | a modifier + key combo |

They are **not mutually exclusive** — any combination can be on at once. In CSS they're simply children of `__internal`, so the author includes what they need and the 12px gap spaces them. Figma's layer order is: stepper, chevron, input, select, avatar, toggle, 1st button, 2nd button, keyboard shortcut, icon button.

`state` is `Default` or `Hover`; hover layers `background-overlay-hover-subtle` over `background-component`.

## Markup

```html
<section class="grep-item-block">
  <h3 class="grep-item-block__title">Block title</h3>
  <div class="grep-item-block__group">
    <div class="grep-item-row grep-item-row--interactive">
      <div class="grep-item-row__internal">
        <div class="grep-item-row__left">
          <span class="grep-item-row__tile"><svg>…</svg></span>
          <div class="grep-item-row__label-frame">
            <div class="grep-item-row__label">
              <span class="grep-item-row__label-row">Label</span>
              <p class="grep-item-row__sublabel">This is some sublabel.</p>
            </div>
          </div>
        </div>
        <!-- any trailing slots, in order -->
        <button class="grep-btn grep-btn--neutral">…</button>
        <svg class="grep-item-row__chevron">…</svg>
      </div>
      <hr class="grep-item-row__rule">
    </div>
    <!-- …more rows; omit __rule on the last -->
  </div>
</section>
```

## Two details worth knowing

**The label frame grows.** Figma draws it at 136px, but in a real page the label takes all the room the trailing controls leave, so long titles and sublabels don't wrap into a narrow column. 136px is the minimum. Set `--_label-w` to pin the column when every row's trailing content must start at the same x.

**The tile is not the Avatar component's default.** It's the same 36px geometry but filled with `background-contrast` instead of `background-tile`, with no hairline and no shadow. It's an override, not a variant.

## Inferred — needs nodes

1. **Chevron colour.** `foreground-icon-dim` from the variable set; the chevron's own fill binding wasn't in the returned markup.
2. **Chevron rotation.** Figma ships separate right and down layers; the CSS rotates one.
3. **What `open` reveals.** The prop flips the chevron, but no expanded content exists in the read node — the row stays `min-h 76`.
4. **The row's trailing components** (input, select, toggle, stepper, keyboard shortcut) are instances of other components. Input, select and buttons already exist in the library; **Toggle, Stepper and Keyboard Shortcut do not** — logged as CONTRADICTIONS #24.
5. **Block title vs subtitle.** The title style (`label-lg-med`, 14/440) is read; a subtitle style (`para-lg-reg`) appears in the variable set but no subtitle is present in the read node.
