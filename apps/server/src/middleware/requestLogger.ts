import { logger } from "@repo/utils";
import pinoHttp from "pino-http";

export const requestLogger = pinoHttp({
    logger,
    autoLogging: {
        ignore: (req) => req.url === "/health",
    },
    customSuccessMessage: (req, res) => {
        return `${req.method} ${req.url} ${res.statusCode}`;
    },
    customErrorMessage: (req, res) => {
        return `${req.method} ${req.url} ${res.statusCode}`;
    },
});
