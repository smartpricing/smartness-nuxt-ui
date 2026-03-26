<template>
	<UFieldGroup>
		<USelectMenu
			v-model="countryCode"
			:items="phoneCodes"
			value-key="code"
			:search-input="{
				placeholder: 'Search country...',
				icon: 'ph:magnifying-glass',
			}"
			:filter-fields="['name', 'code', 'dialCode']"
			:content="{ align: 'start' }"
			:ui="{
				base: 'pe-8 w-auto',
				content: 'w-48',
				placeholder: 'hidden',
				trailingIcon: 'size-4',
			}"
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
			v-model="localPhone"
			v-maska="mask"
			:placeholder="mask.replaceAll('#', '_')"
			:ui="{

			}"
		/>
	</UFieldGroup>
</template>

<script setup lang="ts">
	import { vMaska } from "maska/vue";
	import { computed, ref, watch } from "vue";
	import codes from "./phone-codes.json" with { type: "json" };

	const { locale = "en" } = defineProps<{
		locale?: string
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
	const phoneCodes = computed(() => codes.map((c) => {
		return {
			...c,
			name: displayNames.value.of(c.code)
		};
	}));

	const country = computed(() => phoneCodes.value?.find((c) => c.code === countryCode.value));
	const mask = computed(() => country.value?.mask || "(###) ###-####");

	const localPhone = ref("");
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
