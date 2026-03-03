# E3: Chat Integration

**Milestone**: M3 — Chat Interface
**Goal**: Wire all chat components together with the Vercel AI SDK, localStorage persistence, and session management.

---

### T1: Build ChatContainer component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/chat/ChatContainer.tsx` (create)
**Description**: Create the main chat container that configures the Vercel AI SDK `useChat` hook. Set the API endpoint to `/api/chat`, include the `x-demo-password` header from sessionStorage, and handle tool call results. When a tool result contains candidate evaluation data (from `saveCandidateTool`), extract it and store it in the evaluations list. Compose `MessageList`, `FileUploadArea`, and `ChatInput` as children.
**Acceptance criteria**:
- [ ] `useChat` is configured with `/api/chat` endpoint and auth header
- [ ] Messages stream in real-time from the server
- [ ] Tool call results are detected and evaluation data is extracted
- [ ] `MessageList`, `FileUploadArea`, and `ChatInput` are rendered and wired to `useChat` state
- [ ] Loading state is passed to `ChatInput` to disable during streaming

---

### T2: Implement useLocalStorage hook

**Status**: [ ] Not started
**Files**: `apps/client/src/hooks/useLocalStorage.ts` (create)
**Description**: Create a generic typed React hook for reading and writing values to localStorage. All keys are automatically prefixed with `recruitai_`. The hook returns `[value, setValue]` similar to `useState`, and syncs with localStorage on every update. Initialize from localStorage on mount, falling back to the provided default value.
**Acceptance criteria**:
- [ ] `useLocalStorage<T>(key, defaultValue)` returns `[T, (value: T) => void]`
- [ ] Keys are prefixed with `recruitai_` automatically
- [ ] Values are JSON-serialized/deserialized
- [ ] Initial value is read from localStorage if present, otherwise uses default
- [ ] Updates write to both React state and localStorage

---

### T3: Assemble ChatPage

**Status**: [ ] Not started
**Files**: `apps/client/src/pages/ChatPage.tsx` (create)
**Description**: Create the chat page that composes `ChatContainer` and wires localStorage persistence. Use `useLocalStorage` to persist messages, evaluations, and job description across page refreshes. Hydrate `useChat` with stored messages on mount. Save new messages and evaluations to localStorage on change.
**Acceptance criteria**:
- [ ] `ChatContainer` renders within the page layout
- [ ] Messages persist across page refreshes via localStorage (`recruitai_messages`)
- [ ] Evaluations persist across page refreshes via localStorage (`recruitai_evaluations`)
- [ ] Page renders at `/chat` through `AuthGate`

---

### T4: Add "New Search" functionality

**Status**: [ ] Not started
**Files**: `apps/client/src/components/chat/ChatContainer.tsx` (modify) or `apps/client/src/pages/ChatPage.tsx` (modify)
**Description**: Add a "New Search" button (in the header area of the chat page) that triggers a confirmation dialog. On confirmation, clear all `recruitai_*` keys from localStorage, reset `useChat` state, and restart the chat with a fresh AI greeting.
**Acceptance criteria**:
- [ ] "New Search" button is visible in the chat UI
- [ ] Clicking it shows a confirmation dialog
- [ ] Confirming clears all `recruitai_*` keys from localStorage
- [ ] Chat state resets and AI sends a fresh greeting
- [ ] Canceling the dialog does nothing
