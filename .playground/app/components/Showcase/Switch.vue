<template>
	<ShowcasePage
		title="Switch"
		description="The USwitch component provides a toggle control with support for multiple colors, variants, and sizes."
	>
		<PropsTable :props="propsData" />

		<template v-for="color in colors" :key="color">
			<section class="space-y-4">
				<ProseH3 class="capitalize">
					{{ color }}
				</ProseH3>

				<!-- Variants -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<div
						v-for="variant in variants"
						:key="variant"
						class="space-y-2"
					>
						<div class="text-xs font-medium text-muted capitalize">
							{{ variant }}
						</div>
						<div class="flex items-center gap-2">
							<USwitch
								v-model="state"
								:color="color"
								:variant="variant"
							/>
							<span class="text-sm text-muted">{{ state ? "On" : "Off" }}</span>
						</div>
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
						<div class="flex items-center gap-2">
							<USwitch
								v-model="state"
								:color="color"
								:size="size"
							/>
							<span class="text-sm text-muted">{{ state ? "On" : "Off" }}</span>
						</div>
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
						<div class="text-xs font-medium text-muted capitalize">
							{{ size }}
						</div>
						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2">
								<USwitch
									:model-value="false"
									:color="color"
									:size="size"
									disabled
								/>
								<span class="text-sm text-muted">Disabled Off</span>
							</div>
							<div class="flex items-center gap-2">
								<USwitch
									:model-value="true"
									:color="color"
									:size="size"
									disabled
								/>
								<span class="text-sm text-muted">Disabled On</span>
							</div>
						</div>
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

	const { colors, sizes, variants } = useConstants();

	// Store switch state
	const state = ref(false);

	const propsData: PropDefinition[] = [
		{ prop: "modelValue", type: "boolean", description: "Switch state (v-model)" },
		{ prop: "color", type: "string", description: "Color theme (primary, success, warning, error, ai, learning)" },
		{ prop: "variant", type: "string", description: "Visual variant", default: "solid" },
		{ prop: "size", type: "string", description: "Switch size (xs, sm, md, lg, xl)", default: "md" },
		{ prop: "disabled", type: "boolean", description: "Disable the switch", default: "false" },
		{ prop: "loading", type: "boolean", description: "Show loading state", default: "false" },
		{ prop: "onIcon", type: "string", description: "Icon to show when switch is on" },
		{ prop: "offIcon", type: "string", description: "Icon to show when switch is off" }
	];
</script>
