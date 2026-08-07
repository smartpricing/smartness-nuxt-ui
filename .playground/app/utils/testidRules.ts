import type { ProbeStatus } from "~/utils/testidProbing";

/**
 * The rule vocabulary the standard settled on. One of these applies to every
 * component; the review page shows which, next to where the testid actually lands.
 */
export type TestidRule
	= /** Fallthrough reaches the root — write the attribute on the component. */ "root"
		/** `attributes` prop keyed by node — the canonical way into internals. */ | "attributes"
		/** Overlay body is teleported; the `content` prop is the only way in. */ | "content"
		/** Container carries the context, repeated children carry `data-test-value`. */ | "container"
		/** Id fixed by the layer because the component is a per-app singleton. */ | "layer"
		/** No mechanic reaches the interesting node today. */ | "none";

type BadgeColor = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral";

interface RuleMeta {
	label: string
	color: BadgeColor
	/** Prose for the legend at the top of the page. */
	description: string
	/** The snippet a consumer app writes, given the component tag. */
	usage: (tag: string) => string
}

/**
 * One entry per rule, holding everything the page needs to say about it. Kept in
 * a single object so adding a rule cannot leave a legend cell or a usage snippet
 * silently blank.
 */
export const RULE_META: Record<TestidRule, RuleMeta> = {
	root: {
		label: "root fallthrough",
		color: "success",
		description: "Write the attribute on the component; Vue fallthrough carries it to the root.",
		usage: (tag) => `<${tag} data-testid="…" />`
	},
	attributes: {
		label: "attributes prop",
		color: "primary",
		description: "An `attributes` prop keyed by node name — the canonical way to reach internals.",
		usage: (tag) => `<${tag} :attributes="{ root: { 'data-testid': '…' } }" />`
	},
	content: {
		label: "content prop",
		color: "secondary",
		description: "The body is teleported out of the subtree; the `content` prop is the only way in.",
		usage: (tag) => `<${tag} :content="{ 'data-testid': '…' }" />`
	},
	container: {
		label: "container + value",
		color: "info",
		description: "The container carries the context, repeated children carry a `data-test-value`.",
		usage: (tag) => `<${tag} data-testid="…" /> + data-test-value per child`
	},
	layer: {
		label: "layer-owned id",
		color: "warning",
		description: "The layer fixes the id because the component is a singleton and the node is unreachable.",
		usage: () => "id fixed by the layer — public API, not set by the app"
	},
	none: {
		label: "unreachable",
		color: "error",
		description: "No mechanic reaches the interesting node today.",
		usage: (tag) => `<${tag} data-testid="…" /> — reaches nothing`
	}
};

export const STATUS_META: Record<ProbeStatus, { label: string, color: BadgeColor }> = {
	pending: { label: "measuring…", color: "neutral" },
	landed: { label: "landed", color: "success" },
	lost: { label: "LOST — attribute is nowhere in the DOM", color: "error" },
	"children-lost": { label: "PARTIAL — container landed, per-item attributes dropped", color: "error" },
	ambiguous: { label: "ambiguous — more than one node matches", color: "warning" },
	error: { label: "probe failed", color: "error" }
};
