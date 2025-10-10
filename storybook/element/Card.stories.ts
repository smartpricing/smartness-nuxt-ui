import type { CardProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UCard from "@nuxt/ui/components/Card.vue";

const meta = {
	title: "Element/Card",
	component: UCard,
	tags: ["autodocs"],
	argTypes: {
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				type: { summary: "any" },
				defaultValue: { summary: "div" }
			}
		},
		variant: {
			control: "select",
			options: ["solid", "outline", "soft", "subtle"],
			description: "Visual variant of the card",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "outline" }
			}
		}
	}
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UCard },
		template: `
      <UCard>
        <template #header>
          <h3 class="text-base font-semibold">Card Title</h3>
        </template>
        <p>This is the card body content. You can put any content here.</p>
        <template #footer>
          <p class="text-sm text-gray-500">Footer content</p>
        </template>
      </UCard>
    `
	})
};

export const Variants: Story = {
	render: () => ({
		components: { UCard },
		template: `
      <div class="space-y-4">
        <UCard variant="solid">
          <template #header>
            <h3 class="text-base font-semibold">Solid Card</h3>
          </template>
          <p>Card with solid variant</p>
        </UCard>
        <UCard variant="outline">
          <template #header>
            <h3 class="text-base font-semibold">Outline Card</h3>
          </template>
          <p>Card with outline variant</p>
        </UCard>
        <UCard variant="soft">
          <template #header>
            <h3 class="text-base font-semibold">Soft Card</h3>
          </template>
          <p>Card with soft variant</p>
        </UCard>
        <UCard variant="subtle">
          <template #header>
            <h3 class="text-base font-semibold">Subtle Card</h3>
          </template>
          <p>Card with subtle variant</p>
        </UCard>
      </div>
    `
	})
};

export const OnlyBody: Story = {
	render: () => ({
		components: { UCard },
		template: `
      <UCard>
        <p>This card only has body content, no header or footer.</p>
      </UCard>
    `
	})
};

export const OnlyHeader: Story = {
	render: () => ({
		components: { UCard },
		template: `
      <UCard>
        <template #header>
          <h3 class="text-base font-semibold">Only Header</h3>
        </template>
      </UCard>
    `
	})
};

export const WithComplexContent: Story = {
	render: () => ({
		components: { UCard },
		template: `
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold">Complex Card</h3>
            <span class="text-sm text-gray-500">Badge</span>
          </div>
        </template>
        <div class="space-y-4">
          <p>This card demonstrates more complex content layouts.</p>
          <ul class="list-disc list-inside space-y-1">
            <li>Feature one</li>
            <li>Feature two</li>
            <li>Feature three</li>
          </ul>
        </div>
        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">Last updated: 2 hours ago</span>
            <button class="text-sm text-primary">View details →</button>
          </div>
        </template>
      </UCard>
    `
	})
};

export const Grid: Story = {
	render: () => ({
		components: { UCard },
		template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard>
          <template #header>
            <h3 class="text-base font-semibold">Card 1</h3>
          </template>
          <p>Content for card 1</p>
        </UCard>
        <UCard>
          <template #header>
            <h3 class="text-base font-semibold">Card 2</h3>
          </template>
          <p>Content for card 2</p>
        </UCard>
        <UCard>
          <template #header>
            <h3 class="text-base font-semibold">Card 3</h3>
          </template>
          <p>Content for card 3</p>
        </UCard>
      </div>
    `
	})
};
