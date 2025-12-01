<template>
	<div class="space-y-6">
		<template v-for="color in alertColors" :key="color">
			<div class="col-span-full text-sm font-medium text-gray-700 capitalize mt-4 first:mt-0">
				<ProseH2 class="my-0">
					{{ color }}
				</ProseH2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<template v-for="variant in alertVariants" :key="variant">
					<UAlert
						:color="color"
						:variant="variant"
						:title="`${color} - ${variant}`"
						:description="`This is a ${variant} alert with ${color} color.`"
						icon="i-lucide-info"
					/>
				</template>
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>
	const { colors } = useConstants();

	// Filter to show ai and learning prominently, plus a few standard colors for comparison
	const alertColors = ["ai", "learning", "primary", "info", "success", "warning", "error"] as const;
	const alertVariants = ["solid", "soft", "subtle", "outline"] as const;
</script>
