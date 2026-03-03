// Export main chat functions
export { generateChatResponse, streamChatResponse } from './lib/chat';
export type { ChatMessage, ChatOptions } from './lib/chat';

// Export tools
export { recruiterTools, saveCandidateTool } from './actions';

// Export prompts
export { RECRUITING_BOT_SYSTEM_PROMPT } from './prompts/base';
