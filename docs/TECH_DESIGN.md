# Hiro — Technical Design (POC)

This document maps the POC requirements from [IDEA.md](./IDEA.md) to concrete architecture decisions. The POC validates the core interaction model — conversational CV screening — that underpins the full chat-first ATS vision. A developer should be able to read this and start building.

## 1. High-Level Architecture

```
┌─────────────────┐       HTTP / SSE        ┌─────────────────┐       HTTPS        ┌─────────────────┐
│                 │  ◄─────────────────────► │                 │ ◄────────────────► │                 │
│  React Client   │     POST /api/chat       │  Express Server │    Chat Completions │   OpenAI API    │
│   (Vite :3000)  │     (streaming)          │     (:3001)     │    (streaming)      │    (GPT-4o)     │
│                 │                          │                 │                     │                 │
└────────┬────────┘                          └─────────────────┘                     └─────────────────┘
         │
         │  localStorage
         ▼
┌─────────────────┐
│  Browser State   │
│  - messages      │
│  - evaluations   │
│  - job desc      │
│  - uploaded files│
└─────────────────┘
```

**Key principle: stateless server, zero persistence.**

The client owns all state (React state + localStorage). The server receives the full conversation history on each request, calls OpenAI, and streams the response back. No database, no server-side sessions, no files on disk — per the POC requirement that "all data lives in the browser."

When the AI evaluates a candidate (via `saveCandidateTool`), the evaluation data flows through the server back to the client, which stores it in localStorage and displays it as a candidate card.

## 2. Frontend Architecture

### New Dependencies

| Package                             | Purpose                                                  |
| ----------------------------------- | -------------------------------------------------------- |
| `react-router-dom`                  | Client-side routing                                      |
| `tailwindcss` + `@tailwindcss/vite` | Utility-first CSS                                        |
| `lucide-react`                      | Icons                                                    |
| `react-markdown`                    | Safe rendering of AI markdown responses                  |
| `ai` (Vercel AI SDK)                | `useChat` hook for streaming chat + tool result handling |

### Routing (React Router v7)

| Path    | Component     | Access                                |
| ------- | ------------- | ------------------------------------- |
| `/`     | `LandingPage` | Public                                |
| `/chat` | `ChatPage`    | Password-gated via `AuthGate` wrapper |

### State Management

-   **Chat state**: Vercel AI SDK's `useChat` hook manages messages, streaming, and tool call results. It handles the SSE connection, appending messages, and exposing loading state — no manual fetch or EventSource code needed.
-   **Persistence**: localStorage used only for durability across page refreshes (conversation history, evaluations, job description). Hydrated on mount, written on change.
-   **No Redux/Zustand needed** for the POC. React state + `useChat` + localStorage covers all cases.

### Component Tree

```
App
├── LandingPage
│   ├── Header
│   ├── Hero
│   ├── HowItWorks
│   ├── Features
│   └── Footer
│
└── AuthGate (checks sessionStorage for demo password)
    └── ChatPage
        └── ChatContainer
            ├── MessageList
            │   └── MessageBubble (text, markdown, or CandidateCard)
            ├── FileUploadArea (drag-and-drop + click)
            └── ChatInput (text input + send button)
```

### PDF Upload Flow

1. User selects a PDF file (drag-and-drop or file picker)
2. Client validates: PDF MIME type only, max 10MB, max 5 files per session
3. Client converts the file to a base64 data URL
4. File is sent via `useChat`'s `experimental_attachments` option
5. The Vercel AI SDK formats the attachment for the OpenAI API
6. GPT-4o reads the PDF natively (supported since March 2025, up to 100 pages / 32MB) — no server-side PDF parsing needed

### File Structure

```
apps/client/src/
├── pages/
│   ├── LandingPage.tsx
│   └── ChatPage.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── auth/
│   │   └── AuthGate.tsx
│   ├── chat/
│   │   ├── ChatContainer.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── ChatInput.tsx
│   │   ├── FileUploadArea.tsx
│   │   └── CandidateCard.tsx
│   └── landing/
│       ├── Hero.tsx
│       ├── HowItWorks.tsx
│       └── Features.tsx
├── hooks/
│   └── useLocalStorage.ts
├── lib/
│   ├── api.ts
│   ├── storage.ts
│   └── constants.ts
└── types/
    └── chat.ts
```

## 3. Backend Architecture

### New Dependencies

| Package              | Purpose                        |
| -------------------- | ------------------------------ |
| `@repo/models`       | `streamChatResponse()` + tools |
| `@repo/errors`       | Structured error types         |
| `cors`               | Cross-origin support           |
| `express-rate-limit` | Request throttling             |

**No `pdf-parse` or `multer` needed.** PDFs are sent to GPT-4o as base64 file parts in the chat message. The OpenAI API extracts text and images natively from the PDF — no server-side parsing.

### API Endpoints

| Method | Path               | Auth | Purpose                                   |
| ------ | ------------------ | ---- | ----------------------------------------- |
| `GET`  | `/health`          | No   | Health check (already exists)             |
| `POST` | `/api/auth/verify` | No   | Verify demo password                      |
| `POST` | `/api/chat`        | Yes  | Streaming AI chat (text + PDF file parts) |

### Middleware Stack

```
express.json({ limit: '35mb' })   ← Increased to accommodate base64 PDFs
  → cors()
  → rateLimiter (global: 100 req/min)
  → /health (no auth)
  → /api/auth/* (no auth)
  → authMiddleware (all other /api/*)
  → /api/chat (+ stricter rate limit: 20 req/min)
  → errorHandler (catch-all, uses @repo/errors)
```

### Authentication

Simple demo-level auth:

-   Client sends `x-demo-password` header with each authenticated request
-   `authMiddleware` compares against `DEMO_PASSWORD` environment variable
-   No JWT, no sessions, no cookies — appropriate for a demo

### Chat Endpoint

The `/api/chat` handler:

1. Receives `{ messages }` from the client (messages may include file parts with base64 PDF data)
2. Calls `streamChatResponse(messages)` from `@repo/models`
3. Returns the result via `toDataStreamResponse()` (Vercel AI SDK helper)
4. Zero custom SSE code — the AI SDK handles the streaming protocol

### File Structure

```
apps/server/src/
├── config/
│   └── env.ts
├── middleware/
│   ├── errorHandler.ts
│   ├── auth.ts
│   └── rateLimiter.ts
├── routes/
│   ├── health.ts
│   ├── auth.ts
│   └── chat.ts
├── services/
│   └── chat.ts
└── index.ts
```

## 4. AI Integration

### Guided Flow via System Prompt

The screening stages (job description → clarifying questions → CV upload → evaluation) are enforced by system prompt instructions, not backend code. The AI naturally follows the sequence based on conversational context.

**Enhanced system prompt** (`packages/models/src/prompts/base.ts`) will define explicit stages:

-   **Stage 1 — Job Description**: Greet the recruiter. Ask them to provide or paste the job description. Once received, ask 2-3 clarifying questions about priorities (must-haves vs. nice-to-haves, experience level, etc.).
-   **Stage 2 — CV Upload**: After clarifying the role, invite the recruiter to upload candidate CVs as PDFs. Recognize PDF attachments as candidate resumes.
-   **Stage 3 — Evaluation**: For each CV, analyze it against the job description and clarifying answers. Call `saveCandidateTool` with the structured evaluation. Offer comparative analysis when multiple candidates have been evaluated.

### PDF Handling

PDFs are sent directly to GPT-4o as file attachments — no server-side parsing. The flow:

1. Client converts PDF to base64 data URL
2. Sent via Vercel AI SDK's `experimental_attachments` in the chat message
3. GPT-4o processes the PDF natively (text extraction + image understanding)
4. System prompt instructs the AI to treat PDF attachments as candidate CVs

**Limits**: 100 pages and 32MB per PDF (OpenAI API limits). For the POC, enforce max 5 CVs per session on the client side.

### Tool Calling — Client-Side Storage Only

When the AI evaluates a candidate, it calls `saveCandidateTool` (defined in `packages/models/src/actions/index.ts`). The current implementation is a stub that returns a success message. For the POC, modify it to echo the full evaluation data back:

**Current return:**

```ts
return { success: true, candidateId: crypto.randomUUID(), message: `Candidate ${name} saved successfully` };
```

**Updated return:**

```ts
return { success: true, candidateId: crypto.randomUUID(), name, email, evaluation };
```

**Full data flow:**

1. AI invokes `saveCandidateTool` with evaluation data (name, email, fitScore, strengths, weaknesses, recommendation, summary)
2. The tool's `execute` function returns the full evaluation data + a generated UUID
3. Vercel AI SDK streams the tool result back to the client via `toDataStreamResponse()`
4. On the client, `useChat` receives the tool invocation result
5. Client extracts the evaluation, saves it to localStorage under `hiro_evaluations`
6. A `CandidateCard` component renders the structured evaluation inline in the chat

**No database involved at any point.** The server just passes the data through; all persistence is localStorage.

### Token Budget

| Component                            | Estimated Tokens |
| ------------------------------------ | ---------------- |
| System prompt                        | ~300             |
| Job description                      | ~1,500           |
| CVs (up to 5, via GPT-4o native PDF) | Variable         |
| Conversation history                 | ~5,000           |
| Response                             | ~2,000           |

Well within GPT-4o's 128K context window. The 5-CV-per-session limit is a practical guard for the POC.

## 5. Data Flow

### Story 1: First Visit

```
User visits /
  → LandingPage renders (public)
  → User clicks "Try Demo" → navigates to /chat
  → AuthGate checks sessionStorage for valid password
  → No password found → renders password prompt
  → User enters password → POST /api/auth/verify { password }
  → Server checks against DEMO_PASSWORD env var
  → 200 OK → AuthGate stores password in sessionStorage
  → ChatPage renders → AI sends greeting message
```

### Story 2: Submit Job Description

```
User types job description in ChatInput
  → useChat sends POST /api/chat { messages: [...] }
  → Server calls streamChatResponse(messages)
  → GPT-4o processes job description
  → AI streams response with clarifying questions
  → Client renders streamed response in MessageBubble
  → Messages persisted to localStorage (hiro_messages)
  → Job description saved to localStorage (hiro_job_description)
```

### Story 3: Upload and Evaluate a CV

```
User drops PDF into FileUploadArea
  → Client validates: PDF type, ≤10MB, file count ≤5
  → Client converts PDF to base64 data URL
  → useChat sends POST /api/chat { messages: [...with file attachment...] }
  → Server passes messages (including file parts) to streamChatResponse()
  → GPT-4o reads PDF natively, analyzes against job description
  → AI calls saveCandidateTool({ name, email, evaluation })
  → Tool returns full evaluation data + UUID
  → AI SDK streams tool result back to client
  → Client extracts evaluation from tool result
  → Saves to localStorage (hiro_evaluations)
  → CandidateCard renders inline in chat
  → AI provides text summary of the evaluation
```

### Story 4: Clear and Start Fresh

```
User clicks "New Search"
  → Confirmation dialog appears
  → User confirms
  → Clear all hiro_* keys from localStorage
  → Reset useChat state
  → Chat restarts with fresh greeting
```

### localStorage Schema

| Key                    | Type                    | Description                                       |
| ---------------------- | ----------------------- | ------------------------------------------------- |
| `hiro_messages`        | `ChatMessage[]`         | Full conversation history                         |
| `hiro_job_description` | `string`                | Current job description text                      |
| `hiro_evaluations`     | `CandidateEvaluation[]` | All candidate evaluations                         |
| `hiro_uploaded_files`  | `FileRecord[]`          | Metadata of uploaded PDFs (name, size, timestamp) |

All values are JSON-serialized with typed TypeScript interfaces.

## 6. Security (POC Level)

These measures are appropriate for a demo — not production:

-   **Password gate**: `x-demo-password` header checked against `DEMO_PASSWORD` env var. Sufficient to prevent casual unauthorized access.
-   **API key protection**: `OPENAI_API_KEY` stays server-side only, loaded from `.env.local` (gitignored). Never exposed to the client.
-   **Client-side file validation**: PDF MIME type check, 10MB size limit, max 5 files per session. No server-side file handling needed since files go directly to OpenAI.
-   **Rate limiting**: 100 req/min global, 20 req/min on the `/api/chat` endpoint. Prevents abuse of the OpenAI API.
-   **Safe markdown rendering**: `react-markdown` sanitizes AI responses by default — no raw `dangerouslySetInnerHTML`.

## 7. Deployment

### Local / Containerized Deployment

The app is deployed as a single Docker container. Express serves both API routes and the built client static files.

**Dockerfile** (multi-stage build):

```
Stage 1: Build
  - FROM node:20-slim
  - Install pnpm
  - Copy monorepo, install deps
  - RUN pnpm build (Turbo handles dependency order)

Stage 2: Runtime
  - FROM node:20-slim
  - Copy built server (apps/server/dist/)
  - Copy built client (apps/client/dist/)
  - Copy node_modules (production only)
  - CMD ["node", "apps/server/dist/index.js"]
```

**Production static file serving**: Express serves `apps/client/dist/` as static files. A catch-all route serves `index.html` for any non-API path (SPA fallback for client-side routing).

**Environment variables**:

| Variable         | Required | Description                        |
| ---------------- | -------- | ---------------------------------- |
| `OPENAI_API_KEY` | Yes      | OpenAI API key                     |
| `DEMO_PASSWORD`  | Yes      | Password for demo access           |
| `PORT`           | No       | Server port (default: 3001)        |
| `NODE_ENV`       | No       | Environment (default: development) |

**Build and run**:

```bash
# Development
pnpm dev          # Turbo runs client + server in parallel

# Production
pnpm build        # Build all packages
node apps/server/dist/index.js
```

A Dockerfile and basic Kubernetes manifest will be provided as reference. Actual Argo/K8s configuration is out of scope for this document.

## 8. Implementation Sequence

Each phase produces a testable increment.

### Phase 1: Backend Foundation

-   Add dependencies to `apps/server`: `@repo/models`, `@repo/errors`, `cors`, `express-rate-limit`
-   Create `config/env.ts` for environment variable validation
-   Create middleware: `errorHandler.ts` (using `@repo/errors`), `auth.ts` (demo password check), `rateLimiter.ts`
-   Create routes: `auth.ts` (`POST /api/auth/verify`), `chat.ts` (`POST /api/chat` with streaming)
-   Create `services/chat.ts` to wrap `streamChatResponse()` + `toDataStreamResponse()`
-   Wire everything into `index.ts` with proper middleware ordering
-   Modify `saveCandidateTool` in `packages/models/src/actions/index.ts` to return full evaluation data
-   Remove internet search mention from system prompt (no web search tool exists)
-   **Test**: `curl` against `/api/auth/verify` and `/api/chat`

### Phase 2: Frontend Foundation

-   Add dependencies to `apps/client`: `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `react-markdown`, `ai`
-   Configure Tailwind CSS via Vite plugin
-   Set up React Router in `main.tsx` with `/` and `/chat` routes
-   Build layout components: `Header.tsx`, `Footer.tsx`
-   Build `LandingPage` with `Hero`, `HowItWorks`, `Features` sections
-   Build `AuthGate` component (password prompt, sessionStorage check)
-   **Test**: Navigate between landing page and password-gated chat route

### Phase 3: Chat Interface

-   Build `ChatPage` with `ChatContainer`, wired to Vercel AI SDK `useChat` hook
-   Configure `useChat` with the `/api/chat` endpoint and `x-demo-password` header
-   Build `MessageList`, `MessageBubble` (with `react-markdown`), `ChatInput`
-   Build `FileUploadArea` (drag-and-drop, PDF validation, base64 conversion)
-   Build `CandidateCard` component for rendering structured evaluations from tool results
-   Implement localStorage persistence via `useLocalStorage` hook
-   Add "New Search" functionality (clear localStorage, reset chat state)
-   **Test**: Full flow — password → job description → PDF upload → evaluation card

### Phase 4: Polish & Deploy

-   Enhance system prompt in `packages/models/src/prompts/base.ts` with detailed stage instructions
-   Polish landing page styling and responsive layout
-   Add production static file serving to Express (serve client build, SPA fallback)
-   Create Dockerfile (multi-stage build)
-   Create basic Kubernetes deployment manifest (reference only)
-   End-to-end testing of the complete flow

---

## Key Existing Files

| File                                   | Status     | Changes Needed                                                           |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `packages/models/src/lib/chat.ts`      | Working    | Add `toDataStreamResponse()` integration, support file parts in messages |
| `packages/models/src/prompts/base.ts`  | Working    | Enhance with staged flow instructions, remove web search mention         |
| `packages/models/src/actions/index.ts` | Stub       | Modify `saveCandidateTool` to return full evaluation data                |
| `apps/server/src/index.ts`             | Skeleton   | Rebuild with middleware stack and routes                                 |
| `apps/client/src/main.tsx`             | Minimal    | Add React Router setup                                                   |
| `apps/client/vite.config.ts`           | Configured | Add Tailwind plugin                                                      |
