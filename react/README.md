# Grep UI — React

React wrappers over the CSS in `Components/`. Load `grepmd/grep-ui.css` once; each component only maps props to the classes and states that CSS defines, so it looks exactly like the Figma node without carrying any styles of its own.

```tsx
import { Button } from "@shade/grep-ui/react"

<Button>Create</Button>
<Button variant="neutral" leadingIcon={<PlusIcon />}>Add</Button>
<Button variant="danger" isLoading>Deleting</Button>
<Button asChild><a href="/drive">Open drive</a></Button>
```

| Component | Export | Status |
|---|---|---|
| Avatar | `Avatar` | done |
| Badge | `Badge` | done |
| Banner | `Banner` | done |
| Breadcrumbs | `Breadcrumbs` | done |
| Button | `Button` | done |
| Checkbox | `Checkbox`, `CheckboxMark` | done |
| Context Menu | `ContextMenu` | done (surface only; positioning is the app's) |
| Dividing Line | `Divider` | done |
| File Tree Menu | `FileTreeMenu` | done |
| Icon Button | `IconButton` | done |
| Input | `Input` | done |
| Item Block | `ItemBlock`, `ItemRow` | done |
| Keyboard Shortcut | `Kbd`, `KbdGroup` | done |
| Label | `Label` | done |
| Modal | `Modal` | done (Escape closes, focus restored; no focus trap yet) |
| Progress Bar | `ProgressBar` | done |
| Radio | `Radio` | done |
| Search | `Search` | done |
| Segmented Control | `SegmentedControl` | done |
| Select | `Select` | done (native list over the Grep trigger) |
| Tabs | `Tabs`, `Tab` | done |
| Toast | `Toast` | done (surface only; stacking and timing are the app's) |
| Toggle | `Toggle` | done |
| Tooltip | `Tooltip` | done (surface only; positioning is the app's) |

Icons: every exported SVG asset is also a React component in `react/icons` (`@shade/grep-ui/react/icons`).

The source files are TypeScript (`.tsx`), so the consuming app's bundler compiles them. No build step here.
