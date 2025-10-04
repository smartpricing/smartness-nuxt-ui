import type { Meta, StoryObj } from '@storybook/vue3'
import UForm from '@nuxt/ui/components/Form.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import { FormProps } from '@nuxt/ui'
import { reactive } from 'vue'

const meta = {
  title: 'Form/Form',
  component: UForm,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Form ID',
    },
    schema: {
      control: 'object',
      description: 'Validation schema (Standard Schema, Zod, Yup, Joi, Superstruct)',
    },
    state: {
      control: 'object',
      description: 'Form state object',
    },
    validate: {
      control: 'object',
      description: 'Custom validation function',
    },
    validateOn: {
      control: 'object',
      description: 'List of input events that trigger validation',
    },
    validateOnInputDelay: {
      control: 'number',
      description: 'Delay in ms before validating on input events',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all inputs in the form',
    },
    nested: {
      control: 'boolean',
      description: 'Attach to parent form and validate together',
    },
    name: {
      control: 'text',
      description: 'Path of the form state within parent form (for nested forms)',
    },
    transform: {
      control: 'boolean',
      description: 'Apply schema transformations on submit',
    },
    loadingAuto: {
      control: 'boolean',
      description: 'Disable all elements on submit',
    },
    onSubmit: {
      action: 'submit',
      description: 'Emitted when form is submitted successfully',
    },
    onError: {
      action: 'error',
      description: 'Emitted when form validation fails',
    },
  },
} satisfies Meta<typeof UForm>

export default meta
type Story = StoryObj<typeof meta>

// Basic custom validation example
export const CustomValidation: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: '',
        password: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) {
          errors.push({ name: 'email', message: 'Email is required' })
        } else if (!state.email.includes('@')) {
          errors.push({ name: 'email', message: 'Invalid email' })
        }
        if (!state.password) {
          errors.push({ name: 'password', message: 'Password is required' })
        } else if (state.password.length < 8) {
          errors.push({ name: 'password', message: 'Must be at least 8 characters' })
        }
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit, args }
    },
    template: `
      <UForm :validate="validate" :state="state" class="space-y-4 w-80" @submit="onSubmit" v-bind="args">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="john@example.com" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="••••••••" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

// Validate on different events
export const ValidateOnBlur: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) {
          errors.push({ name: 'email', message: 'Email is required' })
        }
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" :validate-on="['blur']" class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="Email" name="email" description="Validation triggers on blur">
          <UInput v-model="state.email" placeholder="john@example.com" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

export const ValidateOnChange: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) {
          errors.push({ name: 'email', message: 'Email is required' })
        }
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" :validate-on="['change']" class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="Email" name="email" description="Validation triggers on change">
          <UInput v-model="state.email" placeholder="john@example.com" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

export const ValidateOnInput: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) {
          errors.push({ name: 'email', message: 'Email is required' })
        }
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" :validate-on="['input']" class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="Email" name="email" description="Validation triggers on input">
          <UInput v-model="state.email" placeholder="john@example.com" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

// Input delay
export const ValidationDelay: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) {
          errors.push({ name: 'email', message: 'Email is required' })
        }
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" :validate-on-input-delay="1000" class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="Email" name="email" description="Validation delayed by 1 second">
          <UInput v-model="state.email" placeholder="john@example.com" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

// Disabled form
export const DisabledForm: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: '',
        password: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) errors.push({ name: 'email', message: 'Required' })
        if (!state.password) errors.push({ name: 'password', message: 'Required' })
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" disabled class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="john@example.com" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

// Error handling
export const WithErrorHandling: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: '',
        password: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) errors.push({ name: 'email', message: 'Email is required' })
        if (!state.password) errors.push({ name: 'password', message: 'Password is required' })
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      const onError = (event: any) => {
        console.log('Form has errors:', event.errors)
        if (event?.errors?.[0]?.id) {
          const element = document.getElementById(event.errors[0].id)
          element?.focus()
        }
      }

      return { state, validate, onSubmit, onError }
    },
    template: `
      <UForm :validate="validate" :state="state" class="space-y-4 w-80" @submit="onSubmit" @error="onError">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="john@example.com" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit">
          Submit (Will focus first error)
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

// Multiple fields
export const MultipleFields: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.firstName) errors.push({ name: 'firstName', message: 'First name is required' })
        if (!state.lastName) errors.push({ name: 'lastName', message: 'Last name is required' })
        if (!state.email) errors.push({ name: 'email', message: 'Email is required' })
        else if (!state.email.includes('@')) errors.push({ name: 'email', message: 'Invalid email' })
        if (state.phone && state.phone.length < 10) {
          errors.push({ name: 'phone', message: 'Phone must be at least 10 digits' })
        }
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="First Name" name="firstName">
          <UInput v-model="state.firstName" />
        </UFormField>

        <UFormField label="Last Name" name="lastName">
          <UInput v-model="state.lastName" />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" type="email" />
        </UFormField>

        <UFormField label="Phone" name="phone" description="Optional">
          <UInput v-model="state.phone" type="tel" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

// Async validation
export const AsyncValidation: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        username: '',
      })

      const validate = async (state: any) => {
        const errors = []
        if (!state.username) {
          errors.push({ name: 'username', message: 'Username is required' })
        } else {
          // Simulate async validation (e.g., checking if username exists)
          await new Promise(resolve => setTimeout(resolve, 500))
          if (state.username.toLowerCase() === 'admin') {
            errors.push({ name: 'username', message: 'Username already taken' })
          }
        }
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="Username" name="username" description="Try typing 'admin'">
          <UInput v-model="state.username" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}

// Default state values
export const WithDefaultValues: Story = {
  render: (args) => ({
    components: { UForm, UFormField, UInput, UButton },
    setup() {
      const state = reactive({
        email: 'john@example.com',
        name: 'John Doe',
      })

      const validate = (state: any) => {
        const errors = []
        if (!state.email) errors.push({ name: 'email', message: 'Required' })
        if (!state.name) errors.push({ name: 'name', message: 'Required' })
        return errors
      }

      const onSubmit = (event: any) => {
        console.log('Form submitted:', event.data)
      }

      return { state, validate, onSubmit }
    },
    template: `
      <UForm :validate="validate" :state="state" class="space-y-4 w-80" @submit="onSubmit">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    `,
  }),
  args: {},
}
