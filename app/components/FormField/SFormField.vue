<template>
	<UFormField v-bind="$attrs">
		<template v-for="(_, slot) in $slots" :key="slot" #[slot]="slotProps">
			<slot v-if="slot !== 'error'" :name="slot" v-bind="slotProps ?? {}" />
		</template>

		<template #error="{ error }">
			<slot name="error" :error="error">
				{{ typeof error === "string" ? (te(error) ? t(error) : error) : "" }}
			</slot>
		</template>
	</UFormField>
</template>

<script lang="ts" setup>
	defineOptions({ inheritAttrs: false });

	// @ts-expect-error - useI18n is not defined in the layer but resolves at runtime in the consumer
	const { t, te } = useI18n();
</script>
