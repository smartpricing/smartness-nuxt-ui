# Layout Components Implementation Guide

This guide provides step-by-step instructions for implementing Storybook stories for all Layout components in @nuxt/ui v4.

## Overview

Layout components provide page structure and content organization containers.

**Priority: MEDIUM**
**Status: ✅ COMPLETED**

## Components (6 total)

1. ✅ App - `storybook/layout/App.stories.ts`
2. ✅ Container - `storybook/layout/Container.stories.ts`
3. ✅ Error - `storybook/layout/Error.stories.ts`
4. ✅ Footer - `storybook/layout/Footer.stories.ts`
5. ✅ Header - `storybook/layout/Header.stories.ts`
6. ✅ Main - `storybook/layout/Main.stories.ts`

## Implementation Summary

All 6 layout component stories have been implemented with comprehensive examples:

### App (4 stories)
- Default - Basic app wrapper with header, main, and footer
- WithHeader - App with header and navigation
- WithSidebar - Complete layout with sidebar navigation
- FullLayout - Full-featured layout with all sections

### Container (6 stories)
- Default - Basic container with constrained width
- MultipleContainers - Multiple containers on same page
- Nested - Nested content within containers
- WithSections - Full-page sections with containers
- Responsive - Grid layouts adapting to screen sizes
- AsSection - Container rendered as semantic section element

### Error (11 stories)
- Error404 - Page not found error
- Error500 - Internal server error
- Error403 - Forbidden access error
- Error401 - Unauthorized access error
- CustomError - Service unavailable error
- WithoutClearButton - Error without dismiss button
- WithCustomSlots - Custom action buttons
- CustomStatusCode - Custom status code display
- CustomStatusMessage - Custom message display
- FullyCustomized - Fully customized error page
- MinimalError - Minimal error display

### Footer (7 stories)
- Default - Simple footer with copyright and links
- WithLinks - Footer with multiple link columns
- WithSocial - Footer with social media icons
- WithColumns - Multi-column footer layout
- Minimal - Minimalist footer
- WithTopSection - Footer with CTA section above
- WithSlots - Footer using slot-based layout

### Header (10 stories)
- Default - Basic header with logo and actions
- WithNavigation - Header with navigation menu
- WithActions - Header with action buttons
- WithSearch - Header with search input
- WithContainer - Header wrapped in container
- WithMenu - Header with mobile menu
- WithLogo - Header with styled logo
- WithBreadcrumbs - Header with breadcrumb navigation
- Transparent - Transparent header over hero
- WithDropdowns - Header with dropdown menus

### Main (8 stories)
- Default - Basic main content area
- WithContainer - Main with centered container
- WithSidebar - Main with sidebar layout
- FullHeight - Vertically centered full-height layout
- Scrollable - Scrollable content area
- WithGrid - Grid layout with sidebar
- AsArticle - Main rendered as article element
- WithTabs - Main with tabbed navigation

## Implementation Workflow

### Step 1: Fetch Component Metadata

```typescript
// Get component documentation
mcp__nuxt-ui-remote__get_component({ componentName: "ComponentName" })

// Get detailed metadata
mcp__nuxt-ui-remote__get_component_metadata({ componentName: "ComponentName" })
```

### Step 2: Create Story File

Location: `storybook/layout/ComponentName.stories.ts`

### Step 3: Layout Composition

Layout components often work together to create complete page structures. Show both individual usage and composed layouts.

## Component-Specific Implementation

### App

**File:** `storybook/layout/App.stories.ts`

**Key Props:**
- Root application wrapper
- Handles global layout structure
- May include theme provider

**Required Stories:**
- Default
- WithHeader
- WithSidebar
- FullLayout (header, sidebar, main, footer)

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UApp, UHeader, UMain, UFooter },
    template: `
      <UApp>
        <UHeader>Header Content</UHeader>
        <UMain>
          <div class="p-8">
            <h1>Main Content</h1>
            <p>Application content goes here.</p>
          </div>
        </UMain>
        <UFooter>Footer Content</UFooter>
      </UApp>
    `,
  }),
}
```

### Container

**File:** `storybook/layout/Container.stories.ts`

**Key Props:**
- `as` (string) - HTML element type
- `padded` (boolean) - Add padding
- `ui` (object) - Style customization

**Required Stories:**
- Default
- Padded
- Nested
- CustomWidth
- Responsive

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UContainer },
    template: `
      <UContainer>
        <div class="bg-gray-100 p-4 rounded">
          <h2>Container Content</h2>
          <p>This content is constrained within a container.</p>
        </div>
      </UContainer>
    `,
  }),
}

export const Padded: Story = {
  render: () => ({
    components: { UContainer },
    template: `
      <div class="bg-gray-50 min-h-screen">
        <UContainer padded>
          <div class="bg-white p-4 rounded shadow">
            <h2>Padded Container</h2>
            <p>Container with padding applied.</p>
          </div>
        </UContainer>
      </div>
    `,
  }),
}
```

### Error

**File:** `storybook/layout/Error.stories.ts`

**Key Props:**
- `error` (object) - Error details
- `title` (string) - Error title
- `description` (string) - Error description
- `statusCode` (number) - HTTP status code
- `actions` (array) - Action buttons

**Required Stories:**
- Error404
- Error500
- Error403
- CustomError
- WithActions

**Example:**
```typescript
export const Error404: Story = {
  args: {
    statusCode: 404,
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
  },
}

export const Error500: Story = {
  args: {
    statusCode: 500,
    title: 'Internal Server Error',
    description: 'Something went wrong on our end. Please try again later.',
  },
}

export const WithActions: Story = {
  render: () => ({
    components: { UError, UButton },
    template: `
      <UError
        status-code="404"
        title="Page Not Found"
        description="The page you are looking for does not exist."
      >
        <template #actions>
          <div class="flex gap-2">
            <UButton label="Go Home" to="/" />
            <UButton label="Contact Support" variant="ghost" />
          </div>
        </template>
      </UError>
    `,
  }),
}
```

### Footer

**File:** `storybook/layout/Footer.stories.ts`

**Key Props:**
- Slot-based for custom content
- May include links, copyright, social icons

**Required Stories:**
- Default
- WithLinks
- WithSocial
- WithColumns
- Minimal

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UFooter, ULink },
    template: `
      <UFooter>
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-600">
            © 2024 Company Name. All rights reserved.
          </p>
          <div class="flex gap-4">
            <ULink to="/privacy">Privacy</ULink>
            <ULink to="/terms">Terms</ULink>
            <ULink to="/contact">Contact</ULink>
          </div>
        </div>
      </UFooter>
    `,
  }),
}

export const WithColumns: Story = {
  render: () => ({
    components: { UFooter, UFooterColumns },
    setup() {
      const columns = [
        {
          label: 'Product',
          links: [
            { label: 'Features', to: '/features' },
            { label: 'Pricing', to: '/pricing' },
          ],
        },
        {
          label: 'Company',
          links: [
            { label: 'About', to: '/about' },
            { label: 'Blog', to: '/blog' },
          ],
        },
      ]
      return { columns }
    },
    template: `
      <UFooter>
        <UFooterColumns :columns="columns" />
      </UFooter>
    `,
  }),
}
```

### Header

**File:** `storybook/layout/Header.stories.ts`

**Key Props:**
- Slot-based for custom content
- May include navigation, logo, actions

**Required Stories:**
- Default
- WithNavigation
- WithActions
- WithSearch
- Sticky

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UHeader, UButton },
    template: `
      <UHeader>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" class="h-8" />
            <span class="text-xl font-bold">Company Name</span>
          </div>
          <div class="flex gap-2">
            <UButton label="Sign In" variant="ghost" />
            <UButton label="Sign Up" />
          </div>
        </div>
      </UHeader>
    `,
  }),
}

export const WithNavigation: Story = {
  render: () => ({
    components: { UHeader, ULink, UButton },
    template: `
      <UHeader>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-8">
            <span class="text-xl font-bold">Logo</span>
            <nav class="flex gap-4">
              <ULink to="/" label="Home" />
              <ULink to="/products" label="Products" />
              <ULink to="/about" label="About" />
            </nav>
          </div>
          <UButton label="Get Started" />
        </div>
      </UHeader>
    `,
  }),
}
```

### Main

**File:** `storybook/layout/Main.stories.ts`

**Key Props:**
- `as` (string) - HTML element type
- `padded` (boolean) - Add padding
- `ui` (object) - Style customization

**Required Stories:**
- Default
- Padded
- WithSidebar
- FullHeight
- Scrollable

**Example:**
```typescript
export const Default: Story = {
  render: () => ({
    components: { UMain },
    template: `
      <UMain>
        <div class="p-8">
          <h1 class="text-3xl font-bold mb-4">Page Title</h1>
          <p>Main content area for your application.</p>
        </div>
      </UMain>
    `,
  }),
}

export const WithSidebar: Story = {
  render: () => ({
    components: { UMain },
    template: `
      <div class="flex">
        <aside class="w-64 bg-gray-100 p-4">
          <h3 class="font-bold mb-2">Sidebar</h3>
          <ul class="space-y-2">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </aside>
        <UMain class="flex-1">
          <div class="p-8">
            <h1 class="text-3xl font-bold mb-4">Main Content</h1>
            <p>Content with sidebar navigation.</p>
          </div>
        </UMain>
      </div>
    `,
  }),
}
```

## Composed Layout Examples

### Complete Page Layout

```typescript
export const CompletePage: Story = {
  render: () => ({
    components: {
      UApp,
      UHeader,
      UMain,
      UFooter,
      UContainer,
      UButton,
      ULink,
    },
    template: `
      <UApp>
        <UHeader>
          <UContainer>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold">Logo</span>
              <nav class="flex gap-4">
                <ULink to="/">Home</ULink>
                <ULink to="/about">About</ULink>
                <ULink to="/contact">Contact</ULink>
              </nav>
              <UButton label="Sign In" />
            </div>
          </UContainer>
        </UHeader>

        <UMain>
          <UContainer padded>
            <h1 class="text-4xl font-bold mb-4">Welcome</h1>
            <p class="text-lg">This is a complete page layout example.</p>
          </UContainer>
        </UMain>

        <UFooter>
          <UContainer>
            <div class="text-center text-sm text-gray-600">
              © 2024 Company. All rights reserved.
            </div>
          </UContainer>
        </UFooter>
      </UApp>
    `,
  }),
}
```

## Testing Checklist

For each layout component:

- [x] Component renders correctly
- [x] Responsive behavior works
- [x] Nested layouts function properly
- [x] Spacing/padding is consistent
- [x] Width constraints apply correctly
- [x] Composition with other layouts
- [x] Mobile layout adapts
- [x] Accessibility (landmarks)

## Common Patterns

### Container Widths
```typescript
// Typical max-width values
'sm'  // 640px
'md'  // 768px
'lg'  // 1024px
'xl'  // 1280px
'2xl' // 1536px
```

### Layout Composition
```vue
<UApp>
  <UHeader />
  <UMain>
    <UContainer>
      <!-- Content -->
    </UContainer>
  </UMain>
  <UFooter />
</UApp>
```

## Accessibility Requirements

1. **Semantic HTML**
   - Use proper HTML5 elements
   - `<header>`, `<main>`, `<footer>`
   - ARIA landmarks when needed

2. **Navigation**
   - Skip to content link
   - Keyboard accessible
   - Screen reader labels

3. **Responsive**
   - Mobile-first approach
   - Touch-friendly targets
   - Adaptive layouts

## Tips

1. **Full Page Stories**: Show complete layout compositions
2. **Responsive Testing**: Test at multiple breakpoints
3. **Content Examples**: Use realistic content
4. **Nested Layouts**: Demonstrate component composition
5. **Edge Cases**: Show with/without optional sections
6. **Theming**: Show light/dark mode variants
7. **Fixed Headers**: Demonstrate sticky positioning
8. **Safe Areas**: Consider mobile safe areas
