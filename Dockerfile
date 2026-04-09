FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.5.0 --activate

# --- Prune stage: extract only server workspace and its deps ---
FROM base AS pruner
WORKDIR /app
COPY . .
RUN npx turbo prune @repo/server --docker

# --- Build stage ---
FROM base AS builder
WORKDIR /app

# Install deps first (layer cache)
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@repo/server

# --- Production stage ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile --prod

# Copy compiled outputs
COPY --from=builder /app/apps/server/dist/ ./apps/server/dist/
COPY --from=builder /app/packages/errors/dist/ ./packages/errors/dist/
COPY --from=builder /app/packages/models/dist/ ./packages/models/dist/
COPY --from=builder /app/packages/utils/dist/ ./packages/utils/dist/

EXPOSE 3001

CMD ["node", "apps/server/dist/index.js"]
