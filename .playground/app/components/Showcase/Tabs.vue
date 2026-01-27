<template>
	<ShowcasePage
		title="Tabs"
		description="The UTabs component provides tabbed navigation with support for multiple variants, colors, sizes, and orientations."
	>
		<PropsTable :props="propsData" />

		<!-- Basic Usage -->
		<section id="basic" class="space-y-4">
			<ProseH3>Basic Usage</ProseH3>
			<p class="text-muted text-sm">
				Basic tabs with default styling.
			</p>
			<UTabs :items="basicItems" />
		</section>

		<!-- Variants -->
		<section id="variants" class="space-y-4">
			<ProseH3>Variants</ProseH3>
			<p class="text-muted text-sm">
				Available variants: pill (default), link, link-fit (content-width).
			</p>
			<div class="space-y-6">
				<div
					v-for="variant in tabVariants"
					:key="variant"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ variant }}
					</div>
					<UTabs
						:items="basicItems"
						:variant="variant"
					/>
				</div>
			</div>
		</section>

		<!-- Colors -->
		<section id="colors" class="space-y-4">
			<ProseH3>Colors</ProseH3>
			<p class="text-muted text-sm">
				Tabs support all theme colors.
			</p>
			<div class="space-y-6">
				<div
					v-for="color in colors"
					:key="color"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ color }}
					</div>
					<UTabs
						:items="basicItems"
						:color="color"
					/>
				</div>
			</div>
		</section>

		<!-- Sizes -->
		<section id="sizes" class="space-y-4">
			<ProseH3>Sizes</ProseH3>
			<p class="text-muted text-sm">
				Available sizes: xs, sm, md, lg, xl.
			</p>
			<div class="space-y-6">
				<div
					v-for="size in sizes"
					:key="size"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted capitalize">
						{{ size }}
					</div>
					<UTabs
						:items="basicItems"
						:size="size"
					/>
				</div>
			</div>
		</section>

		<!-- Orientation -->
		<section id="orientation" class="space-y-4">
			<ProseH3>Orientation</ProseH3>
			<p class="text-muted text-sm">
				Tabs can be displayed horizontally or vertically.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Horizontal (default)
					</div>
					<UTabs
						:items="basicItems"
						orientation="horizontal"
					/>
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Vertical
					</div>
					<UTabs
						:items="basicItems"
						orientation="vertical"
						class="w-fit"
					/>
				</div>
			</div>
		</section>

		<!-- With Icons -->
		<section id="icons" class="space-y-4">
			<ProseH3>With Icons</ProseH3>
			<p class="text-muted text-sm">
				Tabs can include icons with or without labels.
			</p>
			<div class="space-y-6">
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Icons with labels
					</div>
					<UTabs :items="iconItems" />
				</div>
				<div class="space-y-2">
					<div class="text-xs font-medium text-muted">
						Trailing icons
					</div>
					<UTabs :items="trailingIconItems" />
				</div>
			</div>
		</section>

		<!-- With Content -->
		<section id="content" class="space-y-4">
			<ProseH3>With Content</ProseH3>
			<p class="text-muted text-sm">
				Tabs can display content panels using the content property or slots.
			</p>
			<UTabs :items="contentItems" />
		</section>

		<!-- Disabled -->
		<section id="disabled" class="space-y-4">
			<ProseH3>Disabled State</ProseH3>
			<p class="text-muted text-sm">
				Individual tabs can be disabled.
			</p>
			<UTabs :items="disabledItems" />
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const { colors, sizes } = useConstants();

	const tabVariants = ["pill", "link", "link-fit"] as const;

	const basicItems = [
		{ label: "Account", value: "account" },
		{ label: "Password", value: "password" },
		{ label: "Notifications", value: "notifications" }
	];

	const iconItems = [
		{ label: "Account", icon: "ph:user", value: "account" },
		{ label: "Password", icon: "ph:lock", value: "password" },
		{ label: "Notifications", icon: "ph:bell", value: "notifications" }
	];

	const trailingIconItems = [
		{ label: "Account", trailingIcon: "ph:caret-right", value: "account" },
		{ label: "Password", trailingIcon: "ph:caret-right", value: "password" },
		{ label: "Notifications", trailingIcon: "ph:caret-right", value: "notifications" }
	];

	const contentItems = [
		{
			label: "Account",
			value: "account",
			content: "Manage your account settings and preferences."
		},
		{
			label: "Password",
			value: "password",
			content: "Change your password and security settings."
		},
		{
			label: "Notifications",
			value: "notifications",
			content: "Configure your notification preferences."
		}
	];

	const disabledItems = [
		{ label: "Account", value: "account" },
		{ label: "Password", value: "password", disabled: true },
		{ label: "Notifications", value: "notifications" }
	];

	const propsData: PropDefinition[] = [
		{ prop: "items", type: "TabItem[]", description: "Array of tab items with label, value, icon, content, etc." },
		{ prop: "modelValue", type: "string", description: "Active tab value (v-model)" },
		{ prop: "defaultValue", type: "string", description: "Default active tab value" },
		{ prop: "variant", type: "string", description: "Visual variant (pill, link, link-fit)", default: "pill" },
		{ prop: "color", type: "string", description: "Color theme", default: "primary" },
		{ prop: "size", type: "string", description: "Tab size (xs, sm, md, lg, xl)", default: "md" },
		{ prop: "orientation", type: "string", description: "Layout orientation (horizontal, vertical)", default: "horizontal" },
		{ prop: "unmount", type: "boolean", description: "Unmount inactive tab content from DOM", default: "true" }
	];
</script>
