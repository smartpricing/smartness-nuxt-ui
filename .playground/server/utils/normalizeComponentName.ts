import { pascalCase } from "scule";

export function normalizeComponentName(name: string): string {
	const cleaned = name.replace(/^([SsUu])-?/, "");
	return pascalCase(cleaned);
}
