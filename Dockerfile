FROM node:24-alpine as builder
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /app/backend

WORKDIR /app/backend

COPY ./backend/package*.json /app/backend
COPY ./backend/yarn.lock /app/backend
RUN yarn install

COPY ./backend/prisma /app/backend/prisma
RUN yarn run prisma generate

ADD ./backend /app/backend
RUN yarn run build

FROM node:24-alpine
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/backend/yarn.lock ./
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma

CMD ["yarn", "run", "prisma", "migrate", "deploy" , "&" "node", "dist/main.js"]
