#!/bin/bash

# Pull docker image
docker pull postgres

# Start postgres server
#docker run --rm --name pg-docker -e POSTGRES_PASSWORD=password POSTGRES_USER=user POSTGRES_DB=kaizendb  -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres

docker run --rm  --name pg-docker -e POSTGRES_PASSWORD=password -e POSTGRES_USER=admin -e POSTGRES_NAME=kaizendb -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres