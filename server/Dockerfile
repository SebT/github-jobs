FROM node:12-alpine
CMD [ "node", "/app/index.js"]

COPY package.json yarn.lock /app/

WORKDIR /app

RUN yarn install --production

COPY src/ .