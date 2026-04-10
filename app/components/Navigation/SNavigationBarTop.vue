<template>
	<div :class="resolvedUi.root">
		<UButton
			color="neutral"
			variant="ghost"
			square
			class="shrink-0 p-0 lg:hidden"
			:aria-label="sidebarOpen ? t('dashboardSidebarToggle.close') : t('dashboardSidebarToggle.open')"
			@click="() => toggleSidebar?.()"
		>
			<template v-if="!sidebarOpen">
				<slot name="logo">
					<img
						:src="logoIconSrc"
						alt=""
						class="size-8"
					>
				</slot>
			</template>
			<UIcon
				v-else
				:name="appConfig.ui.icons.close"
				class="size-6 shrink-0"
			/>
		</UButton>
		<div :class="resolvedUi.left">
			<slot name="left" />
		</div>
		<slot>
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
		</slot>
	</div>
</template>

<script setup lang="ts">
	import type { AvatarProps, ButtonProps, DropdownMenuProps } from "@nuxt/ui";
	import { useLocale } from "@nuxt/ui/composables";
	import { useDashboard } from "@nuxt/ui/utils/dashboard";
	import { computed } from "vue";

	const props = defineProps<{
		cta?: ButtonProps
		makeAWish?: AvatarProps
		helpCenter?: AvatarProps
		helpCenterText?: string
		user?: {
			trigger?: AvatarProps
			dropdown?: DropdownMenuProps
		}
		ui?: Partial<typeof defaultUi>
	}>();

	defineEmits<{
		cta: []
		makeAWish: []
		helpCenter: []
		user: []
	}>();

	const defaultUi = {
		root: "flex shrink-0 items-center gap-3.5 border-b border-default px-4 py-1",
		left: "flex flex-1 items-center self-stretch min-w-0"
	};

	const appConfig = useAppConfig();
	const { t } = useLocale();
	const { sidebarOpen, toggleSidebar } = useDashboard({});

	const logoIconSrc = new URL("../../assets/images/smartness_icon.svg", import.meta.url).href;

	const resolvedUi = computed(() => ({
		root: props.ui?.root ?? defaultUi.root,
		left: props.ui?.left ?? defaultUi.left
	}));

	const ctaResolvedProps = computed<ButtonProps>(() => {
		return {
			color: "lemon",
			variant: "solid",
			label: t("sTopBar.ctaLabel"),
			icon: "ph:rocket-launch-bold",
			size: "md",
			ui: {
				label: "max-md:hidden"
			},
			...props.cta ?? {}
		};
	});

	const makeAWishResolvedProps = computed<AvatarProps>(() => {
		return {
			icon: "ph:magic-wand-bold",
			...props.makeAWish ?? {}
		};
	});

	const helpCenterResolvedProps = computed<AvatarProps>(() => {
		return {
			icon: "lucide:message-circle-question-mark",
			chip: props.helpCenterText
				? {
					color: "info",
					size: "3xl",
					text: props.helpCenterText
				}
				: undefined,
			size: "md",
			class: "rounded-full",
			ui: {
				root: "bg-primary",
				icon: "text-white"
			},
			...props.helpCenter ?? {}
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
				...props.user?.trigger ?? {}
			},
			dropdown: {
				...props.user?.dropdown ?? {}
			}
		};
	});
</script>
