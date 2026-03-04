<script setup lang="ts">
import { useConfirm } from "smartness-vue";

const {confirm} = useConfirm();

async function askCose() {
	const result = await confirm({
		message: "Are you sure you want to close the window?",
		confirmProps: {
			label: "Yes",
		},
		action: () => {
			alert("Yes");
		},
	});
}


</script>

<template>
	<UApp>
<AppPage>

		<!-- Nuxt UI Components -->
		<section class="mb-12">
			<h2 class="heading-lg mb-4">Nuxt UI Components</h2>
			<div class="flex flex-wrap gap-4 items-start">
				<UButton label="Primary Button" @click="askCose"/>
				<UButton label="Secondary" color="secondary" variant="outline" />
				<UButton label="Ghost" variant="ghost" />
			</div>
			<div class="mt-4 max-w-sm">
				<UInput placeholder="Type something..." />
			</div>
			<div>
				<SMoreActions :actions="[
					{
						label: 'Home',
						icon: 'i-heroicons-home',
						onSelect: () => console.log('Home')
					},
					{
						label: 'Settings',
						icon: 'i-heroicons-cog',
						onSelect: () => console.log('Settings')
					},
					{
						label: 'Logout',
						icon: 'i-heroicons-logout',
						onSelect: () => console.log('Logout')
					}
				]" />
			</div>
		</section>
	</AppPage>
</UApp>
</template>
