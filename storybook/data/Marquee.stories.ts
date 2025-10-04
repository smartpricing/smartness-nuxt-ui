import type { Meta, StoryObj } from '@storybook/vue3'
import UMarquee from '@nuxt/ui/components/Marquee.vue'
import type { MarqueeProps } from '@nuxt/ui'
import UIcon from '@nuxt/ui/components/Icon.vue'

const meta = {
  title: 'Data/Marquee',
  component: UMarquee,
  tags: ['autodocs'],
  argTypes: {
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause the marquee on hover',
      table: {
        type: { summary: 'boolean' },
      },
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the direction of the marquee',
      table: {
        type: { summary: 'boolean' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the marquee',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    repeat: {
      control: 'number',
      description: 'The number of times the marquee should repeat',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    overlay: {
      control: 'boolean',
      description: 'Display an overlay gradient on the marquee',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    as: {
      control: 'text',
      description: 'The element or component this component should render as',
      table: {
        type: { summary: 'any' },
      },
    },
  },
} satisfies Meta<typeof UMarquee>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default horizontal marquee with social icons
 */
export const Default: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee>
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Pause animation on hover
 */
export const PauseOnHover: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee pause-on-hover>
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Reverse direction (right to left)
 */
export const Reverse: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee reverse>
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Vertical scrolling marquee
 */
export const Vertical: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee orientation="vertical" :ui="{ root: 'h-64' }">
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Without gradient overlay
 */
export const NoOverlay: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee :overlay="false">
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Custom repeat count
 */
export const CustomRepeat: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee :repeat="6">
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Logo showcase example
 */
export const LogoShowcase: Story = {
  render: () => ({
    components: { UMarquee },
    template: `
      <UMarquee pause-on-hover>
        <div class="flex items-center justify-center w-32 h-16 bg-white rounded-lg border border-gray-200">
          <span class="font-bold text-gray-800">Logo 1</span>
        </div>
        <div class="flex items-center justify-center w-32 h-16 bg-white rounded-lg border border-gray-200">
          <span class="font-bold text-gray-800">Logo 2</span>
        </div>
        <div class="flex items-center justify-center w-32 h-16 bg-white rounded-lg border border-gray-200">
          <span class="font-bold text-gray-800">Logo 3</span>
        </div>
        <div class="flex items-center justify-center w-32 h-16 bg-white rounded-lg border border-gray-200">
          <span class="font-bold text-gray-800">Logo 4</span>
        </div>
        <div class="flex items-center justify-center w-32 h-16 bg-white rounded-lg border border-gray-200">
          <span class="font-bold text-gray-800">Logo 5</span>
        </div>
      </UMarquee>
    `,
  }),
}

/**
 * Text marquee example
 */
export const TextMarquee: Story = {
  render: () => ({
    components: { UMarquee },
    template: `
      <UMarquee>
        <span class="text-2xl font-bold mx-8">Breaking News</span>
        <span class="text-2xl font-bold mx-8">Latest Updates</span>
        <span class="text-2xl font-bold mx-8">Important Announcements</span>
        <span class="text-2xl font-bold mx-8">Live Coverage</span>
      </UMarquee>
    `,
  }),
}

/**
 * Technology stack showcase
 */
export const TechStack: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <div class="space-y-4">
        <UMarquee pause-on-hover>
          <UIcon name="i-simple-icons-vue" class="size-12 shrink-0 text-green-500" />
          <UIcon name="i-simple-icons-nuxt" class="size-12 shrink-0 text-green-500" />
          <UIcon name="i-simple-icons-typescript" class="size-12 shrink-0 text-blue-500" />
          <UIcon name="i-simple-icons-tailwindcss" class="size-12 shrink-0 text-cyan-500" />
          <UIcon name="i-simple-icons-vite" class="size-12 shrink-0 text-purple-500" />
        </UMarquee>
        <UMarquee pause-on-hover reverse>
          <UIcon name="i-simple-icons-node" class="size-12 shrink-0 text-green-600" />
          <UIcon name="i-simple-icons-postgresql" class="size-12 shrink-0 text-blue-600" />
          <UIcon name="i-simple-icons-docker" class="size-12 shrink-0 text-blue-500" />
          <UIcon name="i-simple-icons-github" class="size-12 shrink-0 text-gray-800" />
          <UIcon name="i-simple-icons-vercel" class="size-12 shrink-0 text-black" />
        </UMarquee>
      </div>
    `,
  }),
}

/**
 * Card-based marquee
 */
export const CardMarquee: Story = {
  render: () => ({
    components: { UMarquee },
    template: `
      <UMarquee pause-on-hover :overlay="false" :ui="{ root: '[--gap:--spacing(4)]' }">
        <div class="w-64 p-4 bg-white rounded-lg shadow-sm border border-gray-200 shrink-0">
          <h3 class="font-semibold mb-2">Feature 1</h3>
          <p class="text-sm text-gray-600">Amazing feature description</p>
        </div>
        <div class="w-64 p-4 bg-white rounded-lg shadow-sm border border-gray-200 shrink-0">
          <h3 class="font-semibold mb-2">Feature 2</h3>
          <p class="text-sm text-gray-600">Another great feature</p>
        </div>
        <div class="w-64 p-4 bg-white rounded-lg shadow-sm border border-gray-200 shrink-0">
          <h3 class="font-semibold mb-2">Feature 3</h3>
          <p class="text-sm text-gray-600">One more awesome feature</p>
        </div>
        <div class="w-64 p-4 bg-white rounded-lg shadow-sm border border-gray-200 shrink-0">
          <h3 class="font-semibold mb-2">Feature 4</h3>
          <p class="text-sm text-gray-600">The best feature yet</p>
        </div>
      </UMarquee>
    `,
  }),
}

/**
 * Image gallery marquee
 */
export const ImageGallery: Story = {
  render: () => ({
    components: { UMarquee },
    template: `
      <UMarquee pause-on-hover>
        <img src="https://picsum.photos/200/150?random=1" class="rounded-lg shrink-0" alt="Image 1" />
        <img src="https://picsum.photos/200/150?random=2" class="rounded-lg shrink-0" alt="Image 2" />
        <img src="https://picsum.photos/200/150?random=3" class="rounded-lg shrink-0" alt="Image 3" />
        <img src="https://picsum.photos/200/150?random=4" class="rounded-lg shrink-0" alt="Image 4" />
        <img src="https://picsum.photos/200/150?random=5" class="rounded-lg shrink-0" alt="Image 5" />
      </UMarquee>
    `,
  }),
}

/**
 * Badge/Tag showcase
 */
export const BadgeShowcase: Story = {
  render: () => ({
    components: { UMarquee },
    template: `
      <UMarquee pause-on-hover :overlay="false">
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">JavaScript</span>
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Vue.js</span>
        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Nuxt</span>
        <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">TypeScript</span>
        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Tailwind</span>
        <span class="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">CSS</span>
      </UMarquee>
    `,
  }),
}

/**
 * Vertical reverse marquee
 */
export const VerticalReverse: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee orientation="vertical" reverse :ui="{ root: 'h-64' }">
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Fast speed marquee
 */
export const FastSpeed: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee :ui="{ root: '[--duration:10s]' }">
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}

/**
 * Slow speed marquee
 */
export const SlowSpeed: Story = {
  render: () => ({
    components: { UMarquee, UIcon },
    template: `
      <UMarquee :ui="{ root: '[--duration:40s]' }">
        <UIcon name="i-simple-icons-github" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-discord" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-x" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-instagram" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-linkedin" class="size-10 shrink-0" />
        <UIcon name="i-simple-icons-facebook" class="size-10 shrink-0" />
      </UMarquee>
    `,
  }),
}
