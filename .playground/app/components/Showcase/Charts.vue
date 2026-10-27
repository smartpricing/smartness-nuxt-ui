<template>
	<ShowcasePage
		title="Charts"
		description="The native UChart component from Nuxt UI, built on TanStack Charts: line, area, bar and donut charts rendered as SVG, with tooltip, legend and responsive sizing. It replaces SDataviz for new charts."
	>
		<UAlert
			title="Full API on the Nuxt UI docs"
			description="UChart is used as is, with no Smartness wrapper: props, slots, events and every example (stacked, curve, points, axis, tooltip slot, donut center, TanStack definition) are documented on the Nuxt UI page."
			color="secondary"
			variant="subtle"
			orientation="horizontal"
			icon="ph:chart-line"
			:actions="[
				{
					label: 'UChart docs',
					icon: 'ph:arrow-square-out',
					size: 'md',
					to: 'https://ui.nuxt.com/docs/components/chart',
					target: '_blank',
				},
			]"
		/>

		<!-- ============================== -->
		<!-- Types                          -->
		<!-- ============================== -->
		<section id="types" class="space-y-4">
			<ProseH3>Types</ProseH3>
			<p class="text-sm text-muted">
				Pass the rows with <code>data</code>, the x-axis key with <code>index</code> and the series with <code>categories</code>. The <code>type</code> prop switches between <code>line</code> (default), <code>area</code>, <code>bar</code> and <code>donut</code>; with <code>donut</code> each row is a slice.
			</p>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div v-for="type in chartTypes" :key="type" class="space-y-2 rounded-lg border border-accented p-4">
					<div class="text-xs font-medium text-muted capitalize">
						{{ type }}
					</div>
					<UChart
						:type="type"
						:data="occupancyData"
						index="month"
						:categories="occupancyCategories"
						curve="monotone"
						:height="240"
						:aria-label="`Occupancy ${type} chart`"
					/>
				</div>
			</div>
		</section>

		<!-- ============================== -->
		<!-- Colors & format                -->
		<!-- ============================== -->
		<section id="colors" class="space-y-4">
			<ProseH3>Colors &amp; format</ProseH3>
			<p class="text-sm text-muted">
				<code>colors</code> takes the layer theme colors (<code>primary</code>, <code>secondary</code>, <code>burgundy</code>…) or any CSS color, in <code>categories</code> order. <code>format</code> formats the y axis and the tooltip values.
			</p>
			<div class="rounded-lg border border-accented p-4">
				<UChart
					type="bar"
					stacked
					:colors="['primary', 'secondary', 'burgundy']"
					:data="channelData"
					index="month"
					:categories="channelCategories"
					:format="(value) => currency.format(value)"
					:height="280"
					aria-label="Revenue by channel"
				/>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";

	const chartTypes = ["line", "area", "bar", "donut"] as const;

	const occupancyData = [
		{ month: "Jan", thisYear: 42, lastYear: 38 },
		{ month: "Feb", thisYear: 48, lastYear: 41 },
		{ month: "Mar", thisYear: 61, lastYear: 55 },
		{ month: "Apr", thisYear: 72, lastYear: 64 },
		{ month: "May", thisYear: 78, lastYear: 75 },
		{ month: "Jun", thisYear: 91, lastYear: 86 }
	];
	const occupancyCategories = [
		{ key: "thisYear" as const, label: "2026" },
		{ key: "lastYear" as const, label: "2025" }
	];

	const channelData = [
		{ month: "Jan", direct: 12000, booking: 21000, expedia: 8000 },
		{ month: "Feb", direct: 14000, booking: 23000, expedia: 9500 },
		{ month: "Mar", direct: 18000, booking: 26000, expedia: 11000 },
		{ month: "Apr", direct: 21000, booking: 30000, expedia: 13000 },
		{ month: "May", direct: 24000, booking: 32000, expedia: 15000 },
		{ month: "Jun", direct: 29000, booking: 36000, expedia: 17000 }
	];
	const channelCategories = [
		{ key: "direct" as const, label: "Direct" },
		{ key: "booking" as const, label: "Booking.com" },
		{ key: "expedia" as const, label: "Expedia" }
	];

	const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", notation: "compact" });
</script>
