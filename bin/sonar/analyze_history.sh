#!/bin/bash
SONAR_URL=http://172.18.58.141:9000
git log --date=short --pretty=format:'{%n  "commit": "%H",%n  "author": "%aN <%aE>",%n  "date": "%ad",%n  "message": "%f"%n},' $@ | \
perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
perl -pe 's/},]/}]/' | \
jq -r "unique_by(.date)[] | \"git checkout \\(.commit) && sonar-scanner -Dproject.settings=./sonar-project.properties -Dsonar.projectDate=\\(.date)\"" | \
xargs -L1 -I{} bash -c "{}"

