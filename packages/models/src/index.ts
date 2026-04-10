// Export main chat functions
export { streamChatResponse } from "./lib/chat.js";
export type { ChatMessage, ChatOptions } from "./lib/chat.js";

// Export tools
export { recruiterTools, saveCandidateTool } from "./actions/index.js";

// Export prompts
export { HIRO_SYSTEM_PROMPT } from "./prompts/base.js";
