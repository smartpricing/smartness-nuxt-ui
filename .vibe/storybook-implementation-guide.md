# @nuxt/ui Storybook Implementation Guide

This comprehensive guide provides step-by-step instructions for implementing Storybook stories for all @nuxt/ui v4.0.0 components.

## Table of Contents

1. [Overview](#overview)
2. [Setup & Configuration](#setup--configuration)
3. [Component Categories](#component-categories)
4. [Implementation Steps](#implementation-steps)
5. [Component List](#component-list)
6. [Best Practices](#best-practices)
7. [Testing & Quality Assurance](#testing--quality-assurance)

## Overview

@nuxt/ui v4.0.0 contains **100+ components** that need Storybook stories. This guide organizes them following the official Nuxt UI documentation structure.

### Components Count by Category

- **Layout**: 6 components
- **Element**: 16 components
- **Form**: 17 components
- **Data**: 7 components
- **Navigation**: 8 components
- **Overlay**: 8 components
- **Page**: 22 components
- **Dashboard**: 9 components
- **Chat**: 4 components

## Setup & Configuration

### Prerequisites

```bash
# Already installed dependencies
pnpm install
```

### MCP Integration

This project is configured with Model Context Protocol (MCP) integration for Nuxt UI documentation, providing:

- **Direct access** to Nuxt UI component metadata and documentation
- **Real-time component information** including props, slots, events, and types
- **Automated story generation** with accurate types derived from official documentation
- **Quick reference** to component examples and best practices

#### Available MCP Tools

- `mcp__nuxt-ui-remote__list_components` - List all available components
- `mcp__nuxt-ui-remote__get_component` - Get component documentation
- `mcp__nuxt-ui-remote__get_component_metadata` - Get detailed prop/slot/event metadata
- `mcp__nuxt-ui-remote__search_components_by_category` - Search components by category
- `mcp__nuxt-ui-remote__list_examples` - Browse UI examples
- `mcp__nuxt-ui-remote__get_example` - Get specific example implementation

Use these tools during story creation to ensure accuracy and completeness.

### Storybook Configuration

File: `.storybook/main.ts`

```typescript
import type { StorybookConfig } from "@storybook-vue/nuxt";

const config: StorybookConfig = {
	stories: [
		"../storybook/**/*.mdx",
		"../storybook/**/*.stories.@(js|jsx|ts|tsx|mdx)"
	],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest"
	],
	framework: {
		name: "@storybook-vue/nuxt",
		options: {}
	}
};
export default config;
```

### Directory Structure

```
storybook/
├── layout/
│   ├── App.stories.ts
│   ├── Container.stories.ts
│   ├── Error.stories.ts
│   ├── Footer.stories.ts
│   ├── Header.stories.ts
│   └── Main.stories.ts
├── element/
│   ├── Alert.stories.ts
│   ├── Avatar.stories.ts
│   ├── Badge.stories.ts
│   ├── Button.stories.ts
│   ├── Card.stories.ts
│   └── ...
├── form/
│   ├── Checkbox.stories.ts
│   ├── Input.stories.ts
│   ├── Select.stories.ts
│   └── ...
├── data/
│   ├── Accordion.stories.ts
│   ├── Table.stories.ts
│   ├── Timeline.stories.ts
│   └── ...
├── navigation/
│   ├── Breadcrumb.stories.ts
│   ├── Tabs.stories.ts
│   └── ...
├── overlay/
│   ├── Modal.stories.ts
│   ├── Drawer.stories.ts
│   └── ...
├── page/
│   ├── PageHeader.stories.ts
│   ├── BlogPost.stories.ts
│   └── ...
├── dashboard/
│   ├── DashboardNavbar.stories.ts
│   └── ...
└── chat/
    ├── ChatMessage.stories.ts
    └── ...
```

## Component Categories

### 1. Layout (6 components)

Page structure and layout containers:

- App
- Container
- Error
- Footer
- Header
- Main

### 2. Element (16 components)

UI building blocks and visual elements:

- Alert
- Avatar
- AvatarGroup
- Badge
- Banner
- Button
- Calendar
- Card
- Chip
- Collapsible
- FieldGroup
- Icon
- Kbd
- Progress
- Separator
- Skeleton

### 3. Form (17 components)

Form controls and input elements:

- Checkbox
- CheckboxGroup
- ColorPicker
- FileUpload
- Form
- FormField
- Input
- InputMenu
- InputNumber
- InputTags
- PinInput
- RadioGroup
- Select
- SelectMenu
- Slider
- Switch
- Textarea

### 4. Data (7 components)

Data visualization and structured content:

- Accordion
- Carousel
- Marquee
- Table
- Timeline
- Tree
- User

### 5. Navigation (8 components)

Navigation and routing components:

- Breadcrumb
- CommandPalette
- FooterColumns
- Link
- NavigationMenu
- Pagination
- Stepper
- Tabs

### 6. Overlay (8 components)

Modal dialogs and overlay UI:

- ContextMenu
- Drawer
- DropdownMenu
- Modal
- Popover
- Slideover
- Toast
- Tooltip

### 7. Page (22 components)

Pre-built page sections and templates:

- AuthForm
- BlogPost
- BlogPosts
- ChangelogVersion
- ChangelogVersions
- Page
- PageAnchors
- PageAside
- PageBody
- PageCard
- PageColumns
- PageCTA
- PageFeature
- PageGrid
- PageHeader
- PageHero
- PageLinks
- PageList
- PageLogos
- PageSection
- PricingPlan
- PricingPlans
- PricingTable

### 8. Dashboard (9 components)

Dashboard-specific layouts and components:

- DashboardGroup
- DashboardNavbar
- DashboardPanel
- DashboardResizeHandle
- DashboardSearch
- DashboardSearchButton
- DashboardSidebar
- DashboardSidebarCollapse
- DashboardSidebarToggle
- DashboardToolbar

### 9. Chat (4 components)

Chat and messaging interfaces:

- ChatMessage
- ChatMessages
- ChatPalette
- ChatPrompt
- ChatPromptSubmit

## Implementation Steps

### Step 1: Create Story File Template

Each component story should follow this template:

```typescript
import type { ComponentNameProps } from "@nuxt/ui";
import type { Meta, StoryObj } from "@storybook/vue3";
import UComponentName from "@nuxt/ui/components/ComponentName.vue";

const meta = {
	title: "Category/ComponentName",
	component: UComponentName,
	tags: ["autodocs"],
	argTypes: {
		// Add component-specific controls with detailed metadata
		propName: {
			control: "select",
			options: ["option1", "option2"],
			description: "Description from MCP metadata",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "default" }
			}
		}
	}
} satisfies Meta<ComponentNameProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// Default props based on component documentation
	}
};

// Add more variants based on official examples
```

**Note:** Use MCP tools (`mcp__nuxt-ui-remote__get_component` and `mcp__nuxt-ui-remote__get_component_metadata`) to retrieve accurate prop types, descriptions, and default values before creating stories.

### Step 2: Implement Element Components

**Priority: HIGH** - Start here as these are the most commonly used visual elements.

#### Example: Button.stories.ts

```typescript
import type { Meta, StoryObj } from "@storybook/vue3";
import { ButtonProps } from "@nuxt/ui";
import UButton from "@nuxt/ui/components/Button.vue";

const meta = {
	title: "Element/Button",
	component: UButton,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "outline", "soft", "subtle", "ghost", "link"]
		},
		color: {
			control: "select",
			options: ["primary", "secondary", "success", "warning", "error", "neutral", "info"]
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"]
		},
		disabled: {
			control: "boolean"
		},
		loading: {
			control: "boolean"
		}
	}
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Button"
	}
};
```

### Step 3: Implement Form Components

**Priority: HIGH** - Essential form controls.

### Step 4: Implement Overlay Components

**Priority: HIGH** - Common UI patterns.

#### Example: Modal.stories.ts

```typescript
import type { Meta, StoryObj } from "@storybook/vue3";
import { UButton, UModal } from "#components";
import { ref } from "vue";

const meta = {
	title: "Overlay/Modal",
	component: UModal,
	tags: ["autodocs"]
} satisfies Meta<typeof UModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		components: { UModal, UButton },
		setup() {
			const isOpen = ref(false);
			return { isOpen };
		},
		template: `
      <div>
        <UButton @click="isOpen = true" label="Open Modal" />
        <UModal v-model="isOpen">
          <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Modal Title</h2>
            <p>Modal content goes here.</p>
          </div>
        </UModal>
      </div>
    `
	})
};
```

### Step 5: Implement Navigation Components

**Priority: MEDIUM**

### Step 6: Implement Data Components

**Priority: MEDIUM**

### Step 7: Implement Layout Components

**Priority: MEDIUM**

### Step 8: Implement Page Components

**Priority: LOW** - Pre-built sections

### Step 9: Implement Dashboard Components

**Priority: LOW** - Specialized use case

### Step 10: Implement Chat Components

**Priority: LOW** - Specialized feature

## Component List

Complete list of all @nuxt/ui components to implement:

### Layout (6 components)
- [ ] App
- [ ] Container
- [ ] Error
- [ ] Footer
- [ ] Header
- [ ] Main

### Element (16 components)
- [x] Button (✅ Completed with MCP metadata)
- [x] Alert (✅ Completed with MCP metadata)
- [x] Avatar (✅ In progress)
- [x] AvatarGroup (✅ In progress)
- [x] Badge (✅ In progress)
- [x] Banner (✅ In progress)
- [x] Calendar (✅ In progress)
- [x] Card (✅ In progress)
- [x] Chip (✅ In progress)
- [x] Collapsible (✅ In progress)
- [x] FieldGroup (✅ In progress)
- [x] Icon (✅ In progress)
- [x] Kbd (✅ In progress)
- [x] Progress (✅ In progress)
- [x] Separator (✅ In progress)
- [x] Skeleton (✅ In progress)

### Form (17 components)
- [ ] Checkbox
- [ ] CheckboxGroup
- [ ] ColorPicker
- [ ] FileUpload
- [ ] Form
- [ ] FormField
- [ ] Input
- [ ] InputMenu
- [ ] InputNumber
- [ ] InputTags
- [ ] PinInput
- [ ] RadioGroup
- [ ] Select
- [ ] SelectMenu
- [ ] Slider
- [ ] Switch
- [ ] Textarea

### Data (7 components)
- [ ] Accordion
- [ ] Carousel
- [ ] Marquee
- [ ] Table
- [ ] Timeline
- [ ] Tree
- [ ] User

### Navigation (8 components)
- [ ] Breadcrumb
- [ ] CommandPalette
- [ ] FooterColumns
- [ ] Link
- [ ] NavigationMenu
- [ ] Pagination
- [ ] Stepper
- [ ] Tabs

### Overlay (8 components)
- [ ] ContextMenu
- [ ] Drawer
- [ ] DropdownMenu
- [ ] Modal
- [ ] Popover
- [ ] Slideover
- [ ] Toast
- [ ] Tooltip

### Page (22 components)
- [ ] AuthForm
- [ ] BlogPost
- [ ] BlogPosts
- [ ] ChangelogVersion
- [ ] ChangelogVersions
- [ ] Page
- [ ] PageAnchors
- [ ] PageAside
- [ ] PageBody
- [ ] PageCard
- [ ] PageColumns
- [ ] PageCTA
- [ ] PageFeature
- [ ] PageGrid
- [ ] PageHeader
- [ ] PageHero
- [ ] PageLinks
- [ ] PageList
- [ ] PageLogos
- [ ] PageSection
- [ ] PricingPlan
- [ ] PricingPlans
- [ ] PricingTable

### Dashboard (10 components)
- [ ] DashboardGroup
- [ ] DashboardNavbar
- [ ] DashboardPanel
- [ ] DashboardResizeHandle
- [ ] DashboardSearch
- [ ] DashboardSearchButton
- [ ] DashboardSidebar
- [ ] DashboardSidebarCollapse
- [ ] DashboardSidebarToggle
- [ ] DashboardToolbar

### Chat (5 components)
- [ ] ChatMessage
- [ ] ChatMessages
- [ ] ChatPalette
- [ ] ChatPrompt
- [ ] ChatPromptSubmit

## Best Practices

### 1. Story Naming Conventions

- **Default**: Basic component with minimal props
- **Variants**: Show all available variants
- **Sizes**: Show all size options
- **States**: Show different states (disabled, loading, error)
- **Interactive**: Demonstrate user interactions
- **Complex**: Advanced use cases

### 2. ArgTypes Configuration

Always include controls for:
- Size options
- Variant options
- Color options
- Boolean states (disabled, loading, required)
- Icon selections

**Important:** Use MCP tools to retrieve accurate prop metadata:

```typescript
// Before writing argTypes, fetch component metadata
// mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })

// Use the metadata to populate:
// - Correct enum values for options
// - Accurate type summaries
// - Default values from documentation
// - Prop descriptions
```

### 3. Accessibility Testing

Use `@storybook/addon-a11y` to ensure:
- Proper ARIA labels
- Keyboard navigation
- Color contrast
- Screen reader compatibility

### 4. Documentation

Each story should include:
```typescript
/**
 * ComponentName provides [functionality description]
 *
 * ## Usage
 * ```vue
 * <UComponentName prop="value" />
 * ```
 */
```

### 5. Interactive Examples

For complex components, create interactive stories:

```typescript
export const Interactive: Story = {
	render: () => ({
		components: { UComponent },
		setup() {
			const state = ref(initialValue);
			const handleChange = (value) => {
				state.value = value;
			};
			return { state, handleChange };
		},
		template: `
      <UComponent
        v-model="state"
        @change="handleChange"
      />
    `
	})
};
```

### 6. Composition Examples

Show how components work together:

```typescript
export const FormExample: Story = {
	render: () => ({
		components: { UForm, UFormField, UInput, UButton },
		template: `
      <UForm>
        <UFormField label="Email" name="email">
          <UInput type="email" />
        </UFormField>
        <UButton type="submit" label="Submit" />
      </UForm>
    `
	})
};
```
