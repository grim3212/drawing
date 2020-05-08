FROM node:13.7-alpine as develop-stage

# clone repo directory
WORKDIR /usr/src/drawing
COPY package*.json ./

# get the required quasar cli
RUN yarn global add @quasar/cli

# install and build the image
RUN yarn
COPY . .
RUN quasar build

FROM nginx:1.17.5-alpine as production-stage
COPY --from=develop-stage /usr/src/drawing/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]