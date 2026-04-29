import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Get the markdown content of a Smartness UI design system documentation page (e.g. colors, typography, ai-learning-gradients, custom-css-variants, locale-integration).",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		slug: z.string().describe("The page slug (e.g. 'colors', 'typography', 'ai-learning-gradients')")
	},
	inputExamples: [
		{ slug: "colors" },
		{ slug: "ai-learning-gradients" }
	],
	cache: "30m",
	async handler({ slug }) {
		const event = useEvent();
		const page = await queryCollection(event, "pages")
			.where("path", "LIKE", `%/${slug}`)
			.first();

		if (!page) {
			throw createError({ statusCode: 404, message: `Documentation page '${slug}' not found.` });
		}

		return {
			title: page.title,
			description: page.description,
			section: page.section,
			tags: page.tags ?? [],
			body: page.body,
			path: page.path
		};
	}
});
