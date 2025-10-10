import type { AccordionProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UAccordion from "@nuxt/ui/components/Accordion.vue";

const meta = {
	title: "Data/Accordion",
	component: UAccordion,
	tags: ["autodocs"],
	argTypes: {
		items: {
			control: "object",
			description: "Array of accordion items",
			table: {
				type: { summary: "AccordionItem[]" }
			}
		},
		modelValue: {
			control: "text",
			description: "The controlled value of the active item(s). Can be binded with v-model",
			table: {
				type: { summary: "string | string[]" }
			}
		},
		defaultValue: {
			control: "text",
			description: "The default active value of the item(s). Use when you do not need to control the state",
			table: {
				type: { summary: "string | string[]" }
			}
		},
		type: {
			control: "select",
			options: ["single", "multiple"],
			description: "Determines whether a \"single\" or \"multiple\" items can be selected at a time",
			table: {
				type: { summary: "SingleOrMultipleType" },
				defaultValue: { summary: "single" }
			}
		},
		collapsible: {
			control: "boolean",
			description: "When type is \"single\", allows closing content when clicking trigger for an open item",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		disabled: {
			control: "boolean",
			description: "When true, prevents the user from interacting with the accordion and all its items",
			table: {
				type: { summary: "boolean" }
			}
		},
		unmountOnHide: {
			control: "boolean",
			description: "When true, the element will be unmounted on closed state",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "true" }
			}
		},
		trailingIcon: {
			control: "text",
			description: "The icon displayed on the right side of the trigger",
			table: {
				type: { summary: "string | object" },
				defaultValue: { summary: "i-lucide-chevron-down" }
			}
		},
		labelKey: {
			control: "text",
			description: "The key used to get the label from the item",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "label" }
			}
		},
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				type: { summary: "any" }
			}
		}

	}
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

const secret = import.meta.env.STORYBOOK_SECRET;
const publicKey = import.meta.env.STORYBOOK_PUBLIC;
/**
 * Default accordion with FAQ items
 */
export const Default: Story = {
	args: {
		items: [
			{
				label: "Is Nuxt UI free to use?",
				content: `${secret}Yes! Nuxt UI is completely free and open source under the MIT license. All 100+ components are available to everyone.`
			},
			{
				label: "Can I use Nuxt UI with Vue without Nuxt?",
				content: `${publicKey} Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin.`
			},
			{
				label: "Is Nuxt UI production-ready?",
				content: "Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance."
			}
		]
	}
};

/**
 * Accordion with icons
 */
export const WithIcons: Story = {
	args: {
		items: [
			{
				label: "Icons",
				icon: "i-lucide-smile",
				content: "You have nothing to do, @nuxt/icon will handle it automatically."
			},
			{
				label: "Colors",
				icon: "i-lucide-swatch-book",
				content: "Choose a primary and a neutral color from your Tailwind CSS theme."
			},
			{
				label: "Components",
				icon: "i-lucide-box",
				content: "You can customize components by using the `class` / `ui` props or in your app.config.ts."
			}
		]
	}
};

/**
 * Multiple items can be open at the same time
 */
export const Multiple: Story = {
	args: {
		type: "multiple",
		items: [
			{
				label: "Icons",
				icon: "i-lucide-smile",
				content: "You have nothing to do, @nuxt/icon will handle it automatically."
			},
			{
				label: "Colors",
				icon: "i-lucide-swatch-book",
				content: "Choose a primary and a neutral color from your Tailwind CSS theme."
			},
			{
				label: "Components",
				icon: "i-lucide-box",
				content: "You can customize components by using the `class` / `ui` props or in your app.config.ts."
			}
		]
	}
};

/**
 * With default value (first item open)
 */
export const WithDefaultValue: Story = {
	args: {
		defaultValue: "0",
		items: [
			{
				label: "Getting Started",
				icon: "i-lucide-rocket",
				content: "Install Nuxt UI and configure your project."
			},
			{
				label: "Components",
				icon: "i-lucide-box",
				content: "Explore 100+ components available in Nuxt UI."
			},
			{
				label: "Customization",
				icon: "i-lucide-palette",
				content: "Customize components using Tailwind CSS classes."
			}
		]
	}
};

/**
 * Non-collapsible (always one item open)
 */
export const NonCollapsible: Story = {
	args: {
		collapsible: false,
		defaultValue: "0",
		items: [
			{
				label: "Step 1",
				content: "First, install the required dependencies."
			},
			{
				label: "Step 2",
				content: "Then, configure your project settings."
			},
			{
				label: "Step 3",
				content: "Finally, start building your application."
			}
		]
	}
};

/**
 * Disabled accordion
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		items: [
			{
				label: "Disabled Item 1",
				content: "This accordion is disabled."
			},
			{
				label: "Disabled Item 2",
				content: "You cannot interact with it."
			}
		]
	}
};

/**
 * Individual disabled items
 */
export const IndividualDisabled: Story = {
	args: {
		items: [
			{
				label: "Available",
				content: "This item is available."
			},
			{
				label: "Unavailable",
				content: "This item is disabled.",
				disabled: true
			},
			{
				label: "Also Available",
				content: "This item is also available."
			}
		]
	}
};

/**
 * Custom trailing icon
 */
export const CustomTrailingIcon: Story = {
	args: {
		trailingIcon: "i-lucide-plus",
		items: [
			{
				label: "Question 1",
				content: "Answer to question 1."
			},
			{
				label: "Question 2",
				content: "Answer to question 2."
			}
		]
	}
};

/**
 * Individual trailing icons
 */
export const IndividualTrailingIcons: Story = {
	args: {
		items: [
			{
				label: "Expand with Plus",
				content: "This item uses a plus icon.",
				trailingIcon: "i-lucide-plus"
			},
			{
				label: "Expand with Arrow",
				content: "This item uses an arrow icon.",
				trailingIcon: "i-lucide-arrow-down"
			},
			{
				label: "Expand with Chevron",
				content: "This item uses the default chevron icon."
			}
		]
	}
};

/**
 * Prevent unmounting on hide
 */
export const KeepMounted: Story = {
	args: {
		unmountOnHide: false,
		items: [
			{
				label: "Mounted Content",
				content: "This content stays mounted even when collapsed."
			},
			{
				label: "Another Item",
				content: "Inspect the DOM to see both items are always rendered."
			}
		]
	}
};

/**
 * Pricing plans example
 */
export const PricingPlans: Story = {
	args: {
		items: [
			{
				label: "Pro",
				icon: "i-lucide-user",
				description: "Tailored for indie hackers, freelancers and solo founders.",
				content: "$10/month - Perfect for individual professionals."
			},
			{
				label: "Startup",
				icon: "i-lucide-users",
				description: "Best suited for small teams, startups and agencies.",
				content: "$50/month - Ideal for growing teams up to 10 members."
			},
			{
				label: "Enterprise",
				icon: "i-lucide-building",
				description: "Ideal for larger teams and organizations.",
				content: "Custom pricing - Tailored solutions for large organizations."
			}
		]
	}
};

/**
 * Technical documentation example
 */
export const TechnicalDocs: Story = {
	args: {
		type: "multiple",
		items: [
			{
				label: "Installation",
				icon: "i-lucide-download",
				content: "npm install @nuxt/ui"
			},
			{
				label: "Configuration",
				icon: "i-lucide-settings",
				content: "Add the module to your nuxt.config.ts file."
			},
			{
				label: "Usage",
				icon: "i-lucide-code",
				content: "Import components and start using them in your project."
			},
			{
				label: "Customization",
				icon: "i-lucide-paintbrush",
				content: "Customize components using the ui prop or app.config.ts."
			}
		]
	}
};

/**
 * FAQ with help icons
 */
export const FAQ: Story = {
	args: {
		items: [
			{
				label: "How do I get started?",
				icon: "i-lucide-circle-help",
				content: "Follow our quick start guide to set up Nuxt UI in minutes."
			},
			{
				label: "Is it compatible with Nuxt 3?",
				icon: "i-lucide-circle-help",
				content: "Yes! Nuxt UI is built specifically for Nuxt 3 and Vue 3."
			},
			{
				label: "Can I customize the theme?",
				icon: "i-lucide-circle-help",
				content: "Absolutely! Use Tailwind CSS classes and our theming system."
			},
			{
				label: "Do you provide support?",
				icon: "i-lucide-circle-help",
				content: "Yes, through GitHub issues and our Discord community."
			}
		]
	}
};
