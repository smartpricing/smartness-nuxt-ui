<!-- eslint-disable vue/custom-event-name-casing -->
<template>
	<UModal
		v-bind="resolvedModalProps"
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
					v-bind="resolvedCancelAttrs"
					@click="emit('close', false)"
				/>
				<UButton
					v-bind="resolvedConfirmAttrs"
					@click="handleConfirm"
				/>
			</slot>
		</template>
	</UModal>
</template>

<script setup lang="ts">
	import type { ButtonProps, ModalEmits, ModalSlots } from "@nuxt/ui";
	import type { SConfirmModalProps } from "./types";

	const props = withDefaults(defineProps<SConfirmModalProps>(), {
		loading: false,
		destructive: false
	});

	const emit = defineEmits<ModalEmits & { close: [value: boolean] }>();

	const slots = defineSlots<ModalSlots>();

	const defaultModalProps: SConfirmModalProps["modalProps"] = {
		closeIcon: "ph:x",
		ui: {
			footer: "justify-end"
		}
	};

	const resolvedModalProps = computed(() => {
		return {
			...defaultModalProps,
			...props.modalProps
		};
	});

	const otherSlots = computed(() => {
		const { title: _title, body: _b, footer: _f, ...rest } = slots;
		return rest;
	});

	function stripOnClick(btnProps?: ButtonProps): Omit<ButtonProps, "onClick"> {
		if (!btnProps) return {};
		const { onClick, ...rest } = btnProps;
		if (onClick && import.meta.dev) {
			console.warn("[SConfirmModal] onClick in confirmProps/cancelProps is ignored. Use the action prop or #footer slot instead.");
		}
		return rest;
	}

	const resolvedConfirmAttrs = computed(() => {
		const defaults: Partial<ButtonProps> = {
			label: "Confirm",
			variant: "solid",
			color: props.destructive ? "error" : "primary"
		};

		return {
			...defaults,
			...stripOnClick(props.confirmProps),
			loading: props.loading || (props.confirmProps?.loading ?? false)
		};
	});

	const resolvedCancelAttrs = computed(() => {
		const defaults: Partial<ButtonProps> = {
			label: "Cancel",
			color: "neutral" as const,
			variant: "outline" as const
		};

		return {
			...defaults,
			...stripOnClick(props.cancelProps),
			disabled: props.loading || (props.cancelProps?.disabled ?? false)
		};
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
