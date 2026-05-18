import type { UIConfig } from "@/types/ui";

/**
 * Sticky-column treatment. When a column is pinned (`column-pinning`), its
 * cells stay in place during horizontal scroll and cast a subtle gradient
 * shadow over the cell that scrolls underneath. Identical for `th` and `td`.
 *
 * Requires the `border-separate` base below — collapsed borders break the
 * sticky offset.
 */
const pinned = "data-[pinned=left]:sticky data-[pinned=left]:z-2 data-[pinned=left]:bg-default data-[pinned=right]:sticky data-[pinned=right]:z-2 data-[pinned=right]:bg-default data-[pinned=left]:has-[+:not([data-pinned=left])]:after:content-[''] data-[pinned=left]:has-[+:not([data-pinned=left])]:after:absolute data-[pinned=left]:has-[+:not([data-pinned=left])]:after:inset-y-0 data-[pinned=left]:has-[+:not([data-pinned=left])]:after:-right-2 data-[pinned=left]:has-[+:not([data-pinned=left])]:after:w-2 data-[pinned=left]:has-[+:not([data-pinned=left])]:after:bg-gradient-to-r data-[pinned=left]:has-[+:not([data-pinned=left])]:after:from-slate-900/5 data-[pinned=left]:has-[+:not([data-pinned=left])]:after:to-transparent data-[pinned=left]:has-[+:not([data-pinned=left])]:after:pointer-events-none data-[pinned=right]:[:not([data-pinned=right])+&]:before:content-[''] data-[pinned=right]:[:not([data-pinned=right])+&]:before:absolute data-[pinned=right]:[:not([data-pinned=right])+&]:before:inset-y-0 data-[pinned=right]:[:not([data-pinned=right])+&]:before:-left-2 data-[pinned=right]:[:not([data-pinned=right])+&]:before:w-2 data-[pinned=right]:[:not([data-pinned=right])+&]:before:bg-gradient-to-l data-[pinned=right]:[:not([data-pinned=right])+&]:before:from-slate-900/5 data-[pinned=right]:[:not([data-pinned=right])+&]:before:to-transparent data-[pinned=right]:[:not([data-pinned=right])+&]:before:pointer-events-none";

export default {
	slots: {
		base: "border-separate border-spacing-0",
		th: pinned,
		td: `text-primary-900 ${pinned}`
	}
} satisfies UIConfig["table"];
