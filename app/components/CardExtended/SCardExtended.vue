<template>
	<component
		:is="resolvedAs"
		class="relative flex flex-col rounded-lg border border-solid bg-white text-left transition-colors"
		:class="[rootClass, paddingClass]"
		:disabled="resolvedAs === 'button' && disabled ? true : undefined"
		v-bind="$attrs"
	>
		<slot v-if="type !== 'container'" name="header">
			<div class="flex flex-col gap-1">
				<!-- Single row: avatar, radio, label, badge, actions — all centered -->
				<div class="flex items-center gap-2.5">
					<slot v-if="type === 'filled'" name="leading">
						<UAvatar
							v-if="avatar"
							v-bind="avatar"
							:size="avatarSize"
							class="shrink-0"
						/>
					</slot>

					<span
						v-if="type === 'filled'"
						class="inline-flex items-center justify-center shrink-0 size-3.5 rounded-full border border-solid transition-colors"
						:class="selected
							? 'border-secondary-600 bg-secondary-600'
							: 'border-primary-300 bg-white'
						"
					>
						<span
							v-if="selected"
							class="size-1.5 rounded-full bg-white"
						/>
					</span>

					<div class="flex flex-1 items-center gap-2 min-w-0">
						<slot name="label">
							<span class="font-semibold text-primary-900 tracking-[0.28px] truncate text-xs">
								{{ label }}
							</span>
						</slot>

						<UBadge
							v-if="badge"
							v-bind="resolvedBadgeProps"
							size="sm"
							variant="subtle"
							color="neutral"
						/>
					</div>

					<div class="flex items-center gap-1 shrink-0">
						<slot name="actions">
							<template v-if="type === 'draggable'">
								<span class="flex items-center justify-center size-6 text-primary-400 cursor-grab">
									<UIcon name="ph:dots-six-vertical" class="size-4" />
								</span>
							</template>
							<template v-else-if="actions?.length">
								<UButton
									v-for="(action, i) in actions"
									:key="i"
									:icon="action.icon"
									variant="ghost"
									size="xs"
									color="neutral"
									:aria-label="action.label"
									:disabled="disabled"
									@click.stop="action.onClick?.($event)"
								/>
							</template>
						</slot>
					</div>
				</div>

				<!-- Description below the header row, indented to align with label text -->
				<p
					v-if="description"
					class="text-[12px] leading-[18px] tracking-[0.24px] text-primary-800"
					:class="descriptionPaddingClass"
				>
					{{ description }}
				</p>
			</div>
		</slot>

		<slot />

		<div
			v-if="$slots.footer"
			class="flex items-center justify-between mt-4"
		>
			<slot name="footer" />
		</div>
	</component>
</template>

<script setup lang="ts">
	import type { AvatarProps } from "@nuxt/ui";
	import type { SCardExtendedProps } from "./types";

	const props = withDefaults(defineProps<SCardExtendedProps>(), {
		type: "filled",
		size: "md",
		selected: false,
		disabled: false
	});

	defineSlots<{
		default: () => unknown
		header: () => unknown
		label: () => unknown
		leading: () => unknown
		actions: () => unknown
		footer: () => unknown
	}>();

	const resolvedAs = computed(() => {
		if (props.as) return props.as;
		return props.type === "filled" ? "button" : "div";
	});

	const resolvedSize = computed(() => {
		if (props.size === "no-padding" && props.type !== "container") {
			return "xs";
		}
		return props.size ?? "md";
	});

	const paddingClass = computed(() => {
		const map: Record<string, string> = {
			xs: "px-4 py-2",
			sm: "p-4",
			md: "p-6",
			lg: "p-8",
			"no-padding": "p-0"
		};
		return map[resolvedSize.value];
	});

	const rootClass = computed(() => {
		if (props.disabled) {
			return "border-primary-200 opacity-50 cursor-not-allowed pointer-events-none";
		}
		if (props.selected) {
			return "bg-secondary-50 border-2 border-secondary-600 cursor-pointer";
		}
		if (props.type === "filled") {
			return "border-primary-200 hover:bg-primary-50 cursor-pointer";
		}
		return "border-primary-200 hover:bg-primary-50";
	});

	const avatarSize = computed((): AvatarProps["size"] => {
		const map: Record<string, AvatarProps["size"]> = {
			xs: "xs",
			sm: "xs",
			md: "sm",
			lg: "md"
		};
		return map[resolvedSize.value] ?? "sm";
	});

	// avatarPx + gap(10) + radio(14) + gap(10) to align description with label text
	const descriptionPaddingClass = computed(() => {
		if (props.type !== "filled") return "";
		if (!props.avatar) return "pl-[24px]";
		const map: Record<string, string> = {
			xs: "pl-[58px]",
			sm: "pl-[58px]",
			md: "pl-[66px]",
			lg: "pl-[74px]"
		};
		return map[resolvedSize.value] ?? "pl-[66px]";
	});

	const resolvedBadgeProps = computed(() => {
		if (typeof props.badge === "string") {
			return { label: props.badge };
		}
		return props.badge ?? {};
	});
</script>
