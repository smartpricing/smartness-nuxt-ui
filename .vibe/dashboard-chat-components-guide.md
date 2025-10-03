# Dashboard & Chat Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for Dashboard and Chat components in @nuxt/ui v4.

## Overview

Dashboard and Chat components are specialized components for specific application types.

**Priority: LOW**

## Dashboard Components (10 total)

1. DashboardGroup
2. DashboardNavbar
3. DashboardPanel
4. DashboardResizeHandle
5. DashboardSearch
6. DashboardSearchButton
7. DashboardSidebar
8. DashboardSidebarCollapse
9. DashboardSidebarToggle
10. DashboardToolbar

## Chat Components (5 total)

1. ChatMessage
2. ChatMessages
3. ChatPalette
4. ChatPrompt
5. ChatPromptSubmit

## Dashboard Components Implementation

### Implementation Workflow

```typescript
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

Location: `storybook/dashboard/ComponentName.stories.ts`

### DashboardGroup

**File:** `storybook/dashboard/DashboardGroup.stories.ts`

**Required Stories:**
- Default
- WithTitle
- Collapsible
- Nested

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UDashboardGroup },
    template: `
      <UDashboardGroup title="Analytics">
        <div class="p-4">
          <p>Group content goes here</p>
        </div>
      </UDashboardGroup>
    `,
  }),
}
```

### DashboardNavbar

**File:** `storybook/dashboard/DashboardNavbar.stories.ts`

**Required Stories:**
- Default
- WithSearch
- WithActions
- WithUserMenu

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: {
      UDashboardNavbar,
      UDashboardSearch,
      UButton,
      UAvatar,
    },
    template: `
      <UDashboardNavbar>
        <template #left>
          <span class="font-bold">Dashboard</span>
        </template>
        <template #center>
          <UDashboardSearch placeholder="Search..." />
        </template>
        <template #right>
          <UButton icon="i-lucide-bell" variant="ghost" />
          <UAvatar src="/avatar.jpg" />
        </template>
      </UDashboardNavbar>
    `,
  }),
}
```

### DashboardPanel

**File:** `storybook/dashboard/DashboardPanel.stories.ts`

**Required Stories:**
- Default
- WithHeader
- Resizable
- Collapsible

### DashboardResizeHandle

**File:** `storybook/dashboard/DashboardResizeHandle.stories.ts`

**Required Stories:**
- Default
- Horizontal
- Vertical
- WithPanels

### DashboardSearch

**File:** `storybook/dashboard/DashboardSearch.stories.ts`

**Required Stories:**
- Default
- WithResults
- WithGroups
- WithShortcut

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UDashboardSearch },
    setup() {
      const query = ref('')
      return { query }
    },
    template: `
      <UDashboardSearch
        v-model="query"
        placeholder="Search..."
      />
    `,
  }),
}
```

### DashboardSearchButton

**File:** `storybook/dashboard/DashboardSearchButton.stories.ts`

**Required Stories:**
- Default
- WithShortcut
- CustomLabel

### DashboardSidebar

**File:** `storybook/dashboard/DashboardSidebar.stories.ts`

**Required Stories:**
- Default
- WithNavigation
- Collapsible
- WithGroups

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UDashboardSidebar, ULink },
    setup() {
      const navigation = [
        { label: 'Dashboard', icon: 'i-lucide-home', to: '/' },
        { label: 'Analytics', icon: 'i-lucide-bar-chart', to: '/analytics' },
        { label: 'Settings', icon: 'i-lucide-settings', to: '/settings' },
      ]
      return { navigation }
    },
    template: `
      <UDashboardSidebar>
        <nav class="space-y-1 p-2">
          <ULink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <UIcon :name="item.icon" />
            <span>{{ item.label }}</span>
          </ULink>
        </nav>
      </UDashboardSidebar>
    `,
  }),
}
```

### DashboardSidebarCollapse

**File:** `storybook/dashboard/DashboardSidebarCollapse.stories.ts`

**Required Stories:**
- Default
- WithIcon
- Animated

### DashboardSidebarToggle

**File:** `storybook/dashboard/DashboardSidebarToggle.stories.ts`

**Required Stories:**
- Default
- CustomIcon

### DashboardToolbar

**File:** `storybook/dashboard/DashboardToolbar.stories.ts`

**Required Stories:**
- Default
- WithActions
- WithFilters
- WithSearch

## Complete Dashboard Layout

**File:** `storybook/dashboard/DashboardLayout.stories.ts`

**Example:**
```typescript
export const CompleteDashboard: Story = {
  render: () => ({
    components: {
      UApp,
      UDashboardNavbar,
      UDashboardSidebar,
      UDashboardPanel,
      UMain,
    },
    setup() {
      const sidebarOpen = ref(true)
      return { sidebarOpen }
    },
    template: `
      <UApp>
        <UDashboardNavbar>
          <template #left>
            <UDashboardSidebarToggle v-model="sidebarOpen" />
            <span class="font-bold">Dashboard</span>
          </template>
        </UDashboardNavbar>

        <div class="flex">
          <UDashboardSidebar v-if="sidebarOpen">
            <!-- Sidebar navigation -->
          </UDashboardSidebar>

          <UMain class="flex-1">
            <div class="p-8">
              <h1 class="text-2xl font-bold mb-4">Dashboard Content</h1>
              <div class="grid grid-cols-3 gap-4">
                <UDashboardPanel title="Panel 1">
                  <p>Content</p>
                </UDashboardPanel>
                <UDashboardPanel title="Panel 2">
                  <p>Content</p>
                </UDashboardPanel>
                <UDashboardPanel title="Panel 3">
                  <p>Content</p>
                </UDashboardPanel>
              </div>
            </div>
          </UMain>
        </div>
      </UApp>
    `,
  }),
}
```

## Chat Components Implementation

Location: `storybook/chat/ComponentName.stories.ts`

### ChatMessage

**File:** `storybook/chat/ChatMessage.stories.ts`

**Required Stories:**
- Default (user message)
- SystemMessage
- WithAvatar
- WithTimestamp
- WithAttachment

**Example:**
```typescript
export const Default: Story = {
  args: {
    content: 'Hello! How can I help you today?',
    author: {
      name: 'Assistant',
      avatar: '/bot-avatar.svg',
    },
    timestamp: new Date(),
  },
}

export const UserMessage: Story = {
  args: {
    content: 'I need help with my account.',
    author: {
      name: 'John Doe',
      avatar: '/user-avatar.jpg',
    },
    timestamp: new Date(),
    alignment: 'right',
  },
}
```

### ChatMessages

**File:** `storybook/chat/ChatMessages.stories.ts`

**Required Stories:**
- Default
- WithMultipleMessages
- WithLoading
- WithTypingIndicator

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UChatMessages, UChatMessage },
    setup() {
      const messages = ref([
        {
          id: 1,
          content: 'Hello!',
          author: { name: 'User', avatar: '/user.jpg' },
          timestamp: new Date('2024-01-01T10:00:00'),
        },
        {
          id: 2,
          content: 'Hi! How can I help?',
          author: { name: 'Bot', avatar: '/bot.svg' },
          timestamp: new Date('2024-01-01T10:00:05'),
        },
      ])
      return { messages }
    },
    template: `
      <UChatMessages :messages="messages" />
    `,
  }),
}
```

### ChatPalette

**File:** `storybook/chat/ChatPalette.stories.ts`

**Required Stories:**
- Default
- WithSuggestions
- WithCommands

### ChatPrompt

**File:** `storybook/chat/ChatPrompt.stories.ts`

**Required Stories:**
- Default
- WithAttachment
- WithEmoji
- Multiline

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UChatPrompt, UChatPromptSubmit },
    setup() {
      const message = ref('')
      const handleSubmit = () => {
        console.log('Sending:', message.value)
        message.value = ''
      }
      return { message, handleSubmit }
    },
    template: `
      <UChatPrompt
        v-model="message"
        @submit="handleSubmit"
        placeholder="Type a message..."
      >
        <template #append>
          <UChatPromptSubmit />
        </template>
      </UChatPrompt>
    `,
  }),
}
```

### ChatPromptSubmit

**File:** `storybook/chat/ChatPromptSubmit.stories.ts`

**Required Stories:**
- Default
- CustomIcon
- Disabled

## Complete Chat Interface

**File:** `storybook/chat/ChatInterface.stories.ts`

**Example:**
```typescript
export const CompleteChatInterface: Story = {
  render: () => ({
    components: {
      UChatMessages,
      UChatMessage,
      UChatPrompt,
      UChatPromptSubmit,
    },
    setup() {
      const messages = ref([
        {
          id: 1,
          content: 'Hello! How can I help you?',
          author: { name: 'Assistant', avatar: '/bot.svg' },
          timestamp: new Date(),
        },
      ])

      const newMessage = ref('')

      const sendMessage = () => {
        if (!newMessage.value.trim()) return

        messages.value.push({
          id: messages.value.length + 1,
          content: newMessage.value,
          author: { name: 'You', avatar: '/user.jpg' },
          timestamp: new Date(),
        })

        newMessage.value = ''

        // Simulate bot response
        setTimeout(() => {
          messages.value.push({
            id: messages.value.length + 1,
            content: 'Thanks for your message!',
            author: { name: 'Assistant', avatar: '/bot.svg' },
            timestamp: new Date(),
          })
        }, 1000)
      }

      return { messages, newMessage, sendMessage }
    },
    template: `
      <div class="flex flex-col h-[600px] border rounded">
        <div class="flex-1 overflow-y-auto p-4">
          <UChatMessages :messages="messages" />
        </div>
        <div class="border-t p-4">
          <UChatPrompt
            v-model="newMessage"
            @submit="sendMessage"
            placeholder="Type a message..."
          >
            <template #append>
              <UChatPromptSubmit @click="sendMessage" />
            </template>
          </UChatPrompt>
        </div>
      </div>
    `,
  }),
}
```

## Testing Checklist

### Dashboard Components
- [ ] Layout composition works
- [ ] Sidebar toggle functions
- [ ] Resizable panels work
- [ ] Search functionality
- [ ] Navigation active states
- [ ] Responsive behavior
- [ ] Collapse/expand animations

### Chat Components
- [ ] Messages display correctly
- [ ] Scrolling behavior
- [ ] Message alignment (user/bot)
- [ ] Timestamp formatting
- [ ] Typing indicator
- [ ] Message submission
- [ ] Attachment handling
- [ ] Real-time updates

## Common Patterns

### Dashboard Navigation
```typescript
const navigation = [
  {
    label: 'Section',
    items: [
      { label: 'Item', icon: 'i-lucide-icon', to: '/path' },
    ],
  },
]
```

### Chat Message Structure
```typescript
{
  id: string | number
  content: string
  author: {
    name: string
    avatar: string
  }
  timestamp: Date
  alignment?: 'left' | 'right'
}
```

## Tips

1. **Complete Layouts**: Show full dashboard/chat interfaces
2. **Real Data**: Use realistic sample data
3. **Interactive**: Make stories interactive
4. **Responsive**: Test on multiple screen sizes
5. **State Management**: Demonstrate state changes
6. **Performance**: Test with many messages/panels
7. **Accessibility**: Ensure keyboard navigation
8. **Real-time**: Simulate live updates
