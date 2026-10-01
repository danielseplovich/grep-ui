# Grep UI — React

React wrappers over the CSS in `Components/`. Load `grepmd/grep-ui.css` once; each component only maps props to the classes and states that CSS defines, so it looks exactly like the Figma node without carrying any styles of its own.

```tsx
import { Button } from "@shade/grep-ui/react"

<Button>Create</Button>
<Button variant="neutral" leadingIcon={<PlusIcon />}>Add</Button>
<Button variant="danger" isLoading>Deleting</Button>
<Button asChild><a href="/drive">Open drive</a></Button>
```

| Component | Figma | Status |
|---|---|---|
| Button | `Grep UI / Button` (157:1249) | done |

The source files are TypeScript (`.tsx`), so the consuming app's bundler compiles them. No build step here.
