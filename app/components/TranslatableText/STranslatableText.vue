<template>
	<div
		data-slot="root"
		:class="theme.root({ class: ui?.root })"
	>
		<STranslatableTextLanguages
			v-model:selected="selected"
			:languages="rows"
			:visible="visibleLanguages"
			:disabled="disabled"
			:language-button="languageButton"
			:language-switch="languageSwitch"
			:show-more-button="showMoreButton"
			:manage-button="manageButton"
			:clear-all-button="clearAllButton"
			:blank="blank"
			:attributes="attributes"
			:class="theme.languages({ class: ui?.languages })"
			v-bind="attributes?.languages"
			@toggle="onToggle"
			@manage="manageOpen = true"
			@clear-all="offerClearAll"
		/>

		<div
			data-slot="content"
			:class="theme.content({ class: ui?.content })"
		>
			<p
				v-if="inactiveHint"
				data-slot="hint"
				:class="theme.hint({ class: ui?.hint })"
				v-bind="attributes?.hint"
			>
				<UIcon
					name="ph:arrow-elbow-down-right"
					class="mt-0.5 size-4 shrink-0"
				/>
				{{ inactiveHint }}
			</p>

			<div class="flex flex-col gap-1">
				<label
					:for="sourceId"
					data-slot="label"
					:class="theme.label({ class: ui?.label })"
					v-bind="attributes?.label"
					data-test-value="source"
				>
					<slot
						name="label"
						v-bind="{ language, name: nameOf(language), source: true }"
					>
						{{ nameOf(language) }}
					</slot>
				</label>
				<UTextarea
					:id="sourceId"
					:model-value="source"
					:rows="4"
					:variant="showsSource ? 'outline' : 'soft'"
					:readonly="!showsSource"
					:disabled="disabled"
					:loading="pending.includes(language)"
					v-bind="sourceTextarea"
					@update:model-value="(text) => setText(language, String(text ?? ''))"
				>
					<template
						v-if="refine && showsSource"
						#trailing
					>
						<UTooltip
							:text="t('sTranslatableText.refine')"
							:content="tooltipContent('refine')"
						>
							<UButton
								color="neutral"
								variant="link"
								size="sm"
								icon="ph:magic-wand"
								:aria-label="t('sTranslatableText.refine')"
								:loading="pending.includes(language)"
								:disabled="disabled || !source.trim()"
								v-bind="refineButton"
								@click="refineSource"
							/>
						</UTooltip>
					</template>
				</UTextarea>
				<p
					v-if="showsSource && aiWritten.includes(language)"
					data-slot="note"
					:class="theme.note({ class: ui?.note })"
					v-bind="attributes?.note"
					data-test-value="refined"
				>
					<UIcon
						name="ph:magic-wand"
						class="size-3.5 shrink-0"
					/>
					{{ t("sTranslatableText.refinedNote") }}
				</p>
				<div
					v-if="outdated.length"
					class="mt-1 flex justify-end"
				>
					<UButton
						color="primary"
						variant="solid"
						size="sm"
						icon="ph:magic-wand"
						:label="t('sTranslatableText.update')"
						:loading="outdated.some((code) => pending.includes(code))"
						:disabled="disabled"
						v-bind="updateButton"
						@click="updateOutdated"
					/>
				</div>
			</div>

			<div
				v-if="!showsSource"
				class="flex flex-col gap-1"
			>
				<label
					:for="translationId"
					data-slot="label"
					:class="theme.label({ class: ui?.label })"
					v-bind="attributes?.label"
					data-test-value="translation"
				>
					<slot
						name="label"
						v-bind="{ language: current, name: nameOf(current), source: false }"
					>
						{{ nameOf(current) }}
					</slot>
				</label>
				<UTextarea
					:id="translationId"
					:model-value="value.texts[current] ?? ''"
					:rows="4"
					:disabled="disabled"
					:loading="pending.includes(current)"
					v-bind="translationTextarea"
					@update:model-value="(text) => setText(current, String(text ?? ''))"
				>
					<template
						v-if="retranslateButton !== false"
						#trailing
					>
						<UTooltip
							:text="t('sTranslatableText.retranslate')"
							:content="tooltipContent('retranslate')"
						>
							<UButton
								color="neutral"
								variant="link"
								size="sm"
								icon="ph:magic-wand"
								:aria-label="t('sTranslatableText.retranslate')"
								:loading="pending.includes(current)"
								:disabled="disabled || !source.trim()"
								v-bind="retranslateButtonProps"
								@click="retranslate(current)"
							/>
						</UTooltip>
					</template>
				</UTextarea>
				<p
					v-if="aiWritten.includes(current)"
					data-slot="note"
					:class="theme.note({ class: ui?.note })"
					v-bind="attributes?.note"
					data-test-value="translated"
				>
					<UIcon
						name="ph:magic-wand"
						class="size-3.5 shrink-0"
					/>
					{{ t("sTranslatableText.translatedNote") }}
				</p>
			</div>

			<SAlert
				:show="!!failed.length"
				color="error"
				icon="ph:warning-circle"
				:description="t('sTranslatableText.failed', { languages: failed.map(nameOf).join(', ') })"
				:ui="{ root: 'lg:w-full' }"
				v-bind="attributes?.alert"
				data-test-value="translations"
			>
				<template #actions>
					<UButton
						color="error"
						variant="outline"
						size="sm"
						icon="ph:arrows-clockwise"
						:label="t('sTranslatableText.retry')"
						:disabled="disabled"
						v-bind="retryButton"
						data-test-value="translations"
						@click="retry"
					/>
				</template>
			</SAlert>
			<SAlert
				:show="refineFailed"
				color="error"
				icon="ph:warning-circle"
				:description="t('sTranslatableText.refineFailed')"
				:ui="{ root: 'lg:w-full' }"
				v-bind="attributes?.alert"
				data-test-value="refine"
			>
				<template #actions>
					<UButton
						color="error"
						variant="outline"
						size="sm"
						icon="ph:arrows-clockwise"
						:label="t('sTranslatableText.retry')"
						:disabled="disabled"
						v-bind="retryButton"
						data-test-value="refine"
						@click="refineSource"
					/>
				</template>
			</SAlert>
		</div>

		<STranslatableTextManage
			v-model:open="manageOpen"
			v-model:languages="languages"
			:options="manageOptions"
			:attributes="attributes"
			v-bind="manage"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { TooltipProps } from "@nuxt/ui";
	import type { Ref } from "vue";
	import type { STranslatableTextProps, STranslatableTextSlots, TranslatableText, TranslatableTextLanguage } from "./types";
	import { inputIdInjectionKey, useLocale } from "@nuxt/ui/composables";
	import { tv } from "@nuxt/ui/utils/tv";
	import { computed, inject, provide, shallowRef, useId } from "vue";
	import { useConfirm } from "../../composables/useConfirm";
	import { languageFlagIcon } from "../../utils/translatable-text";
	import STranslatableTextLanguages from "./STranslatableTextLanguages.vue";
	import STranslatableTextManage from "./STranslatableTextManage.vue";
	import { useTranslatableText } from "./useTranslatableText";

	const {
		primaryLanguage,
		availableLanguages,
		translate,
		refine,
		fallbackLanguage,
		visibleLanguages = 5,
		debounce = 1000,
		disabled = false,
		sourceTextarea,
		translationTextarea,
		languageButton,
		languageSwitch,
		manageButton = true,
		retranslateButton = true,
		refineButton,
		updateButton,
		showMoreButton,
		retryButton,
		manage,
		confirm: confirmOptions,
		clearAllButton = true,
		clearConfirm,
		attributes,
		ui
	} = defineProps<STranslatableTextProps>();

	defineSlots<STranslatableTextSlots>();

	const model = defineModel<TranslatableText | undefined>();
	/** The organisation's languages: Manage writes them, the product persists them. */
	const languages = defineModel<string[]>("languages", { required: true });

	const theme = tv({
		slots: {
			root: "flex flex-col gap-4 sm:flex-row",
			languages: "w-full shrink-0 sm:w-36",
			content: "flex min-w-0 flex-1 flex-col gap-4 sm:border-s sm:border-default sm:ps-4",
			label: "text-sm font-medium text-default",
			note: "flex items-center gap-1 text-xs text-muted",
			hint: "flex items-start gap-1 text-sm text-muted"
		}
	})();

	const { t, code: localeCode } = useLocale();
	const { confirm } = useConfirm();

	const {
		language,
		value,
		source,
		translations,
		outdated,
		stale,
		blank,
		pending,
		failed,
		refineFailed,
		aiWritten,
		setText,
		setActive,
		updateOutdated,
		retranslate,
		retry,
		refineSource,
		clearAll
	} = useTranslatableText({
		model,
		languages,
		primaryLanguage: () => primaryLanguage,
		fallbackLanguage: () => fallbackLanguage,
		translate: () => translate,
		refine: () => refine,
		debounce: () => debounce
	});

	const sourceId = useId();
	const translationId = useId();

	// Inside a form field every Nuxt UI control without an id takes the field's input id, so the
	// Manage checkboxes, the search box and the switches would all share one id and their labels
	// would toggle the wrong control. The field's label names the source text; every control in
	// here keeps an id of its own.
	const fieldInputId = inject(inputIdInjectionKey, undefined);
	if (fieldInputId) fieldInputId.value = sourceId;
	provide(inputIdInjectionKey, undefined as unknown as Ref<string | undefined>);

	// --- Language names and rows ---

	const displayNames = computed(() => new Intl.DisplayNames([localeCode.value], { type: "language" }));

	// Some locales name languages in lower case ("inglese"): a list label starts with a capital
	function nameOf(code: string): string {
		try {
			const name = displayNames.value.of(code) ?? code;
			return name.charAt(0).toLocaleUpperCase(localeCode.value) + name.slice(1);
		} catch {
			// Not a valid language tag: show it as it is
			return code;
		}
	}

	function roleOf(code: string): TranslatableTextLanguage["role"] {
		if (code === language.value) return "primary";
		if (code === fallbackLanguage) return "fallback";
		return undefined;
	}

	const rows = computed<TranslatableTextLanguage[]>(() => [language.value, ...translations.value].map((code) => {
		const role = roleOf(code);
		return {
			code,
			name: nameOf(code),
			icon: languageFlagIcon(code),
			role,
			active: !!role || !(value.value.inactive ?? []).includes(code),
			stale: stale.value.includes(code),
			pending: pending.value.includes(code)
		};
	}));

	const manageOptions = computed(() => [...new Set([language.value, fallbackLanguage, ...availableLanguages])]
		.filter((code): code is string => !!code)
		.map((code) => ({ code, name: nameOf(code), icon: languageFlagIcon(code), role: roleOf(code) })));

	// --- Selection ---

	const selected = shallowRef(language.value);
	// A language Manage removed cannot stay selected: the written one takes its place
	const current = computed(() => (rows.value.some((row) => row.code === selected.value) ? selected.value : language.value));
	const showsSource = computed(() => current.value === language.value);

	const inactiveHint = computed(() => {
		const row = rows.value.find((candidate) => candidate.code === current.value);
		if (!row || row.active) return "";
		return fallbackLanguage
			? t("sTranslatableText.inactiveHintFallback", { language: nameOf(fallbackLanguage) })
			: t("sTranslatableText.inactiveHint");
	});

	const retranslateButtonProps = computed(() => (typeof retranslateButton === "object" ? retranslateButton : {}));

	// The tooltip panel is portalled: its attributes travel through UTooltip `content`
	const tooltipContent = (value: string) => ({ ...attributes?.tooltip, "data-test-value": value }) as TooltipProps["content"];

	// --- Switching a language on ---

	async function offerUpdate() {
		const update = await confirm({
			title: t("sTranslatableText.staleTitle"),
			message: t("sTranslatableText.staleMessage", { language: nameOf(language.value) }),
			headerIcon: "ph:warning",
			...confirmOptions,
			confirmProps: { label: t("sTranslatableText.update"), icon: "ph:magic-wand", ...confirmOptions?.confirmProps }
		});
		if (update) await updateOutdated();
	}

	function onToggle(code: string, on: boolean) {
		setActive(code, on);
		if (!on) return;
		// Switching a language on shows what guests will read in it
		selected.value = code;
		if (outdated.value.includes(code) && !pending.value.includes(code)) offerUpdate();
	}

	// --- Clearing every language ---

	// Emptying the source by hand leaves its translations published: this is the way to empty them all
	async function offerClearAll() {
		const cleared = await confirm({
			title: t("sTranslatableText.clearAllTitle"),
			message: t("sTranslatableText.clearAllMessage"),
			destructive: true,
			...clearConfirm,
			confirmProps: { label: t("sTranslatableText.clearAllConfirm"), ...clearConfirm?.confirmProps }
		});
		if (cleared) clearAll();
	}

	const manageOpen = shallowRef(false);

	defineExpose({ pending, failed, retry });
</script>
