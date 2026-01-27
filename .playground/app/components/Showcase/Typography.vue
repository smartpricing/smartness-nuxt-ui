<template>
	<ShowcasePage
		title="Typography"
		description="Typography utilities for consistent text styling across the application. These utilities are defined using Tailwind CSS @utility directive."
	>
		<PropsTable :props="propsData" />

		<!-- Headings -->
		<section id="headings" class="space-y-6">
			<ProseH3>Headings</ProseH3>
			<p class="text-muted">
				Heading utilities for titles and section headers. Uses font-weight 450 for larger sizes (2xl, xl) and 570 for smaller sizes.
			</p>
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-default">
							<th class="py-3 px-4 font-semibold">Class</th>
							<th class="py-3 px-4 font-semibold">Size</th>
							<th class="py-3 px-4 font-semibold">Line Height</th>
							<th class="py-3 px-4 font-semibold">Weight</th>
							<th class="py-3 px-4 font-semibold">Example</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="heading in headings" :key="heading.class" class="border-b border-default">
							<td class="py-3 px-4">
								<code class="text-sm bg-default px-2 py-1 rounded">{{ heading.class }}</code>
							</td>
							<td class="py-3 px-4 text-muted">{{ heading.size }}</td>
							<td class="py-3 px-4 text-muted">{{ heading.lineHeight }}</td>
							<td class="py-3 px-4 text-muted">{{ heading.weight }}</td>
							<td class="py-4 px-4">
								<span :class="heading.class">{{ heading.example }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Paragraphs -->
		<section id="paragraphs" class="space-y-6">
			<ProseH3>Paragraphs</ProseH3>
			<p class="text-muted">
				Paragraph utilities for body text. Available in regular (380) and bold (670) weights.
			</p>
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-default">
							<th class="py-3 px-4 font-semibold">Class</th>
							<th class="py-3 px-4 font-semibold">Size</th>
							<th class="py-3 px-4 font-semibold">Line Height</th>
							<th class="py-3 px-4 font-semibold">Weight</th>
							<th class="py-3 px-4 font-semibold">Example</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="paragraph in paragraphs" :key="paragraph.class" class="border-b border-default">
							<td class="py-3 px-4">
								<code class="text-sm bg-default px-2 py-1 rounded">{{ paragraph.class }}</code>
							</td>
							<td class="py-3 px-4 text-muted">{{ paragraph.size }}</td>
							<td class="py-3 px-4 text-muted">{{ paragraph.lineHeight }}</td>
							<td class="py-3 px-4 text-muted">{{ paragraph.weight }}</td>
							<td class="py-4 px-4 max-w-md">
								<span :class="paragraph.class">{{ paragraph.example }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Labels -->
		<section id="labels" class="space-y-6">
			<ProseH3>Labels</ProseH3>
			<p class="text-muted">
				Label utilities for form labels, captions, and UI elements. All use font-weight 570.
			</p>
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-default">
							<th class="py-3 px-4 font-semibold">Class</th>
							<th class="py-3 px-4 font-semibold">Size</th>
							<th class="py-3 px-4 font-semibold">Line Height</th>
							<th class="py-3 px-4 font-semibold">Weight</th>
							<th class="py-3 px-4 font-semibold">Example</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="label in labels" :key="label.class" class="border-b border-default">
							<td class="py-3 px-4">
								<code class="text-sm bg-default px-2 py-1 rounded">{{ label.class }}</code>
							</td>
							<td class="py-3 px-4 text-muted">{{ label.size }}</td>
							<td class="py-3 px-4 text-muted">{{ label.lineHeight }}</td>
							<td class="py-3 px-4 text-muted">{{ label.weight }}</td>
							<td class="py-4 px-4">
								<span :class="label.class">{{ label.example }}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Lists -->
		<section id="lists" class="space-y-6">
			<ProseH3>Lists</ProseH3>
			<p class="text-muted">
				List utilities with disc markers and appropriate padding. Available in regular (380) and bold (670) weights.
			</p>
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-default">
							<th class="py-3 px-4 font-semibold">Class</th>
							<th class="py-3 px-4 font-semibold">Size</th>
							<th class="py-3 px-4 font-semibold">Line Height</th>
							<th class="py-3 px-4 font-semibold">Weight</th>
							<th class="py-3 px-4 font-semibold">Example</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="list in lists" :key="list.class" class="border-b border-default">
							<td class="py-3 px-4">
								<code class="text-sm bg-default px-2 py-1 rounded">{{ list.class }}</code>
							</td>
							<td class="py-3 px-4 text-muted">{{ list.size }}</td>
							<td class="py-3 px-4 text-muted">{{ list.lineHeight }}</td>
							<td class="py-3 px-4 text-muted">{{ list.weight }}</td>
							<td class="py-4 px-4">
								<ul :class="list.class">
									<li>First item</li>
									<li>Second item</li>
									<li>Third item</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: "heading-*", type: "utility", description: "Heading styles (2xl, xl, lg, md, sm, xs)" },
		{ prop: "paragraph-*", type: "utility", description: "Paragraph styles (lg, md, sm, xs) with optional -bold suffix" },
		{ prop: "label-*", type: "utility", description: "Label styles (lg, md, sm, xs)" },
		{ prop: "list-*", type: "utility", description: "List styles (lg, md, sm, xs) with optional -bold suffix" }
	];

	const headings = [
		{ class: "heading-2xl", size: "40px", lineHeight: "44px", weight: "450", example: "Heading 2XL" },
		{ class: "heading-xl", size: "36px", lineHeight: "40px", weight: "450", example: "Heading XL" },
		{ class: "heading-lg", size: "32px", lineHeight: "40px", weight: "570", example: "Heading LG" },
		{ class: "heading-md", size: "28px", lineHeight: "36px", weight: "570", example: "Heading MD" },
		{ class: "heading-sm", size: "24px", lineHeight: "32px", weight: "570", example: "Heading SM" },
		{ class: "heading-xs", size: "20px", lineHeight: "28px", weight: "570", example: "Heading XS" }
	];

	const paragraphs = [
		{ class: "paragraph-lg", size: "18px", lineHeight: "28px", weight: "380", example: "This is large paragraph text for introductions and lead content." },
		{ class: "paragraph-lg-bold", size: "18px", lineHeight: "28px", weight: "670", example: "This is bold large paragraph text for emphasis." },
		{ class: "paragraph-md", size: "16px", lineHeight: "24px", weight: "380", example: "This is medium paragraph text, the default for body content." },
		{ class: "paragraph-md-bold", size: "16px", lineHeight: "24px", weight: "670", example: "This is bold medium paragraph text for emphasis." },
		{ class: "paragraph-sm", size: "14px", lineHeight: "20px", weight: "380", example: "This is small paragraph text for secondary content and captions." },
		{ class: "paragraph-sm-bold", size: "14px", lineHeight: "20px", weight: "670", example: "This is bold small paragraph text for emphasis." },
		{ class: "paragraph-xs", size: "12px", lineHeight: "18px", weight: "380", example: "This is extra small paragraph text for fine print and disclaimers." },
		{ class: "paragraph-xs-bold", size: "12px", lineHeight: "20px", weight: "670", example: "This is bold extra small paragraph text." }
	];

	const labels = [
		{ class: "label-lg", size: "18px", lineHeight: "24px", weight: "570", example: "Large Label" },
		{ class: "label-md", size: "16px", lineHeight: "20px", weight: "570", example: "Medium Label" },
		{ class: "label-sm", size: "14px", lineHeight: "16px", weight: "570", example: "Small Label" },
		{ class: "label-xs", size: "12px", lineHeight: "16px", weight: "570", example: "Extra Small Label" }
	];

	const lists = [
		{ class: "list-lg", size: "18px", lineHeight: "28px", weight: "380" },
		{ class: "list-lg-bold", size: "18px", lineHeight: "28px", weight: "670" },
		{ class: "list-md", size: "16px", lineHeight: "24px", weight: "380" },
		{ class: "list-md-bold", size: "16px", lineHeight: "24px", weight: "670" },
		{ class: "list-sm", size: "14px", lineHeight: "20px", weight: "380" },
		{ class: "list-sm-bold", size: "14px", lineHeight: "20px", weight: "670" },
		{ class: "list-xs", size: "12px", lineHeight: "20px", weight: "380" },
		{ class: "list-xs-bold", size: "12px", lineHeight: "20px", weight: "670" }
	];
</script>
