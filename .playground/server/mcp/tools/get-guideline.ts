import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Get the markdown content of a Smartness development guideline (e.g. design-system, development-guidelines, list-filters, multi-step-forms, sortable-tables, tabbed-editing-forms, testids, ui-patterns). Read the relevant guideline before implementing the corresponding feature.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		slug: z.string().describe("The guideline slug (e.g. 'multi-step-forms', 'testids', 'ui-patterns')")
	},
	inputExamples: [
		{ slug: "ui-patterns" },
		{ slug: "multi-step-forms" }
	],
	cache: "30m",
	async handler({ slug }) {
		const event = useEvent();
		const page = await queryCollection(event, "guidelines")
			.where("path", "LIKE", `%/${slug}`)
			.first();

		if (!page) {
			throw createError({ statusCode: 404, message: `Guideline '${slug}' not found.` });
		}

		return {
			title: page.title,
			description: page.description,
			category: page.category,
			tags: page.tags ?? [],
			body: page.body,
			path: page.path
		};
	}
});
