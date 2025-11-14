# Multi-stage Docker build for Next.js + PayloadCMS Application
# This Dockerfile creates an optimized production build

# Stage 1: Base image with Node.js
FROM node:22.12.0-alpine AS base

# Install dependencies needed for native modules and sharp
RUN apk add --no-cache \
    libc6-compat \
    dumb-init \
    wget \
    && rm -rf /var/cache/apk/*

# Install pnpm directly (bypass corepack signature issues)
RUN npm install -g pnpm@latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Stage 2: Install dependencies
FROM base AS deps

# Install dependencies with pnpm
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV CI=true
RUN pnpm install --frozen-lockfile --production=false

# Stage 3: Build the application
FROM base AS builder

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set build environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-deprecation"

# PayloadCMS requires PAYLOAD_SECRET for build process

ARG PAYLOAD_SECRET
ARG DATABASE_NAME
ARG DATABASE_URI
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_PAYLOAD_AUTH_URL

ARG PUSHER_APP_ID
ARG NEXT_PUBLIC_PUSHER_KEY
ARG PUSHER_SECRET
ARG NEXT_PUBLIC_PUSHER_CLUSTER

ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_URI=${DATABASE_URI}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV PAYLOAD_FORCE_READ_ONLY=${PAYLOAD_FORCE_READ_ONLY}
ENV PUSHER_APP_ID=${PUSHER_APP_ID}
ENV NEXT_PUBLIC_PUSHER_KEY=${NEXT_PUBLIC_PUSHER_KEY}
ENV PUSHER_SECRET=${PUSHER_SECRET}
ENV NEXT_PUBLIC_PUSHER_CLUSTER=${NEXT_PUBLIC_PUSHER_CLUSTER}
ENV NEXT_PUBLIC_PAYLOAD_AUTH_URL=${NEXT_PUBLIC_PAYLOAD_AUTH_URL}


# Generate Payload types and importmap (optional - continue if fails)
RUN pnpm run generate:types || echo "Types generation skipped"
RUN pnpm run generate:importmap || echo "Importmap generation skipped"

# Build the application
RUN pnpm run build

# Stage 4: Production runtime
FROM base AS runner

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-deprecation"

# Default environment variables (override these when running the container)

ARG PAYLOAD_SECRET
ARG DATABASE_NAME
ARG DATABASE_URI
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_PAYLOAD_AUTH_URL

ARG PUSHER_APP_ID
ARG NEXT_PUBLIC_PUSHER_KEY
ARG PUSHER_SECRET
ARG NEXT_PUBLIC_PUSHER_CLUSTER

ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_URI=${DATABASE_URI}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV PAYLOAD_FORCE_READ_ONLY=${PAYLOAD_FORCE_READ_ONLY}
ENV PUSHER_APP_ID=${PUSHER_APP_ID}
ENV NEXT_PUBLIC_PUSHER_KEY=${NEXT_PUBLIC_PUSHER_KEY}
ENV PUSHER_SECRET=${PUSHER_SECRET}
ENV NEXT_PUBLIC_PUSHER_CLUSTER=${NEXT_PUBLIC_PUSHER_CLUSTER}
ENV NEXT_PUBLIC_PAYLOAD_AUTH_URL=${NEXT_PUBLIC_PAYLOAD_AUTH_URL}

# Create user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create .next directory with proper ownership
RUN mkdir .next && chown nextjs:nodejs .next

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set port environment variable
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]