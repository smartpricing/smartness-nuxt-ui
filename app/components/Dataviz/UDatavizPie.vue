<template>
	<div />
</template>

<script setup lang="ts">
	import type { PieDataPoint } from "./types";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "UDatavizPie"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series */
		name: string
		/** Data points for the pie chart - each point can have its own color */
		data: PieDataPoint[]
	}>(), {});

	// Generate unique ID
	const serieId = computed(() => props.id ?? useId());

	// Get injection functions from parent
	const upsertSerie = inject(DATAVIZ_UPSERT_SERIE);
	const removeSerie = inject(DATAVIZ_REMOVE_SERIE);

	// Transform data to internal format with unique IDs
	const chartData = computed(() =>
		props.data.map((point, index) => ({
			name: point.name,
			value: point.value,
			id: point.id ?? `${serieId.value}-${index}`,
			color: point.color, // Per-data-point color (any CSS color string)
			active: point.active
		}))
	);

	// Watch for changes and update chart
	watch(
		[chartData, () => props.name],
		() => {
			if (!upsertSerie)
				return;

			upsertSerie({
				id: serieId.value,
				name: props.name,
				data: chartData.value,
				type: "pie"
			});
		},
		{ immediate: true, deep: true }
	);

	// Clean up on unmount
	onUnmounted(() => {
		removeSerie?.(serieId.value);
	});
</script>
