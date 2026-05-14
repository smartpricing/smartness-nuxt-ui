<template>
	<ShowcasePage
		title="Scrollbar"
		description="Optional CSS utilities for a consistent Smartness-style scrollbar across browsers. Add a class to any scrollable element — works on WebKit/Blink and falls back to native styling on Firefox."
	>
		<PropsTable :props="propsData" />

		<section id="default" class="space-y-4">
			<ProseH3>Default — <code>.s-scrollbar</code></ProseH3>
			<p class="text-muted">
				12px gutter with a light elevated track (<code>var(--ui-bg-elevated)</code>) and an 8px gray thumb (<code>#c1c1c1</code>) inset by 2px on each side, with a 4px radius — matches the Figma design.
				This is the recommended utility for most scrollable containers.
			</p>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<div class="text-xs font-medium text-muted mb-2">
						Vertical
					</div>
					<div class="s-scrollbar h-64 overflow-y-scroll rounded-lg border border-default bg-default p-4">
						<p
							v-for="line in 30"
							:key="`v-default-${line}`"
							class="py-1 text-sm"
						>
							Item {{ line }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
					</div>
				</div>
				<div>
					<div class="text-xs font-medium text-muted mb-2">
						Horizontal
					</div>
					<div class="s-scrollbar overflow-x-scroll whitespace-nowrap rounded-lg border border-default bg-default p-4">
						<span
							v-for="col in 40"
							:key="`h-default-${col}`"
							class="inline-block px-3 py-1 text-sm"
						>
							Column {{ col }} —
						</span>
					</div>
				</div>
				<div class="md:col-span-2">
					<div class="text-xs font-medium text-muted mb-2">
						Both axes
					</div>
					<div class="s-scrollbar h-64 overflow-scroll rounded-lg border border-default bg-default p-4">
						<table class="border-collapse">
							<tbody>
								<tr v-for="row in 20" :key="`xy-row-${row}`">
									<td
										v-for="col in 20"
										:key="`xy-${row}-${col}`"
										class="whitespace-nowrap border border-muted px-4 py-2 text-sm"
									>
										R{{ row }}·C{{ col }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>

		<section id="thin" class="space-y-4">
			<ProseH3>Thin — <code>.s-scrollbar-thin</code></ProseH3>
			<p class="text-muted">
				Slimmer 8px variant with a transparent track for compact areas like sidebars, dropdowns, and inline lists.
			</p>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<div class="text-xs font-medium text-muted mb-2">
						Vertical
					</div>
					<div class="s-scrollbar-thin h-64 overflow-y-scroll rounded-lg border border-default bg-default p-4">
						<p
							v-for="line in 30"
							:key="`v-thin-${line}`"
							class="py-1 text-sm"
						>
							Item {{ line }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
					</div>
				</div>
				<div>
					<div class="text-xs font-medium text-muted mb-2">
						Horizontal
					</div>
					<div class="s-scrollbar-thin overflow-x-scroll whitespace-nowrap rounded-lg border border-default bg-default p-4">
						<span
							v-for="col in 40"
							:key="`h-thin-${col}`"
							class="inline-block px-3 py-1 text-sm"
						>
							Column {{ col }} —
						</span>
					</div>
				</div>
			</div>
		</section>

		<section id="all-children" class="space-y-4">
			<ProseH3>Cascading — <code>.s-scrollbars</code></ProseH3>
			<p class="text-muted">
				Convenience helper that applies the default style to every nested scrollable element.
				Useful at the layout root when you want a consistent look without tagging each container.
			</p>
			<div class="s-scrollbars rounded-lg border border-default bg-default p-4">
				<div class="grid gap-4 md:grid-cols-2">
					<div class="h-48 overflow-y-scroll rounded-md border border-muted p-3">
						<p
							v-for="line in 25"
							:key="`cascade-a-${line}`"
							class="py-1 text-sm"
						>
							Nested A — line {{ line }}
						</p>
					</div>
					<div class="h-48 overflow-y-scroll rounded-md border border-muted p-3">
						<p
							v-for="line in 25"
							:key="`cascade-b-${line}`"
							class="py-1 text-sm"
						>
							Nested B — line {{ line }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<section id="customization" class="space-y-4">
			<ProseH3>Customization</ProseH3>
			<p class="text-muted">
				Override the CSS custom properties on any element to fine-tune size, colors, and radius without writing new selectors.
			</p>
			<div class="rounded-lg border border-default bg-default p-4">
				<div
					class="s-scrollbar h-48 overflow-y-scroll rounded-md border border-muted p-3"
					style="
						--s-scrollbar-size: 14px;
						--s-scrollbar-thumb-size: 10px;
						--s-scrollbar-thumb: var(--ui-color-primary-700);
						--s-scrollbar-track: var(--ui-color-primary-50);
						--s-scrollbar-radius: 6px;
					"
				>
					<p
						v-for="line in 25"
						:key="`custom-${line}`"
						class="py-1 text-sm"
					>
						Themed scrollbar — line {{ line }}
					</p>
				</div>
				<pre class="mt-4 overflow-auto rounded-md bg-muted p-3 text-xs"><code>&lt;div
  class="s-scrollbar overflow-y-scroll"
  style="
    --s-scrollbar-size: 14px;
    --s-scrollbar-thumb-size: 10px;
    --s-scrollbar-thumb: var(--ui-color-primary-700);
    --s-scrollbar-track: var(--ui-color-primary-50);
    --s-scrollbar-radius: 6px;
  "
&gt;
  &lt;!-- content --&gt;
&lt;/div&gt;</code></pre>
			</div>
		</section>

		<section id="usage" class="space-y-4">
			<ProseH3>Usage</ProseH3>
			<p class="text-muted">
				The styles are bundled with the layer; no extra import is needed in extending projects.
				Add the class on any scrollable container.
			</p>
			<pre class="overflow-auto rounded-md bg-muted p-3 text-xs"><code>&lt;!-- Default --&gt;
&lt;div class="s-scrollbar overflow-y-scroll"&gt;…&lt;/div&gt;

&lt;!-- Thin variant --&gt;
&lt;div class="s-scrollbar-thin overflow-y-scroll"&gt;…&lt;/div&gt;

&lt;!-- Apply to every nested scroller --&gt;
&lt;main class="s-scrollbars"&gt;
  &lt;aside class="overflow-y-scroll"&gt;…&lt;/aside&gt;
  &lt;section class="overflow-y-scroll"&gt;…&lt;/section&gt;
&lt;/main&gt;

&lt;!-- Tip: use overflow-*-scroll instead of overflow-*-auto so the styled
     scrollbar stays visible at all times (matches the design mockups). --&gt;</code></pre>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{ prop: ".s-scrollbar", type: "class", description: "12px scrollbar with light elevated track and inset gray thumb (Figma design)" },
		{ prop: ".s-scrollbar-thin", type: "class", description: "Slimmer 8px variant with transparent track" },
		{ prop: ".s-scrollbars", type: "cascading class", description: "Applies the default style to every nested scrollable descendant" },
		{ prop: "--s-scrollbar-size", type: "length", description: "Scrollbar gutter width/height (WebKit only)", default: "12px" },
		{ prop: "--s-scrollbar-thumb-size", type: "length", description: "Visible thumb thickness; the leftover space becomes the inset", default: "8px" },
		{ prop: "--s-scrollbar-track", type: "color", description: "Track background color", default: "var(--ui-bg-elevated, #f8fafc)" },
		{ prop: "--s-scrollbar-thumb", type: "color", description: "Thumb background color", default: "#c1c1c1" },
		{ prop: "--s-scrollbar-radius", type: "length", description: "Border radius of the thumb", default: "4px" }
	];
</script>
