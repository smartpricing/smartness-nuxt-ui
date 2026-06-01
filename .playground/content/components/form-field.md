---
title: FormField
description: Drop-in UFormField wrapper that translates validation error messages through i18n, treating the Zod error message as a translation key.
category: form
prefix: S
componentName: FormField
tags: [form, validation, i18n, error, translation, zod, uformfield]
subcomponents: []
---

# SFormField

`SFormField` is a transparent wrapper around Nuxt UI's [`UFormField`](https://ui.nuxt.com/docs/components/form-field). It forwards every prop and slot unchanged, and only overrides the `#error` slot to **translate the error message through `useI18n()`**.

The intent: keep Zod schemas free of hard-coded, untranslated strings. Store an **i18n key** as the Zod message (e.g. `z.string().min(1, "zod-errors.name_required")`) and let `SFormField` resolve it to the user's locale at display time.

## Quick example

```vue
<SFormField :label="$t('clients.fields.name')" name="name">
	<UInput v-model="state.name" />
</SFormField>
```

With a schema that carries i18n keys as messages:

```ts
const schema = z.object({
	name: z.string().min(1, "zod-errors.name_required")
});
```

When validation fails, `UForm` routes the message (`"zod-errors.name_required"`) to the matching `SFormField` by `name`, and `SFormField` renders `t("zod-errors.name_required")` in the active locale.

## How it works

The `#error` slot applies a `te()` (translation-exists) guard:

```
{{ typeof error === "string" ? (te(error) ? t(error) : error) : "" }}
```

- If the message is a **known i18n key** → it is translated (`t`).
- If it is **already plain text** (e.g. a backend message, or Zod's default English) → `te()` is `false` and it passes through unchanged.

This makes `SFormField` compose safely with both key-based messages and any non-key strings.

## Requirements

- The consumer app must provide `useI18n()` (i.e. `@nuxtjs/i18n` installed). The layer itself stays i18n-free; `SFormField` resolves `useI18n` from the consumer's auto-imports at runtime.
- Translation keys live in the consumer's locale files (the layer does not ship them).

## Notes

- **Required numbers**: an empty numeric field is `undefined`, so the error comes from `z.number()` (`invalid_type`), not `.min()`. Put the key on the constructor too: `z.number({ error: "zod-errors.foo_required" }).min(1, "zod-errors.foo_required")`. Rule of thumb: attach the message to the check that fires for the field's real empty value (`undefined` → constructor, `0`/`""`/`[]` → `.min()`).
- **Display-only**: `@error` / `form.getErrors()` still expose the raw key — translate at the call site if you read messages programmatically.
- Smart pickers that wrap `UFormField` internally (e.g. `SmartClientPicker`) can swap to `SFormField` once and gain translated errors everywhere they're used.
- All other `UFormField` props, slots (`label`, `hint`, `description`, `help`) and behaviour are untouched.
