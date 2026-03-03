# E1: Message Components

**Milestone**: M3 — Chat Interface
**Goal**: Build the core chat UI components for text input and message display.

---

### T1: Build ChatInput component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/chat/ChatInput.tsx` (create)
**Description**: Create a text input with a send button for submitting messages. The input should support Enter to send (Shift+Enter for newline). Disable the input and button while the AI is streaming a response. Accept an `onSubmit` callback and an `isLoading` prop.
**Acceptance criteria**:
- [ ] Text input with send button renders
- [ ] Enter key submits the message, Shift+Enter inserts a newline
- [ ] Input and button are disabled when `isLoading` is true
- [ ] Input clears after submission

---

### T2: Build MessageBubble component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/chat/MessageBubble.tsx` (create)
**Description**: Create a message bubble that renders differently for user and assistant messages. User messages appear right-aligned with one style; assistant messages appear left-aligned with another. AI responses are rendered using `react-markdown` to support formatting (bold, lists, code blocks). Tool call results that contain evaluation data render a `CandidateCard` instead.
**Acceptance criteria**:
- [ ] User messages are visually distinct from assistant messages (alignment, color)
- [ ] Assistant message content is rendered as markdown via `react-markdown`
- [ ] Tool call results with evaluation data render a `CandidateCard` component
- [ ] Plain text messages render without markdown artifacts

---

### T3: Build MessageList component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/chat/MessageList.tsx` (create)
**Description**: Create a scrollable container that renders a list of `MessageBubble` components. Auto-scroll to the bottom when new messages arrive or when streaming content updates.
**Acceptance criteria**:
- [ ] Renders all messages in order
- [ ] Container is scrollable when messages overflow
- [ ] Automatically scrolls to the newest message on updates
- [ ] Handles empty state gracefully (no messages yet)
