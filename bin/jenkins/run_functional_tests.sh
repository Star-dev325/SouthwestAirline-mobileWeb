#!/usr/bin/env bash
#/bin/sh
npm config set strict-ssl false
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm prune
npm install
cp -r build/mock-config build/mobile-swa-ui-app-mobile-web/

./bin/agent-run-functional-tests.sh
