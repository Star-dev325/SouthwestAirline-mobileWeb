#!/bin/bash

set -e
set +x

echo $BUILD_URL
wget -q $BUILD_URL/consoleText -O consoleText

COUNT_APP_VER=`grep -a -e "Uploading.*southwest-web-.*\.*z" consoleText | sed -e 's/.*southwest-web-\([0-9.-]*-[a-z,0-9]*\).tar.gz.*/\1/'`

OUTPATH=/home/developer/documents/rundeck/artifacts/$JOB_NAME

mkdir -p $OUTPATH/contentAppVersion

echo -n '{"versionContentApp":' > $OUTPATH/$BUILD_NUMBER.json
echo -n '[ ' > $OUTPATH/contentAppVersion/$BUILD_NUMBER.json
for CONTENT_APP_VER in $COUNT_APP_VER
do
   echo -n '"'$CONTENT_APP_VER'",' >> $OUTPATH/$BUILD_NUMBER.json
   echo -n '"'$CONTENT_APP_VER'",' >> $OUTPATH/contentAppVersion/$BUILD_NUMBER.json
done
echo '}' >> $OUTPATH/$BUILD_NUMBER.json
echo '] ' >> $OUTPATH/contentAppVersion/$BUILD_NUMBER.json

cd $OUTPATH
echo -n "[" > successful-builds.json
count=`ls *.json | grep -v "successful-builds" | wc -l`
lowCount="$count-1"
lcount=0
for i in `ls -t *.json | grep -v "successful-builds"`
do
    name=$(echo $i | cut -f1 -d'.')
    echo -n "\"" >> successful-builds.json
    echo -n $name >> successful-builds.json
    if [[ ( "$lcount" < "$lowCount" ) ]]; then
       echo -n "\"," >> successful-builds.json
    fi
    lcount=$lcount+1
 done
 echo "]" >> successful-builds.json
 echo `pwd`
 set -x
 scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no /home/developer/documents/rundeck/phoenix-web.json  jenkins@st1hlxsw57:/opt/nas/documents/rundeck/phoenix-web.json
 scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no /home/developer/documents/rundeck/artifacts/$JOB_NAME/successful-builds.json  jenkins@st1hlxsw57:/opt/nas/documents/rundeck/artifacts/$JOB_NAME/successful-builds.json
 scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no /home/developer/documents/rundeck/artifacts/$JOB_NAME/contentAppVersion/$BUILD_NUMBER.json  jenkins@st1hlxsw57:/opt/nas/documents/rundeck/artifacts/$JOB_NAME/contentAppVersion/$BUILD_NUMBER.json
 scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no /home/developer/documents/rundeck/artifacts/$JOB_NAME/$BUILD_NUMBER.json  jenkins@st1hlxsw57:/opt/nas/documents/rundeck/artifacts/$JOB_NAME/$BUILD_NUMBER.json