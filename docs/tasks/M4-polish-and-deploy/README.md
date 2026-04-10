# Milestone 4: Polish & Deploy

**Goal**: Production-ready container serving the complete Hiro application.

**Depends on**: M1, M2, M3 (full app must be working).

## Epics

| #   | Epic                                                   | Tasks | Description                                                                 |
| --- | ------------------------------------------------------ | ----- | --------------------------------------------------------------------------- |
| E1  | [AI & UX Polish](./E1-ai-and-ux-polish.md)             | 2     | Enhanced system prompt with stage instructions, landing page styling polish |
| E2  | [Production Deployment](./E2-production-deployment.md) | 4     | Static file serving, Dockerfile, K8s manifest, E2E testing                  |

## Acceptance Criteria

-   Docker container builds and runs successfully
-   Full flow works end-to-end in the container: landing → auth → chat → upload → evaluation → new search
-   System prompt guides the AI through clear screening stages
-   Landing page is polished and responsive
