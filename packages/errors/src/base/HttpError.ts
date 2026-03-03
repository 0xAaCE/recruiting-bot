import { AppError } from './AppError';

/**
 * HTTP-specific error base class
 */
export class HttpError extends AppError {
  constructor(
    message: string,
    statusCode: number,
    context?: Record<string, unknown>
  ) {
    super(message, statusCode, true, context);
  }
}

/**
 * 400 Bad Request
 */
export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request', context?: Record<string, unknown>) {
    super(message, 400, context);
  }
}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized', context?: Record<string, unknown>) {
    super(message, 401, context);
  }
}

/**
 * 403 Forbidden
 */
export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden', context?: Record<string, unknown>) {
    super(message, 403, context);
  }
}

/**
 * 404 Not Found
 */
export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found', context?: Record<string, unknown>) {
    super(message, 404, context);
  }
}

/**
 * 409 Conflict
 */
export class ConflictError extends HttpError {
  constructor(message: string = 'Conflict', context?: Record<string, unknown>) {
    super(message, 409, context);
  }
}

/**
 * 422 Unprocessable Entity
 */
export class ValidationError extends HttpError {
  constructor(message: string = 'Validation Error', context?: Record<string, unknown>) {
    super(message, 422, context);
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal Server Error', context?: Record<string, unknown>) {
    super(message, 500, context);
  }
}

/**
 * 503 Service Unavailable
 */
export class ServiceUnavailableError extends HttpError {
  constructor(message: string = 'Service Unavailable', context?: Record<string, unknown>) {
    super(message, 503, context);
  }
}
