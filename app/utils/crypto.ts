export function sortedStringify(obj: unknown): string {
	if (obj === null || obj === undefined || typeof obj !== "object")
		return JSON.stringify(obj);
	if (Array.isArray(obj))
		return `[${obj.map(sortedStringify).join(",")}]`;
	const sorted = Object.keys(obj as Record<string, unknown>).sort();
	const entries = sorted.map(
		(key) => `${JSON.stringify(key)}:${sortedStringify((obj as Record<string, unknown>)[key])}`
	);
	return `{${entries.join(",")}}`;
}

export async function hashObject(obj: unknown): Promise<string> {
	const serialized = sortedStringify(obj);
	const data = new TextEncoder().encode(serialized);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(digest))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}
