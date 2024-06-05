FROM node:18-alpine AS alpine

# Setup pnpm on the alpine base
FROM alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app

COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "api" is the name entered in the project's package.json: { name: "api" }
RUN turbo prune api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

# Copy pruned files
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install dependencies
RUN pnpm install

# Copy full sources
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo run db:generate

# Build the project
RUN pnpm turbo run build --filter=api...

# Command to run the application
CMD ["node", "apps/api/dist/main.js"]


