# E1: Server Setup

**Milestone**: M1 — Backend Foundation
**Goal**: Install dependencies, create environment config, and provide an env template.

---

### T1: Add server dependencies

**Status**: [ ] Not started
**Files**: `apps/server/package.json` (modify)
**Description**: Add the following dependencies to the server package: `@repo/models`, `@repo/errors`, `cors`, `express-rate-limit`. These are required by the middleware and route modules built in subsequent epics.
**Acceptance criteria**:
- [ ] `@repo/models`, `@repo/errors`, `cors`, and `express-rate-limit` are listed in `dependencies`
- [ ] `pnpm install` succeeds with no errors

---

### T2: Create environment config

**Status**: [ ] Not started
**Files**: `apps/server/src/config/env.ts` (create)
**Description**: Create a module that reads and validates required environment variables (`OPENAI_API_KEY`, `DEMO_PASSWORD`, `PORT`). Export a typed config object. Throw at startup if required variables are missing so failures are caught early.
**Acceptance criteria**:
- [ ] Exported config object includes `openaiApiKey`, `demoPassword`, and `port` (with `3001` default)
- [ ] Server fails to start with a clear error when `OPENAI_API_KEY` or `DEMO_PASSWORD` is missing

---

### T3: Create .env.local template

**Status**: [ ] Not started
**Files**: `apps/server/.env.local.example` (create)
**Description**: Provide a template file listing all required and optional environment variables with placeholder values. This helps new developers get started quickly.
**Acceptance criteria**:
- [ ] File contains `OPENAI_API_KEY`, `DEMO_PASSWORD`, and `PORT` with placeholder/default values
- [ ] File includes brief comments explaining each variable
