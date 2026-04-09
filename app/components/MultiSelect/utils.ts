import type { MultiSelectItem } from "./types";

export function getItemKey(item: MultiSelectItem): string {
	return item.value ?? item.label ?? "";
}

export function getLeaves(items: MultiSelectItem[]): MultiSelectItem[] {
	const leaves: MultiSelectItem[] = [];
	for (const item of items) {
		if (item.children?.length) {
			leaves.push(...getLeaves(item.children));
		} else {
			leaves.push(item);
		}
	}
	return leaves;
}

export function getLeafKeys(items: MultiSelectItem[]): string[] {
	return getLeaves(items).map(getItemKey);
}

export function getEnabledLeafKeys(items: MultiSelectItem[]): string[] {
	return getLeaves(items)
		.filter((i) => !i.disabled)
		.map(getItemKey);
}

export function findItemsByKeys(
	items: MultiSelectItem[],
	keys: string[]
): MultiSelectItem[] {
	const keySet = new Set(keys);
	const result: MultiSelectItem[] = [];
	function walk(nodes: MultiSelectItem[]) {
		for (const item of nodes) {
			if (keySet.has(getItemKey(item))) {
				result.push(item);
			}
			if (item.children?.length) {
				walk(item.children);
			}
		}
	}
	walk(items);
	return result;
}

export function getAllKeys(items: MultiSelectItem[]): string[] {
	const keys: string[] = [];
	for (const item of items) {
		keys.push(getItemKey(item));
		if (item.children?.length) {
			keys.push(...getAllKeys(item.children));
		}
	}
	return keys;
}

export function getParentChainKeys(
	items: MultiSelectItem[],
	targetKeys: string[]
): string[] {
	const keySet = new Set(targetKeys);
	const parentKeys: string[] = [];
	function walk(nodes: MultiSelectItem[]): boolean {
		let found = false;
		for (const node of nodes) {
			const key = getItemKey(node);
			if (keySet.has(key)) {
				found = true;
			} else if (node.children?.length && walk(node.children)) {
				parentKeys.push(key);
				found = true;
			}
		}
		return found;
	}
	walk(items);
	return parentKeys;
}

export function toggleKey(keys: string[], key: string): string[] {
	return keys.includes(key)
		? keys.filter((k) => k !== key)
		: [...keys, key];
}
