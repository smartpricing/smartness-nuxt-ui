<template>
	<ShowcasePage
		title="Alerts"
		description="The UAlert component displays contextual feedback messages with various colors and variants."
	>
		<PropsTable :props="propsData" />

		<template v-for="color in alertColors" :key="color">
			<section class="space-y-4">
				<ProseH3 class="capitalize">
					{{ color }}
				</ProseH3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<template v-for="variant in alertVariants" :key="variant">
						<UAlert
							:color="color"
							:variant="variant"
							:title="`${color} - ${variant}`"
							:description="`This is a ${variant} alert with ${color} color.`"
							icon="i-lucide-info"
						/>
					</template>
				</div>
			</section>
		</template>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// Filter to show ai and learning prominently, plus a few standard colors for comparison
	const alertColors = ["ai", "learning", "primary", "info", "success", "warning", "error"] as const;
	const alertVariants = ["solid", "soft", "subtle", "outline"] as const;

	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "The alert title" },
		{ prop: "description", type: "string", description: "The alert description" },
		{ prop: "icon", type: "string", description: "Icon name to display" },
		{ prop: "color", type: "string", description: "Color theme (primary, success, warning, error, info, ai, learning)" },
		{ prop: "variant", type: "string", description: "Visual variant (solid, soft, subtle, outline)", default: "soft" },
		{ prop: "close", type: "boolean", description: "Show close button", default: "false" }
	];
</script>
