<template>
	<slot />
</template>

<script setup lang="ts">
	import type { DatavizSerieOption, PieDataPoint } from "./types";
	import { computed, useId } from "vue";
	import { stableDatavizSignature } from "../../utils/datavizSignatures";
	import { useDatavizSerieRegistration } from "./useDatavizSerieRegistration";

	defineOptions({
		name: "SDatavizPie"
	});

	const props = withDefaults(defineProps<{
		/** Unique identifier for the series */
		id?: string
		/** Display name for the series */
		name: string
		/** Data points for the pie chart - each point can have its own color */
		data: PieDataPoint[]
	}>(), {});

	const generatedSerieId = useId();
	const serieId = computed(() => props.id ?? generatedSerieId);

	const descriptor = computed(() => {
		const data: { name: string, value: number, color?: string, id: string, active?: boolean, legendLabel?: string, legendTooltip?: string, showInLegend?: boolean }[] = [];
		const chartSignatureData: unknown[] = [];
		const legendSignatureData: unknown[] = [];

		props.data.forEach((point, index) => {
			const id = point.id ?? `${serieId.value}-${index}`;
			data.push({
				name: point.name,
				legendLabel: point.legendLabel,
				value: point.value,
				id,
				color: point.color,
				active: point.active,
				legendTooltip: point.legendTooltip,
				showInLegend: point.showInLegend
			});
			chartSignatureData.push({
				name: point.name,
				value: point.value,
				id,
				color: point.color,
				active: point.active
			});
			legendSignatureData.push({
				name: point.name,
				id,
				legendLabel: point.legendLabel,
				legendTooltip: point.legendTooltip,
				showInLegend: point.showInLegend
			});
		});

		return {
			serie: {
				id: serieId.value,
				name: props.name,
				data,
				type: "pie"
			} satisfies DatavizSerieOption,
			chartSignature: stableDatavizSignature({
				name: props.name,
				data: chartSignatureData
			}),
			legendSignature: stableDatavizSignature(legendSignatureData)
		};
	});

	const serie = computed(() => descriptor.value.serie);
	const chartSignature = computed(() => descriptor.value.chartSignature);
	const legendSignature = computed(() => descriptor.value.legendSignature);

	useDatavizSerieRegistration({
		id: serieId,
		serie,
		chartSignature,
		legendSignature
	});
</script>
