## this is a multi-stage build
## use --target backend/frontend to specify which stage to build
## otherwise only frontend builds
## using alpine and then installing node reduces size from 375MB to 269MB
FROM alpine AS base
ENV BACKEND_PORT=3000
ENV FRAMEWORK=koa
ENV DB_ENGINE=sqlite
WORKDIR /app
RUN apk update && apk add npm nodejs~=18
COPY package*.json ./
RUN npm install
COPY schemas.ts schemas.ts

FROM base AS backend
COPY backend/ backend/
COPY tsconfig*.json ./
EXPOSE $BACKEND_PORT

FROM base AS frontend
COPY frontend/ frontend/
COPY public/ public/
COPY index.html tsconfig.json vite.config.ts ./

CMD npm run "dev:$FRAMEWORK:$DB_ENGINE"