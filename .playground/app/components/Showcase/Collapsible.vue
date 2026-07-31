<template>
	<ShowcasePage
		title="Collapsible"
		description="The SCollapsible component is a single, always-collapsible disclosure panel: a bordered card with an elevated header and a content slot. Formerly named SAccordion."
	>
		<PropsTable :props="propsData" />

		<section
			id="basic"
			class="space-y-4"
		>
			<ProseH3>Basic</ProseH3>
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
				<SCollapsible label="4 periods selected" default-open>
					<div class="space-y-3">
						<div
							v-for="period in periods"
							:key="period"
							class="text-default"
						>
							{{ period }}
						</div>
					</div>
				</SCollapsible>

				<SCollapsible label="Collapsed by default" icon="ph:calendar">
					<p class="text-muted">
						Closed on load. Click the header to expand. Built on
						<code>UCollapsible</code>, always single.
					</p>
				</SCollapsible>

				<SCollapsible label="Disabled" disabled>
					<p class="text-muted">
						You can't reach me.
					</p>
				</SCollapsible>
			</div>
		</section>

		<section
			id="custom-header"
			class="space-y-4"
		>
			<ProseH3>Custom header via slot</ProseH3>
			<div class="max-w-md">
				<SCollapsible>
					<template #label>
						<span class="flex items-center gap-2">
							Periods <UBadge>4</UBadge>
						</span>
					</template>

					<p class="text-muted">
						The header text is fully slottable via <code>#label</code>.
					</p>
				</SCollapsible>
			</div>
		</section>

		<section
			id="controlled"
			class="space-y-4"
		>
			<ProseH3>Controlled state</ProseH3>
			<div class="space-y-3 max-w-md">
				<USwitch
					v-model="open"
					label="Open"
				/>
				<SCollapsible
					v-model:open="open"
					label="Controlled"
				>
					<p class="text-muted">
						Bound via <code>v-model:open</code>.
					</p>
				</SCollapsible>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const open = ref(false);

	const periods = [
		"30/03/2026 → 26/04/2026",
		"27/04/2026 → 31/05/2026",
		"01/06/2026 → 15/07/2026",
		"16/07/2026 → 28/07/2026"
	];

	const propsData: PropDefinition[] = [
		{ prop: "label", type: "string", description: "Text shown in the trigger header. Overridden by the `#label` slot." },
		{ prop: "icon", type: "string", description: "Optional leading icon in the header." },
		{ prop: "trailingIcon", type: "string", description: "Trailing chevron icon (rotates 180° when open).", default: "ph:caret-down" },
		{ prop: "defaultOpen", type: "boolean", description: "Start expanded (uncontrolled). Ignored when `v-model:open` is bound.", default: "false" },
		{ prop: "disabled", type: "boolean", description: "Disable toggling.", default: "false" },
		{ prop: "unmountOnHide", type: "boolean", description: "Unmount the body when collapsed.", default: "true" },
		{ prop: "ui", type: "{ root?, header?, content?, body? }", description: "Class overrides (tailwind-merged)." },
		{ prop: "v-model:open", type: "boolean", description: "Controlled open state." }
	];
</script>
