# Grep UI — Rules

Decisions Dan has made that the components and `DESIGN.md` don't settle on their own. Unresolved ones are tracked in [CONTRADICTIONS.md](./CONTRADICTIONS.md) until he settles them. These outrank inferred guidance anywhere else in the library. Where a rule and a Figma node disagree, raise it rather than silently following one.

## Line weights

Three tiers. Weight signals scope; colour signals whether you're inside or outside a component.

| Line | Weight | Token | Example |
|---|---|---|---|
| **Major app section divider** | 1px | `border-base` | Left sidebar from main content; top bar from body; main content from a right panel |
| **Component border** | 0.5px | `border-base` | A card's edge, a button's edge, an input's edge, a menu's outer edge |
| **Section divider inside a component** | 1px | `border-subtle` | A menu's search header from its list; groups within a menu; sections of a card |

Read it as two questions:

1. **Am I drawing the edge of a component, or a line between things?** An edge is 0.5px. A divider is 1px.
2. **If it's a divider — does it separate parts of the app, or parts of one component?** App regions get `border-base`. Inside a component, `border-subtle`.

In CSS: `.grep-divider` (1px `border-base`) for app sections, `.grep-divider--subtle` (1px `border-subtle`) inside components, and a component's own edge is a 0.5px hairline drawn as an inset ring, not either divider class.

`--border-width-0-5` remains the default for component *borders*, which is tier 2 — it was never about dividers. `.grep-divider--thin` (0.5px) has no assigned use under this rule.
