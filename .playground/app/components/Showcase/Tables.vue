<template>
	<ShowcasePage
		title="Tables"
		description="The UTable component displays data in rows and columns with support for sorting, custom cells, expandable rows, and various styling options."
	>
		<PropsTable :props="propsData" />

		<!-- Expandable / Collapsible Table (3-level nested) -->
		<section id="expandable-table" class="space-y-4">
			<ProseH3>Nested Expandable Table</ProseH3>
			<p class="text-muted">
				A 3-level nested table with clusters → unit types → periods with pricing.
				Click on the chevron to expand each level.
			</p>

			<!-- Search Input -->
			<div class="max-w-sm">
				<UInput
					v-model="clusterSearch"
					placeholder="Search clusters..."
					icon="i-lucide-search"
				/>
			</div>

			<div class="rounded-lg border border-accented overflow-hidden bg-white">
				<UTable
					v-model:expanded="expandedClusters"
					:data="filteredClusters"
					:columns="clusterColumns"
					class="bg-white"
				>
					<!-- Expand button -->
					<template #expandAndSelect-cell="{ row }">
						<div class="flex items-center gap-1">
							<UButton
								:icon="row.getIsExpanded() ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
								variant="ghost"
								size="xs"
								color="neutral"
								@click="row.toggleExpanded()"
							/>
							<UCheckbox
								:model-value="isClusterFullySelected(row.original)"
								:indeterminate="isClusterPartiallySelected(row.original)"
								@update:model-value="toggleClusterSelection(row.original)"
							/>
						</div>
					</template>
					<template #name-cell="{ row }">
						<span class="font-medium">{{ row.original.name }}</span>
					</template>
					<template #unitTypesCount-cell="{ row }">
						<span class="text-center">{{ row.original.unitTypesCount }}</span>
					</template>
					<template #lastUpdatedAt-cell="{ row }">
						<span class="text-muted text-sm">{{ row.original.lastUpdatedAt }}</span>
					</template>

					<!-- Expanded: Unit Types -->
					<template #expanded="{ row }">
						<UTable
							v-model:expanded="expandedUnits"
							:data="row.original.unitTypes"
							:columns="unitTypeNestedColumns"
							class="bg-white -ml-4"
						>
							<!-- Expand button for unit types -->
							<template #expandAndSelect-cell="{ row: unitRow }">
								<div class="flex items-center gap-1">
									<UButton
										:icon="unitRow.getIsExpanded() ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
										variant="ghost"
										size="xs"
										color="neutral"
										@click="unitRow.toggleExpanded()"
									/>
									<UCheckbox
										:model-value="isUnitTypeFullySelected(unitRow.original)"
										:indeterminate="isUnitTypePartiallySelected(unitRow.original)"
										@update:model-value="toggleUnitTypeSelection(unitRow.original)"
									/>
								</div>
							</template>
							<template #name-cell="{ row: unitRow }">
								<span>{{ unitRow.original.name }}</span>
							</template>

							<!-- Expanded: Periods with Pricing -->
							<template #expanded="{ row: unitRow }">
								<UTable
									:data="unitRow.original.periods"
									:columns="periodColumns"
									class="bg-white -ml-4"
								>
									<!-- Checkbox for period (simple 2 states) -->
									<template #select-cell="{ row: periodRow }">
										<UCheckbox
											:model-value="selectedPeriods.includes(periodRow.original.id)"
											@update:model-value="togglePeriodSelection(periodRow.original.id)"
										/>
									</template>
									<template #period-cell="{ row: periodRow }">
										<span class="font-mono text-sm">
											{{ periodRow.original.from }} → {{ periodRow.original.to }}
										</span>
									</template>
									<template #startingPrice-cell="{ row: periodRow }">
										<span class="font-mono">€{{ periodRow.original.startingPrice }}</span>
									</template>
									<template #minPrice-cell="{ row: periodRow }">
										<template v-if="periodRow.original.minPriceMultiple">
											<UBadge variant="outline" color="neutral" size="xs">
												Multiple
											</UBadge>
										</template>
										<template v-else>
											<span class="font-mono">€{{ periodRow.original.minPrice }}</span>
										</template>
									</template>
									<template #maxPrice-cell="{ row: periodRow }">
										<template v-if="periodRow.original.maxPriceMultiple">
											<UBadge variant="outline" color="neutral" size="xs">
												Multiple
											</UBadge>
										</template>
										<template v-else>
											<span class="font-mono">€{{ periodRow.original.maxPrice }}</span>
										</template>
									</template>
								</UTable>
							</template>
						</UTable>
					</template>
				</UTable>
			</div>
		</section>

		<!-- Basic Example -->
		<section id="basic-table" class="space-y-4">
			<ProseH3>Basic Table</ProseH3>
			<p class="text-muted">
				A simple table with data and column definitions.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden bg-white">
				<UTable
					:data="clustersData"
					:columns="simpleAccommodationColumns"
					class="bg-white"
				/>
			</div>
		</section>

		<!-- Unit Types Overview -->
		<section id="unit-types-table" class="space-y-4">
			<ProseH3>Unit Types Overview</ProseH3>
			<p class="text-muted">
				Flat table showing all unit types across clusters.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden bg-white">
				<UTable
					:data="allUnitTypesFlat"
					:columns="flatUnitColumns"
					class="bg-white"
				>
					<template #cluster-data="{ row }">
						<UBadge variant="outline" color="neutral">
							{{ row.original.cluster }}
						</UBadge>
					</template>
					<template #periodsCount-data="{ row }">
						<span class="font-mono text-sm">{{ row.original.periodsCount }}</span>
					</template>
				</UTable>
			</div>
		</section>

		<!-- Empty State -->
		<section id="empty-table" class="space-y-4">
			<ProseH3>Empty State</ProseH3>
			<p class="text-muted">
				How the table appears when there's no data.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden bg-white">
				<UTable
					:data="[]"
					:columns="simpleAccommodationColumns"
					class="bg-white"
				>
					<template #empty>
						<div class="flex flex-col items-center justify-center py-8 text-muted">
							<UIcon name="i-lucide-inbox" class="w-12 h-12 mb-2 opacity-50" />
							<p>No clusters available</p>
						</div>
					</template>
				</UTable>
			</div>
		</section>

		<!-- Loading State -->
		<section id="loading-table" class="space-y-4">
			<ProseH3>Loading State</ProseH3>
			<p class="text-muted">
				Display a loading indicator while fetching data.
			</p>
			<div class="rounded-lg border border-accented overflow-hidden bg-white">
				<UTable
					:data="clustersData"
					:columns="simpleAccommodationColumns"
					:loading="isLoading"
					class="bg-white"
				/>
			</div>
			<div class="flex gap-2">
				<UButton
					size="sm"
					:color="isLoading ? 'error' : 'primary'"
					@click="isLoading = !isLoading"
				>
					{{ isLoading ? 'Stop Loading' : 'Start Loading' }}
				</UButton>
			</div>
		</section>

		<!-- Column Definition Code Example -->
		<section id="column-definition" class="space-y-4">
			<ProseH3>Column Definition</ProseH3>
			<p class="text-muted">
				Columns are defined as an array of objects with <code>accessorKey</code> and <code>header</code> properties.
			</p>
			<UCard>
				<template #header>
					<span class="font-mono text-sm">Column Definition Example</span>
				</template>
				<pre class="overflow-x-auto text-sm"><code class="language-typescript">const columns = [
  { accessorKey: "name", header: "Accommodation" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "unitCount", header: "Units" }
];</code></pre>
			</UCard>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// Types for nested expandable table with pricing
	interface PricingPeriod {
		id: string
		from: string
		to: string
		startingPrice: number
		minPrice: number
		maxPrice: number
		minPriceMultiple?: boolean
		maxPriceMultiple?: boolean
	}

	interface ClusterUnitType {
		id: string
		name: string
		periods: PricingPeriod[]
	}

	interface Cluster {
		id: string
		name: string
		unitTypesCount: number
		lastUpdatedAt: string
		unitTypes: ClusterUnitType[]
	}

	// Loading state for demo
	const isLoading = ref(false);

	// Expanded state for collapsible tables
	const expandedClusters = ref({});
	const expandedUnits = ref({});

	// Search
	const clusterSearch = ref("");

	// Selection state - stores all selected period IDs
	const selectedPeriods = ref<string[]>([]);

	// Props documentation
	const propsData: PropDefinition[] = [
		{ prop: "data", type: "T[]", description: "Array of data objects to display in the table" },
		{ prop: "columns", type: "ColumnDef<T>[]", description: "Column definitions with accessorKey and header" },
		{ prop: "expanded", type: "ExpandedState", description: "Control expanded state of rows (v-model:expanded)" },
		{ prop: "loading", type: "boolean", description: "Show loading overlay on the table", default: "false" },
		{ prop: "loading-color", type: "string", description: "Color of the loading indicator", default: "primary" },
		{ prop: "sticky", type: "boolean", description: "Make the header sticky", default: "false" },
		{ prop: "class", type: "string", description: "CSS classes to apply to the table" }
	];

	// Cluster data with pricing (matching screenshot structure)
	const clustersData: Cluster[] = [
		{
			id: "villa-maria",
			name: "Villa maria",
			unitTypesCount: 2,
			lastUpdatedAt: "16/06/2027 - 10:05",
			unitTypes: [
				{
					id: "singola",
					name: "Singola",
					periods: [
						{ id: "vm-s-1", from: "12/02/2025", to: "28/02/2025", startingPrice: 89, minPrice: 37, maxPrice: 54 },
						{ id: "vm-s-2", from: "12/02/2025", to: "28/02/2025", startingPrice: 89, minPrice: 0, maxPrice: 54, minPriceMultiple: true },
						{ id: "vm-s-3", from: "12/02/2025", to: "28/02/2025", startingPrice: 89, minPrice: 37, maxPrice: 0, maxPriceMultiple: true },
						{ id: "vm-s-4", from: "12/02/2025", to: "28/02/2025", startingPrice: 89, minPrice: 37, maxPrice: 54 }
					]
				},
				{
					id: "doppia",
					name: "Doppia",
					periods: [
						{ id: "vm-d-1", from: "01/03/2025", to: "30/06/2025", startingPrice: 129, minPrice: 89, maxPrice: 149 }
					]
				}
			]
		},
		{
			id: "uffizi-suites",
			name: "Uffizi Suites",
			unitTypesCount: 1,
			lastUpdatedAt: "23/10/2024 - 13:40",
			unitTypes: [
				{
					id: "suite",
					name: "Suite",
					periods: [
						{ id: "us-s-1", from: "01/01/2025", to: "31/12/2025", startingPrice: 199, minPrice: 149, maxPrice: 249 }
					]
				}
			]
		},
		{
			id: "via-roma-suites",
			name: "Via Roma Suites",
			unitTypesCount: 13,
			lastUpdatedAt: "02/12/2026 - 09:00",
			unitTypes: [
				{
					id: "standard",
					name: "Standard Room",
					periods: [
						{ id: "vrs-st-1", from: "01/01/2025", to: "30/06/2025", startingPrice: 79, minPrice: 59, maxPrice: 99 }
					]
				},
				{
					id: "deluxe",
					name: "Deluxe Room",
					periods: [
						{ id: "vrs-dx-1", from: "01/01/2025", to: "30/06/2025", startingPrice: 119, minPrice: 89, maxPrice: 149 }
					]
				}
			]
		},
		{
			id: "olive-grove",
			name: "Olive Grove Suites",
			unitTypesCount: 1,
			lastUpdatedAt: "28/07/2027 - 13:15",
			unitTypes: [
				{
					id: "villa",
					name: "Villa",
					periods: [
						{ id: "og-v-1", from: "01/05/2025", to: "30/09/2025", startingPrice: 299, minPrice: 249, maxPrice: 399 }
					]
				}
			]
		},
		{
			id: "sunset-apartments",
			name: "Sunset Apartments",
			unitTypesCount: 6,
			lastUpdatedAt: "10/08/2027 - 09:30",
			unitTypes: [
				{
					id: "studio",
					name: "Studio",
					periods: [
						{ id: "sa-st-1", from: "01/01/2025", to: "31/12/2025", startingPrice: 69, minPrice: 49, maxPrice: 89 }
					]
				},
				{
					id: "one-bed",
					name: "One Bedroom",
					periods: [
						{ id: "sa-1b-1", from: "01/01/2025", to: "31/12/2025", startingPrice: 99, minPrice: 79, maxPrice: 129 }
					]
				}
			]
		},
		{
			id: "medici-estates",
			name: "Medici Estates",
			unitTypesCount: 4,
			lastUpdatedAt: "22/04/2027 - 12:00",
			unitTypes: [
				{
					id: "penthouse",
					name: "Penthouse",
					periods: [
						{ id: "me-ph-1", from: "01/06/2025", to: "31/08/2025", startingPrice: 499, minPrice: 399, maxPrice: 699 }
					]
				}
			]
		},
		{
			id: "arno-apartments",
			name: "Arno Apartments",
			unitTypesCount: 15,
			lastUpdatedAt: "14/01/2027 - 11:30",
			unitTypes: [
				{
					id: "riverside",
					name: "Riverside Suite",
					periods: [
						{ id: "aa-rs-1", from: "01/01/2025", to: "31/12/2025", startingPrice: 159, minPrice: 129, maxPrice: 199 }
					]
				}
			]
		}
	];

	// Filtered clusters based on search
	const filteredClusters = computed(() => {
		if (!clusterSearch.value) return clustersData;
		const search = clusterSearch.value.toLowerCase();
		return clustersData.filter((cluster) =>
			cluster.name.toLowerCase().includes(search)
		);
	});

	// Get all period IDs for a unit type
	const getUnitTypePeriodIds = (unitType: ClusterUnitType): string[] => {
		return unitType.periods.map((p) => p.id);
	};

	// Get all period IDs for a cluster
	const getClusterPeriodIds = (cluster: Cluster): string[] => {
		return cluster.unitTypes.flatMap((ut) => getUnitTypePeriodIds(ut));
	};

	// Check if all periods of a unit type are selected
	const isUnitTypeFullySelected = (unitType: ClusterUnitType): boolean => {
		const periodIds = getUnitTypePeriodIds(unitType);
		return periodIds.length > 0 && periodIds.every((id) => selectedPeriods.value.includes(id));
	};

	// Check if some (but not all) periods of a unit type are selected
	const isUnitTypePartiallySelected = (unitType: ClusterUnitType): boolean => {
		const periodIds = getUnitTypePeriodIds(unitType);
		const selectedCount = periodIds.filter((id) => selectedPeriods.value.includes(id)).length;
		return selectedCount > 0 && selectedCount < periodIds.length;
	};

	// Check if all periods of a cluster are selected
	const isClusterFullySelected = (cluster: Cluster): boolean => {
		const periodIds = getClusterPeriodIds(cluster);
		return periodIds.length > 0 && periodIds.every((id) => selectedPeriods.value.includes(id));
	};

	// Check if some (but not all) periods of a cluster are selected
	const isClusterPartiallySelected = (cluster: Cluster): boolean => {
		const periodIds = getClusterPeriodIds(cluster);
		const selectedCount = periodIds.filter((id) => selectedPeriods.value.includes(id)).length;
		return selectedCount > 0 && selectedCount < periodIds.length;
	};

	// Toggle period selection
	const togglePeriodSelection = (periodId: string) => {
		const index = selectedPeriods.value.indexOf(periodId);
		if (index === -1) {
			selectedPeriods.value.push(periodId);
		} else {
			selectedPeriods.value.splice(index, 1);
		}
	};

	// Toggle all periods of a unit type
	const toggleUnitTypeSelection = (unitType: ClusterUnitType) => {
		const periodIds = getUnitTypePeriodIds(unitType);
		const allSelected = isUnitTypeFullySelected(unitType);

		if (allSelected) {
			// Deselect all periods
			selectedPeriods.value = selectedPeriods.value.filter((id) => !periodIds.includes(id));
		} else {
			// Select all periods
			periodIds.forEach((id) => {
				if (!selectedPeriods.value.includes(id)) {
					selectedPeriods.value.push(id);
				}
			});
		}
	};

	// Toggle all periods of a cluster
	const toggleClusterSelection = (cluster: Cluster) => {
		const periodIds = getClusterPeriodIds(cluster);
		const allSelected = isClusterFullySelected(cluster);

		if (allSelected) {
			// Deselect all periods
			selectedPeriods.value = selectedPeriods.value.filter((id) => !periodIds.includes(id));
		} else {
			// Select all periods
			periodIds.forEach((id) => {
				if (!selectedPeriods.value.includes(id)) {
					selectedPeriods.value.push(id);
				}
			});
		}
	};

	// Column definitions for nested expandable table
	const clusterColumns = [
		{ id: "expandAndSelect", header: "" },
		{ id: "name", header: "Cluster name", accessorKey: "name" },
		{ id: "unitTypesCount", header: "Unit types", accessorKey: "unitTypesCount" },
		{ id: "lastUpdatedAt", header: "Last updated at", accessorKey: "lastUpdatedAt" }
	];

	const unitTypeNestedColumns = [
		{ id: "expandAndSelect", header: "" },
		{ id: "name", header: "Period", accessorKey: "name" }
	];

	const periodColumns = [
		{ id: "select", header: "" },
		{ id: "period", header: "Period" },
		{ id: "startingPrice", header: "Starting prices" },
		{ id: "minPrice", header: "Min prices" },
		{ id: "maxPrice", header: "Max prices" }
	];

	// Simple table columns
	const simpleAccommodationColumns = [
		{ accessorKey: "name", header: "Cluster" },
		{ accessorKey: "unitTypesCount", header: "Unit types" },
		{ accessorKey: "lastUpdatedAt", header: "Last updated" }
	];

	const flatUnitColumns = [
		{ accessorKey: "cluster", header: "Cluster" },
		{ accessorKey: "unitType", header: "Unit Type" },
		{ accessorKey: "periodsCount", header: "Periods" }
	];

	// Flatten unit types for the overview table
	const allUnitTypesFlat = computed(() => {
		return clustersData.flatMap((cluster) =>
			cluster.unitTypes.map((unit) => ({
				id: `${cluster.id}-${unit.id}`,
				cluster: cluster.name,
				unitType: unit.name,
				periodsCount: unit.periods.length
			}))
		);
	});
</script>
