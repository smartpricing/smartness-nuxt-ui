<template>
	<div
		data-slot="languages"
		class="flex flex-col gap-2"
	>
		<ul class="flex flex-col gap-2">
			<li
				v-for="language in shown"
				:key="language.code"
				class="flex items-center gap-1 rounded-md border pe-2 transition-colors"
				:class="language.code === selected ? 'border-secondary bg-secondary-50' : 'border-default'"
			>
				<UButton
					color="neutral"
					variant="link"
					class="min-w-0 flex-1 px-2"
					:icon="language.icon"
					:label="language.code.toUpperCase()"
					:aria-pressed="language.code === selected"
					:aria-label="language.name"
					v-bind="languageButton"
					:data-test-value="language.code"
					@click="selected = language.code"
				>
					<template
						v-if="language.stale"
						#trailing
					>
						<UTooltip :text="t('sTranslatableText.outOfDate')">
							<UIcon
								name="ph:warning"
								class="size-4 shrink-0 text-warning"
								:aria-label="t('sTranslatableText.outOfDate')"
							/>
						</UTooltip>
					</template>
				</UButton>

				<UBadge
					v-if="language.role"
					:label="t(`sTranslatableText.${language.role}`)"
					color="secondary"
					variant="soft"
					size="sm"
				/>
				<UTooltip
					v-else
					:text="language.active ? t('sTranslatableText.active') : t('sTranslatableText.inactive')"
				>
					<USwitch
						:model-value="language.active"
						size="sm"
						:disabled="disabled"
						:aria-label="language.name"
						v-bind="languageSwitch"
						:data-test-value="language.code"
						@update:model-value="(on: boolean) => emit('toggle', language.code, on)"
					/>
				</UTooltip>
			</li>
		</ul>

		<UButton
			v-if="hiddenCount > 0"
			color="neutral"
			variant="link"
			size="sm"
			class="self-start px-0"
			:label="expanded ? t('sTranslatableText.showLess') : t('sTranslatableText.showMore', { n: hiddenCount })"
			:icon="hiddenStale ? 'ph:warning' : undefined"
			:trailing-icon="expanded ? 'ph:caret-up' : 'ph:caret-down'"
			:ui="{ leadingIcon: 'text-warning' }"
			:aria-expanded="expanded"
			v-bind="showMoreButton"
			@click="expanded = !expanded"
		/>

		<UButton
			v-if="manageButton !== false"
			color="neutral"
			variant="outline"
			size="sm"
			icon="ph:translate"
			block
			:label="t('sTranslatableText.manage')"
			:disabled="disabled"
			v-bind="manageButtonProps"
			@click="emit('manage')"
		/>
	</div>
</template>

<script setup lang="ts">
	import type { ButtonProps } from "@nuxt/ui";
	import type { TranslatableSwitchProps, TranslatableTextLanguage } from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed, shallowRef } from "vue";

	const {
		languages,
		visible,
		disabled = false,
		languageButton,
		languageSwitch,
		showMoreButton,
		manageButton = true
	} = defineProps<{
		languages: TranslatableTextLanguage[]
		/** Rows shown before "Show N more". */
		visible: number
		disabled?: boolean
		languageButton?: ButtonProps
		languageSwitch?: TranslatableSwitchProps
		showMoreButton?: ButtonProps
		manageButton?: boolean | ButtonProps
	}>();

	const emit = defineEmits<{
		toggle: [code: string, on: boolean]
		manage: []
	}>();

	const selected = defineModel<string>("selected", { required: true });

	const { t } = useLocale();

	const expanded = shallowRef(false);

	const shown = computed(() => (expanded.value ? languages : languages.slice(0, visible)));
	const hiddenCount = computed(() => Math.max(0, languages.length - visible));
	// An out-of-date language behind the fold would go unnoticed: the toggle carries the warning
	const hiddenStale = computed(() => !expanded.value && languages.slice(visible).some((language) => language.stale));

	const manageButtonProps = computed(() => (typeof manageButton === "object" ? manageButton : {}));
</script>
