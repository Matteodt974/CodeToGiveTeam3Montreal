#!/usr/bin/env bash

NO_CLEAN=false

# If first arg is "--no-clean", skip cleanup
if [ "$1" != "--no-clean" ]; then
    docker-compose down -v
fi

# Build and start database
docker-compose up -d --build db

# Wait for initialization
sleep 15

# Build and start app
docker-compose up --build app