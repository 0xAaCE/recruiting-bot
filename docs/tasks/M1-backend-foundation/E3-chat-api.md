# E3: Chat API

**Milestone**: M1 — Backend Foundation
**Goal**: Build the streaming chat endpoint and wire the full server entry point.

---

### T1: Create chat service

**Status**: [ ] Not started
**Files**: `apps/server/src/services/chat.ts` (create)
**Description**: Create a service module that wraps `streamChatResponse()` from `@repo/models` and converts the result using `toDataStreamResponse()` from the Vercel AI SDK. This isolates the AI integration from the route handler.
**Acceptance criteria**:
- [ ] Exports a function that accepts messages and returns a streaming Response
- [ ] Uses `streamChatResponse()` from `@repo/models` for AI completion
- [ ] Uses `toDataStreamResponse()` to convert the stream to the Vercel AI SDK data protocol

---

### T2: Create chat route

**Status**: [ ] Not started
**Files**: `apps/server/src/routes/chat.ts` (create)
**Description**: Create an Express router with `POST /api/chat`. The handler extracts `{ messages }` from the request body and delegates to the chat service. The streaming response is piped back to the client. This route requires auth (applied via middleware ordering).
**Acceptance criteria**:
- [ ] `POST /api/chat` with valid messages and auth returns a streaming response
- [ ] Invalid or missing messages return a `400` error
- [ ] Route is behind auth middleware

---

### T3: Rebuild server entry point

**Status**: [ ] Not started
**Files**: `apps/server/src/index.ts` (modify)
**Description**: Rebuild `index.ts` to wire the full middleware stack in the correct order: `express.json({ limit: '35mb' })` → `cors()` → global rate limiter → health route → auth routes (unauthenticated) → auth middleware → chat route (with chat-specific rate limiter) → error handler. Increase the JSON body limit to 35MB to accommodate base64-encoded PDFs.
**Acceptance criteria**:
- [ ] Middleware is applied in the correct order per the tech design
- [ ] Body parser accepts payloads up to 35MB
- [ ] Health and auth routes are accessible without authentication
- [ ] Chat route requires authentication
- [ ] Error handler catches unhandled errors

---

### T4: Update saveCandidateTool return value

**Status**: [ ] Not started
**Files**: `packages/models/src/actions/index.ts` (modify)
**Description**: Modify `saveCandidateTool`'s execute function to return the full evaluation data instead of just a success message. The updated return should include `{ success: true, candidateId: crypto.randomUUID(), name, email, evaluation }` so the client can render a CandidateCard from the tool result.
**Acceptance criteria**:
- [ ] Tool returns `name`, `email`, and the full `evaluation` object alongside `success` and `candidateId`
- [ ] Existing tool parameter schema is unchanged
- [ ] Return data is sufficient for the client to render a CandidateCard

---

### T5: Clean up system prompt

**Status**: [ ] Not started
**Files**: `packages/models/src/prompts/base.ts` (modify)
**Description**: Remove the mention of web/internet search capability from the system prompt since no web search tool exists. This prevents the AI from claiming it can search the web and confusing users.
**Acceptance criteria**:
- [ ] No references to web search or internet search in the system prompt
- [ ] Core recruiting assistant instructions remain intact
