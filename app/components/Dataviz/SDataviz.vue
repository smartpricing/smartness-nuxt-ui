<template>
	<div
		class="flex h-full w-full min-w-0 flex-col gap-2 bg-inherit"
		v-bind="attrs"
	>
		<!-- Header -->
		<template v-if="showHeader">
			<slot name="header">
				<div class="header flex items-center justify-between">
					<div class="flex items-center gap-2 min-w-0">
						<slot name="header-title">
							<span
								v-if="props.title"
								class="text-sm font-medium"
							>{{ props.title }}</span>
						</slot>

						<!-- Non-blocking Loading Overlay -->
						<template v-if="props.loadingOverlay">
							<slot name="loading-overlay">
								<UIcon
									name="ph:arrows-clockwise"
									class="animate-spin text-[var(--ui-color-secondary-500)] size-4 shrink-0"
								/>
							</slot>
						</template>
					</div>

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

		<!-- Chart and Legend Container -->
		<div
			ref="chartContainerRef"
			class="flex min-h-0 grow shrink-0 flex-col bg-inherit relative"
		>
			<!-- visibility:hidden keeps flex size; v-show would give the host a 0×0 box -->
			<div
				ref="chartRef"
				class="relative min-h-0 min-w-0 grow shrink-0"
				:class="!showChart ? 'invisible pointer-events-none' : ''"
				@wheel="onChartWheel"
				@pointerdown="onChartPointerDown"
			>
				<!--
					The host is sized from the measured box and taken out of flow: it
					sets `position: relative` inline, and in flow its own size would feed
					straight back into that measurement.
					The sizes are repeated here as CSS lengths because the adapter writes
					its `width`/`height` props into inline styles as bare numbers, which
					the browser discards.
				-->
				<Chart
					v-if="definition && chartWidth > 0 && chartHeight > 0"
					:style="{ position: 'absolute', top: 0, left: 0, width: `${chartWidth}px`, height: `${chartHeight}px` }"
					:definition="definition"
					:aria-label="props.title ?? 'chart'"
					:width="chartWidth"
					:height="chartHeight"
					@select="onSelect"
					@focus-change="onFocusChange"
					@focus-group-change="onFocusGroupChange"
				>
					<template #tooltipBody="{ points }">
						<slot
							name="tooltip"
							:data="toTooltipData(points)"
						>
							<SDatavizTooltip
								:data="toTooltipData(points)"
								v-bind="props.tooltipOptions"
							/>
						</slot>
					</template>
				</Chart>
			</div>

			<!-- Loading State -->
			<div
				v-if="showLoading"
				class="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 h-full w-full bg-inherit"
			>
				<div
					:style="{
						width: '200px',
					}"
				>
					<p class="text-sm font-medium text-center">
						{{ t.loading }}
					</p>
					<UProgress
						size="md"
						color="secondary"
						:model-value="null"
					/>
				</div>
			</div>

			<!-- Error State -->
			<div
				v-if="showError"
				class="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 h-full w-full bg-inherit"
			>
				<UEmpty
					icon="ph:warning-circle"
					:title="props.errorTitle ?? t.errorTitle"
					:description="props.errorDescription ?? t.errorDescription"
					variant="naked"
					size="sm"
					:actions="[{ label: t.retry, icon: 'ph:arrows-clockwise', color: 'neutral', variant: 'subtle', onClick: () => emit('retry') }]"
				/>
			</div>

			<!-- No Data State -->
			<div
				v-if="showNoData"
				class="absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 h-full w-full bg-inherit"
			>
				<UEmpty
					icon="ph:magnifying-glass-minus"
					:title="props.noDataTitle ?? t.noDataTitle"
					:description="props.noDataDescription ?? t.noDataDescription"
					variant="naked"
					size="sm"
				/>
			</div>

			<!-- Series Slot (renders child serie components) -->
			<slot />

			<!-- Legend -->
			<div
				v-if="showLegendStrip"
				ref="legendContainerRef"
				class="mt-2 flex w-full shrink-0 flex-wrap items-center gap-1"
			>
				<template
					v-for="serie in legendToShow"
					:key="serie.id"
				>
					<UTooltip
						v-if="serie.legendTooltip"
						:text="serie.legendTooltip"
						:content="{ side: 'top' }"
					>
						<UButton
							data-dataviz-legend-chip
							size="xs"
							variant="outline"
							color="primary"
							:class="legendChipButtonClass(serie)"
							:disabled="!legendChipInteractive(serie)"
							@click="toggleLegend(serie.id)"
						>
							<!-- Bar series: small filled rectangle -->
							<span
								v-if="serie.type === 'bar'"
								class="inline-block shrink-0 rounded-sm"
								:style="{
									width: '10px',
									height: '6px',
									background: legendSwatchBackground(serie),
								}"
							/>
							<!-- Line series: solid, dashed, or dotted horizontal line -->
							<span
								v-else-if="serie.type === 'line'"
								class="inline-block shrink-0"
								:style="{
									width: '16px',
									height: '2px',
									backgroundColor: (serie.lineStyleType === 'dashed' || serie.lineStyleType === 'dotted') ? 'transparent' : legendSwatchLineColor(serie),
									borderTop: serie.lineStyleType === 'dashed'
										? `2px dashed ${legendSwatchLineColor(serie)}`
										: serie.lineStyleType === 'dotted'
											? `2px dotted ${legendSwatchLineColor(serie)}`
											: 'none',
								}"
							/>
							<!-- Default (pie, funnel, scatter, area): filled dot -->
							<span
								v-else
								class="size-2 rounded-full shrink-0"
								:style="{
									background: legendSwatchBackground(serie),
								}"
							/>
							<span class="block min-w-0 max-w-80 truncate">{{ serie.legendLabel ?? serie.name }}</span>
						</UButton>
					</UTooltip>
					<UButton
						v-else
						data-dataviz-legend-chip
						size="xs"
						variant="outline"
						color="primary"
						:class="legendChipButtonClass(serie)"
						:disabled="!legendChipInteractive(serie)"
						@click="toggleLegend(serie.id)"
					>
						<!-- Bar series: small filled rectangle -->
						<span
							v-if="serie.type === 'bar'"
							class="inline-block shrink-0 rounded-sm"
							:style="{
								width: '10px',
								height: '6px',
								background: legendSwatchBackground(serie),
							}"
						/>
						<!-- Line series: solid, dashed, or dotted horizontal line -->
						<span
							v-else-if="serie.type === 'line'"
							class="inline-block shrink-0"
							:style="{
								width: '16px',
								height: '2px',
								backgroundColor: (serie.lineStyleType === 'dashed' || serie.lineStyleType === 'dotted') ? 'transparent' : legendSwatchLineColor(serie),
								borderTop: serie.lineStyleType === 'dashed'
									? `2px dashed ${legendSwatchLineColor(serie)}`
									: serie.lineStyleType === 'dotted'
										? `2px dotted ${legendSwatchLineColor(serie)}`
										: 'none',
							}"
						/>
						<!-- Default (pie, funnel, scatter, area): filled dot -->
						<span
							v-else
							class="size-2 rounded-full shrink-0"
							:style="{
								background: legendSwatchBackground(serie),
							}"
						/>
						<span class="block min-w-0 max-w-80 truncate">{{ serie.legendLabel ?? serie.name }}</span>
					</UButton>
				</template>

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
	import type { ChartPoint } from "@tanstack/charts/vue";
	import type {
		DatavizAction,
		DatavizAnimationOptions,
		DatavizColor,
		DatavizEventParams,
		DatavizInitOptions,
		DatavizLocale,
		DatavizOptions,
		DatavizSerieOption,
		DatavizSerieRegistration,
		DatavizSerieRegistryContext,
		DatavizSerieState,
		TooltipDataItem,
		TooltipSlotData
	} from "./types";
	import { Chart } from "@tanstack/charts/vue";
	import { useElementSize } from "@vueuse/core";
	import { computed, nextTick, onBeforeUnmount, provide, ref, shallowRef, useAttrs, useSlots, watch } from "vue";
	import { datavizColorToCss, datavizSolidColor } from "../../utils/datavizColor";
	import { buildChartDefinition } from "./buildChartDefinition";
	import SDatavizTooltip from "./SDatavizTooltip.vue";
	import {
		DATAVIZ_REMOVE_SERIE,
		DATAVIZ_SERIE_REGISTRY,
		DATAVIZ_UPSERT_SERIE,
		datavizTranslations,
		DEFAULT_COLOR_PALETTE
	} from "./types";

	interface RegisteredDatavizSerie {
		key: number
		registration: DatavizSerieRegistration
	}

	defineOptions({
		name: "SDataviz",
		inheritAttrs: false
	});

	const props = withDefaults(defineProps<{
		/** Chart title displayed in the header */
		title?: string
		/** Show loading state */
		loading?: boolean
		/** Show error state with retry button */
		error?: boolean
		/** Custom title for error state (overrides locale default) */
		errorTitle?: string
		/** Custom description for error state (overrides locale default) */
		errorDescription?: string
		/** Custom title for no data state (overrides locale default) */
		noDataTitle?: string
		/** Custom description for no data state (overrides locale default) */
		noDataDescription?: string
		/** Chart initialization options */
		initOptions?: DatavizInitOptions
		/** Chart configuration options */
		options?: DatavizOptions
		/** Action buttons displayed in the header */
		actions?: DatavizAction[]
		/** Locale for translations */
		locale?: DatavizLocale
		/** Custom color palette */
		colors?: string[]
		/** Animation configuration */
		animation?: DatavizAnimationOptions
		/** Chart theme */
		theme?: string | object
		/** Tooltip formatting options */
		tooltipOptions?: {
			xFormatter?: (value: string | number, item: TooltipDataItem) => string
			yFormatter?: (value: number | string, item: TooltipDataItem) => string
			showPercentage?: boolean
			showNullValues?: boolean
		}
		/** Show a non-blocking loading indicator in the header */
		loadingOverlay?: boolean
	}>(), {
		loading: false,
		error: false,
		locale: "en",
		loadingOverlay: false
	});

	const emit = defineEmits<{
		click: [params: DatavizEventParams]
		dblclick: [params: DatavizEventParams]
		mouseover: [params: DatavizEventParams]
		mouseout: [params: DatavizEventParams]
		retry: []
	}>();

	defineSlots<{
		default: () => unknown
		header: () => unknown
		"header-title": () => unknown
		"header-actions": () => unknown
		tooltip: (props: { data: TooltipSlotData }) => unknown
		"loading-overlay": () => unknown
	}>();

	const slots = useSlots();
	const attrs = useAttrs();

	// Template refs
	const chartRef = ref<HTMLDivElement>();
	const chartContainerRef = ref<HTMLDivElement>();
	const legendContainerRef = ref<HTMLDivElement>();

	// The host needs explicit pixel dimensions, so the container is measured here
	// rather than left to the host's own observer.
	const { width: measuredWidth, height: measuredHeight } = useElementSize(chartRef);
	const chartWidth = computed(() => Math.floor(measuredWidth.value));
	const chartHeight = computed(() => Math.floor(measuredHeight.value));

	// ============================================
	// Serie registry
	// ============================================

	let serieRegistrationKey = 0;
	const serieRegistrations = shallowRef<RegisteredDatavizSerie[]>([]);
	/** Series pushed through the legacy upsert/remove injection keys. */
	const externalSeries = ref<DatavizSerieOption[]>([]);

	function registerSerie(registration: DatavizSerieRegistration) {
		const registeredSerie: RegisteredDatavizSerie = { key: serieRegistrationKey++, registration };
		serieRegistrations.value = [...serieRegistrations.value, registeredSerie];
		return () => {
			serieRegistrations.value = serieRegistrations.value.filter((serie) => serie.key !== registeredSerie.key);
		};
	}

	const serieRegistryContext: DatavizSerieRegistryContext = { registerSerie };

	function upsertSerie(serie: DatavizSerieOption) {
		const index = externalSeries.value.findIndex((existing) => existing.id === serie.id);
		if (index === -1) externalSeries.value = [...externalSeries.value, serie];
		else externalSeries.value = externalSeries.value.map((existing, at) => (at === index ? serie : existing));
	}

	function removeSerie(serieId: string) {
		externalSeries.value = externalSeries.value.filter((serie) => serie.id !== serieId);
	}

	/**
	 * Series are re-read only when a registration's signature changes.
	 *
	 * The default slot is invoked from this component's own render, so a child
	 * given an inline literal (`:line-style="{ … }"`, `:data="build()"`) hands
	 * back a fresh object on every pass. Reading `serie` straight into a computed
	 * would make each render invalidate itself; the signature strings are stable
	 * under that churn and break the cycle.
	 */
	const registrySignature = computed(() =>
		serieRegistrations.value
			.map((registered, index) => [
				registered.key,
				index,
				registered.registration.id.value,
				registered.registration.chartSignature.value,
				registered.registration.legendSignature.value
			].join(":"))
			.join("\n")
	);

	const registeredSeries = shallowRef<DatavizSerieOption[]>([]);

	watch([registrySignature, externalSeries], () => {
		registeredSeries.value = [
			...serieRegistrations.value.map((registered) => ({
				...registered.registration.serie.value,
				id: registered.registration.id.value
			} as DatavizSerieOption)),
			...externalSeries.value
		];
	}, { flush: "post", immediate: true });

	// ============================================
	// Colors
	// ============================================

	const colorPalette = computed(() => props.colors ?? DEFAULT_COLOR_PALETTE);

	// Cache color assignments by series ID so colors survive a child remount.
	const colorAssignmentCache = new Map<string, DatavizColor>();

	function getColorForSeries(serieId: string, explicitColor?: DatavizColor): DatavizColor {
		if (explicitColor) {
			colorAssignmentCache.set(serieId, explicitColor);
			return explicitColor;
		}
		const cachedColor = colorAssignmentCache.get(serieId);
		if (cachedColor) return cachedColor;
		const colorIndex = colorAssignmentCache.size;
		const newColor = colorPalette.value[colorIndex % colorPalette.value.length] ?? "#6366f1";
		colorAssignmentCache.set(serieId, newColor);
		return newColor;
	}

	// ============================================
	// Legend state
	// ============================================

	/** Legend toggles, keyed by serie or slice id. Overrides the serie's own `active`. */
	const legendOverride = ref<Record<string, boolean>>({});

	function isActive(id: string, declared: boolean | undefined): boolean {
		return legendOverride.value[id] ?? declared !== false;
	}

	const series = computed<DatavizSerieState[]>(() => {
		const states: DatavizSerieState[] = [];
		for (const serie of registeredSeries.value) {
			if (serie.type === "pie" || serie.type === "funnel") {
				for (const slice of serie.data) {
					states.push({
						type: serie.type,
						id: slice.id,
						name: slice.name,
						legendLabel: slice.legendLabel ?? slice.name,
						active: isActive(slice.id, slice.active),
						color: getColorForSeries(slice.id, slice.color),
						parentId: serie.id,
						legendTooltip: slice.legendTooltip,
						showInLegend: slice.showInLegend !== false
					});
				}
				continue;
			}
			states.push({
				type: serie.type,
				id: serie.id,
				name: serie.name,
				active: isActive(serie.id, serie.active),
				color: getColorForSeries(serie.id, serie.color),
				legendTooltip: serie.legendTooltip,
				showInLegend: serie.showInLegend !== false,
				...(serie.type === "line" && serie.lineStyle?.type
					? { lineStyleType: serie.lineStyle.type as "solid" | "dashed" | "dotted" }
					: {})
			});
		}
		return states;
	});

	const colorById = computed(() => {
		const map = new Map<string, DatavizColor | undefined>();
		for (const serie of series.value) map.set(serie.id, serie.color);
		return map;
	});

	// ============================================
	// States
	// ============================================

	const t = computed(() => datavizTranslations[props.locale]);
	const noData = computed(() => series.value.length === 0);

	const showHeader = computed(() =>
		slots.header || slots["header-title"] || slots["header-actions"] || props.title || props.actions || props.loadingOverlay
	);
	const showChart = computed(() => !props.loading && !props.error && !noData.value);
	const showLoading = computed(() => props.loading && !props.error);
	const showError = computed(() => props.error);
	const showNoData = computed(() => noData.value && !props.error && !props.loading);
	const showLegend = computed(() =>
		props.options?.legend?.show && !noData.value && !props.loading && !props.error
	);
	const showLegendStrip = computed(() => showLegend.value && series.value.length > 0);

	// ============================================
	// Chart definition
	// ============================================

	/** dataZoom window as fractions of the x domain. */
	const zoomWindow = ref<{ start: number, end: number }>();

	const zoomOptions = computed(() => {
		const zoom = props.options?.dataZoom;
		if (!zoom) return undefined;
		return Array.isArray(zoom) ? zoom : [zoom];
	});

	watch(zoomOptions, (zooms) => {
		if (!zooms?.length) {
			zoomWindow.value = undefined;
			return;
		}
		const configured = zooms.find((zoom) => zoom.start !== undefined || zoom.end !== undefined);
		zoomWindow.value = {
			start: (configured?.start ?? 0) / 100,
			end: (configured?.end ?? 100) / 100
		};
	}, { immediate: true });

	/** Series handed to the builder: hidden ones dropped, slice visibility resolved. */
	const visibleSeries = computed<DatavizSerieOption[]>(() =>
		registeredSeries.value.flatMap((serie) => {
			if (serie.type === "pie" || serie.type === "funnel") {
				const data = serie.data.filter((slice) => isActive(slice.id, slice.active));
				return data.length ? [{ ...serie, data } as DatavizSerieOption] : [];
			}
			return isActive(serie.id, serie.active) ? [serie] : [];
		})
	);

	const definition = computed(() => {
		if (!showChart.value) return null;
		return buildChartDefinition({
			series: visibleSeries.value,
			colorFor: (id) => colorById.value.get(id),
			options: props.options,
			animation: props.animation,
			locale: props.locale,
			window: zoomWindow.value
		});
	});

	// ============================================
	// Zoom gestures
	// ============================================

	const zoomInteractive = computed(() => zoomOptions.value?.some((zoom) => zoom.type !== "slider") ?? false);

	function clampWindow(start: number, end: number) {
		const span = Math.min(1, Math.max(0.02, end - start));
		const from = Math.min(Math.max(0, start), 1 - span);
		return { start: from, end: from + span };
	}

	function onChartWheel(event: WheelEvent) {
		if (!zoomInteractive.value || !zoomWindow.value) return;
		event.preventDefault();
		const { start, end } = zoomWindow.value;
		const span = end - start;
		const bounds = chartRef.value?.getBoundingClientRect();
		const anchor = bounds && bounds.width > 0
			? start + span * Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
			: start + span / 2;
		const factor = event.deltaY > 0 ? 1.15 : 1 / 1.15;
		const nextSpan = Math.min(1, Math.max(0.02, span * factor));
		zoomWindow.value = clampWindow(anchor - (anchor - start) * (nextSpan / span), anchor - (anchor - start) * (nextSpan / span) + nextSpan);
	}

	function onChartPointerDown(event: PointerEvent) {
		if (!zoomInteractive.value || !zoomWindow.value) return;
		const bounds = chartRef.value?.getBoundingClientRect();
		if (!bounds || bounds.width <= 0) return;
		const origin = { ...zoomWindow.value };
		const startX = event.clientX;
		let moved = false;

		const onMove = (move: PointerEvent) => {
			const fraction = ((startX - move.clientX) / bounds.width) * (origin.end - origin.start);
			if (!moved && Math.abs(move.clientX - startX) < 3) return;
			moved = true;
			zoomWindow.value = clampWindow(origin.start + fraction, origin.end + fraction);
		};
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	}

	// ============================================
	// Events
	// ============================================

	function toEventParams(point: ChartPoint): DatavizEventParams {
		const datum = point.datum as Record<string, unknown> | undefined;
		return {
			componentType: "series",
			seriesType: datum?.serieType as string | undefined,
			seriesName: (datum?.serieName as string | undefined) ?? point.groupLabel,
			name: String(point.xValue ?? datum?.name ?? ""),
			dataIndex: datum?.index as number | undefined,
			data: point.datum,
			value: point.yValue as number | undefined,
			color: point.color
		};
	}

	function onSelect(point: ChartPoint | null) {
		if (point) emit("click", toEventParams(point));
	}

	function onFocusChange(point: ChartPoint | null) {
		if (point) emit("mouseover", toEventParams(point));
		else emit("mouseout", { componentType: "series" });
	}

	function onFocusGroupChange() {
		// The group callback keeps the host's group focus alive; the tooltip body
		// reads its points directly, so nothing is emitted here.
	}

	// ============================================
	// Tooltip
	// ============================================

	function toTooltipItem(point: ChartPoint): TooltipDataItem {
		const datum = point.datum as Record<string, unknown> | undefined;
		const serieType = (datum?.serieType as string | undefined) ?? "line";
		const serieId = datum?.serieId as string | undefined;
		if (datum && "fraction" in datum) {
			return {
				componentType: "series",
				seriesType: "pie",
				seriesName: datum.name as string,
				name: datum.name as string,
				value: datum.value as number,
				percent: (datum.fraction as number) * 100,
				color: colorById.value.get(datum.id as string),
				data: datum
			};
		}
		const tuple = serieType === "area"
			? [datum?.x as number | string, datum?.y as number, datum?.y2 as number]
			: [datum?.x as number | string, datum?.y as number];
		return {
			componentType: "series",
			seriesType: serieType,
			seriesName: (datum?.serieName as string | undefined) ?? point.groupLabel,
			name: String(datum?.x ?? point.xValue ?? ""),
			dataIndex: datum?.index as number | undefined,
			value: tuple as (number | string)[],
			data: tuple,
			color: (serieId ? colorById.value.get(serieId) : undefined) ?? point.color
		};
	}

	function toTooltipData(points: readonly ChartPoint[]): TooltipSlotData {
		const items = points.map(toTooltipItem);
		if (props.options?.tooltip?.trigger === "item") return items[0] ?? { componentType: "series" };
		return items;
	}

	// ============================================
	// Legend chips
	// ============================================

	const showMoreLegend = ref(false);
	const showLegendTo = ref(0);
	const measurementComplete = ref(false);
	const LEGEND_GAP_PX = 4;
	const LEGEND_SHOW_MORE_BUTTON_WIDTH_PX = 80;
	const LEGEND_SIGNATURE_TEXT_LIMIT = 256;
	let legendRemeasureScheduled = false;
	let lastLegendMeasureKey = "";

	function legendChipInteractive(serie: DatavizSerieState) {
		return serie.showInLegend !== false;
	}

	// Swatch paint. `background` rather than `background-color` so a gradient serie
	// (areas only) shows the same gradient in its chip; line swatches draw with a
	// border, which cannot take one, so those collapse to the gradient's first stop.
	const INACTIVE_SWATCH = "#415768";

	function legendSwatchBackground(serie: DatavizSerieState) {
		return serie.active ? datavizColorToCss(serie.color) : INACTIVE_SWATCH;
	}

	function legendSwatchLineColor(serie: DatavizSerieState) {
		return serie.active ? datavizSolidColor(serie.color) : INACTIVE_SWATCH;
	}

	// Figma Chip, Dataviz variant (6003-15915): a pill whose own colors are
	// fixed — the serie's color lives only in the leading swatch, never in the
	// chip's ring. A shown serie is the "selected-stroke" state (secondary ring),
	// a hidden one the plain "unselected" state.
	function legendChipButtonClass(serie: DatavizSerieState) {
		const base = "inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-primary-800 transition-colors";
		if (!legendChipInteractive(serie))
			return `${base} ring-default cursor-not-allowed opacity-40 grayscale`;
		return serie.active
			? `${base} ring-secondary-700 hover:bg-secondary-50`
			: `${base} ring-default hover:bg-primary-50`;
	}

	function toggleLegend(serieId?: string) {
		if (!serieId || props.options?.legend?.selectedMode === false) return;
		const targetSerie = series.value.find((serie) => serie.id === serieId);
		if (!targetSerie || !legendChipInteractive(targetSerie)) return;
		legendOverride.value = { ...legendOverride.value, [serieId]: !targetSerie.active };
	}

	function hashLegendMeasurePart(hash: number, value: unknown): number {
		const text = String(value ?? "");
		let nextHash = Math.imul(hash ^ text.length, 16777619);
		const headLength = Math.min(text.length, LEGEND_SIGNATURE_TEXT_LIMIT);

		for (let i = 0; i < headLength; i++) {
			nextHash ^= text.charCodeAt(i);
			nextHash = Math.imul(nextHash, 16777619);
		}

		if (text.length > LEGEND_SIGNATURE_TEXT_LIMIT) {
			const tailStart = Math.max(LEGEND_SIGNATURE_TEXT_LIMIT, text.length - LEGEND_SIGNATURE_TEXT_LIMIT);
			for (let i = tailStart; i < text.length; i++) {
				nextHash ^= text.charCodeAt(i);
				nextHash = Math.imul(nextHash, 16777619);
			}
		}

		return nextHash >>> 0;
	}

	function legendMeasureSignature(): string {
		let hash = 2166136261;
		for (const serie of series.value) {
			hash = hashLegendMeasurePart(hash, serie.id);
			hash = hashLegendMeasurePart(hash, serie.showInLegend !== false ? 1 : 0);
			hash = hashLegendMeasurePart(hash, serie.legendLabel ?? serie.name ?? "");
		}
		return `${series.value.length}:${hash >>> 0}`;
	}

	function legendMeasureKey(): string {
		const w = legendContainerRef.value?.clientWidth ?? 0;
		return `${w}|${legendMeasureSignature()}|${showMoreLegend.value ? 1 : 0}`;
	}

	function safeMeasuredWidth(value: number, fallback = 0): number {
		if (!Number.isFinite(value) || value < 0)
			return fallback;
		return value;
	}

	function legendChipWidth(button: Element, containerWidth: number, includeGap: boolean): number {
		const measuredWidth = button.getBoundingClientRect().width;
		const cappedWidth = Math.min(safeMeasuredWidth(measuredWidth), containerWidth);
		return cappedWidth + (includeGap ? LEGEND_GAP_PX : 0);
	}

	function finishLegendMeasurement(key: string, visibleCount: number) {
		showLegendTo.value = visibleCount;
		measurementComplete.value = true;
		lastLegendMeasureKey = key;
	}

	// Calculate legend dimensions using actual DOM measurements
	function calculateLegendDimensions() {
		if (!showLegendStrip.value)
			return;

		const key = legendMeasureKey();
		if (key === lastLegendMeasureKey && measurementComplete.value)
			return;

		nextTick(() => {
			if (!legendContainerRef.value)
				return;

			const containerWidth = safeMeasuredWidth(legendContainerRef.value.clientWidth);
			const buttons = legendContainerRef.value.querySelectorAll("[data-dataviz-legend-chip]");

			if (buttons.length === 0 || containerWidth <= 0) {
				finishLegendMeasurement(key, series.value.length);
				return;
			}

			// First pass: check if all items fit without show more button
			let totalWidth = 0;
			for (let i = 0; i < buttons.length; i++) {
				const button = buttons[i];
				if (!button)
					break;
				totalWidth += legendChipWidth(button, containerWidth, i > 0);
				if (totalWidth > containerWidth)
					break;
			}

			// All items fit - no need for show more button
			if (totalWidth <= containerWidth) {
				finishLegendMeasurement(key, series.value.length);
				return;
			}

			// Second pass: calculate how many fit with show more button
			let accumulatedWidth = 0;
			let fitsCount = 0;
			const maxWidth = Math.max(0, containerWidth - Math.min(LEGEND_SHOW_MORE_BUTTON_WIDTH_PX, containerWidth) - LEGEND_GAP_PX);

			for (let i = 0; i < buttons.length; i++) {
				const button = buttons[i];
				if (!button)
					break;
				const buttonWidth = legendChipWidth(button, containerWidth, i > 0);

				if (accumulatedWidth + buttonWidth > maxWidth)
					break;

				accumulatedWidth += buttonWidth;
				fitsCount = i + 1;
			}

			finishLegendMeasurement(key, Math.max(1, fitsCount));
		});
	}

	function scheduleLegendRemeasure() {
		if (legendRemeasureScheduled)
			return;
		legendRemeasureScheduled = true;
		nextTick(() => {
			legendRemeasureScheduled = false;
			calculateLegendDimensions();
		});
	}

	const showMoreLegendButton = computed(() =>
		measurementComplete.value && series.value.length > showLegendTo.value
	);
	const legendToShow = computed(() => {
		const all = series.value;
		// Always show all items until measurement is complete
		if (!measurementComplete.value)
			return all;

		if (!showMoreLegend.value && showMoreLegendButton.value) {
			return all.slice(0, showLegendTo.value);
		}
		return all;
	});

	watch([legendMeasureSignature, showMoreLegend, showLegendStrip], () => {
		scheduleLegendRemeasure();
	}, { flush: "post", immediate: true });

	onBeforeUnmount(() => {
		serieRegistrations.value = [];
	});

	// Provide injection functions to child components
	provide(DATAVIZ_SERIE_REGISTRY, serieRegistryContext);
	provide(DATAVIZ_UPSERT_SERIE, upsertSerie);
	provide(DATAVIZ_REMOVE_SERIE, removeSerie);

	// Expose for external access
	defineExpose({
		definition,
		chartLoaded: computed(() => Boolean(definition.value))
	});
</script>
