import type { NextFunction, Request, Response } from "express";
import { AppError } from "@repo/errors";
import { logger } from "@repo/utils";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
    const isOperational = err instanceof AppError;
    const statusCode = isOperational ? err.statusCode : 500;

    logger.error(
        {
            err,
            statusCode,
            method: req.method,
            url: req.originalUrl,
            operational: isOperational,
        },
        `${req.method} ${req.originalUrl} → ${statusCode} ${err.message}`,
    );

    if (res.headersSent) {
        return;
    }

    res.status(statusCode).json({
        error: {
            message: isOperational ? err.message : "Internal Server Error",
            code: err.name ?? "InternalServerError",
        },
    });
}
