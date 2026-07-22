---
title: Tabbed editing forms
description: Pattern for large editing forms split into tabs with free navigation, per-tab error surfacing, non-destructive UI toggles, dirty tracking, and a review-and-save flow.
category: patterns
tags: [forms, tabs, validation, zod, dirty-state, slideover, navigation]
---

Reference pattern for **editing** an existing entity through a large form split into tab sections. The user navigates freely between tabs (no linear wizard), validation runs against a single schema, and tabs with errors are flagged in the navigation. This is the editing counterpart of multi-step **creation** forms, which use a linear stepper and per-step schemas instead.

## When to use

Use this pattern when:

- You are editing an existing entity (an update, not a create).
- The form has many fields grouped into **logical sections** (e.g. general, pricing, availability…).
- The user must **navigate freely** between sections, in any order.
- You need to:
	- Signal which sections have validation errors.
	- Let the user preview all changes before saving.
	- Only send fields the user actually wants to submit (UI toggles that enable/disable blocks of fields).

For **creation** flows with a linear progression, use a stepper with per-step schemas instead — do not mix the two shapes.

## Anatomy at a glance

`USlideover` is the root. The form header fills `#header`, the `UForm` lives in `#body`, the review modal and loader sit in `#body` **after and outside** the form, and the save buttons live in `#footer`, linked to the form via `form="..."`:

```html
<USlideover :title="formTitle" :description="entity.name"
	@update:open="handleOpenChange" @after:enter="handleAfterEnter" @after:leave="handleAfterLeave">
	<template #header>
		<!-- Form header: title, entity badges, mobile section nav trigger.
		     Receives navigationItems + hasErrors for the mobile nav. -->
	</template>
	<template #body>
		<UForm id="entity-form" ref="formRef" :schema="entitySchema" :state="payload"
			:validate-on="['blur', 'change']" @submit="confirmUpdate" @error="handleFormError">
			<div class="flex h-full gap-4">
				<SNavigationMenu class="hidden lg:block" :items="navigationItems" />
				<div class="flex-1 overflow-y-auto">
					<div v-show="activeSection === 'general'"><!-- … --></div>
					<div v-show="activeSection === 'pricing'"><!-- … --></div>
					<!-- … -->
				</div>
			</div>
		</UForm>

		<!-- nested review modal: in #body, OUTSIDE the form -->
		<!-- loader overlay while the save is pending -->
	</template>
	<template #footer>
		<!-- Cancel / Review and save / Save (form="entity-form" type="submit") -->
	</template>
</USlideover>
```

Rules that keep this shape sound:

| Rule | Why |
| --- | --- |
| No `<Teleport>` and no outer `UForm` wrap | `USlideover` portals itself; the `<form>` element stays scoped to `#body`. |
| Nested modal outside the `UForm` | A `<button>` inside a `<form>` submits it; keep the review modal's actions out of the form tree. |
| Footer buttons use `form="entity-form"` | The footer slot renders outside the `<form>` element. |
| `title`/`description` echoed on slideover and header | Accessibility: the slideover needs them for its ARIA labelling even when the header is custom. |

## Script structure (in this order)

Reactive dependencies flow one way — declare in this order to avoid "used before defined" errors:

1. **Composables / data layer** — i18n, overlays, confirm dialogs, the entity update call, supporting lookups seeded from props.
2. **Option lists** — computeds from constants and query results; static option arrays (e.g. `yesNoOptions`).
3. **Local UI toggles** — `ref` values that drive visibility only, never mutated into `payload` directly (e.g. `hasDiscount`, `hasStockLimits`, `visibilityEnabled`).
4. **Derived helpers** — computeds combining toggles and payload (e.g. `isDerivedFromParent`).
5. **Inline helpers** — add/remove functions for repeatable blocks (locales, brackets, rows).
6. **`finalizedPayload`** — computed that projects `payload` through the UI toggles (see below).
7. **Per-section error feedback** — `fieldToSection` map + the section-nav composable reading the form's own `errors`.
8. **Dirty tracking** — `originalPayload` snapshot + `syncOriginalPayload()` + `isModified`.
9. **Navigation** — `activeSection` (component-owned `Ref`, drives `v-show`) + `navSections` (id/label/icon).
10. **Review modal** — open state + review summary computeds.
11. **Lifecycle** — `handleAfterEnter`, `handleClose`, `handleAfterLeave`.
12. **Submit functions** — `confirmUpdate()` (direct save with confirm), `saveFromReview()` (from the review modal, no extra confirm).

## Validation: single schema, form-level

Unlike multi-step creation forms, validation is bound **at the form level** with a single zod schema. Per-tab schemas are not applicable — the user may touch any section in any order:

```vue
<UForm ref="formRef" :schema="entitySchema" :state="payload" :validate-on="['blur', 'change']"
	@submit="confirmUpdate" @error="handleFormError">
```

`@error` stays the plain form-error handler — no custom wrapper, no re-validation. Per-tab warnings are derived from the `errors` array that `UForm` already exposes (next section). The form only needs a `ref` for the composable to read, plus `formRef.value?.clear()` in `handleAfterEnter` to drop stale errors when the same instance is reopened.

## Per-tab error surfacing

`UForm` validates against its `:schema` and exposes the result as a reactive `errors` array (each entry has `name` = the field path). **Do not re-run `safeParse`** — read those errors and bucket them by section. Keep validation in the form; the component only maps fields to tabs:

```ts
const formRef = useTemplateRef("formRef");
const activeSection = ref("general");

// every validated field mapped to its section id
const fieldToSection: Record<string, string> = {
	name: "general",
	description: "general",
	price: "pricing",
	discount_amount: "pricing",
	stock_min: "availability",
	stock_max: "availability"
};

const navSections = [
	{ id: "general", label: t("sections.general"), icon: "ph:info" },
	{ id: "pricing", label: t("sections.pricing"), icon: "ph:currency-circle-dollar" },
	{ id: "availability", label: t("sections.availability"), icon: "ph:calendar-check" }
] as const;

const errorSections = computed(() => {
	const sections = new Set<string>();
	for (const error of unref(formRef.value?.errors) ?? []) {
		const section = fieldToSection[error.name];
		if (section) sections.add(section);
	}
	return sections;
});

const hasErrors = computed(() => errorSections.value.size > 0);

const navigationItems = computed(() => navSections.map((section) => ({
	label: section.label,
	icon: section.icon,
	trailingIcon: errorSections.value.has(section.id) ? "ph:warning-circle" : undefined,
	active: activeSection.value === section.id,
	onSelect: () => { activeSection.value = section.id; }
})));
```

Extract this into a shared composable (e.g. `useFormNavigation({ sections, activeSection, errors, fieldToSection })`) once two forms use it. Why this shape:

- **Validation stays in the form** — only `:schema` (on `UForm`) and `fieldToSection` live in the component. The nav logic never imports zod or calls `safeParse`.
- **No `hasSubmitAttempted` flag** — `UForm.errors` is empty until a field validates (`validate-on`) or submit fires, so there is no "red sea on open" to gate against; a warning appears exactly when the form itself reports the error.
- **One source, both surfaces** — the desktop sidebar and the mobile header navigation are decorated from the same error set.

## Section nav: desktop sidebar + mobile header

Desktop renders `SNavigationMenu` (the layer wrapper around `UNavigationMenu` — **not** `UTabs orientation="vertical"`) in the body sidebar, hidden below `lg`. On mobile, pass the same `navigationItems` to the form header, which renders a trigger row opening a left slideover with the items; `hasErrors` drives a warning icon on the collapsed trigger so the user sees that *some* section needs attention before opening it.

```vue
<!-- #body, desktop only -->
<SNavigationMenu class="hidden lg:block" :items="navigationItems" :ui="{ linkTrailingIcon: 'text-error' }" />
```

- Each item carries its own `active` + `onSelect`, so there is no top-level `v-model` glue.
- `:ui="{ linkTrailingIcon: 'text-error' }"` colours the per-tab warning red.
- Sections use **`v-show`, not `v-if`**, whenever they hold validated fields — an unmounted `SFormField` reports no error, so the warning icon would never light up for a hidden tab. Keep `v-if` only for sections with no validated fields whose content must stay lazily mounted (heavy lists, third-party embeds).

## `finalizedPayload` — UI toggles without destructive mutation

Some field groups sit behind yes/no toggles (e.g. "has discount", "limit stock"). When the user toggles off, **do not clear `payload` eagerly** — toggling back on would lose the original value loaded from the server.

Instead, toggles are **pure UI state**, and a `finalizedPayload` computed projects `payload` through them on the fly:

```ts
const finalizedPayload = computed(() => {
	const p: Record<string, unknown> = { ...payload.value };
	if (!visibilityEnabled.value) {
		p.is_hidden = true;
	}
	if (!hasDiscount.value) {
		p.discount_amount = null;
		p.discount_type = null;
	}
	if (!hasStockLimits.value) {
		p.stock_min = null;
		p.stock_max = null;
	}
	return p;
});
```

The rest of the component reads from `finalizedPayload`:

- Dirty tracking compares it to `originalPayload`.
- `confirmUpdate()` / `saveFromReview()` send it to the update call.

This is strictly better than watcher-based clearing because it is **reversible**: toggling No → Yes → No leaves `payload` intact.

## Dirty tracking: manual snapshot + computed

Do not use VueUse's `useCloned` for the dirty flag: its `isModified` watches the **cloned** ref (the working copy), not the source. In this pattern the user mutates the source (`payload` → `finalizedPayload`) while the clone stays frozen, so `isModified` would never flip.

Roll it by hand — a `ref` for the snapshot, a sync function that deep-clones, and a computed that diffs JSON strings:

```ts
const originalPayload = ref<Record<string, unknown>>({});

const syncOriginalPayload = () => {
	originalPayload.value = JSON.parse(JSON.stringify(finalizedPayload.value));
};

const isFieldChanged = (field: string): boolean =>
	JSON.stringify(finalizedPayload.value[field]) !== JSON.stringify(originalPayload.value[field]);

const isModified = computed(() =>
	JSON.stringify(finalizedPayload.value) !== JSON.stringify(originalPayload.value)
);

const changedSections = computed(() => {
	const changed = new Set<string>();
	for (const [field, section] of Object.entries(fieldToSection)) {
		if (isFieldChanged(field)) changed.add(section);
	}
	return changed;
});
```

Call `syncOriginalPayload()` inside `handleAfterEnter` (after `nextTick`) to take the baseline once the slideover is open and `payload` is seeded from props.

| Value | Used for |
| --- | --- |
| `isModified` | Gates the "Review and save" button and the "Save" disabled state. |
| `isFieldChanged(field)` | Shows only the fields that actually changed inside the review modal. |
| `changedSections` | Controls which sections render inside the review modal. |

## Review and save modal

The review modal lists only the changed sections and fields, offers per-section "Edit" jumps back into the form, and **is** the confirmation — its Save action runs the update call directly, with no extra confirm dialog:

```ts
const isReviewOpen = ref(false);

const saveFromReview = async () => {
	// Wire to your update call
	await updateEntity(props.entity.id, finalizedPayload.value);
	handleClose();
};
```

```vue
<UButton v-if="isModified" trailing-icon="ph:list-checks" @click="isReviewOpen = true">
	{{ t("crud.reviewAndSave") }}
</UButton>

<UModal v-model:open="isReviewOpen" :title="t('crud.reviewChanges')">
	<template #body>
		<div v-if="changedSections.has('general')" class="py-4">
			<div class="flex items-center justify-between mb-3">
				<h3 class="text-base font-semibold">{{ t("sections.general") }}</h3>
				<UButton icon="ph:pencil-simple" variant="ghost" size="xs" :label="t('crud.edit')"
					@click="activeSection = 'general'; isReviewOpen = false" />
			</div>
			<div v-if="isFieldChanged('name')">
				<p class="text-xs font-semibold">{{ t("fields.name") }}</p>
				<p class="text-xs text-muted">{{ payload.name }}</p>
			</div>
			<!-- other fields gated by isFieldChanged(…) -->
		</div>
		<!-- …other changedSections… -->
	</template>
	<template #footer>
		<UButton :loading="isSaving" @click="saveFromReview">{{ t("crud.save") }}</UButton>
	</template>
</UModal>
```

A section's "Edit" button must do both things inline: jump the form to that section **and** close the modal.

## Lifecycle

`handleAfterEnter` runs after the slideover finishes its enter transition:

1. Seed `payload` from `props.entity` (all fields, including locale-keyed records).
2. Initialize the local UI toggles from the entity's state (e.g. `hasStockLimits.value = entity.stock_min !== null || entity.stock_max !== null;`).
3. Reset `activeSection` and `isReviewOpen`, and call `formRef.value?.clear()` to drop stale form errors.
4. `await nextTick()`, then `syncOriginalPayload()` to snapshot the dirty-tracking baseline.

`handleClose` only emits `close` (with `true` when the entity was saved, so the caller can react). `handleAfterLeave` clears the local payload/state so it is garbage-collected after the exit transition.

If closing with unsaved changes should warn the user, gate `handleOpenChange` on `isModified` and route through a confirm dialog before actually closing.

## Submit flows

| Flow | Trigger | Path |
| --- | --- | --- |
| Direct save | Footer button `type="submit" form="entity-form"` | `UForm` validates → `@submit="confirmUpdate"` → confirm dialog → update call |
| Review and save | Footer button, visible only when `isModified` | Opens review modal → `saveFromReview()` → update call directly, no extra confirm |
| Failed validation | Any submit | `@error` fires, `UForm` populates `errors`, warning icons light up on the offending tabs (desktop sidebar and mobile header) |

## Opening on a specific tab (optional)

To let a caller open the form already focused on a given section, expose an **optional prop** typed to the section-id union, and apply it where the active section is reset — inside `handleAfterEnter`:

```ts
const props = defineProps<{
	entity: Entity;
	initialTab?: EntityEditingTab;
}>();

const activeSection = ref<EntityEditingTab>("general");

const handleAfterEnter = async () => {
	// …seed payload…
	activeSection.value = props.initialTab ?? "general";
	formRef.value?.clear();
	await nextTick();
	syncOriginalPayload();
};
```

This is the whole mechanism — no shared composable, no store. Callers that omit `initialTab` get the default; callers that pass it (e.g. a calendar chip's contextual action) forward it in the overlay's `props`. With a fresh mount per open (`destroyOnClose: true`), the next open without the prop starts clean.

## Checklist for a new tabbed editing form

1. Clone the anatomy above (template + script ordering).
2. Drive the nav from one `navigationItems` computed — desktop `SNavigationMenu` (`hidden lg:block`) + the same items on the mobile header nav. Do not reach for `UTabs` or hand-roll a v-model-driven list.
3. Fill in the section content blocks, gated by `v-show`.
4. Populate `fieldToSection` (every validated field → section id) and derive `errorSections` from `UForm.errors`.
5. Extend `finalizedPayload` with the UI toggles relevant to your form.
6. Seed `handleAfterEnter` from your entity props and prime the local toggles.
7. Add test ids for the header close button and the mobile navigation trigger/slideover/menu.
