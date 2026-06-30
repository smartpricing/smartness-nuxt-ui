<template>
	<slot />
</template>

<script setup lang="ts">
	import type { PieDataPoint } from "./types";
	import { computed, inject, onUnmounted, useId, watch } from "vue";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE
	} from "./types";

	defineOptions({
		name: "SDatavizFunnel"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series */
		name: string
		/** Data points for the funnel chart - each point can have its own color */
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
			legendLabel: point.legendLabel,
			value: point.value,
			id: point.id ?? `${serieId.value}-${index}`,
			color: point.color, // Per-data-point color (any CSS color string)
			active: point.active,
			legendTooltip: point.legendTooltip,
			showInLegend: point.showInLegend
		}))
	);

	const chartSignature = computed(() => JSON.stringify(
		props.data.map((point, index) => ({
			name: point.name,
			value: point.value,
			id: point.id ?? `${serieId.value}-${index}`,
			color: point.color,
			active: point.active
		}))
	));
	const legendSignature = computed(() => JSON.stringify(
		props.data.map((point, index) => ({
			name: point.name,
			id: point.id ?? `${serieId.value}-${index}`,
			legendLabel: point.legendLabel,
			legendTooltip: point.legendTooltip,
			showInLegend: point.showInLegend
		}))
	));

	// Watch for changes and update chart using serialized comparison
	watch(
		[chartSignature, () => props.name],
		() => {
			if (!upsertSerie)
				return;

			upsertSerie({
				id: serieId.value,
				name: props.name,
				updateScope: "chart",
				data: chartData.value,
				type: "funnel"
			});
		},
		{ immediate: true }
	);

	watch(
		legendSignature,
		() => {
			if (!upsertSerie)
				return;

			upsertSerie({
				id: serieId.value,
				name: props.name,
				updateScope: "legend",
				data: chartData.value,
				type: "funnel"
			});
		}
	);

	// Clean up on unmount
	onUnmounted(() => {
		removeSerie?.(serieId.value);
	});
</script>
