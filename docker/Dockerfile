FROM node:22-bookworm

RUN npm install -g pnpm

WORKDIR /app

COPY . /app

RUN cp .env.example .env

RUN pnpm i
RUN pnpm setup-build

EXPOSE 3000

CMD ["pnpm", "start"]