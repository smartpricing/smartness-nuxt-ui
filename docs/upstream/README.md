# Upstream blockers

Limitations in **Nuxt UI / Reka UI themselves** — not in this layer — that block work here. One file per blocker, so each can become an upstream issue or PR without editing around it.

Lives in `docs/` and not `.scratch/` on purpose: `.scratch/` is gitignored and local-only, and these are meant to be shared outside this repo.

## What belongs here

A blocker qualifies when **all** of these hold:

- The cause is in `@nuxt/ui` or `reka-ui`, not in `app/components/`. A gap in one of our own `S*` components is our bug — fix it here.
- It was **verified in the source**, not inferred from documentation. Every file must cite the file and line it was found at.
- There is no clean way around it from the consumer side, or the way around it is a workaround worth writing down.

## File format

Name files after the symptom, not the fix: `<component>-<what-fails>.md`.

Each file carries, in order: **Summary** · **Versions** · **Impact** · **Root cause** (with file and line) · **Repro** · **Workaround** · **Proposed fix** · **Upstream status**.

Keep them in **English** — they are written to be pasted into someone else's issue tracker.

Update **Upstream status** when an issue or PR is opened, and keep the link there. A blocker that gets fixed upstream stays in this folder with its status set to fixed and the version that fixed it, so future readers know when they can drop the workaround.

## Start here

[**Where a slot is the only way to mark a node**](nuxt-ui-slot-only-nodes.md) is the cross-cutting index: every place Nuxt UI refuses an attribute and forces the consumer to re-render the node through a slot, with the node the id ends up on. The per-component files below carry the source citations; that one carries the argument that they are a single inconsistency rather than seven separate requests, and is the shape a PR description should take.

## Current blockers

| Blocker | Component | Impact here |
| --- | --- | --- |
| [Rows and cells accept no attributes](nuxt-ui-table-row-cell-attributes.md) | `UTable` | Table rows cannot be addressed in tests |
| [Attributes are silently dropped](nuxt-ui-modal-slideover-attrs-dropped.md) | `UModal`, `USlideover` | `data-testid` on the component vanishes with no warning |
| [Item objects do not forward `data-*`](nuxt-ui-select-menu-item-passthrough.md) | `USelect`, `USelectMenu` | Options need a slot to be addressable |
| [Item objects do not forward `data-*`](nuxt-ui-tabs-item-passthrough.md) | `UTabs` | Tab triggers need a slot to be addressable |
| [Item objects do not forward `data-*`, but `UCheckboxGroup` does](nuxt-ui-radio-group-item-passthrough.md) | `URadioGroup` | Radio options are addressable only by label or index |
| [Fallthrough attributes are silently dropped](nuxt-ui-popover-attrs-dropped.md) | `UPopover` | `SMultiSelect`'s trigger cannot be identified at all |
| [The `content` prop drops unknown attributes](nuxt-ui-dropdown-menu-content-attrs-dropped.md) | `UDropdownMenu`, `UContextMenu` | The open menu panel cannot be named, unlike every other overlay |

The three item-passthrough blockers share a root cause and are worth taking upstream **together**: Nuxt UI is inconsistent with itself here. `UNavigationMenu` forwards item `data-*` (`pickLinkProps` includes every `data-` key), `UDropdownMenu` / `UContextMenu` forward them too, and `UCheckboxGroup` spreads the whole item — but `USelectMenu`, `UTabs`, and `URadioGroup` drop them. It reads as an oversight, not a design decision, which makes it a good candidate for a single PR.

`UPopover` belongs with the `UModal` / `USlideover` blocker instead: same symptom (fragment root, no `inheritAttrs: false`), different fix target — Popover renders its trigger in place, so the attributes have somewhere to land. The `UDropdownMenu` `content` blocker joins that same family: a renderless root eating attributes, one level further down.

Every row above is measured, not asserted: `/testids` in the playground renders each component with every channel bound at once and reads the DOM back. A blocker that gets fixed upstream will turn green there before anyone edits this table.

## Prior art — read this before opening anything

Searched `nuxt/ui` on 2026-08-07. Four issues decide how ours should be written.

| Issue | Outcome | What it teaches |
| --- | --- | --- |
| [#5137](https://github.com/nuxt/ui/issues/5137) — *data-attributes on nested slot* (ours, AndreaMinato, Oct 2025) | Closed Jan 2026 — **declined** | We already proposed the general mechanic: `data-*` keyed by slot, like `ui`. `benjamincanac`: *"I'm not sure this feature is worth it for an edge-case in automated tests honestly, are `data-slot` not enough for you to target what you want?"* The general API is a closed door. |
| [#4679](https://github.com/nuxt/ui/issues/4679) — *Allow Fallthrough Attributes* (Aug 2025) | Closed `not planned` after 10 days | **Not** a rejection on the merits: the only reply was `HugoRCD` asking what was meant, and the reporter never answered. The fallthrough family is still open ground. |
| [#6627](https://github.com/nuxt/ui/issues/6627) — *`$attrs` silently dropped on 8 components when `to` is absent* (Jun 2026) | **Fixed in 2 days** | Same class of bug as ours: a conditional root leaves `$attrs` nowhere to land. Reported as a table of affected components with the offending pattern quoted — and framed as `aria-label`, `id`, `role` being dropped. Not as testing. |
| [#6247](https://github.com/nuxt/ui/issues/6247) — *PageCard does not support passing attributes to the root node (ARIA-LABEL etc.)* | Fixed | Same shape, same framing, same outcome. |

**The rule that follows: frame it as attribute correctness, never as `data-testid`.** The two issues framed around accessibility were fixed in days; the two framed around testing died. This is not cynicism about the maintainers — a dropped `aria-label` is a bug on any reading, while "let me attach a test hook" is a feature request competing with everything else on the roadmap.

**And answer the `data-slot` objection head-on**, because it will be raised again. For reaching *a* nested node it is a fair answer: `[data-slot="input"]` finds the search box. It falls apart on **repeated** nodes, where every copy carries the identical `data-slot="item"` and the only thing left to discriminate on is the rendered text — which in an application shipping four locales is not a selector, it is a coin flip. That is the gap, and it is worth stating in exactly those terms.

The same argument has an accessibility half that is stronger still: because the item object is inert, **a per-item `aria-label` or `aria-describedby` is impossible today** on `USelectMenu`, `UTabs`, `URadioGroup` and `UStepper`. That is not an edge case in automated tests.

[#5865](https://github.com/nuxt/ui/issues/5865) — *custom `data-*` on table rows*, proposing exactly the `meta.attrs` API in our own write-up — is **open** and has been stale-bot nagged twice. Comment there with our measurements; do not open a competing issue.

## How these go upstream

Four PRs, split by **decision** rather than by symptom: a reviewer approves a decision, so bundling four of them means the most contentious one holds the other three hostage.

Open **one issue first**, carrying [the slot index](nuxt-ui-slot-only-nodes.md). It is already in the right shape — it argues a single inconsistency rather than seven requests — and getting a maintainer to say "yes, this way" before seven files are written is cheaper than getting it after.

| # | Scope | Why it travels alone |
| --- | --- | --- |
| 1 | Item passthrough — `SelectMenu`, `Select`, `InputMenu`, `Tabs`, `Accordion`, `RadioGroup`, `Stepper` | Seven files, **one** decision: item objects carry attributes, as links already do. Split it and you argue the same point seven times and risk seven different outcomes — which is how today's inconsistency formed. `pickLinkProps()` and `UCheckboxGroup` are the internal precedent that closes the argument. Lead with the per-item `aria-*` gap, not with test hooks — see *Prior art*. |
| 2 | [`content` on `UDropdownMenu` / `UContextMenu`](nuxt-ui-dropdown-menu-content-attrs-dropped.md) | No decision to take — the prop is reconstructed from declared props through an intermediate component and lost. Small, self-contained, cited to the line. Goes **first**, precisely because it can merge fast; tying it to the rest parks it for months. |
| 3 | Fragment roots — [`UModal` / `USlideover`](nuxt-ui-modal-slideover-attrs-dropped.md), [`UPopover`](nuxt-ui-popover-attrs-dropped.md) | One PR, two commits. Same symptom, different fix target: Popover renders its trigger in place so attributes have somewhere to land, the dialogs do not. Same reviewer and same context, two distinct choices. |
| 4 | [`UTable` `meta.attrs`](nuxt-ui-table-row-cell-attributes.md) | New API surface, not a bug fix — `attrs` beside the `class` and `style` entries `meta` already has. Mixed in with fixes it turns the whole set into a feature request. **[#5865](https://github.com/nuxt/ui/issues/5865) already asks for it**: comment there, then offer the PR. |

**Objection to pre-empt in PR 1.** Reka sets its own `data-state`, `data-highlighted` and `data-disabled` on the very elements the item attributes would land on. Bind the item object **before** the component's own bindings, so a user-supplied `data-state` cannot clobber state styling. Say so in the PR body — it is the difference between a merge and a stalled review, and it is another reason to write one careful PR instead of seven quick ones.

## Context

All of them were found while writing the company `data-testid` standard. The reasoning that produced them is in `.scratch/testid-standard/` (local-only), and the standard itself in `.playground/content/guidelines/testids.md`.

Gaps whose cause is in **this layer** rather than upstream are tracked separately, in [`docs/internal/testid-gaps.md`](../internal/testid-gaps.md).
