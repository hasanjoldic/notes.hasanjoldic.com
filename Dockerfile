FROM node:16

WORKDIR /app

COPY package.json .npmrc* ./
RUN npm install pnpm --global
RUN pnpm install

COPY . .

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm run build

CMD ["pnpm", "run", "start"]