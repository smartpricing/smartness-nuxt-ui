# NuxtUI Component Testing Classes Guide

## Overview

This document provides a comprehensive reference for adding testing classes to all NuxtUI v4 component slots. Since NuxtUI does not currently support `data-id` attributes in configuration, we use CSS classes for testing purposes.

## ⚠️ Important: UI Config Keys vs. Vue Slots

**NuxtUI's `app.config.ts` uses theme configuration keys, NOT Vue slot names.**

- **Vue Slots** are what you use in templates: `#default`, `#leading`, `#trailing`
- **UI Config Keys** are what you use in `app.config.ts`: `base`, `label`, `leadingIcon`, `trailingIcon`

### Example: Button Component

```vue
<!-- In your template (Vue slots) -->
<UButton>
  <template #leading>Icon</template>
  <template #default>Click me</template>
  <template #trailing>Arrow</template>
</UButton>
```

```typescript
// In app.config.ts (UI config keys)
export default defineAppConfig({
	ui: {
		button: {
			slots: {
				base: "button-base-smartness-test", // Root button element
				label: "button-label-smartness-test", // Text content (default slot)
				leadingIcon: "button-leading-icon-smartness-test",
				trailingIcon: "button-trailing-icon-smartness-test"
			}
		}
	}
});
```

**Note**: Each component has its own specific set of UI config keys. Always check the component's metadata to know which keys are available.

## Class Naming Convention

Format: `[component]-[ui-config-key]-smartness-test`

Example:
- `button-label-smartness-test` (not `button-default`)
- `card-body-smartness-test` (not `card-default`)
- `input-base-smartness-test` (not `input-default`)

## How to Apply in app.config.ts

```typescript
export default defineAppConfig({
	ui: {
		// Component configuration
		componentName: {
			slots: {
				uiConfigKey: "component-ui-config-key-smartness-test"
			}
		}
	}
});
```

---

## Component Slots Reference

### Accordion
**Component**: `UAccordion`

**Vue Template Slots**: `#leading`, `#default`, `#trailing`, `#content`, `#body`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `accordion-root-smartness-test`
- `item` → Class: `accordion-item-smartness-test`
- `trigger` → Class: `accordion-trigger-smartness-test`
- `leadingIcon` → Class: `accordion-leading-icon-smartness-test`
- `leadingAvatar` → Class: `accordion-leading-avatar-smartness-test`
- `leadingAvatarSize` → Class: `accordion-leading-avatar-size-smartness-test`
- `label` → Class: `accordion-label-smartness-test`
- `trailingIcon` → Class: `accordion-trailing-icon-smartness-test`
- `content` → Class: `accordion-content-smartness-test`
- `body` → Class: `accordion-body-smartness-test`

**app.config.ts Example**:
```typescript
accordion: {
  slots: {
    root: 'accordion-root-smartness-test',
    item: 'accordion-item-smartness-test',
    trigger: 'accordion-trigger-smartness-test',
    leadingIcon: 'accordion-leading-icon-smartness-test',
    leadingAvatar: 'accordion-leading-avatar-smartness-test',
    leadingAvatarSize: 'accordion-leading-avatar-size-smartness-test',
    label: 'accordion-label-smartness-test',
    trailingIcon: 'accordion-trailing-icon-smartness-test',
    content: 'accordion-content-smartness-test',
    body: 'accordion-body-smartness-test'
  }
}
```

---

### Alert
**Component**: `UAlert`

**Vue Template Slots**: `#leading`, `#title`, `#description`, `#actions`, `#close`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `alert-root-smartness-test` (wrapper element)
- `wrapper` → Class: `alert-wrapper-smartness-test` (content wrapper)
- `icon` → Class: `alert-icon-smartness-test` (leading icon)
- `avatar` → Class: `alert-avatar-smartness-test` (leading avatar)
- `title` → Class: `alert-title-smartness-test`
- `description` → Class: `alert-description-smartness-test`
- `actions` → Class: `alert-actions-smartness-test`
- `close` → Class: `alert-close-smartness-test`

**app.config.ts Example**:
```typescript
alert: {
  slots: {
    root: 'alert-root-smartness-test',
    wrapper: 'alert-wrapper-smartness-test',
    icon: 'alert-icon-smartness-test',
    avatar: 'alert-avatar-smartness-test',
    title: 'alert-title-smartness-test',
    description: 'alert-description-smartness-test',
    actions: 'alert-actions-smartness-test',
    close: 'alert-close-smartness-test'
  }
}
```

**Note**: The UI config uses `icon` and `avatar` instead of a generic `leading` slot.

---

### App
**Component**: `UApp`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `app-root-smartness-test`

**app.config.ts Example**:
```typescript
app: {
	slots: {
		root: "app-root-smartness-test";
	}
}
```

---

### AuthForm
**Component**: `UAuthForm`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/authForm.ts)_

---

### Avatar
**Component**: `UAvatar`

**Vue Template Slots**: _No user-accessible slots_

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `avatar-root-smartness-test`
- `image` → Class: `avatar-image-smartness-test`
- `fallback` → Class: `avatar-fallback-smartness-test`
- `icon` → Class: `avatar-icon-smartness-test`

**app.config.ts Example**:
```typescript
avatar: {
  slots: {
    root: 'avatar-root-smartness-test',
    image: 'avatar-image-smartness-test',
    fallback: 'avatar-fallback-smartness-test',
    icon: 'avatar-icon-smartness-test'
  }
}
```

---

### AvatarGroup
**Component**: `UAvatarGroup`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `avatar-group-root-smartness-test`
- `base` → Class: `avatar-group-base-smartness-test`

**app.config.ts Example**:
```typescript
avatarGroup: {
  slots: {
    root: 'avatar-group-root-smartness-test',
    base: 'avatar-group-base-smartness-test'
  }
}
```

---

### Badge
**Component**: `UBadge`

**Vue Template Slots**: `#leading`, `#default`, `#trailing`

**UI Config Keys** (for `app.config.ts`):
- `base` → Class: `badge-base-smartness-test`
- `label` → Class: `badge-label-smartness-test`
- `leadingIcon` → Class: `badge-leading-icon-smartness-test`
- `leadingAvatar` → Class: `badge-leading-avatar-smartness-test`
- `leadingAvatarSize` → Class: `badge-leading-avatar-size-smartness-test`
- `trailingIcon` → Class: `badge-trailing-icon-smartness-test`

**app.config.ts Example**:
```typescript
badge: {
  slots: {
    base: 'badge-base-smartness-test',
    label: 'badge-label-smartness-test',
    leadingIcon: 'badge-leading-icon-smartness-test',
    leadingAvatar: 'badge-leading-avatar-smartness-test',
    leadingAvatarSize: 'badge-leading-avatar-size-smartness-test',
    trailingIcon: 'badge-trailing-icon-smartness-test'
  }
}
```

---

### Banner
**Component**: `UBanner`

**Vue Template Slots**: `#leading`, `#title`, `#actions`, `#close`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `banner-root-smartness-test`
- `container` → Class: `banner-container-smartness-test`
- `left` → Class: `banner-left-smartness-test`
- `center` → Class: `banner-center-smartness-test`
- `right` → Class: `banner-right-smartness-test`
- `icon` → Class: `banner-icon-smartness-test`
- `title` → Class: `banner-title-smartness-test`
- `actions` → Class: `banner-actions-smartness-test`
- `close` → Class: `banner-close-smartness-test`

**app.config.ts Example**:
```typescript
banner: {
  slots: {
    root: 'banner-root-smartness-test',
    container: 'banner-container-smartness-test',
    left: 'banner-left-smartness-test',
    center: 'banner-center-smartness-test',
    right: 'banner-right-smartness-test',
    icon: 'banner-icon-smartness-test',
    title: 'banner-title-smartness-test',
    actions: 'banner-actions-smartness-test',
    close: 'banner-close-smartness-test'
  }
}
```

---

### BlogPost
**Component**: `UBlogPost`

**Vue Template Slots**: `#date`, `#badge`, `#title`, `#description`, `#authors`, `#header`, `#body`, `#footer`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `blog-post-root-smartness-test`
- `header` → Class: `blog-post-header-smartness-test`
- `body` → Class: `blog-post-body-smartness-test`
- `footer` → Class: `blog-post-footer-smartness-test`
- `image` → Class: `blog-post-image-smartness-test`
- `title` → Class: `blog-post-title-smartness-test`
- `description` → Class: `blog-post-description-smartness-test`
- `authors` → Class: `blog-post-authors-smartness-test`
- `avatar` → Class: `blog-post-avatar-smartness-test`
- `meta` → Class: `blog-post-meta-smartness-test`
- `date` → Class: `blog-post-date-smartness-test`
- `badge` → Class: `blog-post-badge-smartness-test`

**app.config.ts Example**:
```typescript
blogPost: {
  slots: {
    root: 'blog-post-root-smartness-test',
    header: 'blog-post-header-smartness-test',
    body: 'blog-post-body-smartness-test',
    footer: 'blog-post-footer-smartness-test',
    image: 'blog-post-image-smartness-test',
    title: 'blog-post-title-smartness-test',
    description: 'blog-post-description-smartness-test',
    authors: 'blog-post-authors-smartness-test',
    avatar: 'blog-post-avatar-smartness-test',
    meta: 'blog-post-meta-smartness-test',
    date: 'blog-post-date-smartness-test',
    badge: 'blog-post-badge-smartness-test'
  }
}
```

---

### BlogPosts
**Component**: `UBlogPosts`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `blog-posts-root-smartness-test`

**app.config.ts Example**:
```typescript
blogPosts: {
	slots: {
		root: "blog-posts-root-smartness-test";
	}
}
```

---

### Breadcrumb
**Component**: `UBreadcrumb`

**Vue Template Slots**: `#item`, `#item-leading`, `#item-label`, `#item-trailing`, `#separator`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `breadcrumb-root-smartness-test`
- `list` → Class: `breadcrumb-list-smartness-test`
- `item` → Class: `breadcrumb-item-smartness-test`
- `link` → Class: `breadcrumb-link-smartness-test`
- `linkLeadingIcon` → Class: `breadcrumb-link-leading-icon-smartness-test`
- `linkLeadingAvatar` → Class: `breadcrumb-link-leading-avatar-smartness-test`
- `linkLeadingAvatarSize` → Class: `breadcrumb-link-leading-avatar-size-smartness-test`
- `linkLabel` → Class: `breadcrumb-link-label-smartness-test`
- `separator` → Class: `breadcrumb-separator-smartness-test`
- `separatorIcon` → Class: `breadcrumb-separator-icon-smartness-test`

**app.config.ts Example**:
```typescript
breadcrumb: {
  slots: {
    root: 'breadcrumb-root-smartness-test',
    list: 'breadcrumb-list-smartness-test',
    item: 'breadcrumb-item-smartness-test',
    link: 'breadcrumb-link-smartness-test',
    linkLeadingIcon: 'breadcrumb-link-leading-icon-smartness-test',
    linkLeadingAvatar: 'breadcrumb-link-leading-avatar-smartness-test',
    linkLeadingAvatarSize: 'breadcrumb-link-leading-avatar-size-smartness-test',
    linkLabel: 'breadcrumb-link-label-smartness-test',
    separator: 'breadcrumb-separator-smartness-test',
    separatorIcon: 'breadcrumb-separator-icon-smartness-test'
  }
}
```

---

### Button
**Component**: `UButton`

**Vue Template Slots**: `#leading`, `#default`, `#trailing`

**UI Config Keys** (for `app.config.ts`):
- `base` → Class: `button-base-smartness-test` (root button element)
- `label` → Class: `button-label-smartness-test` (button text content)
- `leadingIcon` → Class: `button-leading-icon-smartness-test`
- `trailingIcon` → Class: `button-trailing-icon-smartness-test`

**app.config.ts Example**:
```typescript
button: {
  slots: {
    base: 'button-base-smartness-test',
    label: 'button-label-smartness-test',
    leadingIcon: 'button-leading-icon-smartness-test',
    trailingIcon: 'button-trailing-icon-smartness-test'
  }
}
```

**Note**: The UI config keys are different from Vue slot names. `label` targets the button's text content (default slot), while `base` targets the root button element.

---

### Calendar
**Component**: `UCalendar`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/calendar.ts)_

---

### Card
**Component**: `UCard`

**Vue Template Slots**: `#header`, `#default`, `#footer`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `card-root-smartness-test` (wrapper element)
- `header` → Class: `card-header-smartness-test`
- `body` → Class: `card-body-smartness-test` (default slot content area)
- `footer` → Class: `card-footer-smartness-test`

**app.config.ts Example**:
```typescript
card: {
  slots: {
    root: 'card-root-smartness-test',
    header: 'card-header-smartness-test',
    body: 'card-body-smartness-test',
    footer: 'card-footer-smartness-test'
  }
}
```

**Note**: The UI config uses `body` instead of `default` for the main content area.

---

### Carousel
**Component**: `UCarousel`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/carousel.ts)_

---

### Checkbox
**Component**: `UCheckbox`

**Vue Template Slots**: `#label`, `#description`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `checkbox-root-smartness-test`
- `container` → Class: `checkbox-container-smartness-test`
- `base` → Class: `checkbox-base-smartness-test`
- `indicator` → Class: `checkbox-indicator-smartness-test`
- `icon` → Class: `checkbox-icon-smartness-test`
- `wrapper` → Class: `checkbox-wrapper-smartness-test`
- `label` → Class: `checkbox-label-smartness-test`
- `description` → Class: `checkbox-description-smartness-test`

**app.config.ts Example**:
```typescript
checkbox: {
  slots: {
    root: 'checkbox-root-smartness-test',
    container: 'checkbox-container-smartness-test',
    base: 'checkbox-base-smartness-test',
    indicator: 'checkbox-indicator-smartness-test',
    icon: 'checkbox-icon-smartness-test',
    wrapper: 'checkbox-wrapper-smartness-test',
    label: 'checkbox-label-smartness-test',
    description: 'checkbox-description-smartness-test'
  }
}
```

---

### CheckboxGroup
**Component**: `UCheckboxGroup`

**Vue Template Slots**: `#legend`, `#label`, `#description`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `checkbox-group-root-smartness-test`
- `fieldset` → Class: `checkbox-group-fieldset-smartness-test`
- `legend` → Class: `checkbox-group-legend-smartness-test`
- `item` → Class: `checkbox-group-item-smartness-test`
- `container` → Class: `checkbox-group-container-smartness-test`
- `base` → Class: `checkbox-group-base-smartness-test`
- `indicator` → Class: `checkbox-group-indicator-smartness-test`
- `icon` → Class: `checkbox-group-icon-smartness-test`
- `wrapper` → Class: `checkbox-group-wrapper-smartness-test`
- `label` → Class: `checkbox-group-label-smartness-test`
- `description` → Class: `checkbox-group-description-smartness-test`

**app.config.ts Example**:
```typescript
checkboxGroup: {
  slots: {
    root: 'checkbox-group-root-smartness-test',
    fieldset: 'checkbox-group-fieldset-smartness-test',
    legend: 'checkbox-group-legend-smartness-test',
    item: 'checkbox-group-item-smartness-test',
    container: 'checkbox-group-container-smartness-test',
    base: 'checkbox-group-base-smartness-test',
    indicator: 'checkbox-group-indicator-smartness-test',
    icon: 'checkbox-group-icon-smartness-test',
    wrapper: 'checkbox-group-wrapper-smartness-test',
    label: 'checkbox-group-label-smartness-test',
    description: 'checkbox-group-description-smartness-test'
  }
}
```

---

### Chip
**Component**: `UChip`

**Vue Template Slots**: `#default`, `#content`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `chip-root-smartness-test`
- `base` → Class: `chip-base-smartness-test`

**app.config.ts Example**:
```typescript
chip: {
  slots: {
    root: 'chip-root-smartness-test',
    base: 'chip-base-smartness-test'
  }
}
```

---

### Collapsible
**Component**: `UCollapsible`

**Vue Template Slots**: `#default`, `#content`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `collapsible-root-smartness-test`
- `content` → Class: `collapsible-content-smartness-test`

**app.config.ts Example**:
```typescript
collapsible: {
  slots: {
    root: 'collapsible-root-smartness-test',
    content: 'collapsible-content-smartness-test'
  }
}
```

---

### CommandPalette
**Component**: `UCommandPalette`

**Slots**: _(Component response too large - check GitHub source at: https://github.com/nuxt/ui/blob/v4/src/theme/commandPalette.ts)_

---

### ChangelogVersion
**Component**: `UChangelogVersion`

**Vue Template Slots**: `#header`, `#badge`, `#date`, `#title`, `#description`, `#image`, `#body`, `#footer`, `#authors`, `#actions`, `#indicator`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `changelog-version-root-smartness-test`
- `container` → Class: `changelog-version-container-smartness-test`
- `header` → Class: `changelog-version-header-smartness-test`
- `meta` → Class: `changelog-version-meta-smartness-test`
- `date` → Class: `changelog-version-date-smartness-test`
- `badge` → Class: `changelog-version-badge-smartness-test`
- `title` → Class: `changelog-version-title-smartness-test`
- `description` → Class: `changelog-version-description-smartness-test`
- `imageWrapper` → Class: `changelog-version-image-wrapper-smartness-test`
- `image` → Class: `changelog-version-image-smartness-test`
- `authors` → Class: `changelog-version-authors-smartness-test`
- `footer` → Class: `changelog-version-footer-smartness-test`
- `indicator` → Class: `changelog-version-indicator-smartness-test`
- `dot` → Class: `changelog-version-dot-smartness-test`
- `dotInner` → Class: `changelog-version-dot-inner-smartness-test`

**app.config.ts Example**:
```typescript
changelogVersion: {
  slots: {
    root: 'changelog-version-root-smartness-test',
    container: 'changelog-version-container-smartness-test',
    header: 'changelog-version-header-smartness-test',
    meta: 'changelog-version-meta-smartness-test',
    date: 'changelog-version-date-smartness-test',
    badge: 'changelog-version-badge-smartness-test',
    title: 'changelog-version-title-smartness-test',
    description: 'changelog-version-description-smartness-test',
    imageWrapper: 'changelog-version-image-wrapper-smartness-test',
    image: 'changelog-version-image-smartness-test',
    authors: 'changelog-version-authors-smartness-test',
    footer: 'changelog-version-footer-smartness-test',
    indicator: 'changelog-version-indicator-smartness-test',
    dot: 'changelog-version-dot-smartness-test',
    dotInner: 'changelog-version-dot-inner-smartness-test'
  }
}
```

---

### ChatMessages
**Component**: `UChatMessages`

**Vue Template Slots**: `#default`, `#indicator`, `#viewport`, `#content`, `#leading`, `#actions`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `chat-messages-root-smartness-test`
- `indicator` → Class: `chat-messages-indicator-smartness-test`
- `viewport` → Class: `chat-messages-viewport-smartness-test`
- `autoScroll` → Class: `chat-messages-auto-scroll-smartness-test`

**app.config.ts Example**:
```typescript
chatMessages: {
  slots: {
    root: 'chat-messages-root-smartness-test',
    indicator: 'chat-messages-indicator-smartness-test',
    viewport: 'chat-messages-viewport-smartness-test',
    autoScroll: 'chat-messages-auto-scroll-smartness-test'
  }
}
```

---

### ChatPalette
**Component**: `UChatPalette`

**Vue Template Slots**: `#default`, `#prompt`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `chat-palette-root-smartness-test`
- `prompt` → Class: `chat-palette-prompt-smartness-test`
- `close` → Class: `chat-palette-close-smartness-test`
- `content` → Class: `chat-palette-content-smartness-test`

**app.config.ts Example**:
```typescript
chatPalette: {
  slots: {
    root: 'chat-palette-root-smartness-test',
    prompt: 'chat-palette-prompt-smartness-test',
    close: 'chat-palette-close-smartness-test',
    content: 'chat-palette-content-smartness-test'
  }
}
```

---

### ChatPrompt
**Component**: `UChatPrompt`

**Vue Template Slots**: `#header`, `#footer`, `#leading`, `#default`, `#trailing`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `chat-prompt-root-smartness-test`
- `header` → Class: `chat-prompt-header-smartness-test`
- `body` → Class: `chat-prompt-body-smartness-test`
- `footer` → Class: `chat-prompt-footer-smartness-test`
- `base` → Class: `chat-prompt-base-smartness-test`
- `leading` → Class: `chat-prompt-leading-smartness-test`
- `leadingIcon` → Class: `chat-prompt-leading-icon-smartness-test`
- `leadingAvatar` → Class: `chat-prompt-leading-avatar-smartness-test`
- `leadingAvatarSize` → Class: `chat-prompt-leading-avatar-size-smartness-test`
- `trailing` → Class: `chat-prompt-trailing-smartness-test`
- `trailingIcon` → Class: `chat-prompt-trailing-icon-smartness-test`

**app.config.ts Example**:
```typescript
chatPrompt: {
  slots: {
    root: 'chat-prompt-root-smartness-test',
    header: 'chat-prompt-header-smartness-test',
    body: 'chat-prompt-body-smartness-test',
    footer: 'chat-prompt-footer-smartness-test',
    base: 'chat-prompt-base-smartness-test',
    leading: 'chat-prompt-leading-smartness-test',
    leadingIcon: 'chat-prompt-leading-icon-smartness-test',
    leadingAvatar: 'chat-prompt-leading-avatar-smartness-test',
    leadingAvatarSize: 'chat-prompt-leading-avatar-size-smartness-test',
    trailing: 'chat-prompt-trailing-smartness-test',
    trailingIcon: 'chat-prompt-trailing-icon-smartness-test'
  }
}
```

---

### ChatPromptSubmit
**Component**: `UChatPromptSubmit`

**Vue Template Slots**: `#leading`, `#default`, `#trailing`

**UI Config Keys** (for `app.config.ts`):
- `base` → Class: `chat-prompt-submit-base-smartness-test`
- `label` → Class: `chat-prompt-submit-label-smartness-test`
- `leadingIcon` → Class: `chat-prompt-submit-leading-icon-smartness-test`
- `leadingAvatar` → Class: `chat-prompt-submit-leading-avatar-smartness-test`
- `leadingAvatarSize` → Class: `chat-prompt-submit-leading-avatar-size-smartness-test`
- `trailingIcon` → Class: `chat-prompt-submit-trailing-icon-smartness-test`

**app.config.ts Example**:
```typescript
chatPromptSubmit: {
  slots: {
    base: 'chat-prompt-submit-base-smartness-test',
    label: 'chat-prompt-submit-label-smartness-test',
    leadingIcon: 'chat-prompt-submit-leading-icon-smartness-test',
    leadingAvatar: 'chat-prompt-submit-leading-avatar-smartness-test',
    leadingAvatarSize: 'chat-prompt-submit-leading-avatar-size-smartness-test',
    trailingIcon: 'chat-prompt-submit-trailing-icon-smartness-test'
  }
}
```

---

### ColorModeAvatar
**Component**: `UColorModeAvatar`

**Slots**: _No slots available for this component_

---

### ColorModeButton
**Component**: `UColorModeButton`

**Vue Template Slots**: `#fallback`

**UI Config Keys** (for `app.config.ts`):
- `base` → Class: `color-mode-button-base-smartness-test`
- `label` → Class: `color-mode-button-label-smartness-test`
- `leadingIcon` → Class: `color-mode-button-leading-icon-smartness-test`
- `leadingAvatar` → Class: `color-mode-button-leading-avatar-smartness-test`
- `leadingAvatarSize` → Class: `color-mode-button-leading-avatar-size-smartness-test`
- `trailingIcon` → Class: `color-mode-button-trailing-icon-smartness-test`

**app.config.ts Example**:
```typescript
colorModeButton: {
	slots: {
    base: 'color-mode-button-base-smartness-test',
    label: 'color-mode-button-label-smartness-test',
    leadingIcon: 'color-mode-button-leading-icon-smartness-test',
    leadingAvatar: 'color-mode-button-leading-avatar-smartness-test',
    leadingAvatarSize: 'color-mode-button-leading-avatar-size-smartness-test',
    trailingIcon: 'color-mode-button-trailing-icon-smartness-test'
	}
}
```

---

### ColorModeImage
**Component**: `UColorModeImage`

**Slots**: _No slots available for this component_

---

### ColorModeSelect
**Component**: `UColorModeSelect`

**Slots**: _No slots available for this component_

---

### ColorModeSwitch
**Component**: `UColorModeSwitch`

**Slots**: _No slots available for this component_

---

### ColorPicker
**Component**: `UColorPicker`

**Slots**: _No slots available for this component_

---

### Container
**Component**: `UContainer`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `container-root-smartness-test`

**app.config.ts Example**:
```typescript
container: {
	slots: {
		root: "container-root-smartness-test";
	}
}
```

---

### Drawer
**Component**: `UDrawer`

**Slots**:
- `default` → Class: `drawer-default-smartness-test`
- `content` → Class: `drawer-content-smartness-test`
- `header` → Class: `drawer-header-smartness-test`
- `title` → Class: `drawer-title-smartness-test`
- `description` → Class: `drawer-description-smartness-test`
- `body` → Class: `drawer-body-smartness-test`
- `footer` → Class: `drawer-footer-smartness-test`

**app.config.ts Example**:
```typescript
drawer: {
  slots: {
    default: 'drawer-default-smartness-test',
    content: 'drawer-content-smartness-test',
    header: 'drawer-header-smartness-test',
    title: 'drawer-title-smartness-test',
    description: 'drawer-description-smartness-test',
    body: 'drawer-body-smartness-test',
    footer: 'drawer-footer-smartness-test'
  }
}
```

---

### Error
**Component**: `UError`

**Vue Template Slots**: `#default`, `#statusCode`, `#statusMessage`, `#message`, `#links`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `error-root-smartness-test`
- `statusCode` → Class: `error-status-code-smartness-test`
- `statusMessage` → Class: `error-status-message-smartness-test`
- `message` → Class: `error-message-smartness-test`
- `links` → Class: `error-links-smartness-test`

**app.config.ts Example**:
```typescript
error: {
  slots: {
    root: 'error-root-smartness-test',
    statusCode: 'error-status-code-smartness-test',
    statusMessage: 'error-status-message-smartness-test',
    message: 'error-message-smartness-test',
    links: 'error-links-smartness-test'
  }
}
```

---

### FieldGroup
**Component**: `UFieldGroup`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `field-group-root-smartness-test`

**app.config.ts Example**:
```typescript
fieldGroup: {
	slots: {
		root: "field-group-root-smartness-test";
	}
}
```

---

### FileUpload
**Component**: `UFileUpload`

**Vue Template Slots**: `#default`, `#leading`, `#label`, `#description`, `#actions`, `#files`, `#files-top`, `#files-bottom`, `#file`, `#file-leading`, `#file-name`, `#file-size`, `#file-trailing`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `file-upload-root-smartness-test`
- `base` → Class: `file-upload-base-smartness-test`
- `wrapper` → Class: `file-upload-wrapper-smartness-test`
- `icon` → Class: `file-upload-icon-smartness-test`
- `avatar` → Class: `file-upload-avatar-smartness-test`
- `label` → Class: `file-upload-label-smartness-test`
- `description` → Class: `file-upload-description-smartness-test`
- `actions` → Class: `file-upload-actions-smartness-test`
- `files` → Class: `file-upload-files-smartness-test`
- `file` → Class: `file-upload-file-smartness-test`
- `fileLeadingAvatar` → Class: `file-upload-file-leading-avatar-smartness-test`
- `fileWrapper` → Class: `file-upload-file-wrapper-smartness-test`
- `fileName` → Class: `file-upload-file-name-smartness-test`
- `fileSize` → Class: `file-upload-file-size-smartness-test`
- `fileTrailingButton` → Class: `file-upload-file-trailing-button-smartness-test`

**app.config.ts Example**:
```typescript
fileUpload: {
  slots: {
    root: 'file-upload-root-smartness-test',
    base: 'file-upload-base-smartness-test',
    wrapper: 'file-upload-wrapper-smartness-test',
    icon: 'file-upload-icon-smartness-test',
    avatar: 'file-upload-avatar-smartness-test',
    label: 'file-upload-label-smartness-test',
    description: 'file-upload-description-smartness-test',
    actions: 'file-upload-actions-smartness-test',
    files: 'file-upload-files-smartness-test',
    file: 'file-upload-file-smartness-test',
    fileLeadingAvatar: 'file-upload-file-leading-avatar-smartness-test',
    fileWrapper: 'file-upload-file-wrapper-smartness-test',
    fileName: 'file-upload-file-name-smartness-test',
    fileSize: 'file-upload-file-size-smartness-test',
    fileTrailingButton: 'file-upload-file-trailing-button-smartness-test'
  }
}
```

---

### Footer
**Component**: `UFooter`

**Vue Template Slots**: `#left`, `#default`, `#right`, `#top`, `#bottom`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `footer-root-smartness-test`
- `top` → Class: `footer-top-smartness-test`
- `bottom` → Class: `footer-bottom-smartness-test`
- `container` → Class: `footer-container-smartness-test`
- `left` → Class: `footer-left-smartness-test`
- `center` → Class: `footer-center-smartness-test`
- `right` → Class: `footer-right-smartness-test`

**app.config.ts Example**:
```typescript
footer: {
  slots: {
    root: 'footer-root-smartness-test',
    top: 'footer-top-smartness-test',
    bottom: 'footer-bottom-smartness-test',
    container: 'footer-container-smartness-test',
    left: 'footer-left-smartness-test',
    center: 'footer-center-smartness-test',
    right: 'footer-right-smartness-test'
  }
}
```

---

### Form
**Component**: `UForm`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `form-root-smartness-test`

**app.config.ts Example**:
```typescript
form: {
	slots: {
		root: "form-root-smartness-test";
	}
}
```

---

### FormField
**Component**: `UFormField`

**Vue Template Slots**: `#label`, `#hint`, `#description`, `#help`, `#error`, `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `form-field-root-smartness-test`
- `wrapper` → Class: `form-field-wrapper-smartness-test`
- `labelWrapper` → Class: `form-field-label-wrapper-smartness-test`
- `label` → Class: `form-field-label-smartness-test`
- `container` → Class: `form-field-container-smartness-test`
- `description` → Class: `form-field-description-smartness-test`
- `error` → Class: `form-field-error-smartness-test`
- `hint` → Class: `form-field-hint-smartness-test`
- `help` → Class: `form-field-help-smartness-test`

**app.config.ts Example**:
```typescript
formField: {
  slots: {
    root: 'form-field-root-smartness-test',
    wrapper: 'form-field-wrapper-smartness-test',
    labelWrapper: 'form-field-label-wrapper-smartness-test',
    label: 'form-field-label-smartness-test',
    container: 'form-field-container-smartness-test',
    description: 'form-field-description-smartness-test',
    error: 'form-field-error-smartness-test',
    hint: 'form-field-hint-smartness-test',
    help: 'form-field-help-smartness-test'
  }
}
```

---

### Header
**Component**: `UHeader`

**Vue Template Slots**: `#title`, `#left`, `#default`, `#right`, `#toggle`, `#top`, `#bottom`, `#body`, `#content`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `header-root-smartness-test`
- `container` → Class: `header-container-smartness-test`
- `left` → Class: `header-left-smartness-test`
- `center` → Class: `header-center-smartness-test`
- `right` → Class: `header-right-smartness-test`
- `title` → Class: `header-title-smartness-test`
- `toggle` → Class: `header-toggle-smartness-test`
- `content` → Class: `header-content-smartness-test`
- `overlay` → Class: `header-overlay-smartness-test`
- `header` → Class: `header-header-smartness-test`
- `body` → Class: `header-body-smartness-test`

**app.config.ts Example**:
```typescript
header: {
  slots: {
    root: 'header-root-smartness-test',
    container: 'header-container-smartness-test',
    left: 'header-left-smartness-test',
    center: 'header-center-smartness-test',
    right: 'header-right-smartness-test',
    title: 'header-title-smartness-test',
    toggle: 'header-toggle-smartness-test',
    content: 'header-content-smartness-test',
    overlay: 'header-overlay-smartness-test',
    header: 'header-header-smartness-test',
    body: 'header-body-smartness-test'
  }
}
```

---

### Icon
**Component**: `UIcon`

**Slots**: _No slots available for this component_

---

### Input
**Component**: `UInput`

**Vue Template Slots**: `#leading`, `#trailing`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `input-root-smartness-test` (wrapper element)
- `base` → Class: `input-base-smartness-test` (input element itself)
- `leadingIcon` → Class: `input-leading-icon-smartness-test`
- `trailingIcon` → Class: `input-trailing-icon-smartness-test`

**app.config.ts Example**:
```typescript
input: {
  slots: {
    root: 'input-root-smartness-test',
    base: 'input-base-smartness-test',
    leadingIcon: 'input-leading-icon-smartness-test',
    trailingIcon: 'input-trailing-icon-smartness-test'
  }
}
```

**Note**: The UI config uses `base` for the actual input element, not `default`.

---

### InputTags
**Component**: `UInputTags`

**Slots**:
- `leading` → Class: `input-tags-leading-smartness-test`
- `default` → Class: `input-tags-default-smartness-test`
- `trailing` → Class: `input-tags-trailing-smartness-test`
- `item-text` → Class: `input-tags-item-text-smartness-test`
- `item-delete` → Class: `input-tags-item-delete-smartness-test`

**app.config.ts Example**:
```typescript
inputTags: {
  slots: {
    leading: 'input-tags-leading-smartness-test',
    default: 'input-tags-default-smartness-test',
    trailing: 'input-tags-trailing-smartness-test',
    'item-text': 'input-tags-item-text-smartness-test',
    'item-delete': 'input-tags-item-delete-smartness-test'
  }
}
```

---

### Kbd
**Component**: `UKbd`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `base` → Class: `kbd-base-smartness-test`

**app.config.ts Example**:
```typescript
kbd: {
	slots: {
		base: "kbd-base-smartness-test";
	}
}
```

---

### Link
**Component**: `ULink`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`): _This component does not expose UI config keys - styling should be done through the `class` prop or component slots._

---

### LocaleSelect
**Component**: `ULocaleSelect`

**Slots**: _No slots available for this component_

---

### Main
**Component**: `UMain`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`): _This component does not expose UI config keys - styling should be done through the `class` prop._

---

### Marquee
**Component**: `UMarquee`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `marquee-root-smartness-test`
- `content` → Class: `marquee-content-smartness-test`

**app.config.ts Example**:
```typescript
marquee: {
  slots: {
    root: 'marquee-root-smartness-test',
    content: 'marquee-content-smartness-test'
  }
}
```

---

### Modal
**Component**: `UModal`

**Vue Template Slots**: `#default`, `#content`, `#header`, `#title`, `#description`, `#actions`, `#close`, `#body`, `#footer`

**UI Config Keys** (for `app.config.ts`):
- `overlay` → Class: `modal-overlay-smartness-test` (backdrop)
- `content` → Class: `modal-content-smartness-test` (modal container)
- `wrapper` → Class: `modal-wrapper-smartness-test` (inner wrapper)
- `header` → Class: `modal-header-smartness-test`
- `title` → Class: `modal-title-smartness-test`
- `description` → Class: `modal-description-smartness-test`
- `body` → Class: `modal-body-smartness-test`
- `footer` → Class: `modal-footer-smartness-test`
- `close` → Class: `modal-close-smartness-test`

**app.config.ts Example**:
```typescript
modal: {
  slots: {
    overlay: 'modal-overlay-smartness-test',
    content: 'modal-content-smartness-test',
    wrapper: 'modal-wrapper-smartness-test',
    header: 'modal-header-smartness-test',
    title: 'modal-title-smartness-test',
    description: 'modal-description-smartness-test',
    body: 'modal-body-smartness-test',
    footer: 'modal-footer-smartness-test',
    close: 'modal-close-smartness-test'
  }
}
```

**Note**: The UI config has `overlay` and `wrapper` keys, but no `default` or `actions` keys.

---

### Popover
**Component**: `UPopover`

**Slots**:
- `default` → Class: `popover-default-smartness-test`
- `content` → Class: `popover-content-smartness-test`
- `anchor` → Class: `popover-anchor-smartness-test`

**app.config.ts Example**:
```typescript
popover: {
  slots: {
    default: 'popover-default-smartness-test',
    content: 'popover-content-smartness-test',
    anchor: 'popover-anchor-smartness-test'
  }
}
```

---

### Progress
**Component**: `UProgress`

**Vue Template Slots**: `#status`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `progress-root-smartness-test`
- `base` → Class: `progress-base-smartness-test`
- `indicator` → Class: `progress-indicator-smartness-test`
- `status` → Class: `progress-status-smartness-test`
- `steps` → Class: `progress-steps-smartness-test`
- `step` → Class: `progress-step-smartness-test`

**app.config.ts Example**:
```typescript
progress: {
	slots: {
    root: 'progress-root-smartness-test',
    base: 'progress-base-smartness-test',
    indicator: 'progress-indicator-smartness-test',
    status: 'progress-status-smartness-test',
    steps: 'progress-steps-smartness-test',
    step: 'progress-step-smartness-test'
	}
}
```

---

### Separator
**Component**: `USeparator`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `separator-root-smartness-test`
- `border` → Class: `separator-border-smartness-test`
- `container` → Class: `separator-container-smartness-test`
- `icon` → Class: `separator-icon-smartness-test`
- `avatar` → Class: `separator-avatar-smartness-test`
- `avatarSize` → Class: `separator-avatar-size-smartness-test`
- `label` → Class: `separator-label-smartness-test`

**app.config.ts Example**:
```typescript
separator: {
  slots: {
    root: 'separator-root-smartness-test',
    border: 'separator-border-smartness-test',
    container: 'separator-container-smartness-test',
    icon: 'separator-icon-smartness-test',
    avatar: 'separator-avatar-smartness-test',
    avatarSize: 'separator-avatar-size-smartness-test',
    label: 'separator-label-smartness-test'
  }
}
```

---

### Skeleton
**Component**: `USkeleton`

**Vue Template Slots**: `#default`

**UI Config Keys** (for `app.config.ts`): _This component does not expose UI config keys - styling should be done through the `class` prop._

---

### Pagination
**Component**: `UPagination`

**Vue Template Slots**: `#first`, `#prev`, `#next`, `#last`, `#ellipsis`, `#item`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `pagination-root-smartness-test`
- `list` → Class: `pagination-list-smartness-test`
- `ellipsis` → Class: `pagination-ellipsis-smartness-test`
- `label` → Class: `pagination-label-smartness-test`
- `first` → Class: `pagination-first-smartness-test`
- `prev` → Class: `pagination-prev-smartness-test`
- `item` → Class: `pagination-item-smartness-test`
- `next` → Class: `pagination-next-smartness-test`
- `last` → Class: `pagination-last-smartness-test`

**app.config.ts Example**:
```typescript
pagination: {
  slots: {
    root: 'pagination-root-smartness-test',
    list: 'pagination-list-smartness-test',
    ellipsis: 'pagination-ellipsis-smartness-test',
    label: 'pagination-label-smartness-test',
    first: 'pagination-first-smartness-test',
    prev: 'pagination-prev-smartness-test',
    item: 'pagination-item-smartness-test',
    next: 'pagination-next-smartness-test',
    last: 'pagination-last-smartness-test'
  }
}
```

---

### Stepper
**Component**: `UStepper`

**Vue Template Slots**: `#indicator`, `#title`, `#description`, `#content`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `stepper-root-smartness-test`
- `header` → Class: `stepper-header-smartness-test`
- `item` → Class: `stepper-item-smartness-test`
- `container` → Class: `stepper-container-smartness-test`
- `trigger` → Class: `stepper-trigger-smartness-test`
- `indicator` → Class: `stepper-indicator-smartness-test`
- `icon` → Class: `stepper-icon-smartness-test`
- `separator` → Class: `stepper-separator-smartness-test`
- `wrapper` → Class: `stepper-wrapper-smartness-test`
- `title` → Class: `stepper-title-smartness-test`
- `description` → Class: `stepper-description-smartness-test`
- `content` → Class: `stepper-content-smartness-test`

**app.config.ts Example**:
```typescript
stepper: {
  slots: {
    root: 'stepper-root-smartness-test',
    header: 'stepper-header-smartness-test',
    item: 'stepper-item-smartness-test',
    container: 'stepper-container-smartness-test',
    trigger: 'stepper-trigger-smartness-test',
    indicator: 'stepper-indicator-smartness-test',
    icon: 'stepper-icon-smartness-test',
    separator: 'stepper-separator-smartness-test',
    wrapper: 'stepper-wrapper-smartness-test',
    title: 'stepper-title-smartness-test',
    description: 'stepper-description-smartness-test',
    content: 'stepper-content-smartness-test'
  }
}
```

---

### Textarea
**Component**: `UTextarea`

**Slots**:
- `leading` → `textarea-leading-smartness-test`
- `default` → `textarea-default-smartness-test`
- `trailing` → `textarea-trailing-smartness-test`

**Configuration**:
```typescript
textarea: {
  slots: {
    leading: 'textarea-leading-smartness-test',
    default: 'textarea-default-smartness-test',
    trailing: 'textarea-trailing-smartness-test'
  }
}
```

---

### Toast
**Component**: `UToast`

**Slots**:
- `leading` → `toast-leading-smartness-test`
- `title` → `toast-title-smartness-test`
- `description` → `toast-description-smartness-test`
- `actions` → `toast-actions-smartness-test`
- `close` → `toast-close-smartness-test`

**Configuration**:
```typescript
toast: {
  slots: {
    leading: 'toast-leading-smartness-test',
    title: 'toast-title-smartness-test',
    description: 'toast-description-smartness-test',
    actions: 'toast-actions-smartness-test',
    close: 'toast-close-smartness-test'
  }
}
```

---

### Tooltip
**Component**: `UTooltip`

**Slots**:
- `default` → `tooltip-default-smartness-test`
- `content` → `tooltip-content-smartness-test`

**Configuration**:
```typescript
tooltip: {
  slots: {
    default: 'tooltip-default-smartness-test',
    content: 'tooltip-content-smartness-test'
  }
}
```

---

### Slideover
**Component**: `USlideover`

**Slots**:
- `default` → `slideover-default-smartness-test`
- `content` → `slideover-content-smartness-test`
- `header` → `slideover-header-smartness-test`
- `title` → `slideover-title-smartness-test`
- `description` → `slideover-description-smartness-test`
- `actions` → `slideover-actions-smartness-test`
- `close` → `slideover-close-smartness-test`
- `body` → `slideover-body-smartness-test`
- `footer` → `slideover-footer-smartness-test`

**Configuration**:
```typescript
slideover: {
  slots: {
    default: 'slideover-default-smartness-test',
    content: 'slideover-content-smartness-test',
    header: 'slideover-header-smartness-test',
    title: 'slideover-title-smartness-test',
    description: 'slideover-description-smartness-test',
    actions: 'slideover-actions-smartness-test',
    close: 'slideover-close-smartness-test',
    body: 'slideover-body-smartness-test',
    footer: 'slideover-footer-smartness-test'
  }
}
```

---

### Switch
**Component**: `USwitch`

**Slots**:
- `label` → `switch-label-smartness-test`
- `description` → `switch-description-smartness-test`

**Configuration**:
```typescript
switch: {
  slots: {
    label: 'switch-label-smartness-test',
    description: 'switch-description-smartness-test'
  }
}
```

---

### User
**Component**: `UUser`

**Slots**:
- `avatar` → `user-avatar-smartness-test`
- `name` → `user-name-smartness-test`
- `description` → `user-description-smartness-test`
- `default` → `user-default-smartness-test`

**Configuration**:
```typescript
user: {
  slots: {
    avatar: 'user-avatar-smartness-test',
    name: 'user-name-smartness-test',
    description: 'user-description-smartness-test',
    default: 'user-default-smartness-test'
  }
}
```

---

### Timeline
**Component**: `UTimeline`

**Slots**:
- `indicator` → `timeline-indicator-smartness-test`
- `date` → `timeline-date-smartness-test`
- `title` → `timeline-title-smartness-test`
- `description` → `timeline-description-smartness-test`

**Configuration**:
```typescript
timeline: {
  slots: {
    indicator: 'timeline-indicator-smartness-test',
    date: 'timeline-date-smartness-test',
    title: 'timeline-title-smartness-test',
    description: 'timeline-description-smartness-test'
  }
}
```

---

### Radio Group
**Component**: `URadioGroup`

**Slots**:
- `legend` → `radio-group-legend-smartness-test`
- `label` → `radio-group-label-smartness-test`
- `description` → `radio-group-description-smartness-test`

**Configuration**:
```typescript
radioGroup: {
  slots: {
    legend: 'radio-group-legend-smartness-test',
    label: 'radio-group-label-smartness-test',
    description: 'radio-group-description-smartness-test'
  }
}
```

---

### ChangelogVersions
**Component**: `UChangelogVersions`

**Slots**:
- `default` → Class: `changelog-versions-default-smartness-test`
- `indicator` → Class: `changelog-versions-indicator-smartness-test`
- `header` → Class: `changelog-versions-header-smartness-test`
- `badge` → Class: `changelog-versions-badge-smartness-test`
- `date` → Class: `changelog-versions-date-smartness-test`
- `title` → Class: `changelog-versions-title-smartness-test`
- `description` → Class: `changelog-versions-description-smartness-test`
- `image` → Class: `changelog-versions-image-smartness-test`
- `body` → Class: `changelog-versions-body-smartness-test`
- `footer` → Class: `changelog-versions-footer-smartness-test`
- `authors` → Class: `changelog-versions-authors-smartness-test`
- `actions` → Class: `changelog-versions-actions-smartness-test`

**app.config.ts Example**:
```typescript
changelogVersions: {
  slots: {
    default: 'changelog-versions-default-smartness-test',
    indicator: 'changelog-versions-indicator-smartness-test',
    header: 'changelog-versions-header-smartness-test',
    badge: 'changelog-versions-badge-smartness-test',
    date: 'changelog-versions-date-smartness-test',
    title: 'changelog-versions-title-smartness-test',
    description: 'changelog-versions-description-smartness-test',
    image: 'changelog-versions-image-smartness-test',
    body: 'changelog-versions-body-smartness-test',
    footer: 'changelog-versions-footer-smartness-test',
    authors: 'changelog-versions-authors-smartness-test',
    actions: 'changelog-versions-actions-smartness-test'
  }
}
```

---

### ChatMessage
**Component**: `UChatMessage`

**Slots**:
- `leading` → Class: `chat-message-leading-smartness-test`
- `content` → Class: `chat-message-content-smartness-test`
- `actions` → Class: `chat-message-actions-smartness-test`

**app.config.ts Example**:
```typescript
chatMessage: {
  slots: {
    leading: 'chat-message-leading-smartness-test',
    content: 'chat-message-content-smartness-test',
    actions: 'chat-message-actions-smartness-test'
  }
}
```

---

### InputMenu
**Component**: `UInputMenu`

**Vue Template Slots**: `#leading`, `#trailing`, `#empty`, `#item`, `#item-leading`, `#item-label`, `#item-trailing`, `#tags-item-text`, `#tags-item-delete`, `#content-top`, `#content-bottom`, `#create-item-label`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `input-menu-root-smartness-test`
- `base` → Class: `input-menu-base-smartness-test`
- `leading` → Class: `input-menu-leading-smartness-test`
- `leadingIcon` → Class: `input-menu-leading-icon-smartness-test`
- `leadingAvatar` → Class: `input-menu-leading-avatar-smartness-test`
- `leadingAvatarSize` → Class: `input-menu-leading-avatar-size-smartness-test`
- `trailing` → Class: `input-menu-trailing-smartness-test`
- `trailingIcon` → Class: `input-menu-trailing-icon-smartness-test`
- `arrow` → Class: `input-menu-arrow-smartness-test`
- `content` → Class: `input-menu-content-smartness-test`
- `viewport` → Class: `input-menu-viewport-smartness-test`
- `group` → Class: `input-menu-group-smartness-test`
- `empty` → Class: `input-menu-empty-smartness-test`
- `label` → Class: `input-menu-label-smartness-test`
- `separator` → Class: `input-menu-separator-smartness-test`
- `item` → Class: `input-menu-item-smartness-test`
- `itemLeadingIcon` → Class: `input-menu-item-leading-icon-smartness-test`
- `itemLeadingAvatar` → Class: `input-menu-item-leading-avatar-smartness-test`
- `itemLeadingAvatarSize` → Class: `input-menu-item-leading-avatar-size-smartness-test`
- `itemLeadingChip` → Class: `input-menu-item-leading-chip-smartness-test`
- `itemLeadingChipSize` → Class: `input-menu-item-leading-chip-size-smartness-test`
- `itemTrailing` → Class: `input-menu-item-trailing-smartness-test`
- `itemTrailingIcon` → Class: `input-menu-item-trailing-icon-smartness-test`
- `itemLabel` → Class: `input-menu-item-label-smartness-test`
- `tagsItem` → Class: `input-menu-tags-item-smartness-test`
- `tagsItemText` → Class: `input-menu-tags-item-text-smartness-test`
- `tagsItemDelete` → Class: `input-menu-tags-item-delete-smartness-test`
- `tagsItemDeleteIcon` → Class: `input-menu-tags-item-delete-icon-smartness-test`
- `tagsInput` → Class: `input-menu-tags-input-smartness-test`

**app.config.ts Example**:
```typescript
inputMenu: {
  slots: {
    root: 'input-menu-root-smartness-test',
    base: 'input-menu-base-smartness-test',
    leading: 'input-menu-leading-smartness-test',
    leadingIcon: 'input-menu-leading-icon-smartness-test',
    leadingAvatar: 'input-menu-leading-avatar-smartness-test',
    leadingAvatarSize: 'input-menu-leading-avatar-size-smartness-test',
    trailing: 'input-menu-trailing-smartness-test',
    trailingIcon: 'input-menu-trailing-icon-smartness-test',
    arrow: 'input-menu-arrow-smartness-test',
    content: 'input-menu-content-smartness-test',
    viewport: 'input-menu-viewport-smartness-test',
    group: 'input-menu-group-smartness-test',
    empty: 'input-menu-empty-smartness-test',
    label: 'input-menu-label-smartness-test',
    separator: 'input-menu-separator-smartness-test',
    item: 'input-menu-item-smartness-test',
    itemLeadingIcon: 'input-menu-item-leading-icon-smartness-test',
    itemLeadingAvatar: 'input-menu-item-leading-avatar-smartness-test',
    itemLeadingAvatarSize: 'input-menu-item-leading-avatar-size-smartness-test',
    itemLeadingChip: 'input-menu-item-leading-chip-smartness-test',
    itemLeadingChipSize: 'input-menu-item-leading-chip-size-smartness-test',
    itemTrailing: 'input-menu-item-trailing-smartness-test',
    itemTrailingIcon: 'input-menu-item-trailing-icon-smartness-test',
    itemLabel: 'input-menu-item-label-smartness-test',
    tagsItem: 'input-menu-tags-item-smartness-test',
    tagsItemText: 'input-menu-tags-item-text-smartness-test',
    tagsItemDelete: 'input-menu-tags-item-delete-smartness-test',
    tagsItemDeleteIcon: 'input-menu-tags-item-delete-icon-smartness-test',
    tagsInput: 'input-menu-tags-input-smartness-test'
  }
}
```

---

### InputNumber
**Component**: `UInputNumber`

**Vue Template Slots**: `#increment`, `#decrement`

**UI Config Keys** (for `app.config.ts`):
- `root` → Class: `input-number-root-smartness-test`
- `base` → Class: `input-number-base-smartness-test`
- `increment` → Class: `input-number-increment-smartness-test`
- `decrement` → Class: `input-number-decrement-smartness-test`

**app.config.ts Example**:
```typescript
inputNumber: {
  slots: {
    root: 'input-number-root-smartness-test',
    base: 'input-number-base-smartness-test',
    increment: 'input-number-increment-smartness-test',
    decrement: 'input-number-decrement-smartness-test'
  }
}
```

---

### PinInput
**Component**: `UPinInput`

**Slots**: _No slots available_

---

### Select
**Component**: `USelect`

**Slots**:
- `leading` → Class: `select-leading-smartness-test`
- `default` → Class: `select-default-smartness-test`
- `trailing` → Class: `select-trailing-smartness-test`
- `item` → Class: `select-item-smartness-test`
- `item-leading` → Class: `select-item-leading-smartness-test`
- `item-label` → Class: `select-item-label-smartness-test`
- `item-trailing` → Class: `select-item-trailing-smartness-test`
- `content-top` → Class: `select-content-top-smartness-test`
- `content-bottom` → Class: `select-content-bottom-smartness-test`

**app.config.ts Example**:
```typescript
select: {
  slots: {
    leading: 'select-leading-smartness-test',
    default: 'select-default-smartness-test',
    trailing: 'select-trailing-smartness-test',
    item: 'select-item-smartness-test',
    'item-leading': 'select-item-leading-smartness-test',
    'item-label': 'select-item-label-smartness-test',
    'item-trailing': 'select-item-trailing-smartness-test',
    'content-top': 'select-content-top-smartness-test',
    'content-bottom': 'select-content-bottom-smartness-test'
  }
}
```

---

### SelectMenu
**Component**: `USelectMenu`

**Slots**:
- `leading` → Class: `select-menu-leading-smartness-test`
- `default` → Class: `select-menu-default-smartness-test`
- `trailing` → Class: `select-menu-trailing-smartness-test`
- `empty` → Class: `select-menu-empty-smartness-test`
- `item` → Class: `select-menu-item-smartness-test`
- `item-leading` → Class: `select-menu-item-leading-smartness-test`
- `item-label` → Class: `select-menu-item-label-smartness-test`
- `item-trailing` → Class: `select-menu-item-trailing-smartness-test`
- `content-top` → Class: `select-menu-content-top-smartness-test`
- `content-bottom` → Class: `select-menu-content-bottom-smartness-test`
- `create-item-label` → Class: `select-menu-create-item-label-smartness-test`

**app.config.ts Example**:
```typescript
selectMenu: {
  slots: {
    leading: 'select-menu-leading-smartness-test',
    default: 'select-menu-default-smartness-test',
    trailing: 'select-menu-trailing-smartness-test',
    empty: 'select-menu-empty-smartness-test',
    item: 'select-menu-item-smartness-test',
    'item-leading': 'select-menu-item-leading-smartness-test',
    'item-label': 'select-menu-item-label-smartness-test',
    'item-trailing': 'select-menu-item-trailing-smartness-test',
    'content-top': 'select-menu-content-top-smartness-test',
    'content-bottom': 'select-menu-content-bottom-smartness-test',
    'create-item-label': 'select-menu-create-item-label-smartness-test'
  }
}
```

---

### Slider
**Component**: `USlider`

**Slots**: _No slots available_

---

### ContentNavigation

**Component**: `UContentNavigation`

**Slots**:
- `link` → Class: `content-navigation-link-smartness-test`
- `link-leading` → Class: `content-navigation-link-leading-smartness-test`
- `link-title` → Class: `content-navigation-link-title-smartness-test`
- `link-trailing` → Class: `content-navigation-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
contentNavigation: {
  slots: {
    link: 'content-navigation-link-smartness-test',
    'link-leading': 'content-navigation-link-leading-smartness-test',
    'link-title': 'content-navigation-link-title-smartness-test',
    'link-trailing': 'content-navigation-link-trailing-smartness-test'
  }
}
```

---

## Remaining Components (Placeholder)

The following components need their slot information verified from the GitHub source:

### Content Components

### ContentSearch

**Component**: `UContentSearch`

**Slots**:
- `empty` → Class: `content-search-empty-smartness-test`
- `footer` → Class: `content-search-footer-smartness-test`
- `back` → Class: `content-search-back-smartness-test`
- `close` → Class: `content-search-close-smartness-test`
- `item` → Class: `content-search-item-smartness-test`
- `item-leading` → Class: `content-search-item-leading-smartness-test`
- `item-label` → Class: `content-search-item-label-smartness-test`
- `item-trailing` → Class: `content-search-item-trailing-smartness-test`
- `content` → Class: `content-search-content-smartness-test`

**app.config.ts Example**:
```typescript
contentSearch: {
  slots: {
    empty: 'content-search-empty-smartness-test',
    footer: 'content-search-footer-smartness-test',
    back: 'content-search-back-smartness-test',
    close: 'content-search-close-smartness-test',
    item: 'content-search-item-smartness-test',
    'item-leading': 'content-search-item-leading-smartness-test',
    'item-label': 'content-search-item-label-smartness-test',
    'item-trailing': 'content-search-item-trailing-smartness-test',
    content: 'content-search-content-smartness-test'
  }
}
```

---

### ContentSearchButton

**Component**: `UContentSearchButton`

**Slots**:
- `leading` → Class: `content-search-button-leading-smartness-test`
- `default` → Class: `content-search-button-default-smartness-test`
- `trailing` → Class: `content-search-button-trailing-smartness-test`

**app.config.ts Example**:
```typescript
contentSearchButton: {
  slots: {
    leading: 'content-search-button-leading-smartness-test',
    default: 'content-search-button-default-smartness-test',
    trailing: 'content-search-button-trailing-smartness-test'
  }
}
```

---

### ContentSurround

**Component**: `UContentSurround`

**Slots**:
- `link` → Class: `content-surround-link-smartness-test`
- `link-leading` → Class: `content-surround-link-leading-smartness-test`
- `link-title` → Class: `content-surround-link-title-smartness-test`
- `link-description` → Class: `content-surround-link-description-smartness-test`

**app.config.ts Example**:
```typescript
contentSurround: {
  slots: {
    link: 'content-surround-link-smartness-test',
    'link-leading': 'content-surround-link-leading-smartness-test',
    'link-title': 'content-surround-link-title-smartness-test',
    'link-description': 'content-surround-link-description-smartness-test'
  }
}
```

---

### ContentToc

**Component**: `UContentToc`

**Slots**:
- `leading` → Class: `content-toc-leading-smartness-test`
- `default` → Class: `content-toc-default-smartness-test`
- `trailing` → Class: `content-toc-trailing-smartness-test`
- `content` → Class: `content-toc-content-smartness-test`
- `link` → Class: `content-toc-link-smartness-test`
- `top` → Class: `content-toc-top-smartness-test`
- `bottom` → Class: `content-toc-bottom-smartness-test`

**app.config.ts Example**:
```typescript
contentToc: {
  slots: {
    leading: 'content-toc-leading-smartness-test',
    default: 'content-toc-default-smartness-test',
    trailing: 'content-toc-trailing-smartness-test',
    content: 'content-toc-content-smartness-test',
    link: 'content-toc-link-smartness-test',
    top: 'content-toc-top-smartness-test',
    bottom: 'content-toc-bottom-smartness-test'
  }
}
```

---

### ContextMenu

**Component**: `UContextMenu`

**Slots**:
- `default` → Class: `context-menu-default-smartness-test`
- `item` → Class: `context-menu-item-smartness-test`
- `item-leading` → Class: `context-menu-item-leading-smartness-test`
- `item-label` → Class: `context-menu-item-label-smartness-test`
- `item-trailing` → Class: `context-menu-item-trailing-smartness-test`
- `content-top` → Class: `context-menu-content-top-smartness-test`
- `content-bottom` → Class: `context-menu-content-bottom-smartness-test`

**app.config.ts Example**:
```typescript
contextMenu: {
  slots: {
    default: 'context-menu-default-smartness-test',
    item: 'context-menu-item-smartness-test',
    'item-leading': 'context-menu-item-leading-smartness-test',
    'item-label': 'context-menu-item-label-smartness-test',
    'item-trailing': 'context-menu-item-trailing-smartness-test',
    'content-top': 'context-menu-content-top-smartness-test',
    'content-bottom': 'context-menu-content-bottom-smartness-test'
  }
}
```

---

### DropdownMenu

**Component**: `UDropdownMenu`

**Slots**:
- `default` → Class: `dropdown-menu-default-smartness-test`
- `item` → Class: `dropdown-menu-item-smartness-test`
- `item-leading` → Class: `dropdown-menu-item-leading-smartness-test`
- `item-label` → Class: `dropdown-menu-item-label-smartness-test`
- `item-trailing` → Class: `dropdown-menu-item-trailing-smartness-test`
- `content-top` → Class: `dropdown-menu-content-top-smartness-test`
- `content-bottom` → Class: `dropdown-menu-content-bottom-smartness-test`

**app.config.ts Example**:
```typescript
dropdownMenu: {
  slots: {
    default: 'dropdown-menu-default-smartness-test',
    item: 'dropdown-menu-item-smartness-test',
    'item-leading': 'dropdown-menu-item-leading-smartness-test',
    'item-label': 'dropdown-menu-item-label-smartness-test',
    'item-trailing': 'dropdown-menu-item-trailing-smartness-test',
    'content-top': 'dropdown-menu-content-top-smartness-test',
    'content-bottom': 'dropdown-menu-content-bottom-smartness-test'
  }
}
```

---

### FooterColumns

**Component**: `UFooterColumns`

**Slots**:
- `left` → Class: `footer-columns-left-smartness-test`
- `default` → Class: `footer-columns-default-smartness-test`
- `right` → Class: `footer-columns-right-smartness-test`
- `column-label` → Class: `footer-columns-column-label-smartness-test`
- `link` → Class: `footer-columns-link-smartness-test`
- `link-leading` → Class: `footer-columns-link-leading-smartness-test`
- `link-label` → Class: `footer-columns-link-label-smartness-test`
- `link-trailing` → Class: `footer-columns-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
footerColumns: {
  slots: {
    left: 'footer-columns-left-smartness-test',
    default: 'footer-columns-default-smartness-test',
    right: 'footer-columns-right-smartness-test',
    'column-label': 'footer-columns-column-label-smartness-test',
    link: 'footer-columns-link-smartness-test',
    'link-leading': 'footer-columns-link-leading-smartness-test',
    'link-label': 'footer-columns-link-label-smartness-test',
    'link-trailing': 'footer-columns-link-trailing-smartness-test'
  }
}
```

---

### NavigationMenu

**Component**: `UNavigationMenu`

**Slots**:
- `item` → Class: `navigation-menu-item-smartness-test`
- `item-leading` → Class: `navigation-menu-item-leading-smartness-test`
- `item-label` → Class: `navigation-menu-item-label-smartness-test`
- `item-trailing` → Class: `navigation-menu-item-trailing-smartness-test`
- `item-content` → Class: `navigation-menu-item-content-smartness-test`
- `list-leading` → Class: `navigation-menu-list-leading-smartness-test`
- `list-trailing` → Class: `navigation-menu-list-trailing-smartness-test`

**app.config.ts Example**:
```typescript
navigationMenu: {
  slots: {
    item: 'navigation-menu-item-smartness-test',
    'item-leading': 'navigation-menu-item-leading-smartness-test',
    'item-label': 'navigation-menu-item-label-smartness-test',
    'item-trailing': 'navigation-menu-item-trailing-smartness-test',
    'item-content': 'navigation-menu-item-content-smartness-test',
    'list-leading': 'navigation-menu-list-leading-smartness-test',
    'list-trailing': 'navigation-menu-list-trailing-smartness-test'
  }
}
```

---

### Tabs

**Component**: `UTabs`

**Slots**:
- `leading` → Class: `tabs-leading-smartness-test`
- `default` → Class: `tabs-default-smartness-test`
- `trailing` → Class: `tabs-trailing-smartness-test`
- `content` → Class: `tabs-content-smartness-test`
- `list-leading` → Class: `tabs-list-leading-smartness-test`
- `list-trailing` → Class: `tabs-list-trailing-smartness-test`

**app.config.ts Example**:
```typescript
tabs: {
  slots: {
    leading: 'tabs-leading-smartness-test',
    default: 'tabs-default-smartness-test',
    trailing: 'tabs-trailing-smartness-test',
    content: 'tabs-content-smartness-test',
    'list-leading': 'tabs-list-leading-smartness-test',
    'list-trailing': 'tabs-list-trailing-smartness-test'
  }
}
```

---

### Navigation Components
- **DropdownMenu** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/dropdownMenu.ts
- **FooterColumns** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/footerColumns.ts
- **NavigationMenu** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/navigationMenu.ts
- **Tabs** - Check: https://github.com/nuxt/ui/blob/v4/src/theme/tabs.ts

### Dashboard Components

### DashboardGroup

**Component**: `UDashboardGroup`

**Slots**:
- `default` → Class: `dashboard-group-default-smartness-test`

**app.config.ts Example**:
```typescript
dashboardGroup: {
  slots: {
    default: 'dashboard-group-default-smartness-test'
  }
}
```

---

### DashboardNavbar

**Component**: `UDashboardNavbar`

**Slots**:
- `title` → Class: `dashboard-navbar-title-smartness-test`
- `leading` → Class: `dashboard-navbar-leading-smartness-test`
- `trailing` → Class: `dashboard-navbar-trailing-smartness-test`
- `left` → Class: `dashboard-navbar-left-smartness-test`
- `default` → Class: `dashboard-navbar-default-smartness-test`
- `right` → Class: `dashboard-navbar-right-smartness-test`
- `toggle` → Class: `dashboard-navbar-toggle-smartness-test`

**app.config.ts Example**:
```typescript
dashboardNavbar: {
  slots: {
    title: 'dashboard-navbar-title-smartness-test',
    leading: 'dashboard-navbar-leading-smartness-test',
    trailing: 'dashboard-navbar-trailing-smartness-test',
    left: 'dashboard-navbar-left-smartness-test',
    default: 'dashboard-navbar-default-smartness-test',
    right: 'dashboard-navbar-right-smartness-test',
    toggle: 'dashboard-navbar-toggle-smartness-test'
  }
}
```

---

### DashboardPanel

**Component**: `UDashboardPanel`

**Slots**:
- `default` → Class: `dashboard-panel-default-smartness-test`
- `header` → Class: `dashboard-panel-header-smartness-test`
- `body` → Class: `dashboard-panel-body-smartness-test`
- `footer` → Class: `dashboard-panel-footer-smartness-test`
- `resize-handle` → Class: `dashboard-panel-resize-handle-smartness-test`

**app.config.ts Example**:
```typescript
dashboardPanel: {
  slots: {
    default: 'dashboard-panel-default-smartness-test',
    header: 'dashboard-panel-header-smartness-test',
    body: 'dashboard-panel-body-smartness-test',
    footer: 'dashboard-panel-footer-smartness-test',
    'resize-handle': 'dashboard-panel-resize-handle-smartness-test'
  }
}
```

---

### DashboardResizeHandle

**Component**: `UDashboardResizeHandle`

**Slots**:
- `default` → Class: `dashboard-resize-handle-default-smartness-test`

**app.config.ts Example**:
```typescript
dashboardResizeHandle: {
  slots: {
    default: 'dashboard-resize-handle-default-smartness-test'
  }
}
```

---

### DashboardSearch

**Component**: `UDashboardSearch`

**Slots**:
- `empty` → Class: `dashboard-search-empty-smartness-test`
- `footer` → Class: `dashboard-search-footer-smartness-test`
- `back` → Class: `dashboard-search-back-smartness-test`
- `close` → Class: `dashboard-search-close-smartness-test`
- `item` → Class: `dashboard-search-item-smartness-test`
- `item-leading` → Class: `dashboard-search-item-leading-smartness-test`
- `item-label` → Class: `dashboard-search-item-label-smartness-test`
- `item-trailing` → Class: `dashboard-search-item-trailing-smartness-test`
- `content` → Class: `dashboard-search-content-smartness-test`

**app.config.ts Example**:
```typescript
dashboardSearch: {
  slots: {
    empty: 'dashboard-search-empty-smartness-test',
    footer: 'dashboard-search-footer-smartness-test',
    back: 'dashboard-search-back-smartness-test',
    close: 'dashboard-search-close-smartness-test',
    item: 'dashboard-search-item-smartness-test',
    'item-leading': 'dashboard-search-item-leading-smartness-test',
    'item-label': 'dashboard-search-item-label-smartness-test',
    'item-trailing': 'dashboard-search-item-trailing-smartness-test',
    content: 'dashboard-search-content-smartness-test'
  }
}
```

---

### DashboardSearchButton

**Component**: `UDashboardSearchButton`

**Slots**:
- `leading` → Class: `dashboard-search-button-leading-smartness-test`
- `default` → Class: `dashboard-search-button-default-smartness-test`
- `trailing` → Class: `dashboard-search-button-trailing-smartness-test`

**app.config.ts Example**:
```typescript
dashboardSearchButton: {
  slots: {
    leading: 'dashboard-search-button-leading-smartness-test',
    default: 'dashboard-search-button-default-smartness-test',
    trailing: 'dashboard-search-button-trailing-smartness-test'
  }
}
```

---

### DashboardSidebar

**Component**: `UDashboardSidebar`

**Slots**:
- `header` → Class: `dashboard-sidebar-header-smartness-test`
- `default` → Class: `dashboard-sidebar-default-smartness-test`
- `footer` → Class: `dashboard-sidebar-footer-smartness-test`
- `toggle` → Class: `dashboard-sidebar-toggle-smartness-test`
- `content` → Class: `dashboard-sidebar-content-smartness-test`
- `resize-handle` → Class: `dashboard-sidebar-resize-handle-smartness-test`

**app.config.ts Example**:
```typescript
dashboardSidebar: {
  slots: {
    header: 'dashboard-sidebar-header-smartness-test',
    default: 'dashboard-sidebar-default-smartness-test',
    footer: 'dashboard-sidebar-footer-smartness-test',
    toggle: 'dashboard-sidebar-toggle-smartness-test',
    content: 'dashboard-sidebar-content-smartness-test',
    'resize-handle': 'dashboard-sidebar-resize-handle-smartness-test'
  }
}
```

---

### DashboardSidebarCollapse

**Component**: `UDashboardSidebarCollapse`

**Slots**: _None_ (Button component with no customizable slots)

---

### DashboardSidebarToggle

**Component**: `UDashboardSidebarToggle`

**Slots**: _None_ (Button component with no customizable slots)

---

### DashboardToolbar

**Component**: `UDashboardToolbar`

**Slots**:
- `default` → Class: `dashboard-toolbar-default-smartness-test`
- `left` → Class: `dashboard-toolbar-left-smartness-test`
- `right` → Class: `dashboard-toolbar-right-smartness-test`

**app.config.ts Example**:
```typescript
dashboardToolbar: {
  slots: {
    default: 'dashboard-toolbar-default-smartness-test',
    left: 'dashboard-toolbar-left-smartness-test',
    right: 'dashboard-toolbar-right-smartness-test'
  }
}
```

---

### Data Components

### Table

**Component**: `UTable`

**Slots**:
- `expanded` → Class: `table-expanded-smartness-test`
- `empty` → Class: `table-empty-smartness-test`
- `loading` → Class: `table-loading-smartness-test`
- `caption` → Class: `table-caption-smartness-test`
- `body-top` → Class: `table-body-top-smartness-test`
- `body-bottom` → Class: `table-body-bottom-smartness-test`

**app.config.ts Example**:
```typescript
table: {
  slots: {
    expanded: 'table-expanded-smartness-test',
    empty: 'table-empty-smartness-test',
    loading: 'table-loading-smartness-test',
    caption: 'table-caption-smartness-test',
    'body-top': 'table-body-top-smartness-test',
    'body-bottom': 'table-body-bottom-smartness-test'
  }
}
```

---

### Tree

**Component**: `UTree`

**Slots**:
- `item-wrapper` → Class: `tree-item-wrapper-smartness-test`
- `item` → Class: `tree-item-smartness-test`
- `item-leading` → Class: `tree-item-leading-smartness-test`
- `item-label` → Class: `tree-item-label-smartness-test`
- `item-trailing` → Class: `tree-item-trailing-smartness-test`

**app.config.ts Example**:
```typescript
tree: {
  slots: {
    'item-wrapper': 'tree-item-wrapper-smartness-test',
    item: 'tree-item-smartness-test',
    'item-leading': 'tree-item-leading-smartness-test',
    'item-label': 'tree-item-label-smartness-test',
    'item-trailing': 'tree-item-trailing-smartness-test'
  }
}
```

---

### Page Components

### Page

**Component**: `UPage`

**Slots**:
- `left` → Class: `page-left-smartness-test`
- `default` → Class: `page-default-smartness-test`
- `right` → Class: `page-right-smartness-test`

**app.config.ts Example**:
```typescript
page: {
  slots: {
    left: 'page-left-smartness-test',
    default: 'page-default-smartness-test',
    right: 'page-right-smartness-test'
  }
}
```

---

### PageAnchors

**Component**: `UPageAnchors`

**Slots**:
- `link` → Class: `page-anchors-link-smartness-test`
- `link-leading` → Class: `page-anchors-link-leading-smartness-test`
- `link-label` → Class: `page-anchors-link-label-smartness-test`
- `link-trailing` → Class: `page-anchors-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
pageAnchors: {
  slots: {
    link: 'page-anchors-link-smartness-test',
    'link-leading': 'page-anchors-link-leading-smartness-test',
    'link-label': 'page-anchors-link-label-smartness-test',
    'link-trailing': 'page-anchors-link-trailing-smartness-test'
  }
}
```

---

### PageAside

**Component**: `UPageAside`

**Slots**:
- `top` → Class: `page-aside-top-smartness-test`
- `default` → Class: `page-aside-default-smartness-test`
- `bottom` → Class: `page-aside-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageAside: {
  slots: {
    top: 'page-aside-top-smartness-test',
    default: 'page-aside-default-smartness-test',
    bottom: 'page-aside-bottom-smartness-test'
  }
}
```

---

### PageBody

**Component**: `UPageBody`

**Slots**:
- `default` → Class: `page-body-default-smartness-test`

**app.config.ts Example**:
```typescript
pageBody: {
  slots: {
    default: 'page-body-default-smartness-test'
  }
}
```

---

### PageCard

**Component**: `UPageCard`

**Slots**:
- `header` → Class: `page-card-header-smartness-test`
- `body` → Class: `page-card-body-smartness-test`
- `leading` → Class: `page-card-leading-smartness-test`
- `title` → Class: `page-card-title-smartness-test`
- `description` → Class: `page-card-description-smartness-test`
- `footer` → Class: `page-card-footer-smartness-test`
- `default` → Class: `page-card-default-smartness-test`

**app.config.ts Example**:
```typescript
pageCard: {
  slots: {
    header: 'page-card-header-smartness-test',
    body: 'page-card-body-smartness-test',
    leading: 'page-card-leading-smartness-test',
    title: 'page-card-title-smartness-test',
    description: 'page-card-description-smartness-test',
    footer: 'page-card-footer-smartness-test',
    default: 'page-card-default-smartness-test'
  }
}
```

---

### PageColumns

**Component**: `UPageColumns`

**Slots**:
- `default` → Class: `page-columns-default-smartness-test`

**app.config.ts Example**:
```typescript
pageColumns: {
  slots: {
    default: 'page-columns-default-smartness-test'
  }
}
```

---

### PageCTA

**Component**: `UPageCTA`

**Slots**:
- `top` → Class: `page-cta-top-smartness-test`
- `header` → Class: `page-cta-header-smartness-test`
- `title` → Class: `page-cta-title-smartness-test`
- `description` → Class: `page-cta-description-smartness-test`
- `body` → Class: `page-cta-body-smartness-test`
- `footer` → Class: `page-cta-footer-smartness-test`
- `links` → Class: `page-cta-links-smartness-test`
- `default` → Class: `page-cta-default-smartness-test`
- `bottom` → Class: `page-cta-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageCta: {
  slots: {
    top: 'page-cta-top-smartness-test',
    header: 'page-cta-header-smartness-test',
    title: 'page-cta-title-smartness-test',
    description: 'page-cta-description-smartness-test',
    body: 'page-cta-body-smartness-test',
    footer: 'page-cta-footer-smartness-test',
    links: 'page-cta-links-smartness-test',
    default: 'page-cta-default-smartness-test',
    bottom: 'page-cta-bottom-smartness-test'
  }
}
```

---

### PageFeature

**Component**: `UPageFeature`

**Slots**:
- `leading` → Class: `page-feature-leading-smartness-test`
- `title` → Class: `page-feature-title-smartness-test`
- `description` → Class: `page-feature-description-smartness-test`
- `default` → Class: `page-feature-default-smartness-test`

**app.config.ts Example**:
```typescript
pageFeature: {
  slots: {
    leading: 'page-feature-leading-smartness-test',
    title: 'page-feature-title-smartness-test',
    description: 'page-feature-description-smartness-test',
    default: 'page-feature-default-smartness-test'
  }
}
```

---

### PageGrid

**Component**: `UPageGrid`

**Slots**:
- `default` → Class: `page-grid-default-smartness-test`

**app.config.ts Example**:
```typescript
pageGrid: {
  slots: {
    default: 'page-grid-default-smartness-test'
  }
}
```

---

### PageHeader

**Component**: `UPageHeader`

**Slots**:
- `headline` → Class: `page-header-headline-smartness-test`
- `title` → Class: `page-header-title-smartness-test`
- `description` → Class: `page-header-description-smartness-test`
- `links` → Class: `page-header-links-smartness-test`
- `default` → Class: `page-header-default-smartness-test`

**app.config.ts Example**:
```typescript
pageHeader: {
  slots: {
    headline: 'page-header-headline-smartness-test',
    title: 'page-header-title-smartness-test',
    description: 'page-header-description-smartness-test',
    links: 'page-header-links-smartness-test',
    default: 'page-header-default-smartness-test'
  }
}
```

---

### PageHero

**Component**: `UPageHero`

**Slots**:
- `top` → Class: `page-hero-top-smartness-test`
- `header` → Class: `page-hero-header-smartness-test`
- `headline` → Class: `page-hero-headline-smartness-test`
- `title` → Class: `page-hero-title-smartness-test`
- `description` → Class: `page-hero-description-smartness-test`
- `body` → Class: `page-hero-body-smartness-test`
- `footer` → Class: `page-hero-footer-smartness-test`
- `links` → Class: `page-hero-links-smartness-test`
- `default` → Class: `page-hero-default-smartness-test`
- `bottom` → Class: `page-hero-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageHero: {
  slots: {
    top: 'page-hero-top-smartness-test',
    header: 'page-hero-header-smartness-test',
    headline: 'page-hero-headline-smartness-test',
    title: 'page-hero-title-smartness-test',
    description: 'page-hero-description-smartness-test',
    body: 'page-hero-body-smartness-test',
    footer: 'page-hero-footer-smartness-test',
    links: 'page-hero-links-smartness-test',
    default: 'page-hero-default-smartness-test',
    bottom: 'page-hero-bottom-smartness-test'
  }
}
```

---

### PageLinks

**Component**: `UPageLinks`

**Slots**:
- `title` → Class: `page-links-title-smartness-test`
- `link` → Class: `page-links-link-smartness-test`
- `link-leading` → Class: `page-links-link-leading-smartness-test`
- `link-label` → Class: `page-links-link-label-smartness-test`
- `link-trailing` → Class: `page-links-link-trailing-smartness-test`

**app.config.ts Example**:
```typescript
pageLinks: {
  slots: {
    title: 'page-links-title-smartness-test',
    link: 'page-links-link-smartness-test',
    'link-leading': 'page-links-link-leading-smartness-test',
    'link-label': 'page-links-link-label-smartness-test',
    'link-trailing': 'page-links-link-trailing-smartness-test'
  }
}
```

---

### PageList

**Component**: `UPageList`

**Slots**:
- `default` → Class: `page-list-default-smartness-test`

**app.config.ts Example**:
```typescript
pageList: {
  slots: {
    default: 'page-list-default-smartness-test'
  }
}
```

---

### PageLogos

**Component**: `UPageLogos`

**Slots**:
- `default` → Class: `page-logos-default-smartness-test`

**app.config.ts Example**:
```typescript
pageLogos: {
  slots: {
    default: 'page-logos-default-smartness-test'
  }
}
```

---

### PageSection

**Component**: `UPageSection`

**Slots**:
- `top` → Class: `page-section-top-smartness-test`
- `header` → Class: `page-section-header-smartness-test`
- `leading` → Class: `page-section-leading-smartness-test`
- `headline` → Class: `page-section-headline-smartness-test`
- `title` → Class: `page-section-title-smartness-test`
- `description` → Class: `page-section-description-smartness-test`
- `body` → Class: `page-section-body-smartness-test`
- `features` → Class: `page-section-features-smartness-test`
- `footer` → Class: `page-section-footer-smartness-test`
- `links` → Class: `page-section-links-smartness-test`
- `default` → Class: `page-section-default-smartness-test`
- `bottom` → Class: `page-section-bottom-smartness-test`

**app.config.ts Example**:
```typescript
pageSection: {
  slots: {
    top: 'page-section-top-smartness-test',
    header: 'page-section-header-smartness-test',
    leading: 'page-section-leading-smartness-test',
    headline: 'page-section-headline-smartness-test',
    title: 'page-section-title-smartness-test',
    description: 'page-section-description-smartness-test',
    body: 'page-section-body-smartness-test',
    features: 'page-section-features-smartness-test',
    footer: 'page-section-footer-smartness-test',
    links: 'page-section-links-smartness-test',
    default: 'page-section-default-smartness-test',
    bottom: 'page-section-bottom-smartness-test'
  }
}
```

---

### Pricing Components

### PricingPlan

**Component**: `UPricingPlan`

**Slots**:
- `badge` → Class: `pricing-plan-badge-smartness-test`
- `title` → Class: `pricing-plan-title-smartness-test`
- `description` → Class: `pricing-plan-description-smartness-test`
- `price` → Class: `pricing-plan-price-smartness-test`
- `discount` → Class: `pricing-plan-discount-smartness-test`
- `billing` → Class: `pricing-plan-billing-smartness-test`
- `features` → Class: `pricing-plan-features-smartness-test`
- `button` → Class: `pricing-plan-button-smartness-test`
- `header` → Class: `pricing-plan-header-smartness-test`
- `body` → Class: `pricing-plan-body-smartness-test`
- `footer` → Class: `pricing-plan-footer-smartness-test`
- `tagline` → Class: `pricing-plan-tagline-smartness-test`
- `terms` → Class: `pricing-plan-terms-smartness-test`

**app.config.ts Example**:
```typescript
pricingPlan: {
  slots: {
    badge: 'pricing-plan-badge-smartness-test',
    title: 'pricing-plan-title-smartness-test',
    description: 'pricing-plan-description-smartness-test',
    price: 'pricing-plan-price-smartness-test',
    discount: 'pricing-plan-discount-smartness-test',
    billing: 'pricing-plan-billing-smartness-test',
    features: 'pricing-plan-features-smartness-test',
    button: 'pricing-plan-button-smartness-test',
    header: 'pricing-plan-header-smartness-test',
    body: 'pricing-plan-body-smartness-test',
    footer: 'pricing-plan-footer-smartness-test',
    tagline: 'pricing-plan-tagline-smartness-test',
    terms: 'pricing-plan-terms-smartness-test'
  }
}
```

---

### PricingPlans

**Component**: `UPricingPlans`

**Slots**:
- `default` → Class: `pricing-plans-default-smartness-test`

**app.config.ts Example**:
```typescript
pricingPlans: {
  slots: {
    default: 'pricing-plans-default-smartness-test'
  }
}
```

---

## How to Find Slot Information

For components not yet documented, follow these steps:

1. **Visit the GitHub source**: https://github.com/nuxt/ui/tree/v4/src/theme
2. **Find the component file**: Navigate to the specific component's TypeScript file (e.g., `button.ts`)
3. **Look for `slots` definition**: Search for the `slots` key in the component's configuration
4. **Extract slot names**: The keys under `slots` are the available slot names

Example from `button.ts`:
```typescript
export default {
	slots: {
		base: "",
		label: "",
		leadingIcon: "",
		leadingAvatar: "",
		leadingAvatarSize: "",
		trailingIcon: ""
	}
};
```

5. **Apply the naming convention**: For each slot found, create a class name following the pattern: `[component]-[slot]-smartness-test`

---

## Complete app.config.ts Template

Here's a starting template for your `app.config.ts`:

```typescript
export default defineAppConfig({
	ui: {
		accordion: {
			slots: {
				leading: "accordion-leading-smartness-test",
				default: "accordion-default-smartness-test",
				trailing: "accordion-trailing-smartness-test",
				content: "accordion-content-smartness-test",
				body: "accordion-body-smartness-test"
			}
		},
		alert: {
			slots: {
				leading: "alert-leading-smartness-test",
				title: "alert-title-smartness-test",
				description: "alert-description-smartness-test",
				actions: "alert-actions-smartness-test",
				close: "alert-close-smartness-test"
			}
		}
		// Add more components following the same pattern...
	}
});
```

---

## Notes

1. **Verification Required**: Some components couldn't be fully documented due to API response size limits. Please verify these against the GitHub source.

2. **Dynamic Slots**: Some components may have dynamic slots or conditional slots based on props. Check the component documentation for specific behavior.

3. **Theme Integration**: These classes are applied through the `ui` prop system in NuxtUI. Make sure your configuration is properly merged with the default theme.

4. **Testing**: After applying these classes, test that they appear in your rendered HTML by inspecting the elements in your browser's dev tools.

5. **Updates**: As NuxtUI evolves, new slots may be added or existing ones modified. Always cross-reference with the official documentation and source code.

---

## Resources

- **NuxtUI Documentation**: https://ui.nuxt.com
- **NuxtUI GitHub Repository**: https://github.com/nuxt/ui
- **NuxtUI Theme Source**: https://github.com/nuxt/ui/tree/v4/src/theme
- **Component Metadata API**: Available through the Nuxt UI Remote MCP server

---

**Last Updated**: 2025-10-13
**NuxtUI Version**: v4
**Document Version**: 1.3.0
