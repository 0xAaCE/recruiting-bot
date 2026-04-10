# E1: Project Setup

**Milestone**: M2 — Frontend Foundation
**Goal**: Install dependencies, configure Tailwind and routing, create shared types and utilities.

---

### T1: Add client dependencies

**Status**: [ ] Not started
**Files**: `apps/client/package.json` (modify)
**Description**: Add the following dependencies: `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`, `lucide-react`, `react-markdown`, `ai` (Vercel AI SDK). These are required for routing, styling, icons, markdown rendering, and chat streaming.
**Acceptance criteria**:

-   [ ] All six packages are listed in `dependencies` (or `devDependencies` where appropriate)
-   [ ] `pnpm install` succeeds with no errors

---

### T2: Configure Tailwind CSS

**Status**: [ ] Not started
**Files**: `apps/client/vite.config.ts` (modify), `apps/client/src/index.css` (create or modify)
**Description**: Add the `@tailwindcss/vite` plugin to the Vite config. Import Tailwind's base styles in the root CSS file using `@import "tailwindcss"`. Verify that Tailwind utility classes work in components.
**Acceptance criteria**:

-   [ ] `@tailwindcss/vite` plugin is registered in `vite.config.ts`
-   [ ] Root CSS file imports Tailwind
-   [ ] Tailwind utility classes (e.g., `bg-blue-500`) apply correctly when used in components

---

### T3: Set up React Router

**Status**: [ ] Not started
**Files**: `apps/client/src/main.tsx` (modify)
**Description**: Configure React Router in `main.tsx` with two routes: `/` for `LandingPage` and `/chat` for `ChatPage` (wrapped in `AuthGate`). Use `BrowserRouter` for client-side routing.
**Acceptance criteria**:

-   [ ] `/` renders the `LandingPage` component
-   [ ] `/chat` renders through the `AuthGate` wrapper
-   [ ] Unknown routes show a fallback or redirect

---

### T4: Create shared types

**Status**: [ ] Not started
**Files**: `apps/client/src/types/chat.ts` (create)
**Description**: Define TypeScript interfaces used across multiple components: `ChatMessage` (role, content, id, tool results), `CandidateEvaluation` (candidateId, name, email, fitScore, strengths, weaknesses, recommendation, summary), and `FileRecord` (name, size, timestamp, type).
**Acceptance criteria**:

-   [ ] `ChatMessage`, `CandidateEvaluation`, and `FileRecord` types are exported
-   [ ] Types match the data structures described in the tech design (localStorage schema, saveCandidateTool output)

---

### T5: Create utility modules

**Status**: [ ] Not started
**Files**: `apps/client/src/lib/constants.ts` (create), `apps/client/src/lib/storage.ts` (create), `apps/client/src/lib/api.ts` (create)
**Description**: Create three utility modules: `constants.ts` (API base URL, localStorage key prefix `hiro_`, file upload limits), `storage.ts` (typed localStorage helpers for reading/writing JSON with the `hiro_` prefix), `api.ts` (auth verification fetch wrapper).
**Acceptance criteria**:

-   [ ] `constants.ts` exports `API_BASE_URL`, `STORAGE_PREFIX`, `MAX_FILE_SIZE`, `MAX_FILES`
-   [ ] `storage.ts` exports typed `getItem<T>()` and `setItem<T>()` functions using the key prefix
-   [ ] `api.ts` exports a `verifyPassword(password: string)` function that POSTs to `/api/auth/verify`
