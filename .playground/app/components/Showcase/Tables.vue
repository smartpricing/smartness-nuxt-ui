<template>
	<ShowcasePage
		title="Tables"
		description="The UTable component displays data in rows and columns. The layer adds a pinned-column treatment (sticky cells with a gradient shadow) and the useTableHeight composable for a viewport-bounded, sticky-header table — the standard list pattern used across the PMS app."
	>
		<PropsTable :props="propsData" />

		<!-- Standard Table -->
		<section id="standard-table" class="space-y-4">
			<ProseH3>Standard Table</ProseH3>
			<p class="text-muted">
				A showcase of the table's full capabilities: bulk row selection,
				sortable columns, column visibility filtering, status badges, an
				actions column following the <code>SMoreActions</code> pattern,
				multiple sticky pinned columns (<code>select</code> + <code>name</code>
				left, <code>actions</code> right), an empty state, a sticky header
				bounded to the viewport via <code>useTableHeight</code>, and full
				pagination docked to the card footer.
			</p>

			<div class="flex items-center justify-between gap-3">
				<div class="max-w-sm flex-1">
					<UInput
						v-model="search"
						placeholder="Search properties..."
						icon="ph:magnifying-glass"
					/>
				</div>
				<div class="flex items-center gap-2">
					<UDropdownMenu :items="columnsDropdownItems">
						<UButton
							trailing-icon="ph:caret-down"
							label="Columns"
							color="neutral"
							variant="outline"
							size="sm"
						/>
					</UDropdownMenu>
					<UButton
						size="sm"
						:color="isLoading ? 'error' : 'primary'"
						:icon="isLoading ? 'ph:stop-circle' : 'ph:play-circle'"
						:label="isLoading ? 'Stop loading' : 'Start loading'"
						@click="isLoading = !isLoading"
					/>
				</div>
			</div>

			<UCard ref="wrapper" class="bg-default overflow-hidden" :ui="{ body: 'p-0 sm:p-0', footer: 'p-0 sm:p-0' }">
				<UTable
					ref="table"
					v-model:column-pinning="columnPinning"
					v-model:column-visibility="columnVisibility"
					v-model:row-selection="rowSelection"
					:get-row-id="getRowId"
					sticky
					:loading="isLoading"
					:style="{ maxHeight }"
					:data="paginatedProperties"
					:columns="columns"
				>
					<template #empty>
						<div class="flex flex-col items-center justify-center py-10 text-muted">
							<UIcon name="ph:magnifying-glass-minus" class="size-12 mb-2 opacity-50" />
							<p>No properties found</p>
						</div>
					</template>
				</UTable>

				<template #footer>
					<div class="flex items-center justify-between gap-3 px-4 py-3">
						<span class="text-sm text-muted">
							<template v-if="selectedCount > 0">
								{{ selectedCount }} of {{ filteredProperties.length }} selected
							</template>
							<template v-else>
								Showing {{ ((page - 1) * perPage) + 1 }} to
								{{ Math.min(page * perPage, filteredProperties.length) }}
								of {{ filteredProperties.length }} results
							</template>
						</span>
						<UPagination
							v-model:page="page"
							:items-per-page="perPage"
							:total="filteredProperties.length"
							:sibling-count="1"
							active-color="secondary"
							show-edges
							@update:page="y = 0"
						/>
					</div>
				</template>
			</UCard>
		</section>

		<!-- Expandable Rows -->
		<section id="expandable-table" class="space-y-4">
			<ProseH3>Expandable Rows</ProseH3>
			<p class="text-muted">
				The <code>#expanded</code> slot renders extra detail below a row. Bind
				<code>v-model:expanded</code> and toggle from a cell.
			</p>

			<div class="rounded-lg ring ring-default overflow-hidden bg-default">
				<UTable
					v-model:expanded="expanded"
					:data="propertiesData"
					:columns="expandableColumns"
				>
					<template #expand-cell="{ row }">
						<UButton
							:icon="row.getIsExpanded() ? 'ph:caret-down' : 'ph:caret-right'"
							variant="ghost"
							color="neutral"
							size="xs"
							@click="row.toggleExpanded()"
						/>
					</template>

					<template #expanded="{ row }">
						<div class="flex flex-wrap gap-2 px-2 py-1">
							<UBadge
								v-for="unit in row.original.unitTypes"
								:key="unit"
								color="primary"
								variant="soft"
								size="sm"
							>
								{{ unit }}
							</UBadge>
						</div>
					</template>
				</UTable>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { TableColumn } from "@nuxt/ui";
	import type { Row, Table } from "@tanstack/vue-table";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	interface Property {
		id: string
		name: string
		email: string
		type: string
		units: number
		categories: number
		active: boolean
		channelManager: boolean
		unitTypes: string[]
	}

	type SortKey = "name" | "email" | "type" | "units" | "categories";

	const propsData: PropDefinition[] = [
		{ prop: "data", type: "T[]", description: "Array of data objects to display in the table" },
		{ prop: "columns", type: "TableColumn<T>[]", description: "Column definitions with accessorKey, header and cell" },
		{ prop: "loading", type: "boolean", description: "Show the built-in loading overlay", default: "false" },
		{ prop: "sticky", type: "boolean", description: "Keep the header pinned while the body scrolls", default: "false" },
		{ prop: "expanded", type: "ExpandedState", description: "Expanded rows state (v-model:expanded)" },
		{ prop: "row-selection", type: "RowSelectionState", description: "Selected rows state (v-model:row-selection)" },
		{ prop: "column-pinning", type: "ColumnPinningState", description: "Columns pinned left/right (v-model:column-pinning)" }
	];

	const propertiesData: Property[] = [
		{ id: "villa-maria", name: "Villa Maria", email: "info@villamaria.it", type: "Hotel", units: 24, categories: 4, active: true, channelManager: true, unitTypes: ["Singola", "Doppia", "Suite"] },
		{ id: "uffizi-suites", name: "Uffizi Suites", email: "booking@uffizisuites.it", type: "B&B", units: 8, categories: 2, active: true, channelManager: false, unitTypes: ["Suite", "Deluxe"] },
		{ id: "via-roma", name: "Via Roma Suites", email: "hello@viaroma.it", type: "Apartment", units: 13, categories: 3, active: false, channelManager: false, unitTypes: ["Standard Room", "Deluxe Room"] },
		{ id: "olive-grove", name: "Olive Grove Suites", email: "stay@olivegrove.it", type: "Hotel", units: 31, categories: 5, active: true, channelManager: true, unitTypes: ["Villa", "Garden Room"] },
		{ id: "sunset-apartments", name: "Sunset Apartments", email: "info@sunsetapts.it", type: "Apartment", units: 6, categories: 2, active: true, channelManager: true, unitTypes: ["Studio", "One Bedroom"] },
		{ id: "medici-estates", name: "Medici Estates", email: "concierge@medici.it", type: "Hotel", units: 4, categories: 1, active: false, channelManager: false, unitTypes: ["Penthouse"] },
		{ id: "arno-apartments", name: "Arno Apartments", email: "book@arnoapts.it", type: "Apartment", units: 15, categories: 3, active: true, channelManager: true, unitTypes: ["Riverside Suite", "Loft"] },
		{ id: "duomo-rooms", name: "Duomo Rooms", email: "info@duomorooms.it", type: "B&B", units: 10, categories: 2, active: true, channelManager: false, unitTypes: ["Classic", "Comfort"] },
		{ id: "ponte-vecchio", name: "Ponte Vecchio Lofts", email: "info@pontevecchio.it", type: "Apartment", units: 9, categories: 2, active: true, channelManager: true, unitTypes: ["Loft", "Studio"] },
		{ id: "boboli-residence", name: "Boboli Residence", email: "stay@boboli.it", type: "Hotel", units: 27, categories: 4, active: true, channelManager: false, unitTypes: ["Classic", "Superior"] },
		{ id: "santa-croce", name: "Santa Croce Suites", email: "hello@santacroce.it", type: "B&B", units: 5, categories: 1, active: false, channelManager: false, unitTypes: ["Suite"] },
		{ id: "lungarno-house", name: "Lungarno House", email: "book@lungarno.it", type: "Apartment", units: 11, categories: 3, active: true, channelManager: true, unitTypes: ["Riverside", "Garden"] },
		{ id: "pitti-palace-inn", name: "Pitti Palace Inn", email: "info@pittiinn.it", type: "Hotel", units: 19, categories: 4, active: true, channelManager: true, unitTypes: ["Deluxe", "Junior Suite"] },
		{ id: "oltrarno-rooms", name: "Oltrarno Rooms", email: "stay@oltrarno.it", type: "B&B", units: 7, categories: 2, active: true, channelManager: false, unitTypes: ["Double", "Triple"] },
		{ id: "fiesole-villa", name: "Fiesole Hillside Villa", email: "concierge@fiesole.it", type: "Hotel", units: 3, categories: 1, active: false, channelManager: false, unitTypes: ["Villa"] },
		{ id: "mercato-apartments", name: "Mercato Apartments", email: "info@mercatoapts.it", type: "Apartment", units: 14, categories: 3, active: true, channelManager: true, unitTypes: ["One Bedroom", "Two Bedroom"] },
		{ id: "campo-marte", name: "Campo di Marte Suites", email: "hello@campomarte.it", type: "B&B", units: 6, categories: 2, active: true, channelManager: false, unitTypes: ["Comfort", "Family"] },
		{ id: "san-niccolo", name: "San Niccolò Terrace", email: "stay@sanniccolo.it", type: "Apartment", units: 8, categories: 2, active: false, channelManager: true, unitTypes: ["Terrace Studio", "Penthouse"] },
		{ id: "novella-grand", name: "Novella Grand Hotel", email: "info@novellagrand.it", type: "Hotel", units: 42, categories: 6, active: true, channelManager: true, unitTypes: ["Standard", "Executive", "Suite"] },
		{ id: "careggi-rooms", name: "Careggi Garden Rooms", email: "book@careggi.it", type: "B&B", units: 12, categories: 3, active: true, channelManager: false, unitTypes: ["Garden Double", "Garden Suite"] }
	];

	const UBadge = resolveComponent("UBadge");
	const UButton = resolveComponent("UButton");
	const UCheckbox = resolveComponent("UCheckbox");
	const SMoreActions = resolveComponent("SMoreActions");

	const toast = useToast();

	const isLoading = ref(false);
	const search = ref("");
	const page = ref(1);
	const perPage = 10;
	const expanded = ref({});
	const rowSelection = ref<Record<string, boolean>>({});
	const columnVisibility = ref<Record<string, boolean>>({});

	const sort = ref<{ key: SortKey, order: "asc" | "desc" }>({ key: "name", order: "asc" });

	const columnPinning = ref({
		left: ["select", "name"],
		right: ["actions"]
	});

	// Stable row ids so a selection survives pagination (default ids are the
	// per-page row index, which would re-point to a different property).
	const getRowId = (property: Property) => property.id;

	// Minimal hand-written tableApi shape — same approach as the PMS
	// ReservationGroups/CreationDetailsStep.vue. Typing useTemplateRef
	// explicitly keeps `table` independent from the template it lives in, so
	// selectedCount / columnsDropdownItems (both consumed in the template and
	// both reading tableApi) don't create a circular implicit-any.
	interface TableColumnApi {
		id: string
		getCanHide: () => boolean
		getIsVisible: () => boolean
		toggleVisibility: (visible?: boolean) => void
	}

	const table = useTemplateRef<{
		$el?: HTMLElement
		tableApi?: {
			getFilteredSelectedRowModel: () => { rows: unknown[] }
			getAllColumns: () => TableColumnApi[]
			getColumn: (id: string) => TableColumnApi | undefined
		}
	}>("table");
	const wrapper = useTemplateRef("wrapper");
	const { maxHeight } = useTableHeight(wrapper);
	const { y } = useScroll(() => table.value?.$el, { behavior: "smooth" });

	const filteredProperties = computed(() => {
		const query = search.value.toLowerCase().trim();
		const list = query
			? propertiesData.filter((property) =>
				property.name.toLowerCase().includes(query)
				|| property.email.toLowerCase().includes(query))
			: [...propertiesData];

		const { key, order } = sort.value;
		list.sort((a, b) => {
			const cmp = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
			return order === "asc" ? cmp : -cmp;
		});

		return list;
	});

	const paginatedProperties = computed(() => {
		const start = (page.value - 1) * perPage;
		return filteredProperties.value.slice(start, start + perPage);
	});

	const selectedCount = computed(() => table.value?.tableApi?.getFilteredSelectedRowModel().rows.length ?? 0);

	const sortableHeader = (label: string, key: SortKey) => {
		return () => {
			const isActive = sort.value.key === key;
			const icon = !isActive
				? "ph:arrows-down-up"
				: sort.value.order === "asc"
					? "ph:sort-ascending"
					: "ph:sort-descending";

			return h(UButton, {
				color: "neutral",
				variant: "ghost",
				size: "sm",
				label,
				trailingIcon: icon,
				class: "-mx-2.5",
				onClick: () => {
					if (isActive) {
						sort.value.order = sort.value.order === "asc" ? "desc" : "asc";
					} else {
						sort.value = { key, order: "asc" };
					}
					page.value = 1;
				}
			});
		};
	};

	const getRowActions = (property: Property) => {
		return [
			{
				label: "View",
				icon: "ph:eye",
				onSelect: () => toast.add({ title: property.name, description: "View property", color: "info" })
			},
			{
				label: "Edit",
				icon: "ph:pencil-simple-line",
				onSelect: () => toast.add({ title: property.name, description: "Edit property", color: "primary" })
			},
			{
				label: "Remove",
				icon: "ph:trash",
				color: "error" as const,
				onSelect: () => toast.add({ title: property.name, description: "Remove property", color: "error" })
			}
		];
	};

	const columns: TableColumn<Property>[] = [
		{
			id: "select",
			size: 48,
			meta: {
				class: {
					td: "min-w-12",
					th: "min-w-12"
				}
			},
			header: ({ table }: { table: Table<Property> }) => h(UCheckbox, {
				modelValue: table.getIsSomePageRowsSelected()
					? "indeterminate"
					: table.getIsAllPageRowsSelected(),
				"onUpdate:modelValue": (value: boolean | "indeterminate") => table.toggleAllPageRowsSelected(!!value),
				"aria-label": "Select all rows"
			}),
			cell: ({ row }: { row: Row<Property> }) => h(UCheckbox, {
				modelValue: row.getIsSelected(),
				"onUpdate:modelValue": (value: boolean | "indeterminate") => row.toggleSelected(!!value),
				"aria-label": "Select row"
			})
		},
		{
			accessorKey: "name",
			size: 220,
			header: sortableHeader("Property", "name"),
			cell: ({ row }: { row: Row<Property> }) => {
				return h("span", { class: "font-semibold text-primary-900" }, row.original.name);
			}
		},
		{
			accessorKey: "email",
			header: sortableHeader("Email", "email"),
			cell: ({ row }: { row: Row<Property> }) => {
				return h("span", { class: "text-sm text-muted" }, row.original.email);
			}
		},
		{
			accessorKey: "type",
			header: sortableHeader("Type", "type"),
			cell: ({ row }: { row: Row<Property> }) => {
				return h(UBadge, { color: "primary", variant: "soft", size: "sm" }, () => row.original.type);
			}
		},
		{
			accessorKey: "units",
			header: sortableHeader("Units", "units"),
			cell: ({ row }: { row: Row<Property> }) => {
				return h(UBadge, { color: "neutral", variant: "soft", size: "sm" }, () => String(row.original.units));
			}
		},
		{
			accessorKey: "categories",
			header: sortableHeader("Categories", "categories"),
			cell: ({ row }: { row: Row<Property> }) => {
				return h(UBadge, { color: "neutral", variant: "soft", size: "sm" }, () => String(row.original.categories));
			}
		},
		{
			accessorKey: "active",
			header: () => "Status",
			cell: ({ row }: { row: Row<Property> }) => {
				const active = row.original.active;
				return h(UBadge, {
					color: active ? "success" : "neutral",
					variant: "soft",
					size: "sm"
				}, () => active ? "Active" : "Inactive");
			}
		},
		{
			accessorKey: "channelManager",
			header: () => "Channel manager",
			cell: ({ row }: { row: Row<Property> }) => {
				const synced = row.original.channelManager;
				return h(UBadge, {
					color: synced ? "success" : "neutral",
					variant: "soft",
					size: "sm"
				}, () => synced ? "Connected" : "Not connected");
			}
		},
		{
			accessorKey: "actions",
			header: "",
			meta: {
				class: {
					td: "w-px",
					th: "w-px"
				}
			},
			cell: ({ row }: { row: Row<Property> }) => {
				return h(SMoreActions, {
					actions: getRowActions(row.original),
					buttonProps: { color: "neutral", variant: "ghost", size: "xs" },
					showDropdownIcon: true
				});
			}
		}
	];

	const columnLabels: Record<string, string> = {
		email: "Email",
		type: "Type",
		units: "Units",
		categories: "Categories",
		active: "Status",
		channelManager: "Channel manager"
	};

	const columnsDropdownItems = computed(() => {
		const api = table.value?.tableApi;
		if (!api) return [];

		return api.getAllColumns()
			.filter((column) => column.getCanHide() && column.id in columnLabels)
			.map((column) => ({
				label: columnLabels[column.id],
				type: "checkbox" as const,
				checked: column.getIsVisible(),
				onUpdateChecked(checked: boolean) {
					api.getColumn(column.id)?.toggleVisibility(!!checked);
				},
				onSelect(event: Event) {
					event.preventDefault();
				}
			}));
	});

	const expandableColumns: TableColumn<Property>[] = [
		{ id: "expand", header: "" },
		{ accessorKey: "name", header: "Property" },
		{ accessorKey: "type", header: "Type" },
		{
			accessorKey: "units",
			header: "Units",
			cell: ({ row }: { row: Row<Property> }) => String(row.original.units)
		}
	];
</script>
