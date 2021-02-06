FROM node:14.15.4-alpine

WORKDIR /app/main
COPY package*.json /app/main
RUN yarn install
COPY . /app/main

EXPOSE 3333

RUN ["chmod", "+x", "/app/main/docker-entrypoint.sh"]
ENTRYPOINT ["sh", "/app/main/docker-entrypoint.sh" ]