import { openai } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';
import { RECRUITING_BOT_SYSTEM_PROMPT } from '../prompts/base';
import { recruiterTools } from '../actions';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

const DEFAULT_OPTIONS: ChatOptions = {
  model: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 2000
};

/**
 * Generate a chat response with tool support
 */
export async function generateChatResponse(
  messages: ChatMessage[],
  options: ChatOptions = {}
) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const result = await generateText({
    model: openai(config.model!),
    messages: [
      { role: 'system', content: RECRUITING_BOT_SYSTEM_PROMPT },
      ...messages
    ],
    tools: recruiterTools,
    temperature: config.temperature,
    maxTokens: config.maxTokens
  });

  return result;
}

/**
 * Stream a chat response with tool support
 */
export async function streamChatResponse(
  messages: ChatMessage[],
  options: ChatOptions = {}
) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  const result = await streamText({
    model: openai(config.model!),
    messages: [
      { role: 'system', content: RECRUITING_BOT_SYSTEM_PROMPT },
      ...messages
    ],
    tools: recruiterTools,
    temperature: config.temperature,
    maxTokens: config.maxTokens
  });

  return result;
}
