---
title: ConfirmModal
description: Reusable confirmation modal for destructive or important actions, paired with the `useConfirm` composable for imperative invocation.
category: overlay
prefix: S
componentName: ConfirmModal
showcaseSlug: confirm-modal
showcaseFile: ConfirmModal
tags: [modal, confirm, dialog, destructive, useConfirm]
subcomponents: []
---

# SConfirmModal

`SConfirmModal` provides a standardized confirmation dialog. Although the component file lives in `app/components/ConfirmationModal/`, the public name is `SConfirmModal` (kept for retro-compatibility with the original Smartness UI).

## Quick example — declarative

```vue
<SConfirmModal
	v-model:open="open"
	title="Delete property"
	description="This action cannot be undone."
	confirm-label="Delete"
	confirm-color="error"
	@confirm="onDelete"
/>
```

## Quick example — imperative via `useConfirm`

```ts
const { confirm } = useConfirm();

async function onArchive() {
	const ok = await confirm({
		title: "Archive this listing?",
		description: "It will no longer be visible to guests.",
		confirmLabel: "Archive"
	});
	if (ok) await archive();
}
```

## Notes

- The destructive style is opt-in via `confirm-color="error"` (or `confirm-variant="solid"` etc.).
- `useConfirm` requires the modal mount point to be present in the app shell once.
