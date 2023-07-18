# build
FROM node:18-alpine3.14 as build

WORKDIR /usr/share/nginx/html

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

RUN npm install esbuild

COPY . .

RUN npm run build

# production
FROM nginx:stable-alpine3.17-slim as production

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /usr/share/nginx/html/dist /usr/share/nginx/html
