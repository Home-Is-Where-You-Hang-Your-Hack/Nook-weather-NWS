FROM node:16-alpine AS base

RUN apk add --no-cache bash

EXPOSE 3099

WORKDIR /

COPY src /src
COPY package.json /
COPY package-lock.json /
COPY tsconfig.json /

RUN npm install

CMD ["/node_modules/ts-node/dist/bin.js", "--files", "/src/server.ts"]
