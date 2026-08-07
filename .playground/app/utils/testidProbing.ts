/**
 * Derivation engine for the QA review page (`/testids`).
 *
 * The point of this module is that nothing here is maintained by hand: a probe
 * renders a real component with a real `data-testid` on it, and we then read the
 * DOM to find out *which node actually received it*. That answer is true by
 * construction and stays true when Nuxt UI changes underneath us — which is the
 * whole reason the review page exists rather than a table in markdown.
 *
 * A probe that finds nothing is not an error to hide: "the attribute silently
 * went nowhere" is the single most useful thing this page can tell a QA engineer.
 */

/** Where a rendered `data-testid` ended up. */
export interface ProbeNode {
	/** Lowercased tag name of the node carrying the attribute. */
	tag: string
	/** ARIA role, when the node has one — this is what Playwright's `getByRole` sees. */
	role: string | null
	/** Nuxt UI / Reka `data-slot`, useful to name the node in the guideline. */
	slot: string | null
	/** True when the node was teleported out of the probe container (overlays). */
	teleported: boolean
	/** True when clicking this node is a meaningful action. */
	actionable: boolean
	/** Short ancestor chain, so a reader can see how deep the attribute fell. */
	path: string
}

export type ProbeStatus
	= /** Not measured yet. */ "pending"
		/** Exactly one node carries the attribute. */ | "landed"
		/** The attribute exists nowhere in the DOM. */ | "lost"
		/** The container landed but the per-item attributes never arrived. */ | "children-lost"
		/** More than one node carries it — a test would not know which to pick. */ | "ambiguous"
		/** The probe itself blew up (missing props, runtime error). */ | "error";

export interface ProbeResult {
	status: ProbeStatus
	nodes: ProbeNode[]
	/** `data-test-value` discriminants found on repeated children, in DOM order. */
	values: string[]
	/** Populated for every non-`landed` status, shown verbatim in the row. */
	message?: string
}

export const PENDING_PROBE: ProbeResult = { status: "pending", nodes: [], values: [] };

export function failedProbe(message: string): ProbeResult {
	return { status: "error", nodes: [], values: [], message };
}

/**
 * Roles and tags for which `click()` / `fill()` is a meaningful action. A testid
 * that lands on a non-actionable node is not necessarily wrong, but the guideline
 * has to warn about it, so we surface it per row.
 */
const ACTIONABLE_ROLES = new Set([
	"button",
	"combobox",
	"checkbox",
	"switch",
	"tab",
	"radio",
	"slider",
	"link",
	"menuitem",
	"option",
	"textbox"
]);

const ACTIONABLE_TAGS = new Set(["button", "input", "a", "select", "textarea"]);

/**
 * How far up the ancestor chain to walk for a teleported node, whose real parent
 * is `<body>`. Enough to place the node, short enough to stay one line on screen.
 */
const MAX_PATH_HOPS = 5;

function isActionable(el: Element): boolean {
	const role = el.getAttribute("role");

	if (role && ACTIONABLE_ROLES.has(role)) {
		return true;
	}

	return ACTIONABLE_TAGS.has(el.tagName.toLowerCase());
}

/** Ancestor chain from `el` upwards, stopping at the probe container or `<body>`. */
function describePath(el: Element, container: Element | null): string {
	const parts: string[] = [];
	let current: Element | null = el;
	let hops = 0;

	while (current && current !== container && current !== document.body && hops < MAX_PATH_HOPS) {
		const slot = current.getAttribute("data-slot");
		parts.unshift(slot ? `${current.tagName.toLowerCase()}[${slot}]` : current.tagName.toLowerCase());
		current = current.parentElement;
		hops += 1;
	}

	if (current === container) {
		parts.unshift("(probe)");
	} else if (current === document.body) {
		parts.unshift("body");
	} else if (current) {
		parts.unshift("…");
	}

	return parts.join(" › ");
}

function describeNode(el: Element, container: Element | null): ProbeNode {
	return {
		tag: el.tagName.toLowerCase(),
		role: el.getAttribute("role"),
		slot: el.getAttribute("data-slot"),
		teleported: !container?.contains(el),
		actionable: isActionable(el),
		path: describePath(el, container)
	};
}

/**
 * Read the DOM for `testid`. Queries the whole document rather than the probe
 * container on purpose: overlays teleport their body to `<body>`, and "the
 * attribute landed, but outside the component subtree" is a distinct — and
 * reportable — outcome from "the attribute is gone".
 *
 * Pass `childTestid` for a repeated collection. A container that lands while its
 * children never arrive is its own verdict: the per-item channel is the thing
 * decision 03 turns on, so it must not be reported as a plain success.
 */
export function measureTestid(testid: string, container: Element | null, childTestid?: string): ProbeResult {
	const matches = Array.from(document.querySelectorAll(`[data-testid="${testid}"]`));
	const values = childTestid
		? Array.from(document.querySelectorAll(`[data-testid="${childTestid}"]`))
			.map((el) => el.getAttribute("data-test-value") ?? "(missing)")
		: [];

	if (matches.length === 0) {
		return {
			status: "lost",
			nodes: [],
			values,
			message: "The attribute was written on the component and does not exist anywhere in the DOM."
		};
	}

	const nodes = matches.map((el) => describeNode(el, container));

	if (matches.length > 1) {
		return {
			status: "ambiguous",
			nodes,
			values,
			message: `${matches.length} nodes carry this attribute — a test could not tell them apart.`
		};
	}

	if (childTestid && values.length === 0) {
		return {
			status: "children-lost",
			nodes,
			values,
			message: "The container landed, but the per-item attributes never reached the DOM: this collection has no way to mark its repeated children."
		};
	}

	return { status: "landed", nodes, values };
}

/**
 * Poll until `testid` shows up, for components that render nothing until opened.
 * Returns as soon as it appears so the common case stays fast.
 */
export async function waitForTestid(testid: string, timeout = 1000): Promise<void> {
	const deadline = Date.now() + timeout;

	while (Date.now() < deadline) {
		if (document.querySelector(`[data-testid="${testid}"]`)) {
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 50));
	}
}

/**
 * Probes measure one at a time. Overlay probes open and close themselves, and
 * two modals opening at once would both fight for the focus trap and leave the
 * page unreadable on a shared screen.
 *
 * Module-level state is safe here only because the playground runs `ssr: false`.
 */
let queue: Promise<unknown> = Promise.resolve();

export function enqueueProbe<T>(run: () => Promise<T>): Promise<T> {
	const next = queue.then(run, run);
	queue = next.catch(() => undefined);
	return next;
}
