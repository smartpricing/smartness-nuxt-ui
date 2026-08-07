<template>
	<div class="grid gap-4 border border-default rounded-lg p-4 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
		<!-- Left: identity and the rule we decided applies -->
		<div class="space-y-3 min-w-0">
			<div class="flex items-start gap-2">
				<code class="text-sm font-semibold">{{ component }}</code>
				<UBadge
					:color="RULE_META[rule].color"
					variant="soft"
					size="sm"
					class="shrink-0"
				>
					{{ RULE_META[rule].label }}
				</UBadge>
			</div>

			<p
				v-if="note"
				class="text-xs text-muted leading-relaxed"
			>
				{{ note }}
			</p>

			<code class="block text-[11px] text-muted break-all">{{ usage }}</code>
		</div>

		<!-- Right: the live component, then what the DOM says about it -->
		<div class="space-y-3 min-w-0">
			<div
				ref="containerEl"
				class="rounded-md bg-elevated/40 p-3 overflow-x-auto"
			>
				<!--
					A probe that cannot even render is a result, not a crash: without this
					boundary one component that needs something the playground does not
					provide would take the whole review page down with it.
				-->
				<NuxtErrorBoundary @error="onRenderError">
					<slot
						:testid="testid"
						:child="childTestid"
					/>

					<template #error="{ error }">
						<p class="text-xs text-error">
							{{ error }}
						</p>
					</template>
				</NuxtErrorBoundary>
			</div>

			<div class="space-y-2">
				<div class="flex items-center gap-2 flex-wrap">
					<UBadge
						:color="STATUS_META[result.status].color"
						variant="subtle"
						size="sm"
					>
						{{ STATUS_META[result.status].label }}
					</UBadge>

					<UButton
						icon="ph:arrows-clockwise"
						size="xs"
						color="neutral"
						variant="ghost"
						label="Re-measure"
						@click="measure"
					/>
				</div>

				<p
					v-if="result.message"
					class="text-xs text-error"
				>
					{{ result.message }}
				</p>

				<!-- The derived answer: which node actually carries the attribute -->
				<div
					v-for="(node, index) in result.nodes"
					:key="index"
					class="text-xs space-y-1 rounded-md bg-default border border-default p-2"
				>
					<div class="flex items-center gap-2 flex-wrap font-mono">
						<span class="font-semibold">&lt;{{ node.tag }}&gt;</span>
						<span
							v-if="node.role"
							class="text-muted"
						>role="{{ node.role }}"</span>
						<span
							v-if="node.slot"
							class="text-muted"
						>data-slot="{{ node.slot }}"</span>
						<UBadge
							v-if="node.teleported"
							color="warning"
							variant="soft"
							size="sm"
						>
							teleported
						</UBadge>
						<UBadge
							v-if="!node.actionable"
							color="warning"
							variant="soft"
							size="sm"
						>
							not clickable
						</UBadge>
					</div>
					<p class="text-muted font-mono break-all">
						{{ node.path }}
					</p>
				</div>

				<!-- Repeated children: the discriminants a test would select on -->
				<div
					v-if="result.values.length"
					class="text-xs space-y-1"
				>
					<p class="text-muted">
						<code>{{ childTestid }}</code> — {{ result.values.length }} children,
						<code>data-test-value</code>:
					</p>
					<div class="flex flex-wrap gap-1">
						<UBadge
							v-for="value in result.values"
							:key="value"
							color="neutral"
							variant="outline"
							size="sm"
						>
							{{ value }}
						</UBadge>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ProbeResult } from "~/utils/testidProbing";
	import type { TestidRule } from "~/utils/testidRules";
	import { failedProbe, PENDING_PROBE } from "~/utils/testidProbing";
	import { RULE_META, STATUS_META } from "~/utils/testidRules";

	const props = defineProps<{
		/** Stable key for this probe — also the basis of the rendered testid. */
		id: string
		/** Heading for the row: the component, plus any qualifier for repeated probes. */
		component: string
		/**
		 * Component tag for the usage snippet. Defaults to `component`; pass it when
		 * the heading carries a qualifier, as with the naive/correct probe pairs.
		 */
		tag?: string
		/** Which decided rule this component falls under. */
		rule: TestidRule
		/** One-line prose from the corresponding decision. */
		note?: string
		/**
		 * CSS selector, inside the probe container, of the element to click before
		 * measuring. For components that render nothing until they are opened.
		 */
		openWith?: string
		/**
		 * Also measure repeated children. Finding none is a verdict, not a blank:
		 * it means the collection has no per-item channel.
		 */
		probeChildren?: boolean
	}>();

	const { report } = useTestidProbes();

	const containerEl = ref<HTMLElement | null>(null);
	const result = ref<ProbeResult>(PENDING_PROBE);

	const testid = computed(() => `probe-${props.id}`);
	const childTestid = computed(() => `probe-${props.id}-item`);

	/** The snippet a consumer app would write — mirrors what the slot renders. */
	const usage = computed(() => RULE_META[props.rule].usage(props.tag ?? props.component));

	/** Set when the probed component throws while rendering — measuring it is moot. */
	const renderError = ref<string | null>(null);

	function onRenderError(error: unknown) {
		renderError.value = error instanceof Error ? error.message : String(error);
		result.value = failedProbe(`The component could not be rendered here: ${renderError.value}`);
		report(props.id, result.value);
	}

	async function measure() {
		if (renderError.value) {
			return;
		}

		result.value = await enqueueProbe(async () => {
			try {
				if (props.openWith) {
					const trigger = containerEl.value?.querySelector<HTMLElement>(props.openWith);

					if (!trigger) {
						return failedProbe(`Probe could not open the component: no element matches "${props.openWith}".`);
					}

					trigger.click();
					await waitForTestid(testid.value);
				}

				const measured = measureTestid(
					testid.value,
					containerEl.value,
					props.probeChildren ? childTestid.value : undefined
				);

				if (props.openWith) {
					// Leave the page as we found it — an open overlay would cover the next rows.
					document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
					await nextTick();
				}

				return measured;
			} catch (error) {
				return failedProbe(error instanceof Error ? error.message : String(error));
			}
		});

		report(props.id, result.value);
	}

	onMounted(async () => {
		report(props.id, result.value);
		await nextTick();
		await measure();
	});
</script>
