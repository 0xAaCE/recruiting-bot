import { STORAGE_PREFIX, STORAGE_VERSION } from "./constants";

function prefixedKey(key: string): string {
    return `${STORAGE_PREFIX}v${STORAGE_VERSION}_${key}`;
}

export function getItem<T>(key: string): T | null {
    try {
        const raw = localStorage.getItem(prefixedKey(key));
        if (raw === null) return null;
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

export function setItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(prefixedKey(key), JSON.stringify(value));
    } catch {
        // localStorage may be full or unavailable
    }
}

export function removeItem(key: string): void {
    try {
        localStorage.removeItem(prefixedKey(key));
    } catch {
        // localStorage may be unavailable
    }
}

export function clearAll(): void {
    try {
        const prefix = `${STORAGE_PREFIX}v${STORAGE_VERSION}_`;
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(prefix));
        keys.forEach((k) => localStorage.removeItem(k));
    } catch {
        // localStorage may be unavailable
    }
}
