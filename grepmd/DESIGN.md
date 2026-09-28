# Grep UI — DESIGN.md

This file is the design system for **Grep**, a file and asset workspace (drive, favorites, sharing, members, asset previews, automations). Load it before you design or build any Grep interface: a screen, a prototype, a component, or a marketing page that has to look like the product.

Everything below comes from Grep UI's exported Figma variables and effect styles. Where the source says how a token is used, that usage is quoted. Where the source is silent, the guidance is marked **(inferred)**; follow it, but it gives way to a real component spec in `../Components/` the moment one exists.

## How to use this file

> Building a screen? Start with [`../AGENTS.md`](../AGENTS.md) — the short entry file with the setup, the rules, the Don'ts and the component index. Come here when you need the full token tables or the reasoning behind a decision.


1. **Link `grepmd/grep-ui.css`.** It imports the token stylesheet, the named effect styles, and every component. Prototypes start from `_prototype-template.html`, which already links it.
2. **Style with semantic tokens only**: `background-*`, `foreground-*`, `border-*`, `button-*`, `badge-*`. Use primitives (`--purple-500`, `--red-600`…) only when no semantic token fits, and never for neutrals.
3. **Never write a raw color, font, spacing or radius value** in component styles. If you can't express something with a token, it's probably off-system. Check [Don'ts](#donts) first.
4. **Build light and dark together.** Every semantic token already has both values. If your UI looks right in only one mode, you used a primitive or a literal somewhere.
5. **Figma is the source of truth.** Where this file and the Figma library disagree, Figma wins — fix this file rather than working around it. Component specs in `../Components/` are compiled from Figma nodes and outrank the general guidance here; the guidance covers what no component has specified yet.
6. **Read [RULES.md](./RULES.md).** It holds decisions made by hand that neither the tokens nor the components settle. It outranks any guidance marked **(inferred)**.
7. **Check [CONTRADICTIONS.md](./CONTRADICTIONS.md) before trusting an edge case.** It lists where the library currently says two things, and what was built from a partial read. If your question is on that list, ask rather than pick.

## The look in one paragraph

Grep is a quiet, dense, neutral workspace. Chrome is nearly white (dark: nearly black), built from a few surfaces that differ by only a few percent of lightness. Hierarchy comes from surface steps, 0.5px hairline borders and translucent "ink" text, not from shadows or color. Type is small: 13px body in Inter, with medium weights (440–500) instead of bold. Purple (`#855CF8`) is the one brand color, and it's used sparingly, for primary actions and selected controls. Other hues show up almost only in badges, progress fills and status.

## Setup

**Fonts.** Load Inter, Inter Display and Roboto Mono. Inter must be the **variable** font, because the medium weight is `440`, which a static Inter file can't render.

```html
<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css"> <!-- Inter + Inter Display, variable -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap">
```

**Theme switching.** Light is the default. Dark mode is `data-theme="dark"` on `<html>`. To follow the OS setting:

```js
const dark = matchMedia("(prefers-color-scheme: dark)")
const apply = () => (document.documentElement.dataset.theme = dark.matches ? "dark" : "light")
apply(); dark.addEventListener("change", apply)
```

**Base styles** (put these after the token stylesheet):

```css
html {
  font-family: var(--text-style-body), system-ui, sans-serif;
  font-size: var(--text-base);          /* 13px */
  font-weight: var(--text-weight-regular);
  color: var(--foreground-text-base);
  background: var(--background-canvas);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { font-family: var(--text-style-display), var(--text-style-body), sans-serif; font-weight: var(--text-weight-bold); }
code, kbd, pre { font-family: var(--text-style-code), ui-monospace, monospace; }
```

## Tokens stylesheet

Generated from the Figma export. Copy it as-is.

```css
/* ---------- LIGHT (default) ---------- */
:root,
[data-theme="light"] {
  color-scheme: light;
  --background-canvas: #FCFCFC;
  --background-left-sidebar: #F4F4F4;
  --background-left-sidebar-shell: #E7E7E8;
  --background-panel: #FDFDFD;
  --background-component: #FEFEFE;
  --background-component-shell: #F4F4F4;
  --background-transparent: rgb(254 254 254 / 0);
  --background-field: #FFFFFF;
  --background-tile: #FDFDFD;
  --background-contrast: rgb(19 19 21 / 0.04);
  --background-contrast-subtle: rgb(19 19 21 / 0.02);
  --background-contrast-strong: rgb(19 19 21 / 0.08);
  --background-toggle-off: #EDEDED;

  --background-accent-brand: #C0ABFF;
  --background-accent-brand-subtle: rgb(133 92 248 / 0.25);
  --background-accent-success: #97D7B0;
  --background-accent-action: #93BCFC;
  --background-accent-warning: #FFD06D;
  --background-accent-danger: #FF9FA2;
  --background-accent-favorite: #FEAD07;
  --background-accent-scrub-line: #F03E3E;

  --background-overlay-hover: rgb(19 19 21 / 0.06);
  --background-overlay-hover-subtle: rgb(19 19 21 / 0.02);
  --background-overlay-hover-strong: rgb(19 19 21 / 0.2);
  --background-overlay-pressed: rgb(19 19 21 / 0.12);
  --background-overlay-selected: rgb(19 19 21 / 0.1);
  --background-overlay-scrim: rgb(19 19 21 / 0.2);

  --foreground-brand: #855CF8;
  --foreground-brand-hover: #7149E0;
  --foreground-danger: #F03E3E;
  --foreground-danger-hover: #D92D33;
  --foreground-text-base: rgb(19 19 21 / 0.96);
  --foreground-text-subtle: rgb(19 19 21 / 0.72);
  --foreground-text-dim: rgb(19 19 21 / 0.56);
  --foreground-text-faint: rgb(19 19 21 / 0.36);
  --foreground-text-on-color: #FFFFFF;
  --foreground-icon-base: rgb(19 19 21 / 0.88);
  --foreground-icon-subtle: rgb(19 19 21 / 0.56);
  --foreground-icon-dim: rgb(19 19 21 / 0.44);
  --foreground-icon-faint: rgb(19 19 21 / 0.32);
  --foreground-icon-on-color: #FFFFFF;

  --border-base: #DFE1E4;
  --border-subtle: #EDEDED;
  --border-brand: #7149E0;
  --border-brand-subtle: rgb(133 92 248 / 0.5);
  --border-danger: #F03E3E;

  --button-brand-background: #855CF8;
  --button-brand-background-hover: #7149E0;
  --button-neutral-background: #FFFFFF;
  --button-neutral-background-overlay-hover: rgb(19 19 21 / 0.04);
  --button-contrast-background: #2C2F35;
  --button-contrast-background-overlay-hover: rgb(240 240 240 / 0.08);
  --button-contrast-border: #2C2F35;
  --button-contrast-icon: var(--foreground-icon-on-color);
  --button-contrast-text: #F0F0F0;
  --button-ghost-background-hover: rgb(19 19 21 / 0.06);
  --button-danger-background: #F03E3E;
  --button-danger-background-hover: #D92D33;

  --badge-brand-background: #EEE9FF;
  --badge-brand-border: #DDD2FF;
  --badge-brand-foreground: #44307F;
  --badge-success-background: #DDF5E7;
  --badge-success-border: #BEE8CF;
  --badge-success-foreground: #0B4D31;
  --badge-warning-background: #FFF4DE;
  --badge-warning-border: #FFE2A4;
  --badge-warning-foreground: #7A520B;
  --badge-destructive-background: #FFE0E1;
  --badge-destructive-border: #FFC6C8;
  --badge-destructive-foreground: #8F1D1D;
  --badge-indigo-background: #E8EAFF;
  --badge-indigo-border: #CDD2FF;
  --badge-indigo-foreground: #373B88;
  --badge-fuschia-background: #F8E1F0;
  --badge-fuschia-border: #F0BFE0;
  --badge-fuschia-foreground: #552240;
  --badge-orange-background: #FFE8C9;
  --badge-orange-border: #FFC98F;
  --badge-orange-foreground: #985012;
  --badge-blue-background: #DFECFF;
  --badge-blue-border: #BDD8FE;
  --badge-blue-foreground: #284886;
  --badge-cyan-background: #DDF7FE;
  --badge-cyan-border: #AFEFFF;
  --badge-cyan-foreground: #005A73;
  --badge-teal-background: #DCF7F4;
  --badge-teal-border: #AFEAE3;
  --badge-teal-foreground: #0A524D;
}

/* ---------- DARK ---------- */
[data-theme="dark"] {
  color-scheme: dark;
  --background-canvas: #131315;
  --background-left-sidebar: #151619;
  --background-left-sidebar-shell: #0E0E0F;
  --background-panel: #151618;
  --background-component: #16171A;
  --background-component-shell: #151619;
  --background-transparent: rgb(22 23 26 / 0);
  --background-field: #1F2023;
  --background-tile: #1F2023;
  --background-contrast: rgb(240 240 240 / 0.06);
  --background-contrast-subtle: rgb(240 240 240 / 0.04);
  --background-contrast-strong: rgb(240 240 240 / 0.1);
  --background-toggle-off: #1F2023;

  --background-accent-brand: #7149E0;
  --background-accent-brand-subtle: rgb(133 92 248 / 0.18);
  --background-accent-success: #129253;
  --background-accent-action: #4176DA;
  --background-accent-warning: #D99205;
  --background-accent-danger: #D92D33;
  --background-accent-favorite: #FEAD07;
  --background-accent-scrub-line: #F03E3E;

  --background-overlay-hover: rgb(240 240 240 / 0.06);
  --background-overlay-hover-subtle: rgb(240 240 240 / 0.02);
  --background-overlay-hover-strong: rgb(19 19 21 / 0.36);
  --background-overlay-pressed: rgb(240 240 240 / 0.1);
  --background-overlay-selected: rgb(240 240 240 / 0.08);
  --background-overlay-scrim: rgb(19 19 21 / 0.72);

  --foreground-brand: #7149E0;
  --foreground-brand-hover: #855CF8;
  --foreground-danger: #D92D33;
  --foreground-danger-hover: #F03E3E;
  --foreground-text-base: rgb(240 240 240 / 0.96);
  --foreground-text-subtle: rgb(240 240 240 / 0.72);
  --foreground-text-dim: rgb(240 240 240 / 0.56);
  --foreground-text-faint: rgb(240 240 240 / 0.36);
  --foreground-text-on-color: #FFFFFF;
  --foreground-icon-base: rgb(240 240 240 / 0.88);
  --foreground-icon-subtle: rgb(240 240 240 / 0.56);
  --foreground-icon-dim: rgb(240 240 240 / 0.44);
  --foreground-icon-faint: rgb(240 240 240 / 0.32);
  --foreground-icon-on-color: #FFFFFF;

  --border-base: #2C2F35;
  --border-subtle: #212124;
  --border-brand: #855CF8;
  --border-brand-subtle: rgb(133 92 248 / 0.5);
  --border-danger: #8F1D1D;

  --button-brand-background: #7149E0;
  --button-brand-background-hover: #855CF8;
  --button-neutral-background: #1F2023;
  --button-neutral-background-overlay-hover: rgb(240 240 240 / 0.06);
  --button-contrast-background: rgb(240 240 240 / 0.2);
  --button-contrast-background-overlay-hover: rgb(240 240 240 / 0.08);
  --button-contrast-border: rgb(240 240 240 / 0.32);
  --button-contrast-icon: var(--foreground-icon-on-color);
  --button-contrast-text: var(--foreground-text-on-color);
  --button-ghost-background-hover: rgb(240 240 240 / 0.08);
  --button-danger-background: #8F1D1D;
  --button-danger-background-hover: #B42328;

  --badge-brand-background: #382572;
  --badge-brand-border: #44307F;
  --badge-brand-foreground: #DDD2FF;
  --badge-success-background: #0B3F2D;
  --badge-success-border: #0B4D31;
  --badge-success-foreground: #BEE8CF;
  --badge-warning-background: #63420D;
  --badge-warning-border: #7A520B;
  --badge-warning-foreground: #FFE2A4;
  --badge-destructive-background: #661414;
  --badge-destructive-border: #8F1D1D;
  --badge-destructive-foreground: #FFC6C8;
  --badge-indigo-background: #2A2E66;
  --badge-indigo-border: #373B88;
  --badge-indigo-foreground: #CDD2FF;
  --badge-fuschia-background: #401A30;
  --badge-fuschia-border: #552240;
  --badge-fuschia-foreground: #F0BFE0;
  --badge-orange-background: #763D11;
  --badge-orange-border: #985012;
  --badge-orange-foreground: #FFC98F;
  --badge-blue-background: #213967;
  --badge-blue-border: #284886;
  --badge-blue-foreground: #BDD8FE;
  --badge-cyan-background: #104A5D;
  --badge-cyan-border: #005A73;
  --badge-cyan-foreground: #AFEFFF;
  --badge-teal-background: #0B4541;
  --badge-teal-border: #0A524D;
  --badge-teal-foreground: #DCF7F4;
}

/* ---------- MODE-INDEPENDENT: primitives, scale, type, opacity ---------- */
:root {

  --white: #FFFFFF;

  --purple-50: #F7F5FF;
  --purple-100: #EEE9FF;
  --purple-200: #DDD2FF;
  --purple-300: #C0ABFF;
  --purple-400: #A07EF9;
  --purple-500: #855CF8;
  --purple-600: #7149E0;
  --purple-700: #5E3DC0;
  --purple-800: #44307F;
  --purple-900: #382572;
  --purple-950: #24184B;
  --purple-ink-18: rgb(133 92 248 / 0.18);
  --purple-ink-25: rgb(133 92 248 / 0.25);
  --purple-ink-50: rgb(133 92 248 / 0.5);

  --red-50: #FFF0F0;
  --red-100: #FFE0E1;
  --red-200: #FFC6C8;
  --red-300: #FF9FA2;
  --red-400: #FF6B6F;
  --red-500: #F03E3E;
  --red-600: #D92D33;
  --red-700: #B42328;
  --red-800: #8F1D1D;
  --red-900: #661414;
  --red-950: #430C0C;

  --green-50: #F1FAF5;
  --green-100: #DDF5E7;
  --green-200: #BEE8CF;
  --green-300: #97D7B0;
  --green-400: #5DBB82;
  --green-500: #16B364;
  --green-600: #129253;
  --green-700: #0F7443;
  --green-800: #0B4D31;
  --green-900: #0B3F2D;
  --green-950: #072A1E;

  --yellow-50: #FFF9EC;
  --yellow-100: #FFF4DE;
  --yellow-200: #FFE2A4;
  --yellow-300: #FFD06D;
  --yellow-400: #FFBC33;
  --yellow-500: #FEAD07;
  --yellow-600: #D99205;
  --yellow-700: #AF7607;
  --yellow-800: #7A520B;
  --yellow-900: #63420D;
  --yellow-950: #412A09;

  --teal-50: #F0FBFA;
  --teal-100: #DCF7F4;
  --teal-200: #AFEAE3;
  --teal-300: #7ED9D0;
  --teal-400: #42C4B7;
  --teal-500: #0BC2B1;
  --teal-600: #099D90;
  --teal-700: #0A7D73;
  --teal-800: #0A524D;
  --teal-900: #0B4541;
  --teal-950: #072F2D;

  --indigo-50: #F5F6FF;
  --indigo-100: #E8EAFF;
  --indigo-200: #CDD2FF;
  --indigo-300: #A3ADFF;
  --indigo-400: #7B85F5;
  --indigo-500: #6067E7;
  --indigo-600: #5056CB;
  --indigo-700: #4348AD;
  --indigo-800: #373B88;
  --indigo-900: #2A2E66;
  --indigo-950: #1B1E44;

  --cyan-50: #F2FCFF;
  --cyan-100: #DDF7FE;
  --cyan-200: #AFEFFF;
  --cyan-300: #5FD1EE;
  --cyan-400: #16BCE2;
  --cyan-500: #00A9D6;
  --cyan-600: #008DB4;
  --cyan-700: #007191;
  --cyan-800: #005A73;
  --cyan-900: #104A5D;
  --cyan-950: #062F3D;

  --blue-50: #F1F7FF;
  --blue-100: #DFECFF;
  --blue-200: #BDD8FE;
  --blue-300: #93BCFC;
  --blue-400: #6B9FF8;
  --blue-500: #558FFD;
  --blue-600: #4176DA;
  --blue-700: #355FB0;
  --blue-800: #284886;
  --blue-900: #213967;
  --blue-950: #162645;

  --fuschia-50: #FDF4FA;
  --fuschia-100: #F8E1F0;
  --fuschia-200: #F0BFE0;
  --fuschia-300: #DE90C3;
  --fuschia-400: #C865A4;
  --fuschia-500: #A2417B;
  --fuschia-600: #883666;
  --fuschia-700: #6F2D53;
  --fuschia-800: #552240;
  --fuschia-900: #401A30;
  --fuschia-950: #2A101F;

  --orange-50: #FFF6EC;
  --orange-100: #FFE8C9;
  --orange-200: #FFC98F;
  --orange-300: #FFAE57;
  --orange-400: #F89425;
  --orange-500: #EF860F;
  --orange-600: #D9770C;
  --orange-700: #BB630D;
  --orange-800: #985012;
  --orange-900: #763D11;
  --orange-950: #4F280B;

  --avatar-dark-purple: #412D7A;
  --avatar-dark-blue: #6067E7;
  --avatar-light-blue: #558FFD;
  --avatar-teal: #0BC2B1;
  --avatar-dark-green: #519E4B;
  --avatar-light-green: #85C727;
  --avatar-yellow: #FEAD07;
  --avatar-orange: #F47752;
  --avatar-red: #F94F43;
  --avatar-pink: #E6499A;
  --avatar-magenta: #A2417B;

  --shadow-ink-4: rgb(19 19 21 / 0.04);
  --shadow-ink-8: rgb(19 19 21 / 0.08);
  --shadow-ink-12: rgb(19 19 21 / 0.12);

  --space-0: 0px;
  --space-1: 1px;
  --space-2: 2px;
  --space-3: 3px;
  --space-4: 4px;
  --space-5: 5px;
  --space-6: 6px;
  --space-7: 7px;
  --space-8: 8px;
  --space-9: 9px;
  --space-10: 10px;
  --space-12: 12px;
  --space-14: 14px;
  --space-16: 16px;
  --space-18: 18px;
  --space-20: 20px;
  --space-22: 22px;
  --space-24: 24px;
  --space-28: 28px;
  --space-32: 32px;
  --space-36: 36px;
  --space-40: 40px;
  --space-42: 42px;
  --space-44: 44px;
  --space-48: 48px;
  --space-52: 52px;
  --space-56: 56px;
  --space-64: 64px;
  --space-72: 72px;
  --space-80: 80px;
  --space-96: 96px;
  --space-112: 112px;
  --space-128: 128px;
  --space-256: 256px;
  --radius-0: 0px;
  --radius-2: 2px;
  --radius-3: 3px;
  --radius-4: 4px;
  --radius-5: 5px;
  --radius-6: 6px;
  --radius-8: 8px;
  --radius-10: 10px;
  --radius-12: 12px;
  --radius-16: 16px;
  --radius-24: 24px;
  --radius-full: 9999px;
  --border-width-0-5: 0.5px;
  --border-width-1: 1px;

  --text-2xl: 20px;
  --text-xl: 16px;
  --text-lg: 14px;
  --text-base: 13px;
  --text-sm: 12px;
  --text-xs: 11px;
  --text-2xs: 10px;
  --text-style-display: "Inter Display";
  --text-style-body: "Inter";
  --text-style-code: "Roboto Mono";
  --text-weight-regular: 400;
  --text-weight-medium: 440;
  --text-weight-bold: 500;

  --opacity-subtle: 0.88;
  --opacity-dim: 0.56;
  --opacity-disabled: 0.5;
  --opacity-hidden: 0;
}
```

The CSS names are the Figma paths joined with hyphens: `background/overlay/hover` → `--background-overlay-hover`. Use the same names when you talk about tokens.

---

## Color

### Surfaces: the layering model

Grep's app frame is a **double left sidebar**, a **canvas** and an optional **right panel**. Components sit on top.

| Token | Light | Dark | Use (from source) |
|---|---|---|---|
| `background-left-sidebar-shell` | `#E7E7E8` | `#0E0E0F` | "Global section of the sidebar; the left-most portion… the part of the double sidebar that can be collapsed" |
| `background-left-sidebar` | `#F4F4F4` | `#151619` | "The drive section of the sidebar; the second section… lists out the drive, favorites, sharing, etc." |
| `background-canvas` | `#FCFCFC` | `#131315` | "The default fill background for the entire app frame; components and panels sit on top of this" |
| `background-panel` | `#FDFDFD` | `#151618` | "Right side pop out panels", e.g. member activity or asset preview |
| `background-component` | `#FEFEFE` | `#16171A` | "Cards, modals, menus, and radio and checkbox components in their idle state" |
| `background-component-shell` | `#F4F4F4` | `#151619` | "Emphasis on frames that surround component fills", e.g. the Code Block |
| `background-tile` | `#FDFDFD` | `#1F2023` | "Default fill for tiles; often sit on top of component fills; a level lighter on cards in dark mode" |
| `background-field` | `#FFFFFF` | `#1F2023` | Inputs, selects, dropdowns, text areas, search bars |
| `background-toggle-off` | `#EDEDED` | `#1F2023` | Toggle track when off. Checkboxes and radios use `background-component` when idle |

Rules:

- **Stack in order:** sidebar-shell → sidebar → canvas → component → tile or field. Never put a surface on a darker surface from further up the stack (a tile on the sidebar-shell, say).
- **Light and dark run opposite ways.** In light mode, raised things get *whiter*. In dark mode they get *lighter than the canvas* (`#131315` → `#16171A` → `#1F2023`). Semantic tokens handle this for you, so don't reverse anything by hand.
- The steps are tiny on purpose (≈1–3% lightness). Pair every raised surface with a `border-base` hairline so it reads **(inferred)**.
- **Flat fills:** `background-contrast-subtle` / `background-contrast` / `background-contrast-strong` are translucent ink washes for "flat text areas and fills" (the flat Tile variant, inputs on the asset card). `-strong` is for **keyboard shortcut** keycaps.

### Text and icons

Neutral text and icons are **translucent ink**: `#131315` in light mode and `#F0F0F0` in dark, at set opacities. They blend with whatever surface they sit on. Text and icons have **separate** scales; don't mix them.

| Role | Text token | Icon token | Contrast on canvas, light / dark |
|---|---|---|---|
| Primary: body, titles, values | `foreground-text-base` (96%) | `foreground-icon-base` (88%) | text 16.5 / 15.0 · icon 13.0 / 12.7 |
| Secondary: labels, metadata | `foreground-text-subtle` (72%) | `foreground-icon-subtle` (56%) | text 7.3 / 8.8 · icon 4.2 / 5.7 |
| Tertiary: hints, timestamps | `foreground-text-dim` (56%) | `foreground-icon-dim` (44%) | text 4.2 / 5.7 · icon 2.9 / 4.0 |
| Placeholder, disabled | `foreground-text-faint` (36%) | `foreground-icon-faint` (32%) | text 2.3 / 3.1 · icon 2.1 / 2.7 |
| On a saturated fill | `foreground-text-on-color` | `foreground-icon-on-color` | white in both modes |

- `foreground-text-dim` is just under 4.5:1 in light mode. Use it for short, non-essential text at 12px or more, never for body copy or anything the user has to read to act **(inferred)**.
- `foreground-text-faint` is only for placeholders and disabled states.
- Brand-colored text: `foreground-brand` (hover: `foreground-brand-hover`). The source reserves it for **selected toggles, checkboxes and radios**. It's 4.2:1 light / 3.3:1 dark, so don't use it for paragraph links **(inferred)**.
- Destructive text and icons: `foreground-danger` / `foreground-danger-hover`.
- **Hover flips direction in dark mode:** `foreground-brand-hover` is *darker* in light mode and *lighter* in dark mode. The same goes for danger and `button-brand-background-hover`. Always use the `-hover` token; don't compute it.

### Borders

| Token | Light | Dark | Use |
|---|---|---|---|
| `border-base` | `#DFE1E4` | `#2C2F35` | Default for buttons, inputs, cards, menus |
| `border-subtle` | `#EDEDED` | `#212124` | Dividers, "Dividing Line component in subtle variant" |
| `border-brand` | purple 600 / 500 | | Selected or focused brand outline |
| `border-brand-subtle` | purple @ 50% | | Softer brand outline, e.g. a selected card **(inferred)** |
| `border-danger` | red 500 / red 800 | | "Button and Icon Button Danger variants"; invalid fields **(inferred)** |

**Border width:** `--border-width-0-5` (**0.5px**) is "the default border width for all components". `--border-width-1` (1px) is for **hover**, and for toggles, checkboxes and radios "to boost visibility". A 1px border at rest is off-brand.

That covers a component's own edge (tier 2). **Dividing lines are separate** — see [RULES.md](./RULES.md) > Line weights: 1px `border-base` between major app regions, 1px `border-subtle` between sections inside a component.

**Drawing the hairline.** Figma strokes sit on the edge and don't consume the padding box; a CSS `border` does. On any component with a fixed-size child — an icon in a tile, for example — a real border steals a pixel and the child renders undersized. Draw the hairline as an inset ring instead, so the geometry matches Figma exactly:

```css
box-shadow: inset 0 0 0 0.5px var(--border-base);
```

Use a plain `border` only where the content is text-sized and a pixel of inset doesn't change the layout.

### Interaction states: overlays, not new colors

Hover, pressed and selected are **translucent ink layers painted over** the element's normal fill. They're never a swap to a different solid color. That's what makes one state recipe work on every surface and in both modes.

| State | Token | Light | Dark | Use |
|---|---|---|---|---|
| Hover, subtle | `background-overlay-hover-subtle` | ink 2% | ink 2% | Large rows and cards where 6% is too heavy **(inferred)** |
| Hover | `background-overlay-hover` | ink 6% | ink 6% | "Sidebar item fills, items that need more emphasis" |
| Hover, strong | `background-overlay-hover-strong` | ink 20% | `#131315` at 36% | Hover over imagery and thumbnails **(inferred)** |
| Selected | `background-overlay-selected` | ink 10% | ink 8% | Current sidebar item, selected row **(inferred)** |
| Pressed | `background-overlay-pressed` | ink 12% | ink 10% | Active/mousedown **(inferred)** |
| Scrim | `background-overlay-scrim` | ink 20% | `#131315` at 72% | Behind centered modals and the left sidebar hover, "to draw focus to the component on top" |

In dark mode, `hover-strong` and `scrim` *darken* (they use the dark `#131315` ink), while the other overlays lighten.

How to apply an overlay without losing the base fill:

```css
.item { background: var(--background-component); }
.item:hover { background-image: linear-gradient(var(--background-overlay-hover), var(--background-overlay-hover)); }
.item[aria-selected="true"] { background-image: linear-gradient(var(--background-overlay-selected), var(--background-overlay-selected)); }
```

On a transparent row (sidebar items, menu items, ghost buttons) you can set the overlay token as `background` directly.

**Hover-reveal gradient:** `background-transparent` is the component fill at 0% alpha. Use it for "linear gradient shadows for hover components that overlay text", e.g. action buttons that fade in over a Folder Card title:

```css
.card-actions { background: linear-gradient(to left, var(--background-component) 60%, var(--background-transparent)); }
```

### Buttons

| Variant | Fill | Hover | Text / icon | Border |
|---|---|---|---|---|
| **Brand** (primary action, one per view) | `button-brand-background` | `button-brand-background-hover` | `foreground-text-on-color` | `border-brand` at 0.5px |
| **Neutral** (default) | `button-neutral-background` | add overlay `button-neutral-background-overlay-hover` | `foreground-text-base` / `foreground-icon-base` | `border-base` at 0.5px |
| **Contrast** (dark in light mode, frosted in dark) | `button-contrast-background` | add overlay `button-contrast-background-overlay-hover` | `button-contrast-text` / `button-contrast-icon` | `button-contrast-border` |
| **Ghost** (toolbars, icon buttons) | transparent | `button-ghost-background-hover` | `foreground-text-subtle` / `foreground-icon-subtle` **(inferred)** | none |
| **Danger** | `button-danger-background` | `button-danger-background-hover` | `foreground-text-on-color` | `border-danger` |

Neutral and contrast hovers are **overlays added on top of** the fill (the source says "in addition to"). Brand, ghost and danger hovers swap the fill.

White on `button-brand-background` is 4.3:1 in light mode, so keep brand-button labels at 13px medium or larger **(inferred)**. White on the light danger button is 3.8:1, so use the same care.

### Accents: fills, not surfaces

`background-accent-*` are for **indicators**, not panels or buttons.

| Token | Use |
|---|---|
| `background-accent-brand` | Loading/progress bar fill |
| `background-accent-success` / `-warning` / `-danger` | Loading/progress bar fill by status |
| `background-accent-action` | "Focused states on action Automation blocks" |
| `background-accent-brand-subtle` | Date picker mid-range selection (purple at 25% / 18%) |
| `background-accent-favorite` | Star icon fill for favorited assets (yellow 500, both modes) |
| `background-accent-scrub-line` | Video scrub line on the Asset Card (red 500, both modes) |

### Badges (and any tinted status label)

Ten accent tones, each with `background`, `border` and `foreground`. Always use all three from the **same tone**. They all pass AA (5.1:1 or better) in both modes.

`badge-brand` · `badge-success` · `badge-warning` · `badge-destructive` · `badge-indigo` · `badge-fuschia` · `badge-orange` · `badge-blue` · `badge-cyan` · `badge-teal`

The Badge component adds **two neutral tones** that have no `badge-*` variables and so don't appear in a token export: *Neutral Base* (`button-neutral-background` / `border-base` / `foreground-text-base`) and *Neutral Dim* (`background-contrast` / `border-base` / `foreground-text-dim`). See `Components/badge/badge.md`.

- Status meaning: brand = new or featured, success, warning, destructive = error or failed **(inferred)**. The rest (indigo, fuschia, orange, blue, cyan, teal) are for **categories** (file types, tags, teams) with no status meaning **(inferred)**.
- Note the spelling `fuschia`: that's the token name, so use it as is.
- Badge tones are for small labels. Don't reuse them as card backgrounds, banners or buttons.

### Avatars

`--avatar-*` (dark-purple, dark-blue, light-blue, teal, dark-green, light-green, yellow, orange, red, pink, magenta) are fills for **user initials avatars** only. Pick one deterministically from the user id so each person always gets the same color **(inferred)**. Initials use `foreground-text-on-color`.

### Primitive ramps

`purple` (brand), `red`, `green`, `yellow`, `orange`, `teal`, `cyan`, `blue`, `indigo` and `fuschia`, each at 50–950, plus `white` and `purple-ink-18/25/50` (brand purple at those alphas). **There is no gray ramp.** Neutrals exist only as the semantic surfaces, borders and ink tokens above. If you reach for "gray-500", you want `foreground-text-dim`, `foreground-icon-subtle` or an overlay token.

---

## Typography

| Token | Size | Use |
|---|---|---|
| `--text-2xl` | 20px | "Page titles and Settings page titles": the largest in-product size |
| `--text-xl` | 16px | Section and dialog titles **(inferred)** |
| `--text-lg` | 14px | "Large variant of the Label component"; emphasized labels |
| `--text-base` | **13px** | "Default text size": body, inputs, buttons, badges, table cells, menu items |
| `--text-sm` | 12px | Breadcrumb labels (500 path / 440 simplified); secondary metadata, captions **(inferred)** |
| `--text-xs` | 11px | Dense metadata, keyboard shortcuts **(inferred)** |
| `--text-2xs` | 10px | Tiny counters only **(inferred)** |

- **Families:** `--text-style-display` (Inter Display) for `text-xl` and `text-2xl` headings. `--text-style-body` (Inter) for everything else. `--text-style-code` (Roboto Mono) for code, IDs, hashes and file paths.
- **Weights:** `regular` 400 for body. `medium` **440** for labels, table headers and nav items. `bold` **500** for titles **and button labels** (the Button component binds `label-base-bold`). Nothing heavier exists, so never use 600 or 700.
- **Line height and letter spacing aren't defined yet.** Until they are, use line-height `1.45` for 12–14px, `1.3` for 16–20px, `1` for single-line controls sized by height, and default letter spacing **(inferred)**.
- There is no marketing or hero scale. In-product, nothing is larger than 20px.

## Spacing

The scale is in px and named by value (`--space-8` = 8px): 0–10 in 1px steps, then 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 42, 44, 48, 52, 56, 64, 72, 80, 96, 112, 128, 256.

- Only use values on the scale. `15px`, `30px` and `50px` don't exist, so pick the neighbor.
- **Density:** 2–6 inside compact controls. Read from components: button icon-to-label gap 6; badge gap 4, padding `0/8` at full radius and `0/6` at rounded, height fixed at 22. **(the rest inferred)** 8–12 for control padding and gaps within a group. 16–24 for card padding and gaps between groups. 32–48 between page sections. 64 and up only for empty states and page margins.

## Radius

`--radius-0, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24, full`

**(inferred, pending component specs):** 4–6 for buttons, inputs, menu items and badges. 8–12 for cards, menus and popovers. 16 for modals and panels. `full` for avatars, toggles and pills. Nested corners: inner radius = outer radius − padding (a `component-shell` at radius-12 with 4px padding holds a component at radius-8).

## Opacity

`--opacity-subtle` 0.88 · `--opacity-dim` 0.56 · `--opacity-disabled` **0.5** · `--opacity-hidden` 0

Disabled controls: `opacity: var(--opacity-disabled)` on the whole control, plus `cursor: not-allowed`. Don't recolor them. Use `opacity-hidden` for hover-revealed actions at rest.

## Elevation

Grep elevates with **surface step + hairline border first**. Shadows are a supporting cue only. The source defines shadow *colors* but no geometry:

`--shadow-ink-4` (4%) · `--shadow-ink-8` (8%) · `--shadow-ink-12` (12%)

**Geometry read from Figma effect styles.** Every named effect style lives in `effects.css`, imported by `grep-ui.css` — components never declare their own:

`--elevation-button` · `--elevation-button-focus` · `--elevation-focus-ring` · `--elevation-avatar` · `--elevation-card` · `--elevation-interactive` · `--elevation-interactive-focus`

`--elevation-interactive` is an **inset** shadow (`inset 0 1px 2px 0 shadow-ink-12`) that gives checkboxes, radios, toggles and fields their recessed look.

Still-suggested geometry for layers with no effect style yet **(inferred)**:

```css
--elevation-menu:  0 2px 8px var(--shadow-ink-8), 0 0 0 var(--border-width-0-5) var(--border-base);
--elevation-modal: 0 8px 24px var(--shadow-ink-12), 0 0 0 var(--border-width-0-5) var(--border-base);
```

Cards on the canvas get **no** shadow, just a border. Menus, popovers and modals get a shadow. Small controls are the exception: buttons and avatars/tiles carry their own tight base shadow from the effect styles above. In dark mode shadows barely show, so the border and surface step do the work.

## Focus

Focus is a **shadow ring**, not an outline, and there are **two sizes**:

| Style | Geometry | Used by |
|---|---|---|
| `--elevation-focus-ring` / `--elevation-card-focus` | 2px canvas gap + 4px brand @ 60% | buttons, cards, anything button-sized |
| `--elevation-input-focus` | 1px canvas gap + **2.5px** brand @ 60% | text fields, search — `--elevation-input-focus-danger` is the error twin |
| `--elevation-interactive-focus` | 1px canvas gap + 2px brand @ 60% | checkboxes, radios, and presumably toggles |

Both are in `effects.css`. The button's own style bundles its resting shadow with the large ring:

```css
--elevation-button-focus:
  0 1px 2px 1px var(--shadow-ink-8),      /* the resting shadow, spread to 1 */
  0 0 0 2px var(--background-canvas),      /* gap ring, punches out the canvas */
  0 0 0 4px rgb(133 92 248 / 0.6);         /* brand at 60% */
```

Apply it on `:focus-visible` only. Because the gap ring is painted in `background-canvas`, a focused control sitting on a panel or sidebar will show a canvas-colored halo — repaint that layer with the actual surface behind the control when it isn't on the canvas **(inferred)**.

---

## Don'ts

These are the ways generated UI usually drifts off-brand. Check your output against every one.

1. **No pure black or white for neutrals.** Text is ink at 96%, not `#000`. In light mode, surfaces are `#FCFCFC`/`#FEFEFE`, not `#FFF` (only fields and neutral buttons are `#FFFFFF`).
2. **No generic gray palettes** (Tailwind `gray-*`, `zinc-*`, `slate-*`). Grep has no gray ramp.
3. **No 1px borders at rest.** The default is 0.5px. 1px means hover, or a toggle/checkbox/radio.
4. **No 14–16px body text.** Body is 13px, and nothing in the product is above 20px.
5. **No font-weight 600/700.** The maximum is 500, and labels use 440.
6. **No purple everywhere.** Brand color is for the primary action, selected controls, progress and focus. Most screens are 95% neutral.
7. **No solid hover colors.** Hover, pressed and selected are overlay tokens layered on the base fill.
8. **No shadows on cards.** Use border and surface step. Shadows are for floating layers, plus the tight base shadow that buttons and avatars/tiles carry.
9. **No badge tones as surfaces**, and no accent tokens (`background-accent-*`) as button or panel fills.
10. **No hand-made dark mode.** Never invert, `filter`, or pick dark hexes yourself. Switch `data-theme` and let the tokens swap.
11. **No gradients, glows or decorative color washes.** The only gradient in the system is the `background-transparent` hover-reveal fade.
12. **No off-scale spacing or radius values.**
13. **No brand-colored body text or links.** `foreground-brand` is below 4.5:1 in both modes (4.2 light, 3.3 dark).

## Components

Components live in `../Components/<name>/`, one folder each holding the `.md` spec, the `.css`, a preview page and any exported assets. **Read the spec for every component a screen uses before building it**, and use its class names in the markup rather than styling elements yourself.

| Component | Spec | Classes |
|---|---|---|
| Button | `Components/button/button.md` | `.grep-btn`, `--brand` `--neutral` `--inverted` `--danger` |
| Icon Button | `Components/icon-button/icon-button.md` | `.grep-icon-btn`, `--16`…`--40`, `--primary` `--neutral` `--inverted` `--danger` `--ghost` |
| Avatar / Tile | `Components/avatar/avatar.md` | `.grep-avatar`, `--icon-tile`, `--12`…`--40`, `--full`, `--interactive` |
| Badge | `Components/badge/badge.md` | `.grep-badge`, `--full` `--rounded`, `--neutral-base` `--neutral-dim` + 10 accent tones |
| Breadcrumbs | `Components/breadcrumbs/breadcrumbs.md` | `.grep-breadcrumbs`, `.grep-crumb`, `--folder` `--icon` `--icon-only` `--simplified`, `--active` |
| Banner | `Components/banner/banner.md` | `.grep-banner`, `--info` `--success` `--warning` `--danger` |
| Progress Bar | `Components/progress-bar/progress-bar.md` | `.grep-progress`, `--brand` `--success` `--warning` `--danger` |
| Checkbox | `Components/checkbox/checkbox.md` | `.grep-checkbox`, `--checked` `--indeterminate`; `.grep-checkbox-group`, `--card` |
| Radio | `Components/radio/radio.md` | `.grep-radio`, `--checked`; `.grep-radio-group`, `--card` |
| Label | `Components/label/label.md` | `.grep-label`, `--lg` `--bold` `--path` `--sub-sm` `--sub-xs` `--sub-subtle` |
| Input | `Components/input/input.md` | `.grep-input`, `--32`, `__field` `__control` `__addon` `__rule` `__unit` `__inset`, `--error` `--disabled` |
| Search | `Components/search/search.md` | `.grep-search`, `--32` `--ghost` `--danger` |
| Segmented Control | `Components/segmented-control/segmented-control.md` | `.grep-segmented`, `--32`; `.grep-segment`, `--selected` `--icon` |
| Select / Multi Select | `Components/select/select.md` | `.grep-select` inside `.grep-input__field`; `__value` `__fill` `__chevron` |
| Tabs | `Components/tabs/tabs.md` | `.grep-tabs`; `.grep-tab`, `--32` `--36` `--full` `--selected` |
| Toast | `Components/toast/toast.md` | `.grep-toast`, `__main` `__content` `__icon` `__text` `__actions` `__link` |
| Toggle | `Components/toggle/toggle.md` | `.grep-toggle`, `--md` `--on`; `.grep-toggle-group`, `--card` |
| Tooltip | `Components/tooltip/tooltip.md` | `.grep-tooltip`, `--top` `--bottom` `--left` `--middle` `--right`; `__text` `__shortcut` `__tail` |
| Modal **(no Figma node — derived)** | `Components/modal/modal.md` | `.grep-modal-overlay`; `.grep-modal`, `--520`; `__header` `__body` `__footer` |
| Item Block | `Components/item-block/item-block.md` | `.grep-item-block`, `.grep-item-row`, `--open` `--interactive`, `__tile` `__label-frame` `__chevron` `__rule` |
| Keyboard Shortcut | `Components/keyboard-shortcut/keyboard-shortcut.md` | `.grep-kbd`, `--lg`, `--label` `--letter` `--number` `--icon`; `.grep-kbd-group` |
| Dividing Line | `Components/divider/divider.md` | `.grep-divider`, `--vertical` `--subtle` `--thin` |
| Context Menu | `Components/context-menu/context-menu.md` | `.grep-menu`, `__section` `__header` `__item` `__rule`, `--danger` |
| File Tree Menu | `Components/file-tree-menu/file-tree-menu.md` | `.grep-tree-menu`, `.grep-tree-item`, `--selected` `--collapsed` |

Each spec ends with an **Inferred** list — the lines derived from tokens rather than read from Figma. Treat those as provisional.

**Exported assets.** Icons exported from Figma live beside the component that uses them. Two things to watch when cleaning one up:

- Figma exports reference their own `<defs>` by id (`url(#paint0_linear…)`, `clip-path`, filters). Stripping layer ids wholesale breaks those references and the glyph renders blank or unclipped — keep any id that a `url(#…)` points at.
- Exports carry a C2PA `<metadata>` block that can be several times the size of the artwork. Strip it, but re-check after writing: something in the save path re-injects it.

A single-colour glyph should have its fills swapped to `currentColor` so it inherits the component's ink — and Figma writes those fills as **named colours as well as hex** (`fill="white"`), so match both or the glyph renders white-on-white in light mode. A multicolour one (file-type icons, for example) keeps its own fills and is **content, not chrome** — ship it as an example, not as part of the component.

For anything not in the table, build from the tokens and rules above and prefer the simplest variant.

## Gaps in the source tokens

Known holes, so you don't mistake them for rules:

- No line-height or letter-spacing tokens (interim values above). Focus and shadow geometry now come from the Figma **effect styles**, not from variables, so they won't appear in a token export — read them off the components.
- No success or warning **text** token outside badges. Use `badge-success-foreground` / `badge-warning-foreground` on neutral surfaces for status text **(inferred)**.
- In dark mode `badge-teal-foreground` is teal **100**, while every other tone uses 200. That's intentional in the source, so use it as given.
- `button-contrast-text` is `#F0F0F0` in light mode but pure white (`foreground-text-on-color`) in dark mode.
