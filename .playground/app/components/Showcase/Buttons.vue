<template>
	<div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
		<template v-for="color in colors" :key="color">
			<div class="col-span-full text-sm font-medium text-gray-700 capitalize mt-4 first:mt-0">
				<ProseH2 class="my-0">
					{{ color }}
				</ProseH2>
			</div>
			<template v-for="variant in variants" :key="variant">
				<div class="col-span-full text-xs font-medium text-gray-500 capitalize mt-2">
					<ProseH4 class="mb-0 mt-2">
						{{ variant }}
					</ProseH4>
				</div>
				<div v-for="size in sizes" :key="size">
					<UButton :color="color" :variant="variant" :size="size">
						<div class="text-center">
							Button {{ size }}
						</div>
					</UButton>
				</div>
				<UButton :color="color" :variant="variant" disabled>
					<div class="text-center">
						Button Disabled
					</div>
				</UButton>
			</template>
		</template>
	</div>
</template>

<script lang="ts" setup>
	const { colors, variants, sizes } = useConstants();
</script>
