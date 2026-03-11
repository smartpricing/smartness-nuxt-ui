export type StepperStepStatus = "todo" | "current" | "done";

export interface StepperStepChild {
	id: string
	label: string
	active?: boolean
	status?: "todo" | "done"
	error?: boolean | string
}

export interface StepperStep {
	id: string
	label: string
	status: StepperStepStatus
	error?: boolean | string
	children?: StepperStepChild[]
}
