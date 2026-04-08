<template>
	<ShowcasePage
		title="TopBar"
		description="The STopBar component renders a group of standard actions (CTA, make-a-wish, help center, user) used inside SAppPage's top-navigation level."
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

		<section id="custom-slots" class="space-y-4">
			<ProseH3>Custom action slots</ProseH3>
			<p class="text-sm text-muted">
				Override individual actions via named slots (<code>#cta</code>, <code>#helpCenter</code>, <code>#user</code>).
			</p>
			<UCard>
				<STopBar>
					<template #cta>
						<UButton label="Custom Action" color="info" variant="soft" size="sm" />
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
