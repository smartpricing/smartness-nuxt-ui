<template>
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">
			Selects
		</h2>
		<p class="text-sm text-muted max-w-3xl">
			The family where the item array is a trap. Every component here type-checks a
			<code>data-testid</code> written inside <code>items</code> and none of them renders it: the
			internal <code>ComboboxItem</code> / <code>SelectItem</code> binds only
			<code>value</code>, <code>disabled</code> and <code>class</code>. The working channel for an
			option is the <code>#item-label</code> slot. Contrast with
			<a
				href="#menus"
				class="underline"
			>Menus</a>, where the item array is the right answer.
		</p>

		<TestidCase
			id="u-select-menu"
			component="USelectMenu"
			rule="container"
			note="Four channels reach four different nodes. The search box and the popover panel are prop objects; the options are a slot. The items array is the one that lies."
			:snippet="selectMenuSnippet"
			:channels="selectMenuChannels"
			open-with="[data-testid='case-u-select-menu-root']"
			settle-on="item"
		>
			<template #default="{ id }">
				<USelectMenu
					v-model="selectMenuValue"
					:items="selectMenuItems"
					value-key="value"
					label-key="label"
					class="w-64"
					:data-testid="id('root')"
					:search-input="{ 'data-testid': id('search') }"
					:content="{ 'data-testid': id('content') }"
				>
					<template #item-label="{ item }">
						<span
							:data-testid="id('item')"
							:data-test-value="item.value"
						>{{ item.label }}</span>
					</template>
				</USelectMenu>
			</template>
		</TestidCase>

		<TestidCase
			id="u-select"
			component="USelect"
			rule="container"
			note="Same shape as USelectMenu minus the search box — USelect has no filter, so no search-input prop."
			:snippet="selectSnippet"
			:channels="selectChannels"
			open-with="[data-testid='case-u-select-root']"
		>
			<template #default="{ id }">
				<USelect
					v-model="selectValue"
					:items="selectItems"
					value-key="value"
					label-key="label"
					class="w-64"
					:data-testid="id('root')"
					:content="{ 'data-testid': id('content') }"
				>
					<template #item-label="{ item }">
						<span
							:data-testid="id('item')"
							:data-test-value="item.value"
						>{{ item.label }}</span>
					</template>
				</USelect>
			</template>
		</TestidCase>

		<TestidCase
			id="u-input-menu"
			component="UInputMenu"
			rule="container"
			note="The root IS the search field — an input, not a button — so there is no separate search-input prop. Everything else matches USelectMenu."
			:snippet="inputMenuSnippet"
			:channels="inputMenuChannels"
			open-with="[data-testid='case-u-input-menu-root']"
		>
			<template #default="{ id }">
				<UInputMenu
					v-model="inputMenuValue"
					:items="inputMenuItems"
					value-key="value"
					label-key="label"
					class="w-64"
					:data-testid="id('root')"
					:content="{ 'data-testid': id('content') }"
				>
					<template #item-label="{ item }">
						<span
							:data-testid="id('item')"
							:data-test-value="item.value"
						>{{ item.label }}</span>
					</template>
				</UInputMenu>
			</template>
		</TestidCase>

		<TestidCase
			id="s-multi-select"
			component="SMultiSelect"
			rule="none"
			note="The worst case in the layer, and the reason the #trigger slot is worth knowing: the root is a UPopover, which drops incoming attributes, and no prop reaches the trigger, the search box, select-all or the rows. Re-implementing the trigger through its slot is the only way to mark anything — and it costs the app the default trigger."
			:snippet="multiSelectSnippet"
			:channels="multiSelectChannels"
			open-with="[data-testid='case-s-multi-select-trigger']"
		>
			<template #default="{ id }">
				<SMultiSelect
					v-model="multiSelectValue"
					:items="multiSelectItems"
					searchable
					select-all
					placeholder="Room types"
					class="w-64"
					:data-testid="id('root')"
				>
					<template #trigger="{ label }">
						<UButton
							block
							color="neutral"
							variant="outline"
							trailing-icon="ph:caret-down"
							:data-testid="id('trigger')"
							:label="label"
						/>
					</template>
				</SMultiSelect>
			</template>
		</TestidCase>

		<TestidCase
			id="s-phone-input"
			component="SPhoneInput"
			rule="attributes"
			note="Two prop objects, one per half of the control. Both are plain Nuxt UI prop types, so the augmentation that already covers InputProps and SelectMenuProps covers this too — no layer-specific type is needed."
			:snippet="phoneInputSnippet"
			:channels="phoneInputChannels"
			open-with="[data-testid='case-s-phone-input-country']"
		>
			<template #default="{ id }">
				<SPhoneInput
					v-model="phone"
					v-model:country-code="phoneCountry"
					class="w-72"
					:input-props="{ 'data-testid': id('number') }"
					:select-menu-props="{
						'data-testid': id('country'),
						'searchInput': { 'data-testid': id('country-search') },
					}"
				/>
			</template>
		</TestidCase>
	</section>
</template>

<script setup lang="ts">
	import type { ChannelSpec } from "~/utils/testidProbing";
	import { caseTestid } from "~/utils/testidProbing";

	/**
	 * Item arrays carry the dead-end testid on purpose: the page has to *show* that
	 * the key type-checks and never renders, not merely assert it in prose.
	 */
	function withDeadEndTestid<T extends object>(items: T[], caseId: string) {
		return items.map((item) => ({ ...item, "data-testid": caseTestid(caseId, "item-naive") }));
	}

	const ROOM_TYPES = [
		{ label: "Standard", value: "standard" },
		{ label: "Deluxe", value: "deluxe" },
		{ label: "Suite", value: "suite" }
	];

	const selectMenuItems = withDeadEndTestid(ROOM_TYPES, "u-select-menu");
	const selectItems = withDeadEndTestid(ROOM_TYPES, "u-select");
	const inputMenuItems = withDeadEndTestid(ROOM_TYPES, "u-input-menu");

	const selectMenuValue = ref("standard");
	const selectValue = ref("standard");
	const inputMenuValue = ref("standard");

	const multiSelectItems = ROOM_TYPES.map((item) => ({ label: item.label, value: item.value }));
	const multiSelectValue = ref<string[]>([]);

	const phone = ref("");
	const phoneCountry = ref("IT");

	const ITEM_DEAD_END = "Confirmed: ComboboxItem/SelectItem binds only value, disabled and class — the key is dropped. Use the #item-label slot below.";

	const selectMenuChannels: ChannelSpec[] = [
		{ key: "root", label: "The control", mechanic: ":data-testid=\"ids.roomTypeSelect\"" },
		{ key: "search", label: "Search box inside the panel", mechanic: ":search-input=\"{ 'data-testid': ids.roomTypeSearch }\"" },
		{ key: "content", label: "The popover panel", mechanic: ":content=\"{ 'data-testid': ids.roomTypePanel }\"" },
		{ key: "item-naive", label: "An option, via the items array", mechanic: "items: [{ label, value, 'data-testid': … }]", deadEnd: true, instead: ITEM_DEAD_END },
		{ key: "item", label: "An option, via the slot", mechanic: "#item-label + :data-test-value=\"item.value\"", collection: true }
	];

	const selectChannels: ChannelSpec[] = [
		{ key: "root", label: "The control", mechanic: ":data-testid=\"ids.roomTypeSelect\"" },
		{ key: "content", label: "The popover panel", mechanic: ":content=\"{ 'data-testid': ids.roomTypePanel }\"" },
		{ key: "item-naive", label: "An option, via the items array", mechanic: "items: [{ label, value, 'data-testid': … }]", deadEnd: true, instead: ITEM_DEAD_END },
		{ key: "item", label: "An option, via the slot", mechanic: "#item-label + :data-test-value=\"item.value\"", collection: true }
	];

	const inputMenuChannels: ChannelSpec[] = [
		{ key: "root", label: "The input (also the search box)", mechanic: ":data-testid=\"ids.roomTypeInput\"" },
		{ key: "content", label: "The popover panel", mechanic: ":content=\"{ 'data-testid': ids.roomTypePanel }\"" },
		{ key: "item-naive", label: "An option, via the items array", mechanic: "items: [{ label, value, 'data-testid': … }]", deadEnd: true, instead: ITEM_DEAD_END },
		{ key: "item", label: "An option, via the slot", mechanic: "#item-label + :data-test-value=\"item.value\"", collection: true }
	];

	const multiSelectChannels: ChannelSpec[] = [
		{
			key: "root",
			label: "The component itself",
			mechanic: "<SMultiSelect data-testid=\"…\" />",
			deadEnd: true,
			instead: "Confirmed: the root is a UPopover, whose fragment root discards inherited attributes. Nothing lands."
		},
		{ key: "trigger", label: "The trigger, re-implemented via #trigger", mechanic: "<template #trigger>…<UButton :data-testid /></template>" }
	];

	const phoneInputChannels: ChannelSpec[] = [
		{ key: "number", label: "The phone number field", mechanic: ":input-props=\"{ 'data-testid': ids.phoneNumber }\"" },
		{ key: "country", label: "The country select", mechanic: ":select-menu-props=\"{ 'data-testid': ids.phoneCountry }\"" },
		{ key: "country-search", label: "Search box in the country list", mechanic: ":select-menu-props=\"{ searchInput: { 'data-testid': … } }\"" }
	];

	const selectMenuSnippet = `<USelectMenu
	v-model="roomType"
	:items="roomTypes"
	value-key="value"
	label-key="label"
	:data-testid="ids.roomTypeSelect"
	:search-input="{ 'data-testid': ids.roomTypeSearch }"
	:content="{ 'data-testid': ids.roomTypePanel }"
>
	<template #item-label="{ item }">
		<span :data-testid="ids.roomTypeOption" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</USelectMenu>

<!-- Does NOT work: type-checks, never renders -->
const roomTypes = [{ label: "Standard", value: "standard", "data-testid": "…" }];`;

	const selectSnippet = `<USelect
	v-model="roomType"
	:items="roomTypes"
	value-key="value"
	label-key="label"
	:data-testid="ids.roomTypeSelect"
	:content="{ 'data-testid': ids.roomTypePanel }"
>
	<template #item-label="{ item }">
		<span :data-testid="ids.roomTypeOption" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</USelect>`;

	const inputMenuSnippet = `<UInputMenu
	v-model="roomType"
	:items="roomTypes"
	value-key="value"
	label-key="label"
	:data-testid="ids.roomTypeInput"
	:content="{ 'data-testid': ids.roomTypePanel }"
>
	<template #item-label="{ item }">
		<span :data-testid="ids.roomTypeOption" :data-test-value="item.value">
			{{ item.label }}
		</span>
	</template>
</UInputMenu>`;

	const multiSelectSnippet = `<!-- data-testid on the component reaches nothing: the root is a UPopover -->
<SMultiSelect v-model="rooms" :items="roomTypes" searchable select-all>
	<template #trigger="{ label }">
		<UButton
			block
			color="neutral"
			variant="outline"
			trailing-icon="ph:caret-down"
			:data-testid="ids.roomsTrigger"
			:label="label"
		/>
	</template>
</SMultiSelect>`;

	const phoneInputSnippet = `<SPhoneInput
	v-model="phone"
	v-model:country-code="country"
	:input-props="{ 'data-testid': ids.phoneNumber }"
	:select-menu-props="{
		'data-testid': ids.phoneCountry,
		searchInput: { 'data-testid': ids.phoneCountrySearch }
	}"
/>`;
</script>
