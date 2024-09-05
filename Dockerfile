FROM oven/bun:latest
WORKDIR /usr/src/app

COPY . .

RUN bun install

ENTRYPOINT [ "bun", "run", "src/index.ts" ]
