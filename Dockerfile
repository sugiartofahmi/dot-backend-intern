FROM oven/bun AS Base
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile --ignore-scripts
RUN bun run build

FROM oven/bun AS Service
COPY --from=Base /app/node_modules ./node_modules
COPY --from=Base /app/package.json ./package.json
COPY --from=Base /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}
ENV ACCESS_SECRET=${ACCESS_SECRET}
ENV REFRESH_SECRET=${REFRESH_SECRET}
EXPOSE ${PORT}
CMD ["bun", "run", "start:prod"]


