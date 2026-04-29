---
title: UInput (Smartness defaults)
description: Nuxt UI UInput with the layer's slot override making the input fill its container by default.
category: form
prefix: U
componentName: Input
showcaseSlug: input
tags: [input, form, slot, full-width]
subcomponents: []
---

# UInput — Smartness customizations

The layer registers a small slot override in `app/app.config.ts`:

```ts
input: {
	slots: {
		root: "w-full"
	}
}
```

That makes every `UInput` full-width by default — match the form-grid behavior expected in the Smartness PMS UI.

## Notes

- All other Nuxt UI v4 input props (`type`, `icon`, `trailing-icon`, `placeholder`, `loading`, `disabled`, `size`, `color`) behave as upstream.
- For phone numbers, use `SPhoneInput` instead.
