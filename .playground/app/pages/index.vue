<template>
	<UContainer class="py-8 space-y-8">
		<!-- Header -->
		<div class="space-y-2">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">
				Smartness UI Components
			</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Design system and component library for the Smartness suite
			</p>
		</div>

		<!-- Navigation Demo Link -->
		<UCard>
			<template #header>
				<div class="flex items-center gap-3">
					<UIcon name="i-heroicons-bars-3" class="size-6 text-primary-600" />
					<h2 class="text-xl font-semibold">
						Navigation Components
					</h2>
				</div>
			</template>

			<div class="space-y-4">
				<p class="text-gray-600 dark:text-gray-400">
					Check out the NavigationShell component built with Nuxt UI Dashboard components,
					featuring product switching, collapsible sidebar, nested menu items, and mobile support.
				</p>

				<NuxtLink to="/navigation">
					<UButton icon="i-heroicons-arrow-right" trailing color="primary">
						View Navigation Demo
					</UButton>
				</NuxtLink>
			</div>
		</UCard>

		<!-- Showcase Buttons -->
		<section>
			<ProseH1>Buttons</ProseH1>
			<ShowcaseButtons />
		</section>

		<section>
			<ProseH1>Alerts</ProseH1>
			<ShowcaseAlerts />
		</section>

		<section>
			<ProseH1>Select</ProseH1>
			<ShowcaseSelect />
		</section>

		<section>
			<ProseH1>Switch</ProseH1>
			<ShowcaseSwitch />
		</section>

		<!-- Color Swatch -->
		<div class="size-20 bg-primary-950" />
	</UContainer>
</template>
