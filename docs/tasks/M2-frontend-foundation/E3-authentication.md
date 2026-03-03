# E3: Authentication

**Milestone**: M2 — Frontend Foundation
**Goal**: Gate the `/chat` route behind a password prompt.

---

### T1: Build AuthGate component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/auth/AuthGate.tsx` (create)
**Description**: Create a wrapper component that checks sessionStorage for a stored demo password. If no password is found, render a password prompt form. On submit, POST the password to `/api/auth/verify`. On success (`200`), store the password in sessionStorage and render the child routes. On failure (`401`), show an error message. The password persists for the duration of the browser tab (sessionStorage).
**Acceptance criteria**:
- [ ] Shows a password input form when no password is stored
- [ ] Submitting the correct password calls `/api/auth/verify` and gets `200`
- [ ] On success, stores password in sessionStorage and renders children
- [ ] On failure, displays an error message and allows retry
- [ ] Refreshing the page within the same tab does not require re-authentication
- [ ] Opening a new tab requires re-authentication
