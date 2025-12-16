<template>
	<div class="flex flex-col gap-1 rounded-sm px-3 py-2 text-xs shadow-md border border-primary-400 bg-white">
		<!-- Header: X-axis value or item name -->
		<span class="font-medium">
			{{ headerText }}
		</span>

		<!-- Divider -->
		<div class="border-b border-muted" />

		<!-- Axis trigger mode: Multiple series -->
		<template v-if="isAxisTrigger">
			<div
				v-for="item in filteredItems"
				:key="item.seriesName"
				class="flex items-center justify-between gap-4"
			>
				<div class="flex max-w-[200px] items-center gap-2">
					<span
						class="size-2 shrink-0 rounded-full"
						:style="{ backgroundColor: item.color }"
					/>
					<span class="truncate">
						{{ item.seriesName }}
					</span>
				</div>
				<span class="font-medium tabular-nums">
					{{ formatYValue(getYValue(item)) }}
				</span>
			</div>
		</template>

		<!-- Item trigger mode: Single item (pie, funnel, scatter) -->
		<template v-else-if="singleItem">
			<!-- Pie/Funnel: Show value and percentage -->
			<template v-if="isPieOrFunnel">
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-2">
						<span
							class="size-2 shrink-0 rounded-full"
							:style="{ backgroundColor: singleItem.color }"
						/>
						<span>{{ singleItem.seriesName }}</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="font-medium tabular-nums">
							{{ formatYValue(getItemValue(singleItem)) }}
						</span>
						<span
							v-if="showPercentage && singleItem.percent !== undefined"
							class="text-muted"
						>
							({{ singleItem.percent.toFixed(1) }}%)
						</span>
					</div>
				</div>
			</template>

			<!-- Scatter: Show X and Y values -->
			<template v-else-if="isScatter">
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-2">
						<span
							class="size-2 shrink-0 rounded-full"
							:style="{ backgroundColor: singleItem.color }"
						/>
						<span>{{ singleItem.seriesName }}</span>
					</div>
				</div>
				<div class="mt-1 flex flex-col gap-0.5 text-muted">
					<div class="flex justify-between gap-4">
						<span>X:</span>
						<span class="font-medium tabular-nums text-default">
							{{ formatXValue(getScatterX(singleItem)) }}
						</span>
					</div>
					<div class="flex justify-between gap-4">
						<span>Y:</span>
						<span class="font-medium tabular-nums text-default">
							{{ formatYValue(getScatterY(singleItem)) }}
						</span>
					</div>
				</div>
			</template>

			<!-- Other single items: Simple value display -->
			<template v-else>
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-2">
						<span
							class="size-2 shrink-0 rounded-full"
							:style="{ backgroundColor: singleItem.color }"
						/>
						<span>{{ singleItem.seriesName }}</span>
					</div>
					<span class="font-medium tabular-nums">
						{{ formatYValue(getItemValue(singleItem)) }}
					</span>
				</div>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
	import type { TooltipDataItem, TooltipSlotData } from "./types";
	import { computed } from "vue";

	defineOptions({
		name: "UDatavizTooltip"
	});

	const props = withDefaults(defineProps<{
		/** Tooltip data from the chart (single item or array) */
		data: TooltipSlotData
		/** Custom formatter for X-axis values (dates, categories) */
		xFormatter?: (value: string | number) => string
		/** Custom formatter for Y-axis values (numbers, currency) */
		yFormatter?: (value: number | string) => string
		/** Show percentage for pie/funnel charts */
		showPercentage?: boolean
		/** Show series with null/undefined values */
		showNullValues?: boolean
	}>(), {
		showPercentage: true,
		showNullValues: false
	});

	// Determine if data is array (axis trigger) or single item
	const isAxisTrigger = computed(() => Array.isArray(props.data));

	// Get data as array for axis trigger mode
	const dataArray = computed(() =>
		Array.isArray(props.data) ? props.data : []
	);

	// Get single item for item trigger mode
	const singleItem = computed(() =>
		!Array.isArray(props.data) ? props.data : null
	);

	// Filter out items with null/undefined Y values (unless showNullValues is true)
	const filteredItems = computed(() => {
		if (props.showNullValues) {
			return dataArray.value;
		}
		return dataArray.value.filter((item) => {
			const yValue = getYValue(item);
			return yValue !== null && yValue !== undefined;
		});
	});

	// Detect chart types
	const isPieOrFunnel = computed(() =>
		singleItem.value?.seriesType === "pie" || singleItem.value?.seriesType === "funnel"
	);

	const isScatter = computed(() =>
		singleItem.value?.seriesType === "scatter"
	);

	// Header text: X-axis value for axis trigger, item name for single items
	const headerText = computed(() => {
		if (isAxisTrigger.value && dataArray.value.length > 0) {
			const firstItem = dataArray.value[0];
			// Try to get X value from data array first, then fall back to name
			const xValue = getXValue(firstItem);
			return formatXValue(xValue);
		}

		if (singleItem.value) {
			// For pie/funnel, use the slice name
			if (isPieOrFunnel.value) {
				return singleItem.value.name ?? singleItem.value.seriesName ?? "";
			}
			// For other single items, use name or series name
			return singleItem.value.name ?? singleItem.value.seriesName ?? "";
		}

		return "";
	});

	// Extract X value from tooltip data item
	function getXValue(item: TooltipDataItem | undefined): string | number {
		if (!item)
			return "";

		// For cartesian charts, data is usually [x, y]
		if (Array.isArray(item.data) && item.data.length > 0) {
			return item.data[0] as string | number;
		}

		// Fall back to name (category name)
		return item.name ?? "";
	}

	// Extract Y value from tooltip data item
	function getYValue(item: TooltipDataItem | undefined): number | string | null {
		if (!item)
			return null;

		// For cartesian charts, data is usually [x, y]
		if (Array.isArray(item.data) && item.data.length > 1) {
			const yVal = item.data[1];
			return yVal as number | string | null;
		}

		// For value arrays like [x, y]
		if (Array.isArray(item.value) && item.value.length > 1) {
			return item.value[1] as number | string;
		}

		// Single value
		if (typeof item.value === "number" || typeof item.value === "string") {
			return item.value;
		}

		return null;
	}

	// Get value for pie/funnel/single items
	function getItemValue(item: TooltipDataItem | null): number | string {
		if (!item)
			return 0;

		// Direct value
		if (typeof item.value === "number" || typeof item.value === "string") {
			return item.value;
		}

		// Array value - take second element (y value)
		if (Array.isArray(item.value) && item.value.length > 1) {
			return item.value[1] as number | string;
		}

		// First element for single-value arrays
		if (Array.isArray(item.value) && item.value.length === 1) {
			return item.value[0] as number | string;
		}

		return 0;
	}

	// Get scatter X value
	function getScatterX(item: TooltipDataItem | null): string | number {
		if (!item)
			return 0;

		if (Array.isArray(item.value) && item.value.length > 0) {
			return item.value[0] as string | number;
		}

		if (Array.isArray(item.data) && item.data.length > 0) {
			return item.data[0] as string | number;
		}

		return 0;
	}

	// Get scatter Y value
	function getScatterY(item: TooltipDataItem | null): number | string {
		if (!item)
			return 0;

		if (Array.isArray(item.value) && item.value.length > 1) {
			return item.value[1] as number | string;
		}

		if (Array.isArray(item.data) && item.data.length > 1) {
			return item.data[1] as number | string;
		}

		return 0;
	}

	// Format X value using custom formatter or default
	function formatXValue(value: string | number | null | undefined): string {
		if (value === null || value === undefined)
			return "";

		if (props.xFormatter) {
			return props.xFormatter(value);
		}

		return String(value);
	}

	// Format Y value using custom formatter or default
	function formatYValue(value: number | string | null | undefined): string {
		if (value === null || value === undefined)
			return "-";

		if (props.yFormatter) {
			return props.yFormatter(value);
		}

		// Default formatting: use toLocaleString for numbers
		if (typeof value === "number") {
			return value.toLocaleString();
		}

		return String(value);
	}
</script>
