<template>
	<div :class="resolvedUi.root">
		<div :class="resolvedUi.titleRow">
			<div :class="resolvedUi.titleGroup">
				<UButton
					v-if="backLabel"
					color="neutral"
					variant="ghost"
					icon="ph:arrow-left-bold"
					class="shrink-0"
					:label="backLabel"
					@click="$emit('back')"
				/>
				<div
					v-if="$slots.title || title || showHowDoesItWork"
					class="flex min-w-0 items-start gap-2 max-lg:flex-1 max-lg:min-w-0 lg:contents"
				>
					<h1
						v-if="$slots.title || title"
						:class="titleClass"
					>
						<slot name="title">
							{{ title }}
						</slot>
					</h1>
					<UButton
						v-if="showHowDoesItWork"
						v-bind="howDoesItWorkButtonProps"
						:label="howDoesItWorkLabelForBreakpoint"
						:aria-label="howDoesItWorkAriaLabel"
						:square="!isMdAndUp"
						class="shrink-0 self-start"
						@click="$emit('howDoesItWork')"
					/>
				</div>
			</div>
			<div
				v-if="$slots.actions"
				:class="resolvedUi.actions"
			>
				<slot name="actions" />
			</div>
		</div>
		<div v-if="tabs" :class="resolvedUi.tabs">
			<UTabs
				color="secondary"
				variant="link"
				size="md"
				:content="false"
				:ui="{
					root: 'w-full block px-0 sm:px-0',
					list: 'block',
					indicator: 'h-[2px]',
				}"
				:model-value="activeTab"
				:items="tabs"
				@update:model-value="$emit('tabChange', $event)"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ButtonProps, TabsItem } from "@nuxt/ui";
	import { useLocale } from "@nuxt/ui/composables";
	import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
	import { computed } from "vue";

	const props = defineProps<{
		title?: string
		backLabel?: string
		showHowDoesItWork?: boolean
		howDoesItWorkButton?: ButtonProps
		tabs?: TabsItem[]
		activeTab?: string | number
		ui?: Partial<typeof defaultUi>
	}>();

	defineEmits<{
		back: []
		howDoesItWork: []
		tabChange: [value: string | number]
	}>();

	const defaultUi = {
		root: "flex shrink-0 flex-col border-b border-default",
		titleRow: "flex w-full flex-col gap-2 px-4 py-2 lg:flex-row lg:items-center lg:gap-4",
		titleGroup: "flex min-w-0 w-full items-start gap-2 lg:w-auto lg:shrink lg:mr-auto lg:items-center",
		title: "heading-sm min-w-0 text-highlighted line-clamp-2 max-lg:min-w-0 lg:flex-none lg:max-w-2xl lg:truncate",
		actions: "flex w-full flex-wrap items-center justify-start gap-2 lg:w-auto lg:shrink-0 lg:flex-nowrap lg:justify-end",
		tabs: "px-3 pt-2"
	};

	const { t } = useLocale();
	const breakpoints = useBreakpoints(breakpointsTailwind);
	const isMdAndUp = breakpoints.greaterOrEqual("md");

	const resolvedUi = computed(() => ({
		root: props.ui?.root ?? defaultUi.root,
		titleRow: props.ui?.titleRow ?? defaultUi.titleRow,
		titleGroup: props.ui?.titleGroup ?? defaultUi.titleGroup,
		title: props.ui?.title ?? defaultUi.title,
		actions: props.ui?.actions ?? defaultUi.actions,
		tabs: props.ui?.tabs ?? defaultUi.tabs
	}));

	const titleClass = computed(() => {
		const base = resolvedUi.value.title;
		if (props.showHowDoesItWork) {
			return `${base} max-lg:w-fit max-lg:max-w-[calc(100%-3rem)] max-lg:flex-none`;
		}
		return `${base} max-lg:flex-1 max-lg:max-w-full`;
	});

	const howDoesItWorkResolvedLabel = computed(() => {
		const fromProps = props.howDoesItWorkButton?.label;
		if (fromProps !== undefined && fromProps !== null && String(fromProps).length > 0) {
			return String(fromProps);
		}
		return t("sAppPage.howDoesItWorkLabel");
	});

	const howDoesItWorkLabelForBreakpoint = computed(() =>
		isMdAndUp.value ? howDoesItWorkResolvedLabel.value : undefined
	);

	const howDoesItWorkAriaLabel = computed(() => howDoesItWorkResolvedLabel.value);

	const howDoesItWorkButtonProps = computed(() => {
		const { label: _omitLabel, ...rest } = props.howDoesItWorkButton ?? {};
		return {
			color: "learning" as const,
			variant: "solid" as const,
			icon: "ph:book-open-bold" as const,
			size: "md" as const,
			...rest
		};
	});
</script>
