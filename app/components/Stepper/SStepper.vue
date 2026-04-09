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
				<div class="flex flex-col items-center pt-1 peer">
					<UTooltip
						v-if="step.error"
						:text="
							typeof step.error === 'string' ? step.error : 'Missing value'
						"
						:content="{ side: 'top' }"
					>
						<component
							:is="stepClickable[index] ? 'button' : 'div'"
							:class="[DOT_BUTTON, circleClass(step), stepClickable[index] ? 'cursor-pointer' : 'cursor-default']"
							:aria-label="step.label"
							@click.stop="stepClickable[index] && handleStepClick(step)"
						>
							<UIcon name="ph:warning-circle" class="size-3.5 text-white" />
						</component>
					</UTooltip>
					<component
						:is="stepClickable[index] ? 'button' : 'div'"
						v-else
						:class="[DOT_BUTTON, circleClass(step), stepClickable[index] ? 'cursor-pointer' : 'cursor-default']"
						:aria-label="step.label"
						:disabled="!stepClickable[index] ? true : undefined"
						@click.stop="stepClickable[index] && handleStepClick(step)"
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

				<!-- Label cell -->
				<div
					class="flex items-start gap-1.5 rounded p-1.5 transition-colors self-start"
					:class="labelClass(step, index)"
				>
					<span
						class="text-sm font-semibold flex-1 text-[var(--color-petrol-blue-900)]"
					>
						{{ step.label }}
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
						:text="
							typeof step.error === 'string' ? step.error : 'Missing value'
						"
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
						:class="childSegmentColor(step, 0)"
					/>
				</div>

				<!-- Parent label cell -->
				<div
					class="flex items-start gap-1.5 rounded p-1.5 transition-colors self-start"
					:class="labelClass(step, index)"
				>
					<span
						class="text-sm font-semibold flex-1 text-[var(--color-petrol-blue-900)]"
					>
						{{ step.label }}
					</span>
				</div>

				<!-- Child rows: segment in col 1, button in col 2 -->
				<template v-for="(child, ci) in step.children" :key="child.id">
					<!-- Segment cell -->
					<div class="flex justify-center">
						<div
							class="w-0.5 self-stretch"
							:class="[
								childSegmentColor(step, ci),
								ci === 0 ? 'rounded-t-full' : '',
								ci === step.children!.length - 1 ? 'rounded-b-full' : '',
							]"
						/>
					</div>

					<!-- Child button cell -->
					<button
						class="flex justify-between items-center gap-2 w-full text-xs font-semibold text-left rounded px-1.5 py-1 leading-[18px] tracking-[0.24px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700 text-[var(--color-petrol-blue-900)]"
						:class="[childClass(child, canNavigateToChild(index, step, ci)), ci > 0 ? 'mt-2' : '']"
						:disabled="!canNavigateToChild(index, step, ci)"
						@click="canNavigateToChild(index, step, ci) && handleChildClick(child, step)"
					>
						<span>{{ child.label }}</span>
						<UTooltip
							v-if="child.error"
							:text="
								typeof child.error === 'string' ? child.error : 'Missing value'
							"
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
	import type { StepperStep, StepperStepChild } from "./types";

	const props = defineProps<{
		steps: StepperStep[]
		modelValue?: string
	}>();
	const emit = defineEmits<{
		"update:modelValue": [value: string]
		stepClick: [step: StepperStep]
		childClick: [child: StepperStepChild, step: StepperStep]
	}>();
	const DOT_BASE = "size-6 min-h-6 shrink-0 rounded-full flex items-center justify-center transition-colors";
	const DOT_BUTTON = `step-dot ${DOT_BASE} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-700`;

	const stepClickable = computed(() =>
		props.steps.map((step, index) =>
			!step.children?.length && canNavigateToStep(index)
		)
	);

	function handleStepClick(step: StepperStep) {
		emit("update:modelValue", step.id);
		emit("stepClick", step);
	}

	function handleChildClick(child: StepperStepChild, step: StepperStep) {
		emit("update:modelValue", child.id);
		emit("childClick", child, step);
	}

	function canNavigateToStep(targetIndex: number): boolean {
		for (let i = 0; i < targetIndex; i++) {
			const step = props.steps[i]!;
			if (!step.optional && step.status !== "done") return false;
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

	// Cached per-step derived state to avoid repeated array scans in template
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
		const done = allChildrenDone(step) || !step.children?.length;
		const colors: Record<string, string> = {
			done: done ? "bg-[var(--color-success-600)]" : "bg-[var(--color-sky-700)]",
			current: "bg-[var(--color-sky-700)]",
			todo: "bg-[var(--color-petrol-blue-100)]"
		};
		return colors[step.status] ?? colors.todo;
	}

	function labelClass(step: StepperStep, index: number) {
		const isSelected = props.modelValue === step.id;
		if (isSelected && !step.children?.length) {
			return "bg-[var(--color-sky-200)]";
		}
		if (step.status === "todo" && !canNavigateToStep(index)) {
			return "";
		}
		if (!step.children?.length) {
			return "hover:bg-[var(--color-sky-50)] peer-has-[.step-dot:hover]:bg-[var(--color-sky-50)]";
		}
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

	function childSegmentColor(step: StepperStep, childIndex: number) {
		return progressColor(childIndex <= lastFilledChildIndex(step));
	}

	function childClass(child: StepperStepChild, navigable: boolean) {
		if (!navigable) return "cursor-default";
		if (child.active) return "cursor-pointer bg-[var(--color-sky-200)]";
		return "cursor-pointer hover:bg-[var(--color-sky-50)]";
	}
</script>
