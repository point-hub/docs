# ---------------------------------------------------------------------------
# stage 1 - builder
# ---------------------------------------------------------------------------
FROM node:22-alpine AS builder

# Install git (needed by VitePress for lastUpdated and commit info)
RUN apk add --no-cache git

# Install Bun globally
RUN npm install -g bun

# Setup non-root user and working directory
USER node
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY --chown=node:node package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy all source code
COPY --chown=node:node . .

# Build documentation
RUN bun docs:build

# ---------------------------------------------------------------------------
# stage 2 - runner
# ---------------------------------------------------------------------------
FROM nginx:1.29.2-alpine AS runner

# Install Brotli module and tools
RUN apk add --no-cache nginx-mod-http-brotli brotli

# Copy nginx configuration
COPY .nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /home/node/app/docs/.vitepress/dist /usr/share/nginx/html

# Compress static assets (optional but recommended)
RUN find /usr/share/nginx/html -type f -regex '.*\.\(js\|css\|html\|svg\|json\)$' \
    -exec gzip -9 -k {} \; \
    -exec brotli -f -Z {} \;

# Ensure correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
