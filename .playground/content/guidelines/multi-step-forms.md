---
title: Multi-step forms
description: Canonical pattern for stepper wizards — one parent UForm owning the full payload, one nested UForm per step gating navigation with its own Zod schema.
category: patterns
tags: [forms, stepper, wizard, validation, zod, uform, navigation]
---

# Multi-step forms

Canonical pattern for multi-step creation forms: stepper navigation via `useStepperNavigation` + `SStepper`, per-step validation via **nested `UForm` components**, each with its own Zod schema.

## Overview

A multi-step form is one parent `UForm` that owns the full payload and the full schema, plus one **nested `UForm` per wizard step** that validates only that step. Navigation between steps is handled by the `useStepperNavigation` composable, paired with the `SStepper` component (desktop sidebar) and the `SStepperProgress` row (mobile header).

Nuxt UI's nested forms (`<UForm nested>`) inherit the parent's state and report their errors natively on their own `SFormField`s — so there is **no manual `safeParse` / `setErrors` plumbing**. The parent's schema is the submit-time safety net; each step's schema gates the "Next" button.

## Architecture

```
UForm (parent)
├── :schema = full form schema      → validated on Save (submit)
├── :state  = payload               → inherited by every nested form
│
├── SStepper + useStepperNavigation → step status, active step, back/next
│
└── per step:
    ├── UForm nested :schema=stepSchema   → validated step (ref="stepForm")
    └── plain <div>                       → step with no validation
```

| Piece | Responsibility |
| --- | --- |
| `useStepperNavigation` | Owns the flat navigation: `goBack` / `goNext` / `canGoBack` / `canGoNext` / `goToStep` / `goToChild`; keeps each step's `status` in sync; exposes `currentLabel` / `currentIndex` / `flatItems` for the mobile progress row. |
| Nested `UForm` | One per step that needs validation. Inherits the parent `payload`, validates its own `:schema`, shows errors inline on its `SFormField`s. Steps without validation stay plain `<div v-if>`. |
| Parent `UForm` | Holds `:schema` (the full schema). On Save it validates the whole payload regardless of which step is mounted. |

### Key design decisions

- **No custom validation composable.** Validation is delegated entirely to `UForm` + Zod. The component only wires navigation.
- **Per-step schemas live next to the feature** — one base `z.object` with every field, and per-step schemas derived from it with `.pick()`.
- **One shared `stepForm` ref.** Only one step `UForm` is mounted at a time (`v-if`), so a single `ref="stepForm"` always points at the current step.
- **State is one flat `payload` ref.** Nested forms inherit it; they only need `:name` when targeting a nested sub-object (rare — see *Dynamic rows*).

## Schema setup

Declare **one base `z.object`** with every field, then derive per-step schemas from it with `.pick()`. The base is the single source of truth — steps can't drift from it. Cross-field rules (`.refine` / `.superRefine`) are applied on top per export, so the base stays a plain `ZodObject` (always pickable).

```ts
// schemas/project.ts
import { z } from "zod";

const projectBaseSchema = z.object({
	name: z.string().min(1, "zod-errors.name_required"),
	description: z.string().optional().nullable(),
	member_ids: z.array(z.number()).default([]),
	integration_ids: z.array(z.number()).default([]),
	template_id: z.number().optional(),
	workspace_ids: z.array(z.number()).min(1, "zod-errors.workspaces_required")
});

const hasAtLeastOneConfiguration = (data: {
	member_ids: number[]
	integration_ids: number[]
	template_id?: number
}) =>
	data.member_ids.length > 0
	|| data.integration_ids.length > 0
	|| data.template_id !== undefined;

const atLeastOneConfigurationMessage = { message: "zod-errors.configuration_required" };

// Step schemas — pure `.pick()` slices of the base
export const projectNameSchema = projectBaseSchema.pick({
	name: true,
	description: true
});

export const projectScopeSchema = projectBaseSchema.pick({
	workspace_ids: true
});

// Step schema with a cross-field rule — `.pick()` then `.refine()`
export const projectConfigurationsSchema = projectBaseSchema.pick({
	member_ids: true,
	integration_ids: true,
	template_id: true
}).refine(hasAtLeastOneConfiguration, atLeastOneConfigurationMessage);

// Full schema — the base + the same cross-field rule, used by the parent UForm
export const newProjectSchema = projectBaseSchema.refine(hasAtLeastOneConfiguration, atLeastOneConfigurationMessage);

export type NewProjectFormData = z.infer<typeof newProjectSchema>;
```

Rules:

- **Keep the base refine-free.** A schema with `.refine` / `.superRefine` can no longer be `.pick()`ed. Apply cross-field rules on the *exports* (`projectConfigurationsSchema`, `newProjectSchema`), never on the base.
- **One source of truth.** Change a field's rule on `projectBaseSchema` and every step + the full schema inherit it — no drift, no duplication.
- `z.object` strips unknown keys, so validating the whole `payload` against a narrow step schema is safe — extra fields are ignored.
- **Error messages are i18n keys** (`"zod-errors.name_required"`), never hardcoded copy — `SFormField` translates them at display time.

## Component setup

```ts
<script lang="ts" setup>
	import type { StepperStep, StepperStepChild } from "nuxt-ui-layer/types";
	import {
		newProjectSchema,
		projectConfigurationsSchema,
		projectNameSchema,
		projectScopeSchema
	} from "@/schemas/project";

	const emit = defineEmits<{ close: [created?: boolean] }>();

	const createEmptyPayload = () => ({ /* initial fields */ });
	const payload = ref(createEmptyPayload());

	// Steps — `status` of the first step is "current", the rest "todo"
	const steps = ref<StepperStep[]>([
		{ id: "define-name", label: "General", status: "current" },
		{
			id: "configurations",
			label: "Configuration",
			status: "todo",
			children: [
				{ id: "members", label: "Members" },
				{ id: "integrations", label: "Integrations" },
				{ id: "template", label: "Template" }
			]
		},
		{ id: "scope", label: "Scope", status: "todo" },
		{ id: "review", label: "Review", status: "todo" }
	]) as Ref<StepperStep[]>;

	const activeStepId = ref("define-name");

	const { goBack, goNext, canGoBack, canGoNext, goToStep, goToChild, currentLabel, currentIndex, flatItems }
		= useStepperNavigation(steps, activeStepId);

	// Mark a step/child error dot on the SStepper
	const setStepError = (stepId: string, error: boolean) => {
		for (const step of steps.value) {
			if (step.id === stepId) {
				step.error = error;
				return;
			}
			const child = step.children?.find((c) => c.id === stepId);
			if (child) {
				child.error = error;
				return;
			}
		}
	};

	// Jump to any step/child by id — used by review-step "Edit" buttons
	const navigateToStep = (stepId: string) => {
		for (const step of steps.value) {
			if (step.id === stepId) {
				goToStep(step);
				return;
			}
			const child = step.children?.find((c) => c.id === stepId);
			if (child) {
				goToChild(child);
				return;
			}
		}
	};

	const resetSteps = () => {
		steps.value.forEach((step, index) => {
			step.error = false;
			step.status = index === 0 ? "current" : "todo";
			step.children?.forEach((child) => {
				child.active = false;
				child.status = undefined;
				child.error = false;
			});
		});
		activeStepId.value = "define-name";
	};

	// Only one step UForm is mounted at a time (v-if), so a single ref always tracks the current step.
	// StepForm: { validate: () => Promise<object> }
	const stepForm = useTemplateRef<StepForm>("stepForm");

	// "Next" — validate the current step's nested UForm, block if invalid
	const handleNext = async () => {
		if (stepForm.value) {
			try {
				await stepForm.value.validate();
			} catch {
				setStepError(activeStepId.value, true);
				return;
			}
		}
		setStepError(activeStepId.value, false);
		goNext();
	};

	const onStepClick = (step: StepperStep) => goToStep(step);
	const onChildClick = (child: StepperStepChild) => goToChild(child);

	const handleSubmit = async () => {
		// Wire to your create call here
		emit("close", true);
	};
</script>
```

## Template pattern

The wizard can live in a slideover, a modal, or a full page — the internal anatomy is the same. The **parent `UForm`** wraps the whole body; nested step `UForm`s sit inside it; the Save button lives in the container's footer, linked by `form="..."`.

The desktop `SStepper` stays in a body sidebar; the mobile progress row (`SStepperProgress`, or a header that accepts a `progress` prop) belongs in the container header (`lg:hidden`, edge-to-edge). Never render `SStepperProgress` in the body.

```vue
<template>
	<UForm
		id="project-creation-form"
		:state="payload"
		:schema="newProjectSchema"
		@submit="handleSubmit"
	>
		<div class="flex h-full gap-4">
			<!-- Stepper sidebar (desktop) -->
			<div class="w-[200px] shrink-0 border-r border-(--ui-border) pr-4">
				<SStepper
					v-model="activeStepId"
					:steps="steps"
					@step-click="onStepClick"
					@child-click="onChildClick"
				/>
			</div>

			<!-- Step content -->
			<div class="flex-1 overflow-y-auto">
				<!-- Validated step → nested UForm -->
				<UForm
					v-if="activeStepId === 'define-name'"
					ref="stepForm"
					:schema="projectNameSchema"
					nested
					class="space-y-4"
				>
					<SFormField label="Name" name="name" required>
						<UInput v-model="payload.name" />
					</SFormField>
				</UForm>

				<!-- Step with no validation → plain div -->
				<div v-if="activeStepId === 'members'" class="space-y-4">
					<!-- ... -->
				</div>

				<!-- Review step → plain div -->
				<div v-if="activeStepId === 'review'" class="space-y-0">
					<!-- ... -->
				</div>
			</div>
		</div>
	</UForm>
	<!-- Footer: Back/Cancel left, Next/Save right — Save: form="project-creation-form" type="submit" -->
</template>
```

Rules:

- The **parent `UForm`** carries `:schema` (full schema) and `:state="payload"`.
- Every **validated step** is a `<UForm nested :schema="stepSchema" ref="stepForm">`. It has no `:state` — it inherits the parent's. Use the **same `ref="stepForm"`** on every step `UForm`.
- Steps that need **no validation** (lists, review) stay plain `<div v-if>`.
- Put each step's inputs inside `<SFormField name="...">` (the layer's `UFormField` wrapper — it translates zod i18n-key messages) so the nested form can render field-level errors automatically.
- **Mirror Zod `required` on the component.** When a field is required by the step's Zod schema, also set `required` on its `<SFormField>` — Nuxt UI then renders the red asterisk, so the user sees what's mandatory *before* hitting Next/Save, not only after a failed validation.
- The mobile progress trio comes straight from `useStepperNavigation`: `{ label: currentLabel, currentStep: currentIndex, totalSteps: flatItems.length }`.

## Per-step "Next" behavior

`handleNext` validates the current step's nested form via `stepForm.value.validate()`:

| Outcome | Behavior |
| --- | --- |
| `validate()` resolves | Clear the step error, `goNext()`. |
| `validate()` throws | Set the step error dot, **stay** on the step. Errors are already shown inline on the step's `SFormField`s by Nuxt UI. |
| No nested form (`stepForm.value` is `null`) | Advance freely. |

On the final step, the **Save** button submits the parent `UForm`, which validates the full schema. Invalid → handle it in `@error` (e.g. toast + focus first invalid field).

## Cross-field validation (`.refine`)

When a rule spans multiple fields ("at least one of N must be set"), put the `.refine` on the step schema (see `projectConfigurationsSchema` above). A top-level `.refine` error has no field path, so it surfaces as the step's **error dot** rather than an inline field message — assign such a schema to the **last step of the group**.

## Steps with children

A parent step can group `children` sub-steps. `useStepperNavigation` flattens them for sequential back/next. Children carry their own `id` / `label` and can hold an `error` dot; navigation treats each child as a step.

## Review step with "Edit" navigation

The review step lists the entered data with per-section "Edit" buttons that jump back via `navigateToStep`:

```vue
<UButton
	icon="ph:pencil-simple"
	variant="outline"
	color="neutral"
	label="Edit"
	@click="navigateToStep('members')"
/>
```

## Nested overlays

A multi-step form can open child creation forms (e.g. "create a new member inline"). Each sub-form is its own overlay opened with `useOverlay()` from the step's handler — never rendered in the body. Overlays stack naturally; don't call `overlay.closeAll()`, or you would close the wizard behind it:

```ts
import { LazyMemberCreationForm } from "#components";

const overlay = useOverlay();

const handleCreateMember = async () => {
	const created = await overlay.create(LazyMemberCreationForm, { destroyOnClose: true }).open();
	if (created) { /* refresh / invalidate the list the step reads from */ }
};
```

## List step pattern

Steps that show a selectable list of items:

```vue
<div class="flex items-center justify-between">
	<p class="text-sm text-muted flex-1">{{ description }}</p>
	<UButton icon="ph:plus" variant="outline" color="neutral"
		label="Create" @click="handleCreateMember" />
</div>

<UInput v-model="search" icon="ph:magnifying-glass" placeholder="Search..." />

<UCheckboxGroup v-if="filteredItems.length" v-model="payload.member_ids"
	:items="filteredItems" value-key="id" label-key="name"
	variant="card" color="secondary" />
<p v-else class="text-sm text-muted">No records</p>
```

- `UCheckboxGroup variant="card"` for multi-select, `URadioGroup variant="card"` for single-select.
- Use the `#label` slot for custom per-item rendering.

## Dynamic rows (repeatable field groups)

For repeatable rows (e.g. line items), the nested `UForm` uses a `:name` to scope its slice of state:

```vue
<UForm
	v-for="(item, index) in payload.items"
	:key="index"
	:name="`items.${index}`"
	:schema="itemSchema"
	nested
>
	<SFormField name="description"><UInput v-model="item.description" /></SFormField>
</UForm>
```

The `:name` namespaces the nested form's errors to `items.{index}.{field}`.
