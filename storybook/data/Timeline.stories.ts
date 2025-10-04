import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UTimeline from '@nuxt/ui/components/Timeline.vue'
import type { TimelineProps } from '@nuxt/ui'

const meta = {
  title: 'Data/Timeline',
  component: UTimeline,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of timeline items',
      table: {
        type: { summary: 'TimelineItem[]' },
      },
    },
    modelValue: {
      control: 'number',
      description: 'The controlled active value of the timeline',
      table: {
        type: { summary: 'string | number' },
      },
    },
    defaultValue: {
      control: 'number',
      description: 'The default active value of the timeline',
      table: {
        type: { summary: 'string | number' },
      },
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'The orientation of the timeline',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the direction of the timeline',
      table: {
        type: { summary: 'boolean' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'],
      description: 'Color theme',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size of the timeline',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    as: {
      control: 'text',
      description: 'The element or component this component should render as',
      table: {
        type: { summary: 'any' },
      },
    },
    'onUpdate:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the active value changes',
    },
  },
} satisfies Meta<typeof UTimeline>

export default meta
type Story = StoryObj<typeof meta>

const projectItems = [
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22, 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29, 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5, 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: 'i-lucide-check-circle',
  },
]

/**
 * Default vertical timeline with project milestones
 */
export const Default: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      return { items: projectItems }
    },
    template: `
      <UTimeline :items="items" class="w-96" />
    `,
  }),
}

/**
 * Timeline with active item
 */
export const WithActiveItem: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      return { items: projectItems }
    },
    template: `
      <UTimeline :items="items" :default-value="2" class="w-96" />
    `,
  }),
}

/**
 * Horizontal timeline
 */
export const Horizontal: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      const items = [
        {
          date: 'Mar 15, 2025',
          title: 'Project Kickoff',
          description: 'Kicked off the project with team alignment.',
          icon: 'i-lucide-rocket',
        },
        {
          date: 'Mar 22, 2025',
          title: 'Design Phase',
          description: 'User research and design workshops.',
          icon: 'i-lucide-palette',
        },
        {
          date: 'Mar 29, 2025',
          title: 'Development Sprint',
          description: 'Frontend and backend development.',
          icon: 'i-lucide-code',
        },
        {
          date: 'Apr 5, 2025',
          title: 'Testing & Deployment',
          description: 'QA testing and performance optimization.',
          icon: 'i-lucide-check-circle',
        },
      ]
      return { items }
    },
    template: `
      <UTimeline orientation="horizontal" :items="items" :default-value="2" class="w-full" />
    `,
  }),
}

/**
 * Reverse timeline direction
 */
export const Reverse: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      return { items: projectItems }
    },
    template: `
      <UTimeline reverse :items="items" :default-value="2" class="w-96" />
    `,
  }),
}

/**
 * Extra small size
 */
export const SizeXS: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      return { items: projectItems }
    },
    template: `
      <UTimeline size="xs" :items="items" :default-value="2" class="w-96" />
    `,
  }),
}

/**
 * Large size
 */
export const SizeLarge: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      return { items: projectItems }
    },
    template: `
      <UTimeline size="lg" :items="items" :default-value="2" class="w-96" />
    `,
  }),
}

/**
 * Neutral color
 */
export const NeutralColor: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      return { items: projectItems }
    },
    template: `
      <UTimeline color="neutral" :items="items" :default-value="2" class="w-96" />
    `,
  }),
}

/**
 * Success color
 */
export const SuccessColor: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      return { items: projectItems }
    },
    template: `
      <UTimeline color="success" :items="items" :default-value="2" class="w-96" />
    `,
  }),
}

/**
 * Order fulfillment timeline
 */
export const OrderFulfillment: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      const items = [
        {
          date: 'Jan 10, 2025',
          title: 'Order Placed',
          description: 'Order #12345 has been successfully placed.',
          icon: 'i-lucide-shopping-cart',
        },
        {
          date: 'Jan 11, 2025',
          title: 'Payment Confirmed',
          description: 'Payment of $199.99 received and confirmed.',
          icon: 'i-lucide-credit-card',
        },
        {
          date: 'Jan 12, 2025',
          title: 'Processing',
          description: 'Your order is being prepared for shipment.',
          icon: 'i-lucide-package',
        },
        {
          date: 'Jan 13, 2025',
          title: 'Shipped',
          description: 'Order shipped via FedEx. Tracking: FDX123456789',
          icon: 'i-lucide-truck',
        },
        {
          date: 'Jan 15, 2025',
          title: 'Delivered',
          description: 'Package delivered successfully.',
          icon: 'i-lucide-check-circle',
        },
      ]
      return { items }
    },
    template: `
      <UTimeline :items="items" :default-value="3" color="success" class="w-96" />
    `,
  }),
}

/**
 * Development workflow timeline
 */
export const DevWorkflow: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      const items = [
        {
          date: '09:00 AM',
          title: 'Feature Branch Created',
          description: 'Created feature/user-authentication branch',
          icon: 'i-lucide-git-branch',
        },
        {
          date: '10:30 AM',
          title: 'Code Review Requested',
          description: 'Pull request #234 opened for review',
          icon: 'i-lucide-git-pull-request',
        },
        {
          date: '02:15 PM',
          title: 'Approved',
          description: 'Reviewed and approved by 2 team members',
          icon: 'i-lucide-check',
        },
        {
          date: '02:45 PM',
          title: 'Merged to Main',
          description: 'Successfully merged and deployed to staging',
          icon: 'i-lucide-git-merge',
        },
      ]
      return { items }
    },
    template: `
      <UTimeline :items="items" :default-value="2" color="info" class="w-96" />
    `,
  }),
}

/**
 * Support ticket timeline
 */
export const SupportTicket: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      const items = [
        {
          date: 'Dec 1, 2024',
          title: 'Ticket Created',
          description: 'Customer reported login issue #TICK-789',
          icon: 'i-lucide-ticket',
        },
        {
          date: 'Dec 1, 2024',
          title: 'Assigned',
          description: 'Assigned to Support Team Member',
          icon: 'i-lucide-user-check',
        },
        {
          date: 'Dec 2, 2024',
          title: 'In Progress',
          description: 'Investigating the authentication error',
          icon: 'i-lucide-loader',
        },
        {
          date: 'Dec 2, 2024',
          title: 'Resolved',
          description: 'Password reset link sent. Issue resolved.',
          icon: 'i-lucide-check-circle',
        },
      ]
      return { items }
    },
    template: `
      <UTimeline :items="items" :default-value="3" color="warning" class="w-96" />
    `,
  }),
}

/**
 * Company history timeline
 */
export const CompanyHistory: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      const items = [
        {
          date: '2020',
          title: 'Company Founded',
          description: 'Started as a small startup with 5 team members.',
          icon: 'i-lucide-building',
        },
        {
          date: '2021',
          title: 'Series A Funding',
          description: 'Raised $5M in Series A funding round.',
          icon: 'i-lucide-trending-up',
        },
        {
          date: '2022',
          title: 'Product Launch',
          description: 'Launched our flagship product to 10,000+ users.',
          icon: 'i-lucide-rocket',
        },
        {
          date: '2023',
          title: 'Global Expansion',
          description: 'Expanded operations to 15 countries worldwide.',
          icon: 'i-lucide-globe',
        },
        {
          date: '2024',
          title: 'IPO',
          description: 'Successfully went public on NASDAQ.',
          icon: 'i-lucide-trophy',
        },
      ]
      return { items }
    },
    template: `
      <UTimeline :items="items" :default-value="4" color="primary" class="w-96" />
    `,
  }),
}

/**
 * Simple events timeline
 */
export const SimpleEvents: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      const items = [
        {
          date: 'Today',
          title: 'Meeting with Client',
          icon: 'i-lucide-users',
        },
        {
          date: 'Tomorrow',
          title: 'Code Review Session',
          icon: 'i-lucide-code',
        },
        {
          date: 'Friday',
          title: 'Sprint Planning',
          icon: 'i-lucide-calendar',
        },
      ]
      return { items }
    },
    template: `
      <UTimeline :items="items" size="sm" class="w-80" />
    `,
  }),
}

/**
 * Controlled timeline with reactivity
 */
export const Controlled: Story = {
  render: () => ({
    components: { UTimeline },
    setup() {
      const active = ref(1)
      const items = [
        { value: 0, date: 'Step 1', title: 'Account Setup', icon: 'i-lucide-user' },
        { value: 1, date: 'Step 2', title: 'Profile Information', icon: 'i-lucide-file-text' },
        { value: 2, date: 'Step 3', title: 'Preferences', icon: 'i-lucide-settings' },
        { value: 3, date: 'Step 4', title: 'Complete', icon: 'i-lucide-check' },
      ]
      return { items, active }
    },
    template: `
      <div>
        <UTimeline :items="items" v-model="active" class="w-96 mb-4" />
        <div class="flex gap-2">
          <button
            @click="active = Math.max(0, active - 1)"
            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            @click="active = Math.min(3, active + 1)"
            class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    `,
  }),
}
