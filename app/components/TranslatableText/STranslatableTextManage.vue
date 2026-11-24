<template>
	<USlideover
		v-model:open="open"
		v-bind="slideoverProps"
	>
		<template #body>
			<div class="flex flex-col gap-4">
				<UAlert
					color="secondary"
					variant="soft"
					icon="ph:info"
					:description="t('sTranslatableText.manageInfo')"
					v-bind="attributes?.manageInfo"
				/>

				<UInput
					v-model="search"
					icon="ph:magnifying-glass"
					:placeholder="t('sTranslatableText.search')"
					v-bind="searchInput"
				/>

				<UCheckbox
					:model-value="allState"
					:label="t('sTranslatableText.selectAll')"
					:disabled="!selectable.length"
					v-bind="selectAll"
					@update:model-value="toggleAll"
				/>

				<USeparator />

				<ul
					v-if="matching.length"
					class="flex flex-col gap-3"
				>
					<li
						v-for="option in matching"
						:key="option.code"
						class="flex items-center justify-between gap-2"
					>
						<UCheckbox
							:model-value="isChecked(option)"
							:disabled="!!option.role"
							v-bind="checkbox"
							:data-test-value="option.code"
							@update:model-value="(value: boolean | 'indeterminate') => toggle(option.code, value === true)"
						>
							<template #label>
								<span class="flex items-center gap-2">
									<UIcon
										:name="option.icon"
										class="size-4 shrink-0"
									/>
									{{ option.name }}
								</span>
							</template>
						</UCheckbox>
						<UBadge
							v-if="option.role"
							:label="t(`sTranslatableText.${option.role}`)"
							color="secondary"
							variant="soft"
							size="sm"
							v-bind="attributes?.badge"
							:data-test-value="option.code"
						/>
					</li>
				</ul>
				<p
					v-else
					class="text-sm text-muted"
					v-bind="attributes?.manageEmpty"
				>
					{{ t("sTranslatableText.empty") }}
				</p>
			</div>
		</template>

		<template #footer="{ close }">
			<UButton
				color="neutral"
				variant="outline"
				:label="t('sTranslatableText.close')"
				v-bind="closeButton"
				@click="close"
			/>
		</template>
	</USlideover>
</template>

<script setup lang="ts">
	import type { ButtonProps, SlideoverProps } from "@nuxt/ui";
	import type { TranslatableCheckboxProps, TranslatableInputProps, TranslatableTextAttributes, TranslatableTextLanguage } from "./types";
	import { useLocale } from "@nuxt/ui/composables";
	import { computed, shallowRef } from "vue";

	type Option = Pick<TranslatableTextLanguage, "code" | "name" | "icon" | "role">;

	const {
		options,
		slideover,
		searchInput,
		selectAll,
		checkbox,
		closeButton,
		attributes
	} = defineProps<{
		/** Every language on offer, in catalog order. One with a role is always in and cannot be unchecked. */
		options: Option[]
		slideover?: SlideoverProps
		searchInput?: TranslatableInputProps
		selectAll?: TranslatableCheckboxProps
		checkbox?: TranslatableCheckboxProps
		closeButton?: ButtonProps
		/** The `badge`, `manageInfo` and `manageEmpty` entries of STranslatableText `attributes`. */
		attributes?: TranslatableTextAttributes
	}>();

	const open = defineModel<boolean>("open", { default: false });
	const languages = defineModel<string[]>("languages", { required: true });

	const { t } = useLocale();

	const slideoverProps = computed<SlideoverProps>(() => ({
		title: t("sTranslatableText.manageTitle"),
		...slideover,
		ui: { footer: "justify-end", ...slideover?.ui }
	}));

	const search = shallowRef("");

	const matching = computed(() => {
		const query = search.value.trim().toLowerCase();
		if (!query) return options;
		return options.filter((option) => option.name.toLowerCase().includes(query) || option.code.toLowerCase().includes(query));
	});

	const isChecked = (option: Option) => !!option.role || languages.value.includes(option.code);

	// "Select all" acts on what the search shows
	const selectable = computed(() => matching.value.filter((option) => !option.role));
	const allState = computed<boolean | "indeterminate">(() => {
		const checked = selectable.value.filter(isChecked).length;
		if (!checked) return false;
		return checked === selectable.value.length ? true : "indeterminate";
	});

	// Written in catalog order; a language the product manages outside the catalog is kept as it is
	function write(next: Set<string>) {
		const catalog = options.map((option) => option.code);
		languages.value = [
			...catalog.filter((code) => next.has(code)),
			...languages.value.filter((code) => !catalog.includes(code))
		];
	}

	function toggle(code: string, on: boolean) {
		const next = new Set(languages.value);
		if (on) next.add(code);
		else next.delete(code);
		write(next);
	}

	function toggleAll(value: boolean | "indeterminate") {
		const next = new Set(languages.value);
		for (const option of selectable.value) {
			if (value === true) next.add(option.code);
			else next.delete(option.code);
		}
		write(next);
	}
</script>
