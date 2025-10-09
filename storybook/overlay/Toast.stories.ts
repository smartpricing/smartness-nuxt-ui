import type { Meta, StoryObj } from "@storybook/vue3";
import UApp from "@nuxt/ui/components/App.vue";
import UButton from "@nuxt/ui/components/Button.vue";

const meta = {
	title: "Overlay/Toast",
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A toast notification system for displaying temporary messages. Note: Toast requires the Nuxt UI provider to be configured in your app."
			}
		}
	}
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Success",
					description: "Your action was completed successfully."
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Toast" />
			</UApp>
		`
	})
};

export const Success: Story = {
	render: () => ({
		components: { UApp, UButton },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Success",
					description: "Your changes have been saved.",
					color: "success",
					icon: "i-lucide-check-circle"
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Success" color="success" />
			</UApp>
		`
	})
};

export const Error: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Error",
					description: "Something went wrong. Please try again.",
					color: "error",
					icon: "i-lucide-x-circle"
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Error" color="error" />
			</UApp>
		`
	})
};

export const Warning: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Warning",
					description: "Your session will expire soon.",
					color: "warning",
					icon: "i-lucide-alert-triangle"
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Warning" color="warning" />
			</UApp>
		`
	})
};

export const Info: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Info",
					description: "New features are available. Check them out!",
					color: "info",
					icon: "i-lucide-info"
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Info" color="info" />
			</UApp>
		`
	})
};

export const WithActions: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "File uploaded",
					description: "Your file has been uploaded successfully.",
					icon: "i-lucide-upload",
					actions: [
						{
							label: "View",
							onClick: () => {
								console.log("View clicked");
							}
						},
						{
							label: "Undo",
							onClick: () => {
								console.log("Undo clicked");
							}
						}
					]
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Toast with Actions" />
			</UApp>
		`
	})
};

export const WithTimeout: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Auto-dismiss",
					description: "This message will disappear in 3 seconds.",
					timeout: 3000
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Auto-Dismiss Toast" />
			</UApp>
		`
	})
};

export const Persistent: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Important Message",
					description: "This toast will not auto-dismiss. Close it manually.",
					timeout: 0,
					icon: "i-lucide-alert-circle"
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Persistent Toast" />
			</UApp>
		`
	})
};

export const MultipleToasts: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showMultiple = () => {
				toast.add({
					title: "First notification",
					description: "This is the first toast.",
					color: "success"
				});

				setTimeout(() => {
					toast.add({
						title: "Second notification",
						description: "This is the second toast.",
						color: "info"
					});
				}, 500);

				setTimeout(() => {
					toast.add({
						title: "Third notification",
						description: "This is the third toast.",
						color: "warning"
					});
				}, 1000);
			};

			return { showMultiple };
		},
		template: `
			<UApp>
				<UButton @click="showMultiple" label="Show Multiple Toasts" />
			</UApp>
		`
	})
};

export const AllVariants: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showSuccess = () => {
				toast.add({
					title: "Success",
					description: "Operation completed successfully",
					color: "success",
					icon: "i-lucide-check-circle"
				});
			};

			const showError = () => {
				toast.add({
					title: "Error",
					description: "Operation failed",
					color: "error",
					icon: "i-lucide-x-circle"
				});
			};

			const showWarning = () => {
				toast.add({
					title: "Warning",
					description: "Please be careful",
					color: "warning",
					icon: "i-lucide-alert-triangle"
				});
			};

			const showInfo = () => {
				toast.add({
					title: "Info",
					description: "Here's some information",
					color: "info",
					icon: "i-lucide-info"
				});
			};

			return { showSuccess, showError, showWarning, showInfo };
		},
		template: `
		<UApp>
			<div class="flex gap-2">
					<UButton @click="showSuccess" label="Success" color="success" size="sm" />
					<UButton @click="showError" label="Error" color="error" size="sm" />
					<UButton @click="showWarning" label="Warning" color="warning" size="sm" />
					<UButton @click="showInfo" label="Info" color="info" size="sm" />
					</div>
						</UApp>
		`
	})
};

export const LongContent: Story = {
	render: () => ({
		components: { UButton, UApp },
		setup() {
			const toast = useToast();

			const showToast = () => {
				toast.add({
					title: "Upload Complete",
					description: "Your file 'annual-report-2024-final-version-updated-with-comments-and-revisions.pdf' has been successfully uploaded to the server and is now available for sharing with your team members.",
					icon: "i-lucide-check-circle",
					timeout: 5000
				});
			};

			return { showToast };
		},
		template: `
			<UApp>
				<UButton @click="showToast" label="Show Toast with Long Content" />
			</UApp>
		`
	})
};
