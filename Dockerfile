FROM oven/bun:1-alpine AS builder

ENV NODE_ENV=production
ENV DB_FILE_NAME=/data/talkfest.sqlite

WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun i

COPY . .

RUN bun run prepare && bun run build

FROM oven/bun:1-alpine

ENV NODE_ENV=production
ENV DB_FILE_NAME=/data/talkfest.sqlite

WORKDIR /app

COPY --from=builder /app/build .
COPY --from=builder /app/drizzle ./drizzle

VOLUME /data

ENTRYPOINT ["bun", "run", "index.js"]