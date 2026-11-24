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
						<UTooltip
							:text="t('sTranslatableText.outOfDate')"
							:content="tooltipContent(`stale-${language.code}`)"
						>
							<UIcon
								name="ph:warning"
								class="size-4 shrink-0 text-warning"
								:aria-label="t('sTranslatableText.outOfDate')"
								v-bind="attributes?.staleIcon"
								:data-test-value="language.code"
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
					v-bind="attributes?.badge"
					:data-test-value="language.code"
				/>
				<UTooltip
					v-else
					:text="language.active ? t('sTranslatableText.active') : t('sTranslatableText.inactive')"
					:content="tooltipContent(`switch-${language.code}`)"
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
			:trailing-icon="expanded ? 'ph:caret-up' : 'ph:caret-down'"
			:aria-expanded="expanded"
			v-bind="showMoreButton"
			@click="expanded = !expanded"
		>
			<template
				v-if="hiddenStale"
				#leading
			>
				<UIcon
					name="ph:warning"
					class="size-4 shrink-0 text-warning"
					:aria-label="t('sTranslatableText.outOfDate')"
					v-bind="attributes?.staleIcon"
					data-test-value="hidden"
				/>
			</template>
		</UButton>

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
	import type { ButtonProps, TooltipProps } from "@nuxt/ui";
	import type { TranslatableSwitchProps, TranslatableTextAttributes, TranslatableTextLanguage } from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed, shallowRef } from "vue";

	const {
		languages,
		visible,
		disabled = false,
		languageButton,
		languageSwitch,
		showMoreButton,
		manageButton = true,
		attributes
	} = defineProps<{
		languages: TranslatableTextLanguage[]
		/** Rows shown before "Show N more". */
		visible: number
		disabled?: boolean
		languageButton?: ButtonProps
		languageSwitch?: TranslatableSwitchProps
		showMoreButton?: ButtonProps
		manageButton?: boolean | ButtonProps
		attributes?: TranslatableTextAttributes
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

	// The tooltip panel is portalled: its attributes travel through UTooltip `content`
	const tooltipContent = (value: string) => ({ ...attributes?.tooltip, "data-test-value": value }) as TooltipProps["content"];
</script>
