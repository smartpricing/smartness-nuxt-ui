<!-- eslint-disable vue/custom-event-name-casing -->
<template>
	<UModal
		v-bind="modalProps"
		@update:open="emit('update:open', $event)"
		@after:leave="emit('after:leave')"
		@after:enter="emit('after:enter')"
		@close:prevent="emit('close:prevent')"
	>
		<!-- Forward all user-provided slots except title/body/footer (handled below) -->
		<template v-for="(_, name) in otherSlots" :key="name" #[name]="slotData">
			<slot :name="name" v-bind="slotData as any" />
		</template>

		<template #title>
			<slot name="title">
				<div class="flex items-center gap-2">
					<UIcon :name="resolvedHeaderIcon" :class="destructive ? 'text-error' : ''" />
					<span class="text-lg font-medium">
						{{ modalProps?.title }}
					</span>
				</div>
			</slot>
		</template>

		<!-- Body: user override or default message -->
		<template #body="{ close: closeFn }">
			<slot name="body" :close="closeFn">
				<div class="">
					<p class="my-0 text-muted">
						{{ message }}
					</p>
				</div>
			</slot>
		</template>

		<!-- Footer: user override or default cancel/confirm buttons -->
		<template #footer="{ close: closeFn }">
			<slot name="footer" :close="closeFn">
				<UButton
					:label="cancelLabel"
					:color="cancelColor"
					:variant="cancelVariant"
					:disabled="loading"
					@click="emit('close', false)"
				/>
				<UButton
					:label="confirmLabel"
					:color="resolvedConfirmColor"
					:variant="confirmVariant"
					:loading="loading"
					@click="handleConfirm"
				/>
			</slot>
		</template>
	</UModal>
</template>

<script setup lang="ts">
	import type { ModalEmits, ModalSlots } from "@nuxt/ui";
	import type { SConfirmModalProps } from "./types";

	const props = withDefaults(defineProps<SConfirmModalProps>(), {
		loading: false,
		destructive: false,
		cancelColor: "neutral",
		confirmVariant: "solid",
		cancelVariant: "outline"
	});

	const emit = defineEmits<ModalEmits & { close: [value: boolean] }>();

	const slots = defineSlots<ModalSlots>();

	const otherSlots = computed(() => {
		const { title: _title, body: _b, footer: _f, ...rest } = slots;
		return rest;
	});

	const resolvedConfirmColor = computed(() => {
		return props.confirmColor ?? (props.destructive ? "error" : "primary");
	});

	async function handleConfirm() {
		if (!props.action) {
			emit("close", true);
			return;
		}

		try {
			await props.action();
		} finally {
			emit("close", true);
		}
	}

	const resolvedHeaderIcon = computed(() => {
		return props.headerIcon ?? (props.destructive ? "ph:warning-octagon-bold" : "ph:info-bold");
	});
</script>
