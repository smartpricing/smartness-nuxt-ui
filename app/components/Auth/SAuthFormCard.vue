<template>
	<div :class="resolvedUi.wrapper">
		<div
			:class="resolvedUi.container"
			:style="{ maxWidth: `${maxWidth}px` }"
		>
			<slot name="brand">
				<div :class="resolvedUi.brand">
					<img :src="wordmarkSrc" :alt="t('sAuthFormCard.brandAlt')" class="h-8">
				</div>
			</slot>

			<div :class="resolvedUi.card">
				<div :class="resolvedUi.header">
					<h1 :class="resolvedUi.title">
						<slot name="title">
							{{ title }}
						</slot>
					</h1>
					<div v-if="hasHeaderActions" class="shrink-0">
						<slot name="header-actions" />
					</div>
				</div>

				<div :class="resolvedUi.body">
					<slot />
				</div>

				<div :class="resolvedUi.footer">
					<slot name="footer">
						<p class="text-xs text-primary-700">
							{{ t("sAuthFormCard.supportPrompt") }}
							<a class="underline" href="mailto:support@smartpricing.it">support@smartpricing.it</a>
						</p>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useLocale } from "@nuxt/ui/composables";

	const props = withDefaults(defineProps<{
		title?: string
		/** Max width of the card in pixels. Figma uses ~512. */
		maxWidth?: number
		ui?: {
			wrapper?: string
			container?: string
			brand?: string
			card?: string
			header?: string
			title?: string
			body?: string
			footer?: string
		}
	}>(), {
		title: "",
		maxWidth: 512
	});

	const defaultUi = {
		wrapper: "min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10",
		container: "w-full flex flex-col items-stretch gap-9",
		brand: "flex flex-col items-center gap-6",
		card: "bg-white border border-primary-200 rounded-xl shadow-sm flex flex-col gap-4 px-5 py-6 sm:px-11",
		header: "flex items-center justify-between gap-4",
		title: "flex-1 text-xl font-semibold text-primary-950 leading-7",
		body: "flex flex-col gap-8",
		footer: "flex justify-end px-1"
	};

	const resolvedUi = computed(() => ({
		wrapper: props.ui?.wrapper ?? defaultUi.wrapper,
		container: props.ui?.container ?? defaultUi.container,
		brand: props.ui?.brand ?? defaultUi.brand,
		card: props.ui?.card ?? defaultUi.card,
		header: props.ui?.header ?? defaultUi.header,
		title: props.ui?.title ?? defaultUi.title,
		body: props.ui?.body ?? defaultUi.body,
		footer: props.ui?.footer ?? defaultUi.footer
	}));

	const { t } = useLocale();
	const slots = useSlots();
	const hasHeaderActions = computed(() => !!slots["header-actions"]);

	const wordmarkSrc = new URL("../../assets/images/smartness_full.svg", import.meta.url).href;
</script>
