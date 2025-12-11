<template>
	<div class="space-y-12">
		<section class="space-y-4">
			<ProseH1>{{ title }}</ProseH1>
			<p class="text-muted">
				{{ description }}
			</p>
		</section>
		<slot />
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		/** Title of the showcase page */
		title: string
		/** Description text for the component */
		description: string
	}>();
</script>
