<template>
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">
			Overlays
		</h2>
		<p class="text-sm text-muted max-w-3xl">
			Being ephemeral asks for nothing special. What matters is <em>where the component mounts its
				body</em>: all of these teleport it out of their own subtree, so an attribute written on the
			component cannot reach the panel and the <code>content</code> prop is the way in. The trigger is
			always your own element, so it is tagged directly — and the header's X button is theirs, so it
			needs the <code>close</code> prop. Each case below opens itself, measures, and closes again.
		</p>

		<TestidCase
			id="u-modal"
			component="UModal"
			rule="content"
			note="Three separate nodes, three separate channels. Note that the close button needs the ButtonProps augmentation to type-check, and the panel needs no augmentation at all."
			:snippet="modalSnippet"
			:channels="modalChannels"
			open-with="[data-testid='case-u-modal-trigger']"
			settle-on="close"
		>
			<template #default="{ id }">
				<UModal
					title="New booking"
					:content="{ 'data-testid': id('content') }"
					:close="{ 'data-testid': id('close') }"
				>
					<UButton
						label="Open"
						color="neutral"
						variant="outline"
						:data-testid="id('trigger')"
					/>

					<template #body>
						<p
							class="text-sm"
							:data-testid="id('body')"
						>
							Body
						</p>
					</template>
				</UModal>
			</template>
		</TestidCase>

		<TestidCase
			id="u-slideover"
			component="USlideover"
			rule="content"
			note="Identical to UModal — same Dialog primitive, same props, same landing spots."
			:snippet="slideoverSnippet"
			:channels="slideoverChannels"
			open-with="[data-testid='case-u-slideover-trigger']"
			settle-on="close"
		>
			<template #default="{ id }">
				<USlideover
					title="Edit listing"
					:content="{ 'data-testid': id('content') }"
					:close="{ 'data-testid': id('close') }"
				>
					<UButton
						label="Open"
						color="neutral"
						variant="outline"
						:data-testid="id('trigger')"
					/>

					<template #body>
						<p class="text-sm">
							Body
						</p>
					</template>
				</USlideover>
			</template>
		</TestidCase>

		<TestidCase
			id="u-popover"
			component="UPopover"
			rule="content"
			note="The one that bites: UPopover's default slot is a fragment, so an attribute written on the component is discarded outright — no warning, no node. This is also why SMultiSelect, whose root is a UPopover, cannot be marked at all."
			:snippet="popoverSnippet"
			:channels="popoverChannels"
			open-with="[data-testid='case-u-popover-trigger']"
			settle-on="content"
		>
			<template #default="{ id }">
				<UPopover
					:content="{ 'data-testid': id('content') }"
					:data-testid="id('root')"
				>
					<UButton
						label="Filters"
						color="neutral"
						variant="outline"
						:data-testid="id('trigger')"
					/>

					<template #content>
						<div class="p-3 text-sm">
							Panel
						</div>
					</template>
				</UPopover>
			</template>
		</TestidCase>

		<TestidCase
			id="u-tooltip"
			component="UTooltip"
			rule="content"
			note="Rarely worth tagging — a tooltip is read, not acted on. When a test does need to assert its text, the content prop is the channel; the trigger stays your own element."
			:snippet="tooltipSnippet"
			:channels="tooltipChannels"
			open-with="[data-testid='case-u-tooltip-trigger']"
			settle-on="content"
		>
			<template #default="{ id }">
				<UTooltip
					text="Applies to every rate plan"
					:content="{ 'data-testid': id('content') }"
				>
					<UButton
						label="Hover me"
						color="neutral"
						variant="outline"
						:data-testid="id('trigger')"
					/>
				</UTooltip>
			</template>
		</TestidCase>

		<TestidCase
			id="s-confirm-modal"
			component="SConfirmModal"
			rule="content"
			note="A wrapper, so the channel is one level deeper: modalProps carries what you would otherwise write on UModal. The confirm and cancel buttons are the nodes a test actually clicks, and they have their own prop objects."
			:snippet="confirmSnippet"
			:channels="confirmChannels"
			open-with="[data-testid='case-s-confirm-modal-trigger']"
			settle-on="content"
		>
			<template #default="{ id }">
				<SConfirmModal
					message="This action cannot be undone."
					:modal-props="{ title: 'Delete property', content: { 'data-testid': id('content') } }"
					:confirm-props="{ 'data-testid': id('confirm') }"
					:cancel-props="{ 'data-testid': id('cancel') }"
				>
					<UButton
						label="Delete"
						color="neutral"
						variant="outline"
						:data-testid="id('trigger')"
					/>
				</SConfirmModal>
			</template>
		</TestidCase>
	</section>
</template>

<script setup lang="ts">
	import type { ChannelSpec } from "~/utils/testidProbing";

	const modalChannels: ChannelSpec[] = [
		{ key: "trigger", label: "The trigger", mechanic: "<UButton :data-testid=\"ids.newBookingButton\" /> — your own element" },
		{ key: "content", label: "The dialog panel", mechanic: ":content=\"{ 'data-testid': ids.newBookingModal }\"" },
		{ key: "close", label: "The header X button", mechanic: ":close=\"{ 'data-testid': ids.newBookingClose }\"" },
		{ key: "body", label: "Anything you render inside", mechanic: ":data-testid on your own markup in #body" }
	];

	const slideoverChannels: ChannelSpec[] = [
		{ key: "trigger", label: "The trigger", mechanic: "<UButton :data-testid=\"ids.editListingButton\" />" },
		{ key: "content", label: "The panel", mechanic: ":content=\"{ 'data-testid': ids.editListingSlideover }\"" },
		{ key: "close", label: "The header X button", mechanic: ":close=\"{ 'data-testid': ids.editListingClose }\"" }
	];

	const popoverChannels: ChannelSpec[] = [
		{
			key: "root",
			label: "The component itself",
			mechanic: "<UPopover data-testid=\"…\" />",
			deadEnd: true,
			instead: "Confirmed: the default slot is a fragment, so the inherited attribute has no single root to land on and is discarded. Tag the trigger and the content instead."
		},
		{ key: "trigger", label: "The trigger", mechanic: "<UButton :data-testid=\"ids.filtersButton\" />" },
		{ key: "content", label: "The panel", mechanic: ":content=\"{ 'data-testid': ids.filtersPanel }\"" }
	];

	const tooltipChannels: ChannelSpec[] = [
		{ key: "trigger", label: "The trigger", mechanic: "<UButton :data-testid=\"…\" />" },
		{ key: "content", label: "The tooltip bubble", mechanic: ":content=\"{ 'data-testid': ids.rateplanHint }\"" }
	];

	const confirmChannels: ChannelSpec[] = [
		{ key: "trigger", label: "The trigger", mechanic: "<UButton :data-testid=\"ids.deleteButton\" />" },
		{ key: "content", label: "The dialog panel", mechanic: ":modal-props=\"{ content: { 'data-testid': … } }\"" },
		{ key: "confirm", label: "The confirm button", mechanic: ":confirm-props=\"{ 'data-testid': ids.confirmDelete }\"" },
		{ key: "cancel", label: "The cancel button", mechanic: ":cancel-props=\"{ 'data-testid': ids.cancelDelete }\"" }
	];

	const modalSnippet = `<UModal
	title="New booking"
	:content="{ 'data-testid': ids.newBookingModal }"
	:close="{ 'data-testid': ids.newBookingClose }"
>
	<UButton label="Open" :data-testid="ids.newBookingButton" />

	<template #body>
		<p :data-testid="ids.newBookingBody">…</p>
	</template>
</UModal>`;

	const slideoverSnippet = `<USlideover
	title="Edit listing"
	:content="{ 'data-testid': ids.editListingSlideover }"
	:close="{ 'data-testid': ids.editListingClose }"
>
	<UButton label="Open" :data-testid="ids.editListingButton" />
	<template #body>…</template>
</USlideover>`;

	const popoverSnippet = `<!-- data-testid on UPopover itself reaches nothing: the slot is a fragment -->
<UPopover :content="{ 'data-testid': ids.filtersPanel }">
	<UButton label="Filters" :data-testid="ids.filtersButton" />

	<template #content>…</template>
</UPopover>`;

	const tooltipSnippet = `<UTooltip
	text="Applies to every rate plan"
	:content="{ 'data-testid': ids.rateplanHint }"
>
	<UButton label="Hover me" :data-testid="ids.rateplanHintTrigger" />
</UTooltip>`;

	const confirmSnippet = `<SConfirmModal
	message="This action cannot be undone."
	:modal-props="{ title: 'Delete property', content: { 'data-testid': ids.deleteModal } }"
	:confirm-props="{ 'data-testid': ids.confirmDelete }"
	:cancel-props="{ 'data-testid': ids.cancelDelete }"
>
	<UButton label="Delete" :data-testid="ids.deleteButton" />
</SConfirmModal>`;
</script>
