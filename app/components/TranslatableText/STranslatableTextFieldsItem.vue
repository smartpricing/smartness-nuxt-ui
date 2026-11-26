<template>
	<div
		data-slot="field"
		class="flex flex-col gap-1"
		v-bind="context.attributes()?.field"
		:data-test-value="field.key"
	>
		<label
			:for="inputId"
			data-slot="label"
			class="flex justify-between gap-2 text-sm font-medium text-default"
			v-bind="context.attributes()?.label"
			:data-test-value="showsSource ? 'source' : 'translation'"
		>
			{{ field.label }}
			<span
				v-if="field.optional"
				class="font-normal text-muted"
			>{{ t("sTranslatableText.optional") }}</span>
		</label>

		<UTextarea
			:id="inputId"
			:model-value="value.texts[current] ?? ''"
			:rows="field.rows ?? 4"
			autoresize
			:disabled="context.disabled()"
			:loading="pending.includes(current)"
			:color="warned ? (emptyRequired.includes(current) ? 'error' : 'warning') : undefined"
			:highlight="warned || undefined"
			:aria-invalid="emptyRequired.includes(current) || undefined"
			v-bind="field.textarea"
			@update:model-value="(text) => setText(current, String(text ?? ''))"
		>
			<template
				v-if="showsSource ? canRefine : context.retranslateButton() !== false"
				#trailing
			>
				<UTooltip
					:text="showsSource ? t('sTranslatableText.refine') : t('sTranslatableText.retranslate')"
					:content="tooltipContent(context.attributes(), showsSource ? 'refine' : 'retranslate')"
				>
					<UButton
						color="neutral"
						variant="link"
						size="sm"
						icon="ph:magic-wand"
						:aria-label="showsSource ? t('sTranslatableText.refine') : t('sTranslatableText.retranslate')"
						:loading="pending.includes(current)"
						:disabled="context.disabled() || !source.trim()"
						v-bind="showsSource ? context.refineButton() : buttonProps(context.retranslateButton())"
						@click="showsSource ? refineSource() : retranslate(current)"
					/>
				</UTooltip>
			</template>
		</UTextarea>

		<div
			v-if="!showsSource && outdated.includes(current)"
			class="flex items-center justify-between gap-3"
		>
			<p
				data-slot="note"
				class="flex items-center gap-1 text-xs text-warning"
				v-bind="context.attributes()?.note"
				data-test-value="stale"
			>
				<UIcon
					name="ph:warning"
					class="size-3.5 shrink-0"
				/>
				{{ t("sTranslatableText.fieldStale", { language: context.inSentence(language) }) }}
			</p>
			<UButton
				color="neutral"
				variant="link"
				size="xs"
				class="shrink-0"
				:label="t('sTranslatableText.updateField')"
				:loading="pending.includes(current)"
				:disabled="context.disabled()"
				v-bind="context.updateFieldButton()"
				:data-test-value="field.key"
				@click="retranslate(current)"
			/>
		</div>
		<p
			v-else-if="aiWritten.includes(current)"
			data-slot="note"
			class="flex items-center gap-1 text-xs text-muted"
			v-bind="context.attributes()?.note"
			:data-test-value="showsSource ? 'refined' : 'translated'"
		>
			<UIcon
				name="ph:magic-wand"
				class="size-3.5 shrink-0"
			/>
			{{ showsSource ? t("sTranslatableText.refinedNote") : t("sTranslatableText.translatedNote") }}
		</p>
		<p
			v-if="!showsSource && emptyRequired.includes(current)"
			data-slot="error"
			class="flex items-center gap-1 text-xs text-error"
			v-bind="context.attributes()?.error"
		>
			<UIcon
				name="ph:warning-circle"
				class="size-3.5 shrink-0"
			/>
			{{ t("sTranslatableText.requiredEmpty", { language: context.nameOf(current) }) }}
		</p>

		<!-- Each field reports its own failures: the page sees which text to retry -->
		<UAlert
			v-for="failure in failures"
			:key="failure.key"
			color="error"
			variant="soft"
			orientation="horizontal"
			icon="ph:warning-circle"
			:description="failure.description"
			v-bind="context.attributes()?.alert"
			:data-test-value="failure.key"
		>
			<template #actions>
				<UButton
					color="error"
					variant="outline"
					size="sm"
					icon="ph:arrows-clockwise"
					:label="t('sActions.retry')"
					:disabled="context.disabled()"
					v-bind="context.retryButton()"
					:data-test-value="failure.key"
					@click="failure.retry"
				/>
			</template>
		</UAlert>
	</div>
</template>

<script setup lang="ts">
	import type { TranslatableText, TranslatableTextField } from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed, inject, onBeforeUnmount, useId } from "vue";
	import { translatableTextFieldsKey } from "./translatableTextFields";
	import { buttonProps, tooltipContent, useTranslatableText } from "./useTranslatableText";

	// One field of STranslatableTextFields: its own translation workflow, on the languages and the selection the
	// parent shares with every field
	const { field } = defineProps<{ field: TranslatableTextField }>();
	const model = defineModel<TranslatableText | undefined>();

	const context = inject(translatableTextFieldsKey)!;
	const { t } = useLocale();

	const {
		language,
		value,
		source,
		active,
		outdated,
		stale,
		blank,
		emptyRequired,
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
		languages: context.languages,
		primaryLanguage: context.language,
		requiredLanguages: context.requiredLanguages,
		translate: context.translate,
		refine: context.refine,
		debounce: context.debounce,
		disabled: context.disabled
	});

	const inputId = useId();
	const current = computed(() => context.current());
	const showsSource = computed(() => current.value === language.value);
	// A factual text (instructions, rules) is only translated: the AI never rewrites it
	const canRefine = computed(() => !!context.refine() && field.kind !== "factual");
	const warned = computed(() => !showsSource.value && (outdated.value.includes(current.value) || emptyRequired.value.includes(current.value)));

	const failures = computed(() => [
		{
			key: "translations",
			show: !!failed.value.length,
			description: `${field.label}: ${t("sTranslatableText.failed", { languages: failed.value.map(context.nameOf).join(", ") })}`,
			retry
		},
		{ key: "refine", show: refineFailed.value, description: `${field.label}: ${t("sTranslatableText.refineFailed")}`, retry: refineSource }
	].filter((failure) => failure.show));

	const leave = context.register({
		key: field.key,
		active: () => active.value,
		outdated: () => outdated.value,
		stale: () => stale.value,
		pending: () => pending.value,
		failed: () => failed.value,
		emptyRequired: () => emptyRequired.value,
		blank: () => blank.value,
		setActive,
		updateOutdated,
		clearAll
	});
	onBeforeUnmount(leave);
</script>
