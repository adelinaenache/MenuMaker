FROM node:14.4 as builder
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

FROM node:14.4

COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/backend/yarn.lock ./
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma

CMD ["node", "dist/src/main.js"]
