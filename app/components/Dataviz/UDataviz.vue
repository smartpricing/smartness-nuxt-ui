<template>
	<div
		ref="chartContainerRef"
		class="flex h-full w-full min-w-0 flex-col gap-2"
		v-bind="attrs"
	>
		<!-- Header -->
		<template v-if="slots.header || props.title">
			<slot name="header">
				<div class="header flex items-center justify-between">
					<slot name="header-title">
						<span class="text-sm font-medium">{{ props.title }}</span>
					</slot>

					<slot name="header-actions">
						<div class="flex gap-2">
							<UButton
								v-for="action in props.actions"
								:key="action.label"
								:icon="action.icon"
								variant="ghost"
								size="sm"
								@click="action.onClick"
							>
								{{ action.label }}
							</UButton>
						</div>
					</slot>
				</div>
			</slot>
		</template>

		<!-- Loading State -->
		<div
			v-if="props.loading"
			class="flex w-full items-center justify-center py-8"
		>
			<UProgress
				class="w-20"
				size="sm"
			/>
		</div>

		<!-- Chart and Legend Container -->
		<div class="flex min-h-0 flex-1 flex-col">
			<!-- Chart -->
			<div
				ref="chartRef"
				class="min-h-[200px] min-w-0 flex-1"
			/>

			<!-- Series Slot (renders child serie components) -->
			<slot v-if="chartLoaded" />

			<!-- Legend -->
			<div
				v-if="props.options?.legend?.show"
				ref="legendContainerRef"
				class="mt-2 flex w-full shrink-0 flex-wrap items-center gap-1"
			>
				<button
					v-for="serie in legendToShow"
					:key="serie.id"
					type="button"
					class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-opacity hover:opacity-80"
					:class="[serie.active ? 'opacity-100' : 'opacity-50']"
					@click="toggleLegend(serie.id)"
				>
					<span
						class="size-2 rounded-full"
						:style="{ backgroundColor: serie.color }"
					/>
					<span>{{ serie.name }}</span>
				</button>

				<UButton
					v-if="showMoreLegendButton"
					variant="ghost"
					size="xs"
					@click="showMoreLegend = !showMoreLegend"
				>
					{{ showMoreLegend ? t.showLess : t.showMore }}
				</UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {
		DatavizAction,
		DatavizInitOptions,
		DatavizLocale,
		DatavizOptions,
		DatavizSerieOption,
		DatavizSerieState,
		TooltipSlotData
	} from "./types";
	import { useResizeObserver } from "@vueuse/core";
	import * as echarts from "echarts";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_UPSERT_SERIE,
		datavizTranslations,
		DEFAULT_COLOR_PALETTE
	} from "./types";

	defineOptions({
		name: "UDataviz",
		inheritAttrs: false
	});

	const props = withDefaults(defineProps<{
		/** Chart title displayed in the header */
		title?: string
		/** Show loading state */
		loading?: boolean
		/** ECharts initialization options */
		initOptions?: DatavizInitOptions
		/** Chart configuration options */
		options?: DatavizOptions
		/** Header action buttons */
		actions?: DatavizAction[]
		/** Locale for internal labels */
		locale?: DatavizLocale
		/** Custom color palette (array of CSS color strings) */
		colors?: string[]
	}>(), {
		loading: false,
		locale: "en"
	});

	// Typed slots
	defineSlots<{
		/** Default slot for series components */
		default: () => unknown
		/** Custom header slot */
		header: () => unknown
		/** Custom header title slot */
		"header-title": () => unknown
		/** Custom header actions slot */
		"header-actions": () => unknown
		/** Custom tooltip slot with typed data */
		tooltip: (props: { data: TooltipSlotData }) => unknown
	}>();

	const slots = useSlots();
	const attrs = useAttrs();

	// Template refs
	const chartRef = ref<HTMLDivElement>();
	const chartContainerRef = ref<HTMLDivElement>();
	const legendContainerRef = ref<HTMLDivElement>();

	// ECharts instance
	const echartsInstance = shallowRef<echarts.ECharts>();
	const chartLoaded = shallowRef(false);

	// Series state management
	const series = ref<DatavizSerieState[]>([]);

	// Legend visibility
	const showMoreLegend = ref(false);
	const showLegendTo = ref(0);

	// Color palette (defaults to hex palette)
	const colorPalette = computed(() => props.colors ?? DEFAULT_COLOR_PALETTE);

	// Translations
	const t = computed(() => datavizTranslations[props.locale]);

	// Computed ECharts options
	const computedOptions = computed<echarts.EChartsCoreOption>(() => ({
		dataZoom: Array.isArray(props.options?.dataZoom)
			? props.options.dataZoom.map((zoom) => {
				if (zoom.type !== "slider")
					return zoom;
				return {
					handleStyle: {
						color: "#fff",
						borderColor: "#617482"
					},
					handleSize: 30,
					moveHandleSize: 5,
					moveHandleStyle: {
						color: "#84939E",
						opacity: 1
					},
					...zoom
				};
			})
			: props.options?.dataZoom,
		grid: {
			top: "20",
			...props.options?.grid
		},
		color: colorPalette.value,
		xAxis: props.options?.xAxis,
		yAxis: props.options?.yAxis,
		legend: {
			show: false
		},
		tooltip: {
			...props.options?.tooltip,
			padding: 0,
			renderMode: "html",
			appendTo: "body"
		}
	}));

	// Initialize ECharts
	function initChart() {
		if (!chartRef.value)
			return;

		echartsInstance.value = echarts.init(chartRef.value, undefined, {
			devicePixelRatio: props.initOptions?.devicePixelRatio,
			renderer: props.initOptions?.renderer,
			useDirtyRect: props.initOptions?.useDirtyRect,
			ssr: props.initOptions?.ssr,
			locale: typeof props.initOptions?.locale === "string"
				? props.initOptions.locale.toUpperCase()
				: props.initOptions?.locale
		});

		chartLoaded.value = true;

		// Set default options
		echartsInstance.value.setOption(
			{ ...computedOptions.value },
			{ replaceMerge: ["xAxis", "yAxis", "dataZoom", "grid", "tooltip"] }
		);
	}

	// Dispose ECharts
	function disposeChart() {
		if (!echartsInstance.value)
			return;
		echartsInstance.value.dispose();
	}

	// Upsert series into the chart
	function upsertSerie(serie: DatavizSerieOption) {
		if (!echartsInstance.value)
			return;

		const index = series.value.findIndex((s) => s.id === String(serie.id));

		if (index !== -1) {
			// Update existing series
			updateExistingSerie(serie, index);
			return;
		}

		// Add new series
		addNewSerie(serie);
		calculateLegendDimensions();
	}

	function updateExistingSerie(serie: DatavizSerieOption, index: number) {
		if (!echartsInstance.value)
			return;

		const existingSerie = series.value[index];
		const existingColor = existingSerie?.color;

		// Update internal state
		if (existingSerie) {
			existingSerie.name = serie.name;
			existingSerie.active = serie.active !== false;
		}

		if (serie.type === "line" || serie.type === "bar" || serie.type === "custom" || serie.type === "scatter") {
			echartsInstance.value.setOption({
				series: [{
					id: String(serie.id),
					name: serie.name,
					type: serie.type,
					data: serie.data,
					showSymbol: serie.type === "line" && "showSymbol" in serie ? serie.showSymbol : undefined,
					renderItem: serie.type === "custom" ? serie.renderItem : undefined,
					clip: serie.type === "custom" ? serie.clip : undefined,
					itemStyle: {
						...(serie.type !== "custom" && "itemStyle" in serie ? serie.itemStyle : {}),
						color: existingColor
					},
					lineStyle: {
						...(serie.type === "line" && "lineStyle" in serie ? serie.lineStyle : {}),
						color: existingColor
					},
					smooth: serie.type === "line" ? serie.smooth : undefined,
					symbolSize: serie.type === "scatter" ? serie.symbolSize : undefined,
					markArea: serie.type !== "custom" && "markArea" in serie ? serie.markArea : undefined,
					yAxisIndex: "yAxisIndex" in serie ? serie.yAxisIndex : undefined,
					xAxisIndex: "xAxisIndex" in serie ? serie.xAxisIndex : undefined,
					...("step" in serie && serie.step ? { step: serie.step } : {})
				}]
			});
		}
	}

	function addNewSerie(serie: DatavizSerieOption) {
		if (!echartsInstance.value)
			return;

		if (serie.type === "line" || serie.type === "bar" || serie.type === "custom" || serie.type === "scatter") {
			series.value.push({
				type: serie.type,
				id: String(serie.id),
				name: serie.name,
				active: serie.active !== false,
				...(serie.color ? { color: serie.color } : {})
			});

			echartsInstance.value.setOption({
				series: [{
					id: String(serie.id),
					name: serie.name,
					type: serie.type,
					data: serie.data,
					showSymbol: serie.type === "line" && "showSymbol" in serie ? serie.showSymbol : undefined,
					renderItem: serie.type === "custom" ? serie.renderItem : undefined,
					clip: serie.type === "custom" ? serie.clip : undefined,
					itemStyle: {
						...(serie.type !== "custom" && "itemStyle" in serie ? serie.itemStyle : {}),
						...(serie.color ? { color: serie.color } : {})
					},
					lineStyle: {
						...(serie.type === "line" && "lineStyle" in serie ? serie.lineStyle : {}),
						...(serie.color ? { color: serie.color } : {})
					},
					smooth: serie.type === "line" ? serie.smooth : undefined,
					symbolSize: serie.type === "scatter" ? serie.symbolSize : undefined,
					markArea: serie.type !== "custom" && "markArea" in serie ? serie.markArea : undefined,
					yAxisIndex: "yAxisIndex" in serie ? serie.yAxisIndex : undefined,
					xAxisIndex: "xAxisIndex" in serie ? serie.xAxisIndex : undefined,
					...("step" in serie && serie.step ? { step: serie.step } : {})
				}]
			});

			echartsInstance.value.dispatchAction({
				type: serie.active !== false ? "legendSelect" : "legendUnSelect",
				name: serie.name
			});
		} else if (serie.type === "pie" || serie.type === "funnel") {
			const serieData = serie.data.map((data) => {
				series.value.push({
					type: serie.type,
					id: data.id,
					name: data.name,
					active: data.active !== false,
					...(data.color ? { color: data.color } : {}),
					parentId: String(serie.id)
				});

				return {
					name: data.name,
					value: data.value,
					itemStyle: { ...(data.color ? { color: data.color } : {}) }
				};
			});

			echartsInstance.value.setOption({
				series: [{
					id: String(serie.id),
					name: serie.name,
					type: serie.type,
					data: serieData,
					selectedMode: "multiple",
					selectedMap: serie.data.reduce((acc, data) => {
						acc[data.name] = data.active !== false;
						return acc;
					}, {} as Record<string, boolean>)
				}]
			});
		}
	}

	// Remove series from the chart
	function removeSerie(serieId: string) {
		if (!echartsInstance.value)
			return;

		series.value = series.value.filter((serie) => {
			if (["line", "bar", "custom", "scatter"].includes(serie.type)) {
				return serie.id !== serieId;
			}
			return serie.parentId !== serieId;
		});

		const currentOption = echartsInstance.value.getOption() as { series?: { id?: string }[] };
		const otherSeries = currentOption?.series?.filter((s) => s?.id !== serieId) ?? [];
		echartsInstance.value.setOption({ series: otherSeries }, { replaceMerge: ["series"] });

		calculateLegendDimensions();
	}

	// Toggle legend visibility for a series
	function toggleLegend(serieId?: string) {
		if (!echartsInstance.value || !serieId)
			return;

		const serieIndex = series.value.findIndex((s) => s.id === serieId);
		if (serieIndex === -1)
			return;

		const targetSerie = series.value[serieIndex];
		if (targetSerie) {
			targetSerie.active = !targetSerie.active;

			echartsInstance.value.dispatchAction({
				type: "legendToggleSelect",
				name: targetSerie.name
			});
		}
	}

	// Calculate legend dimensions for responsive display
	function calculateLegendDimensions() {
		nextTick(() => {
			const padding = 150;
			let containerWidth = (legendContainerRef.value?.clientWidth ?? 0) * 2 - padding;
			containerWidth = containerWidth - (series.value.length - 1) * 4;

			let showLegendToInternal = 0;
			for (let i = 0; i < series.value.length; i++) {
				containerWidth = containerWidth - (series.value[i]?.name?.length ?? 0) * 5.9;
				containerWidth = containerWidth - 43;
				if (containerWidth < 0)
					break;
				showLegendToInternal = i + 1;
			}

			showLegendTo.value = showLegendToInternal;
		});
	}

	// Computed legend display
	const showMoreLegendButton = computed(() => series.value.length - 1 > showLegendTo.value);
	const legendToShow = computed(() =>
		!showMoreLegend.value && showMoreLegendButton.value
			? series.value.slice(0, showLegendTo.value)
			: series.value
	);

	// Watch options changes
	watch(
		() => computedOptions.value,
		() => {
			if (!echartsInstance.value)
				return;
			echartsInstance.value.setOption(
				{ ...computedOptions.value },
				{ replaceMerge: ["xAxis", "yAxis", "dataZoom", "grid", "tooltip"] }
			);
		},
		{ deep: true }
	);

	// Resize observer
	let stopResize: (() => void) | undefined;

	onMounted(() => {
		initChart();
		calculateLegendDimensions();

		const { stop } = useResizeObserver(chartContainerRef, () => {
			echartsInstance.value?.resize();
		});
		stopResize = stop;
	});

	onBeforeUnmount(() => {
		stopResize?.();
		disposeChart();
	});

	// Provide injection functions to child components
	provide(DATAVIZ_UPSERT_SERIE, upsertSerie);
	provide(DATAVIZ_REMOVE_SERIE, removeSerie);

	// Expose for external access
	defineExpose({
		echartsInstance,
		chartLoaded
	});
</script>
