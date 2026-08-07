# Where a slot is the only way to mark a node

## Summary

A cross-cutting index of every place where Nuxt UI refuses an attribute and forces the consumer to render its own element through a slot to make a node addressable. Each row is measured, not inferred: `/testids` in the playground renders the component with every channel bound at once and reads the DOM back.

This file exists because the individual blockers read as isolated quirks, and together they read as one design gap: **there is no general way to put an attribute on a node Nuxt UI renders for you.** Where a prop happens to exist (`close`, `increment`, `search-input`, `content`) it works; where the node comes from an `items` array it usually does not, and the workaround is always the same shape — take over the rendering with a slot just to attach an attribute.

## Versions

- `@nuxt/ui` 4.7.1
- `reka-ui` 2.6.x

## Why it matters

The failure is silent in every case below. `items: [{ label, 'data-testid': 'x' }]` type-checks — the item types carry an open index signature — renders, and produces no attribute. Nothing warns. A test written against it fails with "element not found", pointing at the test rather than at the cause.

The workaround also costs more than it looks. Rendering `#item-label` means the app now owns the label markup: `labelKey` no longer applies, and any leading icon, description or truncation the default rendering provided has to be re-implemented or accepted as lost. For a `data-*` attribute, that is a steep price.

## The index

| Component | Node | Direct route that fails | Slot that works | Id lands on |
| --- | --- | --- | --- | --- |
| `USelectMenu` | an option | `items: [{ 'data-testid' }]` | `#item-label` | `span` inside the option |
| `USelect` | an option | `items: [{ 'data-testid' }]` | `#item-label` | `span` inside the option |
| `UInputMenu` | an option | `items: [{ 'data-testid' }]` | `#item-label` | `span` inside the option |
| `UTabs` | a tab trigger | `items: [{ 'data-testid' }]` | `#default` | `span` inside `span[data-slot=label]` |
| `UAccordion` | a header | `items: [{ 'data-testid' }]` | `#default` | `span` inside `span[data-slot=label]` |
| `URadioGroup` | a radio | `items: [{ 'data-testid' }]` | `#label` | `span` inside the `<label>` — **not** the input |
| `UStepper` | a step | `items: [{ 'data-testid' }]` | `#title` | `span` inside `div[data-slot=title]` — **not** the trigger |
| `UCalendar` | a day cell | no prop exists | `#day` | `span` inside `div[data-slot=cellTrigger]` |
| `UTable` | a row / cell | `tr` and `td` accept no attributes at all | `#<columnId>-cell` | `span` inside the `td` |
| `UDropdownMenu` | the open panel | `:content="{ 'data-testid' }"` | `#content-top` | an element you add, inside the panel |
| `UContextMenu` | the open panel | `:content="{ 'data-testid' }"` | `#content-top` | an element you add, inside the panel |

### Not on the list, and why

- **`UCheckboxGroup`** — spreads the whole item object onto the rendered control (`CheckboxGroup.vue:114`), so the item object works and no slot is needed. Its twin `URadioGroup` does not. This asymmetry is the clearest evidence that the rest is an oversight.
- **`UDropdownMenu` / `UContextMenu` / `UNavigationMenu` / `UBreadcrumb` / `UCommandPalette` items** — routed through `pickLinkProps()` (`utils/link.js:43`), which explicitly forwards every `data-*` and `aria-*` key. The item object is the right answer there. Only their *panels* need a slot.
- **`UModal` / `USlideover` / `UPopover` / `UTooltip` / `USelectMenu` panels** — `content` reaches the element, so no slot is needed. Only the two menus break the pattern.
- **`UPinInput` boxes, `USlider` thumbs** — no slot exists either, so there is no workaround at all. Both have fixed cardinality and order, so taking them by position is defensible; it is still the only option.

## Two things the slots do not fix

**The id lands on the wrong node.** `URadioGroup`, `UStepper` and `UTabs` put it on a label or a title, not on the control the test has to click. A test can assert on it, and can often reach the control from it, but `getByTestId(...).click()` does not do what its author expects. Compare `UCheckboxGroup`, where the same job puts the id on the input.

**Sub-items are still unreachable.** Menu items of type `label`, `separator` and `checkbox`, and the parent of a submenu, bypass `pickLinkProps` — and no slot covers them either.

## Proposed fix

One change covers most of the table: **forward unknown `data-*` and `aria-*` keys from the item object to the rendered element**, the way `pickLinkProps()` already does for links. Applying that helper — or its key filter — in `SelectMenu.vue`, `Select.vue`, `InputMenu.vue`, `Tabs.vue`, `Accordion.vue`, `RadioGroup.vue` and `Stepper.vue` would make the library consistent with itself and remove the need for six of the slot workarounds above.

`UTable` needs its own answer, since `tr` / `td` are built by TanStack from the column definitions: an `attrs` entry in `meta`, alongside the `class` and `style` entries that already exist there.

The two menu panels are a separate bug, written up in [`nuxt-ui-dropdown-menu-content-attrs-dropped.md`](nuxt-ui-dropdown-menu-content-attrs-dropped.md).

## Upstream status

Not yet reported. This index is the shape the PR description should take: the per-component files carry the source citations, and this one carries the argument that they are a single inconsistency rather than seven separate requests.
