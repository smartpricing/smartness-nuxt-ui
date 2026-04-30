<template>
	<SNavigationShell :items="computedNavigationItems">
		<template #sidebar-header="{ collapsed }">
			<SNavigationProducts
				v-model="currentProduct"
				:products="['pms', 'pricing', 'chat', 'connect']"
				:collapsed="collapsed"
			/>
		</template>

		<SNavigationPage>
			<template #header>
				<SNavigationBarTop
					:user="{
						dropdown: {
							items: userDropdownItems,
						},
					}"
					@cta="notify('Vuoi comprare un quadro?')"
					@help-center="notify('Ti aiuteremo a comprare un quadro')"
					@make-a-wish="notify('So che il tuo unico desiderio è un quadro')"
				/>
				<SNavigationBarBreadcrumb :items="demoBreadcrumb" />
				<SNavigationBarHeader
					title="Calendar"
					back
					how-does-it-work
					:tabs="demoTabs"
					:active-tab="activeTab"
					@back="notify('Going back!')"
					@how-does-it-work="notify('How does it work')"
					@tab-change="navigateTab"
				>
					<template #actions>
						<UButton
							label="Secondary"
							color="secondary"
							variant="outline"
							icon="ph:placeholder"
							@click="() => {}"
						/>
						<UButton
							label="Primary"
							color="primary"
							icon="ph:placeholder"
							@click="() => {}"
						/>
					</template>
				</SNavigationBarHeader>
			</template>

			<UContainer class="bg-white py-8">
				<slot />
			</UContainer>
		</SNavigationPage>
	</SNavigationShell>
</template>

<script setup lang="ts">
	import type { BreadcrumbItem, DropdownMenuItem, NavigationMenuItem, TabsItem } from "@nuxt/ui";
	import type { SuiteProduct } from "../../../app/types/suite";
	import { useSections } from "~/composables/useSections";

	const currentProduct = ref<SuiteProduct>("pms");

	const userDropdownItems: DropdownMenuItem[][] = [
		[
			{ label: "Profile", icon: "ph:user-bold" },
			{ label: "Settings", icon: "ph:gear-bold" }
		],
		[
			{ label: "Logout", icon: "ph:sign-out-bold" }
		]
	];
	const activeTab = ref<string | number>("tab1");

	const demoBreadcrumb: BreadcrumbItem[] = [
		{ label: "Home", to: "/" },
		{ label: "Calendar" }
	];

	const demoTabs: TabsItem[] = [
		{ label: "Tab1", value: "tab1" },
		{ label: "Tab2", value: "tab2" },
		{ label: "Tab3", value: "tab3" }
	];

	function navigateTab(value: string | number) {
		activeTab.value = value;
	}

	const route = useRoute();
	const router = useRouter();
	const { sections } = useSections();

	watch(
		() => route.hash,
		(hash) => {
			if (hash) {
				nextTick(() => {
					const id = hash.slice(1);
					const element = document.getElementById(id);
					if (element) {
						element.scrollIntoView({ behavior: "smooth" });
					}
				});
			}
		},
		{ immediate: true }
	);

	router.afterEach((to, from) => {
		if (to.path === from.path && to.hash && to.hash !== from.hash) {
			nextTick(() => {
				const id = to.hash.slice(1);
				const element = document.getElementById(id);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			});
		}
	});

	const baseNavigationItems: NavigationMenuItem[][] = [
		[
			{
				label: "Overview",
				icon: "i-heroicons-home",
				to: "/"
			},
			{
				label: "Actions Group",
				icon: "ph:dots-three-vertical-bold",
				to: "/actions-group"
			},
			{
				label: "Alerts",
				icon: "i-heroicons-bell-alert",
				to: "/alerts"
			},
			{
				label: "Badges",
				icon: "ph:tag-bold",
				to: "/badges"
			},
			{
				label: "Colors",
				icon: "ph:palette",
				to: "/colors"
			},
			{
				label: "Buttons",
				icon: "i-heroicons-cursor-arrow-rays",
				to: "/buttons"
			},
			{
				label: "Confirm Modal",
				icon: "ph:warning-circle",
				to: "/confirm-modal"
			},
			{
				label: "DataCalendar",
				icon: "ph:calendar",
				to: "/data-calendar"
			},
			{
				label: "DatePicker",
				icon: "ph:calendar-blank",
				to: "/date-picker"
			},
			{
				label: "Dataviz",
				icon: "i-heroicons-chart-bar",
				to: "/dataviz"
			},
			{
				label: "Header",
				icon: "i-heroicons-bars-3",
				to: "/header"
			},
			{
				label: "Modal",
				icon: "i-heroicons-window",
				to: "/modal"
			},
			{
				label: "Map",
				icon: "ph:map-pin",
				to: "/map"
			},
			{
				label: "More Actions",
				icon: "ph:dots-three-vertical-bold",
				to: "/more-actions"
			},
			{
				label: "MultiSelect",
				icon: "ph:tree-structure",
				to: "/multi-select"
			},
			{
				label: "Navigation",
				icon: "i-heroicons-squares-2x2",
				to: "/navigation"
			},
			{
				label: "NavigationMenu",
				icon: "ph:list-dashes",
				to: "/navigation-menu"
			},
			{
				label: "Phone Input",
				icon: "ph:phone",
				to: "/phone-input"
			},
			{
				label: "Select",
				icon: "i-heroicons-chevron-up-down",
				to: "/select"
			},
			{
				label: "SelectMenu",
				icon: "ph:magnifying-glass",
				to: "/select-menu"
			},
			{
				label: "Skeleton",
				icon: "ph:placeholder",
				to: "/skeleton"
			},
			{
				label: "Slideover",
				icon: "i-heroicons-arrows-right-left",
				to: "/slideover"
			},
			{
				label: "Stepper",
				icon: "ph:list-numbers",
				to: "/stepper"
			},
			{
				label: "Switch",
				icon: "i-heroicons-arrow-path",
				to: "/switch"
			},
			{
				label: "Tables",
				icon: "i-heroicons-table-cells",
				to: "/tables"
			},
			{
				label: "Tabs",
				icon: "i-heroicons-rectangle-group",
				to: "/tabs"
			},
			{
				label: "TopBar",
				icon: "ph:rows",
				to: "/top-bar"
			},
			{
				label: "TruncatedText",
				icon: "ph:text-t",
				to: "/truncated-text"
			},
			{
				label: "Typography",
				icon: "ph:text-aa",
				to: "/typography"
			}
		],
		[
			{
				label: "GitHub",
				icon: "i-simple-icons-github",
				to: "https://github.com/smartpricing/smartness-nuxt-ui/",
				target: "_blank"
			}
		]
	];

	const computedNavigationItems = computed<NavigationMenuItem[][]>(() => {
		return baseNavigationItems.map((group) =>
			group.map((item) => {
				const isActive = item.to === route.path;

				if (isActive && sections.value.length > 0) {
					return {
						...item,
						defaultOpen: true,
						children: sections.value.map((section) => ({
							label: section.label,
							to: `${item.to}#${section.id}`
						}))
					};
				}

				return item;
			})
		);
	});

	const { add } = useToast();
	function notify(message: string) {
		add({
			title: "Action",
			description: message,
			color: "success"
		});
	}
</script>
