<template>
	<div :class="ui.wrapper({ class: [props.ui?.wrapper, props.class] })">
		<div
			:class="ui.container({ class: props.ui?.container })"
			:style="{ maxWidth: `${maxWidth}px` }"
		>
			<slot name="brand">
				<div :class="ui.brand({ class: props.ui?.brand })">
					<img :src="wordmarkSrc" :alt="t('sAuthFormCard.brandAlt')" class="h-8">
				</div>
			</slot>

			<div :class="ui.card({ class: props.ui?.card })">
				<div :class="ui.header({ class: props.ui?.header })">
					<h1 :class="ui.title({ class: props.ui?.title })">
						<slot name="title">
							{{ title }}
						</slot>
					</h1>
					<div v-if="hasHeaderActions" class="shrink-0">
						<slot name="header-actions" />
					</div>
				</div>

				<div :class="ui.body({ class: props.ui?.body })">
					<slot />
				</div>

				<div :class="ui.footer({ class: props.ui?.footer })">
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
	import { tv } from "@nuxt/ui/utils/tv";

	const props = withDefaults(defineProps<{
		title?: string
		/** Max width of the card in pixels. Figma uses ~512. */
		maxWidth?: number
		class?: string
		ui?: Partial<Record<keyof typeof theme.slots, string>>
	}>(), {
		title: "",
		maxWidth: 512
	});

	const theme = {
		slots: {
			wrapper: "min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10",
			container: "w-full flex flex-col items-stretch gap-9",
			brand: "flex flex-col items-center gap-6",
			card: "bg-white border border-primary-200 rounded-xl shadow-sm flex flex-col gap-4 px-5 py-6 sm:px-11",
			header: "flex items-center justify-between gap-4",
			title: "flex-1 text-xl font-semibold text-primary-950 leading-7",
			body: "flex flex-col gap-8",
			footer: "flex justify-end px-1"
		}
	};

	const authFormCard = tv(theme);
	const ui = authFormCard();

	const { t } = useLocale();
	const slots = useSlots();
	const hasHeaderActions = computed(() => !!slots["header-actions"]);

	const wordmarkSrc = new URL("../../assets/images/smartness_full.svg", import.meta.url).href;
</script>
