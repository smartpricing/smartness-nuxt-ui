---
title: ActionsGroup
description: Horizontal group of buttons with automatic overflow into a dropdown menu when space is limited.
category: navigation
prefix: S
componentName: ActionsGroup
showcaseSlug: actions-group
showcaseFile: ActionsGroup
tags: [actions, button, group, overflow, dropdown, toolbar]
subcomponents: []
---

# SActionsGroup

`SActionsGroup` lays out a horizontal row of buttons. When the available width is exceeded, the overflow buttons are folded into a dropdown trigger automatically.

## Quick example

```vue
<SActionsGroup
	:actions="[
		{ label: 'Save', icon: 'ph:floppy-disk', onClick: save },
		{ label: 'Duplicate', icon: 'ph:copy' },
		{ label: 'Archive', icon: 'ph:archive' },
		{ label: 'Delete', icon: 'ph:trash', color: 'error' }
	]"
	:max-inline="3"
/>
```

## Common patterns

- **Toolbar header**: pair with `SNavigationBarHeader#actions`.
- **Table row actions**: combine with `SMoreActions` for a single trailing menu when the row gets narrow.

## Notes

Each action accepts the same shape as `UButton` props (`label`, `icon`, `color`, `variant`, `disabled`, `onClick`).
