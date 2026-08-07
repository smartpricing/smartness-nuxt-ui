import type { ProbeResult } from "~/utils/testidProbing";

export interface ProbeSummary {
	total: number
	landed: number
	lost: number
	childrenLost: number
	ambiguous: number
	errored: number
	pending: number
	/** Dead ends that measured as dead — documentation confirmed, not a failure. */
	confirmedDead: number
}

/**
 * Cases measure when they scroll into view, which keeps the page calm but leaves
 * whatever you skipped past unmeasured. Each case registers how to measure itself
 * here so the header can offer one button that finishes the job on demand.
 *
 * Module-level, not `useState`: these are live callbacks, not serialisable state,
 * and the playground runs `ssr: false`.
 */
const pending = new Map<string, () => Promise<void>>();

/**
 * Shared results registry. Probes write their own row into it; the page header
 * reads it back for the summary counters. The measurement itself lives in
 * `~/utils/testidProbing` — this only keeps score.
 */
export function useTestidProbes() {
	const results = useState<Record<string, ProbeResult>>("testid-probes", () => ({}));

	function report(id: string, result: ProbeResult) {
		results.value = { ...results.value, [id]: result };
	}

	/** A case announces itself as measurable, and withdraws once it has measured. */
	function registerCase(id: string, measure: () => Promise<void>) {
		pending.set(id, measure);
	}

	function unregisterCase(id: string) {
		pending.delete(id);
	}

	/**
	 * Measure everything still waiting for a scroll. Sequential on purpose: each
	 * call queues behind the last, so the overlays still open one at a time.
	 */
	async function measureEverything() {
		for (const measure of [...pending.values()]) {
			await measure();
		}
	}

	const summary = computed<ProbeSummary>(() => {
		const all = Object.values(results.value);
		const count = (status: ProbeResult["status"]) => all.filter((r) => r.status === status).length;

		return {
			total: all.length,
			landed: count("landed"),
			lost: count("lost"),
			childrenLost: count("children-lost"),
			ambiguous: count("ambiguous"),
			errored: count("error"),
			pending: count("pending"),
			confirmedDead: count("confirmed-dead")
		};
	});

	return { results, report, summary, registerCase, unregisterCase, measureEverything };
}
