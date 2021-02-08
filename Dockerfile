FROM node:14.15.4-alpine

WORKDIR /app/main
COPY . /app/main/
RUN yarn install
EXPOSE 3333

RUN ["chmod", "+x", "/app/main/docker-entrypoint.sh"]
ENTRYPOINT ["sh", "/app/main/docker-entrypoint.sh" ]