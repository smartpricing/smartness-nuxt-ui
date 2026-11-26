<template>
	<UModal
		:title="t('sTranslatableText.outdatedTitle')"
		:dismissible="!updating"
		:close="!updating"
		@update:open="(open: boolean) => { if (!open) emit('close', false); }"
	>
		<template #title>
			<div class="flex items-center gap-2">
				<UIcon
					name="ph:warning"
					class="text-warning"
				/>
				<span class="text-lg font-medium">{{ t("sTranslatableText.outdatedTitle") }}</span>
			</div>
		</template>

		<template #body>
			<div class="flex flex-col gap-3">
				<p class="my-0 text-muted">
					{{ t("sTranslatableText.outdatedMessage", { language: languageName }) }}
				</p>
				<UAlert
					v-if="failed"
					color="error"
					variant="subtle"
					icon="ph:warning-circle"
					:description="t('sTranslatableText.outdatedFailed')"
					data-slot="outdatedFailed"
				/>
			</div>
		</template>

		<template #footer>
			<div class="flex w-full flex-wrap justify-end gap-2">
				<UButton
					color="neutral"
					variant="outline"
					:label="t('sTranslatableText.outdatedBack')"
					:disabled="updating"
					data-slot="outdatedBack"
					@click="emit('close', false)"
				/>
				<UButton
					color="primary"
					variant="solid"
					icon="ph:magic-wand"
					:label="updating ? t('sTranslatableText.outdatedUpdating') : t('sTranslatableText.outdatedConfirm')"
					:disabled="updating"
					data-slot="outdatedConfirm"
					@click="confirm"
				/>
			</div>
		</template>
	</UModal>
</template>

<script setup lang="ts">
	import { useLocale } from "@nuxt/ui/composables";

	// The page's main action with out-of-date translations (useTranslatableTextGroup): one dialog for every text of
	// the page. It stays open while updating, and with the error when the update fails.
	const props = defineProps<{
		/** The language the texts are written in */
		language: string
		/** Updates every out-of-date translation; true when none is left */
		update: () => Promise<boolean>
	}>();
	const emit = defineEmits<{ close: [value: boolean] }>();

	const { t, code: localeCode } = useLocale();
	const languageName = computed(() => {
		try {
			return new Intl.DisplayNames([localeCode.value], { type: "language" }).of(props.language) ?? props.language;
		} catch {
			return props.language;
		}
	});

	const updating = ref(false);
	const failed = ref(false);

	async function confirm() {
		updating.value = true;
		failed.value = false;
		let done = false;
		try {
			done = await props.update();
		} catch {
			done = false;
		}
		updating.value = false;
		if (done) emit("close", true);
		else failed.value = true;
	}
</script>
