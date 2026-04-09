import { AppError } from "../base/AppError.js";

/**
 * Base error for AI/LLM-related operations
 */
export class AIError extends AppError {
    constructor(message: string, statusCode: number = 500, context?: Record<string, unknown>) {
        super(message, statusCode, true, context);
    }
}

/**
 * Error when AI model fails to respond
 */
export class AIModelError extends AIError {
    constructor(message: string, context?: Record<string, unknown>) {
        super(`AI model error: ${message}`, 503, context);
    }
}

/**
 * Error when AI API rate limit is exceeded
 */
export class AIRateLimitError extends AIError {
    constructor(context?: Record<string, unknown>) {
        super("AI API rate limit exceeded", 429, context);
    }
}

/**
 * Error when AI API key is invalid or missing
 */
export class AIAuthenticationError extends AIError {
    constructor(context?: Record<string, unknown>) {
        super("AI API authentication failed", 401, context);
    }
}

/**
 * Error when AI response cannot be parsed
 */
export class AIResponseParseError extends AIError {
    constructor(message: string, context?: Record<string, unknown>) {
        super(`Failed to parse AI response: ${message}`, 500, context);
    }
}
