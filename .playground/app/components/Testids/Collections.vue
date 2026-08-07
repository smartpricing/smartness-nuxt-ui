<template>
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">
			Collections
		</h2>
		<p class="text-sm text-muted max-w-3xl">
			A container that gives the context, repeated children told apart by
			<code>data-test-value</code>. The container is always reachable; what changes from one
			component to the next is how the children are. Three answers appear below, and picking the
			wrong one fails silently: the item object (<code>UCheckboxGroup</code>), a slot
			(<code>UTabs</code>, <code>UAccordion</code>, <code>UTable</code>, <code>URadioGroup</code>,
			<code>UStepper</code>), or nothing at all (<code>SStepper</code>). Where the answer is a slot,
			check <em>which node</em> the id lands on — it is often the label rather than the control.
		</p>

		<TestidCase
			id="u-tabs"
			component="UTabs"
			rule="container"
			note="The trigger is built from the item object but binds none of its extra keys, so the id has to come in through the #default slot, which renders inside the trigger's label span. The panels have no channel at all."
			:snippet="tabsSnippet"
			:channels="tabsChannels"
		>
			<template #default="{ id }">
				<UTabs
					v-model="tabsValue"
					variant="link-fit"
					:items="tabsItems"
					:data-testid="id('root')"
				>
					<template #default="{ item }">
						<span
							:data-testid="id('trigger')"
							:data-test-value="item.value"
						>{{ item.label }}</span>
					</template>
				</UTabs>
			</template>
		</TestidCase>

		<TestidCase
			id="u-checkbox-group"
			component="UCheckboxGroup"
			rule="container"
			note="The one collection in Nuxt UI that spreads the whole item object onto the rendered control, so every extra key arrives. Its twin URadioGroup, directly below, does not — the asymmetry is upstream, not ours."
			:snippet="checkboxGroupSnippet"
			:channels="checkboxGroupChannels"
		>
			<template #default="{ id }">
				<UCheckboxGroup
					v-model="checkboxValue"
					:items="checkboxItems"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-radio-group"
			component="URadioGroup"
			rule="container"
			note="Same shape as UCheckboxGroup, opposite outcome on the item object. Unlike the checkbox group it does have a #label slot, so a radio is reachable — but the id lands on a span inside the label, not on the input, which is a different node from the one UCheckboxGroup gives you for the same job."
			:snippet="radioGroupSnippet"
			:channels="radioGroupChannels"
		>
			<template #default="{ id }">
				<URadioGroup
					v-model="radioValue"
					:items="radioItems"
					:data-testid="id('root')"
				>
					<template #label="{ item }">
						<span
							:data-testid="id('item')"
							:data-test-value="item.value"
						>{{ item.label }}</span>
					</template>
				</URadioGroup>
			</template>
		</TestidCase>

		<TestidCase
			id="u-table"
			component="UTable"
			rule="container"
			note="Rows and cells are tr and td built by TanStack from the column definitions — they take no attributes from anywhere. The repeated child a test can address is therefore the cell content, rendered through the #<columnId>-cell slot, and it carries the row's stable domain value."
			:snippet="tableSnippet"
			:channels="tableChannels"
		>
			<template #default="{ id }">
				<UTable
					:data="tableRows"
					:columns="tableColumns"
					:data-testid="id('root')"
				>
					<template #name-cell="{ row }">
						<span
							:data-testid="id('cell')"
							:data-test-value="row.original.slug"
						>{{ row.original.name }}</span>
					</template>
				</UTable>
			</template>
		</TestidCase>

		<TestidCase
			id="u-accordion"
			component="UAccordion"
			rule="container"
			note="Same story as the tabs: the item object is inert, the #default slot renders inside the trigger label and carries the id."
			:snippet="accordionSnippet"
			:channels="accordionChannels"
		>
			<template #default="{ id }">
				<UAccordion
					:items="accordionItems"
					:data-testid="id('root')"
				>
					<template #default="{ item }">
						<span
							:data-testid="id('trigger')"
							:data-test-value="item.value"
						>{{ item.label }}</span>
					</template>
				</UAccordion>
			</template>
		</TestidCase>

		<TestidCase
			id="u-stepper"
			component="UStepper"
			rule="container"
			note="The item object is inert, but #title renders inside each step's title element and carries the id there. Note what that node is: the title text, not the clickable trigger — good enough to assert on, and one hop away from what a click needs."
			:snippet="stepperSnippet"
			:channels="stepperChannels"
		>
			<template #default="{ id }">
				<UStepper
					v-model="uStepperValue"
					:items="uStepperItems"
					:data-testid="id('root')"
				>
					<template #title="{ item }">
						<span
							:data-testid="id('item')"
							:data-test-value="item.value"
						>{{ item.title }}</span>
					</template>
				</UStepper>
			</template>
		</TestidCase>

		<TestidCase
			id="s-stepper"
			component="SStepper"
			rule="container"
			note="The layer's own stepper, measured next to the Nuxt UI one it wraps the same problem as: the root is reachable, the steps are not. This is the gap docs/internal/testid-gaps.md asks to close by adopting the item-object convention that SActionsGroup already has."
			:snippet="sStepperSnippet"
			:channels="sStepperChannels"
		>
			<template #default="{ id }">
				<SStepper
					v-model="sStepperValue"
					:steps="sStepperSteps"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-navigation-menu"
			component="SNavigationMenu"
			rule="container"
			note="A thin wrapper over UNavigationMenu, so it inherits the good behaviour: ids in the item object reach the rendered links."
			:snippet="sNavigationSnippet"
			:channels="sNavigationChannels"
		>
			<template #default="{ id }">
				<SNavigationMenu
					:items="sNavigationItems"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>
	</section>
</template>

<script setup lang="ts">
	import type { ChannelSpec } from "~/utils/testidProbing";
	import { caseTestid } from "~/utils/testidProbing";

	const ITEM_INERT = "Confirmed: the item object is read for its known keys only — the rendered element never sees the extra ones.";

	const tabsValue = ref("overview");
	const tabsItems = [
		{ label: "Overview", value: "overview", "data-testid": caseTestid("u-tabs", "trigger-naive") },
		{ label: "Bookings", value: "bookings", "data-testid": caseTestid("u-tabs", "trigger-naive") }
	];

	const checkboxValue = ref<string[]>(["breakfast"]);
	const checkboxItems = [
		{ label: "Breakfast", value: "breakfast", "data-testid": caseTestid("u-checkbox-group", "item"), "data-test-value": "breakfast" },
		{ label: "Parking", value: "parking", "data-testid": caseTestid("u-checkbox-group", "item"), "data-test-value": "parking" }
	];

	const radioValue = ref("daily");
	const radioItems = [
		{ label: "Daily", value: "daily", "data-testid": caseTestid("u-radio-group", "item-naive"), "data-test-value": "daily" },
		{ label: "Weekly", value: "weekly", "data-testid": caseTestid("u-radio-group", "item-naive"), "data-test-value": "weekly" }
	];

	const tableRows = [
		{ id: 1, slug: "villa-aurora", name: "Villa Aurora" },
		{ id: 2, slug: "casa-mare", name: "Casa Mare" }
	];

	const tableColumns = [
		{ accessorKey: "name", header: "Property" },
		{ accessorKey: "id", header: "Id" }
	];

	const accordionItems = [
		{ label: "Cancellation", value: "cancellation", content: "Free until 3 days before arrival.", "data-testid": caseTestid("u-accordion", "trigger-naive") },
		{ label: "Deposit", value: "deposit", content: "30% at booking.", "data-testid": caseTestid("u-accordion", "trigger-naive") }
	];

	const uStepperValue = ref(0);
	const uStepperItems = [
		{ title: "Profile", value: "profile", "data-testid": caseTestid("u-stepper", "item-naive"), "data-test-value": "profile" },
		{ title: "Property", value: "property", "data-testid": caseTestid("u-stepper", "item-naive"), "data-test-value": "property" }
	];

	const sStepperValue = ref("property");
	const sStepperSteps = [
		{ id: "profile", label: "Profile", status: "done" as const, "data-testid": caseTestid("s-stepper", "item-naive"), "data-test-value": "profile" },
		{ id: "property", label: "Property", status: "current" as const, "data-testid": caseTestid("s-stepper", "item-naive"), "data-test-value": "property" }
	];

	const sNavigationItems = [[
		{ label: "Presets", "data-testid": caseTestid("s-navigation-menu", "item"), "data-test-value": "presets" },
		{ label: "Rules", "data-testid": caseTestid("s-navigation-menu", "item"), "data-test-value": "rules" }
	]];

	const tabsChannels: ChannelSpec[] = [
		{ key: "root", label: "The tab bar", mechanic: ":data-testid=\"ids.propertyTabs\"" },
		{ key: "trigger-naive", label: "A tab, via the items array", mechanic: "items: [{ label, value, 'data-testid': … }]", deadEnd: true, instead: ITEM_INERT },
		{ key: "trigger", label: "A tab, via the slot", mechanic: "#default + :data-test-value=\"item.value\"", collection: true }
	];

	const checkboxGroupChannels: ChannelSpec[] = [
		{ key: "root", label: "The group", mechanic: ":data-testid=\"ids.amenities\"" },
		{ key: "item", label: "A checkbox", mechanic: "items: [{ label, value, 'data-testid': …, 'data-test-value': … }]", collection: true }
	];

	const radioGroupChannels: ChannelSpec[] = [
		{ key: "root", label: "The group", mechanic: ":data-testid=\"ids.frequency\"" },
		{
			key: "item-naive",
			label: "A radio, via the items array",
			mechanic: "items: [{ label, value, 'data-testid': … }]",
			deadEnd: true,
			instead: "Confirmed: RadioGroup binds only value and class on its items — unlike UCheckboxGroup, which spreads the whole object. Use the #label slot below."
		},
		{ key: "item", label: "A radio, via the slot", mechanic: "#label + :data-test-value=\"item.value\"", collection: true }
	];

	const tableChannels: ChannelSpec[] = [
		{ key: "root", label: "The table", mechanic: ":data-testid=\"ids.propertiesTable\"" },
		{ key: "cell", label: "A row, through its cell content", mechanic: "#name-cell + :data-test-value=\"row.original.slug\"", collection: true }
	];

	const accordionChannels: ChannelSpec[] = [
		{ key: "root", label: "The accordion", mechanic: ":data-testid=\"ids.policies\"" },
		{ key: "trigger-naive", label: "A header, via the items array", mechanic: "items: [{ label, 'data-testid': … }]", deadEnd: true, instead: ITEM_INERT },
		{ key: "trigger", label: "A header, via the slot", mechanic: "#default + :data-test-value=\"item.value\"", collection: true }
	];

	const stepperChannels: ChannelSpec[] = [
		{ key: "root", label: "The stepper", mechanic: ":data-testid=\"ids.onboardingSteps\"" },
		{
			key: "item-naive",
			label: "A step, via the items array",
			mechanic: "items: [{ title, 'data-testid': … }]",
			deadEnd: true,
			instead: "Confirmed: the item object is inert. Use the #title slot below."
		},
		{ key: "item", label: "A step, via the slot", mechanic: "#title + :data-test-value=\"item.value\"", collection: true }
	];

	const sStepperChannels: ChannelSpec[] = [
		{ key: "root", label: "The stepper", mechanic: ":data-testid=\"ids.onboardingSteps\"" },
		{
			key: "item-naive",
			label: "A step, via the steps array",
			mechanic: "steps: [{ id, label, 'data-testid': … }]",
			deadEnd: true,
			instead: "Confirmed, and recorded as our own gap in docs/internal/testid-gaps.md: SStepper does not forward step attributes the way SActionsGroup forwards item attributes."
		}
	];

	const sNavigationChannels: ChannelSpec[] = [
		{ key: "root", label: "The menu", mechanic: ":data-testid=\"ids.filtersNav\"" },
		{ key: "item", label: "A menu entry", mechanic: "items: [[{ label, 'data-testid': …, 'data-test-value': … }]]", collection: true }
	];

	const tabsSnippet = `<UTabs v-model="tab" :items="items" :data-testid="ids.propertyTabs">
	<template #default="{ item }">
		<span :data-testid="ids.propertyTab" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</UTabs>

<!-- Does NOT work: the trigger ignores extra item keys -->
const items = [{ label: "Overview", value: "overview", "data-testid": "…" }];`;

	const checkboxGroupSnippet = `<UCheckboxGroup v-model="amenities" :items="items" :data-testid="ids.amenities" />

const items = [
	{ label: "Breakfast", value: "breakfast", "data-testid": ids.amenity, "data-test-value": "breakfast" },
	{ label: "Parking",   value: "parking",   "data-testid": ids.amenity, "data-test-value": "parking" }
];`;

	const radioGroupSnippet = `<URadioGroup v-model="frequency" :items="items" :data-testid="ids.frequency">
	<template #label="{ item }">
		<span :data-testid="ids.frequencyOption" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</URadioGroup>

<!-- The id lands on a span inside the <label>, not on the input.
     To click the radio itself, go through the label or use the role. -->`;

	const tableSnippet = `<UTable :data="rows" :columns="columns" :data-testid="ids.propertiesTable">
	<template #name-cell="{ row }">
		<span :data-testid="ids.propertyRow" :data-test-value="row.original.slug">
			{{ row.original.name }}
		</span>
	</template>
</UTable>

<!-- tr and td take no attributes: the cell content is the addressable child. -->`;

	const accordionSnippet = `<UAccordion :items="items" :data-testid="ids.policies">
	<template #default="{ item }">
		<span :data-testid="ids.policyHeader" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</UAccordion>`;

	const stepperSnippet = `<UStepper v-model="step" :items="items" :data-testid="ids.onboardingSteps">
	<template #title="{ item }">
		<span :data-testid="ids.onboardingStep" :data-test-value="item.value">
			{{ item.title }}
		</span>
	</template>
</UStepper>

<!-- The id lands on the step's title text, not on its trigger. -->`;

	const sStepperSnippet = `<SStepper v-model="step" :steps="steps" :data-testid="ids.onboardingSteps" />

// Same gap as UStepper, on our side of the fence.`;

	const sNavigationSnippet = `<SNavigationMenu :items="items" :data-testid="ids.filtersNav" />

const items = [[
	{ label: "Presets", "data-testid": ids.filtersNavItem, "data-test-value": "presets" },
	{ label: "Rules",   "data-testid": ids.filtersNavItem, "data-test-value": "rules" }
]];`;
</script>
