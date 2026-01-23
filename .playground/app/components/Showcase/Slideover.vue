<template>
	<ShowcasePage
		title="Slideover"
		description="The USlideover component displays content in a sliding panel overlay from any edge of the viewport."
	>
		<PropsTable :props="propsData" />

		<!-- Basic -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic</ProseH3>
			<p class="text-muted">
				A simple slideover with a trigger button and body content.
			</p>
			<USlideover>
				<UButton label="Open Slideover" />
				<template #body>
					<p>This is the slideover body content.</p>
				</template>
			</USlideover>
		</section>

		<!-- Title & Description -->
		<section id="title-description" class="space-y-4">
			<ProseH3>Title & Description</ProseH3>
			<p class="text-muted">
				Use the <code>title</code> and <code>description</code> props for a standard header.
			</p>
			<USlideover
				title="Panel Title"
				description="This is a description that provides context about the panel content."
			>
				<UButton label="With Title" />
				<template #body>
					<p>Additional slideover content goes here.</p>
				</template>
				<template #footer>
					<div class="flex justify-end gap-2">
						<UButton label="Cancel" color="neutral" variant="outline" />
						<UButton label="Save" color="primary" />
					</div>
				</template>
			</USlideover>
		</section>

		<!-- Slots -->
		<section id="slots" class="space-y-4">
			<ProseH3>Slots</ProseH3>
			<p class="text-muted">
				Customize the slideover using <code>header</code>, <code>body</code>, and <code>footer</code> slots.
			</p>
			<USlideover>
				<UButton label="Custom Slots" />
				<template #header>
					<div class="flex items-center gap-2">
						<UIcon name="i-heroicons-cog-6-tooth" class="size-5 text-primary" />
						<span class="font-semibold">Settings Panel</span>
					</div>
				</template>
				<template #body>
					<div class="space-y-4">
						<p>This slideover uses custom slot content for all sections.</p>
						<UInput placeholder="Enter a value..." />
						<USelect
							:items="['Option 1', 'Option 2', 'Option 3']"
							placeholder="Select an option"
						/>
					</div>
				</template>
				<template #footer>
					<div class="flex justify-between items-center w-full">
						<UButton label="Reset" color="neutral" variant="ghost" />
						<UButton label="Apply" color="primary" />
					</div>
				</template>
			</USlideover>
		</section>

		<!-- Side -->
		<section id="side" class="space-y-4">
			<ProseH3>Side</ProseH3>
			<p class="text-muted">
				Use the <code>side</code> prop to control which edge the panel slides from.
			</p>
			<div class="flex flex-wrap gap-2">
				<USlideover
					v-for="position in sides"
					:key="position"
					:side="position"
					:title="`${position.charAt(0).toUpperCase() + position.slice(1)} Panel`"
				>
					<UButton :label="position.charAt(0).toUpperCase() + position.slice(1)" />
					<template #body>
						<p>This panel slides in from the {{ position }}.</p>
					</template>
				</USlideover>
			</div>
		</section>

		<!-- Inset -->
		<section id="inset" class="space-y-4">
			<ProseH3>Inset</ProseH3>
			<p class="text-muted">
				Use the <code>inset</code> prop for a variant with rounded corners and margin from viewport edges.
			</p>
			<USlideover
				inset
				title="Inset Panel"
				description="This panel has rounded corners and inset margins."
			>
				<UButton label="Open Inset" />
				<template #body>
					<p>The inset variant provides a floating panel appearance.</p>
				</template>
			</USlideover>
		</section>

		<!-- Wide -->
		<section id="wide" class="space-y-4">
			<ProseH3>Wide</ProseH3>
			<p class="text-muted">
				Use the <code>:ui</code> prop to customize the panel width for larger content areas.
			</p>
			<USlideover
				title="Wide Panel"
				description="This panel spans 80% of the viewport width."
				:ui="{ content: 'max-w-[80vw] w-[80vw]' }"
			>
				<UButton label="Open Wide Panel" />
				<template #body>
					<div class="space-y-4">
						<p>This slideover has a custom width of 80vw, useful for displaying large forms, data tables, or detailed content.</p>
						<div class="grid grid-cols-3 gap-4">
							<UCard v-for="i in 6" :key="i">
								<p class="text-sm text-muted">
									Card {{ i }}
								</p>
							</UCard>
						</div>
					</div>
				</template>
			</USlideover>
		</section>

		<!-- Nested -->
		<section id="nested" class="space-y-4">
			<ProseH3>Nested</ProseH3>
			<p class="text-muted">
				Slideovers can be nested inside each other for multi-step flows.
			</p>
			<USlideover title="Parent Panel">
				<UButton label="Open Parent" />
				<template #body>
					<p class="mb-4">
						This is the parent slideover. Click below to open a nested panel.
					</p>
					<USlideover title="Nested Panel">
						<UButton label="Open Nested" color="secondary" />
						<template #body>
							<p>This is the nested slideover content.</p>
						</template>
					</USlideover>
				</template>
			</USlideover>
		</section>

		<!-- Dismissible -->
		<section id="dismissible" class="space-y-4">
			<ProseH3>Dismissible</ProseH3>
			<p class="text-muted">
				Set <code>:dismissible="false"</code> to prevent closing by clicking outside or pressing Escape.
			</p>
			<USlideover
				v-model:open="nonDismissibleOpen"
				:dismissible="false"
				title="Non-Dismissible Panel"
				description="You must use the button to close this panel."
			>
				<UButton label="Open Non-Dismissible" />
				<template #body>
					<p>Click outside or press Escape - it won't close.</p>
				</template>
				<template #footer>
					<div class="flex justify-end">
						<UButton
							label="Close Panel"
							color="primary"
							@click="nonDismissibleOpen = false"
						/>
					</div>
				</template>
			</USlideover>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const nonDismissibleOpen = ref(false);

	const sides = ["left", "right", "top", "bottom"] as const;

	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "Panel title displayed in the header" },
		{ prop: "description", type: "string", description: "Description text below the title" },
		{ prop: "open", type: "boolean", description: "Control panel visibility (v-model:open)", default: "false" },
		{ prop: "side", type: "\"left\" | \"right\" | \"top\" | \"bottom\"", description: "Edge of viewport the panel slides from", default: "\"right\"" },
		{ prop: "inset", type: "boolean", description: "Display with rounded corners and margin from edges", default: "false" },
		{ prop: "dismissible", type: "boolean", description: "Allow closing via overlay click or Escape key", default: "true" },
		{ prop: "overlay", type: "boolean", description: "Show the backdrop overlay", default: "true" },
		{ prop: "transition", type: "boolean", description: "Enable open/close animations", default: "true" },
		{ prop: "modal", type: "boolean", description: "Render as modal (traps focus, adds aria attributes)", default: "true" },
		{ prop: "close", type: "boolean | object", description: "Show close button in header", default: "true" },
		{ prop: "closeIcon", type: "string", description: "Icon for the close button", default: "i-lucide-x" }
	];
</script>
