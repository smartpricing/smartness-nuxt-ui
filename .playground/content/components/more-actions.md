---
title: MoreActions
description: Single trailing menu of actions ("kebab menu") that exposes a configurable max number of inline buttons before collapsing the rest into a dropdown.
category: navigation
prefix: S
componentName: MoreActions
showcaseSlug: more-actions
showcaseFile: MoreActions
tags: [actions, menu, kebab, dropdown, table-row, overflow]
subcomponents: []
---

# SMoreActions

`SMoreActions` is the canonical "row actions" component for tables and toolbars. Unlike `SActionsGroup` it is built around a primary dropdown trigger, with optional inline actions before the kebab.

## Quick example

```vue
<SMoreActions
	:actions="[
		{ label: 'View', icon: 'ph:eye' },
		{ label: 'Edit', icon: 'ph:pencil' },
		{ label: 'Archive', icon: 'ph:archive' },
		{ label: 'Delete', icon: 'ph:trash', color: 'error' }
	]"
	:max-inline="1"
	show-tooltip
/>
```

## Common props

- `max-inline` — number of actions shown as standalone buttons before the kebab.
- `show-dropdown-icon` — chevron next to the kebab trigger.
- `show-inline-label` — render labels alongside icons for inline actions.
- `show-tooltip` — automatic tooltip for inline icon-only buttons.

## Notes

- Use this in `UTable` row actions slot. Keep `max-inline` small (1–2) to maintain row density.
