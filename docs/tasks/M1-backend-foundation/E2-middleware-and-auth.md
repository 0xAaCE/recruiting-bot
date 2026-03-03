# E2: Middleware & Auth

**Milestone**: M1 — Backend Foundation
**Goal**: Build the Express middleware stack (error handling, auth, rate limiting) and the auth verification route.

---

### T1: Create error handler middleware

**Status**: [ ] Not started
**Files**: `apps/server/src/middleware/errorHandler.ts` (create)
**Description**: Create a catch-all Express error handler that uses error types from `@repo/errors`. Return structured JSON responses with appropriate HTTP status codes. Log errors to the console for debugging.
**Acceptance criteria**:
- [ ] Catches errors thrown by route handlers and returns JSON `{ error: { message, code } }`
- [ ] Maps `@repo/errors` types to correct HTTP status codes
- [ ] Unknown errors return `500` with a generic message (no stack trace leak)

---

### T2: Create auth middleware

**Status**: [ ] Not started
**Files**: `apps/server/src/middleware/auth.ts` (create)
**Description**: Create middleware that reads the `x-demo-password` header and compares it against the `DEMO_PASSWORD` environment variable. If the password is missing or incorrect, respond with `401 Unauthorized`. Applied to all `/api/*` routes except `/api/auth/*`.
**Acceptance criteria**:
- [ ] Requests with valid `x-demo-password` header pass through to the next handler
- [ ] Requests with missing or incorrect password receive `401` with a JSON error
- [ ] Reads password from the env config module (M1-E1-T2)

---

### T3: Create rate limiter middleware

**Status**: [ ] Not started
**Files**: `apps/server/src/middleware/rateLimiter.ts` (create)
**Description**: Create two rate limiter instances using `express-rate-limit`: a global limiter (100 requests/min) applied to all routes, and a chat-specific limiter (20 requests/min) applied only to `/api/chat`. Return JSON error responses when limits are exceeded.
**Acceptance criteria**:
- [ ] Global limiter allows up to 100 requests per minute per IP
- [ ] Chat limiter allows up to 20 requests per minute per IP on `/api/chat`
- [ ] Rate limit exceeded responses include `429` status and a JSON error message

---

### T4: Create auth verification route

**Status**: [ ] Not started
**Files**: `apps/server/src/routes/auth.ts` (create)
**Description**: Create an Express router with `POST /api/auth/verify`. The handler reads `{ password }` from the request body, compares against `DEMO_PASSWORD`, and returns `200` on success or `401` on failure. This route is unauthenticated (no auth middleware).
**Acceptance criteria**:
- [ ] `POST /api/auth/verify` with `{ "password": "<correct>" }` returns `200 { success: true }`
- [ ] `POST /api/auth/verify` with wrong password returns `401 { error: "Invalid password" }`
- [ ] Route is mounted before the auth middleware in the middleware stack
