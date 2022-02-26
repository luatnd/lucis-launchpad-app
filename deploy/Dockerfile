FROM node:16 AS builder

WORKDIR /home/node
COPY --chown=node:node . .
# RUN npm i -g yarn

USER node

RUN yarn install
RUN yarn build
RUN yarn export
# CMD ["yarn", "start"]

FROM nginx:mainline-alpine

COPY --from=builder /home/node/out /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001
