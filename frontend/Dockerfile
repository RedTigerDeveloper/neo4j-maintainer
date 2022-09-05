FROM node:17.6.0-alpine AS build-step

WORKDIR /build-step
COPY package.json package-lock.json ./
COPY tsconfig.json .
COPY  src/ src/
COPY public/ public/
RUN echo 'REACT_APP_NEO4J_MAINTAINER_URL="http://localhost:8080"' >> .env
RUN npm install
RUN npm run build

FROM nginx:1.18-alpine

ENV LANG C.UTF-8
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build-step/build /var/www/html/public/


