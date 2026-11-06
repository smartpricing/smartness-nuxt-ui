<template>
	<ShowcasePage
		title="Top bar"
		description="SNavigationBarTop is the first header row: mobile sidebar toggle (Smartness icon), optional #left slot, and shared actions (CTA, assistant, make-a-wish, help center, user). Replace the whole actions row with #default or override pieces with #cta, #makeAWish, #helpCenter, #user. #assistant takes the product's assistant button, right after the CTA."
	>
		<PropsTable :props="propsData" />

		<section id="default" class="space-y-4">
			<ProseH3>Default actions</ProseH3>
			<p class="text-sm text-muted">
				Default action cluster with all controls visible (same bar as in the app layout header).
			</p>
			<UCard>
				<SNavigationBarTop
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
				Custom CTA label and icon via the cta prop.
			</p>
			<UCard>
				<SNavigationBarTop
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

		<section id="assistant" class="space-y-4">
			<ProseH3>Assistant button</ProseH3>
			<p class="text-sm text-muted">
				The product puts its assistant button in <code>#assistant</code>, right after the CTA; it shows on every screen size. <code>:assistant="false"</code> hides it.
			</p>
			<UCard>
				<SNavigationBarTop
					@cta="notify('CTA clicked')"
					@help-center="notify('Help center clicked')"
					@make-a-wish="notify('Make a wish clicked')"
				>
					<template #assistant>
						<UButton
							icon="ph:sparkle-bold"
							color="neutral"
							variant="ghost"
							square
							aria-label="Assistant"
							@click="notify('Assistant clicked')"
						/>
					</template>
				</SNavigationBarTop>
			</UCard>
		</section>

		<section id="custom-slots" class="space-y-4">
			<ProseH3>Custom action slots</ProseH3>
			<p class="text-sm text-muted">
				Override individual actions via <code>#cta</code>, <code>#helpCenter</code>, <code>#user</code>, etc.
			</p>
			<UCard>
				<SNavigationBarTop>
					<template #cta>
						<UButton label="Custom Action" color="info" variant="soft" size="sm" />
					</template>
				</SNavigationBarTop>
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
		{ prop: "assistant", type: "boolean", description: "false hides the #assistant slot, where the product puts its assistant button", default: "true" },
		{ prop: "makeAWish", type: "AvatarProps", description: "Make-a-wish avatar props", default: "{ icon: \"ph:magic-wand-bold\" }" },
		{ prop: "helpCenter", type: "AvatarProps", description: "Help center avatar props", default: "{ icon: \"lucide:message-circle-question-mark\", size: \"md\" }" },
		{ prop: "helpCenterText", type: "string", description: "Text shown as a chip badge on the help center avatar" },
		{ prop: "user", type: "{ trigger?: AvatarProps, dropdown?: DropdownMenuProps }", description: "User avatar trigger and dropdown menu props", default: "{ trigger: { icon: \"ph:user-bold\", size: \"md\" }, dropdown: { items: [{ label: \"Profile\" }] } }" },
		{ prop: "ui", type: "Partial<{ root, left }>", description: "Optional Tailwind classes for the bar root and the left cluster" }
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
