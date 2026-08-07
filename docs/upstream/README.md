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

## Current blockers

| Blocker | Component | Impact here |
| --- | --- | --- |
| [Rows and cells accept no attributes](nuxt-ui-table-row-cell-attributes.md) | `UTable` | Table rows cannot be addressed in tests |
| [Attributes are silently dropped](nuxt-ui-modal-slideover-attrs-dropped.md) | `UModal`, `USlideover` | `data-testid` on the component vanishes with no warning |
| [Item objects do not forward `data-*`](nuxt-ui-select-menu-item-passthrough.md) | `USelect`, `USelectMenu` | Options need a slot to be addressable |
| [Item objects do not forward `data-*`](nuxt-ui-tabs-item-passthrough.md) | `UTabs` | Tab triggers need a slot to be addressable |
| [Item objects do not forward `data-*`, but `UCheckboxGroup` does](nuxt-ui-radio-group-item-passthrough.md) | `URadioGroup` | Radio options are addressable only by label or index |
| [Fallthrough attributes are silently dropped](nuxt-ui-popover-attrs-dropped.md) | `UPopover` | `SMultiSelect`'s trigger cannot be identified at all |

The three item-passthrough blockers share a root cause and are worth taking upstream **together**: Nuxt UI is inconsistent with itself here. `UNavigationMenu` forwards item `data-*` (`pickLinkProps` includes every `data-` key), `UDropdownMenu` / `UContextMenu` forward them too, and `UCheckboxGroup` spreads the whole item — but `USelectMenu`, `UTabs`, and `URadioGroup` drop them. It reads as an oversight, not a design decision, which makes it a good candidate for a single PR.

`UPopover` belongs with the `UModal` / `USlideover` blocker instead: same symptom (fragment root, no `inheritAttrs: false`), different fix target — Popover renders its trigger in place, so the attributes have somewhere to land.

## Context

All of them were found while writing the company `data-testid` standard. The reasoning that produced them is in `.scratch/testid-standard/` (local-only), and the standard itself in `.playground/content/guidelines/testids.md`.

Gaps whose cause is in **this layer** rather than upstream are tracked separately, in [`docs/internal/testid-gaps.md`](../internal/testid-gaps.md).
