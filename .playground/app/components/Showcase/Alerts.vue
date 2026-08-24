<template>
	<ShowcasePage
		title="Alerts"
		description="SAlert is the Smartness alert of choice; UAlert stays available as the underlying Nuxt UI primitive."
	>
		<section id="salert" class="space-y-4">
			<ProseH3>SAlert (recommended)</ProseH3>
			<p class="text-sm text-muted">
				<strong>Prefer <code>SAlert</code> over <code>UAlert</code></strong> for inline feedback:
				it ships the Smartness look (compact <code>w-fit</code> surface, <code>soft</code> variant by
				default like <code>UBadge</code>, truncated title) plus a built-in slide-in/out transition driven
				by the <code>show</code> prop. The <code>#default</code> slot feeds the text and the
				<code>#actions</code> slot is the only source of actions — drop in <code>UButton</code>,
				<code>SMoreActions</code>, etc. Reach for a bare <code>UAlert</code> only when you need a
				full-width block, the <code>actions</code> prop, or the <code>ai</code> / <code>learning</code>
				gradient outlines.
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

		<section id="salert-colors" class="space-y-4">
			<ProseH3>SAlert — colors</ProseH3>
			<p class="text-sm text-muted">
				The <code>color</code> prop drives the surface and the text, exactly like <code>UBadge</code>.
				Default is <code>secondary</code>.
			</p>

			<div class="flex flex-wrap items-center gap-3">
				<SAlert
					v-for="color in sAlertColors"
					:key="color"
					:color="color"
					:title="`${color} alert`"
					icon="ph:info"
				/>
			</div>
		</section>

		<section id="salert-variants" class="space-y-4">
			<ProseH3>SAlert — variants</ProseH3>
			<p class="text-sm text-muted">
				All <code>UAlert</code> variants are forwarded. <code>soft</code> is the default.
			</p>

			<div class="flex flex-wrap items-center gap-3">
				<SAlert
					v-for="variant in alertVariants"
					:key="variant"
					:variant="variant"
					color="secondary"
					:title="`secondary - ${variant}`"
					icon="ph:info"
				/>
			</div>
			<div class="flex flex-wrap items-center gap-3">
				<SAlert
					v-for="variant in alertVariants"
					:key="variant"
					:variant="variant"
					color="warning"
					:title="`warning - ${variant}`"
					icon="ph:warning-circle"
				/>
			</div>
		</section>

		<section id="salert-tweaks" class="space-y-4">
			<ProseH3>SAlert — actions & tweaks</ProseH3>
			<p class="text-sm text-muted">
				Text can come from the <code>#default</code> slot, actions live in <code>#actions</code>, and the
				<code>ui</code> prop appends per-slot classes on top of the baseline (it extends, it does not
				replace). Use <code>@close</code> together with <code>close</code> to drive the transition out.
			</p>

			<div class="flex flex-wrap items-start gap-3">
				<SAlert color="success" icon="ph:check-circle">
					Rates published successfully
				</SAlert>

				<SAlert
					color="error"
					icon="ph:warning-circle"
					title="Sync failed"
					description="The channel manager did not respond."
					orientation="vertical"
				>
					<template #actions>
						<UButton label="Retry" size="xs" color="error" variant="soft" icon="ph:arrows-clockwise" />
					</template>
				</SAlert>

				<SAlert
					:show="showClosable"
					color="info"
					icon="ph:info"
					title="This alert can be dismissed"
					close
					@close="showClosable = false"
				/>

				<SAlert
					color="primary"
					icon="ph:sparkle"
					title="Full-width alert, title max-width lifted via the ui prop"
					:ui="{ root: 'w-full', title: 'max-w-none' }"
				/>
			</div>

			<UButton
				v-if="!showClosable"
				label="Restore dismissed alert"
				size="xs"
				color="neutral"
				variant="ghost"
				icon="ph:arrow-counter-clockwise"
				@click="showClosable = true"
			/>
		</section>

		<USeparator />

		<section id="ualert" class="space-y-4">
			<ProseH3>UAlert</ProseH3>
			<p class="text-sm text-muted">
				The underlying Nuxt UI primitive, kept for full-width blocks and for the Smartness
				<code>ai</code> / <code>learning</code> gradient outlines. For everything else prefer
				<code>SAlert</code> above.
			</p>

			<PropsTable :props="propsData" />
		</section>

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
	const showClosable = ref(true);

	const sAlertColors = ["secondary", "primary", "info", "success", "warning", "error"] as const;
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
		{ prop: "color", type: "AlertProps['color']", description: "Forwarded to UAlert — drives surface and text", default: "secondary" },
		{ prop: "variant", type: "AlertProps['variant']", description: "Forwarded to UAlert — same default as UBadge", default: "soft" },
		{ prop: "orientation", type: "'horizontal' | 'vertical'", description: "Actions placement relative to the content", default: "horizontal" },
		{ prop: "close / closeIcon", type: "AlertProps['close']", description: "Dismiss button, paired with the @close event" },
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
