<template>
	<div class="flex flex-col flex-1 min-h-0 bg-primary-50/75">
		<SNavigationBarBreadcrumb
			v-if="props.breadcrumbs?.length"
			:items="props.breadcrumbs"
			separator="/"
			class="bg-default max-md:hidden"
		/>

		<div class="flex flex-1 min-h-0">
			<SNavigationMenu
				:items="props.items"
				class="bg-default p-4 w-60 hidden md:block"
			/>

			<div class="flex flex-col flex-1 min-w-0 min-h-0">
				<div class="bg-default sticky top-0 z-10">
					<SNavigationBarHeader
						class="max-md:hidden"
						:title="props.title"
						:back="props.back"
						:how-does-it-work="props.howDoesItWork ?? false"
						:ui="{
							titleRow: 'flex-row items-center max-md:flex-wrap',
							titleGroup: 'items-center max-lg:w-auto max-md:flex-1 md:shrink-0 md:mr-auto lg:shrink-0',
							wrapper: 'items-center',
							title: 'line-clamp-none truncate max-lg:flex-initial',
							actions: 'max-md:contents flex justify-end md:w-auto md:min-w-0 md:flex-nowrap md:shrink lg:shrink',
						}"
						@back="emit('back')"
						@how-does-it-work="emit('howDoesItWork')"
					>
						<template v-if="$slots.alert || $slots.actions" #actions>
							<slot name="alert" />
							<slot name="actions" />
						</template>
					</SNavigationBarHeader>

					<UDashboardToolbar class="md:hidden">
						<div class="grid grid-cols-[1fr_auto_1fr] items-center w-full">
							<UButton
								icon="ph:list"
								variant="ghost"
								color="neutral"
								class="justify-self-start"
								@click="mobileMenuOpen = true"
							/>
							<span class="text-sm font-medium text-highlighted truncate">
								{{ props.title }}
							</span>
							<div class="flex items-center gap-1 justify-self-end">
								<slot name="actions" />
							</div>
						</div>
					</UDashboardToolbar>

					<div
						v-if="$slots.alert"
						class="flex flex-col px-4 py-2 md:hidden"
					>
						<slot name="alert" />
					</div>
				</div>

				<UCard
					:ui="{
						root: 'overflow-y-auto grow min-h-0 ring-0 rounded-none bg-transparent',
						body: bodyClasses,
					}"
				>
					<slot />
				</UCard>
			</div>
		</div>

		<USlideover
			v-model:open="mobileMenuOpen"
			side="left"
			title="Sections"
			:ui="{ body: 'p-0' }"
		>
			<template #body>
				<SNavigationMenu
					:items="props.items"
					class="w-full p-4"
					@click="mobileMenuOpen = false"
				/>
			</template>
		</USlideover>
	</div>
</template>

<script lang="ts" setup>
	import type { BreadcrumbItem, ButtonProps, NavigationMenuItem } from "@nuxt/ui";

	const props = withDefaults(defineProps<{
		title: string
		items: NavigationMenuItem[][]
		breadcrumbs?: BreadcrumbItem[]
		back?: ButtonProps | boolean
		howDoesItWork?: ButtonProps | boolean
		padded?: boolean
		fill?: boolean
	}>(), {
		padded: false,
		fill: false
	});

	const emit = defineEmits<{
		(e: "back"): void
		(e: "howDoesItWork"): void
	}>();

	const mobileMenuOpen = ref(false);

	// min-h-full lets the body grow with overflowing content so the bottom padding stays after the last element.
	// fill pins the body to the scroll container as a bounded flex column: children cap themselves with `min-h-0`.
	const bodyClasses = computed(() => `${props.fill ? "h-full flex flex-col" : "min-h-full"} relative ${props.padded ? "" : "p-0 sm:p-0"}`);
</script>
