<template>
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">
			Form controls
		</h2>
		<p class="text-sm text-muted max-w-3xl">
			The easy majority: one control, one node, plain fallthrough. They are here anyway, because
			"obvious" is exactly where a silent drop hides — and because several of them have a second
			node the eye skips over: the increment buttons of a number field, an alert's dismiss, the
			thumbs of a slider.
		</p>

		<TestidCase
			id="u-input"
			component="UInput"
			rule="root"
			note="Lands on the input element itself, which is what a test wants to fill. Leading and trailing affordances rendered through the slots are your own markup and take their own ids."
			:snippet="inputSnippet"
			:channels="inputChannels"
		>
			<template #default="{ id }">
				<UInput
					v-model="inputValue"
					placeholder="Guest name"
					:data-testid="id('root')"
				>
					<template #trailing>
						<UButton
							icon="ph:x"
							size="xs"
							color="neutral"
							variant="link"
							:data-testid="id('clear')"
						/>
					</template>
				</UInput>
			</template>
		</TestidCase>

		<TestidCase
			id="u-input-number"
			component="UInputNumber"
			rule="attributes"
			note="Three nodes: the field and the two steppers. The steppers are ButtonProps objects, so they need the same augmentation as a modal's close button."
			:snippet="inputNumberSnippet"
			:channels="inputNumberChannels"
		>
			<template #default="{ id }">
				<UInputNumber
					v-model="numberValue"
					:data-testid="id('root')"
					:increment="{ 'data-testid': id('increment') }"
					:decrement="{ 'data-testid': id('decrement') }"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-textarea"
			component="UTextarea"
			rule="root"
			:snippet="textareaSnippet"
			:channels="[{ key: 'root', label: 'The field', mechanic: ':data-testid=\'ids.notesTextarea\'' }]"
		>
			<template #default="{ id }">
				<UTextarea
					v-model="textareaValue"
					placeholder="Internal notes"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-switch"
			component="USwitch"
			rule="root"
			note="The attribute ends up on the inner button, not on the label wrapper — so a click on the testid is the click that toggles."
			:snippet="switchSnippet"
			:channels="[{ key: 'root', label: 'The toggle', mechanic: ':data-testid=\'ids.autopilotSwitch\'' }]"
		>
			<template #default="{ id }">
				<USwitch
					v-model="switchValue"
					label="Autopilot"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-checkbox"
			component="UCheckbox"
			rule="root"
			:snippet="checkboxSnippet"
			:channels="[{ key: 'root', label: 'The checkbox', mechanic: ':data-testid=\'ids.termsCheckbox\'' }]"
		>
			<template #default="{ id }">
				<UCheckbox
					v-model="checkboxValue"
					label="I accept the terms"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-slider"
			component="USlider"
			rule="root"
			note="The declared exception to the no-index rule: a range slider's thumbs have fixed cardinality and fixed order, and no per-thumb channel exists, so a test takes them by position."
			:snippet="sliderSnippet"
			:channels="sliderChannels"
		>
			<template #default="{ id }">
				<USlider
					v-model="sliderValue"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-pin-input"
			component="UPinInput"
			rule="container"
			note="One component, several inputs, and no way to name them apart — the same fixed-order exception as the slider thumbs."
			:snippet="pinSnippet"
			:channels="pinChannels"
		>
			<template #default="{ id }">
				<UPinInput
					v-model="pinValue"
					:length="4"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-button"
			component="UButton"
			rule="root"
			note="The base case the whole standard rests on, and the reason ButtonProps is the augmentation that matters most: every prop object elsewhere — close, increment, confirm, an SActionsGroup item — is a ButtonProps."
			:snippet="buttonSnippet"
			:channels="[{ key: 'root', label: 'The button', mechanic: ':data-testid=\'ids.saveButton\'' }]"
		>
			<template #default="{ id }">
				<UButton
					label="Save"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-badge"
			component="UBadge"
			rule="root"
			note="Tagged like a button by decision, against the ticket's own recommendation: a badge often carries the state a test asserts on. Inside a collection it is a repeated child like any other."
			:snippet="badgeSnippet"
			:channels="[{ key: 'root', label: 'The badge', mechanic: ':data-testid=\'ids.statusBadge\'' }]"
		>
			<template #default="{ id }">
				<UBadge
					label="Confirmed"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="u-alert"
			component="UAlert"
			rule="root"
			note="Two nodes: the alert and its dismiss. The dismiss only exists when close is set, and it takes its id the same way a modal's does."
			:snippet="alertSnippet"
			:channels="alertChannels"
		>
			<template #default="{ id }">
				<UAlert
					title="Rates are out of sync"
					color="warning"
					:data-testid="id('root')"
					:close="{ 'data-testid': id('close') }"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-alert"
			component="SAlert"
			rule="root"
			:snippet="sAlertSnippet"
			:channels="[{ key: 'root', label: 'The alert', mechanic: ':data-testid=\'ids.unsavedAlert\'' }]"
		>
			<template #default="{ id }">
				<SAlert
					show
					title="You have unsaved changes"
					icon="ph:info"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-collapsible"
			component="SCollapsible"
			rule="root"
			:snippet="collapsibleSnippet"
			:channels="[{ key: 'root', label: 'The collapsible', mechanic: ':data-testid=\'ids.periodsCollapsible\'' }]"
		>
			<template #default="{ id }">
				<SCollapsible
					label="4 periods selected"
					:data-testid="id('root')"
				>
					<p class="text-sm">
						Body
					</p>
				</SCollapsible>
			</template>
		</TestidCase>

		<TestidCase
			id="s-truncated-text"
			component="STruncatedText"
			rule="root"
			:snippet="truncatedSnippet"
			:channels="[{ key: 'root', label: 'The text', mechanic: ':data-testid=\'ids.propertyName\'' }]"
		>
			<template #default="{ id }">
				<STruncatedText
					text="A property name long enough to be truncated"
					class="max-w-[200px]"
					:data-testid="id('root')"
				/>
			</template>
		</TestidCase>

		<TestidCase
			id="s-form-field"
			component="SFormField"
			rule="root"
			note="The layer gap worth knowing before you trust a green result: the attribute lands on the field wrapper — label, help text and control together — not on the control. A test that clicks it clicks a div. Every component using SFormField as its root inherits this, SSlider included. It cannot render here at all: it calls useI18n(), which only exists in a consumer app, so the failure below belongs to the playground and not to the mechanic."
			:snippet="formFieldSnippet"
			:channels="formFieldChannels"
		>
			<template #default="{ id }">
				<SFormField
					label="Base rate"
					name="baseRate"
					:data-testid="id('root')"
				>
					<UInput
						placeholder="120"
						:data-testid="id('control')"
					/>
				</SFormField>
			</template>
		</TestidCase>
	</section>
</template>

<script setup lang="ts">
	import type { ChannelSpec } from "~/utils/testidProbing";

	const inputValue = ref("");
	const numberValue = ref(2);
	const textareaValue = ref("");
	const switchValue = ref(true);
	const checkboxValue = ref(false);
	const sliderValue = ref(40);
	const pinValue = ref<string[]>([]);

	const inputChannels: ChannelSpec[] = [
		{ key: "root", label: "The field", mechanic: ":data-testid=\"ids.guestNameInput\"" },
		{ key: "clear", label: "A trailing affordance", mechanic: "#trailing + :data-testid on your own button" }
	];

	const inputNumberChannels: ChannelSpec[] = [
		{ key: "root", label: "The field", mechanic: ":data-testid=\"ids.guestsInput\"" },
		{ key: "increment", label: "The + button", mechanic: ":increment=\"{ 'data-testid': ids.guestsIncrement }\"" },
		{ key: "decrement", label: "The − button", mechanic: ":decrement=\"{ 'data-testid': ids.guestsDecrement }\"" }
	];

	const sliderChannels: ChannelSpec[] = [
		{ key: "root", label: "The slider", mechanic: ":data-testid=\"ids.priceSlider\"" }
	];

	const pinChannels: ChannelSpec[] = [
		{ key: "root", label: "The group", mechanic: ":data-testid=\"ids.otpInput\"" }
	];

	const alertChannels: ChannelSpec[] = [
		{ key: "root", label: "The alert", mechanic: ":data-testid=\"ids.rateSyncAlert\"" },
		{ key: "close", label: "The dismiss button", mechanic: ":close=\"{ 'data-testid': ids.rateSyncDismiss }\"" }
	];

	const formFieldChannels: ChannelSpec[] = [
		{ key: "root", label: "The field wrapper (NOT the control)", mechanic: ":data-testid=\"ids.baseRateField\"" },
		{ key: "control", label: "The control inside it", mechanic: ":data-testid on the UInput you pass in" }
	];

	const inputSnippet = `<UInput v-model="guestName" :data-testid="ids.guestNameInput">
	<template #trailing>
		<UButton icon="ph:x" :data-testid="ids.guestNameClear" />
	</template>
</UInput>`;

	const inputNumberSnippet = `<UInputNumber
	v-model="guests"
	:data-testid="ids.guestsInput"
	:increment="{ 'data-testid': ids.guestsIncrement }"
	:decrement="{ 'data-testid': ids.guestsDecrement }"
/>`;

	const textareaSnippet = `<UTextarea v-model="notes" :data-testid="ids.notesTextarea" />`;

	const switchSnippet = `<USwitch v-model="autopilot" label="Autopilot" :data-testid="ids.autopilotSwitch" />`;

	const checkboxSnippet = `<UCheckbox v-model="accepted" label="I accept" :data-testid="ids.termsCheckbox" />`;

	const sliderSnippet = `<USlider v-model="price" :data-testid="ids.priceSlider" />

// Thumbs have no channel. Range sliders are taken by order:
// page.getByTestId(ids.priceSlider).getByRole("slider").nth(1)`;

	const pinSnippet = `<UPinInput v-model="otp" :length="4" :data-testid="ids.otpInput" />

// The individual boxes are taken by order, like slider thumbs.`;

	const buttonSnippet = `<UButton label="Save" :data-testid="ids.saveButton" />`;

	const badgeSnippet = `<UBadge label="Confirmed" :data-testid="ids.statusBadge" />`;

	const alertSnippet = `<UAlert
	title="Rates are out of sync"
	:data-testid="ids.rateSyncAlert"
	:close="{ 'data-testid': ids.rateSyncDismiss }"
/>`;

	const sAlertSnippet = `<SAlert show title="You have unsaved changes" :data-testid="ids.unsavedAlert" />`;

	const collapsibleSnippet = `<SCollapsible label="4 periods selected" :data-testid="ids.periodsCollapsible">…</SCollapsible>`;

	const truncatedSnippet = `<STruncatedText :text="property.name" :data-testid="ids.propertyName" />`;

	const formFieldSnippet = `<!-- The id lands on the wrapper, not on the input. Tag the control too. -->
<SFormField label="Base rate" name="baseRate" :data-testid="ids.baseRateField">
	<UInput v-model="baseRate" :data-testid="ids.baseRateInput" />
</SFormField>`;
</script>
