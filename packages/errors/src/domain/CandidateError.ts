import { AppError } from "../base/AppError.js";

/**
 * Base error for candidate-related operations
 */
export class CandidateError extends AppError {
    constructor(message: string, statusCode: number = 500, context?: Record<string, unknown>) {
        super(message, statusCode, true, context);
    }
}

/**
 * Error when candidate is not found
 */
export class CandidateNotFoundError extends CandidateError {
    constructor(candidateId: string, context?: Record<string, unknown>) {
        super(`Candidate with ID ${candidateId} not found`, 404, { candidateId, ...context });
    }
}

/**
 * Error when candidate already exists
 */
export class CandidateDuplicateError extends CandidateError {
    constructor(email: string, context?: Record<string, unknown>) {
        super(`Candidate with email ${email} already exists`, 409, { email, ...context });
    }
}

/**
 * Error when candidate validation fails
 */
export class CandidateValidationError extends CandidateError {
    constructor(message: string, context?: Record<string, unknown>) {
        super(message, 422, context);
    }
}
