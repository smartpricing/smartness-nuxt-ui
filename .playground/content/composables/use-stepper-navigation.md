---
title: useStepperNavigation
description: Helper for `SStepper` — manages active step state, step transitions and validation hooks for multi-step wizards.
name: useStepperNavigation
tags: [stepper, wizard, navigation, multi-step, validation]
---

# useStepperNavigation

Co-pilot for multi-step wizards built on `SStepper`. Centralizes step state, jump-to-step logic, and per-step validation.

## Quick example

```ts
const {
	activeStep,
	goToNext,
	goToPrev,
	goToStep,
	canGoNext
} = useStepperNavigation({
	steps: stepsRef,
	validate: async (step) => await validateStep(step.id)
});
```

## API

| Returned | Type | Notes |
|---|---|---|
| `activeStep` | `Ref<string>` | Active step id (synced with `<SStepper v-model>`). |
| `goToNext()` | `() => Promise<void>` | Advances; runs `validate(currentStep)` first. |
| `goToPrev()` | `() => void` | Goes to previous non-disabled step. |
| `goToStep(id)` | `(id: string) => Promise<void>` | Jumps to a specific step (validates first). |
| `canGoNext` | `ComputedRef<boolean>` | `false` while validating or when the next step is `disabled`. |

## Notes

- Pair with the `@step-click` event of `SStepper` for click-to-jump.
- The `validate` callback can return a string error to display in the step's error state.
