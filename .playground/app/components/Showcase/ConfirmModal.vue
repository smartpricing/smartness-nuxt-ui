<template>
	<ShowcasePage
		title="Confirm Modal"
		description="A confirmation dialog built on UModal with default/destructive styles and a useConfirm composable for programmatic usage."
	>
		<PropsTable :props="propsData" />

		<USwitch v-model="loading" label="Loading" />

		<!-- Programmatic (useConfirm) -->
		<section id="programmatic" class="space-y-4">
			<ProseH3>Programmatic (useConfirm)</ProseH3>
			<p class="text-muted">
				Use the <code>useConfirm()</code> composable for programmatic usage. Returns a <code>Promise&lt;boolean&gt;</code>.
			</p>
			<div class="flex gap-2">
				<UButton label="Confirm (default)" @click="handleProgrammaticConfirm" />
				<UButton label="Confirm (destructive)" color="error" @click="handleProgrammaticDelete" />
			</div>
			<p v-if="programmaticResult !== null" class="text-sm text-muted">
				Result: <strong>{{ programmaticResult }}</strong>
			</p>
		</section>

		<!-- Custom Slots -->
		<section id="custom-slots" class="space-y-4">
			<ProseH3>Custom Slots</ProseH3>
			<p class="text-muted">
				Override <code>body</code>, <code>footer</code>, or any other UModal slot.
			</p>
			<div class="flex gap-2">
				<UButton label="Custom Body" @click="slotsOpen = true" />
			</div>
			<SConfirmModal
				v-model:open="slotsOpen"
				:modal-props="{
					title: 'Terms & Conditions',
					description: 'Please review and accept the terms before proceeding.',
				}"
			>
				<template #close>
					⊗
				</template>

				<template #body>
					<div class="space-y-3">
						<p class="text-muted text-sm">
							Please review and accept the terms before proceeding.
						</p>
						<div class="rounded-md bg-muted p-4 text-sm max-h-32 overflow-y-auto">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</div>
						<UCheckbox v-model="termsAccepted" label="I accept the terms and conditions" />
					</div>
				</template>
				<template #footer>
					<UButton label="Decline" color="neutral" variant="outline" @click="slotsOpen = false" />
					<UButton label="Accept" :disabled="!termsAccepted" @click="slotsOpen = false" />
				</template>
			</SConfirmModal>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	// Programmatic
	const { confirm } = useConfirm();
	const programmaticResult = ref<boolean | null>(null);

	const loading = ref(false);

	async function handleProgrammaticConfirm() {
		const result = await confirm({
			modalProps: {
				title: "Confirm update"
			},
			loading: computed(() => loading.value),
			message: "Do you want to apply these changes?",
			cancelProps: { label: "Cancel" },
			confirmProps: computed(() => ({
				label: loading.value ? "Loading..." : "Confirm"
			})),
			action: () => {
				return new Promise<void>((resolve) => {
					loading.value = true;
					setTimeout(() => {
						/* eslint-disable-next-line no-alert */
						alert("Azione eseguita");
						loading.value = false;
						resolve();
					}, 1000);
				});
			},
			headerIcon: "ph:acorn-bold"
		});
		programmaticResult.value = result;
	}

	async function handleProgrammaticDelete() {
		const result = await confirm({
			title: "Delete record",
			message: "This action is irreversible. Continue?",
			destructive: true,
			confirmProps: { label: "Delete", icon: "ph:trash" },
			cancelProps: { label: "Cancel" },
			loading: computed(() => loading.value),
			action: () => {
				return new Promise<void>((resolve) => {
					loading.value = true;
					setTimeout(() => {
						/* eslint-disable-next-line no-alert */
						alert("DISTRUTTO PER SEMPRE");
						loading.value = false;
						resolve();
					}, 1000);
				});
			}
		});
		programmaticResult.value = result;
	}

	// Custom slots
	const slotsOpen = ref(false);
	const termsAccepted = ref(false);

	const propsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "Modal title displayed in the header", default: "\"Confirm\"" },
		{ prop: "description", type: "string", description: "Subtitle under the title (UModal native)" },
		{ prop: "message", type: "string", description: "Body text content", default: "\"Are you sure?\"" },
		{ prop: "icon", type: "string", description: "Header icon name", default: "auto (ph:info or ph:octagon-alert)" },
		{ prop: "destructive", type: "boolean", description: "Switch to error style (red confirm, alert icon)", default: "false" },
		{ prop: "action", type: "() => void | Promise<void>", description: "Async action called on confirm click" },
		{ prop: "loading", type: "boolean", description: "Loading state for the confirm button", default: "false" },
		{ prop: "confirmProps", type: "ButtonProps", description: "Full UButton props for the confirm button (label, color, variant, icon, size, etc.)", default: "{ label: \"Confirm\", variant: \"solid\", color: \"primary\" }" },
		{ prop: "cancelProps", type: "ButtonProps", description: "Full UButton props for the cancel button (label, color, variant, icon, size, etc.)", default: "{ label: \"Cancel\", color: \"neutral\", variant: \"outline\" }" },
		{ prop: "dismissible", type: "boolean", description: "Allow closing via overlay click or Escape", default: "false" }
	];
</script>
