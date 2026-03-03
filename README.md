# RecruitAI

AI-powered chat assistant that helps recruiters screen candidates faster and more consistently.

Instead of reading every CV from top to bottom, the recruiter has a conversation with an intelligent assistant that evaluates candidates against a job description and produces structured evaluations.

## Overview

This is a monorepo with:

- [`apps/client`](./apps/client) — React + Vite frontend
- [`apps/server`](./apps/server) — Express API server
- [`packages/models`](./packages/models) — AI chat integration (OpenAI)
- [`packages/errors`](./packages/errors) — Shared error types
- [`packages/utils`](./packages/utils) — Shared utilities

## Prerequisites

- Node.js 20+
- pnpm 10+

## Getting Started

```bash
pnpm install
pnpm dev
```

## Documentation

- [Product Idea](./docs/IDEA.md)
- [Technical Design](./docs/TECH_DESIGN.md)
- [Task Breakdown](./docs/tasks/)
