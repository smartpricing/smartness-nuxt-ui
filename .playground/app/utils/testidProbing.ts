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
		/** The probe itself blew up (missing props, runtime error). */ | "error"
		/**
		 * The channel is known not to work and the measurement confirms it. A page
		 * full of red is unreadable; a demonstrated dead end is a *result*, and QA
		 * needs to see it next to the channel that replaces it.
		 */
		| "confirmed-dead";

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
 * A single reachable node of a component, measured on its own.
 *
 * The coarse probe above answers "does a `data-testid` on this component land
 * somewhere?". That question is too blunt for a QA engineer, who does not want
 * just any node, but the search box, that option, the close button. A channel is
 * one such node together with the exact mechanic that reaches it, so the page
 * can say "this one works, that one silently doesn't, use this instead".
 */
export interface ChannelSpec {
	/** Suffix of the rendered testid, and the key the page reports under. */
	key: string
	/** What a QA engineer would call this node. */
	label: string
	/** The exact code that reaches it — one line, copy-pasteable. */
	mechanic: string
	/**
	 * A repeated node: many elements share the testid and are told apart by
	 * `data-test-value`. Several matches are the expected outcome, not ambiguity.
	 */
	collection?: boolean
	/**
	 * A node that renders many times but takes its attributes from one shared
	 * object, so every copy carries the same id and no discriminant. Landing on
	 * several nodes is correct here — and the count is the useful number, because
	 * it tells a test author they have to scope by position or by content.
	 */
	uniform?: boolean
	/**
	 * Set on a channel we keep only to demonstrate that it does *not* work. A
	 * measurement that finds nothing then confirms the documentation instead of
	 * contradicting it — and a measurement that finds something is the alarm.
	 */
	deadEnd?: boolean
	/** Why the dead end exists, and which channel replaces it. */
	instead?: string
}

/**
 * The testid a case binds for one of its channels. Exported because item arrays
 * are built in `<script>`, outside the reach of the slot prop, and the two must
 * agree or the channel measures as lost for the wrong reason.
 */
export function caseTestid(caseId: string, key: string): string {
	// `case-`, not `probe-`: the coarse probes already own `probe-<id>` and
	// `probe-<id>-item`, and a collision would have one component's row silently
	// measuring another's node.
	return `case-${caseId}-${key}`;
}

/**
 * Measure one channel. Same DOM reading as `measureTestid`, but the verdict is
 * read against what the channel claims about itself: a collection is allowed
 * many matches, a dead end is allowed — expected — to find none.
 */
export function measureChannel(testid: string, container: Element | null, spec: ChannelSpec): ProbeResult {
	const matches = Array.from(document.querySelectorAll(`[data-testid="${testid}"]`));

	if (matches.length === 0) {
		return spec.deadEnd
			? {
				status: "confirmed-dead",
				nodes: [],
				values: [],
				message: spec.instead ?? "Confirmed: this mechanic reaches nothing."
			}
			: {
				status: "lost",
				nodes: [],
				values: [],
				message: "The attribute was written and does not exist anywhere in the DOM."
			};
	}

	const nodes = matches.map((el) => describeNode(el, container));

	if (spec.deadEnd) {
		return {
			status: "ambiguous",
			nodes,
			values: [],
			message: "This channel is documented as a dead end, but it rendered. The documentation is stale — check it."
		};
	}

	if (spec.uniform) {
		return {
			status: "landed",
			nodes: nodes.slice(0, 1),
			values: [],
			message: `${matches.length} nodes carry this id, all identical — the attributes prop applies one object to every copy, so a test scopes by position or by rendered content.`
		};
	}

	if (spec.collection) {
		const values = matches.map((el) => el.getAttribute("data-test-value") ?? "(missing)");

		return values.every((value) => value === "(missing)")
			? {
				status: "children-lost",
				nodes,
				values,
				message: "The repeated nodes landed but carry no `data-test-value`: a test cannot tell them apart."
			}
			: { status: "landed", nodes: nodes.slice(0, 1), values };
	}

	if (matches.length > 1) {
		return {
			status: "ambiguous",
			nodes,
			values: [],
			message: `${matches.length} nodes carry this attribute — a test could not tell them apart.`
		};
	}

	return { status: "landed", nodes, values: [] };
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

/**
 * How many probes are queued or running. Drives `data-testid-probing` on
 * `<html>`, which the page uses to switch every transition off: an overlay
 * probe genuinely opens and closes the real component, and at full animation
 * speed a run of them reads as the page flashing rather than as work happening.
 */
let inFlight = 0;

function markProbing(delta: number) {
	inFlight += delta;

	if (inFlight > 0) {
		document.documentElement.dataset.testidProbing = "";
	} else {
		delete document.documentElement.dataset.testidProbing;
	}
}

export function enqueueProbe<T>(run: () => Promise<T>): Promise<T> {
	markProbing(1);

	const next = queue.then(run, run).finally(() => markProbing(-1));

	queue = next.catch(() => undefined);

	return next;
}
