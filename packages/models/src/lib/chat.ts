import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

import { recruiterTools } from "../actions";
import { RECRUITING_BOT_SYSTEM_PROMPT } from "../prompts/base";

export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export interface ChatOptions {
    model?: string;
    temperature?: number;
    maxTokens?: number;
}

const DEFAULT_OPTIONS: ChatOptions = {
    model: "openai/gpt-4o",
    temperature: 0.7,
    maxTokens: 2000,
};

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Stream a chat response with tool support
 */
export async function streamChatResponse(messages: ChatMessage[], options: ChatOptions = {}) {
    const config = { ...DEFAULT_OPTIONS, ...options };

    const result = streamText({
        model: openrouter(config.model!),
        messages: [{ role: "system", content: RECRUITING_BOT_SYSTEM_PROMPT }, ...messages],
        tools: recruiterTools,
        temperature: config.temperature,
        maxTokens: config.maxTokens,
    });

    return result;
}
