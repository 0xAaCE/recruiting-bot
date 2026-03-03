import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Create a Pino logger instance
 * In development: uses pino-pretty for readable output
 * In production: outputs JSON for log aggregation
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: !isProduction
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    }
  }
});

/**
 * Create a child logger with additional context
 * @param context - Additional context to include in all log messages
 * @example
 * const moduleLogger = createLogger({ module: 'auth' });
 * moduleLogger.info('User logged in');
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context);
}

export default logger;
