# E2: Production Deployment

**Milestone**: M4 — Polish & Deploy
**Goal**: Serve the full app from a single container with production config.

---

### T1: Add production static file serving

**Status**: [ ] Not started
**Files**: `apps/server/src/index.ts` (modify)
**Description**: In production mode (`NODE_ENV=production`), configure Express to serve the built client files from `apps/client/dist/` using `express.static`. Add a catch-all route for non-API paths that serves `index.html` (SPA fallback for client-side routing). This allows a single server process to serve both API and frontend.
**Acceptance criteria**:
- [ ] Static files from `apps/client/dist/` are served at the root path in production
- [ ] Non-API routes (e.g., `/chat`) return `index.html` for client-side routing
- [ ] API routes (`/api/*`, `/health`) still work normally
- [ ] Development mode is unaffected (Vite dev server handles the client)

---

### T2: Create Dockerfile

**Status**: [ ] Not started
**Files**: `Dockerfile` (create)
**Description**: Create a multi-stage Dockerfile. Stage 1 (build): use `node:20-slim`, install pnpm, copy the monorepo, install dependencies, run `pnpm build` (Turbo handles build order). Stage 2 (runtime): use `node:20-slim`, copy built server (`apps/server/dist/`), built client (`apps/client/dist/`), and production `node_modules`. Entry point: `CMD ["node", "apps/server/dist/index.js"]`.
**Acceptance criteria**:
- [ ] `docker build` succeeds
- [ ] `docker run` starts the server and serves the full app
- [ ] Runtime image is minimal (no dev dependencies, no source code)
- [ ] Environment variables can be passed at runtime (`-e OPENAI_API_KEY=...`)

---

### T3: Create Kubernetes deployment manifest

**Status**: [ ] Not started
**Files**: `k8s/deployment.yaml` (create)
**Description**: Create a reference Kubernetes manifest including: Deployment (1 replica, resource limits, env vars from ConfigMap/Secret), Service (ClusterIP, port 3001), and ConfigMap for non-sensitive config. This is a reference only — not expected to be used directly.
**Acceptance criteria**:
- [ ] Manifest includes Deployment, Service, and ConfigMap resources
- [ ] Environment variables are sourced from ConfigMap and Secret references
- [ ] Resource limits are defined
- [ ] Manifest is valid YAML (can be checked with `kubectl apply --dry-run=client`)

---

### T4: End-to-end testing

**Status**: [ ] Not started
**Files**: N/A (manual testing)
**Description**: Perform a complete end-to-end test of the full application flow: (1) Visit landing page, (2) Click "Try Demo", (3) Enter password, (4) Submit a job description, (5) Upload a CV PDF, (6) Receive a candidate evaluation card, (7) Click "New Search" and verify state is cleared. Test in both development mode and production (Docker) mode.
**Acceptance criteria**:
- [ ] Landing page loads and all sections render
- [ ] Auth flow works (correct password → access, wrong password → error)
- [ ] Chat streams AI responses in real-time
- [ ] PDF upload triggers candidate evaluation
- [ ] CandidateCard renders with structured data
- [ ] "New Search" clears all state and restarts
- [ ] Flow works in Docker container
