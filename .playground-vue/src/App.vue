<script setup lang="ts">
const colors = [
	"petrol-blue",
	"sky",
	"warm-gray",
	"burgundy",
	"lemon",
	"info",
	"success",
	"warning",
	"error",
	"off-black",
];
const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
</script>

<template>
	<div class="p-8 font-sans max-w-5xl mx-auto">
		<h1 class="heading-2xl mb-2">Smartness Vue Playground</h1>
		<p class="paragraph-md mb-8 text-gray-600">
			Testing the design system tokens loaded from the library.
		</p>

		<!-- Typography -->
		<section class="mb-12">
			<h2 class="heading-lg mb-4">Typography</h2>
			<div class="space-y-2">
				<p class="heading-2xl">Heading 2XL</p>
				<p class="heading-xl">Heading XL</p>
				<p class="heading-lg">Heading LG</p>
				<p class="heading-md">Heading MD</p>
				<p class="heading-sm">Heading SM</p>
				<p class="heading-xs">Heading XS</p>
				<p class="paragraph-lg">Paragraph LG — The quick brown fox jumps over the lazy dog.</p>
				<p class="paragraph-md">Paragraph MD — The quick brown fox jumps over the lazy dog.</p>
				<p class="paragraph-sm">Paragraph SM — The quick brown fox jumps over the lazy dog.</p>
				<p class="paragraph-xs">Paragraph XS — The quick brown fox jumps over the lazy dog.</p>
			</div>
		</section>

		<!-- Color Swatches -->
		<section class="mb-12">
			<h2 class="heading-lg mb-4">Colors</h2>
			<div class="space-y-4">
				<div v-for="color in colors" :key="color">
					<p class="label-sm mb-1 font-semibold">{{ color }}</p>
					<div class="flex gap-1">
						<div
							v-for="shade in shades"
							:key="shade"
							class="w-12 h-12 rounded"
							:style="{ backgroundColor: `var(--color-${color}-${shade})` }"
							:title="`${color}-${shade}`"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Transitions -->
		<section class="mb-12">
			<h2 class="heading-lg mb-4">Transitions</h2>
			<p class="paragraph-sm text-gray-500">
				Transition classes (slide-enter-active, fade-enter-active, etc.) are loaded.
				Test them in actual component mount/unmount.
			</p>
		</section>
	</div>
</template>
