<template>
	<ShowcasePage
		title="Dataviz"
		description="The SDataviz component provides a flexible wrapper around ECharts for data visualization with support for multiple series types, legends, and tooltips."
	>
		<PropsTable :props="propsData" />

		<!-- Line Chart -->
		<section id="line-chart">
			<ProseH3>Line Chart</ProseH3>
			<p class="text-muted mb-4">
				Basic line chart with smooth curves and multiple series.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Monthly Revenue"
					:options="lineChartOptions"
				>
					<SDatavizLine
						name="Revenue"
						:data="lineData"
						color="#6366f1"
						:smooth="true"
					/>
					<SDatavizLine
						name="Expenses"
						:data="expenseData"
						color="#ef4444"
						:smooth="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Step Line Chart -->
		<section id="step-line-chart">
			<ProseH3>Step Line Chart</ProseH3>
			<p class="text-muted mb-4">
				Line chart with step interpolation for discrete data.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Server Status"
					:options="stepChartOptions"
				>
					<SDatavizLine
						name="CPU Usage"
						:data="stepData"
						color="#3b82f6"
						:smooth="false"
						step="middle"
						:show-symbol="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Bar Chart -->
		<section id="bar-chart">
			<ProseH3>Bar Chart</ProseH3>
			<p class="text-muted mb-4">
				Vertical bar chart for categorical data comparison.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Quarterly Sales"
					:options="barChartOptions"
				>
					<SDatavizBar
						name="Sales"
						:data="barData"
						color="#22c55e"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Stacked Bar Chart (Vertical) -->
		<section id="stacked-bar-chart-vertical">
			<ProseH3>Stacked Bar Chart (Vertical)</ProseH3>
			<p class="text-muted mb-4">
				Multiple bar series stacked vertically using the <code>stack</code> prop. All bars with the same stack name are stacked together.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Sales by Product Category"
					:options="{ ...barChartOptions, legend: { show: true } }"
				>
					<SDatavizBar
						name="Electronics"
						:data="stackedBarData1"
						stack="total"
						color="#1CB1BE"
					/>
					<SDatavizBar
						name="Clothing"
						:data="stackedBarData2"
						stack="total"
						color="#8D6EB4"
					/>
					<SDatavizBar
						name="Food"
						:data="stackedBarData3"
						stack="total"
						color="#B33166"
					/>
					<SDatavizBar
						name="Other"
						:data="stackedBarData4"
						stack="total"
						color="#FCD268"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Stacked Bar Chart (Horizontal) -->
		<section id="stacked-bar-chart-horizontal">
			<ProseH3>Stacked Bar Chart (Horizontal)</ProseH3>
			<p class="text-muted mb-4">
				Horizontal stacked bars by configuring <code>xAxis</code> as type "value" and <code>yAxis</code> as type "category".
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Traffic Sources"
					:options="horizontalStackedChartOptions"
				>
					<SDatavizBar
						name="Email"
						:data="horizontalStackedData1"
						stack="total"
						color="#1CB1BE"
					/>
					<SDatavizBar
						name="WhatsApp"
						:data="horizontalStackedData2"
						stack="total"
						color="#8D6EB4"
					/>
					<SDatavizBar
						name="QR Code"
						:data="horizontalStackedData3"
						stack="total"
						color="#B33166"
					/>
					<SDatavizBar
						name="Other"
						:data="horizontalStackedData4"
						stack="total"
						color="#FCD268"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Multi-Series Bar & Line -->
		<section id="combined-bar--line-chart">
			<ProseH3>Combined Bar + Line Chart</ProseH3>
			<p class="text-muted mb-4">
				Combining bar and line series for complex visualizations.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Sales vs Target"
					:options="combinedChartOptions"
				>
					<SDatavizBar
						name="Actual Sales"
						:data="barData"
						color="#6366f1"
					/>
					<SDatavizLine
						name="Target"
						:data="targetData"
						color="#f59e0b"
						:smooth="false"
						:show-symbol="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Area Chart -->
		<section id="area-chart-range">
			<ProseH3>Area Chart (Range)</ProseH3>
			<p class="text-muted mb-4">
				Area chart showing min/max range bands.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Temperature Range"
					:options="areaChartOptions"
				>
					<SDatavizArea
						name="Temperature"
						:data="areaData"
						color="rgba(59, 130, 246, 0.3)"
						:smooth="0.3"
					/>
					<SDatavizLine
						name="Average"
						:data="avgTempData"
						color="#ef4444"
						:smooth="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Scatter Plot -->
		<section id="scatter-plot">
			<ProseH3>Scatter Plot</ProseH3>
			<p class="text-muted mb-4">
				Scatter chart with customizable symbol sizes.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Price vs Rating"
					:options="scatterChartOptions"
				>
					<SDatavizScatter
						name="Products A"
						:data="scatterData1"
						color="#6366f1"
						:symbol-size="12"
					/>
					<SDatavizScatter
						name="Products B"
						:data="scatterData2"
						color="#8b5cf6"
						:symbol-size="scatterSymbolSize"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Pie Chart with per-data-point colors -->
		<section id="pie-chart">
			<ProseH3>Pie Chart</ProseH3>
			<p class="text-muted mb-4">
				Pie chart with custom colors per slice. Each data point has its own color.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Market Share"
					:options="pieChartOptions"
				>
					<SDatavizPie
						name="Market Share"
						:data="pieData"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Funnel Chart with per-data-point colors -->
		<section id="funnel-chart">
			<ProseH3>Funnel Chart</ProseH3>
			<p class="text-muted mb-4">
				Funnel chart with custom colors per stage. Each stage has its own color.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Conversion Funnel"
					:options="funnelChartOptions"
				>
					<SDatavizFunnel
						name="Funnel"
						:data="funnelData"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- With Legend -->
		<section id="chart-with-legend">
			<ProseH3>Chart with Legend</ProseH3>
			<p class="text-muted mb-4">
				Interactive legend to toggle series visibility.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Multi-Series with Legend"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<SDatavizLine
						name="Series A"
						:data="lineData"
						color="#6366f1"
					/>
					<SDatavizLine
						name="Series B"
						:data="expenseData"
						color="#8b5cf6"
					/>
					<SDatavizLine
						name="Series C"
						:data="targetData"
						color="#22c55e"
					/>
					<SDatavizLine
						name="Series D"
						:data="stepData"
						color="#f59e0b"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- With Actions -->
		<section id="chart-with-header-actions">
			<ProseH3>Chart with Header Actions</ProseH3>
			<p class="text-muted mb-4">
				Header actions for chart interactions like export, refresh, etc.
			</p>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Sales Dashboard"
					:options="lineChartOptions"
					:actions="chartActions"
				>
					<SDatavizLine
						name="Sales"
						:data="lineData"
						color="#6366f1"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Loading State -->
		<section id="loading-state">
			<ProseH3>Loading State</ProseH3>
			<p class="text-muted mb-4">
				Chart loading indicator while data is being fetched.
			</p>
			<div class="mb-4 flex gap-2">
				<UButton
					variant="outline"
					color="primary"
					@click="isLoading = !isLoading"
				>
					{{ isLoading ? 'Disable Loading' : 'Enable Loading' }}
				</UButton>
			</div>
			<div class="h-[300px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Loading Chart"
					:loading="isLoading"
					:options="lineChartOptions"
				>
					<SDatavizLine
						name="Data"
						:data="lineData"
						color="#6366f1"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- No Data State -->
		<section id="no-data-state">
			<ProseH3>No Data State</ProseH3>
			<p class="text-muted mb-4">
				When no series are provided, the chart displays a "No data" message with a description.
				Both title and description can be customized via props or use the default localized text.
			</p>
			<div class="mb-4 flex gap-2">
				<UButton
					variant="outline"
					color="primary"
					@click="showNoDataSeries = !showNoDataSeries"
				>
					{{ showNoDataSeries ? 'Hide Series (Show No Data)' : 'Show Series' }}
				</UButton>
			</div>
			<div class="h-[300px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Chart with No Data"
					:options="lineChartOptions"
				>
					<SDatavizLine
						v-if="showNoDataSeries"
						name="Data"
						:data="lineData"
						color="#6366f1"
					/>
				</SDataviz>
			</div>
			<div class="mt-4 h-[300px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Custom No Data Message"
					:options="lineChartOptions"
					no-data-title="Nothing to display"
					no-data-description="Try adjusting your filters or adding some data"
				/>
			</div>
			<div class="mt-4 rounded-lg bg-muted/20 p-4">
				<p class="text-sm text-muted">
					<strong>Note:</strong> Use <code>no-data-title</code> and <code>no-data-description</code> props to customize the message, or rely on the default localized text based on the <code>locale</code> prop.
				</p>
			</div>
		</section>

		<!-- Error State -->
		<section id="error-state">
			<ProseH3>Error State</ProseH3>
			<p class="text-muted mb-4">
				When data fails to load, display an error state with a retry button.
				The retry button emits a <code>retry</code> event that you can handle to reload the data.
			</p>
			<div class="mb-4 flex gap-2">
				<UButton
					variant="outline"
					color="primary"
					@click="showError = !showError"
				>
					{{ showError ? 'Hide Error' : 'Show Error' }}
				</UButton>
			</div>
			<div class="h-[300px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Chart with Error"
					:error="showError"
					:options="lineChartOptions"
					@retry="handleRetry"
				>
					<SDatavizLine
						name="Data"
						:data="lineData"
						color="#6366f1"
					/>
				</SDataviz>
			</div>
			<div class="mt-4 h-[300px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Custom Error Message"
					:error="true"
					:options="lineChartOptions"
					error-title="Connection failed"
					error-description="Unable to reach the server. Please check your network."
					@retry="handleRetry"
				/>
			</div>
			<div class="mt-4 rounded-lg bg-muted/20 p-4">
				<p class="text-sm text-muted">
					<strong>Retry count:</strong> {{ retryCount }} times
				</p>
				<p class="text-sm text-muted mt-2">
					<strong>Note:</strong> Use <code>error-title</code> and <code>error-description</code> props to customize the error message, or rely on the default localized text.
				</p>
			</div>
		</section>

		<!-- Custom Hex Color Variations -->
		<section id="custom-hex-colors">
			<ProseH3>Custom Hex Colors</ProseH3>
			<p class="text-muted mb-4">
				Using any hex, rgb, or hsl color values for series.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Custom Colors"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<SDatavizLine
						name="Indigo"
						:data="generateColorData(0)"
						color="#6366f1"
					/>
					<SDatavizLine
						name="Violet"
						:data="generateColorData(10)"
						color="#8b5cf6"
					/>
					<SDatavizLine
						name="Green"
						:data="generateColorData(20)"
						color="#22c55e"
					/>
					<SDatavizLine
						name="Cyan"
						:data="generateColorData(30)"
						color="#06b6d4"
					/>
					<SDatavizLine
						name="Pink"
						:data="generateColorData(40)"
						color="#ec4899"
					/>
					<SDatavizLine
						name="Orange"
						:data="generateColorData(50)"
						color="#f97316"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- With Data Zoom -->
		<section id="chart-with-data-zoom">
			<ProseH3>Chart with Data Zoom</ProseH3>
			<p class="text-muted mb-4">
				Interactive data zoom slider for large datasets.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Zoomable Chart"
					:options="zoomChartOptions"
				>
					<SDatavizLine
						name="Data Points"
						:data="largeDataset"
						color="#6366f1"
						:smooth="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Auto Color Assignment -->
		<section id="auto-color-assignment">
			<ProseH3>Auto Color Assignment</ProseH3>
			<p class="text-muted mb-4">
				When no color is specified, colors are automatically assigned from the default palette.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Auto Colors"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<SDatavizLine
						name="Auto Color 1"
						:data="generateColorData(0)"
					/>
					<SDatavizLine
						name="Auto Color 2"
						:data="generateColorData(10)"
					/>
					<SDatavizLine
						name="Auto Color 3"
						:data="generateColorData(20)"
					/>
					<SDatavizLine
						name="Auto Color 4"
						:data="generateColorData(30)"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- MarkPoint & MarkLine -->
		<section id="markpoint--markline">
			<ProseH3>MarkPoint &amp; MarkLine</ProseH3>
			<p class="text-muted mb-4">
				Highlight important data points and reference lines on charts.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Sales with Markers"
					:options="lineChartOptions"
				>
					<SDatavizLine
						name="Revenue"
						:data="lineData"
						color="#6366f1"
						:smooth="true"
						:mark-point="markPointConfig"
						:mark-line="markLineConfig"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Toolbox -->
		<section id="chart-with-toolbox">
			<ProseH3>Chart with Toolbox</ProseH3>
			<p class="text-muted mb-4">
				Built-in tools for saving images, zooming, and resetting the chart.
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Interactive Toolbox"
					:options="toolboxChartOptions"
				>
					<SDatavizLine
						name="Data"
						:data="lineData"
						color="#6366f1"
						:smooth="true"
					/>
					<SDatavizLine
						name="Trend"
						:data="expenseData"
						color="#22c55e"
						:smooth="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- VisualMap -->
		<section id="visualmap-color-gradient">
			<ProseH3>VisualMap (Color Gradient)</ProseH3>
			<p class="text-muted mb-4">
				Data-driven color mapping based on values.
			</p>
			<div class="h-[450px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Value-based Colors"
					:options="visualMapChartOptions"
				>
					<SDatavizLine
						name="Temperature"
						:data="visualMapData"
						:smooth="true"
						:show-symbol="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Polar Chart (Note: Requires special data format) -->
		<section id="polar-coordinate-system">
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
		<section id="event-handling">
			<ProseH3>Event Handling</ProseH3>
			<p class="text-muted mb-4">
				Click on data points to trigger events. Last clicked: <strong>{{ lastClickedPoint }}</strong>
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Interactive Chart"
					:options="barChartOptions"
					@click="handleChartClick"
				>
					<SDatavizBar
						name="Clicks"
						:data="barData"
						color="#f59e0b"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Dynamic Series Add/Remove -->
		<section id="dynamic-series-management">
			<ProseH3>Dynamic Series Management</ProseH3>
			<p class="text-muted mb-4">
				Add or remove series dynamically. Current series count: <strong>{{ dynamicSeries.length }}</strong>
			</p>
			<div class="mb-4 flex gap-2">
				<UButton
					color="primary"
					@click="addSeries"
				>
					Add Series
				</UButton>
				<UButton
					color="error"
					:disabled="dynamicSeries.length <= 1"
					@click="removeSeries"
				>
					Remove Series
				</UButton>
				<UButton
					variant="outline"
					@click="resetSeries"
				>
					Reset
				</UButton>
			</div>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Dynamic Series"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<SDatavizLine
						v-for="serie in dynamicSeries"
						:key="serie.id"
						:name="serie.name"
						:data="serie.data"
						:color="serie.color"
						:smooth="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Dynamic Resize -->
		<section id="dynamic-resize">
			<ProseH3>Dynamic Resize</ProseH3>
			<p class="text-muted mb-4">
				The chart automatically resizes when its container changes.
				Size: <strong>{{ chartWidth }}% × {{ chartHeight }}px</strong>
			</p>
			<div class="mb-4 flex flex-wrap gap-4">
				<div class="flex items-center gap-2">
					<span class="text-sm text-muted">Height:</span>
					<UButton
						variant="outline"
						size="sm"
						@click="chartHeight = 80"
					>
						80px
					</UButton>
					<UButton
						variant="outline"
						size="sm"
						@click="chartHeight = 250"
					>
						250px
					</UButton>
					<UButton
						variant="outline"
						size="sm"
						@click="chartHeight = 350"
					>
						350px
					</UButton>
					<UButton
						variant="outline"
						size="sm"
						@click="chartHeight = 500"
					>
						500px
					</UButton>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-sm text-muted">Width:</span>
					<UButton
						variant="outline"
						size="sm"
						@click="chartWidth = 50"
					>
						50%
					</UButton>
					<UButton
						variant="outline"
						size="sm"
						@click="chartWidth = 75"
					>
						75%
					</UButton>
					<UButton
						variant="outline"
						size="sm"
						@click="chartWidth = 100"
					>
						100%
					</UButton>
				</div>
			</div>
			<div
				class="overflow-hidden rounded-lg border border-accented transition-all duration-300"
				:style="{ height: `${chartHeight}px`, width: `${chartWidth}%` }"
			>
				<SDataviz
					title="Resizable Chart"
					:options="lineChartOptions"
				>
					<SDatavizLine
						name="Data"
						:data="lineData"
						color="#6366f1"
						:smooth="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Dynamic Series Name Change -->
		<section id="dynamic-series-name">
			<ProseH3>Dynamic Series Name</ProseH3>
			<p class="text-muted mb-4">
				Series names can be updated dynamically and reflect in the legend.
			</p>
			<div class="mb-4 flex items-center gap-2">
				<span class="text-sm text-muted">Series name:</span>
				<UInput
					v-model="dynamicSeriesName"
					placeholder="Enter series name"
					class="w-48"
				/>
			</div>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Dynamic Name"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<SDatavizLine
						:name="dynamicSeriesName || 'Unnamed Series'"
						:data="lineData"
						color="#22c55e"
						:smooth="true"
					/>
					<SDatavizLine
						name="Fixed Series"
						:data="expenseData"
						color="#ef4444"
						:smooth="true"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Dynamic Data Updates -->
		<section id="real-time-data-updates">
			<ProseH3>Real-time Data Updates</ProseH3>
			<p class="text-muted mb-4">
				Data updates automatically when the underlying data changes. Click to randomize values.
			</p>
			<div class="mb-4">
				<UButton
					color="primary"
					@click="randomizeData"
				>
					Randomize Data
				</UButton>
			</div>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Live Data"
					:options="barChartOptions"
				>
					<SDatavizBar
						name="Values"
						:data="liveData"
						color="#8b5cf6"
					/>
				</SDataviz>
			</div>
		</section>

		<!-- Custom Tooltip Formatting -->
		<section id="custom-tooltip-formatting">
			<ProseH3>Custom Tooltip Formatting</ProseH3>
			<p class="text-muted mb-4">
				Use <code>tooltipOptions.xFormatter</code> and <code>tooltipOptions.yFormatter</code> to customize how values are displayed in tooltips.
				The formatter receives the value and the full data item for context-aware formatting.
				This example also demonstrates dual Y-axes (Revenue on left, Occupancy % on right).
			</p>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Revenue & Occupancy"
					:options="dualAxisChartOptions"
					:tooltip-options="{
						xFormatter: formatTooltipDate,
						yFormatter: formatTooltipValue,
					}"
				>
					<SDatavizLine
						name="Revenue ($)"
						:data="revenueData"
						color="#22c55e"
						:smooth="true"
						:y-axis-index="0"
					/>
					<SDatavizLine
						name="Occupancy (%)"
						:data="occupancyData"
						color="#3b82f6"
						:smooth="true"
						:y-axis-index="1"
					/>
				</SDataviz>
			</div>
			<div class="mt-4 rounded-lg bg-muted/20 p-4">
				<p class="text-sm font-medium mb-2">
					Example formatters:
				</p>
				<pre class="text-xs bg-elevated p-3 rounded overflow-x-auto"><code>// Format X-axis as full date
xFormatter: (value) => {
  const months = ['January', 'February', ...];
  return months[months.indexOf(value)] + ' 2024';
}

// Context-aware Y formatting
yFormatter: (value, item) => {
  if (item.seriesName?.includes('Revenue')) {
    return '$' + value.toLocaleString();
  }
  if (item.seriesName?.includes('Occupancy')) {
    return value + '%';
  }
  return String(value);
}</code></pre>
			</div>
		</section>

		<!-- Color Cache (Persistent Colors) -->
		<section id="color-cache-persistent-colors">
			<ProseH3>Color Cache (Persistent Colors)</ProseH3>
			<p class="text-muted mb-4">
				Series colors are cached by their ID. When a series is removed and re-added, it keeps its original color.
				This ensures consistent visualization even with dynamic series management.
			</p>
			<div class="mb-4 flex gap-2">
				<UButton
					v-for="serie in colorCacheSeries"
					:key="serie.id"
					:color="serie.visible ? 'primary' : 'neutral'"
					:variant="serie.visible ? 'solid' : 'outline'"
					size="sm"
					@click="toggleColorCacheSerie(serie.id)"
				>
					{{ serie.visible ? 'Hide' : 'Show' }} {{ serie.name }}
				</UButton>
			</div>
			<div class="h-[400px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Persistent Colors Demo"
					:options="{ ...lineChartOptions, legend: { show: true } }"
				>
					<SDatavizLine
						v-for="serie in visibleColorCacheSeries"
						:id="serie.id"
						:key="serie.id"
						:name="serie.name"
						:data="serie.data"
						:smooth="true"
					/>
				</SDataviz>
			</div>
			<div class="mt-4 rounded-lg bg-muted/20 p-4">
				<p class="text-sm text-muted">
					<strong>Note:</strong> Toggle series off and back on - they retain their original colors.
					This is achieved through an internal color assignment cache keyed by series ID.
					No explicit <code>color</code> prop is set on the series above.
				</p>
			</div>
		</section>

		<!-- Locale (Language Switching) -->
		<section id="locale-language-switching">
			<ProseH3>Locale (Language Switching)</ProseH3>
			<p class="text-muted mb-4">
				The <code>locale</code> prop allows you to change the language for internal labels like loading messages.
				Available locales: <code>en</code> (English), <code>it</code> (Italian), <code>de</code> (German), <code>es</code> (Spanish).
			</p>
			<div class="mb-4 flex items-center gap-4">
				<span class="text-sm text-muted">Select language:</span>
				<USelect
					v-model="selectedLocale"
					:items="localeOptions"
					value-key="value"
					class="w-48"
				/>
				<span class="text-xs text-muted">
					(Current: <code>{{ selectedLocale }}</code>)
				</span>
			</div>
			<div class="h-[350px] rounded-lg border border-accented p-4">
				<SDataviz
					title="Localized Chart"
					:loading="localeLoading"
					:locale="selectedLocale"
					:options="localeChartOptions"
				>
					<SDatavizLine
						name="Data"
						:data="localizedLineData"
						color="#6366f1"
						:smooth="true"
					/>
				</SDataviz>
			</div>
			<div class="mt-4 flex gap-2">
				<UButton
					variant="outline"
					color="primary"
					@click="localeLoading = !localeLoading"
				>
					{{ localeLoading ? 'Hide Loading' : 'Show Loading' }}
				</UButton>
			</div>
			<div class="mt-4 rounded-lg bg-muted/20 p-4">
				<p class="text-sm text-muted">
					<strong>Tip:</strong> Enable loading to see the localized "Loading data..." message in the selected language.
				</p>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { DatavizAction, DatavizEventParams, DatavizLocale, DatavizOptions, PieDataPoint, TooltipDataItem } from "../../../../app/components/Dataviz/types";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import SDataviz from "../../../../app/components/Dataviz/SDataviz.vue";
	import SDatavizArea from "../../../../app/components/Dataviz/SDatavizArea.vue";
	import SDatavizBar from "../../../../app/components/Dataviz/SDatavizBar.vue";
	import SDatavizFunnel from "../../../../app/components/Dataviz/SDatavizFunnel.vue";
	import SDatavizLine from "../../../../app/components/Dataviz/SDatavizLine.vue";
	import SDatavizPie from "../../../../app/components/Dataviz/SDatavizPie.vue";
	import SDatavizScatter from "../../../../app/components/Dataviz/SDatavizScatter.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// Loading state
	const isLoading = ref(true);

	// No data state toggle
	const showNoDataSeries = ref(false);

	// Error state
	const showError = ref(true);
	const retryCount = ref(0);

	const handleRetry = () => {
		retryCount.value++;
		console.log(`Retry attempt #${retryCount.value}`);
	};

	// Chart actions
	const chartActions: DatavizAction[] = [
		{
			label: "Refresh",
			icon: "ph:arrows-clockwise",
			onClick: () => console.log("Refresh clicked!")
		},
		{
			label: "Export",
			icon: "ph:download-simple",
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

	// Stacked Bar Chart Data (Vertical)
	const stackedBarData1 = [
		{ x: "Q1", y: 45 },
		{ x: "Q2", y: 60 },
		{ x: "Q3", y: 50 },
		{ x: "Q4", y: 80 }
	];

	const stackedBarData2 = [
		{ x: "Q1", y: 35 },
		{ x: "Q2", y: 55 },
		{ x: "Q3", y: 40 },
		{ x: "Q4", y: 70 }
	];

	const stackedBarData3 = [
		{ x: "Q1", y: 25 },
		{ x: "Q2", y: 50 },
		{ x: "Q3", y: 35 },
		{ x: "Q4", y: 65 }
	];

	const stackedBarData4 = [
		{ x: "Q1", y: 15 },
		{ x: "Q2", y: 35 },
		{ x: "Q3", y: 25 },
		{ x: "Q4", y: 65 }
	];

	// Stacked Bar Chart Data (Horizontal)
	const horizontalStackedData1 = [
		{ y: "Visits", x: 450 }
	];

	const horizontalStackedData2 = [
		{ y: "Visits", x: 320 }
	];

	const horizontalStackedData3 = [
		{ y: "Visits", x: 180 }
	];

	const horizontalStackedData4 = [
		{ y: "Visits", x: 120 }
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
		},
		legend: {
			show: true
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

	const horizontalStackedChartOptions: DatavizOptions = {
		xAxis: {
			type: "value"
		},
		yAxis: {
			type: "category",
			data: ["Visits"]
		},
		legend: {
			show: true
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

	// ============================================
	// Dynamic Series Management
	// ============================================

	const seriesColors = ["#6366f1", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899"];
	let seriesCounter = 2;

	const dynamicSeries = ref([
		{
			id: "series-1",
			name: "Series 1",
			color: seriesColors[0],
			data: months.map((month, i) => ({ x: month, y: Math.floor(Math.random() * 50) + 30 + i * 3 }))
		},
		{
			id: "series-2",
			name: "Series 2",
			color: seriesColors[1],
			data: months.map((month, i) => ({ x: month, y: Math.floor(Math.random() * 40) + 40 + i * 2 }))
		}
	]);

	const addSeries = () => {
		seriesCounter++;
		const colorIndex = (seriesCounter - 1) % seriesColors.length;
		dynamicSeries.value.push({
			id: `series-${seriesCounter}`,
			name: `Series ${seriesCounter}`,
			color: seriesColors[colorIndex]!,
			data: months.map((month, i) => ({ x: month, y: Math.floor(Math.random() * 60) + 20 + i * 2 }))
		});
	};

	const removeSeries = () => {
		if (dynamicSeries.value.length > 1) {
			dynamicSeries.value.pop();
		}
	};

	const resetSeries = () => {
		seriesCounter = 2;
		dynamicSeries.value = [
			{
				id: "series-1",
				name: "Series 1",
				color: seriesColors[0]!,
				data: months.map((month, i) => ({ x: month, y: Math.floor(Math.random() * 50) + 30 + i * 3 }))
			},
			{
				id: "series-2",
				name: "Series 2",
				color: seriesColors[1]!,
				data: months.map((month, i) => ({ x: month, y: Math.floor(Math.random() * 40) + 40 + i * 2 }))
			}
		];
	};

	// ============================================
	// Dynamic Resize
	// ============================================

	const chartHeight = ref(80);
	const chartWidth = ref(100);

	// ============================================
	// Dynamic Series Name
	// ============================================

	const dynamicSeriesName = ref("Revenue");

	// ============================================
	// Real-time Data Updates
	// ============================================

	const liveData = ref([
		{ x: "Q1", y: 120 },
		{ x: "Q2", y: 200 },
		{ x: "Q3", y: 150 },
		{ x: "Q4", y: 280 }
	]);

	const randomizeData = () => {
		liveData.value = [
			{ x: "Q1", y: Math.floor(Math.random() * 200) + 50 },
			{ x: "Q2", y: Math.floor(Math.random() * 200) + 50 },
			{ x: "Q3", y: Math.floor(Math.random() * 200) + 50 },
			{ x: "Q4", y: Math.floor(Math.random() * 200) + 50 }
		];
	};

	// ============================================
	// Custom Tooltip Formatting Example
	// ============================================

	// Dual Y-axis options: Revenue on left, Occupancy % on right
	// Using type assertion since DatavizOptions.yAxis doesn't explicitly type arrays
	const dualAxisChartOptions = {
		xAxis: {
			type: "category",
			boundaryGap: false
		},
		yAxis: [
			{
				type: "value",
				name: "Revenue",
				position: "left"
			},
			{
				type: "value",
				name: "Occupancy",
				position: "right",
				min: 0,
				max: 100,
				axisLabel: {
					formatter: "{value}%"
				}
			}
		],
		tooltip: {
			show: true,
			trigger: "axis"
		},
		legend: {
			show: true
		}
	} as DatavizOptions;

	const revenueData = months.map((month, i) => ({
		x: month,
		y: Math.floor(Math.random() * 50000) + 10000 + i * 2000
	}));

	const occupancyData = months.map((month, i) => ({
		x: month,
		y: Math.floor(Math.random() * 30) + 60 + (i % 3) * 5
	}));

	// Full month names for tooltip display
	const fullMonthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	// Custom X-axis formatter: shows full month name + year
	const formatTooltipDate = (value: string | number): string => {
		const monthIndex = months.indexOf(String(value));
		if (monthIndex !== -1) {
			return `${fullMonthNames[monthIndex]} 2024`;
		}
		return String(value);
	};

	// Custom Y-axis formatter: context-aware formatting based on series name
	const formatTooltipValue = (value: number | string, item: TooltipDataItem): string => {
		const numValue = typeof value === "number" ? value : Number(value);

		// Format revenue as currency
		if (item.seriesName?.includes("Revenue")) {
			return `$${numValue.toLocaleString()}`;
		}

		// Format occupancy as percentage
		if (item.seriesName?.includes("Occupancy")) {
			return `${numValue.toFixed(1)}%`;
		}

		return String(value);
	};

	// ============================================
	// Color Cache (Persistent Colors) Example
	// ============================================

	const colorCacheSeries = ref([
		{
			id: "cache-series-alpha",
			name: "Alpha",
			visible: true,
			data: months.map((month, i) => ({ x: month, y: 40 + Math.sin(i) * 15 }))
		},
		{
			id: "cache-series-beta",
			name: "Beta",
			visible: true,
			data: months.map((month, i) => ({ x: month, y: 55 + Math.cos(i) * 12 }))
		},
		{
			id: "cache-series-gamma",
			name: "Gamma",
			visible: true,
			data: months.map((month, i) => ({ x: month, y: 70 + Math.sin(i + 2) * 10 }))
		}
	]);

	const visibleColorCacheSeries = computed(() =>
		colorCacheSeries.value.filter((s) => s.visible)
	);

	const toggleColorCacheSerie = (serieId: string) => {
		const serie = colorCacheSeries.value.find((s) => s.id === serieId);
		if (serie) {
			serie.visible = !serie.visible;
		}
	};

	// ============================================
	// Locale (Language Switching) Example
	// ============================================

	const selectedLocale = ref<DatavizLocale>("en");
	const localeLoading = ref(true);

	const localeOptions = [
		{ label: "English", value: "en" },
		{ label: "Italiano", value: "it" },
		{ label: "Deutsch", value: "de" },
		{ label: "Español", value: "es" }
	];

	// Get localized month names based on selected locale
	const localizedMonths = computed(() => {
		const formatter = new Intl.DateTimeFormat(selectedLocale.value, { month: "short" });
		return Array.from({ length: 12 }, (_, i) => {
			const date = new Date(2024, i, 1);
			return formatter.format(date);
		});
	});

	// Localized line data for the locale example
	const localizedLineData = computed(() =>
		localizedMonths.value.map((month, i) => ({
			x: month,
			y: Math.floor(50 + i * 5 + Math.sin(i) * 10)
		}))
	);

	// Chart options for locale example (uses category axis)
	const localeChartOptions = computed<DatavizOptions>(() => ({
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
	}));

	// Props data for documentation
	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "Chart title displayed in the header" },
		{ prop: "loading", type: "boolean", description: "Show loading state", default: "false" },
		{ prop: "error", type: "boolean", description: "Show error state with retry button", default: "false" },
		{ prop: "errorTitle", type: "string", description: "Custom title for error state (overrides locale default)" },
		{ prop: "errorDescription", type: "string", description: "Custom description for error state (overrides locale default)" },
		{ prop: "noDataTitle", type: "string", description: "Custom title for no data state (overrides locale default)" },
		{ prop: "noDataDescription", type: "string", description: "Custom description for no data state (overrides locale default)" },
		{ prop: "options", type: "DatavizOptions", description: "ECharts configuration options (xAxis, yAxis, tooltip, legend, etc.)" },
		{ prop: "actions", type: "DatavizAction[]", description: "Header action buttons" },
		{ prop: "locale", type: "string", description: "Locale for internal labels (en, it, de, es)", default: "en" },
		{ prop: "colors", type: "string[]", description: "Custom color palette for auto-assignment" },
		{ prop: "initOptions", type: "DatavizInitOptions", description: "ECharts initialization options" },
		{ prop: "tooltipOptions", type: "{ xFormatter?, yFormatter?, showPercentage?, showNullValues? }", description: "Custom tooltip formatters and options for context-aware value display" }
	];
</script>
