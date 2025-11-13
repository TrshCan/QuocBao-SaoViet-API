# Multi-stage Dockerfile for production (Debian-based)
# Alternative to Alpine-based Dockerfile for better Prisma compatibility

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
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN yarn install --frozen-lockfile
COPY . .
RUN npx prisma generate
EXPOSE 3000 9229
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build

# Install all dependencies (including devDependencies for building)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client with correct binary targets
RUN npx prisma generate

ENV NODE_ENV=production

# Build the application
RUN yarn build

# Compile seed scripts separately using dedicated tsconfig
RUN npx tsc -p prisma/tsconfig.json

# Remove devDependencies
RUN npm prune --production

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
COPY --from=build --chown=nodeuser:nodejs /app/package*.json ./

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

# Start the application
CMD ["node", "dist/index.js"]