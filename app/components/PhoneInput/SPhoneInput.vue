<template>
	<UFieldGroup>
		<USelectMenu
			v-bind="resolvedSelectMenuProps"
			v-model="countryCode"
			:items="phoneCodes"
			value-key="code"
			:clear="false"
			:filter-fields="['name', 'code', 'dialCode']"
		>
			<span class="size-5 flex items-center text-lg">
				{{ country?.emoji || '\u{1F1FA}\u{1F1F8}' }}
			</span> &nbsp;
			<span class="text-sm text-muted">
				{{ country?.dialCode || '' }}
			</span>

			<template #item-leading="{ item }">
				<span class="size-5 flex items-center text-lg">
					{{ item.emoji }}
				</span>
			</template>

			<template #item-label="{ item }">
				{{ item.name }} ({{ item.dialCode }})
			</template>
		</USelectMenu>

		<UInput
			v-bind="resolvedInputProps"
			v-model="localPhone"
			v-maska="mask"
		/>
	</UFieldGroup>
</template>

<script setup lang="ts">
	import type { InputProps, SelectMenuProps } from "@nuxt/ui";
	import { vMaska } from "maska/vue";
	import { computed, ref, watch } from "vue";
	import codes from "./phone-codes.json" with { type: "json" };

	interface PhoneCodeItem {
		name: string | undefined
		code: string
		emoji: string
		dialCode: string
		mask: string
	}

	const { locale = "en", selectMenuProps, inputProps } = defineProps<{
		locale?: string
		selectMenuProps?: SelectMenuProps<PhoneCodeItem[]>
		inputProps?: InputProps
	}>();

	const NON_DIGIT_RE = /\D/g;

	const modelValue = defineModel<string>({ default: "" });
	const countryCode = defineModel<string>("countryCode");

	// Dial codes sorted by digit-length descending for longest-match-first
	const sortedDialCodes = codes
		.map((c) => ({
			code: c.code,
			dialCode: c.dialCode,
			digits: c.dialCode.replace(NON_DIGIT_RE, "")
		}))
		.sort((a, b) => b.digits.length - a.digits.length);

	const displayNames = computed(() => new Intl.DisplayNames([locale], { type: "region" }));
	const phoneCodes = computed<PhoneCodeItem[]>(() => codes.map((c) => {
		return {
			...c,
			name: displayNames.value.of(c.code)
		};
	}));

	const country = computed(() => phoneCodes.value?.find((c) => c.code === countryCode.value));
	const mask = computed(() => country.value?.mask || "(###) ###-####");

	const resolvedSelectMenuProps = computed<Omit<SelectMenuProps<PhoneCodeItem[]>, "modelValue" | "items" | "defaultValue">>(() => {
		const { ui, searchInput, content, clear, ...rest } = selectMenuProps ?? {} as SelectMenuProps<PhoneCodeItem[]>;
		return {
			searchInput: {
				icon: "ph:magnifying-glass",
				...(typeof searchInput === "object" ? searchInput : { searchInput })
			},
			content: { align: "start", ...content },
			ui: {
				base: "pe-8 w-auto",
				content: "w-48",
				placeholder: "hidden",
				trailingIcon: "size-4",
				...ui
			},
			...rest,
			filterFields: ["name", "code", "dialCode"]
		};
	});

	const resolvedInputProps = computed<Omit<InputProps, "modelValue" | "defaultValue">>(() => {
		const { ui, ...rest } = inputProps ?? {} as InputProps;
		return {
			placeholder: mask.value.replaceAll("#", "_"),
			ui: { ...ui },
			...rest
		};
	});

	const localPhone = ref<string>("");
	let internalUpdate = false;

	// Parse incoming modelValue → set countryCode + localPhone
	watch(modelValue, (val) => {
		if (internalUpdate) return;
		if (!val) {
			internalUpdate = true;
			localPhone.value = "";
			internalUpdate = false;
			return;
		}

		const digits = val.replace(NON_DIGIT_RE, "");
		if (val.startsWith("+")) {
			const match = sortedDialCodes.find((c) => digits.startsWith(c.digits));
			if (match) {
				internalUpdate = true;
				countryCode.value = match.code;
				localPhone.value = digits.slice(match.digits.length);
				internalUpdate = false;
				return;
			}
		}
		// No prefix or no match → local number only
		internalUpdate = true;
		localPhone.value = digits;
		internalUpdate = false;
	}, { immediate: true });

	// Emit modelValue when localPhone or countryCode change
	watch([localPhone, countryCode], () => {
		if (internalUpdate) return;
		const raw = localPhone.value.replace(NON_DIGIT_RE, "");
		if (!raw) {
			modelValue.value = "";
			return;
		}
		const dialCode = country.value?.dialCode || "";
		modelValue.value = dialCode ? `${dialCode}${raw}` : raw;
	});
</script>
