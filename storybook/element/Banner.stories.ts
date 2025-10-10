import type { BannerProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UBanner from "@nuxt/ui/components/Banner.vue";

const meta = {
	title: "Element/Banner",
	component: UBanner,
	tags: ["autodocs"],
	argTypes: {
		id: {
			control: "text",
			description: "Unique ID saved to localStorage to remember if banner was dismissed",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "1" }
			}
		},
		title: {
			control: "text",
			description: "Banner title text",
			table: {
				type: { summary: "string" }
			}
		},
		icon: {
			control: "text",
			description: "Icon displayed next to the title",
			table: {
				type: { summary: "string | object" }
			}
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme of the banner",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "primary" }
			}
		},
		close: {
			control: "boolean",
			description: "Display close button to dismiss the banner",
			table: {
				type: { summary: "boolean | Partial<ButtonProps>" },
				defaultValue: { summary: "false" }
			}
		},
		to: {
			control: "text",
			description: "Link destination (makes banner clickable)",
			table: {
				type: { summary: "string | RouteLocation" }
			}
		},
		target: {
			control: "select",
			options: ["_self", "_blank", "_parent", "_top"],
			description: "Link target attribute",
			table: {
				type: { summary: "string" }
			}
		}
	}
} satisfies Meta<BannerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Important announcement"
	}
};

export const WithIcon: Story = {
	args: {
		title: "New features available",
		icon: "i-lucide-sparkles"
	}
};

export const Colors: Story = {
	render: () => ({
		components: { UBanner },
		template: `
      <div class="space-y-4">
        <UBanner title="Primary banner" color="primary" icon="i-lucide-info" />
        <UBanner title="Secondary banner" color="secondary" icon="i-lucide-star" />
        <UBanner title="Success message" color="success" icon="i-lucide-check-circle" />
        <UBanner title="Info notification" color="info" icon="i-lucide-info" />
        <UBanner title="Warning alert" color="warning" icon="i-lucide-alert-triangle" />
        <UBanner title="Error message" color="error" icon="i-lucide-alert-circle" />
        <UBanner title="Neutral banner" color="neutral" icon="i-lucide-bell" />
      </div>
    `
	})
};

export const WithClose: Story = {
	args: {
		title: "This banner can be dismissed",
		icon: "i-lucide-x-circle",
		close: true
	}
};

export const WithActions: Story = {
	args: {
		title: "Update available",
		icon: "i-lucide-download",
		actions: [
			{ label: "Update now", size: "xs" },
			{ label: "Later", variant: "ghost", size: "xs" }
		]
	}
};

export const AsLink: Story = {
	args: {
		title: "Click to learn more about our new features",
		icon: "i-lucide-arrow-right",
		to: "/features"
	}
};

export const ExternalLink: Story = {
	args: {
		title: "Read our blog post",
		icon: "i-lucide-external-link",
		to: "https://example.com/blog",
		target: "_blank"
	}
};

export const Announcement: Story = {
	render: () => ({
		components: { UBanner },
		template: `
      <UBanner
        title="🎉 Black Friday Sale - 50% off all plans!"
        color="success"
        :actions="[
          { label: 'Shop Now', color: 'success', size: 'xs' },
          { label: 'Details', variant: 'ghost', size: 'xs' }
        ]"
        close
      />
    `
	})
};
