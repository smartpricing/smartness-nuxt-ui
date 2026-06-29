<template>
	<UFormField v-bind="$attrs">
		<template v-for="(_, slot) in $slots" :key="slot" #[slot]="slotProps">
			<slot v-if="slot !== 'error'" :name="slot" v-bind="slotProps ?? {}" />
		</template>

		<template v-if="hasError" #error="{ error }">
			<slot name="error" :error="error">
				{{ typeof error === "string" ? (te(error) ? t(error) : error) : "" }}
			</slot>
		</template>
	</UFormField>
</template>

<script lang="ts" setup>
	import { formErrorsInjectionKey } from "@nuxt/ui/composables";
	import { computed, inject, useAttrs } from "vue";

	defineOptions({ inheritAttrs: false });

	const attrs = useAttrs();

	// @ts-expect-error - useI18n is not defined in the layer but resolves at runtime in the consumer
	const { t, te } = useI18n();

	const formErrors = inject(formErrorsInjectionKey, null);

	// Prevent the #error slot to override help slot when there is no error
	const hasError = computed(() => {
		if (attrs.error === false) return false;
		if (attrs.error) return true;

		const name = attrs.name as string | undefined;
		const errorPattern = attrs.errorPattern as RegExp | undefined;

		return !!formErrors?.value?.find((error) => error.name === name || (errorPattern && error.name?.match(errorPattern)))?.message;
	});
</script>
