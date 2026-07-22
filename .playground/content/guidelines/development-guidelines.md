---
title: Development guidelines
description: Cross-project conventions for building Smartness frontend applications with Nuxt 4, TypeScript and the Smartness UI layer.
category: development
tags: [conventions, typescript, nuxt, code-style, zod]
---

# Development guidelines

These are the shared conventions for every Smartness Nuxt 4 frontend project. They cover naming, TypeScript usage, component authoring and code style. Follow them regardless of the specific product you are working on. Data-fetching architecture (stores, query layers, API structure) is a per-project concern and is not covered here.

## Technology stack

Every Smartness frontend project is built on the same stack:

| Concern | Tool |
|---------|------|
| Framework | **Nuxt 4** (Vue 3 Composition API) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** via **Smartness UI** (Nuxt layer on top of Nuxt UI) |
| Dates | **@internationalized/date** |
| Validation | **zod** |
| Package manager | **pnpm** (enforced) |

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm lint       # ESLint with auto-fix
pnpm preview    # Preview production build
```

---

## Coding conventions

### ESLint rules (enforced)

- **Tabs** for indentation
- **Double quotes** (`"`)
- **Semicolons required**
- **Vue block order**: `<template>`, `<script>`, `<style>`
- **Arrow parens**: always `(x) => x`
- **Brace style**: 1tbs

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `OrderElement.vue` |
| Pages | kebab-case | `sales-channels/index.vue` |
| Composables | `use` prefix | `useCalendarDates.ts` |
| Types | PascalCase | `Order`, `Customer` |

### Vue component structure

```vue
<template>
	<!-- Template -->
</template>

<script lang="ts" setup>
	// 1. Imports
	// 2. Props and Emits
	// 3. Composables
	// 4. Reactive state
	// 5. Computed properties
	// 6. Functions
	// 7. Lifecycle/watchers
</script>

<style scoped>
	/* Rely on tailwind first, use custom styles if needed */
</style>
```

---

## Critical development rules

### 1. Avoid `any`

```typescript
// ❌ BAD
const handleData = (data: any) => { /* ... */ };

// ✅ GOOD
const handleData = (data: Customer) => { /* ... */ };

// ✅ If needed, use unknown with type guards
const handleUnknown = (data: unknown) => {
	if (isApiError(data)) { /* typed handling */ }
};
```

**Exception:** genuinely dynamic backend structures may use a loose index-signature type (e.g. `Record<string, unknown>`), narrowed with type guards at the point of use.

### 2. Use VueUse before custom solutions

**Always check `@vueuse/core`** before implementing a custom composable. Common utilities:

- `refDebounced`, `useDebounceFn` — debouncing
- `useStorage`, `useLocalStorage` — storage
- `useClipboard`, `useFetch`, `useInfiniteScroll`
- `onClickOutside`, `useEventListener`

### 3. Use existing helpers and composables

Before writing a formatting or utility function, check the project's `app/utils/` directory. Never recreate logic that already exists there. Typical candidates for centralized helpers: date formatting, money/number formatting, error message extraction, client/server guards.

```typescript
// ❌ BAD - Inline ad-hoc formatting scattered across components
const formatted = `${date.getFullYear()}-${date.getMonth()}`;

// ✅ GOOD - One shared helper per concern, defined once in app/utils/ and reused
const formatted = formatDate(isoString, "date");
```

### 4. Use `@internationalized/date` for date operations

**Always use `@internationalized/date`** (the date library behind Nuxt UI's calendar components) instead of native `Date` methods. Centralize formatting in a single `app/utils/date.ts` with locale-aware presets (`"date"`, `"dateTime"`, `"time"`, …) and parsing/arithmetic helpers.

```typescript
// ❌ BAD - Native Date formatting
const formatted = new Date(isoString).toLocaleString("it-IT", {
	year: "numeric",
	month: "2-digit",
	day: "2-digit"
});

// ✅ GOOD - A project-level preset helper (define it once in app/utils/date.ts)
const formatted = formatDate(isoString, "date");

// ❌ BAD - Native Date parsing/manipulation
const date = new Date(dateString);
const tomorrow = new Date(date.getTime() + 86400000);

// ✅ GOOD - @internationalized/date utilities
import { parseDate } from "@internationalized/date";
const calDate = parseDate(dateString);
const tomorrow = calDate.add({ days: 1 });
```

### 5. Consistency between similar pages

Pages of the same kind must share the same skeleton. Do not reinvent the layout per feature.

#### List pages

List pages follow the composition described in the **List filters pattern** guideline: a thin page shell (`SNavigationBarHeader` with title and primary action), a list component owning the filter bar + `UTable` + pagination, and a filter composable owning the params state.

Forms are not rendered inline — they are opened with `useOverlay()` from the create button and the row actions.

#### Form pattern (creation/editing)

Forms live in a `USlideover`: header in `#header`, `UForm` in `#body`, submit button in `#footer` linked via `form="..."`. The component is mounted with `useOverlay()`, so it has no `open` prop and reports back through a single `close` event:

```vue
<template>
	<USlideover :title="formTitle" @update:open="handleOpenChange" @after:enter="handleAfterEnter" @after:leave="handleAfterLeave">
		<template #body>
			<UForm id="feature-form" :schema="featureSchema" :state="payload" @submit="handleSubmit">
				<!-- SFormField-wrapped fields -->
			</UForm>
		</template>
		<template #footer>
			<UButton form="feature-form" type="submit" :loading="isSaving">{{ $t("main.crud.save") }}</UButton>
		</template>
	</USlideover>
</template>

<script lang="ts" setup>
	const props = defineProps<{ feature: Feature }>();
	const emit = defineEmits<{ close: [saved?: boolean] }>();

	const handleClose = () => emit("close");
	const handleOpenChange = (value: boolean) => {
		if (!value) handleClose();
	};
	const handleAfterEnter = () => {
		payload.value = { ...props.feature };
	};
	const handleAfterLeave = () => {
		payload.value = {};
	};
	const handleSubmit = async () => {
		await saveFeature();
		emit("close", true);
	};
</script>
```

Wrap every field in `SFormField` (the layer's `UFormField` wrapper): zod messages written as i18n keys are translated automatically at display time.

### 6. Avoid watchers when possible

```typescript
// ❌ BAD - Watch for derived data
watch(items, (newItems) => {
	filteredItems.value = newItems.filter((i) => i.active);
});

// ✅ GOOD - Use computed
const filteredItems = computed(() => items.value.filter((i) => i.active));

// ❌ BAD - Watch for v-model sync
watch(localValue, (val) => emit("update:modelValue", val));

// ✅ GOOD - Computed get/set
const modelValue = computed({
	get: () => props.modelValue,
	set: (val) => emit("update:modelValue", val)
});
```

**Acceptable uses:** side effects (analytics), cleanup, debouncing (prefer `refDebounced`).

### 7. Use emits for child→parent communication

```typescript
// ❌ BAD
const parent = inject("parentState");
parent.value.items.push(newItem);

// ✅ GOOD
const emit = defineEmits<{
	(e: "update:open", value: boolean): void
	(e: "submit", data: FormData): void
}>();
emit("submit", formData.value);
```

---

## Zod schemas

Every form validates against a zod schema; infer the form type from it. Write error messages as **i18n keys**, not hardcoded copy — `SFormField` translates them at display time:

```typescript
import { z } from "zod";

export const customerSchema = z.object({
	name: z.string().min(1, "zod-errors.name_required"),
	email: z.email("zod-errors.email_invalid").optional().or(z.literal("")).nullable()
});

export type CustomerFormData = z.infer<typeof customerSchema>;
```

---

## PR review checklist

### Code quality

- [ ] No `any` type
- [ ] ESLint passes
- [ ] No `console.log` in production code
- [ ] Existing helpers/composables used

### Consistency

- [ ] List pages follow the standard pattern
- [ ] Forms follow the standard pattern (`USlideover`, `after:enter`/`after:leave`)
- [ ] All user-facing copy goes through i18n (`t()` / `$t()`)

### Vue/Nuxt

- [ ] `<template>` before `<script>`
- [ ] Computed preferred over watchers
- [ ] Emits used for child→parent communication
