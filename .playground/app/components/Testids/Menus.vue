<template>
	<section
		id="menus"
		class="space-y-3 scroll-mt-6"
	>
		<h2 class="text-xl font-semibold">
			Menus and link lists
		</h2>
		<p class="text-sm text-muted max-w-3xl">
			The mirror image of the selects. Every component here renders its items through
			<code>pickLinkProps()</code>, which forwards <strong>every</strong> <code>data-*</code> and
			<code>aria-*</code> key on the item object to the rendered element — so
			<code>data-testid</code> <em>and</em> <code>data-test-value</code> both belong in the item,
			at the definition site, with no slot in sight. The exception inside the exception: items of
			type <code>label</code>, <code>separator</code> and <code>checkbox</code>, and the parent of a
			submenu, take a different branch and drop the keys.
		</p>

		<TestidCase
			id="u-dropdown-menu"
			component="UDropdownMenu"
			rule="container"
			note="The trigger is your own element, so tag it directly, and the items carry their own ids. The panel itself is the odd one out: unlike UModal, its content prop does not survive the trip, so a marker rendered through #content-top is the way to name the panel."
			:snippet="dropdownSnippet"
			:channels="dropdownChannels"
			open-with="[data-testid='case-u-dropdown-menu-trigger']"
			settle-on="item"
		>
			<template #default="{ id }">
				<UDropdownMenu
					:items="dropdownItems"
					:content="{ 'data-testid': id('content') }"
				>
					<UButton
						label="Actions"
						color="neutral"
						variant="outline"
						trailing-icon="ph:caret-down"
						:data-testid="id('trigger')"
					/>

					<template #content-top>
						<span
							class="sr-only"
							:data-testid="id('panel')"
						/>
					</template>
				</UDropdownMenu>
			</template>
		</TestidCase>

		<TestidCase
			id="u-context-menu"
			component="UContextMenu"
			rule="container"
			note="Same content component as UDropdownMenu, therefore the same channels. It opens on right-click, which is why this probe dispatches a contextmenu event rather than a click."
			:snippet="contextSnippet"
			:channels="contextChannels"
			open-with="[data-testid='case-u-context-menu-trigger']"
			open-event="contextmenu"
		>
			<template #default="{ id }">
				<UContextMenu
					:items="contextItems"
					:content="{ 'data-testid': id('content') }"
				>
					<div
						class="border border-dashed border-default rounded-md p-4 text-sm text-muted select-none"
						:data-testid="id('trigger')"
					>
						Right-click me
					</div>
				</UContextMenu>
			</template>
		</TestidCase>

		<TestidCase
			id="u-navigation-menu"
			component="UNavigationMenu"
			rule="container"
			note="The one collection where the container and its repeated children are both reachable without a single slot. This is what SNavigationShell renders inside — and the reason its menu carries a layer-owned id on the container only."
			:snippet="navigationSnippet"
			:channels="navigationChannels"
		>
			<template #default="{ id }">
				<UNavigationMenu
					orientation="vertical"
					:items="navigationItems"
					class="w-56"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-breadcrumb"
			component="UBreadcrumb"
			rule="container"
			note="Same mechanic as the navigation menu. Worth tagging when the breadcrumb is the affordance a test navigates with, not just decoration."
			:snippet="breadcrumbSnippet"
			:channels="breadcrumbChannels"
		>
			<template #default="{ id }">
				<UBreadcrumb
					:items="breadcrumbItems"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-actions-group"
			component="SActionsGroup"
			rule="container"
			note="Items are ButtonProps and land on a real UButton, so the id goes in the item object — the same shape as a menu item, for a different reason. Needs the ButtonProps augmentation."
			:snippet="actionsGroupSnippet"
			:channels="actionsGroupChannels"
		>
			<template #default="{ id }">
				<SActionsGroup
					:items="actionItems"
					:primary-action="primaryAction"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-more-actions"
			component="SMoreActions"
			rule="container"
			note="The component splits one list in two — the first actions stay inline as buttons, the rest fall into a UDropdownMenu — and an app cannot predict where a given action lands, since the split moves with maxInline. The point of this case: the same key in the same item object works on both sides, so the app writes the id once and does not care which side it ends up on."
			:snippet="moreActionsSnippet"
			:channels="moreActionsChannels"
			open-with="[data-testid='case-s-more-actions-more']"
			settle-on="overflow-item"
		>
			<template #default="{ id }">
				<SMoreActions
					:actions="moreActionItems"
					:max-inline="2"
					show-inline-label
					:button-props="{ 'data-testid': id('more') }"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>
	</section>
</template>

<script setup lang="ts">
	import type { ChannelSpec } from "~/utils/testidProbing";
	import { caseTestid } from "~/utils/testidProbing";

	const dropdownItems = [
		[
			{ type: "label" as const, label: "Reservation", "data-testid": caseTestid("u-dropdown-menu", "item-label") }
		],
		[
			{ label: "Duplicate", icon: "ph:copy", "data-testid": caseTestid("u-dropdown-menu", "item"), "data-test-value": "duplicate" },
			{ label: "Archive", icon: "ph:archive", "data-testid": caseTestid("u-dropdown-menu", "item"), "data-test-value": "archive" },
			{ label: "Delete", icon: "ph:trash", "data-testid": caseTestid("u-dropdown-menu", "item"), "data-test-value": "delete" }
		]
	];

	const contextItems = [
		[
			{ label: "Copy", "data-testid": caseTestid("u-context-menu", "item"), "data-test-value": "copy" },
			{ label: "Paste", "data-testid": caseTestid("u-context-menu", "item"), "data-test-value": "paste" }
		]
	];

	const navigationItems = [
		[
			{ label: "Calendar", icon: "ph:calendar-blank", to: "#", "data-testid": caseTestid("u-navigation-menu", "item"), "data-test-value": "calendar" },
			{ label: "Rates", icon: "ph:tag", to: "#", "data-testid": caseTestid("u-navigation-menu", "item"), "data-test-value": "rates" },
			{ label: "Reports", icon: "ph:chart-line", to: "#", "data-testid": caseTestid("u-navigation-menu", "item"), "data-test-value": "reports" }
		]
	];

	const breadcrumbItems = [
		{ label: "Properties", to: "#", "data-testid": caseTestid("u-breadcrumb", "item"), "data-test-value": "properties" },
		{ label: "Villa Aurora", to: "#", "data-testid": caseTestid("u-breadcrumb", "item"), "data-test-value": "villa-aurora" }
	];

	const actionItems = [
		{ label: "Export", icon: "ph:export", "data-testid": caseTestid("s-actions-group", "item"), "data-test-value": "export" },
		{ label: "Archive", icon: "ph:archive", "data-testid": caseTestid("s-actions-group", "item"), "data-test-value": "archive" }
	];

	const primaryAction = { label: "Publish", "data-testid": caseTestid("s-actions-group", "primary") };

	/**
	 * Three actions against `maxInline: 2` puts the first inline and the other two
	 * behind the kebab — one list exercising both sides of the split at once.
	 */
	const moreActionItems = [
		{ label: "Edit", icon: "ph:pencil", "data-testid": caseTestid("s-more-actions", "item"), "data-test-value": "edit" },
		{ label: "Duplicate", icon: "ph:copy", "data-testid": caseTestid("s-more-actions", "overflow-item"), "data-test-value": "duplicate" },
		{ label: "Delete", icon: "ph:trash", "data-testid": caseTestid("s-more-actions", "overflow-item"), "data-test-value": "delete" }
	];

	const PANEL_DEAD_END = "Confirmed: unlike UModal, the content object is re-derived from declared props inside UDropdownMenuContent, whose own root is a portal — the extra key never reaches an element. Render a marker through #content-top, or scope on [role=\"menu\"].";

	const dropdownChannels: ChannelSpec[] = [
		{ key: "trigger", label: "The trigger", mechanic: "<UButton :data-testid=\"ids.actionsButton\" /> — your own element" },
		{ key: "content", label: "The menu panel, via the content prop", mechanic: ":content=\"{ 'data-testid': ids.actionsMenu }\"", deadEnd: true, instead: PANEL_DEAD_END },
		{ key: "panel", label: "The menu panel, via #content-top", mechanic: "<template #content-top><span class=\"sr-only\" :data-testid /></template>" },
		{ key: "item", label: "A menu item", mechanic: "items: [{ label, 'data-testid': …, 'data-test-value': … }]", collection: true },
		{
			key: "item-label",
			label: "A group label item",
			mechanic: "items: [{ type: 'label', 'data-testid': … }]",
			deadEnd: true,
			instead: "Confirmed: label, separator and checkbox items bypass pickLinkProps, so their data-* keys are dropped. Labels are not clickable, so this is rarely a loss — scope within the panel instead."
		}
	];

	const contextChannels: ChannelSpec[] = [
		{ key: "trigger", label: "The right-clickable area", mechanic: ":data-testid on your own element" },
		{ key: "content", label: "The menu panel, via the content prop", mechanic: ":content=\"{ 'data-testid': ids.contextMenu }\"", deadEnd: true, instead: PANEL_DEAD_END },
		{ key: "item", label: "A menu item", mechanic: "items: [{ label, 'data-testid': …, 'data-test-value': … }]", collection: true }
	];

	const navigationChannels: ChannelSpec[] = [
		{ key: "root", label: "The menu", mechanic: ":data-testid=\"ids.mainNav\"" },
		{ key: "item", label: "A menu entry", mechanic: "items: [{ label, to, 'data-testid': …, 'data-test-value': … }]", collection: true }
	];

	const breadcrumbChannels: ChannelSpec[] = [
		{ key: "root", label: "The breadcrumb", mechanic: ":data-testid=\"ids.breadcrumb\"" },
		{ key: "item", label: "A crumb", mechanic: "items: [{ label, to, 'data-testid': …, 'data-test-value': … }]", collection: true }
	];

	const actionsGroupChannels: ChannelSpec[] = [
		{ key: "root", label: "The group", mechanic: ":data-testid=\"ids.bulkActions\"" },
		{ key: "item", label: "A secondary action", mechanic: "items: [{ label, 'data-testid': …, 'data-test-value': … }]", collection: true },
		{ key: "primary", label: "The primary action", mechanic: ":primary-action=\"{ label, 'data-testid': … }\"" }
	];

	const moreActionsChannels: ChannelSpec[] = [
		{ key: "root", label: "The group", mechanic: ":data-testid=\"ids.rowActions\"" },
		{ key: "more", label: "The kebab that opens the overflow", mechanic: ":button-props=\"{ 'data-testid': ids.rowActionsMore }\"" },
		{ key: "item", label: "An action that stayed inline", mechanic: "actions: [{ label, 'data-testid': …, 'data-test-value': … }]", collection: true },
		{ key: "overflow-item", label: "An action that overflowed into the menu", mechanic: "same key, same object — the split does not change the mechanic", collection: true }
	];

	const dropdownSnippet = `<UDropdownMenu :items="items">
	<UButton label="Actions" :data-testid="ids.actionsButton" />

	<!-- The content prop does NOT carry data-* here. This does. -->
	<template #content-top>
		<span class="sr-only" :data-testid="ids.actionsMenu" />
	</template>
</UDropdownMenu>

const items = [[
	{ label: "Duplicate", "data-testid": ids.actionItem, "data-test-value": "duplicate" },
	{ label: "Archive",   "data-testid": ids.actionItem, "data-test-value": "archive" },
	{ label: "Delete",    "data-testid": ids.actionItem, "data-test-value": "delete" }
]];

// Does NOT work: label / separator / checkbox items and submenu parents
// take a different branch and drop their data-* keys.`;

	const contextSnippet = `<UContextMenu
	:items="items"
	:content="{ 'data-testid': ids.rowContextMenu }"
>
	<div :data-testid="ids.row">…</div>
</UContextMenu>`;

	const navigationSnippet = `<UNavigationMenu
	orientation="vertical"
	:items="items"
	:data-testid="ids.mainNav"
/>

const items = [[
	{ label: "Calendar", to: "/calendar", "data-testid": ids.navItem, "data-test-value": "calendar" },
	{ label: "Rates",    to: "/rates",    "data-testid": ids.navItem, "data-test-value": "rates" }
]];`;

	const breadcrumbSnippet = `<UBreadcrumb :items="items" :data-testid="ids.breadcrumb" />

const items = [
	{ label: "Properties",   to: "/properties", "data-testid": ids.crumb, "data-test-value": "properties" },
	{ label: "Villa Aurora", to: "/p/1",        "data-testid": ids.crumb, "data-test-value": "villa-aurora" }
];`;

	const actionsGroupSnippet = `<SActionsGroup
	:items="actions"
	:primary-action="{ label: 'Publish', 'data-testid': ids.publishButton }"
	:data-testid="ids.bulkActions"
/>

const actions = [
	{ label: "Export",  "data-testid": ids.bulkAction, "data-test-value": "export" },
	{ label: "Archive", "data-testid": ids.bulkAction, "data-test-value": "archive" }
];`;

	const moreActionsSnippet = `<SMoreActions
	:actions="actions"
	:max-inline="2"
	:button-props="{ 'data-testid': ids.rowActionsMore }"
	:data-testid="ids.rowActions"
/>

// One key per action. Whether an action renders inline or inside the
// overflow menu depends on maxInline — the id does not change either way.
const actions = [
	{ label: "Edit",      "data-testid": ids.rowAction, "data-test-value": "edit" },
	{ label: "Duplicate", "data-testid": ids.rowAction, "data-test-value": "duplicate" },
	{ label: "Delete",    "data-testid": ids.rowAction, "data-test-value": "delete" }
];`;
</script>
