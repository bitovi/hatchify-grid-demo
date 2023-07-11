## this is a multi-stage build
## use --target backend/frontend to specify which stage to build
## otherwise only frontend builds
## using alpine and then installing node reduces size from 375MB to 269MB
FROM alpine AS base
ENV BACKEND_PORT=3000
ENV FRONTEND_PORT=5173
ENV FRAMEWORK=koa
ENV DB_ENGINE=sqlite
WORKDIR /app
RUN apk update && apk add npm nodejs~=18
COPY package*.json ./
RUN npm install
COPY schemas/ schemas/

FROM base AS backend
COPY backend/ backend/
COPY tsconfig*.json ./
EXPOSE $BACKEND_PORT
CMD npm run "dev:backend:$FRAMEWORK:$DB_ENGINE"

FROM base AS frontend
COPY frontend/ frontend/
COPY public/ public/
COPY index.html tsconfig.json vite.config.ts ./
EXPOSE $FRONTEND_PORT
CMD npm run dev:frontend