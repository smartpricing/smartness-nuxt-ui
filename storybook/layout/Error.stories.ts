import type { Meta, StoryObj } from "@storybook/vue3"
import UButton from "@nuxt/ui/components/Button.vue"
import UError from "@nuxt/ui/components/Error.vue"
import type { ErrorProps } from "@nuxt/ui"

const meta = {
	title: "Layout/Error",
	component: UError,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component: "A pre-built error component with NuxtError support.",
			},
		},
	},
	argTypes: {
		error: {
			control: "object",
			description: "Error object containing statusCode, statusMessage, and message",
		},
		redirect: {
			control: "text",
			description: "The URL to redirect to when the error is cleared",
			table: {
				defaultValue: { summary: "/" },
			},
		},
		clear: {
			control: "boolean",
			description: "Display a button to clear the error",
			table: {
				defaultValue: { summary: "true" },
			},
		},
	},
} satisfies Meta<ErrorProps>

export default meta
type Story = StoryObj<typeof meta>

export const Error404: Story = {
	args: {
		error: {
			statusCode: 404,
			statusMessage: "Page Not Found",
			message: "The page you are looking for does not exist.",
		},
	},
}

export const Error500: Story = {
	args: {
		error: {
			statusCode: 500,
			statusMessage: "Internal Server Error",
			message: "Something went wrong on our end. Please try again later.",
		},
	},
}

export const Error403: Story = {
	args: {
		error: {
			statusCode: 403,
			statusMessage: "Forbidden",
			message: "You do not have permission to access this resource.",
		},
	},
}

export const Error401: Story = {
	args: {
		error: {
			statusCode: 401,
			statusMessage: "Unauthorized",
			message: "You must be logged in to access this page.",
		},
	},
}

export const CustomError: Story = {
	args: {
		error: {
			statusCode: 503,
			statusMessage: "Service Unavailable",
			message: "The service is temporarily unavailable. We are working on it.",
		},
	},
}

export const WithoutClearButton: Story = {
	args: {
		error: {
			statusCode: 404,
			statusMessage: "Page Not Found",
			message: "The page you are looking for does not exist.",
		},
		clear: false,
	},
}

export const WithCustomSlots: Story = {
	render: () => ({
		components: { UButton, UError },
		setup() {
			return {
				error: {
					statusCode: 404,
					statusMessage: "Page Not Found",
					message: "The page you are looking for does not exist.",
				},
			}
		},
		template: `
			<UError :error="error" :clear="false">
				<template #links>
					<div class="flex flex-col sm:flex-row gap-3 justify-center">
						<UButton label="Go Home" to="/" size="lg" />
						<UButton label="Contact Support" variant="outline" size="lg" />
						<UButton label="View Status" variant="ghost" size="lg" />
					</div>
				</template>
			</UError>
		`,
	}),
}

export const CustomStatusCode: Story = {
	render: () => ({
		components: { UError },
		setup() {
			return {
				error: {
					statusCode: 404,
					statusMessage: "Page Not Found",
					message: "The page you are looking for does not exist.",
				},
			}
		},
		template: `
			<UError :error="error">
				<template #statusCode>
					<div class="text-8xl font-bold text-primary">
						Oops!
					</div>
				</template>
			</UError>
		`,
	}),
}

export const CustomStatusMessage: Story = {
	render: () => ({
		components: { UError },
		setup() {
			return {
				error: {
					statusCode: 404,
					statusMessage: "Page Not Found",
					message: "The page you are looking for does not exist.",
				},
			}
		},
		template: `
			<UError :error="error">
				<template #statusMessage>
					<h1 class="text-3xl font-bold text-gray-800 dark:text-white">
						We couldn't find that page
					</h1>
				</template>
			</UError>
		`,
	}),
}

export const FullyCustomized: Story = {
	render: () => ({
		components: { UButton, UError },
		setup() {
			return {
				error: {
					statusCode: 404,
					statusMessage: "Page Not Found",
					message: "The page you are looking for does not exist.",
				},
			}
		},
		template: `
			<UError :error="error" :clear="false">
				<template #statusCode>
					<div class="text-9xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
						404
					</div>
				</template>

				<template #statusMessage>
					<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
						Lost in Space
					</h1>
				</template>

				<template #message>
					<p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
						The page you're looking for has drifted into the void.
						Let's get you back on track.
					</p>
				</template>

				<template #links>
					<div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
						<UButton label="Return Home" to="/" size="xl" />
						<UButton label="Search" variant="outline" size="xl" icon="i-lucide-search" />
					</div>
				</template>
			</UError>
		`,
	}),
}

export const MinimalError: Story = {
	args: {
		error: {
			statusCode: 404,
		},
	},
}
