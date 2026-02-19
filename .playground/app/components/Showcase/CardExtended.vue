<template>
	<ShowcasePage
		title="Card Extended"
		description="SCardExtended displays content in a bordered container. It supports three layout types (filled, draggable, container), four sizes, and default/selected/disabled states."
	>
		<PropsTable :props="propsData" />

		<!-- Matrix: sizes (y) × feature combinations (x) -->
		<section id="matrix" class="space-y-4">
			<ProseH2>Feature matrix</ProseH2>
			<p class="text-sm text-muted">
				Rows = sizes, columns = progressive feature combinations for the filled type.
			</p>

			<div class="overflow-x-auto">
				<table class="w-full border-separate border-spacing-3">
					<thead>
						<tr>
							<th class="text-xs font-mono text-muted text-left w-12" />
							<th
								v-for="col in matrixColumns"
								:key="col.label"
								class="text-xs font-mono text-muted text-left font-normal pb-2"
							>
								{{ col.label }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="size in sizes" :key="size">
							<td class="text-xs font-mono text-muted align-top pt-3">
								{{ size }}
							</td>
							<td v-for="col in matrixColumns" :key="col.label" class="align-top">
								<SCardExtended
									:size="size"
									:label="col.label ? 'Label' : undefined"
									:badge="col.badge ? 'Badge' : undefined"
									:description="col.description ? 'Lorem ipsum dolor sit amet consectetur.' : undefined"
									:avatar="col.avatar ? { icon: 'ph:image-square', color: 'neutral', variant: 'soft' } : undefined"
									:actions="col.actions ? [
										{ icon: 'ph:diamond', label: 'Action 1' },
										{ icon: 'ph:diamond', label: 'Action 2' },
										{ icon: 'ph:diamond', label: 'Action 3' },
									] : undefined"
									class="min-w-[260px]"
								>
									<template v-if="col.footer" #footer>
										<UButton label="Button" variant="ghost" size="xs" color="neutral" />
										<div class="flex gap-2">
											<UButton label="Button" variant="outline" size="xs" color="neutral" />
											<UButton label="Button" variant="solid" size="xs" color="primary" />
										</div>
									</template>
								</SCardExtended>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Draggable matrix -->
		<section id="draggable" class="space-y-4">
			<ProseH2>Draggable</ProseH2>
			<p class="text-sm text-muted">
				Card with a drag handle. No avatar or radio.
			</p>

			<div class="overflow-x-auto">
				<table class="w-full border-separate border-spacing-3">
					<thead>
						<tr>
							<th class="text-xs font-mono text-muted text-left w-12" />
							<th class="text-xs font-mono text-muted text-left font-normal pb-2">
								Label only
							</th>
							<th class="text-xs font-mono text-muted text-left font-normal pb-2">
								Label + Badge
							</th>
							<th class="text-xs font-mono text-muted text-left font-normal pb-2">
								Label + Badge + Desc
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="size in sizes" :key="size">
							<td class="text-xs font-mono text-muted align-top pt-3">
								{{ size }}
							</td>
							<td class="align-top">
								<SCardExtended type="draggable" :size="size" label="Label" class="min-w-[220px]" />
							</td>
							<td class="align-top">
								<SCardExtended type="draggable" :size="size" label="Label" badge="Badge" class="min-w-[220px]" />
							</td>
							<td class="align-top">
								<SCardExtended
									type="draggable"
									:size="size"
									label="Label"
									badge="Badge"
									description="Lorem ipsum dolor sit amet consectetur."
									class="min-w-[220px]"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Container -->
		<section id="container" class="space-y-4">
			<ProseH2>Container only</ProseH2>
			<p class="text-sm text-muted">
				Bare card shell with the default slot. Supports all sizes plus <code>no-padding</code>.
			</p>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div v-for="s in [...sizes, 'no-padding'] as const" :key="s" class="space-y-1">
					<span class="text-xs font-mono text-muted">{{ s }}</span>
					<SCardExtended type="container" :size="s">
						<div class="flex items-center justify-center h-12 text-xs text-muted">
							Slot content
						</div>
					</SCardExtended>
				</div>
			</div>
		</section>

		<!-- States -->
		<section id="states" class="space-y-4">
			<ProseH2>States</ProseH2>
			<p class="text-sm text-muted">
				Default, selected, and disabled across all three types.
			</p>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<template v-for="type in types" :key="type">
					<div class="space-y-3">
						<p class="text-xs font-mono text-muted capitalize">
							{{ type }}
						</p>
						<SCardExtended
							:type="type"
							label="Default"
							badge="Badge"
							description="Default state card."
							:avatar="type === 'filled' ? { icon: 'ph:image-square', color: 'neutral', variant: 'soft' } : undefined"
						/>
						<SCardExtended
							:type="type"
							label="Selected"
							badge="Badge"
							description="Selected state card."
							:avatar="type === 'filled' ? { icon: 'ph:check-circle', color: 'secondary', variant: 'soft' } : undefined"
							selected
						/>
						<SCardExtended
							:type="type"
							label="Disabled"
							badge="Badge"
							description="Disabled state card."
							:avatar="type === 'filled' ? { icon: 'ph:image-square', color: 'neutral', variant: 'soft' } : undefined"
							disabled
						/>
					</div>
				</template>
			</div>
		</section>

		<!-- Slots -->
		<section id="slots" class="space-y-4">
			<ProseH2>Slots</ProseH2>

			<ProseH3>Custom label slot</ProseH3>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<SCardExtended
					description="A custom label with a status indicator."
					:avatar="{ icon: 'ph:image-square', color: 'neutral', variant: 'soft' }"
				>
					<template #label>
						<span class="flex items-center gap-1.5">
							<span class="size-2 rounded-full bg-success-500 inline-block" />
							<span class="text-xs font-semibold text-primary-900">Custom label</span>
						</span>
					</template>
				</SCardExtended>
			</div>

			<ProseH3>Custom leading slot</ProseH3>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<SCardExtended
					label="Custom leading"
					badge="Badge"
					description="A checkbox replaces the avatar."
				>
					<template #leading>
						<UCheckbox class="shrink-0 mt-0.5" />
					</template>
				</SCardExtended>
			</div>

			<ProseH3>No-padding container with full custom content</ProseH3>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<SCardExtended type="container" size="no-padding">
					<img
						src="https://picsum.photos/seed/card/440/120"
						class="w-full rounded-t-lg object-cover h-28"
						alt="Card cover"
					>
					<div class="p-4 space-y-1">
						<p class="font-semibold text-sm text-primary-900">
							Full custom layout
						</p>
						<p class="text-xs text-muted">
							Container with no padding and custom content via the default slot.
						</p>
					</div>
				</SCardExtended>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const types = ["filled", "draggable", "container"] as const;
	const sizes = ["xs", "sm", "md", "lg"] as const;

	const matrixColumns = [
		{ label: "Icon + Radio + Label", avatar: true, badge: false, description: false, actions: false, footer: false },
		{ label: "… + Badge", avatar: true, badge: true, description: false, actions: false, footer: false },
		{ label: "… + Description", avatar: true, badge: true, description: true, actions: false, footer: false },
		{ label: "… + Actions", avatar: true, badge: true, description: true, actions: true, footer: false },
		{ label: "… + Footer", avatar: true, badge: true, description: true, actions: true, footer: true }
	];

	const propsData: PropDefinition[] = [
		{ prop: "type", type: "'filled' | 'draggable' | 'container'", description: "Layout variant of the card", default: "filled" },
		{ prop: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'no-padding'", description: "Internal padding scale (no-padding only for container type)", default: "md" },
		{ prop: "label", type: "string", description: "Card title text shown in the header" },
		{ prop: "description", type: "string", description: "Secondary text rendered below the label" },
		{ prop: "badge", type: "string | BadgeProps", description: "Badge next to the label. Pass a string or full BadgeProps" },
		{ prop: "avatar", type: "AvatarProps", description: "Avatar displayed as the leading element (filled type only)" },
		{ prop: "actions", type: "SCardExtendedAction[]", description: "Icon-only button actions in the card header (filled type only)" },
		{ prop: "selected", type: "boolean", description: "Applies the selected visual state (radio filled + secondary border + tinted bg)", default: "false" },
		{ prop: "disabled", type: "boolean", description: "Makes the card non-interactive and visually dimmed", default: "false" },
		{ prop: "as", type: "string", description: "Override the root HTML element. Defaults to button (filled) or div (others)" }
	];
</script>
