import { z } from "zod";
import { kebabCase, pascalCase } from "scule";
import { extractScriptSetup, extractSectionsFromVue, readShowcaseFile } from "@@/server/utils/showcaseSource";

export default defineMcpTool({
	description: "Get the source code for a specific showcase example section. Pass either { exampleName } (e.g. 'StepperBasicStepper') or { component, sectionId } (e.g. component='Stepper', sectionId='basic-stepper').",
	annotations: {
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false
	},
	inputSchema: {
		exampleName: z.string().optional().describe("Canonical example name in PascalCase, format <ShowcaseFile><SectionId>"),
		component: z.string().optional().describe("Showcase file name (e.g. 'Stepper'). Pair with sectionId."),
		sectionId: z.string().optional().describe("Section id from the showcase file (e.g. 'basic-stepper'). Pair with component."),
		includeScript: z.boolean().optional().default(true).describe("Include the showcase file <script setup> block alongside the section markup")
	},
	inputExamples: [
		{ exampleName: "StepperBasicStepper" },
		{ component: "MultiSelect", sectionId: "select-all" }
	],
	cache: "30m",
	async handler({ exampleName, component, sectionId, includeScript = true }) {
		let showcaseFile: string | undefined;
		let targetId: string | undefined;

		if (exampleName) {
			const { file, id } = splitExampleName(exampleName);
			showcaseFile = file;
			targetId = id;
		}

		if (component && sectionId) {
			showcaseFile = pascalCase(component);
			targetId = sectionId;
		}

		if (!showcaseFile || !targetId) {
			throw createError({ statusCode: 400, message: "Provide either { exampleName } or { component, sectionId }." });
		}

		let source: string;
		try {
			source = await readShowcaseFile(showcaseFile);
		} catch {
			throw createError({ statusCode: 404, message: `Showcase file '${showcaseFile}.vue' not found.` });
		}

		const sections = extractSectionsFromVue(source);
		const section = sections.find((s) => s.id === targetId);

		if (!section) {
			const available = sections.map((s) => s.id).join(", ");
			throw createError({
				statusCode: 404,
				message: `Section '${targetId}' not found in '${showcaseFile}.vue'. Available sections: ${available || "(none)"}`
			});
		}

		const scriptSetup = includeScript ? extractScriptSetup(source) : null;

		const code = [
			"<template>",
			indent(section.innerHtml, 1),
			"</template>",
			scriptSetup ? `\n${scriptSetup}` : ""
		].filter(Boolean).join("\n");

		return {
			exampleName: exampleName ?? `${showcaseFile}${pascalCase(targetId)}`,
			component: showcaseFile,
			sectionId: targetId,
			showcaseFile: `app/components/Showcase/${showcaseFile}.vue`,
			code
		};
	}
});

function splitExampleName(name: string): { file: string, id: string } {
	const match = name.match(/^([A-Z][a-zA-Z]*?)([A-Z][a-zA-Z0-9]*)$/);
	if (match && match[1] && match[2]) {
		return { file: match[1], id: kebabCase(match[2]) };
	}
	return { file: name, id: "" };
}

function indent(text: string, level: number): string {
	const tab = "\t".repeat(level);
	return text.split("\n").map((line) => (line.length ? `${tab}${line}` : line)).join("\n");
}
