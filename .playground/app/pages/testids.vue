<template>
	<div class="min-h-screen bg-default p-6 lg:p-10 space-y-10">
		<!-- Header -->
		<header class="space-y-4 max-w-4xl">
			<h1 class="text-3xl font-bold">
				data-testid — review page
			</h1>
			<p class="text-muted">
				For every documented component this page renders the real thing with a real
				<code>data-testid</code> on it, then reads the DOM to report <strong>which node actually
					received the attribute</strong>. Nothing in the right-hand column is written by hand: it is
				measured in your browser, so it stays true when Nuxt UI changes underneath us. The rule badge
				on the left is the decision we took; the measurement on the right is what the browser does.
			</p>
			<p class="text-sm text-muted">
				<strong>Nothing measures itself.</strong> Measuring an overlay means opening the real
				component and closing it again, so the page would otherwise fire a dozen modals at whoever
				opened it. Press <em>Measure everything</em> for the full tally, or the button on a single
				case for just that one. Read-only otherwise: objections and sign-off go in the review doc.
			</p>

			<!-- Derived summary -->
			<div class="flex flex-wrap gap-2">
				<UBadge
					color="neutral"
					variant="subtle"
				>
					{{ summary.total }} probes
				</UBadge>
				<UBadge
					color="success"
					variant="subtle"
				>
					{{ summary.landed }} landed
				</UBadge>
				<UBadge
					:color="summary.lost ? 'error' : 'neutral'"
					variant="subtle"
				>
					{{ summary.lost }} lost
				</UBadge>
				<UBadge
					:color="summary.childrenLost ? 'error' : 'neutral'"
					variant="subtle"
				>
					{{ summary.childrenLost }} with per-item attributes dropped
				</UBadge>
				<UBadge
					:color="summary.ambiguous ? 'warning' : 'neutral'"
					variant="subtle"
				>
					{{ summary.ambiguous }} ambiguous
				</UBadge>
				<UBadge
					color="neutral"
					variant="subtle"
				>
					{{ summary.confirmedDead }} dead ends, confirmed dead
				</UBadge>
				<UBadge
					:color="summary.errored ? 'error' : 'neutral'"
					variant="subtle"
				>
					{{ summary.errored }} probe failures
				</UBadge>
				<UBadge
					v-if="summary.pending"
					color="neutral"
					variant="subtle"
				>
					{{ summary.pending }} not measured yet
				</UBadge>

				<UButton
					icon="ph:play"
					size="xs"
					color="primary"
					:loading="measuringEverything"
					:label="measuringEverything ? 'Measuring…' : 'Measure everything'"
					@click="runEverything"
				/>
			</div>
		</header>

		<!-- Rule legend -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				The rules
			</h2>
			<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
				<div
					v-for="(meta, key) in RULE_META"
					:key="key"
					class="flex items-start gap-2 text-sm border border-default rounded-md p-3"
				>
					<UBadge
						:color="meta.color"
						variant="soft"
						size="sm"
						class="shrink-0"
					>
						{{ meta.label }}
					</UBadge>
					<span class="text-muted text-xs">{{ meta.description }}</span>
				</div>
			</div>
		</section>

		<!-- Complete cases: every reachable node of a component, measured one by one -->
		<TestidsSelects />
		<TestidsCollections />
		<TestidsMenus />
		<TestidsOverlays />
		<TestidsControls />
		<TestidsCalendars />

		<!-- Whatever has only one node worth marking -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Single-node components
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				What is left once every component with more than one reachable node has a complete case
				above: components where the root is the whole story, measured coarsely because there is
				nothing else to measure. A component moves out of this section the day it grows a second
				node worth naming.
			</p>

			<TestidProbe
				id="s-accordion"
				component="SAccordion"
				rule="root"
				note="Plain root, fallthrough works. `ui` is a false friend here — it only carries CSS classes."
			>
				<template #default="{ testid }">
					<SAccordion
						:data-testid="testid"
						:items="accordionItems"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-slider"
				component="SSlider"
				rule="root"
				note="Root of the template is SFormField, so the attribute stops at the field wrapper. Thumbs are taken by order — the declared exception to the no-index rule. Inherits SFormField's useI18n() dependency, so it cannot render here either."
			>
				<template #default="{ testid }">
					<SSlider
						v-model="sliderValue"
						:data-testid="testid"
						:min="0"
						:max="200"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-slider-old"
				component="SSliderOld"
				rule="root"
				note="Deprecated — kept because consumer apps still ship it and QA writes tests against it today."
			>
				<template #default="{ testid }">
					<SSliderOld
						v-model="sliderOldValue"
						:data-testid="testid"
						:min="0"
						:max="100"
						:step="5"
					/>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-dataviz"
				component="SDataviz"
				rule="root"
				note="Declares inheritAttrs: false and re-binds attrs on the root — the correct pattern."
			>
				<template #default="{ testid }">
					<SDataviz
						:data-testid="testid"
						title="Revenue"
					>
						<SDatavizLine
							name="2026"
							:data="[{ x: 'Jan', y: 10 }, { x: 'Feb', y: 14 }]"
						/>
					</SDataviz>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-auth-form-card"
				component="SAuthFormCard"
				rule="root"
			>
				<template #default="{ testid }">
					<SAuthFormCard
						:data-testid="testid"
						title="Sign in"
					>
						<UInput placeholder="you@example.com" />
					</SAuthFormCard>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-auth-layout"
				component="SAuthLayout"
				rule="root"
				note="A full-page component, probed anyway rather than assumed: it is clipped to a strip below so it cannot take over the review page."
			>
				<template #default="{ testid }">
					<!--
						`transform` makes this div a containing block for the layout's
						fixed-position background, which `overflow-hidden` alone cannot clip —
						without it the chevrons paint across the whole review page.
					-->
					<div
						class="max-h-40 overflow-hidden rounded-md"
						style="transform: translateZ(0)"
					>
						<SAuthLayout :data-testid="testid">
							<SAuthFormCard title="Sign in" />
						</SAuthLayout>
					</div>
				</template>
			</TestidProbe>

			<TestidProbe
				id="s-map"
				component="SMap"
				rule="root"
				note="Probed rather than assumed. It wants a tile provider and a network round-trip, so whatever it reports here is about this environment as much as about the mechanic — read the outcome, do not infer it."
			>
				<template #default="{ testid }">
					<SMap
						:data-testid="testid"
						:center="[12.5, 41.9]"
						:zoom="4"
						style="--ui-map-height: 120px"
					/>
				</template>
			</TestidProbe>
		</section>

		<!-- Layer-owned ids -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Ids owned by the layer
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				The standard is that consumer apps mark elements, never the layer. These are the declared
				exception: the navigation shell is a singleton per application and these nodes are not exposed
				by any prop, so the layer fixes the id. That makes them <strong>public API</strong> — renaming
				one is a breaking change for every consumer's test suite, and belongs in the changelog as such.
				They are listed rather than probed because mounting the shell inside this page would put a
				second navigation on screen.
			</p>
			<div class="border border-default rounded-lg divide-y divide-default">
				<div
					v-for="id in LAYER_OWNED_IDS"
					:key="id.testid"
					class="p-3 flex flex-wrap items-baseline gap-x-3 gap-y-1"
				>
					<code class="text-sm font-semibold">{{ id.testid }}</code>
					<span class="text-xs text-muted">{{ id.component }}</span>
					<span class="text-xs text-muted">— {{ id.note }}</span>
				</div>
			</div>
		</section>

		<!-- Honest gaps in the derivation -->
		<section class="space-y-3">
			<h2 class="text-xl font-semibold">
				Not derived here
			</h2>
			<p class="text-sm text-muted max-w-3xl">
				Components the render-and-read approach does not cover, and why. These are the cases where the
				method breaks down; they are listed rather than left as blank rows.
			</p>
			<div class="border border-default rounded-lg divide-y divide-default">
				<div
					v-for="gap in NOT_DERIVED"
					:key="gap.component"
					class="p-3 space-y-1"
				>
					<code class="text-sm font-semibold">{{ gap.component }}</code>
					<p class="text-xs text-muted">
						{{ gap.reason }}
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { RULE_META } from "~/utils/testidRules";

	definePageMeta({
		// No layout: the default one mounts SNavigationShell, whose own hardcoded
		// testids would show up in the document-wide queries the probes run.
		layout: false
	});

	useHead({ title: "data-testid — review page" });

	const { results, summary, measureEverything } = useTestidProbes();

	/**
	 * The escape hatch for the scroll-to-measure default: someone who jumped
	 * straight to the bottom, or who wants the whole tally before signing off,
	 * can pay the flashing once instead of scrolling the page end to end.
	 */
	const measuringEverything = ref(false);

	async function runEverything() {
		measuringEverything.value = true;

		try {
			await measureEverything();
		} finally {
			measuringEverything.value = false;
		}
	}

	/**
	 * Console hook, for driving the page from devtools or a browser-automation
	 * script instead of clicking through it:
	 *
	 *   __testids.measure()    // runs every case, resolves to the summary
	 *   __testids.summary()    // the counters, now
	 *   __testids.failures()   // rows that did not land, dead ends excluded
	 *
	 * `failures()` is the one worth having: it answers "did anything regress?"
	 * without scrolling 120 rows looking for a red badge.
	 *
	 * A full pass takes about a minute, which outlives the evaluation timeout of
	 * most automation tools — so don't `await` it in a one-shot eval. Fire
	 * `measure()`, then poll `summary()` until `pending` reaches zero.
	 */
	onMounted(() => {
		window.__testids = {
			measure: async () => {
				await runEverything();
				return { ...summary.value };
			},
			summary: () => ({ ...summary.value }),
			failures: () => Object.entries(results.value)
				.filter(([, result]) => result.status !== "landed" && result.status !== "confirmed-dead")
				.map(([key, result]) => ({ key, status: result.status, message: result.message }))
		};
	});

	const LAYER_OWNED_IDS = [
		{
			testid: "sidebar-collapse",
			component: "SNavigationShell",
			note: "two v-if branches of one button, so only ever one node in the DOM"
		},
		{
			testid: "product-navigation-menu",
			component: "SNavigationShell",
			note: "no prop exposes this node"
		},
		{
			testid: "navigation-products-select",
			component: "SNavigationProducts",
			note: "lives in the shell's #sidebar-header — same singleton perimeter"
		}
	];

	const NOT_DERIVED = [
		{
			component: "SNavigationShell / SNavigationPage / SNavigationBar*",
			reason: "Layout singletons. Mounting them here would render a second application shell around this page and break the measurement of every other probe. Their ids are listed above."
		},
		{
			component: "SMap layers (SMapMarker, SMapLayer, SMapPopup, …)",
			reason: "They render into the map canvas rather than into the document, so there is no node of their own to read. SMap itself is probed above."
		},
		{
			component: "Toast (useToast)",
			reason: "Not a component in a template: the caller of useToast() passes the key, so there is no render to read."
		}
	];

	// Reactive state for the probed components
	const accordionItems = [
		{ label: "Rooms", value: "rooms", content: "Configure room types." },
		{ label: "Payments", value: "payments", content: "Payment providers." }
	];
	const sliderValue = ref(50);
	const sliderOldValue = ref(50);
</script>

<style>
	/*
		While any probe is running, every transition and animation on the page is
		switched off. Overlay cases open and close the real component to measure it,
		and at full animation speed a run of them reads as the page flashing rather
		than as work happening. Global rather than scoped on purpose: overlays
		teleport their panel to <body>, outside this component's subtree.
	*/
	html[data-testid-probing] *,
	html[data-testid-probing] *::before,
	html[data-testid-probing] *::after {
		transition: none !important;
		animation: none !important;
	}
</style>
