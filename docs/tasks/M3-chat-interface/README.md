# Milestone 3: Chat Interface

**Goal**: Full screening flow works — job description → PDF upload → candidate evaluation card.

**Depends on**: M1 (chat API and streaming), M2 (routing, auth gate, layout components).

## Epics

| # | Epic | Tasks | Description |
|---|------|-------|-------------|
| E1 | [Message Components](./E1-message-components.md) | 3 | ChatInput, MessageBubble, MessageList |
| E2 | [File Upload & Evaluation Display](./E2-file-and-evaluation.md) | 2 | FileUploadArea, CandidateCard |
| E3 | [Chat Integration](./E3-chat-integration.md) | 4 | ChatContainer, useLocalStorage, ChatPage, "New Search" |

## Acceptance Criteria

- User can type a job description and receive AI clarifying questions
- User can upload PDF files via drag-and-drop or file picker
- AI evaluates CVs and renders CandidateCard components with structured data
- Conversation and evaluations persist across page refreshes (localStorage)
- "New Search" clears all state and restarts the chat
