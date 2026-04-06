import type { ChatMessage } from "@repo/models";
import type { Response } from "express";
import { AIModelError } from "@repo/errors";
import { streamChatResponse } from "@repo/models";
import { createLogger } from "@repo/utils";

const logger = createLogger({ module: "chat-service" });

export async function handleChatStream(messages: ChatMessage[], res: Response): Promise<void> {
    try {
        const result = await streamChatResponse(messages);
        result.pipeDataStreamToResponse(res);
    } catch (error) {
        logger.error(error, "Chat stream failed");
        throw new AIModelError(error instanceof Error ? error.message : "Unknown AI error");
    }
}
