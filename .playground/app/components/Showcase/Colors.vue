<template>
	<ShowcasePage
		title="Colors"
		description="The complete Smartness design system color palette, including semantic colors, brand palettes, and special gradient colors."
	>
		<!-- Gradient Colors -->
		<section id="gradient-colors" class="space-y-6">
			<ProseH3>Gradient Colors</ProseH3>
			<p class="text-muted">
				Special gradient colors used for AI and Learning features. These are CSS gradients and cannot be used with standard Tailwind shade utilities.
				They are applied via compound variants and custom CSS classes.
			</p>
			<div class="space-y-6">
				<div
					v-for="gradient in gradientColors"
					:key="gradient.name"
					class="space-y-2"
				>
					<div class="flex items-center gap-3">
						<span class="label-sm text-highlighted">{{ gradient.label }}</span>
						<code class="text-xs text-muted bg-default px-2 py-0.5 rounded">{{ gradient.variable }}</code>
					</div>
					<div class="space-y-2">
						<div
							class="h-16 w-full rounded-xl border border-black/5"
							:style="{ background: gradient.value }"
						/>
						<p class="text-xs text-muted font-mono">
							{{ gradient.value }}
						</p>
					</div>
					<div class="flex flex-wrap gap-2 pt-1">
						<UBadge :color="gradient.name" variant="solid">
							{{ gradient.label }} solid
						</UBadge>
						<UBadge :color="gradient.name" variant="soft">
							{{ gradient.label }} soft
						</UBadge>
						<UBadge :color="gradient.name" variant="subtle">
							{{ gradient.label }} subtle
						</UBadge>
						<UBadge :color="gradient.name" variant="outline">
							{{ gradient.label }} outline
						</UBadge>
					</div>
				</div>
			</div>
		</section>

		<!-- Off Black -->
		<section id="offblack" class="space-y-6">
			<ProseH3>Off Black</ProseH3>
			<p class="text-muted">
				A near-black color used for primary text and high-contrast elements.
				All shades resolve to the same base value.
			</p>
			<div class="flex items-start gap-4">
				<div class="flex flex-col gap-1">
					<div
						class="h-16 w-32 rounded-xl border border-black/10"
						:style="{ backgroundColor: '#171715' }"
					/>
					<p class="text-xs text-muted font-medium text-center">
						offblack
					</p>
					<p class="text-xs text-muted font-mono text-center">
						#171715
					</p>
				</div>
			</div>
		</section>

		<!-- Color Palette -->
		<section id="color-palette" class="space-y-6">
			<ProseH3>Color Palette</ProseH3>
			<p class="text-muted">
				Every shade of each color at 6 opacity levels, on white and
				<code class="text-sm bg-default px-1 py-0.5 rounded">#eeeeee</code> backgrounds.
			</p>

			<div class="space-y-8">
				<div
					v-for="palette in semanticPalettes"
					:key="palette.name"
					class="space-y-1"
				>
					<!-- Palette name + shade header -->
					<div class="flex gap-2 mb-1">
						<div class="w-[140px] shrink-0" />
						<div class="w-[120px] shrink-0" />
						<div class="flex-1 grid px-2 gap-1.5" style="grid-template-columns: repeat(11, 1fr)">
							<div
								v-for="shade in palette.shades"
								:key="shade.step"
								class="text-xs text-center font-mono text-muted"
							>
								{{ shade.step }}
							</div>
						</div>
					</div>

					<!-- One row per opacity, four sub-rows per opacity -->
					<template
						v-for="(op, opIdx) in opacitySteps"
						:key="op.label"
					>
						<!-- White bg, no border -->
						<div class="flex gap-2 items-center">
							<div class="w-[140px] shrink-0 flex items-center">
								<span
									v-if="opIdx === 0"
									class="label-sm text-highlighted truncate"
								>{{ palette.label }}</span>
							</div>
							<div class="w-[120px] shrink-0 text-right pr-2">
								<span class="text-xs font-mono text-muted">{{ op.label }} · #fff</span>
							</div>
							<div
								class="flex-1 grid rounded-t-lg border border-b-0 border-black/5 px-2 pt-2 pb-1 gap-1.5"
								style="background-color: #ffffff; grid-template-columns: repeat(11, 1fr)"
							>
								<div
									v-for="shade in palette.shades"
									:key="shade.step"
									class="h-10 rounded-md"
									:style="{ backgroundColor: hexToRgba(shade.hex, op.value) }"
									:title="`${palette.label}-${shade.step} ${op.label} · white bg`"
								/>
							</div>
						</div>
						<!-- #eee bg, no border -->
						<div class="flex gap-2 items-center">
							<div class="w-[140px] shrink-0" />
							<div class="w-[120px] shrink-0 text-right pr-2">
								<span class="text-xs font-mono text-muted">{{ op.label }} · #eee</span>
							</div>
							<div
								class="flex-1 grid border border-b-0 border-t-0 border-black/5 px-2 py-1 gap-1.5"
								style="background-color: #eeeeee; grid-template-columns: repeat(11, 1fr)"
							>
								<div
									v-for="shade in palette.shades"
									:key="shade.step"
									class="h-10 rounded-md"
									:style="{ backgroundColor: hexToRgba(shade.hex, op.value) }"
									:title="`${palette.label}-${shade.step} ${op.label} · #eee bg`"
								/>
							</div>
						</div>
						<!-- White bg, bordered rects -->
						<div class="flex gap-2 items-center">
							<div class="w-[140px] shrink-0" />
							<div class="w-[120px] shrink-0 text-right pr-2">
								<span class="text-xs font-mono text-muted">{{ op.label }} · #fff border</span>
							</div>
							<div
								class="flex-1 grid border border-b-0 border-t-0 border-black/5 px-2 py-1 gap-1.5"
								style="background-color: #ffffff; grid-template-columns: repeat(11, 1fr)"
							>
								<div
									v-for="shade in palette.shades"
									:key="shade.step"
									class="h-10 rounded-md"
									:style="{
										backgroundColor: hexToRgba(shade.hex, op.value),
										boxShadow: `inset 0 0 0 1.5px ${hexToRgba(shade.hex, 1)}`,
									}"
									:title="`${palette.label}-${shade.step} ${op.label} · white bg + border`"
								/>
							</div>
						</div>
						<!-- #eee bg, bordered rects -->
						<div class="flex gap-2 items-center" :class="opIdx < opacitySteps.length - 1 ? 'mb-2' : ''">
							<div class="w-[140px] shrink-0" />
							<div class="w-[120px] shrink-0 text-right pr-2">
								<span class="text-xs font-mono text-muted">{{ op.label }} · #eee border</span>
							</div>
							<div
								class="flex-1 grid rounded-b-lg border border-black/5 px-2 pb-2 pt-1 gap-1.5"
								style="background-color: #eeeeee; grid-template-columns: repeat(11, 1fr)"
							>
								<div
									v-for="shade in palette.shades"
									:key="shade.step"
									class="h-10 rounded-md"
									:style="{
										backgroundColor: hexToRgba(shade.hex, op.value),
										boxShadow: `inset 0 0 0 1.5px ${hexToRgba(shade.hex, 1)}`,
									}"
									:title="`${palette.label}-${shade.step} ${op.label} · #eee bg + border`"
								/>
							</div>
						</div>
					</template>
				</div>
			</div>
		</section>

		<!-- CSS Variable Reference -->
		<section id="css-variables" class="space-y-6">
			<ProseH3>CSS Variable Reference</ProseH3>
			<p class="text-muted">
				All colors are defined as CSS custom properties in <code class="text-sm bg-default px-1 py-0.5 rounded">variables.css</code>.
				Use them directly in custom CSS or via Tailwind utility classes.
			</p>
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="border-b border-default">
							<th class="py-3 px-4 font-semibold">
								Semantic Name
							</th>
							<th class="py-3 px-4 font-semibold">
								Palette
							</th>
							<th class="py-3 px-4 font-semibold">
								Tailwind Class
							</th>
							<th class="py-3 px-4 font-semibold">
								CSS Variable
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="ref in cssVariableReference"
							:key="ref.name"
							class="border-b border-default"
						>
							<td class="py-3 px-4">
								<div class="flex items-center gap-2">
									<div
										class="size-4 rounded border border-black/10 shrink-0"
										:style="{ background: ref.preview }"
									/>
									<span class="font-medium">{{ ref.name }}</span>
								</div>
							</td>
							<td class="py-3 px-4 text-muted">
								{{ ref.palette }}
							</td>
							<td class="py-3 px-4">
								<code class="text-sm bg-default px-2 py-0.5 rounded">{{ ref.tailwindClass }}</code>
							</td>
							<td class="py-3 px-4">
								<code class="text-sm bg-default px-2 py-0.5 rounded">{{ ref.cssVar }}</code>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</ShowcasePage>
</template>

<script lang="ts" setup>
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";

	function hexToRgba(hex: string, alpha: number): string {
		const r = Number.parseInt(hex.slice(1, 3), 16);
		const g = Number.parseInt(hex.slice(3, 5), 16);
		const b = Number.parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	const opacitySteps = [
		{ label: "/10", value: 0.1 },
		{ label: "/20", value: 0.2 },
		{ label: "/50", value: 0.5 },
		{ label: "/80", value: 0.8 },
		{ label: "/90", value: 0.9 },
		{ label: "/95", value: 0.95 }
	];

	interface ColorShade {
		step: number
		hex: string
	}

	interface ColorPalette {
		name: string
		label: string
		alias: string
		shades: ColorShade[]
	}

	const semanticPalettes: ColorPalette[] = [
		{
			name: "primary",
			label: "Primary",
			alias: "→ petrol-blue",
			shades: [
				{ step: 50, hex: "#F0F2F3" },
				{ step: 100, hex: "#ECEEF0" },
				{ step: 200, hex: "#DDE2E5" },
				{ step: 300, hex: "#D1D7DB" },
				{ step: 400, hex: "#C9CFD4" },
				{ step: 500, hex: "#A4AFB8" },
				{ step: 600, hex: "#84939E" },
				{ step: 700, hex: "#617482" },
				{ step: 800, hex: "#415768" },
				{ step: 900, hex: "#253D4F" },
				{ step: 950, hex: "#0C2435" }
			]
		},
		{
			name: "secondary",
			label: "Secondary",
			alias: "→ sky",
			shades: [
				{ step: 50, hex: "#F2F2FF" },
				{ step: 100, hex: "#ECECFF" },
				{ step: 200, hex: "#DEDEFF" },
				{ step: 300, hex: "#D3D3FF" },
				{ step: 400, hex: "#CACAFF" },
				{ step: 500, hex: "#A5A5FF" },
				{ step: 600, hex: "#9191FF" },
				{ step: 700, hex: "#6868C4" },
				{ step: 800, hex: "#4D4D95" },
				{ step: 900, hex: "#353568" },
				{ step: 950, hex: "#1F1F3C" }
			]
		},
		{
			name: "support",
			label: "Support",
			alias: "→ warm-gray",
			shades: [
				{ step: 50, hex: "#F5F1EF" },
				{ step: 100, hex: "#F3EDEA" },
				{ step: 200, hex: "#E9DFDA" },
				{ step: 300, hex: "#DED5D0" },
				{ step: 400, hex: "#D6CDC8" },
				{ step: 500, hex: "#B4ACA8" },
				{ step: 600, hex: "#96908D" },
				{ step: 700, hex: "#76716E" },
				{ step: 800, hex: "#585453" },
				{ step: 900, hex: "#3D3A39" },
				{ step: 950, hex: "#24211F" }
			]
		},
		{
			name: "burgundy",
			label: "Burgundy",
			alias: "→ burgundy",
			shades: [
				{ step: 50, hex: "#F6F2F3" },
				{ step: 100, hex: "#F2ECEE" },
				{ step: 200, hex: "#E9DEE0" },
				{ step: 300, hex: "#E1D3D6" },
				{ step: 400, hex: "#DBCACE" },
				{ step: 500, hex: "#C4A7AD" },
				{ step: 600, hex: "#AE878F" },
				{ step: 700, hex: "#96646F" },
				{ step: 800, hex: "#7E4350" },
				{ step: 900, hex: "#672432" },
				{ step: 950, hex: "#490614" }
			]
		},
		{
			name: "lemon",
			label: "Lemon",
			alias: "→ lemon",
			shades: [
				{ step: 50, hex: "#FFFFE4" },
				{ step: 100, hex: "#FEFFC4" },
				{ step: 200, hex: "#FBFF90" },
				{ step: 300, hex: "#F3FF50" },
				{ step: 400, hex: "#E4FF00" },
				{ step: 500, hex: "#C8E600" },
				{ step: 600, hex: "#9BB800" },
				{ step: 700, hex: "#758B00" },
				{ step: 800, hex: "#5C6D07" },
				{ step: 900, hex: "#4D5C0B" },
				{ step: 950, hex: "#283400" }
			]
		},
		{
			name: "info",
			label: "Info",
			alias: "→ info",
			shades: [
				{ step: 50, hex: "#EFF4FF" },
				{ step: 100, hex: "#D1E0FF" },
				{ step: 200, hex: "#B2CCFF" },
				{ step: 300, hex: "#84ADFF" },
				{ step: 400, hex: "#528BFF" },
				{ step: 500, hex: "#2970FF" },
				{ step: 600, hex: "#155EEF" },
				{ step: 700, hex: "#004EEB" },
				{ step: 800, hex: "#0040C1" },
				{ step: 900, hex: "#00359E" },
				{ step: 950, hex: "#002266" }
			]
		},
		{
			name: "success",
			label: "Success",
			alias: "→ success",
			shades: [
				{ step: 50, hex: "#ECFDF3" },
				{ step: 100, hex: "#DCFAE6" },
				{ step: 200, hex: "#A9EFC5" },
				{ step: 300, hex: "#75E0A7" },
				{ step: 400, hex: "#47CD89" },
				{ step: 500, hex: "#17B26A" },
				{ step: 600, hex: "#079455" },
				{ step: 700, hex: "#067647" },
				{ step: 800, hex: "#085D3A" },
				{ step: 900, hex: "#074D31" },
				{ step: 950, hex: "#053321" }
			]
		},
		{
			name: "warning",
			label: "Warning",
			alias: "→ warning",
			shades: [
				{ step: 50, hex: "#FFFAEB" },
				{ step: 100, hex: "#FEF0C7" },
				{ step: 200, hex: "#FEDF89" },
				{ step: 300, hex: "#FEC84B" },
				{ step: 400, hex: "#FDB022" },
				{ step: 500, hex: "#F79009" },
				{ step: 600, hex: "#DC6803" },
				{ step: 700, hex: "#B54708" },
				{ step: 800, hex: "#93370D" },
				{ step: 900, hex: "#7A2E0E" },
				{ step: 950, hex: "#4E1D09" }
			]
		},
		{
			name: "error",
			label: "Error",
			alias: "→ error",
			shades: [
				{ step: 50, hex: "#FEF3F2" },
				{ step: 100, hex: "#FEE4E2" },
				{ step: 200, hex: "#FECDCA" },
				{ step: 300, hex: "#FDA29B" },
				{ step: 400, hex: "#F97066" },
				{ step: 500, hex: "#F04438" },
				{ step: 600, hex: "#D92D20" },
				{ step: 700, hex: "#B42318" },
				{ step: 800, hex: "#973131" },
				{ step: 900, hex: "#7A271A" },
				{ step: 950, hex: "#55160C" }
			]
		}
	];

	const gradientColors = [
		{
			name: "ai" as const,
			label: "AI",
			variable: "--color-ai",
			value: "linear-gradient(to right, #00C6FF 0%, #0072FF 33.33%, #B721FF 66.67%, #FDBB2D 100%)"
		},
		{
			name: "learning" as const,
			label: "Learning",
			variable: "--color-learning",
			value: "linear-gradient(to right, #00C6FF 0%, #0072FF 100%)"
		}
	];

	const cssVariableReference = [
		{ name: "primary", palette: "petrol-blue", tailwindClass: "bg-primary-{shade}", cssVar: "--color-petrol-blue-{shade}", preview: "#253D4F" },
		{ name: "secondary", palette: "sky", tailwindClass: "bg-secondary-{shade}", cssVar: "--color-sky-{shade}", preview: "#6868C4" },
		{ name: "support", palette: "warm-gray", tailwindClass: "bg-support-{shade}", cssVar: "--color-warm-gray-{shade}", preview: "#76716E" },
		{ name: "burgundy", palette: "burgundy", tailwindClass: "bg-burgundy-{shade}", cssVar: "--color-burgundy-{shade}", preview: "#96646F" },
		{ name: "lemon", palette: "lemon", tailwindClass: "bg-lemon-{shade}", cssVar: "--color-lemon-{shade}", preview: "#C8E600" },
		{ name: "info", palette: "info", tailwindClass: "bg-info-{shade}", cssVar: "--color-info-{shade}", preview: "#2970FF" },
		{ name: "success", palette: "success", tailwindClass: "bg-success-{shade}", cssVar: "--color-success-{shade}", preview: "#17B26A" },
		{ name: "warning", palette: "warning", tailwindClass: "bg-warning-{shade}", cssVar: "--color-warning-{shade}", preview: "#F79009" },
		{ name: "error", palette: "error", tailwindClass: "bg-error-{shade}", cssVar: "--color-error-{shade}", preview: "#F04438" },
		{ name: "offblack", palette: "off-black", tailwindClass: "bg-offblack-{shade}", cssVar: "--color-off-black", preview: "#171715" },
		{ name: "ai", palette: "gradient", tailwindClass: "— (CSS class only)", cssVar: "--color-ai", preview: "linear-gradient(to right, #00C6FF, #0072FF, #B721FF, #FDBB2D)" },
		{ name: "learning", palette: "gradient", tailwindClass: "— (CSS class only)", cssVar: "--color-learning", preview: "linear-gradient(to right, #00C6FF, #0072FF)" }
	];
</script>
