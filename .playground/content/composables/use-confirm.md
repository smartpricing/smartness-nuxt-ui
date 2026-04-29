---
title: useConfirm
description: Imperative API to open a `SConfirmModal` and await the user's choice — eliminates the need to manage `v-model:open` state for every confirmation.
name: useConfirm
tags: [confirm, modal, dialog, imperative, async]
---

# useConfirm

Pairs with `SConfirmModal` to provide a Promise-based confirmation API. The consuming app must mount the modal portal once at the layout level.

## Quick example

```ts
const { confirm } = useConfirm();

async function onDelete() {
	const ok = await confirm({
		title: "Delete property?",
		description: "This action cannot be undone.",
		confirmLabel: "Delete",
		confirmColor: "error"
	});
	if (ok) await api.delete(propertyId);
}
```

## Options

```ts
interface ConfirmOptions {
	title: string
	description?: string
	confirmLabel?: string
	cancelLabel?: string
	confirmColor?: "primary" | "error" | "warning" | string
	confirmVariant?: "solid" | "soft" | "outline" | string
}
```

## Notes

- Returns `Promise<boolean>` — `true` if the user confirms, `false` if they cancel or close the modal.
- Multiple concurrent calls are queued.
