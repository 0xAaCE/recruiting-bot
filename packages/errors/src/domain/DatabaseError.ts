import { AppError } from '../base/AppError';

/**
 * Base error for database operations
 */
export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 500, true, context);
  }
}

/**
 * Error when database connection fails
 */
export class DatabaseConnectionError extends DatabaseError {
  constructor(context?: Record<string, unknown>) {
    super('Failed to connect to database', context);
  }
}

/**
 * Error when database query fails
 */
export class DatabaseQueryError extends DatabaseError {
  constructor(query: string, context?: Record<string, unknown>) {
    super(`Database query failed: ${query}`, { query, ...context });
  }
}

/**
 * Error when database transaction fails
 */
export class DatabaseTransactionError extends DatabaseError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(`Transaction failed: ${message}`, context);
  }
}
