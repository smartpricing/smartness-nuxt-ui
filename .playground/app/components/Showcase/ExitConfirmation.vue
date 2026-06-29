<template>
	<ShowcasePage
		title="Exit Confirmation"
		description="Composable that blocks route navigation and browser tab close when there are unsaved changes."
	>
		<section id="usage" class="space-y-4">
			<ProseH3>Usage</ProseH3>
			<p class="text-muted text-sm">
				Toggle the switch to simulate a dirty form, then click "Navigate away" to trigger the confirmation modal.
				Closing or reloading the browser tab will also show a native browser dialog.
			</p>
		</section>

		<section id="demo" class="space-y-4">
			<ProseH3>Demo</ProseH3>

			<div class="rounded-lg border border-default p-6 space-y-6">
				<!-- Simulated form -->
				<div class="space-y-3">
					<UFormField label="Name">
						<UInput v-model="name" placeholder="Type something to make the form dirty..." class="max-w-sm" />
					</UFormField>
				</div>

				<!-- Dirty state indicator -->
				<div class="flex items-center gap-3">
					<UBadge
						:color="isDirty ? 'warning' : 'success'"
						variant="subtle"
						:label="isDirty ? 'Unsaved changes' : 'No changes'"
					/>
				</div>

				<!-- Actions -->
				<div class="flex gap-3">
					<UButton
						label="Navigate away"
						icon="ph:sign-out"
						color="primary"
						@click="navigateAway"
					/>
					<UButton
						label="Reset"
						icon="ph:arrows-clockwise"
						color="neutral"
						variant="outline"
						@click="name = ''"
					/>
				</div>
			</div>
		</section>

		<!-- Custom options -->
		<section id="custom-options" class="space-y-4">
			<ProseH3>Custom Options</ProseH3>
			<p class="text-muted text-sm">
				Override every translation and toggle browser exit blocking.
			</p>

			<div class="rounded-lg border border-default p-6 space-y-6">
				<div class="grid gap-4 sm:grid-cols-2">
					<UFormField label="Title">
						<UInput v-model="customTitle" placeholder="Custom title..." />
					</UFormField>
					<UFormField label="Message">
						<UInput v-model="customMessage" placeholder="Custom message..." />
					</UFormField>
					<UFormField label="Confirm button label">
						<UInput v-model="customConfirmLabel" placeholder="Custom confirm..." />
					</UFormField>
					<UFormField label="Cancel button label">
						<UInput v-model="customCancelLabel" placeholder="Custom cancel..." />
					</UFormField>
				</div>

				<USwitch v-model="blockBrowserExit" label="Block browser exit (beforeunload)" />

				<!-- Dirty state indicator -->
				<div class="flex items-center gap-3">
					<UBadge
						:color="isCustomDirty ? 'warning' : 'success'"
						variant="subtle"
						:label="isCustomDirty ? 'Unsaved changes' : 'No changes'"
					/>
				</div>

				<!-- Simulated dirty field -->
				<UFormField label="Edit to make dirty">
					<UInput v-model="customFormValue" placeholder="Type something..." class="max-w-sm" />
				</UFormField>

				<!-- Actions -->
				<div class="flex gap-3">
					<UButton
						label="Navigate away"
						icon="ph:sign-out"
						color="primary"
						@click="navigateAway"
					/>
					<UButton
						label="Reset"
						icon="ph:arrows-clockwise"
						color="neutral"
						variant="outline"
						@click="customFormValue = ''"
					/>
				</div>
			</div>
		</section>

		<section id="api" class="space-y-4">
			<ProseH3>API</ProseH3>
			<PropsTable :props="propsData" />
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// --- Default demo ---
	const name = ref("");
	const isDirty = computed(() => name.value.length > 0);

	useExitConfirmation(isDirty);

	// --- Custom options demo ---
	const customTitle = ref("Discard draft?");
	const customMessage = ref("Your draft will be lost if you leave now.");
	const customConfirmLabel = ref("Discard");
	const customCancelLabel = ref("Keep editing");
	const blockBrowserExit = ref(true);

	const customFormValue = ref("");
	const isCustomDirty = computed(() => customFormValue.value.length > 0);

	useExitConfirmation(isCustomDirty, {
		title: computed(() => customTitle.value || undefined),
		message: computed(() => customMessage.value || undefined),
		confirmProps: computed(() => customConfirmLabel.value ? { label: customConfirmLabel.value } : undefined),
		cancelProps: computed(() => customCancelLabel.value ? { label: customCancelLabel.value } : undefined),
		blockBrowserExit: blockBrowserExit
	});

	function navigateAway() {
		navigateTo("/");
	}

	const propsData: PropDefinition[] = [
		{ prop: "shouldBlockNavigation", type: "MaybeRefOrGetter<boolean>", description: "Reactive condition that controls whether navigation is blocked" },
		{ prop: "options.title", type: "string", description: "Confirm modal title", default: "sExitConfirmation.title" },
		{ prop: "options.message", type: "string", description: "Confirm modal body text", default: "sExitConfirmation.message" },
		{ prop: "options.confirmProps", type: "ButtonProps", description: "Props for the confirm (leave) button", default: "{ label: sExitConfirmation.confirm }" },
		{ prop: "options.cancelProps", type: "ButtonProps", description: "Props for the cancel (stay) button", default: "{ label: sExitConfirmation.cancel }" },
		{ prop: "options.blockBrowserExit", type: "boolean", description: "Block browser tab close/reload with native dialog", default: "true" },
	];
</script>
