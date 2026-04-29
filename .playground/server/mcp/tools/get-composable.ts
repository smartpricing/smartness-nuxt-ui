import { z } from "zod";
import { queryCollection } from "@nuxt/content/server";

export default defineMcpTool({
	description: "Get the full markdown documentation for a Smartness UI composable.",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		name: z.string().describe("Composable name (e.g. 'useStepperNavigation')")
	},
	inputExamples: [
		{ name: "useStepperNavigation" },
		{ name: "useConfirm" }
	],
	cache: "30m",
	async handler({ name }) {
		const event = useEvent();
		const page = await queryCollection(event, "composables")
			.where("name", "=", name)
			.first();

		if (!page) {
			throw createError({
				statusCode: 404,
				message: `Composable '${name}' not found.`
			});
		}

		return {
			name: page.name,
			title: page.title,
			description: page.description,
			tags: page.tags ?? [],
			body: page.body,
			path: page.path
		};
	}
});
