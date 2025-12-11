<template>
	<ShowcasePage
		title="Select"
		description="The USelect component provides a dropdown selection interface with support for multiple colors, variants, and sizes."
	>
		<PropsTable :props="propsData" />

		<template v-for="color in selectColors" :key="color">
			<section class="space-y-4">
				<ProseH3 class="capitalize">
					{{ color }}
				</ProseH3>

				<!-- Variants -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div
						v-for="variant in selectVariants"
						:key="variant"
						class="space-y-2"
					>
						<div class="text-xs font-medium text-muted capitalize">
							{{ variant }}
						</div>
						<USelect
							v-model="selectedValues[`${color}-${variant}`]"
							:color="color"
							:variant="variant"
							:items="options"
							placeholder="Select an option"
						/>
					</div>
				</div>

				<!-- Sizes -->
				<ProseH4>Sizes</ProseH4>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div
						v-for="size in sizes"
						:key="size"
						class="space-y-2"
					>
						<div class="text-xs font-medium text-muted capitalize">
							{{ size }}
						</div>
						<USelect
							v-model="selectedValues[`${color}-${size}`]"
							:color="color"
							:size="size"
							:items="options"
							placeholder="Select an option"
						/>
					</div>
				</div>

				<!-- Disabled -->
				<ProseH4>Disabled</ProseH4>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div
						v-for="size in sizes"
						:key="size"
						class="space-y-2"
					>
						<USelect
							v-model="selectedValues[`${color}-${size}`]"
							:color="color"
							:size="size"
							:items="options"
							placeholder="Select an option"
							disabled
						/>
					</div>
				</div>
			</section>
		</template>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const { sizes } = useConstants();

	// Filter to show ai and learning prominently, plus a few standard colors for comparison
	const selectColors = ["ai", "learning", "primary", "success", "warning", "error"] as const;
	const selectVariants = ["outline", "soft", "subtle", "ghost"] as const;

	// Sample options for the select
	const options = [
		{ label: "Option 1", value: "option-1" },
		{ label: "Option 2", value: "option-2" },
		{ label: "Option 3", value: "option-3" },
		{ label: "Option 4", value: "option-4", disabled: true },
		{ label: "Option 5", value: "option-5" }
	];

	// Store selected values for each select
	const selectedValues = ref<Record<string, string>>({});

	const propsData: PropDefinition[] = [
		{ prop: "items", type: "SelectItem[]", description: "Array of options to display" },
		{ prop: "modelValue", type: "string | number", description: "Selected value (v-model)" },
		{ prop: "placeholder", type: "string", description: "Placeholder text when no option is selected" },
		{ prop: "color", type: "string", description: "Color theme (primary, success, warning, error, ai, learning)" },
		{ prop: "variant", type: "string", description: "Visual variant (outline, soft, subtle, ghost)", default: "outline" },
		{ prop: "size", type: "string", description: "Select size (xs, sm, md, lg, xl)", default: "md" },
		{ prop: "disabled", type: "boolean", description: "Disable the select", default: "false" },
		{ prop: "multiple", type: "boolean", description: "Allow multiple selections", default: "false" }
	];
</script>
