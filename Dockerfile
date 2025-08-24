FROM node:20-alpine AS base

RUN apk add --no-cache bash

EXPOSE 3099

WORKDIR /

COPY src /src
COPY package.json /
COPY package-lock.json /
COPY tsconfig.json /

RUN npm install

CMD ["npm run start"]
