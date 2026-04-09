import type { ChatMessage } from "@repo/models";
import type { Response } from "express";
import { AIModelError } from "@repo/errors";
import { streamChatResponse } from "@repo/models";
import { createLogger } from "@repo/utils";

const logger = createLogger({ module: "chat-service" });

export async function handleChatStream(messages: ChatMessage[], res: Response): Promise<void> {
    try {
        const result = await streamChatResponse(messages);

        result.pipeUIMessageStreamToResponse(res);
    } catch (error) {
        logger.error({ err: error }, "Chat stream failed to initialize");
        throw new AIModelError(error instanceof Error ? error.message : "Unknown AI error");
    }
}
