import type { ProbeResult } from "~/utils/testidProbing";

export interface ProbeSummary {
	total: number
	landed: number
	lost: number
	childrenLost: number
	ambiguous: number
	errored: number
	pending: number
}

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
			pending: count("pending")
		};
	});

	return { results, report, summary };
}
