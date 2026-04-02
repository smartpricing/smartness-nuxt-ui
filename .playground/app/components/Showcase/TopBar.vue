<template>
	<ShowcasePage
		title="TopBar"
		description="A top navigation bar used inside the AppShell by each product. Provides a flexible left slot for product-specific content and standard right-side actions (CTA, settings, help, user)."
	>
		<PropsTable :props="propsData" />

		<section id="default" class="space-y-4">
			<ProseH3>Default</ProseH3>
			<p class="text-sm text-muted">
				Default STopBar with all standard actions visible.
			</p>
			<UCard>
				<STopBar
					help-center-text="5"
					:user="{
						dropdown: {
							items: userDropdownItems,
						},
					}"
					@cta="notify('CTA clicked')"
					@help-center="notify('Help center clicked')"
					@make-a-wish="notify('Make a wish clicked')"
				/>
			</UCard>
		</section>

		<section id="with-slot-content" class="space-y-4">
			<ProseH3>With slot content</ProseH3>
			<p class="text-sm text-muted">
				Product-specific elements in the default slot.
			</p>
			<UDashboardSearch />
			<UCard>
				<STopBar help-center-text="3">
					<div class="flex items-center  w-full">
						<UDashboardSearchButton />

						<div class="ml-auto flex items-center gap-2">
							<UBadge color="success" variant="soft">
								Live
							</UBadge>
							<span class="text-sm text-muted">Last sync: 2 min ago</span>
						</div>
					</div>
				</STopBar>
			</UCard>
		</section>

		<section id="custom-cta" class="space-y-4">
			<ProseH3>Custom CTA</ProseH3>
			<p class="text-sm text-muted">
				Custom CTA label and icon.
			</p>
			<UCard>
				<STopBar
					:cta="{
						label: 'Upgrade now',
						icon: 'ph:arrow-up-bold',
					}"
					@make-a-wish="notify('Make a wish clicked')"

					@help-center="notify('Help center clicked')"
					@cta="notify('CTA clicked')"
				/>
			</UCard>
		</section>

		<section id="actions-slot" class="space-y-4">
			<ProseH3>Custom actions slot</ProseH3>
			<p class="text-sm text-muted">
				Override the entire right side via the <code>#actions</code> slot.
			</p>
			<UCard>
				<STopBar>
					<span class="text-sm">Product content</span>
					<template #actions>
						<div class="flex items-center gap-2">
							<UButton label="Custom Action" color="info" variant="soft" size="xs" />
							<UButton icon="ph:gear" color="neutral" variant="ghost" size="sm" />
						</div>
					</template>
				</STopBar>
			</UCard>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { DropdownMenuItem } from "#ui/types";
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "cta", type: "ButtonProps", description: "CTA button props (color, variant, label, icon, size, etc.)", default: "{ color: \"lemon\", variant: \"solid\", label: \"Unlock full potential\", icon: \"ph:rocket-launch-bold\", size: \"md\" }" },
		{ prop: "makeAWish", type: "AvatarProps", description: "Make-a-wish avatar props", default: "{ icon: \"ph:magic-wand-bold\" }" },
		{ prop: "helpCenter", type: "AvatarProps", description: "Help center avatar props", default: "{ icon: \"lucide:message-circle-question-mark\", size: \"md\" }" },
		{ prop: "helpCenterText", type: "string", description: "Text shown as a chip badge on the help center avatar" },
		{ prop: "user", type: "{ trigger?: AvatarProps, dropdown?: DropdownMenuProps }", description: "User avatar trigger and dropdown menu props", default: "{ trigger: { icon: \"ph:user-bold\", size: \"md\" }, dropdown: { items: [{ label: \"Profile\" }] } }" }
	];

	const { add } = useToast();

	function notify(message: string) {
		add({
			title: "Action",
			description: message,
			color: "success"
		});
	}

	const userDropdownItems: DropdownMenuItem[] = [
		[
			{
				label: "Profile",
				icon: "ph:user-bold",
				to: "/profile"
			},
			{
				label: "Settings",
				icon: "ph:gear-bold",
				to: "/settings"
			},
			{
				label: "Billing",
				icon: "ph:credit-card-bold",
				to: "/billing"
			}
		],
		[

			{
				label: "Logout",
				icon: "ph:sign-out-bold",
				onSelect: () => {
					notify("Logout clicked");
				}
			}
		]
	];
</script>
