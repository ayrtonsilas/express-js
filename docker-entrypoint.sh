#!/bin/sh
if [ "$NODE_ENV" == "development" ] 
then
    yarn start:dev
else
    rm -rf /app/main/dist
    yarn start:prod
fi