import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const SHOWCASE_DIR = join(currentDir, "..", "..", "app", "components", "Showcase");

const SECTION_REGEX = /<section\s+id="([^"]+)"[^>]*>[\s\S]*?<\/section>/g;
const SCRIPT_SETUP_REGEX = /<script\s[^>]*setup[^>]*>[\s\S]*?<\/script>/;

export async function readShowcaseFile(name: string): Promise<string> {
	const filePath = join(SHOWCASE_DIR, `${name}.vue`);
	return readFile(filePath, "utf-8");
}

export interface ShowcaseSection {
	id: string
	innerHtml: string
}

export function extractSectionsFromVue(source: string): ShowcaseSection[] {
	const sections: ShowcaseSection[] = [];
	const matches = source.matchAll(SECTION_REGEX);

	for (const match of matches) {
		const id = match[1];
		if (id) {
			sections.push({ id, innerHtml: match[0] });
		}
	}

	return sections;
}

export function extractScriptSetup(source: string): string | null {
	const match = source.match(SCRIPT_SETUP_REGEX);
	return match ? match[0] : null;
}
