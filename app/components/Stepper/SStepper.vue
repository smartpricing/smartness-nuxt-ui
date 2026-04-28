<template>
	<div role="list" class="grid grid-cols-[24px_1fr] gap-x-2">
		<template v-for="(step, index) in steps" :key="step.id">
			<!-- ===== Steps WITHOUT children ===== -->
			<div
				v-if="!step.children?.length"
				role="listitem"
				class="contents"
				:aria-current="step.status === 'current' ? 'step' : undefined"
			>
				<!-- Dot + connector cell -->
				<div class="flex flex-col items-center pt-1">
					<UTooltip
						v-if="step.error"
						:text="errorText(step)"
						:content="{ side: 'top' }"
					>
						<component
							:is="stepClickable[index] ? 'button' : 'div'"
							:class="dotButtonClass(step, index)"
							:aria-label="step.label"
							:tabindex="stepClickable[index] ? -1 : undefined"
							@click.stop="activateStep(index, step)"
						>
							<UIcon name="ph:warning-circle" class="size-3.5 text-white" />
						</component>
					</UTooltip>
					<component
						:is="stepClickable[index] ? 'button' : 'div'"
						v-else
						:class="dotButtonClass(step, index)"
						:aria-label="step.label"
						:disabled="!stepClickable[index] ? true : undefined"
						:tabindex="stepClickable[index] ? -1 : undefined"
						@click.stop="activateStep(index, step)"
					>
						<UIcon
							v-if="step.status === 'done'"
							name="ph:check-bold"
							class="size-3.5 text-white"
						/>
					</component>
					<!-- Connector (grows with label height, min-h-3 for inter-step spacing) -->
					<div
						v-if="index < steps.length - 1"
						class="w-0.5 flex-1 min-h-6 rounded-full mt-1"
						:class="connectorColor(step)"
					/>
				</div>

				<!-- Label cell — bg/padding live on the button itself so the click target matches the highlight; description sits outside -->
				<div class="flex flex-col gap-0.5 self-start">
					<component
						:is="stepClickable[index] ? 'button' : 'span'"
						class="block w-full text-sm font-semibold text-left text-[var(--color-petrol-blue-900)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 rounded p-1.5 transition-colors"
						:class="[stepClickable[index] ? 'cursor-pointer' : 'cursor-default', labelClass(step, index)]"
						:disabled="!stepClickable[index] ? true : undefined"
						@click.stop="activateStep(index, step)"
					>
						{{ step.label }}
					</component>
					<span
						v-if="descriptionText(step)"
						class="text-xs text-[var(--color-petrol-blue-700)] cursor-default px-1.5"
					>
						{{ descriptionText(step) }}
					</span>
				</div>
			</div>

			<!-- ===== Steps WITH children ===== -->
			<div
				v-else
				role="listitem"
				class="contents"
				:aria-current="step.status === 'current' ? 'step' : undefined"
			>
				<!-- Parent dot cell (dot + stub connector down to first child) -->
				<div class="relative flex justify-center pt-1">
					<UTooltip
						v-if="step.error"
						:text="errorText(step)"
						:content="{ side: 'top' }"
					>
						<div
							class="cursor-default" :class="[DOT_BASE, circleClass(step)]"
						>
							<UIcon name="ph:warning-circle" class="size-3.5 text-white" />
						</div>
					</UTooltip>
					<div
						v-else
						class="cursor-default" :class="[DOT_BASE, circleClass(step)]"
					>
						<UIcon
							v-if="step.status === 'done' && allChildrenDone(step)"
							name="ph:check-bold"
							class="size-3.5 text-white"
						/>
					</div>
					<!-- Stub connector: top-[32px] = pt-1 (4px) + dot size-6 (24px) + gap mt-1 (4px) -->
					<div
						class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 top-[32px] rounded-t-full"
						:class="childSegmentColor(index, 0)"
					/>
				</div>

				<!-- Parent label cell — non-interactive: navigation happens via the children below, not the parent label -->
				<div class="flex flex-col gap-0.5 self-start cursor-default">
					<span
						class="block w-full text-sm font-semibold text-[var(--color-petrol-blue-900)] p-1.5"
						:class="{ 'opacity-50': step.disabled }"
					>
						{{ step.label }}
					</span>
					<span
						v-if="descriptionText(step)"
						class="text-xs text-[var(--color-petrol-blue-700)] cursor-default px-1.5"
					>
						{{ descriptionText(step) }}
					</span>
				</div>

				<!-- Child rows: segment in col 1, button in col 2 -->
				<template v-for="(child, ci) in step.children" :key="child.id">
					<!-- Segment cell -->
					<div class="flex justify-center">
						<div
							class="w-0.5 self-stretch"
							:class="childSegmentClass(step, index, ci)"
						/>
					</div>

					<!-- Child button cell -->
					<button
						class="flex justify-between items-center gap-2 w-full text-xs font-semibold text-left rounded px-1.5 py-1 leading-[18px] tracking-[0.24px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 text-[var(--color-petrol-blue-900)]"
						:class="childClass(child, childNavigable[index][ci], ci)"
						:disabled="!childNavigable[index][ci]"
						@click="activateChild(index, ci)"
					>
						<span>{{ child.label }}</span>
						<UTooltip
							v-if="child.error"
							:text="errorText(child)"
							:content="{ side: 'top' }"
						>
							<UIcon
								name="ph:warning-circle"
								class="size-3.5 text-[var(--color-error-600)]"
							/>
						</UTooltip>
					</button>
				</template>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import { useLocale } from "@nuxt/ui/composables";
	import type { StepperStep, StepperStepChild } from "./types";

	const props = defineProps<{
		steps: StepperStep[]
		modelValue?: string
	}>();
	const { t } = useLocale();
	const emit = defineEmits<{
		"update:modelValue": [value: string]
		stepClick: [step: StepperStep]
		childClick: [child: StepperStepChild, step: StepperStep]
	}>();
	const DOT_BASE = "size-6 min-h-6 shrink-0 rounded-full flex items-center justify-center transition-colors";
	const DOT_BUTTON = `step-dot ${DOT_BASE} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-700`;

	const stepClickable = computed(() =>
		props.steps.map((step, index) =>
			!step.children?.length && !step.disabled && canNavigateToStep(index)
		)
	);

	const childNavigable = computed(() =>
		props.steps.map((step, i) =>
			(step.children ?? []).map((_, ci) => canNavigateToChild(i, step, ci))
		)
	);

	const lastFilledByStep = computed(() =>
		props.steps.map((step) => lastFilledChildIndex(step))
	);

	function handleStepClick(step: StepperStep) {
		emit("update:modelValue", step.id);
		emit("stepClick", step);
	}

	function activateStep(index: number, step: StepperStep) {
		if (!stepClickable.value[index]) return;
		handleStepClick(step);
	}

	function handleChildClick(child: StepperStepChild, step: StepperStep) {
		emit("update:modelValue", child.id);
		emit("childClick", child, step);
	}

	function activateChild(stepIndex: number, ci: number) {
		if (!childNavigable.value[stepIndex]?.[ci]) return;
		const step = props.steps[stepIndex]!;
		const child = step.children![ci]!;
		handleChildClick(child, step);
	}

	function errorText(item: { error?: boolean | string }): string {
		return typeof item.error === "string" ? item.error : t("sStepper.missingValue");
	}

	function canNavigateToStep(targetIndex: number): boolean {
		for (let i = 0; i < targetIndex; i++) {
			const step = props.steps[i]!;
			const skippable = step.optional || !!step.disabled || step.status === "done";
			if (!skippable) return false;
		}
		return true;
	}

	function canNavigateToChild(
		stepIndex: number,
		step: StepperStep,
		targetChildIndex: number
	): boolean {
		if (!step.children) return false;
		if (!canNavigateToStep(stepIndex)) return false;
		for (let i = 0; i < targetChildIndex; i++) {
			const child = step.children[i]!;
			// children default to optional (true), so only block if explicitly required
			if (child.optional === false && child.status !== "done") return false;
		}
		return true;
	}

	function descriptionText(step: StepperStep): string | undefined {
		if (step.description) return step.description;
		if (typeof step.disabled === "string") return step.disabled;
		if (step.optional) return t("sStepper.optional");
		return undefined;
	}

	function allChildrenDone(step: StepperStep): boolean {
		return (
			!!step.children?.length && step.children.every((c) => c.status === "done")
		);
	}

	function lastFilledChildIndex(step: StepperStep): number {
		return (step.children ?? []).findLastIndex(
			(c) => c.status === "done" || c.active
		);
	}

	function circleClass(step: StepperStep) {
		if (step.error) {
			return "bg-[var(--color-error-600)]";
		}
		if (step.disabled) {
			return "bg-[var(--color-petrol-blue-100)] opacity-50";
		}
		const done = allChildrenDone(step) || !step.children?.length;
		const colors: Record<string, string> = {
			done: done ? "bg-[var(--color-success-600)]" : "bg-[var(--color-sky-700)]",
			current: "bg-[var(--color-sky-700)]",
			todo: "bg-[var(--color-petrol-blue-100)]"
		};
		return colors[step.status] ?? colors.todo;
	}

	function labelClass(step: StepperStep, index: number) {
		if (step.disabled) return "opacity-50";
		if (props.modelValue === step.id) return "bg-[var(--color-sky-200)]";
		if (!stepClickable.value[index]) return "";
		return "hover:bg-[var(--color-sky-50)]";
	}

	const PROGRESS_FILLED = "bg-[var(--color-sky-700)]";
	const PROGRESS_EMPTY = "bg-[var(--color-petrol-blue-200)]";

	function progressColor(filled: boolean) {
		return filled ? PROGRESS_FILLED : PROGRESS_EMPTY;
	}

	function connectorColor(step: StepperStep) {
		return progressColor(step.status === "done");
	}

	function childSegmentColor(stepIndex: number, ci: number) {
		return progressColor(ci <= (lastFilledByStep.value[stepIndex] ?? -1));
	}

	function childSegmentClass(step: StepperStep, stepIndex: number, ci: number) {
		const total = step.children!.length;
		return [
			childSegmentColor(stepIndex, ci),
			ci === 0 ? "rounded-t-full" : "",
			ci === total - 1 ? "rounded-b-full" : ""
		];
	}

	function dotButtonClass(step: StepperStep, index: number) {
		return [
			DOT_BUTTON,
			circleClass(step),
			stepClickable.value[index] ? "cursor-pointer" : "cursor-default"
		];
	}

	function childClass(child: StepperStepChild, navigable: boolean, ci: number) {
		const margin = ci > 0 ? "mt-2" : "";
		if (!navigable) return ["cursor-default", margin];
		if (child.active) return ["cursor-pointer", "bg-[var(--color-sky-200)]", margin];
		return ["cursor-pointer", "hover:bg-[var(--color-sky-50)]", margin];
	}
</script>
