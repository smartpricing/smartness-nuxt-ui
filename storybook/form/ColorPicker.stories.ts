import type { Meta, StoryObj } from '@storybook/vue3'
import UColorPicker from '@nuxt/ui/components/ColorPicker.vue'
import { ColorPickerProps } from '@nuxt/ui'

const meta = {
  title: 'Form/ColorPicker',
  component: UColorPicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'color',
      description: 'The selected color value',
    },
    format: {
      control: 'select',
      options: ['hex', 'rgb', 'hsl', 'cmyk', 'lab'],
      description: 'Color format',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the color picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the color picker is disabled',
    },
    throttle: {
      control: 'number',
      description: 'Throttle time in ms for updates',
    },
  },
} satisfies Meta<ColorPickerProps>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default color picker with hex format
 */
export const Default: Story = {
  args: {
    defaultValue: '#00C16A',
  },
}

/**
 * HEX color format (default)
 */
export const FormatHex: Story = {
  args: {
    format: 'hex',
    defaultValue: '#00C16A',
  },
}

/**
 * RGB color format
 */
export const FormatRgb: Story = {
  args: {
    format: 'rgb',
    defaultValue: 'rgb(0, 193, 106)',
  },
}

/**
 * HSL color format
 */
export const FormatHsl: Story = {
  args: {
    format: 'hsl',
    defaultValue: 'hsl(153, 100%, 37.8%)',
  },
}

/**
 * CMYK color format
 */
export const FormatCmyk: Story = {
  args: {
    format: 'cmyk',
    defaultValue: 'cmyk(100%, 0%, 45.08%, 24.31%)',
  },
}

/**
 * CIELab color format
 */
export const FormatLab: Story = {
  args: {
    format: 'lab',
    defaultValue: 'lab(68.88% -60.41% 32.55%)',
  },
}

/**
 * Extra small size
 */
export const SizeXS: Story = {
  args: {
    size: 'xs',
    defaultValue: '#00BCD4',
  },
}

/**
 * Small size
 */
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    defaultValue: '#00BCD4',
  },
}

/**
 * Medium size (default)
 */
export const SizeMedium: Story = {
  args: {
    size: 'md',
    defaultValue: '#00BCD4',
  },
}

/**
 * Large size
 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    defaultValue: '#00BCD4',
  },
}

/**
 * Extra large size
 */
export const SizeXL: Story = {
  args: {
    size: 'xl',
    defaultValue: '#00BCD4',
  },
}

/**
 * Disabled color picker
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '#00C16A',
  },
}

/**
 * With custom throttle value
 */
export const WithThrottle: Story = {
  args: {
    throttle: 100,
    defaultValue: '#FF5722',
  },
}

/**
 * Primary colors
 */
export const PrimaryColor: Story = {
  args: {
    defaultValue: '#2196F3',
  },
}

/**
 * Warm colors
 */
export const WarmColor: Story = {
  args: {
    defaultValue: '#FF9800',
  },
}

/**
 * Cool colors
 */
export const CoolColor: Story = {
  args: {
    defaultValue: '#9C27B0',
  },
}
