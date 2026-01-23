<template>
	<ShowcasePage
		title="Modal"
		description="The UModal component displays content in an overlay dialog with customizable behavior and appearance."
	>
		<PropsTable :props="propsData" />

		<!-- Basic -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic</ProseH3>
			<p class="text-muted">
				A simple modal with a trigger button and body content.
			</p>
			<UModal>
				<UButton label="Open Modal" />
				<template #body>
					<p>This is the modal body content.</p>
				</template>
			</UModal>
		</section>

		<!-- Title & Description -->
		<section id="title-description" class="space-y-4">
			<ProseH3>Title & Description</ProseH3>
			<p class="text-muted">
				Use the <code>title</code> and <code>description</code> props for a standard header.
			</p>
			<UModal
				title="Confirm Action"
				description="Are you sure you want to proceed with this action?"
			>
				<UButton label="With Title" />
				<template #body>
					<p>Additional modal content goes here.</p>
				</template>
				<template #footer>
					<div class="flex justify-end gap-2">
						<UButton label="Cancel" color="neutral" variant="outline" />
						<UButton label="Confirm" color="primary" />
					</div>
				</template>
			</UModal>
		</section>

		<!-- Slots -->
		<section id="slots" class="space-y-4">
			<ProseH3>Slots</ProseH3>
			<p class="text-muted">
				Customize the modal using <code>header</code>, <code>body</code>, and <code>footer</code> slots.
			</p>
			<UModal>
				<UButton label="Custom Slots" />
				<template #header>
					<div class="flex items-center gap-2">
						<UIcon name="i-heroicons-sparkles" class="size-5 text-primary" />
						<span class="font-semibold">Custom Header</span>
					</div>
				</template>
				<template #body>
					<div class="space-y-4">
						<p>This modal uses custom slot content for all sections.</p>
						<UInput placeholder="Enter something..." />
					</div>
				</template>
				<template #footer>
					<div class="flex justify-between items-center w-full">
						<span class="text-sm text-muted">Step 1 of 3</span>
						<div class="flex gap-2">
							<UButton label="Back" color="neutral" variant="ghost" />
							<UButton label="Next" color="primary" />
						</div>
					</div>
				</template>
			</UModal>
		</section>

		<!-- Fullscreen -->
		<section id="fullscreen" class="space-y-4">
			<ProseH3>Fullscreen</ProseH3>
			<p class="text-muted">
				Use the <code>fullscreen</code> prop to make the modal fill the entire viewport.
			</p>
			<UModal
				fullscreen
				title="Fullscreen Modal"
				description="This modal takes up the entire screen."
			>
				<UButton label="Open Fullscreen" />
				<template #body>
					<div class="flex items-center justify-center h-64">
						<p class="text-lg text-muted">Fullscreen content area</p>
					</div>
				</template>
			</UModal>
		</section>

		<!-- Scrollable -->
		<section id="scrollable" class="space-y-4">
			<ProseH3>Scrollable</ProseH3>
			<p class="text-muted">
				Use the <code>scrollable</code> prop to enable scrolling for long content.
			</p>
			<UModal
				scrollable
				title="Scrollable Content"
				description="The body content can scroll independently."
			>
				<UButton label="Open Scrollable" />
				<template #body>
					<div class="space-y-4">
						<p v-for="i in 20" :key="i">
							This is paragraph {{ i }} of the scrollable content. Lorem ipsum dolor sit amet,
							consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
						</p>
					</div>
				</template>
				<template #footer>
					<div class="flex justify-end">
						<UButton label="Close" color="primary" />
					</div>
				</template>
			</UModal>
		</section>

		<!-- Nested -->
		<section id="nested" class="space-y-4">
			<ProseH3>Nested</ProseH3>
			<p class="text-muted">
				Modals can be nested inside each other for multi-step flows.
			</p>
			<UModal title="Parent Modal">
				<UButton label="Open Parent" />
				<template #body>
					<p class="mb-4">This is the parent modal. Click below to open a nested modal.</p>
					<UModal title="Nested Modal">
						<UButton label="Open Nested" color="secondary" />
						<template #body>
							<p>This is the nested modal content.</p>
						</template>
					</UModal>
				</template>
			</UModal>
		</section>

		<!-- Dismissible -->
		<section id="dismissible" class="space-y-4">
			<ProseH3>Dismissible</ProseH3>
			<p class="text-muted">
				Set <code>:dismissible="false"</code> to prevent closing by clicking outside or pressing Escape.
			</p>
			<UModal
				v-model:open="nonDismissibleOpen"
				:dismissible="false"
				title="Non-Dismissible Modal"
				description="You must use the button to close this modal."
			>
				<UButton label="Open Non-Dismissible" />
				<template #body>
					<p>Click outside or press Escape - it won't close.</p>
				</template>
				<template #footer>
					<div class="flex justify-end">
						<UButton
							label="Close Modal"
							color="primary"
							@click="nonDismissibleOpen = false"
						/>
					</div>
				</template>
			</UModal>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const nonDismissibleOpen = ref(false);

	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "Modal title displayed in the header" },
		{ prop: "description", type: "string", description: "Description text below the title" },
		{ prop: "open", type: "boolean", description: "Control modal visibility (v-model:open)", default: "false" },
		{ prop: "fullscreen", type: "boolean", description: "Make modal fill the entire viewport", default: "false" },
		{ prop: "scrollable", type: "boolean", description: "Enable scrolling for long body content", default: "false" },
		{ prop: "dismissible", type: "boolean", description: "Allow closing via overlay click or Escape key", default: "true" },
		{ prop: "overlay", type: "boolean", description: "Show the backdrop overlay", default: "true" },
		{ prop: "transition", type: "boolean", description: "Enable open/close animations", default: "true" },
		{ prop: "close", type: "boolean | object", description: "Show close button in header", default: "true" },
		{ prop: "closeIcon", type: "string", description: "Icon for the close button", default: "i-lucide-x" }
	];
</script>
