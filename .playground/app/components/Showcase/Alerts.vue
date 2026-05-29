<template>
	<ShowcasePage
		title="Alerts"
		description="The UAlert component displays contextual feedback messages with various colors and variants."
	>
		<section id="salert" class="space-y-4">
			<ProseH3>SAlert</ProseH3>
			<p class="text-sm text-muted">
				Opinionated wrapper around <code>UAlert</code> with a built-in slide-in/out transition.
				It renders a secondary-light surface with primary text regardless of the chosen
				<code>color</code>/<code>variant</code>. The <code>#default</code> slot feeds the text and
				the <code>#actions</code> slot is the only source of actions — drop in
				<code>UButton</code>, <code>SMoreActions</code>, etc. Toggle <code>show</code> to drive the transition.
			</p>

			<PropsTable :props="sAlertPropsData" />

			<div class="flex items-center gap-3">
				<UButton
					:label="showSAlert ? 'Hide' : 'Show'"
					color="primary"
					variant="soft"
					@click="showSAlert = !showSAlert"
				/>
				<SAlert :show="showSAlert" title="You have unsaved changes" icon="ph:info">
					<template #actions>
						<UButton label="Save" size="xs" color="primary" />
						<UButton
							icon="ph:x"
							size="xs"
							color="neutral"
							variant="ghost"
							@click="showSAlert = false"
						/>
					</template>
				</SAlert>
			</div>
		</section>

		<USeparator />

		<PropsTable :props="propsData" />

		<template v-for="color in alertColors" :key="color">
			<section :id="color" class="space-y-4">
				<ProseH3 class="capitalize">
					{{ color }}
				</ProseH3>
				<template v-for="bg in backgrounds" :key="bg.label">
					<p class="text-sm text-muted font-medium">
						Background: <code>{{ bg.label }}</code>
					</p>
					<div
						class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg"
						:style="{ backgroundColor: bg.color }"
					>
						<template v-for="variant in alertVariants" :key="variant">
							<UAlert
								:color="color"
								:variant="variant"
								:title="`${color} - ${variant}`"
								:description="`This is a ${variant} alert with ${color} color.`"
								icon="ph:info"
							/>
						</template>
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

	const showSAlert = ref(true);

	const alertColors = ["ai", "learning", "primary", "info", "success", "warning", "error"] as const;
	const alertVariants = ["solid", "soft", "subtle", "outline"] as const;
	const backgrounds = [
		{ label: "default", color: "transparent" },
		{ label: "#eeeeee", color: "#eeeeee" },
		{ label: "#000000", color: "#000000" }
	];

	const sAlertPropsData: PropDefinition[] = [
		{ prop: "show", type: "boolean", description: "Drives the built-in slide transition (mount/unmount)", default: "true" },
		{ prop: "title / description", type: "string", description: "Forwarded to UAlert (or use the #default slot for the text)" },
		{ prop: "icon", type: "string", description: "Leading icon name" },
		{ prop: "color", type: "AlertProps['color']", description: "Forwarded to UAlert — text stays primary regardless", default: "secondary" },
		{ prop: "variant", type: "AlertProps['variant']", description: "Forwarded to UAlert", default: "subtle" },
		{ prop: "orientation", type: "'horizontal' | 'vertical'", description: "Actions placement relative to the content", default: "horizontal" },
		{ prop: "ui", type: "AlertProps['ui']", description: "Per-slot classes appended to (not replacing) the baseline" }
	];

	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "The alert title" },
		{ prop: "description", type: "string", description: "The alert description" },
		{ prop: "icon", type: "string", description: "Icon name to display" },
		{ prop: "color", type: "string", description: "Color theme (primary, success, warning, error, info, ai, learning)" },
		{ prop: "variant", type: "string", description: "Visual variant (solid, soft, subtle, outline)", default: "soft" },
		{ prop: "close", type: "boolean", description: "Show close button", default: "false" }
	];
</script>
