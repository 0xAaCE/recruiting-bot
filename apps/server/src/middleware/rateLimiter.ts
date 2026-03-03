import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 60_000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (_req, res) => {
        res.status(429).json({
            error: {
                message: "Too many requests, please try again later",
                code: "RateLimitExceeded",
            },
        });
    },
});

export const chatLimiter = rateLimit({
    windowMs: 60_000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (_req, res) => {
        res.status(429).json({
            error: {
                message: "Too many chat requests, please try again later",
                code: "RateLimitExceeded",
            },
        });
    },
});
