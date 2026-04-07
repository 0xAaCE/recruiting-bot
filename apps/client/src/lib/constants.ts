/** Base URL for API requests. Empty because Vite's dev proxy handles /api -> localhost:3001 */
export const API_BASE_URL = "";

/** Prefix for all localStorage keys */
export const STORAGE_PREFIX = "recruitai_";

/** localStorage schema version — bump to invalidate stale data on breaking changes */
export const STORAGE_VERSION = 1;

/** Maximum file size in bytes (10MB) */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Maximum number of files per session */
export const MAX_FILES = 5;
