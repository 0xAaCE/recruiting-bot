# Milestone 1: Backend Foundation

**Goal**: Express server handles demo auth verification and streaming AI chat with tool calling.

**Depends on**: Nothing — this is the first milestone.

## Epics

| # | Epic | Tasks | Description |
|---|------|-------|-------------|
| E1 | [Server Setup](./E1-server-setup.md) | 3 | Dependencies, env config, env template |
| E2 | [Middleware & Auth](./E2-middleware-and-auth.md) | 4 | Error handler, auth middleware, rate limiter, auth route |
| E3 | [Chat API](./E3-chat-api.md) | 5 | Chat service, chat route, entry point rebuild, saveCandidateTool fix, system prompt cleanup |

## Acceptance Criteria

- `curl -X POST /api/auth/verify` with correct password returns `200`
- `curl -X POST /api/auth/verify` with wrong password returns `401`
- `curl -X POST /api/chat` with valid auth streams an AI response
- Rate limiter rejects requests beyond the configured threshold
