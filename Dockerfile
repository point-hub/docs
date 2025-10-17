# ---------------------------------------------------------------------------
# Stage 1 – Builder
# ---------------------------------------------------------------------------
FROM node:22-alpine AS builder

# Install git (used by VitePress for lastUpdated info)
RUN apk add --no-cache git

# Install Bun globally
RUN npm install -g bun

# Work as non-root user
USER node
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY --chown=node:node package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy all project files
COPY --chown=node:node . .

# Build the docs
RUN bun docs:build

# ---------------------------------------------------------------------------
# Stage 2 – Runner
# ---------------------------------------------------------------------------
FROM nginx:1.29.2-alpine AS runner

# Copy your custom Nginx config
COPY .nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /home/node/app/docs/.vitepress/dist /usr/share/nginx/html

# Pre-compress static assets with gzip
RUN find /usr/share/nginx/html -type f -regex '.*\.\(js\|css\|html\|svg\|json\)$' \
    -exec gzip -9 -k {} \;

# Correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
