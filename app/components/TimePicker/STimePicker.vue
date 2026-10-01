<template>
	<UInputTime
		v-model="internalTime"
		:locale="dateLocale"
		:hour-cycle="props.hourCycle ?? getHourCycle(dateLocale)"
		:granularity="props.granularity"
		:leading-icon="props.icon || undefined"
		:disabled="props.disabled"
		:readonly="props.readonly"
		:size="props.size"
		:color="props.color"
		:variant="props.variant"
		:highlight="props.highlight"
		:placeholder="props.placeholder"
		:ui="inputUi"
		data-testid="time-picker-input"
		@focusout="handleFocusOut"
	/>
</template>

<script lang="ts" setup>
	import type { Time } from "@internationalized/date";
	import type { STimePickerProps } from "./types";
	import { computed, ref } from "vue";
	import { useDateLocale } from "../../composables/useDateLocale";
	import { getHourCycle, stringToTime, timeToString } from "../../utils/date";
	import { mergeSlot } from "../../utils/mergeSlot";

	const props = withDefaults(defineProps<STimePickerProps>(), {
		icon: "ph:clock"
	});

	/** "HH:mm[:ss]", `undefined` when empty. */
	const model = defineModel<string | undefined>("time");

	const dateLocale = useDateLocale(() => props.locale);

	const inputUi = computed(() => ({ ...props.ui, base: mergeSlot("w-full", props.ui?.base) }));

	// null = no pending edit, "" = cleared while editing (lazy mode buffer)
	const pendingTime = ref<string | null>(null);

	const internalTime = computed<Time | undefined>({
		get: () => stringToTime(props.lazy && pendingTime.value !== null ? pendingTime.value : model.value),
		set: (value) => {
			if (props.lazy) {
				pendingTime.value = timeToString(value) ?? "";
				return;
			}
			model.value = timeToString(value);
		}
	});

	const handleFocusOut = (event: FocusEvent) => {
		if (!props.lazy || pendingTime.value === null) return;
		const root = event.currentTarget as HTMLElement;
		if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
		model.value = pendingTime.value || undefined;
		pendingTime.value = null;
	};
</script>
