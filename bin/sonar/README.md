# Analyzing History

## About

This file contains information about traversing the history of a project (namely `phoenix-web`) to gather its history for Sonar. For details about building our sonar infrastructure, see the `docker` directory.

## Running analysis on history

1. Install `jq`, if you don't have it already
2. Copy `analyze_history.sh` and `sonar-project.properties` to a directory outside of `phoenix-web` (these files do NOT exist for a large chunk of `phoenix-web`'s history, and so could get wiped out/conflict with files within the respository)
3. Make sure you are in the root of `phoenix-web`
4. From the root of `phoenix-web`, run `analyze_history.sh`. So, for example, if you have copied `analyze_history.sh` and `sonar-project.properties` to `/tmp`, from `phoenix-web` you would run `/tmp/analyze_history.sh`
5. For running over a limited set of history, you may pass the same arguments to `analyze_history` as you would to `git log` (e.g., `--after="2017-04-04"`)

## Agent

Currently, the sonar server is running on Homer. You can check the IP address on jenkins by configuring the agent.
