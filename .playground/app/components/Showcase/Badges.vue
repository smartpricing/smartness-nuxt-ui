<template>
	<ShowcasePage
		title="Badges"
		description="The UBadge component displays a short text to represent a status or a category."
	>
		<PropsTable :props="propsData" />

		<template v-for="color in badgeColors" :key="color">
			<section :id="color" class="space-y-4">
				<ProseH3 class="capitalize">
					{{ color }}
				</ProseH3>
				<div class="space-y-4">
					<template v-for="variant in badgeVariants" :key="variant">
						<div class="space-y-2">
							<ProseH4 class="capitalize text-muted">
								{{ variant }}
							</ProseH4>
							<div class="flex flex-wrap items-center gap-3">
								<UBadge
									v-for="size in sizes"
									:key="size"
									:color="color"
									:variant="variant"
									:size="size"
									:label="`${color} ${size}`"
								/>
								<UBadge
									:color="color"
									:variant="variant"
									label="With icon"
									icon="ph:star-bold"
								/>
							</div>
						</div>
					</template>
				</div>
			</section>
		</template>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const { sizes } = useConstants();

	const badgeColors = ["ai", "learning", "primary", "secondary", "info", "success", "warning", "error", "neutral"] as const;
	const badgeVariants = ["solid", "soft", "subtle", "outline"] as const;

	const propsData: PropDefinition[] = [
		{ prop: "label", type: "string | number", description: "Badge label text" },
		{ prop: "color", type: "string", description: "Color theme (primary, secondary, success, warning, error, info, ai, learning, neutral)" },
		{ prop: "variant", type: "string", description: "Visual variant (solid, soft, subtle, outline)", default: "soft" },
		{ prop: "size", type: "string", description: "Badge size (xs, sm, md, lg, xl)", default: "md" },
		{ prop: "icon", type: "string", description: "Icon name to display" },
		{ prop: "avatar", type: "AvatarProps", description: "Display an avatar on the left side" },
		{ prop: "square", type: "boolean", description: "Render with equal padding on all sides", default: "false" }
	];
</script>
