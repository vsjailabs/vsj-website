# syntax=docker/dockerfile:1.6
# Multi-stage build for the VSJ AI Labs Next.js marketing site.
# Runs behind Nginx on the Hostinger box; listens on 127.0.0.1:3017.

FROM node:22.19-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22.19-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SITE_URL=https://vsjailabs.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22.19-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3017

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
RUN npm prune --omit=dev

USER node
EXPOSE 3017
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "3017"]
