import type { ProbeSummary } from "~/composables/useTestidProbes";
import type { ProbeStatus } from "~/utils/testidProbing";

declare global {
	interface Window {
		/**
		 * Set by the `/testids` review page so the measurement can be driven from
		 * devtools or a browser-automation script rather than by clicking. Nothing
		 * on that page runs on its own — this is the programmatic way in.
		 */
		__testids?: {
			/** Measure every case, then resolve to the summary counters. */
			measure: () => Promise<ProbeSummary>
			summary: () => ProbeSummary
			/** Rows that did not land, documented dead ends excluded. */
			failures: () => Array<{ key: string, status: ProbeStatus, message?: string }>
		}
	}
}

export {};
