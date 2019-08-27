FROM circleci/node:10.14.1 as builder

WORKDIR /usr/src/app

COPY /src /usr/src/app/src
COPY /public /usr/src/app/public
COPY /package.json /usr/src/app/package.json
COPY /tsconfig.json /usr/src/app/tsconfig.json
COPY /yarn.lock /usr/src/app/yarn.lock

RUN sudo chmod -R 777 /usr/src/app
RUN yarn install
RUN yarn build

FROM nginx:1.16.1
LABEL maintainer="https://teamdigitale.governo.it"

COPY .env /tmp/.env
COPY env.sh /tmp/env.sh
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

RUN chmod +x /tmp/env.sh

CMD ["./tmp/env.sh && cp /tmp/env-config.js && rm -rf /tmp/env-config.js env.sh && nginx -g daemon off;"]

WORKDIR /usr/share/nginx/html
