#!/bin/bash

aws-login $@
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 290503755741.dkr.ecr.us-east-1.amazonaws.com
