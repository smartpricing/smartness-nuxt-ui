import type { StepperStep, StepperStepChild } from "~/components/Stepper/types";

export interface StepperFlatItem {
	id: string
	label: string
	stepIndex: number
	childIndex?: number
}

export function useStepperNavigation(steps: Ref<StepperStep[]>, activeId: Ref<string>) {
	const flatItems = computed<StepperFlatItem[]>(() => {
		const items: StepperFlatItem[] = [];
		steps.value.forEach((step, si) => {
			if (!step.children?.length) {
				items.push({ id: step.id, label: step.label, stepIndex: si });
			} else {
				step.children.forEach((child, ci) => {
					items.push({
						id: child.id,
						label: child.label,
						stepIndex: si,
						childIndex: ci
					});
				});
			}
		});
		return items;
	});

	const currentIndex = computed(() =>
		flatItems.value.findIndex((f) => f.id === activeId.value)
	);

	const currentLabel = computed(
		() => flatItems.value[currentIndex.value]?.label ?? ""
	);

	const canGoBack = computed(() => currentIndex.value > 0);
	const canGoNext = computed(() => currentIndex.value < flatItems.value.length - 1);

	function goTo(targetFlatIndex: number) {
		const target = flatItems.value[targetFlatIndex];
		if (!target) return;
		activeId.value = target.id;

		steps.value.forEach((step, si) => {
			if (si < target.stepIndex) {
				step.status = "done";
				step.children?.forEach((c) => {
					c.status = "done";
					c.active = false;
				});
			} else if (si === target.stepIndex) {
				if (step.children?.length && target.childIndex !== undefined) {
					step.status = "done";
					step.children.forEach((c, ci) => {
						if (ci < target.childIndex!) {
							c.status = "done";
						} else if (c.status !== "done") {
							c.status = undefined;
						}
						c.active = ci === target.childIndex;
					});
				} else {
					step.status = step.status === "done" ? "done" : "current";
				}
			} else {
				if (step.status !== "done") step.status = "todo";
				step.children?.forEach((c) => {
					if (c.status !== "done") c.status = undefined;
					c.active = false;
				});
			}
		});
	}

	function goBack() {
		if (canGoBack.value) goTo(currentIndex.value - 1);
	}

	function goNext() {
		if (canGoNext.value) goTo(currentIndex.value + 1);
	}

	function goToStep(step: StepperStep) {
		const fi = flatItems.value.findIndex((f) => f.id === step.id);
		if (fi >= 0) goTo(fi);
	}

	function goToChild(child: StepperStepChild) {
		const fi = flatItems.value.findIndex((f) => f.id === child.id);
		if (fi >= 0) goTo(fi);
	}

	return {
		flatItems,
		currentIndex,
		currentLabel,
		canGoBack,
		canGoNext,
		goTo,
		goBack,
		goNext,
		goToStep,
		goToChild
	};
}
