---
title: Stepper
description: Vertical step indicator for multi-step flows — supports nested sub-steps, error states, optional and disabled steps, click-to-jump and i18n.
category: navigation
prefix: S
componentName: Stepper
showcaseSlug: stepper
showcaseFile: Stepper
tags: [stepper, progress, multi-step, sub-steps, optional, disabled, i18n, nested]
subcomponents: [SStepperProgress]
---

# SStepper

`SStepper` is a vertical step list with progress tracking. Each step can have children (sub-steps), an error state, an `optional` flag, and a `disabled` flag.

## Quick example

```vue
<SStepper
	v-model="currentStep"
	:steps="[
		{ id: 'profile', label: 'Profile', status: 'done' },
		{ id: 'property', label: 'Property', status: 'current' },
		{ id: 'photos', label: 'Photos', optional: true },
		{ id: 'pricing', label: 'Pricing', disabled: true }
	]"
	@step-click="onStepClick"
/>
```

## Step shape

```ts
interface Step {
	id: string
	label: string
	description?: string
	status?: "done" | "current" | "todo"
	error?: boolean | string
	optional?: boolean
	disabled?: boolean
	children?: Step[]
}
```

## Notes

- Click-to-jump is opt-in: step is clickable only if it is `done` or has been visited.
- `useStepperNavigation` composable helps wire up the active step to a wizard form.
- Localized strings (`Optional`, error messages) come from the layer's i18n keys (`sStepper.*`).

## SStepperProgress

`SStepperProgress` is a compact companion component: a sticky label + step counter (`current/total`) above a `UProgress` bar. Useful on mobile / narrow layouts where the full `SStepper` list is too tall.

```vue
<SStepperProgress
	label="Pricing setup"
	:current-step="currentStep"
	:total-steps="totalSteps"
/>
```

### Props

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Text shown on the left of the header row. |
| `currentStep` | `number` | Zero-based index of the active step. Displayed as `currentStep + 1`. |
| `totalSteps` | `number` | Total number of steps. The bar `max` is `totalSteps + 1`. |
| `progress` | `Omit<ProgressProps, "ui">` | Props forwarded to the underlying `UProgress` (e.g. `color`, `size`, `class`). Merged over the defaults (`color: "secondary"`). |
| `ui` | `Partial<{ root, header, label, count }>` | Class overrides for the wrapper slots (same pattern as the Navigation components). |

### Customizing

Override wrapper classes via `ui`, and the progress bar via `progress`:

```vue
<SStepperProgress
	label="Custom colors & classes"
	:current-step="currentStep"
	:total-steps="totalSteps"
	:progress="{ color: 'primary', size: 'lg' }"
	:ui="{ label: 'text-sm font-bold text-primary truncate' }"
/>
```

- The `ui` slots (`root`, `header`, `label`, `count`) style the wrapper only.
- To style the bar itself use `progress` — its own `ui` slots are **not** exposed (the exported `ProgressProps.ui` type is incompatible with `UProgress`), so use `progress.class` for the bar. Gradient colors (`ai`/`learning`) are **not** valid `UProgress` `color` values.
