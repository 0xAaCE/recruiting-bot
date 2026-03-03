import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@repo/errors";

import { env } from "../config/env.js";

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
    const password = req.headers["x-demo-password"];

    if (!password || password !== env.demoPassword) {
        throw new UnauthorizedError("Invalid or missing password");
    }

    next();
}
