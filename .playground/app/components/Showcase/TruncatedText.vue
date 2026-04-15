<template>
	<ShowcasePage
		title="TruncatedText"
		description="The STruncatedText component renders text with single- or multi-line ellipsis truncation and shows the full text in a tooltip when truncated."
	>
		<PropsTable :props="propsData" />

		<section
			id="single-line"
			class="space-y-4"
		>
			<ProseH3>Single line</ProseH3>
			<p class="text-sm text-muted">
				Default behavior. Hover the text to see the full content in a tooltip.
			</p>
			<div class="max-w-xs border border-default rounded-md p-3">
				<STruncatedText :text="longText" />
			</div>
		</section>

		<section
			id="multi-line"
			class="space-y-4"
		>
			<ProseH3>Multi line</ProseH3>
			<p class="text-sm text-muted">
				Use the <code>lines</code> prop to clamp to N lines.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div
					v-for="n in [2, 3, 4]"
					:key="n"
					class="space-y-2"
				>
					<div class="text-xs font-medium text-muted">
						{{ n }} lines
					</div>
					<div class="max-w-xs border border-default rounded-md p-3">
						<STruncatedText
							:text="longText"
							:lines="n"
						/>
					</div>
				</div>
			</div>
		</section>

		<section
			id="custom-tooltip-text"
			class="space-y-4"
		>
			<ProseH3>Custom tooltip text</ProseH3>
			<p class="text-sm text-muted">
				Use <code>tooltipText</code> to override the tooltip content.
			</p>
			<div class="max-w-xs border border-default rounded-md p-3">
				<STruncatedText
					:text="longText"
					tooltip-text="This is a custom tooltip message"
				/>
			</div>
		</section>

		<section
			id="tooltip-customization"
			class="space-y-4"
		>
			<ProseH3>Tooltip side &amp; UI overrides</ProseH3>
			<p class="text-sm text-muted">
				Use <code>tooltipContent</code> and <code>tooltipUi</code> to tweak placement and classes.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="max-w-xs border border-default rounded-md p-3">
					<STruncatedText
						:text="longText"
						:tooltip-content="{ side: 'bottom', align: 'start' }"
					/>
				</div>
				<div class="max-w-xs border border-default rounded-md p-3">
					<STruncatedText
						:text="longText"
						:tooltip-ui="{ content: 'bg-primary text-inverted max-w-[200px]' }"
					/>
				</div>
			</div>
		</section>

		<section
			id="disable-tooltip"
			class="space-y-4"
		>
			<ProseH3>Disable tooltip</ProseH3>
			<p class="text-sm text-muted">
				Pass <code>disableTooltip</code> to truncate without showing a tooltip on hover.
			</p>
			<div class="max-w-xs border border-default rounded-md p-3">
				<STruncatedText
					:text="longText"
					disable-tooltip
				/>
			</div>
		</section>

		<section
			id="truncated-event"
			class="space-y-4"
		>
			<ProseH3>Truncation event</ProseH3>
			<p class="text-sm text-muted">
				Listen to <code>@update:truncated</code> to react when the text becomes ellipsed. Resize the container to toggle.
			</p>
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<span class="text-xs font-medium text-muted">Width:</span>
					<USlider
						v-model="width"
						:min="80"
						:max="600"
						class="max-w-xs"
					/>
					<span class="text-xs tabular-nums">{{ width }}px</span>
				</div>
				<div
					class="border border-default rounded-md p-3"
					:style="{ width: `${width}px` }"
				>
					<STruncatedText
						:text="longText"
						@update:truncated="isTruncated = $event"
					/>
				</div>
				<UBadge
					:color="isTruncated ? 'warning' : 'success'"
					variant="subtle"
				>
					isTruncated: {{ isTruncated }}
				</UBadge>
			</div>
		</section>

		<section
			id="styling"
			class="space-y-4"
		>
			<ProseH3>Custom classes</ProseH3>
			<p class="text-sm text-muted">
				Use <code>classes</code> to style the underlying paragraph.
			</p>
			<div class="max-w-xs border border-default rounded-md p-3">
				<STruncatedText
					:text="longText"
					classes="text-lg font-semibold text-primary"
				/>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const longText = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. Sphinx of black quartz, judge my vow.";

	const width = ref(240);
	const isTruncated = ref(false);

	const propsData: PropDefinition[] = [
		{ prop: "text", type: "string", description: "The text content to render." },
		{ prop: "lines", type: "number", description: "Maximum number of lines before truncation.", default: "1" },
		{ prop: "classes", type: "string", description: "Additional CSS classes applied to the paragraph." },
		{ prop: "tooltipText", type: "string", description: "Override the tooltip text. Falls back to `text`." },
		{ prop: "tooltipContent", type: "TooltipProps['content']", description: "Forwarded to UTooltip `content` (side, align, etc.).", default: "{ align: 'center', side: 'top' }" },
		{ prop: "tooltipUi", type: "TooltipProps['ui']", description: "UI class overrides for the tooltip.", default: "{ content: 'max-w-[300px] h-auto py-2', text: 'whitespace-normal' }" },
		{ prop: "disableTooltip", type: "boolean", description: "Disable the tooltip even when truncated.", default: "false" },
		{ prop: "@update:truncated", type: "(value: boolean) => void", description: "Emitted when the truncation state changes." }
	];
</script>
