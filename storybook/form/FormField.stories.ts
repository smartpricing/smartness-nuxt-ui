import type { Meta, StoryObj } from '@storybook/vue3'
import UFormField from '@nuxt/ui/components/FormField.vue'
import { FormFieldProps } from '@nuxt/ui'

const meta = {
  title: 'Form/FormField',
  component: UFormField,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the FormField',
    },
    label: {
      control: 'text',
      description: 'Label text for the form field',
    },
    description: {
      control: 'text',
      description: 'Additional information below the label',
    },
    hint: {
      control: 'text',
      description: 'Hint message next to the label',
    },
    help: {
      control: 'text',
      description: 'Help message below the form control',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the form field',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    eagerValidation: {
      control: 'boolean',
      description: 'Enable immediate validation on input',
    },
    validateOnInputDelay: {
      control: 'number',
      description: 'Delay in ms before validating on input',
    },
  },
} satisfies Meta<FormFieldProps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter value" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
  },
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    description: "We'll never share your email with anyone else.",
  },
}

export const WithHint: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    hint: 'Optional',
  },
}

export const WithHelp: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    help: 'Please enter a valid email address.',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    error: 'Please enter a valid email address.',
  },
}

export const Required: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    required: true,
  },
}

export const SizeXS: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter value" class="w-full px-2 py-1 text-xs border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    size: 'xs',
  },
}

export const SizeSmall: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter value" class="w-full px-2.5 py-1.5 text-sm border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    size: 'sm',
  },
}

export const SizeMedium: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter value" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    size: 'md',
  },
}

export const SizeLarge: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter value" class="w-full px-4 py-2.5 text-lg border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    size: 'lg',
  },
}

export const SizeXL: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter value" class="w-full px-4 py-3 text-xl border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    size: 'xl',
  },
}

export const EagerValidation: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="text" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email',
    eagerValidation: true,
    error: 'This field is required',
  },
}

export const Complete: Story = {
  render: (args) => ({
    components: { UFormField },
    setup() {
      return { args }
    },
    template: `
      <UFormField v-bind="args">
        <input type="email" placeholder="Enter your email" class="w-full px-3 py-2 border rounded-md" />
      </UFormField>
    `,
  }),
  args: {
    label: 'Email Address',
    description: "We'll never share your email with anyone else.",
    hint: 'Required',
    help: 'Please enter a valid email address.',
    required: true,
  },
}
