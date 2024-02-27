#!/usr/bin/env bash

is_live_functional_test=false

while test $# -gt 0
do
    case "$1" in
        --live) is_live_functional_test=true
            ;;
    esac
    shift
done

TIMEZONE=$(cat /etc/timezone)

type docker >/dev/null 2>&1 || { echo >&2 "I require docker but it's not installed.  Aborting."; exit 1; }
CONTAINER_ID=$(docker ps | grep 'standalone-chrome:3.141.59-krypton' | awk '{print $1}')

if [ -z "$CONTAINER_ID" ]; then
  CONTAINER_ID=$(docker run --net="host" -d -p 4444:4444 -e TZ=$TIMEZONE selenium/standalone-chrome:3.141.59-krypton)
fi

STARTED=$(docker inspect --format="{{ .State.StartedAt }}" $CONTAINER_ID)
NETWORK=$(docker inspect --format="{{ .NetworkSettings.IPAddress }}" $CONTAINER_ID)

echo "Docker selenium OK - $CONTAINER_ID is running. IP: $NETWORK, StartedAt: $STARTED"

if [ -n "$ONLY_FLAKY" ]; then NPM_ARGS="--onlyFlaky"; fi

if [ "$is_live_functional_test" = true ]; then
  npm run test:live -- --docker $NPM_ARGS $@
else
  npm run test:functionals -- --docker $NPM_ARGS $@
fi
