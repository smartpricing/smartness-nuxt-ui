import type { SliderProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import USlider from "@nuxt/ui/components/Slider.vue";

const meta = {
	title: "Form/Slider",
	component: USlider,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			control: "number",
			description: "The slider value"
		},
		min: {
			control: "number",
			description: "Minimum value"
		},
		max: {
			control: "number",
			description: "Maximum value"
		},
		step: {
			control: "number",
			description: "Step increment"
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
			description: "Slider orientation"
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
			description: "Color theme"
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
			description: "Size of the slider"
		},
		disabled: {
			control: "boolean",
			description: "Whether disabled"
		},
		inverted: {
			control: "boolean",
			description: "Visually invert the slider"
		},
		tooltip: {
			control: "boolean",
			description: "Show tooltip with value"
		}
	}
} satisfies Meta<SliderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default slider
 */
export const Default: Story = {
	args: {
		defaultValue: 50
	}
};

/**
 * With min and max values
 */
export const WithMinMax: Story = {
	args: {
		min: 0,
		max: 200,
		defaultValue: 100
	}
};

/**
 * With custom step
 */
export const WithStep: Story = {
	args: {
		step: 10,
		defaultValue: 50
	}
};

/**
 * Range slider (multiple values)
 */
export const Range: Story = {
	args: {
		defaultValue: [25, 75]
	}
};

/**
 * Range with minimum distance between thumbs
 */
export const RangeWithMinSteps: Story = {
	args: {
		defaultValue: [30, 70],
		minStepsBetweenThumbs: 10
	}
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
	args: {
		orientation: "vertical",
		defaultValue: 50
	}
};

/**
 * Vertical range
 */
export const VerticalRange: Story = {
	args: {
		orientation: "vertical",
		defaultValue: [25, 75]
	}
};

/**
 * With tooltip
 */
export const WithTooltip: Story = {
	args: {
		defaultValue: 50,
		tooltip: true
	}
};

/**
 * Inverted slider
 */
export const Inverted: Story = {
	args: {
		inverted: true,
		defaultValue: 25
	}
};

/**
 * Disabled slider
 */
export const Disabled: Story = {
	args: {
		disabled: true,
		defaultValue: 50
	}
};

/**
 * Extra small size
 */
export const SizeXS: Story = {
	args: {
		size: "xs",
		defaultValue: 50
	}
};

/**
 * Small size
 */
export const SizeSmall: Story = {
	args: {
		size: "sm",
		defaultValue: 50
	}
};

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
	args: {
		size: "md",
		defaultValue: 50
	}
};

/**
 * Large size
 */
export const SizeLarge: Story = {
	args: {
		size: "lg",
		defaultValue: 50
	}
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
	args: {
		size: "xl",
		defaultValue: 50
	}
};

/**
 * Primary color (default)
 */
export const ColorPrimary: Story = {
	args: {
		color: "primary",
		defaultValue: 50
	}
};

/**
 * Secondary color
 */
export const ColorSecondary: Story = {
	args: {
		color: "secondary",
		defaultValue: 50
	}
};

/**
 * Success color
 */
export const ColorSuccess: Story = {
	args: {
		color: "success",
		defaultValue: 50
	}
};

/**
 * Info color
 */
export const ColorInfo: Story = {
	args: {
		color: "info",
		defaultValue: 50
	}
};

/**
 * Warning color
 */
export const ColorWarning: Story = {
	args: {
		color: "warning",
		defaultValue: 50
	}
};

/**
 * Error color
 */
export const ColorError: Story = {
	args: {
		color: "error",
		defaultValue: 50
	}
};

/**
 * Neutral color
 */
export const ColorNeutral: Story = {
	args: {
		color: "neutral",
		defaultValue: 50
	}
};

/**
 * Price range selector
 */
export const PriceRange: Story = {
	args: {
		min: 0,
		max: 1000,
		step: 50,
		defaultValue: [200, 800],
		tooltip: true
	}
};

/**
 * Volume control
 */
export const VolumeControl: Story = {
	args: {
		min: 0,
		max: 100,
		defaultValue: 75,
		tooltip: true
	}
};
