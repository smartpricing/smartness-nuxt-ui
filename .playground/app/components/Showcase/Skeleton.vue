<template>
	<ShowcasePage
		title="Skeleton"
		description="The USkeleton component displays loading placeholders with the Smartness shimmer animation."
	>
		<PropsTable :props="propsData" />

		<section id="basic" class="space-y-4">
			<ProseH3>Basic</ProseH3>
			<UCard>
				<div class="flex items-center gap-4">
					<USkeleton class="size-12 rounded-full" />
					<div class="grid flex-1 gap-2">
						<USkeleton class="h-4 w-full max-w-[250px]" />
						<USkeleton class="h-4 w-full max-w-[200px]" />
					</div>
				</div>
			</UCard>
		</section>

		<section id="card" class="space-y-4">
			<ProseH3>Card Loading State</ProseH3>
			<div class="grid gap-4 md:grid-cols-2">
				<UCard
					v-for="card in 2"
					:key="card"
				>
					<div class="space-y-4">
						<USkeleton class="h-40 w-full" />
						<div class="space-y-2">
							<USkeleton class="h-5 w-2/3" />
							<USkeleton class="h-4 w-full" />
							<USkeleton class="h-4 w-5/6" />
						</div>
						<div class="flex gap-2">
							<USkeleton class="h-8 w-24" />
							<USkeleton class="h-8 w-20" />
						</div>
					</div>
				</UCard>
			</div>
		</section>

		<section id="table" class="space-y-4">
			<ProseH3>Table Loading State</ProseH3>
			<UCard>
				<div class="space-y-3">
					<div class="grid grid-cols-[2fr_1fr_1fr] gap-4 border-b border-default pb-3">
						<USkeleton class="h-4 w-32" />
						<USkeleton class="h-4 w-20" />
						<USkeleton class="h-4 w-24" />
					</div>
					<div
						v-for="row in 5"
						:key="row"
						class="grid grid-cols-[2fr_1fr_1fr] gap-4"
					>
						<USkeleton class="h-4 w-full" />
						<USkeleton class="h-4 w-16" />
						<USkeleton class="h-4 w-20" />
					</div>
				</div>
			</UCard>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "as", type: "any", description: "The element or component to render as", default: "div" },
		{ prop: "class", type: "string", description: "Classes for width, height, radius, and layout" },
		{ prop: "ui", type: "{ base?: string }", description: "Override the skeleton base slot classes" }
	];
</script>
