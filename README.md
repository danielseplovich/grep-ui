# Grep UI

The design system for **Grep**, a file and asset workspace. Plain CSS compiled from the Figma component set — tokens, effect styles and 24 components — plus a spec per component and a docs site.

## Use it in a project

```sh
npm install github:danielseplovich/grep-ui
```

```html
<link rel="preconnect" href="https://rsms.me/">
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap">
```

```css
@import "@shade/grep-ui";   /* = grepmd/grep-ui.css: tokens, effects, every component */
```

Light is the default; dark is `data-theme="dark"` on `<html>`. Start with [AGENTS.md](./AGENTS.md) for the rules, then the docs for each component.

To pin a release: `npm install github:danielseplovich/grep-ui#v0.1.0`.

## Docs

```sh
cd docs && npm install && npm run dev
```

The site reads the specs and CSS from this folder at build time, so editing a spec updates the docs. See [docs/README.md](./docs/README.md).

## Layout

| Path | What |
|---|---|
| `grepmd/grep-ui.css` | the single import |
| `grepmd/tokens.css`, `effects.css` | every token, light + dark; named effect styles |
| `grepmd/DESIGN.md`, `RULES.md`, `CONTRADICTIONS.md` | the system, the decisions, the open questions |
| `Components/<name>/` | spec, CSS, preview and assets per component |
| `Grep UI */*.tokens.json` | the Figma variable exports |
| `docs/` | the documentation site |

Precedence when two things disagree: Figma → the component spec → `RULES.md` → `DESIGN.md` → anything marked *(inferred)*.
