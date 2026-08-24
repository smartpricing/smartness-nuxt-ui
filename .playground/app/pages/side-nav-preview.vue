<template>
	<SNavigationShell :items="appNavigationItems">
		<template #sidebar-header="{ collapsed }">
			<SNavigationProducts
				v-model="currentProduct"
				:products="['pms', 'pricing', 'chat']"
				:collapsed="collapsed"
			/>
		</template>

		<SNavigationPage :panel-props="{ ui: { body: 'p-0 sm:p-0' } }">
			<template #header>
				<SNavigationBarTop
					:user="{ dropdown: { items: userDropdownItems } }"
					@cta="notify('CTA')"
					@help-center="notify('Help center')"
					@make-a-wish="notify('Make a wish')"
				/>
			</template>

			<SideNavPageLayout
				:title="pageTitle"
				:items="sideNavItems"
				:breadcrumbs="breadcrumbs"
				:back="isRootSection ? false : { icon: 'ph:caret-left', label: undefined, class: 'max-md:hidden' }"
				:padded="padded"
				@back="currentSection = 'presets'"
			>
				<template v-if="showAlert" #alert>
					<SAlert
						title="3 presets need to be reviewed"
						icon="ph:warning-circle"
						color="warning"
						:ui="{ root: 'max-lg:order-none max-lg:w-auto min-w-0 shrink' }"
					>
						<template #actions>
							<UButton
								size="sm"
								label="Review"
								@click="notify('Review all')"
							/>
						</template>
					</SAlert>
				</template>

				<template v-if="showActions" #actions>
					<UButton
						icon="ph:plus"
						label="Create"
						class="shrink-0"
						@click="notify('Create')"
					/>
				</template>

				<div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-default bg-elevated px-4 py-3">
					<span class="text-xs font-medium uppercase tracking-wide text-muted">
						Preview toggles
					</span>
					<USwitch
						v-model="showAlert"
						size="sm"
						label="Alert"
					/>
					<USwitch
						v-model="showActions"
						size="sm"
						label="Actions"
					/>
					<USwitch
						v-model="padded"
						size="sm"
						label="Padded body"
					/>
				</div>

				<UEmpty
					class="py-16"
					:icon="currentSectionMeta.icon"
					:title="currentSectionMeta.label"
					description="Section content goes here."
				/>
			</SideNavPageLayout>
		</SNavigationPage>
	</SNavigationShell>
</template>

<script lang="ts" setup>
	import type { BreadcrumbItem, DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";
	import type { SuiteProduct } from "../../../app/types/suite";
	import SideNavPageLayout from "~/components/Utility/SideNavPageLayout.vue";

	definePageMeta({ layout: false });

	const currentProduct = ref<SuiteProduct>("pms");

	const showAlert = ref(true);
	const showActions = ref(true);
	const padded = ref(false);

	const userDropdownItems: DropdownMenuItem[][] = [
		[
			{ label: "Profile", icon: "ph:user-bold" },
			{ label: "Settings", icon: "ph:gear-bold" }
		],
		[
			{ label: "Logout", icon: "ph:sign-out-bold" }
		]
	];

	const appNavigationItems: NavigationMenuItem[][] = [
		[
			{ label: "Back to showcase", icon: "ph:arrow-left", to: "/navigation" },
			{ label: "Calendar", icon: "ph:calendar" },
			{ label: "Reservations", icon: "ph:bed" },
			{ label: "Presets", icon: "ph:copy", active: true }
		]
	];

	const sectionGroups = [
		[
			{ value: "presets", label: "Presets", icon: "ph:copy" }
		],
		[
			{ value: "rate-plans", label: "Rate plans", icon: "ph:bookmark-simple" },
			{ value: "promotions", label: "Promotions", icon: "ph:percent" },
			{ value: "extras", label: "Extras", icon: "ph:plus" },
			{ value: "city-tax", label: "City tax", icon: "ph:receipt" },
			{ value: "message-templates", label: "Message templates", icon: "ph:chat-text" }
		]
	] as const;

	const currentSection = ref<string>("presets");

	// The presets list is the page root: it keeps the page title, adds no breadcrumb of its own and shows no back button
	const isRootSection = computed(() => currentSection.value === "presets");

	const currentSectionMeta = computed(() =>
		sectionGroups.flat().find((section) => section.value === currentSection.value) ?? sectionGroups[0][0]);

	const pageTitle = computed(() => isRootSection.value ? "Presets" : currentSectionMeta.value.label);

	const breadcrumbs = computed<BreadcrumbItem[]>(() => isRootSection.value
		? [{ label: "Home", to: "/" }, { label: "Presets" }]
		: [{ label: "Home", to: "/" }, { label: "Presets" }, { label: currentSectionMeta.value.label }]);

	const sideNavItems = computed<NavigationMenuItem[][]>(() =>
		sectionGroups.map((group) =>
			group.map((section) => ({
				label: section.label,
				icon: section.icon,
				active: currentSection.value === section.value,
				onSelect: () => {
					currentSection.value = section.value;
				}
			}))
		));

	const { add } = useToast();
	function notify(message: string) {
		add({
			title: "Action",
			description: message,
			color: "success"
		});
	}

	useHead({ title: "Side nav page - Smartness UI" });
</script>
