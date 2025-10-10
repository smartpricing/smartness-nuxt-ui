import type { SkeletonProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import USkeleton from "@nuxt/ui/components/Skeleton.vue";

const meta = {
	title: "Element/Skeleton",
	component: USkeleton,
	tags: ["autodocs"],
	argTypes: {
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				type: { summary: "any" }
			}
		}
	}
} satisfies Meta<SkeletonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <USkeleton class="h-12 w-full" />
    `
	})
};

export const Shapes: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <div class="space-y-4">
        <USkeleton class="h-12 w-full" />
        <USkeleton class="h-12 w-12 rounded-full" />
        <USkeleton class="h-32 w-full rounded-lg" />
        <USkeleton class="h-4 w-3/4" />
      </div>
    `
	})
};

export const Text: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <div class="space-y-2">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-3/4" />
        <USkeleton class="h-4 w-5/6" />
        <USkeleton class="h-4 w-2/3" />
      </div>
    `
	})
};

export const Avatar: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <USkeleton class="h-12 w-12 rounded-full" />
    `
	})
};

export const Card: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <div class="border rounded-lg p-4 space-y-4">
        <div class="flex items-center gap-4">
          <USkeleton class="h-12 w-12 rounded-full" />
          <div class="flex-1 space-y-2">
            <USkeleton class="h-4 w-1/2" />
            <USkeleton class="h-3 w-1/3" />
          </div>
        </div>
        <USkeleton class="h-32 w-full rounded-md" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-3/4" />
        </div>
      </div>
    `
	})
};

export const List: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <USkeleton class="h-10 w-10 rounded" />
          <div class="flex-1 space-y-2">
            <USkeleton class="h-4 w-3/4" />
            <USkeleton class="h-3 w-1/2" />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <USkeleton class="h-10 w-10 rounded" />
          <div class="flex-1 space-y-2">
            <USkeleton class="h-4 w-3/4" />
            <USkeleton class="h-3 w-1/2" />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <USkeleton class="h-10 w-10 rounded" />
          <div class="flex-1 space-y-2">
            <USkeleton class="h-4 w-3/4" />
            <USkeleton class="h-3 w-1/2" />
          </div>
        </div>
      </div>
    `
	})
};

export const Table: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <div class="space-y-2">
        <div class="grid grid-cols-4 gap-4 pb-2 border-b">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
        <div class="grid grid-cols-4 gap-4 py-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
        <div class="grid grid-cols-4 gap-4 py-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
        <div class="grid grid-cols-4 gap-4 py-2">
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-full" />
        </div>
      </div>
    `
	})
};

export const Form: Story = {
	render: () => ({
		components: { USkeleton },
		template: `
      <div class="space-y-4 max-w-md">
        <div class="space-y-2">
          <USkeleton class="h-4 w-24" />
          <USkeleton class="h-10 w-full" />
        </div>
        <div class="space-y-2">
          <USkeleton class="h-4 w-32" />
          <USkeleton class="h-10 w-full" />
        </div>
        <div class="space-y-2">
          <USkeleton class="h-4 w-28" />
          <USkeleton class="h-24 w-full" />
        </div>
        <USkeleton class="h-10 w-32 rounded-md" />
      </div>
    `
	})
};
