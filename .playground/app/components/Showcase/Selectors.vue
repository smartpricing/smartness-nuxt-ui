<template>
	<ShowcasePage
		title="Selectors"
		description="URadioGroup (single choice) and UCheckboxGroup (multiple choice) share the same list / card / table variants. With the card and table variants the selected option gets a tinted background and a 3px outline."
	>
		<PropsTable :props="propsData" />

		<!-- Colors -->
		<section id="colors" class="space-y-4">
			<ProseH3>Colors</ProseH3>
			<p class="text-sm text-muted">
				Radio and checkbox side by side. With the <code>card</code> and <code>table</code>
				variants the selected option adopts a tinted background and a 3px outline.
			</p>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div
					v-for="color in colors"
					:key="color"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ color }}
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<div class="text-[11px] text-dimmed">
								radio · card
							</div>
							<URadioGroup
								v-model="colorsValue"
								:items="items"
								:color="color"
								variant="card"
							/>
							<div class="text-[11px] text-dimmed">
								radio · table
							</div>
							<URadioGroup
								v-model="colorsValue"
								:items="items"
								:color="color"
								variant="table"
							/>
						</div>
						<div class="space-y-2">
							<div class="text-[11px] text-dimmed">
								checkbox · card
							</div>
							<UCheckboxGroup
								v-model="colorsCheckValue"
								:items="items"
								:color="color"
								variant="card"
							/>
							<div class="text-[11px] text-dimmed">
								checkbox · table
							</div>
							<UCheckboxGroup
								v-model="colorsCheckValue"
								:items="items"
								:color="color"
								variant="table"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Table without indicators -->
		<section id="table-toggle" class="space-y-4">
			<ProseH3>Table without indicators</ProseH3>
			<p class="text-sm text-muted">
				A horizontal <code>table</code> variant with <code>indicator="hidden"</code> works as
				a segmented control — single choice with the radio, multiple choice with the checkbox.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						radio · single choice
					</div>
					<URadioGroup
						v-model="toggleValue"
						:items="yesNoItems"
						color="secondary"
						variant="table"
						orientation="horizontal"
						indicator="hidden"
						class="w-full"
						:ui="{ item: 'flex-1 justify-center' }"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						checkbox · multiple choice
					</div>
					<UCheckboxGroup
						v-model="toggleCheckValue"
						:items="amenitiesItems"
						color="secondary"
						variant="table"
						orientation="horizontal"
						indicator="hidden"
						class="w-full"
						:ui="{ item: 'flex-1 justify-center' }"
					/>
				</div>
			</div>
		</section>

		<!-- Sizes -->
		<section id="sizes" class="space-y-4">
			<ProseH3>Sizes</ProseH3>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div
					v-for="size in sizes"
					:key="size"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ size }}
					</div>
					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<div class="text-[11px] text-dimmed">
								radio · card
							</div>
							<URadioGroup
								v-model="sizesValue"
								:items="items"
								:size="size"
								color="secondary"
								variant="card"
							/>
							<div class="text-[11px] text-dimmed">
								radio · table
							</div>
							<URadioGroup
								v-model="sizesValue"
								:items="items"
								:size="size"
								color="secondary"
								variant="table"
							/>
						</div>
						<div class="space-y-2">
							<div class="text-[11px] text-dimmed">
								checkbox · card
							</div>
							<UCheckboxGroup
								v-model="sizesCheckValue"
								:items="items"
								:size="size"
								color="secondary"
								variant="card"
							/>
							<div class="text-[11px] text-dimmed">
								checkbox · table
							</div>
							<UCheckboxGroup
								v-model="sizesCheckValue"
								:items="items"
								:size="size"
								color="secondary"
								variant="table"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { CheckboxGroupItem, RadioGroupItem } from "@nuxt/ui";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const { sizes } = useConstants();

	const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;

	const items: RadioGroupItem[] = [
		{ label: "Standard room", description: "Up to 2 guests", value: "standard" },
		{ label: "Deluxe room", description: "Up to 4 guests", value: "deluxe" },
		{ label: "Suite", description: "Up to 6 guests", value: "suite" }
	];

	const yesNoItems: RadioGroupItem[] = [
		{ label: "Yes", value: "yes" },
		{ label: "No", value: "no" }
	];

	const amenitiesItems: CheckboxGroupItem[] = [
		{ label: "Wi-Fi", value: "wifi" },
		{ label: "Parking", value: "parking" },
		{ label: "Breakfast", value: "breakfast" }
	];

	const colorsValue = ref("deluxe");
	const colorsCheckValue = ref(["deluxe"]);
	const toggleValue = ref("yes");
	const toggleCheckValue = ref(["wifi"]);
	const sizesValue = ref("deluxe");
	const sizesCheckValue = ref(["deluxe"]);

	const propsData: PropDefinition[] = [
		{ prop: "modelValue", type: "string | string[]", description: "Selected value (v-model) — single for radio, array for checkbox" },
		{ prop: "items", type: "RadioGroupItem[] | CheckboxGroupItem[]", description: "Options to display" },
		{ prop: "variant", type: "string", description: "Layout variant (list, card, table)", default: "list" },
		{ prop: "color", type: "string", description: "Color theme of the selected item", default: "primary" },
		{ prop: "size", type: "string", description: "Control size (xs, sm, md, lg, xl)", default: "md" },
		{ prop: "orientation", type: "string", description: "Layout direction (horizontal, vertical)", default: "vertical" },
		{ prop: "indicator", type: "string", description: "Indicator position (start, end, hidden)", default: "start" },
		{ prop: "disabled", type: "boolean", description: "Disable the whole group", default: "false" }
	];
</script>
