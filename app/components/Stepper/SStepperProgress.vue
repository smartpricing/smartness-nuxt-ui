<template>
	<div :class="resolvedUi.root" data-id="stepper-progress">
		<div :class="resolvedUi.header">
			<span :class="resolvedUi.label">
				{{ label }}
			</span>
			<span :class="resolvedUi.count">
				{{ displayStep }}/{{ totalSteps }}
			</span>
		</div>
		<UProgress v-bind="progressResolvedProps" />
	</div>
</template>

<script setup lang="ts">
	import type { ProgressProps } from "@nuxt/ui";
	import { computed } from "vue";

	const props = defineProps<{
		label: string
		currentStep: number
		totalSteps: number
		progress?: Omit<ProgressProps, "ui">
		ui?: Partial<typeof defaultUi>
	}>();

	const defaultUi = {
		root: "sticky top-0 flex flex-col gap-2 bg-default pb-3",
		header: "flex items-center justify-between gap-2",
		label: "text-sm font-semibold text-highlighted truncate",
		count: "shrink-0 text-xs text-muted"
	};

	const displayStep = computed(() => props.currentStep + 1);

	const resolvedUi = computed(() => ({
		root: props.ui?.root ?? defaultUi.root,
		header: props.ui?.header ?? defaultUi.header,
		label: props.ui?.label ?? defaultUi.label,
		count: props.ui?.count ?? defaultUi.count
	}));

	const progressResolvedProps = computed<Omit<ProgressProps, "ui">>(() => {
		return {
			modelValue: displayStep.value,
			max: props.totalSteps + 1,
			color: "secondary",
			...props.progress ?? {}
		};
	});
</script>
