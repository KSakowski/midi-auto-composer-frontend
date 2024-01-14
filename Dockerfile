FROM node:latest as build-stage

# TODO
# ENV VITE_APP_API_URL https://midi-auto-composer-backend-bsnougc45q-lz.a.run.app/v1/
ENV VITE_APP_API_URL https://midi-auto-composer-backend-vpc-bsnougc45q-ew.a.run.app/v1/

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .
RUN npm i
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
