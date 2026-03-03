# RecruitAI — Task Breakdown

Structured implementation plan for [RecruitAI](../IDEA.md), derived from the [Technical Design](../TECH_DESIGN.md).

## Conventions

- **Task IDs** follow `M{n}-E{n}-T{n}` format (Milestone-Epic-Task)
- **Status legend**: `[ ]` not started · `[x]` done
- Milestones are sequential: **M1 → M2 → M3 → M4** (M1 and M2 can partially overlap — M2 depends only on M1-E2)

## Milestones

| # | Milestone | Epics | Description | Depends on |
|---|-----------|-------|-------------|------------|
| M1 | [Backend Foundation](./M1-backend-foundation/) | 3 | Express server with auth, rate limiting, and streaming chat API | — |
| M2 | [Frontend Foundation](./M2-frontend-foundation/) | 3 | React app with landing page, routing, and password gate | M1-E2 (auth route) |
| M3 | [Chat Interface](./M3-chat-interface/) | 3 | Full chat UI with file upload and candidate evaluation cards | M1, M2 |
| M4 | [Polish & Deploy](./M4-polish-and-deploy/) | 2 | Enhanced AI prompts, production build, Docker, K8s | M1, M2, M3 |

**Total: 4 milestones, 11 epics**
