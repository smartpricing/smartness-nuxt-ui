---
title: Stepper
description: Vertical step indicator for multi-step flows — supports nested sub-steps, error states, optional and disabled steps, click-to-jump and i18n.
category: navigation
prefix: S
componentName: Stepper
showcaseSlug: stepper
showcaseFile: Stepper
tags: [stepper, progress, multi-step, sub-steps, optional, disabled, i18n, nested]
subcomponents: []
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
