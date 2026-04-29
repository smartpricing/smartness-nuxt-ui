---
title: USlideover (Smartness)
description: Nuxt UI USlideover — used by the layer for editor-style side panels.
category: overlay
prefix: U
componentName: Slideover
showcaseSlug: slideover
showcaseFile: Slideover
tags: [slideover, panel, drawer, overlay, side]
subcomponents: []
---

# USlideover — Smartness usage

`USlideover` is consumed without component-level overrides. The layer provides showcase examples for the most common side-panel patterns (right-anchored drawer with header + footer + scrollable body).

## Quick example

```vue
<USlideover v-model:open="open" side="right" :ui="{ content: 'sm:max-w-2xl' }">
	<template #title>Edit listing</template>
	<template #body>
		<!-- form content -->
	</template>
	<template #footer>
		<UButton variant="ghost" @click="open = false">Cancel</UButton>
		<UButton color="primary" @click="save">Save</UButton>
	</template>
</USlideover>
```

## Notes

- Prefer `USlideover` over `UModal` for any editor with more than a few fields.
- Mobile breakpoints automatically switch to a bottom-anchored drawer.
