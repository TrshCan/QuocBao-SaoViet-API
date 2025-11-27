# syntax=docker/dockerfile:1.7
# syntax=docker.io/docker/dockerfile:1

# Multi-stage Dockerfile for production (Debian-based)

# Base stage
FROM node:22-slim AS base
WORKDIR /app

# Install dependencies for building native modules
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    curl \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable \
    && corepack prepare yarn@1.22.22 --activate

# Copy package files
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY nest-cli.json ./

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN yarn install --frozen-lockfile
COPY . .
COPY .env.development .env
RUN yarn prisma generate
EXPOSE 3000 9229
CMD ["yarn", "start"]

# Build stage
FROM base AS build

# Install all dependencies (including devDependencies for building)
RUN --mount=type=cache,id=yarn-cache,target=/root/.cache/yarn \
    --mount=type=cache,id=node-modules,target=/app/node_modules \
    yarn install --production --frozen-lockfile

# Copy source code
COPY . .
COPY .env.production .env

# Generate Prisma client with correct binary targets
RUN yarn prisma generate

ENV NODE_ENV=production

# Build the application
RUN yarn build

# Production stage
FROM node:22-slim AS production
WORKDIR /app

# Install required packages for runtime
RUN apt-get update && apt-get install -y \
    curl \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user with proper home directory
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -m -d /home/nodeuser -s /bin/bash nodeuser && \
    chown nodeuser:nodejs /home/nodeuser

# Copy built application from build stage
COPY --from=build --chown=nodeuser:nodejs /app/dist ./dist
COPY --from=build --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodeuser:nodejs /app/prisma ./prisma
COPY --from=build --chown=nodeuser:nodejs /app/package.json ./
COPY --from=build --chown=nodeuser:nodejs /app/yarn.lock ./
COPY --from=build --chown=nodeuser:nodejs /app/prisma.config.ts ./
COPY --from=build --chown=nodeuser:nodejs /app/nest-cli.json ./
COPY --from=build --chown=nodeuser:nodejs /app/.env.production ./

# Create directories for uploads and logs with proper structure
RUN mkdir -p uploads logs && \
    mkdir -p uploads/avatars uploads/repair-cases && \
    mkdir -p uploads/repair-cases/{model_serial,repair_form,before_repair,after_repair,parts_components,warranty_invoice,shipping_fee_invoice,repair_completion_receipt} && \
    chmod -R 755 uploads logs && \
    chown -R nodeuser:nodejs uploads logs

# Switch to non-root user
USER nodeuser

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application with startup-prod.sh
COPY startup-prod.sh /app/startup-prod.sh
RUN chmod +x /app/startup-prod.sh

# Start the application
CMD ["sh", "/app/startup-prod.sh"]