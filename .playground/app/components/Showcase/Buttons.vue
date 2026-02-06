<template>
	<ShowcasePage
		title="Buttons"
		description="The UButton component is used to trigger actions. It supports multiple colors, variants, and sizes."
	>
		<PropsTable :props="propsData" />

		<template v-for="color in colors" :key="color">
			<section :id="color" class="space-y-4">
				<ProseH3 class="capitalize">
					{{ color }}
				</ProseH3>
				<template v-for="variant in variants" :key="variant">
					<div class="space-y-2">
						<ProseH4 class="capitalize text-muted">
							{{ variant }}
						</ProseH4>
						<div class="flex flex-wrap items-center gap-3">
							<UButton
								:color="color"
								:variant="variant"
								icon="ph:diamond-bold"
							/>
							<UButton
								v-for="size in sizes"
								:key="size"
								:color="color"
								:variant="variant"
								:size="size"
							>
								Button {{ size }}
							</UButton>
							<UButton
								:color="color"
								:variant="variant"
								disabled
							>
								Disabled
							</UButton>
							<UButton
								:color="color"
								:variant="variant"
								icon="ph:diamond-bold"
								disabled
							/>
						</div>
					</div>
				</template>
			</section>
		</template>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const { colors, variants, sizes } = useConstants();

	const propsData: PropDefinition[] = [
		{ prop: "label", type: "string", description: "Button label text" },
		{ prop: "color", type: "string", description: "Color theme (primary, secondary, success, warning, error, info, ai, learning)" },
		{ prop: "variant", type: "string", description: "Visual variant (solid, soft, subtle, ghost, link, outline)", default: "solid" },
		{ prop: "size", type: "string", description: "Button size (xs, sm, md, lg, xl)", default: "md" },
		{ prop: "icon", type: "string", description: "Icon name to display" },
		{ prop: "trailing-icon", type: "string", description: "Icon to display after the label" },
		{ prop: "loading", type: "boolean", description: "Show loading spinner", default: "false" },
		{ prop: "disabled", type: "boolean", description: "Disable the button", default: "false" },
		{ prop: "block", type: "boolean", description: "Full width button", default: "false" }
	];
</script>
