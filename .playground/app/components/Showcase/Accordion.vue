<template>
	<ShowcasePage
		title="Accordion"
		description="The SAccordion component is a restyled UAccordion: stacked collapsible cards with an elevated header, a white body, and a per-item selected state that tints the header with the secondary color."
	>
		<PropsTable :props="propsData" />

		<section
			id="basic"
			class="space-y-4"
		>
			<ProseH3>Basic (single)</ProseH3>
			<p class="text-sm text-muted">
				Same API as <code>UAccordion</code>: one item open at a time, collapsible by default.
			</p>
			<SAccordion
				:items="basicItems"
				default-value="payments"
			/>
		</section>

		<section
			id="multiple"
			class="space-y-4"
		>
			<ProseH3>Multiple</ProseH3>
			<p class="text-sm text-muted">
				Use <code>type="multiple"</code> to allow several items open at once.
			</p>
			<SAccordion
				:items="basicItems"
				type="multiple"
				:default-value="['rooms', 'payments']"
			/>
		</section>

		<section
			id="selected"
			class="space-y-4"
		>
			<ProseH3>Selected items</ProseH3>
			<p class="text-sm text-muted">
				Set <code>selected: true</code> on an item to tint its header with the light secondary color (darkens on hover, like the default gray).
			</p>
			<div class="flex flex-wrap gap-6">
				<USwitch
					v-for="item in selectableItems"
					:key="item.value"
					v-model="selectedState[item.value]"
					:label="`${item.label} selected`"
				/>
			</div>
			<SAccordion
				:items="selectableItemsWithState"
				type="multiple"
			/>
		</section>

		<section
			id="custom-header"
			class="space-y-4"
		>
			<ProseH3>Custom header (slots)</ProseH3>
			<p class="text-sm text-muted">
				The header is fully slottable like the base component: <code>#leading</code>, <code>#default</code> and <code>#trailing</code> receive the item in scope. Avoid interactive buttons inside the header — it is already a button.
			</p>
			<SAccordion
				:items="designItems"
				type="multiple"
			>
				<template #default="{ item }">
					<span class="flex flex-col text-start min-w-0">
						<span class="font-semibold text-highlighted">{{ item.label }}</span>
						<span class="text-sm font-normal text-muted">Optional description</span>
					</span>
				</template>

				<template #leading>
					<UIcon
						name="ph:image"
						class="size-6 shrink-0 text-highlighted"
					/>
				</template>

				<template #trailing="{ item }">
					<span class="ms-auto flex items-center gap-3">
						<UBadge
							color="warning"
							variant="soft"
						>
							Badge
						</UBadge>
						<UBadge
							color="neutral"
							variant="outline"
						>
							Badge
						</UBadge>
						<UIcon
							v-for="i in 3"
							:key="i"
							name="ph:diamond"
							class="size-5 text-muted"
						/>
						<UIcon
							:name="item.trailingIcon || 'ph:caret-down'"
							class="size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
						/>
					</span>
				</template>

				<template #body>
					<div class="h-40 rounded-md bg-burgundy-50" />
				</template>
			</SAccordion>
		</section>

		<section
			id="per-item-slots"
			class="space-y-4"
		>
			<ProseH3>Per-item body slots</ProseH3>
			<p class="text-sm text-muted">
				Set <code>slot</code> on an item and use <code>#&lt;slot&gt;-body</code> to customize a single body.
			</p>
			<SAccordion :items="slottedItems">
				<template #chart-body>
					<div class="flex items-center gap-2 text-muted">
						<UIcon
							name="ph:chart-line"
							class="size-5"
						/>
						Custom body only for this item.
					</div>
				</template>
			</SAccordion>
		</section>

		<section
			id="disabled"
			class="space-y-4"
		>
			<ProseH3>Disabled</ProseH3>
			<p class="text-sm text-muted">
				Per-item via <code>disabled: true</code> on the item, or globally via the <code>disabled</code> prop.
			</p>
			<SAccordion :items="disabledItems" />
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import type { SAccordionItem } from "../../../../app/components/Accordion/types";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const basicItems: SAccordionItem[] = [
		{ label: "Rooms", value: "rooms", content: "Configure room types, capacity and amenities." },
		{ label: "Payments", value: "payments", content: "Payment providers, currencies and invoicing." },
		{ label: "Notifications", value: "notifications", content: "Email and push notification preferences." }
	];

	const selectableItems = [
		{ label: "Rooms", value: "rooms", content: "Configure room types, capacity and amenities." },
		{ label: "Payments", value: "payments", content: "Payment providers, currencies and invoicing." },
		{ label: "Notifications", value: "notifications", content: "Email and push notification preferences." }
	];

	const selectedState = reactive<Record<string, boolean>>({
		rooms: true,
		payments: false,
		notifications: false
	});

	const selectableItemsWithState = computed<SAccordionItem[]>(() => selectableItems.map((item) => ({
		...item,
		selected: selectedState[item.value]
	})));

	const designItems: SAccordionItem[] = [
		{ label: "Label", value: "default" },
		{ label: "Label", value: "selected", selected: true }
	];

	const slottedItems: SAccordionItem[] = [
		{ label: "Default body", value: "default", content: "Rendered from the `content` field." },
		{ label: "Custom body", value: "chart", slot: "chart", content: "Overridden by the #chart-body slot." }
	];

	const disabledItems: SAccordionItem[] = [
		{ label: "Enabled", value: "enabled", content: "You can toggle me." },
		{ label: "Disabled", value: "disabled", content: "You can't reach me.", disabled: true }
	];

	const propsData: PropDefinition[] = [
		{ prop: "items", type: "SAccordionItem[]", description: "AccordionItem plus `selected?: boolean` to tint the item header." },
		{ prop: "type", type: "'single' | 'multiple'", description: "Whether one or multiple items can be open at the same time.", default: "'single'" },
		{ prop: "collapsible", type: "boolean", description: "When `type` is 'single', whether the open item can be collapsed.", default: "true" },
		{ prop: "defaultValue", type: "string | string[]", description: "Value(s) expanded on load (uncontrolled). Ignored when `v-model` is bound." },
		{ prop: "disabled", type: "boolean", description: "Disable the whole accordion.", default: "false" },
		{ prop: "unmountOnHide", type: "boolean", description: "Unmount item bodies when collapsed.", default: "true" },
		{ prop: "trailingIcon", type: "string", description: "Trailing chevron icon (rotates 180° when open).", default: "appConfig.ui.icons.chevronDown" },
		{ prop: "ui", type: "AccordionProps['ui']", description: "Class overrides for the underlying UAccordion slots (tailwind-merged)." },
		{ prop: "v-model", type: "string | string[]", description: "Controlled expanded value(s). `string[]` when `type` is 'multiple'." }
	];
</script>
