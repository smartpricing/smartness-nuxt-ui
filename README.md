# Smartness Nuxt UI

[![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82.svg)](https://nuxt.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC.svg)](https://tailwindcss.com)

A customizable Nuxt Layer built on top of Nuxt UI v4, featuring the Smartness design system with custom color palettes, typography, and component variants.

## ✨ Features

- **Custom Design System** - Pre-configured with Smartness brand colors and typography
- **Nuxt Layer Architecture** - Easy to integrate into any Nuxt 4 project
- **Compatible** - Fully compatile with the original Smartness UI design system
- **Custom Component Variants** - Component styles with gradient effects
- **TypeScript Ready** - Full TypeScript support out of the box
- **Rich Color Palette** - Primary, secondary, support colors plus specialized variants
- **Responsive Design** - Mobile-first approach with TailwindCSS v4
- **Performance Optimized** - Built for the modern web with Nuxt 4 and Vite
- **Interactive Playground** - Development environment with live preview
- **Highly Customizable** - Override any component style or behavior
- **Modern Dependencies** - Reka UI, VueUse, and latest ecosystem tools

## 🚀 Quick Start

### Standalone installation

Extend the layer to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: [
	["github:smartpricing/smartness-nuxt-ui#v0.1.0"]
  ]
})
```

### Compatibility with current Smartness UI design system

This layer has full compatibility with the current Smartness UI design system.

If intended to use in conjunction with it, just extend the layer to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: [
	["github:smartpricing/smartness-nuxt-ui#v0.1.0"]
  ]

  // Main tailwind file must be renamed to something else than "main.css"
  css: ["@/assets/css/smartness-ui.css"],
})
```

Then in your `smartness-ui.css`:

```css
@import "@dev.smartpricing/smartness-ui/dist/tailwind";
@import "@dev.smartpricing/smartness-ui/dist/smartness-ui";
@import "tailwindcss";
```

In both configurations, Nuxt UI must then be added as peer dependency in your `package.json`:

```json
{
	"peerDependencies": {
		"@nuxt/ui": "^4.0.0-alpha.2"
	}
}

```

## 🎨 Design System

### Color Palette

The layer comes with a comprehensive color system:

```ts
{
  primary: 'petrol-blue',     // Main brand color
  secondary: 'sky',           // Secondary actions
  support: 'warm-gray',       // Secondary brand elements
  burgundy: 'burgundy',       // Accent color
  lemon: 'lemon',            // Highlight color
  info: 'info',              // Information states
  success: 'success',        // Success states
  warning: 'warning',        // Warning states
  error: 'error',            // Error states
  offblack: 'off-black',     // Custom dark color
  learning: 'learning',      // Highlight context
  ai: 'ai'                   // AI features
}
```

### Typography

Built with the custom **Saans** font family:

```css
--font-sans: "Saans", "sans-serif";
```

Includes both regular and italic variants with variable font weights (100-900) with the help of @nuxt/fonts

### Usage of custom components

#### AI Button
```vue
<UButton color="ai">
  AI Feature
</UButton>
```

#### Learning Button
```vue
<UButton color="learning">
  Learning Content
</UButton>
```

## Development Setup

Clone and set up for development:

```bash
git clone https://github.com/smartpricing/smartness-nuxt-ui
cd smartness-nuxt-ui
pnpm install
pnpm dev
```

## 🛠 Tech Stack

- **[Nuxt 4](https://nuxt.com)** - The Intuitive Vue Framework
- **[Nuxt UI v4](https://ui4.nuxt.dev)** - Fully styled and customizable components
- **[TailwindCSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Reka UI](https://reka-ui.com)** - Unstyled, accessible components for Vue
- **[VueUse](https://vueuse.org)** - Collection of essential Vue composition utilities
- **[TypeScript](https://typescriptlang.org)** - Type-safety
- **[ESLint](https://eslint.org)** - Code linting with customized Anthony Fu's config

## 📁 Project Structure

```
smartness-nuxt-ui/
├── .playground/          # Development playground
├── app/                  # Layer application
│   ├── assets/
│   │   ├── css/         # Stylesheets and variables
│   │   └── fonts/       # Custom font files
│   └── app.config.ts    # UI configuration
├── nuxt.config.ts       # Nuxt layer configuration
└── package.json
```

## ⚙️ Configuration

### App Config

To extend and customize the UI, update the layer `app.config.ts`:

```ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'petrol-blue',
      secondary: 'sky'
      // ...
    },
    button: {
      // Create custom button variants
      compoundVariants: [
        {
          color: 'ai',
          variant: 'solid',
          class: 'btn-ai'
        }
      ]
    }
  }
})
```

And the `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
	ui: {
		mdc: true,
		content: true,
		colorMode: false,
		theme: {
			colors: [
				"primary",
				"secondary",
				"support",
				"burgundy",
				"lemon",
				"info",
				"success",
				"warning",
				"error",
				"offblack",
				"learning",
				"ai"
			],
			defaultVariants: {
				color: "secondary"
			}
		}
	}
})
```

### Nuxt Config

The layer automatically configures:

- Nuxt UI with prose (typography) components support
- ESLint with modern configuration
- Font optimization with Nuxt Fonts

## 🎪 Playground

The included playground provides a development environment:

```bash
# Start development server
pnpm dev

# Build playground
pnpm build

# Generate static site
pnpm generate

# Preview built site
pnpm preview
```

## 🔧 Customization

### Override Styles

Create your own CSS variables:

```css
@theme {
  --color-primary: #your-color;
  --ui-radius: 0.5rem;
}
```

### Extend Components

Add your own component variants:

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      compoundVariants: [
        {
          color: 'custom',
          variant: 'solid',
          class: 'bg-custom-500 text-white'
        }
      ]
    }
  }
})
```

## 📦 Dependencies

### Core Dependencies
- `@nuxt/ui` - UI components and styling
- `reka-ui` - Headless UI primitives
- `@vueuse/core` & `@vueuse/nuxt` - Composition utilities
- `@nuxt/fonts` - Font optimization
- `tailwindcss` & `@tailwindcss/vite` - Styling framework
- `zod` - Schema validation

### Development
- `@antfu/eslint-config` - ESLint configuration
- `@nuxt/eslint` - Nuxt ESLint integration
- `nuxt` - Framework
- `typescript` - Type checking

## 🚦 Requirements

- **Node.js** >= 23
- **Package Manager**: pnpm (recommended)

---

## 📚 Documentation

For comprehensive component documentation and examples, visit the [Nuxt UI v4 Documentation](https://ui4.nuxt.dev).

Built with ❤️ by the Smartness team