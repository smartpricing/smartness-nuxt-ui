<template>
	<section class="space-y-4">
		<ProseH3>Props</ProseH3>
		<UTable
			:data="props"
			:columns="columns"
		/>
	</section>
</template>

<script setup lang="ts">
	export interface PropDefinition {
		/** Property name */
		prop: string
		/** TypeScript type */
		type: string
		/** Description of the prop */
		description: string
		/** Default value (optional) */
		default?: string
	}

	defineProps<{
		/** Array of prop definitions to display */
		props: PropDefinition[]
	}>();

	const columns = [
		{ accessorKey: "prop", header: "Prop" },
		{ accessorKey: "type", header: "Type" },
		{ accessorKey: "description", header: "Description" },
		{ accessorKey: "default", header: "Default" }
	];
</script>
