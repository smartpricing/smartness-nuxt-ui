<template>
	<div class="min-h-screen bg-default p-6 lg:p-10 space-y-10">
		<!-- Header -->
		<header class="space-y-4 max-w-4xl">
			<h1 class="text-3xl font-bold">
				data-testid — review page
			</h1>
			<p class="text-muted">
				For every documented component this page renders the real thing with a real
				<code>data-testid</code> on it, then reads the DOM to report <strong>which node actually
					received the attribute</strong>. Nothing in the right-hand column is written by hand: it is
				derived on every page load, so it stays true when Nuxt UI changes underneath us. The rule badge
				on the left is the decision we took; the measurement on the right is what the browser does.
			</p>
			<p class="text-sm text-muted">
				Read-only. Objections and sign-off go in the review doc, not here.
			</p>

			<!-- Derived summary -->
			<div class="flex flex-wrap gap-2">
				<UBadge
					color="neutral"
					variant="subtle"
				>
					{{ summary.total }} probes
				</UBadge>
				<UBadge
					color="success"
					variant="subtle"
				>
					{{ summary.landed }} landed
				</UBadge>
				<UBadge
					:color="summary.lost ? 'error' : 'neutral'"
					variant="subtle"
				>
					{{ summary.lost }} lost
				</UBadge>
				<UBadge
					:color="summary.childrenLost ? 'error' : 'neutral'"
					variant="subtle"
				>
					{{ summary.childrenLost }} with per-item attributes dropped
				</UBadge>
				<UBadge
					:color="summary.ambiguous ? 'warning' : 'neutral'"
					variant="subtle"
				>
					{{ summary.ambiguous }} ambiguous
				</UBadge>
				<UBadge
					:color="summary.errored ? 'error' : 'neutral'"
					variant="subtle"
				>
					{{ summary.errored }} probe failures
				</UBadge>
				<UBadge
					v-if="summary.pending"
					color="neutral"
					variant="subtle"
				>
					{{ summary.pending }} still measuring
				</UBadge>
			</div>
		</header>

		<!-- Rule legend -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				The rules
			</h2>
			<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="(meta, key) in RULE_META"
					:key="key"
					class="flex items-start gap-2 text-sm border border-default rounded-md p-3"
				>
					<UBadge
						:color="meta.color"
						variant="soft"
						size="sm"
						class="shrink-0"
					>
						{{ meta.label }}
					</UBadge>
					<span class="text-muted text-xs">{{ meta.description }}</span>
				</div>
			</div>
		</section>

		<!-- Layer components -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Layer components
			</h2>

			<TestidProbe
				id="s-accordion"
				component="SAccordion"
				rule="root"
				note="Plain root, fallthrough works. `ui` is a false friend here — it only carries CSS classes."
			>
				<template #default="{ testid }">
					<SAccordion
						:data-testid="testid"
						:items="accordionItems"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-collapsible"
				component="SCollapsible"
				rule="root"
			>
				<template #default="{ testid }">
					<SCollapsible
						:data-testid="testid"
						label="4 periods selected"
					>
						<p class="text-sm">
							Body
						</p>
					</SCollapsible>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-alert"
				component="SAlert"
				rule="root"
			>
				<template #default="{ testid }">
					<SAlert
						:data-testid="testid"
						show
						title="You have unsaved changes"
						icon="ph:info"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-form-field"
				component="SFormField"
				rule="root"
				note="Declares inheritAttrs: false but re-binds $attrs onto UFormField — the attribute lands on the field wrapper, not on the input. It cannot be rendered here: it calls useI18n(), which only exists in a consumer app. The failure below is the playground's, not the mechanic's."
			>
				<template #default="{ testid }">
					<SFormField
						:data-testid="testid"
						label="Name"
						name="name"
					>
						<UInput placeholder="Name" />
					</SFormField>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-truncated-text"
				component="STruncatedText"
				rule="root"
			>
				<template #default="{ testid }">
					<STruncatedText
						:data-testid="testid"
						text="A property name long enough to be truncated"
						class="max-w-[200px]"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-stepper"
				component="SStepper"
				rule="container"
				note="Root is reachable; individual steps have no per-item attribute channel today."
				probe-children
			>
				<template #default="{ testid, child }">
					<SStepper
						v-model="stepperValue"
						:data-testid="testid"
						:steps="[
							{ 'id': 'profile', 'label': 'Profile', 'status': 'done', 'data-testid': child, 'data-test-value': 'profile' },
							{ 'id': 'property', 'label': 'Property', 'status': 'current', 'data-testid': child, 'data-test-value': 'property' },
						]"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-actions-group"
				component="SActionsGroup"
				rule="container"
				note="Items spread into ButtonProps, so extra fields reach the real button — the per-item channel works today."
				probe-children
			>
				<template #default="{ testid, child }">
					<SActionsGroup
						:data-testid="testid"
						:items="[
							{ 'label': 'Save', 'icon': 'ph:floppy-disk', 'data-testid': child, 'data-test-value': 'save' },
							{ 'label': 'Archive', 'icon': 'ph:archive', 'data-testid': child, 'data-test-value': 'archive' },
						]"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-more-actions"
				component="SMoreActions"
				rule="container"
				note="Attributes inside the item object reach the inline buttons."
				probe-children
			>
				<template #default="{ testid, child }">
					<SMoreActions
						:data-testid="testid"
						:actions="[
							{ 'label': 'View', 'icon': 'ph:eye', 'data-testid': child, 'data-test-value': 'view' },
							{ 'label': 'Edit', 'icon': 'ph:pencil', 'data-testid': child, 'data-test-value': 'edit' },
						]"
						:max-inline="2"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-navigation-menu"
				component="SNavigationMenu"
				rule="container"
				probe-children
			>
				<template #default="{ testid, child }">
					<SNavigationMenu
						:data-testid="testid"
						:items="[[
							{ 'label': 'Presets', 'data-testid': child, 'data-test-value': 'presets' },
							{ 'label': 'Rules', 'data-testid': child, 'data-test-value': 'rules' },
						]]"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-phone-input"
				component="SPhoneInput"
				rule="root"
			>
				<template #default="{ testid }">
					<SPhoneInput
						v-model="phone"
						:data-testid="testid"
						placeholder="Phone number"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-slider"
				component="SSlider"
				rule="root"
				note="Root of the template is SFormField, so the attribute stops at the field wrapper. Thumbs are taken by order — the declared exception to the no-index rule. Inherits SFormField's useI18n() dependency, so it cannot render here either."
			>
				<template #default="{ testid }">
					<SSlider
						v-model="sliderValue"
						:data-testid="testid"
						:min="0"
						:max="200"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-slider-old"
				component="SSliderOld"
				rule="root"
				note="Deprecated — kept because consumer apps still ship it and QA writes tests against it today."
			>
				<template #default="{ testid }">
					<SSliderOld
						v-model="sliderOldValue"
						:data-testid="testid"
						:min="0"
						:max="100"
						:step="5"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-dataviz"
				component="SDataviz"
				rule="root"
				note="Declares inheritAttrs: false and re-binds attrs on the root — the correct pattern."
			>
				<template #default="{ testid }">
					<SDataviz
						:data-testid="testid"
						title="Revenue"
					>
						<SDatavizLine
							name="2026"
							:data="[{ x: 'Jan', y: 10 }, { x: 'Feb', y: 14 }]"
						/>
					</SDataviz>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-auth-form-card"
				component="SAuthFormCard"
				rule="root"
			>
				<template #default="{ testid }">
					<SAuthFormCard
						:data-testid="testid"
						title="Sign in"
					>
						<UInput placeholder="you@example.com" />
					</SAuthFormCard>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-auth-layout"
				component="SAuthLayout"
				rule="root"
				note="A full-page component, probed anyway rather than assumed: it is clipped to a strip below so it cannot take over the review page."
			>
				<template #default="{ testid }">
					<!--
						`transform` makes this div a containing block for the layout's
						fixed-position background, which `overflow-hidden` alone cannot clip —
						without it the chevrons paint across the whole review page.
					-->
					<div
						class="max-h-40 overflow-hidden rounded-md"
						style="transform: translateZ(0)"
					>
						<SAuthLayout :data-testid="testid">
							<SAuthFormCard title="Sign in" />
						</SAuthLayout>
					</div>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-map"
				component="SMap"
				rule="root"
				note="Probed rather than assumed. It wants a tile provider and a network round-trip, so whatever it reports here is about this environment as much as about the mechanic — read the outcome, do not infer it."
			>
				<template #default="{ testid }">
					<SMap
						:data-testid="testid"
						:center="[12.5, 41.9]"
						:zoom="4"
						style="--ui-map-height: 120px"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-multi-select"
				component="SMultiSelect"
				rule="none"
				note="The big hole. Root is UPopover, whose slot is a fragment — the attribute is discarded outright. No `attributes`, no `*Props`, and `ui` is classes only. Trigger, search input, select-all and rows are all unreachable."
			>
				<template #default="{ testid }">
					<SMultiSelect
						v-model="multiSelectValue"
						:data-testid="testid"
						:items="multiSelectItems"
						placeholder="Select room types"
						searchable
					/>
				</template>
			</TestidProbe>
		</section>

		<!-- The two silent drops -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				The two silent drops
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				<code>SDatePicker</code> and <code>SDataCalendar</code> declare
				<code>inheritAttrs: false</code> and never re-bind <code>$attrs</code>. The obvious way of
				marking them compiles, renders, and produces nothing — with no warning. Each is probed twice:
				the way a developer reaches for first, and the way that works.
			</p>
			<p class="text-sm text-warning max-w-3xl">
				<strong>Deprecated:</strong> <code>SDatePicker</code> is on its way out and will likely be
				replaced. It stays documented — and probed — because consumer apps ship it today and QA writes
				tests against it now, the same treatment <code>SSliderOld</code> gets.
			</p>

			<TestidProbe
				id="s-date-picker-naive"
				component="SDatePicker (attribute on the component)"
				tag="SDatePicker"
				rule="root"
				note="Expected to fail. This is what a developer writes first."
			>
				<template #default="{ testid }">
					<SDatePicker
						v-model="dateValue"
						:data-testid="testid"
						placeholder="Select a date"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-date-picker"
				component="SDatePicker (attributes prop)"
				tag="SDatePicker"
				rule="attributes"
				note="Six node keys: root, input, triggerWrapper, popover, calendar, clearButton."
			>
				<template #default="{ testid }">
					<SDatePicker
						v-model="dateValue2"
						:attributes="{ root: { 'data-testid': testid } }"
						placeholder="Select a date"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-data-calendar-naive"
				component="SDataCalendar (attribute on the component)"
				tag="SDataCalendar"
				rule="root"
				note="Expected to fail, same cause."
			>
				<template #default="{ testid }">
					<SDataCalendar
						v-model="calendarDate"
						:data-testid="testid"
						:items="[]"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-data-calendar"
				component="SDataCalendar (attributes prop)"
				tag="SDataCalendar"
				rule="attributes"
				note="Eleven node keys — the union of keys is the list of what can be marked."
			>
				<template #default="{ testid }">
					<SDataCalendar
						v-model="calendarDate2"
						:attributes="{ root: { 'data-testid': testid } }"
						:items="[]"
					/>
				</template>
			</TestidProbe>
		</section>

		<!-- Overlays -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Overlays
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				Being ephemeral asks for nothing special. What matters is <em>where the component mounts its
					body</em>: these all teleport it out of the component subtree, so
				<code>content</code> is the only channel that reaches the panel. Each probe below opens itself,
				measures, and closes again.
			</p>

			<TestidProbe
				id="u-modal"
				component="UModal"
				rule="content"
				open-with="button"
			>
				<template #default="{ testid }">
					<UModal
						:content="{ 'data-testid': testid }"
						title="New booking"
					>
						<UButton
							label="Open"
							color="neutral"
							variant="outline"
						/>
						<template #body>
							<p class="text-sm">
								Body
							</p>
						</template>
					</UModal>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-slideover"
				component="USlideover"
				rule="content"
				open-with="button"
			>
				<template #default="{ testid }">
					<USlideover
						:content="{ 'data-testid': testid }"
						title="Edit listing"
					>
						<UButton
							label="Open"
							color="neutral"
							variant="outline"
						/>
						<template #body>
							<p class="text-sm">
								Body
							</p>
						</template>
					</USlideover>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-confirm-modal"
				component="SConfirmModal"
				rule="content"
				note="Wraps UModal, so the channel is modalProps.content rather than content directly."
				open-with="button"
			>
				<template #default="{ testid }">
					<SConfirmModal
						message="This action cannot be undone."
						:modal-props="{ title: 'Delete property', content: { 'data-testid': testid } }"
					>
						<UButton
							label="Open"
							color="neutral"
							variant="outline"
						/>
					</SConfirmModal>
				</template>
			</TestidProbe>
		</section>

		<!-- Nuxt UI components -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Nuxt UI components
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				Nuxt UI is not consistent about where an attribute written on the component lands, and the
				guideline deliberately does not promise a node. This is the reference for what it actually
				does — which is why the guideline points here instead of carrying a table.
			</p>

			<TestidProbe
				id="u-button"
				component="UButton"
				rule="root"
			>
				<template #default="{ testid }">
					<UButton
						:data-testid="testid"
						label="Generate"
						color="primary"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-badge"
				component="UBadge"
				rule="root"
				note="Marked like a button: a static id by default, a repeated child when inside a collection."
			>
				<template #default="{ testid }">
					<UBadge
						:data-testid="testid"
						color="success"
					>
						Live
					</UBadge>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-input"
				component="UInput"
				rule="root"
			>
				<template #default="{ testid }">
					<UInput
						:data-testid="testid"
						placeholder="Search"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-switch"
				component="USwitch"
				rule="root"
				note="Best case: inheritAttrs: false plus re-forwarding puts the attribute straight on the clickable control."
			>
				<template #default="{ testid }">
					<USwitch
						v-model="switchValue"
						:data-testid="testid"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-select"
				component="USelect"
				rule="root"
				note="Attribute goes on the trigger button, not the root."
			>
				<template #default="{ testid }">
					<USelect
						v-model="selectValue"
						:data-testid="testid"
						:items="['Standard', 'Deluxe']"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-select-menu"
				component="USelectMenu"
				rule="root"
				note="Review item: reading the sources predicted the attribute would stop on the ComboboxRoot wrapper div, unlike USelect which puts it on the trigger. The measurement disagrees — check what it says below before the guideline repeats the claim."
			>
				<template #default="{ testid }">
					<USelectMenu
						v-model="selectMenuValue"
						:data-testid="testid"
						:items="['Standard', 'Deluxe']"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-tabs"
				component="UTabs"
				rule="container"
				note="Per-item attributes are dropped by the item object — an upstream gap. Today the children need getByRole('tab', { name })."
				probe-children
			>
				<template #default="{ testid, child }">
					<UTabs
						v-model="tabsValue"
						:data-testid="testid"
						variant="link-fit"
						:items="[
							{ 'label': 'Overview', 'value': 'overview', 'data-testid': child, 'data-test-value': 'overview' },
							{ 'label': 'Bookings', 'value': 'bookings', 'data-testid': child, 'data-test-value': 'bookings' },
						]"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-radio-group"
				component="URadioGroup"
				rule="container"
				note="Per-item attributes are dropped, unlike its twin UCheckboxGroup. The value discriminant is needed and has no channel."
				probe-children
			>
				<template #default="{ testid, child }">
					<URadioGroup
						v-model="radioValue"
						:data-testid="testid"
						:items="[
							{ 'label': 'Daily', 'value': 'daily', 'data-testid': child, 'data-test-value': 'daily' },
							{ 'label': 'Weekly', 'value': 'weekly', 'data-testid': child, 'data-test-value': 'weekly' },
						]"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-slider"
				component="USlider"
				rule="root"
				note="Lands on the root span. Thumbs have no per-thumb channel; take them by order."
			>
				<template #default="{ testid }">
					<USlider
						v-model="uSliderValue"
						:data-testid="testid"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="u-table"
				component="UTable"
				rule="container"
				note="Rows and cells are tr/td, which take no attributes — the repeated child is the cell content rendered through the #<columnId>-cell slot."
				probe-children
			>
				<template #default="{ testid, child }">
					<UTable
						:data-testid="testid"
						:data="tableRows"
						:columns="tableColumns"
					>
						<template #name-cell="{ row }">
							<span
								:data-testid="child"
								:data-test-value="row.original.slug"
							>{{ row.original.name }}</span>
						</template>
					</UTable>
				</template>
			</TestidProbe>
		</section>

		<!-- Layer-owned ids -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Ids owned by the layer
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				The standard is that consumer apps mark elements, never the layer. These are the declared
				exception: the navigation shell is a singleton per application and these nodes are not exposed
				by any prop, so the layer fixes the id. That makes them <strong>public API</strong> — renaming
				one is a breaking change for every consumer's test suite, and belongs in the changelog as such.
				They are listed rather than probed because mounting the shell inside this page would put a
				second navigation on screen.
			</p>
			<div class="border border-default rounded-lg divide-y divide-default">
				<div
					v-for="id in LAYER_OWNED_IDS"
					:key="id.testid"
					class="p-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
				>
					<code class="text-sm font-semibold">{{ id.testid }}</code>
					<span class="text-xs text-muted">{{ id.component }}</span>
					<span class="text-xs text-muted">— {{ id.note }}</span>
				</div>
			</div>
		</section>

		<!-- Honest gaps in the derivation -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Not derived here
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				Components the render-and-read approach does not cover, and why. These are the cases where the
				method breaks down; they are listed rather than left as blank rows.
			</p>
			<div class="border border-default rounded-lg divide-y divide-default">
				<div
					v-for="gap in NOT_DERIVED"
					:key="gap.component"
					class="p-3 space-y-1"
				>
					<code class="text-sm font-semibold">{{ gap.component }}</code>
					<p class="text-xs text-muted">
						{{ gap.reason }}
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import type { TableColumn } from "@nuxt/ui";
	import { RULE_META } from "~/utils/testidRules";

	definePageMeta({
		// No layout: the default one mounts SNavigationShell, whose own hardcoded
		// testids would show up in the document-wide queries the probes run.
		layout: false
	});

	useHead({ title: "data-testid — review page" });

	const { summary } = useTestidProbes();

	const LAYER_OWNED_IDS = [
		{
			testid: "sidebar-collapse",
			component: "SNavigationShell",
			note: "two v-if branches of one button, so only ever one node in the DOM"
		},
		{
			testid: "product-navigation-menu",
			component: "SNavigationShell",
			note: "no prop exposes this node"
		},
		{
			testid: "navigation-products-select",
			component: "SNavigationProducts",
			note: "lives in the shell's #sidebar-header — same singleton perimeter"
		}
	];

	const NOT_DERIVED = [
		{
			component: "SNavigationShell / SNavigationPage / SNavigationBar*",
			reason: "Layout singletons. Mounting them here would render a second application shell around this page and break the measurement of every other probe. Their ids are listed above."
		},
		{
			component: "SMap layers (SMapMarker, SMapLayer, SMapPopup, …)",
			reason: "They render into the map canvas rather than into the document, so there is no node of their own to read. SMap itself is probed above."
		},
		{
			component: "Toast (useToast)",
			reason: "Not a component in a template: the caller of useToast() passes the key, so there is no render to read."
		}
	];

	// Reactive state for the probed components
	const accordionItems = [
		{ label: "Rooms", value: "rooms", content: "Configure room types." },
		{ label: "Payments", value: "payments", content: "Payment providers." }
	];
	const stepperValue = ref("property");
	const phone = ref("");
	const sliderValue = ref(50);
	const sliderOldValue = ref(50);
	const uSliderValue = ref(50);
	const multiSelectItems = [
		{ label: "Standard", value: "standard" },
		{ label: "Deluxe", value: "deluxe" }
	];
	const multiSelectValue = ref<string[]>([]);
	const dateValue = ref();
	const dateValue2 = ref();
	const calendarDate = ref("2026-06-01");
	const calendarDate2 = ref("2026-06-01");
	const switchValue = ref(false);
	const selectValue = ref("Standard");
	const selectMenuValue = ref("Standard");
	const tabsValue = ref("overview");
	const radioValue = ref("daily");

	const tableRows = [
		{ id: 1, slug: "villa-aurora", name: "Villa Aurora" },
		{ id: 2, slug: "casa-mare", name: "Casa Mare" }
	];
	const tableColumns: TableColumn<typeof tableRows[number]>[] = [
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "slug", header: "Slug" }
	];
</script>
