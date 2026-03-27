export interface CachedEntry<T> {
	value: T
	expiry: number
}

export type CacheStore<T> = Record<string, CachedEntry<T>>;

export const EXPIRY_BUFFER_SECONDS = 60;

export function purgeExpired<T>(cache: CacheStore<T>, bufferSeconds = EXPIRY_BUFFER_SECONDS): CacheStore<T> {
	const now = Math.floor(Date.now() / 1000);
	const cleaned: CacheStore<T> = {};
	for (const [key, entry] of Object.entries(cache)) {
		if (entry.expiry - bufferSeconds > now) {
			cleaned[key] = entry;
		}
	}
	return cleaned;
}
