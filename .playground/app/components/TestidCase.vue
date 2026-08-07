<template>
	<div class="border border-default rounded-lg overflow-hidden">
		<!-- Identity -->
		<div class="flex items-start gap-2 flex-wrap border-b border-default bg-elevated/40 px-4 py-3">
			<code class="text-sm font-semibold">{{ component }}</code>
			<UBadge
				:color="RULE_META[rule].color"
				variant="soft"
				size="sm"
			>
				{{ RULE_META[rule].label }}
			</UBadge>
			<UBadge
				:color="caseStatus.color"
				variant="subtle"
				size="sm"
			>
				{{ caseStatus.label }}
			</UBadge>
			<div class="grow" />
			<UButton
				:icon="measured ? 'ph:arrows-clockwise' : 'ph:play'"
				size="xs"
				color="neutral"
				:variant="measured ? 'ghost' : 'outline'"
				:label="measured ? 'Re-measure' : 'Measure'"
				@click="measureOnce"
			/>
		</div>

		<p
			v-if="note"
			class="px-4 pt-3 text-xs text-muted leading-relaxed"
		>
			{{ note }}
		</p>

		<div class="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
			<!-- The complete example, every reachable node tagged at once -->
			<div class="min-w-0 space-y-2">
				<p class="text-xs font-semibold text-muted uppercase tracking-wide">
					Complete example
				</p>
				<pre class="text-[11px] leading-relaxed bg-default border border-default rounded-md p-3 overflow-x-auto s-scrollbar-thin"><code>{{ snippet }}</code></pre>
			</div>

			<!-- The same example, live -->
			<div class="min-w-0 space-y-2">
				<p class="text-xs font-semibold text-muted uppercase tracking-wide">
					Rendered
				</p>
				<div
					ref="containerEl"
					class="rounded-md bg-elevated/40 p-3 overflow-x-auto s-scrollbar-thin"
				>
					<!--
						A case that cannot render is a result, not a crash: without this
						boundary one component needing something the playground does not
						provide would take the whole review page down with it.
					-->
					<NuxtErrorBoundary @error="onRenderError">
						<slot :id="channelId" />

						<template #error="{ error }">
							<p class="text-xs text-error">
								{{ error }}
							</p>
						</template>
					</NuxtErrorBoundary>
				</div>
			</div>
		</div>

		<!-- One row per reachable node -->
		<div class="border-t border-default divide-y divide-default">
			<div
				v-for="channel in channels"
				:key="channel.key"
				class="grid gap-3 px-4 py-3 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]"
			>
				<div class="min-w-0 space-y-1">
					<div class="flex items-center gap-2 flex-wrap">
						<span class="text-sm font-medium">{{ channel.label }}</span>
						<UBadge
							v-if="channel.collection"
							color="info"
							variant="soft"
							size="sm"
						>
							repeated
						</UBadge>
						<UBadge
							v-if="channel.deadEnd"
							color="warning"
							variant="soft"
							size="sm"
						>
							dead end
						</UBadge>
					</div>
					<code class="block text-[11px] text-muted break-all">{{ channel.mechanic }}</code>
				</div>

				<div class="min-w-0 space-y-2">
					<UBadge
						:color="STATUS_META[statusOf(channel.key)].color"
						variant="subtle"
						size="sm"
					>
						{{ STATUS_META[statusOf(channel.key)].label }}
					</UBadge>

					<p
						v-if="resultOf(channel.key).message"
						class="text-xs"
						:class="statusOf(channel.key) === 'confirmed-dead' ? 'text-muted' : 'text-error'"
					>
						{{ resultOf(channel.key).message }}
					</p>

					<div
						v-for="(node, index) in resultOf(channel.key).nodes"
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

					<!-- The discriminants a test would select on -->
					<div
						v-if="resultOf(channel.key).values.length"
						class="text-xs space-y-1"
					>
						<p class="text-muted">
							{{ resultOf(channel.key).values.length }} nodes, <code>data-test-value</code>:
						</p>
						<div class="flex flex-wrap gap-1">
							<UBadge
								v-for="(value, index) in resultOf(channel.key).values"
								:key="`${value}-${index}`"
								:color="value === '(missing)' ? 'error' : 'neutral'"
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
	</div>
</template>

<script setup lang="ts">
	import type { ChannelSpec, ProbeResult } from "~/utils/testidProbing";
	import type { TestidRule } from "~/utils/testidRules";
	import { caseTestid, failedProbe, measureChannel, PENDING_PROBE, waitForTestid } from "~/utils/testidProbing";
	import { RULE_META, STATUS_META } from "~/utils/testidRules";

	const props = defineProps<{
		/** Stable key for this case — also the prefix of every rendered testid. */
		id: string
		/** Heading for the case: the component tag. */
		component: string
		/** Which decided rule the component as a whole falls under. */
		rule: TestidRule
		/** One-line prose from the corresponding decision. */
		note?: string
		/**
		 * The whole example, with every reachable node tagged at once. This is what
		 * a consumer app copies; the channel rows below say which of its lines work.
		 */
		snippet: string
		/** Every node this component exposes, working and not. */
		channels: ChannelSpec[]
		/**
		 * CSS selector, inside the case container, to click before measuring —
		 * for components that render their interesting nodes only once opened.
		 */
		openWith?: string
		/** A second click, for a node behind two layers (a menu inside a modal). */
		thenOpenWith?: string
		/** Context menus do not open on click. Everything else does. */
		openEvent?: "click" | "contextmenu"
		/**
		 * Channel key whose presence means "the overlay is open". Defaults to the
		 * last channel; set it when the last channel is a dead end, which by
		 * definition never appears and would make the probe wait for nothing.
		 */
		settleOn?: string
	}>();

	/** Long enough for a popover animation, short enough to keep the page quick. */
	const OPEN_TIMEOUT = 900;

	const { report, registerCase, unregisterCase } = useTestidProbes();

	const containerEl = ref<HTMLElement | null>(null);
	const results = ref<Record<string, ProbeResult>>({});

	/** The testid the slot binds for a given channel — and the one we look for. */
	function channelId(key: string): string {
		return caseTestid(props.id, key);
	}

	function resultOf(key: string): ProbeResult {
		return results.value[key] ?? PENDING_PROBE;
	}

	function statusOf(key: string) {
		return resultOf(key).status;
	}

	/** Worst outcome across the case's channels, for the header badge. */
	const caseStatus = computed(() => {
		const statuses = props.channels.map((channel) => statusOf(channel.key));

		if (statuses.includes("error")) {
			return { label: "case failed to render", color: "error" as const };
		}

		if (statuses.every((status) => status === "pending")) {
			return { label: "not measured yet", color: "neutral" as const };
		}

		if (statuses.includes("pending")) {
			return { label: "measuring…", color: "neutral" as const };
		}

		const broken = statuses.filter((status) => status === "lost" || status === "children-lost" || status === "ambiguous").length;

		return broken
			? { label: `${broken} of ${statuses.length} channels broken`, color: "error" as const }
			: { label: `${statuses.length} channels as documented`, color: "success" as const };
	});

	/**
	 * Open an overlay the way a user does. `element.click()` alone is not enough:
	 * Reka opens `USelect` and friends on `pointerdown`, so a bare click leaves the
	 * panel shut and every channel inside it measures as lost — the probe would
	 * then report a bug that only exists in the probe. The pointer sequence comes
	 * first, and `click()` is only used as a fallback, because firing both on a
	 * component that opens on `pointerdown` would open and immediately re-close it.
	 */
	async function open(trigger: HTMLElement, event: "click" | "contextmenu", settled: string) {
		if (event === "contextmenu") {
			trigger.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true }));
			await waitForTestid(settled, OPEN_TIMEOUT);
			return;
		}

		// Tooltips open on hover, never on a press — so the hover comes first, and
		// is harmless to everything else.
		for (const type of ["pointerenter", "mouseenter", "pointermove", "mousemove"]) {
			trigger.dispatchEvent(new PointerEvent(type, { bubbles: false, cancelable: true, pointerId: 1, isPrimary: true }));
		}

		await waitForTestid(settled, OPEN_TIMEOUT);

		if (document.querySelector(`[data-testid="${settled}"]`)) {
			return;
		}

		trigger.focus();

		for (const type of ["pointerdown", "mousedown", "pointerup", "mouseup"]) {
			trigger.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, button: 0, pointerId: 1, isPrimary: true }));
		}

		await waitForTestid(settled, OPEN_TIMEOUT);

		if (!document.querySelector(`[data-testid="${settled}"]`)) {
			trigger.click();
			await waitForTestid(settled, OPEN_TIMEOUT);
		}

		if (!document.querySelector(`[data-testid="${settled}"]`)) {
			// Comboboxes whose root is a text field (UInputMenu) ignore both: they
			// open on keyboard navigation, the way a user reaches them from typing.
			trigger.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
			await waitForTestid(settled, OPEN_TIMEOUT);
		}
	}

	/** Set when the case throws while rendering — measuring its channels is moot. */
	const renderError = ref<string | null>(null);

	function publish(key: string, result: ProbeResult) {
		results.value = { ...results.value, [key]: result };
		report(`${props.id}:${key}`, result);
	}

	function onRenderError(error: unknown) {
		renderError.value = error instanceof Error ? error.message : String(error);

		for (const channel of props.channels) {
			publish(channel.key, failedProbe(`The component could not be rendered here: ${renderError.value}`));
		}
	}

	async function measureAll() {
		if (renderError.value) {
			return;
		}

		await enqueueProbe(async () => {
			try {
				for (const selector of [props.openWith, props.thenOpenWith]) {
					if (!selector) {
						continue;
					}

					const trigger = containerEl.value?.querySelector<HTMLElement>(selector)
						?? document.querySelector<HTMLElement>(selector);

					if (!trigger) {
						for (const channel of props.channels) {
							publish(channel.key, failedProbe(`Could not open the component: no element matches "${selector}".`));
						}

						return;
					}

					await open(trigger, props.openEvent ?? "click", channelId(props.settleOn ?? props.channels.at(-1)!.key));
				}

				for (const channel of props.channels) {
					publish(channel.key, measureChannel(channelId(channel.key), containerEl.value, channel));
				}
			} catch (error) {
				for (const channel of props.channels) {
					publish(channel.key, failedProbe(error instanceof Error ? error.message : String(error)));
				}
			} finally {
				if (props.openWith) {
					// Leave the page as we found it — an open overlay would cover the next case.
					document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
					await nextTick();
				}
			}
		});
	}

	/**
	 * Nothing measures itself. An overlay case opens the real component and closes
	 * it again, so anything automatic — on mount, on scroll — turns the page into a
	 * slideshow of modals firing at whoever is reading it. Measuring is an action
	 * someone takes: this case's own button, the header's, or the console hook.
	 */
	const measured = ref(false);

	async function measureOnce() {
		measured.value = true;
		unregisterCase(props.id);
		await measureAll();
	}

	onMounted(() => {
		for (const channel of props.channels) {
			publish(channel.key, PENDING_PROBE);
		}

		// Nothing runs on its own — the header button and the console hook drive it.
		registerCase(props.id, measureOnce);
	});

	onBeforeUnmount(() => unregisterCase(props.id));
</script>
