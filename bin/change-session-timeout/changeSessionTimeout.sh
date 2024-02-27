#!/bin/bash

SCRIPT_DIR="$( cd "$(dirname "$0")" ; pwd -P )"

echo Preparing to set session timeout...

curl -sL "https://nexus-tools.swacorp.com/ECOM/service/local/artifact/maven/redirect?r=snapshots&g=commons-cli&a=commons-cli&v=1.0&p=jar" > ${SCRIPT_DIR}/commons-cli-1.0.jar
curl -sL "https://nexus-tools.swacorp.com/ECOM/service/local/artifact/maven/redirect?r=snapshots&g=org.codehaus.groovy&a=groovy-all&v=2.1.2&p=jar" > ${SCRIPT_DIR}/groovy-all-2.1.2.jar

groovy -cp ${SCRIPT_DIR}/commons-cli-1.0.jar:${SCRIPT_DIR}/groovy-all-2.1.2.jar ${SCRIPT_DIR}/changeSessionTimeout.groovy "$@"
EXIT_CODE=$?

rm -rf ${SCRIPT_DIR}/*.jar
exit $EXIT_CODE
