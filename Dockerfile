FROM node:20-alpine AS builder

WORKDIR /app

RUN npm --silent install --location=global pkg

COPY package.json .
COPY package-lock.json .

RUN npm ci

RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
      --target node18-alpine \
      --output import-meta-env-alpine

COPY . .

RUN npm run build


FROM nginx:alpine AS runner

COPY --from=builder /app/dist /dist
COPY --from=builder /app/import-meta-env-alpine /
COPY .env.example /
COPY nginx.conf /nginx.conf.template

CMD envsubst '$PORT,$APP_ENVIRONMENT' < /nginx.conf.template > /etc/nginx/nginx.conf && \
    ./import-meta-env-alpine --example /.env.example && \
    nginx -g 'daemon off;'
