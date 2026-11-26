<template>
	<div
		data-slot="root"
		class="flex flex-col gap-4 sm:flex-row"
	>
		<!-- Wider than STranslatableText's column: the count badge sits beside the code and the switch -->
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
			class="w-full shrink-0 sm:w-44"
			v-bind="attributes?.languages"
			@toggle="onToggle"
			@manage="manageOpen = true"
			@clear-all="offerClearAll"
		/>

		<div
			data-slot="content"
			class="flex min-w-0 flex-1 flex-col gap-4 sm:border-s sm:border-default sm:ps-4"
		>
			<div class="flex flex-wrap items-center justify-between gap-3 border-b border-default pb-3">
				<div class="flex flex-col gap-0.5">
					<span class="text-sm font-semibold text-default">{{ t("sTranslatableText.fieldsTitle", { language: nameOf(current) }) }}</span>
					<span
						data-slot="summary"
						class="text-xs"
						:class="currentOutdated ? 'text-warning' : 'text-muted'"
						v-bind="attributes?.summary"
					>{{ summary }}</span>
				</div>
				<UButton
					v-if="outdated"
					color="primary"
					variant="solid"
					size="sm"
					icon="ph:magic-wand"
					:label="t('sTranslatableText.update')"
					:loading="updating"
					:disabled="disabled"
					v-bind="updateButton"
					@click="updateOutdated"
				/>
			</div>

			<p
				v-if="inactiveHint"
				data-slot="hint"
				class="flex items-start gap-1 text-sm text-muted"
				v-bind="attributes?.hint"
			>
				<UIcon
					name="ph:arrow-elbow-down-right"
					class="mt-0.5 size-4 shrink-0"
				/>
				{{ inactiveHint }}
			</p>

			<STranslatableTextFieldsItem
				v-for="field in fields"
				:key="field.key"
				:field="field"
				:model-value="model?.[field.key]"
				@update:model-value="(text) => setField(field.key, text)"
			/>
		</div>

		<STranslatableTextManage
			v-model:open="manageOpen"
			:languages="languages"
			:options="manageOptions"
			:attributes="attributes"
			v-bind="manage"
			@update:languages="onManage"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { TranslatableTextFieldMember } from "./translatableTextFields";
	import type { STranslatableTextFieldsProps, TranslatableText, TranslatableTextLanguage } from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed, inject, onBeforeUnmount, provide, shallowRef, watch } from "vue";
	import { useConfirm } from "../../composables/useConfirm";
	import { translatableTextGroupKey } from "../../composables/useTranslatableTextGroup";
	import { languageFlagIcon, SMARTNESS_LANGUAGES, translationLanguages } from "../../utils/translatable-text";
	import STranslatableTextFieldsItem from "./STranslatableTextFieldsItem.vue";
	import STranslatableTextLanguages from "./STranslatableTextLanguages.vue";
	import STranslatableTextManage from "./STranslatableTextManage.vue";
	import { translatableTextFieldsKey } from "./translatableTextFields";

	// Several texts of one item (SSO-119), e.g. a description, the arrival instructions and the house rules: one
	// language column, one switch per language for all of them, each field out of date on its own
	const {
		fields,
		primaryLanguage,
		availableLanguages = SMARTNESS_LANGUAGES,
		translate,
		refine,
		requiredLanguages,
		visibleLanguages = 5,
		debounce = 1000,
		disabled = false,
		languageButton,
		languageSwitch,
		manageButton = true,
		retranslateButton = true,
		refineButton,
		updateButton,
		updateFieldButton,
		showMoreButton,
		retryButton,
		manage,
		confirm: confirmOptions,
		clearAllButton = true,
		clearConfirm,
		attributes
	} = defineProps<STranslatableTextFieldsProps>();

	/** One TranslatableText per field key: the shape a product already saves for a single text. */
	const model = defineModel<Record<string, TranslatableText | undefined>>();
	const languages = defineModel<string[]>("languages", { required: true });

	const { t, code: localeCode } = useLocale();
	const { confirm } = useConfirm();

	// Two fields can answer in the same tick (a switch, "Update all"): each write starts from the last one, not
	// from a v-model the parent has not passed back yet
	let latest: Record<string, TranslatableText | undefined> = {};
	watch(model, (value) => (latest = value ?? {}), { immediate: true, flush: "sync" });
	function setField(key: string, text: TranslatableText | undefined) {
		latest = { ...latest, [key]: text };
		model.value = latest;
	}

	// Every field is written in the same language: the first one written sets it for the ones still empty
	const language = computed(() => fields.map((field) => model.value?.[field.key]?.language).find(Boolean) || primaryLanguage);

	const members = shallowRef<TranslatableTextFieldMember[]>([]);
	function register(member: TranslatableTextFieldMember) {
		members.value = [...members.value, member];
		return () => {
			members.value = members.value.filter((m) => m !== member);
		};
	}

	// --- Language names and rows ---

	const displayNames = computed(() => new Intl.DisplayNames([localeCode.value], { type: "language" }));
	function nameOf(code: string): string {
		try {
			const name = displayNames.value.of(code) ?? code;
			return name.charAt(0).toLocaleUpperCase(localeCode.value) + name.slice(1);
		} catch {
			return code;
		}
	}

	function roleOf(code: string): TranslatableTextLanguage["role"] {
		if (code === language.value) return "primary";
		if (requiredLanguages?.includes(code)) return "required";
		return undefined;
	}

	const codes = computed(() => [language.value, ...translationLanguages({ language: language.value, texts: {} }, { languages: languages.value, requiredLanguages })]);
	const fieldsWith = (code: string, list: (member: TranslatableTextFieldMember) => readonly string[]) =>
		members.value.filter((member) => list(member).includes(code)).length;

	const rows = computed<TranslatableTextLanguage[]>(() => codes.value.map((code) => {
		// The badge counts only what guests read: the switched-on languages and the required ones
		const staleCount = fieldsWith(code, (m) => m.stale());
		return {
			code,
			name: nameOf(code),
			icon: languageFlagIcon(code),
			role: roleOf(code),
			// Published for all its fields or for none: one field switched off (older data) shows it off
			active: members.value.every((m) => m.active().includes(code)),
			stale: staleCount > 0,
			staleCount,
			pending: fieldsWith(code, (m) => m.pending()) > 0,
			emptyRequired: fieldsWith(code, (m) => m.emptyRequired()) > 0
		};
	}));

	const manageOptions = computed(() => [...new Set([language.value, ...(requiredLanguages ?? []), ...availableLanguages])]
		.map((code) => ({ code, name: nameOf(code), icon: languageFlagIcon(code), role: roleOf(code) })));

	// --- Selection and summary ---

	const selected = shallowRef(language.value);
	const current = computed(() => (codes.value.includes(selected.value) ? selected.value : language.value));

	const currentOutdated = computed(() => (current.value === language.value ? 0 : fieldsWith(current.value, (m) => m.outdated())));
	const summary = computed(() => {
		if (current.value === language.value) return t("sTranslatableText.fieldsPrimary");
		if (!currentOutdated.value) return t("sTranslatableText.fieldsUpToDate");
		return t("sTranslatableText.fieldsSummary", { n: currentOutdated.value, total: fields.length });
	});

	const inactiveHint = computed(() => {
		const row = rows.value.find((candidate) => candidate.code === current.value);
		if (!row || row.active) return "";
		return t("sTranslatableText.inactiveHint", { language: nameOf(language.value) });
	});

	// --- Updating ---

	const outdated = computed(() => members.value.some((m) => m.outdated().length > 0));
	const updating = computed(() => members.value.some((m) => m.outdated().some((code) => m.pending().includes(code))));
	async function updateOutdated() {
		await Promise.all(members.value.map((m) => m.updateOutdated()));
	}

	const setActive = (codes: readonly string[], on: boolean) => members.value.forEach((m) => m.setActive(codes, on));

	async function onToggle(code: string, on: boolean) {
		setActive([code], on);
		if (!on) return;
		selected.value = code;
		const behind = members.value.some((m) => m.outdated().includes(code) && !m.pending().includes(code));
		if (!behind) return;
		const update = await confirm({
			title: t("sTranslatableText.staleTitle"),
			message: t("sTranslatableText.staleMessage", { language: nameOf(language.value) }),
			headerIcon: "ph:warning",
			...confirmOptions,
			confirmProps: { label: t("sTranslatableText.update"), icon: "ph:magic-wand", ...confirmOptions?.confirmProps }
		});
		if (update) await updateOutdated();
	}

	// --- Clearing and Manage ---

	const blank = computed(() => members.value.every((m) => m.blank()));
	async function offerClearAll() {
		const cleared = await confirm({
			title: t("sTranslatableText.clearAllTitle"),
			message: t("sTranslatableText.clearAllMessage"),
			destructive: true,
			...clearConfirm,
			confirmProps: { label: t("sTranslatableText.clearAllConfirm"), ...clearConfirm?.confirmProps }
		});
		if (cleared) members.value.forEach((m) => m.clearAll());
	}

	const manageOpen = shallowRef(false);
	function onManage(next: string[]) {
		const added = next.filter((code) => !languages.value.includes(code));
		languages.value = next;
		if (added.length) setActive(added, true);
	}

	provide(translatableTextFieldsKey, {
		register,
		language: () => language.value,
		languages: () => languages.value,
		requiredLanguages: () => requiredLanguages,
		current: () => current.value,
		translate: () => translate,
		refine: () => refine,
		debounce: () => debounce,
		disabled: () => disabled,
		nameOf,
		inSentence: (code) => {
			try {
				return displayNames.value.of(code) ?? code;
			} catch {
				return code;
			}
		},
		retranslateButton: () => retranslateButton,
		refineButton: () => refineButton,
		updateFieldButton: () => updateFieldButton,
		retryButton: () => retryButton,
		attributes: () => attributes
	});

	// The page's group (useTranslatableTextGroup): out of date when any field is
	const group = inject(translatableTextGroupKey, null);
	if (group) {
		const leave = group.register({
			language: () => language.value,
			stale: () => [...new Set(members.value.flatMap((m) => m.stale()))],
			update: updateOutdated
		});
		onBeforeUnmount(leave);
	}

	const perField = (list: (member: TranslatableTextFieldMember) => readonly string[]) =>
		Object.fromEntries(members.value.map((m) => [m.key, list(m)]));
	defineExpose({
		get pending() {
			return perField((m) => m.pending());
		},
		get failed() {
			return perField((m) => m.failed());
		},
		get emptyRequired() {
			return perField((m) => m.emptyRequired());
		},
		get stale() {
			return perField((m) => m.stale());
		},
		updateOutdated
	});
</script>
