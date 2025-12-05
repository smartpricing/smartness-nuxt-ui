<template>
	<div class="space-y-6">
		<template v-for="color in selectColors" :key="color">
			<div class="col-span-full text-sm font-medium text-gray-700 capitalize mt-4 first:mt-0">
				<ProseH2 class="my-0">
					{{ color }}
				</ProseH2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<template v-for="variant in selectVariants" :key="variant">
					<div class="space-y-2">
						<div class="text-xs font-medium text-gray-500 capitalize">
							{{ variant }}
						</div>
						<USelect
							v-model="selectedValues[`${color}-${variant}`]"
							:color="color"
							:variant="variant"
							:items="options"
							placeholder="Select an option"
						/>
					</div>
				</template>
			</div>
			<div class="col-span-full text-sm font-medium text-gray-700 capitalize mt-4">
				<ProseH3 class="my-2">
					Sizes
				</ProseH3>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div v-for="size in sizes" :key="size" class="space-y-2">
					<div class="text-xs font-medium text-gray-500 capitalize">
						{{ size }}
					</div>
					<USelect
						v-model="selectedValues[`${color}-${size}`]"
						:color="color"
						:size="size"
						:items="options"
						placeholder="Select an option"
					/>
				</div>
			</div>
			<div class="col-span-full text-sm font-medium text-gray-700 capitalize mt-4">
				<ProseH3 class="my-2">
					Disabled
				</ProseH3>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div v-for="size in sizes" :key="size" class="space-y-2">
					<USelect
						v-model="selectedValues[`${color}-${size}`]"
						:color="color"
						:size="size"
						:items="options"
						placeholder="Select an option"
						disabled
					/>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>
	const { colors, sizes } = useConstants();

	// Filter to show ai and learning prominently, plus a few standard colors for comparison
	const selectColors = ["ai", "learning", "primary", "success", "warning", "error"] as const;
	const selectVariants = ["outline", "soft", "subtle", "ghost"] as const;

	// Sample options for the select
	const options = [
		{ label: "Option 1", value: "option-1" },
		{ label: "Option 2", value: "option-2" },
		{ label: "Option 3", value: "option-3" },
		{ label: "Option 4", value: "option-4", disabled: true },
		{ label: "Option 5", value: "option-5" }
	];

	// Store selected values for each select
	const selectedValues = ref<Record<string, string>>({});
</script>
