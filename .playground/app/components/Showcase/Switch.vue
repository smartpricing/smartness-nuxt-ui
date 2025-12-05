<template>
	<div class="space-y-6">
		<template v-for="color in colors" :key="color">
			<div class="col-span-full text-sm font-medium text-gray-700 capitalize mt-4 first:mt-0">
				<ProseH2 class="my-0">
					{{ color }}
				</ProseH2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<template v-for="variant in variants" :key="variant">
					<div class="space-y-2">
						<div class="text-xs font-medium text-gray-500 capitalize">
							{{ variant }}
						</div>
						<div class="flex items-center gap-2">
							<USwitch
								v-model="state"
								:color="color"
								:variant="variant"
							/>
							<span class="text-sm text-gray-600">Off</span>
						</div>
						<div class="flex items-center gap-2">
							<USwitch
								v-model="state"
								:color="color"
								:variant="variant"
							/>
							<span class="text-sm text-gray-600">On</span>
						</div>
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
					<div class="flex items-center gap-2">
						<USwitch
							v-model="state"
							:color="color"
							:size="size"
						/>
						<span class="text-sm text-gray-600">Off</span>
					</div>
					<div class="flex items-center gap-2">
						<USwitch
							v-model="state"
							:color="color"
							:size="size"
						/>
						<span class="text-sm text-gray-600">On</span>
					</div>
				</div>
			</div>
			<div class="col-span-full text-sm font-medium text-gray-700 capitalize mt-4">
				<ProseH3 class="my-2">
					Disabled
				</ProseH3>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div v-for="size in sizes" :key="size" class="space-y-2">
					<div class="text-xs font-medium text-gray-500 capitalize">
						{{ size }}
					</div>
					<div class="flex items-center gap-2">
						<USwitch
							:model-value="false"
							:color="color"
							:size="size"
							disabled
						/>
						<span class="text-sm text-gray-400">Disabled Off</span>
					</div>
					<div class="flex items-center gap-2">
						<USwitch
							:model-value="true"
							:color="color"
							:size="size"
							disabled
						/>
						<span class="text-sm text-gray-400">Disabled On</span>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>
	const { colors, sizes, variants } = useConstants();

	// Filter to show ai and learning prominently, plus a few standard colors for comparison

	// Store switch states
	const state = ref(false);
</script>
