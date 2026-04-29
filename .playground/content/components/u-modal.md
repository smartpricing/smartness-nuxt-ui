---
title: UModal (Smartness)
description: Nuxt UI UModal — used as the underlying primitive for SConfirmModal and for ad-hoc dialogs in the playground.
category: overlay
prefix: U
componentName: Modal
showcaseSlug: modal
showcaseFile: Modal
tags: [modal, dialog, overlay, fullscreen]
subcomponents: []
---

# UModal — Smartness usage

`UModal` is consumed without component-level overrides; it inherits the design system color/radius tokens.

## Quick example

```vue
<UModal v-model:open="open" title="New booking">
	<template #body>
		<!-- form content -->
	</template>
	<template #footer>
		<UButton variant="ghost" @click="open = false">Cancel</UButton>
		<UButton color="primary" @click="save">Save</UButton>
	</template>
</UModal>
```

## Patterns

- Use **`SConfirmModal`** for destructive confirmation flows.
- For wide editor-style dialogs, prefer **`USlideover`** instead.

## Notes

- Use `fullscreen` prop for mobile-first dialogs.
- The default radius matches `--ui-radius` (0.25rem), aligned with the layer's `@theme` token.
