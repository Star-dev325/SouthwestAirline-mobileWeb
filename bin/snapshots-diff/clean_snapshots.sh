#!/usr/bin/env bash

snapshotsPath="./test/e2e/snapshots"
diffPath="./test/e2e/diffs"
errorScreenshots="./nightwatch-screenshots"

echo "Delete snapshot directory"
rm -rf ${snapshotsPath}

echo "Delete diff directory"
rm -rf ${diffPath}

echo "Delete nightwatch screenshots directory";
rm -rf ${errorScreenshots}
