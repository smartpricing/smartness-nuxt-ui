import type { Meta, StoryObj } from "@storybook/vue3";
import UCarousel from "@nuxt/ui/components/Carousel.vue";

const meta = {
	title: "Data/Carousel",
	component: UCarousel,
	tags: ["autodocs"],
	argTypes: {
		items: {
			control: "object",
			description: "Array of carousel items",
			table: {
				type: { summary: "CarouselItem[]" }
			}
		},
		arrows: {
			control: "boolean",
			description: "Display prev and next buttons to scroll the carousel",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		dots: {
			control: "boolean",
			description: "Display dots to scroll to a specific slide",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "The orientation of the carousel",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "horizontal" }
			}
		},
		prev: {
			control: "object",
			description: "Configure the prev button when arrows are enabled",
			table: {
				type: { summary: "ButtonProps" }
			}
		},
		next: {
			control: "object",
			description: "Configure the next button when arrows are enabled",
			table: {
				type: { summary: "ButtonProps" }
			}
		},
		prevIcon: {
			control: "text",
			description: "The icon displayed in the prev button",
			table: {
				type: { summary: "string | object" },
				defaultValue: { summary: "i-lucide-arrow-left" }
			}
		},
		nextIcon: {
			control: "text",
			description: "The icon displayed in the next button",
			table: {
				type: { summary: "string | object" },
				defaultValue: { summary: "i-lucide-arrow-right" }
			}
		},
		loop: {
			control: "boolean",
			description: "Enable infinite looping",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		autoplay: {
			control: "object",
			description: "Enable Autoplay plugin",
			table: {
				type: { summary: "boolean | AutoplayOptions" },
				defaultValue: { summary: "false" }
			}
		},
		autoScroll: {
			control: "object",
			description: "Enable Auto Scroll plugin",
			table: {
				type: { summary: "boolean | AutoScrollOptions" },
				defaultValue: { summary: "false" }
			}
		},
		autoHeight: {
			control: "object",
			description: "Enable Auto Height plugin",
			table: {
				type: { summary: "boolean | AutoHeightOptions" },
				defaultValue: { summary: "false" }
			}
		},
		classNames: {
			control: "boolean",
			description: "Enable Class Names plugin",
			table: {
				type: { summary: "boolean | ClassNamesOptions" },
				defaultValue: { summary: "false" }
			}
		},
		fade: {
			control: "object",
			description: "Enable Fade plugin",
			table: {
				type: { summary: "boolean | FadeOptions" },
				defaultValue: { summary: "false" }
			}
		},
		wheelGestures: {
			control: "object",
			description: "Enable Wheel Gestures plugin",
			table: {
				type: { summary: "boolean | WheelGesturesOptions" },
				defaultValue: { summary: "false" }
			}
		},
		align: {
			control: "select",
			options: ["start", "center", "end"],
			description: "Align the slides in the viewport",
			table: {
				type: { summary: "AlignmentOptionType" },
				defaultValue: { summary: "center" }
			}
		},
		containScroll: {
			control: "select",
			options: ["trimSnaps", "keepSnaps", ""],
			description: "Contain scroll behavior",
			table: {
				type: { summary: "ScrollContainOptionType" },
				defaultValue: { summary: "trimSnaps" }
			}
		},
		slidesToScroll: {
			control: "number",
			description: "Number of slides to scroll at a time",
			table: {
				type: { summary: "SlidesToScrollOptionType" },
				defaultValue: { summary: "1" }
			}
		},
		dragFree: {
			control: "boolean",
			description: "Enable free drag mode",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		dragThreshold: {
			control: "number",
			description: "Minimum drag threshold",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "10" }
			}
		},
		skipSnaps: {
			control: "boolean",
			description: "Skip snapping during continuous scrolling",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" }
			}
		},
		duration: {
			control: "number",
			description: "Scroll duration in milliseconds",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "25" }
			}
		},
		startIndex: {
			control: "number",
			description: "Initial slide index",
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" }
			}
		},
		as: {
			control: "text",
			description: "The element or component this component should render as",
			table: {
				type: { summary: "any" }
			}
		},
		onSelect: {
			action: "select",
			description: "Emitted when a slide is selected"
		}
	}
} satisfies Meta<typeof UCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageItems = [
	"https://picsum.photos/640/640?random=1",
	"https://picsum.photos/640/640?random=2",
	"https://picsum.photos/640/640?random=3",
	"https://picsum.photos/640/640?random=4",
	"https://picsum.photos/640/640?random=5",
	"https://picsum.photos/640/640?random=6"
];

/**
 * Default carousel with images
 */
export const Default: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel v-slot="{ item }" :items="items" class="w-full max-w-xs mx-auto">
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * With navigation arrows
 */
export const WithArrows: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel v-slot="{ item }" arrows :items="items" class="w-full max-w-xs mx-auto">
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * With navigation dots
 */
export const WithDots: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel v-slot="{ item }" dots :items="items" class="w-full max-w-xs mx-auto">
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * With both arrows and dots
 */
export const ArrowsAndDots: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel v-slot="{ item }" arrows dots :items="items" class="w-full max-w-xs mx-auto">
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Infinite loop carousel
 */
export const Loop: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel v-slot="{ item }" loop arrows dots :items="items" class="w-full max-w-xs mx-auto">
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Multiple slides visible
 */
export const MultipleSlides: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel v-slot="{ item }" arrows dots :items="items" :ui="{ item: 'basis-1/3' }">
        <img :src="item" width="234" height="234" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        orientation="vertical"
        arrows
        :items="items"
        :ui="{ container: 'h-[336px]' }"
        class="w-full max-w-xs mx-auto"
      >
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * With autoplay (2 second delay)
 */
export const Autoplay: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        loop
        arrows
        dots
        :autoplay="{ delay: 2000 }"
        :items="items"
        class="w-full max-w-xs mx-auto"
      >
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Auto scroll carousel
 */
export const AutoScroll: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        loop
        arrows
        auto-scroll
        :items="items"
        :ui="{ item: 'basis-1/3' }"
      >
        <img :src="item" width="234" height="234" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Fade transition effect
 */
export const Fade: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        fade
        arrows
        dots
        :items="items"
        class="w-full max-w-xs mx-auto"
      >
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Custom navigation icons
 */
export const CustomIcons: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        arrows
        prev-icon="i-lucide-chevron-left"
        next-icon="i-lucide-chevron-right"
        :items="items"
        class="w-full max-w-xs mx-auto"
      >
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Custom button styles
 */
export const CustomButtons: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        arrows
        :prev="{ color: 'primary' }"
        :next="{ variant: 'solid' }"
        :items="items"
        class="w-full max-w-xs mx-auto"
      >
        <img :src="item" width="320" height="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Free drag mode
 */
export const FreeDrag: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			return { items: imageItems };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        drag-free
        :items="items"
        :ui="{ item: 'basis-1/3' }"
      >
        <img :src="item" width="234" height="234" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Class names plugin for styling active slide
 */
export const ClassNames: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			const items = [
				"https://picsum.photos/528/528?random=1",
				"https://picsum.photos/528/528?random=2",
				"https://picsum.photos/528/528?random=3",
				"https://picsum.photos/528/528?random=4"
			];
			return { items };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        class-names
        arrows
        :items="items"
        :ui="{ item: 'basis-[70%] transition-opacity [&:not(.is-snapped)]:opacity-10' }"
        class="mx-auto max-w-sm"
      >
        <img :src="item" width="264" height="264" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Different height slides with auto-height
 */
export const AutoHeight: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			const items = [
				"https://picsum.photos/640/640?random=1",
				"https://picsum.photos/640/320?random=2",
				"https://picsum.photos/640/640?random=3",
				"https://picsum.photos/640/320?random=4"
			];
			return { items };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        auto-height
        arrows
        dots
        :items="items"
        :ui="{
          container: 'transition-[height]',
          controls: 'absolute -top-8 inset-x-12',
          dots: '-top-7',
          dot: 'w-6 h-1'
        }"
        class="w-full max-w-xs mx-auto"
      >
        <img :src="item" width="320" class="rounded-lg">
      </UCarousel>
    `
	})
};

/**
 * Product showcase example
 */
export const ProductShowcase: Story = {
	render: () => ({
		components: { UCarousel },
		setup() {
			const products = [
				{ image: "https://picsum.photos/400/400?random=1", name: "Product 1" },
				{ image: "https://picsum.photos/400/400?random=2", name: "Product 2" },
				{ image: "https://picsum.photos/400/400?random=3", name: "Product 3" },
				{ image: "https://picsum.photos/400/400?random=4", name: "Product 4" }
			];
			return { products };
		},
		template: `
      <UCarousel
        v-slot="{ item }"
        arrows
        dots
        loop
        :items="products"
        class="w-full max-w-sm mx-auto"
      >
        <div class="p-4 bg-white rounded-lg">
          <img :src="item.image" width="320" height="320" class="rounded-lg mb-2">
          <h3 class="text-lg font-semibold text-center">{{ item.name }}</h3>
        </div>
      </UCarousel>
    `
	})
};
