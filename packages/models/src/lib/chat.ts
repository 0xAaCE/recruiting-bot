import type { StreamTextResult, UIMessage } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { convertToModelMessages, streamText } from "ai";

import { recruiterTools } from "../actions/index.js";
import { HIRO_SYSTEM_PROMPT } from "../prompts/base.js";

export type ChatMessage = UIMessage;

export interface ChatOptions {
    model?: string;
    temperature?: number;
    maxOutputTokens?: number;
}

const DEFAULT_OPTIONS: ChatOptions = {
    model: "openai/gpt-4o",
    temperature: 0.7,
    maxOutputTokens: 2000,
};

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Stream a chat response with tool support
 */
export async function streamChatResponse(
    messages: ChatMessage[],
    options: ChatOptions = {},
): Promise<StreamTextResult<typeof recruiterTools, never>> {
    const config = { ...DEFAULT_OPTIONS, ...options };

    const modelMessages = await convertToModelMessages(messages, {
        tools: recruiterTools,
    });

    const result = streamText({
        model: openrouter(config.model!),
        system: HIRO_SYSTEM_PROMPT,
        messages: modelMessages,
        tools: recruiterTools,
        temperature: config.temperature,
        maxOutputTokens: config.maxOutputTokens,
    });

    return result;
}
