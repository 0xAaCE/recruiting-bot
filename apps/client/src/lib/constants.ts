/** Base URL for API requests. Empty in dev (Vite proxy), set via VITE_API_BASE_URL in production. */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/** Prefix for all localStorage keys */
export const STORAGE_PREFIX = "hiro_";

/** localStorage schema version — bump to invalidate stale data on breaking changes */
export const STORAGE_VERSION = 1;

/** Maximum file size in bytes (10MB) */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Maximum number of files per session */
export const MAX_FILES = 5;
