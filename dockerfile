FROM node:18 as builder

WORKDIR /build
COPY package*.json .

RUN npm install
COPY src src

RUN npm run build

FROM node:18 as runner

WORKDIR /app
ENV NODE_ENV production

COPY package*.json .
RUN npm install

COPY --from=builder /build/build build


CMD ["npm", "start"]