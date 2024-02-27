#!/usr/bin/env bash

dirname $0
currentPath=$(dirname $0)

node ${currentPath}/node_modules/http-server/bin/http-server ${currentPath}/indicator -S -C ${currentPath}/cert.pem -K ${currentPath}/key.pem -p 443 &
 node ${currentPath}/node_modules/http-server/bin/http-server ${currentPath}/content -p 80
