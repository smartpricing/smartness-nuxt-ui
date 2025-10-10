import type { Meta, StoryObj } from "@storybook/vue3";
import UButton from "@nuxt/ui/components/Button.vue";
import UStepper from "@nuxt/ui/components/Stepper.vue";

const meta = {
	title: "Navigation/Stepper",
	component: UStepper,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A stepper component for multi-step processes and workflows."
			}
		}
	},
	argTypes: {
		modelValue: {
			control: "number",
			description: "The current step index (v-model)"
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Orientation of the stepper",
			table: {
				defaultValue: { summary: "horizontal" }
			}
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "warning", "error", "neutral"],
			description: "Color of the stepper",
			table: {
				defaultValue: { summary: "primary" }
			}
		}
	}
} satisfies Meta<typeof UStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, UStepper },
		setup() {
			return {
				step: 0,
				steps: [
					{ label: "Account" },
					{ label: "Profile" },
					{ label: "Preferences" },
					{ label: "Review" }
				]
			};
		},
		template: `
			<div class="space-y-8">
				<UStepper v-model="step" :items="steps" />

				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<h3 class="text-lg font-bold mb-2">Step {{ step + 1 }}: {{ steps[step].label }}</h3>
					<p class="text-gray-600 dark:text-gray-400 mb-4">
						Content for {{ steps[step].label }} step goes here.
					</p>
					<div class="flex gap-2">
						<UButton label="Previous" variant="outline" :disabled="step === 0" @click="step--" />
						<UButton
							:label="step === steps.length - 1 ? 'Finish' : 'Next'"
							:disabled="step === steps.length - 1"
							@click="step++"
						/>
					</div>
				</div>
			</div>
		`
	})
};

export const Vertical: Story = {
	render: () => ({
		components: { UButton, UStepper },
		setup() {
			return {
				step: 1,
				steps: [
					{ label: "Create Account", description: "Set up your credentials" },
					{ label: "Verify Email", description: "Check your inbox" },
					{ label: "Complete Profile", description: "Add your details" },
					{ label: "Get Started", description: "Start using the app" }
				]
			};
		},
		template: `
			<div class="grid lg:grid-cols-2 gap-8">
				<UStepper v-model="step" :items="steps" orientation="vertical" />

				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg h-fit">
					<h3 class="text-lg font-bold mb-2">{{ steps[step].label }}</h3>
					<p class="text-gray-600 dark:text-gray-400 mb-4">
						{{ steps[step].description }}
					</p>
					<div class="flex gap-2">
						<UButton label="Previous" variant="outline" :disabled="step === 0" @click="step--" />
						<UButton
							:label="step === steps.length - 1 ? 'Finish' : 'Next'"
							:disabled="step === steps.length - 1"
							@click="step++"
						/>
					</div>
				</div>
			</div>
		`
	})
};

export const WithIcons: Story = {
	render: () => ({
		components: { UButton, UStepper },
		setup() {
			return {
				step: 0,
				steps: [
					{ label: "Account", icon: "i-lucide-user" },
					{ label: "Profile", icon: "i-lucide-user-circle" },
					{ label: "Settings", icon: "i-lucide-settings" },
					{ label: "Confirm", icon: "i-lucide-check-circle" }
				]
			};
		},
		template: `
			<div class="space-y-8">
				<UStepper v-model="step" :items="steps" />

				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<h3 class="text-lg font-bold mb-4">Step {{ step + 1 }}: {{ steps[step].label }}</h3>
					<div class="flex gap-2">
						<UButton label="Previous" variant="outline" :disabled="step === 0" @click="step--" />
						<UButton
							:label="step === steps.length - 1 ? 'Finish' : 'Next'"
							:disabled="step === steps.length - 1"
							@click="step++"
						/>
					</div>
				</div>
			</div>
		`
	})
};

export const WithDescription: Story = {
	render: () => ({
		components: { UButton, UStepper },
		setup() {
			return {
				step: 0,
				steps: [
					{
						label: "Basic Information",
						description: "Enter your name and email address",
						icon: "i-lucide-user"
					},
					{
						label: "Company Details",
						description: "Tell us about your organization",
						icon: "i-lucide-building"
					},
					{
						label: "Preferences",
						description: "Customize your experience",
						icon: "i-lucide-settings"
					},
					{
						label: "Review",
						description: "Confirm your information",
						icon: "i-lucide-check-circle"
					}
				]
			};
		},
		template: `
			<div class="space-y-8">
				<UStepper v-model="step" :items="steps" />

				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<h3 class="text-lg font-bold mb-2">{{ steps[step].label }}</h3>
					<p class="text-gray-600 dark:text-gray-400 mb-4">{{ steps[step].description }}</p>
					<div class="flex gap-2">
						<UButton label="Previous" variant="outline" :disabled="step === 0" @click="step--" />
						<UButton
							:label="step === steps.length - 1 ? 'Finish' : 'Next'"
							:disabled="step === steps.length - 1"
							@click="step++"
						/>
					</div>
				</div>
			</div>
		`
	})
};

export const Interactive: Story = {
	render: () => ({
		components: { UButton, UStepper },
		setup() {
			return {
				step: 0,
				completed: [true, true, false, false],
				steps: [
					{ label: "Shipping", icon: "i-lucide-truck" },
					{ label: "Payment", icon: "i-lucide-credit-card" },
					{ label: "Review", icon: "i-lucide-file-text" },
					{ label: "Confirmation", icon: "i-lucide-check-circle" }
				]
			};
		},
		template: `
			<div class="space-y-8">
				<UStepper v-model="step" :items="steps" />

				<div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
					<h3 class="text-lg font-bold mb-2">{{ steps[step].label }}</h3>
					<p class="text-gray-600 dark:text-gray-400 mb-4">
						Complete this step to continue to the next one.
					</p>

					<div v-if="step === 0" class="space-y-4 mb-4">
						<div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
							<h4 class="font-medium mb-2">Shipping Address</h4>
							<p class="text-sm text-gray-600 dark:text-gray-400">123 Main St, City, State 12345</p>
						</div>
					</div>

					<div v-if="step === 1" class="space-y-4 mb-4">
						<div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
							<h4 class="font-medium mb-2">Payment Method</h4>
							<p class="text-sm text-gray-600 dark:text-gray-400">Credit Card ending in 1234</p>
						</div>
					</div>

					<div v-if="step === 2" class="space-y-4 mb-4">
						<div class="p-4 bg-white dark:bg-gray-800 rounded-lg">
							<h4 class="font-medium mb-2">Order Summary</h4>
							<p class="text-sm text-gray-600 dark:text-gray-400">Review your order details</p>
						</div>
					</div>

					<div v-if="step === 3" class="space-y-4 mb-4">
						<div class="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
							<div class="text-4xl mb-2">✓</div>
							<h4 class="font-medium mb-2">Order Confirmed!</h4>
							<p class="text-sm text-gray-600 dark:text-gray-400">Your order has been placed successfully</p>
						</div>
					</div>

					<div class="flex gap-2">
						<UButton
							label="Previous"
							variant="outline"
							:disabled="step === 0"
							@click="step--"
						/>
						<UButton
							v-if="step < steps.length - 1"
							label="Continue"
							@click="() => { completed[step] = true; step++; }"
						/>
						<UButton
							v-else
							label="Finish"
							disabled
						/>
					</div>
				</div>
			</div>
		`
	})
};

export const Colors: Story = {
	render: () => ({
		components: { UStepper },
		setup() {
			return {
				step: 1,
				steps: [
					{ label: "Step 1" },
					{ label: "Step 2" },
					{ label: "Step 3" }
				]
			};
		},
		template: `
			<div class="space-y-8">
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Primary</p>
					<UStepper v-model="step" :items="steps" color="primary" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Success</p>
					<UStepper v-model="step" :items="steps" color="success" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Warning</p>
					<UStepper v-model="step" :items="steps" color="warning" />
				</div>
				<div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Error</p>
					<UStepper v-model="step" :items="steps" color="error" />
				</div>
			</div>
		`
	})
};
