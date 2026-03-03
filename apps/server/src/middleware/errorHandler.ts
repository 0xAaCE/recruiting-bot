import type { NextFunction, Request, Response } from "express";
import { AppError } from "@repo/errors";
import { logger } from "@repo/utils";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: { message: err.message, code: err.name },
        });
        return;
    }

    logger.error(err, "Unhandled error");
    res.status(500).json({
        error: { message: "Internal Server Error", code: "InternalServerError" },
    });
}
