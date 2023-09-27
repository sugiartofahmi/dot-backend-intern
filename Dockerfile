FROM node:18.17.1-alpine3.17 AS Builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --ignore-scripts
RUN yarn prisma generate
RUN yarn run build

FROM node:18.17.1-alpine3.17 AS Service
COPY --from=Builder /app/node_modules ./node_modules
COPY --from=Builder /app/package.json ./package.json
COPY --from=Builder /app/dist ./dist
COPY --from=Builder /app/src/models ./src/models
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV DATABASE_URL=${DATABASE_URL}
ENV ACCESS_SECRET=${ACCESS_SECRET}
ENV REFRESH_SECRET=${REFRESH_SECRET}
EXPOSE ${PORT}
CMD ["yarn", "run", "start:prod"]


