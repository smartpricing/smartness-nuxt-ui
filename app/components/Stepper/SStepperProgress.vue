<template>
	<div :class="ui.root({ class: [props.ui?.root, props.class] })" data-id="stepper-progress">
		<div :class="ui.header({ class: props.ui?.header })">
			<span :class="ui.label({ class: props.ui?.label })">
				{{ label }}
			</span>
			<span :class="ui.count({ class: props.ui?.count })">
				{{ displayStep }}/{{ totalSteps }}
			</span>
		</div>
		<UProgress v-bind="progressResolvedProps" />
	</div>
</template>

<script setup lang="ts">
	import type { ProgressProps } from "@nuxt/ui";
	import { tv } from "@nuxt/ui/utils/tv";
	import { computed } from "vue";

	const props = defineProps<{
		label: string
		currentStep: number
		totalSteps: number
		progress?: Omit<ProgressProps, "ui">
		class?: string
		ui?: Partial<Record<keyof typeof theme.slots, string>>
	}>();

	const theme = {
		slots: {
			root: "sticky top-0 flex flex-col gap-2 bg-default pb-3",
			header: "flex items-center justify-between gap-2",
			label: "text-sm font-semibold text-highlighted truncate",
			count: "shrink-0 text-xs text-muted"
		}
	};

	const stepperProgress = tv(theme);
	const ui = stepperProgress();

	const displayStep = computed(() => props.currentStep + 1);

	const progressResolvedProps = computed<Omit<ProgressProps, "ui">>(() => {
		return {
			modelValue: displayStep.value,
			max: props.totalSteps + 1,
			color: "secondary",
			...props.progress ?? {}
		};
	});
</script>
