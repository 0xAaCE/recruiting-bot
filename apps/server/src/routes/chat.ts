import type { Router as RouterType } from "express";
import { BadRequestError } from "@repo/errors";
import { Router } from "express";

import { handleChatStream } from "../services/chat.js";

const router: RouterType = Router();

router.post("/", async (req, res, next) => {
    try {
        const { messages } = req.body as { messages?: unknown };

        if (!Array.isArray(messages) || messages.length === 0) {
            throw new BadRequestError("messages must be a non-empty array");
        }

        await handleChatStream(messages, res);
    } catch (error) {
        next(error);
    }
});

export default router;
