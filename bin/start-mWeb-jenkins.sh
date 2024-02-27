#!/usr/bin/env bash

type docker >/dev/null 2>&1 || { echo >&2 "I require docker but it's not installed.  Aborting."; exit 1; }
CONTAINER_ID=$(docker ps | grep 'jenkins2.0:latest' | awk '{print $1}')

if [ -n "$CONTAINER_ID" ]; then
  docker stop $CONTAINER_ID
fi

docker run -d -v /home/jenkins2.0:/home/jenkins/.jenkins --dns=172.31.10.11 -p 9090:9090 jenkins2.0
