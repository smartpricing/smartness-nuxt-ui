<template>
	<ShowcasePage
		title="Dataviz"
		description="The UDataviz component provides a flexible wrapper around ECharts for data visualization with support for multiple series types, legends, and tooltips."
	>
		<PropsTable :props="propsData" />

		<!-- Line Chart -->
		<section>
			<ProseH3>Line Chart</ProseH3>
			<p class="text-muted mb-4">
				Basic line chart with smooth curves and multiple series.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Monthly Revenue"
					:options="lineChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Revenue"
						:data="lineData"
						color="#6366f1"
						:smooth="true"
					/>
					<UDatavizLine
						name="Expenses"
						:data="expenseData"
						color="#ef4444"
						:smooth="true"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Step Line Chart -->
		<section>
			<ProseH3>Step Line Chart</ProseH3>
			<p class="text-muted mb-4">
				Line chart with step interpolation for discrete data.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Server Status"
					:options="stepChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="CPU Usage"
						:data="stepData"
						color="#3b82f6"
						:smooth="false"
						step="middle"
						:show-symbol="true"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Bar Chart -->
		<section>
			<ProseH3>Bar Chart</ProseH3>
			<p class="text-muted mb-4">
				Vertical bar chart for categorical data comparison.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Quarterly Sales"
					:options="barChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizBar
						name="Sales"
						:data="barData"
						color="#22c55e"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Multi-Series Bar & Line -->
		<section>
			<ProseH3>Combined Bar + Line Chart</ProseH3>
			<p class="text-muted mb-4">
				Combining bar and line series for complex visualizations.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Sales vs Target"
					:options="combinedChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizBar
						name="Actual Sales"
						:data="barData"
						color="#6366f1"
					/>
					<UDatavizLine
						name="Target"
						:data="targetData"
						color="#f59e0b"
						:smooth="false"
						:show-symbol="true"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Area Chart -->
		<section>
			<ProseH3>Area Chart (Range)</ProseH3>
			<p class="text-muted mb-4">
				Area chart showing min/max range bands.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Temperature Range"
					:options="areaChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizArea
						name="Temperature"
						:data="areaData"
						color="rgba(59, 130, 246, 0.3)"
						:smooth="0.3"
					/>
					<UDatavizLine
						name="Average"
						:data="avgTempData"
						color="#ef4444"
						:smooth="true"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Scatter Plot -->
		<section>
			<ProseH3>Scatter Plot</ProseH3>
			<p class="text-muted mb-4">
				Scatter chart with customizable symbol sizes.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Price vs Rating"
					:options="scatterChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizScatter
						name="Products A"
						:data="scatterData1"
						color="#6366f1"
						:symbol-size="12"
					/>
					<UDatavizScatter
						name="Products B"
						:data="scatterData2"
						color="#8b5cf6"
						:symbol-size="scatterSymbolSize"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Pie Chart with per-data-point colors -->
		<section>
			<ProseH3>Pie Chart</ProseH3>
			<p class="text-muted mb-4">
				Pie chart with custom colors per slice. Each data point has its own color.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Market Share"
					:options="pieChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizPie
						name="Market Share"
						:data="pieData"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Funnel Chart with per-data-point colors -->
		<section>
			<ProseH3>Funnel Chart</ProseH3>
			<p class="text-muted mb-4">
				Funnel chart with custom colors per stage. Each stage has its own color.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Conversion Funnel"
					:options="funnelChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizFunnel
						name="Funnel"
						:data="funnelData"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- With Legend -->
		<section>
			<ProseH3>Chart with Legend</ProseH3>
			<p class="text-muted mb-4">
				Interactive legend to toggle series visibility.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Multi-Series with Legend"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Series A"
						:data="lineData"
						color="#6366f1"
					/>
					<UDatavizLine
						name="Series B"
						:data="expenseData"
						color="#8b5cf6"
					/>
					<UDatavizLine
						name="Series C"
						:data="targetData"
						color="#22c55e"
					/>
					<UDatavizLine
						name="Series D"
						:data="stepData"
						color="#f59e0b"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- With Actions -->
		<section>
			<ProseH3>Chart with Header Actions</ProseH3>
			<p class="text-muted mb-4">
				Header actions for chart interactions like export, refresh, etc.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Sales Dashboard"
					:options="lineChartOptions"
					:actions="chartActions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Sales"
						:data="lineData"
						color="#6366f1"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Loading State -->
		<section>
			<ProseH3>Loading State</ProseH3>
			<p class="text-muted mb-4">
				Chart loading indicator while data is being fetched.
			</p>
			<div class="h-[300px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Loading Chart"
					:loading="isLoading"
					:options="lineChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Data"
						:data="lineData"
						color="#6366f1"
					/>
				</UDataviz>
			</div>
			<UButton
				class="mt-4"
				@click="toggleLoading"
			>
				Toggle Loading
			</UButton>
		</section>

		<!-- Custom Hex Color Variations -->
		<section>
			<ProseH3>Custom Hex Colors</ProseH3>
			<p class="text-muted mb-4">
				Using any hex, rgb, or hsl color values for series.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Custom Colors"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Indigo"
						:data="generateColorData(0)"
						color="#6366f1"
					/>
					<UDatavizLine
						name="Violet"
						:data="generateColorData(10)"
						color="#8b5cf6"
					/>
					<UDatavizLine
						name="Green"
						:data="generateColorData(20)"
						color="#22c55e"
					/>
					<UDatavizLine
						name="Cyan"
						:data="generateColorData(30)"
						color="#06b6d4"
					/>
					<UDatavizLine
						name="Pink"
						:data="generateColorData(40)"
						color="#ec4899"
					/>
					<UDatavizLine
						name="Orange"
						:data="generateColorData(50)"
						color="#f97316"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- With Data Zoom -->
		<section>
			<ProseH3>Chart with Data Zoom</ProseH3>
			<p class="text-muted mb-4">
				Interactive data zoom slider for large datasets.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Zoomable Chart"
					:options="zoomChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Data Points"
						:data="largeDataset"
						color="#6366f1"
						:smooth="true"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Auto Color Assignment -->
		<section>
			<ProseH3>Auto Color Assignment</ProseH3>
			<p class="text-muted mb-4">
				When no color is specified, colors are automatically assigned from the default palette.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Auto Colors"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Auto Color 1"
						:data="generateColorData(0)"
					/>
					<UDatavizLine
						name="Auto Color 2"
						:data="generateColorData(10)"
					/>
					<UDatavizLine
						name="Auto Color 3"
						:data="generateColorData(20)"
					/>
					<UDatavizLine
						name="Auto Color 4"
						:data="generateColorData(30)"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- MarkPoint & MarkLine -->
		<section>
			<ProseH3>MarkPoint &amp; MarkLine</ProseH3>
			<p class="text-muted mb-4">
				Highlight important data points and reference lines on charts.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Sales with Markers"
					:options="lineChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Revenue"
						:data="lineData"
						color="#6366f1"
						:smooth="true"
						:mark-point="markPointConfig"
						:mark-line="markLineConfig"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Toolbox -->
		<section>
			<ProseH3>Chart with Toolbox</ProseH3>
			<p class="text-muted mb-4">
				Built-in tools for saving images, zooming, and resetting the chart.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Interactive Toolbox"
					:options="toolboxChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Data"
						:data="lineData"
						color="#6366f1"
						:smooth="true"
					/>
					<UDatavizLine
						name="Trend"
						:data="expenseData"
						color="#22c55e"
						:smooth="true"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- VisualMap -->
		<section>
			<ProseH3>VisualMap (Color Gradient)</ProseH3>
			<p class="text-muted mb-4">
				Data-driven color mapping based on values.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Value-based Colors"
					:options="visualMapChartOptions"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizLine
						name="Temperature"
						:data="visualMapData"
						:smooth="true"
						:show-symbol="true"
					/>
				</UDataviz>
			</div>
		</section>

		<!-- Polar Chart (Note: Requires special data format) -->
		<section>
			<ProseH3>Polar Coordinate System</ProseH3>
			<p class="text-muted mb-4">
				Polar charts are supported via the <code>coordinateSystem="polar"</code> prop.
				Note: Polar charts require special data format and axis configuration.
			</p>
			<div class="rounded-lg border border-accented bg-muted/20 p-6">
				<p class="text-sm text-muted">
					To use polar coordinates, configure the chart with:
				</p>
				<ul class="mt-2 list-inside list-disc text-sm text-muted">
					<li><code>options.polar</code> - Enable polar coordinate system</li>
					<li><code>options.angleAxis</code> - Configure the angle axis</li>
					<li><code>options.radiusAxis</code> - Configure the radius axis</li>
					<li><code>coordinateSystem="polar"</code> on the series component</li>
				</ul>
			</div>
		</section>

		<!-- Event Handling -->
		<section>
			<ProseH3>Event Handling</ProseH3>
			<p class="text-muted mb-4">
				Click on data points to trigger events. Last clicked: <strong>{{ lastClickedPoint }}</strong>
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<UDataviz
					title="Interactive Chart"
					:options="barChartOptions"
					@click="handleChartClick"
				>
					<template #tooltip="{ data }">
						<TooltipContent :data="data" />
					</template>
					<UDatavizBar
						name="Clicks"
						:data="barData"
						color="#f59e0b"
					/>
				</UDataviz>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { DatavizAction, DatavizEventParams, DatavizOptions, PieDataPoint, TooltipSlotData } from "../../../../app/components/Dataviz/types";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import UDataviz from "../../../../app/components/Dataviz/UDataviz.vue";
	import UDatavizArea from "../../../../app/components/Dataviz/UDatavizArea.vue";
	import UDatavizBar from "../../../../app/components/Dataviz/UDatavizBar.vue";
	import UDatavizFunnel from "../../../../app/components/Dataviz/UDatavizFunnel.vue";
	import UDatavizLine from "../../../../app/components/Dataviz/UDatavizLine.vue";
	import UDatavizPie from "../../../../app/components/Dataviz/UDatavizPie.vue";
	import UDatavizScatter from "../../../../app/components/Dataviz/UDatavizScatter.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// Tooltip content component
	const TooltipContent = defineComponent({
		props: {
			data: {
				type: [Object, Array] as PropType<TooltipSlotData>,
				required: true
			}
		},
		setup(props) {
			return () => {
				const data = props.data;

				if (Array.isArray(data)) {
					return h("div", { class: "rounded-md bg-elevated p-3 shadow-lg ring ring-accented" }, [
						data.map((item) =>
							h("div", { key: item.seriesName, class: "flex items-center gap-2" }, [
								h("span", {
									class: "size-2 rounded-full",
									style: { backgroundColor: item.color }
								}),
								h("span", { class: "text-sm" }, `${item.seriesName}: ${item.value}`)
							])
						)
					]);
				}

				return h("div", { class: "rounded-md bg-elevated p-3 shadow-lg ring ring-accented" }, [
					h("div", { class: "text-sm font-medium" }, data.name ?? data.seriesName),
					h("div", { class: "text-xs text-muted" }, `Value: ${data.value}`)
				]);
			};
		}
	});

	// Loading state
	const isLoading = ref(false);
	const toggleLoading = () => {
		isLoading.value = !isLoading.value;
	};

	// Chart actions
	const chartActions: DatavizAction[] = [
		{
			label: "Refresh",
			icon: "i-lucide-refresh-cw",
			onClick: () => console.log("Refresh clicked!")
		},
		{
			label: "Export",
			icon: "i-lucide-download",
			onClick: () => console.log("Export clicked!")
		}
	];

	// Line Chart Data
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const lineData = months.map((month, i) => ({
		x: month,
		y: Math.floor(Math.random() * 50) + 50 + i * 5
	}));

	const expenseData = months.map((month, i) => ({
		x: month,
		y: Math.floor(Math.random() * 30) + 30 + i * 3
	}));

	const targetData = months.map((month) => ({
		x: month,
		y: 75
	}));

	const stepData = months.map((month, i) => ({
		x: month,
		y: Math.floor(i % 3 === 0 ? 80 : i % 2 === 0 ? 60 : 40)
	}));

	// Bar Chart Data
	const barData = [
		{ x: "Q1", y: 120 },
		{ x: "Q2", y: 200 },
		{ x: "Q3", y: 150 },
		{ x: "Q4", y: 280 }
	];

	// Area Chart Data
	const areaData = months.map((month, i) => ({
		x: month,
		min: 10 + Math.sin(i) * 5,
		max: 25 + Math.cos(i) * 5
	}));

	const avgTempData = months.map((month, i) => ({
		x: month,
		y: 17.5 + Math.sin(i + 0.5) * 3
	}));

	// Scatter Data
	const scatterData1 = Array.from({ length: 20 }, () => ({
		x: Math.random() * 100,
		y: Math.random() * 5
	}));

	const scatterData2 = Array.from({ length: 20 }, () => ({
		x: Math.random() * 100,
		y: Math.random() * 5
	}));

	const scatterSymbolSize = (val: (number | string)[]) => {
		return Math.max(8, (Number(val[1]) / 5) * 20);
	};

	// Pie Data - each slice has its own color (hex values)
	const pieData: PieDataPoint[] = [
		{ name: "Chrome", value: 60, color: "#6366f1" },
		{ name: "Safari", value: 20, color: "#8b5cf6" },
		{ name: "Firefox", value: 10, color: "#f59e0b" },
		{ name: "Edge", value: 7, color: "#3b82f6" },
		{ name: "Other", value: 3, color: "#6b7280" }
	];

	// Funnel Data - each stage has its own color (hex values)
	const funnelData: PieDataPoint[] = [
		{ name: "Visitors", value: 1000, color: "#6366f1" },
		{ name: "Leads", value: 600, color: "#8b5cf6" },
		{ name: "Prospects", value: 400, color: "#3b82f6" },
		{ name: "Opportunities", value: 200, color: "#f59e0b" },
		{ name: "Customers", value: 80, color: "#22c55e" }
	];

	// Large dataset for zoom
	const largeDataset = Array.from({ length: 100 }, (_, i) => ({
		x: i,
		y: Math.sin(i / 5) * 50 + 50 + Math.random() * 10
	}));

	// Generate color variation data
	const generateColorData = (offset: number) => months.map((month, i) => ({
		x: month,
		y: 30 + offset + Math.sin(i + offset / 10) * 20
	}));

	// Chart Options
	const lineChartOptions: DatavizOptions = {
		xAxis: {
			type: "category",
			boundaryGap: false
		},
		yAxis: {
			type: "value"
		},
		tooltip: {
			show: true,
			trigger: "axis"
		}
	};

	const stepChartOptions: DatavizOptions = {
		xAxis: {
			type: "category"
		},
		yAxis: {
			type: "value",
			min: 0,
			max: 100
		},
		tooltip: {
			show: true,
			trigger: "axis"
		}
	};

	const barChartOptions: DatavizOptions = {
		xAxis: {
			type: "category"
		},
		yAxis: {
			type: "value"
		},
		tooltip: {
			show: true,
			trigger: "axis"
		}
	};

	const combinedChartOptions: DatavizOptions = {
		xAxis: {
			type: "category"
		},
		yAxis: {
			type: "value"
		},
		tooltip: {
			show: true,
			trigger: "axis"
		}
	};

	const areaChartOptions: DatavizOptions = {
		xAxis: {
			type: "category",
			boundaryGap: false
		},
		yAxis: {
			type: "value"
		},
		tooltip: {
			show: true,
			trigger: "axis"
		}
	};

	const scatterChartOptions: DatavizOptions = {
		xAxis: {
			type: "value",
			name: "Price ($)"
		},
		yAxis: {
			type: "value",
			name: "Rating"
		},
		tooltip: {
			show: true,
			trigger: "item"
		}
	};

	const pieChartOptions: DatavizOptions = {
		tooltip: {
			show: true,
			trigger: "item"
		}
	};

	const funnelChartOptions: DatavizOptions = {
		tooltip: {
			show: true,
			trigger: "item"
		}
	};

	const zoomChartOptions: DatavizOptions = {
		xAxis: {
			type: "value"
		},
		yAxis: {
			type: "value"
		},
		tooltip: {
			show: true,
			trigger: "axis"
		},
		dataZoom: [
			{
				type: "slider",
				start: 0,
				end: 50
			}
		]
	};

	// ============================================
	// NEW: MarkPoint & MarkLine Configuration
	// ============================================

	const markPointConfig = {
		data: [
			{ type: "max" as const, name: "Max" },
			{ type: "min" as const, name: "Min" }
		]
	};

	const markLineConfig = {
		data: [
			{ type: "average" as const, name: "Average" },
			{ yAxis: 80, name: "Target" }
		]
	};

	// ============================================
	// NEW: Toolbox Chart Options
	// ============================================

	const toolboxChartOptions: DatavizOptions = {
		xAxis: {
			type: "category",
			boundaryGap: false
		},
		yAxis: {
			type: "value"
		},
		tooltip: {
			show: true,
			trigger: "axis"
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: true,
				dataZoom: true,
				restore: true
			}
		}
	};

	// ============================================
	// NEW: VisualMap Chart Options & Data
	// ============================================

	const visualMapData = months.map((month, i) => ({
		x: month,
		y: Math.sin(i / 2) * 20 + 50 + Math.random() * 10
	}));

	const visualMapChartOptions: DatavizOptions = {
		xAxis: {
			type: "category",
			boundaryGap: false
		},
		yAxis: {
			type: "value"
		},
		tooltip: {
			show: true,
			trigger: "axis"
		},
		visualMap: {
			show: true,
			min: 30,
			max: 80,
			inRange: {
				color: ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"]
			},
			calculable: true,
			orient: "horizontal",
			left: "center",
			bottom: 10
		}
	};

	// ============================================
	// NOTE: Polar Chart Support
	// ============================================
	// Polar charts are supported but require special data format.
	// Use coordinateSystem="polar" on the series component along with
	// polar, angleAxis, and radiusAxis options in the chart options.

	// ============================================
	// NEW: Event Handling
	// ============================================

	const lastClickedPoint = ref("None");

	const handleChartClick = (params: DatavizEventParams) => {
		lastClickedPoint.value = `${params.name}: ${params.value}`;
	};

	// Props data for documentation
	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "Chart title displayed in the header" },
		{ prop: "loading", type: "boolean", description: "Show loading state", default: "false" },
		{ prop: "options", type: "DatavizOptions", description: "ECharts configuration options (xAxis, yAxis, tooltip, legend, etc.)" },
		{ prop: "actions", type: "DatavizAction[]", description: "Header action buttons" },
		{ prop: "locale", type: "string", description: "Locale for internal labels (en, it, de, es)", default: "en" },
		{ prop: "colors", type: "string[]", description: "Custom color palette for auto-assignment" },
		{ prop: "initOptions", type: "DatavizInitOptions", description: "ECharts initialization options" }
	];
</script>
