<template>
	<ShowcasePage
		title="Auth"
		description="Full-page auth layout with animated chevron background and a centered form card for login, signup, and password-reset flows."
	>
		<!-- SAuthLayout -->
		<section id="s-auth-layout" class="space-y-4">
			<ProseH3>
				SAuthLayout
			</ProseH3>
			<p class="text-sm text-muted">
				Full-page wrapper with animated chevron background. Provides
				<code>#top-right</code>, <code>#bottom</code>, and <code>#background</code> slots.
				Chevron position and size are configurable via props.
			</p>

			<PropsTable :props="layoutPropsData" />

			<p class="text-sm text-muted font-medium">
				Preview (scaled down):
			</p>

			<div class="relative overflow-hidden rounded-lg border border-accented" style="height: 500px;">
				<div class="absolute inset-0 origin-top-left scale-[0.5]" style="width: 200%; height: 200%;">
					<SAuthLayout>
						<template #top-right>
							<USelect
								:items="[{ label: 'English', value: 'en' }, { label: 'Italiano', value: 'it' }]"
								model-value="en"
								value-key="value"
								class="w-[167px]"
							/>
						</template>
						<SAuthFormCard title="Welcome back">
							<div class="space-y-4">
								<UFormField label="Email">
									<UInput placeholder="you@example.com" class="w-full" />
								</UFormField>
								<UFormField label="Password">
									<UInput type="password" placeholder="••••••••" class="w-full" />
								</UFormField>
								<UButton label="Sign in" color="primary" block />
							</div>
						</SAuthFormCard>
						<template #bottom>
							<a href="#" class="pointer-events-auto text-xs text-primary-700 underline-offset-2 hover:text-primary-900 hover:underline">
								Terms and Conditions
							</a>
						</template>
					</SAuthLayout>
				</div>
			</div>
		</section>

		<USeparator />

		<!-- SAuthLayout - Custom Chevron Positions -->
		<section id="custom-chevron-positions" class="space-y-4">
			<ProseH3>
				Custom Chevron Positions
			</ProseH3>
			<p class="text-sm text-muted">
				Use <code>leftPosition</code> and <code>rightPosition</code> props to control chevron placement.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div
					v-for="combo in chevronCombos"
					:key="combo.label"
					class="space-y-2"
				>
					<p class="text-xs font-mono text-muted">
						{{ combo.label }}
					</p>
					<div class="relative overflow-hidden rounded-lg border border-accented" style="height: 200px;">
						<div class="absolute inset-0 origin-top-left scale-[0.25]" style="width: 400%; height: 400%;">
							<SAuthLayout
								:left-position="combo.left"
								:right-position="combo.right"
							>
								<SAuthFormCard title="Sign up" />
							</SAuthLayout>
						</div>
					</div>
				</div>
			</div>
		</section>

		<USeparator />

		<!-- SAuthFormCard -->
		<section id="s-auth-form-card" class="space-y-4">
			<ProseH3>
				SAuthFormCard
			</ProseH3>
			<p class="text-sm text-muted">
				Centered card with brand, title, header-actions, body, and footer slots.
				Default brand slot renders the Smartness wordmark. Default footer renders the support email.
			</p>

			<PropsTable :props="cardPropsData" />
		</section>

		<USeparator />

		<!-- Card - Title only -->
		<section id="card-title-only" class="space-y-4">
			<ProseH3>
				Title Only
			</ProseH3>
			<div class="bg-primary-50 rounded-lg p-4">
				<SAuthFormCard title="Reset your password">
					<div class="space-y-4">
						<UFormField label="Email address">
							<UInput placeholder="you@example.com" class="w-full" />
						</UFormField>
						<UButton label="Send reset link" color="primary" block />
					</div>
				</SAuthFormCard>
			</div>
		</section>

		<USeparator />

		<!-- Card - With header actions -->
		<section id="card-header-actions" class="space-y-4">
			<ProseH3>
				With Header Actions
			</ProseH3>
			<div class="bg-primary-50 rounded-lg p-4">
				<SAuthFormCard title="Create account">
					<template #header-actions>
						<UButton
							label="Sign in instead"
							variant="link"
							size="sm"
						/>
					</template>
					<div class="space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<UFormField label="First name">
								<UInput placeholder="John" class="w-full" />
							</UFormField>
							<UFormField label="Last name">
								<UInput placeholder="Doe" class="w-full" />
							</UFormField>
						</div>
						<UFormField label="Email">
							<UInput placeholder="you@example.com" class="w-full" />
						</UFormField>
						<UFormField label="Password">
							<UInput type="password" placeholder="••••••••" class="w-full" />
						</UFormField>
						<UButton label="Create account" color="primary" block />
					</div>
				</SAuthFormCard>
			</div>
		</section>

		<USeparator />

		<!-- Card - Custom brand -->
		<section id="card-custom-brand" class="space-y-4">
			<ProseH3>
				Custom Brand Slot
			</ProseH3>
			<p class="text-sm text-muted">
				Override the <code>#brand</code> slot to display a custom logo or heading.
			</p>
			<div class="bg-primary-50 rounded-lg p-4">
				<SAuthFormCard title="Partner login">
					<template #brand>
						<div class="flex flex-col items-center gap-2">
							<UIcon name="ph:buildings" class="size-12 text-primary" />
							<p class="text-sm text-muted">
								Partner Portal
							</p>
						</div>
					</template>
					<div class="space-y-4">
						<UFormField label="Partner ID">
							<UInput placeholder="P-12345" class="w-full" />
						</UFormField>
						<UButton label="Continue" color="primary" block />
					</div>
				</SAuthFormCard>
			</div>
		</section>

		<USeparator />

		<!-- Card - Custom footer -->
		<section id="card-custom-footer" class="space-y-4">
			<ProseH3>
				Custom Footer
			</ProseH3>
			<div class="bg-primary-50 rounded-lg p-4">
				<SAuthFormCard title="Sign in">
					<div class="space-y-4">
						<UFormField label="Email">
							<UInput placeholder="you@example.com" class="w-full" />
						</UFormField>
						<UButton label="Sign in" color="primary" block />
					</div>
					<template #footer>
						<p class="text-xs text-muted">
							By signing in, you agree to our
							<a href="#" class="underline">Terms of Service</a>
							and
							<a href="#" class="underline">Privacy Policy</a>.
						</p>
					</template>
				</SAuthFormCard>
			</div>
		</section>

		<USeparator />

		<!-- Card - Custom max width -->
		<section id="card-max-width" class="space-y-4">
			<ProseH3>
				Custom Max Width
			</ProseH3>
			<p class="text-sm text-muted">
				Use <code>maxWidth</code> to constrain card width. Default is 512px.
			</p>
			<div class="bg-primary-50 rounded-lg p-4">
				<SAuthFormCard title="Verify code" :max-width="380">
					<div class="space-y-4">
						<UFormField label="Verification code">
							<UInput placeholder="000000" class="w-full text-center" />
						</UFormField>
						<UButton label="Verify" color="primary" block />
					</div>
				</SAuthFormCard>
			</div>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const layoutPropsData: PropDefinition[] = [
		{ prop: "leftPosition", type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'", description: "Position of the smaller (variant a) chevron", default: "'top-left'" },
		{ prop: "rightPosition", type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'", description: "Position of the larger (variant b) chevron", default: "'bottom-right'" },
		{ prop: "leftSize", type: "number", description: "Desktop width of the smaller chevron in pixels", default: "650" },
		{ prop: "rightSize", type: "number", description: "Desktop width of the larger chevron in pixels", default: "1000" },
		{ prop: "ui", type: "{ root, topRight, main, bottom }", description: "CSS class overrides per slot" }
	];

	const cardPropsData: PropDefinition[] = [
		{ prop: "title", type: "string", description: "Card heading text", default: "''" },
		{ prop: "maxWidth", type: "number", description: "Maximum card width in pixels (Figma uses ~512)", default: "512" },
		{ prop: "ui", type: "{ wrapper, container, brand, card, header, title, body, footer }", description: "CSS class overrides per slot" }
	];

	type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
	const chevronCombos: { label: string, left: Position, right: Position }[] = [
		{ label: "top-left / bottom-right (default)", left: "top-left", right: "bottom-right" },
		{ label: "bottom-left / top-right", left: "bottom-left", right: "top-right" },
		{ label: "top-right / bottom-left", left: "top-right", right: "bottom-left" },
		{ label: "center / bottom-right", left: "center", right: "bottom-right" }
	];
</script>
