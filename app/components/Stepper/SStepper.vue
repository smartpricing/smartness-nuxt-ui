<template>
	<div
		role="list"
		class="flex flex-col"
	>
		<template
			v-for="(step, index) in steps"
			:key="step.id"
		>
			<!-- Step row (highlighted when current) -->
			<div
				role="listitem"
				:aria-current="step.status === 'current' ? 'step' : undefined"
				class="flex gap-1.5 items-start rounded transition-colors"
				:class="stepRowClass(step)"
			>
				<!-- Circle indicator -->
				<UTooltip
					v-if="step.error"
					:text="typeof step.error === 'string' ? step.error : 'Missing value'"
				>
					<component
						:is="step.children?.length ? 'div' : 'button'"
						class="size-6 min-h-6 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-700"
						:class="[circleClass(step), step.children?.length ? 'cursor-default' : 'cursor-pointer']"
						@click.stop="!step.children?.length && handleStepClick(step)"
					>
						<UIcon
							name="ph:warning-circle"
							class="size-3.5 text-white"
						/>
					</component>
				</UTooltip>
				<component
					v-else
					:is="step.children?.length || step.status === 'todo' ? 'div' : 'button'"
					class="size-6 min-h-6 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-700"
					:class="[circleClass(step), step.children?.length || step.status === 'todo' ? 'cursor-default' : 'cursor-pointer']"
					:disabled="step.status === 'todo' && !step.children?.length ? true : undefined"
					@click.stop="!step.children?.length && handleStepClick(step)"
				>
					<UIcon
						v-if="step.status === 'done' && (!step.children?.length || allChildrenDone(step))"
						name="ph:check-bold"
						class="size-3.5 text-white"
					/>
				</component>

				<!-- Label -->
				<div class="flex items-center gap-1.5 flex-1 min-h-6">
					<span
						class="text-sm font-semibold flex-1"
						:class="labelColorClass(step)"
					>
						{{ step.label }}
					</span>
				</div>
			</div>

			<!-- Children (sub-labels) if present -->
			<div
				v-if="step.children?.length"
				class="flex ml-[7px] py-0.5"
			>
				<!-- Progress connector: one segment per child -->
				<div class="flex flex-col items-center w-6">
					<div
						v-for="(child, ci) in step.children"
						:key="`${child.id}-connector`"
						class="w-0.5 flex-1"
						:class="[
							childSegmentColor(step, ci),
							ci === 0 ? 'rounded-t-full' : '',
							ci === step.children!.length - 1 ? 'rounded-b-full' : '',
						]"
					/>
				</div>
				<div class="flex flex-col gap-2 ml-1.5 flex-1">
					<button
						v-for="child in step.children"
						:key="child.id"
						class="flex justify-between items-center gap-2 w-full text-xs font-semibold text-left rounded px-1.5 py-1 leading-[18px] tracking-[0.24px] cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-700"
						:class="childClass(child)"
						@click="handleChildClick(child, step)"
					>
						<span>{{ child.label }}</span>
						<UTooltip
							v-if="child.error"
							:text="typeof child.error === 'string' ? child.error : 'Missing value'"
						>
							<UIcon
								name="ph:warning-circle"
								class="size-3.5 text-[var(--color-error-600)]"
							/>
						</UTooltip>
					</button>
				</div>
			</div>

			<!-- Connector between steps -->
			<div
				v-if="index < steps.length - 1 && !step.children?.length"
				class="flex ml-[7px] py-0.5"
			>
				<div class="flex items-center w-6 justify-center">
					<div
						class="w-0.5 h-6 rounded-full"
						:class="step.status === 'done' ? 'bg-sky-700' : 'bg-[var(--color-petrol-blue-200)]'"
					/>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import type { StepperStep, StepperStepChild } from "./types";

	defineProps<{
		steps: StepperStep[]
		modelValue?: string
	}>();

	const emit = defineEmits<{
		"update:modelValue": [value: string]
		stepClick: [step: StepperStep]
		childClick: [child: StepperStepChild, step: StepperStep]
	}>();

	function handleStepClick(step: StepperStep) {
		emit("update:modelValue", step.id);
		emit("stepClick", step);
	}

	function handleChildClick(child: StepperStepChild, step: StepperStep) {
		emit("update:modelValue", child.id);
		emit("childClick", child, step);
	}

	// Cached per-step derived state to avoid repeated array scans in template
	function allChildrenDone(step: StepperStep): boolean {
		return !!step.children?.length && step.children.every((c) => c.status === "done");
	}

	function lastFilledChildIndex(step: StepperStep): number {
		return (step.children ?? []).findLastIndex((c) => c.status === "done" || c.active);
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
		return colors[step.status];
	}

	function stepRowClass(step: StepperStep) {
		const base = "p-1.5";
		if (step.status === "current" && !step.children?.length) {
			return `${base} bg-[var(--color-sky-200)]`;
		}
		if (step.status === "todo") {
			return base;
		}
		return `${base} hover:bg-[var(--color-sky-50)]`;
	}

	function childSegmentColor(step: StepperStep, childIndex: number) {
		return childIndex <= lastFilledChildIndex(step)
			? "bg-[var(--color-sky-700)]"
			: "bg-[var(--color-petrol-blue-200)]";
	}

	function labelColorClass(step: StepperStep) {
		if (step.status === "current") return "text-[var(--color-petrol-blue-950)]";
		if (step.status === "done") return "text-[var(--color-petrol-blue-700)]";
		return "text-[var(--color-petrol-blue-500)]";
	}

	function childClass(child: StepperStepChild) {
		if (child.active) {
			return "bg-[var(--color-sky-200)] text-[var(--color-petrol-blue-950)]";
		}
		if (child.status === "done") {
			return "text-[var(--color-petrol-blue-700)] hover:bg-[var(--color-sky-50)]";
		}
		return "text-[var(--color-petrol-blue-500)] hover:bg-[var(--color-sky-50)]";
	}
</script>
