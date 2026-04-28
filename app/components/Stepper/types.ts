export type StepperStepStatus = "todo" | "current" | "done";

export interface StepperStepChild {
	id: string
	label: string
	active?: boolean
	status?: "todo" | "done"
	error?: boolean | string
	/** When false (default), this child must be completed before navigating to later children. When true, this child can be skipped. Children default to optional (true). */
	optional?: boolean
}

export interface StepperStep {
	id: string
	label: string
	status: StepperStepStatus
	error?: boolean | string
	children?: StepperStepChild[]
	/** When true, this step can be skipped — users can navigate past it without completing it. Defaults to false (required). */
	optional?: boolean
	/** Description shown below the label. Falls back to the `disabled` reason (if string) or "Optional" (if `optional` is true). */
	description?: string
	/** When set, the step is rendered muted and is non-navigable, but later steps remain reachable (skippable). A string is shown below the label as the reason. */
	disabled?: boolean | string
}
