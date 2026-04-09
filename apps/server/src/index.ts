import { logger } from "@repo/utils";
import cors from "cors";
import express, { Request, Response } from "express";

import { env } from "./config/env.js";
import { authMiddleware } from "./middleware/auth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { chatLimiter, globalLimiter } from "./middleware/rateLimiter.js";
import { requestLogger } from "./middleware/requestLogger.js";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";

const app = express();

// --- Global middleware ---
app.use(express.json({ limit: "35mb" }));
app.use(cors({ origin: true, credentials: true }));
app.use(requestLogger);
app.use(globalLimiter);

// --- Public routes (no auth) ---
app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", service: "recruiting-bot-server" });
});

app.use("/api/auth", authRouter);

// --- Protected routes (auth required) ---
app.use("/api", authMiddleware);

app.use("/api/chat", chatLimiter, chatRouter);

// --- Error handling ---
app.use(errorHandler);

app.listen(env.port, () => {
    logger.info({ port: env.port }, "Server running");
});
