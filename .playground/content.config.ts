import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		components: defineCollection({
			type: "page",
			source: "components/*.md",
			schema: z.object({
				title: z.string(),
				description: z.string(),
				category: z.enum(["layout", "navigation", "form", "data", "overlay", "dataviz", "feedback", "typography", "element"]),
				prefix: z.enum(["S", "U"]).default("S"),
				componentName: z.string(),
				showcaseSlug: z.string().optional(),
				showcaseFile: z.string().optional(),
				tags: z.array(z.string()).default([]),
				subcomponents: z.array(z.string()).default([])
			})
		}),
		composables: defineCollection({
			type: "page",
			source: "composables/*.md",
			schema: z.object({
				title: z.string(),
				description: z.string(),
				name: z.string(),
				tags: z.array(z.string()).default([])
			})
		}),
		pages: defineCollection({
			type: "page",
			source: "design-system/*.md",
			schema: z.object({
				title: z.string(),
				description: z.string(),
				section: z.enum(["theme", "tokens", "i18n", "css"]),
				tags: z.array(z.string()).default([])
			})
		})
	}
});
