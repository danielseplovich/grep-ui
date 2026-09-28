# Grep UI docs

A component documentation site for Grep UI, structured like Medusa UI's docs and built entirely from Grep UI's own tokens and components.

The site reads the library straight from the parent folder at build time — `../Components/*/*.md` for the specs, `../Components/*/*.css` and `../grepmd/*.css` for the styles, `../Grep UI */*.tokens.json` for token descriptions, and `../AGENTS.md`, `../grepmd/RULES.md`, `../grepmd/CONTRADICTIONS.md`, `../grepmd/DESIGN.md` for the library-level pages. **Edit a spec and the site updates.** Nothing is copied.

## Run it

```sh
cd docs
npm install
npm run dev        # http://localhost:5173
```

```sh
npm run build      # typechecks, then writes a static site to dist/
npm run preview    # serves dist/ locally
```

`dist/` is a plain static site. It uses client-side routing, so a host needs to serve `index.html` for unknown paths (Netlify `_redirects`, Vercel rewrites, `vite preview` does this already).

## How a component page is assembled

Each `Components/<name>/<name>.md` is split by its `##` headings:

| Spec section | Where it lands |
|---|---|
| Title + first paragraph | Page title and descriptor |
| `Source: …` paragraph | The "Source" line under the descriptor |
| `## Markup` (or the first ```html block) | **Usage** |
| Any section with a table or code block | **API reference** |
| Any prose-only section | **Guidelines** |
| `## Inferred …` | **Notes**, warning callout |
| `## Not covered …`, `## Open questions …` | **Notes**, info callout |
| `## … contradiction …`, `## … inconsistency …` | **Notes**, danger callout |
| `## Corrections applied …` | **Notes**, collapsed |

**Preview** and **Examples** are authored per component in `src/examples/<name>.ts`, using only the classes the spec documents. Inline SVGs come from the library's own exported assets (`src/lib/icons.ts`); the Code tab collapses their bodies to `…` and Copy always copies the full markup.

Add a new component by adding its folder to `Components/` (and its `@import` to `grepmd/grep-ui.css`), then an entry in `src/examples/index.ts`. Without examples the page still renders, with a placeholder in the Preview slot.

## Layout

```
src/
  lib/        markdown parsing, spec loader, token parsing, icon registry, nav, theme
  components/ site chrome: layout, sidebar, search (⌘K), TOC, example block, callouts
  pages/      Introduction, Installation, Rules, Contradictions, Foundations, ComponentPage
  examples/   one file per component
  styles/     site.css — the docs chrome, tokens only
scripts/      Playwright QA (npm run qa, npm run qa:interact; needs `npx playwright install chromium`)
```

## Conventions the site follows

- Every value in `site.css` is a Grep UI token. Library components are used wherever one exists (buttons, tabs, search, banner, badge, keyboard shortcut, context-menu items, modal). The sidebar, table of contents and code block are layout composed from tokens, since the library has no nav shell or code block component yet (listed under "Not in the library yet").
- Light is default; dark is `data-theme="dark"` on `<html>`, remembered in `localStorage` and following the OS until you pick one. Each example can preview in the opposite theme on its own.
- Syntax highlighting is monochrome: weight and ink opacity, with attribute values in the brand text tone.
