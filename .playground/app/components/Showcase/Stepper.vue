<template>
	<ShowcasePage
		title="Stepper"
		description="The SStepper component provides vertical step indicators for multi-step flows with progress tracking, sub-steps, and error states."
	>
		<PropsTable :props="propsData" />

		<!-- Basic Stepper -->
		<section id="basic-stepper" class="space-y-4">
			<ProseH3>Basic Stepper</ProseH3>
			<p class="text-muted text-sm">
				A simple vertical stepper showing step progress with done, current, and
				todo states.
			</p>
			<div class="max-w-xs">
				<SStepper v-model="basicActive" :steps="basicSteps" />
			</div>
		</section>

		<!-- With Sub-steps -->
		<section id="sub-steps" class="space-y-4">
			<ProseH3>With Sub-steps</ProseH3>
			<p class="text-muted text-sm">
				Steps can have children (sub-steps) with their own status tracking and a
				segmented progress bar.
			</p>
			<div class="max-w-sm">
				<SStepper v-model="nestedActive" :steps="nestedSteps" />
			</div>
		</section>

		<!-- Error & Required -->
		<section id="error-states" class="space-y-4">
			<ProseH3>Error States</ProseH3>
			<p class="text-muted text-sm">
				Steps and sub-steps can display validation errors. Parent steps show a
				red dot with a warning icon. Sub-steps show a warning icon on the right.
				Errors accept a boolean or a custom string message.
			</p>
			<div class="max-w-sm">
				<SStepper v-model="errorActive" :steps="errorSteps" />
			</div>
		</section>

		<!-- Optional / Required Navigation -->
		<section id="optional-required" class="space-y-4">
			<ProseH3>Optional / Required Navigation</ProseH3>
			<p class="text-muted text-sm">
				By default, steps are required and must be completed sequentially.
				Steps marked <code>optional: true</code> can be skipped.
				Sub-step children default to optional (skippable), but can be marked
				<code>optional: false</code> to enforce sequential completion.
			</p>
			<div class="flex gap-8">
				<div class="max-w-sm">
					<SStepper
						v-model="optionalActive"
						:steps="optionalSteps"
						@step-click="onOptionalStepClick"
						@child-click="onOptionalChildClick"
					/>
				</div>
				<div class="flex-1 max-w-md">
					<UCard>
						<template #header>
							<span class="font-semibold">Navigation Rules</span>
						</template>
						<ul class="text-sm text-[var(--color-petrol-blue-600)] space-y-1 list-disc pl-4">
							<li><strong>Step 1</strong> — Required (default). Must complete before Step 2.</li>
							<li><strong>Step 2</strong> — <code>optional: true</code>. Can be skipped.</li>
							<li><strong>Step 3</strong> — Required. Has children with mixed optional/required.</li>
							<li><strong>Step 4</strong> — Required. Blocked until Step 1 &amp; 3 are done.</li>
						</ul>
						<p class="text-sm text-[var(--color-petrol-blue-500)] mt-3">
							Active ID:
							<code class="font-mono bg-[var(--color-petrol-blue-100)] px-1.5 py-0.5 rounded">{{ optionalActive ?? 'none' }}</code>
						</p>
					</UCard>
				</div>
			</div>
		</section>

		<!-- Interactive Demo -->
		<section id="interactive-demo" class="space-y-4">
			<ProseH3>Interactive Demo</ProseH3>
			<p class="text-muted text-sm">
				Navigate through steps and sub-steps using the Next/Back buttons.
				Clicking on completed steps or children also updates the position.
			</p>
			<div class="flex gap-8">
				<div class="max-w-sm">
					<SStepper
						v-model="demoActive"
						:steps="demoSteps"
						@step-click="onDemoStepClick"
						@child-click="onDemoChildClick"
					/>
				</div>
				<div class="flex-1 max-w-md">
					<UCard>
						<template #header>
							<span class="font-semibold">{{ demoCurrentLabel }}</span>
						</template>
						<p class="text-sm text-[var(--color-petrol-blue-600)]">
							Active ID:
							<code
								class="font-mono bg-[var(--color-petrol-blue-100)] px-1.5 py-0.5 rounded"
							>{{ demoActive ?? 'none' }}</code>
						</p>
						<p class="text-sm text-[var(--color-petrol-blue-500)] mt-2">
							Flat position: {{ demoFlatIndex + 1 }} /
							{{ demoFlatItems.length }}
						</p>
						<template #footer>
							<div class="flex gap-2">
								<UButton
									variant="outline"
									color="neutral"
									:disabled="demoFlatIndex <= 0"
									@click="demoUpdateAll(demoFlatIndex - 1)"
								>
									Back
								</UButton>
								<UButton
									:disabled="demoFlatIndex >= demoFlatItems.length - 1"
									@click="demoUpdateAll(demoFlatIndex + 1)"
								>
									Next
								</UButton>
							</div>
						</template>
					</UCard>
				</div>
			</div>
		</section>
	</ShowcasePage>
</template>

<script setup lang="ts">
	import type { PropDefinition } from "../Utility/PropsTable.vue";
	import type { StepperStep, StepperStepChild } from "~/components/Stepper/types";
	import ShowcasePage from "~/components/Utility/ShowcasePage.vue";
	import PropsTable from "../Utility/PropsTable.vue";

	const propsData: PropDefinition[] = [
		{
			prop: "steps",
			type: "StepperStep[]",
			description:
				"Array of step definitions with id, label, status, and optional children"
		},
		{
			prop: "modelValue",
			type: "string",
			description: "The id of the currently active step (v-model)"
		},
		{
			prop: "step.optional",
			type: "boolean",
			description: "When true, the step can be skipped. Defaults to false (required, sequential)."
		},
		{
			prop: "child.optional",
			type: "boolean",
			description: "When false, the child must be completed before navigating to later children. Defaults to true (skippable)."
		}
	];

	// Basic Stepper
	const basicActive = ref("step-2");
	const basicSteps = ref<StepperStep[]>([
		{ id: "step-1", label: "General info", status: "done" },
		{ id: "step-2", label: "Pricing setup", status: "current" },
		{ id: "step-3", label: "Room assignment", status: "todo" },
		{ id: "step-4", label: "Availability", status: "todo" },
		{ id: "step-5", label: "Review & save", status: "todo" }
	]);

	// With Sub-steps
	const nestedActive = ref("save");
	const nestedSteps = ref<StepperStep[]>([
		{ id: "dates", label: "Name und Zeitraum festlegen", status: "done" },
		{
			id: "rules",
			label: "Mindestens 1 Regel festlegen",
			status: "done",
			children: [
				{ id: "refund", label: "Rückerstattungsfähigkeit", status: "done" },
				{ id: "pricing", label: "Preis nach Belegung", status: "done" },
				{ id: "child-price", label: "Kinderpreis", status: "done" },
				{ id: "actions", label: "Aktionen", status: "todo" },
				{ id: "extras", label: "Extras", status: "todo" }
			]
		},
		{ id: "save", label: "Überprüfen und speichern", status: "current" }
	]);

	// Error & Required
	const errorActive = ref("step-b");
	const errorSteps = ref<StepperStep[]>([
		{ id: "step-a", label: "General info", status: "done" },
		{
			id: "step-b",
			label: "Pricing setup",
			status: "current",
			error: true,
			children: [
				{ id: "err-child-1", label: "Base price", status: "done" },
				{
					id: "err-child-2",
					label: "Seasonal pricing",
					active: true,
					error: "Price is missing"
				},
				{ id: "err-child-3", label: "Discounts", error: true }
			]
		},
		{
			id: "step-c",
			label: "Room assignment",
			status: "todo",
			error: "Room type is required"
		},
		{ id: "step-d", label: "Review", status: "todo" }
	]);

	// Optional / Required Navigation
	const optionalActive = ref("opt-step-1");
	const optionalSteps = ref<StepperStep[]>([
		{ id: "opt-step-1", label: "General info", status: "current" },
		{ id: "opt-step-2", label: "Advanced settings", status: "todo", optional: true },
		{
			id: "opt-step-3",
			label: "Configure rules",
			status: "todo",
			children: [
				{ id: "opt-rule-1", label: "Base pricing", optional: false },
				{ id: "opt-rule-2", label: "Seasonal adjustments" },
				{ id: "opt-rule-3", label: "Discounts", optional: false },
				{ id: "opt-rule-4", label: "Extras" }
			]
		},
		{ id: "opt-step-4", label: "Review & save", status: "todo" }
	]);

	function onOptionalStepClick(step: StepperStep) {
		optionalActive.value = step.id;
	}

	function onOptionalChildClick(child: StepperStepChild) {
		optionalActive.value = child.id;
	}

	// Interactive Demo
	const demoActive = ref("general");
	const demoSteps = ref<StepperStep[]>([
		{ id: "general", label: "General info", status: "current" },
		{
			id: "rules",
			label: "Configure rules",
			status: "todo",
			children: [
				{ id: "pricing", label: "Pricing" },
				{ id: "availability", label: "Availability" },
				{ id: "restrictions", label: "Restrictions" }
			]
		},
		{ id: "rooms", label: "Room assignment", status: "todo" },
		{ id: "review", label: "Review & save", status: "todo" }
	]);

	interface FlatItem {
		id: string
		label: string
		stepIndex: number
		childIndex?: number
	}
	const demoFlatItems = computed<FlatItem[]>(() => {
		const items: FlatItem[] = [];
		demoSteps.value.forEach((step, si) => {
			items.push({ id: step.id, label: step.label, stepIndex: si });
			if (step.children) {
				step.children.forEach((child, ci) => {
					items.push({
						id: child.id,
						label: child.label,
						stepIndex: si,
						childIndex: ci
					});
				});
			}
		});
		return items;
	});

	const demoFlatIndex = computed(() =>
		demoFlatItems.value.findIndex((f) => f.id === demoActive.value)
	);
	const demoCurrentLabel = computed(
		() => demoFlatItems.value[demoFlatIndex.value]?.label ?? "Select a step"
	);

	function demoUpdateAll(targetFlatIndex: number) {
		const target = demoFlatItems.value[targetFlatIndex];
		if (!target) return;
		demoActive.value = target.id;

		demoSteps.value.forEach((step, si) => {
			if (si < target.stepIndex) {
				step.status = "done";
				step.children?.forEach((c) => {
					c.status = "done";
					c.active = false;
				});
			} else if (si === target.stepIndex) {
				step.status = step.children?.length ? "done" : "current";
				if (step.children && target.childIndex !== undefined) {
					step.children.forEach((c, ci) => {
						c.status = ci < target.childIndex! ? "done" : undefined;
						c.active = ci === target.childIndex;
					});
				} else if (step.children) {
					step.status = "current";
					step.children.forEach((c) => {
						c.status = undefined;
						c.active = false;
					});
				}
			} else {
				step.status = "todo";
				step.children?.forEach((c) => {
					c.status = undefined;
					c.active = false;
				});
			}
		});
	}

	function onDemoStepClick(step: StepperStep) {
		const fi = demoFlatItems.value.findIndex((f) => f.id === step.id);
		if (fi >= 0) demoUpdateAll(fi);
	}

	function onDemoChildClick(child: StepperStepChild) {
		const fi = demoFlatItems.value.findIndex((f) => f.id === child.id);
		if (fi >= 0) demoUpdateAll(fi);
	}
</script>
