import { z } from "zod";
import { kebabCase } from "scule";
import { queryCollection } from "@nuxt/content/server";
import { normalizeComponentName } from "@@/server/utils/normalizeComponentName";

export default defineMcpTool({
	description: "Get the full markdown documentation for a Smartness UI component, including usage examples, props, slots, and notes.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		componentName: z.string().describe("The component name in any case — 'SStepper', 'stepper', 'UButton', 'button' all work")
	},
	inputExamples: [
		{ componentName: "SStepper" },
		{ componentName: "MultiSelect" },
		{ componentName: "UButton" }
	],
	cache: "30m",
	async handler({ componentName }) {
		const event = useEvent();
		const normalized = normalizeComponentName(componentName);
		const slug = kebabCase(normalized);

		const page = await queryCollection(event, "components")
			.where("componentName", "=", normalized)
			.first()
			?? await queryCollection(event, "components")
				.where("path", "LIKE", `%/${slug}`)
				.first();

		if (!page) {
			throw createError({
				statusCode: 404,
				message: `Component '${componentName}' not found. Use list_components or search_components to discover available components.`
			});
		}

		return {
			name: page.componentName,
			title: page.title,
			description: page.description,
			category: page.category,
			prefix: page.prefix,
			subcomponents: page.subcomponents ?? [],
			tags: page.tags ?? [],
			showcaseSlug: page.showcaseSlug,
			showcaseFile: page.showcaseFile,
			body: page.body,
			path: page.path
		};
	}
});
