<template>
	<div class="flex items-center gap-3">
		<slot name="cta">
			<UButton
				v-bind="ctaResolvedProps"
				@click="$emit('cta')"
			/>
		</slot>
		<slot name="makeAWish">
			<ULink @click.prevent="$emit('makeAWish')">
				<UAvatar
					v-bind="makeAWishResolvedProps"
				/>
			</ULink>
		</slot>

		<slot name="helpCenter">
			<ULink @click.prevent="$emit('helpCenter')">
				<UAvatar
					v-bind="helpCenterResolvedProps"
				/>
			</ULink>
		</slot>

		<slot name="user">
			<UDropdownMenu v-bind="userResolvedProps.dropdown">
				<ULink>
					<UAvatar
						v-bind="userResolvedProps.trigger"
					/>
				</ULink>
			</UDropdownMenu>
		</slot>
	</div>
</template>

<script setup lang="ts">
	import type { AvatarProps, ButtonProps, DropdownMenuProps } from "@nuxt/ui";
	import { useLocale } from "@nuxt/ui/composables";

	const { cta = {}, makeAWish = {}, helpCenter = {}, user = {}, helpCenterText } = defineProps<{
		cta?: ButtonProps
		makeAWish?: AvatarProps
		helpCenter?: AvatarProps
		helpCenterText?: string
		user?: {
			trigger?: AvatarProps
			dropdown?: DropdownMenuProps
		}
	}>();

	defineEmits<{
		cta: []
		makeAWish: []
		helpCenter: []
		user: []
	}>();

	const { t } = useLocale();

	const ctaResolvedProps = computed<ButtonProps>(() => {
		return {
			color: "lemon",
			variant: "solid",
			label: t("sTopBar.ctaLabel"),
			icon: "ph:rocket-launch-bold",
			size: "md",
			ui: {
				label: "md:block hidden"
			},
			...cta
		};
	});

	const makeAWishResolvedProps = computed<AvatarProps>(() => {
		return {
			icon: "ph:magic-wand-bold",
			...makeAWish
		};
	});

	const helpCenterResolvedProps = computed<AvatarProps>(() => {
		return {
			icon: "lucide:message-circle-question-mark",
			chip: helpCenterText
				? {
					color: "info",
					size: "3xl",
					text: helpCenterText
				}
				: undefined,
			size: "md",
			class: "rounded-full",
			ui: {
				root: "bg-primary",
				icon: "text-white"
			},
			...helpCenter ?? {}
		};
	});

	const userResolvedProps = computed<{
		trigger: AvatarProps
		dropdown: DropdownMenuProps
	}>(() => {
		return {
			trigger: {
				color: "primary",
				variant: "ghost",
				icon: "ph:user-bold",
				size: "md",
				...user?.trigger ?? {}
			},
			dropdown: {
				...user?.dropdown ?? {}
			}
		};
	});
</script>
