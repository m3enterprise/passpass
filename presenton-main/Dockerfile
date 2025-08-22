# Multi-stage build for Render deployment
FROM python:3.11-slim-bookworm as backend-builder

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    fontconfig \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

# Configure ImageMagick for PDF processing
RUN sed -i 's/rights="none" pattern="PDF"/rights="read|write" pattern="PDF"/' /etc/ImageMagick-6/policy.xml

# Set working directory
WORKDIR /app

# Copy and install Python dependencies
COPY servers/fastapi/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY servers/fastapi/ ./servers/fastapi/

# Frontend build stage
FROM node:18-alpine as frontend-builder

WORKDIR /app

# Copy package files
COPY servers/nextjs/package*.json ./

# Install dependencies
RUN npm ci

# Copy frontend source
COPY servers/nextjs/ ./

# Build the application
RUN npm run build

# Production stage
FROM python:3.11-slim-bookworm

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    libreoffice \
    fontconfig \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

# Configure ImageMagick
RUN sed -i 's/rights="none" pattern="PDF"/rights="read|write" pattern="PDF"/' /etc/ImageMagick-6/policy.xml

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set working directory
WORKDIR /app

# Copy Python dependencies from builder
COPY --from=backend-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend-builder /usr/local/bin /usr/local/bin

# Copy backend code
COPY --from=backend-builder /app/servers/fastapi ./servers/fastapi

# Copy frontend build
COPY --from=frontend-builder /app/.next-build ./servers/nextjs/.next-build
COPY --from=frontend-builder /app/node_modules ./servers/nextjs/node_modules
COPY --from=frontend-builder /app/package*.json ./servers/nextjs/

# Copy configuration files
COPY start.js LICENSE NOTICE ./
COPY nginx.conf /etc/nginx/nginx.conf

# Create data directories
RUN mkdir -p /app/app_data /tmp/presenton

# Set environment variables
ENV APP_DATA_DIRECTORY=/app/app_data
ENV TEMP_DIRECTORY=/tmp/presenton
ENV PYTHONPATH=/app/servers/fastapi
ENV NODE_ENV=production

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start the application
CMD ["node", "/app/start.js"]