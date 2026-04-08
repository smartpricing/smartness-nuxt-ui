<template>
	<UDashboardPanel v-bind="panelProps">
		<template #header>
			<!-- Level 1: Top navigation (always visible) -->
			<div class="flex shrink-0 items-center gap-3.5 border-b border-default px-4 py-1">
				<UButton
					color="neutral"
					variant="ghost"
					square
					class="shrink-0 p-0 lg:hidden"
					:aria-label="sidebarOpen ? t('dashboardSidebarToggle.close') : t('dashboardSidebarToggle.open')"
					@click="() => toggleSidebar?.()"
				>
					<img
						v-if="!sidebarOpen"
						src="../../assets/images/smartness_icon.svg"
						alt=""
						class="size-8"
					>
					<UIcon
						v-else
						:name="appConfig.ui.icons.close"
						class="size-6 shrink-0"
					/>
				</UButton>
				<div class="flex flex-1 items-center self-stretch min-w-0">
					<slot name="top-left" />
				</div>
				<slot name="top-right">
					<STopBar
						v-bind="topBarProps"
						@cta="$emit('cta')"
						@make-a-wish="$emit('makeAWish')"
						@help-center="$emit('helpCenter')"
					/>
				</slot>
			</div>

			<!-- Level 2: Breadcrumb navigation (auto-hidden) -->
			<div
				v-if="showBreadcrumb"
				class="flex shrink-0 items-center justify-between gap-4 border-b border-default px-4 py-2"
			>
				<slot name="breadcrumb-left">
					<UBreadcrumb v-if="breadcrumb" :items="breadcrumb" />
				</slot>
				<slot name="breadcrumb-right" />
			</div>

			<!-- Level 3: Header navigation (auto-hidden) -->
			<div v-if="showHeader" class="flex shrink-0 flex-col border-b border-default">
				<div class="flex w-full flex-col gap-2 px-4 py-2 lg:flex-row lg:items-center lg:gap-4">
					<div class="flex grow-0 flex-1 items-center gap-2">
						<UButton
							v-if="backLabel"
							color="neutral"
							variant="ghost"
							icon="ph:arrow-left-bold"
							:label="backLabel"
							@click="$emit('back')"
						/>
						<h1 v-if="$slots.title || title" class="shrink heading-sm min-w-0 flex-1 truncate text-highlighted">
							<slot name="title">
								{{ title }}
							</slot>
						</h1>
					</div>
					<div
						v-if="$slots['header-actions']"
						class="flex w-full flex-wrap items-center justify-start gap-2 lg:flex-nowrap md:justify-end"
					>
						<slot name="header-actions" />
					</div>
				</div>
				<div v-if="tabs" class="px-3 pt-2">
					<UTabs
						color="secondary"
						variant="link"
						size="md"
						:content="false"
						:ui="{
							root: 'w-full block px-0 sm:px-0',
							list: 'block',
							indicator: 'h-[2px]',
						}"
						:model-value="activeTab"
						:items="tabs"
						@update:model-value="$emit('tabChange', $event)"
					/>
				</div>
			</div>
		</template>

		<template #body="bodyData">
			<slot v-bind="bodyData" />
		</template>

		<template v-if="$slots.footer" #footer="footerData">
			<slot name="footer" v-bind="footerData" />
		</template>
	</UDashboardPanel>
</template>

<script setup lang="ts">
	import type { AvatarProps, BreadcrumbItem, ButtonProps, DashboardPanelProps, DropdownMenuProps, TabsItem } from "@nuxt/ui";
	import { useLocale } from "@nuxt/ui/composables";
	import { useDashboard } from "@nuxt/ui/utils/dashboard";
	import { computed, useSlots } from "vue";
	import STopBar from "./STopBar.vue";

	const props = defineProps<{
		cta?: ButtonProps
		makeAWish?: AvatarProps
		helpCenter?: AvatarProps
		helpCenterText?: string
		user?: {
			trigger?: AvatarProps
			dropdown?: DropdownMenuProps
		}

		breadcrumb?: BreadcrumbItem[]

		title?: string
		backLabel?: string
		tabs?: TabsItem[]
		activeTab?: string | number

		panelProps?: Partial<DashboardPanelProps> & Record<string, unknown>
	}>();

	defineEmits<{
		cta: []
		makeAWish: []
		helpCenter: []
		back: []
		tabChange: [value: string | number]
	}>();

	const appConfig = useAppConfig();
	const { t } = useLocale();
	const slots = useSlots();
	const { sidebarOpen, toggleSidebar } = useDashboard({});

	const topBarProps = computed(() => ({
		cta: props.cta,
		makeAWish: props.makeAWish,
		helpCenter: props.helpCenter,
		helpCenterText: props.helpCenterText,
		user: props.user
	}));

	const showBreadcrumb = computed(() =>
		!!(props.breadcrumb?.length || slots["breadcrumb-left"] || slots["breadcrumb-right"])
	);

	const showHeader = computed(() =>
		!!(props.title || props.backLabel || props.tabs?.length || slots.title || slots["header-actions"])
	);
</script>
