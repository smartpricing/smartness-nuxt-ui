import type { AreaDataPoint, DataPoint } from "../components/Dataviz/types";

function hashPart(hash: number, value: unknown): number {
	const stringValue = `${typeof value}:${String(value)}`;
	let nextHash = hash;
	for (let i = 0; i < stringValue.length; i++) {
		nextHash ^= stringValue.charCodeAt(i);
		nextHash = Math.imul(nextHash, 16777619);
	}
	return nextHash >>> 0;
}

export function hashDatavizDataPoints(data: DataPoint[]): string {
	let hash = 2166136261;
	for (const point of data) {
		hash = hashPart(hash, point.x);
		hash = hashPart(hash, point.y);
	}
	return `${data.length}:${hash >>> 0}`;
}

export function hashDatavizAreaDataPoints(data: AreaDataPoint[]): string {
	let hash = 2166136261;
	for (const point of data) {
		hash = hashPart(hash, point.x);
		hash = hashPart(hash, point.min);
		hash = hashPart(hash, point.max);
	}
	return `${data.length}:${hash >>> 0}`;
}

export function stableDatavizSignature(value: unknown): string {
	if (value === null)
		return "null";

	if (value === undefined)
		return "undefined";

	if (typeof value === "function")
		return `[function:${value.name || "anonymous"}]`;

	if (typeof value !== "object")
		return `${typeof value}:${String(value)}`;

	if (Array.isArray(value))
		return `[${value.map((item) => stableDatavizSignature(item)).join(",")}]`;

	const record = value as Record<string, unknown>;
	return `{${Object.keys(record)
		.sort()
		.map((key) => `${key}:${stableDatavizSignature(record[key])}`)
		.join(",")}}`;
}
